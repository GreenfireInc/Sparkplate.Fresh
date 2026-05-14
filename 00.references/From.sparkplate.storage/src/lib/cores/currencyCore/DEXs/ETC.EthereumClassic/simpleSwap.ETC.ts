// SimpleSwap DEX Information
// Easy cryptocurrency exchange without registration supporting ETC
// Source: Research compiled from Oct14.Research.Cryptocurrency.ETC.EthereumClassic

export const simpleSwapDEX = {
  name: "SimpleSwap",
  blockchain: "Multi-Chain (including Ethereum Classic)",
  type: "Instant Exchange",
  description: "Easy cryptocurrency exchange without registration. SimpleSwap provides fast, simple swaps for Ethereum Classic and 1500+ cryptocurrencies with a user-friendly interface.",
  
  urls: {
    main: "https://simpleswap.io/",
    app: "https://simpleswap.io/coins/ethereum-classic",
    docs: "https://simpleswap.io/api-docs",
    apiDocs: "https://api.simpleswap.io/api-docs",
    affiliateProgram: "https://simpleswap.io/affiliate",
  },
  
  api: {
    endpoints: {
      baseUrl: "https://api.simpleswap.io",
      currencies: "https://api.simpleswap.io/get_all_currencies",
      pairs: "https://api.simpleswap.io/get_all_pairs",
      estimate: "https://api.simpleswap.io/get_estimated",
      exchange: "https://api.simpleswap.io/create_exchange",
      ranges: "https://api.simpleswap.io/get_ranges",
    },
    documentation: "https://simpleswap.io/api-docs",
    swaggerDocs: "https://api.simpleswap.io/api-docs",
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
      documentation: "https://simpleswap.io/api-docs",
    },
  },
  
  integration: {
    getCurrenciesExample: `
import axios from 'axios';

const API_KEY = 'YOUR_SIMPLESWAP_API_KEY';

// Get all available currencies
async function getSimpleSwapCurrencies() {
  try {
    const response = await axios.get('https://api.simpleswap.io/get_all_currencies', {
      params: { api_key: API_KEY },
    });
    
    // Filter for ETC
    const etc = response.data.find((coin: any) => coin.symbol === 'etc');
    
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

const API_KEY = 'YOUR_SIMPLESWAP_API_KEY';

// Get all available trading pairs
async function getSimpleSwapPairs() {
  try {
    const response = await axios.get('https://api.simpleswap.io/get_all_pairs', {
      params: { api_key: API_KEY },
    });
    
    // Filter for ETC pairs
    const etcPairs = response.data.filter((pair: string) => 
      pair.startsWith('etc_') || pair.endsWith('_etc')
    );
    
    console.log('ETC Trading Pairs:', etcPairs.length);
    return etcPairs;
  } catch (error) {
    console.error('Error fetching pairs:', error);
    throw error;
  }
}
    `,
    
    getRangesExample: `
import axios from 'axios';

const API_KEY = 'YOUR_SIMPLESWAP_API_KEY';

// Get min/max exchange amounts
async function getRanges(
  currencyFrom: string,  // e.g., 'etc'
  currencyTo: string     // e.g., 'btc'
) {
  try {
    const response = await axios.get('https://api.simpleswap.io/get_ranges', {
      params: {
        api_key: API_KEY,
        currency_from: currencyFrom,
        currency_to: currencyTo,
      },
    });
    
    console.log('Min Amount:', response.data.min, currencyFrom.toUpperCase());
    console.log('Max Amount:', response.data.max, currencyFrom.toUpperCase());
    
    return response.data;
  } catch (error) {
    console.error('Error getting ranges:', error);
    throw error;
  }
}
    `,
    
    getEstimateExample: `
import axios from 'axios';

const API_KEY = 'YOUR_SIMPLESWAP_API_KEY';

// Get estimated exchange amount
async function getEstimate(
  currencyFrom: string,
  currencyTo: string,
  amount: string,
  fixed: boolean = false  // Fixed rate exchange
) {
  try {
    const response = await axios.get('https://api.simpleswap.io/get_estimated', {
      params: {
        api_key: API_KEY,
        currency_from: currencyFrom,
        currency_to: currencyTo,
        amount,
        fixed,
      },
    });
    
    console.log('Estimated Amount:', response.data, currencyTo.toUpperCase());
    
    return parseFloat(response.data);
  } catch (error) {
    console.error('Error getting estimate:', error);
    throw error;
  }
}
    `,
    
    createExchangeExample: `
import axios from 'axios';

const API_KEY = 'YOUR_SIMPLESWAP_API_KEY';

// Create exchange
async function createExchange(
  currencyFrom: string,
  currencyTo: string,
  amount: string,
  addressTo: string,      // Destination address
  userRefundAddress?: string,
  userRefundExtraId?: string
) {
  try {
    const response = await axios.post('https://api.simpleswap.io/create_exchange', {
      api_key: API_KEY,
      currency_from: currencyFrom,
      currency_to: currencyTo,
      amount,
      address_to: addressTo,
      user_refund_address: userRefundAddress || '',
      user_refund_extra_id: userRefundExtraId || '',
    });
    
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

const API_KEY = 'YOUR_SIMPLESWAP_API_KEY';

// Get exchange status
async function getExchangeStatus(exchangeId: string) {
  try {
    const response = await axios.get('https://api.simpleswap.io/get_exchange', {
      params: {
        api_key: API_KEY,
        id: exchangeId,
      },
    });
    
    const status = response.data;
    
    console.log('Status:', status.status);
    console.log('Amount From:', status.amount_from);
    console.log('Amount To:', status.amount_to);
    console.log('Transaction Hash (In):', status.tx_from);
    console.log('Transaction Hash (Out):', status.tx_to);
    
    // Status values: waiting, confirming, exchanging, sending, finished, failed, refunded, expired
    return status;
  } catch (error) {
    console.error('Error getting exchange status:', error);
    throw error;
  }
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/SimpleSwap_io",
    telegram: "https://t.me/SimpleSwap_io",
    reddit: "https://www.reddit.com/r/SimpleSwap_io/",
    facebook: "https://www.facebook.com/SimpleSwap.io/",
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
    hasAffiliateProgram: true,
    hasFixedRate: true,
    supports1500Plus: true,
  },
  
  notes: [
    "SimpleSwap supports 1500+ cryptocurrencies including Ethereum Classic",
    "No registration or KYC required",
    "Offers both floating and fixed-rate exchanges",
    "API key required for programmatic access",
    "User-friendly interface for non-technical users",
  ],
};
