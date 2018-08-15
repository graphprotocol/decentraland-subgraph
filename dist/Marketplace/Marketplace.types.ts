class AuctionCreated extends EthereumEvent {
  get params(): AuctionCreatedParams {
    return new AuctionCreatedParams(this);
  }
}

class AuctionCreatedParams {
  _event: AuctionCreated;

  constructor(event: AuctionCreated) {
    this._event = event;
  }

  get id(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get assetId(): U256 {
    return this._event.parameters[1].value.toU256();
  }

  get seller(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get priceInWei(): U256 {
    return this._event.parameters[3].value.toU256();
  }

  get expiresAt(): U256 {
    return this._event.parameters[4].value.toU256();
  }
}

class AuctionSuccessful extends EthereumEvent {
  get params(): AuctionSuccessfulParams {
    return new AuctionSuccessfulParams(this);
  }
}

class AuctionSuccessfulParams {
  _event: AuctionSuccessful;

  constructor(event: AuctionSuccessful) {
    this._event = event;
  }

  get id(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get assetId(): U256 {
    return this._event.parameters[1].value.toU256();
  }

  get seller(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get totalPrice(): U256 {
    return this._event.parameters[3].value.toU256();
  }

  get winner(): Address {
    return this._event.parameters[4].value.toAddress();
  }
}

class AuctionCancelled extends EthereumEvent {
  get params(): AuctionCancelledParams {
    return new AuctionCancelledParams(this);
  }
}

class AuctionCancelledParams {
  _event: AuctionCancelled;

  constructor(event: AuctionCancelled) {
    this._event = event;
  }

  get id(): Bytes {
    return this._event.parameters[0].value.toBytes();
  }

  get assetId(): U256 {
    return this._event.parameters[1].value.toU256();
  }

  get seller(): Address {
    return this._event.parameters[2].value.toAddress();
  }
}

class ChangedPublicationFee extends EthereumEvent {
  get params(): ChangedPublicationFeeParams {
    return new ChangedPublicationFeeParams(this);
  }
}

class ChangedPublicationFeeParams {
  _event: ChangedPublicationFee;

  constructor(event: ChangedPublicationFee) {
    this._event = event;
  }

  get publicationFee(): U256 {
    return this._event.parameters[0].value.toU256();
  }
}

class ChangedOwnerCut extends EthereumEvent {
  get params(): ChangedOwnerCutParams {
    return new ChangedOwnerCutParams(this);
  }
}

class ChangedOwnerCutParams {
  _event: ChangedOwnerCut;

  constructor(event: ChangedOwnerCut) {
    this._event = event;
  }

  get ownerCut(): U256 {
    return this._event.parameters[0].value.toU256();
  }
}

class Pause extends EthereumEvent {
  get params(): PauseParams {
    return new PauseParams(this);
  }
}

class PauseParams {
  _event: Pause;

  constructor(event: Pause) {
    this._event = event;
  }
}

class Unpause extends EthereumEvent {
  get params(): UnpauseParams {
    return new UnpauseParams(this);
  }
}

class UnpauseParams {
  _event: Unpause;

  constructor(event: Unpause) {
    this._event = event;
  }
}

class OwnershipTransferred extends EthereumEvent {
  get params(): OwnershipTransferredParams {
    return new OwnershipTransferredParams(this);
  }
}

class OwnershipTransferredParams {
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

class Marketplace__auctionByAssetIdResult {
  value0: Bytes;
  value1: Address;
  value2: U256;
  value3: U256;

  constructor(value0: Bytes, value1: Address, value2: U256, value3: U256) {
    this.value0 = value0;
    this.value1 = value1;
    this.value2 = value2;
    this.value3 = value3;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromFixedBytes(this.value0));
    map.set("value1", EthereumValue.fromAddress(this.value1));
    map.set("value2", EthereumValue.fromU256(this.value2));
    map.set("value3", EthereumValue.fromU256(this.value3));
    return map;
  }
}

class Marketplace extends SmartContract {
  static bind(address: Address, blockHash: H256): Marketplace {
    return new Marketplace("Marketplace", address, blockHash);
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

  ownerCutPercentage(): U256 {
    let result = super.call("ownerCutPercentage", []);
    return result[0].toU256();
  }

  owner(): Address {
    let result = super.call("owner", []);
    return result[0].toAddress();
  }

  publicationFeeInWei(): U256 {
    let result = super.call("publicationFeeInWei", []);
    return result[0].toU256();
  }

  auctionByAssetId(param0: U256): Marketplace__auctionByAssetIdResult {
    let result = super.call("auctionByAssetId", [
      EthereumValue.fromU256(param0)
    ]);
    return new Marketplace__auctionByAssetIdResult(
      result[0].toBytes(),
      result[1].toAddress(),
      result[2].toU256(),
      result[3].toU256()
    );
  }
}
