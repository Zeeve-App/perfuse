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
HAPROXY_CONFIG_FILE="/etc/haproxy/haproxy.cfg"  # Adjust if your HAProxy config is in a different location
RELAY_RPC_PORT=9900
CORETIME_RPC_PORT=9910
REGIONX_RPC_PORT=9920
PARA_RPC_PORT=9010
PERFUSE_PORT=3000
SIDECAR_PORT=9099

# Function to install HAProxy (optional)
install_haproxy() {
  if ! command -v haproxy &> /dev/null; then
    echo "Installing HAProxy and Certbot..."
    sudo apt-get update && sudo apt-get install -y haproxy whois certbot  # Adjust for your package manager
  else
    echo "HAProxy is already installed. Skipping...."
  fi
}

obtain_renew_ssl_certificate() {
    echo "Checking for existing certificate for $DOMAIN..."
    if sudo certbot certificates | grep -q "$DOMAIN"; then
        echo "Certificate already exists. Attempting renewal..."
        sudo certbot renew || true  # Allow renewal to fail without stopping the script
    else
        echo "Certificate does not exist. Obtaining new certificate..."
        sudo sudo certbot certonly --standalone \
            -d "$DOMAIN" \
            --email "$EMAIL" \
            --agree-tos \
            --non-interactive \
            --http-01-port=8888
    fi
    sudo mkdir -p /etc/haproxy/ssl
    sudo cat /etc/letsencrypt/live/$DOMAIN/fullchain.pem /etc/letsencrypt/live/$DOMAIN/privkey.pem | sudo tee /etc/haproxy/ssl/$DOMAIN.pem
    # Uncomment SSL configuration lines after successful certificate obtaining/renewal
    sudo sed -i '/ssl crt/s/^#//' "$HAPROXY_CONFIG_FILE"
    sudo sed -i '/http-request redirect scheme https/s/^#//' "$HAPROXY_CONFIG_FILE"
}

# Function to add Basic Auth configuration
add_basic_auth() {

      # Check if frontend and backend already exist
  if grep -q "^userlist authorized_users" "$HAPROXY_CONFIG_FILE" ; then
    echo "Basic Auth already exists in $HAPROXY_CONFIG_FILE"
    return
  fi

    # Hash the password (using bcrypt)
    local hashed_password=$(mkpasswd -m sha-256 "$RPC_PASS")

    cat <<EOF | sudo tee -a "$HAPROXY_CONFIG_FILE" >/dev/null
userlist authorized_users
    user $RPC_USER password $hashed_password
    
EOF
}

update_rpc_path() {
  # Check if HAProxy configuration exists
  if [ -f "$HAPROXY_CONFIG_FILE" ]; then
    echo "Checking RPC path in HAProxy configuration..."

    current_relay_path=$(sudo sed -n '/acl is_relay_rpc path_beg -i/p' $HAPROXY_CONFIG_FILE | awk '{print $5}' | cut -d '/' -f 2 )
    current_para_path=$(sudo sed -n '/acl is_para_rpc path_beg -i/p' $HAPROXY_CONFIG_FILE | awk '{print $5}' | cut -d '/' -f 2 )

    # Check if the current path matches the expected path
    if [[ "$current_relay_path" != "$RPC_API_KEY" ]]; then
      echo "Updating RPC path from '$current_relay_path' to '$RPC_API_KEY'..."
      # Replace the old path with the new path
      sudo sed -i "s|$current_relay_path|$RPC_API_KEY|" "$HAPROXY_CONFIG_FILE"
      sudo sed -i "s|$current_para_path|$RPC_API_KEY|" "$HAPROXY_CONFIG_FILE"
      echo "RPC path updated successfully."
    else
      echo "RPC path already set to '$RPC_API_KEY'."
    fi
  else
    echo "ERROR: HAProxy configuration file not found."
    exit 1
  fi
}

