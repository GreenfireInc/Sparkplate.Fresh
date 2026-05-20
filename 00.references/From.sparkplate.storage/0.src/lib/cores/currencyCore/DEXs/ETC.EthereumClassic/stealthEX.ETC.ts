// StealthEX DEX Information
// Limitless crypto exchange supporting ETC
// Source: Research compiled from Oct14.Research.Cryptocurrency.ETC.EthereumClassic

export const stealthEXDEX = {
  name: "StealthEX",
  blockchain: "Multi-Chain (including Ethereum Classic)",
  type: "Instant Exchange",
  description: "Limitless crypto exchange supporting Ethereum Classic. StealthEX provides instant, anonymous cryptocurrency exchanges with no registration, limits, or KYC for 1400+ assets.",
  
  urls: {
    main: "https://stealthex.io/",
    app: "https://stealthex.io/exchange?from=etc",
    docs: "https://stealthex.io/api-docs",
    apiDocs: "https://stealthex.io/api",
    affiliateProgram: "https://stealthex.io/affiliate-program",
  },
  
  api: {
    endpoints: {
      baseUrl: "https://api.stealthex.io/api/v2",
      currencies: "https://api.stealthex.io/api/v2/currency",
      pairs: "https://api.stealthex.io/api/v2/pairs",
      estimate: "https://api.stealthex.io/api/v2/estimate",
      exchange: "https://api.stealthex.io/api/v2/exchange",
      range: "https://api.stealthex.io/api/v2/range",
    },
    documentation: "https://stealthex.io/api-docs",
    rateLimit: "API key required",
    requiresApiKey: true,
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
      documentation: "https://stealthex.io/api-docs",
    },
  },
  
  integration: {
    getCurrenciesExample: `
import axios from 'axios';

const API_KEY = 'YOUR_STEALTHEX_API_KEY';

// Get all available currencies
async function getStealthEXCurrencies() {
  try {
    const response = await axios.get('https://api.stealthex.io/api/v2/currency', {
      headers: {
        'api-key': API_KEY,
      },
    });
    
    // Find ETC
    const etc = response.data.find((coin: any) => 
      coin.symbol.toLowerCase() === 'etc'
    );
    
    console.log('ETC Info:', etc);
    console.log('Total currencies:', response.data.length);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching currencies:', error);
    throw error;
  }
}
    `,
    
    getPairsExample: `
import axios from 'axios';

const API_KEY = 'YOUR_STEALTHEX_API_KEY';

// Get available pairs for a currency
async function getStealthEXPairs(currency: string = 'etc') {
  try {
    const response = await axios.get(
      \`https://api.stealthex.io/api/v2/pairs/\${currency}\`,
      {
        headers: {
          'api-key': API_KEY,
        },
      }
    );
    
    console.log(\`Available pairs for \${currency.toUpperCase()}:\`, response.data.length);
    return response.data;
  } catch (error) {
    console.error('Error fetching pairs:', error);
    throw error;
  }
}
    `,
    
    getRangeExample: `
import axios from 'axios';

const API_KEY = 'YOUR_STEALTHEX_API_KEY';

// Get min/max exchange amounts
async function getRange(
  currencyFrom: string,  // e.g., 'etc'
  currencyTo: string     // e.g., 'btc'
) {
  try {
    const response = await axios.get(
      \`https://api.stealthex.io/api/v2/range/\${currencyFrom}/\${currencyTo}\`,
      {
        headers: {
          'api-key': API_KEY,
        },
      }
    );
    
    console.log('Min Amount:', response.data.min_amount);
    console.log('Max Amount:', response.data.max_amount);
    
    return response.data;
  } catch (error) {
    console.error('Error getting range:', error);
    throw error;
  }
}
    `,
    
    getEstimateExample: `
import axios from 'axios';

const API_KEY = 'YOUR_STEALTHEX_API_KEY';

// Get estimated exchange amount
async function getEstimate(
  currencyFrom: string,
  currencyTo: string,
  amount: string,
  estimatedOnly: boolean = false
) {
  try {
    const response = await axios.get(
      \`https://api.stealthex.io/api/v2/estimate/\${currencyFrom}/\${currencyTo}\`,
      {
        params: {
          amount,
          estimated_only: estimatedOnly,
        },
        headers: {
          'api-key': API_KEY,
        },
      }
    );
    
    const estimate = response.data;
    
    console.log('Estimated Amount:', estimate.estimated_amount, currencyTo.toUpperCase());
    console.log('Rate:', estimate.rate);
    
    return estimate;
  } catch (error) {
    console.error('Error getting estimate:', error);
    throw error;
  }
}
    `,
    
    createExchangeExample: `
import axios from 'axios';

const API_KEY = 'YOUR_STEALTHEX_API_KEY';

// Create exchange
async function createExchange(
  currencyFrom: string,
  currencyTo: string,
  addressTo: string,       // Destination address
  amount: string,
  refundAddress?: string,
  extraIdTo?: string
) {
  try {
    const response = await axios.post(
      'https://api.stealthex.io/api/v2/exchange',
      {
        currency_from: currencyFrom,
        currency_to: currencyTo,
        address_to: addressTo,
        amount_from: amount,
        refund_address: refundAddress || '',
        extra_id_to: extraIdTo || '',
      },
      {
        headers: {
          'api-key': API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    
    const exchange = response.data;
    
    console.log('Exchange ID:', exchange.id);
    console.log('Deposit Address:', exchange.address_from);
    console.log('Amount to Send:', exchange.amount_from, currencyFrom.toUpperCase());
    console.log('Expected Amount:', exchange.amount_to, currencyTo.toUpperCase());
    console.log('Extra ID (if needed):', exchange.extra_id_from);
    
    return exchange;
  } catch (error) {
    console.error('Error creating exchange:', error);
    throw error;
  }
}
    `,
    
    getExchangeStatusExample: `
import axios from 'axios';

const API_KEY = 'YOUR_STEALTHEX_API_KEY';

// Get exchange status
async function getExchangeStatus(exchangeId: string) {
  try {
    const response = await axios.get(
      \`https://api.stealthex.io/api/v2/exchange/\${exchangeId}\`,
      {
        headers: {
          'api-key': API_KEY,
        },
      }
    );
    
    const status = response.data;
    
    console.log('Status:', status.status);
    console.log('Amount From:', status.amount_from);
    console.log('Amount To:', status.amount_to);
    console.log('Transaction Hash (In):', status.tx_from);
    console.log('Transaction Hash (Out):', status.tx_to);
    console.log('Timestamp:', new Date(status.timestamp));
    
    // Status values: waiting, confirming, exchanging, sending, finished, failed, refunded, hold
    return status;
  } catch (error) {
    console.error('Error getting exchange status:', error);
    throw error;
  }
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/StealthEX_io",
    telegram: "https://t.me/StealthEX_io",
    reddit: "https://www.reddit.com/r/Stealthex/",
    medium: "https://medium.com/@StealthEX",
  },
  
  features: {
    hasApi: true,
    hasSdk: false,
    hasSubgraph: false,
    isActive: true,
    supportsCrossChain: true,
    hasLiquidityMining: false,
    isEvmCompatible: false,
    isInstantExchange: true,
    noKyc: true,
    noRegistration: true,
    noLimits: true,
    hasAffiliateProgram: true,
    isAnonymous: true,
    supports1400Plus: true,
  },
  
  notes: [
    "StealthEX supports 1400+ cryptocurrencies including Ethereum Classic",
    "No registration, limits, or KYC required",
    "Anonymous exchanges with focus on privacy",
    "API key required for programmatic access",
    "Affiliate program available with revenue sharing",
  ],
};
