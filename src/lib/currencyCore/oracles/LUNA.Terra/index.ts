// Terra (LUNA) Oracle Module - Comprehensive Price Feed Integrations
// Cosmos SDK-based blockchain with native oracle module and DeFi ecosystem

/**
 * Terra (LUNA) Oracle Integration Hub
 * 
 * This module provides comprehensive oracle integrations for Terra (LUNA),
 * the Cosmos SDK-based blockchain with a focus on stablecoins and DeFi.
 * After the 2022 collapse, Terra 2.0 (phoenix-1) emerged as a new chain.
 * 
 * Available Oracles:
 * 
 * 1. **Pyth Network** - High-frequency oracle (400ms updates)
 *    - Best for: Real-time trading, derivatives, high-frequency applications
 *    - Update frequency: Sub-second (400ms)
 *    - Data sources: 70+ publishers (major exchanges)
 * 
 * 2. **Band Protocol** - Native Cosmos SDK oracle
 *    - Best for: DeFi protocols, lending, stablecoins
 *    - Update frequency: Minutes (validator voting periods)
 *    - Integration: CosmWasm smart contracts
 * 
 * 3. **DIA** - Open-source oracle with transparent methodologies
 *    - Best for: Auditable feeds, custom requirements
 *    - Update frequency: 2-5 minutes
 *    - Data sources: 80+ exchanges (CEX + DEX)
 * 
 * 4. **Terra Oracle Module** - Native on-chain oracle
 *    - Best for: Terra-native protocols, governance
 *    - Update frequency: Block time (~6 seconds)
 *    - Mechanism: Validator consensus (weighted median)
 * 
 * 5. **Mintscan** - Premier Cosmos ecosystem explorer
 *    - Best for: Blockchain data, transaction tracking
 *    - Free tier: 2 req/s, 10k daily calls
 *    - Features: Price, balance, transaction, validator data
 * 
 * 6. **Astroport** - Leading Terra DEX with GraphQL API
 *    - Best for: DEX prices, liquidity data, trading volumes
 *    - Features: Multiple AMM types (XYK, Stableswap, PCL)
 *    - Real-time: Pool-based price discovery
 * 
 * 7. **CoinGecko** - Comprehensive market data aggregator
 *    - Best for: Market analytics, historical data, multi-currency
 *    - Free tier: 10-50 calls/min
 *    - Data: 600+ exchanges, market cap, volume
 * 
 * Terra Blockchain Characteristics:
 * - Network: Cosmos SDK (phoenix-1 chain ID for Terra 2.0)
 * - Consensus: Tendermint PoS with ~130 validators
 * - Address Format: Bech32 with "terra" prefix
 * - Block Time: ~6 seconds
 * - Derivation Path: m/44'/330'/0'/0/0 (BIP44)
 * 
 * Integration Recommendations:
 * 
 * For Real-Time Trading:
 *   → Use Pyth Network for sub-second price updates
 *   → Fallback to Astroport for DEX-based pricing
 * 
 * For DeFi Protocols:
 *   → Primary: Band Protocol (native Cosmos integration)
 *   → Secondary: Terra Oracle Module (on-chain consensus)
 * 
 * For Analytics & Reporting:
 *   → Use CoinGecko for historical data and market trends
 *   → Use Mintscan for blockchain data and validator stats
 * 
 * For Transparency & Auditability:
 *   → Use DIA for open-source feeds
 *   → Use Terra Oracle Module for on-chain verification
 * 
 * Example Usage:
 * ```typescript
 * import { pythOracle } from './LUNA.Terra/pyth';
 * import { bandOracle } from './LUNA.Terra/band';
 * import { terraOracleModule } from './LUNA.Terra/terraoracle';
 * 
 * // High-frequency price tracking
 * const pythPrice = await pythOracle.integration.getPythLUNAPrice();
 * 
 * // On-chain oracle data
 * const oracleRate = await terraOracleModule.integration.getLUNAExchangeRate();
 * 
 * // DeFi integration via Band
 * const bandPrice = await bandOracle.integration.getBandLUNAPrice();
 * ```
 */

// Export all Terra oracle modules
export { pythOracle } from './pyth';
export { bandOracle } from './band';
export { diaOracle as terraDiaOracle } from './dia';
export { terraOracleModule } from './terraoracle';
export { mintscanOracle } from './mintscan';
export { astroportOracle } from './astroport';
export { coinGeckoOracle } from './coingecko';

/**
 * Terra Oracle Metadata
 */
