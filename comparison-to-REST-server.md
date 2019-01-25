## Gaps between the subgraph and the Decentraland REST server

### Districts

Districts are missing in the subgraph.

**Reason:** Districts are neither stored on chain nor on IPFS.

**Possible solution (easy):** Put the district definitions on IPFS and have a
one-shot IPFS data source that loads them up and pushes entities
for them into the store.

### Estates

Estates are missing in the subgraph.

**Reason:** According to the overview of [Decentraland contract addresses](https://contracts.decentraland.org/addresses.json), the _EstateRegistry_
contract is only deployed to mainnet at this point. We don't currently support indexing contracts on different networks at the
same time.

**Possible solution (hard):** Allow data sources to be network-specific and add support
for indexing across multiple networks at the same time in `graph-node`.

**Possible solution (easy):** Wait until _EstateRegistry_ is deployed to mainnet,
then add a data source for this contract.

### Mortgages, MANA and other contracts

Out of the _MANAToken_, _LANDRegistry_, _LANDProxy_, _TerraformReserve_,
_ReturnVesting_, _Marketplace_, _ServiceLocator_, _MortgageHelper_,
_MortgageManager_, _RCNEngine_ and _DecentralandInvite_ contracts that are
deployed to mainnet, we currently only index two:

- LANDRegistry
- Marketplace

**Reason:** Last time we checked, not all of the above contracts were deployed
to mainnet.

**Possible solution (medium):** Agree on a schema with the Decentraland team, then
add data sources for all contracts to the subgraph.

### Maps

The subgraph's GraphQL API does cover any of the following map-related requests:

```http
GET /map.png
GET /parcels/:x/:y/map.png
GET /estates/:id/map.png
```

**Reason:** Unless images of the global map, the map for each estate and the
maps for all valid coordinates are stored on chain or on IPFS, we cannot serve
them as part of the GraphQL API.

**Possible solution:** A separate service?

### Translations

The subgraph's GraphQL API does not support fetching translations, specifically:

```http
GET /translations/:locale
```

**Reason:** The translations are not stored on IPFS. If they were, we could create
a schema for them and fetch them from IPFS.

**Possible solution (medium):** Put the translations for all locales on IPFS, add
a schema for translations and use one-shot IPFS data sources to load them.

### Tags

Tags used in e.g. parcels (see
[this example](https://docs.decentraland.org/decentraland/api/#response-example-3))
are not supported in the subgraph.

**Reason:** We couldn't find a specification for the tags.

**Possible solution (medium):** Agree on a schema with the Decentraland team and
index tags properly.

### Block timestamps

The `last_transferred_at` field of parcels, as well as a few other fields, are
derived from block timestamps: see [parcelReducer.js](https://github.com/decentraland/marketplace/blob/master/monitor/reducers/parcelReducer.js#L36).
This is currently not accounted for in the subgraph.

**Reason:** Event handlers currently have no access to information about the block.

**Possible solution (medium):** Either pass block data in to handlers as the second
parameter, add an `event.getBlock(): EthereumBlock` method or add a completely
separate `ethereum` host module with `getBlock(hash: H256): EthereumBlock` function.
Use this to obtain meta data for the block, such as the block timestamp.
