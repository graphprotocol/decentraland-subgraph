# Decentraland-subgraph
[Decentraland](https://decentraland.org/) is a decentralized protocol for automated token exchange on Ethereum.

## Events and Contracts

The Decentraland smart contracts use upgradeability and proxies. These are important to consider when building the subgraph. With upgradeability, it means that we must carefully make sure every instance of a contract does get tracked by the subgraph, and that if any events are added or removed along the way, the subgraph mappings are written to ensure no data is missing. Proxies provide a benefit in that the proxy addresses often emit all of the events. For example, the `EstateProxy` emits all the important events for Estates, and the `EstateRegistry` has been updated multiple times, yet we only have to ingest from the proxy address. Care does need to be taken, in that we must examine every `EstateRegistry` on mainnet, in case an event has been removed from a previous version that does not show up on the current version. 

### Important Notes on Contract Upgrades that Affect the Mappings
* The `Transfer` event for LANDRegistry.sol has been updated. The first instance had five fields, the current one has 3 (and is the ERC721 standard). Both need to be tracked.


Most events are ingested by the Graph Node, but some are purposely left out since they do not contribute a lot to to data sources we are interested in. They are listed below:

*MarketplaceStorage.sol*
* `ChangedPublicationFee`
* `ChangedOwnerCutPerMillion`
* `ChangeLegacyNFTAddress`

*LandRegistry.sol*
* `DeployAuthorized`
* `DeployForbidden`
* `Approval`
* `ApprovalForAll`
* `EstateRegistrySet`

*EstateRegistry.sol*
* `SetLANDRegistry`


This subgraph can be used for Decentraland on mainnet, and all testnets. In order to run it for a 
testnet, the `subgraph.yaml` file will need to have the contract addresses changed to point to the 
correct address for each respective network.

The subgraph takes a long time to sync. Somewhere between 10-20 hours, depending on your machine. 

## Brief Description of The Graph Node Setup

A Graph Node can run multiple subgraphs. The subgraph ingests event data by calling to Infura through http. It can also connect to any geth node or parity node that accepts RPC calls. Fast synced geth nodes work. To use parity, the `--no-warp` flag must be used. Setting up a local Ethereum node is more reliable and faster, but Infura is the easiest way to get started. 

This subgraph has three types of files which tell the Graph Node to ingest events from specific contracts. They are:
* The subgraph manifest (subgraph.yaml)
* A GraphQL schema      (schema.graphql)
* Mapping scripts       (estate.ts, land-registry.ts, legacy-marketplace.ts, marketplace.ts) 

This repository has these files created and ready to compile, so a user can start this subgraph on their own. The only thing that needs to be edited is the contract addresses in the `subgraph.yaml` file to change between mainnet and testnets.  

We have provided a quick guide on how to start up the Decentraland-Subgraph graph node below. If these steps aren't descriptive enough, the [getting started guide](https://github.com/graphprotocol/graph-node/blob/master/docs/getting-started.md) has in depth details on running a subgraph. 

## Steps to get the Decentraland-Subgraph Running 
  1. Install IPFS and run `ipfs init` followed by `ipfs daemon`
  2. Install PostgreSQL and run `initdb -D .postgres` followed by `pg_ctl -D .postgres start` and `createdb graph-node`
  3. If using Ubuntu, you may need to install additional packages: `sudo apt-get install -y clang libpq-dev libssl-dev pkg-config`
  4. Clone this repository, and run the following:
     * `yarn`
     * `yarn codegen` 
  5. Clone https://github.com/graphprotocol/graph-node from master and `cargo build` (this might take a while)
  6. a) Now that all the dependencies are running, you can run the following command to connect to Infura Mainnet (it may take a few minutes for Rust to compile). PASSWORD might be optional, it depends on your postrgres setup:

```
  cargo run -p graph-node --release -- \
  --postgres-url postgresql://USERNAME:[PASSWORD]@localhost:5432/graph-node \
  --ipfs 127.0.0.1:5001 \
  --ethereum-rpc mainnet-infura:https://mainnet.infura.io --debug
```
  6. b) Or Mainnet Local:
```
  cargo run -p graph-node --release -- \
  --postgres-url postgresql://USERNAME:[PASSWORD]@localhost:5432/graph-node \
  --ipfs 127.0.0.1:5001 \
  --ethereum-rpc mainnet-local:http://127.0.0.1:8545 
```
  6. c) Or Infura Rinkeby _(NOTE: Infura testnets are not reliable right now, we get inconsistent results returned. If Rinkeby data is needed, it is suggested to run your own Rinkeby node)_
```
    cargo run -p graph-node --release --   
    --postgres-url postgresql://USERNAME:[PASSWORD]@localhost:5432/graph-node
    --ipfs 127.0.0.1:5001
    --ethereum-rpc rinkeby-infura:https://rinkeby.infura.io 

```
  
 7. Now create the subgraph locally on The Graph Node with `yarn create-subgraph`. On The Graph Hosted service, creating the subgraph is done in the web broswer. 

 8. Now deploy the Decentraland ubgraph to The Graph Node with `yarn deploy --debug`. You should see a lot of blocks being skipped in the `graph-node` terminal, and then it will start ingesting events from the moment the contracts were uploaded to the network. 

Now that you have subgraph is running you may open a [Graphiql](https://github.com/graphql/graphiql) browser at `127.0.0.1:8000` and get started with querying.

## Getting started with querying 

Below are a few ways to show how to query the Decentraland Subgraph for data. The queries show most of the information that is queryable, but there are many other filtering options that can be used, just check out the [querying api](https://github.com/graphprotocol/graph-node/blob/master/docs/graphql-api.md).

### Querying Parcels
```graphql
{
  parcels {
    id
    x
    y
    district {
      id
    }
    estate {
      id
      owner
      operator
      land
      metaData
      size
      sizeArray
      tx
    }
    owner
    data {
      id
    }
    lastTransferredAt
    auctionOwner
    auctionPrice
    activeAuction {
      id
    }
    auctions {
      id
    }
    createdAt
    updatedAt
  }
}
```

### Querying Estates
```graphql
{
  estates {
    id
    owner
    operator
    land
    metaData
    size
    sizeArray
    tx
  }
```