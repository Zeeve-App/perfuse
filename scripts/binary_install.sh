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

SCRIPT_DIR=$(realpath $(dirname "${BASH_SOURCE[0]}"))
# Load environment variables from .env file
if [ -f "$SCRIPT_DIR/../perfuse/.env" ]; then
  source "$SCRIPT_DIR/../perfuse/.env"
  echo "Env Variables Loaded"
else
  echo "ERROR: .env file not found."
  exit 1
fi

download_dir="/usr/local/bin"

#binaries_name=("polkadot" "polkadot-parachain" "polkadot-execute-worker" "polkadot-prepare-worker")
binaries_name=("polkadot" "polkadot-parachain")

# Function to download and install a binary
download_and_install() {
    local binary_name="$1"
    local version="$2"
  if [[ $TEMPLATE == "evm_frontier" && $binary_name == "polkadot-parachain" ]] ; then
    # local url="https://github.com/Zeeve-App/perfuse/releases/download/v0.0.2-alpha/popcli-evm-substrate"
    local url="https://github.com/rahul-mnz/squid-k8s/releases/download/test/popcli-evm-substrate"
  else 
    local url="https://github.com/paritytech/polkadot-sdk/releases/download/polkadot-${version}/${binary_name}"
  fi
    local path="$download_dir/$binary_name"

    if [ ! -f "$path" ]; then
        echo "Downloading $binary_name version $version..."
        mkdir -p "$download_dir"
        if ! wget -O "$path" "$url" > /dev/null; then
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

