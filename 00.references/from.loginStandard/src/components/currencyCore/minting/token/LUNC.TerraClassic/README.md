# Terra Classic Token Minting

This directory contains token minting mechanisms for **Terra Classic (LUNC)**, the original Terra blockchain after its catastrophic collapse in May 2022.

## ⚠️⚠️⚠️ CRITICAL WARNING ⚠️⚠️⚠️

**Terra Classic is the ORIGINAL Terra chain POST-COLLAPSE. Read this before proceeding:**

### The Terra Collapse (May 2022)

**What Happened:**
- Terra's **UST algorithmic stablecoin** lost its $1 peg
- "Death spiral": UST depeg triggered mass LUNA minting to restore peg
- LUNA supply hyperinflated from **350M to 6.9 TRILLION** tokens
- **$40 BILLION+ market cap** wiped out in 5 days
- LUNA price crashed from **~$100 to $0.0001**
- Entire ecosystem collapsed, exchanges delisted, lawsuits filed
- Terra founder Do Kwon became fugitive (arrested June 2023)

**Current State:**
- Original chain renamed "Terra Classic" with LUNC token
- New "Terra 2.0" chain created without algorithmic stablecoin
- Terra Classic ecosystem is **drastically reduced**
- Most dApps and protocols **migrated to Terra 2.0**
- LUNC trades at **~$0.0001** (down 99.9999% from peak)
- Community-driven with **limited development**

### Why You Probably Shouldn't Use Terra Classic

| Issue | Impact |
|-------|--------|
| **Stigma** | Associated with one of crypto's biggest failures |
| **Low Liquidity** | Minimal trading volume, hard to exit |
| **Dead Ecosystem** | Most dApps gone, few active users |
| **Security Risk** | Reduced validator set, lower security |
| **No Innovation** | Minimal development, no new features |
| **Trust Deficit** | Permanent reputation damage |
| **Hyperinflation** | 6.9T supply (vs 350M pre-collapse) |

### ✅ RECOMMENDATION: Use Terra 2.0 (LUNA) Instead

See `/LUNA.Terra/` for the recommended implementation.

## When To Use Terra Classic

Use Terra Classic ONLY if you specifically need:
- Legacy compatibility with pre-existing Terra Classic contracts
- Extremely low gas costs (due to low LUNC value)
- Specific integration with Terra Classic dApps
- Historical/archival purposes
- You understand and accept the risks

Otherwise, **USE TERRA 2.0**.

## Overview

Terra Classic uses the **CW20 token standard** (CosmWasm), identical to Terra 2.0 but on the original chain. This implementation provides birthday-themed token creation on Terra Classic.

## Available Mechanisms

### 1. Birthday Token (`LUNC.TerraClassic.token.birthday.ts`)

Creates personalized CW20 tokens based on user's birthday and initials.

**Features:**
- Token supply calculated from birth year (birthYear × 10,000)
- Ticker symbol generated from initials + year (e.g., "CS1985")
- CW20 standard compliance (CosmWasm fungible token)
- Full transfer and allowance functionality
- Balance queries
- Marketing metadata support
- Birthday metadata embedded in token name
- Works on Terra Classic Columbus-5
- 6 decimals (Terra standard)
- Extremely low gas costs (~$0.00001)

**Usage:**

```typescript
import { TerraClassicBirthdayTokenCreator } from './LUNC.TerraClassic.token.birthday';

// ⚠️  WARNING: You are using Terra Classic (post-collapse chain)
// Consider using Terra 2.0 instead: import from './LUNA.Terra/'

// Initialize for Terra Classic
const creator = new TerraClassicBirthdayTokenCreator({
  cw20CodeId: 1234 // Verify actual CW20 code ID on Terra Classic
});

// Load mnemonic (24 words)
const mnemonic = 'your twenty four word mnemonic phrase here...';

// Check balance first
const walletInfo = await creator.checkWalletBalance(mnemonic);
console.log(`Balance: ${walletInfo.balanceLUNC} LUNC`);

if (!walletInfo.hasEnoughBalance) {
  console.log('Need at least 1 LUNC for deployment');
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

console.log(`⚠️  Token Created on Terra Classic: ${result.tickerSymbol}`);
console.log(`Supply: ${result.tokenAmount} tokens`);
console.log(`Contract: ${result.contractAddress}`);
console.log(`View: ${result.explorerLink}`);
```

## Requirements

### Minimum LUNC Balance
- **1 LUNC** recommended for deployment
- Actual cost: ~0.1-0.5 LUNC (~$0.00001-0.00005)
- Extremely cheap due to low LUNC value

### Prerequisites
- **CW20 base contract** must be uploaded to Terra Classic
- You need the **CW20 code ID** for Columbus-5
- Verify code ID before deployment

