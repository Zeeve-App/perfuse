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

set -e       # Exit on error
set -u       # Fail on unset variables

PATH="$HOME/.nvm/versions/node/v20.15.1/bin:$PATH"
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
service_names=("$COL_NAME_1" "$COL_NAME_2" "$RPC_NAME")
binaries_name=("polkadot" "polkadot-parachain")
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


for i in "${!binaries_name[@]}"; do
  remove_binary "${binaries_name[i]}" "$POLKA_VERSION"
done

#Remove jsapps directory
if [ -d "/var/www/jsapps" ]; then
sudo rm -rf /var/www/jsapps/
else
echo "Directory not found"
fi

#Remove Sidecar Container
# sudo docker rm -f $(sudo docker ps -a -q)

#Remove apps directory
if [ -d "$SCRIPT_DIR/../apps" ]; then
sudo rm -rf "$SCRIPT_DIR/../apps"
else
echo "Directory not found"
fi

#Remove nginx files
sudo systemctl stop nginx
sudo systemctl disable nginx
sudo apt-get remove --purge -y nginx nginx-common nginx-full
sudo rm -rf /etc/nginx /var/lib/nginx /var/log/nginx
sudo systemctl daemon-reload

#remove haproxy
sudo systemctl stop haproxy
sudo systemctl disable haproxy
sudo apt-get remove --purge -y haproxy
sudo rm -rf /etc/haproxy /var/lib/haproxy /var/log/haproxy
sudo systemctl daemon-reload


#remove prometheus / grafana and node_exporter
sudo systemctl stop grafana-server prometheus node_exporter || true
sudo systemctl disable grafana-server prometheus node_exporter || true

#remove systemd files
sudo rm -f /etc/systemd/system/node_exporter.service
sudo rm -f /etc/systemd/system/prometheus.service
sudo rm -f /etc/systemd/system/grafana-server.service

sudo systemctl daemon-reload

sudo rm -rf /usr/local/bin/node_exporter
sudo rm -rf /etc/prometheus /var/lib/prometheus
sudo rm -rf /usr/sbin/grafana-server /var/lib/grafana /etc/grafana /var/log/grafana

if [ -d "/home/perfuse" ]; then
    sudo rm -rf /home/perfuse
else
    echo "Directory /home/perfuse not found"
fi

sudo userdel -r node_exporter || true
sudo userdel -r prometheus || true
sudo userdel -r grafana || true