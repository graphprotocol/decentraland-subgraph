#!/bin/bash

set -e

print_usage_and_exit() {
    echo
    echo "Usage: KUBERNETES_CLUSTER=... $0"
    echo
    exit 1
}

if [[ -z "$KUBERNETES_CLUSTER" ]]; then
    print_usage_and_exit
fi

set -x

if [[ -d the-graph-network ]]; then
    pushd the-graph-network
    git pull --rebase origin master
    popd
else
    git clone git@github.com:graphprotocol/the-graph-network the-graph-network
fi

if [[ -d graph-cli ]]; then
    pushd graph-cli
    git pull --rebase origin master
    popd
else
    git clone git@github.com:graphprotocol/graph-cli graph-cli
fi

if [[ -d decentraland ]]; then
    pushd decentraland

    git pull --rebase origin master
    popd
else
    git clone git@github.com:graphprotocol/decentraland decentraland
fi

gcloud container builds submit \
    --machine-type=n1-highcpu-8 \
    --timeout=30m \
    --tag gcr.io/the-graph-staging/decentraland .

kubectl --cluster="$KUBERNETES_CLUSTER" apply --force -f deployment.yaml
kubectl --cluster="$KUBERNETES_CLUSTER" apply --force -f service.yaml
