# Algorand (ALGO) Staking Pool Integrations

This directory contains TypeScript integration modules for major Algorand staking pools and protocols. Each module provides API access, documentation links, and helper functions for interacting with pool statistics and staking mechanisms.

## Overview

Algorand offers various staking mechanisms including liquid staking, governance participation, and validator pooling. This collection includes integrations for the largest and most established staking pools and protocols on Algorand.

## Supported Pools

### 1. **Folks Finance** (`folksFinance.ts`)
- **Type**: Liquid Staking / DeFi Lending
- **Liquid Token**: xALGO
- **Features**: Instant liquidity, governance participation, lending/borrowing
- **Website**: https://folks.finance/
- **SDK**: @folks-finance/algo-sdk
- **API**: https://api.folks.finance/api/v1

### 2. **Tinyman** (`tinyman.ts`)
- **Type**: Liquid Staking / AMM DEX
- **Liquid Token**: tALGO
- **Features**: AMM trading, liquidity pools, instant liquidity
- **Website**: https://tinyman.org/
- **SDK**: @tinymanorg/tinyman-js-sdk (v5.1.1)
- **API**: https://mainnet.analytics.tinyman.org/api/v1

### 3. **Algorand Foundation Governance** (`algorandFoundation.ts`)
- **Type**: Native Governance Staking
- **Liquid Token**: N/A (Direct staking)
- **Features**: Quarterly periods, on-chain voting, transparent governance
- **Website**: https://algorand.foundation/governance
- **Portal**: https://governance.algorand.foundation/
- **SDK**: algosdk

### 4. **Pact** (`pact.ts`)
- **Type**: Consensus Staking / AMM DEX
- **Minimum**: 30,000 ALGO for consensus staking
- **Features**: Node operation, liquidity pools, trading
- **Website**: https://www.pact.fi/
- **SDK**: pact-py-sdk (Python)
- **API**: https://api.pact.fi/api

### 5. **AlgoFi** (`algofi.ts`)
- **Type**: DeFi Staking / Lending Protocol
- **Features**: Lending, borrowing, yield optimization, collateralized loans
- **Website**: https://www.algofi.org/
- **Docs**: https://docs.algofi.org/
- **SDK**: algosdk

### 6. **Messina One** (`messinaOne.ts`)
- **Type**: Liquid Staking
- **Liquid Token**: mALGO
- **Features**: Instant liquidity, governance rewards, DeFi composability
- **Website**: https://www.messina.one/
- **SDK**: algosdk

### 7. **Réti (Open Pooling)** (`reti.ts`)
- **Type**: Validator Pooling
- **Features**: Permissionless pool creation, multiple validators, on-chain governance
- **GitHub**: https://github.com/algorandfoundation/reti
- **Dashboard**: https://app.nodely.io/reti
- **SDK**: algosdk

## Installation

To use these modules, ensure you have the Algorand SDK and relevant packages installed:

```bash
npm install algosdk
# For Folks Finance
npm install @folks-finance/algo-sdk
# For Tinyman
npm install @tinymanorg/tinyman-js-sdk
```

## Usage

### Example: Fetching ALGO Price

```typescript
import { getALGOPrice, convertALGOToUSD } from '@/components/currencyCore/stakingPools/ALGO.Algorand';

async function displayPriceInfo() {
  const algoPriceUSD = await getALGOPrice();
  console.log(`Current ALGO Price: $${algoPriceUSD.toFixed(4)} USD`);

  const algoAmount = 1000; // 1000 ALGO
  const usdValue = await convertALGOToUSD(algoAmount);
  console.log(`${algoAmount} ALGO is worth $${usdValue.toFixed(2)} USD`);
}
```

### Example: Staking with Folks Finance (xALGO)

```typescript
import algosdk from 'algosdk';
import { FolksFinancePool } from '@/components/currencyCore/stakingPools/ALGO.Algorand';

const algodClient = new algosdk.Algodv2('', 'https://mainnet-api.algonode.cloud', 443);

async function getXAlgoRate() {
  const response = await fetch('https://api.folks.finance/api/v1/xalgo/rate');
  const data = await response.json();
  return data.rate; // xALGO to ALGO exchange rate
}

async function getUserStakingInfo(address: string) {
  const response = await fetch(`https://api.folks.finance/api/v1/user/${address}`);
  const data = await response.json();
  return data;
}
```

### Example: Using Tinyman SDK

```typescript
import { tinymanJSSDKConfig } from '@tinymanorg/tinyman-js-sdk';
import algosdk from 'algosdk';

tinymanJSSDKConfig.setClientName('my-staking-app');

