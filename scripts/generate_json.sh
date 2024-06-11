#!/bin/bash

set -e       # Exit on error
set -u       # Fail on unset variables

RELAYCHAIN_DIR="${RELAYCHAIN_DIR:-/home/perfuse/relaychain}" # Customizable relaychain directory
PARACHAIN_DIR="${PARACHAIN_DIR:-/home/perfuse/parachain}" # Customizable parachain directory
CHAINSPEC_FILE="/home/perfuse/parachain/chainspec.json"              # Customizable chainspec file

# Functions

build_relaychain_spec() {
    echo "Building relay chain spec..."
    "/usr/local/bin/polkadot" build-spec \
        --chain rococo-local \
        --raw \
        --disable-default-bootnode > "$RELAYCHAIN_DIR/rococo_relay_chain_spec_raw.json"
    echo "Relay chain spec created."
}

# modify_chainspec() {
#     echo "Modifying chain spec..."
#     sudo cp "$CHAINSPEC_FILE" "$PARACHAIN_DIR/new-parachain-chainspec.json"
#     echo "Chain spec modified."
# }

build_parachain_spec() {
    echo "Building parachain spec..."
    "/usr/local/bin/"polkadot-parachain build-spec \
        --chain new-parachain-chainspec.json \
        --disable-default-bootnode > "$PARACHAIN_DIR/raw-parachain-chainspec.json"
    echo "Parachain spec created."
}

generate_genesis_wasm() {
    echo "Generating genesis state and WASM..."
    "/usr/local/bin/polkadot-parachain" export-genesis-state --chain raw-parachain-chainspec.json "$PARACHAIN_DIR/para-genesis-state"
    "/usr/local/bin/polkadot-parachain" export-genesis-wasm --chain raw-parachain-chainspec.json "$PARACHAIN_DIR/para-wasm"

    if [ ! -f "$PARACHAIN_DIR/para-genesis-state" ]; then
        echo "ERROR: Genesis files creation failed."
        exit 1
    fi

    # Create checksums file
    echo "{" > "$PARACHAIN_DIR/checksums.json"
    md5sum "$PARACHAIN_DIR/para-genesis-state" "$PARACHAIN_DIR/para-wasm" | 
        awk '{print "\"" $2 "\": \"" $1 "\","}' | sed '$ s/.$//' >> "$PARACHAIN_DIR/checksums.json"
    echo "}" >> "$PARACHAIN_DIR/checksums.json"

    # Create ZIP archive (optional, for easier distribution)
    sudo zip -0 -q "$PARACHAIN_DIR/genesis.zip" "$PARACHAIN_DIR/para-genesis-state" "$PARACHAIN_DIR/para-wasm" "$PARACHAIN_DIR/checksums.json"
    echo "Genesis state and WASM files created."
}

# Step 1: Build Relay Chain Spec
build_relaychain_spec

# Step 2: Modify Chain Spec
modify_chainspec

# Step 3: Build Parachain Spec 
build_parachain_spec

# Step 4: Create Genesis and WASM
generate_genesis_wasm 