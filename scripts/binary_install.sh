#!/bin/bash

set -e
set -u

download_dir="/usr/local/bin"

polkadot_path="$download_dir/polkadot"
# Function to download and install a binary
download_and_install() {
    local binary_name="$1"
    local version="$2"
    local url="https://github.com/paritytech/polkadot-sdk/releases/download/${binary_name}-${version}/${binary_name}"
    local path="$PARACHAIN_DIR/$binary_name"

    if [ ! -f "$path" ]; then
        echo "Downloading $binary_name version $version..."
        mkdir -p "$PARACHAIN_DIR"
        if ! wget -O "$path" "$url"; then
            echo "ERROR: Download failed for $binary_name."
            exit 1
        fi
        chmod +x "$path"
        echo "$binary_name binary downloaded to $path"
    else
        echo "$binary_name binary found at $path"
    fi
}

# # Download and install polkadot
# download_and_install "polkadot" "$POLKA_VERSION"

# # Download and install polkadot-parachain
# download_and_install "polkadot-parachain" "$POLKA_VERSION"



