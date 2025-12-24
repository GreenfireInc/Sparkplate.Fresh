// DIA Oracle - Decentralized Information Asset for Tezos
// Type: Multi-Source Oracle
// Blockchain: Tezos (XTZ) - Cross-chain

export const diaOracle = {
  name: "DIA",
  fullName: "Decentralized Information Asset",
  blockchain: "Tezos (XTZ)",
  type: "Multi-Source Oracle",
  description: "Multi-source oracle with transparent feeds; provides XTZ price API, deployable as on-chain oracle for Tezos dApps. Aggregates data from 100+ exchanges for institutional-grade feeds.",
  
  url: "https://www.diadata.org/",
  tezosPrice: "https://www.diadata.org/app/price/asset/Tezos/0x0000000000000000000000000000000000000000/",
  docs: "https://docs.diadata.org/",
  
  api: {
    baseURL: "https://api.diadata.org",
    priceEndpoint: "https://api.diadata.org/v1/assetQuotation/Tezos/0x0000000000000000000000000000000000000000",
    genericPrice: "https://api.diadata.org/v1/price/XTZ",
    documentation: "https://docs.diadata.org/",
    apiOverview: "https://www.diadata.org/#api",
    rateLimit: "Public API available",
  },
  
  sdk: {
    npm: "axios",
    installation: "npm install axios @taquito/taquito",
    documentation: "https://docs.diadata.org/",
    features: [
      "Real-time price feeds",
      "Historical price data",
      "Customizable data feeds",
      "Multi-exchange aggregation",
      "Transparent data sourcing",
    ],
  },
  
  integration: {
    example: `
// DIA Oracle Integration Example
import axios from 'axios';
import { TezosToolkit } from '@taquito/taquito';

const DIA_API_BASE = 'https://api.diadata.org';
const Tezos = new TezosToolkit('https://mainnet.api.tez.ie');

// Get XTZ price from DIA
async function getXTZPrice() {
  try {
    const response = await axios.get(
      \`\${DIA_API_BASE}/v1/assetQuotation/Tezos/0x0000000000000000000000000000000000000000\`
    );
    
    const price = response.data.Price;
    const timestamp = new Date(response.data.Time);
    const source = response.data.Source;
    
    console.log(\`XTZ Price: $\${price}\`);
    console.log(\`Source: \${source}\`);
    console.log(\`Last Updated: \${timestamp.toISOString()}\`);
    
    return {
      symbol: 'XTZ',
      price,
      timestamp,
      source,
      name: response.data.Name
    };
  } catch (error) {
    console.error('Error fetching XTZ price from DIA:', error);
    throw error;
  }
}

// Alternative simpler endpoint
async function getXTZPriceSimple() {
  try {
    const response = await axios.get(\`\${DIA_API_BASE}/v1/price/XTZ\`);
    
    console.log('XTZ Price Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching XTZ price (simple):', error);
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
    
    console.log(\`Historical \${symbol} Price:`, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching historical price:', error);
    throw error;
  }
}

// Get supply data
async function getSupplyData(symbol: string) {
  try {
    const response = await axios.get(\`\${DIA_API_BASE}/v1/supply/\${symbol}\`);
    
    console.log(\`\${symbol} Supply:`, response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching supply data:', error);
    throw error;
  }
}

// Query DIA oracle contract on Tezos (if deployed)
async function queryDIAOracleContract(oracleAddress: string, assetSymbol: string) {
  try {
    const contract = await Tezos.contract.at(oracleAddress);
    const storage: any = await contract.storage();
    
    // Query the oracle for specific asset
    const assetData = storage.prices[assetSymbol];
    
    if (assetData) {
      const price = Number(assetData.price) / 1e8; // Typically 8 decimals
      console.log(\`\${assetSymbol} On-chain Price: $\${price}\`);
      return price;
    }
    
    return null;
  } catch (error) {
    console.error('Error querying DIA Oracle contract:', error);
    throw error;
  }
}

// Get multiple asset prices
async function getMultipleAssetPrices(symbols: string[]) {
  const prices = await Promise.all(
    symbols.map(async (symbol) => {
      try {
        const data = await getAssetPrice(symbol);
        return { symbol, ...data };
      } catch (error) {
        console.error(\`Failed to fetch \${symbol}:\`, error);
        return { symbol, price: null, error: true };
      }
    })
  );
  
  return prices;
}

// Usage
getXTZPrice().then(data => console.log('XTZ Price Data:', data));
getXTZPriceSimple().then(data => console.log('XTZ Price (Simple):', data));
getAssetPrice('BTC').then(data => console.log('BTC Price:', data));
getMultipleAssetPrices(['XTZ', 'BTC', 'ETH']).then(prices => console.log('Multiple Prices:', prices));
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
  },
  
  supportedData: [
    "Crypto prices (XTZ and 2000+ assets)",
    "Token supply data",
    "Historical price data",
    "Volume data",
    "Market cap data",
  ],
  
  dataAggregation: {
    exchanges: "100+ CEXs and DEXs",
    updateFrequency: "Real-time",
    dataTransparency: "Fully transparent sourcing",
    methodology: "Volume-weighted average",
  },
  
  notes: [
    "Active oracle for Tezos",
    "Aggregates prices from 100+ exchanges",
    "Transparent data sourcing methodology",
    "Institutional-grade price feeds",
    "REST/GraphQL APIs available",
    "Can deploy oracle contract with Taquito for on-chain use",
    "Real-time and historical data access",
    "Customizable data feeds for specific use cases",
    "DeFi applications use DIA for lending, borrowing, derivatives",
    "No API key required for basic usage",
  ],
  
  useCases: [
    "DeFi applications (lending, borrowing, derivatives)",
    "Real-time price feeds for trading bots",
    "Smart contract price oracles",
    "Cross-chain data integration",
    "Market analytics",
  ],
  
  apiEndpoints: {
    assetQuotation: "/v1/assetQuotation/{blockchain}/{address}",
    price: "/v1/price/{symbol}",
    supply: "/v1/supply/{symbol}",
    historicalQuotation: "/v1/quotation/{symbol}/{timestamp}",
    chartPoints: "/v1/chartPoints/{symbol}/{interval}",
  },
};

