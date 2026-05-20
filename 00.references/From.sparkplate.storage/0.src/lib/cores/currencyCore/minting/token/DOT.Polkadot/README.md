# Polkadot Token Minting

This directory contains token minting mechanisms for Polkadot (DOT) ecosystem, enabling the creation of custom assets on Asset Hub with personalized metadata.

## Overview

Polkadot Asset Hub (formerly Statemint) is a parachain dedicated to creating and managing fungible and non-fungible tokens using the Assets pallet. This implementation provides birthday-themed token creation where token supply and ticker symbols are derived from the user's birth information.

> **⚠️ IMPORTANT**: Tokens are created on **Asset Hub** (a parachain), not the Polkadot relay chain. The relay chain does not support arbitrary asset creation.

## Available Mechanisms

### 1. Birthday Token (`DOT.Polkadot.token.birthday.ts`)

Creates personalized assets based on user's birthday and initials using the Assets pallet on Asset Hub.

**Features:**
- Token supply calculated from birth year (birthYear × 10,000)
- Ticker symbol generated from initials + year (e.g., "CS1985")
- Assets pallet integration (Polkadot Asset Hub)
- Full transfer and balance query functionality
- Birthday metadata embedded in asset metadata
- Native Substrate asset (Layer-0 token)
- Support for multiple networks (Polkadot, Kusama, Westend)
- Support for sr25519 and ed25519 key types

**Supported Networks:**
- ✅ Polkadot Asset Hub (mainnet)
- ✅ Kusama Asset Hub (mainnet)
- ✅ Westend Asset Hub (testnet - recommended for testing)

**Usage:**

```typescript
import { PolkadotBirthdayTokenCreator } from './DOT.Polkadot.token.birthday';

// Initialize for Westend Testnet (recommended for testing)
const creator = new PolkadotBirthdayTokenCreator({ network: 'westend' });

// Or for Polkadot Mainnet
const polkadotCreator = new PolkadotBirthdayTokenCreator({ network: 'polkadot' });

// Or for Kusama
const kusamaCreator = new PolkadotBirthdayTokenCreator({ network: 'kusama' });

// Load seed phrase (12 or 24 words)
const seedPhrase = 'your twelve or twenty four word seed phrase here...';

// Check balance first
const balanceInfo = await creator.checkBalance(seedPhrase);
console.log(`Balance: ${balanceInfo.balance} WND`); // or DOT/KSM

if (!balanceInfo.hasEnoughBalance) {
  console.log('Need at least 0.01 WND for deployment');
  process.exit(1);
}

// Deploy token
const result = await creator.deployToken(seedPhrase, {
  initials: "CS",
  birthYear: 1985,
  birthMonth: 6,
  birthDay: 15,
  fullName: "Corey Stedman", // Optional
  decimals: 0 // Optional, defaults to 0
});

console.log(`Token Created: ${result.tickerSymbol}`);
console.log(`Supply: ${result.tokenAmount} tokens`);
console.log(`Asset ID: ${result.assetId}`);
console.log(`View: ${result.subscanLink}`);

// Cleanup
await creator.disconnect();
```

**Helper Methods:**

```typescript
// Extract initials from full name
const initials = PolkadotBirthdayTokenCreator.extractInitials("Corey Stedman");
// Returns: "CS"

// Parse birthday string
const birthday = PolkadotBirthdayTokenCreator.parseBirthday("06/15/1985");
// Returns: { birthYear: 1985, birthMonth: 6, birthDay: 15 }

// Combined usage
const result = await creator.deployToken(seedPhrase, {
  initials,
  ...birthday,
  fullName: "Corey Stedman"
});
```

**Asset Operations:**

```typescript
// Get asset info
const assetInfo = await creator.getAssetInfo(result.assetId);
console.log('Asset Info:', assetInfo);

// Get asset balance
const balance = await creator.getAssetBalance(
  result.assetId,
  balanceInfo.address
);
console.log('Balance:', balance);

// Always disconnect when done
await creator.disconnect();
```

## Token Examples

| Birth Year | Token Supply | Initials | Ticker Symbol | Owner | Asset ID |
|-----------|-------------|----------|---------------|-------|----------|
| 1985 | 19,850,000 | CS | CS1985 | Corey Stedman | Generated |
| 1990 | 19,900,000 | JD | JD1990 | John Doe | Generated |
| 2000 | 20,000,000 | AS | AS2000 | Alice Smith | Generated |

