// Kaiko Oracle - Institutional-Grade Market Data Oracle
// Type: Market Data Oracle
// Blockchain: Tezos (XTZ) - Cross-chain

export const kaikoOracle = {
  name: "Kaiko",
  blockchain: "Tezos (XTZ)",
  type: "Market Data Oracle",
  description: "Data provider oracle for institutional-grade feeds; aggregates from CEXs/DEXs for on-chain use. Provides comprehensive market data, prices, and volumes.",
  
  url: "https://www.kaiko.com/",
  docs: "https://docs.kaiko.com/",
  
  api: {
    baseURL: "https://us.market-api.kaiko.io",
    documentation: "https://docs.kaiko.com/",
    apiReference: "https://docs.kaiko.com/#introduction",
    requiresApiKey: true,
    rateLimit: "Varies by subscription tier",
  },
  
  sdk: {
    npm: "axios",
    installation: "npm install axios @taquito/taquito",
    documentation: "https://docs.kaiko.com/",
    features: [
      "Institutional-grade market data",
      "Real-time and historical prices",
      "Order book data",
      "Trade data aggregation",
      "Multi-exchange coverage",
    ],
  },
  
  integration: {
    example: `
// Kaiko Oracle Integration Example
import axios from 'axios';
import { TezosToolkit } from '@taquito/taquito';

const KAIKO_API_BASE = 'https://us.market-api.kaiko.io';
const KAIKO_API_KEY = process.env.KAIKO_API_KEY; // Get from Kaiko
const Tezos = new TezosToolkit('https://mainnet.api.tez.ie');

// Get XTZ price from Kaiko
async function getXTZPrice(exchange: string = 'gdax') {
  try {
    const response = await axios.get(
      \`\${KAIKO_API_BASE}/v2/data/trades.v1/spot_direct_exchange_rate/\${exchange}/xtz/usd\`,
      {
        headers: {
          'X-Api-Key': KAIKO_API_KEY,
          'Accept': 'application/json'
        },
        params: {
          interval: '1m',
          page_size: 1
        }
      }
    );
    
    const latestTrade = response.data.data[0];
    const price = latestTrade.price;
    const timestamp = new Date(latestTrade.timestamp);
    
    console.log(\`XTZ Price on \${exchange}: $\${price}\`);
    console.log(\`Last Updated: \${timestamp.toISOString()}\`);
    
    return {
      exchange,
      symbol: 'XTZ/USD',
      price,
      timestamp,
      volume: latestTrade.volume
    };
  } catch (error) {
    console.error('Error fetching XTZ price from Kaiko:', error);
    throw error;
  }
}

// Get aggregated price across multiple exchanges
async function getAggregatedPrice(asset: string, quote: string = 'usd') {
  try {
    const response = await axios.get(
      \`\${KAIKO_API_BASE}/v2/data/trades.v1/spot_exchange_rate/\${asset}/\${quote}\`,
      {
        headers: {
          'X-Api-Key': KAIKO_API_KEY,
          'Accept': 'application/json'
        },
        params: {
          interval: '1m',
          page_size: 1
        }
      }
    );
    
    const priceData = response.data.data[0];
    
    console.log(\`\${asset.toUpperCase()}/\${quote.toUpperCase()} Aggregated Price: $\${priceData.price}\`);
    
    return {
      asset: asset.toUpperCase(),
      quote: quote.toUpperCase(),
      price: priceData.price,
      timestamp: new Date(priceData.timestamp)
    };
  } catch (error) {
    console.error('Error fetching aggregated price:', error);
    throw error;
  }
}

// Get order book data
async function getOrderBook(exchange: string, baseAsset: string, quoteAsset: string) {
  try {
    const response = await axios.get(
      \`\${KAIKO_API_BASE}/v2/data/order_book_snapshots.v1/exchanges/\${exchange}/spot/\${baseAsset}-\${quoteAsset}/ob_aggregations/full\`,
      {
        headers: {
          'X-Api-Key': KAIKO_API_KEY,
          'Accept': 'application/json'
        },
        params: {
          page_size: 1
        }
      }
    );
    
    const orderBook = response.data.data[0];
    
    console.log('Order Book Data:', {
      exchange,
      pair: \`\${baseAsset}/\${quoteAsset}\`,
      bestBid: orderBook.best_bid,
      bestAsk: orderBook.best_ask,
      spread: orderBook.spread
    });
    
    return orderBook;
  } catch (error) {
    console.error('Error fetching order book:', error);
    throw error;
  }
}

// Get historical OHLCV data
async function getHistoricalOHLCV(
  exchange: string,
  baseAsset: string,
  quoteAsset: string,
  interval: string = '1d',
  startTime?: string,
  endTime?: string
) {
  try {
    const response = await axios.get(
      \`\${KAIKO_API_BASE}/v2/data/trades.v1/exchanges/\${exchange}/spot/\${baseAsset}-\${quoteAsset}/aggregations/ohlcv\`,
      {
        headers: {
          'X-Api-Key': KAIKO_API_KEY,
          'Accept': 'application/json'
        },
        params: {
          interval,
          start_time: startTime,
          end_time: endTime,
          page_size: 100
        }
      }
    );
    
    const ohlcvData = response.data.data;
    
    console.log(\`Historical OHLCV for \${baseAsset}/\${quoteAsset}:\`, ohlcvData.length, 'candles');
    
    return ohlcvData;
  } catch (error) {
    console.error('Error fetching historical OHLCV:', error);
    throw error;
  }
}

// Get market volume data
async function getMarketVolume(asset: string, quote: string = 'usd') {
  try {
    const response = await axios.get(
      \`\${KAIKO_API_BASE}/v2/data/trades.v1/spot_exchange_rate/\${asset}/\${quote}\`,
      {
        headers: {
          'X-Api-Key': KAIKO_API_KEY,
          'Accept': 'application/json'
        },
        params: {
          interval: '1d',
          page_size: 7 // Last 7 days
        }
      }
    );
    
    const volumeData = response.data.data.map((d: any) => ({
      date: d.timestamp,
      volume: d.volume,
      price: d.price
    }));
    
    console.log(\`\${asset.toUpperCase()} Volume Data:`, volumeData);
    
    return volumeData;
  } catch (error) {
    console.error('Error fetching market volume:', error);
    throw error;
  }
}

