export function handleAuctionCreated(event: AuctionCreated): void {
  let auction = new Entity()
  let id = event.id.toHex()

  auction.setString('asset_id', event.assetId.toHex())
  auction.setAddress('owner', event.seller)
  auction.setU256('price', event.priceInWei)
  auction.setU256('expires_at', event.expiresAt)
  auction.setString('status', 'open')
  auction.setBoolean('is_sold', false)
  auction.setAddress('marketplace_id', event.address)
  //TODO: need to get block number from blockhash
  // auction.setU256('block_number', block_number);
  //TODO: check if asset is a parcel or estate
  auction.setString('type', 'parcel')

  database.create('Auction', id, auction)
}

export function handleAuctionCancelled(event: AuctionCancelled): void {
  let auction = new Entity()
  auction.setString('status', 'cancelled')
  database.update('Auction', event.id.toHex(), auction)
}

export function handleAuctionSuccessful(event: AuctionSuccessful): void {
  let auction = new Entity()
  auction.setString('status', 'sold')
  auction.setAddress('buyer', event.winner)
  auction.setU256('price', event.totalPrice)

  database.update('Auction', event.id.toHex(), auction)
}
