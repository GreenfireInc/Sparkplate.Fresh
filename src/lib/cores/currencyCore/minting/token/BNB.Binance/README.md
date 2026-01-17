# Binance Smart Chain Token Minting

This directory contains token minting mechanisms for Binance Smart Chain (BSC), enabling the creation of custom BEP-20 tokens with personalized metadata.

## Overview

Binance Smart Chain is an EVM-compatible blockchain that supports smart contracts. This implementation provides birthday-themed token creation where token supply and ticker symbols are derived from the user's birth information using the BEP-20 standard (compatible with ERC-20).

## Available Mechanisms

### 1. Birthday Token (`BNB.Binance.token.birthday.ts`)

Creates personalized BEP-20 tokens based on user's birthday and initials.

**Features:**
- Token supply calculated from birth year (birthYear × 10,000)
- Ticker symbol generated from initials + year (e.g., "CS1985")
- BEP-20 standard compliance (ERC-20 compatible)
- Full transfer, approve, and allowance functionality
- Balance queries
- Birthday metadata embedded in token name
- Works on BSC Mainnet and Testnet
- 18 decimals (standard)

**Usage:**

```typescript
import { BinanceBirthdayTokenCreator } from './BNB.Binance.token.birthday';

// Initialize for BSC Mainnet
const creator = new BinanceBirthdayTokenCreator({ network: 'mainnet' });

// Or for BSC Testnet
const testnetCreator = new BinanceBirthdayTokenCreator({ network: 'testnet' });

// Load private key
const privateKey = 'your64charhexprivatekeyhere...'; // with or without 0x prefix

// Check balance first
const walletInfo = await creator.checkWalletBalance(privateKey);
console.log(`Balance: ${walletInfo.balanceBNB} BNB`);

if (!walletInfo.hasEnoughBalance) {
  console.log('Need at least 0.01 BNB for deployment');
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
console.log(`View: ${result.bscscanLink}`);
```

**Helper Methods:**

```typescript
// Extract initials from full name
const initials = BinanceBirthdayTokenCreator.extractInitials("Corey Stedman");
// Returns: "CS"

// Parse birthday string
const birthday = BinanceBirthdayTokenCreator.parseBirthday("06/15/1985");
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
// Get token info
const tokenInfo = await creator.getTokenInfo(result.contractAddress);
console.log('Token Info:', tokenInfo);

// Get token balance
const balance = await creator.getTokenBalance(
  result.contractAddress,
  walletInfo.address
);
console.log('Balance:', balance);

// Transfer tokens (using ethers.js)
import { ethers } from 'ethers';

const contract = new ethers.Contract(
  result.contractAddress,
  ['function transfer(address to, uint256 amount) returns (bool)'],
  wallet
);

const transferTx = await contract.transfer(
  recipientAddress,
  ethers.parseEther("1000")
);
await transferTx.wait();
```

## Token Examples

| Birth Year | Token Supply | Initials | Ticker Symbol | Owner | With Decimals |
|-----------|-------------|----------|---------------|-------|---------------|
| 1985 | 19,850,000 | CS | CS1985 | Corey Stedman | 19,850,000.000000000000000000 |
| 1990 | 19,900,000 | JD | JD1990 | John Doe | 19,900,000.000000000000000000 |
| 2000 | 20,000,000 | AS | AS2000 | Alice Smith | 20,000,000.000000000000000000 |

## Requirements

### Minimum BNB Balance
- **0.01 BNB** recommended for deployment (conservative estimate)
- Actual cost: ~0.005-0.01 BNB depending on gas price
- Testnet: Free (get testnet BNB from faucet)
- Gas fees vary by network congestion

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

## BEP-20 Token Standard

The birthday token is a BEP-20 token with these features:

- **EVM Compatible**: Works with all Ethereum tools and wallets
- **Standard Interface**: ERC-20 compatible
- **18 Decimals**: Standard token decimals
- **Transfer**: Send tokens between addresses
- **Approve/Allowance**: Standard approval mechanism
- **Events**: Transfer and Approval events for tracking
- **Low Fees**: ~$0.10-0.50 per transaction typically

