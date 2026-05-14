# Terra Token Minting

This directory contains token minting mechanisms for Terra (LUNA), a Cosmos SDK-based blockchain focused on stablecoins and DeFi applications using the CW20 token standard.

## ⚠️ Important Terra History

**Terra Classic (LUNC) - The Original Chain:**
- Launched in 2019 by Terraform Labs
- Algorithmic stablecoin UST collapsed in May 2022
- Lost $40B+ in value during the "death spiral"
- Chain continues as "Terra Classic" with LUNC token
- Significantly reduced ecosystem and activity

**Terra 2.0 (LUNA) - The New Chain:**
- Created in May 2022 after the collapse
- No algorithmic stablecoin (learned from UST failure)
- New LUNA token with fresh distribution
- Active development and growing ecosystem
- **Recommended for new token deployments**

This implementation supports both chains but **strongly recommends Terra 2.0**.

## Overview

Terra uses the **CW20 token standard**, which is the CosmWasm (Rust-based smart contracts) equivalent of Ethereum's ERC-20. This implementation provides birthday-themed token creation on Terra using CW20 contracts.

## Available Mechanisms

### 1. Birthday Token (`LUNA.Terra.token.birthday.ts`)

Creates personalized CW20 tokens based on user's birthday and initials.

**Features:**
- Token supply calculated from birth year (birthYear × 10,000)
- Ticker symbol generated from initials + year (e.g., "CS1985")
- CW20 standard compliance (CosmWasm fungible token)
- Full transfer and allowance functionality
- Balance queries
- Marketing metadata support
- Birthday metadata embedded in token name
- Works on Terra 2.0 (Phoenix) and Terra Classic (Columbus)
- IBC-compatible tokens
- 6 decimals (Terra standard)

**Usage:**

```typescript
import { TerraBirthdayTokenCreator } from './LUNA.Terra.token.birthday';

// Initialize for Terra 2.0 Mainnet (RECOMMENDED)
const creator = new TerraBirthdayTokenCreator({ network: 'mainnet' });

// Or for Pisco Testnet
const testnetCreator = new TerraBirthdayTokenCreator({ network: 'testnet' });

// Or for Terra Classic (NOT RECOMMENDED)
const classicCreator = new TerraBirthdayTokenCreator({ network: 'classic' });

// Load mnemonic (24 words)
const mnemonic = 'your twenty four word mnemonic phrase here...';

// Check balance first
const walletInfo = await creator.checkWalletBalance(mnemonic);
console.log(`Balance: ${walletInfo.balanceLUNA} LUNA`);

if (!walletInfo.hasEnoughBalance) {
  console.log('Need at least 0.5 LUNA for deployment');
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
console.log(`Supply: ${result.tokenAmount} tokens`);
console.log(`Contract: ${result.contractAddress}`);
console.log(`View: ${result.explorerLink}`);
```

## Requirements

### Minimum LUNA Balance
- **0.5 LUNA** recommended for deployment (conservative estimate)
- Actual cost: ~0.1-0.3 LUNA depending on gas and state rent
- Testnet: Free (get testnet LUNA from faucet)

### Prerequisites
- **CW20 base contract** must be uploaded to the chain
- You need the **CW20 code ID** for your target network
- Verify code ID before deployment

### Configuration Requirements
- **Initials**: 2-3 letters only
- **Birth Year**: Between 1900 and current year
- **Birth Month**: 1-12
- **Birth Day**: 1-31 (valid date)
- **Mnemonic**: 12 or 24 words (BIP39 standard)

### Dependencies
```bash
npm install @terra-money/feather.js
```

## Network Configuration

### Terra 2.0 Phoenix (Mainnet) - RECOMMENDED
```typescript
const creator = new TerraBirthdayTokenCreator({
  network: 'mainnet'
  // chainId: 'phoenix-1'
  // lcdUrl: 'https://phoenix-lcd.terra.dev'
  // cw20CodeId: 1 (verify actual code ID)
});
```

- **Chain ID**: phoenix-1
- **LCD**: https://phoenix-lcd.terra.dev
- **Explorer**: https://finder.terra.money/mainnet
- **Gas Denom**: uluna
- **Status**: Active, growing ecosystem

### Pisco Testnet
```typescript
const creator = new TerraBirthdayTokenCreator({
  network: 'testnet'
  // chainId: 'pisco-1'
  // lcdUrl: 'https://pisco-lcd.terra.dev'
});
```

- **Chain ID**: pisco-1
- **LCD**: https://pisco-lcd.terra.dev
- **Explorer**: https://finder.terra.money/testnet
- **Faucet**: https://faucet.terra.money

### Terra Classic Columbus (Original Chain)
```typescript
const creator = new TerraBirthdayTokenCreator({
  network: 'classic'
  // chainId: 'columbus-5'
  // lcdUrl: 'https://columbus-lcd.terra.dev'
});
```

