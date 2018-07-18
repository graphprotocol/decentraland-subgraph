export function handleAuctionCreated(event: AuctionCreated): void {
  let auction = new Entity()
  let id = event.id.toHex()

  auction.setString('id', id)
  auction.setAddress('seller', event.seller)
  auction.setString('for_parcel', event.assetId.toHex())
  auction.setU256('price', event.priceInWei)
  auction.setU256('expires_at', event.expiresAt)
  auction.setString('status', 'open')
  auction.setBoolean('is_sold', false)
  auction.setAddress('marketplace_id', event.address)

  let parcel = new Entity()
  parcel.setString('active_auction', id)

  database.create('Auction', id, auction)
  database.update('Parcel', event.assetId.toHex(), parcel)
}

export function handleAuctionCancelled(event: AuctionCancelled): void {
  let auction = new Entity()
  auction.setString('status', 'cancelled')

  let parcel = new Entity()
  parcel.setString('active_auction', null)

  database.update('Auction', event.id.toHex(), auction)
  database.update('Parcel', event.assetId.toHex(), parcel)
}

export function handleAuctionSuccessful(event: AuctionSuccessful): void {
  let auction = new Entity()
  auction.setString('status', 'sold')
  auction.setAddress('buyer', event.winner)
  auction.setU256('price', event.totalPrice)

  let parcel = new Entity()
  parcel.setString('active_auction', null)

  database.update('Auction', event.id.toHex(), auction)
  database.update('Parcel', event.assetId.toHex(), parcel)
}
