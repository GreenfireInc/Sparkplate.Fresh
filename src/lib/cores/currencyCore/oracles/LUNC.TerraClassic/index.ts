// Terra Classic (LUNC) Oracle Module - Comprehensive Price Feed Integrations
// Original Terra blockchain (columbus-5) with native oracle module and community-driven revival

/**
 * Terra Classic (LUNC) Oracle Integration Hub
 * 
 * This module provides comprehensive oracle integrations for Terra Classic (LUNC),
 * the original Terra blockchain (columbus-5) that experienced a catastrophic collapse
 * in May 2022 when its algorithmic stablecoin UST lost its peg. The chain continues
 * to operate as Terra Classic with a community-driven revival effort.
 * 
 * Available Oracles:
 * 
 * 1. **Terra Classic Oracle Module** - Native on-chain oracle
 *    - Best for: On-chain dApps, validator operations, native integrations
 *    - Update frequency: ~6 seconds (block time)
 *    - Mechanism: Validator consensus (weighted median)
 * 
 * 2. **Pyth Network** - High-frequency oracle (400ms updates)
 *    - Best for: Real-time trading, volatility tracking, high-frequency applications
 *    - Update frequency: Sub-second (400ms)
 *    - Data sources: 70+ publishers (major exchanges)
 * 
 * 3. **Band Protocol** - Native Cosmos SDK oracle
 *    - Best for: DeFi protocols, custom feeds, community projects
 *    - Update frequency: Minutes (validator voting periods)
 *    - Integration: CosmWasm smart contracts
 * 
 * 4. **DIA** - Open-source oracle with transparent methodologies
 *    - Best for: Auditable feeds, historical analysis, collapse research
 *    - Update frequency: 2-5 minutes
 *    - Data sources: 80+ exchanges (CEX + DEX)
 * 
 * 5. **CoinGecko** - Comprehensive market data aggregator
 *    - Best for: Market analytics, historical data, community sentiment
 *    - Free tier: 10-50 calls/min
 *    - Data: 600+ exchanges, market cap, volume
 * 
 * 6. **Mintscan** - Premier Cosmos ecosystem explorer
 *    - Best for: Blockchain data, transaction tracking, validator stats
 *    - Free tier: 2 req/s, 10k daily calls
 *    - Features: Price, balance, transaction, validator data
 * 
 * 7. **TerraSwap Classic** - Primary DEX on Terra Classic
 *    - Best for: DEX prices, liquidity data, on-chain price discovery
 *    - Features: AMM pools, direct smart contract queries
 *    - Real-time: Pool-based pricing
 * 
 * Terra Classic Blockchain Characteristics:
 * - Network: Cosmos SDK (columbus-5 chain ID for Terra Classic)
 * - Consensus: Tendermint PoS with validators
 * - Address Format: Bech32 with "terra" prefix (same as Terra 2.0)
 * - Block Time: ~6 seconds
 * - Derivation Path: m/44'/330'/0'/0/0 (BIP44)
 * - Supply: ~6.9T LUNC (massively inflated post-collapse from ~350M)
 * 
 * Historical Context:
 * Terra Classic experienced a catastrophic collapse in May 2022 when its algorithmic
 * stablecoin UST lost its peg, causing LUNC to drop from $119 ATH to fractions of a
 * cent and supply to inflate from ~350M to 6.9T tokens. The chain continues as Terra
 * Classic with community-driven revival efforts.
 * 
 * Integration Recommendations:
 * 
 * For Real-Time Trading:
 *   → Use Pyth Network for sub-second price updates
 *   → Fallback to TerraSwap for DEX-based pricing
 * 
 * For Community Projects:
 *   → Primary: Terra Classic Oracle Module (on-chain consensus)
 *   → Secondary: Band Protocol (Cosmos integration)
 * 
 * For Analytics & Research:
 *   → Use CoinGecko for historical data and market trends
 *   → Use DIA for collapse period analysis
 *   → Use Mintscan for blockchain data
 * 
 * For Transparency & Auditability:
 *   → Use DIA for open-source feeds
 *   → Use Terra Classic Oracle Module for on-chain verification
 * 
 * Example Usage:
 * ```typescript
 * import { pythOracle } from './LUNC.TerraClassic/pyth';
 * import { terraClassicOracleModule } from './LUNC.TerraClassic/terraclassicoracle';
 * import { coinGeckoOracle } from './LUNC.TerraClassic/coingecko';
 * 
 * // High-frequency price tracking
 * const pythPrice = await pythOracle.integration.getPythLUNCPrice();
 * 
 * // On-chain oracle data
 * const oracleRate = await terraClassicOracleModule.integration.getLUNCExchangeRate();
 * 
 * // Market data with collapse history
 * const marketData = await coinGeckoOracle.integration.getLUNCMarketData();
 * ```
 */

