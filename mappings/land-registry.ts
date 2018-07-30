enum CSVState {
  BETWEEN,
  UNQUOTED_VALUE,
  QUOTED_VALUE,
}

/**
 * Parses a CSV string into an array of strings.
 * @param csv CSV string.
 * @returns Array of strings.
 */
function parseCSV(csv: string): Array<string> {
  let values = new Array<string>()
  let valueStart = 0
  let state = CSVState.BETWEEN

  for (let i: i32 = 0; i < csv.length; i++) {
    if (state == CSVState.BETWEEN) {
      if (csv[i] != ',') {
        if (csv[i] == '"') {
          state = CSVState.QUOTED_VALUE
          valueStart = i + 1
        } else {
          state = CSVState.UNQUOTED_VALUE
          valueStart = i
        }
      }
    } else if (state == CSVState.UNQUOTED_VALUE) {
      if (csv[i] == ',') {
        values.push(csv.substr(valueStart, i - valueStart))
        state = CSVState.BETWEEN
      }
    } else if (state == CSVState.QUOTED_VALUE) {
      if (csv[i] == '"') {
        values.push(csv.substr(valueStart, i - valueStart))
        state = CSVState.BETWEEN
      }
    }
  }

  return values
}

export function handleLandTransfer(event: Transfer): void {
  let parcelId = event.params.assetId.toHex()
  let registry = LANDRegistry.bind(event.address, event.blockHash)

  let parcel = new Entity()
  parcel.setString('id', parcelId)
  parcel.setString('owner', event.params.to.toHex())
  // TODO: parcel.setString('lastTransferredAt', event.blockTime)

  // Apply store updates
  let store = Store.bind(event.blockHash)
  store.set('Parcel', parcelId, parcel)
}

export function handleLandUpdate(event: Update): void {
  // Bind LANDRegistry contract
  let registry = LANDRegistry.bind(event.address, event.blockHash)

  let parcelId = event.params.assetId.toHex()
  let coordinate = registry.decodeTokenId(event.params.assetId)

  // Create ParcelData entity
  let dataString = event.params.data.toString()
  let data = new Entity()
  let dataId = parcelId + '-data'
  data.setString('id', dataId)
  data.setString('parcel', parcelId)

  // Parse CSV data
  if (dataString.charAt(0) == '0') {
    let values = parseCSV(dataString)
    if (values.length > 0) {
      data.setString('version', values[0])
    }
    if (values.length > 1) {
      data.setString('name', values[1])
    }
    if (values.length > 2) {
      data.setString('description', values[2])
    }
    if (values.length > 3) {
      data.setString('ipns', values[3])
    }
  } else {
    return // Unsupported version
  }

  // Create Parcel entity
  let parcel = new Entity()
  parcel.setString('id', parcelId)
  parcel.setI256('x', coordinate.value0)
  parcel.setI256('y', coordinate.value1)
  parcel.setString('data', dataId)
  // TODO: parcel.setU256('updatedAt', event.blockTime)

  // Apply store updates
  let store = Store.bind(event.blockHash)
  store.set('ParcelData', dataId, data)
  store.set('Parcel', parcelId, parcel)
}
