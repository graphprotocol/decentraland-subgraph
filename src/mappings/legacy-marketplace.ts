import {Address} from '@graphprotocol/graph-ts'
import {
  AuctionCreated,
  AuctionCancelled,
  AuctionSuccessful,
} from '../types/Marketplace/Marketplace'
import {Order, Parcel} from '../types/schema'

/*
Note - the variable name 'auction` is kept throughout, even through we are creating new Order entities. This is to more clearly seperate legacy marketplace from marketplace.
 */

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
  auction.unset('buyer')
  auction.price = event.params.priceInWei
  auction.expiresAt = event.params.expiresAt
  auction.contract = event.params.id as Address
  auction.blockNumber = event.block.number
  auction.blockTimeCreatedAt = event.block.timestamp
  auction.marketplace = event.address
  auction.save()

  // Set the active auction of the parcel
  let parcel = Parcel.load(parcelId)
  if (parcel == null) {
    parcel = new Parcel(parcelId)
  }
  parcel.activeOrder = auctionId
  parcel.orderOwner = event.params.seller
  parcel.orderPrice = event.params.priceInWei
  parcel.save()
}

export function handleLegacyAuctionCancelled(event: AuctionCancelled): void {
  let auctionId = event.params.id.toHex()
  let parcelId = event.params.assetId.toHex()

  // Mark the auction as cancelled
  let auction = new Order(auctionId)
  auction.type = 'parcel'
  auction.status = 'cancelled'
  auction.blockTimeUpdatedAt = event.block.timestamp
  auction.save()

  // Clear the active auction of the parcel
  let parcel = Parcel.load(parcelId)
  if (parcel == null) {
    parcel = new Parcel(parcelId)
  }
  parcel.activeOrder = null
  parcel.orderOwner = null
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
  auction.blockTimeCreatedAt = event.block.timestamp
  auction.save()

  // Update the parcel owner and active auction
  let parcel = Parcel.load(parcelId)
  if (parcel == null) {
    parcel = new Parcel(parcelId)
  }
  parcel.owner = event.params.winner
  parcel.activeOrder = null
  parcel.orderOwner = null
  parcel.orderPrice = null
  parcel.save()
}
