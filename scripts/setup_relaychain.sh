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

set -e  # Exit immediately if any command fails
set -u  # Treat unset variables as errors
# Configuration variables
service_names=("relaychain-1" "relaychain-2" "relaychain-3")
default_user=("--alice" "--bob" "--charlie")
ports=(30333 30334 30335)
rpc_ports=(9344 9345 9346)
prometheus_ports=(8001 8002 8003)

# Common parameters (can be customized)
relaychain_dir="/home/perfuse/relaychain"
parachain_dir="/home/perfuse/parachain"
base_path_template="$relaychain_dir/%s"  # Placeholder for service name
chain_spec="$relaychain_dir/rococo_relay_chain_spec_raw.json"
extra_params="--unsafe-rpc-external --rpc-methods unsafe"
relaychain_key_dir="${RELAYCHAIN_KEY_DIR:-/home/perfuse/relaychain_keys}"

sudo cp $relaychain_dir/rococo_relay_chain_spec_raw.json $parachain_dir/rococo_relay_chain_spec_raw.json
source $SCRIPT_DIR/generate_keys.sh
# Generate Collator Node Keys
generate_node_keys relaychain $relaychain_key_dir 3

# Function to create a service
create_service() {
  local service_name="$1"
  local default_user="$2"
  local port="$3"
  local rpc_port="$4"
  local prometheus_ports="$5"

  local base_path=$(printf "$base_path_template" "$service_name")
  sudo mkdir -p $base_path
  sudo chown -R $SCRIPT_USER:$SCRIPT_USER $base_path

  cat <<EOF >/etc/systemd/system/${service_name}.service
[Unit]
Description=$service_name
StartLimitIntervalSec=500
StartLimitBurst=5

[Service]
LimitNOFILE=65536
Restart=on-failure
RestartSec=5s
ExecStart=/usr/local/bin/polkadot $default_user  \
  --name $service_name \
  --rpc-cors all \
  --no-mdns \
  --node-key-file $relaychain_key_dir/relaychain_node_key_$count.txt \
  --no-telemetry \
  --prometheus-external \
  --prometheus-port $prometheus_ports \
  --validator \
  --base-path $base_path \
  --chain $chain_spec \
  --port $port \
  --rpc-port $rpc_port \
  $extra_params
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

count=1
# Main loop
for i in "${!service_names[@]}"; do
  create_service "${service_names[i]}" "${default_user[i]}" "${ports[i]}" "${rpc_ports[i]}" "${prometheus_ports[i]}"
  count=$((count + 1))
done