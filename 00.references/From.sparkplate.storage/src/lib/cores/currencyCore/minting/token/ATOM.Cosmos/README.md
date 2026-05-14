# Cosmos Token Minting

This directory contains token minting mechanisms for Cosmos (ATOM) ecosystem chains, enabling the creation of custom tokens using the TokenFactory module with personalized metadata.

## Overview

Cosmos SDK chains that support the **TokenFactory module** allow users to create native tokens. This implementation provides birthday-themed token creation where token supply and ticker symbols are derived from the user's birth information.

> **⚠️ IMPORTANT**: The main Cosmos Hub (ATOM) does **NOT** support TokenFactory. Use chains like **Osmosis**, **Neutron**, **Quasar**, or other chains with TokenFactory module support.

## Available Mechanisms

### 1. Birthday Token (`ATOM.Cosmos.token.birthday.ts`)

Creates personalized tokens based on user's birthday and initials using the TokenFactory module.

**Features:**
- Token supply calculated from birth year (birthYear × 10,000)
- Ticker symbol generated from initials + year (e.g., "CS1985")
- Native Cosmos SDK token (not a smart contract)
- Full transfer and balance query functionality via standard bank module
- Birthday metadata embedded in transaction memo
- IBC-compatible for cross-chain transfers
- Support for multiple chains (Osmosis, Neutron, etc.)

**Supported Chains:**
- ✅ Osmosis (mainnet & testnet)
- ✅ Neutron (mainnet & testnet)
- ✅ Quasar
- ✅ Any chain with TokenFactory module
- ❌ Cosmos Hub (use CosmWasm/CW20 instead)

**Usage:**

```typescript
import { CosmosBirthdayTokenCreator } from './ATOM.Cosmos.token.birthday';

// Initialize creator for Osmosis
const creator = new CosmosBirthdayTokenCreator('osmosis');

// Or for Neutron
const neutronCreator = new CosmosBirthdayTokenCreator('neutron');

// Or for testnet
const testnetCreator = new CosmosBirthdayTokenCreator('osmosis-testnet');

// Load private key (32 bytes as hex string)
const privateKey = 'your64charhexprivatekeyhere...';

// Check balance first
const walletInfo = await creator.checkWalletBalance(privateKey);
console.log(`Balance: ${walletInfo.balance} ${walletInfo.denom}`);

if (!walletInfo.hasEnoughBalance) {
  console.log('Need at least 0.5 tokens for deployment');
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
console.log(`Supply: ${parseInt(result.tokenAmount).toLocaleString()} tokens`);
console.log(`Denom: ${result.denom}`);
console.log(`View: ${result.explorerLink}`);
```

**Custom Chain Configuration:**

```typescript
const customCreator = new CosmosBirthdayTokenCreator({
  rpcEndpoint: 'https://rpc.yourchain.com',
  chainId: 'yourchain-1',
  gasPrice: '0.025utoken',
  prefix: 'cosmos',
  explorerUrl: 'https://explorer.yourchain.com/tx'
});
```

**Helper Methods:**

```typescript
// Extract initials from full name
const initials = CosmosBirthdayTokenCreator.extractInitials("Corey Stedman");
// Returns: "CS"

// Parse birthday string
const birthday = CosmosBirthdayTokenCreator.parseBirthday("06/15/1985");
// Returns: { birthYear: 1985, birthMonth: 6, birthDay: 15 }

// Combined usage
const result = await creator.deployToken(privateKey, {
  initials,
  ...birthday,
  fullName: "Corey Stedman"
});
```

**Token Operations:**

```typescript
// Get token balance
const balance = await creator.getTokenBalance(
  walletInfo.address,
  result.denom
);
console.log('Balance:', balance);

// Get total supply
const supply = await creator.getTokenSupply(result.denom);
console.log('Total Supply:', supply);

// Transfer tokens (using CosmJS)
import { SigningStargateClient } from '@cosmjs/stargate';

const client = await SigningStargateClient.connectWithSigner(
  rpcEndpoint,
  wallet
);

const transferResult = await client.sendTokens(
  senderAddress,
  recipientAddress,
  [{ denom: result.denom, amount: "1000" }],
  "auto",
  "Sending birthday tokens"
);
```

## Token Examples

| Birth Year | Token Supply | Initials | Ticker Symbol | Owner | Denom Format |
|-----------|-------------|----------|---------------|-------|--------------|
| 1985 | 19,850,000 | CS | CS1985 | Corey Stedman | factory/{addr}/cs1985 |
| 1990 | 19,900,000 | JD | JD1990 | John Doe | factory/{addr}/jd1990 |
| 2000 | 20,000,000 | AS | AS2000 | Alice Smith | factory/{addr}/as2000 |

## Requirements

### Minimum Token Balance
- **0.5 native tokens** recommended for deployment (conservative estimate)
- Actual cost: ~0.001-0.01 tokens depending on chain
- Gas fees vary by network congestion
- Each transaction requires gas payment in native token