// Export all Terra Classic oracle modules
export { pythOracle } from './pyth';
export { bandOracle } from './band';
export { diaOracle as terraClassicDiaOracle } from './dia';
export { terraClassicOracleModule } from './terraclassicoracle';
export { coinGeckoOracle } from './coingecko';
export { mintscanOracle } from './mintscan';
export { terraswapOracle } from './terraswap';

/**
 * Terra Classic Oracle Metadata
 */
export const terraClassicOracleMetadata = {
  blockchain: 'Terra Classic (LUNC)',
  symbol: 'LUNC',
  chainId: 'columbus-5',
  consensus: 'Tendermint PoS',
  framework: 'Cosmos SDK',
  
  // Native characteristics
  addressPrefix: 'terra',
  blockTime: '~6 seconds',
  derivationPath: "m/44'/330'/0'/0/0",
  
  // Collapse information
  collapseDate: '2022-05-09',
  preCollapseSupply: '~350M LUNA',
  postCollapseSupply: '~6.9T LUNC',
  allTimeHigh: 119.18,
  allTimeLow: 0.00000099,
  
  // Available oracle types
  oracleTypes: {
    highFrequency: ['Pyth Network'],
    native: ['Terra Classic Oracle Module', 'Band Protocol'],
    transparent: ['DIA'],
    dex: ['TerraSwap Classic'],
    explorer: ['Mintscan'],
    marketData: ['CoinGecko'],
  },
  
  // Recommended oracle combinations
  recommendations: {
    trading: ['Pyth Network', 'TerraSwap Classic'],
    community: ['Terra Classic Oracle Module', 'Band Protocol'],
    analytics: ['CoinGecko', 'DIA'],
    research: ['DIA', 'CoinGecko'],
    blockchain: ['Mintscan', 'Terra Classic Oracle Module'],
  },
  
  // Integration complexity (1-5, 5 being most complex)
  complexity: {
    'Pyth Network': 2,
    'Band Protocol': 3,
    'DIA': 1,
    'Terra Classic Oracle Module': 3,
    'CoinGecko': 1,
    'Mintscan': 2,
    'TerraSwap Classic': 4,
  },
  
  // Update frequencies
  updateFrequency: {
    'Pyth Network': '400ms',
    'Band Protocol': '2-5 minutes',
    'DIA': '2-5 minutes',
    'Terra Classic Oracle Module': '~6 seconds (block time)',
    'CoinGecko': '1-2 minutes',
    'Mintscan': '1-2 minutes',
    'TerraSwap Classic': 'Real-time (per block)',
  },
  
  // Ecosystem links
  ecosystem: {
    website: 'https://www.terraclassic.community/',
    documentation: 'https://classic-docs.terra.money/',
    github: 'https://github.com/classic-terra',
    discord: 'https://discord.gg/terraclassic',
    twitter: 'https://twitter.com/TerraClassic',
    explorer: 'https://finder.terra.money/classic',
    lcd: 'https://fcd.terra.money',
  },
  
  // Terra Classic-specific notes
  notes: [
    'Original Terra blockchain (pre-collapse)',
    'Chain ID: columbus-5',
    'Survived May 2022 UST de-peg collapse',
    'Community-driven revival effort ongoing',
    'Massive supply inflation (350M to 6.9T)',
    'USTC is the failed algorithmic stablecoin',
    'TerraSwap is primary DEX',
    'Same address format as Terra 2.0 ("terra" prefix)',
    'IBC support for cross-chain assets',
    'CosmWasm smart contracts (Rust/Go)',
  ],
  
  // Warning for historical context
  historicalNote: `
    Terra Classic (LUNC) is the original Terra blockchain that experienced a
    catastrophic collapse in May 2022. The algorithmic stablecoin UST lost its
    peg, causing a death spiral that dropped LUNA from $119 to fractions of a cent
    and inflated supply from ~350M to 6.9T tokens. The chain was forked to create
    Terra 2.0 (LUNA), while the original chain continues as Terra Classic (LUNC)
    with a community-driven revival effort.
    
    When integrating price data:
    - Use "terra-luna-classic" or "LUNC" identifier for Terra Classic
    - Use "terra-luna-2" or "LUNA" for Terra 2.0
    - Ensure you're querying the correct chain (columbus-5 for Classic)
    - Be aware of extreme volatility and reduced liquidity post-collapse
    - Historical data shows the May 2022 collapse period
  `,
};

