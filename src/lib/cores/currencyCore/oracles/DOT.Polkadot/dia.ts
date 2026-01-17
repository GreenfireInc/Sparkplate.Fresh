// DIA Oracle - Decentralized Information Asset for Polkadot
// Type: Multi-Source Oracle
// Blockchain: Polkadot (DOT)

export const diaOracle = {
  name: "DIA",
  fullName: "Decentralized Information Asset",
  blockchain: "Polkadot (DOT)",
  type: "Multi-Source Oracle",
  description: "Customizable, decentralized oracles for Polkadot with transparent data sourcing. Provides price feeds for DOT and other assets with support for both Substrate and EVM environments.",
  
  url: "https://www.diadata.org/",
  polkadotMedianizer: "https://docs.diadata.org/extra/research/polkadot-medianizer",
  docs: "https://docs.diadata.org/",
  
  api: {
    baseURL: "https://api.diadata.org",
    priceEndpoint: "https://api.diadata.org/v1/priceFeed/DOT",
    assetQuotation: "https://api.diadata.org/v1/assetQuotation/Polkadot/0x0000000000000000000000000000000000000000",
    documentation: "https://docs.diadata.org/",
    polkadotResearch: "https://docs.diadata.org/extra/research/polkadot-medianizer",
    rateLimit: "Public API available",
  },
  
  sdk: {
    npm: "axios",
    polkadotIntegration: "@polkadot/api",
    installation: "npm install axios @polkadot/api",
    documentation: "https://docs.diadata.org/",
    features: [
      "Real-time DOT price feeds",
      "Customizable data feeds",
      "Multi-exchange aggregation (85+ sources)",
      "Transparent data sourcing",
      "Historical price data",
      "Deployable on 35+ chains",
      "Substrate and EVM support",
    ],
  },
  
  integration: {
    example: `
// DIA Oracle Integration for Polkadot
import axios from 'axios';
import { ApiPromise, WsProvider } from '@polkadot/api';

const DIA_API_BASE = 'https://api.diadata.org';

// Get DOT price from DIA REST API
async function getDOTPrice() {
  try {
    const response = await axios.get(\`\${DIA_API_BASE}/v1/priceFeed/DOT\`);
    
    const price = response.data.price;
    const timestamp = new Date(response.data.timestamp);
    
    console.log(\`DOT Price: $\${price}\`);
    console.log(\`Last Updated: \${timestamp.toISOString()}\`);
    
    return {
      symbol: 'DOT',
      price: parseFloat(price),
      timestamp,
      source: 'DIA',
    };
  } catch (error) {
    console.error('Error fetching DOT price from DIA:', error);
    throw error;
  }
}

// Get detailed asset quotation
async function getDOTQuotation() {
  try {
    const response = await axios.get(
      \`\${DIA_API_BASE}/v1/assetQuotation/Polkadot/0x0000000000000000000000000000000000000000\`
    );
    
    const data = response.data;
    console.log('DOT Quotation:', {
      price: data.Price,
      name: data.Name,
      symbol: data.Symbol,
      time: new Date(data.Time).toISOString(),
      source: data.Source,
    });
    
    return data;
  } catch (error) {
    console.error('Error fetching DOT quotation:', error);
    throw error;
  }
}

// Get supply data
async function getDOTSupply() {
  try {
    const response = await axios.get(\`\${DIA_API_BASE}/v1/supply/DOT\`);
    
    console.log('DOT Supply:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching DOT supply:', error);
    throw error;
  }
}

// Get historical price data
async function getHistoricalPrice(timestamp: number) {
  try {
    const response = await axios.get(
      \`\${DIA_API_BASE}/v1/quotation/DOT/\${timestamp}\`
    );
    
    console.log('Historical DOT Price:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching historical price:', error);
    throw error;
  }
}

// Get chart points for visualization
async function getChartPoints(interval: string = '1h') {
  try {
    const response = await axios.get(
      \`\${DIA_API_BASE}/v1/chartPoints/DOT/\${interval}\`
    );
    
    const points = response.data.map((point: any) => ({
      time: new Date(point.time).toISOString(),
      price: point.value,
    }));
    
    console.log(\`DOT Chart Points (\${interval}):\`, points.slice(0, 5));
    return points;
  } catch (error) {
    console.error('Error fetching chart points:', error);
    throw error;
  }
}

// Query DIA oracle on a Substrate chain (if deployed)
async function queryDIAOracleSubstrate(wsUrl: string, assetSymbol: string = 'DOT') {
  try {
    const provider = new WsProvider(wsUrl);
    const api = await ApiPromise.create({ provider });
    
    // Query DIA oracle pallet (adjust based on actual implementation)
    const priceData = await api.query.diaOracle?.prices?.(assetSymbol);
    
    if (!priceData) {
      throw new Error(\`No price data for \${assetSymbol}\`);
    }
    
    const data = priceData.toJSON() as any;
    const price = Number(data.price) / 1e8; // Typically 8 decimals
    
    console.log(\`\${assetSymbol} On-chain Price: $\${price}\`);
    console.log('Updated At:', new Date(data.timestamp * 1000).toISOString());
    
    await api.disconnect();
    return price;
  } catch (error) {
    console.error('Error querying DIA oracle on Substrate:', error);
    throw error;
  }
}

// Get multiple asset prices
async function getMultipleAssetPrices(symbols: string[]) {
  const prices = await Promise.all(
    symbols.map(async (symbol) => {
      try {
        const response = await axios.get(\`\${DIA_API_BASE}/v1/priceFeed/\${symbol}\`);
        return {
          symbol,
          price: parseFloat(response.data.price),
          timestamp: response.data.timestamp,
        };
      } catch (error) {
        console.error(\`Failed to fetch \${symbol}:\`, error);
        return { symbol, price: null, error: true };
      }
    })
  );
  
  return prices;
}

// Calculate price with custom time-weighted average
async function getTimeWeightedPrice(symbol: string = 'DOT', hours: number = 24) {
  try {
    const interval = '1h';
    const response = await axios.get(
      \`\${DIA_API_BASE}/v1/chartPoints/\${symbol}/\${interval}\`
    );
    
    const now = Date.now();
    const cutoff = now - (hours * 60 * 60 * 1000);
    
    const recentPoints = response.data.filter((point: any) => 
      new Date(point.time).getTime() > cutoff
    );
    
    if (recentPoints.length === 0) {
      throw new Error('No recent data points');
    }
    
    const sum = recentPoints.reduce((acc: number, point: any) => 
      acc + parseFloat(point.value), 0
    );
    const average = sum / recentPoints.length;
    
    console.log(\`\${hours}h TWAP for \${symbol}: $\${average.toFixed(4)}\`);
    return average;
  } catch (error) {
    console.error('Error calculating TWAP:', error);
    throw error;
  }
}

// Usage example
async function main() {
  console.log('=== DIA Oracle Integration Examples ===\\n');
  
  // Get current price
  const price = await getDOTPrice();
  console.log('Current DOT Price:', price);
  
  // Get detailed quotation
  const quotation = await getDOTQuotation();
  console.log('Detailed Quotation:', quotation);
  
  // Get supply data
  const supply = await getDOTSupply();
  console.log('DOT Supply:', supply);
  
  // Get chart points
  const chartData = await getChartPoints('1h');
  console.log('Hourly Chart Data:', chartData.length, 'points');
  
  // Get multiple assets
  const multiPrices = await getMultipleAssetPrices(['DOT', 'KSM', 'GLMR']);
  console.log('Multiple Prices:', multiPrices);
  
  // Calculate TWAP
  const twap = await getTimeWeightedPrice('DOT', 24);
  console.log('24h TWAP:', twap);
}

main().catch(console.error);
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
    openSource: true,
  },
  
  supportedData: [
    "DOT/USD and other DOT pairs",
    "Cross-parachain asset prices",
    "Token supply data",
    "Historical price data",
    "Volume data",
    "Market cap data",
    "Chart data for visualization",
  ],
  
  dataAggregation: {
    exchanges: "85+ CEXs and DEXs",
    updateFrequency: "Real-time",
    dataTransparency: "Fully transparent sourcing",
    methodology: "Polkadot Medianizer algorithm",
  },
  
  deployment: {
    supportedChains: "35+ blockchains including Polkadot parachains",
    customOracles: "Deployable with custom configuration",
    substrateSupport: true,
    evmSupport: true,
  },
  
  notes: [
    "Active oracle for Polkadot ecosystem",
    "Polkadot Medianizer algorithm for price calculation",
    "Aggregates prices from 85+ exchanges",
    "Transparent data sourcing methodology",
    "Institutional-grade price feeds",
    "REST/GraphQL APIs available",
    "Can deploy custom oracle on parachains",
    "Real-time and historical data access",
    "Open-source and customizable",
    "No API key required for basic usage",
    "Supports both Substrate and EVM chains",
    "Used by DeFi protocols on Polkadot",
  ],
  
  useCases: [
    "DeFi applications (lending, borrowing, derivatives)",
    "DEX price feeds",
    "Smart contract price oracles",
    "Cross-chain data integration",
    "Market analytics and charting",
    "Portfolio tracking",
  ],
  
  apiEndpoints: {
    priceFeed: "/v1/priceFeed/DOT",
    assetQuotation: "/v1/assetQuotation/Polkadot/0x0000000000000000000000000000000000000000",
    supply: "/v1/supply/DOT",
    historicalQuotation: "/v1/quotation/DOT/{timestamp}",
    chartPoints: "/v1/chartPoints/DOT/{interval}",
  },
  
  research: {
    polkadotMedianizer: "https://docs.diadata.org/extra/research/polkadot-medianizer",
    methodology: "Custom algorithm for Polkadot price calculation",
    transparency: "Full documentation of data sources and methodology",
  },
};

