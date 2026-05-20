// Waves DEX Matcher Oracle - Real-Time Order Book Oracle
// Type: DEX Order Book Oracle
// Blockchain: Waves (WAVES)

export const matcherOracle = {
  name: "Waves.Exchange Matcher",
  blockchain: "Waves (WAVES)",
  type: "DEX Order Book Oracle",
  description: "The Waves DEX Matcher provides real-time price feeds from the native Waves decentralized exchange order book. Unlike AMM DEXs, Waves uses an order-book model where buy and sell orders are matched by centralized Matcher nodes. Provides the most real-time pricing data on Waves.",
  
  url: "https://waves.exchange/",
  docs: "https://docs.wavesplatform.com/en/waves-api-and-sdk/dex-api/matcher.html",
  app: "https://waves.exchange/",
  
  api: {
    matcherAPI: "https://matcher.waves.exchange/api/v1",
    wxNetworkMatcher: "https://matcher.wx.network/api/v1",
    orderBook: "https://matcher.waves.exchange/api/v1/orderbook/{amountAsset}/{priceAsset}",
    publicTrades: "https://matcher.waves.exchange/api/v1/orderbook/{amountAsset}/{priceAsset}/publicTrades",
    candles: "https://matcher.waves.exchange/api/v1/candles/{amountAsset}/{priceAsset}/{interval}",
    documentation: "https://docs.wavesplatform.com/en/waves-api-and-sdk/dex-api/matcher.html",
  },
  
  sdk: {
    npm: "@waves/waves-transactions",
    installation: "npm install @waves/waves-transactions @waves/signer",
    documentation: "https://docs.wavesplatform.com/en/waves-api-and-sdk/dex-api/matcher.html",
    github: "https://github.com/wavesprotocol/matcher",
    features: [
      "Real-time order book data",
      "Trade history",
      "OHLCV candles",
      "Order placement",
      "Order cancellation",
    ],
  },
  
  commonAssetIDs: {
    WAVES: null, // null or 'WAVES' represents native WAVES
    USDT: "34N9YcEETLWn4QeGT5NSWNzhKQCAJXDW1K5CqPHf3S7A",
    WXUSD: "5FwpE4Tf4FKdFxgpF7sCVkP3vF3YKs9V3HvQKHBG8YuJi",
    WBTC: "8LQW8f7P5d5PZM7GtZEBgaqRPGSbQJXYXoV60858Ym7n",
    WETH: "474jTeYx2r2Va35794wSCEK3XvzJaG3QQv5Cj2QBCF7K",
  },
  
  integration: {
    example: `
// Waves Matcher Oracle Integration Example
import fetch from 'node-fetch';

const MATCHER_API = 'https://matcher.waves.exchange/api/v1';

// Common asset IDs
const WAVES = 'WAVES';
const USDT = '34N9YcEETLWn4QeGT5NSWNzhKQCAJXDW1K5CqPHf3S7A';
const WXUSD = '5FwpE4Tf4FKdFxgpF7sCVkP3vF3YKs9V3HvQKHBG8YuJi';

// ============================================================================
// QUERY MATCHER ORDER BOOK
// ============================================================================

/**
 * Get order book for a trading pair
 */
async function getOrderBook(
  amountAsset: string,
  priceAsset: string,
  depth: number = 100
): Promise<any> {
  try {
    const response = await fetch(
      \`\${MATCHER_API}/orderbook/\${amountAsset}/\${priceAsset}?depth=\${depth}\`
    );

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: Failed to fetch order book\`);
    }

    const orderBook = await response.json();
    console.log(\`Order book for \${amountAsset}/\${priceAsset}:\`, orderBook);
    return orderBook;
  } catch (error) {
    console.error('Error fetching order book:', error);
    throw error;
  }
}

/**
 * Get current price from order book (best bid/ask)
 */
async function getCurrentPrice(
  amountAsset: string,
  priceAsset: string
): Promise<{ bid: number; ask: number; mid: number }> {
  try {
    const orderBook = await getOrderBook(amountAsset, priceAsset, 1);

    const bids = orderBook.bids || [];
    const asks = orderBook.asks || [];

    const bid = bids.length > 0 ? Number(bids[0].price) : 0;
    const ask = asks.length > 0 ? Number(asks[0].price) : 0;
    const mid = (bid + ask) / 2;

    console.log(\`Bid: \${bid}, Ask: \${ask}, Mid: \${mid}\`);
    return { bid, ask, mid };
  } catch (error) {
    console.error('Error fetching current price:', error);
    throw error;
  }
}

/**
 * Get last trades for a trading pair
 */
async function getLastTrades(
  amountAsset: string,
  priceAsset: string,
  limit: number = 100
): Promise<any> {
  try {
    const response = await fetch(
      \`\${MATCHER_API}/orderbook/\${amountAsset}/\${priceAsset}/publicTrades?limit=\${limit}\`
    );

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: Failed to fetch trades\`);
    }

    const trades = await response.json();
    console.log(\`Last \${limit} trades:\`, trades);
    return trades;
  } catch (error) {
    console.error('Error fetching last trades:', error);
    throw error;
  }
}

/**
 * Calculate average price from last trades
 */
async function getAveragePrice(
  amountAsset: string,
  priceAsset: string,
  limit: number = 50
): Promise<number> {
  try {
    const trades = await getLastTrades(amountAsset, priceAsset, limit);

    if (!trades || trades.length === 0) {
      throw new Error('No trades available');
    }

    const avgPrice =
      trades.reduce((sum: number, trade: any) => sum + Number(trade.price), 0) /
      trades.length;

    console.log(\`Average price: \${avgPrice}\`);
    return avgPrice;
  } catch (error) {
    console.error('Error calculating average price:', error);
    throw error;
  }
}

/**
 * Get OHLCV candles
 */
async function getCandles(
  amountAsset: string,
  priceAsset: string,
  interval: string = '1h'
): Promise<any> {
  try {
    // Intervals: 5m, 15m, 30m, 1h, 4h, 1d
    const response = await fetch(
      \`\${MATCHER_API}/candles/\${amountAsset}/\${priceAsset}/\${interval}\`
    );

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: Failed to fetch candles\`);
    }

    const candles = await response.json();
    console.log(\`Candles (\${interval}):\`, candles);
    return candles;
  } catch (error) {
    console.error('Error fetching candles:', error);
    throw error;
  }
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

// Example 1: Get WAVES/USDT order book
getOrderBook(WAVES, USDT, 10)
  .then(orderBook => console.log('WAVES/USDT Order Book:', orderBook))
  .catch(console.error);

// Example 2: Get current WAVES/USDT price
getCurrentPrice(WAVES, USDT)
  .then(price => console.log('WAVES/USDT Price:', price))
  .catch(console.error);

// Example 3: Get last 50 trades
getLastTrades(WAVES, USDT, 50)
  .then(trades => console.log('Last 50 Trades:', trades))
  .catch(console.error);

// Example 4: Get average price from last 50 trades
getAveragePrice(WAVES, USDT, 50)
  .then(avgPrice => console.log('Average Price:', avgPrice))
  .catch(console.error);

// Example 5: Get 1-hour candles
getCandles(WAVES, USDT, '1h')
  .then(candles => console.log('1h Candles:', candles))
  .catch(console.error);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/wavesexchange",
    telegram: "https://t.me/WavesExchange",
    discord: "https://discord.gg/waves",
    medium: "https://medium.com/@wavesexchange",
    github: "https://github.com/wavesprotocol/matcher",
  },
  
  features: {
    realTimeOrderBook: true,
    tradeHistory: true,
    ohlcvCandles: true,
    orderPlacement: true,
    fixedFees: true,
    nonCustodial: true,
    orderBookModel: true,
    fastSettlement: true,
  },
  
  candleIntervals: [
    "5m",
    "15m",
    "30m",
    "1h",
    "4h",
    "1d",
  ],
  
  fees: {
    matcherFee: "0.003 WAVES per filled order",
    orderType: "Limit orders",
    settlement: "~3 seconds",
  },
  
  notes: [
    "Real-time price data from native Waves DEX",
    "Order-book model (not AMM like Uniswap)",
    "Fixed fees: 0.003 WAVES per order",
    "Fast settlement: ~3 seconds",
    "Non-custodial trading",
    "Supports 30,000+ custom tokens on Waves",
    "No authentication required for public endpoints",
    "Best source for real-time Waves trading data",
    "OHLCV candles available (5m to 1d intervals)",
    "Alternative matchers: WX Network, Waves.Exchange",
  ],
  
  resources: {
    matcherAPI: "https://docs.wavesplatform.com/en/waves-api-and-sdk/dex-api/matcher.html",
    wavesExchange: "https://waves.exchange/",
    wxNetwork: "https://wx.network/",
    github: "https://github.com/wavesprotocol/matcher",
    documentation: "https://docs.wavesplatform.com/en/waves-api-and-sdk/dex-api/",
  },
};

