## Waves (WAVES) DEX Integration Guide

This directory contains DEX integrations for the **Waves (WAVES)** blockchain, a multi-purpose platform with a native decentralized exchange built into the protocol.

## Overview

Waves is a blockchain platform that supports custom tokens, smart contracts (Ride language), and a native DEX with orderbook matching. Unlike most blockchains that use AMM DEXs, Waves features a built-in orderbook DEX with centralized Matcher nodes for order pairing while maintaining non-custodial security.

**Key Statistics:**
- **Total TVL:** $50+ million
- **24h Volume:** $5+ million
- **Block Time:** ~60 seconds
- **Throughput:** ~1,000 TPS
- **Transaction Fee:** 0.003 WAVES per order (fixed)
- **Consensus:** Leased Proof of Stake (LPoS)
- **Smart Contracts:** Ride (functional language)
- **Custom Tokens:** 30,000+ issued on Waves

## Supported DEXs

### 1. **Waves.Exchange** (Official Hybrid Exchange)
- **Type:** Hybrid DEX/CEX
- **TVL:** Largest on Waves
- **Website:** https://waves.exchange/
- **Description:** Official Waves exchange combining DEX and CEX features
- **API:** Matcher API + Node API
- **SDK:** `@waves/signer, @waves/waves-transactions`
- **Features:**
  - Orderbook trading (limit & market orders)
  - Gateway services (BTC, ETH, LTC deposits)
  - Staking and leasing
  - Mobile apps
  - Fixed 0.003 WAVES fee per order

### 2. **Swop.fi** (Leading AMM)
- **Type:** AMM DEX
- **TVL:** Largest AMM on Waves
- **Website:** https://swop.fi/
- **Description:** Automated market maker with liquidity pools and yield farming
- **API:** Node API + dApp state queries
- **SDK:** `@waves/signer, @waves/waves-transactions`
- **Features:**
  - Liquidity pools
  - Yield farming with SWOP token
  - Governance
  - Price oracle data
  - 0.3% swap fee (0.25% to LPs)

### 3. **Puzzle Swap** (DEX Aggregator)
- **Type:** DEX Aggregator
- **Website:** https://puzzleswap.org/
- **Description:** Intelligent aggregator finding best prices across Waves DEXs
- **API:** Routing API + Node API
- **SDK:** `@waves/signer, @waves/waves-transactions`
- **Features:**
  - Multi-hop swaps
  - Best route finding
  - Price comparison
  - No additional aggregation fee
  - Slippage optimization

### 4. **WX Network** (Layer 2)
- **Type:** Layer 2 Scaling Solution
- **Website:** https://wx.network/
- **Description:** Layer 2 for faster trading and lower fees
- **API:** WX Matcher API + Bridge API
- **SDK:** `@waves/signer, @waves/waves-transactions`
- **Features:**
  - 70% lower fees (0.001 WAVES)
  - Faster finality (~1-2 seconds)
  - Cross-layer bridge
  - Compatible with mainnet assets
  - Higher throughput

### 5. **ViresFinance** (Lending Protocol)
- **Type:** Lending + Swap
- **TVL:** Largest lending protocol
- **Website:** https://vires.finance/
- **Description:** Decentralized lending with integrated swap for collateral
- **API:** Vires API + Node API
- **SDK:** `@waves/signer, @waves/waves-transactions`
- **Features:**
  - Supply & borrow
  - Interest-bearing accounts
  - Collateral swaps
  - Variable interest rates
  - Liquidation system

### 6. **Neutrino Protocol** (Stablecoin)
- **Type:** Algorithmic Stablecoin + Swap
- **Website:** https://neutrino.at/
- **Description:** USDN stablecoin protocol with swap features
- **API:** Neutrino API + Oracle data
- **SDK:** `@waves/signer, @waves/waves-transactions`
- **Features:**
  - USDN stablecoin minting/redemption
  - NSBT bond staking
  - Price oracle (WAVES/USD)
  - Governance
  - Dynamic fees based on backing ratio

### 7. **Waves Ducks** (NFT/Gaming)
- **Type:** NFT Marketplace + Gaming
- **Website:** https://wavesducks.com/
- **Description:** Play-to-earn NFT game with marketplace and token swaps
- **API:** Ducks API + NFT endpoints
- **SDK:** `@waves/signer, @waves/waves-transactions`
- **Features:**
  - NFT trading marketplace
  - Duck breeding mechanics
  - EGG token farming
  - Play-to-earn rewards
  - Rarity system

