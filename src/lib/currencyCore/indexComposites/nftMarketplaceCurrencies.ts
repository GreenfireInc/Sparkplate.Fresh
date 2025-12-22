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

export type Blockchain = 'Ethereum' | 'Solana' | 'Polygon' | 'Arbitrum' | 'Base' | 'Bitcoin' | 'Other';

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
  ucid?: string;
  blockchains: Blockchain[];
  contractAddresses?: ContractAddress[];
  socialMedia?: SocialMedia;
  apiLinks?: {
    explorer?: string;
    api?: string;
    docs?: string;
    graphql?: string;
  };
  description?: string;
  tokenPurpose?: string; // Governance, Rewards, Staking, etc.
  totalSupply?: string;
}

export const NFT_MARKETPLACE_CURRENCIES: NFTMarketplaceCurrencyItem[] = [
  {
    id: 'blur',
    name: 'Blur',
    ticker: 'BLUR',
    ucid: 'BLUR://',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x5283D291DBCF85356A21bA090E6db59121208b44' }
    ],
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
    description: 'Leading Ethereum-focused NFT marketplace & aggregator with real-time price feeds and portfolio management',
    tokenPurpose: 'Governance, Trading Incentives, Community Rewards',
    totalSupply: '3,000,000,000'
  },
  {
    id: 'looksrare',
    name: 'LooksRare',
    ticker: 'LOOKS',
    ucid: 'LOOKS://',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xf4d2888d29D722226FafA5d9B24F9164c092421E' }
    ],
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
    description: 'NFT marketplace that rewards traders with LOOKS tokens; stakers earn 100% of trading fees',
    tokenPurpose: 'Rewards, Fee Sharing, Staking',
    totalSupply: '1,000,000,000'
  },
  {
    id: 'x2y2',
    name: 'X2Y2',
    ticker: 'X2Y2',
    ucid: 'X2Y2://',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x1E4EDE388cbc9F4b5c79681B7f94d36a11ABEBC9' }
    ],
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
    description: 'NFT marketplace with 0.5% transaction fees and 100% revenue share for stakers',
    tokenPurpose: 'Incentives, Revenue Sharing, Staking',
    totalSupply: '1,000,000,000'
  },
  {
    id: 'rarible',
    name: 'Rarible',
    ticker: 'RARI',
    ucid: 'RARI://',
    blockchains: ['Ethereum', 'Polygon'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xFca59Cd816aB1eaD66534D82bc21E7515cE441CF' },
      { blockchain: 'Polygon', address: '0x780053837cE2CeEaD2A90c9356d7533C3d0C6a24' }
    ],
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
    description: 'Community-owned NFT marketplace with governance token; distributes 75,000 RARI weekly to active users',
    tokenPurpose: 'Governance, Rewards, Community Ownership',
    totalSupply: '25,000,000'
  },
  {
    id: 'tensor',
    name: 'Tensor',
    ticker: 'TNSR',
    ucid: 'TNSR://',
    blockchains: ['Solana'],
    contractAddresses: [
      { blockchain: 'Solana', address: 'TNSR' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/tensor_hq',
      discord: 'https://discord.gg/tensor',
      website: 'https://www.tensor.trade'
    },
    apiLinks: {
      explorer: 'https://solscan.io/token/TNSR',
      api: 'https://api.tensor.trade',
      docs: 'https://docs.tensor.trade'
    },
    description: 'Leading Solana NFT marketplace and aggregator designed for professional traders with advanced trading tools',
    tokenPurpose: 'Governance, Trading Incentives',
    totalSupply: '1,000,000,000'
  },
  {
    id: 'magic-eden',
    name: 'Magic Eden',
    ticker: 'ME',
    ucid: 'ME://',
    blockchains: ['Solana', 'Bitcoin', 'Ethereum', 'Polygon'],
    contractAddresses: [
      { blockchain: 'Solana', address: 'ME' },
      { blockchain: 'Ethereum', address: '0x1234567890123456789012345678901234567890' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/MagicEden',
      discord: 'https://discord.gg/magiceden',
      website: 'https://magiceden.io'
    },
    apiLinks: {
      explorer: 'https://solscan.io',
      api: 'https://api-mainnet.magiceden.io',
      docs: 'https://docs.magiceden.io'
    },
    description: 'Multi-chain NFT marketplace (Solana, Bitcoin, Ethereum, Polygon) with ecosystem token for cross-chain trading',
    tokenPurpose: 'Ecosystem, Trading Incentives, Staking',
    totalSupply: '1,000,000,000'
  },
  {
    id: 'nftx',
    name: 'NFTX',
    ticker: 'NFTX',
    ucid: 'NFTX://',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x87d73E916D7057945c9BcD8cdd94e42A6F47f776' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/nftx_',
      discord: 'https://discord.gg/nftx',
      website: 'https://nftx.io'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0x87d73E916D7057945c9BcD8cdd94e42A6F47f776',
      docs: 'https://docs.nftx.io'
    },
    description: 'NFT index and liquidity protocol enabling NFT indexing and instant liquidity through vaults',
    tokenPurpose: 'Governance, Liquidity Incentives',
    totalSupply: '65,000,000'
  },
  {
    id: 'superrare',
    name: 'SuperRare',
    ticker: 'RARE',
    ucid: 'RARE://',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xba5BDe662c17e2aDFF1075610382B9B691296350' }
    ],
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
    description: 'Curated art-focused NFT marketplace with governance token for ecosystem expansion',
    tokenPurpose: 'Governance, Staking, Digital Art Economy',
    totalSupply: '1,000,000,000'
  },
  {
    id: 'sudoswap',
    name: 'SudoSwap',
    ticker: 'SUDO',
    ucid: 'SUDO://',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x3446Dd70B2D52A6Bf4a5a192D9b0A161295aB7F9' }
    ],
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
    description: 'NFT AMM (Automated Market Maker) enabling NFT trading through liquidity pools, similar to Uniswap for NFTs',
    tokenPurpose: 'Governance, Liquidity Provision',
    totalSupply: '60,000,000'
  },
  {
    id: 'opensea',
    name: 'OpenSea',
    ticker: 'SEA',
    ucid: 'SEA://',
    blockchains: ['Ethereum', 'Polygon', 'Solana', 'Arbitrum', 'Base'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x0000000000085d4780B73119b644AE5ecd22b376' }
    ],
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
    description: 'Largest multi-chain NFT marketplace (no native token launched yet, but SEA token rumored)',
    tokenPurpose: 'Planned: Governance (not yet launched)',
    totalSupply: 'TBD'
  },
  {
    id: 'foundation',
    name: 'Foundation',
    ticker: 'FND',
    ucid: 'FND://',
    blockchains: ['Ethereum'],
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
    description: 'Curated art marketplace focused on digital creators (no native token as of latest reporting)',
    tokenPurpose: 'None (no token launched)',
    totalSupply: 'N/A'
  },
  {
    id: 'objkt',
    name: 'Objkt',
    ticker: 'OBJKT',
    ucid: 'OBJKT://',
    blockchains: ['Tezos'],
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
    description: 'Leading NFT marketplace on Tezos blockchain, supporting FA2 token standard',
    tokenPurpose: 'Marketplace utility (Tezos-native)',
    totalSupply: 'N/A'
  },
  {
    id: 'fxhash',
    name: 'fxhash',
    ticker: 'FXHASH',
    ucid: 'FXHASH://',
    blockchains: ['Tezos'],
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
    description: 'Generative art platform and marketplace on Tezos for algorithmic art creation and trading',
    tokenPurpose: 'Platform utility (Tezos-native)',
    totalSupply: 'N/A'
  },
  {
    id: 'element',
    name: 'Element',
    ticker: 'ELE',
    ucid: 'ELE://',
    blockchains: ['Ethereum', 'BSC', 'Polygon'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x0000000000000000000000000000000000000000' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/Element_Market',
      website: 'https://element.market'
    },
    apiLinks: {
      explorer: 'https://etherscan.io',
      api: 'https://api.element.market',
      docs: 'https://docs.element.market'
    },
    description: 'Multi-chain NFT marketplace aggregator with cross-chain trading capabilities',
    tokenPurpose: 'Trading incentives, Rewards',
    totalSupply: 'TBD'
  },
  {
    id: 'nftb',
    name: 'NFTb',
    ticker: 'NFTB',
    ucid: 'NFTB://',
    blockchains: ['BSC'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0xde3dbBE30cfa9F437b293294d1fD64B26045C71A' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/nftbmarket',
      website: 'https://nftb.io'
    },
    apiLinks: {
      explorer: 'https://bscscan.com/token/0xde3dbBE30cfa9F437b293294d1fD64B26045C71A',
      docs: 'https://docs.nftb.io'
    },
    description: 'NFT marketplace on Binance Smart Chain with native token for rewards and governance',
    tokenPurpose: 'Governance, Rewards, Staking',
    totalSupply: '100,000,000'
  },
  {
    id: 'tofu',
    name: 'TofuNFT',
    ticker: 'TOFU',
    ucid: 'TOFU://',
    blockchains: ['BSC', 'Polygon', 'Avalanche'],
    contractAddresses: [
      { blockchain: 'BSC', address: '0x0000000000000000000000000000000000000000' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/tofunft',
      website: 'https://tofunft.com'
    },
    apiLinks: {
      explorer: 'https://bscscan.com',
      api: 'https://api.tofunft.com',
      docs: 'https://docs.tofunft.com'
    },
    description: 'Multi-chain NFT marketplace supporting BSC, Polygon, and Avalanche',
    tokenPurpose: 'Trading rewards, Platform utility',
    totalSupply: 'TBD'
  },
  {
    id: 'jpegd',
    name: 'JPEG\'d',
    ticker: 'JPEG',
    ucid: 'JPEG://',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0xE80C0cd204D654CEbe8dd64A4857cAb6Be8345a3' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/jpegd_69',
      discord: 'https://discord.gg/jpegd',
      website: 'https://jpegd.io'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0xE80C0cd204D654CEbe8dd64A4857cAb6Be8345a3',
      docs: 'https://docs.jpegd.io'
    },
    description: 'NFT lending and liquidity protocol with governance token',
    tokenPurpose: 'Governance, Protocol utility',
    totalSupply: '1,000,000,000'
  },
  {
    id: 'benddao',
    name: 'BendDAO',
    ticker: 'BEND',
    ucid: 'BEND://',
    blockchains: ['Ethereum'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x0d02755a5702414AdC76c87F82c77E4e96Ad86F9' }
    ],
    socialMedia: {
      twitter: 'https://twitter.com/BendDAO',
      discord: 'https://discord.gg/benddao',
      website: 'https://www.benddao.xyz'
    },
    apiLinks: {
      explorer: 'https://etherscan.io/token/0x0d02755a5702414AdC76c87F82c77E4e96Ad86F9',
      docs: 'https://docs.benddao.xyz'
    },
    description: 'NFT liquidity protocol enabling NFT collateralized lending',
    tokenPurpose: 'Governance, Protocol utility',
    totalSupply: '1,000,000,000'
  },
  {
    id: 'reservoir',
    name: 'Reservoir',
    ticker: 'RESERVOIR',
    ucid: 'RESERVOIR://',
    blockchains: ['Ethereum', 'Polygon', 'Arbitrum', 'Base'],
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
    description: 'NFT aggregation protocol and infrastructure for building NFT marketplaces',
    tokenPurpose: 'Infrastructure utility (no token launched)',
    totalSupply: 'N/A'
  },
  {
    id: 'zora',
    name: 'Zora',
    ticker: 'ZORA',
    ucid: 'ZORA://',
    blockchains: ['Ethereum', 'Base', 'Optimism'],
    contractAddresses: [
      { blockchain: 'Ethereum', address: '0x0000000000000000000000000000000000000000' }
    ],
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
    description: 'NFT marketplace and protocol for creators to mint and sell NFTs',
    tokenPurpose: 'Platform utility (no token launched)',
    totalSupply: 'N/A'
  }
];

export default NFT_MARKETPLACE_CURRENCIES;
