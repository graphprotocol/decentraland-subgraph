FROM ubuntu:latest

ENV DEBIAN_FRONTEND noninteractive

# Install dependencies
RUN apt-get update \
    && apt-get install -y \
           curl \
           lsb-release \
           git \
           apt-transport-https \
           ca-certificates \
           software-properties-common \
           build-essential \
           postgresql libpq-dev \
           openssl \
           libssl-dev \
           clang \
           libclang-dev \
           pkg-config

# Install Node & Yarn
RUN curl -sL https://deb.nodesource.com/setup_8.x | bash - \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg \
       | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" \
       > /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install -y yarn

# Install IPFS
RUN cd /tmp \
    && curl https://dist.ipfs.io/go-ipfs/v0.4.16/go-ipfs_v0.4.16_linux-amd64.tar.gz \
           -sSf > go-ipfs.tar.gz \
    && tar xvf go-ipfs.tar.gz \
    && cd go-ipfs \
    && ./install.sh

# Prepare Postgres
USER postgres
RUN mkdir -p /tmp/the-graph
WORKDIR /tmp/the-graph
RUN /etc/init.d/postgresql start \
    && psql -c "CREATE USER decentraland WITH PASSWORD 'decentraland' CREATEDB;"

# Install Rust toolchain
RUN curl https://sh.rustup.rs -sSf > /tmp/rustup \
    && chmod +x /tmp/rustup \
    && /tmp/rustup -y

# Copy, build and install The Graph
COPY --chown=postgres graph-node graph-node
RUN cd graph-node/node \
    && $HOME/.cargo/bin/cargo install --bins --locked

# Copy The Graph CLI
COPY --chown=postgres graph-cli graph-cli

# Copy, build and deploy the Decentraland data source
COPY --chown=postgres decentraland decentraland
RUN cd decentraland \
    && git checkout jannis/improvement

# Start The Graph on startup
ADD start-node.sh /usr/local/bin
CMD start-node.sh
