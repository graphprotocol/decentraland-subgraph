import 'allocator/arena'

// Export allocator functions for hosts to manage WASM memory
export { allocate_memory }

/**
 * Host store interface.
 */
declare namespace store {
  function set(entity: string, id: string, data: Entity): void
  function remove(entity: string, id: string): void
}

/** Host ethereum interface */
declare namespace ethereum {
  function call(call: SmartContractCall): Array<EthereumValue>
}

/** Host IPFS interface */
declare namespace ipfs {
  function cat(hash: String): Bytes
}

/** Host JSON interface */
declare namespace json {
  function fromBytes(data: Bytes): JSONValue
  function toI64(decimal: string): i64
  function toU64(decimal: string): u64
  function toF64(decimal: string): f64
  function toBigInt(decimal: string): BigInt
}

/** Host type conversion interface */
declare namespace typeConversion {
  function bytesToString(address: Address): string
  function bytesToHex(bytes: Bytes): string
  function u64ArrayToHex(array: U64Array): string
  function u64ArrayToString(array: U64Array): string
  function h256ToH160(h: H256): H160
  function h160ToH256(h: H160): H256
  function u256ToH160(u: U256): H160
  function u256ToH256(u: U256): H256
  function int256ToBigInt(u: U256): BigInt
  function stringToH160(s: String): H160
}

/**
 * TypedMap entry.
 */
class TypedMapEntry<K, V> {
  key: K
  value: V

  constructor(key: K, value: V) {
    this.key = key
    this.value = value
  }
}

/** Typed map */
class TypedMap<K, V> {
  entries: Array<TypedMapEntry<K, V>>

  constructor() {
    this.entries = new Array<TypedMapEntry<K, V>>()
  }

  set(key: K, value: V): void {
    let entry = this.getEntry(key)
    if (entry !== null) {
      entry.value = value
    } else {
      let entry = new TypedMapEntry<K, V>(key, value)
      this.entries.push(entry)
    }
  }

  getEntry(key: K): TypedMapEntry<K, V> | null {
    for (let i: i32 = 0; i < this.entries.length; i++) {
      if (this.entries[i].key == key) {
        return this.entries[i]
      }
    }
    return null
  }

  get(key: K): V | null {
    for (let i: i32 = 0; i < this.entries.length; i++) {
      if (this.entries[i].key == key) {
        return this.entries[i].value
      }
    }
    return null
  }
}

/**
 * Byte array
 */
class ByteArray extends Uint8Array {
  toHex(): string {
    return typeConversion.bytesToHex(this)
  }

  toString(): string {
    return typeConversion.bytesToString(this)
  }
}

/** U64Array */
class U64Array extends Uint64Array {
  toHex(): string {
    return typeConversion.u64ArrayToHex(this)
  }

  toString(): string {
    return typeConversion.u64ArrayToString(this)
  }

  toAddress(): Address {
    return typeConversion.u256ToH160(this)
  }
}

/** An Ethereum address (20 bytes). */
class Address extends ByteArray {
  static fromString(s: String): Address {
    return changetype<Address>(typeConversion.stringToH160(s))
  }
}

/** An arbitrary size integer. */
type BigInt = ByteArray

/** A dynamically-sized byte array. */
type Bytes = ByteArray

/** A 160-bit hash. */
class H160 extends ByteArray {
  static fromString(s: String): H160 {
    return typeConversion.stringToH160(s)
  }
}

/** A 256-bit hash. */
type H256 = ByteArray

/** A signed 128-bit integer. */
type I128 = U64Array

/** A signed 256-bit integer. */
type I256 = U64Array

/** An unsigned 128-bit integer. */
type U128 = U64Array

/** An unsigned 256-bit integer. */
type U256 = U64Array

/** Type hint for Ethereum values. */
enum EthereumValueKind {
  ADDRESS,
  FIXED_BYTES,
  BYTES,
  INT,
  UINT,
  BOOL,
  STRING,
  FIXED_ARRAY,
  ARRAY,
}

/**
 * Pointer type for EthereumValue data.
 *
 * Big enough to fit any pointer or native `this.data`.
 */
