# Binance Coin (BNB) Staking Pool Integrations

This directory contains TypeScript integration modules for major BNB staking pools, validators, and liquid staking protocols. Each module provides API access, documentation links, and helper functions for interacting with staking services and earning BNB rewards.

## Overview

Binance Coin (BNB) offers various staking mechanisms including native validator delegation, liquid staking with derivative tokens, and custodial exchange staking. This collection includes integrations for the largest and most established staking options in the BNB ecosystem.

## Supported Staking Options

### 1. **Ankr** (`ankr.ts`)
- **Type**: Liquid Staking
- **Liquid Token**: ankrBNB
- **Features**: Multi-chain support, instant liquidity, DeFi composability
- **Website**: https://www.ankr.com/staking/stake/bnb/
- **SDK**: ethers, web3
- **Chain ID**: 56 (BSC)
- **APY**: 5-8%

### 2. **pSTAKE Finance** (`pstake.ts`)
- **Type**: Liquid Staking
- **Liquid Token**: stkBNB
- **Features**: Cross-chain compatibility, auto-compounding, DeFi composability
- **Website**: https://pstake.finance/stake/bnb
- **SDK**: ethers, web3
- **Chain ID**: 56 (BSC)
- **APY**: 5-8%

### 3. **Stader Labs** (`stader.ts`)
- **Type**: Liquid Staking
- **Liquid Token**: BNBx
- **Features**: Multi-chain support, DeFi composability, instant liquidity
- **Website**: https://www.staderlabs.com/stake/bnb
- **SDK**: ethers, web3
- **Chain ID**: 56 (BSC)
- **APY**: 5-8%

### 4. **BNB Chain Validators** (`binanceValidators.ts`)
- **Type**: Native Validator Staking
- **Validators**: 21 active validators
- **Features**: Direct delegation, governance participation, validator choice
- **Website**: https://www.bnbchain.org/en/bnb-smart-chain/validators
- **SDK**: ethers, web3
- **APY**: 5-8%

### 5. **Binance Exchange** (`binanceExchange.ts`)
- **Type**: Exchange Staking
- **Minimum**: None
- **Features**: Flexible/locked options, auto-compounding, easy management
- **Website**: https://www.binance.com/en/staking
- **APY**: 3-8% (flexible: 3-5%, locked: 5-8%)

### 6. **Trust Wallet** (`trustWallet.ts`)
- **Type**: Wallet Staking
- **Minimum**: Varies by validator
- **Features**: Native mobile staking, user controls keys, simple interface
- **Website**: https://trustwallet.com/staking
- **APY**: 5-8%

### 7. **Kraken** (`kraken.ts`)
- **Type**: Exchange Staking
- **Minimum**: 0.0001 BNB
- **Features**: Flexible staking, on-exchange trading, twice-weekly rewards
- **Website**: https://www.kraken.com/features/staking-coins
- **APY**: 3-6%

## Installation

To use these modules, ensure you have the necessary packages installed:

```bash
npm install ethers web3
# For Binance API integration
npm install binance-api-node
# For Kraken API integration
npm install kraken-api
```

## Usage

### Example: Fetching BNB Price

```typescript
import { getBNBPrice, convertBNBToUSD } from '@/components/currencyCore/stakingPools/BNB.BinanceCoin';

async function displayPriceInfo() {
  const bnbPriceUSD = await getBNBPrice();
  console.log(`Current BNB Price: $${bnbPriceUSD.toFixed(2)} USD`);

  const bnbAmount = 100; // 100 BNB
  const usdValue = await convertBNBToUSD(bnbAmount);
  console.log(`${bnbAmount} BNB is worth $${usdValue.toFixed(2)} USD`);
}
```

### Example: Liquid Staking with Ankr (ankrBNB)

