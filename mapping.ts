/// <reference path="./node_modules/assemblyscript/std/assembly.d.ts" />
/// <reference path="./node_modules/the-graph-wasm/index.d.ts" />
/// <reference path="./types/Marketplace/Marketplace.types.ts" />

export function handleAuctionCreated(event: EthereumEvent): void {
  let auction = new Entity()
  let id = event.params[0].value.toString()

  auction.setString('id', id)
  auction.setString('asset', event.params[1].value.toString())
  auction.setAddress('seller', event.params[2].value.toAddress())
  auction.setU256('priceInWei', event.params[3].value.toU256())
  auction.setU256('expiresAt', event.params[4].value.toU256())

  database.create('Auction', id, auction)
}