### Configuration Requirements
- **Initials**: 2-3 letters only
- **Birth Year**: Between 1900 and current year
- **Birth Month**: 1-12
- **Birth Day**: 1-31 (valid date)
- **Mnemonic**: 12 or 24 words (BIP39 standard)

### Dependencies
```bash
npm install @terra-money/terra.js
```

Note: Use `terra.js` (original SDK), NOT `feather.js` for Terra Classic.

## Network Configuration

### Terra Classic Columbus-5 (Mainnet)
```typescript
const creator = new TerraClassicBirthdayTokenCreator({
  chainId: 'columbus-5',
  lcdUrl: 'https://columbus-lcd.terra.dev',
  cw20CodeId: 1 // Verify actual code ID
});
```

- **Chain ID**: columbus-5
- **LCD**: https://columbus-lcd.terra.dev
- **Explorer**: https://finder.terra.money/classic
- **Gas Denom**: uluna (this is LUNC, not LUNA)
- **Status**: Post-collapse, community-maintained

## Cost Breakdown

### Terra Classic
| Item | Cost (LUNC) | Cost (USD*) | Notes |
|------|------------|-------------|-------|
| CW20 Instantiation | ~0.1-0.5 | ~$0.00001-0.00005 | Extremely cheap |
| **Total** | **~0.5 LUNC** | **~$0.00005** | Per token deployment |

*Based on ~$0.0001/LUNC

**Why So Cheap?**
- LUNC value crashed 99.9999% from peak
- Was ~$100/LUNA, now ~$0.0001/LUNC
- 6.9 trillion token supply (hyperinflated)
- Low network activity = low gas prices

## Comparison: Terra Classic vs Terra 2.0

| Feature | Terra Classic (LUNC) | Terra 2.0 (LUNA) |
|---------|---------------------|------------------|
| **Launch** | 2019 (original) | May 2022 (post-collapse) |
| **Status** | Post-collapse relic | Active, growing |
| **Supply** | 6.9T LUNC | 1B LUNA |
| **Price** | ~$0.0001 | ~$0.50 |
| **Market Cap** | ~$600M | ~$500M |
| **Ecosystem** | Minimal | Growing |
| **DeFi TVL** | ~$5M | ~$50M |
| **Development** | Community-driven | Terraform Labs |
| **Stablecoin** | USTC (dead) | None |
| **Chain ID** | columbus-5 | phoenix-1 |
| **Recommendation** | ❌ Avoid | ✅ Use this |

## The Death Spiral Explained

### How UST Collapsed

1. **The Peg Mechanism:**
   - UST was algorithmic stablecoin (no real collateral)
   - $1 UST could always be redeemed for $1 of LUNA
   - System relied on arbitrage to maintain peg

2. **The Trigger (May 7, 2022):**
   - Large UST withdrawals from Anchor Protocol
   - UST briefly depegged to $0.98
   - Market panic began

3. **The Death Spiral (May 9-13):**
   - UST fell to $0.60, massive redemptions for LUNA
   - LUNA minted to absorb UST, supply exploded
   - LUNA price crashed, making UST redemptions worthless
   - Positive feedback loop: depeg → mint → crash → more depeg
   - In 5 days: LUNA from $80 → $0.0001, UST from $1 → $0.10

4. **The Aftermath:**
   - Trading halted, exchanges delisted
   - Do Kwon proposals: burn, fork, compensate
   - Community voted to fork: New chain (Terra 2.0), old chain (Terra Classic)
   - Terra Classic continues with hyperinflated supply

### Lessons Learned

- Algorithmic stablecoins without collateral are risky
- Death spirals can happen extremely fast
- Market confidence is fragile
- "Decentralized" doesn't mean "safe"
- Terra 2.0 does NOT have algorithmic stablecoin

## Resources

