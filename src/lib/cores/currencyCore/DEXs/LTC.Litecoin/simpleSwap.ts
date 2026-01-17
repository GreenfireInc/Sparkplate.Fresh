// SimpleSwap Exchange Information
// Easy instant exchange for Litecoin
// Source: Research compiled from Oct14.Research.Cryptocurrency.LTC.Litecoin

export const simpleSwapDEX = {
  name: "SimpleSwap",
  blockchain: "Multi-Chain (including Litecoin)",
  type: "Instant Exchange",
  description: "Easy cryptocurrency exchange without registration. Offers fixed and floating rates with support for 600+ cryptocurrencies and tokens including Litecoin.",
  
  urls: {
    main: "https://simpleswap.io/",
    app: "https://simpleswap.io/",
    docs: "https://simpleswap.io/api",
    apiDocs: "https://documenter.getpostman.com/view/8180765/TVK8cJYL",
  },
  
  api: {
    endpoints: {
      baseUrl: "https://api.simpleswap.io",
      currencies: "https://api.simpleswap.io/get_all_currencies",
      pairs: "https://api.simpleswap.io/get_all_pairs",
      estimate: "https://api.simpleswap.io/get_estimated",
      createExchange: "https://api.simpleswap.io/create_exchange",
    },
    documentation: "https://documenter.getpostman.com/view/8180765/TVK8cJYL",
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
      documentation: "https://simpleswap.io/api",
    },
  },
  
  integration: {
    estimateExample: `
import axios from 'axios';

const SIMPLESWAP_API_KEY = 'YOUR_API_KEY';

async function getSimpleSwapEstimate(
  fromCurrency: string = 'ltc',
  toCurrency: string = 'btc',
  amount: string,
  fixed: boolean = false
) {
  try {
    const response = await axios.get(
      'https://api.simpleswap.io/get_estimated',
      {
        params: {
          api_key: SIMPLESWAP_API_KEY,
          currency_from: fromCurrency,
          currency_to: toCurrency,
          amount: amount,
          fixed: fixed,
        },
      }
    );
    
    console.log('SimpleSwap Estimate:', response.data);
    return parseFloat(response.data);
  } catch (error) {
    console.error('SimpleSwap API error:', error);
    throw error;
  }
}

// Get floating rate estimate for 1 LTC -> BTC
const estimate = await getSimpleSwapEstimate('ltc', 'btc', '1.0', false);
console.log(\`Estimated amount: \${estimate} BTC\`);

// Get fixed rate estimate for 1 LTC -> BTC
const fixedEstimate = await getSimpleSwapEstimate('ltc', 'btc', '1.0', true);
console.log(\`Fixed rate amount: \${fixedEstimate} BTC\`);
    `,
    
    createExchangeExample: `
import axios from 'axios';

async function createSimpleSwapExchange(
  fromCurrency: string,
  toCurrency: string,
  amount: string,
  addressTo: string,
  userRefundAddress: string,
  fixed: boolean = false
) {
  try {
    const response = await axios.post(
      'https://api.simpleswap.io/create_exchange',
      {
        api_key: SIMPLESWAP_API_KEY,
        currency_from: fromCurrency,
        currency_to: toCurrency,
        amount: amount,
        address_to: addressTo,
        user_refund_address: userRefundAddress,
        fixed: fixed,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('SimpleSwap Exchange:', response.data);
    console.log(\`Exchange ID: \${response.data.id}\`);
    console.log(\`Send \${fromCurrency.toUpperCase()} to: \${response.data.address_from}\`);
    return response.data;
  } catch (error) {
    console.error('SimpleSwap exchange error:', error);
    throw error;
  }
}
    `,
    
    checkExchangeExample: `
import axios from 'axios';

async function checkSimpleSwapExchange(exchangeId: string) {
  try {
    const response = await axios.get(
      \`https://api.simpleswap.io/get_exchange?api_key=\${SIMPLESWAP_API_KEY}&id=\${exchangeId}\`
    );
    
    console.log('Exchange Status:', response.data);
    return response.data;
  } catch (error) {
    console.error('SimpleSwap status check error:', error);
    throw error;
  }
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/SimpleSwap_io",
    telegram: "https://t.me/SimpleSwap_io",
    facebook: "https://www.facebook.com/simpleswap.io/",
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
    floatingRate: true,
    supports600Plus: true,
  },
  
  notes: [
    "SimpleSwap supports 600+ cryptocurrencies and tokens",
    "No registration or account creation required",
    "Both fixed and floating rate exchanges",
    "Typically fast exchange times (5-40 minutes)",
    "Simple and user-friendly API",
  ],
};

