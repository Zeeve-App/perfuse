#!/bin/bash

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

install_tools() {
    if ! command -v jq &> /dev/null; then
        echo "jq is not installed. Installing..."
        sudo apt-get update && sudo apt-get install -y jq
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
create_user
