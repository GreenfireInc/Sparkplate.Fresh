/**
 * NY Exchange Offerings - bitStamp Index - Cryptocurrencies available on bitStamp NY Exchange
 * 
 * This list contains cryptocurrencies that are available for trading on bitStamp's
 * New York State cryptocurrency exchange. These offerings represent a curated selection
 * of digital assets that have been approved for trading in New York State through
 * bitStamp's platform.
 * 
 * This index is used for NY exchange-specific displays, bitStamp integration features,
 * and regulatory-compliant currency selection interfaces.
 * 
 * Last Updated: December 2025
 * Regulatory Body: New York State Department of Financial Services (NYDFS)
 */

export type CurrencyType = 'coin' | 'token';
export type ConsensusType = 'proof-of-stake' | 'proof-of-work' | 'proof-of-authority' | 'delegated-proof-of-stake' | 'nominated-proof-of-stake' | 'liquid-proof-of-stake' | 'byzantine-fault-tolerance' | 'proof-of-transfer' | 'token' | 'hybrid' | 'optimistic-rollup';
export type CurrencyClass = 'layer-1' | 'layer-2' | 'defi' | 'dex' | 'nft' | 'gaming' | 'metaverse' | 'oracle' | 'privacy' | 'meme' | 'staking' | 'governance' | 'lending' | 'data' | 'infrastructure' | 'smart-contract-platform' | 'exchange-token' | 'ai' | 'storage' | 'payment' | 'social' | 'interoperability';

export interface NYExchangeOfferingsBitStampItem {
  id: string;
  symbol: string;
  name: string;
  description: string;
  ucid: number;
  type: CurrencyType;
  consensusType: ConsensusType;
  class: CurrencyClass[];
  website: string | null;
  github: string | null;
  npm: string | null;
}

