// SideShift.ai DEX Information
// Instant cross-chain cryptocurrency exchange supporting ETC
// Source: Research compiled from Oct14.Research.Cryptocurrency.ETC.EthereumClassic

export const sideShiftDEX = {
  name: "SideShift.ai",
  blockchain: "Multi-Chain (including Ethereum Classic)",
  type: "Cross-Chain Exchange",
  description: "Instant cryptocurrency exchange supporting Ethereum Classic and many other chains. SideShift.ai provides fast, non-custodial swaps without registration or KYC.",
  
  urls: {
    main: "https://sideshift.ai/",
    app: "https://sideshift.ai/etc",
    docs: "https://sideshift.ai/api",
    apiDocs: "https://sideshift.ai/api",
  },
  
  api: {
    endpoints: {
      baseUrl: "https://sideshift.ai/api/v2",
      pairs: "https://sideshift.ai/api/v2/pairs",
      quote: "https://sideshift.ai/api/v2/quotes",
      orders: "https://sideshift.ai/api/v2/orders",
    },
    documentation: "https://sideshift.ai/api",
    rateLimit: "Public API available with rate limits",
    requiresApiKey: false,
    requiresAffiliateId: "Optional for revenue sharing",
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
    getPairsExample: `
import axios from 'axios';

// Get all available trading pairs
async function getSideShiftPairs() {
  try {
    const response = await axios.get('https://sideshift.ai/api/v2/pairs');
    
    // Filter for ETC pairs
    const etcPairs = response.data.filter((pair: any) => 
      pair.includes('etc')
    );
    
    console.log('ETC Trading Pairs:', etcPairs);
    return etcPairs;
  } catch (error) {
    console.error('Error fetching pairs:', error);
    throw error;
  }
}
    `,
    
    getQuoteExample: `
import axios from 'axios';

// Get quote for ETC swap
async function getSideShiftQuote(
  depositCoin: string,  // e.g., 'etc'
  settleCoin: string,   // e.g., 'btc'
  depositAmount: string // Amount in deposit coin
) {
  try {
    const response = await axios.post('https://sideshift.ai/api/v2/quotes', {
      depositCoin,
      settleCoin,
      depositAmount,
    });
    
    const quote = response.data;
    
    console.log('Quote ID:', quote.id);
    console.log('Deposit Amount:', quote.depositAmount, depositCoin.toUpperCase());
    console.log('Settle Amount:', quote.settleAmount, settleCoin.toUpperCase());
    console.log('Rate:', quote.rate);
    console.log('Expires:', new Date(quote.expiresAt));
    
    return quote;
  } catch (error) {
    console.error('Error getting quote:', error);
    throw error;
  }
}
    `,
    
    createOrderExample: `
import axios from 'axios';

// Create order from quote
async function createSideShiftOrder(
  quoteId: string,
  settleAddress: string, // Destination address
  affiliateId?: string   // Optional affiliate ID
) {
  try {
    const response = await axios.post('https://sideshift.ai/api/v2/orders', {
      quoteId,
      settleAddress,
      ...(affiliateId && { affiliateId }),
    });
    
    const order = response.data;
    
    console.log('Order ID:', order.id);
    console.log('Deposit Address:', order.depositAddress);
    console.log('Deposit Coin:', order.depositCoin);
    console.log('Settle Address:', order.settleAddress);
    console.log('Settle Coin:', order.settleCoin);
    console.log('Status:', order.status);
    
    return order;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
}
    `,
    
    trackOrderExample: `
import axios from 'axios';

// Track order status
async function trackSideShiftOrder(orderId: string) {
  try {
    const response = await axios.get(\`https://sideshift.ai/api/v2/orders/\${orderId}\`);
    
    const order = response.data;
    
    console.log('Order Status:', order.status);
    console.log('Deposit Amount Received:', order.depositAmountReceived);
    console.log('Settle Amount:', order.settleAmount);
    
    // Order statuses: pending, processing, settling, settled, refunded
    return order;
  } catch (error) {
    console.error('Error tracking order:', error);
    throw error;
  }
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/sideshiftai",
    telegram: "https://t.me/sideshift",
  },
  
  features: {
    hasApi: true,
    hasSdk: false,
    hasSubgraph: false,
    isActive: true,
    supportsCrossChain: true,
    hasLiquidityMining: false,
    isEvmCompatible: false, // Not EVM-specific
    isInstantExchange: true,
    noKyc: true,
    noRegistration: true,
    hasAffiliateProgram: true,
  },
  
  notes: [
    "SideShift.ai is a non-custodial instant exchange, not a traditional DEX",
    "Supports ETC swaps to/from many other cryptocurrencies",
    "No registration or KYC required",
    "Fast swaps typically complete in minutes",
    "Affiliate program available for revenue sharing",
  ],
};
