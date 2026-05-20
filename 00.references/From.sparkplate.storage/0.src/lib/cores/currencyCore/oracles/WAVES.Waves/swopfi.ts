// Swop.fi Oracle - DEX Oracle on Waves
// Type: DeFi DEX Oracle
// Blockchain: Waves (WAVES)

export const swopfiOracle = {
  name: "Swop.fi",
  blockchain: "Waves (WAVES)",
  type: "DeFi DEX Oracle",
  description: "Swop.fi is an automated market maker (AMM) DEX on Waves. The protocol's smart contracts store real-time price data in their state, which can be read by other contracts and dApps. Provides native Waves DEX price feeds from liquidity pools.",
  
  url: "https://swop.fi/",
  docs: "https://docs.swop.fi/",
  app: "https://swop.fi/",
  
  api: {
    oracleContract: "3PJaDyprveVP7agoN4w3CwvjDoMoH5meDpP",
    nodeAPI: "https://nodes.wavesnodes.com",
    readData: "https://nodes.wavesnodes.com/addresses/data/3PJaDyprveVP7agoN4w3CwvjDoMoH5meDpP/{key}",
    poolsAPI: "https://swop.fi/api/v1/pools",
    statsAPI: "https://swop.fi/api/v1/stats",
    documentation: "https://docs.swop.fi/",
  },
  
  sdk: {
    npm: "@waves/waves-transactions",
    installation: "npm install @waves/waves-transactions @waves/ts-lib-crypto",
    documentation: "https://docs.swop.fi/",
    github: "https://github.com/swopfi",
    features: [
      "Real-time DEX prices",
      "Liquidity pool data",
      "AMM price calculations",
      "Native Waves oracle",
      "dApp state storage",
    ],
  },
  
  integration: {
    example: `
// Swop.fi Oracle Integration Example
import fetch from 'node-fetch';

const SWOPFI_ORACLE = '3PJaDyprveVP7agoN4w3CwvjDoMoH5meDpP';
const NODE_URL = 'https://nodes.wavesnodes.com';
const SWOPFI_API = 'https://swop.fi/api/v1';

// ============================================================================
// QUERY SWOP.FI ORACLE DATA
// ============================================================================

/**
 * Get price from Swop.fi oracle contract
 */
async function getSwopfiPrice(assetSymbol: string): Promise<number> {
  try {
    // Try common key patterns for Swop.fi
    const keyPatterns = [
      \`\${assetSymbol}_USD\`,
      \`price_\${assetSymbol}\`,
      \`\${assetSymbol}_price\`,
    ];

    for (const key of keyPatterns) {
      try {
        const response = await fetch(
          \`\${NODE_URL}/addresses/data/\${SWOPFI_ORACLE}/\${key}\`
        );

        if (response.ok) {
          const data = await response.json();
          const price = Number(data.value);
          console.log(\`\${assetSymbol} Price from Swop.fi: $\${price}\`);
          return price;
        }
      } catch (e) {
        continue;
      }
    }

    throw new Error(\`Price not found for \${assetSymbol} in Swop.fi oracle\`);
  } catch (error) {
    console.error('Error fetching Swop.fi price:', error);
    throw error;
  }
}

/**
 * Get all pools from Swop.fi API
 */
async function getSwopfiPools(): Promise<any> {
  try {
    const response = await fetch(\`\${SWOPFI_API}/pools\`);

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: Failed to fetch pools\`);
    }

    const pools = await response.json();
    console.log('Swop.fi Pools:', pools);
    return pools;
  } catch (error) {
    console.error('Error fetching Swop.fi pools:', error);
    throw error;
  }
}

/**
 * Get Swop.fi statistics
 */
async function getSwopfiStats(): Promise<any> {
  try {
    const response = await fetch(\`\${SWOPFI_API}/stats\`);

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: Failed to fetch stats\`);
    }

    const stats = await response.json();
    console.log('Swop.fi Stats:', stats);
    return stats;
  } catch (error) {
    console.error('Error fetching Swop.fi stats:', error);
    throw error;
  }
}

/**
 * Calculate price from pool reserves (AMM formula)
 */
function calculateAMMPrice(
  reserveA: number,
  reserveB: number
): number {
  // Simple x * y = k formula
  return reserveB / reserveA;
}

/**
 * Get all oracle data from Swop.fi contract
 */
async function getSwopfiOracleData(): Promise<any> {
  try {
    const response = await fetch(
      \`\${NODE_URL}/addresses/data/\${SWOPFI_ORACLE}?limit=100\`
    );

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: Failed to fetch oracle data\`);
    }

    const oracleData = await response.json();
    console.log('Swop.fi Oracle Data:', oracleData);
    return oracleData;
  } catch (error) {
    console.error('Error fetching Swop.fi oracle data:', error);
    throw error;
  }
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

// Example 1: Get WAVES price
getSwopfiPrice('WAVES')
  .then(price => console.log('WAVES Price:', price))
  .catch(console.error);

// Example 2: Get all pools
getSwopfiPools()
  .then(pools => console.log('All Pools:', pools))
  .catch(console.error);

// Example 3: Get Swop.fi statistics
getSwopfiStats()
  .then(stats => console.log('Stats:', stats))
  .catch(console.error);

// Example 4: Get all oracle data
getSwopfiOracleData()
  .then(data => console.log('All Oracle Data:', data))
  .catch(console.error);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/swopfi",
    telegram: "https://t.me/swopfi",
    discord: "https://discord.gg/swopfi",
    medium: "https://medium.com/@swopfi",
    github: "https://github.com/swopfi",
  },
  
  features: {
    realTimePrices: true,
    ammPricing: true,
    liquidityPools: true,
    governance: true,
    nativeWaves: true,
    dAppState: true,
    farmingRewards: true,
    multiAsset: true,
  },
  
  supportedAssets: [
    "WAVES",
    "USDT",
    "USDN",
    "BTC",
    "ETH",
    "SWOP (governance token)",
    "And 50+ other Waves assets",
  ],
  
  poolTypes: [
    "Flat pools (equal weights)",
    "Stableswap pools",
    "Weighted pools",
  ],
  
  notes: [
    "One of the most popular DEXs on Waves",
    "Uses AMM (Automated Market Maker) model",
    "Stores price data in smart contract state",
    "Real-time prices based on liquidity pool ratios",
    "Governance token SWOP for protocol decisions",
    "Low fees: 0.3% per swap",
    "No impermanent loss protection",
    "Provides liquidity mining rewards",
    "Integrated with most Waves DeFi protocols",
    "Contract address: 3PJaDyprveVP7agoN4w3CwvjDoMoH5meDpP",
  ],
  
  resources: {
    website: "https://swop.fi/",
    documentation: "https://docs.swop.fi/",
    app: "https://swop.fi/",
    github: "https://github.com/swopfi",
    blog: "https://medium.com/@swopfi",
    analytics: "https://swop.fi/stats",
  },
};