type EthereumValuePayload = u64

/**
 * A dynamically typed value used when accessing Ethereum data.
 */
class EthereumValue {
  kind: EthereumValueKind
  data: EthereumValuePayload

  toAddress(): Address {
    assert(
      this.kind == EthereumValueKind.ADDRESS ||
        this.kind == EthereumValueKind.UINT ||
        this.kind == EthereumValueKind.INT,
      'EthereumValue is not an address, uint or int.'
    )
    if (this.kind == EthereumValueKind.ADDRESS) {
      return changetype<Address>(this.data as u32)
    } else if (this.kind == EthereumValueKind.UINT) {
      return typeConversion.u256ToH160(this.toU256()) as Address
    } else if (this.kind == EthereumValueKind.INT) {
      return typeConversion.u256ToH160(this.toI128()) as Address
    }
    throw new Error('Type conversion from ' + this.kind + ' to address not supported')
  }

  toBoolean(): boolean {
    assert(this.kind == EthereumValueKind.BOOL, 'EthereumValue is not a boolean.')
    return this.data != 0
  }

  toBytes(): Bytes {
    assert(
      this.kind == EthereumValueKind.FIXED_BYTES || this.kind == EthereumValueKind.BYTES,
      'EthereumValue is not bytes.'
    )
    return changetype<Bytes>(this.data as u32)
  }

  toI8(): i8 {
    assert(
      this.kind == EthereumValueKind.INT || this.kind == EthereumValueKind.UINT,
      'EthereumValue is not an int or uint.'
    )
    return this.data as i8
  }

  toI16(): i16 {
    assert(
      this.kind == EthereumValueKind.INT || this.kind == EthereumValueKind.UINT,
      'EthereumValue is not an int or uint.'
    )
    return this.data as i16
  }

  toI32(): i32 {
    assert(
      this.kind == EthereumValueKind.INT || this.kind == EthereumValueKind.UINT,
      'EthereumValue is not an int or uint.'
    )
    return this.data as i32
  }

  toI128(): I128 {
    assert(
      this.kind == EthereumValueKind.INT || this.kind == EthereumValueKind.UINT,
      'EthereumValue is not an int or uint.'
    )
    return changetype<I128>(this.data as u32)
  }

  toI256(): I256 {
    assert(
      this.kind == EthereumValueKind.INT || this.kind == EthereumValueKind.UINT,
      'EthereumValue is not an int or uint.'
    )
    return changetype<I256>(this.data as u32)
  }

  toU8(): u8 {
    assert(
      this.kind == EthereumValueKind.INT || this.kind == EthereumValueKind.UINT,
      'EthereumValue is not an int or uint.'
    )
    return this.data as u8
  }

  toU16(): u16 {
    assert(
      this.kind == EthereumValueKind.INT || this.kind == EthereumValueKind.UINT,
      'EthereumValue is not an int or uint.'
    )
    return this.data as u16
  }

  toU32(): u32 {
    assert(
      this.kind == EthereumValueKind.INT || this.kind == EthereumValueKind.UINT,
      'EthereumValue is not an int or uint.'
    )
    return this.data as u32
  }

  toU128(): U128 {
    assert(
      this.kind == EthereumValueKind.INT || this.kind == EthereumValueKind.UINT,
      'EthereumValue is not an int or uint.'
    )
    return changetype<U128>(this.data as u32)
  }

  toU256(): U256 {
    assert(
      this.kind == EthereumValueKind.INT || this.kind == EthereumValueKind.UINT,
      'EthereumValue is not an int or uint.'
    )
    return changetype<U256>(this.data as u32)
  }

  toU256Array(): Array<U256> {
    assert(
      this.kind == EthereumValueKind.ARRAY || this.kind == EthereumValueKind.FIXED_ARRAY,
      'EthereumValue is not an array or fixed array.'
    )
    let valueArray = this.toArray()
    let u256Array = new Array<U256>()
    for (let i: i32 = 0; i < valueArray.length; i++) {
      u256Array.push(valueArray[i].toU256())
    }
    return u256Array
  }

