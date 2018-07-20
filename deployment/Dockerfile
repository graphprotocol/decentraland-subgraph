FROM ubuntu:latest

ENV DEBIAN_FRONTEND noninteractive

# Install system utilities
RUN apt-get update \
    && apt-get install -y \
           curl \
           lsb-release \
           git \
           apt-transport-https \
           ca-certificates \
           software-properties-common \
           build-essential \
           openssl \
           libssl-dev \
           clang \
           libclang-dev \
           pkg-config

# Install Postgres
RUN apt-get update \
    && apt-get install -y postgresql libpq-dev

# Configure Postgres
USER postgres
RUN /etc/init.d/postgresql start \
    && psql -c "CREATE USER thegraph WITH PASSWORD 'thegraph' CREATEDB;"

# Install Rust toolchain
RUN curl https://sh.rustup.rs -sSf > /tmp/rustup \
    && chmod +x /tmp/rustup \
    && /tmp/rustup -y

# Add The Graph sources
COPY . .
RUN cd the-graph-local-node && cargo install --bins

ADD start-the-graph.sh /usr/local/bin
CMD start-the-graph.sh