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
HAPROXY_CONFIG_FILE="/etc/haproxy/haproxy.cfg"  # Adjust if your HAProxy config is in a different location
RPC_PORT=9010  # Frontend port for HAProxy
PERFUSE_PORT=3000

# Function to install HAProxy (optional)
install_haproxy() {
  if ! command -v haproxy &> /dev/null; then
    echo "Installing HAProxy..."
    sudo apt-get update && sudo apt-get install -y haproxy whois  # Adjust for your package manager
  else
    echo "HAProxy is already installed. Skipping...."
  fi
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

# Function to create the HAProxy configuration
add_frontend_backend() {

  if [[ "$AUTH_METHOD" == "basic_auth" ]]; then
  add_basic_auth
  fi
  frontend_config="
frontend rpc_frontend
    bind *:80
    acl is_rpc_request path_beg -i /${RPC_API_KEY:+${RPC_API_KEY}/}rpc"
    if [[ "$AUTH_METHOD" == "basic_auth" ]]; then
    frontend_config+="
    http-request auth unless { http_auth(authorized_users) }"
    fi
    frontend_config+="
    use_backend rpc_backend if is_rpc_request
    default_backend perfuse_ui"

  local backend_config="
backend rpc_backend
    mode http
    balance roundrobin
    option forwardfor
    http-request set-header X-Forwarded-Proto https if { ssl_fc }
    server substrate_rpc_1 127.0.0.1:${RPC_PORT}"

  local perfuse_ui_config="
backend perfuse_ui
    mode http
    balance roundrobin
    option forwardfor
    http-request set-header X-Forwarded-Proto https if { ssl_fc }
    server perfuse_ui 127.0.0.1:${PERFUSE_PORT}"

  # Check if frontend and backend already exist
  if grep -q "^frontend rpc_frontend" "$HAPROXY_CONFIG_FILE" || grep -q "^backend rpc_backend" "$HAPROXY_CONFIG_FILE"; then
    echo "Frontend or backend configuration already exists in $HAPROXY_CONFIG_FILE"
    return
  fi

  # Append the configuration blocks
  echo "$frontend_config" | sudo tee -a "$HAPROXY_CONFIG_FILE" >/dev/null
  echo "$backend_config" | sudo tee -a "$HAPROXY_CONFIG_FILE" >/dev/null
  echo "$perfuse_ui_config" | sudo tee -a "$HAPROXY_CONFIG_FILE" >/dev/null


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
restart_haproxy

echo "HAProxy setup complete."