- **Chain ID**: columbus-5
- **LCD**: https://columbus-lcd.terra.dev
- **Explorer**: https://finder.terra.money/classic
- **Status**: ⚠️ Maintained but less active
- **Warning**: Post-collapse chain, use Terra 2.0 instead

## CW20 Token Standard

**What is CW20?**
- CosmWasm fungible token standard (like ERC-20 on Ethereum)
- Smart contracts written in Rust
- Deployed as WASM bytecode
- Instantiated with initial configuration
- Query-based interaction model

**Key Differences from ERC-20:**
| Feature | CW20 (Terra) | ERC-20 (Ethereum) |
|---------|-------------|-------------------|
| **Language** | Rust (CosmWasm) | Solidity |
| **Deployment** | Instantiate from code | Deploy bytecode |
| **Queries** | Contract queries | View functions |
| **Standard** | CosmWasm | EVM |
| **Gas** | LUNA | ETH |
| **Decimals** | Usually 6 | Usually 18 |

**CW20 Operations:**
- `transfer` - Send tokens
- `send` - Send and execute
- `burn` - Destroy tokens
- `increase_allowance` - Approve spending
- `decrease_allowance` - Reduce approval
- `transfer_from` - Transfer on behalf
- `balance` - Query balance
- `token_info` - Query metadata

## Getting CW20 Code ID

Before deploying, you need a CW20 base contract uploaded:

### Option 1: Use Existing Code ID
```bash
# Query existing CW20 contracts on Terra
terra query wasm list-code --node https://phoenix-lcd.terra.dev

# Look for "cw20-base" contracts
# Note the code ID number
```

### Option 2: Upload CW20 Base Contract
```bash
# Download CW20 base
git clone https://github.com/CosmWasm/cw-plus
cd cw-plus/contracts/cw20-base

# Build contract
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer:0.12.11

# Upload to Terra
terrad tx wasm store artifacts/cw20_base.wasm \
  --from wallet \
  --chain-id phoenix-1 \
  --gas auto \
  --fees 10000uluna
```

## Cost Breakdown

### Terra 2.0 Phoenix
| Item | Cost (LUNA) | Cost (USD*) | Notes |
|------|------------|-------------|-------|
| CW20 Instantiation | ~0.1-0.3 | ~$0.05-0.15 | Varies by gas price |
| State rent | Included | Included | One-time fee |
| **Total** | **~0.1-0.3 LUNA** | **~$0.05-0.15** | Per token deployment |

*Based on ~$0.50/LUNA

### Terra Classic Columbus
| Item | Cost (LUNC) | Cost (USD*) | Notes |
|------|------------|-------------|-------|
| CW20 Instantiation | ~100-300 | ~$0.01 | Much cheaper |

*Based on ~$0.00010/LUNC

### Pisco Testnet
| Item | Cost | Notes |
|------|------|-------|
| Everything | FREE | Use testnet faucet |

## Getting Testnet LUNA

Visit the official faucet:

1. **Terra Faucet**: https://faucet.terra.money
   - Connect wallet or enter address
   - Request testnet LUNA
   - Receive 10 LUNA for testing

2. **Discord Faucet**: https://discord.gg/terra
   - Join Terra Discord
   - Use `$request <your-address>` in faucet channel

## Troubleshooting

### "Insufficient LUNA balance" Error
- Fund wallet with at least 0.5 LUNA
- Verify you're on the correct network
- Get testnet LUNA from faucet

### "Invalid CW20 code ID" Error
- Verify code ID exists on your target chain
- Query: `terrad query wasm list-code`
- Upload CW20 base contract if needed

### "Contract instantiation failed" Error
- Check mnemonic is correct
- Verify sufficient gas
- Ensure CW20 base contract is uploaded
- Check init message format

### Transaction Not Confirming
- Wait 6-12 seconds for block confirmation
- Check transaction on Finder
- Verify gas price is adequate

## Resources