## Contract Source Code

The Solidity contract source is included in the module:

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract BirthdayToken {
    string public name;
    string public symbol;
    uint8 public constant decimals = 18;
    uint256 public totalSupply;
    
    mapping(address => uint256) public balanceOf;
    mapping(address => mapping(address => uint256)) public allowance;
    
    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);
    
    constructor(string memory _name, string memory _symbol, uint256 _initialSupply) {
        name = _name;
        symbol = _symbol;
        totalSupply = _initialSupply * 10 ** uint256(decimals);
        balanceOf[msg.sender] = totalSupply;
        emit Transfer(address(0), msg.sender, totalSupply);
    }
    
    // Standard BEP-20 functions
    function transfer(address _to, uint256 _value) public returns (bool success);
    function approve(address _spender, uint256 _value) public returns (bool success);
    function transferFrom(address _from, address _to, uint256 _value) public returns (bool success);
}
```

## Deployment Flow

1. **Validate Configuration**
   - Check private key format
   - Check initials format
   - Validate birthday
   - Ensure date exists

2. **Check Wallet Balance**
   - Minimum 0.01 BNB recommended
   - Get wallet address from private key

3. **Deploy Contract**
   - Compile contract bytecode
   - Create contract factory
   - Deploy with token parameters
   - Wait for confirmation (~3 seconds on BSC)

4. **Confirmation**
   - Get contract address
   - Get transaction hash
   - Display explorer links
   - Return deployment result

## Network Configuration

### BSC Mainnet (Default)
```typescript
const creator = new BinanceBirthdayTokenCreator({
  network: 'mainnet'
  // rpcUrl: 'https://bsc-dataseed.binance.org/'
  // chainId: 56
});
```

### BSC Testnet
```typescript
const creator = new BinanceBirthdayTokenCreator({
  network: 'testnet'
  // rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/'
  // chainId: 97
});
```

### Custom RPC
```typescript
const creator = new BinanceBirthdayTokenCreator({
  network: 'mainnet',
  rpcUrl: 'https://your-custom-rpc.com',
  chainId: 56
});
```

## Security Best Practices

1. **Private Key Management**
   - Never commit private keys to version control
   - Use environment variables in production
   - Store in secure key management systems
   - Consider using MetaMask or Trust Wallet for user-facing apps

2. **Input Validation**
   - All user inputs are validated
   - Birthday must be a real date
   - Initials must be letters only
   - Private key must be 32 bytes

3. **Testing**
   - Always test on testnet first
   - Verify token creation before mainnet
   - Check transaction confirmations
   - Get testnet BNB from faucet

4. **Gas Management**
   - Always verify sufficient balance before deployment
   - Account for gas fees
   - Monitor gas prices during deployment

## Troubleshooting

### "Insufficient BNB balance" Error
- Fund wallet with at least 0.01 BNB
- Check wallet address is correct
- Verify you're on the correct network (mainnet vs testnet)
- Get testnet BNB: https://testnet.bnbchain.org/faucet-smart

### "Invalid private key" Error
- Must be 32 bytes (64 hexadecimal characters)
- Can include or omit 0x prefix
- Check for extra spaces or line breaks
- Verify encoding is correct

### "Invalid initials" Error
- Must be 2-3 letters only
- No numbers or special characters
- Case insensitive (converted to uppercase)

### "Invalid date" Error
- Check month is 1-12
- Check day is valid for the month (e.g., Feb 30 is invalid)
- Ensure year is between 1900 and current year

### Transaction Not Confirming
- Wait 5-10 seconds for BSC block confirmation
- Check transaction status on BSCScan
- Verify transaction was successfully broadcast
- Check network status and congestion

### "Nonce too low" Error
- Another transaction is pending
- Wait for pending transactions to confirm
- Or increase gas price to speed up

## Cost Breakdown

### BSC Mainnet
| Item | Cost (BNB) | Cost (USD*) | Notes |
|------|-----------|-------------|-------|
| Contract Deployment | ~0.005-0.01 | ~$3-6 | Varies by gas price |
| Gas fees | Included above | Included | Dynamic pricing |
| **Total** | **~0.005-0.01 BNB** | **~$3-6** | Per token deployment |

### BSC Testnet
| Item | Cost | Notes |
|------|------|-------|
| Everything | FREE | Use testnet faucet |

*USD prices are approximate and vary with BNB price

## Getting Testnet BNB

1. Visit: https://testnet.bnbchain.org/faucet-smart
2. Enter your wallet address
3. Complete captcha
4. Receive 0.5 testnet BNB (usually sufficient for ~50-100 deployments)

## Block Explorers

### Mainnet
- **BSCScan**: https://bscscan.com/
- **View Tokens**: https://bscscan.com/tokens

### Testnet
- **BSCScan Testnet**: https://testnet.bscscan.com/
- **View Tokens**: https://testnet.bscscan.com/tokens

## Adding Token to Wallet

After deployment, add the token to MetaMask or Trust Wallet:

1. Open wallet
2. Go to "Add Token" or "Import Token"
3. Select "Custom Token"
4. Enter contract address
5. Token symbol and decimals should auto-fill
6. Confirm

## Future Enhancements

Potential additions to this module:

1. **More Token Types**
   - Anniversary tokens
   - Commemorative tokens
   - Custom formula tokens

2. **Advanced Features**
   - Token burning
   - Minting additional supply
   - Pausable transfers
   - Ownership transfer

3. **UI Integration**
   - MetaMask integration
   - Trust Wallet Connect
   - WalletConnect support
   - Browser-based minting interface

4. **Batch Operations**
   - Deploy multiple tokens at once
   - Bulk transfer functionality
   - Airdrop mechanisms
   - Multi-signature support

## Resources

- [Binance Smart Chain Documentation](https://docs.bnbchain.org/)
- [BEP-20 Token Standard](https://github.com/bnb-chain/BEPs/blob/master/BEPs/BEP20.md)
- [Ethers.js Documentation](https://docs.ethers.org/)
- [BSCScan](https://bscscan.com/)
- [Remix IDE](https://remix.ethereum.org/) (for contract compilation)
- [Hardhat](https://hardhat.org/) (for advanced development)

## Support

For issues or questions:
1. Check transaction on BSCScan
2. Verify wallet balance and private key format
3. Review console logs for error details
4. Test on testnet first
5. Join BNB Chain Discord: https://discord.gg/bnbchain

## Examples

### Complete Example with Error Handling

```typescript
import { BinanceBirthdayTokenCreator } from './BNB.Binance.token.birthday';

