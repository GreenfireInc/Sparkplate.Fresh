// Stellar Native DEX - Protocol-Level DEX Oracle
// Type: Protocol-Level DEX Oracle
// Blockchain: Stellar (XLM)

export const stellarNativeDexOracle = {
  name: "Stellar Native DEX",
  blockchain: "Stellar (XLM)",
  type: "Protocol-Level DEX Oracle",
  description: "Stellar's built-in decentralized exchange serves as an implicit oracle. Unlike external oracle providers, the Stellar protocol includes a native order book and path payment system that provides real-time pricing data without external dependencies. Every Stellar account can trade on this DEX via the Horizon API.",
  
  url: "https://developers.stellar.org/",
  docs: "https://developers.stellar.org/docs/data/apis/horizon",
  horizonAPI: "https://horizon.stellar.org",
  
  api: {
    horizonMainnet: "https://horizon.stellar.org",
    horizonTestnet: "https://horizon-testnet.stellar.org",
    orderBook: "/orderbook",
    trades: "/trades",
    paths: "/paths",
    strictReceivePaths: "/strict_receive_paths",
    strictSendPaths: "/strict_send_paths",
    documentation: "https://developers.stellar.org/docs/data/apis/horizon",
  },
  
  sdk: {
    npm: "@stellar/stellar-sdk",
    installation: "npm install @stellar/stellar-sdk",
    documentation: "https://stellar.github.io/js-stellar-sdk/",
    github: "https://github.com/stellar/js-stellar-sdk",
    features: [
      "Order book queries",
      "Trade history",
      "Path finding",
      "Strict send/receive paths",
      "Asset trading operations",
    ],
  },
  
  integration: {
    example: `
// Stellar Native DEX Oracle Integration Example
import * as StellarSDK from '@stellar/stellar-sdk';

const HORIZON_URL = 'https://horizon.stellar.org';
const server = new StellarSDK.Horizon.Server(HORIZON_URL);

// Common Stellar assets
const XLM = StellarSDK.Asset.native();
const USDC = new StellarSDK.Asset(
  'USDC',
  'GBBD47UB5TK5VSR7I4PSUKBT4FJDV3HF2NQMSTK3X74XEXDT5VEISP'
);
const USDT = new StellarSDK.Asset(
  'USDT',
  'GBUQWP3BOUZX2NR4MLKHQSB5RFUKDAXYF4F3PYKPTMQQ2BTJGMF4XMIS'
);

// ============================================================================
// QUERY ORDER BOOK FOR PRICING
// ============================================================================

/**
 * Get order book for a trading pair
 */
async function getOrderBook(
  sellingAsset: StellarSDK.Asset,
  buyingAsset: StellarSDK.Asset,
  limit: number = 20
): Promise<StellarSDK.ServerApi.OrderbookRecord> {
  try {
    const orderBook = await server
      .orderbook(sellingAsset, buyingAsset)
      .limit(limit)
      .call();

    console.log('Order book fetched successfully');
    return orderBook;
  } catch (error) {
    console.error('Error fetching order book:', error);
    throw error;
  }
}

/**
 * Get current price from order book (bid/ask)
 */
async function getCurrentPrice(
  sellingAsset: StellarSDK.Asset,
  buyingAsset: StellarSDK.Asset
): Promise<{ bid: number; ask: number; mid: number; spread: number }> {
  try {
    const orderBook = await getOrderBook(sellingAsset, buyingAsset, 1);

    const bids = orderBook.bids || [];
    const asks = orderBook.asks || [];

    const bid = bids.length > 0 ? Number(bids[0].price) : 0;
    const ask = asks.length > 0 ? Number(asks[0].price) : 0;
    const mid = bid && ask ? (bid + ask) / 2 : bid || ask || 0;
    const spread = ask && bid ? ((ask - bid) / bid) * 100 : 0;

    console.log(\`Price - Bid: \${bid}, Ask: \${ask}, Mid: \${mid}, Spread: \${spread.toFixed(2)}%\`);

    return { bid, ask, mid, spread };
  } catch (error) {
    console.error('Error getting current price:', error);
    throw error;
  }
}

// ============================================================================
// QUERY TRADE HISTORY
// ============================================================================

/**
 * Get recent trades for a pair
 */
async function getRecentTrades(
  sellingAsset: StellarSDK.Asset,
  buyingAsset: StellarSDK.Asset,
  limit: number = 100
): Promise<StellarSDK.ServerApi.TradeRecord[]> {
  try {
    const trades = await server
      .trades()
      .forAssetPair(sellingAsset, buyingAsset)
      .order('desc')
      .limit(limit)
      .call();

    console.log(\`Found \${trades.records.length} recent trades\`);
    return trades.records;
  } catch (error) {
    console.error('Error fetching recent trades:', error);
    throw error;
  }
}

/**
 * Calculate average price from recent trades
 */
async function getAveragePrice(
  sellingAsset: StellarSDK.Asset,
  buyingAsset: StellarSDK.Asset,
  limit: number = 50
): Promise<number> {
  try {
    const trades = await getRecentTrades(sellingAsset, buyingAsset, limit);

    if (trades.length === 0) {
      throw new Error('No trades available');
    }

    const avgPrice =
      trades.reduce((sum, trade) => sum + Number(trade.price.n) / Number(trade.price.d), 0) /
      trades.length;

    console.log(\`Average price from \${trades.length} trades: \${avgPrice}\`);
    return avgPrice;
  } catch (error) {
    console.error('Error calculating average price:', error);
    throw error;
  }
}

// ============================================================================
// PATH FINDING FOR EXCHANGE RATES
// ============================================================================

/**
 * Find best path for exchange between two assets
 */
async function findExchangePath(
  sourceAsset: StellarSDK.Asset,
  destinationAsset: StellarSDK.Asset,
  destinationAmount: string
): Promise<StellarSDK.ServerApi.PathRecord[]> {
  try {
    const paths = await server
      .strictReceivePaths()
      .sourceAsset(sourceAsset)
      .destinationAsset(destinationAsset)
      .destinationAmount(destinationAmount)
      .call();

    console.log(\`Found \${paths.records.length} possible paths\`);
    return paths.records;
  } catch (error) {
    console.error('Error finding exchange paths:', error);
    throw error;
  }
}

/**
 * Calculate effective exchange rate via path finding
 */
async function getEffectiveExchangeRate(
  sourceAsset: StellarSDK.Asset,
  destinationAsset: StellarSDK.Asset,
  amount: string
): Promise<number> {
  try {
    const paths = await findExchangePath(sourceAsset, destinationAsset, amount);

    if (paths.length === 0) {
      throw new Error('No exchange path found');
    }

    const bestPath = paths[0];
    const sourceAmount = Number(bestPath.source_amount);
    const destAmount = Number(amount);
    const rate = destAmount / sourceAmount;

    console.log(\`Effective exchange rate: \${rate}\`);
    return rate;
  } catch (error) {
    console.error('Error calculating effective exchange rate:', error);
    throw error;
  }
}

// ============================================================================
// AGGREGATED PRICING DATA
// ============================================================================

interface PricingData {
  pair: string;
  bid: number;
  ask: number;
  mid: number;
  avgPrice: number;
  effectiveRate: number;
  timestamp: number;
}

/**
 * Get comprehensive pricing data for a trading pair
 */
async function getComprehensivePricing(
  sellingAsset: StellarSDK.Asset,
  buyingAsset: StellarSDK.Asset,
  amount: string = '100'
): Promise<PricingData> {
  try {
    const sellingCode = sellingAsset.code || 'XLM';
    const buyingCode = buyingAsset.code || 'XLM';
    const pairName = \`\${sellingCode}/\${buyingCode}\`;

    const orderBookPrice = await getCurrentPrice(sellingAsset, buyingAsset);
    const avgPrice = await getAveragePrice(sellingAsset, buyingAsset, 50);
    const effectiveRate = await getEffectiveExchangeRate(sellingAsset, buyingAsset, amount);

    const pricingData: PricingData = {
      pair: pairName,
      bid: orderBookPrice.bid,
      ask: orderBookPrice.ask,
      mid: orderBookPrice.mid,
      avgPrice,
      effectiveRate,
      timestamp: Date.now()
    };

    console.log(\`Comprehensive pricing for \${pairName}:\`, pricingData);
    return pricingData;
  } catch (error) {
    console.error('Error getting comprehensive pricing:', error);
    throw error;
  }
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

// Example 1: Get XLM/USDC order book
getOrderBook(XLM, USDC, 10)
  .then(orderBook => console.log('Order Book:', orderBook))
  .catch(console.error);

// Example 2: Get current XLM/USDC price
getCurrentPrice(XLM, USDC)
  .then(price => console.log('Current Price:', price))
  .catch(console.error);

// Example 3: Get average price from recent trades
getAveragePrice(XLM, USDC, 50)
  .then(avgPrice => console.log('Average Price:', avgPrice))
  .catch(console.error);

// Example 4: Find exchange path
findExchangePath(XLM, USDC, '100')
  .then(paths => console.log('Exchange Paths:', paths))
  .catch(console.error);

// Example 5: Get comprehensive pricing data
getComprehensivePricing(XLM, USDC, '100')
  .then(data => console.log('Comprehensive Pricing:', data))
  .catch(console.error);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/StellarOrg",
    telegram: "https://t.me/stellar",
    discord: "https://discord.gg/stellar",
    reddit: "https://www.reddit.com/r/Stellar/",
    github: "https://github.com/stellar",
  },
  
  features: {
    protocolNative: true,
    orderBookModel: true,
    pathPayments: true,
    noExternalDependency: true,
    realTimeData: true,
    lowFees: true,
    fastSettlement: true,
    multiCurrency: true,
  },
  
  advantages: [
    "Protocol-native (no external oracle needed)",
    "Real-time order book data",
    "Low transaction fees (~0.00001 XLM)",
    "Fast settlement (5-6 seconds)",
    "No manipulation risk (protocol-level)",
    "Built-in path finding for multi-hop trades",
    "Transparent and verifiable on-chain data",
    "No API keys required",
  ],
  
  commonAssets: {
    xlm: "XLM (Native Stellar Lumens)",
    usdc: "USDC: GBBD47UB5TK5VSR7I4PSUKBT4FJDV3HF2NQMSTK3X74XEXDT5VEISP",
    usdt: "USDT: GBUQWP3BOUZX2NR4MLKHQSB5RFUKDAXYF4F3PYKPTMQQ2BTJGMF4XMIS",
    btc: "BTC: Various anchors",
    eth: "ETH: Various anchors",
  },
  
  notes: [
    "Stellar's DEX is built into the protocol (not a separate smart contract)",
    "Order book model (not AMM like Uniswap)",
    "Every Stellar account can trade without permission",
    "Provides implicit oracle functionality through market prices",
    "No external oracle dependency reduces attack vectors",
    "Transaction fees are only 0.00001 XLM per operation",
    "5-6 second settlement time",
    "Path payments allow multi-hop trades automatically",
    "Best for real-time pricing data on Stellar",
    "Use Horizon API for querying order books and trades",
  ],
  
  resources: {
    developers: "https://developers.stellar.org/",
    horizonAPI: "https://developers.stellar.org/docs/data/apis/horizon",
    sdk: "https://stellar.github.io/js-stellar-sdk/",
    laboratory: "https://laboratory.stellar.org/",
    stellarExpert: "https://stellar.expert/explorer/public",
    stellarChain: "https://stellarchain.io/",
    dashboard: "https://dashboard.stellar.org/",
  },
};

