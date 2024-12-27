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

# helper function to exit at error
error_exit() {
    echo "[ERROR] $1"
    exit 1
}


SCRIPT_DIR=$(realpath $(dirname "${BASH_SOURCE[0]}"))
# Load environment variables from .env file
if [ -f "$SCRIPT_DIR/../perfuse/.env" ]; then
    source "$SCRIPT_DIR/../perfuse/.env"
    echo "Env Variables Loaded"
else
    echo "ERROR: .env file not found."
    exit 1
fi

# configuration variables
REPO_URL="https://github.com/opensquare-network/statescan-v2.git"
WORK_DIR="/home/perfuse/statescan_setup"
FILES_REPO_URL="https://raw.githubusercontent.com/Mrigesh901/statescan/refs/heads/main"
PERFUSE_JS_PATH="site/src/utils/consts/chains/perfuse.js"
CHAINSPEC_FILE="$SCRIPT_DIR/../perfuse/chainspec.json"

cd $SCRIPT_DIR/../../
# Clone the repository
if [ ! -d "statescan-v2" ]; then
    echo "Cloning the statescan repository..."
    git clone "$REPO_URL"
else
    echo "Repository already exists, skipping clone."
fi

cd statescan-v2

# Install Yarn (if not installed)
if ! command -v yarn &> /dev/null; then
    echo "Installing Yarn..."
    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    npm install --global yarn
else
    echo "Yarn is already installed, skipping installation."
fi

# Install Docker Toolkit

if ! command -v docker &>/dev/null || ! command -v docker-compose &>/dev/null; then
    echo "Installing Docker and Docker Compose..."
    sudo apt-get update
    sudo apt-get install ca-certificates curl
    sudo install -m 0755 -d /etc/apt/keyrings
    sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
    sudo chmod a+r /etc/apt/keyrings/docker.asc

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$UBUNTU_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
  sudo apt-get update

#Install Docker and Docker Compose
sudo apt-get -y install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin
sudo systemctl start docker && sudo systemctl enable docker
else
    echo "Docker and Docker Compose are already installed."
    sudo systemctl restart docker
fi
echo "Dependencies installed successfully."


# Remove "packageManager" from package.json files
remove_package_manager_entry() {
    local file=$1
    if grep -q '"packageManager": "yarn@' "$file"; then
        echo "Removing 'packageManager' entry from $file..."
        sed -i '/},/ {N;s/},\n  "packageManager": "yarn@[^"].*"//}' "$file"
        echo "}" >> "$file"
    else
        echo "'packageManager' entry not found in $file."
    fi
}

remove_package_manager_entry "package.json"
cd backend
remove_package_manager_entry "package.json"
cd ..

# Download additional files
sudo mkdir -p $WORK_DIR
sudo chown -R $SCRIPT_USER:$SCRIPT_USER $WORK_DIR
cd backend

FILES=(".dockerignore" "backend-dockerfile" "backend-scan.dockerfile" "scan.pm2.yaml" "compose.yaml")
for file in "${FILES[@]}"; do
    echo "Downloading $file..."
    curl -L -o "$WORK_DIR/$file" "$FILES_REPO_URL/$file"
done

mv "$WORK_DIR/.dockerignore" . || error_exit ".dockerignore not found"
mv "$WORK_DIR/backend-dockerfile" ./Dockerfile || error_exit "dockerfile not found"
mv "$WORK_DIR/backend-scan.dockerfile" ./scan.dockerfile || error_exit "scan.dockerfile not found"
mv "$WORK_DIR/scan.pm2.yaml" ./ || error_exit "scan.pm2 not found"
mv "$WORK_DIR/compose.yaml" ../ || error_exit "compose.yaml not found"
echo "Files moved to backend directory."




# Set up WebSocket endpoint variable
WS_ENDPOINT="ws://$(hostname -I | awk '{print $1}')/${RPC_API_KEY}/para-rpc"
sed -i "s|wss://abc.zeeve.net/rpc|$WS_ENDPOINT|g" scan.pm2.yaml

cd ..
sed -i "s|wss://abc.zeeve.net/rpc|$WS_ENDPOINT|g" compose.yaml
# Start backend services
if [ ! -f "compose.yaml" ]; then
    echo "compose.yaml not found"
    exit 1
fi

echo "Starting backend services with Docker Compose..."
sudo docker compose up -d

# Configure site directory
cd site

