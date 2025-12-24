/**
 * ChangeNOW - Non-Custodial Instant Exchange
 * 
 * Easy cryptocurrency exchange without registration
 * Non-custodial service supporting BCH and 150+ cryptocurrencies
 * Instant exchange with competitive rates
 *
 * @type Instant Exchange
 * @custody Non-custodial
 */

export const changeNOW = {
  name: 'ChangeNOW',
  type: 'Instant Exchange',
  
  // Platform URLs
  website: 'https://changenow.io/',
  app: 'https://changenow.io/exchange?from=bch&to=btc',
  
  // Documentation
  docs: 'https://changenow.io/api',
  apiDocs: 'https://changenow.io/api',
  
  // API
  apiBase: 'https://api.changenow.io/v2',
  
  // API Endpoints
  endpoints: {
    // Public endpoints
    currencies: '/exchange/currencies',
    minAmount: '/min-amount/{from}_{to}',
    exchangeAmount: '/exchange-amount/{amount}/{from}_{to}',
    exchangeRange: '/exchange-range/{from}_{to}',
    createExchange: '/exchange',
    exchangeStatus: '/exchange/{id}',
    availableCurrencies: '/exchange/currencies/available',
    
    // Merchant endpoints (API key required)
    merchantTransactions: '/merchant/{merchantId}/transactions',
    merchantSettings: '/merchant/{merchantId}',
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/ChangeNOW_io',
    telegram: 'https://t.me/ChangeNOW_support',
    reddit: 'https://reddit.com/r/ChangeNOW',
    medium: 'https://medium.com/changenow',
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
  
  // Supported Assets (150+)
  supportedAssets: [
    'BCH (Bitcoin Cash)',
    'BTC (Bitcoin)',
    'ETH (Ethereum)',
    'LTC (Litecoin)',
    'USDT (Tether)',
    'USDC (USD Coin)',
    'And 140+ more cryptocurrencies',
  ],
  
  // Integration Example (TypeScript)
  integrationExample: `
// ChangeNOW API Integration
import fetch from 'node-fetch';

const CHANGENOW_API = 'https://api.changenow.io/v2';

interface ExchangeRate {
  estimatedAmount: string;
  minAmount: string;
  maxAmount: string;
  rate: string;
  rateId: string;
}

interface Exchange {
  id: string;
  fromCurrency: string;
  toCurrency: string;
  depositAddress: string;
  payoutAddress: string;
  expectedDepositAmount: string;
  expectedPayoutAmount: string;
  createdAt: string;
  status: string;
}

// Get available currencies
async function getCurrencies(): Promise<any[]> {
  const response = await fetch(\`\${CHANGENOW_API}/exchange/currencies\`);
  const data = await response.json();
  return data;
}

// Get exchange rate
async function getExchangeAmount(
  amount: string,
  fromCurrency: string,
  toCurrency: string
): Promise<ExchangeRate> {
  const response = await fetch(
    \`\${CHANGENOW_API}/exchange-amount/\${amount}/\${fromCurrency}_\${toCurrency}\`
  );
  const data = await response.json();
  return data;
}

// Get minimum amount
async function getMinAmount(fromCurrency: string, toCurrency: string): Promise<string> {
  const response = await fetch(
    \`\${CHANGENOW_API}/min-amount/\${fromCurrency}_\${toCurrency}\`
  );
  const data = await response.json();
  return data.minAmount;
}

// Create exchange
async function createExchange(
  fromCurrency: string,
  toCurrency: string,
  amount: string,
  payoutAddress: string,
  payoutExtraId?: string
): Promise<Exchange> {
  const body: any = {
    fromCurrency: fromCurrency,
    toCurrency: toCurrency,
    amount: amount,
    address: payoutAddress,
  };

  if (payoutExtraId) {
    body.extraId = payoutExtraId;
  }

  const response = await fetch(\`\${CHANGENOW_API}/exchange\`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });

  const exchange = await response.json();
  console.log('Exchange created:', exchange);
  console.log('Send', exchange.expectedDepositAmount, fromCurrency, 'to:', exchange.depositAddress);
  return exchange;
}

// Check exchange status
async function getExchangeStatus(exchangeId: string): Promise<Exchange> {
  const response = await fetch(\`\${CHANGENOW_API}/exchange/\${exchangeId}\`);
  const exchange = await response.json();
  console.log('Exchange status:', exchange.status);
  return exchange;
}

// Usage Example: Swap 1 BCH to BTC
async function swapBCHtoBTC() {
  try {
    // 1. Check minimum amount
    const minAmount = await getMinAmount('bch', 'btc');
    console.log(\`Minimum BCH amount: \${minAmount}\`);

    // 2. Get exchange rate for 1 BCH
    const rate = await getExchangeAmount('1', 'bch', 'btc');
    console.log(\`Rate: 1 BCH = \${rate.estimatedAmount} BTC\`);

    // 3. Create exchange
    const btcAddress = 'bc1q...'; // Your BTC receiving address
    const exchange = await createExchange('bch', 'btc', '1', btcAddress);

    // 4. Send BCH to deposit address
    console.log(\`Send \${exchange.expectedDepositAmount} BCH to: \${exchange.depositAddress}\`);

    // 5. Monitor exchange status
    const checkStatus = setInterval(async () => {
      const status = await getExchangeStatus(exchange.id);
      console.log('Status:', status.status);

      if (status.status === 'finished') {
        console.log('Exchange complete! BTC sent to your address.');
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
    'new - Exchange created',
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
    minimum: 'Varies by trading pair (check /min-amount endpoint)',
    maximum: 'Varies by trading pair (check /exchange-range endpoint)',
    note: 'Limits are dynamic and can change based on market conditions',
  },
  
  // Fees
  fees: {
    exchangeFee: '0.5% - 1.5%',
    networkFees: 'Included in quote',
    depositFee: 'None (depends on sending network)',
    withdrawalFee: 'None (depends on receiving network)',
  },
  
  // Data Sources
  dataSources: [
    {
      name: 'ChangeNOW API',
      type: 'REST API',
      url: 'https://changenow.io/api',
      description: 'Official API for exchange rates, orders, and status',
    },
  ],
  
  // Important Notes
  notes: [
    'No account registration or KYC required',
    'Non-custodial service - funds never held by ChangeNOW',
    'Instant exchange with competitive rates',
    'Minimum and maximum amounts vary by pair',
    'Network fees included in exchange rate',
    'Support for 150+ cryptocurrencies',
    'Exchanges typically complete in 5-30 minutes',
    'Merchant API available for businesses',
    '24/7 customer support',
  ],
};

export default changeNOW;
