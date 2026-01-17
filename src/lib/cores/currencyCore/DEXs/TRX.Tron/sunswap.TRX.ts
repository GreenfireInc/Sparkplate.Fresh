// SunSwap DEX Information
// Official decentralized exchange on Tron
// Source: Research compiled from Oct14.Research.Cryptocurrency.TRX.Tron

export const sunswapDEX = {
  name: "SunSwap",
  blockchain: "Tron (TRX)",
  type: "AMM DEX",
  description: "Official decentralized exchange on Tron with deep liquidity, low fees, and comprehensive DeFi features. SunSwap is the backbone of Tron's DeFi ecosystem, offering token swaps, liquidity pools, and yield farming.",
  
  urls: {
    main: "https://sunswap.com/",
    app: "https://sun.io/",
    swap: "https://sunswap.com/#/swap",
    pools: "https://sunswap.com/#/pool",
    docs: "https://docs.sun.io/",
  },
  
  api: {
    endpoints: {
      tronGridApi: "https://api.trongrid.io",
      sunswapApi: "https://api.sunswap.com/v1/price",
      routerContract: "TKzxdSv2FZKQrEqkKVgp5DcwEXBEKMg2Ax",
    },
    documentation: "https://sunswap.com/docs/justswap-interfaces_en.pdf",
    apiReference: "https://docs.bitquery.io/docs/examples/Tron/sunswap-api/",
    rateLimit: "Public API available",
    requiresApiKey: false,
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "tronweb",
          package: "tronweb",
          description: "Official Tron JavaScript SDK for blockchain interactions",
          installCommand: "npm install tronweb",
        },
        {
          name: "axios",
          package: "axios",
          description: "HTTP client for API requests",
          installCommand: "npm install axios",
        },
      ],
      documentation: "https://developers.tron.network/docs/tronweb",
    },
  },
  
  integration: {
    contractExample: `
import TronWeb from 'tronweb';

// Initialize TronWeb
const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
});

// SunSwap V2 Router Contract Address
const SUNSWAP_V2_ROUTER = 'TKzxdSv2FZKQrEqkKVgp5DcwEXBEKMg2Ax';

// Router ABI (simplified)
const ROUTER_ABI = [
  {
    "outputs": [{"type": "uint256[]"}],
    "inputs": [
      {"type": "uint256"},
      {"type": "address[]"}
    ],
    "name": "getAmountsOut",
    "stateMutability": "View",
    "type": "Function"
  }
];

// Get token price from SunSwap
async function getSunSwapPrice(tokenIn: string, tokenOut: string, amountIn: number) {
  const routerContract = await tronWeb.contract(ROUTER_ABI, SUNSWAP_V2_ROUTER);
  
  // Convert amount to sun (1 TRX = 1,000,000 sun)
  const amountInSun = tronWeb.toSun(amountIn);
  
  // Get amounts out for the swap path
  const path = [tokenIn, tokenOut];
  const amounts = await routerContract.getAmountsOut(amountInSun, path).call();
  
  const outputAmount = tronWeb.fromSun(amounts[1]);
  const price = Number(outputAmount) / amountIn;
  
  console.log('SunSwap Price:', price);
  
  return {
    inputAmount: amountIn.toString(),
    outputAmount: outputAmount.toString(),
    price,
    path
  };
}
    `,
    
    apiExample: `
import axios from 'axios';

// Get TRX price from SunSwap API
async function fetchSunSwapPrice(token: string = 'TRX') {
  const response = await axios.get(
    \`https://api.sunswap.com/v1/price?token=\${token}\`
  );
  
  console.log('SunSwap Price:', response.data.price);
  
  return response.data;
}

fetchSunSwapPrice('TRX');
    `,
  },
  
  social: {
    twitter: "https://twitter.com/defi_sunio",
    telegram: "https://t.me/SunSwapOfficial",
    medium: "https://sunio.medium.com/",
    github: "https://github.com/sun-io",
  },
  
  features: {
    hasApi: true,
    hasSdk: true,
    hasSubgraph: true, // Via Bitquery
    hasGraphQL: true, // Via Bitquery
    isActive: true,
    supportsCrossChain: false,
    hasLiquidityMining: true,
    isEvmCompatible: false,
    isTVM: true,
    hasSolidityContracts: true,
    tvl: "$500+ million",
    volume24h: "$100+ million",
  },
  
  notes: [
    "SunSwap is the official and largest DEX on Tron",
    "Deep liquidity for TRX, USDT, and major TRC-20 tokens",
    "Low transaction fees due to Tron's efficient network",
    "Integrated with SUN.io DeFi ecosystem",
    "Supports liquidity mining and yield farming",
    "Router contract: TKzxdSv2FZKQrEqkKVgp5DcwEXBEKMg2Ax",
    "Uses TronWeb for smart contract interactions",
    "Bitquery provides GraphQL subgraph alternative",
  ],
};
