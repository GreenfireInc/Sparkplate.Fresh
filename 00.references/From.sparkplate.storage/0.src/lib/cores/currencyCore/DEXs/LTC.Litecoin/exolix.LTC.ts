// Exolix Exchange Information
// Non-custodial crypto exchange for Litecoin
// Source: Research compiled from Oct14.Research.Cryptocurrency.LTC.Litecoin

export const exolixDEX = {
  name: "Exolix",
  blockchain: "Multi-Chain (including Litecoin)",
  type: "Instant Exchange",
  description: "Non-custodial crypto exchange with no limits supporting Litecoin. Offers both fixed and floating rates with support for 300+ cryptocurrencies.",
  
  urls: {
    main: "https://exolix.com/",
    app: "https://exolix.com/",
    docs: "https://exolix.com/api-doc",
    apiDocs: "https://documenter.getpostman.com/view/14920134/TzRa7Qso",
  },
  
  api: {
    endpoints: {
      baseUrl: "https://exolix.com/api/v2",
      currencies: "https://exolix.com/api/v2/currencies",
      rate: "https://exolix.com/api/v2/rate",
      transactions: "https://exolix.com/api/v2/transactions",
    },
    documentation: "https://documenter.getpostman.com/view/14920134/TzRa7Qso",
    rateLimit: "Public API available",
    requiresApiKey: false,
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
      documentation: "https://exolix.com/api-doc",
    },
  },
  
  integration: {
    rateExample: `
import axios from 'axios';

async function getExolixRate(
  fromCoin: string = 'LTC',
  toCoin: string = 'BTC',
  amount: string
) {
  try {
    const response = await axios.post(
      'https://exolix.com/api/v2/rate',
      {
        coinFrom: fromCoin,
        coinTo: toCoin,
        amount: parseFloat(amount),
        rateType: 'float', // or 'fixed'
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('Exolix Rate:', response.data);
    return response.data;
  } catch (error) {
    console.error('Exolix API error:', error);
    throw error;
  }
}

// Get floating rate for 1 LTC -> BTC
const rate = await getExolixRate('LTC', 'BTC', '1.0');
console.log(\`Exchange rate: \${rate.rate}\`);
console.log(\`You will receive: \${rate.toAmount} BTC\`);
    `,
    
    createTransactionExample: `
import axios from 'axios';

async function createExolixTransaction(
  fromCoin: string,
  toCoin: string,
  withdrawalAddress: string,
  amount: string,
  refundAddress: string,
  rateType: string = 'float'
) {
  try {
    const response = await axios.post(
      'https://exolix.com/api/v2/transactions',
      {
        coinFrom: fromCoin,
        coinTo: toCoin,
        withdrawalAddress: withdrawalAddress,
        amount: parseFloat(amount),
        refundAddress: refundAddress,
        rateType: rateType,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('Exolix Transaction:', response.data);
    console.log(\`Transaction ID: \${response.data.id}\`);
    console.log(\`Send \${fromCoin} to: \${response.data.depositAddress}\`);
    return response.data;
  } catch (error) {
    console.error('Exolix transaction error:', error);
    throw error;
  }
}
    `,
    
    checkTransactionExample: `
import axios from 'axios';

async function checkExolixTransaction(transactionId: string) {
  try {
    const response = await axios.get(
      \`https://exolix.com/api/v2/transactions/\${transactionId}\`
    );
    
    console.log('Transaction Status:', response.data);
    console.log(\`Status: \${response.data.status}\`);
    return response.data;
  } catch (error) {
    console.error('Exolix status check error:', error);
    throw error;
  }
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/exolix_com",
    telegram: "https://t.me/exolix_official",
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
    supports300Plus: true,
  },
  
  notes: [
    "Exolix supports 300+ cryptocurrencies",
    "No limits on exchange amounts",
    "No registration or KYC required",
    "Both fixed and floating rate options",
    "Public API available without API key for basic functions",
  ],
};
