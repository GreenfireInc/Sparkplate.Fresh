// Waves Data Oracle - Native Account-Based Oracle on Waves
// Type: Native Account-Based Oracle
// Blockchain: Waves (WAVES)

export const wavesDataOracle = {
  name: "Waves Data Oracle",
  blockchain: "Waves (WAVES)",
  type: "Native Account-Based Oracle",
  description: "Any Waves account can become an oracle by publishing data via data transactions. This is the most decentralized oracle model where data is stored in account data storage on-chain and can be read by any smart contract or dApp.",
  
  url: "https://docs.waves.tech/en/blockchain/oracle",
  docs: "https://docs.waves.tech/en/blockchain/oracle",
  dataTransactionDocs: "https://docs.waves.tech/en/blockchain/transaction-type/data-transaction",
  
  api: {
    nodeRestAPI: "https://nodes.wavesnodes.com",
    readData: "https://nodes.wavesnodes.com/addresses/data/{address}/{key}",
    readAllData: "https://nodes.wavesnodes.com/addresses/data/{address}",
    broadcastTransaction: "https://nodes.wavesnodes.com/transactions/broadcast",
    testnet: "https://nodes-testnet.wavesnodes.com",
    documentation: "https://docs.waves.tech/en/waves-node/node-api",
  },
  
  sdk: {
    npm: "@waves/waves-transactions",
    installation: "npm install @waves/waves-transactions @waves/ts-lib-crypto",
    documentation: "https://wavesplatform.github.io/waves-transactions/index.html",
    github: "https://github.com/wavesplatform/waves-transactions-ts",
    features: [
      "Create data transactions",
      "Sign transactions",
      "Broadcast to blockchain",
      "Full TypeScript support",
      "Account-based data storage",
    ],
  },
  
  knownOracles: {
    swopfi: "3PJaDyprveVP7agoN4w3CwvjDoMoH5meDpP",
    neutrino: "3PC9BfRwJWWiw48yoa4Ap6bSqc9c4xUUR5m",
    description: "Popular dApp-based oracles storing price data in their state",
  },
  
  integration: {
    example: `
// Waves Data Oracle Integration Example
import { data } from '@waves/waves-transactions';
import fetch from 'node-fetch';

const NODE_URL = 'https://nodes.wavesnodes.com';

// ============================================================================
// READ ORACLE DATA
// ============================================================================

/**
 * Read oracle data from a Waves account's data storage
 */
async function readOracleData(
  oracleAccountAddress: string,
  dataKey: string
): Promise<any> {
  try {
    const response = await fetch(
      \`\${NODE_URL}/addresses/data/\${oracleAccountAddress}/\${dataKey}\`
    );

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: Failed to read oracle data\`);
    }

    const oracleData = await response.json();
    console.log(\`Oracle data for key "\${dataKey}":\`, oracleData);

    return oracleData;
  } catch (error) {
    console.error('Error reading oracle data:', error);
    throw error;
  }
}

/**
 * Read all data entries from an oracle account
 */
async function readAllOracleData(
  oracleAccountAddress: string
): Promise<any> {
  try {
    const response = await fetch(
      \`\${NODE_URL}/addresses/data/\${oracleAccountAddress}?limit=100\`
    );

    const allData = await response.json();
    console.log(\`All oracle data from \${oracleAccountAddress}:\`, allData);

    return allData;
  } catch (error) {
    console.error('Error reading all oracle data:', error);
    throw error;
  }
}

/**
 * Get price data from an oracle account
 * Tries common key patterns
 */
async function getOraclePriceData(
  oracleAccountAddress: string,
  assetSymbol: string
): Promise<{ price: number; timestamp: number; key: string }> {
  const keyPatterns = [
    \`\${assetSymbol}_USD\`,
    \`\${assetSymbol}\`,
    \`price_\${assetSymbol}\`,
    \`\${assetSymbol.toLowerCase()}_usd\`,
    \`Price_\${assetSymbol}\`,
    assetSymbol.toUpperCase()
  ];

  for (const key of keyPatterns) {
    try {
      const response = await fetch(
        \`\${NODE_URL}/addresses/data/\${oracleAccountAddress}/\${key}\`
      );

      if (response.ok) {
        const priceData = await response.json();
        console.log(\`Found price data with key "\${key}": \${priceData.value}\`);
        return {
          price: Number(priceData.value),
          timestamp: priceData.lastUpdated || Date.now(),
          key: key
        };
      }
    } catch (e) {
      continue;
    }
  }

  throw new Error(
    \`Could not find price data for \${assetSymbol} in oracle \${oracleAccountAddress}\`
  );
}

// ============================================================================
// PUBLISH ORACLE DATA
// ============================================================================

/**
 * Create and broadcast oracle data to the blockchain
 */
async function publishOracleData(
  seed: string,
  dataEntries: Array<{ key: string; value: string | number | boolean }>
): Promise<string> {
  try {
    // Convert data entries to proper format
    const entries = dataEntries.map((entry) => {
      if (typeof entry.value === 'boolean') {
        return { key: entry.key, type: 'boolean', value: entry.value };
      } else if (typeof entry.value === 'number') {
        return { key: entry.key, type: 'integer', value: Math.floor(Number(entry.value)) };
      } else {
        return { key: entry.key, type: 'string', value: String(entry.value) };
      }
    });

    // Create data transaction
    const tx = data({ data: entries }, seed);
    console.log('Data transaction created:', tx);

    // Broadcast to network
    const response = await fetch(\`\${NODE_URL}/transactions/broadcast\`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tx)
    });

    if (!response.ok) {
      const error = await response.text();
      throw new Error(\`Failed to broadcast: \${error}\`);
    }

    const result = await response.json();
    console.log('Transaction broadcasted:', result.id);

    return result.id;
  } catch (error) {
    console.error('Error publishing oracle data:', error);
    throw error;
  }
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

// Example 1: Read price from Swop.fi oracle
readOracleData('3PJaDyprveVP7agoN4w3CwvjDoMoH5meDpP', 'WAVES_USD')
  .then(data => console.log('WAVES Price from Swop.fi:', data))
  .catch(console.error);

// Example 2: Get all data from Neutrino oracle
readAllOracleData('3PC9BfRwJWWiw48yoa4Ap6bSqc9c4xUUR5m')
  .then(data => console.log('All Neutrino Oracle Data:', data))
  .catch(console.error);

// Example 3: Publish price data (requires seed phrase)
// publishOracleData('YOUR_SEED_PHRASE', [
//   { key: 'WAVES_USD', value: 2.50 },
//   { key: 'BTC_USD', value: 42500 },
//   { key: 'updated', value: Date.now() }
// ]).then(txId => console.log('Published with TX ID:', txId));
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/wavesprotocol",
    telegram: "https://t.me/wavesnews",
    discord: "https://discord.gg/waves",
    reddit: "https://www.reddit.com/r/Wavesplatform/",
    github: "https://github.com/wavesprotocol",
    forum: "https://forum.waves.tech/",
  },
  
  features: {
    decentralized: true,
    accountBased: true,
    noPermissions: true,
    permanentStorage: true,
    keyValueModel: true,
    lowFees: true,
    customData: true,
    nativeBlockchainFeature: true,
  },
  
  costs: {
    readData: "Free",
    publishData: "0.1 WAVES per KB",
    dataTransactionFee: "0.001 WAVES (base) + 0.0001 WAVES per KB",
  },
  
  supportedDataTypes: [
    "Integer (64-bit)",
    "Boolean",
    "String",
    "Binary (byte array)",
  ],
  
  commonKeyPatterns: [
    "{ASSET}_USD (e.g., WAVES_USD)",
    "{ASSET} (e.g., WAVES)",
    "price_{ASSET} (e.g., price_WAVES)",
    "{ASSET}_price (e.g., WAVES_price)",
    "{ASSET1}_{ASSET2} (e.g., WAVES_USDT)",
    "rate_{ASSET} (e.g., rate_WAVES)",
    "updated (last update timestamp)",
  ],
  
  notes: [
    "Most decentralized oracle model - any account can be an oracle",
    "No special permissions or approvals required",
    "Data is permanently stored on-chain in account data storage",
    "Free to read, small fee to publish (0.1 WAVES per KB)",
    "All data is public and transparent on blockchain",
    "Smart contracts can read data from any account's data storage",
    "Common naming conventions help with discoverability",
    "Popular dApps (Swop.fi, Neutrino) use this for price feeds",
    "Each account can store up to 100 entries (key-value pairs)",
    "Entry keys are limited to 100 characters",
    "Test on testnet before mainnet deployment",
  ],
  
  resources: {
    oracleConcept: "https://docs.waves.tech/en/blockchain/oracle",
    dataTransactions: "https://docs.waves.tech/en/blockchain/transaction-type/data-transaction",
    nodeAPI: "https://docs.waves.tech/en/waves-node/node-api",
    wavesTransactions: "https://wavesplatform.github.io/waves-transactions/index.html",
    accountDataStorage: "https://docs.waves.tech/en/blockchain/account/account-data-storage",
  },
};

