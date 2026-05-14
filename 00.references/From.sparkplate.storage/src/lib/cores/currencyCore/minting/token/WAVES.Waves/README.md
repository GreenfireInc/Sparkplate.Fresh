# Waves Token Minting

This directory contains token minting mechanisms for **Waves**, the multi-purpose blockchain platform with built-in token support, making token creation simpler than any other blockchain.

## Overview

Waves is a blockchain platform focused on custom tokens, smart contracts, and DeFi with high throughput and low fees. This implementation provides birthday-themed token creation using **native Waves asset issuance** - **NO smart contracts required!**

## Why Waves is Revolutionary

🎯 **Native Token Support** (Unique!)
- **NO smart contracts needed** for tokens!
- **One function call** to create tokens
- **Built into the protocol** - not an add-on
- **Simpler than ANY other blockchain**
- **Issue() function** - that's it!

⚡ **High Performance**
- **~1,000 TPS** - High throughput
- **1 minute blocks** - Fast confirmation
- **Proof of Stake** - Energy efficient
- **No gas wars** - Predictable fees

💰 **Low Costs**
- **1 WAVES** (~$2) for token issuance
- **0.001 WAVES** (~$0.002) for transfers
- **Cheapest token creation** of major chains
- **Fixed 100M supply** - deflationary

🌊 **Built-in DEX**
- **Waves.Exchange** - Native DEX integration
- **Trade immediately** after creation
- **No listing fees** - automatic listing
- **Deep liquidity** - established ecosystem

🔧 **Unique Features**
- **Sponsorship** - Pay fees in YOUR token!
- **Leasing** - Stake for others, earn rewards
- **15-word seed** - Waves-specific (not BIP39)
- **Ride language** - Functional smart contracts
- **Curve25519** - Modern cryptography

## Available Mechanisms

### 1. Birthday Token (`WAVES.Waves.token.birthday.ts`)

Creates personalized native Waves assets based on user's birthday and initials with **ONE function call**.

**Features:**
- Token supply calculated from birth year (birthYear × 10,000)
- Ticker symbol generated from initials + year (e.g., "CS1985")
- **Native Waves asset** (NOT a smart contract!)
- **Simplest implementation** of all chains
- Transfer functionality
- Balance queries
- Optional reissuability
- Optional decimals (0-8)
- Birthday metadata
- Works on Mainnet, Testnet, Stagenet
- **Sponsorship support** (users pay fees in your token!)
- **1 minute finality**

**Usage:**

```typescript
import { WavesBirthdayTokenCreator } from './WAVES.Waves.token.birthday';

// Initialize for Waves Mainnet
const creator = new WavesBirthdayTokenCreator({ network: 'mainnet' });

// Or for Testnet
const testnetCreator = new WavesBirthdayTokenCreator({ network: 'testnet' });

// Load seed phrase (15 words - Waves specific!)
const seedPhrase = 'your 15-word waves seed phrase here';

// Deploy token (native asset issuance!)
const result = await creator.deployToken(seedPhrase, {
  initials: "CS",
  birthYear: 1985,
  birthMonth: 6,
  birthDay: 15,
  fullName: "Corey Stedman", // Optional
  decimals: 0, // Optional: 0-8 decimals
  reissuable: false, // Optional: can create more later
  description: "My birthday token" // Optional
});

console.log(`Token: ${result.tickerSymbol}`); // CS1985
console.log(`Asset ID: ${result.assetId}`);
console.log(`Supply: ${result.tokenAmount}`); // 19850000
console.log(`View: ${result.explorerLink}`);

// Check balance first
const balance = await creator.checkBalance(seedPhrase);
console.log(`Balance: ${balance.balanceWAVES} WAVES`);
console.log(`Has enough: ${balance.hasEnoughBalance}`);
```

## Requirements

### Minimum WAVES Balance
- **Mainnet**: 2 WAVES (~$4 at $2/WAVES)
- **Testnet**: 1 WAVES (free from faucet)
- **Actual cost**: 1 WAVES for issuance

### Configuration Requirements
- **Initials**: 2-3 letters only
- **Birth Year**: Between 1900 and current year
- **Birth Month**: 1-12
- **Birth Day**: 1-31 (valid date)
- **Seed Phrase**: **15 words** (Waves-specific!)
- **Decimals**: 0-8 (optional, default: 0)

### Dependencies
```bash
npm install @waves/waves-transactions @waves/ts-lib-crypto
```

## Network Configuration

### Waves Mainnet
```typescript
const creator = new WavesBirthdayTokenCreator({ network: 'mainnet' });
```

