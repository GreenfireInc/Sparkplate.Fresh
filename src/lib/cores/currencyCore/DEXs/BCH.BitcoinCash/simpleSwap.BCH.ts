/**
 * SimpleSwap - Easy Cryptocurrency Exchange
 * 
 * Simple and secure cryptocurrency exchange without registration
 * Non-custodial instant exchange supporting BCH and 500+ cryptocurrencies
 * User-friendly interface with competitive rates
 *
 * @type Instant Exchange
 * @custody Non-custodial
 */

export const simpleSwap = {
  name: 'SimpleSwap',
  type: 'Instant Exchange',
  
  // Platform URLs
  website: 'https://simpleswap.io/',
  app: 'https://simpleswap.io/exchange?from=bch&to=btc',
  
  // Documentation
  docs: 'https://simpleswap.io/api',
  apiDocs: 'https://simpleswap.io/api',
  
  // API
  apiBase: 'https://api.simpleswap.io/v1',
  
  // API Endpoints
  endpoints: {
    // Public endpoints
    currencies: '/get_all_currencies',
    pairs: '/get_pairs',
    minAmount: '/get_min_amount',
    exchangeAmount: '/get_exchange_amount',
    createExchange: '/create_exchange',
    exchangeStatus: '/get_exchange',
    
    // Merchant endpoints (API key required)
    merchantExchanges: '/get_exchanges',
    merchantSettings: '/get_merchant',
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/SimpleSwap_io',
    telegram: 'https://t.me/simpleswap',
    reddit: 'https://reddit.com/r/SimpleSwap',
    medium: 'https://medium.com/simpleswap',
  },
  
  // Features
  features: {
    noRegistration: true,
    nonCustodial: true,
    instantExchange: true,
    fixedRates: false,
    variableRates: true,
    merchantAPI: true,
    apiAccess: true,
    subgraph: false,
    officialSDK: false,
  },
  
  // Supported Assets (500+)
  supportedAssets: [
    'BCH (Bitcoin Cash)',
    'BTC (Bitcoin)',
    'ETH (Ethereum)',
    'LTC (Litecoin)',
    'USDT (Tether)',
    'USDC (USD Coin)',
    'And 490+ more cryptocurrencies',
  ],
  
  // Integration Example (TypeScript)
  integrationExample: `
// SimpleSwap API Integration
import fetch from 'node-fetch';

const SIMPLESWAP_API = 'https://api.simpleswap.io/v1';

interface Currency {
  symbol: string;
  name: string;
  image: string;
  has_extra_id: boolean;
  extra_id: string | null;
  network: string;
  contract: string | null;
}

interface ExchangeAmount {
  min: string;
  max: string;
  rate: string;
  estimated_amount: string;
}

interface Exchange {
  id: string;
  type: string;
  timestamp: string;
  updated_at: string;
  deposit: {
    currency: string;
    amount: string;
    tx: string | null;
    address: string;
    extra_id: string | null;
  };
  withdrawal: {
    currency: string;
    amount: string;
    tx: string | null;
    address: string;
    extra_id: string | null;
  };
  status: string;
  deposit_hash: string | null;
  withdrawal_hash: string | null;
}

// Get available currencies
async function getCurrencies(): Promise<Currency[]> {
  const response = await fetch(\`\${SIMPLESWAP_API}/get_all_currencies\`);
  const data = await response.json();
  return data.result;
}

// Get minimum and maximum amounts
async function getMinAmount(
  currencyFrom: string,
  currencyTo: string
): Promise<{ min: string; max: string }> {
  const response = await fetch(
    \`\${SIMPLESWAP_API}/get_min_amount?currency_from=\${currencyFrom}&currency_to=\${currencyTo}\`
  );
  const data = await response.json();
  return data.result;
}

// Get exchange amount
async function getExchangeAmount(
  amount: string,
  currencyFrom: string,
  currencyTo: string
): Promise<ExchangeAmount> {
  const response = await fetch(
    \`\${SIMPLESWAP_API}/get_exchange_amount?amount=\${amount}&currency_from=\${currencyFrom}&currency_to=\${currencyTo}\`
  );
  const data = await response.json();
  return data.result;
}

// Create exchange
async function createExchange(
  currencyFrom: string,
  currencyTo: string,
  amount: string,
  addressTo: string,
  extraIdTo?: string
): Promise<Exchange> {
  const body: any = {
    currency_from: currencyFrom,
    currency_to: currencyTo,
    amount: amount,
    address_to: addressTo,
  };

  if (extraIdTo) {
    body.extra_id_to = extraIdTo;
  }

  const response = await fetch(\`\${SIMPLESWAP_API}/create_exchange\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const data = await response.json();
  console.log('Exchange created:', data.result);
  console.log('Send', data.result.deposit.amount, currencyFrom, 'to:', data.result.deposit.address);
  return data.result;
}

// Check exchange status
async function getExchangeStatus(exchangeId: string): Promise<Exchange> {
  const response = await fetch(\`\${SIMPLESWAP_API}/get_exchange?id=\${exchangeId}\`);
  const data = await response.json();
  console.log('Exchange status:', data.result.status);
  return data.result;
}

// Usage Example: Swap 1 BCH to BTC
async function swapBCHtoBTC() {
  try {
    // 1. Get available currencies
    const currencies = await getCurrencies();
    const bchSupported = currencies.some(c => c.symbol === 'bch');
    const btcSupported = currencies.some(c => c.symbol === 'btc');
    console.log('BCH supported:', bchSupported, 'BTC supported:', btcSupported);

    // 2. Get limits
    const limits = await getMinAmount('bch', 'btc');
    console.log(\`Min: \${limits.min} BCH, Max: \${limits.max} BCH\`);

    // 3. Get exchange amount for 1 BCH
    const exchangeAmount = await getExchangeAmount('1', 'bch', 'btc');
    console.log(\`Rate: 1 BCH = \${exchangeAmount.estimated_amount} BTC\`);

    // 4. Create exchange
    const btcAddress = 'bc1q...'; // Your BTC receiving address
    const exchange = await createExchange('bch', 'btc', '1', btcAddress);

    // 5. Send BCH to deposit address
    console.log(\`Send \${exchange.deposit.amount} BCH to: \${exchange.deposit.address}\`);

    // 6. Monitor exchange status
    const checkStatus = setInterval(async () => {
      const status = await getExchangeStatus(exchange.id);
      console.log('Status:', status.status);

      if (status.status === 'finished') {
        console.log('Exchange complete! BTC sent to your address.');
        console.log('Transaction:', status.withdrawal.tx);
        clearInterval(checkStatus);
      } else if (status.status === 'failed') {
        console.log('Exchange failed. Contact support.');
        clearInterval(checkStatus);
      }
    }, 30000); // Check every 30 seconds

  } catch (error) {
    console.error('Exchange error:', error);
  }
}

swapBCHtoBTC();
  `,
  
  // Exchange Status Flow
  exchangeStatuses: [
    'waiting_for_deposit - Waiting for deposit',
    'deposit_received - Deposit received, processing',
    'exchanging - Exchange in progress',
    'sending - Sending funds to recipient',
    'finished - Exchange complete',
    'failed - Exchange failed',
    'refunded - Refund sent',
  ],
  
  // Limits
  limits: {
    minimum: 'Varies by trading pair (check get_min_amount endpoint)',
    maximum: 'Varies by trading pair (check get_min_amount endpoint)',
    note: 'Limits are dynamic and can change based on market conditions',
  },
  
  // Fees
  fees: {
    exchangeFee: '0.5% - 2%',
    networkFees: 'Included in quote',
    depositFee: 'None (depends on sending network)',
    withdrawalFee: 'None (depends on receiving network)',
  },
  
  // Data Sources
  dataSources: [
    {
      name: 'SimpleSwap API',
      type: 'REST API',
      url: 'https://simpleswap.io/api',
      description: 'Official API for exchange rates, orders, and status',
    },
  ],
  
  // Important Notes
  notes: [
    'No account registration or KYC required',
    'Non-custodial service - funds never held by SimpleSwap',
    'Simple and secure interface',
    'Minimum and maximum amounts vary by pair',
    'Network fees included in exchange rate',
    'Support for 500+ cryptocurrencies',
    'Exchanges typically complete in 5-30 minutes',
    'Merchant API available for businesses',
    '24/7 customer support',
    'User-friendly mobile app available',
  ],
};

export default simpleSwap;
