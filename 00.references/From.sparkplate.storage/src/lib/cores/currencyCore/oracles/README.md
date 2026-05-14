# Oracles Directory

This directory contains implementations for blockchain oracles that provide off-chain data to smart contracts and dApps, organized by blockchain.

## Directory Structure

```
oracles/
├── XTZ.Tezos/            # Tezos (XTZ) oracles
│   ├── harbinger.ts      # Native Tezos price oracle
│   ├── chainlink.ts      # Cross-chain oracle network
│   ├── wolframalpha.ts   # Computational oracle
│   ├── dia.ts            # Multi-source price oracle
│   ├── kaiko.ts          # Institutional market data
│   ├── ubinetic.ts       # API service oracle
│   ├── index.ts          # Tezos oracle exports
│   └── README.md         # Tezos oracle documentation
├── XRP.Ripple/           # XRP Ledger (XRPL) oracles
│   ├── xrplNative.ts     # Native XRPL price oracle
│   ├── dia.ts            # Multi-source oracle
│   ├── bandProtocol.ts   # Cross-chain oracle network
│   ├── chainlink.ts      # Decentralized oracle network
│   ├── pythNetwork.ts    # High-frequency oracle
│   ├── index.ts          # XRP oracle exports
│   └── README.md         # XRP oracle documentation
├── ALGO.Algorand/        # Algorand (ALGO) oracles
│   ├── pythNetwork.ts    # Pull-model price oracle
│   ├── chainlink.ts      # Decentralized oracle network
│   ├── algorandFoundation.ts # Official Foundation oracles
│   ├── goracle.ts        # Multi-purpose oracle (Gora Network)
│   ├── folksFeedOracle.ts # Lending protocol oracle
│   ├── dia.ts            # Community-driven oracle
│   ├── randomnessBeacon.ts # VRF randomness oracle
│   ├── index.ts          # Algorand oracle exports
│   └── README.md         # Algorand oracle documentation
├── ATOM.Cosmos/          # Cosmos (ATOM) oracles
│   ├── bandProtocol.ts   # Native Cosmos SDK oracle
│   ├── pythNetwork.ts    # Pull-model price oracle
│   ├── chainlink.ts      # Cross-chain oracle network
│   ├── dia.ts            # Multi-source oracle
│   ├── umbrellaNetwork.ts # Layer-2 oracle
│   ├── cosmosSdkOracle.ts # Protocol-level oracle module
│   ├── index.ts          # Cosmos oracle exports
│   └── README.md         # Cosmos oracle documentation
├── BCH.BitcoinCash/      # Bitcoin Cash (BCH) oracles
│   ├── oracleCash.ts     # Native OP_CHECKDATASIG oracle
│   ├── anyhedge.ts       # DeFi derivatives oracle
│   ├── dia.ts            # Multi-source oracle
│   ├── generalCash.ts    # Simple price feed API
│   ├── externalApis.ts   # Multi-source aggregator
│   ├── index.ts          # BCH oracle exports
│   └── README.md         # BCH oracle documentation
├── index.ts              # Main exports
└── README.md             # This file
```

## Supported Blockchains

### 🪙 Tezos (XTZ)
**Location:** `./XTZ.Tezos/`  
**Oracles:** 6 total
- **Native Price Oracle:** Harbinger (most widely adopted, self-sustaining)
- **Cross-chain Oracle:** Chainlink (decentralized network, VRF)
- **Computational Oracle:** Wolfram Alpha (knowledge base, scientific data)
- **Multi-source Oracle:** DIA (100+ exchanges, transparent sourcing)
- **Market Data Oracle:** Kaiko (institutional-grade, order book data)
- **API Service Oracle:** Ubinetic (IoT, payments, custom APIs)

**Note:** Tezos has a mature oracle ecosystem with Harbinger being the most widely adopted native oracle. The ecosystem includes both native solutions and cross-chain integrations for comprehensive data access.

See [`XTZ.Tezos/README.md`](./XTZ.Tezos/README.md) for detailed documentation.

---

### 💎 XRP Ledger (XRPL)
**Location:** `./XRP.Ripple/`  
**Oracles:** 5 total
- **Native Price Oracle:** XRPL Native (built into ledger protocol, multi-oracle aggregation)
- **Multi-source Oracle:** DIA (100+ exchanges, XRPL native integration)
- **Cross-chain Oracle:** Band Protocol (100+ validators, XRPL EVM sidechain)
- **Cross-chain Oracle:** Chainlink (1000+ nodes, industry-leading, VRF support)
- **High-Frequency Oracle:** Pyth Network (sub-second updates, confidence intervals)