- **Network**: Mainnet
- **Chain ID**: 'W'
- **Explorer**: https://wavesexplorer.com
- **Node**: https://nodes.wavesnodes.com
- **Block Time**: 1 minute
- **Finality**: 1 minute
- **Cost**: 1 WAVES per issuance

### Waves Testnet (Recommended for Testing)
```typescript
const creator = new WavesBirthdayTokenCreator({ network: 'testnet' });
```

- **Network**: Testnet
- **Chain ID**: 'T'
- **Explorer**: https://wavesexplorer.com/testnet
- **Node**: https://nodes-testnet.wavesnodes.com
- **Faucet**: https://wavesexplorer.com/testnet/faucet
- **Cost**: FREE

### Waves Stagenet
```typescript
const creator = new WavesBirthdayTokenCreator({ network: 'stagenet' });
```

- **Network**: Stagenet
- **Chain ID**: 'S'
- **Node**: https://nodes-stagenet.wavesnodes.com

## Key Differences: Waves vs Other Chains

| Feature | Waves | Ethereum | Tron | Algorand |
|---------|-------|----------|------|----------|
| **Token Creation** | **Native (built-in)** | Smart contract | Smart contract | ASA |
| **Complexity** | **issue()** | Deploy contract | Deploy contract | createAsset() |
| **Smart Contract?** | **NO!** | YES | YES | NO |
| **Cost** | **$2** | $30-90 | $10-14 | $0.20 |
| **Speed** | 1min | 12s | 3s | 4.5s |
| **Seed Phrase** | **15 words** | 12/24 | 12/24 | 25 words |
| **Built-in DEX** | **YES** | No | No | No |
| **Sponsorship** | **YES** | No | No | No |

**Waves = Simplest token creation of ANY blockchain!** 🎯

## Native Asset Issuance (Revolutionary!)

Waves has **built-in token support** at the protocol level:

### Traditional Blockchains (Ethereum, BSC, Tron)
```typescript
// 1. Write Solidity contract (~200 lines)
// 2. Compile to bytecode
// 3. Deploy contract (complex)
// 4. Verify on explorer
// 5. Hope it works
```

### Waves (Native Assets) ✅
```typescript
// 1. Call issue() function
// 2. That's it! 🎉
const tx = issue({
  name: "My Token",
  description: "Token description",
  quantity: 19850000,
  decimals: 0,
  reissuable: false,
  chainId: 'W'
}, seedPhrase);

await broadcast(tx, nodeUrl);
// Done! Token created! 
```

**No smart contracts, no bytecode, no ABI, no verification - just ONE function call!**

## 15-Word Seed Phrase (Unique!)

Waves uses a **unique 15-word seed phrase** format:

### Important Notes:
- **NOT BIP39** - Different from Bitcoin/Ethereum
- **15 words exactly** - Not 12 or 24
- **Waves-specific** - Cannot import to MetaMask
- **Generated by Waves wallets** only
- **Curve25519** cryptography (not secp256k1)

### Example Format:
```
abandon abandon abandon abandon abandon abandon abandon
abandon abandon abandon abandon abandon abandon abandon about
```

**Do NOT try to use Bitcoin/Ethereum seeds with Waves!**

## Sponsorship Feature (Unique to Waves!)

Waves has a **revolutionary sponsorship feature**:

### What is Sponsorship?
- **You pay fees** for your token holders
- **Users don't need WAVES** to transact
- **Pay fees in YOUR token** instead
- **Only on Waves** - no other chain has this!

### How it Works:
```typescript
// Enable sponsorship for your token
const sponsorTx = sponsorship({
  assetId: 'your-token-id',
  minSponsoredAssetFee: 100, // Min fee in your token
  chainId: 'W'
}, seedPhrase);

await broadcast(sponsorTx, nodeUrl);

// Now users can pay fees in YOUR token!
// You pay the WAVES fees behind the scenes
```

### Benefits:
- **Better UX** - Users don't need WAVES
- **Wider adoption** - Lower barrier to entry
- **Token utility** - Your token is useful for fees
- **Unique to Waves** - No other blockchain has this

## Built-in DEX Integration

Waves has a **native decentralized exchange**:

### Waves.Exchange
- **Automatic listing** - Tokens appear immediately
- **No listing fees** - Free to trade
- **Deep liquidity** - Established ecosystem
- **Multiple pairs** - Trade with WAVES, USDT, BTC, etc.

### Trade Your Token:
```typescript
// Your token is automatically tradable after issuance!
// Go to: https://waves.exchange/
// Search for your asset ID
// Start trading immediately!
```

