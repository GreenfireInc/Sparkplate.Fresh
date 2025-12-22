// Waves.Exchange - Official Waves Hybrid Exchange
// Type: Hybrid DEX/CEX with orderbook matching
// Blockchain: Waves (WAVES)

export const wavesExchangeDEX = {
  name: "Waves.Exchange",
  blockchain: "Waves (WAVES)",
  type: "Hybrid Exchange (DEX/CEX)",
  description: "Official Waves exchange combining DEX and CEX features with gateway services, staking, and comprehensive trading tools",
  
  url: "https://waves.exchange/",
  app: "https://waves.exchange/trading",
  docs: "https://docs.waves.exchange/",
  
  api: {
    restEndpoint: "https://api.waves.exchange",
    matcherEndpoint: "https://matcher.waves.exchange/api/v1",
    nodeEndpoint: "https://nodes.wavesnodes.com",
    dataServiceEndpoint: "https://api.wavesplatform.com/v0",
    websocket: "wss://ws.waves.exchange",
    documentation: "https://docs.waves.exchange/",
    rateLimit: "100 requests/second (free tier)",
    authentication: "Optional API key for higher limits",
  },
  
  sdk: {
    npm: "@waves/signer, @waves/waves-transactions, @waves/ts-lib-crypto",
    installation: "npm install @waves/signer @waves/waves-transactions",
    documentation: "https://docs.waves.tech/en/building-apps/waves-api-and-sdk/",
    features: [
      "Transaction signing",
      "Order placement and cancellation",
      "Account balance queries",
      "Market data retrieval",
      "Keeper Wallet integration",
    ],
  },
  
  integration: {
    example: `
// Waves.Exchange Integration Example
import { Signer } from '@waves/signer';
import { transfer, data } from '@waves/waves-transactions';
import fetch from 'node-fetch';

const MATCHER_URL = 'https://matcher.waves.exchange/api/v1';
const NODE_URL = 'https://nodes.wavesnodes.com';

// Get order book for a trading pair
async function getOrderBook(amountAsset: string | null, priceAsset: string | null) {
  const response = await fetch(
    \`\${MATCHER_URL}/orderbook/\${amountAsset || 'WAVES'}/\${priceAsset || 'WAVES'}?depth=10\`
  );
  const orderBook = await response.json();
  
  console.log('Order Book:', orderBook);
  return orderBook;
}`,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/wavesexchange",
    telegram: "https://t.me/wavesexchange",
    medium: "https://medium.com/@waves.exchange",
    reddit: "https://www.reddit.com/r/Wavesplatform/",
    discord: "https://discord.gg/waves",
  },
  
  features: {
    orderbook: true,
    amm: false,
    limit_orders: true,
    market_orders: true,
    stop_orders: true,
    margin_trading: false,
    perpetuals: false,
    options: false,
    nft: true,
    fiat_onramp: true,
    governance: true,
    staking: true,
    mobile_app: true,
  },
  
  fees: {
    trading: "0.003 WAVES per order (maker and taker)",
    withdrawal: "Variable by asset",
    deposit: "Free",
  },
  
  notes: [
    "Official Waves exchange with largest liquidity",
    "Hybrid model combines DEX security with CEX speed",
    "Built-in Matcher nodes for order matching",
    "Gateway services for BTC, ETH, LTC deposits",
    "Integrated staking and leasing features",
    "Mobile apps available for iOS and Android",
    "Supports 30,000+ custom Waves tokens",
    "Fixed 0. baryon WAVES fee per order",
  ],
};