```typescript
import { ethers } from 'ethers';
import { AnkrPool } from '@/components/currencyCore/stakingPools/BNB.BinanceCoin';

async function liquidStakeWithAnkr(privateKey: string, amount: string) {
  const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
  const wallet = new ethers.Wallet(privateKey, provider);
  
  // Convert BNB to Wei
  const amountWei = ethers.parseEther(amount);
  
  // Ankr staking transaction
  const tx = await wallet.sendTransaction({
    to: '0x...', // Ankr staking contract address
    value: amountWei,
    gasLimit: 300000,
  });
  
  console.log('Staking transaction sent:', tx.hash);
  
  // Wait for confirmation
  const receipt = await tx.wait();
  console.log('Staking confirmed:', receipt.transactionHash);
  
  return receipt;
}
```

### Example: Native Staking to BNB Validators

```typescript
import { ethers } from 'ethers';
import { BinanceValidators } from '@/components/currencyCore/stakingPools/BNB.BinanceCoin';

async function delegateToBNBValidator(
  privateKey: string,
  validatorAddress: string,
  amount: string
) {
  const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
  const wallet = new ethers.Wallet(privateKey, provider);
  
  const amountWei = ethers.parseEther(amount);
  
  // BNB delegation transaction
  const tx = await wallet.sendTransaction({
    to: validatorAddress,
    value: amountWei,
    gasLimit: 300000,
  });
  
  const receipt = await tx.wait();
  console.log('Delegation confirmed:', receipt.transactionHash);
  
  return receipt;
}
```

### Example: Exchange Staking with Binance

```typescript
import Binance from 'binance-api-node';

async function stakeBNBOnBinance(
  apiKey: string,
  apiSecret: string,
  productId: string,
  amount: number
) {
  const client = Binance({
    apiKey: apiKey,
    apiSecret: apiSecret,
  });
  
  // Purchase staking product
  const result = await client.stakingPurchase({
    product: 'STAKING',
    productId: productId,
    amount: amount.toString(),
  });
  
  console.log('Staking purchase result:', result);
  return result;
}
```

### Example: Getting BSC Network Stats

```typescript
import { getBSCNetworkStats, getValidatorCount } from '@/components/currencyCore/stakingPools/BNB.BinanceCoin';

async function displayNetworkStats() {
  const stats = await getBSCNetworkStats();
  const validatorCount = getValidatorCount();
  
  if (stats) {
    console.log('BSC Block Number:', stats.blockNumber);
    console.log('Gas Price:', stats.gasPrice);
    console.log('Network:', stats.chainName);
  }
  
  console.log('Active Validators:', validatorCount);
}
```

## RPC Endpoints (Free Public)

### BNB Smart Chain (BSC)
- **MainNet RPC**: https://bsc-dataseed.binance.org/
- **Alternative RPCs**: 
  - https://bsc-dataseed1.defibit.io/
  - https://bsc-dataseed1.ninicoin.io/
  - https://rpc.ankr.com/bsc
- **Chain ID**: 56
- **Explorer**: https://bscscan.com/

### Connection Example

```typescript
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');

// Query account
const account = await provider.getBalance('0x...');
console.log('Account balance:', ethers.formatEther(account), 'BNB');

// Get blockchain height
const blockNumber = await provider.getBlockNumber();
console.log('Current block:', blockNumber);
```

## API Authentication

Most public APIs don't require authentication for read operations. However:

- **Liquid Staking**: Requires wallet for transactions; public data available
- **Native Staking**: Requires wallet for delegation/undelegation
- **Binance Exchange**: API keys required for programmatic access
- **Kraken**: API keys required for programmatic access
- **Trust Wallet**: Mobile app only, no API access

## Staking Comparison

| Option | Type | Liquidity | Min Stake | APY | Unbonding |
|--------|------|-----------|-----------|-----|-----------|
| Ankr | Liquid | Instant (ankrBNB) | 0 BNB | 5-8% | Instant |
| pSTAKE | Liquid | Instant (stkBNB) | 0 BNB | 5-8% | Instant |
| Stader | Liquid | Instant (BNBx) | 0 BNB | 5-8% | Instant |
| Native Validators | Direct | None | 0.001 BNB | 5-8% | 7 days |
| Binance Exchange | Exchange | Instant (on-exchange) | None | 3-8% | Instant/Flexible |
| Trust Wallet | Wallet | None | Varies | 5-8% | 7 days |
| Kraken | Exchange | Instant (on-exchange) | 0.0001 BNB | 3-6% | Instant |

