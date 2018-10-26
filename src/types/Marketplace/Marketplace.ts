import {
  EthereumEvent,
  SmartContract,
  EthereumValue,
  JSONValue,
  TypedMap,
  Entity,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class AuctionCreated extends EthereumEvent {
  get params(): AuctionCreatedParams {
    return new AuctionCreatedParams(this);
  }
}

export class AuctionCreatedParams {
  _event: AuctionCreated;

  constructor(event: AuctionCreated) {
    this._event = event;
  }

  get id(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get assetId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get seller(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get priceInWei(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get expiresAt(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class AuctionSuccessful extends EthereumEvent {
  get params(): AuctionSuccessfulParams {
    return new AuctionSuccessfulParams(this);
  }
}

export class AuctionSuccessfulParams {
  _event: AuctionSuccessful;

  constructor(event: AuctionSuccessful) {
    this._event = event;
  }

  get id(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get assetId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get seller(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get totalPrice(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get winner(): Address {
    return this._event.parameters[4].value.toAddress();
  }
}

export class AuctionCancelled extends EthereumEvent {
  get params(): AuctionCancelledParams {
    return new AuctionCancelledParams(this);
  }
}

export class AuctionCancelledParams {
  _event: AuctionCancelled;

  constructor(event: AuctionCancelled) {
    this._event = event;
  }

  get id(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get assetId(): BigInt {
    return this._event.parameters[1].value.toBigInt();
  }

  get seller(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

export class ChangedPublicationFee extends EthereumEvent {
  get params(): ChangedPublicationFeeParams {
    return new ChangedPublicationFeeParams(this);
  }
}

export class ChangedPublicationFeeParams {
  _event: ChangedPublicationFee;

  constructor(event: ChangedPublicationFee) {
    this._event = event;
  }

  get publicationFee(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class ChangedOwnerCut extends EthereumEvent {
  get params(): ChangedOwnerCutParams {
    return new ChangedOwnerCutParams(this);
  }
}

export class ChangedOwnerCutParams {
  _event: ChangedOwnerCut;

  constructor(event: ChangedOwnerCut) {
    this._event = event;
  }

  get ownerCut(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }
}

export class Pause extends EthereumEvent {
  get params(): PauseParams {
    return new PauseParams(this);
  }
}

export class PauseParams {
  _event: Pause;

  constructor(event: Pause) {
    this._event = event;
  }
}

export class Unpause extends EthereumEvent {
  get params(): UnpauseParams {
    return new UnpauseParams(this);
  }
}

export class UnpauseParams {
  _event: Unpause;

  constructor(event: Unpause) {
    this._event = event;
  }
}

export class OwnershipTransferred extends EthereumEvent {
  get params(): OwnershipTransferredParams {
    return new OwnershipTransferredParams(this);
  }
}

export class OwnershipTransferredParams {
  _event: OwnershipTransferred;

  constructor(event: OwnershipTransferred) {
    this._event = event;
  }

  get previousOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Marketplace__auctionByAssetIdResult {
  value0: Bytes;
  value1: Address;
  value2: BigInt;
  value3: BigInt;

  constructor(value0: Bytes, value1: Address, value2: BigInt, value3: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromFixedBytes(this.value0));
    map.set("value1", EthereumValue.fromAddress(this.value1));
    map.set("value2", EthereumValue.fromUnsignedBigInt(this.value2));
    map.set("value3", EthereumValue.fromUnsignedBigInt(this.value3));
    return map;
  }
}

export class Marketplace extends SmartContract {
  static bind(address: Address): Marketplace {
    return new Marketplace("Marketplace", address);
  }

  nonFungibleRegistry(): Address {
    let result = super.call("nonFungibleRegistry", []);
    return result[0].toAddress();
  }

  acceptedToken(): Address {
    let result = super.call("acceptedToken", []);
    return result[0].toAddress();
  }

  paused(): boolean {
    let result = super.call("paused", []);
    return result[0].toBoolean();
  }

  ownerCutPercentage(): BigInt {
    let result = super.call("ownerCutPercentage", []);
    return result[0].toBigInt();
  }

  owner(): Address {
    let result = super.call("owner", []);
    return result[0].toAddress();
  }

  publicationFeeInWei(): BigInt {
    let result = super.call("publicationFeeInWei", []);
    return result[0].toBigInt();
  }

  auctionByAssetId(param0: BigInt): Marketplace__auctionByAssetIdResult {
    let result = super.call("auctionByAssetId", [
      EthereumValue.fromUnsignedBigInt(param0)
    ]);
    return new Marketplace__auctionByAssetIdResult(
      result[0].toBytes(),
      result[1].toAddress(),
      result[2].toBigInt(),
      result[3].toBigInt()
    );
  }
}
