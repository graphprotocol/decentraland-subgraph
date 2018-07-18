export function handleLandTransfer(event: Transfer): void {
  let id = event.assetId.toHex()
  let registry = LANDRegistry.bind(event.address, event.blockHash)

  let parcel = new Entity()
  parcel.setString('id', id)
  parcel.setAddress('owner', event.to)

  database.create('Parcel', id, parcel)
}

export function handleLandUpdate(event: Update): void {
  let id = event.assetId.toHex()

  let parcel = new Entity()
  parcel.setString('id', id)

  // FIXME: Data is a CSV string that we need to parse; however it is also
  // not indexed (see the LANDRegistry ABI). How do we get it?
  parcel.setString('data', event.data)

  database.update('Parcel', id, parcel)
}