export const NY_EXCHANGE_OFFERINGS_BITSTAMP: NYExchangeOfferingsBitStampItem[] = [
  { 
    id: '0x', 
    symbol: 'ZRX', 
    name: '0x Protocol',
    description: 'An open protocol for decentralized exchange of tokens on the Ethereum blockchain.',
    ucid: 1896,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    website: 'https://0x.org',
    github: 'https://github.com/0xProject',
    npm: 'https://www.npmjs.com/package/@0x/contract-wrappers'
  },
  { 
    id: 'aave', 
    symbol: 'AAVE', 
    name: 'AAVE',
    description: 'A decentralized lending protocol that allows users to lend and borrow cryptocurrencies without intermediaries.',
    ucid: 7278,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'lending', 'governance'],
    website: 'https://aave.com',
    github: 'https://github.com/aave',
    npm: 'https://www.npmjs.com/package/@aave/protocol-js'
  },
  { 
    id: 'cardano', 
    symbol: 'ADA', 
    name: 'Cardano',
    description: 'A proof-of-stake blockchain platform focused on sustainability, scalability, and transparent governance for decentralized applications.',
    ucid: 2010,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    website: 'https://cardano.org',
    github: 'https://github.com/input-output-hk/cardano-node',
    npm: 'https://www.npmjs.com/package/cardano-serialization-lib'
  },
  { 
    id: 'algorand', 
    symbol: 'ALGO', 
    name: 'Algorand',
    description: 'A pure proof-of-stake blockchain platform designed for speed, security, and decentralization with instant finality.',
    ucid: 4030,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    website: 'https://algorand.com',
    github: 'https://github.com/algorand',
    npm: 'https://www.npmjs.com/package/algosdk'
  },
  { 
    id: 'apecoin', 
    symbol: 'APE', 
    name: 'ApeCoin',
    description: 'The governance and utility token for the APE ecosystem, supporting NFT projects like Bored Ape Yacht Club.',
    ucid: 18876,
    type: 'token',
    consensusType: 'token',
    class: ['governance', 'nft', 'metaverse'],
    website: 'https://apecoin.com',
    github: 'https://github.com/ApeCoinDAO',
    npm: null
  },
  { 
    id: 'arbitrum', 
    symbol: 'ARB', 
    name: 'Arbitrum',
    description: 'A layer-2 scaling solution for Ethereum using optimistic rollups to increase throughput and reduce costs.',
    ucid: 11841,
    type: 'token',
    consensusType: 'optimistic-rollup',
    class: ['layer-2', 'infrastructure'],
    website: 'https://arbitrum.io',
    github: 'https://github.com/OffchainLabs',
    npm: 'https://www.npmjs.com/package/@arbitrum/sdk'
  },
  { 
    id: 'avalanche-2', 
    symbol: 'AVAX', 
    name: 'Avalanche',
    description: 'A high-performance blockchain platform for decentralized applications and custom blockchain networks.',
    ucid: 5805,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    website: 'https://www.avax.network',
    github: 'https://github.com/ava-labs',
    npm: 'https://www.npmjs.com/package/avalanche'
  },
  { 
    id: 'basic-attention-token', 
    symbol: 'BAT', 
    name: 'Basic Attention Token',
    description: 'A utility token used within the Brave browser ecosystem to reward users for viewing ads and content creators.',
    ucid: 1697,
    type: 'token',
    consensusType: 'token',
    class: ['payment', 'social'],
    website: 'https://basicattentiontoken.org',
    github: 'https://github.com/brave-intl',
    npm: null
  },
  { 
    id: 'bitcoin-cash', 
    symbol: 'BCH', 
    name: 'Bitcoin Cash',
    description: 'A peer-to-peer electronic cash system forked from Bitcoin with larger block sizes for faster transactions.',
    ucid: 1831,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['layer-1', 'payment'],
    website: 'https://bitcoincash.org',
    github: 'https://github.com/bitcoin-cash-node',
    npm: null
  },
  { 
    id: 'bonk', 
    symbol: 'BONK', 
    name: 'Bonk',
    description: 'A community-driven meme cryptocurrency on Solana featuring a Shiba Inu dog mascot.',
    ucid: 23095,
    type: 'token',
    consensusType: 'token',
    class: ['meme'],
    website: 'https://bonkcoin.com',
    github: null,
    npm: null
  },
  { 
    id: 'bitcoin', 
    symbol: 'BTC', 
    name: 'Bitcoin',
    description: 'The first decentralized cryptocurrency, serving as digital gold and a peer-to-peer electronic cash system.',
    ucid: 1,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['layer-1', 'payment'],
    website: 'https://bitcoin.org',
    github: 'https://github.com/bitcoin',
    npm: 'https://www.npmjs.com/package/bitcoinjs-lib'
  },
  { 
    id: 'compound-governance-token', 
    symbol: 'COMP', 
    name: 'Compound',
    description: 'A governance token for the Compound protocol, an algorithmic money market on Ethereum.',
    ucid: 5692,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'lending', 'governance'],
    website: 'https://compound.finance',
    github: 'https://github.com/compound-finance',
    npm: 'https://www.npmjs.com/package/@compound-finance/compound-js'
  },
  { 
    id: 'curve-dao-token', 
    symbol: 'CRV', 
    name: 'Curve',
    description: 'The governance token for Curve Finance, a decentralized exchange optimized for stablecoin trading.',
    ucid: 6538,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'governance'],
    website: 'https://curve.fi',
    github: 'https://github.com/curvefi',
    npm: null
  },
  { 
    id: 'dai', 
    symbol: 'DAI', 
    name: 'DAI',
    description: 'A decentralized stablecoin soft-pegged to the US dollar and backed by crypto collateral on MakerDAO.',
    ucid: 2308,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'lending'],
    website: 'https://makerdao.com',
    github: 'https://github.com/makerdao',
    npm: 'https://www.npmjs.com/package/@makerdao/dai'
  },
  { 
    id: 'dogecoin', 
    symbol: 'DOGE', 
    name: 'Dogecoin',
    description: 'A peer-to-peer cryptocurrency created as a fun, community-driven alternative to Bitcoin.',
    ucid: 74,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['layer-1', 'payment', 'meme'],
    website: 'https://dogecoin.com',
    github: 'https://github.com/dogecoin',
    npm: null
  },
  { 
    id: 'polkadot', 
    symbol: 'DOT', 
    name: 'Polkadot',
    description: 'A multi-chain protocol enabling diverse blockchains to transfer messages and value in a trust-free fashion.',
    ucid: 6636,
    type: 'coin',
    consensusType: 'nominated-proof-of-stake',
    class: ['layer-1', 'interoperability'],
    website: 'https://polkadot.network',
    github: 'https://github.com/paritytech/polkadot',
    npm: 'https://www.npmjs.com/package/@polkadot/api'
  },
  { 
    id: 'ethena', 
    symbol: 'ENA', 
    name: 'Ethena',
    description: 'A synthetic dollar protocol providing a crypto-native solution for money on Ethereum.',
    ucid: 28861,
    type: 'token',
    consensusType: 'token',
    class: ['defi'],
    website: 'https://ethena.fi',
    github: 'https://github.com/ethena-labs',
    npm: null
  },
  { 
    id: 'enjincoin', 
    symbol: 'ENJ', 
    name: 'Enjin Coin',
    description: 'A cryptocurrency for gaming, enabling developers to tokenize in-game items on the blockchain.',
    ucid: 2130,
    type: 'token',
    consensusType: 'token',
    class: ['gaming', 'nft'],
    website: 'https://enjin.io',
    github: 'https://github.com/enjin',
    npm: 'https://www.npmjs.com/package/@enjin/sdk'
  },
  { 
    id: 'ethereum', 
    symbol: 'ETH', 
    name: 'Ethereum',
    description: 'A decentralized platform enabling smart contracts and distributed applications with its native currency Ether.',
    ucid: 1027,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    website: 'https://ethereum.org',
    github: 'https://github.com/ethereum',
    npm: 'https://www.npmjs.com/package/ethers'
  },
  { 
    id: 'fantom', 
    symbol: 'FTM', 
    name: 'Fantom',
    description: 'A fast, scalable, and secure smart contract platform using directed acyclic graph (DAG) technology.',
    ucid: 3513,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    website: 'https://fantom.foundation',
    github: 'https://github.com/Fantom-Foundation',
    npm: null
  },
  { 
    id: 'the-graph', 
    symbol: 'GRT', 
    name: 'Graph, The',
    description: 'A decentralized protocol for indexing and querying blockchain data, making it easily accessible.',
    ucid: 6719,
    type: 'token',
    consensusType: 'token',
    class: ['data', 'infrastructure'],
    website: 'https://thegraph.com',
    github: 'https://github.com/graphprotocol',
    npm: 'https://www.npmjs.com/package/@graphprotocol/graph-cli'
  },
  { 
    id: 'gyen', 
    symbol: 'GYEN', 
    name: 'GYEN',
    description: 'A Japanese yen-backed stablecoin issued by GMO-Z.com Trust Company, pegged 1:1 to JPY.',
    ucid: 8242,
    type: 'token',
    consensusType: 'token',
    class: ['defi'],
    website: 'https://www.gmo-z.com/global/gyen',
    github: null,
    npm: null
  },
  { 
    id: 'hedera-hashgraph', 
    symbol: 'HBAR', 
    name: 'Hedera',
    description: 'A distributed ledger technology using hashgraph consensus for fast, fair, and secure transactions.',
    ucid: 4642,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'infrastructure'],
    website: 'https://hedera.com',
    github: 'https://github.com/hashgraph',
    npm: 'https://www.npmjs.com/package/@hashgraph/sdk'
  },
  { 
    id: 'chainlink', 
    symbol: 'LINK', 
    name: 'Chainlink',
    description: 'A decentralized oracle network providing real-world data to smart contracts on any blockchain.',
    ucid: 1975,
    type: 'token',
    consensusType: 'token',
    class: ['oracle', 'infrastructure'],
    website: 'https://chain.link',
    github: 'https://github.com/smartcontractkit',
    npm: 'https://www.npmjs.com/package/@chainlink/contracts'
  },
  { 
    id: 'litecoin', 
    symbol: 'LTC', 
    name: 'Litecoin',
    description: 'A peer-to-peer cryptocurrency created as the "silver to Bitcoin\'s gold" with faster block times.',
    ucid: 2,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['layer-1', 'payment'],
    website: 'https://litecoin.org',
    github: 'https://github.com/litecoin-project',
    npm: null
  },
  { 
    id: 'maker', 
    symbol: 'MKR', 
    name: 'Maker',
    description: 'The governance token of MakerDAO, a decentralized organization managing the DAI stablecoin.',
    ucid: 1518,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'governance'],
    website: 'https://makerdao.com',
    github: 'https://github.com/makerdao',
    npm: 'https://www.npmjs.com/package/@makerdao/dai'
  },
  { 
    id: 'near', 
    symbol: 'NEAR', 
    name: 'NEAR Protocol',
    description: 'A sharded proof-of-stake blockchain designed for usability and scalability with simple onboarding.',
    ucid: 6535,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    website: 'https://near.org',
    github: 'https://github.com/near',
    npm: 'https://www.npmjs.com/package/near-api-js'
  },
  { 
    id: 'optimism', 
    symbol: 'OP', 
    name: 'Optimism',
    description: 'An Ethereum layer-2 scaling solution using optimistic rollups to reduce costs and increase throughput.',
    ucid: 11840,
    type: 'token',
    consensusType: 'optimistic-rollup',
    class: ['layer-2', 'infrastructure'],
    website: 'https://optimism.io',
    github: 'https://github.com/ethereum-optimism',
    npm: 'https://www.npmjs.com/package/@eth-optimism/sdk'
  },
  { 
    id: 'pepe', 
    symbol: 'PEPE', 
    name: 'Pepe',
    description: 'A meme cryptocurrency inspired by the Pepe the Frog internet meme.',
    ucid: 24478,
    type: 'token',
    consensusType: 'token',
    class: ['meme'],
    website: 'https://www.pepe.vip',
    github: null,
    npm: null
  },
  { 
    id: 'polygon-ecosystem-token', 
    symbol: 'POL', 
    name: 'Polygon Ecosystem Token',
    description: 'The upgraded native token of the Polygon network, successor to MATIC.',
    ucid: 11419,
    type: 'token',
    consensusType: 'proof-of-stake',
    class: ['layer-2', 'infrastructure'],
    website: 'https://polygon.technology',
    github: 'https://github.com/maticnetwork',
    npm: 'https://www.npmjs.com/package/@polygon/sdk'
  },
  { 
    id: 'ripple-usd', 
    symbol: 'RLUSD', 
    name: 'Ripple USD',
    description: 'A US dollar-backed stablecoin issued by Ripple, designed for enterprise payments and settlements.',
    ucid: 33880,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'payment'],
    website: 'https://ripple.com/solutions/cryptocurrency',
    github: null,
    npm: null
  },
  { 
    id: 'sei-network', 
    symbol: 'SEI', 
    name: 'SEI',
    description: 'A layer-1 blockchain optimized for trading and DeFi applications with high throughput.',
    ucid: 23149,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'defi', 'dex'],
    website: 'https://sei.io',
    github: 'https://github.com/sei-protocol',
    npm: null
  },
  { 
    id: 'shiba-inu', 
    symbol: 'SHIB', 
    name: 'Shiba Inu',
    description: 'A meme cryptocurrency and decentralized ecosystem with DEX, NFTs, and metaverse components.',
    ucid: 5994,
    type: 'token',
    consensusType: 'token',
    class: ['meme', 'defi'],
    website: 'https://shibatoken.com',
    github: 'https://github.com/shytoshikusama',
    npm: null
  },
  { 
    id: 'solana', 
    symbol: 'SOL', 
    name: 'Solana',
    description: 'A high-performance blockchain supporting fast transactions and low fees through proof-of-history.',
    ucid: 5426,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    website: 'https://solana.com',
    github: 'https://github.com/solana-labs',
    npm: 'https://www.npmjs.com/package/@solana/web3.js'
  },
  { 
    id: 'sui', 
    symbol: 'SUI', 
    name: 'Sui',
    description: 'A layer-1 blockchain built with the Move programming language for fast, scalable applications.',
    ucid: 20947,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    website: 'https://sui.io',
    github: 'https://github.com/MystenLabs',
    npm: 'https://www.npmjs.com/package/@mysten/sui.js'
  },
  { 
    id: 'maple-finance', 
    symbol: 'SYRUP', 
    name: 'Maple Finance',
    description: 'A decentralized corporate credit market providing capital markets infrastructure for institutions.',
    ucid: 8438,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'lending'],
    website: 'https://maple.finance',
    github: 'https://github.com/maple-labs',
    npm: null
  },
  { 
    id: 'uniswap', 
    symbol: 'UNI', 
    name: 'Uniswap',
    description: 'A leading decentralized exchange protocol built on Ethereum using automated market making.',
    ucid: 7083,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex', 'governance'],
    website: 'https://uniswap.org',
    github: 'https://github.com/Uniswap',
    npm: 'https://www.npmjs.com/package/@uniswap/sdk'
  },
  { 
    id: 'usd-coin', 
    symbol: 'USDC', 
    name: 'USDC',
    description: 'A fully-backed USD stablecoin issued by Circle and regulated for transparency and trust.',
    ucid: 3408,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'payment'],
    website: 'https://www.circle.com/usdc',
    github: 'https://github.com/circlefin',
    npm: null
  },
  { 
    id: 'dogwifcoin', 
    symbol: 'WIF', 
    name: 'dogwifhat',
    description: 'A Solana-based meme cryptocurrency featuring a dog wearing a hat.',
    ucid: 28752,
    type: 'token',
    consensusType: 'token',
    class: ['meme'],
    website: 'https://dogwifcoin.org',
    github: null,
    npm: null
  },
  { 
    id: 'chain', 
    symbol: 'XCN', 
    name: 'Onyxcoin',
    description: 'A blockchain platform formerly known as Chain, focused on financial services infrastructure.',
    ucid: 14783,
    type: 'token',
    consensusType: 'token',
    class: ['infrastructure', 'payment'],
    website: 'https://chain.com',
    github: 'https://github.com/chain',
    npm: null
  },
  { 
    id: 'stellar', 
    symbol: 'XLM', 
    name: 'Stellar Lumens',
    description: 'An open network for storing and moving money, designed for fast, low-cost cross-border payments.',
    ucid: 512,
    type: 'coin',
    consensusType: 'byzantine-fault-tolerance',
    class: ['layer-1', 'payment'],
    website: 'https://stellar.org',
    github: 'https://github.com/stellar',
    npm: 'https://www.npmjs.com/package/@stellar/stellar-sdk'
  },
  { 
    id: 'ripple', 
    symbol: 'XRP', 
    name: 'XRP',
    description: 'A digital payment protocol and cryptocurrency designed for fast, low-cost international money transfers.',
    ucid: 52,
    type: 'coin',
    consensusType: 'byzantine-fault-tolerance',
    class: ['layer-1', 'payment'],
    website: 'https://ripple.com',
    github: 'https://github.com/ripple',
    npm: 'https://www.npmjs.com/package/xrpl'
  },
  { 
    id: 'yearn-finance', 
    symbol: 'YFI', 
    name: 'Yearn Finance',
    description: 'A DeFi yield aggregator that automatically moves funds between lending protocols for optimal returns.',
    ucid: 5864,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'governance'],
    website: 'https://yearn.finance',
    github: 'https://github.com/yearn',
    npm: 'https://www.npmjs.com/package/@yfi/sdk'
  },
  { 
    id: 'zusd', 
    symbol: 'ZUSD', 
    name: 'ZUSD',
    description: 'A decentralized stablecoin protocol offering yield-bearing USD-pegged tokens.',
    ucid: 12979,
    type: 'token',
    consensusType: 'token',
    class: ['defi'],
    website: 'https://zerolend.xyz',
    github: null,
    npm: null
  }
];

export default NY_EXCHANGE_OFFERINGS_BITSTAMP;