## Requirements

### Minimum Balance
- **Polkadot**: ~1 DOT deposit (refundable on asset destruction)
- **Kusama**: ~0.1 KSM deposit (refundable)
- **Westend**: ~0.01 WND (testnet, free from faucet)
- Plus transaction fees: ~0.01-0.05 DOT/KSM/WND

### Configuration Requirements
- **Initials**: 2-3 letters only
- **Birth Year**: Between 1900 and current year
- **Birth Month**: 1-12
- **Birth Day**: 1-31 (valid date)
- **Ticker Symbol**: Max 10 characters (enforced by Assets pallet)
- **Seed Phrase**: 12 or 24 words (BIP39 mnemonic)

### Dependencies
```bash
npm install @polkadot/api @polkadot/util-crypto
```

## Assets Pallet

The birthday token uses Polkadot's Assets pallet with these features:

- **Native Support**: First-class tokens on Substrate
- **No Smart Contracts**: Uses runtime modules, not contracts
- **Atomic Operations**: Built-in transfer, mint, burn functionality
- **Fast Finality**: Confirmed in ~6 seconds on Asset Hub
- **Low Fees**: ~$0.01-0.10 per transaction typically
- **Refundable Deposit**: Initial deposit returned when asset destroyed
- **Cross-Chain**: Can be transferred via XCM (Cross-Consensus Messaging)

## Deployment Flow

1. **Validate Configuration**
   - Check seed phrase format
   - Check initials format
   - Validate birthday
   - Ensure date exists
   - Check ticker symbol length (max 10 chars)

2. **Check Wallet Balance**
   - Minimum deposit required
   - Get wallet address from seed

3. **Generate Asset ID**
   - Unique numeric ID for the asset
   - In production, query for available IDs

4. **Batch Create Transactions**
   - Create asset: Establish new asset with admin rights
   - Set metadata: Define name, symbol, decimals
   - Mint tokens: Issue initial supply to creator

5. **Submit Batch Transaction**
   - Sign with account private key
   - Submit to Asset Hub
   - Wait for confirmation (~6 seconds)

6. **Confirmation**
   - Get asset ID from transaction
   - Display explorer links
   - Return deployment result

## Network Configuration

### Polkadot Asset Hub (Mainnet)
```typescript
const creator = new PolkadotBirthdayTokenCreator({
  network: 'polkadot',
  keyType: 'sr25519' // or 'ed25519'
});
```

- **RPC**: wss://polkadot-asset-hub-rpc.polkadot.io
- **Explorer**: https://assethub-polkadot.subscan.io
- **Min Deposit**: ~1 DOT
- **SS58 Format**: 0

### Kusama Asset Hub (Mainnet)
```typescript
const creator = new PolkadotBirthdayTokenCreator({
  network: 'kusama',
  keyType: 'sr25519'
});
```

- **RPC**: wss://kusama-asset-hub-rpc.polkadot.io
- **Explorer**: https://assethub-kusama.subscan.io
- **Min Deposit**: ~0.1 KSM
- **SS58 Format**: 2

### Westend Asset Hub (Testnet)
```typescript
const creator = new PolkadotBirthdayTokenCreator({
  network: 'westend',
  keyType: 'sr25519'
});
```

- **RPC**: wss://westend-asset-hub-rpc.polkadot.io
- **Explorer**: https://assethub-westend.subscan.io
- **Min Deposit**: ~0.01 WND (free from faucet)
- **SS58 Format**: 42

## Security Best Practices

1. **Seed Phrase Management**
   - Never commit seed phrases to version control
   - Use environment variables in production
   - Store in secure key management systems
   - Consider using Polkadot.js extension for user-facing apps

2. **Input Validation**
   - All user inputs are validated
   - Birthday must be a real date
   - Initials must be letters only
   - Ticker symbol limited to 10 characters

3. **Testing**
   - Always test on Westend testnet first
   - Verify asset creation before mainnet
   - Check transaction confirmations
   - Get testnet funds from faucet

4. **Balance Checks**
   - Always verify sufficient balance before deployment
   - Account for both deposit and transaction fees
   - Monitor transaction status

