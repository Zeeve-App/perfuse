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


install_and_build() {
    echo "Installing Volta and Yarn..."
    curl https://get.volta.sh | bash

    echo "Installing dependencies and building app..."

    volta install yarn
    git clone https://github.com/polkadot-js/apps.git
    cd apps
    yarn && NODE_ENV=production yarn build:www
    echo ""
    sudo mkdir -p sudo cp /var/www/jsapps/ -ur packages/apps/build/* /var/www/jsapps/
}


setup_nginx() {
    echo "Installing and configuring Nginx..."
    sudo apt install -y nginx
    sudo rm /etc/nginx/sites-enabled/default
    sudo cp ./nginx/jsapps.conf /etc/nginx/sites-enabled/jsapps.conf
    sudo systemctl restart nginx
}

install_and_build
setup_nginx
