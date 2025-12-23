/**
 * NY Exchange Offerings - Robinhood Index - Cryptocurrencies available on Robinhood NY Exchange
 * 
 * This list contains cryptocurrencies that are available for trading on Robinhood's
 * New York State cryptocurrency exchange. These offerings represent a curated selection
 * of digital assets that have been approved for trading in New York State through
 * Robinhood's platform.
 * 
 * This index is used for NY exchange-specific displays, Robinhood integration features,
 * and regulatory-compliant currency selection interfaces.
 * 
 * Last Updated: December 2025
 * Regulatory Body: New York State Department of Financial Services (NYDFS)
 */

export type CurrencyType = 'coin' | 'token';
export type ConsensusType = 'proof-of-stake' | 'proof-of-work' | 'proof-of-authority' | 'delegated-proof-of-stake' | 'nominated-proof-of-stake' | 'liquid-proof-of-stake' | 'byzantine-fault-tolerance' | 'proof-of-transfer' | 'token' | 'hybrid' | 'optimistic-rollup';
export type CurrencyClass = 'layer-1' | 'layer-2' | 'defi' | 'dex' | 'nft' | 'gaming' | 'metaverse' | 'oracle' | 'privacy' | 'meme' | 'staking' | 'governance' | 'lending' | 'data' | 'infrastructure' | 'smart-contract-platform' | 'exchange-token' | 'ai' | 'storage' | 'payment' | 'social' | 'interoperability';

export interface NYExchangeOfferingsRobinhoodItem {
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

export const NY_EXCHANGE_OFFERINGS_ROBINHOOD: NYExchangeOfferingsRobinhoodItem[] = [
  { 
    id: 'aave', 
    symbol: 'AAVE', 
    name: 'Aave',
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
    id: 'aerodrome-finance', 
    symbol: 'AERO', 
    name: 'Aerodrome',
    description: 'A next-generation AMM designed to serve as the central liquidity hub on Base network.',
    ucid: 29270,
    type: 'token',
    consensusType: 'token',
    class: ['defi', 'dex'],
    website: 'https://aerodrome.finance',
    github: 'https://github.com/aerodrome-finance',
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
    name: 'BONK',
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
    name: 'Curve DAO',
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
    id: 'ethereum-classic', 
    symbol: 'ETC', 
    name: 'Ethereum Classic',
    description: 'The original Ethereum blockchain maintaining immutability and proof-of-work consensus.',
    ucid: 1321,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['layer-1', 'smart-contract-platform'],
    website: 'https://ethereumclassic.org',
    github: 'https://github.com/ethereumclassic',
    npm: null
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
    name: 'SUI',
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
    id: 'virtual-protocol', 
    symbol: 'VIRTUAL', 
    name: 'Virtuals Protocol',
    description: 'A protocol for creating AI agents in virtual worlds and gaming metaverse environments.',
    ucid: 33675,
    type: 'token',
    consensusType: 'token',
    class: ['ai', 'gaming', 'metaverse'],
    website: 'https://www.virtuals.io',
    github: null,
    npm: null
  },
  { 
    id: 'dogwifcoin', 
    symbol: 'WIF', 
    name: 'Dogwifhat',
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
    id: 'stellar', 
    symbol: 'XLM', 
    name: 'Stellar',
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
    id: 'tezos', 
    symbol: 'XTZ', 
    name: 'Tezos',
    description: 'A self-amending blockchain with on-chain governance and formal verification for smart contracts.',
    ucid: 2011,
    type: 'coin',
    consensusType: 'liquid-proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    website: 'https://tezos.com',
    github: 'https://github.com/tezos',
    npm: 'https://www.npmjs.com/package/@taquito/taquito'
  }
];

export default NY_EXCHANGE_OFFERINGS_ROBINHOOD;