### Add Liquidity:
- Create liquidity pools
- Earn fees from trades
- Instant price discovery
- No approval from anyone

## Cost Breakdown

### Waves Mainnet
| Item | Cost (WAVES) | Cost (USD*) | Notes |
|------|-------------|-------------|-------|
| Token Issuance | 1.0 | $2.00 | One-time fee |
| Token Transfer | 0.001 | $0.002 | Per transfer |
| Reissue (if enabled) | 1.0 | $2.00 | Create more tokens |
| Sponsorship Enable | 1.0 | $2.00 | Optional |
| **Total (Basic)** | **1.0** | **$2.00** | **Cheapest!** |

*Based on $2/WAVES

### Comparison with Other Chains
| Chain | Token Cost | Smart Contract? |
|-------|-----------|----------------|
| **Waves** | **$2** | **NO** |
| Algorand | $0.20 | NO |
| Cosmos | $0.01 | NO |
| Tron | $10-14 | YES |
| BSC | $3-6 | YES |
| Ethereum | $30-90 | YES |

**Waves = Simplest AND affordable!**

### Waves Testnet
| Item | Cost | Notes |
|------|------|-------|
| Everything | **FREE** | Use faucet |

## Getting Testnet WAVES

Official testnet faucet:

1. **Waves Faucet**: https://wavesexplorer.com/testnet/faucet
   - Enter your testnet address
   - Request 10 WAVES
   - Instant delivery
   - Can request multiple times

## Reissuability Feature

Waves tokens can be **reissuable**:

### Non-Reissuable (Default)
```typescript
reissuable: false // Fixed supply forever
```
- Cannot create more tokens
- Supply is permanent
- Like Bitcoin

### Reissuable
```typescript
reissuable: true // Can create more tokens
```
- Can issue more tokens later
- Requires 1 WAVES per reissue
- Useful for growing projects

### Reissue More Tokens:
```typescript
import { reissue } from '@waves/waves-transactions';

const reissueTx = reissue({
  assetId: 'your-asset-id',
  quantity: 10000000, // Additional tokens
  reissuable: true, // Still reissuable?
  chainId: 'W'
}, seedPhrase);

await broadcast(reissueTx, nodeUrl);
```

## Troubleshooting

### "Insufficient WAVES balance" Error
- Fund wallet with at least 2 WAVES (mainnet)
- Get testnet WAVES from faucet
- Verify correct network

### "Invalid seed phrase" Error
- Must be exactly **15 words**
- Waves-specific seed (not BIP39)
- Cannot use Bitcoin/Ethereum seeds
- Generate from Waves wallet

### "Asset name too long" Error
- Token names max 16 characters
- Use shorter name or ticker

### "Transaction not found" After Issuance
- Wait 1 minute for block confirmation
- Check Waves Explorer
- Verify network (mainnet vs testnet)

### Seed Phrase vs Private Key
- Waves uses **seed phrases** (15 words)
- NOT private keys (like Ethereum)
- NOT 12 or 24 words (like BIP39)
- Generate from Waves.Exchange or Keeper

## Resources

