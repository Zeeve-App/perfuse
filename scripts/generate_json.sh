#!/bin/bash

set -e       # Exit on error
set -u       # Fail on unset variables

SCRIPT_DIR=$(realpath $(dirname "${BASH_SOURCE[0]}"))
RELAYCHAIN_DIR="${RELAYCHAIN_DIR:-/home/perfuse/relaychain}" # Customizable relaychain directory
PARACHAIN_DIR="${PARACHAIN_DIR:-/home/perfuse/parachain}" # Customizable parachain directory
if [ $TEMPLATE = "custom" ] ; then
CHAINSPEC_FILE="$SCRIPT_DIR/../perfuse/chainspec.json"
elif [ $TEMPLATE = "substrate" ]
CHAINSPEC_FILE="$SCRIPT_DIR/../public/template/substrate.json"
else
CHAINSPEC_FILE="$SCRIPT_DIR/../public/template/evm_frontier.json"
fi
PARACHAIN_ID=2000

mkdir -p /home/perfuse/{relaychain,parachain}

# Functions

build_relaychain_spec() {
    echo "Building relay chain spec..."
    "/usr/local/bin/polkadot" build-spec \
        --chain rococo-local \
        --raw \
        --disable-default-bootnode | sudo tee "$RELAYCHAIN_DIR/rococo_relay_chain_spec_raw.json" &> /dev/null
    echo "Relay chain spec created."
}

build_parachain_spec() {
    echo "Building parachain spec..."
    /usr/local/bin/polkadot-parachain build-spec \
    --disable-default-bootnode | sudo tee ${PARACHAIN_DIR}/plain-parachain-chainspec.json &> /dev/null

    echo 'Plain Parachain Specs Created................'
    echo "Modifying chain spec..."
    if command -v jq &> /dev/null; then
            jq ".genesis.runtimeGenesis.parachainInfo.parachainId = $PARACHAIN_ID | .para_id = $PARACHAIN_ID" ${PARACHAIN_DIR}/plain-parachain-chainspec.json | sudo tee "$PARACHAIN_DIR/new-parachain-chainspec.json" &> /dev/null
            /usr/local/bin/polkadot-parachain build-spec \
                --chain $PARACHAIN_DIR/new-parachain-chainspec.json \
                --disable-default-bootnode --raw | sudo tee "$PARACHAIN_DIR/raw-parachain-chainspec.json" &> /dev/null
        else
            echo "WARNING: 'jq' not found. Chainspec modification skipped. Please install 'jq' if you need to modify the chainspec."
        fi
    echo "Chain spec modified."
}

modify_chainspec() {
    echo "Modifying chain spec..."
    sudo cp "$CHAINSPEC_FILE" "$PARACHAIN_DIR/plain-parachain-chainspec.json"
    /usr/local/bin/polkadot-parachain build-spec \
        --chain $PARACHAIN_DIR/plain-parachain-chainspec.json \
        --disable-default-bootnode --raw | sudo tee "$PARACHAIN_DIR/raw-parachain-chainspec.json" &> /dev/null
    echo "Chain spec modified."
}

generate_genesis_wasm() {
    echo "Generating genesis state and WASM..."
    "/usr/local/bin/polkadot-parachain" export-genesis-state --chain $PARACHAIN_DIR/raw-parachain-chainspec.json "$PARACHAIN_DIR/para-genesis-state"
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
    sudo zip -0 -q "$PARACHAIN_DIR/genesis.zip" "$PARACHAIN_DIR/para-genesis-state" "$PARACHAIN_DIR/para-wasm" "$PARACHAIN_DIR/checksums.json"
    echo "Genesis state and WASM files created."
}

# Step 1: Build Relay Chain Spec
build_relaychain_spec

# Step 2: Modify or Build Chain Spec
if [ -f "$CHAINSPEC_FILE" ]; then  # Check if chainspec file exists
    modify_chainspec
else
    build_parachain_spec
fi

# Step 3: Create Genesis and WASM
generate_genesis_wasm