// 1inch DEX Information
// Leading DEX aggregator on Ethereum
// Source: Research compiled from Oct14.Research.Cryptocurrency.ETH.Ethereum

export const oneinchDEX = {
  name: "1inch",
  blockchain: "Multi-Chain (including Ethereum)",
  type: "DEX Aggregator",
  description: "DEX aggregator finding best prices across multiple exchanges. 1inch splits orders across Uniswap, Curve, Balancer, SushiSwap, and other DEXs to provide optimal pricing.",
  
  urls: {
    main: "https://1inch.io/",
    app: "https://app.1inch.io/",
    docs: "https://docs.1inch.io/",
    apiDocs: "https://docs.1inch.io/docs/aggregation-protocol/api/",
  },
  
  api: {
    endpoints: {
      baseUrl: "https://api.1inch.io/v5.0/1",
      swap: "https://api.1inch.io/v5.0/1/swap",
      quote: "https://api.1inch.io/v5.0/1/quote",
      approve: "https://api.1inch.io/v5.0/1/approve",
    },
    documentation: "https://docs.1inch.io/docs/aggregation-protocol/api/",
    rateLimit: "API key recommended for production",
    requiresApiKey: true,
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@1inch/fusion-sdk",
          package: "@1inch/fusion-sdk",
          description: "1inch Fusion SDK for gasless swaps",
          installCommand: "npm install @1inch/fusion-sdk",
          github: "https://github.com/1inch",
        },
        {
          name: "ethers.js",
          package: "ethers",
          description: "Ethereum library for smart contract interaction",
          installCommand: "npm install ethers",
        },
      ],
      documentation: "https://docs.1inch.io/",
    },
  },
  
  integration: {
    apiExample: `
import axios from 'axios';

const ONE_INCH_API = 'https://api.1inch.io/v5.0/1';

async function get1inchQuote(
  fromToken: string,
  toToken: string,
  amount: string
) {
  try {
    const response = await axios.get(\`\${ONE_INCH_API}/quote\`, {
      params: {
        fromTokenAddress: fromToken,
        toTokenAddress: toToken,
        amount: amount,
      },
    });
    
    console.log('1inch Quote:', response.data);
    return response.data;
  } catch (error) {
    console.error('1inch API error:', error);
    throw error;
  }
}

// Get best route for WETH -> DAI
const WETH = '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2';
const DAI = '0x6B175474E89094C44Da98b954EedeAC495271d0F';
const quote = await get1inchQuote(WETH, DAI, '1000000000000000000');
    `,
    
    swapExample: `
import axios from 'axios';

async function execute1inchSwap(
  fromToken: string,
  toToken: string,
  amount: string,
  fromAddress: string,
  slippage: number = 1
) {
  try {
    const response = await axios.get(\`https://api.1inch.io/v5.0/1/swap\`, {
      params: {
        fromTokenAddress: fromToken,
        toTokenAddress: toToken,
        amount: amount,
        fromAddress: fromAddress,
        slippage: slippage,
      },
    });
    
    console.log('1inch Swap Data:', response.data);
    return response.data;
  } catch (error) {
    console.error('1inch swap error:', error);
    throw error;
  }
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/1inch",
    discord: "https://discord.gg/1inch",
    telegram: "https://t.me/OneInchNetwork",
    github: "https://github.com/1inch",
  },
  
  features: {
    hasApi: true,
    hasSdk: true,
    hasSubgraph: false,
    isActive: true,
    supportsCrossChain: true,
    hasLiquidityMining: false,
    isEvmCompatible: true,
    isAggregator: true,
    hasFusionMode: true, // Gasless swaps
    optimizesRouting: true,
  },
  
  notes: [
    "1inch aggregates liquidity from multiple DEXs",
    "Finds optimal routing for best prices",
    "Fusion mode enables gasless swaps",
    "Supports 100+ DEXs across multiple chains",
  ],
};
