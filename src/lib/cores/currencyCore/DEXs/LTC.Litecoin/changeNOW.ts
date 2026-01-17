// ChangeNOW Exchange Information
// Instant exchange for Litecoin
// Source: Research compiled from Oct14.Research.Cryptocurrency.LTC.Litecoin

export const changeNOWDEX = {
  name: "ChangeNOW",
  blockchain: "Multi-Chain (including Litecoin)",
  type: "Instant Exchange",
  description: "Non-custodial instant cryptocurrency exchange with no registration. Offers both fixed and floating rate exchanges with support for 500+ cryptocurrencies including Litecoin.",
  
  urls: {
    main: "https://changenow.io/",
    app: "https://changenow.io/",
    docs: "https://documenter.getpostman.com/view/8180765/SVfTPnqf",
    apiDocs: "https://changenow.io/api/docs",
  },
  
  api: {
    endpoints: {
      baseUrl: "https://api.changenow.io/v2",
      currencies: "https://api.changenow.io/v2/exchange/currencies",
      estimate: "https://api.changenow.io/v2/exchange/estimated-amount",
      createExchange: "https://api.changenow.io/v2/exchange",
    },
    documentation: "https://documenter.getpostman.com/view/8180765/SVfTPnqf",
    rateLimit: "API key required for higher limits",
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
      documentation: "https://changenow.io/api/docs",
    },
  },
  
  integration: {
    estimateExample: `
import axios from 'axios';

const CHANGENOW_API_KEY = 'YOUR_API_KEY';

async function getChangeNOWEstimate(
  fromCurrency: string = 'ltc',
  toCurrency: string = 'btc',
  amount: string
) {
  try {
    const response = await axios.get(
      'https://api.changenow.io/v2/exchange/estimated-amount',
      {
        params: {
          fromCurrency: fromCurrency,
          toCurrency: toCurrency,
          fromAmount: amount,
          fromNetwork: 'ltc',
          toNetwork: 'btc',
          flow: 'standard', // or 'fixed-rate'
          type: 'direct',
        },
        headers: {
          'x-changenow-api-key': CHANGENOW_API_KEY,
        },
      }
    );
    
    console.log('ChangeNOW Estimate:', response.data);
    return response.data;
  } catch (error) {
    console.error('ChangeNOW API error:', error);
    throw error;
  }
}

// Get estimate for 1 LTC -> BTC
const estimate = await getChangeNOWEstimate('ltc', 'btc', '1.0');
console.log(\`Estimated amount: \${estimate.toAmount} BTC\`);
    `,
    
    createExchangeExample: `
import axios from 'axios';

async function createChangeNOWExchange(
  fromCurrency: string,
  toCurrency: string,
  fromAmount: string,
  address: string,
  refundAddress: string
) {
  try {
    const response = await axios.post(
      'https://api.changenow.io/v2/exchange',
      {
        fromCurrency: fromCurrency,
        toCurrency: toCurrency,
        fromAmount: fromAmount,
        address: address,
        refundAddress: refundAddress,
        fromNetwork: fromCurrency,
        toNetwork: toCurrency,
        flow: 'standard',
      },
      {
        headers: {
          'x-changenow-api-key': CHANGENOW_API_KEY,
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('ChangeNOW Exchange:', response.data);
    console.log(\`Send \${fromCurrency.toUpperCase()} to: \${response.data.payinAddress}\`);
    return response.data;
  } catch (error) {
    console.error('ChangeNOW exchange error:', error);
    throw error;
  }
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/ChangeNOW_io",
    telegram: "https://t.me/ChangeNOW_Community",
    reddit: "https://www.reddit.com/r/ChangeNOW_io/",
    facebook: "https://www.facebook.com/ChangeNowio/",
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
    supports500Plus: true,
  },
  
  notes: [
    "ChangeNOW supports 500+ cryptocurrencies",
    "Both fixed-rate and floating-rate exchanges available",
    "No registration or KYC for small amounts",
    "Fast exchanges typically complete in 5-40 minutes",
    "API key required for production use",
  ],
};

