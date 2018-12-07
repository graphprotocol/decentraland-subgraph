import { Address } from '@graphprotocol/graph-ts'
import {
  AuctionCreated,
  AuctionCancelled,
  AuctionSuccessful,
  PauseParams,
} from './types/Marketplace/Marketplace'
import { Auction, Parcel } from './types/schema'

export function handleAuctionCreated(event: AuctionCreated): void {
  let auctionId = event.params.id.toHex()
  let parcelId = event.params.assetId.toHex()

  // Create the auction
  let auction = new Auction(auctionId)
  auction.type = 'parcel'
  auction.parcel = parcelId
  auction.status = 'open'
  auction.txStatus = 'confirmed'
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
  let parcel = new Parcel(parcelId)
  parcel.activeAuction = auctionId
  parcel.auctionOwner = event.params.seller
  parcel.auctionPrice = event.params.priceInWei
  parcel.save()
}

export function handleAuctionCancelled(event: AuctionCancelled): void {
  let auctionId = event.params.id.toHex()
  let parcelId = event.params.assetId.toHex()

  // Mark the auction as cancelled
  let auction = new Auction(auctionId)
  auction.type = 'parcel'
  auction.status = 'cancelled'
  auction.blockTimeUpdatedAt = event.block.timestamp
  auction.save()

  // Clear the active auction of the parcel
  let parcel = new Parcel(parcelId)
  parcel.activeAuction = null
  parcel.auctionOwner = null
  parcel.auctionPrice = null
  parcel.save()
}

export function handleAuctionSuccessful(event: AuctionSuccessful): void {
  let auctionId = event.params.id.toHex()
  let parcelId = event.params.assetId.toHex()

  // Mark the auction as sold
  let auction = new Auction(auctionId)
  auction.type = 'parcel'
  auction.status = 'sold'
  auction.buyer = event.params.winner
  auction.price = event.params.totalPrice
  auction.blockTimeCreatedAt = event.block.timestamp
  auction.save()

  // Update the parcel owner and active auction
  let parcel = new Parcel(parcelId)
  parcel.owner = event.params.winner
  parcel.activeAuction = null
  parcel.auctionOwner = null
  parcel.auctionPrice = null
  parcel.save()
}