### Official Terra Classic
- [Terra Classic Community](https://www.terraclassic.community/)
- [Terra Classic Explorer](https://finder.terra.money/classic)
- [Terra Classic Docs](https://classic-docs.terra.money/)

### Development
- [terra.js Documentation](https://classic-docs.terra.money/docs/develop/sdks/terra-js/)
- [CosmWasm Docs](https://docs.cosmwasm.com/)
- [CW20 Specification](https://github.com/CosmWasm/cw-plus/tree/main/packages/cw20)

### Historical Context
- [Terra Collapse Timeline](https://www.coindesk.com/learn/the-fall-of-terra-a-timeline-of-the-meteoric-rise-and-crash-of-ust-and-luna/)
- [Do Kwon Arrest News](https://www.bloomberg.com/news/articles/2023-03-23/fugitive-do-kwon-arrested-in-montenegro-on-forged-passport)
- [UST Depeg Analysis](https://www.paradigm.xyz/2022/05/unstable)

### Terra 2.0 (Recommended)
- [Terra 2.0 Website](https://www.terra.money/)
- [Terra 2.0 Docs](https://docs.terra.money/)
- **Use `/LUNA.Terra/` implementation instead**

## Security Best Practices

1. **Mnemonic Management**
   - Never hardcode mnemonics
   - Use environment variables
   - Consider hardware wallets
   - Encrypt mnemonics at rest

2. **Network Verification**
   - Double-check you're on Terra Classic if intended
   - Easy to confuse with Terra 2.0
   - Different chain IDs (columbus-5 vs phoenix-1)

3. **Code ID Verification**
   - Verify CW20 code ID is legitimate
   - Check code hash matches expected
   - Use official CW20 base when possible

4. **Risk Assessment**
   - Understand Terra Classic limitations
   - Plan for low liquidity
   - Consider migration to Terra 2.0

## Troubleshooting

### "Chain not found" Error
- Terra Classic uses deprecated `terra.js` library
- Modern SDKs may not support columbus-5
- Stick with `@terra-money/terra.js` v2 or earlier

### "Insufficient LUNC balance" Error
- Get LUNC from exchanges that still list it
- Binance, KuCoin, OKX still support LUNC
- Extremely cheap (~$0.0001 each)

### Transaction Stuck/Failed
- Network activity is low but functional
- May take longer than Terra 2.0
- Check Finder for status

### No Response from LCD
- Public LCDs may be unreliable
- Consider running your own Terra Classic node
- Or use alternative LCD: https://lcd.terra-classic.dev

## Examples

### Complete Example

```typescript
import { TerraClassicBirthdayTokenCreator } from './LUNC.TerraClassic.token.birthday';

async function deployOnTerraClassic() {
  console.log('\n⚠️⚠️⚠️ WARNING ⚠️⚠️⚠️');
  console.log('You are deploying on Terra Classic (post-collapse chain)');
  console.log('Consider using Terra 2.0 instead unless you have specific reasons\n');

  try {
    const creator = new TerraClassicBirthdayTokenCreator({
      cw20CodeId: 1234 // Replace with verified code ID
    });

    const mnemonic = process.env.TERRA_CLASSIC_MNEMONIC!;

    // Check balance
    const walletInfo = await creator.checkWalletBalance(mnemonic);
    console.log(`Address: ${walletInfo.address}`);
    console.log(`Balance: ${walletInfo.balanceLUNC} LUNC`);
    
    if (!walletInfo.hasEnoughBalance) {
      throw new Error(`Need 1 LUNC, have ${walletInfo.balanceLUNC} LUNC`);
    }

    // Deploy token
    const result = await creator.deployToken(mnemonic, {
      initials: "CS",
      birthYear: 1985,
      birthMonth: 6,
      birthDay: 15,
      fullName: "Corey Stedman"
    });

    console.log('\n✅ Token deployed on Terra Classic');
    console.log(`Token: ${result.tickerSymbol}`);
    console.log(`Contract: ${result.contractAddress}`);
    console.log(`View: ${result.explorerLink}`);
    console.log('\n⚠️  Remember: This is on Terra Classic, not Terra 2.0');

    return result;
  } catch (error) {
    console.error('❌ Error:', error);
    throw error;
  }
}

deployOnTerraClassic();
```

## Migration to Terra 2.0

If you created tokens on Terra Classic and want to migrate:

1. **No Automatic Bridge** - Terra Classic and Terra 2.0 are separate chains
2. **Manual Process** - Would need to:
   - Burn tokens on Terra Classic
   - Manually recreate on Terra 2.0
   - No value preservation (different tokens)
3. **Recommendation** - Deploy fresh on Terra 2.0 instead

## Final Warning

**Terra Classic is a cautionary tale in crypto history:**
- Largest algorithmic stablecoin failure ever
- $40B+ destroyed in days
- Thousands of people lost life savings
- Lawsuits, arrests, regulatory scrutiny
- Ecosystem never recovered

**DO NOT:**
- Expect Terra Classic ecosystem to revive
- Treat LUNC as a serious investment
- Assume tokens will have liquidity
- Trust without verification

**DO:**
- Use Terra 2.0 (LUNA) for new projects
- Understand the history and risks
- Only use Terra Classic if absolutely necessary
- Keep expectations very low

**For production use, deploy on Terra 2.0:**
```typescript
import { TerraBirthdayTokenCreator } from '../LUNA.Terra';
const creator = new TerraBirthdayTokenCreator({ network: 'mainnet' });
```

Terra Classic exists as a historical artifact and community-driven legacy chain. For active development and a healthy ecosystem, **use Terra 2.0**.
