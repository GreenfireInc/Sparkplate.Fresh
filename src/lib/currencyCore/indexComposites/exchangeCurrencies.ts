/**
 * Exchange Currencies Index - DEX and Exchange Tokens
 * 
 * This list contains tokens and currencies associated with decentralized exchanges (DEXs),
 * centralized exchanges, and trading platforms. Each entry includes:
 * - Currency information (name, ticker, UCID)
 * - Type classification (Full coin with blockchain vs Asset/Token)
 * - Contract addresses per blockchain
 * - Social media links
 * - API links
 * 
 * This index is used for exchange integrations, DEX aggregations, and trading features.
 */

export type CurrencyType = 'Full Coin' | 'Token';
export type Blockchain = 'Ethereum' | 'BSC' | 'Polygon' | 'Tron' | 'Avalanche' | 'OKExChain' | 'HECO' | 'Ontology' | 'Solana' | 'Arbitrum' | 'Optimism' | 'Base' | 'Cronos' | 'Fantom' | 'Other';

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
  ucid?: string;
  type: CurrencyType;
  blockchains: Blockchain[];
  contractAddresses?: ContractAddress[];
  socialMedia?: SocialMedia;
  apiLinks?: {
    explorer?: string;
    api?: string;
    docs?: string;
  };
}

