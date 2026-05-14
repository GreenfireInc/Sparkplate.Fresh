// Terra (LUNA) DEX Exports
// Aggregates all Terra DEX platforms

import { astroportDEX } from './astroport.LUNA';
import { whiteWhaleDEX } from './whiteWhale.LUNA';
import { phoenixProtocolDEX } from './phoenixProtocol.LUNA';
import { edgeProtocolDEX } from './edgeProtocol.LUNA';
import { terraswapDEX } from './terraswap.LUNA';
import { loopMarketsDEX } from './loopMarkets.LUNA';
import { spectrumProtocolDEX } from './spectrumProtocol.LUNA';

// Export individual DEXs with LUNA prefix to avoid naming conflicts
export { 
  astroportDEX as lunaAstroportDEX,
  whiteWhaleDEX as lunaWhiteWhaleDEX,
  phoenixProtocolDEX as lunaPhoenixProtocolDEX,
  edgeProtocolDEX as lunaEdgeProtocolDEX,
  terraswapDEX as lunaTerraswapDEX,
  loopMarketsDEX as lunaLoopMarketsDEX,
  spectrumProtocolDEX as lunaSpectrumProtocolDEX
};

// Lazy-load object for dynamic imports
export const terraDexes = {
  astroport: () => import('./astroport.LUNA').then(m => m.astroportDEX),
  whiteWhale: () => import('./whiteWhale.LUNA').then(m => m.whiteWhaleDEX),
  phoenixProtocol: () => import('./phoenixProtocol.LUNA').then(m => m.phoenixProtocolDEX),
  edgeProtocol: () => import('./edgeProtocol.LUNA').then(m => m.edgeProtocolDEX),
  terraswap: () => import('./terraswap.LUNA').then(m => m.terraswapDEX),
  loopMarkets: () => import('./loopMarkets.LUNA').then(m => m.loopMarketsDEX),
  spectrumProtocol: () => import('./spectrumProtocol.LUNA').then(m => m.spectrumProtocolDEX),
};

// Terra DEX metadata
export const lunaDexMetadata = {
  blockchain: 'Terra (LUNA)',
  totalDexes: 7,
  note: 'Terra is a Cosmos SDK-based blockchain with CosmWasm smart contracts. All DEXs use LCD API queries for contract interaction.',
  categories: {
    multiChainAmm: ['Astroport', 'White Whale'],
    nativeAmm: ['Phoenix Protocol', 'Loop Markets', 'TerraSwap'],
    hybridDex: ['Edge Protocol'],
    yieldOptimizer: ['Spectrum Protocol'],
  },
  features: {
    hasCosmWasm: true,
    hasGraphQL: true, // Astroport
    hasLcdApi: true,
    hasIbcSupport: true,
    hasCrossChain: true,
    hasLiquidityMining: true,
    hasYieldFarming: true,
    hasAutoCompounding: true, // Spectrum
    hasOrderbook: true, // Edge Protocol
  },
  technicalDetails: {
    consensus: 'Delegated Proof of Stake (Tendermint)',
    smartContractPlatform: 'CosmWasm (Rust)',
    addressPrefix: 'terra',
    chainId: 'phoenix-1',
    lcdEndpoint: 'https://phoenix-lcd.terra.dev/',
    rpcEndpoint: 'https://terra-rpc.polkachu.com/',
  },
  stats: {
    totalTvl: '$80+ million',
    totalVolume24h: '$8+ million',
    largestDex: 'Astroport',
    oldestDex: 'TerraSwap',
  },
  resources: {
    terra: 'https://www.terra.money/',
    docs: 'https://docs.terra.money/',
    finder: 'https://finder.terra.money/',
    station: 'https://station.terra.money/',
    cosmWasm: 'https://cosmwasm.com/',
  },
  notes: [
    'Terra is a Cosmos SDK-based blockchain focused on stablecoins and DeFi',
    'Terra 2.0 (phoenix-1) launched after Terra Classic collapse in May 2022',
    'All DEXs use CosmWasm smart contracts',
    'LCD API (Light Client Daemon) for querying contract state',
    'IBC (Inter-Blockchain Communication) for cross-chain transfers',
    'Astroport is the dominant DEX with most liquidity',
    'TerraSwap primarily operates on Terra Classic now',
    'Growing ecosystem with unique DeFi primitives',
  ],
};
