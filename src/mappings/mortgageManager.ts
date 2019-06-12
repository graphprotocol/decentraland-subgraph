import {BigInt} from '@graphprotocol/graph-ts'
import {
  RequestedMortgage,
  StartedMortgage,
  CanceledMortgage,
  PaidMortgage,
  DefaultedMortgage,
  MortgageManager
} from '../types/MortgageManager/MortgageManager'
import { RCNLoanEngine } from "../types/MortgageManager/RCNLoanEngine";
import {Mortgage, Parcel, User} from '../types/schema'

export function handleRequestedMortgage(event: RequestedMortgage): void{
  let id = event.params._id.toString()
  let mortgage = new Mortgage(id)

  // block fields
  mortgage.txHash = event.transaction.hash
  mortgage.createdAt = event.block.number
  mortgage.lastUpdatedAt = event.block.number
  mortgage.status = "pending"

  // event fields
  mortgage.borrower = event.params._borrower.toHex()
  mortgage.rcnEngine = event.params._engine
  mortgage.loan_id = event.params._loanId
  mortgage.landMarket = event.params._landMarket
  mortgage.landID = event.params._landId
  mortgage.deposit = event.params._deposit
  mortgage.tokenConverter = event.params._tokenConverter

  // can only grab landCost from storage
  let contract = MortgageManager.bind(event.address)
  let storage = contract.mortgages(event.params._id)
  mortgage.landCost = storage.value6

  // get estate from loading the parcel
  mortgage.parcel = event.params._landId.toHex()
  let parcel = Parcel.load(mortgage.parcel)
  if (parcel == null) {
    parcel = new Parcel(mortgage.parcel)
  }
  mortgage.estate = parcel.estate

  // grab from the loan contract
  let engineContract = RCNLoanEngine.bind(event.params._engine)
  let lender = engineContract.getCreator(event.params._id)
  let amount = engineContract.getAmount(event.params._id)
  let dueTime = engineContract.getDueTime(event.params._id).toI32()
  mortgage.lender = lender
  mortgage.loanAmount = amount
  mortgage.dueTime = dueTime

  mortgage.save()

  let user = new User(event.params._borrower.toHex())
  user.mortgages = []
  user.save()
}

export function handleStartedMortgage(event: StartedMortgage): void{
  let id = event.params._id.toString()
  let mortgage = Mortgage.load(id)
  mortgage.lastUpdatedAt = event.block.timestamp
  mortgage.status = "ongoing"
  mortgage.startedAt = event.block.timestamp
  mortgage.save()
}

export function handleCanceledMortgage(event: CanceledMortgage): void{
  let id = event.params._id.toString()
  let mortgage = Mortgage.load(id)
  mortgage.lastUpdatedAt = event.block.timestamp
  mortgage.status = "cancelled"
  mortgage.save()
}

// Note this means it fully paid, and the mortgage token is deleted. NOT partial payment
export function handlePaidMortgage(event: PaidMortgage): void{
  let id = event.params._id.toString()
  let mortgage = Mortgage.load(id)
  mortgage.lastUpdatedAt = event.block.timestamp
  mortgage.status = "paid"
  mortgage.save()
}

// Note - has not been emitted on mainnet, so haven't confirmed it works
export function handleDefaultedMortgage(event: DefaultedMortgage): void{
  let id = event.params._id.toString()
  let mortgage = Mortgage.load(id)
  mortgage.lastUpdatedAt = event.block.timestamp
  mortgage.status = "defaulted"
  mortgage.save()
}