  toString(): string {
    assert(this.kind == EthereumValueKind.STRING, 'EthereumValue is not a string.')
    return changetype<string>(this.data as u32)
  }

  toArray(): Array<EthereumValue> {
    assert(
      this.kind == EthereumValueKind.FIXED_ARRAY || this.kind == EthereumValueKind.ARRAY,
      'EthereumValue is not an array.'
    )
    return changetype<Array<EthereumValue>>(this.data as u32)
  }

  static fromAddress(address: Address): EthereumValue {
    assert(address.length == 20, 'Address must contain exactly 20 bytes')

    let token = new EthereumValue()
    token.kind = EthereumValueKind.ADDRESS
    token.data = address as u64
    return token
  }

  static fromBoolean(b: boolean): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.BOOL
    token.data = b ? 1 : 0
    return token
  }

  static fromBytes(bytes: Bytes): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.BYTES
    token.data = bytes as u64
    return token
  }

  static fromFixedBytes(bytes: Bytes): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.FIXED_BYTES
    token.data = bytes as u64
    return token
  }

  static fromI8(i: i8): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.INT
    token.data = i as u64
    return token
  }

  static fromI16(i: i16): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.INT
    token.data = i as u64
    return token
  }

  static fromI32(i: i32): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.INT
    token.data = i as u64
    return token
  }

  static fromI128(i: I128): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.INT
    token.data = i as u64
    return token
  }

  static fromI256(i: I256): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.INT
    token.data = i as u64
    return token
  }

  static fromU8(u: u8): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.UINT
    token.data = u as u64
    return token
  }

  static fromU16(u: u16): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.UINT
    token.data = u as u64
    return token
  }

  static fromU32(u: u32): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.UINT
    token.data = u as u64
    return token
  }

  static fromU128(u: U128): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.UINT
    token.data = u as u64
    return token
  }

  static fromU256(u: U256): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.UINT
    token.data = u as u64
    return token
  }

  static fromString(s: string): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.STRING
    token.data = s as u64
    return token
  }

  static fromArray(arr: EthereumValue): EthereumValue {
    let token = new EthereumValue()
    token.kind = EthereumValueKind.ARRAY
    token.data = arr as u64
    return token
  }
}

/**
 * Enum for supported value types.
 */
enum ValueKind {
  STRING,
  INT,
  FLOAT,
  BOOL,
  ARRAY,
  NULL,
  BYTES,
  BIGINT,
}

/**
 * Pointer type for Value data.
 *
 * Big enough to fit any pointer or native `this.data`.
 */
type ValuePayload = u64

/**
 * A dynamically typed value.
 */
class Value {
  kind: ValueKind
  data: ValuePayload

  static fromAddress(address: Address): Value {
    let value = new Value()
    value.kind = ValueKind.BYTES
    value.data = address as u64
    return value
  }

  static fromBigInt(n: BigInt): Value {
    let value = new Value()
    value.kind = ValueKind.BIGINT
    value.data = n as u64
    return value
  }

  static fromBoolean(b: boolean): Value {
    let value = new Value()
    value.kind = ValueKind.BOOL
    value.data = b ? 1 : 0
    return value
  }

  static fromBytes(bytes: Bytes): Value {
    let value = new Value()
    value.kind = ValueKind.BYTES
    value.data = bytes as u64
    return value
  }

  static fromI256(i: I256): Value {
    let value = new Value()
    value.kind = ValueKind.BIGINT
    value.data = typeConversion.int256ToBigInt(i) as u64
    return value
  }

  static fromNull(): Value {
    let value = new Value()
    value.kind = ValueKind.NULL
    return value
  }

  static fromU32(n: u32): Value {
    let value = new Value()
    value.kind = ValueKind.INT
    value.data = n as u64
    return value
  }

  static fromU256(n: U256): Value {
    let value = new Value()
    value.kind = ValueKind.BIGINT
    value.data = typeConversion.int256ToBigInt(n) as u64
    return value
  }

