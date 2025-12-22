// Neutrino Oracle - DeFi Protocol Oracle on Waves
// Type: DeFi Protocol Oracle
// Blockchain: Waves (WAVES)

export const neutrinoOracle = {
  name: "Neutrino Protocol",
  blockchain: "Waves (WAVES)",
  type: "DeFi Protocol Oracle",
  description: "Neutrino is an algorithmic stablecoin protocol on Waves that issues USDN (Neutrino USD) backed by WAVES. The protocol stores asset prices, collateralization ratios, and other critical data in its smart contract state, making it a reliable oracle for stablecoin and DeFi applications.",
  
  url: "https://neutrino.at/",
  docs: "https://docs.neutrino.at/",
  app: "https://app.neutrino.at/",
  
  api: {
    oracleContract: "3PC9BfRwJWWiw48yoa4Ap6bSqc9c4xUUR5m",
    nodeAPI: "https://nodes.wavesnodes.com",
    readData: "https://nodes.wavesnodes.com/addresses/data/3PC9BfRwJWWiw48yoa4Ap6bSqc9c4xUUR5m/{key}",
    protocolAPI: "https://neutrino.at/api",
    documentation: "https://docs.neutrino.at/",
  },
  
  sdk: {
    npm: "@waves/waves-transactions",
    installation: "npm install @waves/waves-transactions @waves/ts-lib-crypto",
    documentation: "https://docs.neutrino.at/",
    github: "https://github.com/waves-exchange/neutrino-contract",
    features: [
      "Asset price feeds",
      "USDN stablecoin data",
      "NSBT governance token data",
      "Collateralization ratios",
      "dApp state storage",
    ],
  },
  
  integration: {
    example: `
// Neutrino Oracle Integration Example
import fetch from 'node-fetch';

const NEUTRINO_ORACLE = '3PC9BfRwJWWiw48yoa4Ap6bSqc9c4xUUR5m';
const NODE_URL = 'https://nodes.wavesnodes.com';
const NEUTRINO_API = 'https://neutrino.at/api';

// ============================================================================
// QUERY NEUTRINO ORACLE DATA
// ============================================================================

/**
 * Get price from Neutrino oracle contract
 */
async function getNeutrinoPrice(assetSymbol: string): Promise<number> {
  try {
    // Try common key patterns for Neutrino
    const keyPatterns = [
      \`\${assetSymbol}_USD\`,
      \`price_\${assetSymbol}\`,
      \`\${assetSymbol}\`,
      \`rate_\${assetSymbol}\`,
    ];

    for (const key of keyPatterns) {
      try {
        const response = await fetch(
          \`\${NODE_URL}/addresses/data/\${NEUTRINO_ORACLE}/\${key}\`
        );

        if (response.ok) {
          const data = await response.json();
          const price = Number(data.value);
          console.log(\`\${assetSymbol} Price from Neutrino: $\${price}\`);
          return price;
        }
      } catch (e) {
        continue;
      }
    }

    throw new Error(\`Price not found for \${assetSymbol} in Neutrino oracle\`);
  } catch (error) {
    console.error('Error fetching Neutrino price:', error);
    throw error;
  }
}

/**
 * Get WAVES price from Neutrino
 */
async function getWavesPrice(): Promise<number> {
  try {
    const response = await fetch(
      \`\${NODE_URL}/addresses/data/\${NEUTRINO_ORACLE}/price_WAVES\`
    );

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: Failed to fetch WAVES price\`);
    }

    const data = await response.json();
    const price = Number(data.value) / 1e6; // Neutrino uses 6 decimals
    console.log(\`WAVES Price from Neutrino: $\${price}\`);
    return price;
  } catch (error) {
    console.error('Error fetching WAVES price from Neutrino:', error);
    throw error;
  }
}

/**
 * Get collateralization ratio
 */
async function getCollateralizationRatio(): Promise<number> {
  try {
    const response = await fetch(
      \`\${NODE_URL}/addresses/data/\${NEUTRINO_ORACLE}/collateralization_ratio\`
    );

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: Failed to fetch ratio\`);
    }

    const data = await response.json();
    const ratio = Number(data.value) / 100; // Convert to percentage
    console.log(\`Collateralization Ratio: \${ratio}%\`);
    return ratio;
  } catch (error) {
    console.error('Error fetching collateralization ratio:', error);
    throw error;
  }
}

/**
 * Get all oracle data from Neutrino contract
 */
async function getNeutrinoOracleData(): Promise<any> {
  try {
    const response = await fetch(
      \`\${NODE_URL}/addresses/data/\${NEUTRINO_ORACLE}?limit=100\`
    );

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: Failed to fetch oracle data\`);
    }

    const oracleData = await response.json();
    console.log('Neutrino Oracle Data:', oracleData);
    return oracleData;
  } catch (error) {
    console.error('Error fetching Neutrino oracle data:', error);
    throw error;
  }
}

/**
 * Get protocol statistics
 */
async function getNeutrinoStats(): Promise<any> {
  try {
    const response = await fetch(\`\${NEUTRINO_API}/stats\`);

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: Failed to fetch stats\`);
    }

    const stats = await response.json();
    console.log('Neutrino Stats:', stats);
    return stats;
  } catch (error) {
    console.error('Error fetching Neutrino stats:', error);
    throw error;
  }
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

// Example 1: Get WAVES price
getWavesPrice()
  .then(price => console.log('WAVES Price:', price))
  .catch(console.error);

// Example 2: Get collateralization ratio
getCollateralizationRatio()
  .then(ratio => console.log('Collateralization Ratio:', ratio))
  .catch(console.error);

// Example 3: Get all oracle data
getNeutrinoOracleData()
  .then(data => console.log('All Oracle Data:', data))
  .catch(console.error);

// Example 4: Get protocol statistics
getNeutrinoStats()
  .then(stats => console.log('Protocol Stats:', stats))
  .catch(console.error);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/neutrino_proto",
    telegram: "https://t.me/neutrino_protocol_news",
    discord: "https://discord.gg/neutrino",
    medium: "https://medium.com/neutrinoprotocol",
    github: "https://github.com/waves-exchange/neutrino-contract",
  },
  
  features: {
    stablecoin: true,
    priceFeeds: true,
    collateralizationData: true,
    governanceToken: true,
    nativeWaves: true,
    dAppState: true,
    algorithmic: true,
    overcollateralized: true,
  },
  
  tokens: {
    usdn: {
      name: "USDN (Neutrino USD)",
      type: "Algorithmic stablecoin",
      peg: "1 USD",
      backed: "WAVES collateral",
    },
    nsbt: {
      name: "NSBT (Neutrino System Base Token)",
      type: "Governance token",
      purpose: "Recapitalization and governance",
    },
  },
  
  supportedData: [
    "WAVES price (USD)",
    "USDN stability metrics",
    "NSBT token data",
    "Collateralization ratio",
    "Reserve balance",
    "Deficit/surplus information",
  ],
  
  notes: [
    "Leading stablecoin protocol on Waves",
    "USDN is algorithmic stablecoin pegged to USD",
    "Backed by WAVES with overcollateralization",
    "NSBT token for governance and recapitalization",
    "Stores critical price and collateralization data",
    "Uses 6 decimal precision for prices",
    "Contract address: 3PC9BfRwJWWiw48yoa4Ap6bSqc9c4xUUR5m",
    "Integrated with major Waves DeFi protocols",
    "Provides reliable oracle data for stablecoin systems",
    "Important for lending, borrowing, and derivatives",
  ],
  
  resources: {
    website: "https://neutrino.at/",
    documentation: "https://docs.neutrino.at/",
    app: "https://app.neutrino.at/",
    github: "https://github.com/waves-exchange/neutrino-contract",
    blog: "https://medium.com/neutrinoprotocol",
    analytics: "https://neutrino.at/stats",
  },
};