### Official Terra 2.0
- [Terra Website](https://www.terra.money/)
- [Terra Docs](https://docs.terra.money/)
- [Terra Finder](https://finder.terra.money/)
- [Terra Station Wallet](https://station.terra.money/)

### Development
- [Feather.js Documentation](https://docs.terra.money/develop/feather-js/)
- [CosmWasm Docs](https://docs.cosmwasm.com/)
- [CW20 Specification](https://github.com/CosmWasm/cw-plus/tree/main/packages/cw20)
- [Terra Testnet](https://docs.terra.money/develop/testnet/)

### Terra Classic (Legacy)
- [Terra Classic Website](https://terra.money/classic)
- [Terra Classic Explorer](https://finder.terra.money/classic)
- ⚠️ Not recommended for new projects

### Community
- [Terra Discord](https://discord.gg/terra)
- [Terra Forum](https://agora.terra.money/)
- [r/terraluna](https://www.reddit.com/r/terraluna/)

## Examples

### Complete Example with Error Handling

```typescript
import { TerraBirthdayTokenCreator } from './LUNA.Terra.token.birthday';

async function createMyBirthdayToken() {
  try {
    // Initialize for Pisco Testnet
    const creator = new TerraBirthdayTokenCreator({
      network: 'testnet',
      cw20CodeId: 1234 // Replace with actual code ID
    });

    // Your mnemonic (keep this secure!)
    const mnemonic = process.env.TERRA_MNEMONIC!;

    // Check balance
    console.log('Checking wallet balance...');
    const walletInfo = await creator.checkWalletBalance(mnemonic);
    
    console.log(`Address: ${walletInfo.address}`);
    console.log(`Balance: ${walletInfo.balanceLUNA} LUNA`);
    
    if (!walletInfo.hasEnoughBalance) {
      throw new Error(`Insufficient balance. Need 0.5 LUNA, have ${walletInfo.balanceLUNA} LUNA`);
    }

    // Deploy token
    console.log('\nDeploying birthday token...');
    const result = await creator.deployToken(mnemonic, {
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
    console.log(`TX Hash: ${result.txHash}`);
    console.log(`\nView on Finder:`);
    console.log(result.explorerLink);

    // Get token info
    const tokenInfo = await creator.getTokenInfo(result.contractAddress);
    console.log('\nToken Info:', tokenInfo);

    // Check balance
    const balance = await creator.getTokenBalance(
      result.contractAddress,
      walletInfo.address
    );
    console.log(`Your Balance: ${balance} ${result.tickerSymbol}`);

    return result;
  } catch (error) {
    console.error('❌ Error:', error instanceof Error ? error.message : error);
    throw error;
  }
}

// Run it
createMyBirthdayToken();
```

## Comparison: Terra vs Other Cosmos Chains

| Feature | Terra 2.0 | Cosmos Hub | Osmosis | Neutron |
|---------|-----------|------------|---------|---------|
| **Token Standard** | CW20 | IBC | CW20 | CW20 |
| **Smart Contracts** | CosmWasm | ❌ | CosmWasm | CosmWasm |
| **Focus** | Payments/DeFi | Hub | DEX | Smart Contracts |
| **Deployment Cost** | $0.05-0.15 | N/A | $0.01 | $0.01 |
| **Ecosystem** | Growing | Large | Large | Medium |
| **DeFi** | Moderate | ❌ | Excellent | Growing |

## Security Best Practices

1. **Mnemonic Management**
   - Never hardcode mnemonics
   - Use environment variables: `process.env.TERRA_MNEMONIC`
   - Consider hardware wallets (Ledger)
   - Encrypt mnemonics at rest

2. **Testing**
   - Always test on Pisco first
   - Verify contract on Finder after deployment
   - Test transfers before announcing token

3. **Code ID Verification**
   - Verify CW20 code ID is legitimate
   - Check code hash matches expected
   - Use official CW20 base when possible

4. **Network Selection**
   - **Use Terra 2.0** for new projects
   - Avoid Terra Classic unless specific reason
   - Test thoroughly on testnet

## Important Notes

### Why Terra 2.0 Instead of Terra Classic?

**Terra 2.0 Advantages:**
- ✅ Active development and community
- ✅ Growing ecosystem and DeFi protocols
- ✅ Stable tokenomics (no algorithmic stablecoin)
- ✅ Better security and stability
- ✅ More validators and decentralization

**Terra Classic Issues:**
- ⚠️ Post-collapse stigma
- ⚠️ Reduced development activity
- ⚠️ Smaller ecosystem
- ⚠️ Trust concerns after UST failure
- ⚠️ Limited exchange support

### The UST Collapse - What Happened?

In May 2022, Terra's algorithmic stablecoin UST lost its $1 peg:
1. Market volatility triggered large UST redemptions
2. Death spiral: UST depeg → LUNA inflation → more depeg
3. $40B+ wiped out in days
4. Entire ecosystem collapsed
5. Community voted to create Terra 2.0

**Lessons Learned:**
- Algorithmic stablecoins are risky
- Proper collateralization is critical
- Market confidence is fragile
- Terra 2.0 does NOT use algorithmic stablecoins

### Using CW20 Tokens

After deployment, your CW20 token can:
- Be transferred like any Terra asset
- Be listed on Terra DEXs (Astroport, WhiteWhale)
- Be sent across IBC to other Cosmos chains
- Be queried and interacted with via smart contracts
- Be added to Terra Station wallet

## Next Steps

After deploying your token:

1. **Verify on Finder** - Check contract instantiation
2. **Add to Terra Station** - Import custom CW20 token
3. **Create Liquidity** - List on Astroport DEX
4. **Cross-chain** - Enable IBC transfers if needed
5. **Marketing** - Announce in Terra community

Terra 2.0 provides a fast, low-cost platform for token creation using battle-tested CosmWasm smart contracts. Your CW20 birthday token will be compatible with the entire Terra and Cosmos ecosystems!
