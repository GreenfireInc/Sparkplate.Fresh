// Waves (WAVES) DEX Exports
// Aggregates all Waves DEX platforms

import { wavesExchangeDEX } from './wavesExchange.WAVES';
import { swopfiDEX } from './swopfi.WAVES';
import { puzzleSwapDEX } from './puzzleSwap.WAVES';
import { wxNetworkDEX } from './wxNetwork.WAVES';
import { viresFinanceDEX } from './viresFinance.WAVES';
import { neutrinoProtocolDEX } from './neutrinoProtocol.WAVES';
import { wavesDucksDEX } from './wavesDucks.WAVES';

// Export individual DEXs
export {
  wavesExchangeDEX,
  swopfiDEX,
  puzzleSwapDEX,
  wxNetworkDEX,
  viresFinanceDEX,
  neutrinoProtocolDEX,
  wavesDucksDEX
};

// Lazy-load object for dynamic imports
export const wavesDexes = {
  wavesExchange: () => import('./wavesExchange.WAVES').then(m => m.wavesExchangeDEX),
  swopfi: () => import('./swopfi.WAVES').then(m => m.swopfiDEX),
  puzzleSwap: () => import('./puzzleSwap.WAVES').then(m => m.puzzleSwapDEX),
  wxNetwork: () => import('./wxNetwork.WAVES').then(m => m.wxNetworkDEX),
  viresFinance: () => import('./viresFinance.WAVES').then(m => m.viresFinanceDEX),
  neutrinoProtocol: () => import('./neutrinoProtocol.WAVES').then(m => m.neutrinoProtocolDEX),
  wavesDucks: () => import('./wavesDucks.WAVES').then(m => m.wavesDucksDEX),
};

// Waves DEX metadata
export const wavesDexMetadata = {
  blockchain: 'Waves (WAVES)',
  totalDexes: 7,
  note: 'Waves is a multi-purpose blockchain with native DEX built into the platform. Features Leased Proof of Stake (LPoS), Ride smart contract language, and orderbook-based trading. Unique characteristics: fixed 0.003 WAVES fee per order, 15-word seed phrase (not BIP44), and data oracle system.',
  categories: {
    hybridExchanges: ['Waves.Exchange'],
    ammDex: ['Swop.fi'],
    aggregators: ['Puzzle Swap'],
    layer2: ['WX Network'],
    lendingProtocols: ['ViresFinance'],
    stablecoinProtocols: ['Neutrino Protocol'],
    nftMarketplaces: ['Waves Ducks'],
  },
  features: {
    hasNativeDEX: true,
    hasOrderbook: true,
    hasAMM: true,
    hasLayer2: true,
    hasLending: true,
    hasStablecoin: true,
    hasNFT: true,
    hasFixedFees: true,
    hasLeasing: true,
    hasOracles: true,
  },
  technicalDetails: {
    consensus: 'Leased Proof of Stake (LPoS)',
    smartContractLanguage: 'Ride (functional language)',
    blockTime: '~60 seconds',
    throughput: '~1,000 TPS',
    signatures: 'Curve25519 (Ed25519)',
    derivationPath: 'N/A (15-word seed phrase, not BIP44)',
    addressFormat: 'Base58 (starts with 3P for mainnet)',
    matcherFee: '0.003 WAVES per order',
    explorerApi: 'https://nodes.wavesnodes.com',
    dataService: 'https://api.wavesplatform.com/v0',
  },
  stats: {
    totalTvl: '$50+ million',
    totalVolume24h: '$5+ million',
    largestDex: 'Waves.Exchange',
    largestAMM: 'Swop.fi',
    totalAssets: '30,000+ custom tokens',
  },
  resources: {
    waves: 'https://waves.tech/',
    docs: 'https://docs.waves.tech/',
    explorer: 'https://wavesexplorer.com/',
    dataService: 'https://api.wavesplatform.com/v0',
    matcher: 'https://matcher.wavesplatform.com/',
    nodeAPI: 'https://nodes.wavesnodes.com',
    signer: 'https://docs.waves.tech/en/building-apps/waves-api-and-sdk/client-libraries/signer',
    keeper: 'https://wavesplatform.com/products-keeper',
  },
  notes: [
    'Native DEX built into Waves platform',
    'Orderbook matching via Matcher nodes',
    'Fixed 0.003 WAVES fee per order',
    'Leased Proof of Stake for consensus',
    'Ride functional smart contract language',
    '15-word seed phrase (not BIP39/BIP44)',
    'Data oracle system for external data',
    'Gateway services for BTC, ETH, LTC',
    'Waves.Exchange is hybrid DEX/CEX',
    'Layer 2 via WX Network for scaling',
    'USDN algorithmic stablecoin via Neutrino',
    'Supports 30,000+ custom tokens',
  ],
};