const algodClient = new algosdk.Algodv2('', 'https://mainnet-api.algonode.cloud', 443);
const indexerClient = new algosdk.Indexer('', 'https://mainnet-idx.algonode.cloud', 443);

async function getTinymanPools() {
  const response = await fetch('https://mainnet.analytics.tinyman.org/api/v1/pools/');
  const data = await response.json();
  return data;
}
```

### Example: Algorand Governance Commitment

```typescript
import algosdk from 'algosdk';

async function commitToGovernance(
  amount: number,
  governorAddress: string,
  privateKey: Uint8Array
) {
  const algodClient = new algosdk.Algodv2('', 'https://mainnet-api.algonode.cloud', 443);
  const suggestedParams = await algodClient.getTransactionParams().do();
  
  const note = new TextEncoder().encode(
    `af/gov1:j[${amount * 1e6},${governorAddress}]`
  );
  
  const txn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
    from: governorAddress,
    to: governorAddress,
    amount: 0,
    note: note,
    suggestedParams: suggestedParams,
  });
  
  const signedTxn = txn.signTxn(privateKey);
  const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
  
  return await algosdk.waitForConfirmation(algodClient, txId, 4);
}
```

## RPC Endpoints (Free Public)

### Algonode
- **MainNet Algod**: https://mainnet-api.algonode.cloud:443
- **MainNet Indexer**: https://mainnet-idx.algonode.cloud:443
- **TestNet Algod**: https://testnet-api.algonode.cloud:443
- **TestNet Indexer**: https://testnet-idx.algonode.cloud:443

### Nodely
- **MainNet Algod**: https://mainnet-api.4160.nodely.dev
- **MainNet Indexer**: https://mainnet-idx.4160.nodely.dev
- **TestNet Algod**: https://testnet-api.4160.nodely.dev
- **TestNet Indexer**: https://testnet-idx.4160.nodely.dev

### Connection Example

```typescript
import algosdk from 'algosdk';

const algodClient = new algosdk.Algodv2(
  '', // No token required for public endpoints
  'https://mainnet-api.algonode.cloud',
  443
);

const indexerClient = new algosdk.Indexer(
  '',
  'https://mainnet-idx.algonode.cloud',
  443
);
```

## API Authentication

Most public pool APIs don't require authentication for read operations. However:

- **Folks Finance**: No auth for public data; SDK for contract interactions
- **Tinyman**: Public API available; SDK recommended for transactions
- **Algorand Governance**: On-chain transactions with specific note formats
- **Pact**: Python SDK available; direct contract interaction for TypeScript

## Staking Comparison

| Pool | Type | Liquid Token | Min Stake | APY | Unbonding |
|------|------|--------------|-----------|-----|-----------|
| Folks Finance | Liquid | xALGO | 0 ALGO | 4-8% | Instant |
| Tinyman | Liquid | tALGO | 0 ALGO | 3-6% | Instant |
| Foundation Governance | Native | N/A | 1 ALGO | 4-8% | Quarterly |
| Pact | Consensus | N/A | 30,000 ALGO | 5-15% | Varies |
| AlgoFi | Lending | N/A | 1 ALGO | 2-8% | Variable |
| Messina One | Liquid | mALGO | 0 ALGO | 4-7% | Instant |
| Réti | Validator Pool | Varies | Low | 4-8% | Epoch-based |

## Error Handling

All API calls should include proper error handling:

```typescript
try {
  const price = await getALGOPrice();
  console.log('Price:', price);
} catch (error) {
  console.error('Failed to fetch price:', error);
  // Handle error appropriately
}
```

## Helper Functions

The module includes several helper functions:

```typescript
import {
  getALGOPrice,
  convertALGOToUSD,
  convertUSDToALGO,
  microAlgosToAlgo,
  algoToMicroAlgos,
  getAllPoolNames
} from '@/components/currencyCore/stakingPools/ALGO.Algorand';

// Convert between ALGO and microAlgos
const algos = microAlgosToAlgo(1_000_000); // 1 ALGO
const microAlgos = algoToMicroAlgos(1); // 1,000,000 microAlgos

// Get list of all pools
const pools = getAllPoolNames();
console.log('Available pools:', pools);
```

## Resources

- **Algorand Developer Portal**: https://developer.algorand.org/
- **AlgoSDK Documentation**: https://algorand.github.io/js-algorand-sdk/
- **Algorand Foundation**: https://algorand.foundation/
- **Algorand Discord**: https://discord.gg/algorand
- **Algorand Forum**: https://forum.algorand.org/

## Contributing

Contributions are welcome! If you find an issue or want to add support for another Algorand staking pool, please open a pull request.

## License

This code is provided as-is for integration purposes. Please review each staking pool's terms of service and documentation before use.

