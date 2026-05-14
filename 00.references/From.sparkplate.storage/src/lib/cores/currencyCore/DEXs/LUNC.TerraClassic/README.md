# Terra Classic (LUNC) Decentralized Exchanges

This directory contains comprehensive information about decentralized exchanges (DEXs) and instant exchange platforms operating on or supporting the Terra Classic (LUNC) blockchain.

## Overview

Terra Classic is the original Terra blockchain (Columbus-5) that continues to operate after the May 2022 collapse and subsequent fork to Terra 2.0. The Terra Classic community has maintained the network, focusing on LUNC burning mechanisms and DeFi protocol sustainability. All native Terra Classic DEXs use CosmWasm smart contracts and can be queried via LCD (Light Client Daemon) API.

**Total DEXs**: 6  
**Total TVL**: $3+ million  
**Total 24h Volume**: $150k+

## Terra Classic DEXs

### 1. **TerraSwap Classic** (Classic AMM)
- **URL**: https://app.terraswap.io/
- **Type**: Classic AMM DEX
- **Description**: The original Terra DEX and primary decentralized exchange on Terra Classic
- **TVL**: $1+ million
- **Features**:
  - Primary exchange on Terra Classic (columbus-5)
  - Simple AMM model (Uniswap V2-like)
  - Supports LUNC, USTC, and CW20 tokens
  - TFM DEX aggregator provides routing API
  - CosmWasm smart contracts
- **Integration**: CosmWasm contract queries via LCD, TFM routing API
- **SDK**: @terra-money/terra.js

### 2. **Terraport** (Cross-Chain Bridge & DEX)
- **URL**: https://terraport.finance/
- **Type**: Cross-chain bridge and DEX
- **Description**: DeFi platform with cross-chain bridge and DEX, focusing on LUNC burning
- **TVL**: $500k+
- **Features**:
  - Cross-chain bridge for connecting to other blockchains
  - LUNC burning mechanisms to reduce supply
  - Revenue generation for protocol sustainability
  - Community governance
  - CosmWasm smart contracts
- **Integration**: CosmWasm contract queries via LCD
- **SDK**: @terra-money/terra.js

### 3. **Astroport Classic** (Classic AMM)
- **URL**: https://classic.astroport.fi/
- **Type**: Classic AMM
- **Description**: Astroport's deployment on Terra Classic with advanced AMM features
- **TVL**: $800k+
- **Features**:
  - Multiple pool types: XYK, Stable Swap
  - Advanced AMM features
  - Part of original Terra DeFi ecosystem
  - Limited maintenance (focus on Terra 2.0)
  - CosmWasm smart contracts
- **Integration**: CosmWasm contract queries via LCD
- **SDK**: @terra-money/terra.js

### 4. **Spectrum Protocol Classic** (Yield Optimizer)
- **URL**: https://classic.spec.finance/vaults
- **Type**: Auto-compounding yield optimizer
- **Description**: Automatically compounds rewards from Terra Classic DeFi protocols
- **TVL**: $600k+
- **Features**:
  - Auto-compounding vaults
  - Yield optimization across Terra Classic protocols
  - SPEC token for governance
  - Batch compounding to reduce gas costs
  - Integrates with TerraSwap and Astroport Classic
- **Integration**: CosmWasm contract queries via LCD
- **SDK**: @terra-money/terra.js

### 5. **ChangeNOW** (Instant Exchange)
- **URL**: https://changenow.io/
- **Type**: Instant exchange
- **Description**: Non-custodial instant exchange supporting LUNC and 500+ currencies
- **Features**:
  - 500+ supported cryptocurrencies
  - Non-custodial (users control funds)
  - No registration required
  - Fixed and floating rate options
  - Fast processing (5-30 minutes)
  - API available for integration
- **Integration**: REST API
- **SDK**: axios

### 6. **SideShift.ai** (Cross-Chain Exchange)
- **URL**: https://sideshift.ai/
- **Type**: Privacy-focused instant exchange
- **Description**: Instant cross-chain exchange with LUNC support, no KYC
- **Features**:
  - 200+ supported coins
  - No KYC or registration
  - Privacy-focused
  - Fixed and floating rates
  - Fast processing (5-15 minutes)
  - Public API (no key required)
  - Tor-friendly
- **Integration**: REST API
- **SDK**: axios

## Technical Integration

### CosmWasm Contract Queries

All native Terra Classic DEXs use CosmWasm smart contracts that can be queried via LCD API:

```typescript
import { LCDClient } from '@terra-money/terra.js';

const lcd = new LCDClient({
  URL: 'https://fcd.terra.money',
  chainID: 'columbus-5',
});

// Query pool info
const poolInfo = await lcd.wasm.contractQuery(pairAddress, { pool: {} });

// Simulate swap
const simulation = await lcd.wasm.contractQuery(pairAddress, {
  simulation: {
    offer_asset: {
      info: { native_token: { denom: 'uluna' } },
      amount: '1000000'
    }
  }
});
```

