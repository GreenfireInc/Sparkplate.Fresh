# Stacks Token Minting

This directory contains token minting mechanisms for **Stacks (STX)**, the Bitcoin layer that brings smart contracts and decentralized applications to Bitcoin.

## Overview

Stacks is a unique blockchain that enables smart contracts on Bitcoin without modifying Bitcoin itself. This implementation provides birthday-themed token creation using the **SIP-010** standard (Stacks' equivalent of ERC-20) with **Clarity** smart contracts.

## Why Stacks is Unique

🔗 **Bitcoin Layer** - Not a side chain, not a L2, but a proper Bitcoin layer
- Settles transactions on Bitcoin blockchain
- Inherits Bitcoin's security model
- Can read Bitcoin state in smart contracts
- Bitcoin finality for all transactions

📜 **Clarity Smart Contracts**
- **Decidable** - You can know what a function will do before execution
- **Non-Turing complete** - No infinite loops, guaranteed termination
- **Human-readable** - Clear, understandable code
- **Safer than Solidity** - No reentrancy attacks, predictable behavior

⚡ **Proof of Transfer (PoX)**
- Miners commit Bitcoin to earn STX
- STX holders can Stack to earn BTC yield
- Two-way Bitcoin anchor
- Energy-efficient consensus

## Available Mechanisms

### 1. Birthday Token (`STX.Stacks.token.birthday.ts`)

Creates personalized SIP-010 tokens based on user's birthday and initials by **deploying a full Clarity smart contract**.

**Features:**
- Token supply calculated from birth year (birthYear × 10,000)
- Ticker symbol generated from initials + year (e.g., "CS1985")
- **SIP-010 standard** (Stacks fungible token)
- **Full Clarity contract deployment** (unique to Stacks)
- **Contract source code generation**
- Transfer functionality
- Balance queries
- Birthday metadata in contract
- Works on Mainnet and Testnet
- 6 decimals (Stacks standard)
- **Bitcoin-anchored finality** (~10-30 minutes)

**Usage:**

```typescript
import { StacksBirthdayTokenCreator } from './STX.Stacks.token.birthday';

// Initialize for Stacks Mainnet
const creator = new StacksBirthdayTokenCreator({ network: 'mainnet' });

// Or for Testnet
const testnetCreator = new StacksBirthdayTokenCreator({ network: 'testnet' });

// Load private key (64-character hex)
const privateKey = 'your-hex-private-key-here';

// Deploy token (deploys full Clarity contract!)
const result = await creator.deployToken(privateKey, {
  initials: "CS",
  birthYear: 1985,
  birthMonth: 6,
  birthDay: 15,
  fullName: "Corey Stedman" // Optional
});

console.log(`Token: ${result.tickerSymbol}`); // CS1985
console.log(`Contract: ${result.contractName}`); // cs1985-birthday-token
console.log(`Supply: ${result.tokenAmount}`); // 19850000
console.log(`View: ${result.explorerLink}`);

// The deployed Clarity contract source
console.log(`\nClarity Contract:\n${result.contractSource}`);

// Note: Deployment takes 10-30 minutes (Bitcoin confirmation)
```

## Requirements

### Minimum STX Balance
- **0.5 STX** recommended for contract deployment
- Actual cost: ~0.1-0.3 STX (~$0.15-0.45 at $1.50/STX)
- Testnet: Free (get from faucet)

### Configuration Requirements
- **Initials**: 2-3 letters only
- **Birth Year**: Between 1900 and current year
- **Birth Month**: 1-12
- **Birth Day**: 1-31 (valid date)
- **Private Key**: 64-character hexadecimal

### Dependencies
```bash
npm install @stacks/transactions @stacks/network
```

## Network Configuration

### Stacks Mainnet
```typescript
const creator = new StacksBirthdayTokenCreator({ network: 'mainnet' });
```

- **Network**: Mainnet
- **Explorer**: https://explorer.hiro.so
- **API**: https://api.mainnet.hiro.so
- **Bitcoin Anchor**: Yes (every block)
- **Finality**: 10-30 minutes (Bitcoin confirmation)

### Stacks Testnet
```typescript
const creator = new StacksBirthdayTokenCreator({ network: 'testnet' });
```

- **Network**: Testnet
- **Explorer**: https://explorer.hiro.so/?chain=testnet
- **API**: https://api.testnet.hiro.so
- **Faucet**: https://explorer.hiro.so/sandbox/faucet?chain=testnet
- **Cost**: FREE

## Key Differences: Stacks vs Other Chains

| Feature | Stacks | Ethereum | Solana | Cosmos |
|---------|--------|----------|--------|--------|
| **Base Chain** | **Bitcoin** | Own chain | Own chain | Own chain |
| **Language** | **Clarity** | Solidity | Rust | Go/Rust |
| **Deployment** | **Full contract** | Bytecode | Program | Message |
| **Decidable** | **✅ Yes** | ❌ No | ❌ No | ❌ No |
| **Finality** | **Bitcoin** | 12-15min | 0.4s | 6s |
| **Bitcoin Reads** | **✅ Yes** | ❌ No | ❌ No | ❌ No |
| **Security** | **Bitcoin-level** | Own | Own | Own |

**Stacks is unique: Smart contracts that settle on Bitcoin!**

## Clarity Contract Example

When you deploy a birthday token, this Clarity contract is generated:

```clarity
;; Birthday Token - SIP-010 Fungible Token
;; Created for birth year 1985

;; Define the fungible token
(define-fungible-token cs1985 u19850000)

;; Transfer function
(define-public (transfer (amount uint) (sender principal) (recipient principal) (memo (optional (buff 34))))
  (begin
    (asserts! (is-eq tx-sender sender) err-not-token-owner)
    (try! (ft-transfer? cs1985 amount sender recipient))
    (match memo to-print (print to-print) 0x)
    (ok true)
  )
)

;; Get token name
(define-read-only (get-name)
  (ok "Corey Stedman Birthday Token")
)

;; Get token symbol
(define-read-only (get-symbol)
  (ok "CS1985")
)

;; ... more SIP-010 functions ...
```

## Cost Breakdown

### Stacks Mainnet
| Item | Cost (STX) | Cost (USD*) | Notes |
|------|-----------|-------------|-------|
| Contract Deployment | 0.1-0.3 | $0.15-0.45 | One-time, includes all code |
| Bitcoin Fee | Included | Included | Miners commit BTC |
| **Total** | **~0.2 STX** | **~$0.30** | Per token deployment |

*Based on $1.50/STX

### Stacks Testnet
| Item | Cost | Notes |
|------|------|-------|
| Everything | FREE | Use faucet |

### Confirmation Time
- **Stacks Block**: ~10 minutes (Bitcoin block time)
- **Full Finality**: ~30 minutes (6 Bitcoin confirmations)
- **Slower than**: Solana, Ethereum, BSC
- **More secure than**: Any non-Bitcoin chain

## Getting Testnet STX

Official testnet faucet:

1. **Hiro Faucet**: https://explorer.hiro.so/sandbox/faucet?chain=testnet
   - Connect wallet or enter address
   - Request 500 testnet STX
   - Instant delivery

## Clarity vs Solidity

| Feature | Clarity (Stacks) | Solidity (Ethereum) |
|---------|------------------|---------------------|
| **Decidable** | ✅ Yes | ❌ No |
| **Turing Complete** | ❌ No (safer) | ✅ Yes (risky) |
| **Re-entrancy** | ✅ Impossible | ⚠️ Major risk |
| **Predictable** | ✅ Always | ❌ Sometimes |
| **Readable** | ✅ Human-friendly | ⚠️ Complex |
| **Bitcoin State** | ✅ Can read | ❌ Cannot |
| **Post-Conditions** | ✅ Built-in | ❌ Manual |

**Clarity is designed to be safer and more predictable than Solidity.**

## Troubleshooting

### "Insufficient STX balance" Error
- Fund wallet with at least 0.5 STX
- Verify correct network (mainnet vs testnet)
- Get testnet STX from faucet

### "Contract name already exists" Error
- Contract names must be unique per address
- Change initials or birth year
- Or use different wallet

### Transaction Taking Long Time
- **This is normal for Stacks!**
- Must wait for Bitcoin block (~10 min)
- Full finality: 6 Bitcoin blocks (~60 min)
- Check progress on Stacks Explorer

### Private Key Format Error
- Must be 64-character hexadecimal
- Not base58 (like Solana)
- Not the seed phrase
- Export from Hiro/Leather wallet

## Resources

### Official Stacks
- [Stacks Website](https://www.stacks.co/)
- [Stacks Docs](https://docs.stacks.co/)
- [Stacks Explorer](https://explorer.hiro.so/)
- [Hiro Platform](https://www.hiro.so/)

### Development
- [Clarity Language](https://docs.stacks.co/clarity/)
- [SIP-010 Standard](https://github.com/stacksgov/sips/blob/main/sips/sip-010/sip-010-fungible-token-standard.md)
- [Stacks.js](https://stacks.js.org/)
- [Clarinet](https://github.com/hirosystems/clarinet) - Smart contract testing

### Wallets
- [Hiro Wallet](https://wallet.hiro.so/) - Official
- [Leather Wallet](https://leather.io/) - Popular
- [Xverse](https://www.xverse.app/) - Mobile-focused

### Community
- [Stacks Discord](https://discord.gg/stacks)
- [Stacks Forum](https://forum.stacks.org/)
- [r/stacks](https://www.reddit.com/r/stacks/)

## Examples

### Complete Example

```typescript
import { StacksBirthdayTokenCreator } from './STX.Stacks.token.birthday';

async function deployBirthdayToken() {
  try {
    // Initialize for Testnet
    const creator = new StacksBirthdayTokenCreator({ network: 'testnet' });

    // Your private key (keep secure!)
    const privateKey = process.env.STACKS_PRIVATE_KEY!;

    console.log('Deploying Clarity contract to Stacks...');
    console.log('⚠️  This will take 10-30 minutes for Bitcoin confirmation\n');

    // Deploy token
    const result = await creator.deployToken(privateKey, {
      initials: "CS",
      birthYear: 1985,
      birthMonth: 6,
      birthDay: 15,
      fullName: "Corey Stedman"
    });

    console.log('\n✅ Contract Deployed!');
    console.log(`Token: ${result.tickerSymbol}`);
    console.log(`Contract: ${result.contractName}`);
    console.log(`Supply: ${result.tokenAmount}`);
    console.log(`TX: ${result.txHash}`);
    console.log(`\nView on Explorer:`);
    console.log(result.explorerLink);

    console.log(`\n📜 Clarity Contract Source:`);
    console.log(result.contractSource);

    console.log('\n⏳ Waiting for Bitcoin confirmation...');
    console.log('Check status on Stacks Explorer');

    return result;
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

deployBirthdayToken();
```

## Security Best Practices

1. **Private Key Management**
   - Never hardcode private keys
   - Use environment variables
   - Consider hardware wallets
   - Encrypt keys at rest

2. **Contract Immutability**
   - Clarity contracts are **immutable**
   - Cannot be upgraded after deployment
   - Test thoroughly on testnet first
   - Review generated contract carefully

3. **Testing**
   - **Always deploy on testnet first**
   - Verify contract behavior
   - Test transfers
   - Check balance queries

4. **Bitcoin Finality**
   - Wait for Bitcoin confirmations
   - Don't trust immediate confirmation
   - 6 blocks = full finality

## Next Steps

After deploying your token:

1. **Verify on Explorer** - Check contract deployment
2. **Add to Wallet** - Import custom token
3. **Test Transfers** - Send to another address
4. **Document Contract** - Share contract address
5. **List on DEX** - Add liquidity on Stacks DEXs (ALEX, Arkadiko)

Stacks provides the unique ability to create **Bitcoin-secured tokens** with **predictable, decidable smart contracts**. Your birthday token inherits Bitcoin's unparalleled security!

## Why Choose Stacks?

### ✅ Use Stacks If You Want:
- **Bitcoin security** for your tokens
- **Predictable contracts** (Clarity decidability)
- **Bitcoin state access** in smart contracts
- **No reentrancy risks** (impossible in Clarity)
- **BTC yield** from Stacking
- **Longer but safer** finality

### ⚠️ Consider Other Chains If You Need:
- Faster confirmations (use Solana/BSC)
- Lower immediate costs (use Cosmos/Algorand)
- Larger DeFi ecosystem (use Ethereum)
- EVM compatibility (use Ethereum/BSC/ETC)

**Stacks is the ONLY way to get Bitcoin-level security with smart contract functionality!** 🔗₿
