import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt
} from "@graphprotocol/graph-ts";

export class Contribution extends Entity {
  constructor(id: string) {
    this.set("id", Value.fromString(id));
    return this;
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Contribution entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Contribution entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Contribution", id.toString(), this);
  }

  static load(id: string): Contribution | null {
    return store.get("Contribution", id) as Contribution | null;
  }

  get id(): string {
    let value = this.get("id");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string;
    }
  }

  set id(value: string) {
    if (value === null) {
      this.unset("id");
    } else {
      this.set("id", Value.fromString(value as string));
    }
  }

  get address(): Bytes {
    let value = this.get("address");
    if (value === null) {
      return null;
    } else {
      return value.toBytes() as Bytes;
    }
  }

  set address(value: Bytes) {
    if (value === null) {
      this.unset("address");
    } else {
      this.set("address", Value.fromBytes(value as Bytes));
    }
  }

  get district(): string {
    let value = this.get("district");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string;
    }
  }

  set district(value: string) {
    if (value === null) {
      this.unset("district");
    } else {
      this.set("district", Value.fromString(value as string));
    }
  }

  get landCount(): BigInt {
    let value = this.get("landCount");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt() as BigInt;
    }
  }

  set landCount(value: BigInt) {
    if (value === null) {
      this.unset("landCount");
    } else {
      this.set("landCount", Value.fromBigInt(value as BigInt));
    }
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt() as BigInt;
    }
  }

  set timestamp(value: BigInt) {
    if (value === null) {
      this.unset("timestamp");
    } else {
      this.set("timestamp", Value.fromBigInt(value as BigInt));
    }
  }
}

export class District extends Entity {
  constructor(id: string) {
    this.set("id", Value.fromString(id));
    return this;
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save District entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save District entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("District", id.toString(), this);
  }

  static load(id: string): District | null {
    return store.get("District", id) as District | null;
  }

  get id(): string {
    let value = this.get("id");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string;
    }
  }

  set id(value: string) {
    if (value === null) {
      this.unset("id");
    } else {
      this.set("id", Value.fromString(value as string));
    }
  }

  get name(): string {
    let value = this.get("name");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string;
    }
  }

  set name(value: string) {
    if (value === null) {
      this.unset("name");
    } else {
      this.set("name", Value.fromString(value as string));
    }
  }

  get description(): string | null {
    let value = this.get("description");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string | null;
    }
  }

  set description(value: string | null) {
    if (value === null) {
      this.unset("description");
    } else {
      this.set("description", Value.fromString(value as string));
    }
  }

  get link(): string {
    let value = this.get("link");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string;
    }
  }

  set link(value: string) {
    if (value === null) {
      this.unset("link");
    } else {
      this.set("link", Value.fromString(value as string));
    }
  }

  get isPublic(): boolean {
    let value = this.get("isPublic");
    if (value === null) {
      return false;
    } else {
      return value.toBoolean() as boolean;
    }
  }

  set isPublic(value: boolean) {
    if (value === null) {
      this.unset("isPublic");
    } else {
      this.set("isPublic", Value.fromBoolean(value as boolean));
    }
  }

  get parcelCount(): BigInt {
    let value = this.get("parcelCount");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt() as BigInt;
    }
  }

  set parcelCount(value: BigInt) {
    if (value === null) {
      this.unset("parcelCount");
    } else {
      this.set("parcelCount", Value.fromBigInt(value as BigInt));
    }
  }

  get parcels(): Array<string> | null {
    let value = this.get("parcels");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray() as Array<string> | null;
    }
  }

  set parcels(value: Array<string> | null) {
    if (value === null) {
      this.unset("parcels");
    } else {
      this.set("parcels", Value.fromStringArray(value as Array<string>));
    }
  }

  get center(): string {
    let value = this.get("center");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string;
    }
  }

  set center(value: string) {
    if (value === null) {
      this.unset("center");
    } else {
      this.set("center", Value.fromString(value as string));
    }
  }

  get priority(): string | null {
    let value = this.get("priority");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string | null;
    }
  }

  set priority(value: string | null) {
    if (value === null) {
      this.unset("priority");
    } else {
      this.set("priority", Value.fromString(value as string));
    }
  }

  get disabled(): boolean {
    let value = this.get("disabled");
    if (value === null) {
      return false;
    } else {
      return value.toBoolean() as boolean;
    }
  }

  set disabled(value: boolean) {
    if (value === null) {
      this.unset("disabled");
    } else {
      this.set("disabled", Value.fromBoolean(value as boolean));
    }
  }
}

export class Parcel extends Entity {
  constructor(id: string) {
    this.set("id", Value.fromString(id));
    return this;
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Parcel entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Parcel entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Parcel", id.toString(), this);
  }

  static load(id: string): Parcel | null {
    return store.get("Parcel", id) as Parcel | null;
  }

