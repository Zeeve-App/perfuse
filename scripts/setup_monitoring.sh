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

# Constants
NODE_EXPORTER_VERSION="1.8.2"
PROMETHEUS_VERSION="3.0.0"
GRAFANA_VERSION="11.3.1"

# Log helper
log() {
    echo "[INFO] $1"
}

error_exit() {
    echo "[ERROR] $1"
    exit 1
}


# Update and install dependencies
install_dependencies() {
    log "Updating system and installing dependencies..."
    sudo apt-get update -y
    sudo apt-get install -y wget tar adduser libfontconfig1 musl || error_exit "Failed to install dependencies."
}

# Install Node Exporter
install_node_exporter() {
    log "Installing Node Exporter v${NODE_EXPORTER_VERSION}..."
    local url="https://github.com/prometheus/node_exporter/releases/download/v${NODE_EXPORTER_VERSION}/node_exporter-${NODE_EXPORTER_VERSION}.linux-amd64.tar.gz"
    curl -OL --retry 10 --retry-max-time 0 "$url" || error_exit "Failed to download Node Exporter."
    tar xvf "node_exporter-${NODE_EXPORTER_VERSION}.linux-amd64.tar.gz" || error_exit "Failed to extract Node Exporter."
    sudo mv "node_exporter-${NODE_EXPORTER_VERSION}.linux-amd64" /opt/node_exporter || error_exit "Failed to move Node Exporter."
    sudo cp /opt/node_exporter/node_exporter /usr/local/bin/
    sudo rm -rf /opt/node_exporter "node_exporter-${NODE_EXPORTER_VERSION}.linux-amd64.tar.gz"
    sudo useradd --no-create-home --shell /bin/false node_exporter || true
    sudo chown node_exporter:node_exporter /usr/local/bin/node_exporter

    cat <<EOF | sudo tee /etc/systemd/system/node_exporter.service
[Unit]
Description=Node Exporter
Wants=network-online.target
After=network-online.target

[Service]
User=node_exporter
Group=node_exporter
Type=simple
ExecStart=/usr/local/bin/node_exporter --collector.systemd

[Install]
WantedBy=multi-user.target
EOF

    sudo systemctl daemon-reload
    sudo systemctl enable node_exporter
    sudo systemctl start node_exporter
    log "Node Exporter installed and running."

echo "# my global config
global:
  scrape_interval: 15s # Set the scrape interval to every 15 seconds. Default is every 1 minute.
  evaluation_interval: 15s # Evaluate rules every 15 seconds. The default is every 1 minute.
  # scrape_timeout is set to the global default (10s).
 
# Alertmanager configuration
alerting:
  alertmanagers:
    - static_configs:
        - targets:
          # - alertmanager:9093
 
# Load rules once and periodically evaluate them according to the global 'evaluation_interval'.
# A scrape configuration containing exactly one endpoint to scrape:
# Here it's Prometheus itself.
scrape_configs:
  - job_name: 'node_exporter'
    static_configs:
      - targets: ['localhost:9100']
  - job_name: 'collator_1'
    static_configs:
      - targets: ['localhost:8004']
  - job_name: 'collator_2'
    static_configs:
      - targets: ['localhost:8005']
  - job_name: 'rpc_node'
    static_configs:
      - targets: ['localhost:8006']" | sudo tee /etc/prometheus/prometheus.yml >/dev/null
    sudo systemctl restart prometheus
}

