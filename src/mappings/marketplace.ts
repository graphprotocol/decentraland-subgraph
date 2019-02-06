import {} from '@graphprotocol/graph-ts'
import {
  OrderCreated,
  OrderSuccessful,
  OrderCancelled,
  AuctionCreated,
  AuctionSuccessful,
  AuctionCancelled,
} from '../types/Marketplace/Marketplace'
import {Order, Parcel} from '../types/schema'
import {Address} from "@graphprotocol/graph-ts";

/*
Note - a legacy auction is very similar to an order. an order is updated to include
       the nft ID. When createOrder is called without the nftAddress, it emits the
       legacy event AuctionCreated
       Both Auction and Order as stored as Orders in the schema. with a flag indicating
       if it was legacy.
 */

// TODO should be loading parcels in the handlers, except for creation

export function handleOrderCreated(event: OrderCreated): void {
  let orderID = event.params.id.toHex()
  let assetID = event.params.assetId.toHex() // ID of the published NFT

  // Create the order
  let order = new Order(orderID)
  order.type = 'parcel'
  order.parcel = assetID
  order.status = 'open'
  order.txStatus = 'confirmed'
  order.txHash = event.transaction.hash
  order.owner = event.params.seller
  order.unset('buyer')
  order.price = event.params.priceInWei
  order.expiresAt = event.params.expiresAt
  order.contract = event.params.id as Address
  order.blockNumber = event.block.number
  order.blockTimeCreatedAt = event.block.timestamp
  order.marketplace = event.address
  order.nftAddress = event.params.nftAddress
  order.save()

  // Set the active order of the parcel
  let parcel = new Parcel(assetID)
  parcel.activeOrder = orderID
  parcel.orderOwner = event.params.seller
  parcel.orderPrice = event.params.priceInWei
  parcel.save()
}

export function handleOrderSuccessful(event: OrderSuccessful): void {
  let orderID = event.params.id.toHex()
  let parcelId = event.params.assetId.toHex()

  // Mark the order as sold
  let order = new Order(orderID)
  order.type = 'parcel'
  order.status = 'sold'
  order.buyer = event.params.buyer
  order.price = event.params.totalPrice
  order.blockTimeCreatedAt = event.block.timestamp
  order.nftAddress = event.params.nftAddress
  order.save()

  // Update the parcel owner and active order
  let parcel = new Parcel(parcelId)
  parcel.owner = event.params.buyer
  parcel.activeOrder = null
  parcel.orderOwner = null
  parcel.orderPrice = null
  parcel.save()
}

export function handleOrderCancelled(event: OrderCancelled): void {
  let orderID = event.params.id.toHex()
  let parcelId = event.params.assetId.toHex()

  // Mark the order as cancelled
  let order = new Order(orderID)
  order.type = 'parcel'
  order.status = 'cancelled'
  order.blockTimeUpdatedAt = event.block.timestamp
  order.nftAddress = event.params.nftAddress
  order.save()

  // Clear the active order of the parcel
  let parcel = new Parcel(parcelId)
  parcel.activeOrder = null
  parcel.orderOwner = null
  parcel.orderPrice = null
  parcel.save()



}

// Where event AuctionCreated creates an Order - the updated name
export function handleAuctionCreated(event: AuctionCreated): void {
  let orderID = event.params.id.toHex()
  let parcelId = event.params.assetId.toHex()

  // Create the order
  let order = new Order(orderID)
  order.type = 'parcel'
  order.parcel = parcelId
  order.status = 'open'
  order.txStatus = 'confirmed'
  order.txHash = event.transaction.hash
  order.owner = event.params.seller
  order.unset('buyer')
  order.price = event.params.priceInWei
  order.expiresAt = event.params.expiresAt
  order.contract = event.params.id as Address
  order.blockNumber = event.block.number
  order.blockTimeCreatedAt = event.block.timestamp
  order.marketplace = event.address
  order.save()

  // Set the active order of the parcel
  let parcel = new Parcel(parcelId)
  parcel.activeOrder = orderID
  parcel.orderOwner = event.params.seller
  parcel.orderPrice = event.params.priceInWei
  parcel.save()
}

// Where event AuctionCancelled creates an Order - the updated name
export function handleAuctionCancelled(event: AuctionCancelled): void {
  let orderID = event.params.id.toHex()
  let parcelId = event.params.assetId.toHex()

  // Mark the order as cancelled
  let order = new Order(orderID)
  order.type = 'parcel'
  order.status = 'cancelled'
  order.blockTimeUpdatedAt = event.block.timestamp
  order.save()

  // Clear the active order of the parcel
  let parcel = new Parcel(parcelId)
  parcel.activeOrder = null
  parcel.orderOwner = null
  parcel.orderPrice = null
  parcel.save()
}

// Where event AuctionSuccessful creates an Order - the updated name
export function handleAuctionSuccessful(event: AuctionSuccessful): void {
  let orderID = event.params.id.toHex()
  let parcelId = event.params.assetId.toHex()

  // Mark the order as sold
  let order = new Order(orderID)
  order.type = 'parcel'
  order.status = 'sold'
  order.buyer = event.params.winner
  order.price = event.params.totalPrice
  order.blockTimeCreatedAt = event.block.timestamp
  order.save()

  // Update the parcel owner and active orderID
  let parcel = new Parcel(parcelId)
  parcel.owner = event.params.winner
  parcel.activeOrder = null
  parcel.orderOwner = null
  parcel.orderPrice = null
  parcel.save()
}