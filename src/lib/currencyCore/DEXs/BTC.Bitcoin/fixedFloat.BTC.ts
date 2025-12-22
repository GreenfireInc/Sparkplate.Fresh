/**
 * FixedFloat - Lightning-Fast Cryptocurrency Exchange
 *
 * Lightning-fast cryptocurrency exchange with competitive rates
 * Non-custodial exchange supporting BTC and multiple cryptocurrencies
 *
 * @type Instant Exchange
 * @custody Non-custodial
 */

export const fixedFloat = {
  name: 'FixedFloat',
  type: 'Instant Exchange',

  // Platform URLs
  website: 'https://fixedfloat.com/',
  app: 'https://fixedfloat.com/exchange',
  docs: 'https://fixedfloat.com/api',

  // Social Media
  social: {
    twitter: 'https://twitter.com/fixedfloat',
    telegram: 'https://t.me/fixedfloat',
    reddit: 'https://reddit.com/r/fixedfloat',
  },

  // Features
  features: {
    instantExchange: true,
    nonCustodial: true,
    lightningFast: true,
    competitiveRates: true,
    noKYC: true,
    privacy: true,
    crossChain: true,
    apiAccess: true,
    subgraph: false,
    officialSDK: false,
    restAPI: true,
  },

  // Supported Assets
  supportedAssets: [
    'BTC (Bitcoin)',
    'ETH (Ethereum)',
    'LTC (Litecoin)',
    'USDT (Tether)',
    'USDC (USD Coin)',
    'And 50+ more cryptocurrencies',
  ],

  // Exchange Features
  exchangeFeatures: [
    'Fixed-rate exchanges',
    'Float-rate exchanges',
    'Lightning-fast transactions',
    'Competitive exchange rates',
    'No account registration',
    'Privacy protection',
    'Multi-currency support',
  ],

  // Rate Types
  rateTypes: {
    fixed: {
      description: 'Lock in exchange rate at time of order creation',
      advantage: 'Price protection against market volatility',
      validity: 'Orders valid for 30 minutes',
    },
    float: {
      description: 'Rate adjusts with market conditions',
      advantage: 'Potentially better rates if market moves favorably',
      risk: 'Rate can change before transaction completion',
    },
  },

  // Integration via REST API
  integrationExample: `
// FixedFloat API Integration
import fetch from 'node-fetch';

const FIXEDFLOAT_API = 'https://fixedfloat.com/api/v2';

interface FixedFloatCurrency {
  code: string;
  name: string;
  network: string;
  requiresExtraId: boolean;
  extraIdName: string;
}

interface FixedFloatPrice {
  from: FixedFloatCurrency;
  to: FixedFloatCurrency;
  minAmount: string;
  maxAmount: string;
  estimatedAmount: string;
  rate: string;
  fee: string;
  depositFee: string;
  withdrawalFee: string;
}

interface FixedFloatOrder {
  id: string;
  type: 'fixed' | 'float';
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  depositAddress: string;
  withdrawalAddress: string;
  expectedDepositAmount: string;
  expectedWithdrawalAmount: string;
  rate: string;
  status: string;
  createdAt: string;
}

// Get available currencies
async function getCurrencies(): Promise<FixedFloatCurrency[]> {
  try {
    const response = await fetch(\`\${FIXEDFLOAT_API}/currencies\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to get currencies:', error);
    throw error;
  }
}

// Get exchange price
async function getPrice(
  fromCurrency: string,
  toCurrency: string,
  amount: string,
  type: 'fixed' | 'float' = 'fixed'
): Promise<FixedFloatPrice> {
  try {
    const params = new URLSearchParams({
      fromCurrency,
      toCurrency,
      amount,
      type,
    });

    const response = await fetch(\`\${FIXEDFLOAT_API}/price?\${params}\`);
    const data = await response.json();

    console.log(\`\${amount} \${fromCurrency} = \${data.estimatedAmount} \${toCurrency}\`);
    console.log(\`Rate: 1 \${fromCurrency} = \${data.rate} \${toCurrency}\`);

    return data;
  } catch (error) {
    console.error('Failed to get price:', error);
    throw error;
  }
}

// Create exchange order
async function createExchange(
  fromCurrency: string,
  toCurrency: string,
  amount: string,
  toAddress: string,
  type: 'fixed' | 'float' = 'fixed',
  extraId?: string
): Promise<FixedFloatOrder> {
  try {
    const body: any = {
      fromCurrency,
      toCurrency,
      amount,
      toAddress,
      type,
    };

    if (extraId) {
      body.extraId = extraId;
    }

    const response = await fetch(\`\${FIXEDFLOAT_API}/exchange\`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    const order = await response.json();
    console.log('Exchange created:', order);
    console.log('Send', order.expectedDepositAmount, fromCurrency, 'to:', order.depositAddress);

    return order;
  } catch (error) {
    console.error('Failed to create exchange:', error);
    throw error;
  }
}

// Get order status
async function getOrderStatus(orderId: string): Promise<FixedFloatOrder> {
  try {
    const response = await fetch(\`\${FIXEDFLOAT_API}/exchange/\${orderId}\`);
    const order = await response.json();
    console.log('Order status:', order.status);
    return order;
  } catch (error) {
    console.error('Failed to get order status:', error);
    throw error;
  }
}

// Get minimum/maximum amounts
async function getLimits(fromCurrency: string, toCurrency: string): Promise<{
  minAmount: string;
  maxAmount: string;
}> {
  try {
    const params = new URLSearchParams({
      fromCurrency,
      toCurrency,
    });

    const response = await fetch(\`\${FIXEDFLOAT_API}/limits?\${params}\`);
    const data = await response.json();

    return {
      minAmount: data.minAmount,
      maxAmount: data.maxAmount,
    };
  } catch (error) {
    console.error('Failed to get limits:', error);
    throw error;
  }
}

// Monitor BTC exchange rates
async function monitorBTCRates(): Promise<void> {
  console.log('Monitoring FixedFloat BTC rates...');

  const pairs = [
    { from: 'BTC', to: 'ETH' },
    { from: 'BTC', to: 'USDT' },
    { from: 'BTC', to: 'LTC' },
  ];

  setInterval(async () => {
    try {
      const testAmount = '1'; // 1 BTC

      for (const pair of pairs) {
        const price = await getPrice(pair.from, pair.to, testAmount, 'fixed');
        console.log(\`FixedFloat \${pair.from}->\${pair.to}: \${price.estimatedAmount} (rate: \${price.rate})\`);
      }
    } catch (error) {
      console.error('Rate monitoring error:', error);
    }
  }, 30000); // Update every 30 seconds
}

// Monitor exchange order
async function monitorExchange(orderId: string): Promise<void> {
  const checkStatus = async () => {
    try {
      const order = await getOrderStatus(orderId);
      console.log(\`Order \${orderId}: \${order.status}\`);

      const completedStatuses = ['finished'];
      const failedStatuses = ['failed', 'refunded'];

      if (completedStatuses.includes(order.status)) {
        console.log('Exchange completed successfully!');
        return;
      }

      if (failedStatuses.includes(order.status)) {
        console.log('Exchange failed or was refunded.');
        return;
      }

      // Check again in 30 seconds
      setTimeout(checkStatus, 30000);
    } catch (error) {
      console.error('Status check failed:', error);
      setTimeout(checkStatus, 30000);
    }
  };

  checkStatus();
}

// Usage Examples
async function fixedFloatExamples() {
  try {
    // Get available currencies
    const currencies = await getCurrencies();
    console.log('Available currencies:', currencies.length);

    // Get BTC exchange limits
    const btcLimits = await getLimits('BTC', 'ETH');
    console.log('BTC->ETH limits:', btcLimits);

    // Get current BTC price
    const btcPrice = await getPrice('BTC', 'USDT', '1');
    console.log('BTC price:', btcPrice);

    // Monitor rates
    await monitorBTCRates();

    // Example exchange creation (uncomment to use)
    // const order = await createExchange('BTC', 'ETH', '0.1', '0x...', 'fixed');
    // await monitorExchange(order.id);

  } catch (error) {
    console.error('FixedFloat example error:', error);
  }
}
`,

  // Data Sources
  dataSources: [
    {
      name: 'FixedFloat API',
      type: 'REST API',
      url: 'https://fixedfloat.com/api',
      description: 'Official API for prices, exchanges, and order management',
      endpoints: [
        '/currencies - Get supported currencies',
        '/price - Get exchange rates',
        '/exchange - Create and manage exchanges',
        '/limits - Get trading limits',
      ],
    },
  ],

  // Exchange Process
  exchangeProcess: [
    'Select currencies and amount',
    'Choose fixed or float rate',
    'Create exchange order',
    'Send cryptocurrency to deposit address',
    'Wait for confirmation and exchange',
    'Receive exchanged cryptocurrency',
  ],

  // Important Notes
  notes: [
    'Lightning-fast cryptocurrency exchange',
    'No account registration required',
    'Non-custodial service',
    'Supports fixed and float rates',
    'Competitive exchange rates',
    'Multi-currency support (50+ cryptocurrencies)',
    'Privacy-focused (no KYC)',
    'API access available',
    'Fast transaction processing',
    '24/7 customer support',
  ],
};

export default fixedFloat;
