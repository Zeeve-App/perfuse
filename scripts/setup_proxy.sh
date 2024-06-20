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
RELAY_RPC_PORT=9345  # Frontend port for HAProxy
PARA_RPC_PORT=9010
PERFUSE_PORT=3000

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

# Function to create the HAProxy configuration
add_frontend_backend() {

  if [[ "$AUTH_METHOD" == "basic_auth" ]]; then
  add_basic_auth
  fi
  frontend_config="
frontend rpc_frontend
    bind *:80
#    bind *:443 ssl crt /etc/haproxy/ssl/${DOMAIN}.pem alpn h2,http/1.1
#    http-request redirect scheme https unless { ssl_fc }
    acl letsencrypt-acl path_beg /.well-known/acme-challenge/
    acl is_relay_rpc path_beg -i /${RPC_API_KEY:+${RPC_API_KEY}/}relay-rpc
    acl is_para_rpc path_beg -i /${RPC_API_KEY:+${RPC_API_KEY}/}para-rpc"
    if [[ "$AUTH_METHOD" == "basic_auth" ]]; then
    frontend_config+="
    http-request auth unless { http_auth(authorized_users) }"
    fi
    frontend_config+="
    use_backend letsencrypt-backend if letsencrypt-acl
    use_backend relay_rpc_backend if is_relay_rpc
    use_backend para_rpc_backend if is_para_rpc
    default_backend perfuse_ui"

  local relay_backend_config="
backend relay_rpc_backend
    mode http
    balance roundrobin
    option forwardfor
    server relaychain_rpc_1 127.0.0.1:${RELAY_RPC_PORT}"
  local parachain_backend_config="
backend para_rpc_backend
    mode http
    balance roundrobin
    option forwardfor
    server substrate_rpc_1 127.0.0.1:${PARA_RPC_PORT}"

  local perfuse_ui_config="
backend perfuse_ui
    mode http
    balance roundrobin
    option forwardfor
    server perfuse_ui 127.0.0.1:${PERFUSE_PORT}"

  local certbot_config="
backend letsencrypt-backend
    server certbot 127.0.0.1:8888"

  # Check if frontend and backend already exist
  if grep -q "^frontend rpc_frontend" "$HAPROXY_CONFIG_FILE" || grep -q "^backend rpc_backend" "$HAPROXY_CONFIG_FILE"; then
    echo "Frontend or backend configuration already exists in $HAPROXY_CONFIG_FILE"
    return
  fi

  # Append the configuration blocks
  echo "$frontend_config" | sudo tee -a "$HAPROXY_CONFIG_FILE" >/dev/null
  echo "$relay_backend_config" | sudo tee -a "$HAPROXY_CONFIG_FILE" >/dev/null
  echo "$parachain_backend_config" | sudo tee -a "$HAPROXY_CONFIG_FILE" >/dev/null
  echo "$perfuse_ui_config" | sudo tee -a "$HAPROXY_CONFIG_FILE" >/dev/null
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
restart_haproxy
obtain_renew_ssl_certificate
restart_haproxy


echo "HAProxy setup complete."