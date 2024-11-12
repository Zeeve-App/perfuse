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
        /usr/local/bin/polkadot key generate-node-key --file "$key_file"
    done
}