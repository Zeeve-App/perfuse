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
    npm install --global yarn || error_exit "yarn not installed"
else
    echo "Yarn is already installed, skipping installation."
fi

# Install Docker Toolkit

if ! command -v docker &>/dev/null  ! command -v docker-compose &>/dev/null; then
    echo "Installing Docker and Docker Compose..."
    sudo apt-get update
    sudo apt-get install -y docker.io docker-compose
else
    echo "Docker and Docker Compose are already installed."
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

# Start backend services
if [ ! -f "compose.yaml" ]; then
    echo "compose.yaml not found"
    exit 1
fi

echo "Starting backend services with Docker Compose..."
sudo docker compose up -d

# Configure site directory
cd site
if [ ! -f .env ]; then
    echo "Copying .env.example to .env..."
    cp .env.example .env
fi

# Download Dockerfile for site
if [ ! -f "dockerfile" ]; then
    echo "Downloading Dockerfile for site..."
    curl -o "$WORK_DIR/dockerfile" "$FILES_REPO_URL/frontend.dockerfile"
    mv "$WORK_DIR/dockerfile" .
    echo "Dockerfile moved to site directory."
fi

remove_package_manager_entry "package.json"

# Update "start" script in package.json
sed -i 's|"start": "BROWSER=none react-scripts start",|"start": "PORT=4334 BROWSER=none react-scripts start",|' package.json

# Install dependencies and start the application
echo "Installing dependencies with Yarn..."
yarn install
echo "Starting the application..."
yarn start &
SERVER_PID=$!

# Cleanup temporary working directory
cd ../..
rm -rf "$WORK_DIR"

echo "Explorer setup completed successfully."

trap "echo 'Stopping React server ...'; kill $SERVER_PID;
exit 0" SIGINT SIGTERM
wait