# Function to update .env file
update_env_file() {
    local env_example=".env.example"
    local env_file=".env"
    
    # Get the server IP dynamically
    local server_ip
    server_ip=$(hostname -I | awk '{print $1}')

    # Ensure .env.example exists
    if [[ ! -f "$env_example" ]]; then
        echo "Error: $env_example file not found!"
        return 1
    fi

    # Copy .env.example to .env
    cp "$env_example" "$env_file"

    # Update values in .env
    sed -i "s|^REACT_APP_PUBLIC_IDENTITY_SERVER_HOST=.*|REACT_APP_PUBLIC_IDENTITY_SERVER_HOST=http://${server_ip}:5011|" "$env_file"
    sed -i "s|^REACT_APP_PUBLIC_API_END_POINT=.*|REACT_APP_PUBLIC_API_END_POINT=http://${server_ip}:5010/|" "$env_file"
    sed -i "s|^REACT_APP_PUBLIC_GRAPHQL_API_END_POINT=.*|REACT_APP_PUBLIC_GRAPHQL_API_END_POINT=http://${server_ip}:7100/|" "$env_file"
    sed -i "s|^#REACT_APP_BROWSER_ROUTER=.*|REACT_APP_BROWSER_ROUTER=1|" "$env_file"
    sed -i "s|^REACT_APP_PUBLIC_CHAIN=.*|REACT_APP_PUBLIC_CHAIN=$NETWORK_TYPE|" "$env_file"
    echo ".env file has been updated with the server IP: $server_ip"
}


if [ ! -f .env ]; then
    echo "Copying .env.example to .env..."
    # Call the function
    update_env_file
fi

# Download Dockerfile for site
if [ ! -f "dockerfile" ]; then
    echo "Downloading Dockerfile for site..."
    curl -o "$WORK_DIR/dockerfile" "$FILES_REPO_URL/frontend.dockerfile"
    mv "$WORK_DIR/dockerfile" .
    echo "Dockerfile moved to site directory."
fi

remove_package_manager_entry "package.json"

echo "Adding homepage property in package.json"

jq --arg RPC_API_KEY "$RPC_API_KEY" '.["homepage"] = "/\($RPC_API_KEY)\/statescan/"' package.json > package.json.new && mv package.json.new package.json

#update browser router property 
echo "updating browser router property"
sed -i "s/<Router>/<Router basename=\"\/$RPC_API_KEY\/statescan\/\">/g" src/App.js || error_exit "sed command failed while updating browser router"

# edit index.js to add support for custom parachain
sed -i '1i import perfuse from "./perfuse";' "src/utils/consts/chains/index.js" || error_exit "sed command failed while updating perfuse chain in src/utils/consts/chains/index.js"
sed -i '/const chains = {/a \  perfuse,' "src/utils/consts/chains/index.js" || error_exit "sed command failed while updating perfuse chain in src/utils/consts/chains/index.js"

# delete lines from index.js to disable dropdown options
sed -i '/<NodeSwitch \/>/d' "src/components/header/index.js" || error_exit "could not edit header/index.js"
sed -i '/<ChainSwitch mobile\/>/d' "src/components/header/index.js" || error_exit "could not edit header/index.js"
sed -i '/<ChainSwitch \/>/d' "src/components/header/index.js" || error_exit "could not edit header/index.js"
sed -i '/<MobileNodeSwitch \/>/d' "src/components/header/index.js" || error_exit "could not edit header/index.js"

if [[ ! -f "$CHAINSPEC_FILE" ]]; then
    echo "Error: File not found at $CHAINSPEC_FILE"
    return 1
fi
name=$(jq -r '.name' "$CHAINSPEC_FILE")
token_decimals=$(jq -r '.properties.tokenDecimals' "$CHAINSPEC_FILE")
token_symbol=$(jq -r '.properties.tokenSymbol' "$CHAINSPEC_FILE")

# Write the specified content to the file
cat <<EOF > "$PERFUSE_JS_PATH"
import GargantuaIcon from "../../../components/icons/gargantuaIcon";
import { collectivesModules } from "./collectives";

const nodes = [
  {
    name: "Perfuse",
    url: "${WS_ENDPOINT}",
  },
];

const perfuse = {
  name: "Perfuse",
  icon: <GargantuaIcon />,
  identity: "rococo",
  chain: "${name}",
  value: "${name}",
  symbol: "${token_symbol}",
  decimals: ${token_decimals},
  color: "#E13D90",
  colorSecondary: "rgba(225,61,144, 0.1)",
  modules: collectivesModules,
  nodes,
  useOnChainBlockData: true,
};

export default perfuse;
EOF

# Confirmation message
echo "perfuse.js has been created at $PERFUSE_JS_PATH"

# Install dependencies and start the application
echo "Installing dependencies with Yarn..."
yarn install
echo "Starting the application..."
yarn build

if [ ! -d "build" ]; then
    echo "Building site..."
    yarn build
else
    echo "site already build and ready to be served"
    sudo mkdir -p /var/www/statescan/
    sudo cp -ur build/* /var/www/statescan/
fi

# Cleanup temporary working directory
cd ../..
rm -rf "$WORK_DIR"

echo "Explorer setup completed successfully."