## Troubleshooting

### "Insufficient balance" Error
- Fund wallet with required amount
- Polkadot: 1+ DOT
- Kusama: 0.1+ KSM
- Westend: 0.01+ WND (free from faucet)
- Check network status

### "Invalid seed phrase" Error
- Must be 12 or 24 words
- Check for typos or extra spaces
- Verify words are from BIP39 word list
- Ensure proper encoding

### "Invalid initials" Error
- Must be 2-3 letters only
- No numbers or special characters
- Case insensitive (converted to uppercase)

### "Ticker symbol too long" Error
- Max 10 characters on Assets pallet
- Reduce initials or use shorter year format
- Example: "CS85" instead of "CS1985" if needed

### "Invalid date" Error
- Check month is 1-12
- Check day is valid for the month
- Ensure year is between 1900 and current year

### Transaction Not Confirming
- Wait 10-15 seconds for block confirmation
- Check transaction status on Subscan
- Verify transaction was successfully posted
- Check network status

### "Asset ID already exists" Error
- Asset ID must be unique
- Query for available IDs
- Use different generation method

## Cost Breakdown

### Polkadot Asset Hub
| Item | Cost | Notes |
|------|------|-------|
| Asset Creation Deposit | ~1 DOT | Refundable on destruction |
| Transaction Fees | ~0.01-0.05 DOT | Network fees |
| **Total Initial** | **~1.05 DOT** | Per token deployment |
| **Ongoing** | ~0.01 DOT/tx | Per transfer |

### Kusama Asset Hub
| Item | Cost | Notes |
|------|------|-------|
| Asset Creation Deposit | ~0.1 KSM | Refundable on destruction |
| Transaction Fees | ~0.01 KSM | Network fees |
| **Total Initial** | **~0.11 KSM** | Per token deployment |
| **Ongoing** | ~0.001 KSM/tx | Per transfer |

### Westend Asset Hub (Testnet)
| Item | Cost | Notes |
|------|------|-------|
| Asset Creation Deposit | ~0.01 WND | Refundable |
| Transaction Fees | ~0.001 WND | Network fees |
| **Total Initial** | **~0.011 WND** | FREE from faucet |

## Getting Testnet WND

1. Visit: https://faucet.polkadot.io/westend
2. Enter your Westend address (starts with "5")
3. Request WND tokens
4. Receive ~10 WND (sufficient for ~900+ asset creations)

## Block Explorers

### Polkadot Asset Hub
- **Subscan**: https://assethub-polkadot.subscan.io/
- **Polkadot.js**: https://polkadot.js.org/apps/?rpc=wss://polkadot-asset-hub-rpc.polkadot.io

### Kusama Asset Hub
- **Subscan**: https://assethub-kusama.subscan.io/
- **Polkadot.js**: https://polkadot.js.org/apps/?rpc=wss://kusama-asset-hub-rpc.polkadot.io

### Westend Asset Hub
- **Subscan**: https://assethub-westend.subscan.io/
- **Polkadot.js**: https://polkadot.js.org/apps/?rpc=wss://westend-asset-hub-rpc.polkadot.io

## Adding Asset to Wallet

After deployment, add the asset to Polkadot.js wallet:

1. Open Polkadot.js extension or web app
2. Go to "Assets" or "Network" → "Asset Hub"
3. Navigate to your account
4. Find your asset by Asset ID
5. Asset should appear automatically in compatible wallets

## Future Enhancements

Potential additions to this module:

1. **More Token Types**
   - Anniversary tokens
   - Commemorative tokens
   - Custom formula tokens

2. **Advanced Features**
   - Token burning
   - Additional minting (if admin)
   - Transfer restrictions
   - Freezing capabilities

3. **UI Integration**
   - Polkadot.js extension integration
   - Nova Wallet support
   - SubWallet integration
   - Browser-based minting interface

4. **Cross-Chain Features**
   - XCM transfers to other parachains
   - Bridge integration
   - Multi-chain deployment
   - Teleport functionality

5. **Asset Management**
   - Team management
   - Multi-signature support
   - Metadata updates
   - Asset destruction tools

## Resources