// Push Kaiko data to Tezos oracle contract
async function pushToTezosOracle(
  oracleAddress: string,
  assetSymbol: string,
  price: number,
  wallet: any
) {
  try {
    const contract = await Tezos.contract.at(oracleAddress);
    
    // Scale price appropriately (e.g., to 6 decimal places)
    const scaledPrice = Math.floor(price * 1000000);
    
    const op = await contract.methods
      .update_price(assetSymbol, scaledPrice, Math.floor(Date.now() / 1000))
      .send({ source: wallet.address });
    
    await op.confirmation();
    
    console.log(\`Price pushed to Tezos oracle: \${assetSymbol} = $\${price}\`);
    console.log('Transaction hash:', op.hash);
    
    return op;
  } catch (error) {
    console.error('Error pushing to Tezos oracle:', error);
    throw error;
  }
}

// Usage
getXTZPrice('kraken').then(data => console.log('XTZ Price (Kraken):', data));
getAggregatedPrice('xtz').then(data => console.log('XTZ Aggregated Price:', data));
getOrderBook('kraken', 'xtz', 'usd').then(ob => console.log('Order Book:', ob));
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/KaikoData",
    linkedin: "https://www.linkedin.com/company/kaiko/",
    medium: "https://medium.com/@kaiko_data",
  },
  
  features: {
    institutionalGrade: true,
    realTime: true,
    historical: true,
    orderBook: true,
    tradeData: true,
    multiExchange: true,
    apiKey: true,
  },
  
  supportedData: [
    "Market data",
    "Prices",
    "Volumes",
    "Order book snapshots",
    "Trade history",
    "OHLCV data",
  ],
  
  coverage: {
    exchanges: "100+ CEXs and DEXs",
    assets: "10,000+ trading pairs",
    dataPoints: "Billions of historical data points",
    updateFrequency: "Real-time (milliseconds)",
  },
  
  notes: [
    "Active oracle service for Tezos",
    "Institutional-grade market data",
    "Aggregates from 100+ CEXs and DEXs",
    "Real-time and historical data",
    "Order book and trade data",
    "API key required (paid service)",
    "REST API for data access",
    "Can push data to Tezos contracts",
    "Used by professional traders and institutions",
    "Comprehensive documentation",
  ],
  
  useCases: [
    "Institutional trading applications",
    "Market analytics platforms",
    "Smart contract price oracles",
    "Trading bots",
    "Portfolio management",
    "Risk management systems",
  ],
  
  pricing: {
    tier: "Paid service",
    freeTrial: "Available upon request",
    apiKeyRequired: true,
    website: "https://www.kaiko.com/pages/pricing",
  },
  
  apiEndpoints: {
    spotDirectExchangeRate: "/v2/data/trades.v1/spot_direct_exchange_rate/{exchange}/{base}/{quote}",
    spotExchangeRate: "/v2/data/trades.v1/spot_exchange_rate/{base}/{quote}",
    orderBookSnapshots: "/v2/data/order_book_snapshots.v1/exchanges/{exchange}/spot/{pair}/ob_aggregations/full",
    ohlcv: "/v2/data/trades.v1/exchanges/{exchange}/spot/{pair}/aggregations/ohlcv",
    referenceRates: "/v2/data/analytics.v1/reference-rates/{index_code}",
  },
};

