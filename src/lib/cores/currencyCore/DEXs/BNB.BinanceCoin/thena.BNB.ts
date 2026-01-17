// THENA DEX Information
// Next-generation liquidity layer with ve(3,3) on BNB Chain
// Source: Research compiled from multiple sources

export const thenaDEX = {
  name: "THENA",
  blockchain: "BNB Smart Chain",
  type: "Next-Gen AMM",
  description: "Liquidity layer with ve(3,3) tokenomics on BNB Chain. THENA is a next-generation decentralized exchange built on Solidly's ve(3,3) model, offering efficient capital utilization and governance.",
  
  urls: {
    main: "https://www.thena.fi/",
    app: "https://www.thena.fi/swap",
    docs: "https://docs.thena.fi/",
    analytics: "https://www.thena.fi/analytics",
  },
  
  api: {
    endpoints: {
      bscRpc: "https://bsc-dataseed.binance.org/",
      subgraph: "Check THENA documentation for subgraph endpoints",
    },
    documentation: "https://docs.thena.fi/",
    rateLimit: "Check documentation for limits",
    requiresApiKey: false,
  },
  
  contracts: {
    mainnet: {
      router: "Check THENA documentation for router address",
      voter: "Check THENA documentation",
      ve: "Check THENA documentation",
    },
  },
  
  tokens: {
    THE: {
      symbol: "THE",
      decimals: 18,
      note: "THENA governance token",
    },
    veTHE: {
      symbol: "veTHE",
      note: "Vote-escrowed THE for governance and rewards",
    },
  },
  
  sdk: {
    typescript: {
      available: false,
      note: "No official SDK. Use ethers.js/web3.js for contract interaction",
      documentation: "https://docs.thena.fi/",
    },
  },
  
  integration: {
    exampleUsage: `
import { ethers } from 'ethers';

// THENA Router setup
const provider = new ethers.providers.JsonRpcProvider('https://bsc-dataseed.binance.org/');

// Note: Get actual router address from THENA documentation
const THENA_ROUTER = '0x...'; // Replace with actual address

const ROUTER_ABI = [
  'function getAmountsOut(uint amountIn, address[] memory path) public view returns (uint[] memory amounts)',
  'function quoteRemoveLiquidity(address tokenA, address tokenB, bool stable, uint liquidity) external view returns (uint amountA, uint amountB)'
];

const router = new ethers.Contract(THENA_ROUTER, ROUTER_ABI, provider);

// Get swap quote
async function getThenaPrice(tokenIn: string, tokenOut: string, amountIn: string, stable: boolean = false) {
  try {
    // THENA uses stable/volatile pool routing
    const amounts = await router.getAmountsOut(
      ethers.utils.parseEther(amountIn),
      [tokenIn, tokenOut]
    );
    
    return {
      inputAmount: amountIn,
      outputAmount: ethers.utils.formatEther(amounts[1]),
      poolType: stable ? 'Stable' : 'Volatile'
    };
  } catch (error) {
    console.error('Error getting THENA price:', error);
    throw error;
  }
}

// Example usage
const WBNB = '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c';
const BUSD = '0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56';

getThenaPrice(WBNB, BUSD, '1', false).then(console.log);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/ThenaFi_",
    discord: "https://discord.gg/thena",
    telegram: "https://t.me/ThenaFi",
    medium: "https://medium.com/@ThenaFi",
    github: "https://github.com/ThenafiBNB",
  },
  
  features: {
    swaps: true,
    liquidityProvision: true,
    yieldFarming: true,
    limitOrders: false,
    governance: true,
    nftSupport: true,
    veModel: true,
    stablePools: true,
    volatilePools: true,
    bribes: true,
    gauges: true,
  },
  
  mechanism: {
    model: "ve(3,3)",
    description: "Vote-escrowed tokenomics inspired by Solidly",
    veTHE: {
      lockPeriod: "Up to 2 years for maximum voting power",
      benefits: [
        "Voting rights for gauge weights",
        "Revenue sharing from fees",
        "Boosted farming rewards",
        "Bribes from protocols"
      ],
    },
    pools: {
      stable: "Correlated assets (stablecoins) with lower slippage",
      volatile: "Uncorrelated assets with constant product formula",
    },
  },
  
  notes: [
    "ve(3,3) tokenomics model (based on Solidly/Velodrome)",
    "THE token for governance, veTHE for voting power",
    "Dual pool types: stable and volatile",
    "Gauge voting for emissions distribution",
    "Bribes mechanism for additional incentives",
    "NFT integration for positions and governance",
    "Capital efficient for correlated asset pairs",
    "Use ethers.js/web3.js for integration",
    "Check official documentation for latest contract addresses",
  ],
};

export default thenaDEX;
