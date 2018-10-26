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

export class Update extends EthereumEvent {
  get params(): UpdateParams {
    return new UpdateParams(this);
  }
}

export class UpdateParams {
  _event: Update;

  constructor(event: Update) {
    this._event = event;
  }

  get assetId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get holder(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get operator(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get data(): string {
    return this._event.parameters[3].value.toString();
  }
}

export class UpdateOperator extends EthereumEvent {
  get params(): UpdateOperatorParams {
    return new UpdateOperatorParams(this);
  }
}

export class UpdateOperatorParams {
  _event: UpdateOperator;

  constructor(event: UpdateOperator) {
    this._event = event;
  }

  get assetId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get operator(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class Transfer extends EthereumEvent {
  get params(): TransferParams {
    return new TransferParams(this);
  }
}

export class TransferParams {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get assetId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }

  get operator(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get userData(): Bytes {
    return this._event.parameters[4].value.toBytes();
  }
}

export class ApprovalForAll extends EthereumEvent {
  get params(): ApprovalForAllParams {
    return new ApprovalForAllParams(this);
  }
}

export class ApprovalForAllParams {
  _event: ApprovalForAll;

  constructor(event: ApprovalForAll) {
    this._event = event;
  }

  get operator(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get holder(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get authorized(): boolean {
    return this._event.parameters[2].value.toBoolean();
  }
}

export class Approval extends EthereumEvent {
  get params(): ApprovalParams {
    return new ApprovalParams(this);
  }
}

export class ApprovalParams {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get operator(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get assetId(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class OwnerUpdate extends EthereumEvent {
  get params(): OwnerUpdateParams {
    return new OwnerUpdateParams(this);
  }
}

export class OwnerUpdateParams {
  _event: OwnerUpdate;

  constructor(event: OwnerUpdate) {
    this._event = event;
  }

  get _prevOwner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get _newOwner(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

export class LANDRegistry__decodeTokenIdResult {
  value0: BigInt;
  value1: BigInt;

  constructor(value0: BigInt, value1: BigInt) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromSignedBigInt(this.value0));
    map.set("value1", EthereumValue.fromSignedBigInt(this.value1));
    return map;
  }
}

export class LANDRegistry__landOfResult {
  value0: Array<BigInt>;
  value1: Array<BigInt>;

  constructor(value0: Array<BigInt>, value1: Array<BigInt>) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromSignedBigIntArray(this.value0));
    map.set("value1", EthereumValue.fromSignedBigIntArray(this.value1));
    return map;
  }
}

export class LANDRegistry extends SmartContract {
  static bind(address: Address): LANDRegistry {
    return new LANDRegistry("LANDRegistry", address);
  }

  supportsInterface(_interfaceID: Bytes): boolean {
    let result = super.call("supportsInterface", [
      EthereumValue.fromFixedBytes(_interfaceID)
    ]);
    return result[0].toBoolean();
  }

  proxyOwner(): Address {
    let result = super.call("proxyOwner", []);
    return result[0].toAddress();
  }

  name(): string {
    let result = super.call("name", []);
    return result[0].toString();
  }

  getApproved(assetId: BigInt): Address {
    let result = super.call("getApproved", [
      EthereumValue.fromUnsignedBigInt(assetId)
    ]);
    return result[0].toAddress();
  }

  totalSupply(): BigInt {
    let result = super.call("totalSupply", []);
    return result[0].toBigInt();
  }

  latestPing(param0: Address): BigInt {
    let result = super.call("latestPing", [EthereumValue.fromAddress(param0)]);
    return result[0].toBigInt();
  }

  isAuthorized(operator: Address, assetId: BigInt): boolean {
    let result = super.call("isAuthorized", [
      EthereumValue.fromAddress(operator),
      EthereumValue.fromUnsignedBigInt(assetId)
    ]);
    return result[0].toBoolean();
  }

  authorizedDeploy(param0: Address): boolean {
    let result = super.call("authorizedDeploy", [
      EthereumValue.fromAddress(param0)
    ]);
    return result[0].toBoolean();
  }

  tokenOfOwnerByIndex(owner: Address, index: BigInt): BigInt {
    let result = super.call("tokenOfOwnerByIndex", [
      EthereumValue.fromAddress(owner),
      EthereumValue.fromUnsignedBigInt(index)
    ]);
    return result[0].toBigInt();
  }

  decimals(): BigInt {
    let result = super.call("decimals", []);
    return result[0].toBigInt();
  }

  bytesToAddress(b: Bytes): Address {
    let result = super.call("bytesToAddress", [
      EthereumValue.fromFixedBytes(b)
    ]);
    return result[0].toAddress();
  }

  tokensOf(owner: Address): Array<BigInt> {
    let result = super.call("tokensOf", [EthereumValue.fromAddress(owner)]);
    return result[0].toBigIntArray();
  }

  ownerOf(assetId: BigInt): Address {
    let result = super.call("ownerOf", [
      EthereumValue.fromUnsignedBigInt(assetId)
    ]);
    return result[0].toAddress();
  }

  GET_METADATA(): Bytes {
    let result = super.call("GET_METADATA", []);
    return result[0].toBytes();
  }

  balanceOf(owner: Address): BigInt {
    let result = super.call("balanceOf", [EthereumValue.fromAddress(owner)]);
    return result[0].toBigInt();
  }

  currentContract(): Address {
    let result = super.call("currentContract", []);
    return result[0].toAddress();
  }

  description(): string {
    let result = super.call("description", []);
    return result[0].toString();
  }

  owner(): Address {
    let result = super.call("owner", []);
    return result[0].toAddress();
  }

  symbol(): string {
    let result = super.call("symbol", []);
    return result[0].toString();
  }

  updateOperator(param0: BigInt): Address {
    let result = super.call("updateOperator", [
      EthereumValue.fromUnsignedBigInt(param0)
    ]);
    return result[0].toAddress();
  }

  isApprovedForAll(assetHolder: Address, operator: Address): boolean {
    let result = super.call("isApprovedForAll", [
      EthereumValue.fromAddress(assetHolder),
      EthereumValue.fromAddress(operator)
    ]);
    return result[0].toBoolean();
  }

  getApprovedAddress(assetId: BigInt): Address {
    let result = super.call("getApprovedAddress", [
      EthereumValue.fromUnsignedBigInt(assetId)
    ]);
    return result[0].toAddress();
  }

  isUpdateAuthorized(operator: Address, assetId: BigInt): boolean {
    let result = super.call("isUpdateAuthorized", [
      EthereumValue.fromAddress(operator),
      EthereumValue.fromUnsignedBigInt(assetId)
    ]);
    return result[0].toBoolean();
  }

  encodeTokenId(x: BigInt, y: BigInt): BigInt {
    let result = super.call("encodeTokenId", [
      EthereumValue.fromSignedBigInt(x),
      EthereumValue.fromSignedBigInt(y)
    ]);
    return result[0].toBigInt();
  }

  decodeTokenId(value: BigInt): LANDRegistry__decodeTokenIdResult {
    let result = super.call("decodeTokenId", [
      EthereumValue.fromUnsignedBigInt(value)
    ]);
    return new LANDRegistry__decodeTokenIdResult(
      result[0].toBigInt(),
      result[1].toBigInt()
    );
  }

  _exists(x: BigInt, y: BigInt): boolean {
    let result = super.call("_exists", [
      EthereumValue.fromSignedBigInt(x),
      EthereumValue.fromSignedBigInt(y)
    ]);
    return result[0].toBoolean();
  }

  exists(assetId: BigInt): boolean {
    let result = super.call("exists", [
      EthereumValue.fromUnsignedBigInt(assetId)
    ]);
    return result[0].toBoolean();
  }

  ownerOfLand(x: BigInt, y: BigInt): Address {
    let result = super.call("ownerOfLand", [
      EthereumValue.fromSignedBigInt(x),
      EthereumValue.fromSignedBigInt(y)
    ]);
    return result[0].toAddress();
  }

  ownerOfLandMany(x: Array<BigInt>, y: Array<BigInt>): Array<Address> {
    let result = super.call("ownerOfLandMany", [
      EthereumValue.fromSignedBigIntArray(x),
      EthereumValue.fromSignedBigIntArray(y)
    ]);
    return result[0].toAddressArray();
  }

  landOf(owner: Address): LANDRegistry__landOfResult {
    let result = super.call("landOf", [EthereumValue.fromAddress(owner)]);
    return new LANDRegistry__landOfResult(
      result[0].toBigIntArray(),
      result[1].toBigIntArray()
    );
  }

  tokenMetadata(assetId: BigInt): string {
    let result = super.call("tokenMetadata", [
      EthereumValue.fromUnsignedBigInt(assetId)
    ]);
    return result[0].toString();
  }

  landData(x: BigInt, y: BigInt): string {
    let result = super.call("landData", [
      EthereumValue.fromSignedBigInt(x),
      EthereumValue.fromSignedBigInt(y)
    ]);
    return result[0].toString();
  }
}
