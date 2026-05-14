# Cosmos (ATOM) Staking Pool Integrations

This directory contains TypeScript integration modules for major Cosmos staking pools, validators, and liquid staking protocols. Each module provides API access, documentation links, and helper functions for interacting with staking services and earning ATOM rewards.

## Overview

Cosmos Hub offers various staking mechanisms including native validator delegation, liquid staking with derivative tokens, and custodial exchange staking. This collection includes integrations for the largest and most established staking options in the Cosmos ecosystem.

## Supported Staking Options

### 1. **Stride** (`stride.ts`)
- **Type**: Liquid Staking
- **Liquid Token**: stATOM
- **Features**: Multi-chain support, instant liquidity, IBC-enabled
- **Website**: https://stride.zone/
- **SDK**: @cosmjs/stargate
- **Chain ID**: stride-1
- **APY**: 15-20%

### 2. **pStake Finance** (`pstake.ts`)
- **Type**: Liquid Staking
- **Liquid Token**: pATOM
- **Features**: Cross-chain (Cosmos & Ethereum), auto-compounding
- **Website**: https://pstake.finance/
- **SDK**: @cosmjs/stargate
- **Chain ID**: core-1 (Persistence)
- **APY**: 16-19%

### 3. **Cosmos Hub Validators** (`cosmosValidators.ts`)
- **Type**: Native Validator Staking
- **Validators**: 175+ active validators
- **Features**: Direct delegation, governance participation, validator choice
- **Website**: https://cosmos.network/
- **Validator List**: https://www.mintscan.io/cosmos/validators
- **SDK**: @cosmjs/stargate
- **APY**: 15-20%

### 4. **Chorus One** (`chorusOne.ts`)
- **Type**: Institutional Validator
- **Commission**: 5%
- **Features**: Enterprise infrastructure, 99.9% uptime, custody integrations
- **Website**: https://chorus.one/
- **Validator**: cosmosvaloper15urq2dtp9qce4fyc85m6upwm9xul3049e02707
- **APY**: 18-20%

### 5. **Figment** (`figment.ts`)
- **Type**: Institutional Validator
- **Commission**: 10%
- **Features**: DataHub API, enterprise support, governance analytics
- **Website**: https://figment.io/
- **Validator**: cosmosvaloper1hjct6q7npsspsg3dgvzk3sdf89spmlpfdn6m9d
- **APY**: 17-19%

### 6. **Coinbase** (`coinbase.ts`)
- **Type**: Exchange Staking
- **Minimum**: None
- **Features**: Custodial, automatic, daily rewards, instant liquidity
- **Website**: https://www.coinbase.com/staking
- **APY**: 4-7% (variable)

### 7. **Kraken** (`kraken.ts`)
- **Type**: Exchange Staking
- **Minimum**: 0.0001 ATOM
- **Features**: Flexible staking, on-exchange trading, twice-weekly rewards
- **Website**: https://www.kraken.com/features/staking-coins
- **APY**: 12-16% (variable)

## Installation

To use these modules, ensure you have the Cosmos SDK and relevant packages installed:

```bash
npm install @cosmjs/stargate @cosmjs/proto-signing @cosmjs/amino
```

## Usage

### Example: Fetching ATOM Price

```typescript
import { getATOMPrice, convertATOMToUSD } from '@/components/currencyCore/stakingPools/ATOM.Cosmos';

async function displayPriceInfo() {
  const atomPriceUSD = await getATOMPrice();
  console.log(`Current ATOM Price: $${atomPriceUSD.toFixed(4)} USD`);

  const atomAmount = 1000; // 1000 ATOM
  const usdValue = await convertATOMToUSD(atomAmount);
  console.log(`${atomAmount} ATOM is worth $${usdValue.toFixed(2)} USD`);
}
```

### Example: Staking with Stride (stATOM)

