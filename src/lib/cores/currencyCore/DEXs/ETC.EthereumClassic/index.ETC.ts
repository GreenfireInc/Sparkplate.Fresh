// ETC.EthereumClassic DEX Exports
// Ethereum Classic ecosystem decentralized exchanges and instant exchanges

export { etcswapDEX } from './etcswap.ETC';
export { hebeswapDEX } from './hebeswap.ETC';
export { classicDAODEX } from './classicDAO.ETC';
export { sideShiftDEX } from './sideShift.ETC';
export { changeNOWDEX } from './changeNOW.ETC';
export { simpleSwapDEX } from './simpleSwap.ETC';
export { stealthEXDEX } from './stealthEX.ETC';

// Metadata for Ethereum Classic DEX ecosystem
export const etcDexMetadata = {
  ecosystem: "Ethereum Classic",
  totalDEXs: 7,
  
  categories: {
    nativeDEXs: ["ETCswap", "HebeSwap", "ClassicDAO"],
    instantExchanges: ["SideShift.ai", "ChangeNOW", "SimpleSwap", "StealthEX"],
  },
  
  byType: {
    amm: ["ETCswap", "HebeSwap"],
    dao: ["ClassicDAO"],
    crossChain: ["SideShift.ai", "ChangeNOW", "SimpleSwap", "StealthEX"],
  },
  
  features: {
    evmCompatible: true,
    chainId: 61,
    proofType: "Proof of Work (Ethash)",
    limitedDeFiEcosystem: true,
    uniswapV2Forks: true,
    twapOracles: true, // ETCswap
    nftMarketplace: true, // HebeSwap
  },
  
  integrationPatterns: {
    nativeDEXs: "EVM contracts with ethers.js or web3.js",
    instantExchanges: "REST APIs with no KYC",
    rpcEndpoints: ["https://etc.rivet.link", "https://www.ethercluster.com/etc"],
    blockExplorers: ["https://blockscout.com/etc/mainnet/", "https://etcblockexplorer.com/"],
  },
  
  limitations: {
    smallerEcosystem: "ETC has a smaller DeFi ecosystem compared to Ethereum",
    limitedSubgraphs: "Few subgraphs available for indexed data",
    lowerLiquidity: "Native DEXs have lower TVL than Ethereum DEXs",
    reliesOnInstantExchanges: "Many users rely on instant cross-chain exchanges",
  },
  
  advantages: {
    immutabilityFocus: "ETC maintains 'code is law' philosophy",
    pow: "Proof of Work provides security and decentralization",
    evmCompatible: "Full EVM compatibility with Ethereum tooling",
    lowFees: "Generally lower transaction fees than Ethereum",
  },
  
  bestFor: {
    nativeSwaps: "ETCswap (V2 & V3 with concentrated liquidity)",
    largestTVL: "HebeSwap (~$350k TVL)",
    crossChainSwaps: "SideShift.ai, ChangeNOW, SimpleSwap, StealthEX",
    priceFeeds: "ETCswap TWAP oracles, HebeSwap oracle",
  },
};
