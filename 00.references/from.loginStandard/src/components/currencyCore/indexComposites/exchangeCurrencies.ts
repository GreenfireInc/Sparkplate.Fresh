/**
 * Exchange Currencies Index - DEX and Exchange Tokens
 * 
 * This list contains tokens and currencies associated with decentralized exchanges (DEXs),
 * centralized exchanges, and trading platforms. Each entry includes:
 * - Currency information (name, ticker, UCID)
 * - Type classification (coin vs token)
 * - Consensus mechanism details
 * - Classification categories
 * - Contract addresses per blockchain
 * - Social media links
 * - API links
 * - Development resources (NPM, GitHub)
 * 
 * This index is used for exchange integrations, DEX aggregations, and trading features.
 * 
 * Last Updated: December 2025
 */

export type CurrencyType = 'coin' | 'token';
export type ConsensusType = 'proof-of-stake' | 'proof-of-work' | 'proof-of-authority' | 'delegated-proof-of-stake' | 'nominated-proof-of-stake' | 'liquid-proof-of-stake' | 'byzantine-fault-tolerance' | 'proof-of-transfer' | 'proof-of-coverage' | 'proof-of-space-and-time' | 'proof-of-replication' | 'token' | 'hybrid' | 'optimistic-rollup' | 'zk-rollup';
export type CurrencyClass = 'layer-1' | 'layer-2' | 'defi' | 'dex' | 'nft' | 'gaming' | 'metaverse' | 'oracle' | 'privacy' | 'meme' | 'staking' | 'governance' | 'lending' | 'data' | 'infrastructure' | 'smart-contract-platform' | 'exchange-token' | 'ai' | 'storage' | 'payment' | 'social' | 'interoperability' | 'sports' | 'iot' | 'yield-farming' | 'derivatives' | 'stablecoin';
export type Blockchain = 'Ethereum' | 'BSC' | 'Polygon' | 'Tron' | 'Avalanche' | 'OKExChain' | 'HECO' | 'Ontology' | 'Solana' | 'Arbitrum' | 'Optimism' | 'Base' | 'Cronos' | 'Fantom' | 'Sui' | 'Aptos' | 'Cardano' | 'Cosmos' | 'Other';

export interface ContractAddress {
  blockchain: Blockchain;
  address: string;
}

export interface SocialMedia {
  twitter?: string;
  discord?: string;
  telegram?: string;
  github?: string;
  website?: string;
  medium?: string;
  reddit?: string;
}

export interface ExchangeCurrencyItem {
  id: string;
  name: string;
  ticker: string;
  description: string;
  ucid: number;
  type: CurrencyType;
  consensusType: ConsensusType;
  class: CurrencyClass[];
  blockchains: Blockchain[];
  contractAddresses?: ContractAddress[];
  socialMedia?: SocialMedia;
  apiLinks?: {
    explorer?: string;
    api?: string;
    docs?: string;
  };
  npm?: string | null;
}

