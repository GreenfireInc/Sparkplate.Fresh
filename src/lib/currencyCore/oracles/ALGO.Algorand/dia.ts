// DIA Oracle - Community-Driven Multi-Source Oracle for Algorand
// Type: Multi-Source Aggregated Price Oracle
// Blockchain: Algorand (ALGO)

export const diaOracleALGO = {
  name: "DIA Oracle",
  blockchain: "Algorand (ALGO)",
  type: "Community-Driven Multi-Source Price Oracle",
  description: "Community-driven oracle providing price feeds for ALGO and other assets using multi-source aggregation model. Offers transparent, audited market data sourced from 100+ exchanges with customizable feeds.",
  
  url: "https://www.diadata.org/",
  algorandApi: "https://www.diadata.org/app/price/asset/Algorand/0x0000000000000000000000000000000000000000/",
  docs: "https://docs.diadata.org/",
  
  api: {
    apiExplorer: "https://www.diadata.org/app/price/asset/Algorand/0x0000000000000000000000000000000000000000/",
    baseURL: "https://api.diadata.org/v1",
    assetQuotation: "https://api.diadata.org/v1/assetQuotation/Algorand/0x0000000000000000000000000000000000000000",
    documentation: "https://docs.diadata.org/",
    rateLimit: "Public API with rate limits",
  },
  
  sdk: {
    npm: "algosdk",
    installation: "npm install algosdk axios",
    httpClient: "axios or fetch for API calls",
    documentation: "https://docs.diadata.org/",
    github: "https://github.com/diadata-org",
  },
  
  integration: {
    example: `
// DIA Oracle Integration for Algorand
import algosdk from "algosdk";
import axios from "axios";

const algodClient = new algosdk.Algodv2("", "https://mainnet-api.algonode.cloud", 443);

// DIA API base URL
const DIA_API_BASE = "https://api.diadata.org/v1";

// Method 1: Get ALGO price from DIA REST API
async function getDiaAlgoPrice() {
  try {
    const response = await axios.get(
      \`\${DIA_API_BASE}/assetQuotation/Algorand/0x0000000000000000000000000000000000000000\`
    );

    const data = response.data;
    console.log("ALGO Price:", data.Price);
    console.log("Symbol:", data.Symbol);
    console.log("Name:", data.Name);
    console.log("Time:", new Date(data.Time).toISOString());
    console.log("Source:", data.Source);

    return {
      price: data.Price,
      symbol: data.Symbol,
      name: data.Name,
      timestamp: new Date(data.Time),
      source: data.Source,
    };
  } catch (error) {
    console.error("Error fetching ALGO price from DIA:", error);
    throw error;
  }
}

// Method 2: Get price for any asset on Algorand
async function getDiaAssetPrice(assetAddress: string) {
  try {
    const response = await axios.get(
      \`\${DIA_API_BASE}/assetQuotation/Algorand/\${assetAddress}\`
    );

    const data = response.data;
    return {
      price: data.Price,
      symbol: data.Symbol,
      name: data.Name,
      timestamp: new Date(data.Time),
      volumeYesterdayUSD: data.VolumeYesterdayUSD,
    };
  } catch (error) {
    console.error(\`Error fetching price for asset \${assetAddress}:\`, error);
    throw error;
  }
}

// Method 3: Get multiple asset prices
async function getMultipleDiaPrices(assetAddresses: string[]) {
  try {
    const prices = await Promise.all(
      assetAddresses.map(address => getDiaAssetPrice(address))
    );

    const priceMap: Record<string, any> = {};
    prices.forEach(price => {
      priceMap[price.symbol] = price;
    });

    console.log("Multiple DIA Prices:", priceMap);
    return priceMap;
  } catch (error) {
    console.error("Error fetching multiple DIA prices:", error);
    throw error;
  }
}

// Method 4: Get supply information
async function getDiaSupplyInfo(assetAddress: string) {
  try {
    const response = await axios.get(
      \`\${DIA_API_BASE}/supply/\${assetAddress}\`
    );

    const data = response.data;
    console.log("Supply Info:", data);
    return data;
  } catch (error) {
    console.error("Error fetching supply info:", error);
    throw error;
  }
}

// Method 5: Deploy DIA oracle smart contract on Algorand (conceptual)
// For actual on-chain deployment, you would deploy a smart contract
// that stores DIA oracle data and updates it periodically
async function deployDiaOracle(deployerAccount: algosdk.Account) {
  try {
    // This is conceptual - actual implementation would involve:
    // 1. Creating a smart contract that stores price data
    // 2. Setting up an off-chain service to update prices from DIA API
    // 3. Calling the smart contract to update global state with new prices

    console.log("Deploying DIA Oracle smart contract...");
    
    // Example: Create application
    const suggestedParams = await algodClient.getTransactionParams().do();
    
    // Smart contract code would be compiled TEAL
    // const approval = compileProgram(approvalSource);
    // const clear = compileProgram(clearSource);

    // Deploy application...
    
    console.log("DIA Oracle deployed (conceptual)");
  } catch (error) {
    console.error("Error deploying DIA oracle:", error);
    throw error;
  }
}

// Method 6: Historical price data
async function getDiaHistoricalPrice(
  symbol: string,
  startTime: Date,
  endTime: Date
) {
  try {
    const response = await axios.get(
      \`\${DIA_API_BASE}/chartPoints/\${symbol}\`,
      {
        params: {
          startTime: startTime.toISOString(),
          endTime: endTime.toISOString(),
        },
      }
    );

    console.log("Historical Price Data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching historical price data:", error);
    throw error;
  }
}

// Usage examples
// getDiaAlgoPrice();
// getDiaAssetPrice("0x0000000000000000000000000000000000000000");
// getMultipleDiaPrices(["0x00000...", "0x11111..."]);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/DIAdata_org",
    telegram: "https://t.me/DIAdata_org",
    discord: "https://discord.com/invite/dia-data",
    github: "https://github.com/diadata-org",
    medium: "https://medium.com/dia-insights",
  },
  
  features: {
    communityDriven: true,
    multiSource: true,
    transparent: true,
    audited: true,
    customizable: true,
    crossChain: true,
    volumeData: true,
  },
  
  supportedData: [
    "Cryptocurrency prices (ALGO, BTC, ETH, 20,000+ assets)",
    "Volume data (24h, yesterday)",
    "Supply information",
    "Historical price data",
    "Market data aggregation",
  ],
  
  dataAggregation: {
    sources: "100+ exchanges",
    method: "Multi-source aggregation with outlier detection",
    transparency: "Fully transparent data sourcing",
    methodology: "VWAPIR (Volume-Weighted Average Price with Interquartile Range)",
    quality: "Audited market data",
  },
  
  algorandIntegration: {
    method: "REST API for off-chain queries, deployable on-chain oracle contracts",
    accessPattern: "HTTP API calls or smart contract queries",
    customDeployment: "Can deploy custom oracle smart contracts",
    benefits: [
      "20,000+ assets supported",
      "Transparent multi-source aggregation",
      "Community-driven and audited",
      "Volume and supply data available",
      "Historical data access",
      "Customizable feeds",
    ],
    bestFor: [
      "DeFi protocols requiring transparent sourcing",
      "Applications needing volume data",
      "Multi-asset price tracking",
      "Institutional-grade data needs",
    ],
  },
  
  notes: [
    "Community-driven oracle with transparent data sourcing",
    "Aggregates data from 100+ exchanges",
    "Supports 20,000+ assets including ALGO",
    "VWAPIR methodology for accurate pricing",
    "REST API for off-chain access",
    "Can deploy custom oracle smart contracts on Algorand",
    "Provides volume and supply data",
    "Historical price data available",
    "Active integration on Algorand",
    "Customizable oracle feeds",
  ],
  
  useCases: [
    "DeFi protocols (AMMs, lending, derivatives)",
    "Portfolio tracking and analytics",
    "Price discovery for new assets",
    "Market research and analysis",
    "Cross-chain price comparison",
    "Volume and supply monitoring",
    "Institutional data needs",
    "Custom oracle deployments",
  ],
  
  apiEndpoints: {
    assetQuotation: "/v1/assetQuotation/{blockchain}/{address}",
    supply: "/v1/supply/{address}",
    chartPoints: "/v1/chartPoints/{symbol}",
    exchanges: "/v1/exchanges",
    pairs: "/v1/pairs",
  },
  
  resources: {
    mainWebsite: "https://www.diadata.org/",
    apiExplorer: "https://www.diadata.org/app/price/asset/Algorand/0x0000000000000000000000000000000000000000/",
    documentation: "https://docs.diadata.org/",
    github: "https://github.com/diadata-org",
    medium: "https://medium.com/dia-insights",
  },
  
  pricing: {
    tier: "Freemium model",
    publicApi: "Free with rate limits",
    customFeeds: "Custom pricing for dedicated feeds",
    enterprise: "Enterprise solutions available",
  },
};

