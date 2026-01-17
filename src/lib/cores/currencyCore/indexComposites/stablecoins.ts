/**
 * Stablecoins Index - Comprehensive list of stablecoins across multiple blockchains
 * 
 * This list contains stablecoins (cryptocurrencies pegged to stable assets like USD, EUR, etc.)
 * with their contract addresses across various blockchain networks. Each entry includes:
 * - Currency information (name, ticker, UCID)
 * - Contract addresses per blockchain (Algorand, BSC, Celo, Ethereum, Near, Solana, Tron, Stellar, Tezos, zkSync)
 * - Social media links (where available)
 * - API links (where available)
 * 
 * Stablecoins are tokens that maintain a stable value relative to a reference asset,
 * typically used for payments, trading, and DeFi applications.
 * 
 * This index is used for stablecoin integrations, multi-chain stablecoin support,
 * and payment features.
 * 
 * Last Updated: December 2025
 * Source: Multiple blockchain networks and stablecoin issuers
 */

export type Blockchain = 'Algorand' | 'BSC' | 'Celo' | 'Ethereum' | 'Near' | 'Solana' | 'Tron' | 'Stellar' | 'Tezos' | 'zkSync' | 'Terra' | 'Other';
export type CurrencyType = 'coin' | 'token';
export type ConsensusType = 'token' | 'proof-of-stake' | 'delegated-proof-of-stake';
export type StablecoinClass = 'fiat-backed' | 'crypto-backed' | 'algorithmic' | 'commodity-backed' | 'hybrid' | 'yield-bearing';

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

export interface StablecoinItem {
  id: string;
  name: string;
  ticker: string;
  description: string;
  ucid: number | null;
  type: CurrencyType;
  consensusType: ConsensusType;
  class: StablecoinClass[];
  peggedTo: string;
  blockchains: Blockchain[];
  contractAddresses?: ContractAddress[];
  socialMedia?: SocialMedia;
  apiLinks?: {
    explorer?: string;
    api?: string;
    docs?: string;
  };
  issuer: string;
  website: string | null;
  github: string | null;
  npm: string | null;
}

