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

  toMap(): TypedMap<string, Token> {
    let map = new TypedMap<string, Token>();
    map.set("value0", Token.fromBytes(this.value0));
    map.set("value1", Token.fromAddress(this.value1));
    map.set("value2", Token.fromU256(this.value2));
    map.set("value3", Token.fromU256(this.value3));
    return map;
  }
}

class Marketplace extends SmartContract {
  static bind(address: Address, blockHash: H256): Marketplace {
    return new Marketplace("Marketplace", address, blockHash);
  }

  nonFungibleRegistry(): Address {
    let __result = super.call("nonFungibleRegistry", []);
    return __result[0].toAddress();
  }

  acceptedToken(): Address {
    let __result = super.call("acceptedToken", []);
    return __result[0].toAddress();
  }

  paused(): bool {
    let __result = super.call("paused", []);
    return __result[0].toBoolean();
  }

  ownerCutPercentage(): U256 {
    let __result = super.call("ownerCutPercentage", []);
    return __result[0].toU256();
  }

  owner(): Address {
    let __result = super.call("owner", []);
    return __result[0].toAddress();
  }

  publicationFeeInWei(): U256 {
    let __result = super.call("publicationFeeInWei", []);
    return __result[0].toU256();
  }

  auctionByAssetId(param0: U256): Marketplace__auctionByAssetIdResult {
    let __result = super.call("auctionByAssetId", [Token.fromU256(param0)]);
    return new Marketplace__auctionByAssetIdResult(
      __result[0].toBytes(),
      __result[1].toAddress(),
      __result[2].toU256(),
      __result[3].toU256()
    );
  }
}
