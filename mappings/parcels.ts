export function handleLandTransfer(event: Transfer): void {
  let parcel = new Entity()
  let id = event.assetId.toHex()
  parcel.setAddress('owner', event.to)
  database.update('Parcel', id, parcel)
}

export function handleLandUpdate(event: Update): void {
  let parcel = new Entity()
  let id = event.assetId.toHex()
  parcel.setString('data', event.data)
  database.update('Parcel', id, parcel)
}