/**
 * Quick Start Guide
 */
export const terraClassicOracleQuickStart = `
# Terra Classic (LUNC) Oracle Quick Start

## Installation
\`\`\`bash
npm install axios @terra-money/terra.js
\`\`\`

## Basic Usage

### 1. Get LUNC Price (CoinGecko - Simplest)
\`\`\`typescript
import axios from 'axios';

async function getLUNCPrice() {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/simple/price',
    {
      params: {
        ids: 'terra-luna-classic',
        vs_currencies: 'usd',
      },
    }
  );
  
  const price = response.data['terra-luna-classic'].usd;
  console.log(\`LUNC Price: $\${price.toFixed(8)}\`);
  return price;
}
\`\`\`

### 2. Query Terra Classic Oracle Module (Native)
\`\`\`typescript
import axios from 'axios';

async function getLUNCOracleRate() {
  const response = await axios.get(
    'https://fcd.terra.money/terra/oracle/v1beta1/denoms/exchange_rates'
  );
  
  const rates = response.data.exchange_rates;
  console.log('Terra Classic Oracle Rates:', rates);
  return rates;
}
\`\`\`

### 3. Query TerraSwap Pool (DEX Price)
\`\`\`typescript
import { LCDClient } from '@terra-money/terra.js';

const terra = new LCDClient({
  URL: 'https://fcd.terra.money',
  chainID: 'columbus-5',
});

async function queryTerraSwapPool(poolAddress: string) {
  const poolInfo = await terra.wasm.contractQuery(poolAddress, {
    pool: {},
  });
  console.log('TerraSwap Pool Info:', poolInfo);
  return poolInfo;
}
\`\`\`

## Oracle Selection Guide

| Use Case | Recommended Oracle | Why? |
|----------|-------------------|------|
| Real-time trading | Pyth Network | 400ms updates |
| Community projects | Terra Classic Oracle Module | Native on-chain |
| Market analytics | CoinGecko | Historical data, collapse period |
| On-chain dApps | Terra Classic Oracle Module | Validator consensus |
| DEX integration | TerraSwap Classic | Direct price discovery |
| Blockchain data | Mintscan | Comprehensive explorer |
| Historical research | DIA | Transparent, collapse analysis |

## Rate Limits

- **Pyth**: No limit (free)
- **CoinGecko**: 10-50 calls/min (free tier)
- **Mintscan**: 2 req/s, 10k daily (free tier)
- **DIA**: No authentication required
- **Band Protocol**: Public RPC limits
- **Terra Classic Oracle Module**: Public LCD limits
- **TerraSwap**: Contract query limits

## Important Notes

⚠️ **Collapse Context**: Terra Classic experienced a catastrophic collapse in May 2022.
The token lost over 99.99% of its value when UST lost its peg. Supply inflated from
~350M to 6.9T tokens. Be aware of extreme volatility and reduced liquidity.

✅ **Chain Identification**: Make sure you're using the correct identifiers:
- Terra Classic: "terra-luna-classic", "LUNC", columbus-5
- Terra 2.0: "terra-luna-2", "LUNA", phoenix-1

## Support

For issues or questions:
- Terra Classic Discord: https://discord.gg/terraclassic
- Terra Classic Docs: https://classic-docs.terra.money/
- Community: https://www.terraclassic.community/
`;

export default {
  metadata: terraClassicOracleMetadata,
  quickStart: terraClassicOracleQuickStart,
};