  static fromString(s: string): Value {
    let value = new Value()
    value.kind = ValueKind.STRING
    value.data = s as u64
    return value
  }
}

/**
 * Common representation for entity data, storing entity attributes
 * as `string` keys and the attribute values as dynamically-typed
 * `Value` objects.
 */
class Entity extends TypedMap<string, Value> {
  setString(key: string, value: string): void {
    this.set(key, Value.fromString(value))
  }

  setInt(key: string, value: u32): void {
    this.set(key, Value.fromU32(value))
  }

  setBoolean(key: string, value: boolean): void {
    this.set(key, Value.fromBoolean(value))
  }

  setBytes(key: string, value: Bytes): void {
    this.set(key, Value.fromBytes(value))
  }

  setBigInt(key: string, value: BigInt): void {
    this.set(key, Value.fromBigInt(value))
  }

  setAddress(key: string, value: Address): void {
    this.set(key, Value.fromAddress(value))
  }

  setI256(key: string, value: I256): void {
    this.set(key, Value.fromI256(value))
  }

  setU256(key: string, value: U256): void {
    this.set(key, Value.fromU256(value))
  }

  unset(key: string): void {
    this.set(key, Value.fromNull())
  }

  /** Assigns properties from sources to this Entity in right-to-left order */
  merge(sources: Array<Entity>): Entity {
    var target = this
    for (let i = 0; i < sources.length; i++) {
      let entries = sources[i].entries
      for (let j = 0; j < entries.length; j++) {
        target.set(entries[j].key, entries[j].value)
      }
    }
    return target
  }
}

/**
 * Common representation for Ethereum smart contract events.
 */
class EthereumEvent {
  address: Address
  eventSignature: string
  blockHash: H256
  parameters: Array<EthereumEventParam>
}

/**
 * A dynamically-typed Ethereum event parameter.
 */
class EthereumEventParam {
  name: string
  value: EthereumValue
}

class SmartContractCall {
  blockHash: H256
  contractName: string
  contractAddress: Address
  functionName: string
  functionParams: Array<EthereumValue>

  constructor(
    blockHash: H256,
    contractName: string,
    contractAddress: Address,
    functionName: string,
    functionParams: Array<EthereumValue>
  ) {
    this.blockHash = blockHash
    this.contractName = contractName
    this.contractAddress = contractAddress
    this.functionName = functionName
    this.functionParams = functionParams
  }
}

/**
 * Low-level interaction with Ethereum smart contracts
 */
class SmartContract {
  name: string
  address: Address
  blockHash: H256

  protected constructor(name: string, address: Address, blockHash: H256) {
    this.name = name
    this.address = address
    this.blockHash = blockHash
  }

  call(name: string, params: Array<EthereumValue>): Array<EthereumValue> {
    let call = new SmartContractCall(
      this.blockHash,
      this.name,
      this.address,
      name,
      params
    )
    return ethereum.call(call)
  }
}

/** Type hint for JSON values. */
enum JSONValueKind {
  NULL,
  BOOL,
  NUMBER,
  STRING,
  ARRAY,
  OBJECT,
}

/**
 * Pointer type for JSONValue data.
 *
 * Big enough to fit any pointer or native `this.data`.
 */
type JSONValuePayload = u64

class JSONValue {
  kind: JSONValueKind
  data: JSONValuePayload

  isNull(): boolean {
    return this.kind == JSONValueKind.NULL
  }

  toBool(): boolean {
    assert(this.kind == JSONValueKind.BOOL, 'JSON value is not a boolean.')
    return this.data != 0
  }

  toI64(): i64 {
    assert(this.kind == JSONValueKind.NUMBER, 'JSON value is not a number.')
    let decimalString = changetype<string>(this.data as u32)
    return json.toI64(decimalString)
  }

  toU64(): u64 {
    assert(this.kind == JSONValueKind.NUMBER, 'JSON value is not a number.')
    let decimalString = changetype<string>(this.data as u32)
    return json.toU64(decimalString)
  }

  toF64(): f64 {
    assert(this.kind == JSONValueKind.NUMBER, 'JSON value is not a number.')
    let decimalString = changetype<string>(this.data as u32)
    return json.toF64(decimalString)
  }

