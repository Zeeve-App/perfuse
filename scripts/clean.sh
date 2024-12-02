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

log() {
    echo "[INFO] $1"
}

error_exit() {
    echo "[ERROR] $1"
    exit 1
}

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
service_names=("$COL_NAME_1" "$COL_NAME_2" "$RPC_NAME" "node_exporter" "prometheus" "grafana-server")
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
    sudo systemctl daemon-reload

    # Remove the service file
    echo "Removing service file for '$service_name'..."
    if [ -f "/etc/systemd/system/${service_name}.service" ]; then
        sudo rm "/etc/systemd/system/${service_name}.service"
    else
        echo "Service File not found."
    fi
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


#Remove Sidecar Container
# sudo docker rm -f $(sudo docker ps -a -q)

remove_service() {
    local service_name=$1
    log "Checking for $service_name service..."
    if systemctl list-unit-files --type=service | grep -q "$service_name"; then
        log "Stopping and disabling $service_name..."
        sudo systemctl stop "$service_name" || log "$service_name is not running."
        sudo systemctl disable "$service_name"
        sudo rm -f "/etc/systemd/system/$service_name.service"
        sudo systemctl daemon-reload
        log "$service_name removed successfully."
    else
        log "$service_name service not found."
    fi
}

remove_directory() {
    local dir_path=$1
    if [ -d "$dir_path" ]; then
        log "Removing directory: $dir_path..."
        sudo rm -rf "$dir_path"
        log "$dir_path removed successfully."
    else
        log "Directory $dir_path not found."
    fi
}

remove_file() {
    local file_path=$1
    if [ -f "$file_path" ]; then
        log "Removing file: $file_path..."
        sudo rm -f "$file_path"
        log "$file_path removed successfully."
    else
        log "File $file_path not found."
    fi
}

remove_user() {
    local user_name=$1
    if getent passwd "$user_name" &>/dev/null; then
        log "Removing user: $user_name..."
        sudo userdel -r "$user_name" || log "Failed to remove home directory for $user_name. It might not exist."
        log "User $user_name removed successfully."
    else
        log "User $user_name not found."
    fi
}

cleanup_node_exporter() {
    log "Cleaning up Node Exporter..."
    cleanup_service "node_exporter"
    remove_directory "/opt/node_exporter"
    remove_file "/usr/local/bin/node_exporter"
    remove_user "node_exporter"
    log "Node Exporter cleanup completed."
}

cleanup_prometheus() {
    log "Cleaning up Prometheus..."
    cleanup_service "prometheus"
    remove_directory "/etc/prometheus"
    remove_directory "/var/lib/prometheus"
    remove_user "prometheus"
    log "Prometheus cleanup completed."
}

cleanup_grafana() {
    log "Cleaning up Grafana..."
    cleanup_service "grafana-server"
    remove_file "/etc/grafana/grafana.ini"
    remove_directory "/etc/grafana"
    log "Grafana cleanup completed."
}

# cleanup_nginx() {
#     log "Cleaning up Nginx..."
#     remove_service "nginx"
#     remove_directory "/etc/nginx"
#     remove_directory "/var/log/nginx"
#     remove_directory "/usr/share/nginx"
#     remove_file "/usr/sbin/nginx"
#     log "Nginx cleanup completed."
# }

# cleanup_haproxy() {
#     log "Cleaning up HAProxy..."
#     remove_service "haproxy"
#     remove_directory "/etc/haproxy"
#     remove_directory "/var/log/haproxy"
#     remove_file "/usr/sbin/haproxy"
#     log "HAProxy cleanup completed."
# }

monitoring_cleanup() {
    log "Starting monitoring cleanup process..."
    cleanup_node_exporter
    cleanup_prometheus
    cleanup_grafana
    remove_directory "/var/www/jsapps"
    remove_directory "$SCRIPT_DIR/../apps"
    remove_directory "/home/perfuse"
    sudo systemctl daemon-reload
    # Delete the pm2 service
    #pm2 delete all
    log "Cleanup process completed successfully."
}

monitoring_cleanup