  get id(): string {
    let value = this.get("id");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string;
    }
  }

  set id(value: string) {
    if (value === null) {
      this.unset("id");
    } else {
      this.set("id", Value.fromString(value as string));
    }
  }

  get x(): BigInt | null {
    let value = this.get("x");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt() as BigInt | null;
    }
  }

  set x(value: BigInt | null) {
    if (value === null) {
      this.unset("x");
    } else {
      this.set("x", Value.fromBigInt(value as BigInt));
    }
  }

  get y(): BigInt | null {
    let value = this.get("y");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt() as BigInt | null;
    }
  }

  set y(value: BigInt | null) {
    if (value === null) {
      this.unset("y");
    } else {
      this.set("y", Value.fromBigInt(value as BigInt));
    }
  }

  get district(): string | null {
    let value = this.get("district");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string | null;
    }
  }

  set district(value: string | null) {
    if (value === null) {
      this.unset("district");
    } else {
      this.set("district", Value.fromString(value as string));
    }
  }

  get owner(): Bytes {
    let value = this.get("owner");
    if (value === null) {
      return null;
    } else {
      return value.toBytes() as Bytes;
    }
  }

  set owner(value: Bytes) {
    if (value === null) {
      this.unset("owner");
    } else {
      this.set("owner", Value.fromBytes(value as Bytes));
    }
  }

  get data(): string | null {
    let value = this.get("data");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string | null;
    }
  }

  set data(value: string | null) {
    if (value === null) {
      this.unset("data");
    } else {
      this.set("data", Value.fromString(value as string));
    }
  }

  get lastTransferredAt(): BigInt | null {
    let value = this.get("lastTransferredAt");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt() as BigInt | null;
    }
  }

  set lastTransferredAt(value: BigInt | null) {
    if (value === null) {
      this.unset("lastTransferredAt");
    } else {
      this.set("lastTransferredAt", Value.fromBigInt(value as BigInt));
    }
  }

  get auctionOwner(): Bytes | null {
    let value = this.get("auctionOwner");
    if (value === null) {
      return null;
    } else {
      return value.toBytes() as Bytes | null;
    }
  }

  set auctionOwner(value: Bytes | null) {
    if (value === null) {
      this.unset("auctionOwner");
    } else {
      this.set("auctionOwner", Value.fromBytes(value as Bytes));
    }
  }

  get auctionPrice(): BigInt | null {
    let value = this.get("auctionPrice");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt() as BigInt | null;
    }
  }

  set auctionPrice(value: BigInt | null) {
    if (value === null) {
      this.unset("auctionPrice");
    } else {
      this.set("auctionPrice", Value.fromBigInt(value as BigInt));
    }
  }

  get activeAuction(): string | null {
    let value = this.get("activeAuction");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string | null;
    }
  }

  set activeAuction(value: string | null) {
    if (value === null) {
      this.unset("activeAuction");
    } else {
      this.set("activeAuction", Value.fromString(value as string));
    }
  }

  get auctions(): Array<string> | null {
    let value = this.get("auctions");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray() as Array<string> | null;
    }
  }

  set auctions(value: Array<string> | null) {
    if (value === null) {
      this.unset("auctions");
    } else {
      this.set("auctions", Value.fromStringArray(value as Array<string>));
    }
  }

  get createdAt(): BigInt {
    let value = this.get("createdAt");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt() as BigInt;
    }
  }

  set createdAt(value: BigInt) {
    if (value === null) {
      this.unset("createdAt");
    } else {
      this.set("createdAt", Value.fromBigInt(value as BigInt));
    }
  }

  get updatedAt(): BigInt | null {
    let value = this.get("updatedAt");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt() as BigInt | null;
    }
  }

  set updatedAt(value: BigInt | null) {
    if (value === null) {
      this.unset("updatedAt");
    } else {
      this.set("updatedAt", Value.fromBigInt(value as BigInt));
    }
  }
}

export class ParcelData extends Entity {
  constructor(id: string) {
    this.set("id", Value.fromString(id));
    return this;
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save ParcelData entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save ParcelData entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("ParcelData", id.toString(), this);
  }

  static load(id: string): ParcelData | null {
    return store.get("ParcelData", id) as ParcelData | null;
  }

  get id(): string {
    let value = this.get("id");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string;
    }
  }

  set id(value: string) {
    if (value === null) {
      this.unset("id");
    } else {
      this.set("id", Value.fromString(value as string));
    }
  }

  get parcel(): string {
    let value = this.get("parcel");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string;
    }
  }

  set parcel(value: string) {
    if (value === null) {
      this.unset("parcel");
    } else {
      this.set("parcel", Value.fromString(value as string));
    }
  }

  get version(): string | null {
    let value = this.get("version");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string | null;
    }
  }

  set version(value: string | null) {
    if (value === null) {
      this.unset("version");
    } else {
      this.set("version", Value.fromString(value as string));
    }
  }

  get name(): string | null {
    let value = this.get("name");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string | null;
    }
  }

  set name(value: string | null) {
    if (value === null) {
      this.unset("name");
    } else {
      this.set("name", Value.fromString(value as string));
    }
  }

  get description(): string | null {
    let value = this.get("description");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string | null;
    }
  }

  set description(value: string | null) {
    if (value === null) {
      this.unset("description");
    } else {
      this.set("description", Value.fromString(value as string));
    }
  }

  get ipns(): string | null {
    let value = this.get("ipns");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string | null;
    }
  }

  set ipns(value: string | null) {
    if (value === null) {
      this.unset("ipns");
    } else {
      this.set("ipns", Value.fromString(value as string));
    }
  }
}

