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

PATH="$HOME/.nvm/versions/node/v20.15.1/bin:$PATH"
SCRIPT_DIR=$(realpath $(dirname "${BASH_SOURCE[0]}"))
# Load environment variables from .env file
if [ -f "$SCRIPT_DIR/../perfuse/.env" ]; then
  source "$SCRIPT_DIR/../perfuse/.env"
  echo "Env Variables Loaded"
else
  echo "ERROR: .env file not found."
  exit 1
fi

install_and_build() {
    echo "Installing Volta and Yarn..."
    wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
    export NVM_DIR="$([ -z "${XDG_CONFIG_HOME-}" ] && printf %s "${HOME}/.nvm" || printf %s "${XDG_CONFIG_HOME}/nvm")"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    npm install --global yarn
    echo "Installing dependencies and building app..."

    if [ ! -f "$SCRIPT_DIR/../apps" ]; then
    echo "destination path apps doesn't exist, cloning ..."
    git clone https://github.com/polkadot-js/apps.git
    else
    echo "destination path apps already exists"
    fi

    # git clone https://github.com/polkadot-js/apps.git
    cd apps
    yarn && NODE_ENV=production yarn build:www
    echo ""
    sudo mkdir -p /var/www/jsapps/ && sudo cp -ur packages/apps/build/* /var/www/jsapps/
}


setup_nginx() {
    echo "Installing and configuring Nginx..."
    sudo apt install -y nginx
    sudo rm -f /etc/nginx/sites-enabled/default
    sudo cp $SCRIPT_DIR/nginx/jsapps.conf /etc/nginx/sites-enabled/jsapps.conf
    sudo systemctl restart nginx
}

install_and_build
setup_nginx