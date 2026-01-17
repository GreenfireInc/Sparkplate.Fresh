// Permaswap - First Cross-Chain DEX on Arweave
// Type: AMM DEX with Off-chain Matching and On-chain Settlement
// Blockchain: Arweave (AR) - Built on everPay protocol

export const permaswapDEX = {
  name: "Permaswap",
  blockchain: "Arweave (AR)",
  type: "AMM DEX (SCP based)",
  description: "The first cross-chain DEX on Arweave, utilizing a Storage-based Consensus Paradigm (SCP). It offers 0 gas fees, instant settlement via everPay, and 100% permanent data storage on Arweave. Matches are done off-chain by LP nodes, and settlement is on-chain.",
  
  url: "https://permaswap.network/",
  docs: "https://docs.permaswap.network/",
  
  api: {
    baseUrl: "https://api.permaswap.network",
    documentation: "https://docs.permaswap.network/developer/api-overview",
    endpoints: {
      info: "/info",
      order: "/order",
      stats: "/stats",
    },
    rateLimit: "Public API with standard rate limits",
  },
  
  sdk: {
    npm: "permaswap-sdk", // Note: often used with everpay-js
    installation: "npm install @everfinance/everpay-js axios",
    documentation: "https://docs.permaswap.network/developer/sdks/js-sdk",
    github: "https://github.com/everFinance/permaswap-sdk",
  },
  
  integration: {
    example: `
// Permaswap Price Integration using everPay GraphQL
import axios from 'axios';
import { GraphQLClient, gql } from 'graphql-request';

const EVER_PAY_GQL = new GraphQLClient('https://api.everpay.io/graphql');

// 1. Get token metadata from everPay
async function getTokenMeta() {
  const { data } = await axios.get('https://api.everpay.io/info');
  // Map symbol to ID
  return data.tokenList.reduce((m: any, t: any) => ({ ...m, [t.symbol]: t.id }), {});
}

// 2. Get last N swaps between two tokens
async function lastSwaps(tokenIn: string, tokenOut: string, first = 50) {
  const q = gql\`
    query($tokenIn: String!, $tokenOut: String!, $first: Int!) {
      transfers(
        filter: {
          tag: { eq: "permaswap" }
          tokenIn: { eq: $tokenIn }
          tokenOut: { eq: $tokenOut }
        }
        first: $first
        orderBy: { field: "timestamp", direction: "DESC" }
      ) {
        amountIn
        amountOut
        timestamp
        txHash
      }
    }
  \`;
  return EVER_PAY_GQL.request(q, { tokenIn, tokenOut, first });
}

// 3. Calculate latest price
async function getPermaswapPrice(baseToken: string = 'AR', quoteToken: string = 'USDC') {
  try {
    const tokens = await getTokenMeta();
    const baseId = tokens[baseToken];
    const quoteId = tokens[quoteToken];
    
    if (!baseId || !quoteId) throw new Error(\`Tokens not found: \${baseToken}, \${quoteToken}\`);
    
    // Query both directions
    const [buyBase, sellBase] = await Promise.all([
      lastSwaps(quoteId, baseId, 20), // Buy Base (Sell Quote)
      lastSwaps(baseId, quoteId, 20), // Sell Base (Buy Quote)
    ]);
    
    const allTransfers = [
      ...(buyBase as any).transfers, 
      ...(sellBase as any).transfers
    ].sort((a: any, b: any) => Number(b.timestamp) - Number(a.timestamp));
    
    if (allTransfers.length === 0) return null;
    
    const latest = allTransfers[0];
    
    // Calculate price based on direction
    let price;
    if (latest.tokenIn === quoteId) {
      // Bought Base with Quote -> Price = AmountIn (Quote) / AmountOut (Base)
      price = Number(latest.amountIn) / Number(latest.amountOut);
    } else {
      // Sold Base for Quote -> Price = AmountOut (Quote) / AmountIn (Base)
      price = Number(latest.amountOut) / Number(latest.amountIn);
    }
    
    console.log(\`Latest \${baseToken}/\${quoteToken} price on Permaswap: \${price}\`);
    return price;
    
  } catch (error) {
    console.error("Error fetching Permaswap price:", error);
    throw error;
  }
}

// Usage
// getPermaswapPrice('AR', 'USDC').then(console.log);
`
  },
  
  features: {
    zeroGas: true,
    instantSettlement: true,
    crossChain: true,
    permanentStorage: true,
    orderBook: false, // AMM based
    flashSwaps: false,
    limitOrders: true, // Supported via LP nodes
  },
  
  useCases: [
    "Trading AR and PSTs",
    "Cross-chain swaps (ETH, AR, PSTs)",
    "Providing liquidity for yield",
    "Building DEX aggregators on Arweave",
  ],
  
  notes: [
    "Requires no gas fees for trading",
    "Uses everPay for instant settlement",
    "All transaction history is permanently stored on Arweave",
    "Supports multiple chains via everPay (Ethereum, Moonbeam, Conflux, etc.)",
  ],
};