export class Auction extends Entity {
  constructor(id: string) {
    this.set("id", Value.fromString(id));
    return this;
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Auction entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Auction entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Auction", id.toString(), this);
  }

  static load(id: string): Auction | null {
    return store.get("Auction", id) as Auction | null;
  }

  get id(): string {
    let value = this.get("id");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string;
    }
  }

  set id(value: string) {
    if (value === null) {
      this.unset("id");
    } else {
      this.set("id", Value.fromString(value as string));
    }
  }

  get type(): string | null {
    let value = this.get("type");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string | null;
    }
  }

  set type(value: string | null) {
    if (value === null) {
      this.unset("type");
    } else {
      this.set("type", Value.fromString(value as string));
    }
  }

  get parcel(): string | null {
    let value = this.get("parcel");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string | null;
    }
  }

  set parcel(value: string | null) {
    if (value === null) {
      this.unset("parcel");
    } else {
      this.set("parcel", Value.fromString(value as string));
    }
  }

  get txHash(): Bytes {
    let value = this.get("txHash");
    if (value === null) {
      return null;
    } else {
      return value.toBytes() as Bytes;
    }
  }

  set txHash(value: Bytes) {
    if (value === null) {
      this.unset("txHash");
    } else {
      this.set("txHash", Value.fromBytes(value as Bytes));
    }
  }

  get txStatus(): string | null {
    let value = this.get("txStatus");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string | null;
    }
  }

  set txStatus(value: string | null) {
    if (value === null) {
      this.unset("txStatus");
    } else {
      this.set("txStatus", Value.fromString(value as string));
    }
  }

  get owner(): Bytes {
    let value = this.get("owner");
    if (value === null) {
      return null;
    } else {
      return value.toBytes() as Bytes;
    }
  }

  set owner(value: Bytes) {
    if (value === null) {
      this.unset("owner");
    } else {
      this.set("owner", Value.fromBytes(value as Bytes));
    }
  }

  get price(): BigInt {
    let value = this.get("price");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt() as BigInt;
    }
  }

  set price(value: BigInt) {
    if (value === null) {
      this.unset("price");
    } else {
      this.set("price", Value.fromBigInt(value as BigInt));
    }
  }

  get status(): string | null {
    let value = this.get("status");
    if (value === null) {
      return null;
    } else {
      return value.toString() as string | null;
    }
  }

  set status(value: string | null) {
    if (value === null) {
      this.unset("status");
    } else {
      this.set("status", Value.fromString(value as string));
    }
  }

  get buyer(): Bytes | null {
    let value = this.get("buyer");
    if (value === null) {
      return null;
    } else {
      return value.toBytes() as Bytes | null;
    }
  }

  set buyer(value: Bytes | null) {
    if (value === null) {
      this.unset("buyer");
    } else {
      this.set("buyer", Value.fromBytes(value as Bytes));
    }
  }

  get contract(): Bytes {
    let value = this.get("contract");
    if (value === null) {
      return null;
    } else {
      return value.toBytes() as Bytes;
    }
  }

  set contract(value: Bytes) {
    if (value === null) {
      this.unset("contract");
    } else {
      this.set("contract", Value.fromBytes(value as Bytes));
    }
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt() as BigInt;
    }
  }

  set blockNumber(value: BigInt) {
    if (value === null) {
      this.unset("blockNumber");
    } else {
      this.set("blockNumber", Value.fromBigInt(value as BigInt));
    }
  }

  get expiresAt(): BigInt {
    let value = this.get("expiresAt");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt() as BigInt;
    }
  }

  set expiresAt(value: BigInt) {
    if (value === null) {
      this.unset("expiresAt");
    } else {
      this.set("expiresAt", Value.fromBigInt(value as BigInt));
    }
  }

  get blockTimeCreatedAt(): BigInt {
    let value = this.get("blockTimeCreatedAt");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt() as BigInt;
    }
  }

  set blockTimeCreatedAt(value: BigInt) {
    if (value === null) {
      this.unset("blockTimeCreatedAt");
    } else {
      this.set("blockTimeCreatedAt", Value.fromBigInt(value as BigInt));
    }
  }

  get blockTimeUpdatedAt(): BigInt | null {
    let value = this.get("blockTimeUpdatedAt");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt() as BigInt | null;
    }
  }

  set blockTimeUpdatedAt(value: BigInt | null) {
    if (value === null) {
      this.unset("blockTimeUpdatedAt");
    } else {
      this.set("blockTimeUpdatedAt", Value.fromBigInt(value as BigInt));
    }
  }

  get marketplace(): Bytes {
    let value = this.get("marketplace");
    if (value === null) {
      return null;
    } else {
      return value.toBytes() as Bytes;
    }
  }

  set marketplace(value: Bytes) {
    if (value === null) {
      this.unset("marketplace");
    } else {
      this.set("marketplace", Value.fromBytes(value as Bytes));
    }
  }
}
