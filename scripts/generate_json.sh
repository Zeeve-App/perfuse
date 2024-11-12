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

SCRIPT_DIR=$(realpath $(dirname "${BASH_SOURCE[0]}"))
# Load environment variables from .env file
if [ -f "$SCRIPT_DIR/../perfuse/.env" ]; then
  source "$SCRIPT_DIR/../perfuse/.env"
  echo "Env Variables Loaded"
else
  echo "ERROR: .env file not found."
  exit 1
fi

SCRIPT_DIR=$(realpath $(dirname "${BASH_SOURCE[0]}"))
RELAYCHAIN_DIR="${RELAYCHAIN_DIR:-/home/perfuse/relaychain}" # Customizable relaychain directory
PARACHAIN_DIR="${PARACHAIN_DIR:-/home/perfuse/parachain}" # Customizable parachain directory
CHAINSPEC_FILE="$SCRIPT_DIR/../perfuse/chainspec.json"


mkdir -p /home/perfuse/{relaychain,parachain}

# Functions

build_relaychain_spec() {
    echo "Building relay chain spec..."
    wget -O "$RELAYCHAIN_DIR/paseo_relay_chain_spec_raw.json" https://github.com/paseo-network/paseo-chain-specs/raw/refs/heads/main/paseo.raw.json &> /dev/null
    echo "Relay chain spec created."
}

build_raw_chainspec() {
    echo "Building raw chain spec..."
    sudo cp "$CHAINSPEC_FILE" "$PARACHAIN_DIR/plain-parachain-chainspec.json"

    /usr/local/bin/polkadot-parachain build-spec \
        --chain $PARACHAIN_DIR/plain-parachain-chainspec.json \
        --disable-default-bootnode --raw | sudo tee "$PARACHAIN_DIR/raw-parachain-chainspec.json" &> /dev/null
    echo "Chain spec modified."
}

generate_genesis_state_wasm() {
    echo "Generating genesis state and WASM..."
    "/usr/local/bin/polkadot-parachain" export-genesis-head --chain $PARACHAIN_DIR/raw-parachain-chainspec.json "$PARACHAIN_DIR/para-genesis-state"
    "/usr/local/bin/polkadot-parachain" export-genesis-wasm --chain $PARACHAIN_DIR/raw-parachain-chainspec.json "$PARACHAIN_DIR/para-wasm"

    if [ ! -f "$PARACHAIN_DIR/para-genesis-state" ]; then
        echo "ERROR: Genesis files creation failed."
        exit 1
    fi

    # Create checksums file
    echo "{" | sudo tee "$PARACHAIN_DIR/checksums.json"
    md5sum "$PARACHAIN_DIR/para-genesis-state" "$PARACHAIN_DIR/para-wasm" | 
        awk '{print "\"" $2 "\": \"" $1 "\","}' | sed '$ s/.$//' | sudo tee -a "$PARACHAIN_DIR/checksums.json" &> /dev/null
    echo "}" | sudo tee -a "$PARACHAIN_DIR/checksums.json" &> /dev/null

    # Create ZIP archive (optional, for easier distribution)
    if ! command -v zip &> /dev/null; then
        echo "zip not found, installing ..."
        sudo apt-get update -y && sudo apt-get install -y zip
    fi
    sudo zip -0 -q "$PARACHAIN_DIR/genesis.zip" "$PARACHAIN_DIR/para-genesis-state" "$PARACHAIN_DIR/para-wasm" "$PARACHAIN_DIR/checksums.json"
    echo "Genesis state and WASM files created."
}

# Step 1: Build Relay Chain Spec
build_relaychain_spec

# Step 2: Modify or Build Chain Spec
if [ -f "$CHAINSPEC_FILE" ]; then  # Check if chainspec file exists
    echo "Chainspec file for parachain not found"
    exit 1
else
    build_raw_chainspec
fi

# Step 3: Create Genesis and WASM
generate_genesis_state_wasm