export const EXCHANGE_CURRENCIES: ExchangeCurrencyItem[] = [
  {
    id: '0x',
    name: '0x Protocol',
    ticker: 'ZRX',
    ucid: 'ZRX://1896',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xE41d2489571d322189246DaFA5ebDe1F4699F498' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/0xProject',
      discord: 'https://discord.gg/0x',
      github: 'https://github.com/0xProject',
      website: 'https://0x.org'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0xE41d2489571d322189246DaFA5ebDe1F4699F498',
      api: 'https://0x.org/api',
      docs: 'https://0x.org/docs'
    }
  },
  {
    id: '1inch',
    name: '1inch',
    ticker: '1INCH',
    ucid: '1INCH://8104',
    type: 'Token',
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
    }
  },
  {
    id: 'aave',
    name: 'Aave',
    ticker: 'AAVE',
    ucid: 'AAVE://7278',
    type: 'Token',
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
    }
  },
  {
    id: 'acryptos',
    name: 'Acryptos',
    ticker: 'ACS',
    ucid: 'ACS://7844',
    type: 'Token',
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0x4197C6EF387563a02cA1D3b3b4C5b5b5b5b5b5b5' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/acryptos',
      website: 'https://acryptos.com'
    }
  },
  {
    id: 'aerodrome',
    name: 'Aerodrome',
    ticker: 'AERO',
    ucid: 'AERO://29270',
    type: 'Token',
    blockchains: ['Base'],
    contractAddresses: [
      { blockchain: 'Base', address: '0x940181a94A35A4569E4529A3CDfB74e38FD98631' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/aerodromefi',
      website: 'https://aerodrome.finance'
    }
  },
  {
    id: 'aevo',
    name: 'Aevo',
    ticker: 'AEVO',
    ucid: 'AEVO://29676',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xB528edBfE7137e545C4CD06E2C8C1C3F0B5C2C5C' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/aevoxyz',
      website: 'https://www.aevo.xyz'
    }
  },
  {
    id: 'aiswap',
    name: 'AiSwap',
    ticker: 'OKEX',
    type: 'Token',
    blockchains: ['OKExChain'],
    socialMedia: {
      website: 'https://aiswap.io'
    }
  },
  {
    id: 'airswap',
    name: 'AirSwap',
    ticker: 'AST',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x27054b13b1B798B345b591a4d22e6562d47eA75a' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/airswap',
      website: 'https://www.airswap.io'
    }
  },
  {
    id: 'apeswap',
    name: 'ApeSwap',
    ticker: 'BANANA',
    type: 'Token',
    blockchains: ['BSC', 'Polygon', 'Ethereum'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0x603c7f932ED1fc6575303D8Fb018fDCBb0f39a95' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/ape_swap',
      website: 'https://apeswap.finance'
    }
  },
  {
    id: 'asd',
    name: 'ASD',
    ticker: 'ASD',
    type: 'Token',
    blockchains: ['Other']
  },
  {
    id: 'asia-coin',
    name: 'Asia Coin',
    ticker: 'ASIA',
    type: 'Token',
    blockchains: ['Other']
  },
  {
    id: 'aster',
    name: 'Aster',
    ticker: 'ASTER',
    type: 'Token',
    blockchains: ['Other']
  },
  {
    id: 'babyswap',
    name: 'BabySwap',
    ticker: 'BABY',
    type: 'Token',
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0x53E562b9B7E5E94b81f10e96Ee70Ad06df3D2657' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/babyswap_bsc',
      website: 'https://babyswap.finance'
    }
  },
  {
    id: 'baguette',
    name: 'Baguette',
    ticker: 'BAG',
    type: 'Token',
    blockchains: ['Avalanche'],
    socialMedia: {
      website: 'https://baguette.exchange'
    }
  },
  {
    id: 'bakeryswap',
    name: 'BakerySwap',
    ticker: 'BAKE',
    type: 'Token',
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/bakery_swap',
      website: 'https://www.bakeryswap.org'
    }
  },
  {
    id: 'bakerytoken',
    name: 'BakeryToken',
    ticker: 'BAKE',
    type: 'Token',
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0xE02dF9e3e622DeBdD69fb838bB799E3F168902c5' }
    ]
  },
  {
    id: 'balancer',
    name: 'Balancer',
    ticker: 'BAL',
    type: 'Token',
    blockchains: ['Ethereum', 'Polygon', 'Arbitrum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xba100000625a3754423978a60c9317c58a424e3D' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/Balancer',
      website: 'https://balancer.fi'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0xba100000625a3754423978a60c9317c58a424e3D',
      docs: 'https://docs.balancer.fi'
    }
  },
  {
    id: 'bancor',
    name: 'Bancor',
    ticker: 'BNT',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x1F573D6Fb3F13d689FF844B4cE37794d79a7FF1C' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/Bancor',
      website: 'https://bancor.network'
    }
  },
  {
    id: 'binance-coin',
    name: 'Binance Coin',
    ticker: 'BNB',
    type: 'Full Coin',
    blockchains: ['BSC'],
    socialMedia: {
      twitter: 'https://twitter.com/binance',
      website: 'https://www.binance.com'
    },
    apiLinks: {
      explorer: 'https://bscscan.com',
      api: 'https://api.binance.com',
      docs: 'https://binance-docs.github.io'
    }
  },
  {
    id: 'biswap',
    name: 'Biswap',
    ticker: 'BSW',
    type: 'Token',
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0x965F527D9159dCe6288a2219DB51fc6Eef120dD1' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/Biswap_DEX',
      website: 'https://biswap.org'
    }
  },
  {
    id: 'bitget-token',
    name: 'Bitget Token',
    ticker: 'BGB',
    type: 'Token',
    blockchains: ['Ethereum', 'BSC'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x19de6b897Ed14A376Dda0Fe53a5420D2aE228F86' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/bitgetglobal',
      website: 'https://www.bitget.com'
    }
  },
  {
    id: 'bitmart-token',
    name: 'BitMart Token',
    ticker: 'BMX',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x986EE2B944c42D017F53AfC4191a938e8ACf3b5C' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/BitMartExchange',
      website: 'https://www.bitmart.com'
    }
  },
  {
    id: 'bitpanda',
    name: 'Bitpanda',
    ticker: 'BEST',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x1B073382E63411E3BcfFE90aC1B9A43feFa1Ec6F' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/bitpanda',
      website: 'https://www.bitpanda.com'
    }
  },
  {
    id: 'bitshares',
    name: 'BitShares',
    ticker: 'BTS',
    type: 'Full Coin',
    blockchains: ['Other'],
    socialMedia: {
      twitter: 'https://twitter.com/bitshares',
      website: 'https://bitshares.org'
    }
  },
  {
    id: 'bitrue-coin',
    name: 'Bitrue Coin',
    ticker: 'BTR',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xd433138d12beB9929FF5fd31DF85AD691a9451F6' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/BitrueOfficial',
      website: 'https://www.bitrue.com'
    }
  },
  {
    id: 'bluefin',
    name: 'Bluefin',
    ticker: 'BLUE',
    type: 'Token',
    blockchains: ['Sui'],
    socialMedia: {
      twitter: 'https://twitter.com/bluefinapp',
      website: 'https://bluefin.io'
    }
  },
  {
    id: 'bone-shibaswap',
    name: 'Bone ShibaSwap',
    ticker: 'BONE',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x9813037ee2218799597d83D4a5B6F3b6778218d9' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/Shibtoken',
      website: 'https://shibaswap.com'
    }
  },
  {
    id: 'brastoken',
    name: 'Brastoken',
    ticker: 'BRT',
    type: 'Token',
    blockchains: ['Other']
  },
  {
    id: 'bxh',
    name: 'BXH',
    ticker: 'BXH',
    type: 'Token',
    blockchains: ['OKExChain']
  },
  {
    id: 'cafeswap',
    name: 'CafeSwap',
    ticker: 'BREW',
    type: 'Token',
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0x790Be81C3cA0e53974bE2688cB656954C0e3b3E0' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/cafeswap',
      website: 'https://cafeswap.finance'
    }
  },
  {
    id: 'cetus',
    name: 'Cetus',
    ticker: 'CETUS',
    type: 'Token',
    blockchains: ['Sui', 'Aptos'],
    socialMedia: {
      twitter: 'https://twitter.com/CetusProtocol',
      website: 'https://www.cetus.zone'
    }
  },
  {
    id: 'chai',
    name: 'Chai',
    ticker: 'CHAI',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x06AF07097C9Eeb7fD685c692751D5C66dB49c8FA' }
    ]
  },
  {
    id: 'cherryswap',
    name: 'CherrySwap',
    ticker: 'CHE',
    type: 'Token',
    blockchains: ['OKExChain'],
    socialMedia: {
      website: 'https://cherryswap.net'
    }
  },
  {
    id: 'coinex-token',
    name: 'CoinEx Token',
    ticker: 'CET',
    type: 'Token',
    blockchains: ['Other'],
    socialMedia: {
      twitter: 'https://twitter.com/coinexcom',
      website: 'https://www.coinex.com'
    }
  },
  {
    id: 'coinzix',
    name: 'Coinzix',
    ticker: 'ZIX',
    type: 'Token',
    blockchains: ['Other']
  },
  {
    id: 'cometh',
    name: 'Cometh',
    ticker: 'MUST',
    type: 'Token',
    blockchains: ['Polygon'],
    contractAddresses: [
      { blockchain: 'Polygon', address: '0x9C78EE466D6Cb57A4d01Fd887D2b5dFb2D46288f' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/cometh',
      website: 'https://www.cometh.io'
    }
  },
  {
    id: 'compound',
    name: 'Compound',
    ticker: 'COMP',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xc00e94Cb662C3520282E6f5717214004A7f26888' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/compoundfinance',
      website: 'https://compound.finance'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0xc00e94Cb662C3520282E6f5717214004A7f26888',
      docs: 'https://docs.compound.finance'
    }
  },
  {
    id: 'cronos',
    name: 'Cronos',
    ticker: 'CRO',
    type: 'Full Coin',
    blockchains: ['Cronos'],
    socialMedia: {
      twitter: 'https://twitter.com/cronos_chain',
      website: 'https://cronos.org'
    },
    apiLinks: {
      explorer: 'https://cronoscan.com',
      docs: 'https://docs.cronos.org'
    }
  },
  {
    id: 'cryption-network-token',
    name: 'Cryption Network Token',
    ticker: 'CNT',
    type: 'Token',
    blockchains: ['Polygon'],
    contractAddresses: [
      { blockchain: 'Polygon', address: '0x8c8bdBe9CeE455732525086264a4Bf9Cf821C498' }
    ],
    socialMedia: {
      website: 'https://cryption.network'
    }
  },
  {
    id: 'curve',
    name: 'Curve',
    ticker: 'CRV',
    type: 'Token',
    blockchains: ['Ethereum', 'Polygon', 'Arbitrum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xD533a949740bb3306d119CC777fa900bA034cd52' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/CurveFinance',
      website: 'https://curve.fi'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0xD533a949740bb3306d119CC777fa900bA034cd52',
      docs: 'https://docs.curve.fi'
    }
  },
  {
    id: 'dex-ag',
    name: 'Dex.ag',
    ticker: 'DEX',
    type: 'Token',
    blockchains: ['Ethereum']
  },
  {
    id: 'dexguru',
    name: 'DexGuru',
    ticker: 'GURU',
    type: 'Token',
    blockchains: ['Ethereum'],
    socialMedia: {
      twitter: 'https://twitter.com/dexguru',
      website: 'https://dex.guru'
    }
  },
  {
    id: 'dfyn',
    name: 'Dfyn',
    ticker: 'DFYN',
    type: 'Token',
    blockchains: ['Polygon'],
    contractAddresses: [
      { blockchain: 'Polygon', address: '0xC168E40227E4ebD8C1caE80F7a0a4B86E8b7f2e5' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/dfynnetwork',
      website: 'https://www.dfyn.network'
    }
  },
  {
    id: 'dodo',
    name: 'DODO',
    ticker: 'DODO',
    type: 'Token',
    blockchains: ['Ethereum', 'BSC', 'Polygon', 'Arbitrum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x43Dfc4159D86F3A37A5A4B3D4580b888ad7d4DDd' },
      { blockchain: 'BSC', address: '0x67ee3Cb086F8a16f34beE3ca72FAD36F7Db929e2' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/BreederDodo',
      website: 'https://dodoex.io'
    }
  },
  {
    id: 'drift-protocol',
    name: 'Drift Protocol',
    ticker: 'DRIFT',
    type: 'Token',
    blockchains: ['Solana'],
    socialMedia: {
      twitter: 'https://twitter.com/DriftProtocol',
      website: 'https://www.drift.trade'
    }
  },
  {
    id: 'dydx',
    name: 'dYdX',
    ticker: 'DYDX',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x92D6C1e31e14520e676a687F0a93788B716BEff5' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/dYdX',
      website: 'https://dydx.exchange'
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
    type: 'Token',
    blockchains: ['Other']
  },
  {
    id: 'elect',
    name: 'ELECT',
    ticker: 'ELECT',
    type: 'Token',
    blockchains: ['Other']
  },
  {
    id: 'electromcoin',
    name: 'ElectromCoin',
    ticker: 'ETM',
    type: 'Token',
    blockchains: ['Other']
  },
  {
    id: 'ellipsis',
    name: 'Ellipsis',
    ticker: 'EPS',
    type: 'Token',
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0xA7f552078dcC247C2684336020c03648500C6d9F' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/ellipsisfinance',
      website: 'https://ellipsis.finance'
    }
  },
  {
    id: 'ftx-token',
    name: 'FTX Token',
    ticker: 'FTT',
    type: 'Token',
    blockchains: ['Ethereum', 'Solana'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x50D1c9771902476076eCFc8B2A83Ad6b9355a4c9' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/FTX_Official',
      website: 'https://ftx.com'
    }
  },
  {
    id: 'fulcrum',
    name: 'Fulcrum',
    ticker: 'BZX',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x56d811088235F11C8920698a204A9010e7889E3b' }
    ]
  },
  {
    id: 'gatetoken',
    name: 'GateToken',
    ticker: 'GT',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xE66747a101bFF2dED369f22016F5bF5e5e0C0C0' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/gate_io',
      website: 'https://www.gate.io'
    }
  },
  {
    id: 'gemini-dollar',
    name: 'Gemini Dollar',
    ticker: 'GUSD',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x056Fd409E1d7A124BD7017459dFEa2F394b44211' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/gemini',
      website: 'https://www.gemini.com'
    }
  },
  {
    id: 'gmx',
    name: 'GMX',
    ticker: 'GMX',
    type: 'Token',
    blockchains: ['Arbitrum', 'Avalanche'],
    contractAddresses: [
      { blockchain: 'Arbitrum', address: '0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/GMX_IO',
      website: 'https://gmx.io'
    },
    apiLinks: {
      explorer: 'https://arbiscan.io/token/0xfc5A1A6EB076a2C7aD06eD22C90d7E710E35ad0a',
      docs: 'https://docs.gmx.io'
    }
  },
  {
    id: 'htx',
    name: 'HTX',
    ticker: 'HTX',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x6f259637dcD74C767781E37Bc6133cd6A68aa161' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/HTX_Global',
      website: 'https://www.htx.com'
    }
  },
  {
    id: 'huobi-token',
    name: 'Huobi Token',
    ticker: 'HT',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x6f259637dcD74C767781E37Bc6133cd6A68aa161' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/HTX_Global',
      website: 'https://www.htx.com'
    }
  },
  {
    id: 'hyperliquid',
    name: 'Hyperliquid',
    ticker: 'HYPE',
    type: 'Token',
    blockchains: ['Arbitrum'],
    socialMedia: {
      twitter: 'https://twitter.com/hyperliquiddex',
      website: 'https://hyperliquid.xyz'
    }
  },
  {
    id: 'idex',
    name: 'IDEX',
    ticker: 'IDEX',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xB705268213D593B8FD88d3FDEFF93AFF5CbDcfAE' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/idexio',
      website: 'https://idex.io'
    }
  },
  {
    id: 'impossible',
    name: 'Impossible',
    ticker: 'IMPOSSIBLE',
    type: 'Token',
    blockchains: ['BSC'],
    socialMedia: {
      website: 'https://impossible.finance'
    }
  },
  {
    id: 'innoswap',
    name: 'InnoSwap',
    ticker: 'INNO',
    type: 'Token',
    blockchains: ['Ontology'],
    socialMedia: {
      website: 'https://innoswap.com'
    }
  },
  {
    id: 'joe',
    name: 'JOE',
    ticker: 'JOE',
    type: 'Token',
    blockchains: ['Avalanche'],
    contractAddresses: [
      { blockchain: 'Avalanche', address: '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/traderjoe_xyz',
      website: 'https://traderjoexyz.com'
    }
  },
  {
    id: 'julswap',
    name: 'JulSwap',
    ticker: 'JULD',
    type: 'Token',
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0x5A41F637C3f7553dBa6dDC2D3cC0e0C8Db119572' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/JulSwap',
      website: 'https://julswap.com'
    }
  },
  {
    id: 'jupiter',
    name: 'Jupiter',
    ticker: 'JUP',
    type: 'Token',
    blockchains: ['Solana'],
    socialMedia: {
      twitter: 'https://twitter.com/JupiterExchange',
      website: 'https://jup.ag'
    },
    apiLinks: {
      api: 'https://api.jup.ag',
      docs: 'https://docs.jup.ag'
    }
  },
  {
    id: 'justswap',
    name: 'JustSwap',
    ticker: 'JST',
    type: 'Token',
    blockchains: ['Tron'],
    socialMedia: {
      website: 'https://justswap.org'
    }
  },
  {
    id: 'kswap',
    name: 'KSwap',
    ticker: 'KSWAP',
    type: 'Token',
    blockchains: ['OKExChain'],
    socialMedia: {
      website: 'https://kswap.finance'
    }
  },
  {
    id: 'kucoin-token',
    name: 'KuCoin Token',
    ticker: 'KCS',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xf34960d9d60be18cC1D5Afc1A6F012A723a28811' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/kucoincom',
      website: 'https://www.kucoin.com'
    }
  },
  {
    id: 'kub-coin',
    name: 'KUB Coin',
    ticker: 'KUB',
    type: 'Token',
    blockchains: ['Other']
  },
  {
    id: 'kyber-network',
    name: 'Kyber Network',
    ticker: 'KNC',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xdeFA4e8a7bcBA345F687a2f1456F5Edd9CE97202' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/KyberNetwork',
      website: 'https://kyber.network'
    }
  },
  {
    id: 'leo',
    name: 'LEO',
    ticker: 'LEO',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x2AF5D2aD76741191D15Dfe7bF6aC92d4Bd912Ca3' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/bitfinex',
      website: 'https://www.bitfinex.com'
    }
  },
  {
    id: 'liechtenstein-cryptoassets-exchange',
    name: 'Liechtenstein Cryptoassets Exchange',
    ticker: 'LCX',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x037A54aB0621C6EBD24e8c1635d70902354A07D8' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/LCX',
      website: 'https://www.lcx.com'
    }
  },
  {
    id: 'loopring',
    name: 'Loopring',
    ticker: 'LRC',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xBBbbCA6A901c926F240b89EacB641d8Aec7AEafD' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/loopringorg',
      website: 'https://loopring.org'
    }
  },
  {
    id: 'luaswap',
    name: 'LuaSwap',
    ticker: 'LUA',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xB1f66997A5760428D3a87D68b90BfE0aE64121cC' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/luaswap',
      website: 'https://luaswap.org'
    }
  },
  {
    id: 'lydia',
    name: 'Lydia',
    ticker: 'LYD',
    type: 'Token',
    blockchains: ['Avalanche'],
    socialMedia: {
      twitter: 'https://twitter.com/lydiafinance',
      website: 'https://www.lydia.finance'
    }
  },
  {
    id: 'makiswap',
    name: 'MakiSwap',
    ticker: 'MAKI',
    type: 'Token',
    blockchains: ['HECO'],
    socialMedia: {
      website: 'https://makisfinance.com'
    }
  },
  {
    id: 'matcha',
    name: 'Matcha',
    ticker: 'MATCHA',
    type: 'Token',
    blockchains: ['Ethereum'],
    socialMedia: {
      twitter: 'https://twitter.com/matchaxyz',
      website: 'https://matcha.xyz'
    }
  },
  {
    id: 'maverick-protocol',
    name: 'Maverick Protocol',
    ticker: 'MAV',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x7448c7456a97769F6cD04F1E83A4A23cCdC46aBD' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/MavProtocol',
      website: 'https://www.mav.xyz'
    }
  },
  {
    id: 'mdex',
    name: 'Mdex',
    ticker: 'MDX',
    type: 'Token',
    blockchains: ['BSC', 'HECO'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0x9C65AB58d8d978DB963e40f404A0b32Fc8820dE6' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/Mdextech',
      website: 'https://mdex.com'
    }
  },
  {
    id: 'minswap',
    name: 'Minswap',
    ticker: 'MIN',
    type: 'Token',
    blockchains: ['Cardano'],
    socialMedia: {
      twitter: 'https://twitter.com/minswapdex',
      website: 'https://minswap.org'
    }
  },
  {
    id: 'mooniswap',
    name: 'Mooniswap',
    ticker: 'MOON',
    type: 'Token',
    blockchains: ['Ethereum'],
    socialMedia: {
      website: 'https://mooniswap.exchange'
    }
  },
  {
    id: 'mstable',
    name: 'mStable',
    ticker: 'MTA',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xa3BeD4E1c75D00fa6f4E5E6922DB7261B5E9AcD2' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/mstable_',
      website: 'https://mstable.org'
    }
  },
  {
    id: 'mx-token',
    name: 'MX Token',
    ticker: 'MX',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x11eeF04c884E24d9B7B4780add6d1bC5b0F8b4C0' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/MEXC_Official',
      website: 'https://www.mexc.com'
    }
  },
  {
    id: 'nerve',
    name: 'Nerve',
    ticker: 'NRV',
    type: 'Token',
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0x42F6f551ae042cBe50C739158b4f0CAC0Edb9096' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/nervefinance',
      website: 'https://nerve.fi'
    }
  },
  {
    id: 'oasis',
    name: 'Oasis',
    ticker: 'ROSE',
    type: 'Full Coin',
    blockchains: ['Other'],
    socialMedia: {
      twitter: 'https://twitter.com/oasisprotocol',
      website: 'https://oasisprotocol.org'
    }
  },
  {
    id: 'okb',
    name: 'OKB',
    ticker: 'OKB',
    type: 'Token',
    blockchains: ['Ethereum', 'OKExChain'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x75231F58b43240C9718Dd58B4967c5114342a86c' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/okx',
      website: 'https://www.okx.com'
    }
  },
  {
    id: 'openocean',
    name: 'OpenOcean',
    ticker: 'OOE',
    type: 'Token',
    blockchains: ['Ethereum', 'BSC', 'Polygon'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x9029FdFAe9A03135846381c7eF1651827ED1454D' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/OpenOceanGlobal',
      website: 'https://openocean.finance'
    }
  },
  {
    id: 'orca',
    name: 'Orca',
    ticker: 'ORCA',
    type: 'Token',
    blockchains: ['Solana'],
    socialMedia: {
      twitter: 'https://twitter.com/orca_so',
      website: 'https://www.orca.so'
    }
  },
  {
    id: 'osmosis',
    name: 'Osmosis',
    ticker: 'OSMO',
    type: 'Full Coin',
    blockchains: ['Cosmos'],
    socialMedia: {
      twitter: 'https://twitter.com/osmosiszone',
      website: 'https://osmosis.zone'
    },
    apiLinks: {
      explorer: 'https://www.mintscan.io/osmosis',
      docs: 'https://docs.osmosis.zone'
    }
  },
  {
    id: 'pancakeswap',
    name: 'PancakeSwap',
    ticker: 'CAKE',
    type: 'Token',
    blockchains: ['BSC', 'Ethereum'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/pancakeswap',
      website: 'https://pancakeswap.finance'
    },
    apiLinks: {
      explorer: 'https://bscscan.com/token/0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82',
      docs: 'https://docs.pancakeswap.finance'
    }
  },
  {
    id: 'pangolin',
    name: 'Pangolin',
    ticker: 'PNG',
    type: 'Token',
    blockchains: ['Avalanche'],
    contractAddresses: [
      { blockchain: 'Avalanche', address: '0x60781C2586D68229fde47564546784ab3fACA982' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/pangolindex',
      website: 'https://pangolin.exchange'
    }
  },
  {
    id: 'paraswap',
    name: 'ParaSwap',
    ticker: 'PSP',
    type: 'Token',
    blockchains: ['Ethereum', 'Polygon', 'BSC'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xcAfE001067cDEF266AfB7Eb5A286dCFD277f3dE5' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/paraswap',
      website: 'https://paraswap.io'
    },
    apiLinks: {
      api: 'https://api.paraswap.io',
      docs: 'https://developers.paraswap.network'
    }
  },
  {
    id: 'polyzap',
    name: 'Polyzap',
    ticker: 'PZAP',
    type: 'Token',
    blockchains: ['Polygon'],
    socialMedia: {
      website: 'https://polyzap.finance'
    }
  },
  {
    id: 'probit-token',
    name: 'ProBit Token',
    ticker: 'PROB',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xfb559ce67ff522ec0b9Ba7f5dC9dc7EF6c139803' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/ProBit_Exchange',
      website: 'https://www.probit.com'
    }
  },
  {
    id: 'quidax-token',
    name: 'Quidax Token',
    ticker: 'QDX',
    type: 'Token',
    blockchains: ['Other']
  },
  {
    id: 'quickswap',
    name: 'QuickSwap',
    ticker: 'QUICK',
    type: 'Token',
    blockchains: ['Polygon'],
    contractAddresses: [
      { blockchain: 'Polygon', address: '0x831753DD7087CaC61aB5644b308642cc1c33Dc13' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/QuickswapDEX',
      website: 'https://quickswap.exchange'
    }
  },
  {
    id: 'radar-relay',
    name: 'Radar Relay',
    ticker: 'RADAR',
    type: 'Token',
    blockchains: ['Ethereum'],
    socialMedia: {
      twitter: 'https://twitter.com/radarrelay',
      website: 'https://radarrelay.com'
    }
  },
  {
    id: 'rari',
    name: 'Rari',
    ticker: 'RGT',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xD291E7a03283640FDc51b121aC401383A46cC623' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/RariCapital',
      website: 'https://rari.capital'
    }
  },
  {
    id: 'raydium',
    name: 'Raydium',
    ticker: 'RAY',
    type: 'Token',
    blockchains: ['Solana'],
    socialMedia: {
      twitter: 'https://twitter.com/RaydiumProtocol',
      website: 'https://raydium.io'
    }
  },
  {
    id: 'rujira',
    name: 'Rujira',
    ticker: 'RUJI',
    type: 'Token',
    blockchains: ['Cosmos'],
    socialMedia: {
      twitter: 'https://twitter.com/rujira_zone',
      website: 'https://rujira.zone'
    }
  },
  {
    id: 'sakeswap',
    name: 'SakeSwap',
    ticker: 'SAKE',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x066798d9ef0833ccc719076Dab77199eCbd178b0' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/sakeswap',
      website: 'https://sakeswap.finance'
    }
  },
  {
    id: 'smardex',
    name: 'SmarDex',
    ticker: 'SDEX',
    type: 'Token',
    blockchains: ['Ethereum', 'BSC', 'Polygon'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x5DE8ab7E27F6E7A1fFf3E5B337584Aa43961BEeF' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/SmarDex',
      website: 'https://smardex.io'
    }
  },
  {
    id: 'smoothy',
    name: 'Smoothy',
    ticker: 'SMTY',
    type: 'Token',
    blockchains: ['BSC', 'Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xbf776e4FCa664d791C4E3b5e6b254e955240427a' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/smoothyfinance',
      website: 'https://smoothy.finance'
    }
  },
  {
    id: 'spookyswap',
    name: 'SpookySwap',
    ticker: 'BOO',
    type: 'Token',
    blockchains: ['Fantom'],
    contractAddresses: [
      { blockchain: 'Fantom', address: '0x841FAD6EAe12c286d1Fd18d1d525CFfA42C1Ba34' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/SpookySwap',
      website: 'https://spookyswap.finance'
    }
  },
  {
    id: 'sun',
    name: 'Sun',
    ticker: 'SUN',
    type: 'Token',
    blockchains: ['Tron'],
    contractAddresses: [
      { blockchain: 'Tron', address: 'TSSMHYeV2uE9qYH95DqyoCuNCzEL1NvU3S' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/defi_sunio',
      website: 'https://sun.io'
    }
  },
  {
    id: 'sushiswap',
    name: 'SushiSwap',
    ticker: 'SUSHI',
    type: 'Token',
    blockchains: ['Ethereum', 'Polygon', 'BSC', 'Arbitrum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x6B3595068778DD592e39A122f4f5a5cF09C90fE2' },
      { blockchain: 'Polygon', address: '0x0b3F868E0BE5597D5DB7fEB59E1CADBb0fdDa50a' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/sushiswap',
      website: 'https://www.sushi.com'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0x6B3595068778DD592e39A122f4f5a5cF09C90fE2',
      docs: 'https://docs.sushi.com'
    }
  },
  {
    id: 'swerve',
    name: 'Swerve',
    ticker: 'SWRV',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xB8BAa0e228789E0492d6f9C4b5b5b5b5b5b5b5b5' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/SwerveFinance',
      website: 'https://swerve.fi'
    }
  },
  {
    id: 'synthetix',
    name: 'Synthetix',
    ticker: 'SNX',
    type: 'Token',
    blockchains: ['Ethereum', 'Optimism'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/synthetix_io',
      website: 'https://synthetix.io'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0xC011a73ee8576Fb46F5E1c5751cA3B9Fe0af2a6F',
      docs: 'https://docs.synthetix.io'
    }
  },
  {
    id: 'thena',
    name: 'THENA',
    ticker: 'THE',
    type: 'Token',
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0xF4C8E32EaDEC4BFe97E0F595AdD0f4450a863a11' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/ThenaFi_',
      website: 'https://www.thena.fi'
    }
  },
  {
    id: 'thorchain',
    name: 'THORChain',
    ticker: 'RUNE',
    type: 'Full Coin',
    blockchains: ['Other'],
    socialMedia: {
      twitter: 'https://twitter.com/THORChain',
      website: 'https://thorchain.org'
    },
    apiLinks: {
      explorer: 'https://viewblock.io/thorchain',
      docs: 'https://docs.thorchain.org'
    }
  },
  {
    id: 'thorswap',
    name: 'THORSwap',
    ticker: 'THOR',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xa5f2211B9b8170F694421f2046281775E8468044' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/THORSwap',
      website: 'https://www.thorswap.finance'
    }
  },
  {
    id: 'thorchain-yield',
    name: 'THORChain Yield',
    ticker: 'TCY',
    type: 'Token',
    blockchains: ['Ethereum'],
    socialMedia: {
      website: 'https://thorchain.org'
    }
  },
  {
    id: 'time',
    name: 'Time',
    ticker: 'TIME',
    type: 'Token',
    blockchains: ['Avalanche'],
    contractAddresses: [
      { blockchain: 'Avalanche', address: '0xb54f16fB19478766A268F172C9480f8da1a7c9C3' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/wonderland_fi',
      website: 'https://www.wonderland.money'
    }
  },
  {
    id: 'tokenlon',
    name: 'Tokenlon',
    ticker: 'LON',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x0000000000095413afC295d19EDeb1Ad7B71c952' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/tokenlon',
      website: 'https://tokenlon.im'
    }
  },
  {
    id: 'totle',
    name: 'Totle',
    ticker: 'TOTLE',
    type: 'Token',
    blockchains: ['Ethereum']
  },
  {
    id: 'trader-joe',
    name: 'Trader Joe',
    ticker: 'JOE',
    type: 'Token',
    blockchains: ['Avalanche'],
    contractAddresses: [
      { blockchain: 'Avalanche', address: '0x6e84a6216eA6dACC71eE8E6b0a5B7322EEbC0fDd' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/traderjoe_xyz',
      website: 'https://traderjoexyz.com'
    }
  },
  {
    id: 'unifi',
    name: 'Unifi',
    ticker: 'UNIFI',
    type: 'Token',
    blockchains: ['BSC', 'Ethereum', 'Ontology'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0x728C5baC3C3e370E372Fc4671f9ef6916b814d8B' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/unifiprotocol',
      website: 'https://unifiprotocol.com'
    }
  },
  {
    id: 'uniswap',
    name: 'Uniswap',
    ticker: 'UNI',
    type: 'Token',
    blockchains: ['Ethereum', 'Polygon', 'Arbitrum', 'Optimism'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/Uniswap',
      website: 'https://uniswap.org'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984',
      api: 'https://api.thegraph.com/subgraphs/name/uniswap',
      docs: 'https://docs.uniswap.org'
    }
  },
  {
    id: 'unus-sed-leo',
    name: 'UNUS SED LEO',
    ticker: 'LEO',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x2AF5D2aD76741191D15Dfe7bF6aC92d4Bd912Ca3' }
    ]
  },
  {
    id: 'uswap',
    name: 'USwap',
    ticker: 'USWAP',
    type: 'Token',
    blockchains: ['Tron'],
    socialMedia: {
      website: 'https://uswap.io'
    }
  },
  {
    id: 'velodrome-finance',
    name: 'Velodrome Finance',
    ticker: 'VELO',
    type: 'Token',
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
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x5Af2Be193a6ABCa9c8817001F45744777Db30756' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/investvoyager',
      website: 'https://www.investvoyager.com'
    }
  },
  {
    id: 'vvs-finance',
    name: 'VVS Finance',
    ticker: 'VVS',
    type: 'Token',
    blockchains: ['Cronos'],
    contractAddresses: [
      { blockchain: 'Cronos', address: '0x2D03bCE6747ADC00E1a131BBA1469C15fD11e03' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/VVS_finance',
      website: 'https://vvs.finance'
    }
  },
  {
    id: 'wazirx',
    name: 'WazirX',
    ticker: 'WRX',
    type: 'Token',
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0x8e17ed70334C87eCE574C9d537BC153d8609E2a8' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/WazirXIndia',
      website: 'https://wazirx.com'
    }
  },
  {
    id: 'whitebit-coin',
    name: 'WhiteBIT Coin',
    ticker: 'WBT',
    type: 'Token',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x29CbD6850BcF8A3104d0b5B5b5b5b5b5b5b5b5b5' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/whitebit',
      website: 'https://whitebit.com'
    }
  },
  {
    id: 'woo-network',
    name: 'WOO Network',
    ticker: 'WOO',
    type: 'Token',
    blockchains: ['Ethereum', 'BSC', 'Polygon', 'Arbitrum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x4691937a7508860F876c9c0a2a617E7d9E945D4B' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/woonetwork',
      website: 'https://woo.network'
    }
  }
];

export default EXCHANGE_CURRENCIES;
