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

export function handleAuctionCancelled(event: EthereumEvent): void {
  database.remove('Auction', event.params[0].value.toString())
}

export function handleLandTransfer(event: EthereumEvent): void {
  let parcel = new Entity()
  let id = event.params[2].value.toString()

  parcel.setString('id', id)
  parcel.setAddress('seller', event.params[0].value.toAddress())
  parcel.setAddress('owner', event.params[1].value.toAddress())
  parcel.setAddress('operator', event.params[3].value.toAddress())
  parcel.setString('data', event.params[4].value.toString())

  database.create('Asset', id, parcel)
}

export function handleLandUpdate(event: EthereumEvent): void {
  let parcel = new Entity()
  let id = event.params[0].value.toString()

  parcel.setString('id', id)
  parcel.setString('data', event.params[3].value.toString())

  database.update('Asset', id, parcel)
}

export function handleLandUpdateOperator(event: EthereumEvent): void {
  let parcel = new Entity()
  let id = event.params[0].value.toString()

  parcel.setString('id', id)
  parcel.setAddress('operator', event.params[1].value.toAddress())

  database.update('Asset', id, parcel)
}
