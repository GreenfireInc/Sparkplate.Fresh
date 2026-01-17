# Algorand Token Minting

This directory contains token minting mechanisms for Algorand (ALGO), enabling the creation of custom Algorand Standard Assets (ASA) with personalized metadata.

## Overview

Algorand supports native token creation through ASA (Algorand Standard Assets). This implementation provides birthday-themed token creation where token supply and ticker symbols are derived from the user's birth information.

## Available Mechanisms

### 1. Birthday Token (`ALGO.Algorand.token.birthday.ts`)

Creates personalized tokens based on user's birthday and initials.

**Features:**
- Token supply calculated from birth year (birthYear × 10,000)
- Ticker symbol generated from initials + year (e.g., "CS1985")
- Algorand Standard Asset (ASA) compliance
- Full transfer and balance query functionality
- Birthday metadata embedded in transaction note
- Native Algorand blockchain support

**Usage:**

```typescript
import { AlgorandBirthdayTokenCreator } from './ALGO.Algorand.token.birthday';

// Initialize creator (defaults to Mainnet)
const creator = new AlgorandBirthdayTokenCreator();

// For TestNet
const testnetCreator = new AlgorandBirthdayTokenCreator({
  algodServer: 'https://testnet-api.algonode.cloud',
  network: 'testnet'
});

// Load mnemonic (25 words)
const mnemonic = 'your 25 word mnemonic phrase here...';

// Check balance first
const walletInfo = await creator.checkWalletBalance(mnemonic);
console.log(`Balance: ${walletInfo.balanceALGO} ALGO`);

if (!walletInfo.hasEnoughBalance) {
  console.log('Need at least 0.1 ALGO for deployment');
  process.exit(1);
}

// Deploy token
const result = await creator.deployToken(mnemonic, {
  initials: "CS",
  birthYear: 1985,
  birthMonth: 6,
  birthDay: 15,
  fullName: "Corey Stedman" // Optional
});

console.log(`Token Created: ${result.tickerSymbol}`);
console.log(`Supply: ${result.tokenAmount.toLocaleString()} tokens`);
console.log(`Asset ID: ${result.assetId}`);
console.log(`View: ${result.algoExplorerLink}`);
```

**Helper Methods:**

```typescript
// Extract initials from full name
const initials = AlgorandBirthdayTokenCreator.extractInitials("Corey Stedman");
// Returns: "CS"

// Parse birthday string
const birthday = AlgorandBirthdayTokenCreator.parseBirthday("06/15/1985");
// Returns: { birthYear: 1985, birthMonth: 6, birthDay: 15 }

// Combined usage
const result = await creator.deployToken(mnemonic, {
  initials,
  ...birthday,
  fullName: "Corey Stedman"
});
```

**Asset Operations:**

Once deployed, you can:

```typescript
// Get asset information
const assetInfo = await creator.getAssetInfo(result.assetId);
console.log('Asset Info:', assetInfo);

// Get account's assets
const assets = await creator.getAccountAssets(walletInfo.address);
console.log('Account Assets:', assets);

// Transfer tokens (using algosdk directly)
import algosdk from 'algosdk';

const account = algosdk.mnemonicToSecretKey(mnemonic);
const suggestedParams = await algodClient.getTransactionParams().do();

// Recipient must opt-in to receive the asset first
const optInTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
  from: recipientAddress,
  to: recipientAddress,
  assetIndex: result.assetId,
  amount: 0,
  suggestedParams
});

// Then transfer tokens
const transferTxn = algosdk.makeAssetTransferTxnWithSuggestedParamsFromObject({
  from: account.addr,
  to: recipientAddress,
  assetIndex: result.assetId,
  amount: 1000,
  suggestedParams
});
```

## Token Examples

| Birth Year | Token Supply | Initials | Ticker Symbol | Owner |
|-----------|-------------|----------|---------------|-------|
| 1985 | 19,850,000 | CS | CS1985 | Corey Stedman |
| 1990 | 19,900,000 | JD | JD1990 | John Doe |
| 2000 | 20,000,000 | AS | AS2000 | Alice Smith |