### Official Waves
- [Waves Website](https://waves.tech/)
- [Waves Docs](https://docs.waves.tech/)
- [Waves Explorer](https://wavesexplorer.com/)
- [Waves.Exchange](https://waves.exchange/)

### Development
- [Waves Transactions](https://wavesplatform.github.io/waves-transactions/) - JS SDK
- [Waves Crypto](https://github.com/wavesplatform/waves-crypto) - Cryptography
- [Ride Documentation](https://docs.waves.tech/en/ride/) - Smart contracts
- [Waves IDE](https://waves-ide.com/) - Online IDE

### Wallets
- [Waves.Exchange](https://waves.exchange/) - Web wallet
- [Waves Keeper](https://wavesplatform.com/products-keeper) - Browser extension
- [Waves Client](https://client.wavesplatform.com/) - Desktop wallet

### DeFi Ecosystem
- [Waves.Exchange](https://waves.exchange/) - DEX + Staking
- [Swop.fi](https://swop.fi/) - AMM DEX
- [Puzzle Swap](https://puzzleswap.org/) - Aggregator
- [Vires.Finance](https://vires.finance/) - Lending

### Community
- [Waves Discord](https://discord.gg/waves)
- [r/Wavesplatform](https://www.reddit.com/r/Wavesplatform/)
- [Waves Forum](https://forum.wavesplatform.com/)

## Examples

### Complete Example

```typescript
import { WavesBirthdayTokenCreator } from './WAVES.Waves.token.birthday';

async function deployBirthdayToken() {
  try {
    // Initialize for Testnet
    const creator = new WavesBirthdayTokenCreator({ network: 'testnet' });

    // Your 15-word Waves seed phrase (keep secure!)
    const seedPhrase = process.env.WAVES_SEED_PHRASE!;

    console.log('Deploying native Waves asset...');
    console.log('⚠️  This will take ~1 minute for confirmation\n');

    // Check balance
    const balance = await creator.checkBalance(seedPhrase);
    console.log(`Balance: ${balance.balanceWAVES} WAVES`);

    // Deploy token (simple!)
    const result = await creator.deployToken(seedPhrase, {
      initials: "CS",
      birthYear: 1985,
      birthMonth: 6,
      birthDay: 15,
      fullName: "Corey Stedman",
      decimals: 0,
      reissuable: false,
      description: "My personalized birthday token"
    });

    console.log('\n✅ Asset Issued!');
    console.log(`Token: ${result.tickerSymbol}`);
    console.log(`Asset ID: ${result.assetId}`);
    console.log(`Supply: ${result.tokenAmount}`);
    console.log(`Reissuable: ${result.reissuable}`);
    console.log(`\nView on Explorer:`);
    console.log(result.explorerLink);
    console.log(`\n💡 Trade on Waves.Exchange:`);
    console.log(`https://waves.exchange/trading/spot/${result.assetId}_WAVES`);

    return result;
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

deployBirthdayToken();
```

### With Helper Methods

```typescript
import { WavesBirthdayTokenCreator } from './WAVES.Waves.token.birthday';

async function quickDeploy() {
  const creator = new WavesBirthdayTokenCreator({ network: 'testnet' });
  
  // Extract initials from full name
  const initials = WavesBirthdayTokenCreator.extractInitials("Corey Stedman");
  
  // Parse birthday
  const birthday = WavesBirthdayTokenCreator.parseBirthday("06/15/1985");
  
  const result = await creator.deployToken(process.env.WAVES_SEED!, {
    initials,
    ...birthday,
    fullName: "Corey Stedman"
  });
  
  console.log(`Token ${result.tickerSymbol} created!`);
  console.log(`Trade at: https://waves.exchange/`);
}

quickDeploy();
```

## Security Best Practices

1. **Seed Phrase Management**
   - Never hardcode seed phrases
   - Use environment variables
   - Hardware wallets don't support Waves seeds
   - Encrypt at rest

2. **Testing**
   - **Always test on testnet first**
   - Verify asset issuance
   - Test transfers
   - Check balances

3. **Network Selection**
   - Testnet for development
   - Stagenet for pre-production
   - Mainnet for production

4. **Asset Configuration**
   - Think carefully about reissuability
   - Choose appropriate decimals
   - Write clear descriptions

## Comparison: Native Assets vs Smart Contract Tokens

### Native Assets (Waves, Algorand) ✅
**Advantages:**
- **Simpler** - One function call
- **Cheaper** - Lower issuance cost
- **Safer** - Protocol-level security
- **Faster** - No contract execution
- **No bugs** - No custom code

**Disadvantages:**
- Less flexible features
- Limited programmability

### Smart Contract Tokens (Ethereum, BSC, Tron)
**Advantages:**
- Full programmability
- Custom features
- Complex logic

**Disadvantages:**
- **Complex** - Must write/deploy contract
- **Expensive** - Higher costs
- **Riskier** - Bug potential
- **Slower** - Contract execution overhead

**For simple tokens, native assets (like Waves) are ALWAYS better!**

## Why Choose Waves?

### ✅ Use Waves If You Want:
- **Simplest token creation** (ONE function!)
- **No smart contracts** needed
- **Low cost** ($2 per token)
- **Built-in DEX** (instant trading)
- **Sponsorship** (users pay in your token)
- **Native assets** (protocol-level security)
- **Fast & cheap** (1min blocks, $0.002 transfers)

### ⚠️ Consider Other Chains If You Need:
- Faster finality (use Solana - 0.4s)
- Larger ecosystem (use Ethereum)
- EVM compatibility (use BSC/Tron)
- Complex programmability (use Ethereum)

**Waves is the BEST choice for simple, native token creation!** 🌊🎯

---

**Next Steps:**

1. Get testnet WAVES from faucet
2. Generate 15-word Waves seed phrase
3. Deploy test token on testnet
4. Verify on Waves Explorer
5. Trade on Waves.Exchange
6. Deploy on mainnet

Waves provides the unique combination of **simplicity + low cost + built-in DEX + sponsorship**, making it the **easiest blockchain for token creation**! No other chain can match Waves' simplicity! 🚀
