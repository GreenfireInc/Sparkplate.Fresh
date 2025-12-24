# XRP Ledger (XRPL) DEXs

This directory contains DEX integrations for the XRP Ledger (XRPL) blockchain ecosystem.

## Overview

The XRP Ledger has a **unique architecture with a native decentralized exchange built directly into the protocol**. This means that trading is not done through external smart contracts (like on Ethereum), but through core protocol operations. XRPL supports both **orderbook-based trading (CLOB)** and **AMM liquidity pools**, making it one of the most efficient blockchain platforms for decentralized trading.

**Key Features:**
- **Native Protocol DEX**: Trading built into the ledger, not smart contracts
- **XRP Ledger Consensus Protocol**: 3-5 second finality, no mining
- **Path Payments**: Automatic multi-hop currency conversion in a single transaction
- **Extremely Low Fees**: ~0.00001 XRP per transaction (~$0.00001)
- **Orderbook + AMM**: Supports both traditional limit orders and liquidity pools
- **Multi-Currency**: Built-in support for any issued asset (IOUs, stablecoins, tokenized assets)
- **No Gas Wars**: Fixed, predictable transaction fees

## DEXs

### 1. **XRPL Native DEX** (`nativeDEX.ts`)
- **Type**: Native Protocol DEX
- **Description**: Built-in decentralized exchange integrated directly into the XRP Ledger protocol
- **Features**: Orderbook, AMM, path payments, limit orders, market orders
- **API**: WebSocket/HTTP via rippled
- **SDK**: `xrpl`
- **Docs**: https://xrpl.org/decentralized-exchange.html
- **Social**: [Twitter](https://twitter.com/Ripple) | [Telegram](https://t.me/Ripple)

### 2. **Sologenic DEX** (`sologenic.ts`)
- **Type**: Native DEX + Tokenization
- **Description**: Leading DEX on XRPL specializing in tokenized real-world assets (stocks, ETFs)
- **Features**: Tokenized assets, SOLO token, NFT support, 40,000+ assets
- **API**: Sologenic API + XRPL
- **SDK**: `@sologenic/solodex`, `xrpl`
- **Docs**: https://sologenic.org/developers
- **Social**: [Twitter](https://twitter.com/realSologenic) | [Telegram](https://t.me/sologenic)

### 3. **XPMarket** (`xpmarket.ts`)
- **Type**: Multi-Feature DEX
- **Description**: Comprehensive XRPL platform with DEX, NFT marketplace, and portfolio tools
- **Features**: Quick swaps, price charts, NFT trading, portfolio tracking
- **API**: XPMarket API + XRPL
- **SDK**: `xrpl`
- **Docs**: https://api.xpmarket.com/XPMarket_v1.pdf
- **Social**: [Twitter](https://twitter.com/xpmarket) | [Telegram](https://t.me/xpmarket)

### 4. **Magnetic X** (`magneticX.ts`)
- **Type**: AMM + Farming DEX
- **Description**: Unified XRPL DEX with AMM pools, liquidity farming, and gamified DeFi
- **Features**: AMM, farming, token launchpad, NFTs, crash bets
- **API**: Magnetic API + XRPL
- **SDK**: `xrpl`
- **Docs**: https://xmagnetic.org/WhitePaper.pdf
- **Social**: [Twitter](https://twitter.com/MagneticX_XRPL) | [Telegram](https://t.me/magneticx)

### 5. **Orchestra Finance** (`orchestra.ts`)
- **Type**: AMM Frontend
- **Description**: Refined frontend interface for XRPL AMM pools with simple swaps
- **Features**: AMM swaps, liquidity provision, fee sharing, pool analytics
- **API**: Orchestra API + XRPL
- **SDK**: `xrpl`
- **Docs**: https://docs.orchestra.finance/
- **Social**: [Twitter](https://twitter.com/orchestra_fi) | [Telegram](https://t.me/orchestrafinance)

### 6. **XRP Toolkit** (`xrptoolkit.ts`)
- **Type**: Professional DEX Interface
- **Description**: Professional interface for XRPL DEX with advanced trading features
- **Features**: Advanced orders, multi-wallet, trustline management, payment paths
- **API**: XRPL
- **SDK**: `xrpl`
- **Docs**: https://www.xrptoolkit.com/help
- **Social**: [Twitter](https://twitter.com/xrptoolkit) | [Telegram](https://t.me/xrptoolkit)

### 7. **DeXRP** (`dexrp.ts`)
- **Type**: Multi-Chain DEX
- **Description**: Community-driven DEX on XRPL with cross-chain liquidity bridging
- **Features**: CCXT-compatible, cross-chain, liquidity bridging, multi-chain
- **API**: DeXRP API + XRPL
- **SDK**: `xrpl-dex-sdk`, `xrpl`
- **Docs**: https://docs.dexrp.com/
- **Social**: [Twitter](https://twitter.com/DeXRPofficial) | [Telegram](https://t.me/dexrp)

## Integration Examples

### Basic Order Book Trading
```typescript
import xrpl from 'xrpl';

const client = new xrpl.Client('wss://xrplcluster.com/');

await client.connect();

// Get order book
const response = await client.request({
  command: 'book_offers',
  taker_gets: {
    currency: 'USD',
    issuer: 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B' // Bitstamp USD
  },
  taker_pays: { currency: 'XRP' },
  limit: 10
});

console.log('Order book:', response.result.offers);
await client.disconnect();
```

### AMM Pool Trading
```typescript
import xrpl from 'xrpl';

const client = new xrpl.Client('wss://xrplcluster.com/');

await client.connect();

// Get AMM pool info
const response = await client.request({
  command: 'amm_info',
  asset: { currency: 'XRP' },
  asset2: {
    currency: 'USD',
    issuer: 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B'
  }
});

const amm = response.result.amm;
console.log('AMM Pool:', amm);

await client.disconnect();
```

### Path Payments (Auto Currency Conversion)
```typescript
import xrpl from 'xrpl';

const client = new xrpl.Client('wss://xrplcluster.com/');

await client.connect();

// Find best path for payment
const pathResponse = await client.request({
  command: 'ripple_path_find',
  source_account: 'rSourceAddress',
  destination_account: 'rDestinationAddress',
  destination_amount: {
    currency: 'EUR',
    issuer: 'rEURIssuer',
    value: '100'
  },
  source_currencies: [{ currency: 'USD', issuer: 'rUSDIssuer' }]
});

console.log('Best paths:', pathResponse.result.alternatives);

await client.disconnect();
```

## XRPL-Specific Features

### 1. **Native Protocol DEX**
Unlike most blockchains, XRPL's DEX is built into the core protocol:
- No external smart contracts needed
- Extremely low fees (~0.00001 XRP)
- Direct protocol support for trading
- Maximum security and reliability

### 2. **Path Payments**
XRPL can automatically find the best exchange rate across multiple currency pairs in a single transaction:
```
XRP → USD → EUR → BTC
```
This happens atomically with optimal pricing.

### 3. **Orderbook + AMM Hybrid**
XRPL supports both:
- **Classic Orderbook (CLOB)**: Limit and market orders
- **Liquidity Pools (AMM)**: Constant product pools (added via XLS-30)

### 4. **Trustlines**
Before receiving a non-XRP asset, you must add a **trustline**:
```typescript
const tx = {
  TransactionType: 'TrustSet',
  Account: wallet.classicAddress,
  LimitAmount: {
    currency: 'USD',
    issuer: 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B',
    value: '1000000'
  }
};
```

### 5. **Native Price Oracles**
XRPL has native on-chain price oracles (XLS-47 amendment):
```typescript
const response = await client.request({
  command: 'get_aggregate_price',
  base_asset: 'XRP',
  quote_asset: 'USD',
  oracles: [
    { account: 'rOracle1...', last_update_time: 1724871860 }
  ],
  trim: 20
});

console.log('Oracle prices:', response.result);
```

### 6. **Common Currency Issuers**
Popular gateways for issued currencies:
- **Bitstamp**: `rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B` (USD, EUR, BTC)
- **GateHub**: `rhub8VRN55s94qWKDv6jmDy1pUykJzF3wq` (USD, EUR)
- **Sologenic**: `rsoLo2S1kiGeCcn6hCUXVrCpGMWLrRrLZz` (SOLO token)

## Common Operations

### Get Current Price
```typescript
const orderBook = await client.request({
  command: 'book_offers',
  taker_gets: { currency: 'XRP' },
  taker_pays: {
    currency: 'USD',
    issuer: 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B'
  },
  limit: 1
});

const price = Number(orderBook.result.offers[0].quality);
console.log(`XRP/USD: ${price}`);
```

### Place Limit Order
```typescript
const tx = {
  TransactionType: 'OfferCreate',
  Account: wallet.classicAddress,
  TakerGets: xrpl.xrpToDrops('100'),
  TakerPays: {
    currency: 'USD',
    issuer: 'rvYAfWj5gh67oV6fW32ZzP3Aw4Eubs59B',
    value: '50'
  }
};

const prepared = await client.autofill(tx);
const signed = wallet.sign(prepared);
const result = await client.submitAndWait(signed.tx_blob);
```

### Get Account Balances
```typescript
const accountInfo = await client.request({
  command: 'account_info',
  account: 'rYourAddress',
  ledger_index: 'validated'
});

const accountLines = await client.request({
  command: 'account_lines',
  account: 'rYourAddress',
  ledger_index: 'validated'
});

console.log('XRP Balance:', accountInfo.result.account_data.Balance);
console.log('Token Balances:', accountLines.result.lines);
```

## Resources

- **XRPL Official**: https://xrpl.org/
- **XRPL DEX Docs**: https://xrpl.org/decentralized-exchange.html
- **xrpl.js SDK**: https://js.xrpl.org/
- **GitHub**: https://github.com/XRPLF/xrpl.js
- **Public Servers**: https://xrpl.org/docs/tutorials/public-servers
- **XRPScan Explorer**: https://xrpscan.com/
- **Bithomp Explorer**: https://bithomp.com/
- **XRPL Data API**: https://data.xrplf.org/

## Network Information

- **Consensus**: XRP Ledger Consensus Protocol (XRPLCP)
- **Finality**: 3-5 seconds
- **Transaction Fee**: ~0.00001 XRP (~$0.00001)
- **Address Format**: Base58, starts with 'r', 25-35 characters
- **Derivation Path**: `m/44'/144'/0'/0/0` (BIP44 standard)
- **Public WebSocket**: `wss://xrplcluster.com/`
- **Public HTTP**: `https://xrplcluster.com/`

## Notes

- All addresses on XRPL start with `r` (e.g., `rN7n7otQDd6FczFgLdlqtyMVrn3qHwGJ1`)
- Account must maintain a minimum balance of 10 XRP
- Each trustline requires 2 XRP reserve
- Path payments can convert currencies automatically across multiple hops
- XRPL has no native token standard - all assets are protocol-level IOUs
- Multi-signature accounts supported natively
- Hooks (smart contracts) are in development for advanced programmability
- NFTs supported via XLS-20 standard
- Permissioned DEX available for institutional use

---

**Last Updated**: October 14, 2025