export const STABLECOINS: StablecoinItem[] = [
  {
    id: 'anchored-coins-aeur',
    name: 'Anchored Coins AEUR',
    ticker: 'AEUR',
    description: 'Euro-pegged stablecoin backed 1:1 by EUR reserves held in European banks',
    ucid: 28596,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed'],
    peggedTo: 'EUR',
    blockchains: ['Other'],
    issuer: 'Anchored Coins',
    website: 'https://www.anchoredcoins.com/',
    github: null,
    npm: null
  },
  {
    id: 'bidr',
    name: 'BIDR',
    ticker: 'BIDR',
    description: 'Indonesian Rupiah-pegged stablecoin issued by Binance, backed 1:1 by IDR reserves',
    ucid: 6855,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed'],
    peggedTo: 'IDR',
    blockchains: ['Other'],
    issuer: 'Binance',
    website: 'https://www.binance.com/',
    github: null,
    npm: null
  },
  {
    id: 'binance-usd',
    name: 'Binance USD',
    ticker: 'BUSD',
    description: 'USD-backed stablecoin issued by Binance in partnership with Paxos, approved and regulated by NYDFS',
    ucid: 4687,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed'],
    peggedTo: 'USD',
    blockchains: ['BSC', 'Ethereum'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0xc9d5fD8bbc259B4B17BFdCE6117d9a39d2d039' },
      { blockchain: 'Ethereum', address: '0x4Fab14505465204807253302316E7A623C7C53' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/binance',
      website: 'https://www.binance.com'
    },
    issuer: 'Binance',
    website: 'https://www.binance.com/',
    github: null,
    npm: null
  },
  {
    id: 'celo-dollar',
    name: 'Celo Dollar',
    ticker: 'CUSD',
    description: 'Algorithmic stablecoin native to the Celo platform, backed by a reserve of crypto assets',
    ucid: 7236,
    type: 'token',
    consensusType: 'token',
    class: ['crypto-backed', 'algorithmic'],
    peggedTo: 'USD',
    blockchains: ['Celo'],
    contractAddresses: [
      { blockchain: 'Celo', address: '0x7955c816845861a75a25fca122bb686b8d282a' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/CeloOrg',
      website: 'https://celo.org'
    },
    issuer: 'Celo Foundation',
    website: 'https://celo.org/',
    github: 'https://github.com/celo-org',
    npm: '@celo/contractkit'
  },
  {
    id: 'celo-euro',
    name: 'Celo Euro',
    ticker: 'CEUR',
    description: 'EUR-pegged algorithmic stablecoin native to Celo, backed by reserve of crypto assets',
    ucid: 9467,
    type: 'token',
    consensusType: 'token',
    class: ['crypto-backed', 'algorithmic'],
    peggedTo: 'EUR',
    blockchains: ['Celo'],
    contractAddresses: [
      { blockchain: 'Celo', address: '0xd8753cB4276b3739ebdeB5b4b3bF5ded6d6ca73' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/CeloOrg',
      website: 'https://celo.org'
    },
    issuer: 'Celo Foundation',
    website: 'https://celo.org/',
    github: 'https://github.com/celo-org',
    npm: '@celo/contractkit'
  },
  {
    id: 'dai',
    name: 'Dai',
    ticker: 'DAI',
    description: 'Decentralized stablecoin backed by crypto collateral held in MakerDAO smart contracts, maintaining 1:1 peg with USD',
    ucid: 4943,
    type: 'token',
    consensusType: 'token',
    class: ['crypto-backed'],
    peggedTo: 'USD',
    blockchains: ['BSC', 'Ethereum', 'Near'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0xA40640458FBc27b6EfdEdaA1E9CE1704cE7a21' },
      { blockchain: 'Ethereum', address: '0x4FA4387E717F9A5D6B8C24C2866946654766867B' },
      { blockchain: 'Near', address: 'a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48.factory.bridge.near' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/MakerDAO',
      website: 'https://makerdao.com'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0x6B175474E89094C44Da98b954EedeAC495271d0F',
      docs: 'https://docs.makerdao.com'
    },
    issuer: 'MakerDAO',
    website: 'https://makerdao.com/',
    github: 'https://github.com/makerdao',
    npm: '@makerdao/dai'
  },
  {
    id: 'djed',
    name: 'Djed',
    ticker: 'DJED',
    description: 'Algorithmic stablecoin on Cardano, backed by ADA reserves using formal verification',
    ucid: 21639,
    type: 'token',
    consensusType: 'token',
    class: ['crypto-backed', 'algorithmic'],
    peggedTo: 'USD',
    blockchains: ['Other'],
    issuer: 'COTI Network',
    website: 'https://djed.xyz/',
    github: 'https://github.com/input-output-hk/djed',
    npm: null
  },
  {
    id: 'edelcoin',
    name: 'Edelcoin',
    ticker: 'EDLC',
    description: 'EUR-backed stablecoin collateralized by precious metals and fiat reserves',
    ucid: 28112,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed', 'commodity-backed'],
    peggedTo: 'EUR',
    blockchains: ['Other'],
    issuer: 'Edelcoin',
    website: 'https://www.edelcoin.io/',
    github: null,
    npm: null
  },
  {
    id: 'ethena-usde',
    name: 'Ethena USDe',
    ticker: 'USDe',
    description: 'Synthetic dollar protocol providing crypto-native yield through delta-hedging strategies',
    ucid: 29470,
    type: 'token',
    consensusType: 'token',
    class: ['crypto-backed', 'yield-bearing'],
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    socialMedia: {
      twitter: 'https://twitter.com/ethena_labs',
      website: 'https://www.ethena.fi'
    },
    issuer: 'Ethena Labs',
    website: 'https://www.ethena.fi/',
    github: 'https://github.com/ethena-labs',
    npm: null
  },
  {
    id: 'euro-coin',
    name: 'Euro Coin',
    ticker: 'EURC',
    description: 'Fully-backed EUR stablecoin issued by Circle, bringing euro liquidity to blockchain',
    ucid: 20641,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed'],
    peggedTo: 'EUR',
    blockchains: ['Ethereum', 'Stellar'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xC091EB4cbdf8F6e073a009d0d7819Eaf1505c2ACD' },
      { blockchain: 'Stellar', address: 'EURC-CDHUWAR04EQXMN246MPKCXHNN79MZM4Y2EMFDVXBSDPSX' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/centre_io',
      website: 'https://www.centre.io'
    },
    issuer: 'Circle',
    website: 'https://www.circle.com/',
    github: 'https://github.com/circlefin',
    npm: '@circle-fin/circle-sdk'
  },
  {
    id: 'fei-usd',
    name: 'Fei USD',
    ticker: 'FEI',
    description: 'Decentralized stablecoin using protocol-controlled value and direct incentives',
    ucid: 8642,
    type: 'token',
    consensusType: 'token',
    class: ['crypto-backed', 'algorithmic'],
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    issuer: 'Fei Protocol',
    website: 'https://fei.money/',
    github: 'https://github.com/fei-protocol',
    npm: null
  },
  {
    id: 'first-digital-usd',
    name: 'First Digital USD',
    ticker: 'FDUSD',
    description: 'USD-backed stablecoin issued in Hong Kong, regulated and audited for Asian markets',
    ucid: 26081,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed'],
    peggedTo: 'USD',
    blockchains: ['Other'],
    issuer: 'First Digital',
    website: 'https://firstdigitallabs.com/',
    github: null,
    npm: null
  },
  {
    id: 'frax',
    name: 'Frax',
    ticker: 'FRAX',
    description: 'First fractional-algorithmic stablecoin, partially backed by collateral and partially stabilized algorithmically',
    ucid: 6952,
    type: 'token',
    consensusType: 'token',
    class: ['crypto-backed', 'algorithmic', 'hybrid'],
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x853d955aCEf822Db058eb8505911ED77F175b99e' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/fraxfinance',
      website: 'https://frax.finance'
    },
    issuer: 'Frax Finance',
    website: 'https://frax.finance/',
    github: 'https://github.com/FraxFinance',
    npm: null
  },
  {
    id: 'gemini-usd',
    name: 'Gemini USD',
    ticker: 'GUSD',
    description: 'Regulated USD-backed stablecoin issued by Gemini Trust Company, approved by NYDFS',
    ucid: 3306,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed'],
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x0602F4A80C7677F67E33ED38E62B1BB1E523F4657' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/gemini',
      website: 'https://www.gemini.com'
    },
    issuer: 'Gemini',
    website: 'https://www.gemini.com/',
    github: null,
    npm: null
  },
  {
    id: 'gyen',
    name: 'GYEN',
    ticker: 'GYEN',
    description: 'Japanese Yen-backed stablecoin regulated and issued by GMO-Z.com Trust Company',
    ucid: 8771,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed'],
    peggedTo: 'JPY',
    blockchains: ['Ethereum'],
    issuer: 'GMO-Z.com Trust Company',
    website: 'https://stablecoin.z.com/',
    github: null,
    npm: null
  },
  {
    id: 'husd',
    name: 'HUSD',
    ticker: 'HUSD',
    description: 'USD-backed stablecoin issued by Stable Universal, formerly associated with Huobi',
    ucid: 4779,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed'],
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    issuer: 'Stable Universal',
    website: null,
    github: null,
    npm: null
  },
  {
    id: 'lifi-dollar',
    name: 'Lifi Dollar',
    ticker: 'LUSDl',
    description: 'Decentralized stablecoin backed by protocol reserves on Lifi platform',
    ucid: 32454,
    type: 'token',
    consensusType: 'token',
    class: ['crypto-backed'],
    peggedTo: 'USD',
    blockchains: ['Other'],
    issuer: 'Lifi',
    website: null,
    github: null,
    npm: null
  },
  {
    id: 'liquity-usd',
    name: 'Liquity USD',
    ticker: 'LUSD',
    description: 'Decentralized stablecoin backed by ETH collateral with 0% interest, issued through Liquity Protocol',
    ucid: 9566,
    type: 'token',
    consensusType: 'token',
    class: ['crypto-backed'],
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x5f98805A4E8be255a32880FDeC7F6728C6568bA0' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/LiquityProtocol',
      website: 'https://www.liquity.org'
    },
    issuer: 'Liquity',
    website: 'https://www.liquity.org/',
    github: 'https://github.com/liquity',
    npm: '@liquity/lib-base'
  },
  {
    id: 'ondo-us-dollar-yield',
    name: 'Ondo US Dollar Yield',
    ticker: 'USDY',
    description: 'Tokenized note secured by short-term US Treasuries and bank deposits, providing yield',
    ucid: 29256,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed', 'yield-bearing'],
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    socialMedia: {
      twitter: 'https://twitter.com/ondo_finance',
      website: 'https://ondo.finance'
    },
    issuer: 'Ondo Finance',
    website: 'https://ondo.finance/',
    github: 'https://github.com/ondoprotocol',
    npm: null
  },
  {
    id: 'origin-dollar',
    name: 'Origin Dollar',
    ticker: 'OUSD',
    description: 'Yield-generating stablecoin backed by DAI, USDT, and USDC with autonomous yield strategies',
    ucid: 7189,
    type: 'token',
    consensusType: 'token',
    class: ['crypto-backed', 'yield-bearing'],
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    issuer: 'Origin Protocol',
    website: 'https://www.ousd.com/',
    github: 'https://github.com/OriginProtocol',
    npm: null
  },
  {
    id: 'pax-dollar',
    name: 'Pax Dollar',
    ticker: 'USDP',
    description: 'Regulated USD-backed stablecoin issued by Paxos, approved by NYDFS',
    ucid: 3330,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed'],
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x8929bF320078128359286dEdBbDD379c3725F567' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/paxos',
      website: 'https://paxos.com'
    },
    issuer: 'Paxos',
    website: 'https://paxos.com/',
    github: null,
    npm: null
  },
  {
    id: 'pax-gold',
    name: 'PAX Gold',
    ticker: 'PAXG',
    description: 'Gold-backed cryptocurrency where each token represents one troy ounce of London Good Delivery gold',
    ucid: 4705,
    type: 'token',
    consensusType: 'token',
    class: ['commodity-backed'],
    peggedTo: 'Gold',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x45804880De22913dFE09f4980848ECE6EcbAf78F' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/paxos',
      website: 'https://paxos.com'
    },
    issuer: 'Paxos',
    website: 'https://paxosgold.com/',
    github: null,
    npm: null
  },
  {
    id: 'paypal-usd',
    name: 'PayPal USD',
    ticker: 'PYUSD',
    description: 'USD-backed stablecoin issued by Paxos for PayPal, enabling instant crypto payments',
    ucid: 27772,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed'],
    peggedTo: 'USD',
    blockchains: ['Ethereum', 'Near'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x6c3E82245b0F06087b33379D5589E19B2773dF57' },
      { blockchain: 'Near', address: 'pyusd.factory.bridge.near' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/PayPal',
      website: 'https://www.paypal.com'
    },
    issuer: 'PayPal',
    website: 'https://www.paypal.com/pyusd',
    github: null,
    npm: null
  },
  {
    id: 'prisma-mkusd',
    name: 'Prisma mkUSD',
    ticker: 'MKUSD',
    description: 'Decentralized stablecoin backed by liquid staking tokens through Prisma Finance',
    ucid: 28094,
    type: 'token',
    consensusType: 'token',
    class: ['crypto-backed'],
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    issuer: 'Prisma Finance',
    website: 'https://prismafinance.com/',
    github: 'https://github.com/prisma-fi',
    npm: null
  },
  {
    id: 'reserve',
    name: 'Reserve',
    ticker: 'RSV',
    description: 'Asset-backed stablecoin designed for global adoption with decentralized governance',
    ucid: 6727,
    type: 'token',
    consensusType: 'token',
    class: ['crypto-backed', 'fiat-backed'],
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    issuer: 'Reserve Protocol',
    website: 'https://reserve.org/',
    github: 'https://github.com/reserve-protocol',
    npm: null
  },
  {
    id: 'rupiah-token',
    name: 'Rupiah Token',
    ticker: 'IDRT',
    description: 'Indonesian Rupiah-backed stablecoin providing crypto access to IDR markets',
    ucid: 4702,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed'],
    peggedTo: 'IDR',
    blockchains: ['Ethereum'],
    issuer: 'Rupiah Token',
    website: 'https://rupiahtoken.com/',
    github: null,
    npm: null
  },
  {
    id: 'sperax-usd',
    name: 'Sperax USD',
    ticker: 'USDS',
    description: 'Auto-yield stablecoin backed by yield-bearing collateral with automated yield strategies',
    ucid: 17285,
    type: 'token',
    consensusType: 'token',
    class: ['crypto-backed', 'yield-bearing'],
    peggedTo: 'USD',
    blockchains: ['Other'],
    issuer: 'Sperax',
    website: 'https://sperax.io/',
    github: 'https://github.com/speraxdev',
    npm: null
  },
  {
    id: 'susd',
    name: 'sUSD',
    ticker: 'SUSD',
    description: 'Synthetic USD stablecoin backed by SNX collateral in the Synthetix protocol',
    ucid: 2927,
    type: 'token',
    consensusType: 'token',
    class: ['crypto-backed'],
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/synthetix_io',
      website: 'https://synthetix.io'
    },
    issuer: 'Synthetix',
    website: 'https://synthetix.io/',
    github: 'https://github.com/Synthetixio',
    npm: 'synthetix'
  },
  {
    id: 'stasis-euro',
    name: 'STASIS EURO',
    ticker: 'EURS',
    description: 'EUR-backed stablecoin with 1:1 reserves held in European financial institutions',
    ucid: 2989,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed'],
    peggedTo: 'EUR',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xdB25f211AB05b1c97D595516F45794528a807ad8' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/stasis_net',
      website: 'https://stasis.net'
    },
    issuer: 'STASIS',
    website: 'https://stasis.net/',
    github: null,
    npm: null
  },
  {
    id: 'steem-dollars',
    name: 'Steem Dollars',
    ticker: 'SBD',
    description: 'Algorithmic stablecoin on Steem blockchain convertible to $1 worth of STEEM',
    ucid: 1312,
    type: 'coin',
    consensusType: 'delegated-proof-of-stake',
    class: ['algorithmic'],
    peggedTo: 'USD',
    blockchains: ['Other'],
    issuer: 'Steem',
    website: 'https://steem.com/',
    github: 'https://github.com/steemit',
    npm: null
  },
  {
    id: 'terraclassicusd',
    name: 'TerraClassicUSD',
    ticker: 'USTC',
    description: 'Algorithmic stablecoin from Terra Classic, formerly UST before the May 2022 depeg event',
    ucid: 7129,
    type: 'token',
    consensusType: 'token',
    class: ['algorithmic'],
    peggedTo: 'USD',
    blockchains: ['Solana', 'Terra'],
    contractAddresses: [
      { blockchain: 'Solana', address: '3BbBL8ADjQmR8DHmYE3SJMjPCL2BWNYEXsELwKXHHXX' },
      { blockchain: 'Terra', address: 'terra1c0swmt419f0wc0g85nsyj27p8yaqg3bva' }
    ],
    issuer: 'Terra (Classic)',
    website: 'https://terra.money/',
    github: 'https://github.com/terra-money',
    npm: null
  },
  {
    id: 'tether',
    name: 'Tether',
    ticker: 'USDT',
    description: 'The first and most widely adopted USD-backed stablecoin, maintaining 1:1 peg with USD reserves across multiple blockchains',
    ucid: 825,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed'],
    peggedTo: 'USD',
    blockchains: ['Algorand', 'BSC', 'Celo', 'Ethereum', 'Near', 'Solana', 'Tron', 'Stellar', 'Tezos', 'zkSync'],
    contractAddresses: [
      { blockchain: 'Algorand', address: '312769' },
      { blockchain: 'BSC', address: '0xc58e33f38ed843b35582f3427845f3c14a274a2' },
      { blockchain: 'Celo', address: '0x85931c2183b36c1c10d4a2a0c0c380b0b48' },
      { blockchain: 'Ethereum', address: '0xdAC17F958d2EE523A2206206994597C13D831c7' },
      { blockchain: 'Near', address: 'usdt.fused.near' },
      { blockchain: 'Solana', address: 'Hwzk2W9Hh8bb8B0F2Ffzhmdk2XXZgxKxFu7uBEDkx' },
      { blockchain: 'Tron', address: 'TR7NHqJkQxGTQ8q8Zry4pL8oR2SzgJ8t' },
      { blockchain: 'Stellar', address: 'GCCRH6Q3FNP321S7BDLM5AFA7060F60KQQC85SJNDAVRZ57SPK' },
      { blockchain: 'Tezos', address: 'KT1xTn74bUbxHDBmm2GZAcQfmPbvKWRB2' },
      { blockchain: 'zkSync', address: 'zks1xxx29cshups260ahh5qjfly58mxyv9f78jgy' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/Tether_to',
      website: 'https://tether.to'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0xdAC17F958d2EE523A2206206994597C13D831c7',
      api: 'https://api.tether.to',
      docs: 'https://tether.to/en/transparency'
    },
    issuer: 'Tether Limited',
    website: 'https://tether.to/',
    github: null,
    npm: null
  },
  {
    id: 'tether-eurt',
    name: 'Tether EURt',
    ticker: 'EURt',
    description: 'Euro-backed stablecoin issued by Tether Limited, maintaining 1:1 peg with EUR',
    ucid: 10789,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed'],
    peggedTo: 'EUR',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x5503983262469900273197955' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/Tether_to',
      website: 'https://tether.to'
    },
    issuer: 'Tether Limited',
    website: 'https://tether.to/',
    github: null,
    npm: null
  },
  {
    id: 'trueusd',
    name: 'TrueUSD',
    ticker: 'TUSD',
    description: 'USD-backed stablecoin with real-time attestations and legal protections, issued by TrustToken',
    ucid: 2563,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed'],
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x8700671660d5b1287c8008800b6d61667b5e396d' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/TrueUSD',
      website: 'https://trueusd.com'
    },
    issuer: 'TrustToken',
    website: 'https://trueusd.com/',
    github: 'https://github.com/trusttoken',
    npm: null
  },
  {
    id: 'usdb',
    name: 'USDB',
    ticker: 'USDB',
    description: 'Native rebasing stablecoin on Blast L2, automatically generating yield for holders',
    ucid: 29599,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed', 'yield-bearing'],
    peggedTo: 'USD',
    blockchains: ['Other'],
    issuer: 'Blast',
    website: 'https://blast.io/',
    github: null,
    npm: null
  },
  {
    id: 'usdc',
    name: 'USD Coin',
    ticker: 'USDC',
    description: 'Fully-backed USD stablecoin issued by Circle, providing fast, secure, and transparent global payment solutions',
    ucid: 3408,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed'],
    peggedTo: 'USD',
    blockchains: ['Algorand', 'BSC', 'Celo', 'Ethereum', 'Near', 'Solana', 'Tron', 'Tezos'],
    contractAddresses: [
      { blockchain: 'Algorand', address: '31566704' },
      { blockchain: 'BSC', address: '0x8ac76a51c950a9821a8eb83f8e1a97b32cd580d' },
      { blockchain: 'Celo', address: '0x2424b7a2d67a90965e6d8a248f2c61e0c25a72a1' },
      { blockchain: 'Ethereum', address: '0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48' },
      { blockchain: 'Near', address: 'usdc.fused.near' },
      { blockchain: 'Solana', address: '2dEVSDPxPmsEaEfmxcCjphmKvcjaYmC2HsFu24GXe' },
      { blockchain: 'Tron', address: 'USDSwr9pdHkSvJKMjrff41FLux8bSxdKzR8tvTwcA' },
      { blockchain: 'Tezos', address: 'KT1K3S24WJ4Y1TNPPh2' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/centre_io',
      website: 'https://www.centre.io'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0xA0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      api: 'https://api.centre.io',
      docs: 'https://developers.circle.com'
    },
    issuer: 'Circle',
    website: 'https://www.circle.com/',
    github: 'https://github.com/circlefin',
    npm: '@circle-fin/circle-sdk'
  },
  {
    id: 'usdd',
    name: 'USDD',
    ticker: 'USDD',
    description: 'Decentralized algorithmic stablecoin on Tron network backed by TRX and other crypto assets',
    ucid: 19891,
    type: 'token',
    consensusType: 'token',
    class: ['crypto-backed', 'algorithmic'],
    peggedTo: 'USD',
    blockchains: ['Tron'],
    issuer: 'Tron DAO',
    website: 'https://usdd.io/',
    github: null,
    npm: null
  },
  {
    id: 'usdj',
    name: 'USDJ',
    ticker: 'USDJ',
    description: 'Decentralized stablecoin on Tron backed by TRX collateral in JustLend protocol',
    ucid: 5446,
    type: 'token',
    consensusType: 'token',
    class: ['crypto-backed'],
    peggedTo: 'USD',
    blockchains: ['Tron'],
    issuer: 'JustLend',
    website: 'https://just.network/',
    github: null,
    npm: null
  },
  {
    id: 'usdk',
    name: 'USDK',
    ticker: 'USDK',
    description: 'USD-backed stablecoin issued by OKX exchange with 1:1 USD reserves',
    ucid: 4064,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed'],
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    issuer: 'OKX',
    website: 'https://www.okx.com/',
    github: null,
    npm: null
  },
  {
    id: 'usdx-kava',
    name: 'USDX (Kava)',
    ticker: 'USDx',
    description: 'Decentralized stablecoin on Kava platform backed by crypto collateral',
    ucid: 6651,
    type: 'token',
    consensusType: 'token',
    class: ['crypto-backed'],
    peggedTo: 'USD',
    blockchains: ['Other'],
    issuer: 'Kava',
    website: 'https://www.kava.io/',
    github: 'https://github.com/Kava-Labs',
    npm: null
  },
  {
    id: 'vai',
    name: 'Vai',
    ticker: 'VAI',
    description: 'Decentralized stablecoin native to Venus Protocol on BSC, backed by crypto collateral',
    ucid: 4099,
    type: 'token',
    consensusType: 'token',
    class: ['crypto-backed'],
    peggedTo: 'USD',
    blockchains: ['BSC'],
    issuer: 'Venus Protocol',
    website: 'https://venus.io/',
    github: 'https://github.com/VenusProtocol',
    npm: null
  },
  {
    id: 'venus-busd',
    name: 'Venus BUSD',
    ticker: 'vBUSD',
    description: 'Interest-bearing BUSD token representing deposits in Venus Protocol lending pools',
    ucid: 7959,
    type: 'token',
    consensusType: 'token',
    class: ['yield-bearing'],
    peggedTo: 'USD',
    blockchains: ['BSC'],
    issuer: 'Venus Protocol',
    website: 'https://venus.io/',
    github: 'https://github.com/VenusProtocol',
    npm: null
  },
  {
    id: 'venus-dai',
    name: 'Venus DAI',
    ticker: 'vDAI',
    description: 'Interest-bearing DAI token representing deposits in Venus Protocol lending pools',
    ucid: 8214,
    type: 'token',
    consensusType: 'token',
    class: ['yield-bearing'],
    peggedTo: 'USD',
    blockchains: ['BSC'],
    issuer: 'Venus Protocol',
    website: 'https://venus.io/',
    github: 'https://github.com/VenusProtocol',
    npm: null
  },
  {
    id: 'verified-usd',
    name: 'Verified USD',
    ticker: 'USDV',
    description: 'Fully-reserved stablecoin backed by tokenized real-world assets and short-duration bonds',
    ucid: 28443,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed'],
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    issuer: 'Verified USD',
    website: 'https://verified-usd.com/',
    github: null,
    npm: null
  },
  {
    id: 'vnx-euro',
    name: 'VNX Euro',
    ticker: 'VEUR',
    description: 'Tokenized Euro backed by precious metals and regulated fiat reserves',
    ucid: 24228,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed', 'commodity-backed'],
    peggedTo: 'EUR',
    blockchains: ['Other'],
    issuer: 'VNX',
    website: 'https://vnx.ch/',
    github: null,
    npm: null
  },
  {
    id: 'vnx-swiss-franc',
    name: 'VNX Swiss Franc',
    ticker: 'VCHF',
    description: 'Tokenized Swiss Franc backed by precious metals and regulated fiat reserves',
    ucid: 24130,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed', 'commodity-backed'],
    peggedTo: 'CHF',
    blockchains: ['Other'],
    issuer: 'VNX',
    website: 'https://vnx.ch/',
    github: null,
    npm: null
  },
  {
    id: 'xsgd',
    name: 'XSGD',
    ticker: 'XSGD',
    description: 'Singapore Dollar-backed stablecoin fully collateralized by SGD in regulated bank accounts',
    ucid: 8489,
    type: 'token',
    consensusType: 'token',
    class: ['fiat-backed'],
    peggedTo: 'SGD',
    blockchains: ['Ethereum'],
    issuer: 'Xfers',
    website: 'https://www.xfers.com/sg/stablecoin',
    github: null,
    npm: null
  },
  {
    id: 'zusd',
    name: 'ZUSD',
    ticker: 'ZUSD',
    description: 'Decentralized stablecoin with algorithmic peg mechanism',
    ucid: 8772,
    type: 'token',
    consensusType: 'token',
    class: ['algorithmic'],
    peggedTo: 'USD',
    blockchains: ['Other'],
    issuer: 'ZUSD',
    website: null,
    github: null,
    npm: null
  },
  {
    id: 'usds-dai-rebrand',
    name: 'USDS (DAI Rebrand)',
    ticker: 'USDS',
    description: 'Rebranded version of DAI stablecoin from MakerDAO, maintaining decentralized crypto-backed model',
    ucid: null,
    type: 'token',
    consensusType: 'token',
    class: ['crypto-backed'],
    peggedTo: 'USD',
    blockchains: ['Other'],
    issuer: 'MakerDAO',
    website: 'https://makerdao.com/',
    github: 'https://github.com/makerdao',
    npm: '@makerdao/dai'
  }
];

export default STABLECOINS;
