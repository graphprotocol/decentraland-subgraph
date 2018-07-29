#!/bin/bash

set -x
set -e

# Start Postgres
export PATH="$PATH:/usr/lib/postgresql/9.6/bin"
/etc/init.d/postgresql start
createdb decentraland

# Start local IPFS daemon
ipfs init
ipfs daemon &

# Build the Decentraland data source
pushd decentraland
yarn add --dev ../graph-cli
yarn
yarn build-ipfs --verbosity debug \
    | grep "Subgraph:" \
    | cut -d: -f2 \
    | xargs echo -n \
    > $HOME/subgraph-id
popd

# Start The Graph node
export PATH="$PATH:$HOME/.cargo/bin"
graph-node \
    --postgres-url postgresql://decentraland:decentraland@localhost:5432/decentraland \
    --ethereum-ws wss://mainnet.infura.io/_ws \
    --ipfs 127.0.0.1:5001 \
    --subgraph "$(cat $HOME/subgraph-id)"
