# Stellar (XLM) DEXs

This directory contains DEX integrations for the Stellar blockchain ecosystem.

## Overview

Stellar has a unique architecture with a **native decentralized exchange (DEX) built directly into the protocol**. This means that trading is not done through external smart contracts, but through core protocol operations. Stellar supports both **orderbook-based trading** and **AMM liquidity pools**, making it one of the most versatile blockchain platforms for decentralized trading.

**Key Features:**
- **Native DEX**: Trading built into the protocol, not smart contracts
- **Federated Byzantine Agreement (FBA)**: Fast consensus (3-5 seconds)
- **Path Payments**: Automatic multi-hop currency conversion
- **Extremely Low Fees**: 0.00001 XLM per operation (~$0.0000012)
- **Orderbook + AMM**: Supports both traditional orderbook and liquidity pools
- **Soroban Smart Contracts**: WebAssembly-based smart contracts for advanced DeFi
- **Multi-Currency**: Built-in support for any asset (no smart contract needed)

## DEXs

### 1. **StellarX** (`stellarX.ts`)
- **Type**: Native DEX Interface
- **Description**: Advanced trading interface for Stellar's native DEX
- **Features**: Orderbook trading, advanced charts, fiat on/off-ramp
- **API**: Horizon API
- **SDK**: `@stellar/stellar-sdk`
- **Docs**: https://developers.stellar.org/api/
- **Social**: [Twitter](https://twitter.com/stellarxhq) | [Telegram](https://t.me/stellarx)

### 2. **LOBSTR** (`lobstr.ts`)
- **Type**: Wallet & DEX
- **Description**: Popular wallet with integrated DEX and swap interface
- **Features**: Wallet, swaps, orderbook, mobile apps, Vault security
- **API**: Horizon API + LOBSTR API
- **SDK**: `@stellar/stellar-sdk`
- **Docs**: https://lobstr.co/faq
- **Social**: [Twitter](https://twitter.com/lobstrco) | [Telegram](https://t.me/lobstrco)

### 3. **StellarTerm** (`stellarTerm.ts`)
- **Type**: Native DEX Client
- **Description**: Open-source trading client for Stellar DEX
- **Features**: Orderbook, portfolio tracking, multi-signature, open-source
- **API**: Horizon API + Ticker API
- **SDK**: `@stellar/stellar-sdk`
- **Docs**: https://stellarterm.com/about
- **Social**: [Twitter](https://twitter.com/stellarterm) | [GitHub](https://github.com/stellarterm)

### 4. **Lumenswap** (`lumenswap.ts`)
- **Type**: AMM DEX
- **Description**: First AMM DEX on Stellar with liquidity pools
- **Features**: AMM, liquidity pools, farming, simple swaps
- **API**: Horizon API + Lumenswap API
- **SDK**: `@stellar/stellar-sdk`
- **Docs**: https://docs.lumenswap.io/
- **Social**: [Twitter](https://twitter.com/lumenswap) | [Telegram](https://t.me/lumenswap)

### 5. **Stellarport** (`stellarport.ts`)
- **Type**: Trading Platform
- **Description**: Multi-asset trading platform with ICO launchpad
- **Features**: Trading, ICO launchpad, portfolio management, batch trading
- **API**: Horizon API + Stellarport API
- **SDK**: `@stellar/stellar-sdk`
- **Docs**: https://stellarport.io/help
- **Social**: [Twitter](https://twitter.com/stellarportio) | [Telegram](https://t.me/stellarport)

### 6. **Scopuly** (`scopuly.ts`)
- **Type**: Multi-Chain DEX
- **Description**: Cross-chain exchange with Stellar integration
- **Features**: Cross-chain swaps, bridge, multi-chain portfolio
- **API**: Horizon API + Scopuly API
- **SDK**: `@stellar/stellar-sdk`
- **Docs**: https://scopuly.com/developers
- **Social**: [Twitter](https://twitter.com/scopuly) | [Telegram](https://t.me/scopuly)

### 7. **Aqua** (`aqua.ts`)
- **Type**: AMM + Liquidity Rewards
- **Description**: Liquidity rewards and governance protocol
- **Features**: Liquidity rewards, AQUA token, governance, AMM
- **API**: Horizon API + Aqua API
- **SDK**: `@stellar/stellar-sdk`
- **Docs**: https://aqua.network/developers
- **Social**: [Twitter](https://twitter.com/aqua_token) | [Telegram](https://t.me/aquarius_HOME)

## Integration Examples

### Basic Order Book Trading
```typescript
import * as StellarSDK from '@stellar/stellar-sdk';

const server = new StellarSDK.Horizon.Server('https://horizon.stellar.org');

// Get order book
const XLM = StellarSDK.Asset.native();
const USDC = new StellarSDK.Asset(
  'USDC',
  'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN'
);

const orderBook = await server
  .orderbook(XLM, USDC)
  .limit(20)
  .call();

console.log('Best bid:', orderBook.bids[0].price);
console.log('Best ask:', orderBook.asks[0].price);
```

### Path Payments (Auto Currency Conversion)
```typescript
// Swap XLM to USDC automatically
const paths = await server
  .strictReceivePaths([XLM], USDC, '100')
  .call();

const bestPath = paths.records[0];
console.log('Source amount needed:', bestPath.source_amount);
console.log('Path:', bestPath.path);
```

### AMM Liquidity Pools
```typescript
// Add liquidity to pool
const transaction = new StellarSDK.TransactionBuilder(account, {
  fee: StellarSDK.BASE_FEE,
  networkPassphrase: StellarSDK.Networks.PUBLIC
})
  .addOperation(
    StellarSDK.Operation.liquidityPoolDeposit({
      liquidityPoolId: 'pool_id_here',
      maxAmountA: '1000',
      maxAmountB: '1000',
      minPrice: '0.9',
      maxPrice: '1.1'
    })
  )
  .setTimeout(StellarSDK.TimeoutInfinite)
  .build();
```

## Stellar-Specific Features

### 1. **Native DEX**
Unlike most blockchains, Stellar's DEX is built into the core protocol. This means:
- No external smart contracts needed
- Extremely low fees (0.00001 XLM)
- Direct protocol support for trading
- High security and reliability

### 2. **Path Payments**
Stellar can automatically find the best exchange rate across multiple currency pairs:
```
XLM → BTC → USDC → EUR
```
This happens in a single transaction with optimal pricing.

### 3. **Orderbook + AMM Hybrid**
Stellar supports both:
- **Classic Orderbook**: Limit and market orders
- **Liquidity Pools**: AMM-style constant product pools

### 4. **Trustlines**
Before receiving a non-XLM asset, you must add a **trustline**:
```typescript
const transaction = new StellarSDK.TransactionBuilder(account, {
  fee: StellarSDK.BASE_FEE,
  networkPassphrase: StellarSDK.Networks.PUBLIC
})
  .addOperation(
    StellarSDK.Operation.changeTrust({
      asset: new StellarSDK.Asset('USDC', 'ISSUER_ADDRESS')
    })
  )
  .setTimeout(StellarSDK.TimeoutInfinite)
  .build();
```

### 5. **Soroban Smart Contracts**
Stellar's Soroban platform enables WebAssembly-based smart contracts for advanced DeFi:
- **Language**: Rust
- **VM**: WebAssembly
- **Docs**: https://soroban.stellar.org/

## Common Operations

### Get Current Price
```typescript
const orderBook = await server
  .orderbook(baseAsset, counterAsset)
  .limit(1)
  .call();

const bid = Number(orderBook.bids[0].price);
const ask = Number(orderBook.asks[0].price);
const mid = (bid + ask) / 2;
```

### Place Limit Order
```typescript
const transaction = new StellarSDK.TransactionBuilder(account, {
  fee: StellarSDK.BASE_FEE,
  networkPassphrase: StellarSDK.Networks.PUBLIC
})
  .addOperation(
    StellarSDK.Operation.manageSellOffer({
      selling: XLM,
      buying: USDC,
      amount: '100',
      price: '0.12'
    })
  )
  .setTimeout(StellarSDK.TimeoutInfinite)
  .build();
```

### Get Recent Trades
```typescript
const trades = await server
  .trades()
  .forAssetPair(XLM, USDC)
  .order('desc')
  .limit(50)
  .call();

console.log(`Found ${trades.records.length} trades`);
```

## Resources

- **Stellar Developers**: https://developers.stellar.org/
- **Horizon API Docs**: https://developers.stellar.org/api/
- **Stellar SDK (JS)**: https://stellar.github.io/js-stellar-sdk/
- **Soroban Docs**: https://soroban.stellar.org/
- **Stellar Laboratory**: https://laboratory.stellar.org/ (Test transactions)
- **Stellar Expert**: https://stellar.expert/ (Explorer)
- **StellarBeat**: https://stellarbeat.io/ (Network monitor)

## Network Information

- **Consensus**: Federated Byzantine Agreement (FBA)
- **Block Time**: 3-5 seconds
- **Transaction Fee**: 0.00001 XLM per operation (~$0.0000012)
- **Address Format**: 56-character string starting with 'G'
- **Derivation Path**: `m/44'/148'/0'` (BIP44 standard)
- **Public Horizon**: https://horizon.stellar.org
- **Public RPC**: https://rpc.stellar.org

## Notes

- All addresses on Stellar start with `G` and are 56 characters long
- Account must maintain a minimum balance of 1 XLM
- Each trustline requires 0.5 XLM reserve
- Path payments can convert currencies automatically
- Soroban contracts use WebAssembly and Rust
- Stellar has no native token standard - all assets are protocol-level
- Multi-signature accounts supported natively

---

**Last Updated**: October 14, 2025

