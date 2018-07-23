export function handleAuctionCreated(event: AuctionCreated): void {
  let auctionId = event.id.toHex()
  let parcelId = event.assetId.toHex()

  // Create the auction
  let auction = new Entity()
  auction.setString('id', auctionId)
  auction.setString('type', 'parcel')
  auction.setString('parcel', parcelId)
  auction.setString('status', 'open')
  auction.setString('txStatus', 'confirmed')
  // TODO: auction.setString('txHash', event.transactionHash)
  auction.setAddress('seller', event.seller)
  auction.set('buyer', Value.fromNull())
  auction.setU256('price', event.priceInWei)
  auction.setU256('expiresAt', event.expiresAt)
  auction.setAddress('contract', event.id)
  // TODO: auction.setU256('blockNumber', event.blockNumber)
  // TODO: auction.setU256('blockTimeCreatedAt', event.blockTime)
  // TODO: auction.setAddress('marketplace', ...)
  // This is the contract address of the marketplace contract; we
  // should probably make that available here
  database.create('Auction', auctionId, auction)

  // Set the current auction of the parcel
  let parcel = new Entity()
  parcel.setString('id', parcelId)
  parcel.setString('activeAuction', auctionId)
  database.update('Parcel', parcelId, parcel)
}

export function handleAuctionCancelled(event: AuctionCancelled): void {
  //let auction = new Entity()
  //auction.setString('status', 'cancelled')
  //database.update('Auction', event.id.toHex(), auction)
}

export function handleAuctionSuccessful(event: AuctionSuccessful): void {
  //let auction = new Entity()
  //auction.setString('status', 'sold')
  //auction.setAddress('buyer', event.winner)
  //auction.setU256('price', event.totalPrice)
  //database.update('Auction', event.id.toHex(), auction)
}
