#!/bin/bash

set -e
set -u

SCRIPT_DIR=$(realpath $(dirname "${BASH_SOURCE[0]}"))
# Load environment variables from .env file
if [ -f ".env" ]; then
  source "$SCRIPT_DIR/../perfuse/.env"
else
  echo "ERROR: .env file not found."
  exit 1
fi
download_dir="/usr/local/bin"

binaries_name=("polkadot" "polkadot-parachain" "polkadot-execute-worker" "polkadot-prepare-worker")

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

for i in "${!binaries_name[@]}"; do
  download_and_install "${binaries_name[i]}" "$POLKA_VERSION"
done

