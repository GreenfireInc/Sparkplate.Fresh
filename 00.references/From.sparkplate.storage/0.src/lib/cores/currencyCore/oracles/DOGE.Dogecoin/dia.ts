// DIA Oracle - Decentralized Information Asset for Dogecoin
// Type: Multi-Source Oracle
// Blockchain: Dogecoin (DOGE) / Dogechain

export const diaOracle = {
  name: "DIA",
  fullName: "Decentralized Information Asset",
  blockchain: "Dogecoin (DOGE) / Dogechain",
  type: "Multi-Source Oracle",
  description: "Decentralized oracle aggregating real-time DOGE data from 85+ on-chain/off-chain exchanges; deployable on Dogechain for custom feeds. Uses MAIR methodology for tamper-resistant pricing.",
  
  url: "https://www.diadata.org/",
  dogecoinPrice: "https://www.diadata.org/app/price/asset/Dogechain/0x0000000000000000000000000000000000000000/",
  docs: "https://docs.diadata.org/",
  
  api: {
    baseURL: "https://api.diadata.org",
    priceEndpoint: "https://api.diadata.org/v1/assetQuotation/Dogechain/0x0000000000000000000000000000000000000000",
    genericPrice: "https://api.diadata.org/v1/price/DOGE",
    documentation: "https://docs.diadata.org/introduction/request-an-oracle",
    architectureComputation: "https://www.diadata.org/docs/nexus/reference/architecture/data-computation",
    architectureDelivery: "https://www.diadata.org/docs/nexus/reference/architecture/data-delivery",
    rateLimit: "Public API available, no key required for basic usage",
  },
  
  sdk: {
    npm: "axios",
    installation: "npm install axios",
    documentation: "https://docs.diadata.org/",
    features: [
      "Real-time DOGE price feeds",
      "Historical price data",
      "Customizable data feeds (deployable in <3 minutes)",
      "Multi-exchange aggregation (85+ sources)",
      "Transparent data sourcing",
      "Deployable on 35+ blockchains",
    ],
  },
  
  integration: {
    example: `
// DIA Oracle Integration Example for Dogecoin
import axios from 'axios';

const DIA_API_BASE = 'https://api.diadata.org';

// Get DOGE price from DIA
async function getDOGEPrice() {
  try {
    const response = await axios.get(
      \`\${DIA_API_BASE}/v1/assetQuotation/Dogechain/0x0000000000000000000000000000000000000000\`
    );
    
    const price = response.data.Price;
    const timestamp = new Date(response.data.Time);
    const source = response.data.Source;
    
    console.log(\`DOGE Price: $\${price}\`);
    console.log(\`Source: \${source}\`);
    console.log(\`Last Updated: \${timestamp.toISOString()}\`);
    
    return {
      symbol: 'DOGE',
      price,
      timestamp,
      source,
      name: response.data.Name
    };
  } catch (error) {
    console.error('Error fetching DOGE price from DIA:', error);
    throw error;
  }
}

// Alternative simpler endpoint
async function getDOGEPriceSimple() {
  try {
    const response = await axios.get(\`\${DIA_API_BASE}/v1/price/DOGE\`);
    
    console.log('DOGE Price Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching DOGE price (simple):', error);
    throw error;
  }
}

// Get price for any asset
async function getAssetPrice(symbol: string) {
  try {
    const response = await axios.get(\`\${DIA_API_BASE}/v1/price/\${symbol}\`);
    
    console.log(\`\${symbol} Price: $\${response.data.price}\`);
    return response.data;
  } catch (error) {
    console.error(\`Error fetching \${symbol} price:\`, error);
    throw error;
  }
}

// Get historical price data
async function getHistoricalPrice(symbol: string, timestamp: number) {
  try {
    const response = await axios.get(
      \`\${DIA_API_BASE}/v1/quotation/\${symbol}/\${timestamp}\`
    );
    
    console.log(\`Historical \${symbol} Price:\`, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching historical price:', error);
    throw error;
  }
}

// Usage
getDOGEPrice().then(data => console.log('DOGE Price Data:', data));
getDOGEPriceSimple().then(data => console.log('DOGE Price (Simple):', data));
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/DIAdata_org",
    telegram: "https://t.me/DIAdata_org",
    discord: "https://discord.gg/diaoracle",
    github: "https://github.com/diadata-org",
    linkedin: "https://www.linkedin.com/company/diadata-org/",
  },
  
  features: {
    multiSource: true,
    transparent: true,
    customizable: true,
    historicalData: true,
    realTime: true,
    crossChain: true,
    institutionalGrade: true,
    evmCompatible: true,
  },
  
  supportedData: [
    "DOGE/USD and other DOGE pairs",
    "Volume data",
    "Customizable for DeFi/NFTfi (derivatives, lending)",
    "Historical price data",
    "Market cap data",
  ],
  
  dataAggregation: {
    exchanges: "85+ CEXs and DEXs",
    updateFrequency: "Real-time",
    dataTransparency: "Fully transparent sourcing",
    methodology: "MAIR (Multi-Algorithm-Independent-Robust) methodology",
  },
  
  deployment: {
    supportedChains: "35+ blockchains",
    customOracles: "Deployable in <3 minutes",
    dogechainSupport: true,
  },
  
  notes: [
    "Active oracle for Dogecoin and Dogechain",
    "Aggregates prices from 85+ exchanges",
    "MAIR methodology for tamper-resistant pricing",
    "Institutional-grade price feeds",
    "REST API available",
    "Can deploy custom oracle on Dogechain for on-chain use",
    "Real-time and historical data access",
    "Customizable data feeds for specific use cases",
    "DeFi applications use DIA for lending, borrowing, derivatives",
    "No API key required for basic usage",
    "EVM-compatible for Dogechain integration",
  ],
  
  useCases: [
    "DeFi applications (lending, borrowing, derivatives)",
    "Real-time price feeds for trading bots",
    "Smart contract price oracles on Dogechain",
    "Cross-chain data integration",
    "Market analytics",
  ],
  
  apiEndpoints: {
    assetQuotation: "/v1/assetQuotation/Dogechain/0x0000000000000000000000000000000000000000",
    price: "/v1/price/DOGE",
    supply: "/v1/supply/DOGE",
    historicalQuotation: "/v1/quotation/DOGE/{timestamp}",
    chartPoints: "/v1/chartPoints/DOGE/{interval}",
  },
};

