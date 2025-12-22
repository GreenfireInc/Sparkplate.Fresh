// ChangeNOW Instant Exchange Information
// Non-custodial instant exchange supporting LUNC
// Source: Research compiled from Oct14.Research.Cryptocurrency.LUNC.TerraClassic

export const changeNOWDEX = {
  name: "ChangeNOW",
  blockchain: "Terra Classic (LUNC) / Multi-Chain",
  type: "Instant Exchange",
  description: "Non-custodial instant cryptocurrency exchange supporting LUNC and 500+ other currencies. ChangeNOW enables quick cross-chain swaps without registration or custody of user funds.",
  
  urls: {
    main: "https://changenow.io/",
    exchange: "https://changenow.io/exchange",
    docs: "https://documenter.getpostman.com/view/8180765/SVfTPnL4",
    apiDocs: "https://changenow.io/api/docs",
  },
  
  api: {
    endpoints: {
      exchange: "https://api.changenow.io/v2/exchange",
      estimate: "https://api.changenow.io/v2/exchange/estimated-amount",
      minAmount: "https://api.changenow.io/v2/exchange/min-amount",
      currencies: "https://api.changenow.io/v2/exchange/currencies",
    },
    documentation: "https://changenow.io/api/docs",
    apiReference: "https://documenter.getpostman.com/view/8180765/SVfTPnL4",
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

// Estimate LUNC swap amount
async function estimateLuncSwap(fromAmount: string, toCurrency: string) {
  const response = await axios.get(
    'https://api.changenow.io/v2/exchange/estimated-amount',
    {
      params: {
        fromCurrency: 'lunc',
        toCurrency: toCurrency,
        fromAmount: fromAmount,
        fromNetwork: 'lunc',
        toNetwork: toCurrency,
      },
      headers: {
        'x-changenow-api-key': 'YOUR_API_KEY'
      }
    }
  );
  
  console.log('Estimated Amount:', response.data.toAmount);
  console.log('Exchange Rate:', response.data.rate);
  
  return response.data;
}

estimateLuncSwap('1000000', 'usdt');
    `,
    
    createExchangeExample: `
import axios from 'axios';

// Create LUNC exchange transaction
async function createLuncExchange(
  fromAmount: string,
  toCurrency: string,
  toAddress: string
) {
  const response = await axios.post(
    'https://api.changenow.io/v2/exchange',
    {
      fromCurrency: 'lunc',
      toCurrency: toCurrency,
      fromAmount: fromAmount,
      address: toAddress,
      fromNetwork: 'lunc',
      toNetwork: toCurrency,
    },
    {
      headers: {
        'x-changenow-api-key': 'YOUR_API_KEY'
      }
    }
  );
  
  console.log('Exchange ID:', response.data.id);
  console.log('Deposit Address:', response.data.payinAddress);
  console.log('Expected Amount:', response.data.toAmount);
  
  return response.data;
}

createLuncExchange('1000000', 'usdt', 'DESTINATION_ADDRESS');
    `,
    
    getMinAmountExample: `
import axios from 'axios';

// Get minimum LUNC exchange amount
async function getMinLuncAmount(toCurrency: string) {
  const response = await axios.get(
    'https://api.changenow.io/v2/exchange/min-amount',
    {
      params: {
        fromCurrency: 'lunc',
        toCurrency: toCurrency,
        fromNetwork: 'lunc',
        toNetwork: toCurrency,
      }
    }
  );
  
  console.log('Minimum Amount:', response.data.minAmount);
  
  return response.data.minAmount;
}

getMinLuncAmount('usdt');
    `,
  },
  
  social: {
    twitter: "https://twitter.com/ChangeNOW_io",
    telegram: "https://t.me/changeNOW_chat",
    facebook: "https://www.facebook.com/ChangeNOW.io",
    reddit: "https://www.reddit.com/r/ChangeNOW/",
    medium: "https://changenow.io/blog",
  },
  
  features: {
    hasApi: true,
    hasSdk: false,
    hasSubgraph: false,
    hasGraphQL: false,
    isActive: true,
    supportsCrossChain: true,
    hasLiquidityMining: false,
    isEvmCompatible: false,
    isInstantExchange: true,
    noRegistration: true,
    nonCustodial: true,
    fixedRates: true,
    floatingRates: true,
    supportedCurrencies: "500+",
  },
  
  notes: [
    "ChangeNOW supports 500+ cryptocurrencies including LUNC",
    "Non-custodial - users control their funds",
    "No registration required for basic exchanges",
    "Fixed and floating rate options",
    "Fast exchange processing (typically 5-30 minutes)",
    "API available for integration",
    "Partner program available",
    "24/7 customer support",
  ],
};
