// TronTrade DEX Information
// Multi-feature DeFi platform on Tron
// Source: Research compiled from Oct14.Research.Cryptocurrency.TRX.Tron

export const trontradeDEX = {
  name: "TronTrade",
  blockchain: "Tron (TRX)",
  type: "Multi-Feature DEX",
  description: "Comprehensive DeFi platform on Tron offering trading, staking, NFT marketplace, and yield farming. TronTrade provides an all-in-one solution for Tron DeFi users.",
  
  urls: {
    main: "https://trontrade.io/",
    app: "https://app.trontrade.io/",
    swap: "https://app.trontrade.io/swap",
    nft: "https://app.trontrade.io/nft",
    docs: "https://docs.trontrade.io/",
  },
  
  api: {
    endpoints: {
      tronGridApi: "https://api.trongrid.io",
      trontradeApi: "https://api.trontrade.io",
    },
    documentation: "https://docs.trontrade.io/",
    apiReference: "https://developers.tron.network/reference/introduction",
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

// Get TronTrade pool info
async function getTronTradePool(poolId: string) {
  const contractAddress = 'TTRONTRADE_CONTRACT_ADDRESS';
  
  const contract = await tronWeb.contract().at(contractAddress);
  const poolInfo = await contract.getPoolInfo(poolId).call();
  
  console.log('TronTrade Pool Info:', poolInfo);
  
  return poolInfo;
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/TronTrade_io",
    telegram: "https://t.me/trontrade",
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
    isTVM: true,
    hasSolidityContracts: true,
    hasNFTMarketplace: true,
    hasStaking: true,
    hasYieldFarming: true,
    tvl: "$30+ million",
    volume24h: "$5+ million",
  },
  
  notes: [
    "TronTrade offers multiple DeFi features in one platform",
    "Integrated NFT marketplace for Tron NFTs",
    "Staking and yield farming opportunities",
    "Support for TRC-20 and TRC-721 tokens",
    "Community-driven governance",
    "Built on Tron Virtual Machine",
    "Growing ecosystem on Tron",
  ],
};
