FROM ubuntu:22.04

# Install necessary dependencies
RUN apt-get update && apt-get install -y \
    build-essential wget curl jq file \
    software-properties-common \
    libc6 libgcc-12-dev g++-12 \
    && apt-get clean

# Copy scripts and config
COPY scripts /perfuse/scripts
COPY perfuse/chainspec.json /perfuse/perfuse/chainspec.json
COPY perfuse/.env /perfuse/perfuse/.env
COPY parachain-entrypoint.sh /parachain-entrypoint.sh
COPY init.sh /init.sh

# Grant execute permissions to scripts
RUN chmod +x /perfuse/scripts/*.sh
RUN chmod +x /parachain-entrypoint.sh
RUN chmod +x /init.sh

# Install binaries (optimizing layers for small size)
RUN /perfuse/scripts/binary_install.sh

# Set default entrypoint (can be overridden)
CMD ["bash"]
