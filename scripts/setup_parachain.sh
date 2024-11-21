#!/bin/bash

# SPDX-License-Identifier: AGPL-3.0-or-later

# Copyright (C) 2024 [Perfuse]
#
# This program is free software: you can redistribute it and/or modify 
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

set -e
set -u

PATH="$HOME/.nvm/versions/node/v20.15.1/bin:$PATH"
export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;
SCRIPT_DIR=$(realpath $(dirname "${BASH_SOURCE[0]}"))
# Load environment variables from .env file
if [ -f "$SCRIPT_DIR/../perfuse/.env" ]; then
  source "$SCRIPT_DIR/../perfuse/.env"
  echo "Env Variables Loaded"
else
  echo "ERROR: .env file not found."
  exit 1
fi

# Configuration variables
service_config=(
  "${COL_NAME_1}:"   # Collator node 1 
  "${COL_NAME_2}:"   # Collator node 2 
  "${RPC_NAME}:"     # RPC node 
)

ports=(40334 40335 40336)
rpc_ports=(9008 9009 9010)
prometheus_ports=(8004 8005 8006)
base_path_template="/home/perfuse/parachain/%s/data"  # Data directory template
parachain_key_dir="${PARACHAIN_KEY_DIR:-/home/perfuse/parachain_keys}"
parachain_dir="/home/perfuse/parachain"
chain_spec="$parachain_dir/raw-parachain-chainspec.json"
extra_params="--unsafe-rpc-external --rpc-methods unsafe"
network="$NETWORK_TYPE"

source $SCRIPT_DIR/generate_keys.sh
setup_sidecar() {
  if [[ $SIDECAR == 1 ]] ; then
    echo "Setting up sidecar...."
    bash $SCRIPT_DIR/setup-sidecar.sh
    echo "Sidecar is ready."

  else
    echo "Skipping Sidecar Setup..."
  fi
}

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
    --port $port \
    --rpc-port $rpc_port \
    $extra_params"

  # Special configuration for collator nodes
  if [[ $service_name == $COL_NAME_1 || $service_name == $COL_NAME_2 ]]; then
    exec_start+=" \
      --collator \
      --node-key-file $parachain_key_dir/collator_node_key_$count.txt \
      -- \
      --chain $network \
      --sync warp \
      --port $((port + 2022)) \
      --rpc-port $((rpc_port + 2022)) "
  else
    exec_start+=" \
      --rpc-max-connections 50000 \
      --state-pruning archive \
      -- \
      --chain $network \
      --sync warp \
      --state-pruning 1000 \
      --port $((port + 2022)) \
      --rpc-port $((rpc_port + 2022)) "
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

sidecar_setup() {
  # Check if api-sidecar is already installed
  if ! command -v substrate-api-sidecar &> /dev/null; then 
    echo "Installing @substrate/api-sidecar..."
    npm i -g @substrate/api-sidecar
  else
    echo "@substrate/api-sidecar is already installed."
  fi

  # ENV VAR for Sidecar
  export SAS_EXPRESS_BIND_HOST=0.0.0.0
  export SAS_EXPRESS_PORT=9099
  export SAS_SUBSTRATE_URL=ws://127.0.0.1:9010

  if pm2 list | grep -q "substrate-api-sidecar"; then
    echo "Restarting existing sidecar process..."
    pm2 restart substrate-api-sidecar
  else
    echo "Starting sidecar..."
    pm2 start "substrate-api-sidecar"
  fi
}

# Main loop
count=1
for i in "${!service_config[@]}"; do
  create_service "${service_config[i]}" "${ports[i]}" "${rpc_ports[i]}" "${prometheus_ports[i]}"
  count=$((count + 1))
done

if [[ $SIDECAR == 1 ]]; then
  echo "Configuring the Sidecar......."
  sidecar_setup
  echo "Sidecar is running now."
else
  echo "Skipping the Sidecar Setup"
fi