```typescript
import { SigningStargateClient } from '@cosmjs/stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { StridePool } from '@/components/currencyCore/stakingPools/ATOM.Cosmos';

async function liquidStakeWithStride(mnemonic: string, amount: number) {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: 'cosmos'
  });
  const [account] = await wallet.getAccounts();
  
  const client = await SigningStargateClient.connectWithSigner(
    'https://stride-rpc.polkachu.com',
    wallet
  );
  
  // IBC transfer to Stride for liquid staking
  const msg = {
    typeUrl: '/ibc.applications.transfer.v1.MsgTransfer',
    value: {
      sourcePort: 'transfer',
      sourceChannel: 'channel-0',
      token: {
        denom: 'uatom',
        amount: (amount * 1_000_000).toString()
      },
      sender: account.address,
      receiver: account.address,
      timeoutTimestamp: (Date.now() + 600000) * 1000000,
      memo: 'liquid-stake'
    }
  };
  
  const fee = {
    amount: [{ denom: 'uatom', amount: '5000' }],
    gas: '200000'
  };
  
  const result = await client.signAndBroadcast(account.address, [msg], fee);
  console.log('Liquid stake transaction:', result.transactionHash);
  
  client.disconnect();
  return result;
}
```

### Example: Native Staking to Chorus One

```typescript
import { SigningStargateClient } from '@cosmjs/stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';

const CHORUS_ONE_VALIDATOR = 'cosmosvaloper15urq2dtp9qce4fyc85m6upwm9xul3049e02707';

async function delegateToChorusOne(mnemonic: string, amount: number) {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: 'cosmos'
  });
  const [account] = await wallet.getAccounts();
  
  const client = await SigningStargateClient.connectWithSigner(
    'https://rpc.cosmos.network',
    wallet
  );
  
  const msg = {
    typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
    value: {
      delegatorAddress: account.address,
      validatorAddress: CHORUS_ONE_VALIDATOR,
      amount: {
        denom: 'uatom',
        amount: (amount * 1_000_000).toString()
      }
    }
  };
  
  const fee = {
    amount: [{ denom: 'uatom', amount: '5000' }],
    gas: '200000'
  };
  
  const result = await client.signAndBroadcast(account.address, [msg], fee);
  console.log('Delegation successful:', result.transactionHash);
  
  client.disconnect();
  return result;
}
```

### Example: Getting Cosmos Staking Stats

```typescript
import { getCosmosStakingStats, getValidatorCount } from '@/components/currencyCore/stakingPools/ATOM.Cosmos';

async function displayNetworkStats() {
  const stats = await getCosmosStakingStats();
  const validatorCount = await getValidatorCount();
  
  if (stats) {
    console.log('Total Bonded ATOM:', stats.totalBonded.toFixed(2));
    console.log('Staking Ratio:', (stats.stakingRatio * 100).toFixed(2) + '%');
  }
  
  console.log('Active Validators:', validatorCount);
}
```

## RPC Endpoints (Free Public)

### Cosmos Hub
- **MainNet RPC**: https://rpc.cosmos.network
- **MainNet REST**: https://api.cosmos.network
- **MainNet gRPC**: grpc.cosmos.network:443

### Stride (for liquid staking)
- **MainNet RPC**: https://stride-rpc.polkachu.com
- **MainNet REST**: https://stride-api.polkachu.com
- **MainNet gRPC**: stride-grpc.polkachu.com:12290

### Persistence (for pStake)
- **MainNet RPC**: https://rpc.persistence.one
- **MainNet REST**: https://rest.persistence.one
- **MainNet gRPC**: grpc.persistence.one:443

### Connection Example

```typescript
import { StargateClient } from '@cosmjs/stargate';

const client = await StargateClient.connect('https://rpc.cosmos.network');

// Query account
const account = await client.getAccount('cosmos1...');
console.log('Account:', account);

// Get blockchain height
const height = await client.getHeight();
console.log('Current height:', height);

client.disconnect();
```

