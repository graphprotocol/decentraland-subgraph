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
    | grep "Data source:" \
    | cut -d: -f2 \
    | xargs echo -n \
    > $HOME/data-source-id
popd

# Start The Graph node
export PATH="$PATH:$HOME/.cargo/bin"
thegraph-node \
    --postgres-url postgresql://decentraland:decentraland@localhost:5432/decentraland \
    --ethereum-ws wss://mainnet.infura.io/_ws \
    --ipfs 127.0.0.1:5001 \
    --data-source "$(cat $HOME/data-source-id)"