**Note:** XRPL features native on-chain price oracles built into the ledger protocol (Price Oracle amendment), along with cross-chain oracle integrations. The native oracle system allows multi-oracle aggregation with mean, median, and trimmed mean calculations.

See [`XRP.Ripple/README.md`](./XRP.Ripple/README.md) for detailed documentation.

---

### 🔷 Algorand (ALGO)
**Location:** `./ALGO.Algorand/`  
**Oracles:** 7 total
- **Pull-Model Oracle:** Pyth Network (sub-second updates, cost-effective)
- **Decentralized Oracle:** Chainlink (1000+ nodes, VRF, Any API)
- **Official Oracle:** Algorand Foundation Oracles (core asset prices)
- **Multi-Purpose Oracle:** Goracle/Gora Network (app-specific oracles, custom data)
- **Lending Protocol Oracle:** Folks Feed Oracle (specialized for DeFi lending)
- **Community Oracle:** DIA (20,000+ assets, transparent sourcing)
- **Randomness Oracle:** Algorand Randomness Beacon (official VRF-based randomness)

**Note:** Algorand's low transaction fees make pull-model oracles (like Pyth) highly cost-effective. The ecosystem includes official Foundation oracles, a dedicated randomness beacon for VRF, and diverse third-party solutions. Goracle enables app-specific oracles for custom use cases beyond price feeds.

See [`ALGO.Algorand/README.md`](./ALGO.Algorand/README.md) for detailed documentation.

---

### 🌌 Cosmos (ATOM)
**Location:** `./ATOM.Cosmos/`  
**Oracles:** 6 total
- **Native Cosmos SDK Oracle:** Band Protocol (IBC-integrated, 100+ validators, custom scripts)
- **Pull-Model Oracle:** Pyth Network (sub-second updates, 90+ publishers, confidence intervals)
- **Cross-Chain Oracle:** Chainlink (1000+ nodes, proven security, VRF, CCIP)
- **Multi-Source Oracle:** DIA (20,000+ assets, 85+ exchanges, transparent sourcing)
- **Layer-2 Oracle:** Umbrella Network (high throughput, cost-effective, merkle proofs)
- **Protocol-Level Oracle:** Cosmos SDK Oracle Module (ABCI++, validator-driven, consensus-embedded)

**Note:** Cosmos has a unique oracle ecosystem due to its IBC protocol and modular SDK architecture. Band Protocol is the native Cosmos SDK solution, while Pyth Network provides high-frequency updates via pull model. The Cosmos SDK Oracle Module (v0.50+) embeds oracles directly at the protocol level using ABCI++ vote extensions. IBC enables cross-chain oracle data flow across the entire Cosmos ecosystem.

See [`ATOM.Cosmos/README.md`](./ATOM.Cosmos/README.md) for detailed documentation.

---

### 💵 Bitcoin Cash (BCH)
**Location:** `./BCH.BitcoinCash/`  
**Oracles:** 5 total
- **Native On-Chain Oracle:** Oracle.cash (OP_CHECKDATASIG-based, cryptographic verification, HodlVault contracts)
- **DeFi Derivatives Oracle:** AnyHedge (specialized for derivatives, real-time feeds, hedging contracts)
- **Multi-Source Oracle:** DIA (85+ exchanges, MAIR methodology, transparent sourcing)
- **Simple Price Feed:** General.cash (REST API, no authentication, part of General Protocols)
- **Multi-Source Aggregator:** External APIs (CoinGecko, Kraken, Binance, Coinbase - median calculation)

**Note:** Bitcoin Cash has a unique oracle ecosystem due to its UTXO-based architecture and limited smart contract capabilities. Oracle.cash uses the OP_CHECKDATASIG opcode for on-chain cryptographic verification via CashScript. For production applications, the External APIs aggregator (multi-source median calculation) is recommended for reliability. The ecosystem follows a hybrid approach: on-chain verification with off-chain data.

**Unique Features:**
- **OP_CHECKDATASIG:** Native opcode for signature verification (introduced 2018)
- **UTXO Model:** Different oracle patterns than account-based chains
- **CashScript:** TypeScript-based smart contract language for BCH
- **OP_RETURN:** Oracle data storage via transaction outputs
- **Low Fees:** ~$0.01/tx enables frequent oracle updates