export const terraOracleMetadata = {
  blockchain: 'Terra (LUNA)',
  symbol: 'LUNA',
  chainId: 'phoenix-1',
  consensus: 'Tendermint PoS',
  framework: 'Cosmos SDK',
  
  // Native characteristics
  addressPrefix: 'terra',
  blockTime: '~6 seconds',
  derivationPath: "m/44'/330'/0'/0/0",
  
  // Available oracle types
  oracleTypes: {
    highFrequency: ['Pyth Network'],
    native: ['Terra Oracle Module', 'Band Protocol'],
    transparent: ['DIA'],
    dex: ['Astroport'],
    explorer: ['Mintscan'],
    marketData: ['CoinGecko'],
  },
  
  // Recommended oracle combinations
  recommendations: {
    trading: ['Pyth Network', 'Astroport'],
    defi: ['Band Protocol', 'Terra Oracle Module'],
    analytics: ['CoinGecko', 'Mintscan'],
    audit: ['DIA', 'Terra Oracle Module'],
  },
  
  // Integration complexity (1-5, 5 being most complex)
  complexity: {
    'Pyth Network': 2,
    'Band Protocol': 3,
    'DIA': 1,
    'Terra Oracle Module': 3,
    'Mintscan': 2,
    'Astroport': 3,
    'CoinGecko': 1,
  },
  
  // Update frequencies
  updateFrequency: {
    'Pyth Network': '400ms',
    'Band Protocol': '2-5 minutes',
    'DIA': '2-5 minutes',
    'Terra Oracle Module': '~6 seconds (block time)',
    'Mintscan': '1-2 minutes',
    'Astroport': 'Real-time (per block)',
    'CoinGecko': '1-2 minutes',
  },
  
  // Ecosystem links
  ecosystem: {
    website: 'https://www.terra.money/',
    documentation: 'https://docs.terra.money/',
    github: 'https://github.com/terra-money',
    discord: 'https://discord.gg/terra-money',
    twitter: 'https://twitter.com/terra_money',
    explorer: 'https://finder.terra.money/',
    lcd: 'https://phoenix-lcd.terra.dev',
  },
  
  // Terra-specific notes
  notes: [
    'Terra 2.0 (phoenix-1) launched after May 2022 collapse',
    'Native oracle module provides validator-consensus pricing',
    'Band Protocol offers native Cosmos SDK integration',
    'Astroport is the largest DEX with deepest liquidity',
    'Address format uses "terra" prefix (same as Terra Classic)',
    'IBC support for cross-chain asset transfers',
    'CosmWasm smart contracts (Rust/Go)',
  ],
  
  // Warning for historical context
  historicalNote: `
    Terra 2.0 (LUNA) launched in May 2022 after the collapse of Terra Classic (LUNC).
    The original Terra blockchain (now Terra Classic) suffered a catastrophic failure
    when its algorithmic stablecoin UST lost its peg. Terra 2.0 is a new chain without
    algorithmic stablecoins, focusing on general-purpose DeFi applications.
    
    When integrating price data:
    - Use "terra-luna-2" identifier for Terra 2.0 (LUNA)
    - Use "terra-luna" or "terra-luna-classic" for Terra Classic (LUNC)
    - Ensure you're querying the correct chain (phoenix-1 for Terra 2.0)
  `,
};

/**
 * Quick Start Guide
 */
export const terraOracleQuickStart = `
# Terra (LUNA) Oracle Quick Start

## Installation
\`\`\`bash
npm install axios @terra-money/terra.js @apollo/client graphql
\`\`\`

## Basic Usage

### 1. Get LUNA Price (Pyth - Fastest)
\`\`\`typescript
import axios from 'axios';

async function getLUNAPrice() {
  const response = await axios.get(
    'https://hermes.pyth.network/v2/updates/price/latest',
    {
      params: {
        ids: ['0x09b7c7072c57f0e19c5dd1df8e81d96b4c08c58a7c9414e89f422aebcd8a2590'],
      },
    }
  );
  
  const priceData = response.data.parsed[0].price;
  const price = parseFloat(priceData.price) * Math.pow(10, priceData.expo);
  
  console.log(\`LUNA Price: $\${price.toFixed(4)}\`);
  return price;
}
\`\`\`

### 2. Get LUNA Price (CoinGecko - Simplest)
\`\`\`typescript
import axios from 'axios';

async function getLUNAPrice() {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/simple/price',
    {
      params: {
        ids: 'terra-luna-2',
        vs_currencies: 'usd',
      },
    }
  );
  
  const price = response.data['terra-luna-2'].usd;
  console.log(\`LUNA Price: $\${price.toFixed(4)}\`);
  return price;
}
\`\`\`

### 3. Query Terra Oracle Module (Native)
\`\`\`typescript
import { LCDClient } from '@terra-money/terra.js';

const terra = new LCDClient({
  URL: 'https://phoenix-lcd.terra.dev',
  chainID: 'phoenix-1',
});

async function getLUNAOracleRate() {
  const params = await terra.oracle.parameters();
  console.log('Oracle Parameters:', params);
}
\`\`\`

## Oracle Selection Guide

| Use Case | Recommended Oracle | Why? |
|----------|-------------------|------|
| Real-time trading | Pyth Network | 400ms updates |
| DeFi protocols | Band Protocol | Native Cosmos SDK |
| Market analytics | CoinGecko | Historical data |
| On-chain dApps | Terra Oracle Module | Validator consensus |
| DEX integration | Astroport | Deepest liquidity |
| Blockchain data | Mintscan | Comprehensive explorer |

## Rate Limits

- **Pyth**: No limit (free)
- **CoinGecko**: 10-50 calls/min (free tier)
- **Mintscan**: 2 req/s, 10k daily (free tier)
- **DIA**: No authentication required
- **Band Protocol**: Public RPC limits
- **Terra Oracle Module**: Public LCD limits
- **Astroport**: GraphQL rate limits apply

## Support

For issues or questions:
- Terra Discord: https://discord.gg/terra-money
- Terra Docs: https://docs.terra.money/
- Pyth Discord: https://discord.gg/PythNetwork
- Band Protocol Discord: https://discord.com/invite/3t4bsY7
`;

export default {
  metadata: terraOracleMetadata,
  quickStart: terraOracleQuickStart,
};

