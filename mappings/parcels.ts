export function handleLandTransfer(event: Transfer): void {
  let parcel = new Entity()
  let id = event.assetId.toHex()
  let registry = LANDRegistry.bind(event.address, event.blockHash)
  parcel.setString('id', id)
  parcel.setAddress('owner', event.to)
  database.create('Parcel', id, parcel)
}

export function handleLandUpdate(event: Update): void {
  let parcel = new Entity()
  let id = event.assetId.toHex()
  parcel.setString('data', event.data)
  database.update('Parcel', id, parcel)
}