See [`BCH.BitcoinCash/README.md`](./BCH.BitcoinCash/README.md) for detailed documentation.

---

### 🔶 BNB Chain (BNB)
**Location:** `./BNB.BinanceCoin/`  
**Oracles:** 9 total
- **Industry Standard:** Chainlink (200+ feeds, VRF V2, Automation, powers PancakeSwap/Venus)
- **Native BNB Oracle:** Binance Oracle (MPC security, 3-second latency, 40+ feeds)
- **Cross-Chain:** Band Protocol (IBC-integrated, 175+ pairs, Cosmos SDK)
- **High-Frequency:** Pyth Network (sub-second updates, 80+ publishers, pull model)
- **Permissionless:** Tellor (miner-based, transparent, dispute mechanism)
- **Layer-2:** Umbrella Network (Merkle proofs, cost-effective, high throughput)
- **Community-Driven:** DIA (85+ exchanges, MAIR methodology, customizable)
- **First-Party:** API3 (Airnode, direct APIs, Web2-to-Web3)
- **Modular:** RedStone (10,000+ feeds, push/pull, restaking, RWA focus)

**Note:** BNB Chain (formerly Binance Smart Chain) is EVM-compatible with a 3-second block time and low fees (~$0.10-0.50/call). Chainlink is the industry standard with 200+ price feeds. Pyth Network provides sub-second updates for high-frequency trading. Binance Oracle is optimized for BNB Chain's fast blocks. The mature ecosystem supports diverse use cases from DeFi to VRF randomness.

**Unique Features:**
- **EVM-Compatible:** Standard ethers.js/web3.js integration
- **3-Second Blocks:** Fast finality for oracle updates
- **Low Fees:** $0.10-0.50 per oracle call (vs $5-50 on Ethereum)
- **9 Oracle Options:** Diverse specializations for various needs
- **Mature DeFi:** Powers PancakeSwap, Venus, Alpaca Finance

See [`BNB.BinanceCoin/README.md`](./BNB.BinanceCoin/README.md) for detailed documentation.

## Usage

### Import All Oracles
```typescript
import {
  // Tezos oracles
  tezosHarbingerOracle,
  tezosChainlinkOracle,
  tezosDiaOracle,
  
  // XRP oracles
  xrplNativeOracle,
  xrpDiaOracle,
  xrpBandProtocolOracle,
  xrpChainlinkOracle,
  xrpPythNetworkOracle,
  
  // Algorand oracles
  algoPythNetworkOracle,
  algoChainlinkOracle,
  algoFoundationOracle,
  algoGoracleOracle,
  algoFolksFeedOracle,
  algoDiaOracle,
  algoRandomnessBeacon,
  
  // Cosmos oracles
  atomBandProtocolOracle,
  atomPythNetworkOracle,
  atomChainlinkOracle,
  atomDiaOracle,
  atomUmbrellaOracle,
  atomCosmosSDKOracle,

  // Bitcoin Cash oracles
  bchOracleCashOracle,
  bchAnyhedgeOracle,
  bchDiaOracle,
  bchGeneralCashOracle,
  bchExternalApisOracle,

  // BNB Chain oracles
  bnbChainlinkOracle,
  bnbBinanceOracle,
  bnbBandProtocolOracle,
  bnbPythNetworkOracle,
  bnbTellorOracle,
  bnbUmbrellaNetworkOracle,
  bnbDiaOracle,
  bnbApi3Oracle,
  bnbRedstoneOracle,
} from '@/components/currencyCore/oracles';
```

