#!/bin/bash

SCRIPT_DIR=$(realpath $(dirname "${BASH_SOURCE[0]}"))
# Load environment variables from .env file
if [ -f ".env" ]; then
  source "$SCRIPT_DIR/../.env"
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
base_path_template="$relaychain_dir/%s"  # Placeholder for service name
chain_spec="$relaychain_dir/rococo_relay_chain_spec_raw.json"
extra_params="--unsafe-rpc-external --rpc-methods unsafe"

source $SCRIPT_DIR/binary_install.sh

download_and_install "polkadot" "$POLKA_VERSION" 

# Function to create a service
create_service() {
  local service_name="$1"
  local default_user="$2"
  local port="$3"
  local rpc_port="$4"
  local prometheus_ports="$5"

  local base_path=$(printf "$base_path_template" "$service_name")

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
  --no-telemetry \
  --prometheus-external \
  --prometheus-port $prometheus_ports \
  --validator \
  --base-path $base_path \
  --chain $chain_spec \
  --port $port \
  --rpc-port $rpc_port \
  --ws-port $((rpc_port + 1)) \
  $extra_params
Type=simple
User=$SCRIPT_USER

[Install]
WantedBy=multi-user.target
EOF

  echo "System service for $service_name created ..."
  chmod 644 /etc/systemd/system/${service_name}.service
}

# Main loop
for i in "${!service_names[@]}"; do
  create_service "${service_names[i]}" "${default_user[i]}" "${ports[i]}" "${rpc_ports[i]}" "${prometheus_ports[i]}"
done