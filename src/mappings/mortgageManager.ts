import {BigInt} from '@graphprotocol/graph-ts'
import {
  RequestedMortgage,
  StartedMortgage,
  CanceledMortgage,
  PaidMortgage,
  DefaultedMortgage,
  UpdatedLandData
} from '../types/MortgageManager/MortgageManager'
import {Estate, Mortgage, Parcel} from '../types/schema'


// event RequestedMortgage(
//   uint256 _id,
//   address _borrower,
//   address _engine,
//   uint256 _loanId,
//   address _landMarket,
//   uint256 _landId,
//   uint256 _deposit,
//   address _tokenConverter
// );
//
// event StartedMortgage(uint256 _id);
// event CanceledMortgage(address _from, uint256 _id);
// event PaidMortgage(address _from, uint256 _id); IS THIS ONE PAYMENT , or fully paid
// event DefaultedMortgage(uint256 _id);
// event UpdatedLandData(address _updater, uint256 _parcel, string _data);


export function handleRequestedMortgage(event: RequestedMortgage): void{
  let id = event.params._id.toHex()
  let mortgage = new Mortgage(id)

  // block fields
  mortgage.txHash = event.transaction.hash
  mortgage.createdAt = event.block.number
  mortgage.lastUpdatedAt = event.block.number
  mortgage.status = "pending"

  // event fields
  mortgage.borrower = event.params._borrower
  mortgage.rcnEngine = event.params._engine
  mortgage.loan_id = event.params._loanId
  mortgage.landMarket = event.params._landMarket
  mortgage.landID = event.params._landId
  mortgage.deposit = event.params._deposit
  mortgage.tokenConverter = event.params._tokenConverter

  // tODO - get the landCost by mortages[event.params._id)


  // get estate from loading the parcel // TODO - cant fully test until a full sync
  // mortgage.parcel = event.params._landId.toHex()
  // let parcel = Parcel.load(mortgage.parcel)
  // mortgage.estate = parcel.estate

  mortgage.save()
}

export function handleStartedMortgage(event: StartedMortgage): void{

  //ongoing
  // time started at
  // last updated at
  // note, nothing else is really updated in the Mortgage

}

export function handleCanceledMortgage(event: CanceledMortgage): void{

  // update it to cancelled , dont owrry about the _from

}

// Note this means it fully paid, and the mortgage token is deleted. NOT partial payment
export function handlePaidMortgage(event: PaidMortgage): void{

  //last updated at (implies it has been paid)
  // update status to paid

}

// Note - has not been emitted on mainnet, so haven't confirmed it works
export function handleDefaultedMortgage(event: DefaultedMortgage): void{

  //last updated at (implies it has been paid)
  // update status to defaulted
}