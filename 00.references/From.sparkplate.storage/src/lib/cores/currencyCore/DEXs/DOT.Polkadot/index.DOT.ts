// DOT.Polkadot DEX Exports
// Polkadot ecosystem decentralized exchanges

export { hydraDXDEX } from './hydraDX.DOT';
export { stellaSwapDEX } from './stellaSwap.DOT';
export { zenlinkDEX } from './zenlink.DOT';
export { polkaswapDEX } from './polkaswap.DOT';
export { acalaSwapDEX } from './acalaSwap.DOT';
export { karuraSwapDEX } from './karuraSwap.DOT';
export { arthSwapDEX } from './arthSwap.DOT';
export { beamswapDEX } from './beamswap.DOT';

// Metadata for Polkadot DEX ecosystem
export const polkadotDexMetadata = {
  ecosystem: "Polkadot",
  totalDEXs: 7,
  
  parachains: ["Moonbeam", "Astar", "Acala", "Karura", "HydraDX"],
  
  crossChainProtocols: ["Zenlink", "Polkaswap"],
  
  evmCompatibleChains: ["Moonbeam", "Astar"],
  
  substrateChains: ["Acala", "Karura", "HydraDX"],
  
  byParachain: {
    moonbeam: ["StellaSwap", "Beamswap"],
    astar: ["ArthSwap"],
    acala: ["Acala Swap"],
    karura: ["Karura Swap"],
    hydraDX: ["HydraDX"],
    crossChain: ["Zenlink", "Polkaswap"],
  },
  
  byType: {
    amm: ["HydraDX", "StellaSwap", "Acala Swap", "Karura Swap", "ArthSwap", "Beamswap"],
    protocol: ["Zenlink"],
    multiAlgorithm: ["Polkaswap"],
  },
  
  features: {
    xcmSupport: true,
    evmCompatibility: ["Moonbeam", "Astar"],
    liquidStaking: ["Acala (LDOT)", "Karura (LKSM)"],
    stablecoins: ["AUSD (Acala)", "KUSD (Karura)"],
    parachainCommunication: true,
  },
  
  integrationPatterns: {
    substrateApi: ["HydraDX", "Acala Swap", "Karura Swap"],
    evmContracts: ["StellaSwap", "Beamswap", "ArthSwap"],
    crossChainModules: ["Zenlink", "Polkaswap"],
    subqueryIndexers: ["Most DEXs have SubQuery support"],
  },
};