## Staking Types Explained

### Liquid Staking
Mint derivative tokens (ankrBNB, stkBNB, BNBx) that represent staked BNB. These tokens can be used in DeFi while earning staking rewards. Exchange rate increases over time as rewards accumulate.

### Native Validator Staking
Direct delegation to validators on BNB Chain. Choose from 21 validators with varying commissions (typically 5-15%). Participate in governance and earn rewards directly.

### Exchange Staking
Custodial staking through exchanges like Binance and Kraken. Simple interface, no technical knowledge required, instant liquidity, but lower yields and exchange risk.

### Wallet Staking
Native staking through mobile wallets like Trust Wallet. User controls private keys, simple validator selection, but limited to mobile interface.

## Error Handling

All API calls should include proper error handling:

```typescript
try {
  const price = await getBNBPrice();
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
  getBNBPrice,
  convertBNBToUSD,
  convertUSDToBNB,
  weiToBnb,
  bnbToWei,
  getAllPoolNames,
  getLiquidStakingProviders,
  getExchangeStakingProviders,
  getNativeStakingProviders,
  getStakingAPYRange,
  getBSCNetworkStats,
  getValidatorCount,
  getBSCRPCEndpoints,
  getLiquidStakingContracts
} from '@/components/currencyCore/stakingPools/BNB.BinanceCoin';

// Convert between BNB and Wei
const bnb = weiToBnb('1000000000000000000'); // 1 BNB
const wei = bnbToWei(1); // 1 BNB in Wei

// Get categorized lists
const liquidProviders = getLiquidStakingProviders(); // ['Ankr', 'pSTAKE Finance', 'Stader Labs']
const exchanges = getExchangeStakingProviders(); // ['Binance Exchange', 'Kraken']
const nativeProviders = getNativeStakingProviders(); // ['BNB Chain Validators', 'Trust Wallet']

// Get APY range
const apyRange = getStakingAPYRange(); // { min: 3, max: 8, average: 5.5 }

// Get RPC endpoints
const rpcEndpoints = getBSCRPCEndpoints(); // Array of BSC RPC URLs

// Get liquid staking contracts
const contracts = getLiquidStakingContracts(); // Object with contract addresses
```

## Important Considerations

### Native Staking
- **7-day unbonding period**: Cannot use BNB during unbonding
- **Slashing risk**: Validators can be slashed for downtime or misbehavior
- **Validator selection**: Research validators before delegating
- **Governance**: Participate in on-chain governance votes

### Liquid Staking
- **Smart contract risk**: Protocols are smart contract-based
- **Exchange rate**: Derivative token value fluctuates
- **Protocol fees**: Typically 5-10% of rewards
- **Liquidity premium**: Instant liquidity has a cost

### Exchange Staking
- **Custodial risk**: Exchange holds your keys
- **Lower yields**: Convenience comes at a cost
- **Regulatory risk**: Subject to jurisdictional regulations
- **Instant liquidity**: Can unstake immediately (flexible options)

## BSC-Specific Considerations

- **EVM Compatibility**: BSC is Ethereum-compatible
- **Gas Fees**: Low transaction fees (typically $0.01-0.10)
- **21 Validators**: Proof of Staked Authority (PoSA) consensus
- **BEP-20 Tokens**: ERC-20 compatible tokens
- **BSC Explorer**: https://bscscan.com/
- **DeFi Ecosystem**: PancakeSwap, Biswap, ApeSwap, etc.

## Resources

- **BNB Chain**: https://www.bnbchain.org/
- **BSC Explorer**: https://bscscan.com/
- **Ethers.js**: https://docs.ethers.org/
- **Web3.js**: https://web3js.readthedocs.io/
- **Binance API**: https://binance-docs.github.io/apidocs/
- **Kraken API**: https://docs.kraken.com/

## Contributing

Contributions are welcome! If you find an issue or want to add support for another BNB staking option, please open a pull request.

## License

This code is provided as-is for integration purposes. Please review each staking pool's terms of service and documentation before use.
