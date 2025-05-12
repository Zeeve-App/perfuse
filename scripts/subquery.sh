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

# Exit on errors
set -e  

SCRIPT_DIR=$(realpath $(dirname "${BASH_SOURCE[0]}"))
# Load environment variables from .env file
if [ -f "$SCRIPT_DIR/../perfuse/.env.subquery" ]; then
    source "$SCRIPT_DIR/../perfuse/.env.subquery"
    echo "Env Variables Loaded"
else
    echo "ERROR: .env file not found."
    exit 1
fi

export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

log() {
    echo -e "[INFO] $1"
}

error_exit() {
    echo -e "[ERROR] $1"
    exit 1
}

download_files() {
    local base_url="https://raw.githubusercontent.com/Mrigesh901/subquery-deploy/refs/heads/main"
    local files=("compose-prerequisite.yaml" "compose-subquery.yaml" "start-prerequisite.sh" 
                 "stop-prerequisite.sh" "start-subquery.sh" "stop-subquery.sh" ".env" "docker/load-extensions.sh" "docker/pg-Dockerfile")
    
    for file in "${files[@]}"; do
        log "Downloading $file..."
        wget -q "$base_url/$file" || error_exit "Failed to download $file"
    done
}

# Directory setup
SUBQUERY_DIR="$SCRIPT_DIR/../../subquery"
mkdir -p "$SUBQUERY_DIR/scripts/docker"

# Download necessary files
pushd "$SUBQUERY_DIR/scripts" > /dev/null
download_files
mv load-extensions.sh docker && mv pg-Dockerfile docker
popd > /dev/null


# Check SUBQL_ACCESS_TOKEN
if [ -z "$SUBQL_ACCESS_TOKEN" ]; then
    error_exit "SUBQL_ACCESS_TOKEN is not set in the .env file"
fi

# Clone SubQuery starter project if not already present
pushd "$SUBQUERY_DIR" > /dev/null
if [ ! -d "subql-starter" ]; then
    log "Cloning SubQuery starter project..."
    git clone https://github.com/subquery/subql-starter.git || error_exit "Failed to clone subql-starter"
else
    log "subql-starter already exists, skipping clone."
fi
popd > /dev/null

# Set up SubQuery starter project
pushd "$SUBQUERY_DIR/subql-starter/Polkadot/Polkadot-starter" > /dev/null

log "Checking npm availability..."
if ! command -v npm &> /dev/null; then
    error_exit "npm not found. Please ensure npm is installed and available in the PATH."
else
    log "npm is installed. Using npm from: $(which npm)"
fi

# Fetch genesis hash from the RPC node
RPC_ENDPOINT="http://$(hostname -I | awk '{print $1}')/${RPC_API_KEY}/para-rpc"

GENESIS_HASH=$(curl -s -H "Content-Type: application/json" \
-d '{"jsonrpc":"2.0","method":"chain_getBlockHash","params":[0],"id":1}' \
"$RPC_ENDPOINT" | jq -r '.result')

if [ -z "$GENESIS_HASH" ]; then
    error_exit "Failed to retrieve genesis hash from the node."
fi

# Update project.ts with the new genesis hash
sed -i '/network:/,/}/{ 
    /chainId:/ {
        N
        s/chainId:\n[[:space:]]*\"0x[0-9a-zA-Z]*\"/chainId:\n      \"'$GENESIS_HASH'\"/
    }
    /endpoint:/s/endpoint:\s*\".*\"/\/\/ &/
}' project.ts
log "Updated chainId with genesis hash: $GENESIS_HASH in project.ts"

# ------------------------------------------------------------------------

echo "Handeling Conversion of type"
ORIGINAL='amount: (amount as Balance).toBigInt()'
REPLACEMENT='amount: ((amount as unknown) as Balance).toBigInt()'

if [ ! -f "$SUBQUERY_DIR/subql-starter/Polkadot/Polkadot-starter/src/mappings/mappingHandlers.ts" ]; then
  echo "File mappingHandlers.ts not found!"
fi

if grep -qF "$ORIGINAL" "$SUBQUERY_DIR/subql-starter/Polkadot/Polkadot-starter/src/mappings/mappingHandlers.ts"; then
  sed -i.bak "s|$ORIGINAL|$REPLACEMENT|" "$SUBQUERY_DIR/subql-starter/Polkadot/Polkadot-starter/src/mappings/mappingHandlers.ts"
  echo "Typecasting handled successfully"
else
  echo "Original line not found in the file."
fi

#-------------------------------------------------------------------------


log "Installing dependencies and building project..."
npm install || error_exit "npm install failed"
npm run codegen || error_exit "npm run codegen failed"
npm run build || error_exit "npm run build failed"

log "Installing SubQuery CLI tools..."
npm install -g @subql/cli @subql/common-substrate || error_exit "Failed to install SubQuery CLI tools"
popd > /dev/null

# Start prerequisites
pushd "$SUBQUERY_DIR/scripts" > /dev/null
log "Starting prerequisites..."
bash start-prerequisite.sh || error_exit "Failed to start prerequisites"
popd > /dev/null

# Publish SubQuery project
pushd "$SUBQUERY_DIR/subql-starter/Polkadot/Polkadot-starter" > /dev/null
log "Publishing SubQuery project..."
PUBLISH_RESULT=$(export SUBQL_ACCESS_TOKEN=$SUBQL_ACCESS_TOKEN && subql publish --ipfs=http://localhost:5001/api/v0) || error_exit "subql publish failed"
IPFS_HASH=$(echo "$PUBLISH_RESULT" | grep -oP 'Qm\w+') || error_exit "Failed to extract IPFS hash"
# grep -oP '\b[a-zA-Z0-9]{46,59}\b'
log "IPFS hash obtained: $IPFS_HASH"
popd > /dev/null

# Update .env with IPFS hash
pushd "$SUBQUERY_DIR/scripts" > /dev/null
log "Updating .env file with IPFS hash..."
WS_ENDPOINT="ws://$(hostname -I | awk '{print $1}')/${RPC_API_KEY}/para-rpc"
sed -i "s/^SUBQUERY_IPFS=.*/SUBQUERY_IPFS=$IPFS_HASH/" .env || error_exit "Failed to update SUBQUERY_IPFS"
sed -i "s/^SUBQUERY_NAME=.*/SUBQUERY_NAME=MyPerfuseSubQuery/" .env
sed -i "s#^RPC_ENDPOINT=.*#RPC_ENDPOINT=$WS_ENDPOINT#" .env

# Start SubQuery service
log "Starting SubQuery service..."
sudo bash start-subquery.sh || error_exit "Failed to start SubQuery"
popd > /dev/null

log "SubQuery deployment completed successfully!"
