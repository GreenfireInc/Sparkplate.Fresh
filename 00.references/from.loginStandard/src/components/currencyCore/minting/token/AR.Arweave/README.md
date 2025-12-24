# Arweave Token Minting

This directory contains token minting mechanisms for Arweave (AR), enabling the creation of custom SmartWeave tokens with personalized metadata.

## Overview

Arweave supports token creation through the SmartWeave contract system. This implementation provides birthday-themed token creation where token supply and ticker symbols are derived from the user's birth information.

## Available Mechanisms

### 1. Birthday Token (`AR.Arweave.token.birthday.ts`)

Creates personalized tokens based on user's birthday and initials.

**Features:**
- Token supply calculated from birth year (birthYear × 10,000)
- Ticker symbol generated from initials + year (e.g., "CS1985")
- SmartWeave token standard compliance
- Full transfer and balance query functionality
- Birthday metadata embedded in contract
- Permanent storage on Arweave

**Usage:**

```typescript
import { ArweaveBirthdayTokenCreator } from './AR.Arweave.token.birthday';
import * as fs from 'fs';

// Initialize creator
const creator = new ArweaveBirthdayTokenCreator();

// Load private key
const privateKey = JSON.parse(fs.readFileSync('wallet.json', 'utf-8'));

// Check balance first
const walletInfo = await creator.checkWalletBalance(privateKey);
console.log(`Balance: ${walletInfo.balanceAR} AR`);

if (!walletInfo.hasEnoughBalance) {
  console.log('Need at least 0.01 AR for deployment');
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
console.log(`Supply: ${result.tokenAmount.toLocaleString()} tokens`);
console.log(`Contract TX: ${result.contractTxId}`);
console.log(`View: ${result.viewBlockLink}`);
```

**Helper Methods:**

```typescript
// Extract initials from full name
const initials = ArweaveBirthdayTokenCreator.extractInitials("Corey Stedman");
// Returns: "CS"

// Parse birthday string
const birthday = ArweaveBirthdayTokenCreator.parseBirthday("06/15/1985");
// Returns: { birthYear: 1985, birthMonth: 6, birthDay: 15 }

// Combined usage
const result = await creator.deployToken(privateKey, {
  initials,
  ...birthday,
  fullName: "Corey Stedman"
});
```

**Token Contract Functions:**

Once deployed, the token supports:

```typescript
// Transfer tokens
{
  function: 'transfer',
  target: '<recipient-address>',
  qty: 1000
}

// Check balance
{
  function: 'balance',
  target: '<address>' // Optional, defaults to caller
}

// Get total supply
{
  function: 'totalSupply'
}

// Get token info
{
  function: 'info'
}
```

## Token Examples

| Birth Year | Token Supply | Initials | Ticker Symbol | Owner |
|-----------|-------------|----------|---------------|-------|
| 1985 | 19,850,000 | CS | CS1985 | Corey Stedman |
| 1990 | 19,900,000 | JD | JD1990 | John Doe |
| 2000 | 20,000,000 | AS | AS2000 | Alice Smith |

## Requirements

### Minimum Arweave Balance
- **0.01 AR** required for deployment
- Contract source: ~0.005 AR
- Token state: ~0.005 AR
- Exact cost depends on data size and network fees

### Configuration Requirements
- **Initials**: 2-3 letters only
- **Birth Year**: Between 1900 and current year
- **Birth Month**: 1-12
- **Birth Day**: 1-31 (valid date)

### Dependencies
```bash
npm install arweave
```

## SmartWeave Token Standard

The birthday token implements the Arweave SmartWeave token standard:

- **State Storage**: Token state stored on Arweave
- **Lazy Evaluation**: State computed from transaction history
- **Transfer Support**: Standard token transfer functionality
- **Balance Queries**: Read balances without transaction
- **Metadata**: Custom fields (birthday, creation date, etc.)

## Deployment Flow

1. **Validate Configuration**
   - Check initials format
   - Validate birthday
   - Ensure date exists

2. **Check Wallet Balance**
   - Minimum 0.01 AR required
   - Get wallet address

3. **Deploy Contract Source**
   - Upload SmartWeave contract code
   - Tag with contract metadata
   - Returns source TX ID

4. **Deploy Token State**
   - Upload initial state with metadata
   - Reference contract source
   - Tag with token info
   - Returns contract TX ID

5. **Confirmation**
   - Display explorer links
   - Show token details
   - Return deployment result

## Security Best Practices

1. **Private Key Management**
   - Never commit JWK files to version control
   - Use environment variables in production
   - Store keys in secure key management systems

2. **Input Validation**
   - All user inputs are validated
   - Birthday must be a real date
   - Initials must be letters only

3. **Testing**
   - Test on ArLocal or testnet first
   - Verify token creation before mainnet
   - Check transaction confirmations

4. **Balance Checks**
   - Always verify sufficient balance before deployment
   - Account for network fees
   - Monitor transaction status

## Troubleshooting

### "Insufficient AR balance" Error
- Fund wallet with at least 0.01 AR
- Check network fees haven't increased
- Verify wallet address is correct

### "Invalid initials" Error
- Must be 2-3 letters only
- No numbers or special characters
- Case insensitive (converted to uppercase)

### "Invalid date" Error
- Check month is 1-12
- Check day is valid for the month (e.g., Feb 30 is invalid)
- Ensure year is between 1900 and current year

### Transaction Not Confirming
- Wait 2-5 minutes for Arweave block confirmation
- Check transaction status on ViewBlock
- Verify transaction was successfully posted

## Future Enhancements

Potential additions to this module:

1. **More Token Types**
   - Anniversary tokens
   - Commemorative tokens
   - Custom formula tokens

2. **Advanced Features**
   - Token burning
   - Minting additional supply (if owner)
   - Voting/governance features
   - Staking mechanisms

3. **UI Integration**
   - ArConnect wallet support
   - Browser-based minting interface
   - Mobile wallet integration

4. **Batch Operations**
   - Deploy multiple tokens at once
   - Bulk transfer functionality
   - Airdrop mechanisms

## Resources

- [Arweave Documentation](https://docs.arweave.org/)
- [SmartWeave Documentation](https://github.com/ArweaveTeam/SmartWeave)
- [Warp Contracts](https://github.com/warp-contracts/warp)
- [ViewBlock Explorer](https://viewblock.io/arweave)
- [ArConnect Wallet](https://arconnect.io/)

## Support

For issues or questions:
1. Check transaction on ViewBlock
2. Verify wallet balance and key format
3. Review console logs for error details
4. Test on ArLocal development environment first

