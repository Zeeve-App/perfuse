#!/bin/bash

set -e
set -u

SCRIPT_DIR=$(realpath $(dirname "${BASH_SOURCE[0]}"))
# Load environment variables from .env file
if [ -f ".env" ]; then
  source "$SCRIPT_DIR/../.env"
else
  echo "ERROR: .env file not found."
  exit 1
fi
download_dir="/usr/local/bin"

polkadot_path="$download_dir/polkadot"
# Function to download and install a binary
download_and_install() {
    local binary_name="$1"
    local version="$2"
    local url="https://github.com/paritytech/polkadot-sdk/releases/download/polkadot-${version}/${binary_name}"
    local path="$download_dir/$binary_name"

    if [ ! -f "$path" ]; then
        echo "Downloading $binary_name version $version..."
        mkdir -p "$download_dir"
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
download_and_install "polkadot" "$POLKA_VERSION"

# # Download and install polkadot-parachain
download_and_install "polkadot-parachain" "$POLKA_VERSION"



