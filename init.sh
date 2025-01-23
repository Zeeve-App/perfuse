#!/bin/bash

PARACHAIN_DIR="${PARACHAIN_DIR:-/home/perfuse/parachain}" # Customizable parachain directory
CHAINSPEC_FILE="/perfuse/perfuse/chainspec.json"

mkdir -p /home/perfuse/parachain

# Functions

build_raw_chainspec() {
    echo "Building raw chain spec..."
    cp "$CHAINSPEC_FILE" "$PARACHAIN_DIR/plain-parachain-chainspec.json"

    /usr/local/bin/polkadot-parachain build-spec \
        --chain $PARACHAIN_DIR/plain-parachain-chainspec.json \
        --disable-default-bootnode --raw | tee "$PARACHAIN_DIR/raw-parachain-chainspec.json" &> /dev/null
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
    echo "{" | tee "$PARACHAIN_DIR/checksums.json"
    md5sum "$PARACHAIN_DIR/para-genesis-state" "$PARACHAIN_DIR/para-wasm" | 
        awk '{print "\"" $2 "\": \"" $1 "\","}' | sed '$ s/.$//' | tee -a "$PARACHAIN_DIR/checksums.json" &> /dev/null
    echo "}" | tee -a "$PARACHAIN_DIR/checksums.json" &> /dev/null

    # Create ZIP archive (optional, for easier distribution)
    if ! command -v zip &> /dev/null; then
        echo "zip not found, installing ..."
        apt-get update -y && apt-get install -y zip
    fi
    zip -0 -q "$PARACHAIN_DIR/genesis.zip" "$PARACHAIN_DIR/para-genesis-state" "$PARACHAIN_DIR/para-wasm" "$PARACHAIN_DIR/checksums.json"
    echo "Genesis state and WASM files created."
}


# Step 1: Modify or Build Chain Spec
if [ -f "$CHAINSPEC_FILE" ]; then  # Check if chainspec file exists
    build_raw_chainspec
else
    echo "Chainspec file for parachain not found"
    exit 1
fi

# Step 2: Create Genesis and WASM
generate_genesis_state_wasm


# Load environment variables
parachain_key_dir="${PARACHAIN_KEY_DIR:-/home/perfuse/parachain_keys}"
chain_spec="$PARACHAIN_DIR/raw-parachain-chainspec.json"
extra_params="--unsafe-rpc-external --rpc-methods unsafe"
network=$NETWORK_TYPE
collator_num=$COL_NUM


generate_node_keys() {
    local node_name="$1"
    local key_dir="$2"
    local key_count="$3"

    mkdir -p "$key_dir"
    for i in $(seq 1 $key_count); do
        key_file="$parachain_key_dir/${node_name}_node_key_$i.txt"
        echo "Generating $node_name node key and saving to: $key_file"
        /usr/local/bin/polkadot key generate-node-key --file "$key_file"
    done
}

generate_node_keys collator $parachain_key_dir 2