## Technical Details

### Blockchain Architecture
- **Consensus:** Leased Proof of Stake (LPoS)
- **Smart Contract Language:** Ride (functional, not Turing-complete)
- **Block Time:** ~60 seconds
- **Throughput:** ~1,000 TPS
- **Signatures:** Curve25519 (Ed25519 with X25519 keys)
- **Derivation Path:** N/A (15-word seed phrase, not BIP44)
- **Address Format:** Base58 (starts with 3P for mainnet, 3M/3N for testnet)

### Unique Characteristics
1. **Native DEX:** Built-in orderbook DEX (not external dApps like Ethereum)
2. **Fixed Fees:** 0.003 WAVES per order (not gas-based)
3. **Matcher Nodes:** Centralized matching for speed, non-custodial security
4. **15-Word Seed:** Uses Waves-specific seed phrase, not BIP39
5. **Data Oracles:** Any account can publish oracle data via data transactions
6. **Leasing:** Stake WAVES by leasing to generating nodes
7. **Custom Tokens:** Issue tokens natively with Issue Transaction

### Integration Methods

1. **Node REST API:** Query blockchain state and broadcast transactions
   ```javascript
   const NODE_URL = 'https://nodes.wavesnodes.com';
   ```

2. **Matcher API:** Access orderbook and place orders
   ```javascript
   const MATCHER_URL = 'https://matcher.waves.exchange/api/v1';
   ```

3. **Data Service API:** Historical data and analytics
   ```javascript
   const DATA_SERVICE = 'https://api.wavesplatform.com/v0';
   ```

4. **Waves Signer:** Sign transactions securely
   ```typescript
   import { Signer } from '@waves/signer';
   const signer = new Signer();
   ```

5. **Waves Transactions:** Create and broadcast transactions
   ```typescript
   import { transfer, invokeScript } from '@waves/waves-transactions';
   ```

## Usage Examples

### Import Specific DEX
```typescript
import { swopfiDEX, wavesExchangeDEX } from '@/components/currencyCore/DEXs/WAVES.Waves';

console.log(swopfiDEX.name); // "Swop.fi"
console.log(swopfiDEX.type); // "AMM DEX"
```

### Import All Waves DEXs
```typescript
import * as wavesDEXs from '@/components/currencyCore/DEXs/WAVES.Waves';

console.log(wavesDEXs.wavesDexMetadata.totalDexes); // 7
console.log(wavesDEXs.wavesDexMetadata.blockchain); // "Waves (WAVES)"
```

### Lazy Load a DEX
```typescript
import { wavesDexes } from '@/components/currencyCore/DEXs/WAVES.Waves';

const swopfi = await wavesDexes.swopfi();
console.log(swopfi.description);
```

### Query DEX Metadata
```typescript
import { wavesDexMetadata } from '@/components/currencyCore/DEXs/WAVES.Waves';

console.log(wavesDexMetadata.features.hasNativeDEX); // true
console.log(wavesDexMetadata.technicalDetails.consensus); // "Leased Proof of Stake (LPoS)"
```

## Unique Waves Features

### 1. **Native Orderbook DEX**
- Built into the Waves protocol itself
- Matcher nodes pair orders centrally
- Non-custodial (users keep private keys)
- Fixed 0.003 WAVES fee per order
- No gas wars or variable fees

### 2. **Leased Proof of Stake**
- Lease WAVES to generating nodes
- Earn rewards without locking funds
- Can cancel lease anytime
- 1,000 WAVES minimum for node operation
- Lessors earn proportional rewards

### 3. **15-Word Seed Phrase**
- Not BIP39/BIP44 compatible
- Unique to Waves
- Cannot use hardware wallets designed for BIP44
- Waves-specific key derivation
- Account seed = keccak256(blake2b256(nonce + seed))

### 4. **Ride Smart Contracts**
- Functional (not Turing-complete)
- Pattern matching and recursion
- No loops (prevents infinite execution)
- Built-in security features
- Direct WAVES/asset access

