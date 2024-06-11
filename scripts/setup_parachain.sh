#!/bin/bash

set -e
set -u

SCRIPT_DIR=$(realpath $(dirname "${BASH_SOURCE[0]}"))
# Load environment variables from .env file
if [ -f ".env" ]; then
  source "$SCRIPT_DIR/../.env"
else
  echo "ERROR: .env file not found."
  exit 1
fi

# Configuration variables
service_config=(
  "${COL_NAME_1}:--alice"   # Collator node 1 with --alice
  "${col_name_2}:--bob"     # Collator node 2 with --bob
  "${RPC_NAME}:"            # RPC node 
)

ports=(40334 40335 40336)
rpc_ports=(9008 9009 9010)
prometheus_ports=(8004 8005 8006)
base_path_template="/home/perfuse/parachain/%s/data"  # Data directory template
relaychain_key_dir="/home/perfuse/relaychain_keys"
parachain_dir="/home/perfuse/parachain"
chain_spec="$parachain_dir/raw-parachain-chainspec.json"
relay_chain_spec="$parachain_dir/rococo_relay_chain_spec_raw.json"
extra_params="--unsafe-rpc-external --rpc-methods unsafe"

source $SCRIPT_DIR/binary_install.sh
# Download and install polkadot-parachain
download_and_install "polkadot-parachain" "$POLKA_VERSION"

get_bootnode_id() {
    
    local key_file="$1"
    echo "Fetching bootnode ID from the key file: $key_file..."
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
  local bootnode_id1=$(get_bootnode_id "${relaychain_key_dir}/relaychain_node_key_1.txt")
  local bootnode_id2=$(get_bootnode_id "${relaychain_key_dir}/relaychain_node_key_2.txt")

  local exec_start="$parachain_dir/polkadot-parachain \
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
  if [[ $service_name == collator-* ]]; then
    exec_start+=" \
      --collator \
      -- \
      --chain $relay_chain_spec \
      --execution wasm \
      --port $((port)) \
      --rpc-port $((rpc_port)) \
      --bootnodes /ip4/127.0.0.1/tcp/30333/p2p/$relay_bootnode_id1 /ip4/127.0.0.1/tcp/30334/p2p/$relay_bootnode_id2"
  else
    exec_start+=" \
      -- \
      --chain $relay_chain_spec \
      --execution wasm \
      --port $((port)) \
      --rpc-port $((rpc_port)) \
      --bootnodes /ip4/127.0.0.1/tcp/30333/p2p/$relay_bootnode_id /ip4/127.0.0.1/tcp/30334/p2p/$relay_bootnode_id"

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
}

# Create data directories
mkdir -p "${service_config[@]%%:*}" # Extract service names and create directories

# Main loop
for i in "${!service_config[@]}"; do
  create_service "${service_config[i]}" "${ports[i]}" "${rpc_ports[i]}" "${prometheus_ports[i]}"
done