### Import Specific Blockchain Oracles
```typescript
// Import Tezos oracles
import {
  tezosHarbingerOracle,
  tezosChainlinkOracle,
  tezosDiaOracle,
  tezosOraclesLazy,
  tezosOraclesMetadata
} from '@/components/currencyCore/oracles/XTZ.Tezos';

// Import XRP oracles
import {
  xrplNativeOracle,
  xrpDiaOracle,
  xrpBandProtocolOracle,
  xrpChainlinkOracle,
  xrpPythNetworkOracle,
  xrpOraclesLazy,
  xrpOraclesMetadata
} from '@/components/currencyCore/oracles/XRP.Ripple';

// Import Algorand oracles
import {
  algoPythNetworkOracle,
  algoChainlinkOracle,
  algoFoundationOracle,
  algoGoracleOracle,
  algoFolksFeedOracle,
  algoDiaOracle,
  algoRandomnessBeacon,
  algoOraclesLazy,
  algoOraclesMetadata
} from '@/components/currencyCore/oracles/ALGO.Algorand';

// Import Cosmos oracles
import {
  atomBandProtocolOracle,
  atomPythNetworkOracle,
  atomChainlinkOracle,
  atomDiaOracle,
  atomUmbrellaOracle,
  atomCosmosSDKOracle,
  atomOraclesLazy,
  atomOraclesMetadata
} from '@/components/currencyCore/oracles/ATOM.Cosmos';

// Import Bitcoin Cash oracles
import {
  bchOracleCashOracle,
  bchAnyhedgeOracle,
  bchDiaOracle,
  bchGeneralCashOracle,
  bchExternalApisOracle,
  bchOraclesLazy,
  bchOraclesMetadata
} from '@/components/currencyCore/oracles/BCH.BitcoinCash';

// Import BNB Chain oracles
import {
  bnbChainlinkOracle,
  bnbBinanceOracle,
  bnbBandProtocolOracle,
  bnbPythNetworkOracle,
  bnbTellorOracle,
  bnbUmbrellaNetworkOracle,
  bnbDiaOracle,
  bnbApi3Oracle,
  bnbRedstoneOracle,
  bnbOraclesLazy,
  bnbOraclesMetadata
} from '@/components/currencyCore/oracles/BNB.BinanceCoin';
```

### Lazy Load Oracles
```typescript
// Lazy load Tezos oracles
const harbinger = await tezosOraclesLazy.harbinger();
const tezosChainlink = await tezosOraclesLazy.chainlink();

// Lazy load XRP oracles
const xrplNative = await xrpOraclesLazy.xrplNative();
const xrpDia = await xrpOraclesLazy.dia();

// Lazy load Algorand oracles
const algoPyth = await algoOraclesLazy.pythNetwork();
const algoChainlink = await algoOraclesLazy.chainlink();
const algoRandomness = await algoOraclesLazy.randomnessBeacon();

// Lazy load Cosmos oracles
const atomBand = await atomOraclesLazy.bandProtocol();
const atomPyth = await atomOraclesLazy.pythNetwork();
const atomCosmosSDK = await atomOraclesLazy.cosmosSdkOracle();

// Lazy load Bitcoin Cash oracles
const bchOracleCash = await bchOraclesLazy.oracleCash();
const bchAnyhedge = await bchOraclesLazy.anyhedge();
const bchExternalApis = await bchOraclesLazy.externalApis();

// Lazy load BNB Chain oracles
const bnbChainlink = await bnbOraclesLazy.chainlink();
const bnbPyth = await bnbOraclesLazy.pythNetwork();
const bnbBinance = await bnbOraclesLazy.binanceOracle();
```

### Query Oracle Metadata
```typescript
// Tezos oracle metadata
console.log(tezosOraclesMetadata.totalOracles); // 6
console.log(tezosOraclesMetadata.categories.decentralized); // ['Harbinger', 'Chainlink', 'DIA']

// XRP oracle metadata
console.log(xrpOraclesMetadata.totalOracles); // 5
console.log(xrpOraclesMetadata.categories.onChainNative); // ['XRPL Native Price Oracles']

// Algorand oracle metadata
console.log(algoOraclesMetadata.totalOracles); // 7
console.log(algoOraclesMetadata.features.vrfRandomness); // ['Algorand Randomness Beacon']

// Cosmos oracle metadata
console.log(atomOraclesMetadata.totalOracles); // 6
console.log(atomOraclesMetadata.categories.nativeCosmos); // ['Band Protocol', 'Cosmos SDK Oracle Module']

// Bitcoin Cash oracle metadata
console.log(bchOraclesMetadata.totalOracles); // 5
console.log(bchOraclesMetadata.categories.native); // ['Oracle.cash']
console.log(bchOraclesMetadata.uniqueFeatures.opCheckDataSig); // 'OP_CHECKDATASIG opcode enables cryptographic oracle verification'

// BNB Chain oracle metadata
console.log(bnbOraclesMetadata.totalOracles); // 9
console.log(bnbOraclesMetadata.categories.industryLeading); // ['Chainlink']
console.log(bnbOraclesMetadata.features.evmCompatible); // true
```

## Oracle Categories

### Price Feeds
- **Harbinger**: Native Tezos, self-sustaining, volume-weighted
- **Chainlink**: Decentralized, proven security, cross-chain
- **DIA**: Multi-source, transparent, 100+ exchanges
- **Kaiko**: Institutional-grade, order book data

