import {  } from '@graphprotocol/graph-ts'
import {
  CreateEstate,
  AddLand,
  RemoveLand,
  UpdateOperator,
  Update
} from './types/EstateRegistry/Estate'
import { Estate } from './types/schema'

export function handleCreateEstate(event: CreateEstate): void {
  let id = event.params._estateId.toHex()
  let estate = new Estate(id)

  estate.owner = event.params._owner
  estate.metaData = event.params._data

}

export function handleAddLand(event: AddLand): void {
}

export function handleRemoveLand(event: RemoveLand): void {
}

export function handleUpdate(event: Update): void {
}

export function handleUpdateOperator(event: UpdateOperator): void {
}