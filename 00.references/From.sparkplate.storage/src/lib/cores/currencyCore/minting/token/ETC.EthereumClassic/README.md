# Ethereum Classic Token Minting

This directory contains token minting mechanisms for Ethereum Classic (ETC), enabling the creation of custom ERC-20 tokens with personalized metadata.

## Overview

Ethereum Classic is an EVM-compatible blockchain that maintains the original Ethereum protocol. This implementation provides birthday-themed token creation where token supply and ticker symbols are derived from the user's birth information using the ERC-20 standard.

## Available Mechanisms

### 1. Birthday Token (`ETC.EthereumClassic.token.birthday.ts`)

Creates personalized ERC-20 tokens based on user's birthday and initials.

**Features:**
- Token supply calculated from birth year (birthYear × 10,000)
- Ticker symbol generated from initials + year (e.g., "CS1985")
- ERC-20 standard compliance (Ethereum-compatible)
- Full transfer, approve, and allowance functionality
- Balance queries
- Birthday metadata embedded in token name
- Works on ETC Mainnet and Mordor Testnet
- 18 decimals (standard)
- Proof of Work (original Ethereum consensus)

**Usage:**

```typescript
import { EthereumClassicBirthdayTokenCreator } from './ETC.EthereumClassic.token.birthday';

// Initialize for ETC Mainnet
const creator = new EthereumClassicBirthdayTokenCreator({ network: 'mainnet' });

// Or for Mordor Testnet
const testnetCreator = new EthereumClassicBirthdayTokenCreator({ network: 'testnet' });

// Load private key
const privateKey = 'your64charhexprivatekeyhere...'; // with or without 0x prefix

// Check balance first
const walletInfo = await creator.checkWalletBalance(privateKey);
console.log(`Balance: ${walletInfo.balanceETC} ETC`);

if (!walletInfo.hasEnoughBalance) {
  console.log('Need at least 0.01 ETC for deployment');
  process.exit(1);
}

// Deploy token
const result = await creator.deployToken(privateKey, {
  initials: "CS",
  birthYear: 1985,
  birthMonth: 6,
  birthDay: 15,
  fullName: "Corey Stedman" // Optional
});

console.log(`Token Created: ${result.tickerSymbol}`);
console.log(`Supply: ${result.tokenAmount} tokens`);
console.log(`Contract: ${result.contractAddress}`);
console.log(`View: ${result.blockscoutLink}`);
```

## Requirements

### Minimum ETC Balance
- **0.01 ETC** recommended for deployment (conservative estimate)
- Actual cost: ~0.005-0.01 ETC depending on gas price
- Testnet: Free (get testnet ETC from faucet)

### Configuration Requirements
- **Initials**: 2-3 letters only
- **Birth Year**: Between 1900 and current year
- **Birth Month**: 1-12
- **Birth Day**: 1-31 (valid date)
- **Private Key**: 32 bytes (64 hex characters, with or without 0x prefix)

### Dependencies
```bash
npm install ethers
```

## Network Configuration

### ETC Mainnet
```typescript
const creator = new EthereumClassicBirthdayTokenCreator({
  network: 'mainnet'
  // rpcUrl: 'https://etc.rivet.link'
  // chainId: 61
});
```

- **Chain ID**: 61
- **RPC**: https://etc.rivet.link
- **Explorer**: https://blockscout.com/etc/mainnet

### Mordor Testnet
```typescript
const creator = new EthereumClassicBirthdayTokenCreator({
  network: 'testnet'
  // rpcUrl: 'https://rpc.mordor.etccooperative.org'
  // chainId: 63
});
```

- **Chain ID**: 63
- **RPC**: https://rpc.mordor.etccooperative.org
- **Explorer**: https://blockscout.com/etc/mordor
- **Faucet**: https://easy.hebeswap.com/#/faucet

## Key Differences: ETC vs ETH

| Feature | Ethereum Classic | Ethereum |
|---------|-----------------|----------|
| **Consensus** | Proof of Work | Proof of Stake |
| **Chain ID** | 61 | 1 |
| **Philosophy** | Code is Law | Progressive |
| **Supply Cap** | 210.7M ETC | Infinite |
| **Block Time** | ~13 sec | ~12 sec |
| **Gas Fees** | Lower | Higher |
| **DAO Fork** | Original chain | Forked chain |

