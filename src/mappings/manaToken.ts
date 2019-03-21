import {BigInt} from '@graphprotocol/graph-ts'
import {
  Mint,
  Burn,
  Transfer
} from '../types/Mana/Mana'
import {User} from '../types/schema'

export function handleMint(event: Mint): void {
  let id = event.params.to.toHex()
  let user =  User.load(id)
  if (user == null){
    user = new User(id)
    user.mana = BigInt.fromI32(0)
  }
  user.mana = user.mana.plus(event.params.amount)
  user.save()
}

export function handleBurn(event: Burn): void{
  let id = event.params.burner.toHex()
  let user =  User.load(id)
  if (user == null){
    user = new User(id)
    user.mana = BigInt.fromI32(0)
  }
  user.mana = user.mana.minus(event.params.value)
  user.save()
}

export function handleTransfer(event: Transfer): void {
  let userToID = event.params.to.toHex()
  let userTo = User.load(userToID)
  if (userTo == null){
    userTo = new User(userToID)
    userTo.mana = BigInt.fromI32(0)
  }
  userTo.mana = userTo.mana.plus(event.params.value)
  userTo.save()

  let userFromID = event.params.from.toHex()
  let userFrom = User.load(userFromID)
  if (userFrom == null){
    userFrom = new User(userFromID)
    userFrom.mana = BigInt.fromI32(0)
  }
  userFrom.mana = userFrom.mana.minus(event.params.value)
  userFrom.save()
}