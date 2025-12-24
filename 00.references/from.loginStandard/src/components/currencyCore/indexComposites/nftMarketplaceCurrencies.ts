/**
 * NFT Marketplace Currencies Index - NFT Marketplace Tokens
 * 
 * This list contains tokens and currencies associated with NFT marketplaces,
 * aggregators, and trading platforms. Each entry includes:
 * - Currency information (name, ticker, UCID)
 * - Contract addresses per blockchain
 * - Social media links
 * - API links
 * 
 * These tokens are typically used for governance, staking rewards, trading incentives,
 * and community ownership models within NFT marketplaces.
 * 
 * This index is used for NFT marketplace integrations, aggregations, and trading features.
 */

export type CurrencyType = 'coin' | 'token';
export type ConsensusType = 'proof-of-stake' | 'proof-of-work' | 'proof-of-authority' | 'delegated-proof-of-stake' | 'nominated-proof-of-stake' | 'liquid-proof-of-stake' | 'byzantine-fault-tolerance' | 'proof-of-transfer' | 'proof-of-coverage' | 'proof-of-space-and-time' | 'proof-of-replication' | 'token' | 'hybrid' | 'optimistic-rollup' | 'zk-rollup';
export type CurrencyClass = 'layer-1' | 'layer-2' | 'defi' | 'dex' | 'nft' | 'gaming' | 'metaverse' | 'oracle' | 'privacy' | 'meme' | 'staking' | 'governance' | 'lending' | 'data' | 'infrastructure' | 'smart-contract-platform' | 'exchange-token' | 'ai' | 'storage' | 'payment' | 'social' | 'interoperability' | 'sports' | 'iot' | 'yield-farming' | 'derivatives' | 'stablecoin';
export type Blockchain = 'Ethereum' | 'Solana' | 'Polygon' | 'Arbitrum' | 'Base' | 'Bitcoin' | 'BSC' | 'Tezos' | 'Avalanche' | 'Optimism' | 'Other';

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

export interface NFTMarketplaceCurrencyItem {
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
  website: string | null;
  github: string | null;
  npm: string | null;
  socialMedia?: SocialMedia;
  apiLinks?: {
    explorer?: string;
    api?: string;
    docs?: string;
    graphql?: string;
  };
  tokenPurpose?: string; // Governance, Rewards, Staking, etc.
  totalSupply?: string;
}

