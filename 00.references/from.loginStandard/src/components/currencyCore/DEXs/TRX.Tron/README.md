# Tron (TRX) DEX Integration Guide

This directory contains DEX integrations for the **Tron (TRX)** blockchain, a high-throughput Layer 1 platform using Delegated Proof of Stake (DPoS) and the Tron Virtual Machine (TVM).

## Overview

Tron is a blockchain platform designed for high-speed, low-cost transactions with a focus on decentralized applications and digital content. It uses Delegated Proof of Stake (DPoS) consensus with 27 Super Representatives and has the largest USDT supply of any blockchain ($60+ billion).

**Key Statistics:**
- **Total TVL:** $7+ billion
- **24h Volume:** $800+ million
- **Block Time:** ~3 seconds
- **Throughput:** ~2,000 TPS
- **Transaction Fee:** ~$0.000005
- **Consensus:** Delegated Proof of Stake (DPoS)
- **Smart Contracts:** TVM (Solidity-compatible)
- **Official Oracle:** Chainlink Data Feeds
- **USDT Supply:** $60+ billion (largest chain)

## Supported DEXs

### 1. **SunSwap** (Official Tron DEX)
- **Type:** AMM DEX
- **TVL:** $500M+
- **Website:** https://sunswap.com/
- **Description:** Official DEX on Tron with the largest TVL, built by the Tron Foundation
- **API:** REST API + TronGrid
- **SDK:** `tronweb`
- **Features:** 
  - Liquidity pools
  - Token swaps
  - Yield farming
  - Staking rewards
  - LP token staking

### 2. **JustMoney**
- **Type:** Algorithmic Stablecoin DEX
- **Website:** https://justmoney.exchange/
- **Description:** Algorithmic stablecoin protocol with DEX functionality
- **API:** TronGrid + Contract ABI
- **SDK:** `tronweb`
- **Features:**
  - USDJ stablecoin
  - Collateralized debt positions
  - Decentralized stablecoin
  - Algorithmic stability

### 3. **JustLend DAO Swap**
- **Type:** DeFi Protocol + Swap
- **TVL:** $1B+
- **Website:** https://justlend.org/
- **Description:** Largest lending protocol on Tron with integrated swap functionality
- **API:** TronGrid + Contract ABI
- **SDK:** `tronweb`
- **Features:**
  - Money market
  - Lending & borrowing
  - Integrated swap
  - JST governance token
  - High yields

### 4. **Poloniex DEX**
- **Type:** Hybrid Exchange
- **Website:** https://poloniex.com/
- **Description:** Hybrid exchange with DEX features for Tron assets
- **API:** REST API + WebSocket
- **SDK:** `tronweb` + Poloniex SDK
- **Features:**
  - Centralized + Decentralized
  - Orderbook + AMM
  - Professional trading tools
  - High liquidity

### 5. **SunSwap V2**
- **Type:** Uniswap V2 Fork
- **Website:** https://sunswap.com/
- **Description:** V2 upgrade with concentrated liquidity and improved efficiency
- **API:** REST API + TronGrid
- **SDK:** `tronweb`
- **Features:**
  - Concentrated liquidity
  - Multiple fee tiers
  - Improved capital efficiency
  - Backward compatible

### 6. **TronTrade**
- **Type:** Multi-Feature DEX
- **Website:** https://trontrade.io/
- **Description:** All-in-one DeFi platform with DEX, NFT marketplace, and launchpad
- **API:** TronGrid + Contract ABI
- **SDK:** `tronweb`
- **Features:**
  - AMM swaps
  - NFT marketplace
  - Launchpad
  - Staking
  - Farming

### 7. **ZapperFi (Tron)**
- **Type:** DeFi Dashboard + Aggregator
- **Website:** https://zapper.fi/
- **Description:** Multi-chain DeFi dashboard and aggregator with Tron support
- **API:** Zapper API
- **SDK:** `tronweb` + `axios`
- **Features:**
  - Portfolio tracking
  - DEX aggregation
  - Multi-protocol support
  - Cross-chain swaps
  - Analytics dashboard

## Technical Details

### Blockchain Architecture
- **Consensus:** Delegated Proof of Stake (DPoS)
- **Virtual Machine:** TVM (Tron Virtual Machine)
- **Smart Contract Language:** Solidity
- **Block Time:** ~3 seconds
- **Throughput:** ~2,000 TPS
- **Signatures:** ECDSA (secp256k1)
- **Derivation Path:** `m/44'/195'/0'/0/0` (BIP44 Tron standard)
- **Address Format:** Base58 (starts with 'T') or Hex (starts with '41')

### Token Standards
- **TRC-20:** Fungible tokens (ERC-20 compatible)
- **TRC-10:** Native token standard (faster, lower fees)
- **TRC-721:** NFT standard (ERC-721 compatible)

### Integration Methods
1. **TronWeb SDK:** Official JavaScript library for Tron blockchain interactions
   ```javascript
   const TronWeb = require('tronweb');
   const tronWeb = new TronWeb({
     fullHost: 'https://api.trongrid.io',
     headers: { "TRON-PRO-API-KEY": 'your-api-key' }
   });
   ```

2. **TronGrid API:** Official HTTP API for Tron blockchain data
   ```javascript
   const endpoint = 'https://api.trongrid.io';
   const response = await fetch(`${endpoint}/v1/accounts/${address}`);
   ```

3. **Contract Interactions:**
   ```javascript
   const contract = await tronWeb.contract().at('TContractAddress');
   const result = await contract.methods.swapExactTokensForTokens(...).send();
   ```

4. **Chainlink Oracle Integration:**
   ```javascript
   const priceFeed = await tronWeb.contract().at('TPriceFeedAddress');
   const latestPrice = await priceFeed.latestAnswer().call();
   ```

