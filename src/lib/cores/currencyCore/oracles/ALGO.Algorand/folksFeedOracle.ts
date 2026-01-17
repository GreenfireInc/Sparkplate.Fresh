// Folks Feed Oracle (FFO) - Web3 Data Oracle for Algorand
// Type: Real-World Data Feed Oracle
// Blockchain: Algorand (ALGO)

export const folksFeedOracle = {
  name: "Folks Feed Oracle (FFO)",
  blockchain: "Algorand (ALGO)",
  type: "Real-World Data Feed Oracle",
  description: "Specialized oracle for web3 applications, focusing on real-world data feeds for lending protocols and DeFi applications. Provides price feeds for assets supported on lending platforms with SDK support for easy integration.",
  
  url: "https://algorand.co/ecosystem/project/folks-feed-oracle",
  docs: "https://docs.folksfeed.io/",
  sdkDocs: "https://docs.folksfeed.io/developers/sdk",
  
  api: {
    documentation: "https://docs.folksfeed.io/",
    sdkDocumentation: "https://docs.folksfeed.io/developers/sdk",
    endpoints: "API details available in documentation",
    indexerQuery: "Can query via Algorand Indexer for on-chain feeds",
  },
  
  sdk: {
    npm: "algosdk",
    installation: "npm install algosdk",
    folksFeedSDK: "Available for reading oracle prices from smart contracts",
    documentation: "https://docs.folksfeed.io/developers/sdk",
    github: "Check ecosystem page for repository links",
  },
  
  integration: {
    example: `
// Folks Feed Oracle Integration for Algorand
import algosdk from "algosdk";

const algodClient = new algosdk.Algodv2("", "https://mainnet-api.algonode.cloud", 443);
const indexerClient = new algosdk.Indexer("", "https://mainnet-idx.algonode.cloud", 443);

// Folks Feed Oracle app IDs (get from Folks Feed documentation)
const FOLKS_FEED_APP_IDS = {
  ALGO_USD: 123456789, // Replace with actual app ID
  USDC_USD: 987654321, // Replace with actual app ID
  // Add other supported assets
};

// Method 1: Read price from Folks Feed Oracle
async function getFolksFeedPrice(
  assetAppId: number,
  assetSymbol: string
): Promise<{ price: number; timestamp: Date }> {
  try {
    const appInfo = await algodClient.getApplicationByID(assetAppId).do();
    const globalState = appInfo.params["global-state"];

    // Parse price from global state
    const priceState = globalState.find((state: any) =>
      Buffer.from(state.key, "base64").toString() === "price"
    );

    const timestampState = globalState.find((state: any) =>
      Buffer.from(state.key, "base64").toString() === "timestamp"
    );

    if (priceState && priceState.value.type === 1) {
      const price = priceState.value.uint;
      const decimals = 6; // Typically uses 6 decimals
      const normalizedPrice = price / Math.pow(10, decimals);

      const timestamp = timestampState?.value.uint || Date.now() / 1000;

      console.log(\`\${assetSymbol} Price: $\${normalizedPrice}\`);
      console.log(\`Last Updated: \${new Date(timestamp * 1000).toISOString()}\`);

      return {
        price: normalizedPrice,
        timestamp: new Date(timestamp * 1000),
      };
    }

    throw new Error("Price not found in Folks Feed oracle");
  } catch (error) {
    console.error(\`Error fetching Folks Feed price for \${assetSymbol}:\`, error);
    throw error;
  }
}

// Method 2: Read oracle prices saved in Algorand Smart Contracts (using SDK pattern)
async function readFolksFeedOraclePrice(oracleContractId: number) {
  try {
    // According to Folks Feed SDK docs, oracle prices are saved in smart contracts
    const appInfo = await algodClient.getApplicationByID(oracleContractId).do();
    const globalState = appInfo.params["global-state"];

    const oracleData: Record<string, any> = {};

    for (const state of globalState) {
      const key = Buffer.from(state.key, "base64").toString();
      let value;

      if (state.value.type === 1) {
        value = state.value.uint;
      } else if (state.value.type === 2) {
        value = Buffer.from(state.value.bytes, "base64");
      }

      oracleData[key] = value;
    }

    console.log("Folks Feed Oracle Data:", oracleData);
    return oracleData;
  } catch (error) {
    console.error("Error reading Folks Feed oracle from smart contract:", error);
    throw error;
  }
}

// Method 3: Get multiple asset prices
async function getMultipleFolksFeedPrices(
  assets: Array<{ appId: number; symbol: string }>
) {
  try {
    const prices = await Promise.all(
      assets.map(asset => getFolksFeedPrice(asset.appId, asset.symbol))
    );

    const priceMap: Record<string, { price: number; timestamp: Date }> = {};
    assets.forEach((asset, index) => {
      priceMap[asset.symbol] = prices[index];
    });

    console.log("Multiple Folks Feed Prices:", priceMap);
    return priceMap;
  } catch (error) {
    console.error("Error fetching multiple Folks Feed prices:", error);
    throw error;
  }
}

// Method 4: Monitor price updates via Indexer
async function monitorFolksFeedUpdates(appId: number, limit: number = 10) {
  try {
    const appAddress = algosdk.getApplicationAddress(appId);

    const txnResponse = await indexerClient
      .searchForTransactions()
      .address(appAddress)
      .limit(limit)
      .do();

    const transactions = txnResponse.transactions;
    console.log(\`Found \${transactions.length} Folks Feed update transactions\`);

    const updates = transactions
      .filter(txn => txn["application-transaction"])
      .map(txn => ({
        round: txn["confirmed-round"],
        timestamp: new Date(txn["round-time"] * 1000),
        txId: txn.id,
      }));

    return updates;
  } catch (error) {
    console.error("Error monitoring Folks Feed updates:", error);
    throw error;
  }
}

// Usage examples
// getFolksFeedPrice(FOLKS_FEED_APP_IDS.ALGO_USD, "ALGO");
// readFolksFeedOraclePrice(FOLKS_FEED_APP_IDS.USDC_USD);
// getMultipleFolksFeedPrices([
//   { appId: FOLKS_FEED_APP_IDS.ALGO_USD, symbol: "ALGO" },
//   { appId: FOLKS_FEED_APP_IDS.USDC_USD, symbol: "USDC" },
// ]);
    `,
  },
  
  socialMedia: {
    ecosystemPage: "https://algorand.co/ecosystem/project/folks-feed-oracle",
    website: "Check ecosystem page for official links",
  },
  
  features: {
    web3Focused: true,
    lendingProtocolSupport: true,
    smartContractIntegration: true,
    sdkAvailable: true,
    realWorldData: true,
  },
  
  supportedData: [
    "Asset price feeds for lending protocols",
    "Real-world data feeds",
    "General off-chain data (e.g., events, APIs)",
  ],
  
  dataQuality: {
    focus: "Lending protocol asset prices",
    reliability: "Designed for DeFi applications",
    updateFrequency: "Regular updates for supported assets",
    accuracy: "Tailored for lending/borrowing use cases",
  },
  
  algorandIntegration: {
    method: "Oracle prices saved in Algorand Smart Contracts",
    accessPattern: "Read via SDK or direct smart contract queries",
    sdkSupport: true,
    benefits: [
      "Specialized for lending protocols",
      "SDK available for easy integration",
      "Real-world data focus",
      "Smart contract storage for reliability",
    ],
    bestFor: [
      "Lending and borrowing protocols",
      "DeFi applications",
      "Asset price tracking",
      "Collateral valuation",
    ],
  },
  
  notes: [
    "Specialized oracle for web3 applications",
    "Focus on real-world data feeds",
    "Provides price feeds for lending protocol assets",
    "SDK available for reading oracle prices from smart contracts",
    "Oracle data saved in Algorand Smart Contracts",
    "Active project in Algorand ecosystem",
    "Designed for DeFi and lending applications",
    "Can be queried via Algorand Indexer",
    "GitHub-based development",
  ],
  
  useCases: [
    "Lending protocols (collateral valuation)",
    "Borrowing platforms (risk assessment)",
    "DeFi applications (price discovery)",
    "Portfolio management (asset valuation)",
    "Liquidation systems (price triggers)",
    "Yield farming platforms",
  ],
  
  resources: {
    ecosystemPage: "https://algorand.co/ecosystem/project/folks-feed-oracle",
    documentation: "https://docs.folksfeed.io/",
    sdkDocs: "https://docs.folksfeed.io/developers/sdk",
    algorandDeveloperPortal: "https://developer.algorand.org/",
  },
  
  implementation: {
    storageMethod: "Algorand Smart Contracts",
    accessMethod: "SDK or direct contract queries",
    dataFormat: "Stored in contract global state",
    indexing: "Queryable via Algorand Indexer",
  },
};

