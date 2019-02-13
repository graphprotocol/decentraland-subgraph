import {BigInt} from '@graphprotocol/graph-ts'
import {
  Invited,
  UpdateInvites
} from '../types/Invite/Invite'
import {Invite} from '../types/schema'

export function handleInvited(event: Invited): void {
  let senderID = event.params.who.toHex()
  let sender = Invite.load(senderID)
  if (sender == null){
    sender = new Invite(senderID)
  }
  sender.inviteBalance = sender.inviteBalance.minus(BigInt.fromI32(1))
  sender.save()

  let targetID = event.params.target.toHex()
  let target = Invite.load(targetID)
  if (target == null){
    target = new Invite(targetID)
    target.inviteBalance = BigInt.fromI32(0)
    target.invites = []
  }
  let invites = target.invites
  invites.push(event.params.id)
  target.invites = invites
  target.save()
}

export function handleUpdateInvites(event: UpdateInvites): void{
  let id = event.params.who.toHex()
  let inviter = Invite.load(id)
  if (inviter == null){
    inviter = new Invite(id)
    inviter.inviteBalance = BigInt.fromI32(0)
    inviter.invites = []
  }
  inviter.inviteBalance = event.params.amount
  inviter.save()
}