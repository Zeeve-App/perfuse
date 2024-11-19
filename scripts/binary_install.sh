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

#download directory for binaries
download_dir="/usr/local/bin"

#ensure the download_dir exists
if [ ! -d "$download_dir" ]; then
  echo "Creating download directory: $download_dir"
  mkdir -p "$download_dir"
fi

#binaries that needs to be installed
binaries_name=("polkadot" "polkadot-parachain")

# Function to download and install a binary
download_and_install() {
    local binary_name="$1"
    local version="$2"
    local path="$download_dir/$binary_name"

    #Handle custom parachain binary
    if [[ $TEMPLATE == "custom" && $binary_name == "polkadot-parachain" ]]; then
          local custom_binary_path="$SCRIPT_DIR/../perfuse/polkadot-parachain"
          if [ -f "$custom_binary_path" ]; then
              echo "Custom binary detected for $binary_name. Copying to $path..."
              cp "$custom_binary_path" "$path"
              chmod +x "$path"
              echo "$binary_name binary copied to $path"
          else
              echo "ERROR: Custom binary for $binary_name not found at $custom_binary_path."
              exit 1
          fi
          return
    #set download url for evm parachain binary      
    elif [[ $TEMPLATE == "evm_frontier" && $binary_name == "polkadot-parachain" ]] ; then
      local url="https://github.com/Mrigesh901/pop/releases/download/0.1.0-06eb946759f/popcli-evm-substrate"

    #set download url for contracts parachain binary
    elif [[ $TEMPLATE == "contracts" && $binary_name == "polkadot-parachain" ]] ; then
      local url="https://github.com/Mrigesh901/pop/releases/download/0.1.0-06eb946759f/popcli-$TEMPLATE-substrate"

    #set download url for assets parachain binary
    elif [[ $TEMPLATE == "assets" && $binary_name == "polkadot-parachain" ]] ; then
      local url="https://github.com/Mrigesh901/pop/releases/download/0.1.0-06eb946759f/popcli-$TEMPLATE-substrate"
      
    #set download url for standard parachain binary
    elif [[ $TEMPLATE == "standard" && $binary_name == "polkadot-parachain" ]] ; then
      local url="https://github.com/Mrigesh901/pop/releases/download/0.1.0-06eb946759f/popcli-$TEMPLATE-substrate"
    
    #set download url for polkadot binary
    else 
      local url="https://github.com/paritytech/polkadot-sdk/releases/download/polkadot-${version}/${binary_name}"
    fi
      

      if [ ! -f "$path" ]; then
          echo "Downloading $binary_name version $version..."
          mkdir -p "$download_dir"
          if ! wget -O "$path" "$url" >/dev/null 2>&1; then
              echo "ERROR: Download failed for $binary_name."
              exit 1
          fi
          chmod +x "$path"
          echo "$binary_name binary downloaded to $path"
      else
          echo "$binary_name binary found at $path"
      fi
  }

#Loop through all binaries and handle installation
for i in "${!binaries_name[@]}"; do
  download_and_install "${binaries_name[i]}" "$POLKA_VERSION"
done