async function createMyBirthdayToken() {
  try {
    // Initialize for BSC Testnet
    const creator = new BinanceBirthdayTokenCreator({ network: 'testnet' });

    // Your private key (keep this secure!)
    const privateKey = process.env.BSC_PRIVATE_KEY!;

    // Check balance
    console.log('Checking wallet balance...');
    const walletInfo = await creator.checkWalletBalance(privateKey);
    
    if (!walletInfo.hasEnoughBalance) {
      throw new Error(`Insufficient balance. Need 0.01 BNB, have ${walletInfo.balanceBNB} BNB`);
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
    console.log(`View: ${result.bscscanLink}`);

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
import { BinanceBirthdayTokenCreator } from './BNB.Binance.token.birthday';

async function quickDeploy(fullName: string, birthday: string, privateKey: string) {
  const creator = new BinanceBirthdayTokenCreator({ network: 'mainnet' });
  
  const initials = BinanceBirthdayTokenCreator.extractInitials(fullName);
  const birthDate = BinanceBirthdayTokenCreator.parseBirthday(birthday);
  
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
  process.env.BSC_PRIVATE_KEY!
);
```

### Verifying Contract on BSCScan

After deployment, verify your contract on BSCScan:

1. Go to BSCScan and find your contract
2. Click "Contract" tab → "Verify and Publish"
3. Select Compiler: Solidity (Single file)
4. Compiler Version: v0.8.20
5. License: MIT
6. Paste the Solidity source code
7. Constructor arguments: Encoded ABI
8. Submit for verification

This makes your token verifiable and trustworthy!
