/**
 * StealthEX - Limitless Crypto Exchange
 *
 * Privacy-focused non-custodial instant exchange
 * Supports DOGE and 400+ cryptocurrencies with no limits
 *
 * @type Instant Exchange
 * @custody Non-custodial
 */

export const stealthex = {
  name: 'StealthEX',
  type: 'Instant Exchange',

  // Platform URLs
  website: 'https://stealthex.io/',
  app: 'https://stealthex.io/exchange',

  // Social Media
  social: {
    twitter: 'https://twitter.com/StealthEXio',
    telegram: 'https://t.me/StealthEXio',
    reddit: 'https://reddit.com/r/StealthEX',
  },

  // Features
  features: {
    instantExchange: true,
    noLimits: true,
    privacy: true,
    nonCustodial: true,
    noKYC: true,
    crossChain: true,
    apiAccess: true,
    restAPI: true,
    subgraph: false,
    officialSDK: false,
  },

  // Supported Assets (400+)
  supportedAssets: [
    'DOGE (Dogecoin)',
    'BTC (Bitcoin)',
    'ETH (Ethereum)',
    'LTC (Litecoin)',
    'USDT (Tether)',
    'USDC (USD Coin)',
    'BCH (Bitcoin Cash)',
    'And 390+ more cryptocurrencies',
  ],

  // Exchange Features
  exchangeFeatures: [
    'No exchange limits',
    'Instant transactions',
    'Fixed and float rates',
    'No registration required',
    'Privacy protection',
    'Multi-currency support',
    '24/7 customer support',
  ],

  // Rate Types
  rateTypes: {
    fixed: {
      description: 'Guaranteed exchange rate locked at order creation',
      advantage: 'Price protection against market volatility',
      validity: 'Orders valid for 30 minutes',
    },
    float: {
      description: 'Rate may change based on market conditions',
      advantage: 'Potentially better rates if market moves favorably',
      risk: 'Rate can change before transaction completion',
    },
  },

  // Integration via REST API
  integrationExample: `
// StealthEX API Integration
import fetch from 'node-fetch';

const STEALTHEX_API = 'https://api.stealthex.io/api/v2';

interface StealthExCurrency {
  code: string;
  name: string;
  network: string;
  has_extra_id: boolean;
  extra_id: string;
  image: string;
  precision: number;
}

interface StealthExExchange {
  id: string;
  type: 'fixed' | 'float';
  timestamp: string;
  from_currency: string;
  to_currency: string;
  deposit_amount: string;
  withdrawal_amount: string;
  expected_deposit_amount: string;
  expected_withdrawal_amount: string;
  deposit_address: string;
  withdrawal_address: string;
  deposit_extra_id?: string;
  withdrawal_extra_id?: string;
  rate: string;
  status: string;
}

// Get available currencies
async function getCurrencies(): Promise<StealthExCurrency[]> {
  try {
    const response = await fetch(\`\${STEALTHEX_API}/currency\`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to get currencies:', error);
    throw error;
  }
}

// Get exchange amount
async function getExchangeAmount(
  fromCurrency: string,
  toCurrency: string,
  amount: string,
  type: 'fixed' | 'float' = 'fixed'
): Promise<{
  minAmount: string;
  maxAmount: string;
  estimatedAmount: string;
  rate: string;
}> {
  try {
    const params = new URLSearchParams({
      from: fromCurrency,
      to: toCurrency,
      amount: amount,
      type: type,
    });

    const response = await fetch(\`\${STEALTHEX_API}/exchange/amount?\${params}\`);
    const data = await response.json();

    console.log(\`\${amount} \${fromCurrency} = \${data.estimated_amount} \${toCurrency}\`);
    console.log(\`Rate: \${data.rate}\`);

    return {
      minAmount: data.min_amount,
      maxAmount: data.max_amount,
      estimatedAmount: data.estimated_amount,
      rate: data.rate
    };
  } catch (error) {
    console.error('Failed to get exchange amount:', error);
    throw error;
  }
}

// Create exchange
@DataSources: [
  {
    name: 'StealthEX API',
    type: 'REST API',
    url: 'https://api.stealthex.io/api/v2',
    description: 'Official API for exchange rates, orders, and status tracking',
    endpoints: [
      '/currency - Get supported currencies',
      '/exchange/amount - Get exchange rates',
      '/exchange - Create and manage exchanges',
      '/exchange/{id} - Get exchange status',
    ],
  },
],

  // Exchange Process
  exchangeProcess: [
    'Select currencies and amount',
    'Choose fixed or float rate',
    'Create exchange order',
    'Send cryptocurrency to deposit address',
    'Wait for confirmation and processing',
    'Receive exchanged cryptocurrency',
  ],

  // Security Features
  securityFeatures: [
    'Non-custodial exchange',
    'No user funds storage',
    'Cryptographic transaction verification',
    'Privacy protection',
    'No personal data collection',
  ],

  // Important Notes
  notes: [
    'Limitless exchange amounts (no upper limits)',
    'No registration or KYC required',
    'Non-custodial and privacy-focused',
    'Supports 400+ cryptocurrencies',
    'Fixed and float rate options',
    'Fast transaction processing',
    'API access available',
    '24/7 customer support',
    'DOGE fully supported',
  ],
};

export default stealthex;