# Function to create the HAProxy configuration
add_frontend_backend() {
  
  local basic_auth_line=""
  if [[ "$AUTH_METHOD" == "basic_auth" ]]; then
  add_basic_auth
  local basic_auth_line="    http-request auth unless { http_auth(authorized_users) }"
  fi
  frontend_config="
frontend rpc_frontend
    bind *:80
#    bind *:443 ssl crt /etc/haproxy/ssl/${DOMAIN}.pem alpn h2,http/1.1
#    http-request redirect scheme https unless { ssl_fc }
    acl letsencrypt-acl path_beg /.well-known/acme-challenge/
    acl is_relay_rpc path_beg -i /${RPC_API_KEY:+${RPC_API_KEY}/}relay-rpc
    acl is_coretime_rpc path_beg -i /${RPC_API_KEY:+${RPC_API_KEY}/}coretime-rpc
    acl is_regionx_rpc path_beg -i /${RPC_API_KEY:+${RPC_API_KEY}/}regionx-rpc
    acl is_para_rpc path_beg -i /${RPC_API_KEY:+${RPC_API_KEY}/}para-rpc
    acl sidecar_api path_beg -i /${RPC_API_KEY:+${RPC_API_KEY}/}api
    use_backend letsencrypt-backend if letsencrypt-acl
    use_backend relay_rpc_backend if is_relay_rpc
    use_backend coretime_rpc_backend if is_coretime_rpc
    use_backend regionx_rpc_backend if is_regionx_rpc
    use_backend para_rpc_backend if is_para_rpc
    use_backend sidecar if sidecar_api
    default_backend perfuse_ui"

  local relay_backend_config="
backend relay_rpc_backend
    mode http
    $basic_auth_line
    server relaychain_rpc_1 127.0.0.1:${RELAY_RPC_PORT}"
  local coretime_backend_config="
backend coretime_rpc_backend
    mode http
    $basic_auth_line
    server coretime_rpc_1 127.0.0.1:${CORETIME_RPC_PORT}"
  local regionx_backend_config="
backend regionx_rpc_backend
    mode http
    $basic_auth_line
    server regionx_rpc_1 127.0.0.1:${REGIONX_RPC_PORT}"
  local parachain_backend_config="
backend para_rpc_backend
    mode http
    $basic_auth_line
    server substrate_rpc_1 127.0.0.1:${PARA_RPC_PORT}"

  local perfuse_ui_config="
backend perfuse_ui
    mode http
    option forwardfor
    server perfuse_ui 127.0.0.1:${PERFUSE_PORT}"

  local sidecar_config="
backend sidecar
    mode http
    option forwardfor
    server sidecar 127.0.0.1:${SIDECAR_PORT}"    

  local certbot_config="
backend letsencrypt-backend
    server certbot 127.0.0.1:8888"

  # Check if frontend and backend already exist
  if grep -q "^frontend rpc_frontend" "$HAPROXY_CONFIG_FILE" || grep -q "^backend relay_rpc_backend" "$HAPROXY_CONFIG_FILE"; then
    echo "Frontend or backend configuration already exists in $HAPROXY_CONFIG_FILE"
    return
  fi

  # Append the configuration blocks
  echo "$frontend_config" | sudo tee -a "$HAPROXY_CONFIG_FILE" >/dev/null
  echo "$perfuse_ui_config" | sudo tee -a "$HAPROXY_CONFIG_FILE" >/dev/null
  echo "$sidecar_config" | sudo tee -a "$HAPROXY_CONFIG_FILE" >/dev/null
  echo "$relay_backend_config" | sudo tee -a "$HAPROXY_CONFIG_FILE" >/dev/null
  echo "$coretime_backend_config" | sudo tee -a "$HAPROXY_CONFIG_FILE" >/dev/null
  echo "$regionx_backend_config" | sudo tee -a "$HAPROXY_CONFIG_FILE" >/dev/null  
  echo "$parachain_backend_config" | sudo tee -a "$HAPROXY_CONFIG_FILE" >/dev/null
  echo "$certbot_config" | sudo tee -a "$HAPROXY_CONFIG_FILE" >/dev/null

  echo "Frontend and backend configurations added to $HAPROXY_CONFIG_FILE"

}

# Function to restart HAProxy
restart_haproxy() {
  echo "Restarting HAProxy..."
  sudo systemctl restart haproxy  # Or use the appropriate command for your system
}

# Main execution
install_haproxy   # Install HAProxy
add_frontend_backend
update_rpc_path
restart_haproxy
if [[ "$SSL_TLS" == "1" ]]; then
obtain_renew_ssl_certificate
fi
restart_haproxy


echo "HAProxy setup complete."