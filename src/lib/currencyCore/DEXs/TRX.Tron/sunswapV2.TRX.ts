// SunSwap V2 DEX Information
// Enhanced version of SunSwap on Tron
// Source: Research compiled from Oct14.Research.Cryptocurrency.TRX.Tron

export const sunswapV2DEX = {
  name: "SunSwap V2",
  blockchain: "Tron (TRX)",
  type: "AMM DEX V2",
  description: "Enhanced version of SunSwap with improved features, better capital efficiency, and advanced trading mechanics. SunSwap V2 offers concentrated liquidity and optimized routing for better prices.",
  
  urls: {
    main: "https://v2.sunswap.com/",
    app: "https://sun.io/",
    swap: "https://v2.sunswap.com/#/swap",
    pools: "https://v2.sunswap.com/#/pool",
    docs: "https://docs.sun.io/",
  },
  
  api: {
    endpoints: {
      tronGridApi: "https://api.trongrid.io",
      sunswapApi: "https://api.sunswap.com/v2",
      routerV2Contract: "TKzxdSv2FZKQrEqkKVgp5DcwEXBEKMg2Ax",
    },
    documentation: "https://docs.sun.io/",
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
          description: "Official Tron JavaScript SDK",
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
    example: `
import TronWeb from 'tronweb';

// Initialize TronWeb
const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
});

// SunSwap V2 Router Contract
const SUNSWAP_V2_ROUTER = 'TKzxdSv2FZKQrEqkKVgp5DcwEXBEKMg2Ax';

// Get optimal swap route from SunSwap V2
async function getSunSwapV2Route(tokenIn: string, tokenOut: string, amountIn: number) {
  const routerContract = await tronWeb.contract().at(SUNSWAP_V2_ROUTER);
  
  // V2 features improved routing algorithm
  const route = await routerContract.getOptimalRoute(tokenIn, tokenOut, amountIn).call();
  
  console.log('SunSwap V2 Optimal Route:', route);
  
  return route;
}
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
    hasConcentratedLiquidity: true,
    hasOptimizedRouting: true,
    tvl: "$400+ million",
    volume24h: "$80+ million",
  },
  
  notes: [
    "SunSwap V2 is the upgraded version of SunSwap",
    "Improved capital efficiency with concentrated liquidity",
    "Better routing algorithm for optimal swap prices",
    "Lower slippage on large trades",
    "Enhanced user interface and experience",
    "Backward compatible with V1",
    "Part of SUN.io DeFi ecosystem",
    "Uses same router address as V1",
  ],
};
