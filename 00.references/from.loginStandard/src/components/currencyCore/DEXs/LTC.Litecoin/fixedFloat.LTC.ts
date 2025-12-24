// FixedFloat Exchange Information
// Lightning-fast cryptocurrency exchange for Litecoin
// Source: Research compiled from Oct14.Research.Cryptocurrency.LTC.Litecoin

export const fixedFloatDEX = {
  name: "FixedFloat",
  blockchain: "Multi-Chain (including Litecoin)",
  type: "Instant Exchange",
  description: "Lightning-fast cryptocurrency exchange with both fixed and floating rates. Non-custodial platform supporting Litecoin with no registration required.",
  
  urls: {
    main: "https://fixedfloat.com/",
    app: "https://fixedfloat.com/",
    docs: "https://fixedfloat.com/api",
    apiDocs: "https://fixedfloat.com/api",
  },
  
  api: {
    endpoints: {
      baseUrl: "https://fixedfloat.com/api/v2",
      currencies: "https://fixedfloat.com/api/v2/ccies",
      price: "https://fixedfloat.com/api/v2/price",
      createOrder: "https://fixedfloat.com/api/v2/create",
      orderStatus: "https://fixedfloat.com/api/v2/order",
    },
    documentation: "https://fixedfloat.com/api",
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
      documentation: "https://fixedfloat.com/api",
    },
  },
  
  integration: {
    priceExample: `
import axios from 'axios';

const FIXEDFLOAT_API_KEY = 'YOUR_API_KEY';
const FIXEDFLOAT_API_SECRET = 'YOUR_API_SECRET';

async function getFixedFloatPrice(
  fromCurrency: string = 'LTCBTC',
  amount: string,
  direction: string = 'from',
  type: string = 'float' // 'fixed' or 'float'
) {
  try {
    const response = await axios.post(
      'https://fixedfloat.com/api/v2/price',
      {
        fromCcy: fromCurrency.substring(0, 3).toLowerCase(),
        toCcy: fromCurrency.substring(3, 6).toLowerCase(),
        amount: amount,
        direction: direction,
        type: type,
      },
      {
        headers: {
          'X-API-KEY': FIXEDFLOAT_API_KEY,
          'X-API-SIGN': FIXEDFLOAT_API_SECRET,
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('FixedFloat Price:', response.data);
    return response.data;
  } catch (error) {
    console.error('FixedFloat API error:', error);
    throw error;
  }
}

// Get floating rate price for 1 LTC -> BTC
const price = await getFixedFloatPrice('LTCBTC', '1.0', 'from', 'float');
console.log(\`Rate: \${price.data.rate}\`);
console.log(\`You will receive: \${price.data.to} BTC\`);
    `,
    
    createOrderExample: `
import axios from 'axios';
import crypto from 'crypto';

function signRequest(apiSecret: string, data: string): string {
  return crypto.createHmac('sha256', apiSecret).update(data).digest('hex');
}

async function createFixedFloatOrder(
  fromCurrency: string,
  toCurrency: string,
  toAddress: string,
  amount: string,
  type: string = 'float'
) {
  try {
    const requestData = {
      fromCcy: fromCurrency,
      toCcy: toCurrency,
      toAddress: toAddress,
      amount: amount,
      type: type,
    };
    
    const signature = signRequest(FIXEDFLOAT_API_SECRET, JSON.stringify(requestData));
    
    const response = await axios.post(
      'https://fixedfloat.com/api/v2/create',
      requestData,
      {
        headers: {
          'X-API-KEY': FIXEDFLOAT_API_KEY,
          'X-API-SIGN': signature,
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('FixedFloat Order:', response.data);
    console.log(\`Order ID: \${response.data.data.id}\`);
    console.log(\`Send \${fromCurrency.toUpperCase()} to: \${response.data.data.from.address}\`);
    return response.data;
  } catch (error) {
    console.error('FixedFloat order error:', error);
    throw error;
  }
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/FixedFloat",
    telegram: "https://t.me/FixedFloat",
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
    lightningFast: true,
  },
  
  notes: [
    "FixedFloat offers lightning-fast exchange times",
    "Both fixed and floating rate options",
    "No registration required",
    "Non-custodial platform",
    "API requires signature authentication",
  ],
};
