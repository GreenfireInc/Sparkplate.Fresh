// Pyth Network Oracle - High-Fidelity Price Oracle for Algorand
// Type: Pull-Model Price Oracle
// Blockchain: Algorand (ALGO)

export const pythNetworkOracleALGO = {
  name: "Pyth Network",
  blockchain: "Algorand (ALGO)",
  type: "High-Fidelity Pull-Model Price Oracle",
  description: "Leading oracle solution providing high-frequency, low-latency price data sourced directly from major trading firms and exchanges. Uses a cost-effective 'pull' model where consumers pull price data when needed with cryptographic proof verification.",
  
  url: "https://pyth.network/",
  algorandDocs: "https://docs.pyth.network/documentation/pythnet-price-feeds/algorand",
  docs: "https://docs.pyth.network/",
  
  api: {
    priceFeedAccounts: "https://docs.pyth.network/documentation/pythnet-price-feeds/accounts",
    mainnetAppId: 818176933,
    testnetAppId: 6525, // Example from research
    documentation: "https://docs.pyth.network/documentation/pythnet-price-feeds/algorand",
  },
  
  sdk: {
    npm: "@pythnetwork/pyth-algorand-sdk",
    installation: "npm install algosdk @pythnetwork/pyth-algorand-sdk",
    clientNpm: "@pythnetwork/client",
    clientInstallation: "npm install @pythnetwork/client",
    documentation: "https://docs.pyth.network/",
    github: "https://github.com/pyth-network",
  },
  
  integration: {
    example: `
// Pyth Network Oracle Integration for Algorand
import { PriceServiceConnection } from "@pythnetwork/client";
import algosdk from "algosdk";

const algodClient = new algosdk.Algodv2('', 'https://mainnet-api.algonode.cloud', 443);

// IMPORTANT: Pyth price feed IDs are specific. Find the correct one for your asset.
const ALGO_USD_PRICE_FEED_ID = "e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43";
const PYTH_APP_ID = 818176933; // Mainnet Pyth app ID

// Method 1: Get price using Pyth's Price Service (Off-chain query)
async function getPythPriceOffChain(priceFeedId: string) {
  try {
    const connection = new PriceServiceConnection("https://hermes.pyth.network", {
      priceFeedRequestConfig: {
        binary: true,
      },
    });

    const priceFeed = await connection.getPriceFeed(priceFeedId);

    if (priceFeed) {
      const { price, conf, publishTime } = priceFeed.getPriceUnchecked();
      const exponent = priceFeed.metadata.priceExponent;
      const normalizedPrice = Number(price) * Math.pow(10, exponent);
      const normalizedConf = Number(conf) * Math.pow(10, exponent);

      console.log(\`Price: $\${normalizedPrice}\`);
      console.log(\`Confidence Interval: ±$\${normalizedConf}\`);
      console.log(\`Publish Time: \${new Date(publishTime * 1000).toISOString()}\`);

      return {
        price: normalizedPrice,
        confidence: normalizedConf,
        publishTime: new Date(publishTime * 1000),
      };
    }
    return null;
  } catch (error) {
    console.error("Error fetching Pyth price off-chain:", error);
    throw error;
  }
}

// Method 2: Get price from on-chain Pyth app (requires smart contract interaction)
async function getPythPriceOnChain() {
  try {
    const pythAppAddress = algosdk.getApplicationAddress(PYTH_APP_ID);
    const appInfo = await algodClient.getApplicationByID(PYTH_APP_ID).do();

    // Parse global state for price data
    const globalState = appInfo.params["global-state"];
    console.log("Pyth App Global State:", globalState);

    // The actual parsing depends on how Pyth stores data in the app state
    // Refer to Pyth's Algorand documentation for exact state structure
    return globalState;
  } catch (error) {
    console.error("Error fetching Pyth price on-chain:", error);
    throw error;
  }
}

// Method 3: Use in smart contract (conceptual)
async function usePythInSmartContract(senderAccount: algosdk.Account, priceFeedId: string) {
  try {
    // In your smart contract, you would verify the Pyth price proof
    // This is a simplified example of calling a contract that uses Pyth
    const suggestedParams = await algodClient.getTransactionParams().do();
    
    const appArgs = [
      new Uint8Array(Buffer.from("get_price")),
      new Uint8Array(Buffer.from(priceFeedId, "hex")),
    ];

    const txn = algosdk.makeApplicationCallTxnFromObject({
      from: senderAccount.addr,
      appIndex: PYTH_APP_ID,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      appArgs,
      suggestedParams,
    });

    const signedTxn = txn.signTxn(senderAccount.sk);
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
    const confirmed = await algosdk.waitForConfirmation(algodClient, txId, 4);

    console.log("Transaction confirmed:", confirmed);
    return confirmed;
  } catch (error) {
    console.error("Error using Pyth in smart contract:", error);
    throw error;
  }
}

// Usage examples
// getPythPriceOffChain(ALGO_USD_PRICE_FEED_ID);
// getPythPriceOnChain();
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/PythNetwork",
    discord: "https://discord.com/invite/pythnetwork",
    telegram: "https://t.me/PythNetwork",
    github: "https://github.com/pyth-network",
  },
  
  features: {
    pullModel: true,
    highFrequency: true,
    lowLatency: true,
    cryptographicProofs: true,
    costEffective: true,
    subSecondUpdates: true,
    confidenceIntervals: true,
    firstPartyData: true,
  },
  
  supportedData: [
    "Real-time financial market data",
    "Cryptocurrency prices (ALGO, BTC, ETH, etc.)",
    "Stock prices and ETFs",
    "Foreign exchange rates",
    "Commodity prices",
  ],
  
  dataProviders: {
    count: "90+ first-party data publishers",
    sources: "Major trading firms and exchanges",
    updateFrequency: "Sub-second (typically 400ms)",
    dataQuality: "Professional-grade market data",
  },
  
  algorandIntegration: {
    method: "Pull-model with on-chain verification",
    appId: {
      mainnet: 818176933,
      testnet: 6525,
    },
    benefits: [
      "Cost-effective on low-fee Algorand blockchain",
      "Cryptographic proof verification",
      "High-fidelity, frequent price updates",
      "Ideal for DeFi applications",
    ],
    bestFor: [
      "Perpetual futures",
      "Options protocols",
      "Lending and borrowing platforms",
      "High-frequency trading applications",
    ],
  },
  
  notes: [
    "Pyth uses a pull-model: consumers pull price data when needed",
    "Each price update includes cryptographic proof for verification",
    "Very cost-effective on Algorand due to low transaction fees",
    "Sub-second updates (typically 400ms latency)",
    "90+ first-party data publishers including major exchanges",
    "Confidence intervals provided with each price update",
    "Best for DeFi applications requiring high-fidelity, frequent updates",
    "Price feeds available for crypto, stocks, ETFs, FX, and commodities",
    "On-chain verification ensures data integrity",
    "Integration examples available in Algorand documentation",
  ],
  
  useCases: [
    "Decentralized Finance (DeFi) protocols",
    "Perpetual futures and options",
    "Lending and borrowing platforms",
    "Algorithmic stablecoins",
    "Automated market makers (AMMs)",
    "Cross-chain bridges with price oracles",
    "Yield aggregators",
    "Risk management systems",
  ],
  
  priceFeedIds: {
    note: "Find specific price feed IDs at:",
    url: "https://docs.pyth.network/documentation/pythnet-price-feeds/accounts",
    examples: {
      ALGO_USD: "e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
      BTC_USD: "e62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43",
      ETH_USD: "ff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace",
    },
  },
  
  resources: {
    priceFeedList: "https://docs.pyth.network/documentation/pythnet-price-feeds/accounts",
    algorandIntegration: "https://docs.pyth.network/documentation/pythnet-price-feeds/algorand",
    mainWebsite: "https://pyth.network/",
    documentation: "https://docs.pyth.network/",
    github: "https://github.com/pyth-network",
  },
};

