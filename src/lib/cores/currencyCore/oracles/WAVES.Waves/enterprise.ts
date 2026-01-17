// Waves Enterprise Oracle Service - Enterprise-Grade Oracle
// Type: Enterprise-Grade Hybrid Blockchain Oracle
// Blockchain: Waves Enterprise (separate from Waves Protocol)

export const enterpriseOracle = {
  name: "Waves Enterprise Oracle Service",
  blockchain: "Waves Enterprise",
  type: "Enterprise-Grade Hybrid Blockchain Oracle",
  description: "Waves Enterprise provides an enterprise-grade oracle service on a hybrid blockchain infrastructure for permissioned systems. Enables reliable and secure delivery of data from heterogeneous sources for smart contracts and business processes in private/permissioned blockchain networks.",
  
  url: "https://wavesenterprise.com/",
  docs: "https://docs.wavesenterprise.com/",
  oracleService: "https://wavesenterprise.com/products-and-services/oracles",
  
  api: {
    enterpriseNode: "Custom enterprise node endpoints",
    restAPI: "Enterprise-specific REST API",
    dataOracle: "Data oracle service endpoints",
    documentation: "https://docs.wavesenterprise.com/",
    customIntegration: "Requires enterprise setup and configuration",
  },
  
  sdk: {
    npm: "@wavesenterprise/js-sdk",
    installation: "npm install @wavesenterprise/js-sdk",
    documentation: "https://docs.wavesenterprise.com/",
    github: "https://github.com/waves-enterprise/js-sdk",
    features: [
      "Enterprise-grade reliability",
      "Hybrid blockchain infrastructure",
      "Secure data delivery",
      "Heterogeneous data sources",
      "Permissioned network support",
    ],
  },
  
  integration: {
    example: `
// Waves Enterprise Oracle Integration Example
// Note: Requires enterprise setup and configuration

import { Transactions, Blocks, WavesEnterprise } from '@wavesenterprise/js-sdk';

// Enterprise node configuration
const nodeUrl = 'https://your-enterprise-node.com'; // Replace with your node
const apiKey = 'YOUR_API_KEY'; // Enterprise API key

// ============================================================================
// WAVES ENTERPRISE ORACLE INTEGRATION
// ============================================================================

/**
 * Initialize Waves Enterprise connection
 */
function initializeWavesEnterprise(nodeUrl: string, apiKey: string) {
  const we = new WavesEnterprise({
    nodeUrl: nodeUrl,
    networkByte: 'W', // Or your custom network byte
    apiKey: apiKey
  });

  return we;
}

/**
 * Read oracle data from Waves Enterprise node
 */
async function readEnterpriseOracleData(
  we: any,
  oracleAddress: string,
  dataKey: string
): Promise<any> {
  try {
    const response = await we.API.Node.v1.addresses.data(
      oracleAddress,
      dataKey
    );

    console.log(\`Oracle data for key "\${dataKey}":\`, response);
    return response;
  } catch (error) {
    console.error('Error reading enterprise oracle data:', error);
    throw error;
  }
}

/**
 * Publish oracle data to Waves Enterprise
 */
async function publishEnterpriseOracleData(
  we: any,
  seed: string,
  dataEntries: Array<{ key: string; value: any }>
): Promise<string> {
  try {
    // Create data transaction
    const tx = Transactions.Data.V1({
      data: dataEntries.map(entry => ({
        key: entry.key,
        type: typeof entry.value === 'number' ? 'integer' : 
              typeof entry.value === 'boolean' ? 'boolean' : 'string',
        value: entry.value
      })),
      senderPublicKey: we.getSenderPublicKey(seed),
      timestamp: Date.now(),
      fee: 100000 // 0.001 WEST
    });

    // Sign transaction
    const signedTx = Transactions.sign(tx, seed);

    // Broadcast to network
    const result = await we.API.Node.v1.transactions.broadcast(signedTx);

    console.log('Enterprise oracle data published:', result.id);
    return result.id;
  } catch (error) {
    console.error('Error publishing enterprise oracle data:', error);
    throw error;
  }
}

/**
 * Query data from external API and publish to oracle
 */
async function updateOracleFromExternalAPI(
  we: any,
  seed: string,
  apiUrl: string,
  dataKey: string
): Promise<string> {
  try {
    // Fetch data from external API
    const response = await fetch(apiUrl);
    const data = await response.json();

    // Publish to blockchain
    const txId = await publishEnterpriseOracleData(we, seed, [
      { key: dataKey, value: data.value },
      { key: \`\${dataKey}_updated\`, value: Date.now() }
    ]);

    console.log(\`Updated oracle with data from \${apiUrl}\`);
    return txId;
  } catch (error) {
    console.error('Error updating oracle from external API:', error);
    throw error;
  }
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

// Example 1: Initialize connection
const we = initializeWavesEnterprise(nodeUrl, apiKey);

// Example 2: Read oracle data
readEnterpriseOracleData(we, 'YOUR_ORACLE_ADDRESS', 'price_BTC')
  .then(data => console.log('BTC Price:', data))
  .catch(console.error);

// Example 3: Publish oracle data (requires seed phrase)
// publishEnterpriseOracleData(we, 'YOUR_SEED', [
//   { key: 'BTC_USD', value: 42500 },
//   { key: 'ETH_USD', value: 2800 },
//   { key: 'updated', value: Date.now() }
// ]).then(txId => console.log('Published TX:', txId));

// Example 4: Update oracle from external API
// updateOracleFromExternalAPI(
//   we,
//   'YOUR_SEED',
//   'https://api.example.com/price/BTC',
//   'BTC_USD'
// ).then(txId => console.log('Updated oracle:', txId));

// ============================================================================
// NOTES
// ============================================================================

// 1. Waves Enterprise requires enterprise setup and configuration
// 2. Contact Waves Enterprise for access to enterprise nodes
// 3. Different network byte than public Waves (usually 'W' or custom)
// 4. Suitable for private/permissioned blockchain networks
// 5. Provides enterprise-grade reliability and support
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/wavesenterprise",
    telegram: "https://t.me/wavesenterprise",
    linkedin: "https://www.linkedin.com/company/waves-enterprise/",
    medium: "https://medium.com/waves-enterprise",
    github: "https://github.com/waves-enterprise",
  },
  
  features: {
    enterpriseGrade: true,
    hybridBlockchain: true,
    permissioned: true,
    secureDataDelivery: true,
    heterogeneousSources: true,
    professionalSupport: true,
    customIntegration: true,
    privateNetworks: true,
  },
  
  useCases: [
    "Private/permissioned blockchain networks",
    "Enterprise DeFi applications",
    "Supply chain management",
    "IoT data integration",
    "Payment verification systems",
    "Cross-system data synchronization",
    "Regulatory compliance systems",
  ],
  
  dataFeedLaunched: "2018",
  
  mainFeatures: {
    dataOracle: "Enables external data delivery to smart contracts",
    hybridModel: "Combines public and private blockchain benefits",
    heterogeneousSources: "Process data from multiple diverse sources",
    complexLogic: "Support for complex business logic in smart contracts",
    enterpriseSupport: "Professional support and SLAs",
  },
  
  notes: [
    "Separate product from Waves Protocol (public blockchain)",
    "Designed for enterprise and permissioned networks",
    "Requires enterprise setup and configuration",
    "Professional support and SLAs available",
    "Launched oracle service on mainnet in 2018",
    "Enables complex business logic in smart contracts",
    "Suitable for supply chain, IoT, payments, and compliance",
    "Hybrid blockchain model (public + private benefits)",
    "Contact Waves Enterprise for pricing and access",
    "More centralized but higher reliability guarantees",
  ],
  
  resources: {
    website: "https://wavesenterprise.com/",
    documentation: "https://docs.wavesenterprise.com/",
    oracleService: "https://wavesenterprise.com/products-and-services/oracles",
    github: "https://github.com/waves-enterprise",
    blog: "https://medium.com/waves-enterprise",
    contact: "https://wavesenterprise.com/contact",
  },
  
  comparisonWithPublicWaves: {
    publicWaves: {
      type: "Public blockchain",
      permissionless: true,
      decentralized: "Fully decentralized",
      useCases: "DeFi, NFTs, public dApps",
    },
    wavesEnterprise: {
      type: "Hybrid blockchain",
      permissioned: true,
      decentralized: "Controlled decentralization",
      useCases: "Enterprise systems, supply chain, compliance",
    },
  },
};

