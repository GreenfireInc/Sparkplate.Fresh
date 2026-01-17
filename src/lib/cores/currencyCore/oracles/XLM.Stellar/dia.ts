// DIA Oracle - Cross-Chain Oracle on Stellar
// Type: Cross-Chain Oracle
// Blockchain: Stellar (XLM)

export const diaOracle = {
  name: "DIA Oracle",
  blockchain: "Stellar (XLM)",
  type: "Cross-Chain Oracle",
  description: "DIA (Decentralized Information Asset) provides audited market data for 20,000+ assets on Stellar's Soroban smart contract platform. Uses VWAPIR methodology (Volume-Weighted Average Price with Interquartile Range) for accurate and manipulation-resistant price feeds from multiple exchanges.",
  
  url: "https://www.diadata.org/",
  docs: "https://docs.diadata.org/",
  sorobanIntegration: "https://developers.stellar.org/docs/data/oracles/oracle-providers",
  
  api: {
    restAPI: "https://api.diadata.org/v1",
    xlmPriceEndpoint: "https://api.diadata.org/v1/assetQuotation/Stellar/0x0000000000000000000000000000000000000000",
    sorobanContract: "CAEDPEZDRCEJCF73ASC5JGNKCIJDV2QJQSW6DJ6B74MYALBNKCJ5IFP4",
    rpcEndpoint: "https://rpc.stellar.org",
    documentation: "https://docs.diadata.org/",
  },
  
  sdk: {
    npm: "@stellar/stellar-sdk",
    installation: "npm install @stellar/stellar-sdk axios",
    documentation: "https://docs.diadata.org/",
    github: "https://github.com/diadata-org",
    features: [
      "20,000+ asset support",
      "VWAPIR methodology",
      "Standard and custom feeds",
      "Multi-exchange aggregation",
      "Cross-chain compatibility",
    ],
  },
  
  integration: {
    example: `
// DIA Oracle Integration Example
import { Contract, SorobanRpc } from '@stellar/stellar-sdk';
import axios from 'axios';

const DIA_SOROBAN_CONTRACT = 'CAEDPEZDRCEJCF73ASC5JGNKCIJDV2QJQSW6DJ6B74MYALBNKCJ5IFP4';
const DIA_REST_API = 'https://api.diadata.org/v1';
const RPC_URL = 'https://rpc.stellar.org';

// ============================================================================
// QUERY DIA ORACLE VIA REST API (OFF-CHAIN)
// ============================================================================

/**
 * Get XLM price from DIA REST API
 */
async function getDiaXlmPrice(): Promise<{ price: number; timestamp: string }> {
  try {
    const response = await axios.get(
      \`\${DIA_REST_API}/assetQuotation/Stellar/0x0000000000000000000000000000000000000000\`
    );

    const data = response.data;
    const price = Number(data.Price);
    const timestamp = data.Time;

    console.log(\`XLM Price from DIA: $\${price}\`);
    console.log(\`Last Updated: \${timestamp}\`);

    return { price, timestamp };
  } catch (error) {
    console.error('Error fetching XLM price from DIA:', error);
    throw error;
  }
}

/**
 * Get any asset price from DIA REST API
 */
async function getDiaAssetPrice(
  blockchain: string,
  address: string
): Promise<{ price: number; timestamp: string; symbol: string }> {
  try {
    const response = await axios.get(
      \`\${DIA_REST_API}/assetQuotation/\${blockchain}/\${address}\`
    );

    const data = response.data;
    
    return {
      price: Number(data.Price),
      timestamp: data.Time,
      symbol: data.Symbol
    };
  } catch (error) {
    console.error('Error fetching asset price from DIA:', error);
    throw error;
  }
}

/**
 * Get multiple cryptocurrency prices
 */
async function getDiaCryptoPrices(symbols: string[]): Promise<Map<string, number>> {
  const prices = new Map<string, number>();

  for (const symbol of symbols) {
    try {
      const response = await axios.get(
        \`\${DIA_REST_API}/quotation/\${symbol}\`
      );

      const price = Number(response.data.Price);
      prices.set(symbol, price);
      console.log(\`✓ \${symbol}: $\${price}\`);
    } catch (error) {
      console.warn(\`✗ Failed to get price for \${symbol}\`);
    }
  }

  return prices;
}

// ============================================================================
// QUERY DIA ORACLE VIA SOROBAN CONTRACT (ON-CHAIN)
// ============================================================================

/**
 * Get price from DIA Soroban oracle contract
 */
async function getDiaSorobanPrice(
  asset: string
): Promise<{ price: number; decimals: number; timestamp: number }> {
  try {
    const rpc = new SorobanRpc.Server(RPC_URL);
    const contract = new Contract(DIA_SOROBAN_CONTRACT);

    // Call the DIA oracle contract's get_price method
    const result = await contract.methods.get_price({ asset }).call({ rpc });

    const price = Number(result.price);
    const decimals = Number(result.decimals || 18);
    const timestamp = Number(result.timestamp);

    const adjustedPrice = price / Math.pow(10, decimals);

    console.log(\`\${asset} Price from DIA Soroban: \${adjustedPrice}\`);

    return {
      price: adjustedPrice,
      decimals,
      timestamp
    };
  } catch (error) {
    console.error('Error fetching DIA Soroban price:', error);
    throw error;
  }
}

/**
 * Get latest price data with metadata
 */
async function getDiaPriceWithMetadata(
  asset: string
): Promise<{
  price: number;
  source: string;
  methodology: string;
  updateFrequency: string;
}> {
  try {
    const response = await axios.get(
      \`\${DIA_REST_API}/v1/assetQuotation/\${asset}\`
    );

    const data = response.data;

    return {
      price: Number(data.Price),
      source: 'DIA Oracle',
      methodology: 'VWAPIR',
      updateFrequency: data.UpdateFrequency || 'Real-time'
    };
  } catch (error) {
    console.error('Error fetching DIA price metadata:', error);
    throw error;
  }
}

/**
 * Get historical price data
 */
async function getDiaHistoricalPrices(
  asset: string,
  startTime: string,
  endTime: string
): Promise<Array<{ timestamp: string; price: number }>> {
  try {
    const response = await axios.get(
      \`\${DIA_REST_API}/v1/chartPoints/\${asset}/\${startTime}/\${endTime}\`
    );

    const data = response.data;
    
    return data.map((point: any) => ({
      timestamp: point.Timestamp,
      price: Number(point.Value)
    }));
  } catch (error) {
    console.error('Error fetching DIA historical prices:', error);
    throw error;
  }
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

// Example 1: Get XLM price via REST API
getDiaXlmPrice()
  .then(data => console.log('XLM Price:', data))
  .catch(console.error);

// Example 2: Get BTC price via Soroban contract
getDiaSorobanPrice('BTC')
  .then(data => console.log('BTC Price:', data))
  .catch(console.error);

// Example 3: Get multiple crypto prices
getDiaCryptoPrices(['BTC', 'ETH', 'XLM', 'USDC'])
  .then(prices => console.log('All Prices:', prices))
  .catch(console.error);

// Example 4: Get asset with blockchain address
getDiaAssetPrice('Stellar', '0x0000000000000000000000000000000000000000')
  .then(data => console.log('Asset Data:', data))
  .catch(console.error);

// Example 5: Get price with metadata
getDiaPriceWithMetadata('XLM')
  .then(data => console.log('Price Metadata:', data))
  .catch(console.error);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/DIAdata_org",
    telegram: "https://t.me/DIAdata_org",
    discord: "https://discord.gg/dianetwork",
    medium: "https://medium.com/dia-insights",
    github: "https://github.com/diadata-org",
  },
  
  features: {
    multiAsset: true,
    vwapirMethodology: true,
    crossChain: true,
    customFeeds: true,
    sorobanIntegration: true,
    restAPI: true,
    realTimeData: true,
    historicalData: true,
  },
  
  supportedAssets: [
    "BTC (Bitcoin)",
    "ETH (Ethereum)",
    "XLM (Stellar Lumens)",
    "USDC (USD Coin)",
    "DIA (DIA Token)",
    "20,000+ cryptocurrencies and tokens",
    "Stock indices",
    "Commodities",
  ],
  
  methodology: {
    name: "VWAPIR",
    fullName: "Volume-Weighted Average Price with Interquartile Range",
    description: "Manipulation-resistant pricing methodology that uses volume-weighted averages and statistical filtering to provide accurate price feeds",
    benefits: [
      "Resistant to wash trading",
      "Filters outlier trades",
      "Multi-exchange aggregation",
      "Statistical robustness",
    ],
  },
  
  dataExchanges: [
    "Binance",
    "Coinbase",
    "Kraken",
    "Huobi",
    "OKEx",
    "100+ CEX and DEX sources",
  ],
  
  notes: [
    "Provides data for 20,000+ assets across multiple blockchains",
    "Uses VWAPIR methodology for manipulation resistance",
    "Both REST API and Soroban smart contract access available",
    "No API key required for basic REST API usage",
    "Soroban contract: CAEDPEZDRCEJCF73ASC5JGNKCIJDV2QJQSW6DJ6B74MYALBNKCJ5IFP4",
    "Integrated with Stellar since Soroban launch",
    "Real-time and historical data available",
    "Custom oracle feeds available for enterprise use",
    "Open-source and transparent data sourcing",
    "Suitable for DeFi protocols requiring high data quality",
  ],
  
  resources: {
    website: "https://www.diadata.org/",
    documentation: "https://docs.diadata.org/",
    stellarIntegration: "https://developers.stellar.org/docs/data/oracles/oracle-providers",
    restAPI: "https://docs.diadata.org/documentation/api-1",
    sorobanGuide: "https://docs.diadata.org/documentation/oracle-documentation/soroban",
    github: "https://github.com/diadata-org",
    blog: "https://medium.com/dia-insights",
  },
};