### Configuration Requirements
- **Initials**: 2-3 letters only
- **Birth Year**: Between 1900 and current year
- **Birth Month**: 1-12
- **Birth Day**: 1-31 (valid date)
- **Private Key**: Must be 32 bytes (64 hex characters)

### Dependencies
```bash
npm install @cosmjs/stargate @cosmjs/proto-signing
```

## TokenFactory Module

The TokenFactory module allows users to create native tokens on Cosmos SDK chains:

- **Native Tokens**: First-class tokens, not smart contracts
- **Bank Module**: Uses standard Cosmos SDK bank module for transfers
- **IBC Compatible**: Can be sent cross-chain via IBC
- **Denomination Format**: `factory/{creator_address}/{subdenom}`
- **Full Control**: Creator has admin capabilities (mint, burn, etc.)
- **Low Cost**: Minimal gas fees for creation

## Deployment Flow

1. **Validate Configuration**
   - Check private key format (64 hex chars)
   - Check initials format
   - Validate birthday
   - Ensure date exists

2. **Check Wallet Balance**
   - Minimum 0.5 tokens recommended
   - Get wallet address from private key

3. **Create Token Messages**
   - MsgCreateDenom: Creates the token denomination
   - MsgMint: Mints initial supply to creator
   - Both messages in single atomic transaction

4. **Sign and Broadcast**
   - Sign with account private key
   - Submit to blockchain
   - Wait for confirmation (~6 seconds typical)

5. **Confirmation**
   - Get transaction hash
   - Token immediately available
   - Display explorer links
   - Return deployment result

## Supported Chains

### Osmosis (Recommended)
- **Mainnet**: osmosis-1
- **Testnet**: osmo-test-5
- **RPC**: https://rpc.osmosis.zone
- **Explorer**: https://www.mintscan.io/osmosis
- **Gas Token**: uosmo
- **Faucet**: https://faucet.osmosis.zone/

### Neutron
- **Mainnet**: neutron-1
- **Testnet**: pion-1
- **RPC**: https://rpc-kralum.neutron-1.neutron.org
- **Explorer**: https://www.mintscan.io/neutron
- **Gas Token**: untrn
- **Faucet**: https://faucet.pion-1.ntrn.tech/

### Custom Chains
Any Cosmos SDK chain with TokenFactory module support can be used by providing custom configuration.

## Security Best Practices

1. **Private Key Management**
   - Never commit private keys to version control
   - Use environment variables in production
   - Store in secure key management systems
   - Consider using Keplr/Cosmostation for user-facing apps

2. **Input Validation**
   - All user inputs are validated
   - Birthday must be a real date
   - Initials must be letters only
   - Private key must be 32 bytes

3. **Testing**
   - Always test on testnet first
   - Verify token creation before mainnet
   - Check transaction confirmations
   - Get testnet tokens from faucets

4. **Balance Checks**
   - Always verify sufficient balance before deployment
   - Account for gas fees
   - Monitor transaction status

## Troubleshooting

### "Insufficient balance" Error
- Fund wallet with at least 0.5 native tokens
- Check account isn't locked or has pending transactions
- Verify wallet address is correct
- Get testnet tokens from faucet for testing

### "Invalid private key" Error
- Must be exactly 64 hexadecimal characters
- Check for extra spaces or line breaks
- Verify encoding is correct (no 0x prefix)
- Ensure key corresponds to the correct chain

### "Invalid initials" Error
- Must be 2-3 letters only
- No numbers or special characters
- Case insensitive (converted to uppercase)

### "Invalid date" Error
- Check month is 1-12
- Check day is valid for the month (e.g., Feb 30 is invalid)
- Ensure year is between 1900 and current year

### Transaction Not Confirming
- Wait 10-15 seconds for block confirmation
- Check transaction status on block explorer
- Verify transaction was successfully broadcast
- Check network status and congestion

### "Chain does not support TokenFactory" Error
- Cosmos Hub does NOT support TokenFactory
- Use Osmosis, Neutron, or other supported chains
- For Cosmos Hub, consider CosmWasm CW20 tokens instead

## Cost Breakdown (Approximate)

### Osmosis
| Item | Cost | Notes |
|------|------|-------|
| CreateDenom | ~0.001 OSMO | Create denomination |
| Mint | ~0.001 OSMO | Mint initial supply |
| Gas fees | ~0.001 OSMO | Network fee |
| **Total** | **~0.003 OSMO** | Per token deployment |

### Neutron
| Item | Cost | Notes |
|------|------|-------|
| CreateDenom | ~0.001 NTRN | Create denomination |
| Mint | ~0.001 NTRN | Mint initial supply |
| Gas fees | ~0.001 NTRN | Network fee |
| **Total** | **~0.003 NTRN** | Per token deployment |

*Actual costs vary based on network congestion and gas prices.*

## Token Denomination Format

Tokens created with TokenFactory follow this format:

```
factory/{creator_address}/{subdenom}
```

Example:
```
factory/osmo1abc123.../cs1985
```

Where:
- `factory/` - TokenFactory prefix
- `osmo1abc123...` - Creator's address
- `cs1985` - Subdenom (lowercase ticker)

## IBC Transfers

Birthday tokens can be transferred across chains using IBC:

```typescript
import { SigningStargateClient } from '@cosmjs/stargate';

const ibcTransferMsg = {
  typeUrl: '/ibc.applications.transfer.v1.MsgTransfer',
  value: {
    sourcePort: 'transfer',
    sourceChannel: 'channel-0', // IBC channel
    token: {
      denom: result.denom,
      amount: '1000'
    },
    sender: senderAddress,
    receiver: recipientAddress,
    timeoutHeight: undefined,
    timeoutTimestamp: (Date.now() + 600000) * 1000000, // 10 min timeout
  }
};

const transferResult = await client.signAndBroadcast(
  senderAddress,
  [ibcTransferMsg],
  'auto',
  'IBC transfer of birthday tokens'
);
```

## Future Enhancements

Potential additions to this module:

1. **More Token Types**
   - Anniversary tokens
   - Commemorative tokens
   - Custom formula tokens

2. **Advanced Features**
   - Token burning
   - Additional minting (if creator)
   - Metadata management
   - Admin capabilities

3. **UI Integration**
   - Keplr Wallet Connect
   - Cosmostation integration
   - Leap Wallet support
   - Browser-based minting interface

4. **Batch Operations**
   - Deploy multiple tokens at once
   - Bulk transfer functionality
   - Airdrop mechanisms
   - Multi-signature support

5. **CosmWasm Alternative**
   - CW20 token support for Cosmos Hub
   - Smart contract-based tokens
   - Additional programmability

## Resources

- [Cosmos SDK Documentation](https://docs.cosmos.network/)
- [TokenFactory Module](https://docs.osmosis.zone/osmosis-core/modules/tokenfactory/)
- [CosmJS Documentation](https://cosmos.github.io/cosmjs/)
- [Osmosis Documentation](https://docs.osmosis.zone/)
- [Neutron Documentation](https://docs.neutron.org/)
- [Mintscan Explorer](https://www.mintscan.io/)
- [Keplr Wallet](https://www.keplr.app/)

## Support

For issues or questions:
1. Check transaction on block explorer (Mintscan)
2. Verify wallet balance and private key format
3. Review console logs for error details
4. Test on testnet first
5. Ensure chain supports TokenFactory module
6. Join Cosmos Discord: https://discord.gg/cosmosnetwork
7. Join Osmosis Discord: https://discord.gg/osmosis

## Examples

### Complete Example with Error Handling

```typescript
import { CosmosBirthdayTokenCreator } from './ATOM.Cosmos.token.birthday';

async function createMyBirthdayToken() {
  try {
    // Initialize for Osmosis Testnet
    const creator = new CosmosBirthdayTokenCreator('osmosis-testnet');

    // Your private key (keep this secure!)
    const privateKey = process.env.COSMOS_PRIVATE_KEY!;

    // Check balance
    console.log('Checking wallet balance...');
    const walletInfo = await creator.checkWalletBalance(privateKey);
    
    if (!walletInfo.hasEnoughBalance) {
      throw new Error(`Insufficient balance. Need 0.5 ${walletInfo.denom}, have ${walletInfo.balance}`);
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
    console.log(`Denom: ${result.denom}`);
    console.log(`Supply: ${parseInt(result.tokenAmount).toLocaleString()}`);
    console.log(`View: ${result.explorerLink}`);

    return result;
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
    throw error;
  }
}

// Run it
createMyBirthdayToken();
```

### Using Helper Methods

```typescript
import { CosmosBirthdayTokenCreator } from './ATOM.Cosmos.token.birthday';

async function quickDeploy(fullName: string, birthday: string, privateKey: string) {
  const creator = new CosmosBirthdayTokenCreator('osmosis');
  
  const initials = CosmosBirthdayTokenCreator.extractInitials(fullName);
  const birthDate = CosmosBirthdayTokenCreator.parseBirthday(birthday);
  
  return await creator.deployToken(privateKey, {
    initials,
    ...birthDate,
    fullName
  });
}

// Usage
const result = await quickDeploy(
  "John Smith",
  "1990-03-15",
  process.env.COSMOS_PRIVATE_KEY!
);
```

### Multi-Chain Deployment

```typescript
import { CosmosBirthdayTokenCreator } from './ATOM.Cosmos.token.birthday';

async function deployToMultipleChains(privateKey: string, config: any) {
  const chains = ['osmosis', 'neutron'];
  const results = [];

  for (const chain of chains) {
    const creator = new CosmosBirthdayTokenCreator(chain);
    const result = await creator.deployToken(privateKey, config);
    results.push({ chain, result });
  }

  return results;
}
```