### Computational Data
- **Wolfram Alpha**: Knowledge base, scientific computations, natural language queries

### API Services
- **Ubinetic**: IoT sensors, payment verification, custom APIs

## Integration Best Practices

1. **Multiple Oracle Strategy**: Use multiple oracles for critical applications
2. **Data Freshness**: Always check timestamps on oracle data
3. **Error Handling**: Implement robust fallback mechanisms
4. **Scaling Factors**: Different oracles use different decimal precision
5. **Gas Optimization**: Use indexer APIs for read-only operations
6. **Security**: Validate data sources and signatures
7. **Rate Limits**: Respect API rate limits for external oracles

## Future Roadmap

- [x] Tezos (XTZ) oracles ✅
- [x] XRP Ledger (XRPL) oracles ✅
- [x] Algorand (ALGO) oracles ✅
- [x] Cosmos (ATOM) oracles ✅
- [x] Bitcoin Cash (BCH) oracles ✅
- [x] BNB Chain (BNB) oracles ✅
- [ ] Ethereum (ETH) oracles (Chainlink, Band Protocol, etc.)
- [ ] Bitcoin (BTC) oracles (Bitcoin-specific price feeds)
- [ ] Solana (SOL) oracles (Pyth Network, Switchboard, etc.)
- [ ] Polkadot (DOT) oracles (Polkadot-specific oracle solutions)
- [ ] Cross-chain oracle bridges
- [ ] Oracle aggregation services
- [ ] Real-time WebSocket subscriptions
- [ ] Oracle health monitoring

## Related Resources

### Tezos (XTZ) Resources
- See [`XTZ.Tezos/README.md`](./XTZ.Tezos/README.md)
- Tezos Official: https://tezos.com/
- Developer Portal: https://tezos.com/developers/
- Taquito SDK: https://tezostaquito.io/
- TzKT API: https://api.tzkt.io/

### XRP Ledger (XRPL) Resources
- See [`XRP.Ripple/README.md`](./XRP.Ripple/README.md)
- XRPL Official: https://xrpl.org/
- Developer Portal: https://xrpl.org/docs/
- XRPL.js SDK: https://js.xrpl.org/
- Native Price Oracles: https://xrpl.org/docs/concepts/decentralized-storage/price-oracles

### Algorand (ALGO) Resources
- See [`ALGO.Algorand/README.md`](./ALGO.Algorand/README.md)
- Algorand Official: https://algorand.foundation/
- Developer Portal: https://developer.algorand.org/
- Algorand JS SDK: https://github.com/algorand/js-algorand-sdk
- Randomness Beacon: https://developer.algorand.org/articles/usage-and-best-practices-for-randomness-beacon/

### Cosmos (ATOM) Resources
- See [`ATOM.Cosmos/README.md`](./ATOM.Cosmos/README.md)
- Cosmos Official: https://cosmos.network/
- Developer Portal: https://docs.cosmos.network/
- CosmJS SDK: https://cosmos.github.io/cosmjs/
- Band Protocol: https://docs.bandchain.org/
- IBC Protocol: https://ibc.cosmos.network/

### Bitcoin Cash (BCH) Resources
- See [`BCH.BitcoinCash/README.md`](./BCH.BitcoinCash/README.md)
- Bitcoin Cash Official: https://www.bitcoincash.org/
- CashScript: https://cashscript.org/
- Libauth: https://libauth.org/
- Oracle.cash: https://oracles.cash/
- AnyHedge: https://anyhedge.com/
- DIA Oracle: https://www.diadata.org/

### General Oracle Resources
- Oracle Best Practices: https://docs.chain.link/docs/architecture-request-model/
- Oracle Security: https://consensys.github.io/smart-contract-best-practices/oracles/
- Oracle Patterns: https://ethereum.org/en/developers/docs/oracles/
- Pyth Network: https://pyth.network/
- Chainlink: https://chain.link/
- DIA: https://www.diadata.org/
- Band Protocol: https://bandprotocol.com/

---

For blockchain-specific oracle documentation, refer to the individual blockchain directories:
- [`XTZ.Tezos/README.md`](./XTZ.Tezos/README.md)
- [`XRP.Ripple/README.md`](./XRP.Ripple/README.md)
- [`ALGO.Algorand/README.md`](./ALGO.Algorand/README.md)
- [`ATOM.Cosmos/README.md`](./ATOM.Cosmos/README.md)
- [`BCH.BitcoinCash/README.md`](./BCH.BitcoinCash/README.md)