## Cost Breakdown

### ETC Mainnet
| Item | Cost (ETC) | Cost (USD*) | Notes |
|------|-----------|-------------|-------|
| Contract Deployment | ~0.005-0.01 | ~$0.15-0.30 | Varies by gas price |
| Gas fees | Included above | Included | Dynamic pricing |
| **Total** | **~0.005-0.01 ETC** | **~$0.15-0.30** | Per token deployment |

### Mordor Testnet
| Item | Cost | Notes |
|------|------|-------|
| Everything | FREE | Use testnet faucet |

*USD prices approximate based on ~$30/ETC

## Getting Testnet ETC

1. Visit: https://easy.hebeswap.com/#/faucet
2. Enter your Mordor testnet address
3. Complete captcha
4. Receive testnet ETC (usually sufficient for testing)

## Troubleshooting

### "Insufficient ETC balance" Error
- Fund wallet with at least 0.01 ETC
- Verify you're on the correct network (mainnet vs testnet)
- Get testnet ETC from faucet
- Check gas prices on network

### "Invalid private key" Error
- Must be 32 bytes (64 hexadecimal characters)
- Can include or omit 0x prefix
- Check for extra spaces or line breaks

### Transaction Not Confirming
- Wait 20-40 seconds for block confirmation (PoW is slower)
- Check transaction status on Blockscout
- Verify transaction was successfully broadcast

## Resources

- [Ethereum Classic Website](https://ethereumclassic.org/)
- [ETC Documentation](https://ethereumclassic.org/knowledge)
- [Blockscout Explorer](https://blockscout.com/etc/mainnet)
- [ETC Cooperative](https://etccooperative.org/)
- [Core-Geth Client](https://core-geth.org/)
- [ETC Discord](https://discord.gg/ethereum-classic)

## Examples

### Complete Example

```typescript
import { EthereumClassicBirthdayTokenCreator } from './ETC.EthereumClassic.token.birthday';

async function createMyBirthdayToken() {
  try {
    // Initialize for Mordor Testnet
    const creator = new EthereumClassicBirthdayTokenCreator({ network: 'testnet' });

    // Your private key (keep this secure!)
    const privateKey = process.env.ETC_PRIVATE_KEY!;

    // Check balance
    console.log('Checking wallet balance...');
    const walletInfo = await creator.checkWalletBalance(privateKey);
    
    if (!walletInfo.hasEnoughBalance) {
      throw new Error(`Insufficient balance. Need 0.01 ETC, have ${walletInfo.balanceETC} ETC`);
    }

    // Deploy token
    console.log('Deploying birthday token...');
    const result = await creator.deployToken(privateKey, {
      initials: "CS",
      birthYear: 1985,
      birthMonth: 6,
      birthDay: 15,
      fullName: "Corey Stedman"
    });

    console.log('\n✅ Success!');
    console.log(`Token: ${result.tickerSymbol}`);
    console.log(`Contract: ${result.contractAddress}`);
    console.log(`Supply: ${result.tokenAmount}`);
    console.log(`View: ${result.blockscoutLink}`);

    return result;
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
    throw error;
  }
}

// Run it
createMyBirthdayToken();
```

## Comparison: ETC vs BSC vs ETH

| Feature | ETC | BSC | ETH |
|---------|-----|-----|-----|
| **Chain ID** | 61 | 56 | 1 |
| **Consensus** | PoW | PoS | PoS |
| **Block Time** | ~13s | ~3s | ~12s |
| **Gas Fees** | Low | Low | High |
| **Token Standard** | ERC-20 | BEP-20 | ERC-20 |
| **Deployment Cost** | ~$0.20 | ~$3-6 | ~$50-100 |
| **Philosophy** | Immutable | Centralized | Progressive |

ETC maintains the **original Ethereum vision** with immutability and Proof of Work, making it ideal for those who value the "Code is Law" philosophy at lower costs than Ethereum mainnet.
