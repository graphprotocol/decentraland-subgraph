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
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
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
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get address(): Bytes {
    let value = this.get("address");
    return value.toBytes();
  }

  set address(value: Bytes) {
    this.set("address", Value.fromBytes(value));
  }

  get district(): string {
    let value = this.get("district");
    return value.toString();
  }

  set district(value: string) {
    this.set("district", Value.fromString(value));
  }

  get landCount(): BigInt {
    let value = this.get("landCount");
    return value.toBigInt();
  }

  set landCount(value: BigInt) {
    this.set("landCount", Value.fromBigInt(value));
  }

  get timestamp(): BigInt {
    let value = this.get("timestamp");
    return value.toBigInt();
  }

  set timestamp(value: BigInt) {
    this.set("timestamp", Value.fromBigInt(value));
  }
}

export class District extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
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
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get name(): string {
    let value = this.get("name");
    return value.toString();
  }

  set name(value: string) {
    this.set("name", Value.fromString(value));
  }

  get description(): string | null {
    let value = this.get("description");
    if (value === null) {
      return null;
    } else {
      return value.toString();
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
    return value.toString();
  }

  set link(value: string) {
    this.set("link", Value.fromString(value));
  }

  get isPublic(): boolean {
    let value = this.get("isPublic");
    return value.toBoolean();
  }

  set isPublic(value: boolean) {
    this.set("isPublic", Value.fromBoolean(value));
  }

  get parcelCount(): BigInt {
    let value = this.get("parcelCount");
    return value.toBigInt();
  }

  set parcelCount(value: BigInt) {
    this.set("parcelCount", Value.fromBigInt(value));
  }

  get parcels(): Array<string> | null {
    let value = this.get("parcels");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray();
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
    return value.toString();
  }

  set center(value: string) {
    this.set("center", Value.fromString(value));
  }

  get priority(): string | null {
    let value = this.get("priority");
    if (value === null) {
      return null;
    } else {
      return value.toString();
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
    return value.toBoolean();
  }

  set disabled(value: boolean) {
    this.set("disabled", Value.fromBoolean(value));
  }
}

export class Parcel extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
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
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get x(): BigInt | null {
    let value = this.get("x");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
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
      return value.toBigInt();
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
      return value.toString();
    }
  }

  set district(value: string | null) {
    if (value === null) {
      this.unset("district");
    } else {
      this.set("district", Value.fromString(value as string));
    }
  }

  get owner(): Bytes | null {
    let value = this.get("owner");
    if (value === null) {
      return null;
    } else {
      return value.toBytes();
    }
  }

  set owner(value: Bytes | null) {
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
      return value.toString();
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
      return value.toBigInt();
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
      return value.toBytes();
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
      return value.toBigInt();
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
      return value.toString();
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
      return value.toStringArray();
    }
  }

  set auctions(value: Array<string> | null) {
    if (value === null) {
      this.unset("auctions");
    } else {
      this.set("auctions", Value.fromStringArray(value as Array<string>));
    }
  }

  get createdAt(): BigInt | null {
    let value = this.get("createdAt");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
    }
  }

  set createdAt(value: BigInt | null) {
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
      return value.toBigInt();
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
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
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
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get parcel(): string {
    let value = this.get("parcel");
    return value.toString();
  }

  set parcel(value: string) {
    this.set("parcel", Value.fromString(value));
  }

  get version(): string | null {
    let value = this.get("version");
    if (value === null) {
      return null;
    } else {
      return value.toString();
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
      return value.toString();
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
      return value.toString();
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
      return value.toString();
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
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
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
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get type(): string | null {
    let value = this.get("type");
    if (value === null) {
      return null;
    } else {
      return value.toString();
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
      return value.toString();
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
    return value.toBytes();
  }

  set txHash(value: Bytes) {
    this.set("txHash", Value.fromBytes(value));
  }

  get txStatus(): string | null {
    let value = this.get("txStatus");
    if (value === null) {
      return null;
    } else {
      return value.toString();
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
    return value.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get price(): BigInt {
    let value = this.get("price");
    return value.toBigInt();
  }

  set price(value: BigInt) {
    this.set("price", Value.fromBigInt(value));
  }

  get status(): string | null {
    let value = this.get("status");
    if (value === null) {
      return null;
    } else {
      return value.toString();
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
      return value.toBytes();
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
    return value.toBytes();
  }

  set contract(value: Bytes) {
    this.set("contract", Value.fromBytes(value));
  }

  get blockNumber(): BigInt {
    let value = this.get("blockNumber");
    return value.toBigInt();
  }

  set blockNumber(value: BigInt) {
    this.set("blockNumber", Value.fromBigInt(value));
  }

  get expiresAt(): BigInt {
    let value = this.get("expiresAt");
    return value.toBigInt();
  }

  set expiresAt(value: BigInt) {
    this.set("expiresAt", Value.fromBigInt(value));
  }

  get blockTimeCreatedAt(): BigInt {
    let value = this.get("blockTimeCreatedAt");
    return value.toBigInt();
  }

  set blockTimeCreatedAt(value: BigInt) {
    this.set("blockTimeCreatedAt", Value.fromBigInt(value));
  }

  get blockTimeUpdatedAt(): BigInt | null {
    let value = this.get("blockTimeUpdatedAt");
    if (value === null) {
      return null;
    } else {
      return value.toBigInt();
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
    return value.toBytes();
  }

  set marketplace(value: Bytes) {
    this.set("marketplace", Value.fromBytes(value));
  }
}

export class Estate extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Estate entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Estate entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Estate", id.toString(), this);
  }

  static load(id: string): Estate | null {
    return store.get("Estate", id) as Estate | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get operator(): Bytes {
    let value = this.get("operator");
    return value.toBytes();
  }

  set operator(value: Bytes) {
    this.set("operator", Value.fromBytes(value));
  }

  get metaData(): string {
    let value = this.get("metaData");
    return value.toString();
  }

  set metaData(value: string) {
    this.set("metaData", Value.fromString(value));
  }

  get land(): Array<string> | null {
    let value = this.get("land");
    if (value === null) {
      return null;
    } else {
      return value.toStringArray();
    }
  }

  set land(value: Array<string> | null) {
    if (value === null) {
      this.unset("land");
    } else {
      this.set("land", Value.fromStringArray(value as Array<string>));
    }
  }
}
