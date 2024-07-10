#!/bin/bash

set -e       # Exit on error
set -u       # Fail on unset variables

export NVM_DIR=$HOME/.nvm;
source $NVM_DIR/nvm.sh;

parachain_dir="/home/perfuse/parachain"
SCRIPT_DIR=$(realpath $(dirname "${BASH_SOURCE[0]}"))

# Load environment variables from .env file
if [ -f "$SCRIPT_DIR/../perfuse/.env" ]; then
  source "$SCRIPT_DIR/../perfuse/.env"
  echo "Env Variables Loaded"
else
  echo "ERROR: .env file not found."
  exit 1
fi

# Configuration variables (adapt these to your setup)
service_names=("relaychain-1" "relaychain-2" "relaychain-3" "$COL_NAME_1" "$COL_NAME_2" "$RPC_NAME")
binaries_name=("polkadot" "polkadot-parachain" "polkadot-execute-worker" "polkadot-prepare-worker")
base_path_template="/home/perfuse/parachain/%s/data"
HAPROXY_CONFIG_FILE="/etc/haproxy/haproxy.cfg"


# Function to remove a service and its data directory
cleanup_service() {
    local service_name="$1"

    # Determine the base path based on service type
    if [[ $service_name == $COL_NAME_1 || $service_name == $COL_NAME_2 ]] || [[ $service_name == $RPC_NAME ]]; then
        local base_path="/home/perfuse/parachain/$service_name/data"
    elif [[ $service_name == relaychain-* ]]; then
        local base_path="/home/perfuse/relaychain/$service_name/data"
    else # For rpc-node or other services (if needed)
        echo "WARNING: Unknown service type for '$service_name'. Skipping data directory removal."
        local base_path=""  # Set an empty base path
    fi


    # Check if service exists
    if ! sudo systemctl is-enabled --quiet "$service_name"; then
        echo "WARNING: Service '$service_name' not found or not enabled."
        return  # Skip if the service doesn't exist
    fi

    # Stop and disable the service
    echo "Stopping and disabling service '$service_name'..."
    sudo systemctl stop "$service_name"
    sudo systemctl disable "$service_name"

    # Remove the service file
    echo "Removing service file for '$service_name'..."
    sudo rm "/etc/systemd/system/${service_name}.service"

    # Check if data directory exists
    if [ -d "$base_path" ]; then
        echo "Removing data directory '$base_path'..."
        sudo rm -rf "$base_path"
    else
        echo "WARNING: Data directory '$base_path' not found."
    fi

    echo "Service '$service_name' and data cleaned up."
}

# Main loop
for i in "${!service_names[@]}"; do
    cleanup_service "${service_names[i]}"
done

remove_binary() {
    local binary_name="$1"
    local binary_path="/usr/local/bin/$binary_name"

    if [ -f "$binary_path" ]; then  # Check if the binary exists
        echo "Removing binary: $binary_name"
        sudo rm "$binary_path"
        echo "$binary_name removed successfully."
    else
        echo "WARNING: Binary '$binary_name' not found at '$binary_path'. Skipping removal."
    fi
}

# Function to clean the HAProxy configuration
clean_haproxy_config() {
    echo "Cleaning HAProxy configuration..."

    # Remove frontend and backends
    sudo sed -i '/^backend relay_rpc_backend/,$d' "$HAPROXY_CONFIG_FILE"
    sudo sed -i '/^userlist authorized_users/,+1d' "$HAPROXY_CONFIG_FILE"
    sudo systemctl restart haproxy
    
    echo "HAProxy configuration cleaned."
}

for i in "${!binaries_name[@]}"; do
  remove_binary "${binaries_name[i]}" "$POLKA_VERSION"
done

# clean_haproxy_config
sudo rm -r /home/perfuse

# Delete the pm2 service of RegionX
pm2 delete all

#Remove Sidecar Container
# sudo docker rm -f $(sudo docker ps -a -q)