- [Polkadot Documentation](https://wiki.polkadot.network/)
- [Assets Pallet Documentation](https://paritytech.github.io/substrate/master/pallet_assets/)
- [Polkadot.js API](https://polkadot.js.org/docs/api/)
- [Asset Hub Wiki](https://wiki.polkadot.network/docs/learn-assets)
- [Subscan Explorer](https://www.subscan.io/)
- [Polkadot Forum](https://forum.polkadot.network/)

## Support

For issues or questions:
1. Check transaction on Subscan
2. Verify wallet balance and seed phrase format
3. Review console logs for error details
4. Test on Westend testnet first
5. Ensure connected to Asset Hub, not relay chain
6. Join Polkadot Discord: https://dot.li/discord
7. Stack Exchange: https://substrate.stackexchange.com/

## Examples

### Complete Example with Error Handling

```typescript
import { PolkadotBirthdayTokenCreator } from './DOT.Polkadot.token.birthday';

async function createMyBirthdayToken() {
  const creator = new PolkadotBirthdayTokenCreator({ network: 'westend' });

  try {
    // Your seed phrase (keep this secure!)
    const seedPhrase = process.env.POLKADOT_SEED!;

    // Check balance
    console.log('Checking wallet balance...');
    const balanceInfo = await creator.checkBalance(seedPhrase);
    
    if (!balanceInfo.hasEnoughBalance) {
      throw new Error(`Insufficient balance. Need 0.01 WND, have ${balanceInfo.balance} WND`);
    }

    // Deploy token
    console.log('Deploying birthday token...');
    const result = await creator.deployToken(seedPhrase, {
      initials: "CS",
      birthYear: 1985,
      birthMonth: 6,
      birthDay: 15,
      fullName: "Corey Stedman",
      decimals: 0
    });

    console.log('\n✅ Success!');
    console.log(`Token: ${result.tickerSymbol}`);
    console.log(`Asset ID: ${result.assetId}`);
    console.log(`Supply: ${result.tokenAmount}`);
    console.log(`View: ${result.subscanLink}`);

    return result;
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
    throw error;
  } finally {
    await creator.disconnect();
  }
}

// Run it
createMyBirthdayToken();
```

### Using Helper Methods

```typescript
import { PolkadotBirthdayTokenCreator } from './DOT.Polkadot.token.birthday';

async function quickDeploy(fullName: string, birthday: string, seedPhrase: string) {
  const creator = new PolkadotBirthdayTokenCreator({ network: 'westend' });
  
  try {
    const initials = PolkadotBirthdayTokenCreator.extractInitials(fullName);
    const birthDate = PolkadotBirthdayTokenCreator.parseBirthday(birthday);
    
    return await creator.deployToken(seedPhrase, {
      initials,
      ...birthDate,
      fullName
    });
  } finally {
    await creator.disconnect();
  }
}

// Usage
const result = await quickDeploy(
  "John Smith",
  "1990-03-15",
  process.env.POLKADOT_SEED!
);
```

### Multi-Network Deployment

```typescript
import { PolkadotBirthdayTokenCreator } from './DOT.Polkadot.token.birthday';

async function deployToMultipleNetworks(seedPhrase: string, config: any) {
  const networks = ['westend', 'kusama', 'polkadot'] as const;
  const results = [];

  for (const network of networks) {
    const creator = new PolkadotBirthdayTokenCreator({ network });
    try {
      const result = await creator.deployToken(seedPhrase, config);
      results.push({ network, result });
    } finally {
      await creator.disconnect();
    }
  }

  return results;
}
```

## Key Differences from Other Chains

| Feature | Polkadot | Ethereum/BSC | Cosmos | Algorand |
|---------|----------|--------------|--------|----------|
| **Token Standard** | Assets Pallet | ERC-20/BEP-20 | TokenFactory | ASA |
| **Smart Contracts** | ❌ (Runtime) | ✅ (Solidity) | ✅ (CosmWasm) | ❌ (Native) |
| **Deposit Required** | ✅ (Refundable) | ❌ | ❌ | ✅ (Min Balance) |
| **Cross-Chain** | ✅ (XCM) | ✅ (Bridges) | ✅ (IBC) | ❌ |
| **Finality** | ~6 sec | ~3 sec | ~6 sec | ~4.5 sec |
| **Fee Currency** | DOT/KSM | BNB/ETH | OSMO/NTRN | ALGO |
