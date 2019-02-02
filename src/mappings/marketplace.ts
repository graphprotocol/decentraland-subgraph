import {} from '@graphprotocol/graph-ts'
import {
  OrderCreated,
  OrderSuccessful,
  OrderCancelled,
  AuctionCreated,
  AuctionSuccessful,
  AuctionCancelled,
} from './types/Marketplace/Marketplace'
import {Order, Parcel, Auction} from './types/schema'

export function handleOrderCreated(event: OrderCreated): void {

}

export function handleOrderSuccessful(event: OrderSuccessful): void {

}

export function handleOrderCancelled(event: OrderCancelled): void {

}

export function handleAuctionCreated(event: AuctionCreated): void {

}

export function handleAuctionCancelled(event: AuctionSuccessful): void {

}

export function handleAuctionSuccessful(event: AuctionCancelled): void {

}