// Terra Classic (LUNC) DEX Exports
// Aggregates all Terra Classic DEX platforms and instant exchanges

import { terraswapClassicDEX } from './terraswapClassic.LUNC';
import { terraportDEX } from './terraport.LUNC';
import { astroportClassicDEX } from './astroportClassic.LUNC';
import { spectrumClassicDEX } from './spectrumClassic.LUNC';
import { changeNOWDEX } from './changeNOW.LUNC';
import { sideShiftDEX } from './sideShift.LUNC';

// Export individual DEXs with LUNC prefix to avoid naming conflicts
export {
  terraswapClassicDEX as luncTerraswapClassicDEX,
  terraportDEX as luncTerraportDEX,
  astroportClassicDEX as luncAstroportClassicDEX,
  spectrumClassicDEX as luncSpectrumClassicDEX,
  changeNOWDEX as luncChangeNOWDEX,
  sideShiftDEX as luncSideShiftDEX
};

// Lazy-load object for dynamic imports
export const terraClassicDexes = {
  terraswapClassic: () => import('./terraswapClassic.LUNC').then(m => m.terraswapClassicDEX),
  terraport: () => import('./terraport.LUNC').then(m => m.terraportDEX),
  astroportClassic: () => import('./astroportClassic.LUNC').then(m => m.astroportClassicDEX),
  spectrumClassic: () => import('./spectrumClassic.LUNC').then(m => m.spectrumClassicDEX),
  changeNOW: () => import('./changeNOW.LUNC').then(m => m.changeNOWDEX),
  sideShift: () => import('./sideShift.LUNC').then(m => m.sideShiftDEX),
};

// Terra Classic DEX metadata
export const luncDexMetadata = {
  blockchain: 'Terra Classic (LUNC)',
  totalDexes: 6,
  note: 'Terra Classic is the original Terra blockchain (Columbus-5) after the May 2022 collapse. All native DEXs use CosmWasm smart contracts and LCD API queries.',
  categories: {
    nativeAmm: ['TerraSwap Classic', 'Astroport Classic'],
    crossChainBridge: ['Terraport'],
    yieldOptimizer: ['Spectrum Protocol Classic'],
    instantExchanges: ['ChangeNOW', 'SideShift.ai'],
  },
  features: {
    hasCosmWasm: true,
    hasGraphQL: false,
    hasLcdApi: true,
    hasIbcSupport: true,
    hasCrossChain: true,
    hasYieldFarming: true,
    hasAutoCompounding: true, // Spectrum Classic
    hasInstantExchanges: true,
    hasLuncBurning: true, // Terraport
  },
  technicalDetails: {
    consensus: 'Delegated Proof of Stake (Tendermint)',
    smartContractPlatform: 'CosmWasm (Rust)',
    addressPrefix: 'terra',
    chainId: 'columbus-5',
    lcdEndpoint: 'https://fcd.terra.money/',
    publicNodeLcd: 'https://terra-classic-lcd.publicnode.com/',
    rpcEndpoint: 'https://terra-classic-rpc.publicnode.com/',
  },
  stats: {
    totalTvl: '$3+ million',
    totalVolume24h: '$150k+',
    largestDex: 'TerraSwap Classic',
    oldestDex: 'TerraSwap Classic',
  },
  resources: {
    terraClassic: 'https://www.terraclassic.community/',
    docs: 'https://classic-docs.terra.money/',
    finder: 'https://finder.terra.money/classic/',
    station: 'https://station.terra.money/classic',
    luncScan: 'https://luncscan.com/',
    terraClassicTools: 'https://www.terra-classic.money/',
  },
  notes: [
    'Terra Classic is the original Terra blockchain (columbus-5)',
    'Network collapsed in May 2022 due to UST depeg',
    'LUNC supply massively inflated post-collapse (6.9 trillion)',
    'Community-driven revival effort ongoing',
    'TerraSwap Classic is the primary DEX',
    'All native DEXs use CosmWasm smart contracts',
    'LCD API (Light Client Daemon) for querying contract state',
    'Cross-chain bridges for asset transfers',
    'LUNC burning mechanisms to reduce supply',
    'Limited development compared to Terra 2.0',
  ],
};