### TFM DEX Aggregator API

TFM provides a routing API for Terra Classic DEX aggregation:

```typescript
import axios from 'axios';

// Get best LUNC/USTC route
async function fetchTerraswapLuncPrice() {
  const response = await axios.get(
    'https://routing-api.tfm.dev/route?from=LUNC&to=USTC&amount=1000000'
  );
  
  console.log('LUNC/USTC Price:', response.data.price);
  console.log('Best Route:', response.data.route);
  
  return response.data;
}
```

### Instant Exchange Integration

ChangeNOW and SideShift.ai provide REST APIs for instant exchanges:

```typescript
import axios from 'axios';

// ChangeNOW example
async function estimateLuncSwap(fromAmount: string, toCurrency: string) {
  const response = await axios.get(
    'https://api.changenow.io/v2/exchange/estimated-amount',
    {
      params: {
        fromCurrency: 'lunc',
        toCurrency: toCurrency,
        fromAmount: fromAmount,
      },
      headers: {
        'x-changenow-api-key': 'YOUR_API_KEY'
      }
    }
  );
  
  return response.data;
}
```

## Terra Classic Blockchain Details

- **Consensus**: Delegated Proof of Stake (Tendermint)
- **Smart Contracts**: CosmWasm (Rust-based)
- **Address Prefix**: `terra`
- **Chain ID**: `columbus-5` (Terra Classic mainnet)
- **LCD Endpoint**: https://fcd.terra.money/
- **Public Node LCD**: https://terra-classic-lcd.publicnode.com/
- **RPC Endpoint**: https://terra-classic-rpc.publicnode.com/
- **Block Explorers**: 
  - https://finder.terra.money/classic/
  - https://luncscan.com/
  - https://www.terra-classic.money/

## Key Features

- **CosmWasm Smart Contracts**: Native DEXs built on Rust-based CosmWasm
- **LCD API**: Light Client Daemon for querying blockchain state
- **LUNC Burning**: Mechanisms to reduce massive post-collapse supply
- **Cross-Chain Bridges**: Connect to other blockchains
- **Yield Optimization**: Auto-compounding strategies via Spectrum
- **Instant Exchanges**: Quick cross-chain swaps via ChangeNOW/SideShift

## Historical Context

- **Original Launch**: 2019 (as Terra)
- **Collapse**: May 2022 (UST stablecoin depeg)
- **Fork**: Terra 2.0 launched, original chain became Terra Classic
- **LUNC Supply**: Massively inflated to 6.9 trillion post-collapse
- **Community Revival**: Ongoing effort to restore value and utility
- **Burning Mechanisms**: Community initiatives to reduce LUNC supply

## Resources

- **Terra Classic Community**: https://www.terraclassic.community/
- **Terra Classic Docs**: https://classic-docs.terra.money/
- **Terra Finder (Classic)**: https://finder.terra.money/classic/
- **Terra Station (Classic)**: https://station.terra.money/classic
- **LuncScan**: https://luncscan.com/
- **Terra Classic Tools**: https://www.terra-classic.money/
- **CosmWasm**: https://cosmwasm.com/

## Notes

- Terra Classic (columbus-5) is the original Terra blockchain
- Network collapsed in May 2022 due to UST algorithmic stablecoin depeg
- LUNC supply massively inflated from ~350M to 6.9T tokens
- Community-driven revival effort with focus on LUNC burning
- TerraSwap Classic remains the primary DEX
- Limited active development compared to Terra 2.0
- All native DEXs use CosmWasm for smart contracts
- LCD API is the primary method for querying contract state
- Cross-chain bridges enable asset transfers
- Instant exchanges provide liquidity for LUNC trading

## Usage Examples

### Import Specific DEX
```typescript
import { luncTerraswapClassicDEX } from '@/components/currencyCore/DEXs/LUNC.TerraClassic';
console.log(luncTerraswapClassicDEX.api.endpoints.tfmAggregator);
```

### Import All Terra Classic DEXs
```typescript
import * as terraClassicDexes from '@/components/currencyCore/DEXs/LUNC.TerraClassic';
console.log(terraClassicDexes.luncDexMetadata.totalDexes);
```

### Query DEX Metadata
```typescript
import { luncDexMetadata } from '@/components/currencyCore/DEXs/LUNC.TerraClassic';
console.log(luncDexMetadata.stats.totalTvl);
console.log(luncDexMetadata.categories.nativeAmm);
```

---

**Last Updated**: October 14, 2025

