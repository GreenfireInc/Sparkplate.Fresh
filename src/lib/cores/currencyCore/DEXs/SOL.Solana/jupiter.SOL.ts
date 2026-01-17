// Jupiter DEX Information
// Leading DEX aggregator on Solana
// Source: Research compiled from Oct14.Research.Cryptocurrency.SOL.Solana

export const jupiterDEX = {
  name: "Jupiter",
  blockchain: "Solana (SOL)",
  type: "DEX Aggregator",
  description: "The largest and most popular DEX aggregator on Solana, routing trades across multiple DEXs to find the best prices and lowest slippage. Jupiter aggregates liquidity from all major Solana DEXs and provides optimal swap routes.",
  
  urls: {
    main: "https://jup.ag/",
    app: "https://jup.ag/swap/SOL-USDC",
    docs: "https://docs.jup.ag/",
    apiDocs: "https://dev.jup.ag/docs/api",
    analytics: "https://stats.jup.ag/",
  },
  
  api: {
    endpoints: {
      quote: "https://quote-api.jup.ag/v6/quote",
      swap: "https://quote-api.jup.ag/v6/swap",
      price: "https://quote-api.jup.ag/v6/price",
      tokens: "https://token.jup.ag/all",
    },
    documentation: "https://dev.jup.ag/docs/api",
    apiReference: "https://dev.jup.ag/docs/api/swap-api",
    rateLimit: "Public API with rate limits",
    requiresApiKey: false,
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@jup-ag/api",
          package: "@jup-ag/api",
          description: "Official Jupiter API client for TypeScript",
          installCommand: "npm install @jup-ag/api",
        },
        {
          name: "@solana/web3.js",
          package: "@solana/web3.js",
          description: "Solana Web3.js for transaction building",
          installCommand: "npm install @solana/web3.js",
        },
        {
          name: "axios",
          package: "axios",
          description: "HTTP client for API requests",
          installCommand: "npm install axios",
        },
      ],
      documentation: "https://dev.jup.ag/docs/",
    },
  },
  
  integration: {
    quoteExample: `
import axios from 'axios';

// Get quote for SOL to USDC swap
async function getJupiterQuote(
  inputMint: string,
  outputMint: string,
  amount: number
) {
  const response = await axios.get(
    'https://quote-api.jup.ag/v6/quote',
    {
      params: {
        inputMint: inputMint,
        outputMint: outputMint,
        amount: amount,
        slippageBps: 50, // 0.5% slippage
      }
    }
  );
  
  console.log('Jupiter Quote:', response.data);
  console.log('Output Amount:', response.data.outAmount);
  console.log('Price Impact:', response.data.priceImpactPct);
  
  return response.data;
}

// Example: Get quote for swapping 1 SOL to USDC
const SOL_MINT = 'So11111111111111111111111111111111111111112';
const USDC_MINT = 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v';
getJupiterQuote(SOL_MINT, USDC_MINT, 1000000000); // 1 SOL in lamports
    `,
    
    priceExample: `
import axios from 'axios';

// Get price for tokens
async function getJupiterPrice(tokenMints: string[]) {
  const response = await axios.get(
    'https://quote-api.jup.ag/v6/price',
    {
      params: {
        ids: tokenMints.join(','),
      }
    }
  );
  
  console.log('Token Prices:', response.data.data);
  
  return response.data.data;
}

// Example: Get SOL price
const SOL_MINT = 'So11111111111111111111111111111111111111112';
getJupiterPrice([SOL_MINT]);
    `,
    
    swapExample: `
import axios from 'axios';
import { Connection, VersionedTransaction } from '@solana/web3.js';

// Execute swap via Jupiter
async function executeJupiterSwap(
  wallet: any,
  quoteResponse: any
) {
  // Get swap transaction
  const { data: swapData } = await axios.post(
    'https://quote-api.jup.ag/v6/swap',
    {
      quoteResponse: quoteResponse,
      userPublicKey: wallet.publicKey.toString(),
      wrapAndUnwrapSol: true,
    }
  );
  
  // Deserialize the transaction
  const swapTransactionBuf = Buffer.from(swapData.swapTransaction, 'base64');
  const transaction = VersionedTransaction.deserialize(swapTransactionBuf);
  
  // Sign and send transaction
  const connection = new Connection('https://api.mainnet-beta.solana.com');
  const signature = await wallet.sendTransaction(transaction, connection);
  
  console.log('Transaction Signature:', signature);
  
  return signature;
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/JupiterExchange",
    discord: "https://discord.gg/jup",
    telegram: "https://t.me/jup_dev",
    github: "https://github.com/jup-ag",
  },
  
  features: {
    hasApi: true,
    hasSdk: true,
    hasSubgraph: false,
    hasGraphQL: false,
    isActive: true,
    supportsCrossChain: false,
    hasLiquidityMining: true,
    isEvmCompatible: false,
    isSolanaVM: true,
    isDexAggregator: true,
    hasLimitOrders: true,
    hasDCA: true, // Dollar Cost Averaging
    hasPerpetuals: false,
    tvl: "$500+ million (aggregated)",
    volume24h: "$1+ billion",
  },
  
  notes: [
    "Jupiter is the largest DEX aggregator on Solana",
    "Routes trades across 20+ DEXs for best prices",
    "Supports token swaps, limit orders, and DCA",
    "No direct liquidity - aggregates from other DEXs",
    "Over $1 billion in daily volume",
    "JUP token for governance and rewards",
    "Comprehensive API for developers",
    "Used by most Solana wallets and dApps",
  ],
};
