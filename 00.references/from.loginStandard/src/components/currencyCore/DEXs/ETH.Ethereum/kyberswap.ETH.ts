// KyberSwap DEX Information
// On-chain liquidity aggregator
// Source: Research compiled from Oct14.Research.Cryptocurrency.ETH.Ethereum

export const kyberswapDEX = {
  name: "KyberSwap",
  blockchain: "Multi-Chain (including Ethereum)",
  type: "Liquidity Aggregator",
  description: "On-chain liquidity protocol aggregating multiple sources. KyberSwap combines its own liquidity pools with aggregation from other DEXs to provide optimal rates.",
  
  urls: {
    main: "https://kyberswap.com/",
    app: "https://kyberswap.com/swap/ethereum",
    docs: "https://docs.kyberswap.com/",
  },
  
  api: {
    endpoints: {
      baseUrl: "https://aggregator-api.kyberswap.com",
      ethRpc: "https://eth-mainnet.alchemyapi.io/v2/YOUR_KEY",
    },
    documentation: "https://docs.kyberswap.com/",
    rateLimit: "Check API documentation",
    requiresApiKey: false,
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "ethers.js",
          package: "ethers",
          description: "Ethereum library for smart contract interaction",
          installCommand: "npm install ethers",
        },
      ],
      documentation: "https://docs.kyberswap.com/",
    },
  },
  
  integration: {
    basicExample: `
import axios from 'axios';

const KYBER_API = 'https://aggregator-api.kyberswap.com';

async function getKyberQuote(
  tokenIn: string,
  tokenOut: string,
  amountIn: string
) {
  try {
    const response = await axios.get(\`\${KYBER_API}/ethereum/route/encode\`, {
      params: {
        tokenIn: tokenIn,
        tokenOut: tokenOut,
        amountIn: amountIn,
      },
    });
    
    console.log('KyberSwap Quote:', response.data);
    return response.data;
  } catch (error) {
    console.error('KyberSwap API error:', error);
    throw error;
  }
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/KyberNetwork",
    telegram: "https://t.me/kybernetwork",
    discord: "https://discord.gg/kyberswap",
    github: "https://github.com/KyberNetwork",
  },
  
  features: {
    hasApi: true,
    hasSdk: false,
    hasSubgraph: false,
    isActive: true,
    supportsCrossChain: true,
    hasLiquidityMining: true,
    isEvmCompatible: true,
    isAggregator: true,
    hasOwnLiquidity: true,
  },
  
  notes: [
    "KyberSwap combines aggregation with its own AMM",
    "Supports 14+ chains",
    "Dynamic fees and concentrated liquidity",
    "Active liquidity mining programs",
  ],
};
