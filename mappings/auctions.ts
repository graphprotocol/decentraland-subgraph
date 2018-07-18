export function handleAuctionCreated(event: AuctionCreated): void {
  let auctionId = event.id.toHex()
  let auction = new Entity()
  auction.setString('id', auctionId)
  auction.setAddress('seller', event.seller)
  auction.setString('for_parcel', event.assetId.toHex())
  auction.setU256('price', event.priceInWei)
  auction.setU256('expires_at', event.expiresAt)
  auction.setString('status', 'open')
  auction.setBoolean('is_sold', false)
  auction.setAddress('marketplace_id', event.address)
  database.create('Auction', auctionId, auction)
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