export const NFT_MARKETPLACE_CURRENCIES: NFTMarketplaceCurrencyItem[] = [
  {
    id: 'blur',
    name: 'Blur',
    ticker: 'BLUR',
    description: 'Leading Ethereum-focused NFT marketplace and aggregator with real-time price feeds, portfolio management, and professional trading tools.',
    ucid: 23121,
    type: 'token',
    consensusType: 'token',
    class: ['nft', 'infrastructure', 'governance'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x5283D291DBCF85356A21bA090E6db59121208b44' }
    ],
    website: 'https://blur.io',
    github: null,
    npm: null,
    socialMedia: {
      twitter: 'https://twitter.com/blur_io',
      discord: 'https://discord.gg/blur',
      website: 'https://blur.io'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0x5283D291DBCF85356A21bA090E6db59121208b44',
      api: 'https://api.blur.io',
      docs: 'https://docs.blur.io'
    },
    tokenPurpose: 'Governance, Trading Incentives, Community Rewards',
    totalSupply: '3,000,000,000'
  },
  {
    id: 'looksrare',
    name: 'LooksRare',
    ticker: 'LOOKS',
    description: 'Community-first NFT marketplace that rewards traders with LOOKS tokens where stakers earn 100% of trading fees.',
    ucid: 14536,
    type: 'token',
    consensusType: 'token',
    class: ['nft', 'infrastructure', 'staking'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xf4d2888d29D722226FafA5d9B24F9164c092421E' }
    ],
    website: 'https://looksrare.org',
    github: 'https://github.com/LooksRare',
    npm: null,
    socialMedia: {
      twitter: 'https://twitter.com/LooksRareNFT',
      discord: 'https://discord.gg/looksrare',
      website: 'https://looksrare.org'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0xf4d2888d29D722226FafA5d9B24F9164c092421E',
      api: 'https://api.looksrare.org',
      docs: 'https://docs.looksrare.org'
    },
    tokenPurpose: 'Rewards, Fee Sharing, Staking',
    totalSupply: '1,000,000,000'
  },
  {
    id: 'x2y2',
    name: 'X2Y2',
    ticker: 'X2Y2',
    description: 'Decentralized NFT marketplace with low 0.5% transaction fees and 100% revenue share model for X2Y2 token stakers.',
    ucid: 17569,
    type: 'token',
    consensusType: 'token',
    class: ['nft', 'infrastructure', 'staking'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x1E4EDE388cbc9F4b5c79681B7f94d36a11ABEBC9' }
    ],
    website: 'https://x2y2.io',
    github: null,
    npm: null,
    socialMedia: {
      twitter: 'https://twitter.com/the_x2y2',
      discord: 'https://discord.gg/x2y2',
      website: 'https://x2y2.io'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0x1E4EDE388cbc9F4b5c79681B7f94d36a11ABEBC9',
      api: 'https://api.x2y2.io',
      docs: 'https://docs.x2y2.io'
    },
    tokenPurpose: 'Incentives, Revenue Sharing, Staking',
    totalSupply: '1,000,000,000'
  },
  {
    id: 'rarible',
    name: 'Rarible',
    ticker: 'RARI',
    description: 'Community-owned multi-chain NFT marketplace with governance token distributing 75,000 RARI weekly to active users.',
    ucid: 6910,
    type: 'token',
    consensusType: 'token',
    class: ['nft', 'infrastructure', 'governance'],
    blockchains: ['Ethereum', 'Polygon'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xFca59Cd816aB1eaD66534D82bc21E7515cE441CF' },
      { blockchain: 'Polygon', address: '0x780053837cE2CeEaD2A90c9356d7533C3d0C6a24' }
    ],
    website: 'https://rarible.com',
    github: 'https://github.com/rarible',
    npm: 'https://www.npmjs.com/package/@rarible/sdk',
    socialMedia: {
      twitter: 'https://twitter.com/rarible',
      discord: 'https://discord.gg/rarible',
      website: 'https://rarible.com'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0xFca59Cd816aB1eaD66534D82bc21E7515cE441CF',
      api: 'https://api.rarible.org',
      docs: 'https://docs.rarible.org'
    },
    tokenPurpose: 'Governance, Rewards, Community Ownership',
    totalSupply: '25,000,000'
  },
  {
    id: 'tensor',
    name: 'Tensor',
    ticker: 'TNSR',
    description: 'Leading Solana NFT marketplace and aggregator designed for professional traders with advanced trading tools and analytics.',
    ucid: 29250,
    type: 'token',
    consensusType: 'token',
    class: ['nft', 'infrastructure', 'governance'],
    blockchains: ['Solana'],
    contractAddresses: [
      { blockchain: 'Solana', address: 'TNSRxcUxoT9xBG3de7PiJyTDYu7kskLqcpddxnEJAS6' }
    ],
    website: 'https://www.tensor.trade',
    github: null,
    npm: null,
    socialMedia: {
      twitter: 'https://twitter.com/tensor_hq',
      discord: 'https://discord.gg/tensor',
      website: 'https://www.tensor.trade'
    },
    apiLinks: {
      explorer: 'https://solscan.io/token/TNSRxcUxoT9xBG3de7PiJyTDYu7kskLqcpddxnEJAS6',
      api: 'https://api.tensor.trade',
      docs: 'https://docs.tensor.trade'
    },
    tokenPurpose: 'Governance, Trading Incentives',
    totalSupply: '1,000,000,000'
  },
  {
    id: 'magic-eden',
    name: 'Magic Eden',
    ticker: 'ME',
    description: 'Leading multi-chain NFT marketplace supporting Solana, Bitcoin, Ethereum, and Polygon with cross-chain trading capabilities.',
    ucid: 27902,
    type: 'token',
    consensusType: 'token',
    class: ['nft', 'infrastructure', 'interoperability'],
    blockchains: ['Solana', 'Bitcoin', 'Ethereum', 'Polygon'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x0C8c1ab017c3C0c8A48dD9F1DB2F59022D190f0b' }
    ],
    website: 'https://magiceden.io',
    github: null,
    npm: null,
    socialMedia: {
      twitter: 'https://twitter.com/MagicEden',
      discord: 'https://discord.gg/magiceden',
      website: 'https://magiceden.io'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0x0C8c1ab017c3C0c8A48dD9F1DB2F59022D190f0b',
      api: 'https://api-mainnet.magiceden.io',
      docs: 'https://docs.magiceden.io'
    },
    tokenPurpose: 'Ecosystem, Trading Incentives, Staking',
    totalSupply: '1,000,000,000'
  },
  {
    id: 'nftx',
    name: 'NFTX',
    ticker: 'NFTX',
    description: 'NFT index fund and liquidity protocol enabling NFT fractionalization and instant liquidity through community-managed vaults.',
    ucid: 7791,
    type: 'token',
    consensusType: 'token',
    class: ['nft', 'defi', 'governance'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x87d73E916D7057945c9BcD8cdd94e42A6F47f776' }
    ],
    website: 'https://nftx.io',
    github: 'https://github.com/NFTX-project',
    npm: null,
    socialMedia: {
      twitter: 'https://twitter.com/nftx_',
      discord: 'https://discord.gg/nftx',
      website: 'https://nftx.io'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0x87d73E916D7057945c9BcD8cdd94e42A6F47f776',
      docs: 'https://docs.nftx.io'
    },
    tokenPurpose: 'Governance, Liquidity Incentives',
    totalSupply: '65,000,000'
  },
  {
    id: 'superrare',
    name: 'SuperRare',
    ticker: 'RARE',
    description: 'Curated art-focused NFT marketplace with governance token for ecosystem expansion and curation of high-quality digital art.',
    ucid: 11294,
    type: 'token',
    consensusType: 'token',
    class: ['nft', 'governance', 'social'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xba5BDe662c17e2aDFF1075610382B9B691296350' }
    ],
    website: 'https://superrare.com',
    github: 'https://github.com/superrare',
    npm: null,
    socialMedia: {
      twitter: 'https://twitter.com/superrare',
      discord: 'https://discord.gg/superrare',
      website: 'https://superrare.com'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0xba5BDe662c17e2aDFF1075610382B9B691296350',
      api: 'https://api.superrare.com',
      docs: 'https://docs.superrare.com'
    },
    tokenPurpose: 'Governance, Staking, Digital Art Economy',
    totalSupply: '1,000,000,000'
  },
  {
    id: 'sudoswap',
    name: 'SudoSwap',
    ticker: 'SUDO',
    description: 'NFT automated market maker (AMM) protocol enabling NFT trading through liquidity pools, similar to Uniswap for NFTs.',
    ucid: 18035,
    type: 'token',
    consensusType: 'token',
    class: ['nft', 'defi', 'governance'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x3446Dd70B2D52A6Bf4a5a192D9b0A161295aB7F9' }
    ],
    website: 'https://sudoswap.xyz',
    github: 'https://github.com/sudoswap',
    npm: null,
    socialMedia: {
      twitter: 'https://twitter.com/sudoswap',
      discord: 'https://discord.gg/sudoswap',
      github: 'https://github.com/sudoswap',
      website: 'https://sudoswap.xyz'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0x3446Dd70B2D52A6Bf4a5a192D9b0A161295aB7F9',
      docs: 'https://docs.sudoswap.xyz'
    },
    tokenPurpose: 'Governance, Liquidity Provision',
    totalSupply: '60,000,000'
  },
  {
    id: 'opensea',
    name: 'OpenSea',
    ticker: 'SEA',
    description: 'The largest multi-chain NFT marketplace supporting Ethereum, Polygon, Solana, Arbitrum, and Base (no native token launched yet).',
    ucid: 50000,
    type: 'token',
    consensusType: 'token',
    class: ['nft', 'infrastructure', 'interoperability'],
    blockchains: ['Ethereum', 'Polygon', 'Solana', 'Arbitrum', 'Base'],
    contractAddresses: [],
    website: 'https://opensea.io',
    github: 'https://github.com/ProjectOpenSea',
    npm: 'https://www.npmjs.com/package/opensea-js',
    socialMedia: {
      twitter: 'https://twitter.com/opensea',
      discord: 'https://discord.gg/opensea',
      website: 'https://opensea.io'
    },
    apiLinks: {
      explorer: 'https://etherscan.io',
      api: 'https://api.opensea.io',
      docs: 'https://docs.opensea.io',
      graphql: 'https://api.opensea.io/graphql'
    },
    tokenPurpose: 'Planned: Governance (not yet launched)',
    totalSupply: 'TBD'
  },
  {
    id: 'foundation',
    name: 'Foundation',
    ticker: 'FND',
    description: 'Curated art marketplace focused on empowering digital creators with invite-only curation model (no native token launched).',
    ucid: 50001,
    type: 'token',
    consensusType: 'token',
    class: ['nft', 'social'],
    blockchains: ['Ethereum'],
    contractAddresses: [],
    website: 'https://foundation.app',
    github: null,
    npm: null,
    socialMedia: {
      twitter: 'https://twitter.com/foundation',
      discord: 'https://discord.gg/foundation',
      website: 'https://foundation.app'
    },
    apiLinks: {
      explorer: 'https://etherscan.io',
      api: 'https://api.foundation.app',
      docs: 'https://docs.foundation.app'
    },
    tokenPurpose: 'None (no token launched)',
    totalSupply: 'N/A'
  },
  {
    id: 'objkt',
    name: 'Objkt',
    ticker: 'OBJKT',
    description: 'Leading NFT marketplace on Tezos blockchain supporting FA2 token standard with low-cost minting and trading.',
    ucid: 50002,
    type: 'token',
    consensusType: 'token',
    class: ['nft', 'infrastructure'],
    blockchains: ['Tezos'],
    contractAddresses: [],
    website: 'https://objkt.com',
    github: null,
    npm: null,
    socialMedia: {
      twitter: 'https://twitter.com/objktcom',
      discord: 'https://discord.gg/objkt',
      website: 'https://objkt.com'
    },
    apiLinks: {
      explorer: 'https://tzkt.io',
      api: 'https://api.objkt.com',
      docs: 'https://docs.objkt.com'
    },
    tokenPurpose: 'Marketplace utility (Tezos-native)',
    totalSupply: 'N/A'
  },
  {
    id: 'fxhash',
    name: 'fxhash',
    ticker: 'FXHASH',
    description: 'Generative art platform and marketplace on Tezos for algorithmic art creation, minting, and trading.',
    ucid: 50003,
    type: 'token',
    consensusType: 'token',
    class: ['nft', 'infrastructure', 'social'],
    blockchains: ['Tezos'],
    contractAddresses: [],
    website: 'https://www.fxhash.xyz',
    github: 'https://github.com/fxhash',
    npm: null,
    socialMedia: {
      twitter: 'https://twitter.com/fx_hash',
      discord: 'https://discord.gg/fxhash',
      website: 'https://www.fxhash.xyz'
    },
    apiLinks: {
      explorer: 'https://tzkt.io',
      api: 'https://api.fxhash.xyz',
      docs: 'https://docs.fxhash.xyz'
    },
    tokenPurpose: 'Platform utility (Tezos-native)',
    totalSupply: 'N/A'
  },
  {
    id: 'element',
    name: 'Element',
    ticker: 'ELE',
    description: 'Multi-chain NFT marketplace aggregator with cross-chain trading capabilities across Ethereum, BSC, and Polygon.',
    ucid: 50004,
    type: 'token',
    consensusType: 'token',
    class: ['nft', 'infrastructure', 'interoperability'],
    blockchains: ['Ethereum', 'BSC', 'Polygon'],
    contractAddresses: [],
    website: 'https://element.market',
    github: null,
    npm: null,
    socialMedia: {
      twitter: 'https://twitter.com/Element_Market',
      website: 'https://element.market'
    },
    apiLinks: {
      explorer: 'https://etherscan.io',
      api: 'https://api.element.market',
      docs: 'https://docs.element.market'
    },
    tokenPurpose: 'Trading incentives, Rewards',
    totalSupply: 'TBD'
  },
  {
    id: 'nftb',
    name: 'NFTb',
    ticker: 'NFTB',
    description: 'NFT marketplace on Binance Smart Chain with native token for rewards, governance, and premium features.',
    ucid: 8141,
    type: 'token',
    consensusType: 'token',
    class: ['nft', 'infrastructure', 'governance'],
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0xde3dbBE30cfa9F437b293294d1fD64B26045C71A' }
    ],
    website: 'https://nftb.io',
    github: null,
    npm: null,
    socialMedia: {
      twitter: 'https://twitter.com/nftbmarket',
      website: 'https://nftb.io'
    },
    apiLinks: {
      explorer: 'https://bscscan.com/token/0xde3dbBE30cfa9F437b293294d1fD64B26045C71A',
      docs: 'https://docs.nftb.io'
    },
    tokenPurpose: 'Governance, Rewards, Staking',
    totalSupply: '100,000,000'
  },
  {
    id: 'tofu',
    name: 'TofuNFT',
    ticker: 'TOFU',
    description: 'Multi-chain NFT marketplace supporting BSC, Polygon, and Avalanche with cross-chain NFT trading.',
    ucid: 50005,
    type: 'token',
    consensusType: 'token',
    class: ['nft', 'infrastructure', 'interoperability'],
    blockchains: ['BSC', 'Polygon', 'Avalanche'],
    contractAddresses: [],
    website: 'https://tofunft.com',
    github: null,
    npm: null,
    socialMedia: {
      twitter: 'https://twitter.com/tofunft',
      website: 'https://tofunft.com'
    },
    apiLinks: {
      explorer: 'https://bscscan.com',
      api: 'https://api.tofunft.com',
      docs: 'https://docs.tofunft.com'
    },
    tokenPurpose: 'Trading rewards, Platform utility',
    totalSupply: 'TBD'
  },
  {
    id: 'jpegd',
    name: 'JPEG\'d',
    ticker: 'JPEG',
    description: 'NFT lending and liquidity protocol enabling NFT-backed loans with governance token for protocol decisions.',
    ucid: 19660,
    type: 'token',
    consensusType: 'token',
    class: ['nft', 'defi', 'lending', 'governance'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xE80C0cd204D654CEbe8dd64A4857cAb6Be8345a3' }
    ],
    website: 'https://jpegd.io',
    github: 'https://github.com/jpegd',
    npm: null,
    socialMedia: {
      twitter: 'https://twitter.com/jpegd_69',
      discord: 'https://discord.gg/jpegd',
      website: 'https://jpegd.io'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0xE80C0cd204D654CEbe8dd64A4857cAb6Be8345a3',
      docs: 'https://docs.jpegd.io'
    },
    tokenPurpose: 'Governance, Protocol utility',
    totalSupply: '1,000,000,000'
  },
  {
    id: 'benddao',
    name: 'BendDAO',
    ticker: 'BEND',
    description: 'NFT liquidity protocol enabling NFT collateralized lending with peer-to-pool lending model.',
    ucid: 17729,
    type: 'token',
    consensusType: 'token',
    class: ['nft', 'defi', 'lending', 'governance'],
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x0d02755a5702414AdC76c87F82c77E4e96Ad86F9' }
    ],
    website: 'https://www.benddao.xyz',
    github: 'https://github.com/BendDAO',
    npm: null,
    socialMedia: {
      twitter: 'https://twitter.com/BendDAO',
      discord: 'https://discord.gg/benddao',
      website: 'https://www.benddao.xyz'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0x0d02755a5702414AdC76c87F82c77E4e96Ad86F9',
      docs: 'https://docs.benddao.xyz'
    },
    tokenPurpose: 'Governance, Protocol utility',
    totalSupply: '1,000,000,000'
  },
  {
    id: 'reservoir',
    name: 'Reservoir',
    ticker: 'RESERVOIR',
    description: 'NFT aggregation protocol and infrastructure layer for building NFT marketplaces with unified liquidity.',
    ucid: 50006,
    type: 'token',
    consensusType: 'token',
    class: ['nft', 'infrastructure', 'interoperability'],
    blockchains: ['Ethereum', 'Polygon', 'Arbitrum', 'Base'],
    contractAddresses: [],
    website: 'https://reservoir.tools',
    github: 'https://github.com/reservoirprotocol',
    npm: 'https://www.npmjs.com/package/@reservoir0x/reservoir-sdk',
    socialMedia: {
      twitter: 'https://twitter.com/reservoir0x',
      discord: 'https://discord.gg/reservoir',
      github: 'https://github.com/reservoirprotocol',
      website: 'https://reservoir.tools'
    },
    apiLinks: {
      explorer: 'https://etherscan.io',
      api: 'https://api.reservoir.tools',
      docs: 'https://docs.reservoir.tools'
    },
    tokenPurpose: 'Infrastructure utility (no token launched)',
    totalSupply: 'N/A'
  },
  {
    id: 'zora',
    name: 'Zora',
    ticker: 'ZORA',
    description: 'Creator-focused NFT marketplace and protocol for minting and selling NFTs with permissionless market creation.',
    ucid: 50007,
    type: 'token',
    consensusType: 'token',
    class: ['nft', 'infrastructure', 'social'],
    blockchains: ['Ethereum', 'Base', 'Optimism'],
    contractAddresses: [],
    website: 'https://zora.co',
    github: 'https://github.com/ourzora',
    npm: 'https://www.npmjs.com/package/@zoralabs/zdk',
    socialMedia: {
      twitter: 'https://twitter.com/ourZORA',
      discord: 'https://discord.gg/zora',
      website: 'https://zora.co'
    },
    apiLinks: {
      explorer: 'https://etherscan.io',
      api: 'https://api.zora.co',
      docs: 'https://docs.zora.co'
    },
    tokenPurpose: 'Platform utility (no token launched)',
    totalSupply: 'N/A'
  }
];

export default NFT_MARKETPLACE_CURRENCIES;
