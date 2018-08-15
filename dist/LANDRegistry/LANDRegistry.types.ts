class Update extends EthereumEvent {
  get params(): UpdateParams {
    return new UpdateParams(this);
  }
}

class UpdateParams {
  _event: Update;

  constructor(event: Update) {
    this._event = event;
  }

  get assetId(): U256 {
    return this._event.parameters[0].value.toU256();
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

class UpdateOperator extends EthereumEvent {
  get params(): UpdateOperatorParams {
    return new UpdateOperatorParams(this);
  }
}

class UpdateOperatorParams {
  _event: UpdateOperator;

  constructor(event: UpdateOperator) {
    this._event = event;
  }

  get assetId(): U256 {
    return this._event.parameters[0].value.toU256();
  }

  get operator(): Address {
    return this._event.parameters[1].value.toAddress();
  }
}

class Transfer extends EthereumEvent {
  get params(): TransferParams {
    return new TransferParams(this);
  }
}

class TransferParams {
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

  get assetId(): U256 {
    return this._event.parameters[2].value.toU256();
  }

  get operator(): Address {
    return this._event.parameters[3].value.toAddress();
  }

  get userData(): Bytes {
    return this._event.parameters[4].value.toBytes();
  }
}

class ApprovalForAll extends EthereumEvent {
  get params(): ApprovalForAllParams {
    return new ApprovalForAllParams(this);
  }
}

class ApprovalForAllParams {
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

class Approval extends EthereumEvent {
  get params(): ApprovalParams {
    return new ApprovalParams(this);
  }
}

class ApprovalParams {
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

  get assetId(): U256 {
    return this._event.parameters[2].value.toU256();
  }
}

class OwnerUpdate extends EthereumEvent {
  get params(): OwnerUpdateParams {
    return new OwnerUpdateParams(this);
  }
}

class OwnerUpdateParams {
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

class LANDRegistry__decodeTokenIdResult {
  value0: I256;
  value1: I256;

  constructor(value0: I256, value1: I256) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromI256(this.value0));
    map.set("value1", EthereumValue.fromI256(this.value1));
    return map;
  }
}

class LANDRegistry__landOfResult {
  value0: Array<I256>;
  value1: Array<I256>;

  constructor(value0: Array<I256>, value1: Array<I256>) {
    this.value0 = value0;
    this.value1 = value1;
  }

  toMap(): TypedMap<string, EthereumValue> {
    let map = new TypedMap<string, EthereumValue>();
    map.set("value0", EthereumValue.fromI256(this.value0));
    map.set("value1", EthereumValue.fromI256(this.value1));
    return map;
  }
}

class LANDRegistry extends SmartContract {
  static bind(address: Address, blockHash: H256): LANDRegistry {
    return new LANDRegistry("LANDRegistry", address, blockHash);
  }

  supportsInterface(_interfaceID: Bytes): boolean {
    let result = super.call("supportsInterface", [
      EthereumValue.fromBytes(_interfaceID)
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

  getApproved(assetId: U256): Address {
    let result = super.call("getApproved", [EthereumValue.fromU256(assetId)]);
    return result[0].toAddress();
  }

  totalSupply(): U256 {
    let result = super.call("totalSupply", []);
    return result[0].toU256();
  }

  latestPing(param0: Address): U256 {
    let result = super.call("latestPing", [EthereumValue.fromAddress(param0)]);
    return result[0].toU256();
  }

  isAuthorized(operator: Address, assetId: U256): boolean {
    let result = super.call("isAuthorized", [
      EthereumValue.fromAddress(operator),
      EthereumValue.fromU256(assetId)
    ]);
    return result[0].toBoolean();
  }

  authorizedDeploy(param0: Address): boolean {
    let result = super.call("authorizedDeploy", [
      EthereumValue.fromAddress(param0)
    ]);
    return result[0].toBoolean();
  }

  tokenOfOwnerByIndex(owner: Address, index: U256): U256 {
    let result = super.call("tokenOfOwnerByIndex", [
      EthereumValue.fromAddress(owner),
      EthereumValue.fromU256(index)
    ]);
    return result[0].toU256();
  }

  decimals(): U256 {
    let result = super.call("decimals", []);
    return result[0].toU256();
  }

  bytesToAddress(b: Bytes): Address {
    let result = super.call("bytesToAddress", [EthereumValue.fromBytes(b)]);
    return result[0].toAddress();
  }

  tokensOf(owner: Address): Array<U256> {
    let result = super.call("tokensOf", [EthereumValue.fromAddress(owner)]);
    return result[0].toU256Array();
  }

  ownerOf(assetId: U256): Address {
    let result = super.call("ownerOf", [EthereumValue.fromU256(assetId)]);
    return result[0].toAddress();
  }

  GET_METADATA(): Bytes {
    let result = super.call("GET_METADATA", []);
    return result[0].toBytes();
  }

  balanceOf(owner: Address): U256 {
    let result = super.call("balanceOf", [EthereumValue.fromAddress(owner)]);
    return result[0].toU256();
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

  updateOperator(param0: U256): Address {
    let result = super.call("updateOperator", [EthereumValue.fromU256(param0)]);
    return result[0].toAddress();
  }

  isApprovedForAll(assetHolder: Address, operator: Address): boolean {
    let result = super.call("isApprovedForAll", [
      EthereumValue.fromAddress(assetHolder),
      EthereumValue.fromAddress(operator)
    ]);
    return result[0].toBoolean();
  }

  getApprovedAddress(assetId: U256): Address {
    let result = super.call("getApprovedAddress", [
      EthereumValue.fromU256(assetId)
    ]);
    return result[0].toAddress();
  }

  isUpdateAuthorized(operator: Address, assetId: U256): boolean {
    let result = super.call("isUpdateAuthorized", [
      EthereumValue.fromAddress(operator),
      EthereumValue.fromU256(assetId)
    ]);
    return result[0].toBoolean();
  }

  encodeTokenId(x: I256, y: I256): U256 {
    let result = super.call("encodeTokenId", [
      EthereumValue.fromI256(x),
      EthereumValue.fromI256(y)
    ]);
    return result[0].toU256();
  }

  decodeTokenId(value: U256): LANDRegistry__decodeTokenIdResult {
    let result = super.call("decodeTokenId", [EthereumValue.fromU256(value)]);
    return new LANDRegistry__decodeTokenIdResult(
      result[0].toI256(),
      result[1].toI256()
    );
  }

  _exists(x: I256, y: I256): boolean {
    let result = super.call("_exists", [
      EthereumValue.fromI256(x),
      EthereumValue.fromI256(y)
    ]);
    return result[0].toBoolean();
  }

  exists(assetId: U256): boolean {
    let result = super.call("exists", [EthereumValue.fromU256(assetId)]);
    return result[0].toBoolean();
  }

  ownerOfLand(x: I256, y: I256): Address {
    let result = super.call("ownerOfLand", [
      EthereumValue.fromI256(x),
      EthereumValue.fromI256(y)
    ]);
    return result[0].toAddress();
  }

  ownerOfLandMany(x: Array<I256>, y: Array<I256>): Array<Address> {
    let result = super.call("ownerOfLandMany", [
      EthereumValue.fromI256(x),
      EthereumValue.fromI256(y)
    ]);
    return result[0].toAddressArray();
  }

  landOf(owner: Address): LANDRegistry__landOfResult {
    let result = super.call("landOf", [EthereumValue.fromAddress(owner)]);
    return new LANDRegistry__landOfResult(
      result[0].toI256Array(),
      result[1].toI256Array()
    );
  }

  tokenMetadata(assetId: U256): string {
    let result = super.call("tokenMetadata", [EthereumValue.fromU256(assetId)]);
    return result[0].toString();
  }

  landData(x: I256, y: I256): string {
    let result = super.call("landData", [
      EthereumValue.fromI256(x),
      EthereumValue.fromI256(y)
    ]);
    return result[0].toString();
  }
}