  toBigInt(): BigInt {
    assert(this.kind == JSONValueKind.NUMBER, 'JSON value is not a number.')
    let decimalString = changetype<string>(this.data as u32)
    return json.toBigInt(decimalString)
  }

  toString(): string {
    assert(this.kind == JSONValueKind.STRING, 'JSON value is not a string.')
    return changetype<string>(this.data as u32)
  }

  toArray(): Array<JSONValue> {
    assert(this.kind == JSONValueKind.ARRAY, 'JSON value is not an array.')
    return changetype<Array<JSONValue>>(this.data as u32)
  }

  toObject(): TypedMap<string, JSONValue> {
    assert(this.kind == JSONValueKind.OBJECT, 'JSON value is not an object.')
    return changetype<TypedMap<string, JSONValue>>(this.data as u32)
  }
}

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


export function handleAuctionCreated(event: AuctionCreated): void {
  let auctionId = event.params.id.toHex()
  let parcelId = event.params.assetId.toHex()

  // Create the auction
  let auction = new Entity()
  auction.setString('id', auctionId)
  auction.setString('type', 'parcel')
  auction.setString('parcel', parcelId)
  auction.setString('status', 'open')
  auction.setString('txStatus', 'confirmed')
  // TODO: auction.setString('txHash', event.transactionHash)
  auction.setAddress('owner', event.params.seller)
  auction.unset('buyer')
  auction.setU256('price', event.params.priceInWei)
  auction.setU256('expiresAt', event.params.expiresAt)
  auction.setAddress('contract', event.params.id as Address)
  // TODO: auction.setU256('blockNumber', event.blockNumber)
  // TODO: auction.setU256('blockTimeCreatedAt', event.blockTime)
  auction.setAddress('marketplace', event.address)

  // Set the active auction of the parcel
  let parcel = new Entity()
  parcel.setString('id', parcelId)
  parcel.setString('activeAuction', auctionId)
  parcel.setAddress('auctionOwner', event.params.seller)
  parcel.setU256('auctionPrice', event.params.priceInWei)

  // Apply store updates
  store.set('Auction', auctionId, auction)
  store.set('Parcel', parcelId, parcel)
}

export function handleAuctionCancelled(event: AuctionCancelled): void {
  let auctionId = event.params.id.toHex()
  let parcelId = event.params.assetId.toHex()

  // Mark the auction as cancelled
  let auction = new Entity()
  auction.setString('id', auctionId)
  auction.setString('type', 'parcel')
  auction.setString('status', 'cancelled')
  // TODO: auction.setU256('blockTimeUpdatedAt', event.blockTime)

  // Clear the active auction of the parcel
  let parcel = new Entity()
  parcel.setString('id', parcelId)
  parcel.set('activeAuction', Value.fromNull())
  parcel.set('auctionOwner', Value.fromNull())
  parcel.set('auctionPrice', Value.fromNull())

  // Apply store updates
  store.set('Auction', auctionId, auction)
  store.set('Parcel', parcelId, parcel)
}

export function handleAuctionSuccessful(event: AuctionSuccessful): void {
  let auctionId = event.params.id.toHex()
  let parcelId = event.params.assetId.toHex()

  // Mark the auction as sold
  let auction = new Entity()
  auction.setString('id', auctionId)
  auction.setString('type', 'parcel')
  auction.setString('status', 'sold')
  auction.setAddress('buyer', event.params.winner)
  auction.setU256('price', event.params.totalPrice)
  // TODO: auction.setU256('blockTimeCreatedAt', event.blockTime)

  // Update the parcel owner and active auction
  let parcel = new Entity()
  parcel.setString('id', parcelId)
  parcel.setAddress('owner', event.params.winner)
  parcel.set('activeAuction', Value.fromNull())
  parcel.set('auctionOwner', Value.fromNull())
  parcel.set('auctionPrice', Value.fromNull())

  // Apply store updates
  store.set('Auction', auctionId, auction)
  store.set('Parcel', parcelId, parcel)
}