## Requirements

### Minimum Algorand Balance
- **0.1 ALGO** required for ASA creation
- Transaction fee: ~0.001 ALGO
- Total minimum: ~0.101 ALGO
- Each ASA increases minimum balance by 0.1 ALGO

### Configuration Requirements
- **Initials**: 2-3 letters only
- **Birth Year**: Between 1900 and current year
- **Birth Month**: 1-12
- **Birth Day**: 1-31 (valid date)
- **Mnemonic**: Must be exactly 25 words

### Dependencies
```bash
npm install algosdk
```

## Algorand Standard Assets (ASA)

The birthday token is an Algorand Standard Asset with these properties:

- **Native Support**: First-class token on Algorand blockchain
- **Layer-1 Token**: No smart contracts needed for transfers
- **Atomic Transfers**: Built-in atomic swap support
- **Fast Finality**: Transactions confirmed in ~4.5 seconds
- **Low Fees**: ~0.001 ALGO per transaction
- **Opt-In Required**: Recipients must opt-in before receiving tokens

## Deployment Flow

1. **Validate Configuration**
   - Check mnemonic format (25 words)
   - Check initials format
   - Validate birthday
   - Ensure date exists

2. **Check Wallet Balance**
   - Minimum 0.1 ALGO required
   - Get wallet address from mnemonic

3. **Create ASA Transaction**
   - Calculate token supply
   - Generate ticker symbol
   - Create asset with metadata
   - Embed birthday in transaction note

4. **Sign and Submit**
   - Sign with account private key
   - Submit to Algorand network
   - Wait for confirmation (~4.5 seconds)

5. **Confirmation**
   - Get asset ID from confirmed transaction
   - Display explorer links
   - Return deployment result

## Network Configuration

### MainNet (Default)
```typescript
const creator = new AlgorandBirthdayTokenCreator({
  algodServer: 'https://mainnet-api.algonode.cloud',
  network: 'mainnet'
});
```

### TestNet
```typescript
const creator = new AlgorandBirthdayTokenCreator({
  algodServer: 'https://testnet-api.algonode.cloud',
  network: 'testnet'
});
```

### Custom Node
```typescript
const creator = new AlgorandBirthdayTokenCreator({
  algodToken: 'your-api-token',
  algodServer: 'https://your-node.example.com',
  algodPort: 443,
  network: 'mainnet'
});
```

## Security Best Practices

1. **Mnemonic Management**
   - Never commit mnemonics to version control
   - Use environment variables in production
   - Store in secure key management systems
   - Consider using Pera Wallet or MyAlgo Connect for user-facing apps

2. **Input Validation**
   - All user inputs are validated
   - Birthday must be a real date
   - Initials must be letters only
   - Mnemonic must be exactly 25 words

3. **Testing**
   - Always test on TestNet first
   - Verify token creation before mainnet
   - Check transaction confirmations
   - Get TestNet ALGO from dispenser

4. **Balance Checks**
   - Always verify sufficient balance before deployment
   - Account for transaction fees
   - Remember minimum balance increases with each asset

## Troubleshooting

### "Insufficient ALGO balance" Error
- Fund wallet with at least 0.1 ALGO
- Check account is not below minimum balance
- Verify wallet address is correct
- Get TestNet ALGO: https://bank.testnet.algorand.network/

### "Invalid mnemonic" Error
- Must be exactly 25 words
- Check for extra spaces or line breaks
- Verify words are from Algorand word list
- Ensure proper encoding

### "Invalid initials" Error
- Must be 2-3 letters only
- No numbers or special characters
- Case insensitive (converted to uppercase)

### "Invalid date" Error
- Check month is 1-12
- Check day is valid for the month (e.g., Feb 30 is invalid)
- Ensure year is between 1900 and current year

### Transaction Not Confirming
- Wait 5-10 seconds for Algorand block confirmation
- Check transaction status on AlgoExplorer
- Verify transaction was successfully posted
- Check network status

### "Asset opt-in required" Error (for transfers)
- Recipient must opt-in to asset before receiving
- Use makeAssetTransferTxnWithSuggestedParamsFromObject with amount: 0
- Opt-in transaction must be signed by recipient

