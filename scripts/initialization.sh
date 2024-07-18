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

install_nvm() {
    if [ ! -f "$HOME/.nvm/nvm.sh" ]; then

        curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
        export NVM_DIR=$HOME/.nvm;
        [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
        [ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"
        source $NVM_DIR/nvm.sh;
        nvm install 20
    else
        echo "nvm is already installed."
    fi
}


install_tools() {
    if ! command -v jq &> /dev/null; then
        echo "jq is not installed. Installing..."
        sudo apt-get update && sudo apt-get install -y jq zip
        
    else
        echo "jq is already installed."
    fi
}

create_user() {
    if ! id "${SCRIPT_USER}" &>/dev/null; then  # If user doesn't exist
        echo "Creating user '${SCRIPT_USER}'..."
        sudo useradd -d "/home/perfuse" -s "/bin/false" -m "${SCRIPT_USER}"
        echo "User '${SCRIPT_USER}' created successfully."
    else
        echo "User '${SCRIPT_USER}' already exists."
    fi
}

install_tools
echo "Installing NVM......." && install_nvm
create_user
