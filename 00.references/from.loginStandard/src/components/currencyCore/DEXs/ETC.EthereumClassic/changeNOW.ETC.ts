// ChangeNOW DEX Information
// Non-custodial instant cryptocurrency exchange supporting ETC
// Source: Research compiled from Oct14.Research.Cryptocurrency.ETC.EthereumClassic

export const changeNOWDEX = {
  name: "ChangeNOW",
  blockchain: "Multi-Chain (including Ethereum Classic)",
  type: "Instant Exchange",
  description: "Non-custodial instant cryptocurrency exchange with no limits and registration. ChangeNOW supports Ethereum Classic along with 850+ cryptocurrencies and tokens.",
  
  urls: {
    main: "https://changenow.io/",
    app: "https://changenow.io/exchange/etc",
    docs: "https://changenow.io/api/docs",
    apiDocs: "https://documenter.getpostman.com/view/8180765/SVfTPnVx",
    affiliateProgram: "https://changenow.io/affiliate",
  },
  
  api: {
    endpoints: {
      baseUrlV1: "https://api.changenow.io/v1",
      baseUrlV2: "https://api.changenow.io/v2",
      currencies: "https://api.changenow.io/v1/currencies",
      minAmount: "https://api.changenow.io/v1/min-amount",
      exchange: "https://api.changenow.io/v1/transactions",
      estimateV2: "https://api.changenow.io/v2/exchange/estimated-amount",
    },
    documentation: "https://changenow.io/api/docs",
    postmanDocs: "https://documenter.getpostman.com/view/8180765/SVfTPnVx",
    rateLimit: "API key required for production",
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
    getCurrenciesExample: `
import axios from 'axios';

// Get all available currencies
async function getChangeNOWCurrencies() {
  try {
    const response = await axios.get('https://api.changenow.io/v1/currencies');
    
    // Find ETC
    const etc = response.data.find((coin: any) => coin.ticker === 'etc');
    
    console.log('ETC Info:', etc);
    return response.data;
  } catch (error) {
    console.error('Error fetching currencies:', error);
    throw error;
  }
}
    `,
    
    getMinAmountExample: `
import axios from 'axios';

// Get minimum exchange amount
async function getMinAmount(fromCurrency: string, toCurrency: string) {
  try {
    const response = await axios.get(
      \`https://api.changenow.io/v1/min-amount/\${fromCurrency}_\${toCurrency}\`
    );
    
    console.log(\`Minimum amount to exchange \${fromCurrency.toUpperCase()}:\`, response.data.minAmount);
    return response.data.minAmount;
  } catch (error) {
    console.error('Error getting min amount:', error);
    throw error;
  }
}
    `,
    
    getEstimateExample: `
import axios from 'axios';

const API_KEY = 'YOUR_CHANGENOW_API_KEY';

// Get estimated exchange amount
async function getEstimate(
  fromCurrency: string, // e.g., 'etc'
  toCurrency: string,   // e.g., 'btc'
  fromAmount: string
) {
  try {
    const response = await axios.get(
      'https://api.changenow.io/v2/exchange/estimated-amount',
      {
        params: {
          fromCurrency,
          toCurrency,
          fromAmount,
          fromNetwork: 'etc',  // Network for ETC
          toNetwork: 'btc',    // Network for BTC
          flow: 'standard',    // or 'fixed-rate'
          type: 'direct',
          useRateId: false,
        },
        headers: {
          'x-changenow-api-key': API_KEY,
        },
      }
    );
    
    const estimate = response.data;
    
    console.log('From Amount:', estimate.fromAmount, fromCurrency.toUpperCase());
    console.log('To Amount:', estimate.toAmount, toCurrency.toUpperCase());
    console.log('Estimated Rate:', estimate.estimatedAmount / estimate.fromAmount);
    
    return estimate;
  } catch (error) {
    console.error('Error getting estimate:', error);
    throw error;
  }
}
    `,
    
    createExchangeExample: `
import axios from 'axios';

const API_KEY = 'YOUR_CHANGENOW_API_KEY';

// Create exchange transaction
async function createExchange(
  fromCurrency: string,
  toCurrency: string,
  fromAmount: string,
  toAddress: string,  // Destination address
  refundAddress?: string
) {
  try {
    const response = await axios.post(
      'https://api.changenow.io/v1/transactions/' + API_KEY,
      {
        from: fromCurrency,
        to: toCurrency,
        address: toAddress,
        amount: fromAmount,
        extraId: '',  // For currencies that need memo/tag
        refundAddress: refundAddress || '',
      }
    );
    
    const transaction = response.data;
    
    console.log('Transaction ID:', transaction.id);
    console.log('Deposit Address:', transaction.payinAddress);
    console.log('Payout Address:', transaction.payoutAddress);
    console.log('Amount to Send:', transaction.amount, fromCurrency.toUpperCase());
    
    return transaction;
  } catch (error) {
    console.error('Error creating exchange:', error);
    throw error;
  }
}
    `,
    
    trackTransactionExample: `
import axios from 'axios';

const API_KEY = 'YOUR_CHANGENOW_API_KEY';

// Track transaction status
async function trackTransaction(transactionId: string) {
  try {
    const response = await axios.get(
      \`https://api.changenow.io/v1/transactions/\${transactionId}/\${API_KEY}\`
    );
    
    const status = response.data;
    
    console.log('Status:', status.status);
    console.log('Amount Sent:', status.amountSend);
    console.log('Amount Received:', status.amountReceive);
    console.log('Hash In:', status.payinHash);
    console.log('Hash Out:', status.payoutHash);
    
    // Status values: waiting, confirming, exchanging, sending, finished, failed, refunded, expired
    return status;
  } catch (error) {
    console.error('Error tracking transaction:', error);
    throw error;
  }
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/ChangeNOW_io",
    telegram: "https://t.me/changeNOW_chat",
    reddit: "https://www.reddit.com/r/ChangeNOW_io/",
    facebook: "https://www.facebook.com/ChangeNOW.io/",
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
    supports850Plus: true,
  },
  
  notes: [
    "ChangeNOW supports 850+ cryptocurrencies including Ethereum Classic",
    "No registration, limits, or KYC required",
    "Offers both standard and fixed-rate exchange options",
    "API key required for production use",
    "Affiliate program available with revenue sharing",
  ],
};
