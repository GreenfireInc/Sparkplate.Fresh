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
 */

export type Blockchain = 'Algorand' | 'BSC' | 'Celo' | 'Ethereum' | 'Near' | 'Solana' | 'Tron' | 'Stellar' | 'Tezos' | 'zkSync' | 'Terra' | 'Other';

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
  ucid?: string;
  peggedTo: string; // USD, EUR, etc.
  blockchains: Blockchain[];
  contractAddresses?: ContractAddress[];
  socialMedia?: SocialMedia;
  apiLinks?: {
    explorer?: string;
    api?: string;
    docs?: string;
  };
  issuer?: string; // Company/organization that issues the stablecoin
}

export const STABLECOINS: StablecoinItem[] = [
  {
    id: 'anchored-coins-aeur',
    name: 'Anchored Coins AEUR',
    ticker: 'AEUR',
    ucid: 'AEUR://28596',
    peggedTo: 'EUR',
    blockchains: ['Other'],
    issuer: 'Anchored Coins'
  },
  {
    id: 'bidr',
    name: 'BIDR',
    ticker: 'BIDR',
    ucid: 'BIDR://6855',
    peggedTo: 'IDR',
    blockchains: ['Other'],
    issuer: 'Binance'
  },
  {
    id: 'binance-usd',
    name: 'Binance USD',
    ticker: 'BUSD',
    ucid: 'BUSD://4687',
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
    issuer: 'Binance'
  },
  {
    id: 'celo-dollar',
    name: 'Celo Dollar',
    ticker: 'CUSD',
    ucid: 'CUSD://7236',
    peggedTo: 'USD',
    blockchains: ['Celo'],
    contractAddresses: [
      { blockchain: 'Celo', address: '0x7955c816845861a75a25fca122bb686b8d282a' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/CeloOrg',
      website: 'https://celo.org'
    },
    issuer: 'Celo Foundation'
  },
  {
    id: 'celo-euro',
    name: 'Celo Euro',
    ticker: 'CEUR',
    ucid: 'CEUR://9467',
    peggedTo: 'EUR',
    blockchains: ['Celo'],
    contractAddresses: [
      { blockchain: 'Celo', address: '0xd8753cB4276b3739ebdeB5b4b3bF5ded6d6ca73' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/CeloOrg',
      website: 'https://celo.org'
    },
    issuer: 'Celo Foundation'
  },
  {
    id: 'dai',
    name: 'Dai',
    ticker: 'DAI',
    ucid: 'DAI://4943',
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
    issuer: 'MakerDAO'
  },
  {
    id: 'djed',
    name: 'Djed',
    ticker: 'DJED',
    ucid: 'DJED://21639',
    peggedTo: 'USD',
    blockchains: ['Other'],
    issuer: 'COTI Network'
  },
  {
    id: 'edelcoin',
    name: 'Edelcoin',
    ticker: 'EDLC',
    ucid: 'EDLC://28112',
    peggedTo: 'EUR',
    blockchains: ['Other'],
    issuer: 'Edelcoin'
  },
  {
    id: 'ethena-usde',
    name: 'Ethena USDe',
    ticker: 'USDe',
    ucid: 'USDe://29470',
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    socialMedia: {
      twitter: 'https://twitter.com/ethena_labs',
      website: 'https://www.ethena.fi'
    },
    issuer: 'Ethena Labs'
  },
  {
    id: 'euro-coin',
    name: 'Euro Coin',
    ticker: 'EURC',
    ucid: 'EURC://20641',
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
    issuer: 'Circle'
  },
  {
    id: 'fei-usd',
    name: 'Fei USD',
    ticker: 'FEI',
    ucid: 'FEI://8642',
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    issuer: 'Fei Protocol'
  },
  {
    id: 'first-digital-usd',
    name: 'First Digital USD',
    ticker: 'FDUSD',
    ucid: 'FDUSD://26081',
    peggedTo: 'USD',
    blockchains: ['Other'],
    issuer: 'First Digital'
  },
  {
    id: 'frax',
    name: 'Frax',
    ticker: 'FRAX',
    ucid: 'FRAX://6952',
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x853d955aCEf822Db058eb8505911ED77F175b99e' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/fraxfinance',
      website: 'https://frax.finance'
    },
    issuer: 'Frax Finance'
  },
  {
    id: 'gemini-usd',
    name: 'Gemini USD',
    ticker: 'GUSD',
    ucid: 'GUSD://3306',
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x0602F4A80C7677F67E33ED38E62B1BB1E523F4657' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/gemini',
      website: 'https://www.gemini.com'
    },
    issuer: 'Gemini'
  },
  {
    id: 'gyen',
    name: 'GYEN',
    ticker: 'GYEN',
    ucid: 'GYEN://8771',
    peggedTo: 'JPY',
    blockchains: ['Ethereum'],
    issuer: 'GMO-Z.com Trust Company'
  },
  {
    id: 'husd',
    name: 'HUSD',
    ticker: 'HUSD',
    ucid: 'HUSD://4779',
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    issuer: 'Stable Universal'
  },
  {
    id: 'lifi-dollar',
    name: 'Lifi Dollar',
    ticker: 'LUSDl',
    ucid: 'LUSDl://32454',
    peggedTo: 'USD',
    blockchains: ['Other'],
    issuer: 'Lifi'
  },
  {
    id: 'liquity-usd',
    name: 'Liquity USD',
    ticker: 'LUSD',
    ucid: 'LUSD://9566',
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x5f98805A4E8be255a32880FDeC7F6728C6568bA0' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/LiquityProtocol',
      website: 'https://www.liquity.org'
    },
    issuer: 'Liquity'
  },
  {
    id: 'ondo-us-dollar-yield',
    name: 'Ondo US Dollar Yield',
    ticker: 'USDY',
    ucid: 'USDY://29256',
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    socialMedia: {
      twitter: 'https://twitter.com/ondo_finance',
      website: 'https://ondo.finance'
    },
    issuer: 'Ondo Finance'
  },
  {
    id: 'origin-dollar',
    name: 'Origin Dollar',
    ticker: 'OUSD',
    ucid: 'OUSD://7189',
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    issuer: 'Origin Protocol'
  },
  {
    id: 'pax-dollar',
    name: 'Pax Dollar',
    ticker: 'USDP',
    ucid: 'USDP://3330',
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x8929bF320078128359286dEdBbDD379c3725F567' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/paxos',
      website: 'https://paxos.com'
    },
    issuer: 'Paxos'
  },
  {
    id: 'pax-gold',
    name: 'PAX Gold',
    ticker: 'PAXG',
    ucid: 'PAXG://4705',
    peggedTo: 'Gold',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x45804880De22913dFE09f4980848ECE6EcbAf78F' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/paxos',
      website: 'https://paxos.com'
    },
    issuer: 'Paxos'
  },
  {
    id: 'paypal-usd',
    name: 'PayPal USD',
    ticker: 'PYUSD',
    ucid: 'PYUSD://27772',
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
    issuer: 'PayPal'
  },
  {
    id: 'prisma-mkusd',
    name: 'Prisma mkUSD',
    ticker: 'MKUSD',
    ucid: 'MKUSD://28094',
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    issuer: 'Prisma Finance'
  },
  {
    id: 'reserve',
    name: 'Reserve',
    ticker: 'RSV',
    ucid: 'RSV://6727',
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    issuer: 'Reserve Protocol'
  },
  {
    id: 'rupiah-token',
    name: 'Rupiah Token',
    ticker: 'IDRT',
    ucid: 'IDRT://4702',
    peggedTo: 'IDR',
    blockchains: ['Ethereum'],
    issuer: 'Rupiah Token'
  },
  {
    id: 'sperax-usd',
    name: 'Sperax USD',
    ticker: 'USDS',
    ucid: 'USDS://17285',
    peggedTo: 'USD',
    blockchains: ['Other'],
    issuer: 'Sperax'
  },
  {
    id: 'susd',
    name: 'sUSD',
    ticker: 'SUSD',
    ucid: 'SUSD://2927',
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x57Ab1ec28D129707052df4dF418D58a2D46d5f51' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/synthetix_io',
      website: 'https://synthetix.io'
    },
    issuer: 'Synthetix'
  },
  {
    id: 'stasis-euro',
    name: 'STASIS EURO',
    ticker: 'EURS',
    ucid: 'EURS://2989',
    peggedTo: 'EUR',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xdB25f211AB05b1c97D595516F45794528a807ad8' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/stasis_net',
      website: 'https://stasis.net'
    },
    issuer: 'STASIS'
  },
  {
    id: 'steem-dollars',
    name: 'Steem Dollars',
    ticker: 'SBD',
    ucid: 'SBD://1312',
    peggedTo: 'USD',
    blockchains: ['Other'],
    issuer: 'Steem'
  },
  {
    id: 'terraclassicusd',
    name: 'TerraClassicUSD',
    ticker: 'USTC',
    ucid: 'USTC://7129',
    peggedTo: 'USD',
    blockchains: ['Solana', 'Terra'],
    contractAddresses: [
      { blockchain: 'Solana', address: '3BbBL8ADjQmR8DHmYE3SJMjPCL2BWNYEXsELwKXHHXX' },
      { blockchain: 'Terra', address: 'terra1c0swmt419f0wc0g85nsyj27p8yaqg3bva' }
    ],
    issuer: 'Terra (Classic)'
  },
  {
    id: 'tether',
    name: 'Tether',
    ticker: 'USDT',
    ucid: 'USDT://825',
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
    issuer: 'Tether Limited'
  },
  {
    id: 'tether-eurt',
    name: 'Tether EURt',
    ticker: 'EURt',
    ucid: 'EURt://10789',
    peggedTo: 'EUR',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x5503983262469900273197955' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/Tether_to',
      website: 'https://tether.to'
    },
    issuer: 'Tether Limited'
  },
  {
    id: 'trueusd',
    name: 'TrueUSD',
    ticker: 'TUSD',
    ucid: 'TUSD://2563',
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x8700671660d5b1287c8008800b6d61667b5e396d' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/TrueUSD',
      website: 'https://trueusd.com'
    },
    issuer: 'TrustToken'
  },
  {
    id: 'usdb',
    name: 'USDB',
    ticker: 'USDB',
    ucid: 'USDB://29599',
    peggedTo: 'USD',
    blockchains: ['Other'],
    issuer: 'Blast'
  },
  {
    id: 'usdc',
    name: 'USD Coin',
    ticker: 'USDC',
    ucid: 'USDC://3408',
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
    issuer: 'Circle'
  },
  {
    id: 'usdd',
    name: 'USDD',
    ticker: 'USDD',
    ucid: 'USDD://19891',
    peggedTo: 'USD',
    blockchains: ['Tron'],
    issuer: 'Tron DAO'
  },
  {
    id: 'usdj',
    name: 'USDJ',
    ticker: 'USDJ',
    ucid: 'USDJ://5446',
    peggedTo: 'USD',
    blockchains: ['Tron'],
    issuer: 'JustLend'
  },
  {
    id: 'usdk',
    name: 'USDK',
    ticker: 'USDK',
    ucid: 'USDK://4064',
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    issuer: 'OKX'
  },
  {
    id: 'usdx-kava',
    name: 'USDX (Kava)',
    ticker: 'USDx',
    ucid: 'USDx://6651',
    peggedTo: 'USD',
    blockchains: ['Other'],
    issuer: 'Kava'
  },
  {
    id: 'vai',
    name: 'Vai',
    ticker: 'VAI',
    ucid: 'VAI://4099',
    peggedTo: 'USD',
    blockchains: ['BSC'],
    issuer: 'Venus Protocol'
  },
  {
    id: 'venus-busd',
    name: 'Venus BUSD',
    ticker: 'vBUSD',
    ucid: 'vBUSD://7959',
    peggedTo: 'USD',
    blockchains: ['BSC'],
    issuer: 'Venus Protocol'
  },
  {
    id: 'venus-dai',
    name: 'Venus DAI',
    ticker: 'vDAI',
    ucid: 'vDAI://8214',
    peggedTo: 'USD',
    blockchains: ['BSC'],
    issuer: 'Venus Protocol'
  },
  {
    id: 'verified-usd',
    name: 'Verified USD',
    ticker: 'USDV',
    ucid: 'USDV://28443',
    peggedTo: 'USD',
    blockchains: ['Ethereum'],
    issuer: 'Verified USD'
  },
  {
    id: 'vnx-euro',
    name: 'VNX Euro',
    ticker: 'VEUR',
    ucid: 'VEUR://24228',
    peggedTo: 'EUR',
    blockchains: ['Other'],
    issuer: 'VNX'
  },
  {
    id: 'vnx-swiss-franc',
    name: 'VNX Swiss Franc',
    ticker: 'VCHF',
    ucid: 'VCHF://24130',
    peggedTo: 'CHF',
    blockchains: ['Other'],
    issuer: 'VNX'
  },
  {
    id: 'xsgd',
    name: 'XSGD',
    ticker: 'XSGD',
    ucid: 'XSGD://8489',
    peggedTo: 'SGD',
    blockchains: ['Ethereum'],
    issuer: 'Xfers'
  },
  {
    id: 'zusd',
    name: 'ZUSD',
    ticker: 'ZUSD',
    ucid: 'ZUSD://8772',
    peggedTo: 'USD',
    blockchains: ['Other'],
    issuer: 'ZUSD'
  },
  {
    id: 'usds-dai-rebrand',
    name: 'USDS (DAI Rebrand)',
    ticker: 'USDS',
    peggedTo: 'USD',
    blockchains: ['Other'],
    issuer: 'MakerDAO'
  }
];

export default STABLECOINS;
