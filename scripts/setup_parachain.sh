#!/bin/bash

set -e
set -u

SCRIPT_DIR=$(realpath $(dirname "${BASH_SOURCE[0]}"))
# Load environment variables from .env file
if [ -f ".env" ]; then
  source "$SCRIPT_DIR/../perfuse/.env"
else
  echo "ERROR: .env file not found."
  exit 1
fi

# Configuration variables
service_config=(
  "${COL_NAME_1}:--alice"   # Collator node 1 with --alice
  "${COL_NAME_2}:--bob"     # Collator node 2 with --bob
  "${RPC_NAME}:"            # RPC node 
)

ports=(40334 40335 40336)
rpc_ports=(9008 9009 9010)
prometheus_ports=(8004 8005 8006)
base_path_template="/home/perfuse/parachain/%s/data"  # Data directory template
relaychain_key_dir="${RELAYCHAIN_KEY_DIR:-/home/perfuse/relaychain_keys}"
parachain_key_dir="${PARACHAIN_KEY_DIR:-/home/perfuse/parachain_keys}"
parachain_dir="/home/perfuse/parachain"
chain_spec="$parachain_dir/raw-parachain-chainspec.json"
relay_chain_spec="$parachain_dir/rococo_relay_chain_spec_raw.json"
extra_params="--unsafe-rpc-external --rpc-methods unsafe"

source $SCRIPT_DIR/generate_keys.sh
# Generate Collator Node Keys
generate_node_keys collator $parachain_key_dir 2

get_bootnode_id() {
    
    local key_file="$1"
    # echo "Fetching bootnode ID from the key file: $key_file..."
    local bootnode_id=$(/usr/local/bin/polkadot key inspect-node-key --file "$key_file")

    if [ -z "$bootnode_id" ]; then
        echo "ERROR: Could not fetch bootnode ID from the key file: $key_file"
        exit 1
    fi

    echo "$bootnode_id"
}

# Function to create a service
create_service() {
  local config="$1" 
  local service_name="${config%%:*}"
  local user_flag="${config#*:}"

  local port="$2"
  local rpc_port="$3"
  local prometheus_port="$4"
  local base_path=$(printf "$base_path_template" "$service_name")
  local relay_bootnode_id1=$(get_bootnode_id "${relaychain_key_dir}/relaychain_node_key_1.txt" )
  local relay_bootnode_id2=$(get_bootnode_id "${relaychain_key_dir}/relaychain_node_key_2.txt" )
  sudo mkdir -p $base_path
  sudo chown -R $SCRIPT_USER:$SCRIPT_USER $base_path
  local exec_start="/usr/local/bin/polkadot-parachain \
    --name $service_name \
    --chain $chain_spec \
    --base-path $base_path \
    --prometheus-external \
    --rpc-cors all"

  # Add --$user if specified
  if [ -n "$user_flag" ]; then
      exec_start+=" $user_flag"
  fi

  # Add extra parameters (e.g., prometheus-port, rpc-max-connections)
  exec_start+=" \
    --prometheus-port $prometheus_port \
    --rpc-max-connections 50000 \
    --port $port \
    --rpc-port $rpc_port \
    $extra_params"

  # Special configuration for collator nodes
  if [[ $service_name == $COL_NAME_1 || $service_name == $COL_NAME_2 ]]; then
    exec_start+=" \
      --collator \
      --node-key-file $parachain_key_dir/collator_node_key_$count.txt \
      -- \
      --chain $relay_chain_spec \
      --execution wasm \
      --port $((port + 2022)) \
      --rpc-port $((rpc_port + 2022)) \
      --bootnodes /ip4/127.0.0.1/tcp/30333/p2p/$relay_bootnode_id1 /ip4/127.0.0.1/tcp/30334/p2p/$relay_bootnode_id2"
  else
    exec_start+=" \
      -- \
      --chain $relay_chain_spec \
      --execution wasm \
      --port $((port + 2022)) \
      --rpc-port $((rpc_port + 2022)) \
      --bootnodes /ip4/127.0.0.1/tcp/30333/p2p/$relay_bootnode_id1 /ip4/127.0.0.1/tcp/30334/p2p/$relay_bootnode_id2"
  fi

  cat <<EOF >/etc/systemd/system/${service_name}.service
[Unit]
Description=$service_name
StartLimitIntervalSec=500
StartLimitBurst=5

[Service]
LimitNOFILE=65536
Restart=on-failure
RestartSec=5s
ExecStart=$exec_start
Type=simple
User=$SCRIPT_USER

[Install]
WantedBy=multi-user.target
EOF

  echo "System service for $service_name created ..."
  chmod 644 /etc/systemd/system/${service_name}.service 
  sudo systemctl enable ${service_name}.service
  sudo systemctl start ${service_name}.service
}

# Main loop
count=1
for i in "${!service_config[@]}"; do
  create_service "${service_config[i]}" "${ports[i]}" "${rpc_ports[i]}" "${prometheus_ports[i]}"
  count=$((count + 1))
done