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

SCRIPT_DIR=$(realpath $(dirname "${BASH_SOURCE[0]}"))
# Load environment variables from .env file
if [ -f "$SCRIPT_DIR/../perfuse/.env" ]; then
  source "$SCRIPT_DIR/../perfuse/.env"
  echo "Env Variables Loaded"
else
  echo "ERROR: .env file not found."
  exit 1
fi

RELAYCHAIN_DIR="${RELAYCHAIN_DIR:-/home/perfuse/relaychain}" # Customizable relaychain directory
PARACHAIN_DIR="${PARACHAIN_DIR:-/home/perfuse/parachain}" # Customizable parachain directory
CHAINSPEC_FILE="$SCRIPT_DIR/../perfuse/chainspec.json"

source "$SCRIPT_DIR/clean.sh"
cleanup_service "$COL_NAME_1"
cleanup_service "$COL_NAME_2"
cleanup_service "$RPC_NAME"
subquery_cleanup
statescan_cleanup
remove_directory "$PARACHAIN_DIR"


sudo bash "$SCRIPT_DIR/generate_json.sh"

sudo bash "$SCRIPT_DIR/setup_parachain.sh"

sudo bash "$SCRIPT_DIR/statescan.sh"
