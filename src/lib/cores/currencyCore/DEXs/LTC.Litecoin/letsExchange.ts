// LetsExchange Information
// Fast and secure cryptocurrency exchange for Litecoin
// Source: Research compiled from Oct14.Research.Cryptocurrency.LTC.Litecoin

export const letsExchangeDEX = {
  name: "LetsExchange",
  blockchain: "Multi-Chain (including Litecoin)",
  type: "Instant Exchange",
  description: "Fast and secure cryptocurrency exchange supporting Litecoin with no registration. Offers both fixed and floating rates with support for 4500+ trading pairs.",
  
  urls: {
    main: "https://letsexchange.io/",
    app: "https://letsexchange.io/",
    docs: "https://letsexchange.io/api-documentation",
    apiDocs: "https://api.letsexchange.io/documentation",
  },
  
  api: {
    endpoints: {
      baseUrl: "https://api.letsexchange.io/api/v1",
      coins: "https://api.letsexchange.io/api/v1/coins",
      info: "https://api.letsexchange.io/api/v1/info",
      transaction: "https://api.letsexchange.io/api/v1/transaction",
    },
    documentation: "https://api.letsexchange.io/documentation",
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
      documentation: "https://letsexchange.io/api-documentation",
    },
  },
  
  integration: {
    infoExample: `
import axios from 'axios';

async function getLetsExchangeInfo(
  fromCoin: string = 'ltc',
  toCoin: string = 'btc',
  amount: string,
  float: boolean = true
) {
  try {
    const response = await axios.get(
      'https://api.letsexchange.io/api/v1/info',
      {
        params: {
          from: fromCoin,
          to: toCoin,
          amount: amount,
          float: float,
        },
      }
    );
    
    console.log('LetsExchange Info:', response.data);
    return response.data;
  } catch (error) {
    console.error('LetsExchange API error:', error);
    throw error;
  }
}

// Get floating rate info for 1 LTC -> BTC
const info = await getLetsExchangeInfo('ltc', 'btc', '1.0', true);
console.log(\`Exchange rate: \${info.rate}\`);
console.log(\`Minimum amount: \${info.min_amount}\`);
console.log(\`You will receive: \${info.amount} BTC\`);
    `,
    
    createTransactionExample: `
import axios from 'axios';

async function createLetsExchangeTransaction(
  fromCoin: string,
  toCoin: string,
  amount: string,
  recipientAddress: string,
  refundAddress: string,
  float: boolean = true
) {
  try {
    const response = await axios.post(
      'https://api.letsexchange.io/api/v1/transaction',
      {
        from: fromCoin,
        to: toCoin,
        amount: amount,
        recipient_address: recipientAddress,
        refund_address: refundAddress,
        float: float,
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    
    console.log('LetsExchange Transaction:', response.data);
    console.log(\`Transaction ID: \${response.data.transaction_id}\`);
    console.log(\`Send \${fromCoin.toUpperCase()} to: \${response.data.deposit_address}\`);
    return response.data;
  } catch (error) {
    console.error('LetsExchange transaction error:', error);
    throw error;
  }
}
    `,
    
    checkStatusExample: `
import axios from 'axios';

async function checkLetsExchangeStatus(transactionId: string) {
  try {
    const response = await axios.get(
      \`https://api.letsexchange.io/api/v1/transaction/\${transactionId}\`
    );
    
    console.log('Transaction Status:', response.data);
    console.log(\`Status: \${response.data.status}\`);
    return response.data;
  } catch (error) {
    console.error('LetsExchange status check error:', error);
    throw error;
  }
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/letsexchange_io",
    telegram: "https://t.me/letsexchange",
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
    supports4500Pairs: true,
    fastExchange: true,
  },
  
  notes: [
    "LetsExchange supports 4500+ trading pairs",
    "No registration or KYC required",
    "Both fixed and floating rate options",
    "Fast exchange processing",
    "Simple and straightforward API",
  ],
};

