// StealthEX Exchange Information
// Limitless crypto exchange for Litecoin
// Source: Research compiled from Oct14.Research.Cryptocurrency.LTC.Litecoin

export const stealthEXDEX = {
  name: "StealthEX",
  blockchain: "Multi-Chain (including Litecoin)",
  type: "Instant Exchange",
  description: "Limitless crypto exchange supporting Litecoin with no registration or limits. Offers both fixed and floating rates with support for 1000+ crypto assets.",
  
  urls: {
    main: "https://stealthex.io/",
    app: "https://stealthex.io/",
    docs: "https://stealthex.io/api-docs/",
    apiDocs: "https://stealthex.io/api-docs/",
  },
  
  api: {
    endpoints: {
      baseUrl: "https://api.stealthex.io/api/v2",
      currencies: "https://api.stealthex.io/api/v2/currency",
      estimate: "https://api.stealthex.io/api/v2/estimate",
      createExchange: "https://api.stealthex.io/api/v2/exchange",
      exchangeStatus: "https://api.stealthex.io/api/v2/exchange",
    },
    documentation: "https://stealthex.io/api-docs/",
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
      documentation: "https://stealthex.io/api-docs/",
    },
  },
  
  integration: {
    estimateExample: `
import axios from 'axios';

const STEALTHEX_API_KEY = 'YOUR_API_KEY';

async function getStealthEXEstimate(
  fromCurrency: string = 'ltc',
  toCurrency: string = 'btc',
  amount: string,
  fixed: boolean = false
) {
  try {
    const response = await axios.get(
      'https://api.stealthex.io/api/v2/estimate',
      {
        params: {
          currency_from: fromCurrency,
          currency_to: toCurrency,
          amount: amount,
          fixed: fixed,
          api_key: STEALTHEX_API_KEY,
        },
      }
    );
    
    console.log('StealthEX Estimate:', response.data);
    return response.data;
  } catch (error) {
    console.error('StealthEX API error:', error);
    throw error;
  }
}

// Get floating rate estimate for 1 LTC -> BTC
const estimate = await getStealthEXEstimate('ltc', 'btc', '1.0', false);
console.log(\`Estimated amount: \${estimate.estimated_amount} BTC\`);
console.log(\`Exchange rate: \${estimate.rate}\`);
    `,
    
    createExchangeExample: `
import axios from 'axios';

async function createStealthEXExchange(
  fromCurrency: string,
  toCurrency: string,
  fromAmount: string,
  toAddress: string,
  refundAddress: string,
  fixed: boolean = false
) {
  try {
    const response = await axios.post(
      'https://api.stealthex.io/api/v2/exchange',
      {
        currency_from: fromCurrency,
        currency_to: toCurrency,
        amount_from: fromAmount,
        address_to: toAddress,
        refund_address: refundAddress,
        fixed: fixed,
        api_key: STEALTHEX_API_KEY,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('StealthEX Exchange:', response.data);
    console.log(\`Exchange ID: \${response.data.id}\`);
    console.log(\`Send \${fromCurrency.toUpperCase()} to: \${response.data.address_from}\`);
    return response.data;
  } catch (error) {
    console.error('StealthEX exchange error:', error);
    throw error;
  }
}
    `,
    
    checkStatusExample: `
import axios from 'axios';

async function checkStealthEXStatus(exchangeId: string) {
  try {
    const response = await axios.get(
      \`https://api.stealthex.io/api/v2/exchange/\${exchangeId}\`,
      {
        params: {
          api_key: STEALTHEX_API_KEY,
        },
      }
    );
    
    console.log('Exchange Status:', response.data);
    console.log(\`Status: \${response.data.status}\`);
    return response.data;
  } catch (error) {
    console.error('StealthEX status check error:', error);
    throw error;
  }
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/StealthEX_io",
    telegram: "https://t.me/StealthEX",
    reddit: "https://www.reddit.com/r/StealthEX/",
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
    noLimits: true,
    fixedRate: true,
    floatingRate: true,
    supports1000Plus: true,
  },
  
  notes: [
    "StealthEX supports 1000+ crypto assets",
    "No registration, limits, or KYC",
    "Both fixed and floating rate exchanges",
    "Fast exchange times with automatic processing",
    "Comprehensive REST API with good documentation",
  ],
};
