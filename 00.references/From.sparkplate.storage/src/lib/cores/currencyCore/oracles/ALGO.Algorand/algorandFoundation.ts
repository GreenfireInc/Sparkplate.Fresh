// Algorand Foundation Oracles - Official Reference Oracles
// Type: Foundation-Run Reference Oracle
// Blockchain: Algorand (ALGO)

export const algorandFoundationOracle = {
  name: "Algorand Foundation Oracles",
  blockchain: "Algorand (ALGO)",
  type: "Foundation-Run Reference Oracle",
  description: "Official reference oracles maintained by the Algorand Foundation, providing key price feeds for major cryptocurrencies (ALGO, BTC, ETH, USDC, etc.) against USD. Designed for core DeFi primitives and Algorand Standard Assets (ASA) price data.",
  
  url: "https://github.com/AlgorandFoundation/oracles",
  github: "https://github.com/AlgorandFoundation/oracles",
  docs: "https://github.com/AlgorandFoundation/oracles",
  
  api: {
    githubRepo: "https://github.com/AlgorandFoundation/oracles",
    endpoints: "API endpoints and smart contract application IDs available in GitHub repo",
    networks: ["MainNet", "TestNet"],
    documentation: "https://github.com/AlgorandFoundation/oracles",
  },
  
  sdk: {
    npm: "algosdk",
    installation: "npm install algosdk",
    documentation: "https://developer.algorand.org/docs/sdks/javascript/",
    github: "https://github.com/algorand/js-algorand-sdk",
    features: [
      "Read oracle price feeds from smart contracts",
      "Query application global state",
      "Monitor price updates",
      "Integrate into dApps",
    ],
  },
  
  integration: {
    example: `
// Algorand Foundation Oracle Integration
import algosdk from "algosdk";

const algodClient = new algosdk.Algodv2("", "https://mainnet-api.algonode.cloud", 443);
const indexerClient = new algosdk.Indexer("", "https://mainnet-idx.algonode.cloud", 443);

// Oracle app IDs (get actual IDs from GitHub repo)
const ORACLE_APP_IDS = {
  ALGO_USD: 123456789, // Replace with actual app ID from Foundation repo
  BTC_USD: 987654321,  // Replace with actual app ID
  ETH_USD: 456789123,  // Replace with actual app ID
  USDC_USD: 789456123, // Replace with actual app ID
};

// Method 1: Read price from Foundation oracle
async function getFoundationOraclePrice(
  appId: number,
  assetPair: string
): Promise<{ price: number; timestamp: Date }> {
  try {
    const appInfo = await algodClient.getApplicationByID(appId).do();
    const globalState = appInfo.params["global-state"];

    // Parse price from global state (structure depends on oracle implementation)
    const priceState = globalState.find((state: any) =>
      Buffer.from(state.key, "base64").toString() === "price"
    );

    const timestampState = globalState.find((state: any) =>
      Buffer.from(state.key, "base64").toString() === "timestamp"
    );

    if (priceState && priceState.value.type === 1) {
      const price = priceState.value.uint;
      const decimals = 6; // Typically 6 decimals (microAlgos scaling)
      const normalizedPrice = price / Math.pow(10, decimals);

      const timestamp = timestampState?.value.uint || Date.now() / 1000;

      console.log(\`\${assetPair} Price: $\${normalizedPrice}\`);
      console.log(\`Last Updated: \${new Date(timestamp * 1000).toISOString()}\`);

      return {
        price: normalizedPrice,
        timestamp: new Date(timestamp * 1000),
      };
    }

    throw new Error("Price not found in oracle global state");
  } catch (error) {
    console.error(\`Error fetching Foundation oracle price for \${assetPair}:\`, error);
    throw error;
  }
}

// Method 2: Read all global state from oracle
async function getOracleGlobalState(appId: number) {
  try {
    const appInfo = await algodClient.getApplicationByID(appId).do();
    const globalState = appInfo.params["global-state"];

    const parsedState: Record<string, any> = {};

    for (const state of globalState) {
      const key = Buffer.from(state.key, "base64").toString();
      let value;

      if (state.value.type === 1) {
        // uint
        value = state.value.uint;
      } else if (state.value.type === 2) {
        // bytes
        value = Buffer.from(state.value.bytes, "base64").toString();
      }

      parsedState[key] = value;
    }

    console.log("Oracle Global State:", parsedState);
    return parsedState;
  } catch (error) {
    console.error("Error reading oracle global state:", error);
    throw error;
  }
}

// Method 3: Monitor oracle updates using Indexer
async function monitorOracleUpdates(appId: number, limit: number = 10) {
  try {
    const appAddress = algosdk.getApplicationAddress(appId);

    const txnResponse = await indexerClient
      .searchForTransactions()
      .address(appAddress)
      .limit(limit)
      .do();

    const transactions = txnResponse.transactions;
    console.log(\`Found \${transactions.length} oracle update transactions\`);

    for (const txn of transactions) {
      if (txn["application-transaction"]) {
        console.log("Update at round:", txn["confirmed-round"]);
        console.log("Time:", new Date(txn["round-time"] * 1000).toISOString());
        console.log("Transaction ID:", txn.id);
      }
    }

    return transactions;
  } catch (error) {
    console.error("Error monitoring oracle updates:", error);
    throw error;
  }
}

// Method 4: Get historical price data
async function getHistoricalPrices(appId: number, minRound: number, maxRound: number) {
  try {
    const appAddress = algosdk.getApplicationAddress(appId);

    const txnResponse = await indexerClient
      .searchForTransactions()
      .address(appAddress)
      .minRound(minRound)
      .maxRound(maxRound)
      .do();

    const prices: Array<{ round: number; timestamp: Date; price?: number }> = [];

    for (const txn of txnResponse.transactions) {
      if (txn["application-transaction"]) {
        // Extract price from transaction data if available
        prices.push({
          round: txn["confirmed-round"],
          timestamp: new Date(txn["round-time"] * 1000),
          // price: extractPriceFromTxn(txn), // Custom parsing logic
        });
      }
    }

    console.log(\`Found \${prices.length} historical price updates\`);
    return prices;
  } catch (error) {
    console.error("Error fetching historical prices:", error);
    throw error;
  }
}

// Usage examples
// getFoundationOraclePrice(ORACLE_APP_IDS.ALGO_USD, "ALGO/USD");
// getOracleGlobalState(ORACLE_APP_IDS.BTC_USD);
// monitorOracleUpdates(ORACLE_APP_IDS.ETH_USD);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/AlgoFoundation",
    github: "https://github.com/AlgorandFoundation",
    website: "https://algorand.foundation/",
  },
  
  features: {
    official: true,
    reliable: true,
    simplePriceFeeds: true,
    coreAssets: true,
    wellDocumented: true,
    openSource: true,
  },
  
  supportedData: [
    "ALGO/USD price feed",
    "BTC/USD price feed",
    "ETH/USD price feed",
    "USDC/USD price feed",
    "Other major cryptocurrency pairs",
  ],
  
  dataQuality: {
    source: "Algorand Foundation-maintained",
    reliability: "High - official Foundation-run service",
    updateFrequency: "Regular updates (specific frequency in repo docs)",
    decimals: "Typically 6 decimals (microAlgos scaling)",
  },
  
  algorandIntegration: {
    method: "Smart contract global state storage",
    accessPattern: "Read global state via algosdk",
    appIds: "Listed in GitHub repository for mainnet and testnet",
    benefits: [
      "Official and trusted source",
      "Simple and reliable integration",
      "Core DeFi primitive support",
      "Well-documented in GitHub repo",
    ],
    bestFor: [
      "General-purpose dApps",
      "Core Algorand ecosystem assets",
      "DeFi protocols requiring reliable price feeds",
      "Projects needing official data source",
    ],
  },
  
  notes: [
    "Official oracle solution from Algorand Foundation",
    "Provides price feeds for major cryptocurrencies against USD",
    "Application IDs available in GitHub repository",
    "Supports both MainNet and TestNet",
    "Simple, reliable, and well-documented integration",
    "Ideal for core DeFi primitives on Algorand",
    "Open-source implementation on GitHub",
    "Regular updates maintained by Foundation",
    "Price data stored in smart contract global state",
    "Can be queried using standard Algorand SDK",
  ],
  
  useCases: [
    "DeFi protocols (lending, borrowing, DEXs)",
    "Algorand Standard Asset (ASA) valuations",
    "Portfolio tracking applications",
    "Price display in wallets and explorers",
    "Automated trading bots",
    "Risk management systems",
    "Collateral valuation",
    "Stablecoin mechanisms",
  ],
  
  resources: {
    githubRepo: "https://github.com/AlgorandFoundation/oracles",
    algorandFoundation: "https://algorand.foundation/",
    developerPortal: "https://developer.algorand.org/",
    algoSDK: "https://github.com/algorand/js-algorand-sdk",
  },
  
  implementation: {
    repository: "https://github.com/AlgorandFoundation/oracles",
    language: "Contains smart contract code and deployment scripts",
    testnet: "Application IDs for testnet available in repo",
    mainnet: "Application IDs for mainnet available in repo",
    updates: "Check GitHub for latest application IDs and endpoints",
  },
};

