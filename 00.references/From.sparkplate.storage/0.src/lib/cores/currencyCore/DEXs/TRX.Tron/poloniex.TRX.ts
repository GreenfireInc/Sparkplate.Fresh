// Poloniex DEX Information
// Hybrid exchange with DEX features on Tron
// Source: Research compiled from Oct14.Research.Cryptocurrency.TRX.Tron

export const poloniexDEX = {
  name: "Poloniex DEX",
  blockchain: "Tron (TRX)",
  type: "Hybrid Exchange",
  description: "Established cryptocurrency exchange with integrated DEX features supporting TRC-20 tokens on Tron. Poloniex combines centralized and decentralized trading for optimal liquidity.",
  
  urls: {
    main: "https://poloniex.com/",
    trade: "https://poloniex.com/trade",
    swap: "https://poloniex.com/swap",
    docs: "https://docs.poloniex.com/",
  },
  
  api: {
    endpoints: {
      restApi: "https://api.poloniex.com",
      websocket: "wss://ws.poloniex.com/ws/public",
      tronGridApi: "https://api.trongrid.io",
    },
    documentation: "https://docs.poloniex.com/",
    apiReference: "https://docs.poloniex.com/#introduction",
    rateLimit: "Varies by endpoint",
    requiresApiKey: true,
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "poloniex-api",
          package: "poloniex-api-node",
          description: "Poloniex API client for Node.js",
          installCommand: "npm install poloniex-api-node",
        },
        {
          name: "tronweb",
          package: "tronweb",
          description: "Tron blockchain SDK",
          installCommand: "npm install tronweb",
        },
      ],
      documentation: "https://docs.poloniex.com/",
    },
  },
  
  integration: {
    example: `
import axios from 'axios';

// Get ticker info from Poloniex
async function getPoloniexTicker(pair: string = 'TRX_USDT') {
  const response = await axios.get(
    \`https://api.poloniex.com/markets/\${pair}/ticker24h\`
  );
  
  console.log('Poloniex Ticker:', response.data);
  
  return response.data;
}

getPoloniexTicker('TRX_USDT');
    `,
  },
  
  social: {
    twitter: "https://twitter.com/Poloniex",
    telegram: "https://t.me/PoloniexAnnouncements",
    reddit: "https://www.reddit.com/r/Poloniex/",
  },
  
  features: {
    hasApi: true,
    hasSdk: true,
    hasSubgraph: false,
    hasGraphQL: false,
    isActive: true,
    supportsCrossChain: true,
    hasLiquidityMining: false,
    isEvmCompatible: false,
    isTVM: true,
    hasSolidityContracts: false,
    isHybridExchange: true,
    hasCEXFeatures: true,
    hasDEXFeatures: true,
    tvl: "$100+ million",
    volume24h: "$500+ million",
  },
  
  notes: [
    "Poloniex is owned by Justin Sun (Tron founder)",
    "Hybrid model combines CEX liquidity with DEX features",
    "Strong support for TRC-20 tokens",
    "High trading volume and liquidity",
    "API requires authentication for trading",
    "WebSocket support for real-time data",
    "Multi-chain support including Tron",
  ],
};
