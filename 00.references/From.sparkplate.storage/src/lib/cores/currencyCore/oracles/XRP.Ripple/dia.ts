// DIA Oracle - Decentralized Information Asset for XRP
// Type: Multi-Source Oracle
// Blockchain: XRP Ledger (XRPL) - Cross-chain

export const diaOracle = {
  name: "DIA Oracle",
  fullName: "Decentralized Information Asset",
  blockchain: "XRP Ledger (XRPL)",
  type: "Multi-Source Oracle",
  description: "DIA provides high-quality, audited price feeds for XRP and other assets integrated directly into XRPL's native oracle framework. Aggregates data from 100+ exchanges for institutional-grade feeds with transparent sourcing.",
  
  url: "https://www.diadata.org/",
  xrpIntegration: "https://www.diadata.org/blog/post/dia-brings-price-oracles-to-xrpl/",
  docs: "https://docs.diadata.org/",
  
  api: {
    baseURL: "https://api.diadata.org",
    xrpPriceEndpoint: "https://api.diadata.org/v1/assetQuotation/XRPL/0x0000000000000000000000000000000000000000",
    genericPriceEndpoint: "https://api.diadata.org/v1/price/XRP",
    documentation: "https://docs.diadata.org/",
    rateLimit: "Public API available",
    xrplIntegration: "Via XRPL native oracles using OracleSet transactions",
  },
  
  sdk: {
    npm: "axios",
    installation: "npm install axios xrpl",
    documentation: "https://docs.diadata.org/",
    xrplIntegration: "https://docs.diadata.org/documentation/oracle-documentation/lumina",
    features: [
      "Real-time price feeds for 20,000+ assets",
      "Multi-source aggregation from 100+ exchanges",
      "Transparent data sourcing methodology",
      "XRPL native oracle integration",
      "Institutional-grade data quality",
    ],
  },
  
  integration: {
    example: `
// DIA Oracle Integration for XRP
import axios from 'axios';
import xrpl from 'xrpl';

const DIA_API_BASE = 'https://api.diadata.org';
const client = new xrpl.Client('wss://xrplcluster.com');

// Get XRP price from DIA API
async function getXRPPriceFromDIA() {
  try {
    const response = await axios.get(
      \`\${DIA_API_BASE}/v1/assetQuotation/XRPL/0x0000000000000000000000000000000000000000\`
    );
    
    const price = response.data.Price;
    const timestamp = new Date(response.data.Time);
    const source = response.data.Source;
    const name = response.data.Name;
    
    console.log(\`XRP Price: $\${price}\`);
    console.log(\`Source: \${source}\`);
    console.log(\`Last Updated: \${timestamp.toISOString()}\`);
    
    return {
      symbol: 'XRP',
      price,
      timestamp,
      source,
      name
    };
  } catch (error) {
    console.error('Error fetching XRP price from DIA:', error);
    throw error;
  }
}

// Alternative simpler endpoint
async function getXRPPriceSimple() {
  try {
    const response = await axios.get(\`\${DIA_API_BASE}/v1/price/XRP\`);
    
    console.log('XRP Price Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching XRP price (simple):', error);
    throw error;
  }
}

// Query DIA oracle data from XRPL (if DIA has published to native oracles)
async function queryDIAOracleOnXRPL(diaOracleAccount: string) {
  await client.connect();
  
  try {
    const response = await client.request({
      command: 'account_objects',
      account: diaOracleAccount,
      type: 'oracle'
    });
    
    const oracles = response.result.account_objects;
    console.log('DIA Oracle Objects on XRPL:', oracles);
    
    // Find XRP price data
    for (const oracle of oracles) {
      const priceSeries = oracle.PriceDataSeries || [];
      const xrpData = priceSeries.find(p => 
        p.PriceData.BaseAsset === 'XRP' && p.PriceData.QuoteAsset === 'USD'
      );
      
      if (xrpData) {
        const price = Number(xrpData.PriceData.AssetPrice) / 
                     Math.pow(10, xrpData.PriceData.Scale);
        console.log(\`DIA XRP/USD Price on XRPL: $\${price}\`);
        return price;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error querying DIA oracle on XRPL:', error);
    throw error;
  } finally {
    await client.disconnect();
  }
}

// Get historical price data
async function getHistoricalXRPPrice(timestamp: number) {
  try {
    const response = await axios.get(
      \`\${DIA_API_BASE}/v1/quotation/XRP/\${timestamp}\`
    );
    
    console.log('Historical XRP Price:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching historical price:', error);
    throw error;
  }
}

// Get supply data
async function getXRPSupplyData() {
  try {
    const response = await axios.get(\`\${DIA_API_BASE}/v1/supply/XRP\`);
    
    console.log('XRP Supply Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching supply data:', error);
    throw error;
  }
}

// Get multiple asset prices including XRP
async function getMultipleAssetPrices(symbols: string[]) {
  const prices = await Promise.all(
    symbols.map(async (symbol) => {
      try {
        const response = await axios.get(\`\${DIA_API_BASE}/v1/price/\${symbol}\`);
        return { symbol, ...response.data };
      } catch (error) {
        console.error(\`Failed to fetch \${symbol}:\`, error);
        return { symbol, price: null, error: true };
      }
    })
  );
  
  return prices;
}

// Usage examples
getXRPPriceFromDIA().then(data => console.log('XRP Price Data:', data));
getXRPPriceSimple().then(data => console.log('XRP Price (Simple):', data));
getMultipleAssetPrices(['XRP', 'BTC', 'ETH']).then(prices => console.log('Multiple Prices:', prices));
// queryDIAOracleOnXRPL('rDIAOracleAccount...'); // Replace with actual DIA oracle account
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/DIAdata_org",
    telegram: "https://t.me/DIAdata_org",
    discord: "https://discord.gg/diaoracle",
    github: "https://github.com/diadata-org",
    linkedin: "https://www.linkedin.com/company/diadata-org/",
    medium: "https://medium.com/dia-insights",
  },
  
  features: {
    multiSource: true,
    transparent: true,
    customizable: true,
    historicalData: true,
    realTime: true,
    crossChain: true,
    institutionalGrade: true,
    xrplNativeIntegration: true,
  },
  
  supportedData: [
    "XRP prices against major fiat currencies",
    "XRP prices against major cryptocurrencies", 
    "Historical XRP price data",
    "XRP supply data",
    "Volume data",
    "Market cap data",
    "20,000+ other crypto assets",
  ],
  
  dataAggregation: {
    exchanges: "100+ CEXs and DEXs",
    updateFrequency: "Real-time",
    dataTransparency: "Fully transparent sourcing",
    methodology: "Volume-weighted average with outlier detection",
    qualityAssurance: "Audited feeds with institutional-grade standards",
  },
  
  xrplIntegration: {
    method: "Native XRPL oracles via OracleSet transactions",
    dataFormat: "JSON-based pricing stored as Oracle ledger entries",
    updateMechanism: "DIA publishes to XRPL native oracles",
    accessMethod: "Query via XRPL RPC (ledger_entry, get_aggregate_price)",
    benefits: ["No external API dependencies", "On-chain data persistence", "XRPL-native access patterns"],
  },
  
  notes: [
    "Integrated with XRPL native oracle framework (March 2025)",
    "Provides high-quality, audited price feeds for 20,000+ assets",
    "Transparent data sourcing with institutional-grade quality",
    "Real-time and historical data access via REST API",
    "On-chain integration via XRPL native oracles",
    "No API key required for basic REST API usage",
    "Supports custom data feeds for enterprise clients",
    "Used by major DeFi protocols for price feeds",
    "Lumina oracle network for enhanced decentralization",
    "Direct integration with XRPL removes bridge dependencies",
  ],
  
  useCases: [
    "XRPL DeFi applications (AMMs, lending protocols)",
    "Cross-currency payment routing",
    "Tokenized asset pricing on XRPL",
    "Risk management systems",
    "Trading bots and algorithmic trading",
    "Portfolio management applications",
    "Market analytics and research",
  ],
  
  apiEndpoints: {
    assetQuotation: "/v1/assetQuotation/{blockchain}/{address}",
    price: "/v1/price/{symbol}",
    supply: "/v1/supply/{symbol}",
    historicalQuotation: "/v1/quotation/{symbol}/{timestamp}",
    chartPoints: "/v1/chartPoints/{symbol}/{interval}",
    xrplSpecific: "/v1/assetQuotation/XRPL/0x0000000000000000000000000000000000000000",
  },
  
  resources: {
    xrplIntegrationBlog: "https://www.diadata.org/blog/post/dia-brings-price-oracles-to-xrpl/",
    luminaDocumentation: "https://docs.diadata.org/documentation/oracle-documentation/lumina",
    apiDocumentation: "https://docs.diadata.org/",
    developerPortal: "https://www.diadata.org/developers/",
  },
};
