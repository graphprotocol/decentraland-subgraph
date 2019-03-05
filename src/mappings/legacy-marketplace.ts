import {Address} from '@graphprotocol/graph-ts'
import {
  AuctionCreated,
  AuctionCancelled,
  AuctionSuccessful,
} from '../types/LegacyMarketplace/LegacyMarketplace'
import {Decentraland, Order, Parcel, User} from '../types/schema'
import {LANDRegistry} from "../types/LegacyMarketplace/LANDRegistry";

/*
Note - the variable name 'auction` is kept throughout, even through we are creating new Order entities. This is to more clearly seperate legacy marketplace from marketplace.
 */

// There is no `Estate` here , because there were only parcels auctioned off at the start
export function handleLegacyAuctionCreated(event: AuctionCreated): void {
  let auctionId = event.params.id.toHex()
  let parcelId = event.params.assetId.toHex()

  // Create the auction
  let auction = new Order(auctionId)
  auction.type = 'parcel'
  auction.parcel = parcelId
  auction.status = 'open'
  auction.txHash = event.transaction.hash
  auction.owner = event.params.seller
  auction.price = event.params.priceInWei
  auction.expiresAt = event.params.expiresAt
  auction.blockNumber = event.block.number
  auction.timeCreated = event.block.timestamp
  auction.timeUpdatedAt = event.block.timestamp
  auction.marketplace = event.address
  auction.save()

  // Set the active auction of the parcel
  let parcel = Parcel.load(parcelId)
  if (parcel == null) {
    parcel = new Parcel(parcelId)
    let registry = LANDRegistry.bind(Address.fromString("0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d"))
    let coordinate = registry.decodeTokenId(event.params.assetId)
    parcel.x = coordinate.value0
    parcel.y = coordinate.value1
    parcel.owner = event.params.seller

    let decentraland = Decentraland.load("1")
    if (decentraland == null){
      decentraland = new Decentraland("1")
      decentraland.landCount = 0
      decentraland.estateCount = 0
    }
    let landLength = decentraland.landCount
    landLength = landLength + 1
    decentraland.landCount = landLength
    decentraland.save()
  } else {
    // Here we are setting old orders as cancelled, because the samrt contract allows new orders to be created
    // and they just overwrite them in place. But the subgraph stores all orders ever
    // you can also overwrite ones that are expired
    let oldOrder = Order.load(parcel.activeOrder)
    if (oldOrder != null){
      oldOrder.status = 'cancelled'
      oldOrder.timeUpdatedAt = event.block.timestamp
    }
  }
  parcel.activeOrder = auctionId
  parcel.updatedAt = event.block.timestamp
  parcel.orderOwner = event.params.seller
  parcel.orderPrice = event.params.priceInWei
  parcel.save()

  let user = new User(event.params.seller.toHex())
  user.parcels = []
  user.save()
}

export function handleLegacyAuctionCancelled(event: AuctionCancelled): void {
  let auctionId = event.params.id.toHex()
  let parcelId = event.params.assetId.toHex()

  // Mark the auction as cancelled
  let auction = new Order(auctionId)
  auction.type = 'parcel'
  auction.status = 'cancelled'
  auction.timeUpdatedAt = event.block.timestamp
  auction.save()

  // Clear the active auction of the parcel
  let parcel = Parcel.load(parcelId)
  if (parcel == null) {
    parcel = new Parcel(parcelId)
    let registry = LANDRegistry.bind(Address.fromString("0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d"))
    let coordinate = registry.decodeTokenId(event.params.assetId)
    parcel.x = coordinate.value0
    parcel.y = coordinate.value1
    parcel.owner = event.params.seller

    let decentraland = Decentraland.load("1")
    if (decentraland == null){
      decentraland = new Decentraland("1")
      decentraland.landCount = 0
      decentraland.estateCount = 0
    }
    let landLength = decentraland.landCount
    landLength = landLength + 1
    decentraland.landCount = landLength
    decentraland.save()
  }
  parcel.activeOrder = null
  parcel.orderOwner = null
  parcel.updatedAt = event.block.timestamp
  parcel.orderPrice = null
  parcel.save()
}

export function handleLegacyAuctionSuccessful(event: AuctionSuccessful): void {
  let auctionId = event.params.id.toHex()
  let parcelId = event.params.assetId.toHex()

  // Mark the auction as sold
  let auction = new Order(auctionId)
  auction.type = 'parcel'
  auction.status = 'sold'
  auction.buyer = event.params.winner
  auction.price = event.params.totalPrice
  auction.timeUpdatedAt = event.block.timestamp
  auction.save()

  // Update the parcel owner and active auction
  let parcel = Parcel.load(parcelId)
  if (parcel == null) {
    parcel = new Parcel(parcelId)
    let registry = LANDRegistry.bind(Address.fromString("0xf87e31492faf9a91b02ee0deaad50d51d56d5d4d"))
    let coordinate = registry.decodeTokenId(event.params.assetId)
    parcel.x = coordinate.value0
    parcel.y = coordinate.value1

    let decentraland = Decentraland.load("1")
    if (decentraland == null){
      decentraland = new Decentraland("1")
      decentraland.landCount = 0
      decentraland.estateCount = 0
    }
    let landLength = decentraland.landCount
    landLength = landLength + 1
    decentraland.landCount = landLength
    decentraland.save()
  }
  parcel.owner = event.params.winner
  parcel.updatedAt = event.block.timestamp
  parcel.lastTransferredAt = event.block.timestamp
  parcel.activeOrder = null
  parcel.orderOwner = null
  parcel.orderPrice = null
  parcel.save()

  let user = new User(event.params.winner.toHex())
  user.parcels = []
  user.save()
}
