#!/bin/bash

set -e
set -x

print_usage_and_exit() {
    echo "Usage: $0"
    echo ""
    echo "Requires the following environment variables to be set:"
    echo ""
    if [[ -z "$DATA_SOURCE" ]]; then
        echo "  DATA_SOURCE (missing)"
    else
        echo "  DATA_SOURCE (ok)"
    fi
    if [[ -z "$ETHEREUM_WS_URL" ]]; then
        echo "  ETHEREUM_WS_URL (missing)"
    else
        echo "  ETHEREUM_WS_URL (ok)"
    fi
    if [[ -z "$IPFS_URL" ]]; then
        echo "  IPFS_URL (missing)"
    else
        echo "  IPFS_URL (ok)"
    fi
    exit 1
}

initialize_rust() {
    echo "Initialize Rust"

    # Add Rust to PATH
    export PATH="~/.cargo/bin:$PATH"
}

start_postgres() {
    echo "Start Postgres"

    # Add Postgres binaries to PATH
    export PATH="$PATH:/usr/lib/postgresql/9.6/bin"

    # Start Postgres
    /etc/init.d/postgresql start
}

start_the_graph() {
    echo "Start The Graph"

    thegraph-local-node \
        --postgres-url postgresql://localhost:5432/thegraph \
        --ethereum-ws "$ETHEREUM_WS_URL" \
        --ipfs "$IPFS_URL" \
        --data-source "$DATA_SOURCE"
}

if [[ -z "$DATA_SOURCE" ]]; then print_usage_and_exit; fi
if [[ -z "$ETHEREUM_WS_URL" ]]; then print_usage_and_exit; fi
if [[ -z "$IPFS_URL" ]]; then print_usage_and_exit; fi

initialize_rust
start_postgres
start_the_graph
