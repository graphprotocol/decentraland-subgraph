export function handleAuctionCreated(event: AuctionCreated): void {
  let auctionId = event.params.id.toHex()
  let parcelId = event.params.assetId.toHex()

  // Create the auction
  let auction = new Entity()
  auction.setString('id', auctionId)
  auction.setString('type', 'parcel')
  auction.setString('parcel', parcelId)
  auction.setString('status', 'open')
  auction.setString('txStatus', 'confirmed')
  // TODO: auction.setString('txHash', event.transactionHash)
  auction.setAddress('owner', event.params.seller)
  auction.unset('buyer')
  auction.setU256('price', event.params.priceInWei)
  auction.setU256('expiresAt', event.params.expiresAt)
  auction.setAddress('contract', event.params.id)
  // TODO: auction.setU256('blockNumber', event.blockNumber)
  // TODO: auction.setU256('blockTimeCreatedAt', event.blockTime)
  auction.setAddress('marketplace', event.address)

  // Set the active auction of the parcel
  let parcel = new Entity()
  parcel.setString('id', parcelId)
  parcel.setString('activeAuction', auctionId)
  parcel.setAddress('auctionOwner', event.params.seller)
  parcel.setU256('auctionPrice', event.params.priceInWei)

  // Apply store updates
  let store = Store.bind(event.blockHash)
  store.set('Auction', auctionId, auction)
  store.set('Parcel', parcelId, parcel)
}

export function handleAuctionCancelled(event: AuctionCancelled): void {
  let auctionId = event.params.id.toHex()
  let parcelId = event.params.assetId.toHex()

  // Mark the auction as cancelled
  let auction = new Entity()
  auction.setString('id', auctionId)
  auction.setString('type', 'parcel')
  auction.setString('status', 'cancelled')
  // TODO: auction.setU256('blockTimeUpdatedAt', event.blockTime)

  // Clear the active auction of the parcel
  let parcel = new Entity()
  parcel.setString('id', parcelId)
  parcel.set('activeAuction', Value.fromNull())
  parcel.set('auctionOwner', Value.fromNull())
  parcel.set('auctionPrice', Value.fromNull())

  // Apply store updates
  let store = Store.bind(event.blockHash)
  store.set('Auction', auctionId, auction)
  store.set('Parcel', parcelId, parcel)
}

export function handleAuctionSuccessful(event: AuctionSuccessful): void {
  let auctionId = event.params.id.toHex()
  let parcelId = event.params.assetId.toHex()

  // Mark the auction as sold
  let auction = new Entity()
  auction.setString('id', auctionId)
  auction.setString('type', 'parcel')
  auction.setString('status', 'sold')
  auction.setAddress('buyer', event.params.winner)
  auction.setU256('price', event.params.totalPrice)
  // TODO: auction.setU256('blockTimeCreatedAt', event.blockTime)

  // Update the parcel owner and active auction
  let parcel = new Entity()
  parcel.setString('id', parcelId)
  parcel.setAddress('owner', event.params.winner)
  parcel.set('activeAuction', Value.fromNull())
  parcel.set('auctionOwner', Value.fromNull())
  parcel.set('auctionPrice', Value.fromNull())

  // Apply store updates
  let store = Store.bind(event.blockHash)
  store.set('Auction', auctionId, auction)
  store.set('Parcel', parcelId, parcel)
}