## API Authentication

Most public APIs don't require authentication for read operations. However:

- **Stride**: No auth for public data; wallet for transactions
- **pStake**: No auth for public data; wallet for transactions
- **Native Staking**: Requires wallet for delegation/undelegation
- **Chorus One/Figment**: Public validator info; institutional API available
- **Coinbase/Kraken**: API keys required for programmatic access

## Staking Comparison

| Option | Type | Liquidity | Min Stake | APY | Unbonding |
|--------|------|-----------|-----------|-----|-----------|
| Stride | Liquid | Instant (stATOM) | 0 ATOM | 15-20% | Instant |
| pStake | Liquid | Instant (pATOM) | 0 ATOM | 16-19% | Instant |
| Native Validators | Direct | None | 0.000001 ATOM | 15-20% | 21 days |
| Chorus One | Validator | None | 0.000001 ATOM | 18-20% | 21 days |
| Figment | Validator | None | 0.000001 ATOM | 17-19% | 21 days |
| Coinbase | Exchange | Instant (on-exchange) | None | 4-7% | Instant |
| Kraken | Exchange | Instant (on-exchange) | 0.0001 ATOM | 12-16% | Instant |

## Staking Types Explained

### Liquid Staking
Mint derivative tokens (stATOM, pATOM) that represent staked ATOM. These tokens can be used in DeFi while earning staking rewards. Exchange rate increases over time as rewards accumulate.

### Native Validator Staking
Direct delegation to validators on Cosmos Hub. Choose from 175+ validators with varying commissions (typically 5-10%). Participate in governance and earn rewards directly.

### Institutional Validators
Professional validators like Chorus One and Figment offer enterprise-grade infrastructure with high uptime guarantees and institutional custody integrations.

### Exchange Staking
Custodial staking through exchanges like Coinbase and Kraken. Simple interface, no technical knowledge required, instant liquidity, but lower yields and exchange risk.

## Error Handling

All API calls should include proper error handling:

```typescript
try {
  const price = await getATOMPrice();
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
  getATOMPrice,
  convertATOMToUSD,
  convertUSDToATOM,
  microAtomToAtom,
  atomToMicroAtom,
  getAllPoolNames,
  getLiquidStakingProviders,
  getInstitutionalValidators,
  getExchangeStakingProviders,
  getStakingAPYRange,
  getCosmosStakingStats,
  getValidatorCount
} from '@/components/currencyCore/stakingPools/ATOM.Cosmos';

// Convert between ATOM and microATOM
const atoms = microAtomToAtom(1_000_000); // 1 ATOM
const microAtoms = atomToMicroAtom(1); // 1,000,000 microATOM

// Get categorized lists
const liquidProviders = getLiquidStakingProviders(); // ['Stride', 'pStake Finance']
const validators = getInstitutionalValidators(); // ['Chorus One', 'Figment']
const exchanges = getExchangeStakingProviders(); // ['Coinbase', 'Kraken']

// Get APY range
const apyRange = getStakingAPYRange(); // { min: 4, max: 20, average: 16 }
```

## Important Considerations

### Native Staking
- **21-day unbonding period**: Cannot use ATOM during unbonding
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
- **Instant liquidity**: Can unstake immediately

## Resources

- **Cosmos Hub**: https://cosmos.network/
- **CosmJS Documentation**: https://cosmos.github.io/cosmjs/
- **Mintscan Explorer**: https://www.mintscan.io/cosmos
- **Cosmos Forum**: https://forum.cosmos.network/
- **Cosmos Discord**: https://discord.gg/cosmosnetwork
- **IBC Protocol**: https://ibc.cosmos.network/

## Contributing

Contributions are welcome! If you find an issue or want to add support for another Cosmos staking option, please open a pull request.

## License

This code is provided as-is for integration purposes. Please review each staking pool's terms of service and documentation before use.

