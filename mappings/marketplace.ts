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

  // Set the active auction of the parcel
  let parcel = new Entity()
  parcel.setString('id', parcelId)
  parcel.setString('activeAuction', auctionId)
  database.update('Parcel', parcelId, parcel)
}

export function handleAuctionCancelled(event: AuctionCancelled): void {
  let auctionId = event.id.toHex()
  let parcelId = event.assetId.toHex()

  // Mark the auction as cancelled
  let auction = new Entity()
  auction.setString('status', 'cancelled')
  // TODO: auction.setU256('blockTimeUpdatedAt', event.blockTime)
  database.update('Auction', auctionId, auction)

  // Clear the active auction of the parcel
  let parcel = new Entity()
  parcel.set('activeAuction', Value.fromNull())
  database.update('Parcel', parcelId, parcel)
}

export function handleAuctionSuccessful(event: AuctionSuccessful): void {
  let auctionId = event.id.toHex()
  let parcelId = event.assetId.toHex()

  // Mark the auction as sold
  let auction = new Entity()
  auction.setString('status', 'sold')
  auction.setAddress('buyer', event.winner)
  auction.setU256('price', event.totalPrice)
  // TODO: auction.setU256('blockTimeCreatedAt', event.blockTime)
  database.update('Auction', auctionId, auction)

  // Update the parcel owner and active auction
  let parcel = new Entity()
  parcel.setAddress('owner', event.winner)
  parcel.set('activeAuction', Value.fromNull())
  database.update('Parcel', parcelId, parcel)
}
