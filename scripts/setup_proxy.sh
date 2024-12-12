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

install_nginx() {
  if ! command -v nginx &> /dev/null; then
    echo "Installing Nginx and Certbot..."
    sudo apt-get update && sudo apt-get install -y nginx certbot python3-certbot-nginx
  else
    echo "Nginx is already installed. Skipping..."
  fi
}

# Variables
NGINX_CONF="/etc/nginx/sites-enabled/perfuse.conf"
JSAPPS_PATH="/var/www/jsapps"
STATESCAN_PATH="/var/www/statescan"

# Ports
RELAY_RPC_PORT=9900
PARA_RPC_PORT=9010
PERFUSE_PORT=3000
SIDECAR_PORT=9099
GRAFANA_PORT=9111
POLKADOTJS_PORT=8080
STATESCAN_PORT=4334

# Ensure necessary directories exist
sudo mkdir -p "$JSAPPS_PATH"
sudo mkdir -p "$STATESCAN_PATH"

# Add sample files for jsapps and statescan
# echo "Sample JS App" | sudo tee "$JSAPPS_PATH/index.html" > /dev/null
# echo "Sample Statescan" | sudo tee "$STATESCAN_PATH/index.html" > /dev/null

# Generate Nginx Configuration
sudo bash -c "cat > $NGINX_CONF" <<EOL
server {
    listen 80 default_server;
    listen [::]:80 default_server;

    location / {
        proxy_http_version 1.1;
        proxy_connect_timeout 60s;
        proxy_set_header Host       \$http_host;
        proxy_set_header Upgrade    \$http_upgrade;
        proxy_set_header Connection "upgrade";
        proxy_set_header X-Real-IP  \$remote_addr;
        proxy_set_header X-NginX-Proxy true;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;

        location / {
            proxy_pass http://127.0.0.1:${PERFUSE_PORT};
        }
        location /${RPC_API_KEY}/api {
            proxy_pass http://127.0.0.1:${SIDECAR_PORT};
        }                
        location /${RPC_API_KEY}/para-rpc {
            proxy_pass http://127.0.0.1:${PARA_RPC_PORT};
        }                
        location /${RPC_API_KEY}/grafana {
            proxy_pass http://127.0.0.1:${GRAFANA_PORT};
        }
        location /${RPC_API_KEY}/polkadotjs/ {
            alias ${JSAPPS_PATH}/;
            try_files \$uri \$uri/ =404;
        }
        location /${RPC_API_KEY}/statescan/ {
            alias ${STATESCAN_PATH}/;
            rewrite ^/imgs/(.*)\$ /${RPC_API_KEY}/statescan/imgs/\$1 last;
            try_files \$uri \$uri/ =404;
        }
    }
}
EOL

# Test and Reload Nginx
echo "Testing Nginx configuration..."
if sudo nginx -t; then
    echo "Reloading Nginx..."
    sudo systemctl daemon-reload
    sudo systemctl reload nginx
    echo "Nginx configuration updated successfully!"
else
    echo "Error in Nginx configuration. Please check logs."
    exit 1
fi
