// SideShift.ai Exchange Information
// Cross-chain instant exchange for Litecoin
// Source: Research compiled from Oct14.Research.Cryptocurrency.LTC.Litecoin

export const sideShiftDEX = {
  name: "SideShift.ai",
  blockchain: "Multi-Chain (including Litecoin)",
  type: "Cross-Chain Instant Exchange",
  description: "Non-custodial instant cryptocurrency exchange supporting Litecoin with no registration required. Offers fixed and variable rate exchanges with fast settlement times.",
  
  urls: {
    main: "https://sideshift.ai/",
    app: "https://sideshift.ai/",
    docs: "https://sideshift.ai/api",
  },
  
  api: {
    endpoints: {
      baseUrl: "https://sideshift.ai/api/v2",
      pairs: "https://sideshift.ai/api/v2/pairs",
      quote: "https://sideshift.ai/api/v2/quotes",
      orders: "https://sideshift.ai/api/v2/orders",
    },
    documentation: "https://sideshift.ai/api",
    rateLimit: "Public API available",
    requiresApiKey: false,
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "axios",
          package: "axios",
          description: "HTTP client for API requests",
          installCommand: "npm install axios",
        },
      ],
      documentation: "https://sideshift.ai/api",
    },
  },
  
  integration: {
    quoteExample: `
import axios from 'axios';

async function getSideShiftQuote(
  fromCoin: string = 'ltc',
  toCoin: string = 'btc',
  amount: string
) {
  try {
    const response = await axios.post('https://sideshift.ai/api/v2/quotes', {
      depositCoin: fromCoin,
      settleCoin: toCoin,
      depositAmount: amount,
    });
    
    console.log('SideShift Quote:', response.data);
    return response.data;
  } catch (error) {
    console.error('SideShift API error:', error);
    throw error;
  }
}

// Get quote for 1 LTC -> BTC
const quote = await getSideShiftQuote('ltc', 'btc', '1.0');
console.log(\`Rate: \${quote.rate}\`);
console.log(\`You will receive: \${quote.settleAmount} BTC\`);
    `,
    
    createOrderExample: `
import axios from 'axios';

async function createSideShiftOrder(
  fromCoin: string,
  toCoin: string,
  settleAddress: string,
  refundAddress: string
) {
  try {
    const response = await axios.post('https://sideshift.ai/api/v2/orders', {
      depositCoin: fromCoin,
      settleCoin: toCoin,
      settleAddress: settleAddress,
      refundAddress: refundAddress,
    });
    
    console.log('SideShift Order:', response.data);
    console.log(\`Send \${fromCoin.toUpperCase()} to: \${response.data.depositAddress}\`);
    return response.data;
  } catch (error) {
    console.error('SideShift order error:', error);
    throw error;
  }
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/sideshiftai",
    telegram: "https://t.me/SideShift_ai",
  },
  
  features: {
    hasApi: true,
    hasSdk: false,
    hasSubgraph: false,
    isActive: true,
    supportsCrossChain: true,
    hasLiquidityMining: false,
    isEvmCompatible: false,
    noRegistration: true,
    nonCustodial: true,
    fixedRate: true,
    variableRate: true,
  },
  
  notes: [
    "SideShift.ai supports both fixed and variable rate exchanges",
    "No registration or KYC required",
    "Non-custodial - funds never held by platform",
    "Fast settlement times (typically under 30 minutes)",
    "Supports 50+ cryptocurrencies including LTC",
  ],
};
