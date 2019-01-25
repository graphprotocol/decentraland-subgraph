# Decentraland Subgraph
[Decentraland](https://github.com/graphprotocol/decentraland-subgraph) is a decentralized virtual world that runs on open standards.

## Events and Contracts

The Decentraland smart contracts where events are being sourced are `LANDRegistry.sol` and `Marketplace.sol`.

This subgraph can be used for Decentraland on the mainnet, and all testnets. In order to run it for a testnet, the `subgraph.yaml` file will need to have the contract addresses changed to point to the correct address for each respective network.

The subgraph takes about 4 hours to sync. 
## Brief Description of The Graph Node Setup

A Graph Node can run multiple subgraphs. The subgraph ingests event data and contract storage by calling to Infura through https. It can connect to any geth or parity node that accepts RPC calls. Fast synced geth nodes work. To use parity, the `--no-warp` flag must be used. Setting up a local Ethereum node results in faster queries, but Infura allows for quickly starting, and meets most needs.

This subgraph has three types of files which tell the Graph Node to ingest events from specific contracts. They are:
* The subgraph manifest             (subgraph.yaml)
* A GraphQL schema                  (schema.graphql)
* Typescript Mapping scripts        (land-registry.ts, marketplace.ts) 

This repository has these files created and ready to compile, so a user can start this subgraph on their own. The only thing that needs to be edited is the contract addresses in the `subgraph.yaml` file to change between mainnet and testnets.  

This doc provides a quick guide on how to start up the Decentraland subgraph graph node. If these steps aren't descriptive enough, the [getting started guide](https://github.com/graphprotocol/graph-node/blob/master/docs/getting-started.md) has in depth details on running a subgraph. 

## Steps to get the Decentraland Subgraph Running 
  1. Install IPFS and run `ipfs init` followed by `ipfs daemon`
  2. Install PostgreSQL and run `initdb -D .postgres` followed by `pg_ctl -D .postgres start` and `createdb decentraland-mainnet` (note this db name is used in the commands below for the mainnet examples)
  3. If using Ubuntu, you may need to install additional packages: `sudo apt-get install -y clang libpq-dev libssl-dev pkg-config`
  4. Clone this repository, and run the following:
     * `yarn`
     * `yarn codegen` 
  5. Clone https://github.com/graphprotocol/graph-node from master and `cargo build` (this might take a while)
  6. a) Now that all the dependencies are running, you can run the following command to connect to Infura mainnet (it may take a few minutes for Rust to compile). PASSWORD might be optional, it depends on your postgres setup:

```
  cargo run -p graph-node --release -- \
  --postgres-url postgresql://USERNAME:[PASSWORD]@localhost:5432/decentraland-mainnet \
  --ipfs 127.0.0.1:5001 \
  --ethereum-rpc mainnet-infura:https://mainnet.infura.io --debug
```
  6. b) Or Mainnet Local:
```
  cargo run -p graph-node --release -- \
  --postgres-url postgresql://USERNAME:[PASSWORD]@localhost:5432/decentraland-mainnet \
  --ipfs 127.0.0.1:5001 \
  --ethereum-rpc mainnet-local:http://127.0.0.1:8545 
```

 7. Now create the subgraph locally on The Graph Node with `yarn create-subgraph`. (On The Graph Hosted service, creating the subgraph is done in the web broswer). 
  
 8. Now deploy the Decentralnad subgraph to The Graph Node with `yarn deploy`. You should see a lot of blocks being skipped in the `graph-node` terminal, and then it will start ingesting events from the moment the contracts were uploaded to the network. 

Now that the subgraph is running you may open a [Graphiql](https://github.com/graphql/graphiql) browser at `127.0.0.1:8000` and get started with querying.

## Querying the subgraph
The query below shows all the information that is possible to query, with a few filters. There are many other filtering options that can be used, just check out the [querying api](https://github.com/graphprotocol/graph-node/blob/master/docs/graphql-api.md).

```graphql
todo

```
The command above can be copy pasted into the Graphiql interface in your browser at `127.0.0.1:8000`.

