// Biswap DEX Information
// Low-fee multi-type DEX on BNB Smart Chain
// Source: Research compiled from Oct13.Research.Cryptocurrency.BNB.Binance

export const biswapDEX = {
  name: "Biswap",
  blockchain: "BNB Smart Chain",
  type: "AMM DEX",
  description: "Low-fee DEX with multi-type referral system and lottery. Biswap is a multichain AMM with V3 design, multiple fee tiers, and additional DeFi features on BNB Chain.",
  
  urls: {
    main: "https://biswap.org/",
    app: "https://exchange.biswap.org/",
    docs: "https://docs.biswap.org/",
  },
  
  api: {
    endpoints: {
      bscRpc: "https://bsc-dataseed.binance.org/",
      bitquery: "https://graphql.bitquery.io/",
    },
    documentation: "https://docs.biswap.org/",
    rateLimit: "Check documentation for current limits",
    requiresApiKey: false,
    note: "No public subgraph available, use Bitquery or direct contract queries",
  },
  
  contracts: {
    mainnet: {
      router: "0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8",
      routerV3: "Check Biswap documentation for V3 router",
      factory: "Check Biswap documentation",
    },
  },
  
  tokens: {
    BSW: {
      address: "0x965F527D9159dCe6288a2219DB51fc6Eef120dD1",
      decimals: 18,
      symbol: "BSW",
      note: "Biswap native governance token",
    },
  },
  
  sdk: {
    typescript: {
      available: false,
      note: "No official TypeScript SDK. Use ethers.js/web3.js with contract ABIs",
      alternative: "Use standard EVM tools to interact with smart contracts",
    },
  },
  
  integration: {
    exampleUsage: `
import { ethers } from 'ethers';

// Biswap Router interface
const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');

const BISWAP_ROUTER = '0x3a6d8cA21D1CF76F653A67577FA0D27453350dD8';
const ROUTER_ABI = [
  'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
  'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)'
];

const router = new ethers.Contract(BISWAP_ROUTER, ROUTER_ABI, provider);

// Get price quote
async function getBiswapPrice(tokenIn: string, tokenOut: string, amountIn: string) {
  const amounts = await router.getAmountsOut(
    ethers.utils.parseEther(amountIn),
    [tokenIn, tokenOut]
  );
  
  const amountOut = ethers.utils.formatEther(amounts[1]);
  return {
    inputAmount: amountIn,
    outputAmount: amountOut,
    price: parseFloat(amountOut) / parseFloat(amountIn)
  };
}

// Example: Get BNB/BUSD price
const WBNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
const BUSD = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';

getBiswapPrice(WBNB, BUSD, '1').then(console.log);


// Using Bitquery for trade data
import { request, gql } from 'graphql-request';

const BITQUERY_URL = 'https://graphql.bitquery.io/';

const BISWAP_TRADES_QUERY = gql\`
  query BiswapTrades($tokenIn: String!, $tokenOut: String!) {
    ethereum(network: bsc) {
      dexTrades(
        options: { limit: 5, desc: "block.timestamp.time" }
        exchangeName: { is: "Biswap" }
        baseCurrency: { is: $tokenIn }
        quoteCurrency: { is: $tokenOut }
      ) {
        block {
          timestamp { time }
        }
        baseCurrency { symbol }
        quoteCurrency { symbol }
        baseAmount
        quoteAmount
        tradeAmount(in: USD)
      }
    }
  }
\`;

async function getBiswapTradeData(tokenIn: string, tokenOut: string) {
  const data = await request(BITQUERY_URL, BISWAP_TRADES_QUERY, {
    tokenIn,
    tokenOut
  });
  
  return data.ethereum.dexTrades;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/Biswap_Dex",
    telegram: "https://t.me/biswap_news",
    medium: "https://biswap-dex.medium.com/",
    github: "https://github.com/biswap-org",
  },
  
  features: {
    swaps: true,
    liquidityProvision: true,
    yieldFarming: true,
    limitOrders: false,
    governance: true,
    nftSupport: true,
    lottery: true,
    launchpad: true,
    multiChain: true,
    v3Features: true,
    referralSystem: true,
  },
  
  pricing: {
    oracle: {
      dia: "https://www.diadata.org/app/source/defi/Biswap/",
      description: "DIA oracle integration for Biswap price feeds",
    },
    bitquery: {
      available: true,
      documentation: "https://docs.bitquery.io/docs/blockchain/BSC/",
    },
  },
  
  notes: [
    "Multi-type liquidity pool DEX with low trading fees",
    "V3 implementation with multiple fee tiers",
    "No official subgraph, use Bitquery for indexed data",
    "BSW token for governance and rewards",
    "Multi-chain support (BSC and other chains)",
    "Unique referral and reward system",
    "Lottery and launchpad features",
    "Use ethers.js/web3.js for direct contract interaction",
    "DIA oracle integration available",
  ],
};

export default biswapDEX;
