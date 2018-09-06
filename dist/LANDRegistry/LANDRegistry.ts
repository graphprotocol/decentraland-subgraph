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
  function bytesToString(bytes: Bytes): string
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
    return typeConversion.u256ToH160(this) as Address
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


enum CSVState {
  BETWEEN,
  UNQUOTED_VALUE,
  QUOTED_VALUE,
}

/**
 * Parses a CSV string into an array of strings.
 * @param csv CSV string.
 * @returns Array of strings.
 */
function parseCSV(csv: string): Array<string> {
  let values = new Array<string>()
  let valueStart = 0
  let state = CSVState.BETWEEN

  for (let i: i32 = 0; i < csv.length; i++) {
    if (state == CSVState.BETWEEN) {
      if (csv[i] != ',') {
        if (csv[i] == '"') {
          state = CSVState.QUOTED_VALUE
          valueStart = i + 1
        } else {
          state = CSVState.UNQUOTED_VALUE
          valueStart = i
        }
      }
    } else if (state == CSVState.UNQUOTED_VALUE) {
      if (csv[i] == ',') {
        values.push(csv.substr(valueStart, i - valueStart))
        state = CSVState.BETWEEN
      }
    } else if (state == CSVState.QUOTED_VALUE) {
      if (csv[i] == '"') {
        values.push(csv.substr(valueStart, i - valueStart))
        state = CSVState.BETWEEN
      }
    }
  }

  return values
}

export function handleLandTransfer(event: Transfer): void {
  let parcelId = event.params.assetId.toHex()
  let registry = LANDRegistry.bind(event.address, event.blockHash)

  let parcel = new Entity()
  parcel.setString('id', parcelId)
  parcel.setString('owner', event.params.to.toHex())
  // TODO: parcel.setString('lastTransferredAt', event.blockTime)

  // Apply store updates
  store.set('Parcel', parcelId, parcel)
}

export function handleLandUpdate(event: Update): void {
  // Bind LANDRegistry contract
  let registry = LANDRegistry.bind(event.address, event.blockHash)

  let parcelId = event.params.assetId.toHex()
  let coordinate = registry.decodeTokenId(event.params.assetId)

  // Create ParcelData entity
  let dataString = event.params.data.toString()
  let data = new Entity()
  let dataId = parcelId + '-data'
  data.setString('id', dataId)
  data.setString('parcel', parcelId)

  // Parse CSV data
  if (dataString.charAt(0) == '0') {
    let values = parseCSV(dataString)
    if (values.length > 0) {
      data.setString('version', values[0])
    }
    if (values.length > 1) {
      data.setString('name', values[1])
    }
    if (values.length > 2) {
      data.setString('description', values[2])
    }
    if (values.length > 3) {
      data.setString('ipns', values[3])
    }
  } else {
    return // Unsupported version
  }

  // Create Parcel entity
  let parcel = new Entity()
  parcel.setString('id', parcelId)
  parcel.setI256('x', coordinate.value0)
  parcel.setI256('y', coordinate.value1)
  parcel.setString('data', dataId)
  // TODO: parcel.setU256('updatedAt', event.blockTime)

  // Apply store updates
  store.set('ParcelData', dataId, data)
  store.set('Parcel', parcelId, parcel)
}