### 5. **Data Oracle System**
- Any account can be an oracle
- Publish data via data transactions
- Key-value storage accessible to all contracts
- No centralized oracle provider needed
- 0.1 WAVES per KB fee

### 6. **Custom Token Issuance**
- Issue tokens with Issue Transaction
- No smart contract needed
- Built-in reissuability and burning
- NFT support via Issue Transaction
- 1 WAVES fee to issue

## Oracle Integration

Waves uses a decentralized oracle model where any account can publish data:

```typescript
import { data } from '@waves/waves-transactions';

// Read oracle data
const response = await fetch(
  'https://nodes.wavesnodes.com/addresses/data/3PC9BfRwJWWiw48yoa4Ap6bSqc9c4xUUR5m/price_WAVES_USD'
);
const priceData = await response.json();
console.log('WAVES/USD Price:', priceData.value);

// Publish oracle data (requires signing)
const oracleData = data({
  data: [
    { key: 'price_WAVES_USD', type: 'integer', value: 85000 }, // Price in cents
    { key: 'updated', type: 'integer', value: Date.now() }
  ]
}, seed);
```

**Known Oracle Providers:**
- **Swop.fi Oracle:** `3PJaDyprveVP7agoN4w3CwvjDoMoH5meDpP`
- **Neutrino Oracle:** `3PC9BfRwJWWiw48yoa4Ap6bSqc9c4xUUR5m`

## Resources

### Official Documentation
- **Waves Protocol:** https://waves.tech/
- **Developer Docs:** https://docs.waves.tech/
- **Waves Explorer:** https://wavesexplorer.com/
- **Waves Signer:** https://docs.waves.tech/en/building-apps/waves-api-and-sdk/client-libraries/signer
- **Waves Keeper:** https://wavesplatform.com/products-keeper

### DEX Resources
- **Waves.Exchange:** https://waves.exchange/
- **Swop.fi:** https://swop.fi/
- **Puzzle Swap:** https://puzzleswap.org/
- **WX Network:** https://wx.network/
- **ViresFinance:** https://vires.finance/
- **Neutrino:** https://neutrino.at/
- **Waves Ducks:** https://wavesducks.com/

### API Endpoints
- **Node REST API:** https://nodes.wavesnodes.com
- **Matcher API:** https://matcher.wavesplatform.com/api/v1
- **Data Service:** https://api.wavesplatform.com/v0
- **WX Matcher:** https://matcher.wx.network/api/v1

### SDK & Libraries
- **Waves Signer:** `npm install @waves/signer`
- **Waves Transactions:** `npm install @waves/waves-transactions`
- **TS Lib Crypto:** `npm install @waves/ts-lib-crypto`

### Community
- **Waves Forum:** https://forum.waves.tech/
- **Discord:** https://discord.gg/waves
- **Telegram:** https://t.me/wavesnews
- **Twitter:** https://twitter.com/wavesprotocol
- **Reddit:** https://www.reddit.com/r/Wavesplatform/

## Integration Considerations

1. **15-Word Seed Phrase:**
   - Not compatible with BIP39/BIP44
   - Use Waves-specific libraries
   - Cannot import to hardware wallets

2. **Orderbook Model:**
   - Different from AMM DEXs
   - Requires limit order placement
   - Matcher fee (0.003 WAVES) always applies

3. **Asset IDs:**
   - WAVES is represented as `null` or empty string
   - Other assets use Base58 asset ID
   - Find IDs on Waves Explorer

4. **Transaction Confirmation:**
   - Wait for block inclusion (~60 seconds)
   - Matcher provides instant feedback
   - Final settlement on blockchain

5. **Leasing vs. Staking:**
   - "Leasing" on Waves = "Staking" elsewhere
   - Lease to generating nodes, not validators
   - Can cancel lease anytime (no unbonding period)

6. **Data Storage:**
   - Read account data via Node API
   - Oracle data stored as key-value pairs
   - Check data freshness/timestamp

## Contributing

When adding new Waves DEXs:
1. Follow the single-export pattern
2. Include Matcher/Node API endpoints
3. Provide Waves Signer integration examples
4. Link to official documentation
5. Add social media links
6. Update this README
7. Update `index.ts` exports
8. Update `wavesDexMetadata`

---

**Last Updated:** October 14, 2025  
**Maintained by:** Corey  
**License:** MIT