## Cost Breakdown

| Item | Cost | Notes |
|------|------|-------|
| ASA Creation | 0.1 ALGO | Increases min balance |
| Transaction Fee | ~0.001 ALGO | Network fee |
| **Total** | **~0.101 ALGO** | Per token deployment |

## Explorer Links

### MainNet
- **AlgoExplorer**: https://algoexplorer.io/
- **NFTExplorer**: https://www.nftexplorer.app/
- **Pera Explorer**: https://explorer.perawallet.app/

### TestNet
- **AlgoExplorer**: https://testnet.algoexplorer.io/
- **NFTExplorer**: https://testnet.nftexplorer.app/
- **Bank Dispenser**: https://bank.testnet.algorand.network/

## Future Enhancements

Potential additions to this module:

1. **More Token Types**
   - Anniversary tokens
   - Commemorative tokens
   - Custom formula tokens

2. **Advanced Features**
   - Asset freezing controls
   - Clawback functionality
   - Asset reserve management
   - ARC-3/ARC-69 NFT metadata

3. **UI Integration**
   - Pera Wallet Connect
   - MyAlgo Connect integration
   - WalletConnect support
   - Browser-based minting interface

4. **Batch Operations**
   - Deploy multiple tokens at once
   - Bulk transfer functionality
   - Airdrop mechanisms
   - Multi-signature support

## Resources

- [Algorand Developer Portal](https://developer.algorand.org/)
- [Algorand Standard Assets](https://developer.algorand.org/docs/get-details/asa/)
- [AlgoSDK Documentation](https://algorand.github.io/js-algorand-sdk/)
- [AlgoExplorer](https://algoexplorer.io/)
- [Pera Wallet](https://perawallet.app/)
- [AlgoNode Public API](https://algonode.io/)

## Support

For issues or questions:
1. Check transaction on AlgoExplorer
2. Verify wallet balance and mnemonic format
3. Review console logs for error details
4. Test on TestNet development environment first
5. Join Algorand Discord: https://discord.gg/algorand

## Examples

### Complete Example with Error Handling

```typescript
import { AlgorandBirthdayTokenCreator } from './ALGO.Algorand.token.birthday';

async function createMyBirthdayToken() {
  try {
    // Initialize for TestNet
    const creator = new AlgorandBirthdayTokenCreator({
      network: 'testnet'
    });

    // Your mnemonic (keep this secure!)
    const mnemonic = process.env.ALGORAND_MNEMONIC!;

    // Check balance
    console.log('Checking wallet balance...');
    const walletInfo = await creator.checkWalletBalance(mnemonic);
    
    if (!walletInfo.hasEnoughBalance) {
      throw new Error(`Insufficient balance. Need 0.1 ALGO, have ${walletInfo.balanceALGO} ALGO`);
    }

    // Deploy token
    console.log('Deploying birthday token...');
    const result = await creator.deployToken(mnemonic, {
      initials: "CS",
      birthYear: 1985,
      birthMonth: 6,
      birthDay: 15,
      fullName: "Corey Stedman"
    });

    console.log('\n✅ Success!');
    console.log(`Token: ${result.tickerSymbol}`);
    console.log(`Asset ID: ${result.assetId}`);
    console.log(`Supply: ${result.tokenAmount.toLocaleString()}`);
    console.log(`View: ${result.algoExplorerLink}`);

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
import { AlgorandBirthdayTokenCreator } from './ALGO.Algorand.token.birthday';

async function quickDeploy(fullName: string, birthday: string, mnemonic: string) {
  const creator = new AlgorandBirthdayTokenCreator();
  
  const initials = AlgorandBirthdayTokenCreator.extractInitials(fullName);
  const birthDate = AlgorandBirthdayTokenCreator.parseBirthday(birthday);
  
  return await creator.deployToken(mnemonic, {
    initials,
    ...birthDate,
    fullName
  });
}

// Usage
const result = await quickDeploy(
  "John Smith",
  "1990-03-15",
  process.env.ALGORAND_MNEMONIC!
);
```
