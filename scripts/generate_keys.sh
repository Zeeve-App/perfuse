#!/bin/bash

set -e       # Exit on error
set -u       # Fail on unset variables

# Key generation variables

# Function to generate node keys for relaychain or parachain
generate_node_keys() {
    local node_name="$1"
    local key_dir="$2"
    local key_count="$3"

    mkdir -p "$key_dir"
    for i in $(seq 1 $key_count); do
        key_file="$key_dir/${node_name}_node_key_$i.txt"
        echo "Generating $node_name node key and saving to: $key_file"
        if [ "$node_name" = "relaychain" ]; then
            /usr/local/bin/polkadot key generate-node-key --file "$key_file"
        else
            /usr/local/bin/polkadot-parachain key generate-node-key --file "$key_file"
        fi
    done
}

