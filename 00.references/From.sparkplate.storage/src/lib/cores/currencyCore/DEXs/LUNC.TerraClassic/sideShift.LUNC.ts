// SideShift.ai Instant Exchange Information
// Cross-chain instant exchange with LUNC support
// Source: Research compiled from Oct14.Research.Cryptocurrency.LUNC.TerraClassic

export const sideShiftDEX = {
  name: "SideShift.ai",
  blockchain: "Terra Classic (LUNC) / Multi-Chain",
  type: "Cross-Chain Exchange",
  description: "Privacy-focused instant cryptocurrency exchange supporting LUNC and hundreds of other assets. SideShift.ai enables fast cross-chain swaps without KYC or registration.",
  
  urls: {
    main: "https://sideshift.ai/",
    exchange: "https://sideshift.ai/btc/lunc",
    docs: "https://sideshift.ai/api",
    apiDocs: "https://api.sideshift.ai/",
  },
  
  api: {
    endpoints: {
      quote: "https://sideshift.ai/api/v2/quotes",
      orders: "https://sideshift.ai/api/v2/orders",
      pairs: "https://sideshift.ai/api/v2/pairs",
      coins: "https://sideshift.ai/api/v2/coins",
    },
    documentation: "https://sideshift.ai/api",
    apiReference: "https://api.sideshift.ai/",
    rateLimit: "No API key required for basic usage",
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

// Get LUNC swap quote
async function getLuncQuote(
  depositCoin: string,
  settleCoin: string,
  depositAmount: string
) {
  const response = await axios.post(
    'https://sideshift.ai/api/v2/quotes',
    {
      depositCoin: depositCoin,
      settleCoin: settleCoin,
      depositAmount: depositAmount,
    }
  );
  
  console.log('Quote ID:', response.data.id);
  console.log('Deposit Amount:', response.data.depositAmount);
  console.log('Settle Amount:', response.data.settleAmount);
  console.log('Rate:', response.data.rate);
  
  return response.data;
}

getLuncQuote('btc', 'lunc', '0.001');
    `,
    
    createOrderExample: `
import axios from 'axios';

// Create LUNC exchange order
async function createLuncOrder(
  quoteId: string,
  settleAddress: string
) {
  const response = await axios.post(
    'https://sideshift.ai/api/v2/orders',
    {
      type: 'fixed',
      quoteId: quoteId,
      settleAddress: settleAddress,
    }
  );
  
  console.log('Order ID:', response.data.id);
  console.log('Deposit Address:', response.data.depositAddress);
  console.log('Expected Settlement:', response.data.settleAmount);
  
  return response.data;
}

createLuncOrder('QUOTE_ID', 'LUNC_ADDRESS');
    `,
    
    getPairsExample: `
import axios from 'axios';

// Get available LUNC trading pairs
async function getLuncPairs() {
  const response = await axios.get(
    'https://sideshift.ai/api/v2/pairs'
  );
  
  // Filter pairs with LUNC
  const luncPairs = response.data.filter((pair: any) => 
    pair.depositCoin === 'lunc' || pair.settleCoin === 'lunc'
  );
  
  console.log('LUNC Trading Pairs:', luncPairs.length);
  luncPairs.forEach((pair: any) => {
    console.log(\`\${pair.depositCoin} -> \${pair.settleCoin}\`);
  });
  
  return luncPairs;
}

getLuncPairs();
    `,
  },
  
  social: {
    twitter: "https://twitter.com/SideShiftai",
    telegram: "https://t.me/sideshift",
    reddit: "https://www.reddit.com/r/sideshift/",
  },
  
  features: {
    hasApi: true,
    hasSdk: false,
    hasSubgraph: false,
    hasGraphQL: false,
    isActive: true,
    supportsCrossChain: true,
    hasLiquidityMining: false,
    isEvmCompatible: false,
    isInstantExchange: true,
    noRegistration: true,
    noKYC: true,
    privacyFocused: true,
    fixedRates: true,
    floatingRates: true,
    supportedCoins: "200+",
  },
  
  notes: [
    "SideShift.ai is privacy-focused with no KYC",
    "No registration required",
    "Fixed and floating rate swaps",
    "Fast processing times (typically 5-15 minutes)",
    "Public API with no key required for basic usage",
    "Affiliate program available",
    "Tor-friendly and privacy-respecting",
    "Active community support",
  ],
};