export const EXCHANGE_CURRENCIES: ExchangeCurrencyItem[] = [
  {
    id: '1inch',
    name: '1inch',
    ticker: '1INCH',
    description: 'A DEX aggregator that finds the best prices across multiple decentralized exchanges.',
    ucid: 8104,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'governance'],
    blockchains: ['Ethereum', 'BSC', 'Polygon', 'Avalanche', 'Arbitrum', 'Optimism'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x111111111117dC0aa78b770fA6A738034120C302' },
      { blockchain: 'BSC', address: '0x111111111117dC0aa78b770fA6A738034120C302' },
      { blockchain: 'Polygon', address: '0x9c2C5fd7b07E95EE044DDeba0E97a665F142394f' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/1inch',
      discord: 'https://discord.gg/1inch',
      telegram: 'https://t.me/OneInchNetwork',
      github: 'https://github.com/1inch',
      website: 'https://1inch.io'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0x111111111117dC0aa78b770fA6A738034120C302',
      api: 'https://api.1inch.io',
      docs: 'https://docs.1inch.io'
    },
    npm: 'https://www.npmjs.com/package/@1inch/limit-order-protocol'
  },
  {
    id: 'aave',
    name: 'Aave',
    ticker: 'AAVE',
    description: 'A decentralized lending protocol that allows users to lend and borrow cryptocurrencies without intermediaries.',
    ucid: 7278,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'lending', 'governance'],
    blockchains: ['Ethereum', 'Polygon', 'Avalanche', 'Arbitrum', 'Optimism'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9' },
      { blockchain: 'Polygon', address: '0xD6DF932A45C0f255f85145f286eA0b292B21C90B' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/aaveaave',
      discord: 'https://discord.gg/aave',
      github: 'https://github.com/aave',
      website: 'https://aave.com'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0x7Fc66500c84A76Ad7e9c93437bFc5Ac33E2DDaE9',
      api: 'https://aave.com/api',
      docs: 'https://docs.aave.com'
    },
    npm: 'https://www.npmjs.com/package/@aave/protocol-js'
  },
  {
    id: 'acryptos',
    name: 'Acryptos',
    ticker: 'ACS',
    description: 'A yield optimizer and stablecoin swap platform on Binance Smart Chain.',
    ucid: 7844,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'yield-farming'],
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0x4197C6EF387563a02cA1D3b3b4C5b5b5b5b5b5b5' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/acryptos',
      website: 'https://acryptos.com'
    },
    npm: null
  },
  {
    id: 'aerodrome',
    name: 'Aerodrome',
    ticker: 'AERO',
    description: 'A next-generation AMM designed to be the central liquidity hub on Base.',
    ucid: 29270,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'layer-2'],
    blockchains: ['Base'],
    contractAddresses: [
      { blockchain: 'Base', address: '0x940181a94A35A4569E4529A3CDfB74e38FD98631' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/aerodromefi',
      website: 'https://aerodrome.finance'
    },
    npm: null
  },
  {
    id: 'aevo',
    name: 'Aevo',
    ticker: 'AEVO',
    description: 'A high-performance decentralized options exchange built on a custom Layer 2.',
    ucid: 29676,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'layer-2'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xB528edBfE7137e545C4CD06E2C8C1C3F0B5C2C5C' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/aevoxyz',
      website: 'https://www.aevo.xyz'
    },
    npm: null
  },
  {
    id: 'aiswap',
    name: 'AiSwap',
    ticker: 'OKEX',
    description: 'An automated market maker DEX on OKExChain with yield farming features.',
    ucid: 15000,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['OKExChain'],
    socialMedia: {
      website: 'https://aiswap.io'
    },
    npm: null
  },
  {
    id: 'airswap',
    name: 'AirSwap',
    ticker: 'AST',
    description: 'A decentralized peer-to-peer trading network built on Ethereum for ERC-20 tokens.',
    ucid: 1758,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x27054b13b1B798B345b591a4d22e6562d47eA75a' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/airswap',
      website: 'https://www.airswap.io',
      github: 'https://github.com/airswap'
    },
    npm: 'https://www.npmjs.com/package/@airswap/libraries'
  },
  {
    id: 'apeswap',
    name: 'ApeSwap',
    ticker: 'BANANA',
    description: 'A multichain DeFi hub offering yield farming, staking, and an AMM DEX.',
    ucid: 7859,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['BSC', 'Polygon', 'Ethereum'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/ape_swap',
      website: 'https://apeswap.finance',
      github: 'https://github.com/ApeSwapFinance'
    },
    npm: null
  },
  {
    id: 'asd',
    name: 'ASD',
    ticker: 'ASD',
    description: 'A DEX token with limited public information.',
    ucid: 20000,
    type: 'token',
    consensusType: 'token',
    class: ['dex'],
    blockchains: ['Other'],
    npm: null
  },
  {
    id: 'asia-coin',
    name: 'Asia Coin',
    ticker: 'ASIA',
    description: 'A regional cryptocurrency token with limited public information.',
    ucid: 20001,
    type: 'token',
    consensusType: 'token',
    class: ['payment'],
    blockchains: ['Other'],
    npm: null
  },
  {
    id: 'aster',
    name: 'Aster',
    ticker: 'ASTER',
    description: 'A token with limited public information.',
    ucid: 20002,
    type: 'token',
    consensusType: 'token',
    class: ['defi'],
    blockchains: ['Other'],
    npm: null
  },
  {
    id: 'babyswap',
    name: 'BabySwap',
    ticker: 'BABY',
    description: 'An AMM and yield farm on Binance Smart Chain with NFT features.',
    ucid: 9997,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'nft'],
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/babyswap_bsc',
      website: 'https://babyswap.finance'
    },
    npm: null
  },
  {
    id: 'baguette',
    name: 'Baguette',
    ticker: 'BAG',
    description: 'A community-driven DEX on Avalanche with yield farming capabilities.',
    ucid: 10500,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Avalanche'],
    socialMedia: {
      website: 'https://baguette.exchange'
    },
    npm: null
  },
  {
    id: 'bakeryswap',
    name: 'BakerySwap',
    ticker: 'BAKE',
    description: 'An AMM and NFT marketplace on Binance Smart Chain with yield farming.',
    ucid: 7064,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'nft'],
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/bakery_swap',
      website: 'https://www.bakeryswap.org'
    },
    npm: null
  },
  {
    id: 'bakerytoken',
    name: 'BakeryToken',
    ticker: 'BAKE',
    description: 'The governance token for BakerySwap DEX and NFT marketplace.',
    ucid: 7064,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'governance', 'nft'],
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5' }
    ],
    npm: null
  },
  {
    id: 'balancer',
    name: 'Balancer',
    ticker: 'BAL',
    description: 'An automated portfolio manager and liquidity provider with flexible pool ratios.',
    ucid: 5728,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'governance'],
    blockchains: ['Ethereum', 'Polygon', 'Arbitrum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xba100000625a3754423978a60c9317c58a424e3D' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/Balancer',
      website: 'https://balancer.fi',
      github: 'https://github.com/balancer'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0xba100000625a3754423978a60c9317c58a424e3D',
      docs: 'https://docs.balancer.fi'
    },
    npm: 'https://www.npmjs.com/package/@balancer-labs/sdk'
  },
  {
    id: 'bancor',
    name: 'Bancor',
    ticker: 'BNT',
    description: 'A decentralized trading protocol with automated market-making and single-sided liquidity provision.',
    ucid: 1727,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/Bancor',
      website: 'https://bancor.network',
      github: 'https://github.com/bancorprotocol'
    },
    npm: 'https://www.npmjs.com/package/@bancor/sdk'
  },
  {
    id: 'binance-coin',
    name: 'Binance Coin',
    ticker: 'BNB',
    description: 'The native cryptocurrency of Binance Smart Chain, used for transactions and exchange fees.',
    ucid: 1839,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'exchange-token', 'payment'],
    blockchains: ['BSC'],
    socialMedia: {
      twitter: 'https://twitter.com/binance',
      website: 'https://www.binance.com',
      github: 'https://github.com/bnb-chain'
    },
    apiLinks: {
      explorer: 'https://bscscan.com',
      api: 'https://api.binance.com',
      docs: 'https://binance-docs.github.io'
    },
    npm: 'https://www.npmjs.com/package/@binance-chain/javascript-sdk'
  },
  {
    id: 'biswap',
    name: 'Biswap',
    ticker: 'BSW',
    description: 'A decentralized exchange on BSC with the lowest platform transaction fee.',
    ucid: 9999,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0x965F527D9159dCe6288a2219DB51fc6Eef120dD1' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/Biswap_DEX',
      website: 'https://biswap.org'
    },
    npm: null
  },
  {
    id: 'bitget-token',
    name: 'Bitget Token',
    ticker: 'BGB',
    description: 'The native token of Bitget exchange, used for trading fee discounts and platform benefits.',
    ucid: 3802,
    type: 'token',
    consensusType: 'token',
    class: ['exchange-token'],
    blockchains: ['Ethereum', 'BSC'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x19de6b897Ed14A376Dda0Fe53a5420D2aE228F86' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/bitgetglobal',
      website: 'https://www.bitget.com'
    },
    npm: null
  },
  {
    id: 'bitmart-token',
    name: 'BitMart Token',
    ticker: 'BMX',
    description: 'The utility token of BitMart exchange offering trading fee discounts and voting rights.',
    ucid: 2933,
    type: 'token',
    consensusType: 'token',
    class: ['exchange-token', 'governance'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x986EE2B944c42D017F53AfC4191a938e8ACf3b5C' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/BitMartExchange',
      website: 'https://www.bitmart.com'
    },
    npm: null
  },
  {
    id: 'bitpanda',
    name: 'Bitpanda',
    ticker: 'BEST',
    description: 'The ecosystem token of Bitpanda exchange providing benefits and rewards to holders.',
    ucid: 3662,
    type: 'token',
    consensusType: 'token',
    class: ['exchange-token'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x1B073382E63411E3BcfFE90aC1B9A43feFa1Ec6F' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/bitpanda',
      website: 'https://www.bitpanda.com'
    },
    npm: null
  },
  {
    id: 'bitshares',
    name: 'BitShares',
    ticker: 'BTS',
    description: 'A decentralized exchange and financial platform with its own blockchain for trading digital assets.',
    ucid: 463,
    type: 'coin',
    consensusType: 'delegated-proof-of-stake',
    class: ['layer-1', 'dex'],
    blockchains: ['Other'],
    socialMedia: {
      twitter: 'https://twitter.com/bitshares',
      website: 'https://bitshares.org',
      github: 'https://github.com/bitshares'
    },
    npm: 'https://www.npmjs.com/package/bitsharesjs'
  },
  {
    id: 'bitrue-coin',
    name: 'Bitrue Coin',
    ticker: 'BTR',
    description: 'The native token of Bitrue exchange offering trading fee discounts and platform privileges.',
    ucid: 8567,
    type: 'token',
    consensusType: 'token',
    class: ['exchange-token'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xd433138d12beB9929FF5fd31DF85AD691a9451F6' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/BitrueOfficial',
      website: 'https://www.bitrue.com'
    },
    npm: null
  },
  {
    id: 'bluefin',
    name: 'Bluefin',
    ticker: 'BLUE',
    description: 'A decentralized derivatives exchange built on Sui blockchain offering perpetual contracts.',
    ucid: 30500,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Sui'],
    socialMedia: {
      twitter: 'https://twitter.com/bluefinapp',
      website: 'https://bluefin.io'
    },
    npm: null
  },
  {
    id: 'bone-shibaswap',
    name: 'Bone ShibaSwap',
    ticker: 'BONE',
    description: 'The governance token of ShibaSwap, a decentralized exchange in the Shiba Inu ecosystem.',
    ucid: 11045,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'governance'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x9813037ee2218799597d83D4a5B6F3b6778218d9' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/Shibtoken',
      website: 'https://shibaswap.com'
    },
    npm: null
  },
  {
    id: 'brastoken',
    name: 'Brastoken',
    ticker: 'BRT',
    description: 'A Brazilian cryptocurrency token with limited public information.',
    ucid: 20003,
    type: 'token',
    consensusType: 'token',
    class: ['payment'],
    blockchains: ['Other'],
    npm: null
  },
  {
    id: 'bxh',
    name: 'BXH',
    ticker: 'BXH',
    description: 'A decentralized exchange protocol on OKExChain for token swapping and liquidity provision.',
    ucid: 20020,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['OKExChain'],
    npm: null
  },
  {
    id: 'cafeswap',
    name: 'CafeSwap',
    ticker: 'BREW',
    description: 'An AMM DEX on Binance Smart Chain with yield farming features.',
    ucid: 7900,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0x790Be81C3cA0e53974bE2688cB656954C0e3b3E0' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/cafeswap',
      website: 'https://cafeswap.finance'
    },
    npm: null
  },
  {
    id: 'cetus',
    name: 'Cetus',
    ticker: 'CETUS',
    description: 'A concentrated liquidity protocol and DEX built on Sui and Aptos blockchains.',
    ucid: 23254,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Sui', 'Aptos'],
    socialMedia: {
      twitter: 'https://twitter.com/CetusProtocol',
      website: 'https://www.cetus.zone',
      github: 'https://github.com/CetusProtocol'
    },
    npm: null
  },
  {
    id: 'chai',
    name: 'Chai',
    ticker: 'CHAI',
    description: 'An interest-bearing token built on MakerDAO DAI stablecoin.',
    ucid: 4825,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'staking'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x06AF07097C9Eeb7fD685c692751D5C66dB49c8FA' }
    ],
    npm: null
  },
  {
    id: 'cherryswap',
    name: 'CherrySwap',
    ticker: 'CHE',
    description: 'A DEX on OKExChain with AMM and yield farming capabilities.',
    ucid: 10850,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['OKExChain'],
    socialMedia: {
      website: 'https://cherryswap.net'
    },
    npm: null
  },
  {
    id: 'coinex-token',
    name: 'CoinEx Token',
    ticker: 'CET',
    description: 'The native token of CoinEx exchange offering trading fee discounts and VIP privileges.',
    ucid: 2941,
    type: 'token',
    consensusType: 'token',
    class: ['exchange-token'],
    blockchains: ['Other'],
    socialMedia: {
      twitter: 'https://twitter.com/coinexcom',
      website: 'https://www.coinex.com'
    },
    npm: null
  },
  {
    id: 'coinzix',
    name: 'Coinzix',
    ticker: 'ZIX',
    description: 'A cryptocurrency exchange token with limited public information.',
    ucid: 20025,
    type: 'token',
    consensusType: 'token',
    class: ['exchange-token'],
    blockchains: ['Other'],
    npm: null
  },
  {
    id: 'cometh',
    name: 'Cometh',
    ticker: 'MUST',
    description: 'A DeFi-powered game ecosystem on Polygon with DEX and yield farming.',
    ucid: 8300,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'gaming'],
    blockchains: ['Polygon'],
    contractAddresses: [
      { blockchain: 'Polygon', address: '0x9C78EE466D6Cb57A4d01Fd887D2b5dFb2D46288f' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/cometh',
      website: 'https://www.cometh.io',
      github: 'https://github.com/cometh-game'
    },
    npm: null
  },
  {
    id: 'compound',
    name: 'Compound',
    ticker: 'COMP',
    description: 'The governance token for Compound, an algorithmic money market protocol for lending and borrowing.',
    ucid: 5692,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'lending', 'governance'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xc00e94Cb662C3520282E6f5717214004A7f26888' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/compoundfinance',
      website: 'https://compound.finance',
      github: 'https://github.com/compound-finance'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0xc00e94Cb662C3520282E6f5717214004A7f26888',
      docs: 'https://docs.compound.finance'
    },
    npm: 'https://www.npmjs.com/package/@compound-finance/compound-js'
  },
  {
    id: 'cronos',
    name: 'Cronos',
    ticker: 'CRO',
    description: 'The native cryptocurrency of Cronos Chain, an EVM-compatible blockchain.',
    ucid: 3635,
    type: 'coin',
    consensusType: 'proof-of-authority',
    class: ['layer-1', 'payment', 'exchange-token'],
    blockchains: ['Cronos'],
    socialMedia: {
      twitter: 'https://twitter.com/cronos_chain',
      website: 'https://cronos.org',
      github: 'https://github.com/crypto-org-chain'
    },
    apiLinks: {
      explorer: 'https://cronoscan.com',
      docs: 'https://docs.cronos.org'
    },
    npm: null
  },
  {
    id: 'cryption-network-token',
    name: 'Cryption Network Token',
    ticker: 'CNT',
    description: 'A decentralized network token on Polygon with limited public information.',
    ucid: 20030,
    type: 'token',
    consensusType: 'token',
    class: ['defi'],
    blockchains: ['Polygon'],
    contractAddresses: [
      { blockchain: 'Polygon', address: '0x8c8bdBe9CeE455732525086264a4Bf9Cf821C498' }
    ],
    socialMedia: {
      website: 'https://cryption.network'
    },
    npm: null
  },
  {
    id: 'curve',
    name: 'Curve',
    ticker: 'CRV',
    description: 'A DEX optimized for stablecoin swaps with low slippage and efficient liquidity.',
    ucid: 6538,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'governance'],
    blockchains: ['Ethereum', 'Polygon', 'Arbitrum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xD533a949740bb3306d119CC777fa900bA034cd52' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/CurveFinance',
      website: 'https://curve.fi',
      github: 'https://github.com/curvefi'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0xD533a949740bb3306d119CC777fa900bA034cd52',
      docs: 'https://docs.curve.fi'
    },
    npm: 'https://www.npmjs.com/package/@curvefi/api'
  },
  {
    id: 'dex-ag',
    name: 'Dex.ag',
    ticker: 'DEX',
    description: 'A DEX aggregator finding the best prices across decentralized exchanges.',
    ucid: 20035,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Ethereum'],
    npm: null
  },
  {
    id: 'dexguru',
    name: 'DexGuru',
    ticker: 'GURU',
    description: 'A trading analytics and portfolio tracker token for DeFi traders.',
    ucid: 11300,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'data'],
    blockchains: ['Ethereum'],
    socialMedia: {
      twitter: 'https://twitter.com/dexguru',
      website: 'https://dex.guru'
    },
    npm: null
  },
  {
    id: 'dfyn',
    name: 'Dfyn',
    ticker: 'DFYN',
    description: 'A multi-chain AMM DEX on Polygon with cross-chain swaps and liquidity provision.',
    ucid: 8420,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'interoperability'],
    blockchains: ['Polygon'],
    contractAddresses: [
      { blockchain: 'Polygon', address: '0xC168E40227E4ebD8C1caE80F7a0a4B86E8b7f2e5' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/dfynnetwork',
      website: 'https://www.dfyn.network',
      github: 'https://github.com/dfyn'
    },
    npm: null
  },
  {
    id: 'dodo',
    name: 'DODO',
    ticker: 'DODO',
    description: 'A decentralized trading protocol using Proactive Market Maker (PMM) algorithm.',
    ucid: 7224,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Ethereum', 'BSC', 'Polygon', 'Arbitrum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x43Dfc4159D86F3A37A5A4B3D4580b888ad7d4DDd' },
      { blockchain: 'BSC', address: '0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/BreederDodo',
      website: 'https://dodoex.io',
      github: 'https://github.com/DODOEX'
    },
    npm: null
  },
  {
    id: 'drift-protocol',
    name: 'Drift Protocol',
    ticker: 'DRIFT',
    description: 'A decentralized perpetual futures exchange built on Solana.',
    ucid: 28300,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Solana'],
    socialMedia: {
      twitter: 'https://twitter.com/DriftProtocol',
      website: 'https://www.drift.trade',
      github: 'https://github.com/drift-labs'
    },
    npm: 'https://www.npmjs.com/package/@drift-labs/sdk'
  },
  {
    id: 'dydx',
    name: 'dYdX',
    ticker: 'DYDX',
    description: 'A decentralized derivatives exchange offering perpetual trading with up to 20x leverage.',
    ucid: 11156,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'governance'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x92D6C1e31e14520e676a687F0a93788B716BEff5' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/dYdX',
      website: 'https://dydx.exchange',
      github: 'https://github.com/dydxprotocol'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0x92D6C1e31e14520e676a687F0a93788B716BEff5',
      api: 'https://api.dydx.exchange',
      docs: 'https://docs.dydx.exchange'
    }
  },
  {
    id: 'dynamic-trading-rights',
    name: 'Dynamic Trading Rights',
    ticker: 'DTR',
    description: 'A trading rights token with limited public information.',
    ucid: 20006,
    type: 'token',
    consensusType: 'token',
    class: ['dex'],
    blockchains: ['Other'],
    npm: null
  },
  {
    id: 'elect',
    name: 'ELECT',
    ticker: 'ELECT',
    description: 'A cryptocurrency token with limited public information.',
    ucid: 20040,
    type: 'token',
    consensusType: 'token',
    class: ['exchange-token'],
    blockchains: ['Other'],
    npm: null
  },
  {
    id: 'electromcoin',
    name: 'ElectromCoin',
    ticker: 'ETM',
    description: 'A cryptocurrency token with limited public information.',
    ucid: 20008,
    type: 'token',
    consensusType: 'token',
    class: ['payment'],
    blockchains: ['Other'],
    npm: null
  },
  {
    id: 'ellipsis',
    name: 'Ellipsis',
    ticker: 'EPS',
    description: 'A stablecoin-focused DEX on Binance Smart Chain with low slippage swaps.',
    ucid: 8428,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'stablecoin'],
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0xA7f552078dcC247C2684336020c03648500C6d9F' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/ellipsisfinance',
      website: 'https://ellipsis.finance',
      github: 'https://github.com/ellipsis-finance'
    },
    npm: null
  },
  {
    id: 'ftx-token',
    name: 'FTX Token',
    ticker: 'FTT',
    description: 'The defunct utility token of the FTX exchange (ceased operations in 2022).',
    ucid: 3724,
    type: 'token',
    consensusType: 'token',
    class: ['exchange-token'],
    blockchains: ['Ethereum', 'Solana'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x50D1c9771902476076eCFc8B2A83Ad6b9355a4c9' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/FTX_Official',
      website: 'https://ftx.com'
    },
    npm: null
  },
  {
    id: 'fulcrum',
    name: 'Fulcrum',
    ticker: 'BZX',
    description: 'A decentralized margin trading and lending platform on Ethereum.',
    ucid: 3833,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'lending', 'derivatives'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x56d811088235F11C8920698a204A9010e7889E3b' }
    ],
    npm: null
  },
  {
    id: 'gatetoken',
    name: 'GateToken',
    ticker: 'GT',
    description: 'The native utility token of Gate.io exchange providing trading benefits.',
    ucid: 2141,
    type: 'token',
    consensusType: 'token',
    class: ['exchange-token'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xE66747a101bFF2dED369f22016F5bF5e5e0C0C0' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/gate_io',
      website: 'https://www.gate.io'
    },
    npm: null
  },
  {
    id: 'gemini-dollar',
    name: 'Gemini Dollar',
    ticker: 'GUSD',
    description: 'A regulated stablecoin pegged 1:1 to the US Dollar, issued by Gemini Trust Company.',
    ucid: 3306,
    type: 'token',
    consensusType: 'token',
    class: ['stablecoin', 'payment'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x056Fd409E1d7A124BD7017459dFEa2F394b44211' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/gemini',
      website: 'https://www.gemini.com'
    },
    npm: null
  },
  {
    id: 'gmx',
    name: 'GMX',
    ticker: 'GMX',
    description: 'A decentralized spot and perpetual exchange on Arbitrum and Avalanche.',
    ucid: 11857,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'governance'],
    blockchains: ['Arbitrum', 'Avalanche'],
    contractAddresses: [
      { blockchain: 'Arbitrum', address: '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/GMX_IO',
      website: 'https://gmx.io',
      github: 'https://github.com/gmx-io'
    },
    apiLinks: {
      explorer: 'https://arbiscan.io/token/0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a',
      docs: 'https://docs.gmx.io'
    },
    npm: null
  },
  {
    id: 'htx',
    name: 'HTX',
    ticker: 'HTX',
    description: 'The rebranded exchange token of HTX Global (formerly Huobi) providing trading benefits.',
    ucid: 2502,
    type: 'token',
    consensusType: 'token',
    class: ['exchange-token'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x6f259637dcD74C767781E37Bc6133cd6A68aa161' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/HTX_Global',
      website: 'https://www.htx.com'
    },
    npm: null
  },
  {
    id: 'huobi-token',
    name: 'Huobi Token',
    ticker: 'HT',
    description: 'The legacy exchange token (now rebranded to HTX) of Huobi Global.',
    ucid: 2502,
    type: 'token',
    consensusType: 'token',
    class: ['exchange-token'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x6f259637dcD74C767781E37Bc6133cd6A68aa161' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/HTX_Global',
      website: 'https://www.htx.com'
    },
    npm: null
  },
  {
    id: 'hyperliquid',
    name: 'Hyperliquid',
    ticker: 'HYPE',
    description: 'A high-performance decentralized perpetuals exchange with an on-chain order book.',
    ucid: 31000,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Arbitrum'],
    socialMedia: {
      twitter: 'https://twitter.com/hyperliquiddex',
      website: 'https://hyperliquid.xyz',
      github: 'https://github.com/hyperliquid-dex'
    },
    npm: null
  },
  {
    id: 'idex',
    name: 'IDEX',
    ticker: 'IDEX',
    description: 'A hybrid decentralized exchange combining the speed of centralized exchanges with blockchain settlement.',
    ucid: 3928,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'governance'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xB705268213D593B8FD88d3FDEFF93AFF5CbDcfAE' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/idexio',
      website: 'https://idex.io',
      github: 'https://github.com/idexio'
    },
    npm: 'https://www.npmjs.com/package/@idexio/idex-sdk'
  },
  {
    id: 'impossible',
    name: 'Impossible',
    ticker: 'IMPOSSIBLE',
    description: 'A multi-chain incubator, launchpad, and swap platform on BSC.',
    ucid: 11400,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['BSC'],
    socialMedia: {
      website: 'https://impossible.finance',
      github: 'https://github.com/impossiblefinance'
    },
    npm: null
  },
  {
    id: 'innoswap',
    name: 'InnoSwap',
    ticker: 'INNO',
    description: 'A decentralized exchange built on Ontology blockchain.',
    ucid: 20050,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Ontology'],
    socialMedia: {
      website: 'https://innoswap.com'
    },
    npm: null
  },
  {
    id: 'joe',
    name: 'JOE',
    ticker: 'JOE',
    description: 'The native token of Trader Joe, a one-stop DeFi platform on Avalanche.',
    ucid: 11396,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'governance'],
    blockchains: ['Avalanche'],
    contractAddresses: [
      { blockchain: 'Avalanche', address: '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/traderjoe_xyz',
      website: 'https://traderjoexyz.com',
      github: 'https://github.com/traderjoe-xyz'
    },
    npm: null
  },
  {
    id: 'julswap',
    name: 'JulSwap',
    ticker: 'JULD',
    description: 'A decentralized exchange and yield farming platform on Binance Smart Chain.',
    ucid: 7175,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'yield-farming'],
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0x5A41F637C3f7553dBa6dDC2D3cC0e0C8Db119572' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/JulSwap',
      website: 'https://julswap.com'
    },
    npm: null
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    ticker: 'JUP',
    description: 'The leading DEX aggregator on Solana providing best swap routes and prices.',
    ucid: 29210,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'governance'],
    blockchains: ['Solana'],
    socialMedia: {
      twitter: 'https://twitter.com/JupiterExchange',
      website: 'https://jup.ag',
      github: 'https://github.com/jup-ag'
    },
    apiLinks: {
      api: 'https://api.jup.ag',
      docs: 'https://docs.jup.ag'
    },
    npm: 'https://www.npmjs.com/package/@jup-ag/core'
  },
  {
    id: 'justswap',
    name: 'JustSwap',
    ticker: 'JST',
    description: 'A decentralized exchange built on the TRON blockchain for TRC-20 token swaps.',
    ucid: 5488,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Tron'],
    socialMedia: {
      website: 'https://justswap.org'
    },
    npm: null
  },
  {
    id: 'kswap',
    name: 'KSwap',
    ticker: 'KSWAP',
    description: 'A DEX on OKExChain with swap and yield farming features.',
    ucid: 11600,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['OKExChain'],
    socialMedia: {
      website: 'https://kswap.finance'
    },
    npm: null
  },
  {
    id: 'kucoin-token',
    name: 'KuCoin Token',
    ticker: 'KCS',
    description: 'The native token of KuCoin exchange providing trading fee discounts and rewards.',
    ucid: 2087,
    type: 'token',
    consensusType: 'token',
    class: ['exchange-token'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xf34960d9d60be18cC1D5Afc1A6F012A723a28811' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/kucoincom',
      website: 'https://www.kucoin.com'
    },
    npm: null
  },
  {
    id: 'kub-coin',
    name: 'KUB Coin',
    ticker: 'KUB',
    description: 'A cryptocurrency token with limited public information.',
    ucid: 20009,
    type: 'token',
    consensusType: 'token',
    class: ['payment'],
    blockchains: ['Other'],
    npm: null
  },
  {
    id: 'kyber-network',
    name: 'Kyber Network',
    ticker: 'KNC',
    description: 'A hub for liquidity protocols that aggregates liquidity from various sources.',
    ucid: 1982,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'governance'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xdeFA4e8a7bcBA345F687a2f1456F5Edd9CE97202' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/KyberNetwork',
      website: 'https://kyber.network',
      github: 'https://github.com/KyberNetwork'
    },
    npm: 'https://www.npmjs.com/package/@kybernetwork/ks-sdk-core'
  },
  {
    id: 'leo',
    name: 'LEO',
    ticker: 'LEO',
    description: 'The utility token of Bitfinex and iFinex providing trading benefits and platform utility.',
    ucid: 3957,
    type: 'token',
    consensusType: 'token',
    class: ['exchange-token'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x2AF5D2aD76741191D15Dfe7bF6aC92d4Bd912Ca3' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/bitfinex',
      website: 'https://www.bitfinex.com'
    },
    npm: null
  },
  {
    id: 'liechtenstein-cryptoassets-exchange',
    name: 'Liechtenstein Cryptoassets Exchange',
    ticker: 'LCX',
    description: 'A regulated security token exchange platform based in Liechtenstein.',
    ucid: 3766,
    type: 'token',
    consensusType: 'token',
    class: ['exchange-token', 'defi'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x037A54aB0621C6EBD24e8c1635d70902354A07D8' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/LCX',
      website: 'https://www.lcx.com'
    },
    npm: null
  },
  {
    id: 'loopring',
    name: 'Loopring',
    ticker: 'LRC',
    description: 'A zkRollup Layer 2 protocol for building high-performance decentralized exchanges.',
    ucid: 1934,
    type: 'token',
    consensusType: 'zk-rollup',
    class: ['layer-2', 'dex', 'infrastructure'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/loopringorg',
      website: 'https://loopring.org',
      github: 'https://github.com/Loopring'
    },
    npm: 'https://www.npmjs.com/package/@loopring-web/loopring-sdk'
  },
  {
    id: 'luaswap',
    name: 'LuaSwap',
    ticker: 'LUA',
    description: 'A multi-chain liquidity protocol for emerging blockchain networks.',
    ucid: 7200,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xB1f66997A5760428D3a87D68b90BfE0aE64121cC' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/luaswap',
      website: 'https://luaswap.org'
    },
    npm: null
  },
  {
    id: 'lydia',
    name: 'Lydia',
    ticker: 'LYD',
    description: 'An AMM DEX on Avalanche with yield farming and liquidity mining.',
    ucid: 9750,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Avalanche'],
    socialMedia: {
      twitter: 'https://twitter.com/lydiafinance',
      website: 'https://www.lydia.finance',
      github: 'https://github.com/LydiaFinance'
    },
    npm: null
  },
  {
    id: 'makiswap',
    name: 'MakiSwap',
    ticker: 'MAKI',
    description: 'A DEX and yield aggregator on Huobi ECO Chain (HECO).',
    ucid: 11700,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['HECO'],
    socialMedia: {
      website: 'https://makisfinance.com'
    },
    npm: null
  },
  {
    id: 'matcha',
    name: 'Matcha',
    ticker: 'MATCHA',
    description: 'A crypto trading interface built by 0x Labs aggregating DEX liquidity.',
    ucid: 20010,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Ethereum'],
    socialMedia: {
      twitter: 'https://twitter.com/matchaxyz',
      website: 'https://matcha.xyz'
    },
    npm: null
  },
  {
    id: 'maverick-protocol',
    name: 'Maverick Protocol',
    ticker: 'MAV',
    description: 'An infrastructure-focused DeFi protocol with dynamic liquidity distribution.',
    ucid: 27600,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'infrastructure'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x7448c7456a97769F6cD04F1E83A4A23cCdC46aBD' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/MavProtocol',
      website: 'https://www.mav.xyz',
      github: 'https://github.com/maverickprotocol'
    },
    npm: null
  },
  {
    id: 'mdex',
    name: 'Mdex',
    ticker: 'MDX',
    description: 'A dual-chain DEX operating on both Huobi ECO Chain and BSC.',
    ucid: 8335,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['BSC', 'HECO'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0x9C65AB58d8d978DB963e40f404A0b32Fc8820dE6' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/Mdextech',
      website: 'https://mdex.com'
    },
    npm: null
  },
  {
    id: 'minswap',
    name: 'Minswap',
    ticker: 'MIN',
    description: 'A multi-pool decentralized exchange on Cardano blockchain.',
    ucid: 13257,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Cardano'],
    socialMedia: {
      twitter: 'https://twitter.com/minswapdex',
      website: 'https://minswap.org',
      github: 'https://github.com/minswap'
    },
    npm: null
  },
  {
    id: 'mooniswap',
    name: 'Mooniswap',
    ticker: 'MOON',
    description: 'An AMM by 1inch Network with virtual balances to reduce slippage.',
    ucid: 7256,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Ethereum'],
    socialMedia: {
      website: 'https://mooniswap.exchange'
    },
    npm: null
  },
  {
    id: 'mstable',
    name: 'mStable',
    ticker: 'MTA',
    description: 'An autonomous and non-custodial stablecoin infrastructure protocol.',
    ucid: 5748,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'governance'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/mstable_',
      website: 'https://mstable.org',
      github: 'https://github.com/mstable'
    },
    npm: null
  },
  {
    id: 'mx-token',
    name: 'MX Token',
    ticker: 'MX',
    description: 'The utility token of MEXC exchange providing trading benefits and platform rights.',
    ucid: 3526,
    type: 'token',
    consensusType: 'token',
    class: ['exchange-token'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x11eeF04c884E24d9B7B4780add6d1bC5b0F8b4C0' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/MEXC_Official',
      website: 'https://www.mexc.com'
    },
    npm: null
  },
  {
    id: 'nerve',
    name: 'Nerve',
    ticker: 'NRV',
    description: 'A stablecoin-focused AMM on Binance Smart Chain.',
    ucid: 8410,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0x42F6f551ae042cBe50C739158b4f0CAC0Edb9096' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/nervefinance',
      website: 'https://nerve.fi'
    },
    npm: null
  },
  {
    id: 'oasis',
    name: 'Oasis',
    ticker: 'ROSE',
    description: 'A privacy-enabled blockchain platform for DeFi and responsible data economy.',
    ucid: 7653,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'privacy', 'smart-contract-platform'],
    blockchains: ['Other'],
    socialMedia: {
      twitter: 'https://twitter.com/oasisprotocol',
      website: 'https://oasisprotocol.org',
      github: 'https://github.com/oasisprotocol'
    },
    npm: 'https://www.npmjs.com/package/@oasisprotocol/client'
  },
  {
    id: 'okb',
    name: 'OKB',
    ticker: 'OKB',
    description: 'The native utility token of OKX exchange providing trading benefits and ecosystem access.',
    ucid: 3897,
    type: 'token',
    consensusType: 'token',
    class: ['exchange-token'],
    blockchains: ['Ethereum', 'OKExChain'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x75231F58b43240C9718Dd58B4967c5114342a86c' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/okx',
      website: 'https://www.okx.com'
    },
    npm: null
  },
  {
    id: 'openocean',
    name: 'OpenOcean',
    ticker: 'OOE',
    description: 'A full aggregation protocol for crypto trading across DeFi and CeFi.',
    ucid: 9675,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Ethereum', 'BSC', 'Polygon'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x9029FdFAe9A03135846381c7eF1651827ED1454D' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/OpenOceanGlobal',
      website: 'https://openocean.finance',
      github: 'https://github.com/openocean-finance'
    },
    npm: null
  },
  {
    id: 'orca',
    name: 'Orca',
    ticker: 'ORCA',
    description: 'The most user-friendly DEX on Solana with concentrated liquidity pools.',
    ucid: 11191,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Solana'],
    socialMedia: {
      twitter: 'https://twitter.com/orca_so',
      website: 'https://www.orca.so',
      github: 'https://github.com/orca-so'
    },
    npm: 'https://www.npmjs.com/package/@orca-so/sdk'
  },
  {
    id: 'osmosis',
    name: 'Osmosis',
    ticker: 'OSMO',
    description: 'An advanced AMM protocol built on Cosmos with interchain liquidity.',
    ucid: 12220,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'dex', 'interoperability'],
    blockchains: ['Cosmos'],
    socialMedia: {
      twitter: 'https://twitter.com/osmosiszone',
      website: 'https://osmosis.zone',
      github: 'https://github.com/osmosis-labs'
    },
    apiLinks: {
      explorer: 'https://www.mintscan.io/osmosis',
      docs: 'https://docs.osmosis.zone'
    },
    npm: 'https://www.npmjs.com/package/osmojs'
  },
  {
    id: 'pancakeswap',
    name: 'PancakeSwap',
    ticker: 'CAKE',
    description: 'The leading DEX on Binance Smart Chain with AMM, yield farming, and lottery.',
    ucid: 7186,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'governance'],
    blockchains: ['BSC', 'Ethereum'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/pancakeswap',
      website: 'https://pancakeswap.finance',
      github: 'https://github.com/pancakeswap'
    },
    apiLinks: {
      explorer: 'https://bscscan.com/token/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
      docs: 'https://docs.pancakeswap.finance'
    },
    npm: 'https://www.npmjs.com/package/@pancakeswap/sdk'
  },
  {
    id: 'pangolin',
    name: 'Pangolin',
    ticker: 'PNG',
    description: 'A community-driven DEX on Avalanche with low fees and fast finality.',
    ucid: 8694,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'governance'],
    blockchains: ['Avalanche'],
    contractAddresses: [
      { blockchain: 'Avalanche', address: '0x60781C2586D68229fde47564546784ab3fACA982' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/pangolindex',
      website: 'https://pangolin.exchange',
      github: 'https://github.com/pangolindex'
    },
    npm: 'https://www.npmjs.com/package/@pangolindex/sdk'
  },
  {
    id: 'paraswap',
    name: 'ParaSwap',
    ticker: 'PSP',
    description: 'A middleware aggregating many DEXs and lending protocols into one comprehensive interface.',
    ucid: 14534,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'governance'],
    blockchains: ['Ethereum', 'Polygon', 'BSC'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xcAfE001067cDEF266AfB7Eb5A286dCFD277f3dE5' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/paraswap',
      website: 'https://paraswap.io',
      github: 'https://github.com/paraswap'
    },
    apiLinks: {
      api: 'https://api.paraswap.io',
      docs: 'https://developers.paraswap.network'
    },
    npm: 'https://www.npmjs.com/package/paraswap'
  },
  {
    id: 'polyzap',
    name: 'Polyzap',
    ticker: 'PZAP',
    description: 'A yield optimizer and DEX aggregator on Polygon.',
    ucid: 11800,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Polygon'],
    socialMedia: {
      website: 'https://polyzap.finance'
    },
    npm: null
  },
  {
    id: 'probit-token',
    name: 'ProBit Token',
    ticker: 'PROB',
    description: 'The utility token of ProBit exchange offering trading benefits and fee discounts.',
    ucid: 3965,
    type: 'token',
    consensusType: 'token',
    class: ['exchange-token'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xfb559ce67ff522ec0b9Ba7f5dC9dc7EF6c139803' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/ProBit_Exchange',
      website: 'https://www.probit.com'
    },
    npm: null
  },
  {
    id: 'quidax-token',
    name: 'Quidax Token',
    ticker: 'QDX',
    description: 'The native token of Quidax, an African cryptocurrency exchange.',
    ucid: 20011,
    type: 'token',
    consensusType: 'token',
    class: ['exchange-token'],
    blockchains: ['Other'],
    npm: null
  },
  {
    id: 'quickswap',
    name: 'QuickSwap',
    ticker: 'QUICK',
    description: 'A next-generation layer-2 DEX on Polygon with faster and cheaper transactions.',
    ucid: 8206,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'layer-2'],
    blockchains: ['Polygon'],
    contractAddresses: [
      { blockchain: 'Polygon', address: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/QuickswapDEX',
      website: 'https://quickswap.exchange',
      github: 'https://github.com/QuickSwap'
    },
    npm: 'https://www.npmjs.com/package/quickswap-sdk'
  },
  {
    id: 'radar-relay',
    name: 'Radar Relay',
    ticker: 'RADAR',
    description: 'A wallet-to-wallet trading platform built on the 0x protocol.',
    ucid: 20012,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Ethereum'],
    socialMedia: {
      twitter: 'https://twitter.com/radarrelay',
      website: 'https://radarrelay.com'
    },
    npm: null
  },
  {
    id: 'rari',
    name: 'Rari',
    ticker: 'RGT',
    description: 'The governance token of Rari Capital, an autonomous robo-advisor for yield farming.',
    ucid: 7958,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'lending', 'governance'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xD291E7a03283640FDc51b121aC401383A46cC623' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/RariCapital',
      website: 'https://rari.capital',
      github: 'https://github.com/Rari-Capital'
    },
    npm: null
  },
  {
    id: 'raydium',
    name: 'Raydium',
    ticker: 'RAY',
    description: 'An AMM and liquidity provider built on Solana with order book integration.',
    ucid: 8526,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Solana'],
    socialMedia: {
      twitter: 'https://twitter.com/RaydiumProtocol',
      website: 'https://raydium.io',
      github: 'https://github.com/raydium-io'
    },
    npm: 'https://www.npmjs.com/package/@raydium-io/raydium-sdk'
  },
  {
    id: 'rujira',
    name: 'Rujira',
    ticker: 'RUJI',
    description: 'A DEX on the Cosmos ecosystem with cross-chain capabilities.',
    ucid: 20013,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'interoperability'],
    blockchains: ['Cosmos'],
    socialMedia: {
      twitter: 'https://twitter.com/rujira_zone',
      website: 'https://rujira.zone'
    },
    npm: null
  },
  {
    id: 'sakeswap',
    name: 'SakeSwap',
    ticker: 'SAKE',
    description: 'A community-oriented DeFi ecosystem for swaps, lending, and derivatives on Ethereum.',
    ucid: 7500,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'lending'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x066798d9ef0833ccc719076Dab77199eCbd178b0' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/sakeswap',
      website: 'https://sakeswap.finance'
    },
    npm: null
  },
  {
    id: 'smardex',
    name: 'SmarDex',
    ticker: 'SDEX',
    description: 'A next-generation DEX with impermanent loss mitigation through algorithmic pricing.',
    ucid: 22400,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Ethereum', 'BSC', 'Polygon'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x5DE8ab7E27F6E7A1fFf3E5B337584Aa43961BEeF' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/SmarDex',
      website: 'https://smardex.io',
      github: 'https://github.com/SmarDex'
    },
    npm: null
  },
  {
    id: 'smoothy',
    name: 'Smoothy',
    ticker: 'SMTY',
    description: 'A stablecoin and pegged assets swap protocol with single-pool design.',
    ucid: 9870,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['BSC', 'Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xbf776e4FCa664d791C4E3b5e6b254e955240427a' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/smoothyfinance',
      website: 'https://smoothy.finance'
    },
    npm: null
  },
  {
    id: 'spookyswap',
    name: 'SpookySwap',
    ticker: 'BOO',
    description: 'The leading AMM DEX on Fantom Opera with yield farming and NFTs.',
    ucid: 9608,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'nft'],
    blockchains: ['Fantom'],
    contractAddresses: [
      { blockchain: 'Fantom', address: '0x841FAD6EAe12c286d1Fd18d1d525CFfA42C1Ba34' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/SpookySwap',
      website: 'https://spookyswap.finance',
      github: 'https://github.com/SpookySwap'
    },
    npm: null
  },
  {
    id: 'sun',
    name: 'Sun',
    ticker: 'SUN',
    description: 'A DeFi platform on TRON offering stablecoin swaps with low slippage.',
    ucid: 10529,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Tron'],
    contractAddresses: [
      { blockchain: 'Tron', address: 'TSSMHYeV2uE9qYH95DqyoCuNCzEL1NvU3S' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/defi_sunio',
      website: 'https://sun.io'
    },
    npm: null
  },
  {
    id: 'sushiswap',
    name: 'SushiSwap',
    ticker: 'SUSHI',
    description: 'A community-driven multichain DEX with expanded DeFi features and yield farming.',
    ucid: 6758,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'governance'],
    blockchains: ['Ethereum', 'Polygon', 'BSC', 'Arbitrum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2' },
      { blockchain: 'Polygon', address: '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/sushiswap',
      website: 'https://www.sushi.com',
      github: 'https://github.com/sushiswap'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
      docs: 'https://docs.sushi.com'
    },
    npm: 'https://www.npmjs.com/package/@sushiswap/sdk'
  },
  {
    id: 'swerve',
    name: 'Swerve',
    ticker: 'SWRV',
    description: 'A community-owned fork of Curve focused on decentralized stablecoin swaps.',
    ucid: 6953,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'governance'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xB8BAa0e228789E0492d6f9C4b5b5b5b5b5b5b5b5' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/SwerveFinance',
      website: 'https://swerve.fi'
    },
    npm: null
  },
  {
    id: 'synthetix',
    name: 'Synthetix',
    ticker: 'SNX',
    description: 'A derivatives liquidity protocol for creating synthetic assets that track real-world assets.',
    ucid: 2586,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'derivatives', 'governance'],
    blockchains: ['Ethereum', 'Optimism'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/synthetix_io',
      website: 'https://synthetix.io',
      github: 'https://github.com/Synthetixio'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
      docs: 'https://docs.synthetix.io'
    },
    npm: 'https://www.npmjs.com/package/@synthetixio/synth-swaps'
  },
  {
    id: 'thena',
    name: 'THENA',
    ticker: 'THE',
    description: 'A next-generation liquidity layer on BNB Chain with ve(3,3) mechanics.',
    ucid: 23576,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0xF4C8E32EaDEC4BFe97E0F595AdD0f4450a863a11' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/ThenaFi_',
      website: 'https://www.thena.fi',
      github: 'https://github.com/ThenafiBSC'
    },
    npm: null
  },
  {
    id: 'thorchain',
    name: 'THORChain',
    ticker: 'RUNE',
    description: 'A decentralized liquidity network enabling native cross-chain asset swaps.',
    ucid: 4157,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'dex', 'interoperability'],
    blockchains: ['Other'],
    socialMedia: {
      twitter: 'https://twitter.com/THORChain',
      website: 'https://thorchain.org',
      github: 'https://github.com/thorchain'
    },
    apiLinks: {
      explorer: 'https://viewblock.io/thorchain',
      docs: 'https://docs.thorchain.org'
    },
    npm: 'https://www.npmjs.com/package/@thorchain/asgardex-util'
  },
  {
    id: 'thorswap',
    name: 'THORSwap',
    ticker: 'THOR',
    description: 'A multi-chain DEX aggregator powered by THORChain for native cross-chain swaps.',
    ucid: 11848,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'interoperability'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xa5f2211B9b8170F694421f2046281775E8468044' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/THORSwap',
      website: 'https://www.thorswap.finance',
      github: 'https://github.com/thorswap'
    },
    npm: null
  },
  {
    id: 'thorchain-yield',
    name: 'THORChain Yield',
    ticker: 'TCY',
    description: 'A yield-generating token related to THORChain ecosystem.',
    ucid: 20014,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'staking'],
    blockchains: ['Ethereum'],
    socialMedia: {
      website: 'https://thorchain.org'
    },
    npm: null
  },
  {
    id: 'time',
    name: 'Time',
    ticker: 'TIME',
    description: 'The reserve currency token of Wonderland, a decentralized reserve currency protocol on Avalanche.',
    ucid: 12029,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'staking'],
    blockchains: ['Avalanche'],
    contractAddresses: [
      { blockchain: 'Avalanche', address: '0xb54f16fB19478766A268F172C9480f8da1a7c9C3' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/wonderland_fi',
      website: 'https://www.wonderland.money'
    },
    npm: null
  },
  {
    id: 'tokenlon',
    name: 'Tokenlon',
    ticker: 'LON',
    description: 'A decentralized exchange aggregator built by imToken providing instant token swaps with best prices.',
    ucid: 5567,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x0000000000095413afC295d19EDeb1Ad7B71c952' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/tokenlon',
      website: 'https://tokenlon.im',
      github: 'https://github.com/consenlabs'
    },
    npm: null
  },
  {
    id: 'totle',
    name: 'Totle',
    ticker: 'TOTLE',
    description: 'A DEX aggregator with limited public information.',
    ucid: 20015,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Ethereum'],
    npm: null
  },
  {
    id: 'trader-joe',
    name: 'Trader Joe',
    ticker: 'JOE',
    description: 'The native token of Trader Joe, a one-stop DeFi platform on Avalanche.',
    ucid: 11396,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'governance'],
    blockchains: ['Avalanche'],
    contractAddresses: [
      { blockchain: 'Avalanche', address: '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/traderjoe_xyz',
      website: 'https://traderjoexyz.com',
      github: 'https://github.com/traderjoe-xyz'
    },
    npm: null
  },
  {
    id: 'unifi',
    name: 'Unifi',
    ticker: 'UNIFI',
    description: 'A multi-chain DeFi protocol providing bridging and swapping across blockchains.',
    ucid: 7730,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'interoperability'],
    blockchains: ['BSC', 'Ethereum', 'Ontology'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0x728C5baC3C3e370E372Fc4671f9ef6916b814d8B' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/unifiprotocol',
      website: 'https://unifiprotocol.com',
      github: 'https://github.com/unifiprotocol'
    },
    npm: null
  },
  {
    id: 'uniswap',
    name: 'Uniswap',
    ticker: 'UNI',
    description: 'The most popular decentralized trading protocol with automated liquidity provision on Ethereum.',
    ucid: 7083,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'governance'],
    blockchains: ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/Uniswap',
      website: 'https://uniswap.org',
      github: 'https://github.com/Uniswap'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      api: 'https://api.thegraph.com/subgraphs/name/uniswap',
      docs: 'https://docs.uniswap.org'
    },
    npm: 'https://www.npmjs.com/package/@uniswap/sdk'
  },
  {
    id: 'unus-sed-leo',
    name: 'UNUS SED LEO',
    ticker: 'LEO',
    description: 'The utility token of Bitfinex and iFinex providing trading benefits and platform utility.',
    ucid: 3957,
    type: 'token',
    consensusType: 'token',
    class: ['exchange-token'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x2AF5D2aD76741191D15Dfe7bF6aC92d4Bd912Ca3' }
    ],
    npm: null
  },
  {
    id: 'uswap',
    name: 'USwap',
    ticker: 'USWAP',
    description: 'A decentralized exchange on the Tron network.',
    ucid: 20016,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    blockchains: ['Tron'],
    socialMedia: {
      website: 'https://uswap.io'
    },
    npm: null
  },
  {
    id: 'velodrome-finance',
    name: 'Velodrome Finance',
    ticker: 'VELO',
    description: 'A next-generation AMM on Optimism inspired by Solidly with ve(3,3) mechanics.',
    ucid: 19721,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'layer-2'],
    blockchains: ['Optimism'],
    contractAddresses: [
      { blockchain: 'Optimism', address: '0x3c8B650257cFb5f272f799F5e2b4e65093a11a05' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/velodromefi',
      website: 'https://velodrome.finance'
    }
  },
  {
    id: 'voyager',
    name: 'Voyager',
    ticker: 'VGX',
    description: 'The utility token of Voyager, a defunct crypto trading platform (ceased operations in 2023).',
    ucid: 4543,
    type: 'token',
    consensusType: 'token',
    class: ['exchange-token'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x5Af2Be193a6ABCa9c8817001F45744777Db30756' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/investvoyager',
      website: 'https://www.investvoyager.com'
    },
    npm: null
  },
  {
    id: 'vvs-finance',
    name: 'VVS Finance',
    ticker: 'VVS',
    description: 'An automated market-maker (AMM) DEX on Cronos Chain with yield farming and staking.',
    ucid: 11859,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'yield-farming'],
    blockchains: ['Cronos'],
    contractAddresses: [
      { blockchain: 'Cronos', address: '0x2D03bCE6747ADC00E1a131BBA1469C15fD11e03' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/VVS_finance',
      website: 'https://vvs.finance',
      github: 'https://github.com/vvs-finance'
    },
    npm: null
  },
  {
    id: 'wazirx',
    name: 'WazirX',
    ticker: 'WRX',
    description: 'The utility token of WazirX, an Indian cryptocurrency exchange.',
    ucid: 5161,
    type: 'token',
    consensusType: 'token',
    class: ['exchange-token'],
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0x8e17ed70334C87eCE574C9d537BC153d8609E2a8' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/WazirXIndia',
      website: 'https://wazirx.com'
    },
    npm: null
  },
  {
    id: 'whitebit-coin',
    name: 'WhiteBIT Coin',
    ticker: 'WBT',
    description: 'The native token of WhiteBIT exchange providing trading benefits.',
    ucid: 11294,
    type: 'token',
    consensusType: 'token',
    class: ['exchange-token'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x29CbD6850BcF8A3104d0b5B5b5b5b5b5b5b5b5b5' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/whitebit',
      website: 'https://whitebit.com'
    },
    npm: null
  },
  {
    id: 'woo-network',
    name: 'WOO Network',
    ticker: 'WOO',
    description: 'A deep liquidity network connecting traders, exchanges, and DeFi platforms.',
    ucid: 7501,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'infrastructure'],
    blockchains: ['Ethereum', 'BSC', 'Polygon', 'Arbitrum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x4691937a7508860F876c9c0a2a617E7d9E945D4B' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/woonetwork',
      website: 'https://woo.network',
      github: 'https://github.com/woo-finance'
    },
    npm: null
  }
];

export default EXCHANGE_CURRENCIES;