## Usage Examples

### Import Specific DEX
```typescript
import { sunswapDEX, justlendDEX } from '@/components/currencyCore/DEXs/TRX.Tron';

console.log(sunswapDEX.name); // "SunSwap"
console.log(sunswapDEX.api.restEndpoint); // "https://api.sunswap.com/v1"
```

### Import All Tron DEXs
```typescript
import * as tronDEXs from '@/components/currencyCore/DEXs/TRX.Tron';

console.log(tronDEXs.trxDexMetadata.totalDexes); // 7
console.log(tronDEXs.trxDexMetadata.blockchain); // "Tron (TRX)"
```

### Lazy Load a DEX
```typescript
import { tronDexes } from '@/components/currencyCore/DEXs/TRX.Tron';

const sunswap = await tronDexes.sunswap();
console.log(sunswap.description);
```

### Query DEX Metadata
```typescript
import { trxDexMetadata } from '@/components/currencyCore/DEXs/TRX.Tron';

console.log(trxDexMetadata.features.hasTVM); // true
console.log(trxDexMetadata.stats.totalTvl); // "$7+ billion"
console.log(trxDexMetadata.technicalDetails.consensus); // "Delegated Proof of Stake (DPoS)"
```

## Unique Tron Features

### 1. **Largest USDT Supply**
- Tron has the largest USDT supply of any blockchain ($60+ billion)
- TRC-20 USDT is the most popular stablecoin on Tron
- Popular for remittances and cross-border transfers
- Extremely low transaction fees (~$0.000005)

### 2. **TVM (Tron Virtual Machine)**
- Solidity-compatible virtual machine
- EVM-compatible smart contracts
- Can deploy Ethereum contracts on Tron
- TRC-20 tokens are ERC-20 compatible

### 3. **Delegated Proof of Stake**
- 27 Super Representatives (SRs)
- Block production every 3 seconds
- High throughput (~2,000 TPS)
- Energy and bandwidth resource model
- Voting and governance through TRX staking

### 4. **Low Transaction Fees**
- Free daily bandwidth/energy allowance
- ~$0.000005 per transaction (if no free resources)
- Frozen TRX provides free resources
- No gas wars or congestion

### 5. **Chainlink Integration**
- Official oracle provider (replaced WINkLink in 2024)
- Decentralized price feeds
- Verifiable randomness
- External API integration

### 6. **Sun Ecosystem**
- SunSwap (official DEX)
- Sun.io (multi-chain DeFi hub)
- SunPump (token launchpad)
- Sun Genesis NFT collection
- All backed by Tron Foundation

## Oracle Integration

Tron uses **Chainlink** as the official oracle provider:

```javascript
const TronWeb = require('tronweb');
const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
  headers: { "TRON-PRO-API-KEY": 'your-api-key' }
});

// Chainlink TRX/USD Price Feed on Tron
const PRICE_FEED = 'TFb99v9JnwVihgfJAEBj9BxbFdP2CjqNuJ';
const priceFeed = await tronWeb.contract().at(PRICE_FEED);

// Get latest price
const latestRoundData = await priceFeed.latestRoundData().call();
const price = latestRoundData.answer / 1e8; // Chainlink uses 8 decimals

console.log(`TRX/USD Price: $${price}`);
```

## Resources

### Official Documentation
- **Tron Network:** https://tron.network/
- **Developer Docs:** https://developers.tron.network/
- **TronGrid API:** https://www.trongrid.io/
- **TronWeb SDK:** https://developers.tron.network/docs/tronweb
- **TronScan Explorer:** https://tronscan.org/

### DEX Resources
- **SunSwap:** https://sunswap.com/
- **JustLend DAO:** https://justlend.org/
- **JustMoney:** https://justmoney.exchange/
- **TronTrade:** https://trontrade.io/
- **Poloniex DEX:** https://poloniex.com/

### Oracle & Data
- **Chainlink on Tron:** https://docs.chain.link/data-feeds/tron
- **TronGrid API:** https://www.trongrid.io/
- **TronScan API:** https://tronscan.org/

### Community
- **Tron GitHub:** https://github.com/tronprotocol
- **Tron Forum:** https://forum.tron.network/
- **Tron DAO:** https://trondao.org/
- **Tron Twitter:** https://twitter.com/trondao
- **Tron Telegram:** https://t.me/tronnetworkEN

## Integration Considerations

1. **Resource Model:**
   - Tron uses bandwidth and energy instead of gas
   - Freeze TRX to get free resources
   - Consider resource costs in transactions

2. **Address Formats:**
   - Base58 addresses start with 'T' (user-facing)
   - Hex addresses start with '41' (contract-level)
   - Convert between formats using TronWeb

3. **Smart Contract Deployment:**
   - Solidity contracts are TVM-compatible
   - Use TronBox or TronIDE for deployment
   - Test on Shasta testnet first

4. **API Rate Limits:**
   - Free tier: 100 requests/second
   - Get a TronGrid API key for higher limits
   - Consider running your own full node

5. **Transaction Confirmation:**
   - Wait for 19 block confirmations
   - ~57 seconds for finality
   - Use event polling for contract events

6. **USDT Integration:**
   - TRC-20 USDT is the most popular
   - Contract: `TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t`
   - Use TronWeb for USDT transactions

## Contributing

When adding new Tron DEXs:
1. Follow the single-export pattern
2. Include API endpoints and SDK information
3. Provide integration examples
4. Link to official documentation
5. Add social media links
6. Update this README
7. Update `index.ts` exports
8. Update `trxDexMetadata`

---

**Last Updated:** October 14, 2025  
**Maintained by:** Corey  
**License:** MIT

