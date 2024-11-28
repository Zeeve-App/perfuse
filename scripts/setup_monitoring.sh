#!/bin/bash

set -e
set -u

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

# Main function
main() {
    install_dependencies
    install_node_exporter
    install_prometheus
    install_grafana
    verify_services
    log "Monitoring stack setup completed successfully."
}

# Execute main
main