# Install Prometheus
install_prometheus() {
    log "Installing Prometheus v${PROMETHEUS_VERSION}..."
    local url="https://github.com/prometheus/prometheus/releases/download/v${PROMETHEUS_VERSION}/prometheus-${PROMETHEUS_VERSION}.linux-amd64.tar.gz"
    curl -OL --retry 10 --retry-max-time 0 "$url" || error_exit "Failed to download Prometheus."
    tar xvf "prometheus-${PROMETHEUS_VERSION}.linux-amd64.tar.gz" || error_exit "Failed to extract Prometheus."
    sudo mv "prometheus-${PROMETHEUS_VERSION}.linux-amd64" /etc/prometheus || error_exit "Failed to move Prometheus."
    sudo mkdir -p /var/lib/prometheus || error_exit "Failed to create Prometheus data directory."

    sudo useradd --no-create-home --shell /bin/false prometheus || true
    sudo chown -R prometheus:prometheus /etc/prometheus /var/lib/prometheus

    cat <<EOF | sudo tee /etc/systemd/system/prometheus.service
[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

[Service]
User=prometheus
Group=prometheus
Type=simple
ExecStart=/etc/prometheus/prometheus \\
    --config.file=/etc/prometheus/prometheus.yml \\
    --storage.tsdb.path=/var/lib/prometheus/ \\
    --web.console.templates=/etc/prometheus/consoles \\
    --web.console.libraries=/etc/prometheus/console_libraries

[Install]
WantedBy=multi-user.target
EOF

    sudo systemctl daemon-reload
    sudo systemctl enable prometheus
    sudo systemctl start prometheus
    log "Prometheus installed and running."
}

# Install Grafana
install_grafana() {
    log "Installing Grafana v${GRAFANA_VERSION}..."
    local deb_file="grafana_${GRAFANA_VERSION}_amd64.deb"
    local url="https://dl.grafana.com/oss/release/${deb_file}"
    wget "$url" || error_exit "Failed to download Grafana."
    sudo dpkg -i "$deb_file" || error_exit "Failed to install Grafana."
    sudo rm -f "$deb_file"
    sudo sed -i 's/^;http_port = 3000/http_port = 9111/' /etc/grafana/grafana.ini
    sudo sed -i "s|^\(;*\)\s*root_url\s*=.*|root_url = http://%(domain)s/${RPC_API_KEY}/grafana/|" /etc/grafana/grafana.ini
    sudo sed -i "s|^\(;*\)\s*serve_from_sub_path\s*=.*|serve_from_sub_path = true|" /etc/grafana/grafana.ini

    sudo systemctl daemon-reload
    sudo systemctl enable grafana-server
    sudo systemctl start grafana-server
    log "Grafana installed and running."
}
# Verify services
verify_services() {
    log "Verifying service statuses..."
    sudo systemctl status node_exporter --no-pager || error_exit "Node Exporter service failed."
    sudo systemctl status prometheus --no-pager || error_exit "Prometheus service failed."
    sudo systemctl status grafana-server --no-pager || error_exit "Grafana service failed."
    log "All services are running successfully."
}


install_dashboards() {
  #check for installation
  if test -f "/etc/grafana/grafana.ini"; then
    echo "Perfuse monitoring installer"
    echo "--------------------------------"
  else
    echo "Node monitoring installation not found!"
    exit 0
  fi

  if test -f "/etc/grafana/provisioning/dashboards/perfuse.yaml"; then
    echo "Installing Grafana dashboards"
    provisioningDone=true
    echo
    echo "Dashboards already provisioned, switching to upgrade mode."
  else
    provisioningDone=false
  fi

  echo
  echo "Downloading..."
  mkdir -p /tmp/perfuse-monitoring-installer/dashboards-install
  cd /tmp/perfuse-monitoring-installer/dashboards-install
  wget -nd -m -nv https://github.com/user-attachments/files/17955001/perfuse.json
  wget -nd -m -nv https://github.com/user-attachments/files/17954993/node_exporter.json

  sudo mkdir -p /etc/grafana/dashboards
  sudo cp *.json /etc/grafana/dashboards

  if [ "$provisioningDone" = "false" ]; then
    echo
    echo "Provisioning dashboards..."
    {
      echo "apiVersion: 1"
      echo ""
      echo "providers:"
      echo "  - name: 'Perfuse official'"
      echo "    orgId: 1"
      echo "    folder: ''"
      echo "    folderUid: ''"
      echo "    type: file"
      echo "    disableDeletion: false"
      echo "    updateIntervalSeconds: 30"
      echo "    allowUiUpdates: true"
      echo "    options:"
      echo "      path: /etc/grafana/dashboards"
      echo "      foldersFromFilesStructure: true"
    } >perfuse.yaml
    sudo cp perfuse.yaml /etc/grafana/provisioning/dashboards/
    
    echo "Provisioning datasource..."
    {
      echo "apiVersion: 1"
      echo ""
      echo "datasources:"
      echo "  - name: Prometheus"
      echo "    type: prometheus"
      echo "    access: proxy"
      echo "    orgId: 1"
      echo "    url: http://localhost:9090"
      echo "    isDefault: true"
      echo "    version: 1"
      echo "    editable: false"
    } >prom.yaml
    sudo cp prom.yaml /etc/grafana/provisioning/datasources/
    sudo systemctl restart grafana-server
  fi
  echo
  echo "Done!"
  echo
  echo "Perfuse Grafana dashboards have been installed and updated."
  echo "It might take up to 30s for new versions to show up in Grafana."
  echo
}



# Main function
main() {
    install_dependencies
    install_prometheus
    install_grafana
    install_node_exporter
    install_dashboards
    verify_services
    log "Monitoring stack setup completed successfully."
}

# Execute main
main
