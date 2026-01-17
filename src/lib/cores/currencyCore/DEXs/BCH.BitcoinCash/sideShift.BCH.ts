/**
 * SideShift.ai - Cross-Chain Instant Exchange
 * 
 * No-registration cryptocurrency exchange supporting BCH and 50+ assets
 * Non-custodial, privacy-focused instant exchange service
 * 
 * @type Cross-Chain Exchange / Instant Swap
 * @custody Non-custodial
 */

export const sideShift = {
  name: 'SideShift.ai',
  type: 'Cross-Chain Exchange',
  
  // Platform URLs
  website: 'https://sideshift.ai/',
  app: 'https://sideshift.ai/btc/bch',
  
  // Documentation
  docs: 'https://sideshift.ai/api',
  apiDocs: 'https://sideshift.ai/api',
  
  // API
  apiBase: 'https://sideshift.ai/api/v2',
  
  // API Endpoints
  endpoints: {
    // Public endpoints (no API key required)
    pairs: '/pairs',
    coins: '/coins',
    permissions: '/permissions',
    quote: '/quotes',
    createOrder: '/shifts/fixed',
    orderStatus: '/shifts/{orderId}',
    
    // Affiliate endpoints (API key required)
    affiliateStats: '/affiliate/stats',
    affiliateRevenue: '/affiliate/revenue',
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/sideshiftai',
    telegram: 'https://t.me/sideshift',
    reddit: 'https://reddit.com/r/sideshift',
  },
  
  // Features
  features: {
    noRegistration: true,
    nonCustodial: true,
    privacyFocused: true,
    crossChain: true,
    fixedRates: true,
    variableRates: true,
    affiliateProgram: true,
    apiAccess: true,
    subgraph: false,
    officialSDK: false,
  },
  
  // Supported Assets (50+)
  supportedAssets: [
    'BCH (Bitcoin Cash)',
    'BTC (Bitcoin)',
    'ETH (Ethereum)',
    'LTC (Litecoin)',
    'XMR (Monero)',
    'USDT (Tether)',
    'USDC (USD Coin)',
    'And 40+ more cryptocurrencies',
  ],
  
  // Integration Example (TypeScript)
  integrationExample: `
// SideShift.ai API Integration
import fetch from 'node-fetch';

const SIDESHIFT_API = 'https://sideshift.ai/api/v2';

interface ShiftQuote {
  id: string;
  depositCoin: string;
  settleCoin: string;
  depositAmount: string;
  settleAmount: string;
  rate: string;
  expiresAt: string;
}

interface ShiftOrder {
  id: string;
  depositAddress: string;
  settleAddress: string;
  depositCoin: string;
  settleCoin: string;
  depositAmount: string;
  settleAmount: string;
  status: string;
}

// Get available trading pairs
async function getPairs(): Promise<any[]> {
  const response = await fetch(\`\${SIDESHIFT_API}/pairs\`);
  const data = await response.json();
  return data;
}

// Get quote for BCH to BTC swap
async function getQuote(
  depositCoin: string,
  settleCoin: string,
  depositAmount: string
): Promise<ShiftQuote> {
  const response = await fetch(\`\${SIDESHIFT_API}/quotes\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      depositMethod: depositCoin,
      settleMethod: settleCoin,
      depositAmount: depositAmount,
    }),
  });
  
  const quote = await response.json();
  console.log('Quote:', quote);
  return quote;
}

// Create fixed-rate order
async function createOrder(
  quoteId: string,
  settleAddress: string,
  affiliateId?: string
): Promise<ShiftOrder> {
  const body: any = {
    quoteId: quoteId,
    settleAddress: settleAddress,
  };
  
  if (affiliateId) {
    body.affiliateId = affiliateId;
  }
  
  const response = await fetch(\`\${SIDESHIFT_API}/shifts/fixed\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  
  const order = await response.json();
  console.log('Order created:', order);
  console.log('Send', order.depositAmount, order.depositCoin, 'to:', order.depositAddress);
  return order;
}

// Check order status
async function getOrderStatus(orderId: string): Promise<ShiftOrder> {
  const response = await fetch(\`\${SIDESHIFT_API}/shifts/\${orderId}\`);
  const order = await response.json();
  console.log('Order status:', order.status);
  return order;
}

// Usage Example: Swap 1 BCH to BTC
async function swapBCHtoBTC() {
  // 1. Get quote
  const quote = await getQuote('bch', 'btc', '1');
  console.log(\`Rate: 1 BCH = \${quote.settleAmount} BTC\`);
  
  // 2. Create order
  const btcAddress = 'bc1q...'; // Your BTC receiving address
  const order = await createOrder(quote.id, btcAddress);
  
  // 3. Send BCH to deposit address
  console.log(\`Send \${order.depositAmount} BCH to: \${order.depositAddress}\`);
  
  // 4. Monitor order status
  const checkStatus = setInterval(async () => {
    const status = await getOrderStatus(order.id);
    console.log('Status:', status.status);
    
    if (status.status === 'settled') {
      console.log('Swap complete! BTC sent to your address.');
      clearInterval(checkStatus);
    }
  }, 10000); // Check every 10 seconds
}

swapBCHtoBTC();
  `,
  
  // Order Status Flow
  orderStatuses: [
    'pending - Order created, awaiting deposit',
    'processing - Deposit received, swap in progress',
    'settling - Sending funds to recipient',
    'settled - Swap complete',
    'refunding - Refund in progress (if issue occurs)',
    'refunded - Refund complete',
  ],
  
  // Rate Types
  rateTypes: {
    fixed: 'Lock in exchange rate at quote time (recommended)',
    variable: 'Rate determined when deposit is received',
  },
  
  // Limits
  limits: {
    minimum: 'Varies by trading pair',
    maximum: 'Varies by trading pair',
    note: 'Check /pairs endpoint for specific limits',
  },
  
  // Fees
  fees: {
    tradingFee: '0.75% - 2%',
    networkFees: 'Included in quote',
    affiliateFee: 'Optional 0.5% - 2% for affiliates',
  },
  
  // Data Sources
  dataSources: [
    {
      name: 'SideShift API',
      type: 'REST API',
      url: 'https://sideshift.ai/api',
      description: 'Official API for quotes, orders, and status',
    },
  ],
  
  // Important Notes
  notes: [
    'No account or KYC required',
    'Non-custodial - funds never held by SideShift',
    'Privacy-focused (no user data stored)',
    'Fixed-rate quotes valid for 10 minutes',
    'Minimum and maximum limits vary by pair',
    'Network fees included in quote',
    'Affiliate program available',
    'Support for 50+ cryptocurrencies',
    'Orders typically complete in 5-30 minutes',
  ],
};

export default sideShift;
