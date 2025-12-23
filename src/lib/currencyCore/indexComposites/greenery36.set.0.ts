/**
 * Greenery 36 Set 0 - Curated list of 36 cryptocurrencies
 * 
 * This list contains a curated selection of cryptocurrencies commonly
 * used in the application. The list is based on CoinGecko identifiers
 * and includes major digital assets across various blockchain networks.
 * 
 * Last Updated: December 2025
 */

export type CurrencyType = 'coin' | 'token';
export type ConsensusType = 'proof-of-stake' | 'proof-of-work' | 'proof-of-authority' | 'delegated-proof-of-stake' | 'nominated-proof-of-stake' | 'liquid-proof-of-stake' | 'byzantine-fault-tolerance' | 'proof-of-transfer' | 'proof-of-coverage' | 'token' | 'hybrid' | 'optimistic-rollup';
export type CurrencyClass = 'layer-1' | 'layer-2' | 'defi' | 'dex' | 'nft' | 'gaming' | 'metaverse' | 'oracle' | 'privacy' | 'meme' | 'staking' | 'governance' | 'lending' | 'data' | 'infrastructure' | 'smart-contract-platform' | 'exchange-token' | 'ai' | 'storage' | 'payment' | 'social' | 'interoperability' | 'sports' | 'iot';

export interface Greenery36Set0Item {
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

export const GREENERY36_SET0: Greenery36Set0Item[] = [
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
    id: 'arweave', 
    symbol: 'AR', 
    name: 'Arweave',
    description: 'A decentralized storage network offering permanent, low-cost data storage with a pay-once, store-forever model.',
    ucid: 5632,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['storage', 'layer-1'],
    website: 'https://arweave.org',
    github: 'https://github.com/ArweaveTeam',
    npm: 'https://www.npmjs.com/package/arweave'
  },
  { 
    id: 'cosmos', 
    symbol: 'ATOM', 
    name: 'Cosmos',
    description: 'An ecosystem of interconnected blockchains designed to solve scalability and interoperability issues.',
    ucid: 3794,
    type: 'coin',
    consensusType: 'byzantine-fault-tolerance',
    class: ['layer-1', 'interoperability'],
    website: 'https://cosmos.network',
    github: 'https://github.com/cosmos',
    npm: 'https://www.npmjs.com/package/@cosmjs/stargate'
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
    id: 'binancecoin', 
    symbol: 'BNB', 
    name: 'Binance',
    description: 'The native cryptocurrency of BNB Chain (formerly Binance Smart Chain), used for transaction fees and DeFi applications.',
    ucid: 1839,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'exchange-token', 'smart-contract-platform'],
    website: 'https://www.bnbchain.org',
    github: 'https://github.com/bnb-chain',
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
    id: 'dash', 
    symbol: 'DASH', 
    name: 'Dash',
    description: 'A privacy-focused cryptocurrency featuring instant transactions and a two-tier masternode network.',
    ucid: 131,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['layer-1', 'payment', 'privacy'],
    website: 'https://www.dash.org',
    github: 'https://github.com/dashpay',
    npm: null
  },
  { 
    id: 'digibyte', 
    symbol: 'DGB', 
    name: 'Digibyte',
    description: 'A fast, secure blockchain focused on cybersecurity and digital payments with multiple mining algorithms.',
    ucid: 109,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['layer-1', 'payment'],
    website: 'https://digibyte.org',
    github: 'https://github.com/DigiByte-Core',
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
    id: 'filecoin', 
    symbol: 'FIL', 
    name: 'Filecoin',
    description: 'A decentralized storage network turning cloud storage into an algorithmic market.',
    ucid: 2280,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['storage', 'layer-1'],
    website: 'https://filecoin.io',
    github: 'https://github.com/filecoin-project',
    npm: 'https://www.npmjs.com/package/@glif/filecoin-rpc-client'
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
    id: 'hedera-hashgraph', 
    symbol: 'HBAR', 
    name: 'Hedera Hashgraph',
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
    id: 'internet-computer', 
    symbol: 'ICP', 
    name: 'Internet Computer',
    description: 'A blockchain network designed to extend the internet with decentralized computing capabilities.',
    ucid: 8916,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'infrastructure'],
    website: 'https://internetcomputer.org',
    github: 'https://github.com/dfinity',
    npm: 'https://www.npmjs.com/package/@dfinity/agent'
  },
  { 
    id: 'kusama', 
    symbol: 'KSM', 
    name: 'Kusama',
    description: 'A scalable network of specialized blockchains built using Substrate, serving as Polkadot\'s canary network.',
    ucid: 5034,
    type: 'coin',
    consensusType: 'nominated-proof-of-stake',
    class: ['layer-1', 'interoperability'],
    website: 'https://kusama.network',
    github: 'https://github.com/paritytech/polkadot',
    npm: 'https://www.npmjs.com/package/@polkadot/api'
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
    id: 'terra-luna', 
    symbol: 'LUNA', 
    name: 'Terra',
    description: 'The native token of Terra 2.0 blockchain, rebuilt after the Terra Classic collapse.',
    ucid: 20314,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    website: 'https://terra.money',
    github: 'https://github.com/terra-money',
    npm: 'https://www.npmjs.com/package/@terra-money/terra.js'
  },
  { 
    id: 'terra-luna-2', 
    symbol: 'LUNC', 
    name: 'Terra Classic',
    description: 'The original Terra blockchain token, now known as Terra Classic after the network split.',
    ucid: 4172,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    website: 'https://terra.money',
    github: 'https://github.com/classic-terra',
    npm: null
  },
  { 
    id: 'neo', 
    symbol: 'NEO', 
    name: 'NEO',
    description: 'A blockchain platform for building decentralized applications with digital assets and smart contracts.',
    ucid: 1376,
    type: 'coin',
    consensusType: 'byzantine-fault-tolerance',
    class: ['layer-1', 'smart-contract-platform'],
    website: 'https://neo.org',
    github: 'https://github.com/neo-project',
    npm: 'https://www.npmjs.com/package/@cityofzion/neon-js'
  },
  { 
    id: 'reddcoin', 
    symbol: 'RDD', 
    name: 'Reddcoin',
    description: 'A social cryptocurrency for tipping and microtransactions on social media platforms.',
    ucid: 118,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['social', 'payment'],
    website: 'https://reddcoin.com',
    github: 'https://github.com/reddcoin-project',
    npm: null
  },
  { 
    id: 'ravencoin', 
    symbol: 'RVN', 
    name: 'Ravencoin',
    description: 'A blockchain designed for efficient creation and transfer of digital assets from one party to another.',
    ucid: 2577,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['layer-1', 'nft'],
    website: 'https://ravencoin.org',
    github: 'https://github.com/RavenProject',
    npm: null
  },
  { 
    id: 'siacoin', 
    symbol: 'SC', 
    name: 'Siacoin',
    description: 'A decentralized cloud storage platform that encrypts and distributes files across a decentralized network.',
    ucid: 1042,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['storage', 'layer-1'],
    website: 'https://sia.tech',
    github: 'https://github.com/SiaFoundation',
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
    id: 'blockstack', 
    symbol: 'STX', 
    name: 'Stacks',
    description: 'A layer-1 blockchain that brings smart contracts and dApps to Bitcoin.',
    ucid: 4847,
    type: 'coin',
    consensusType: 'proof-of-transfer',
    class: ['layer-1', 'smart-contract-platform'],
    website: 'https://stacks.co',
    github: 'https://github.com/stacks-network',
    npm: 'https://www.npmjs.com/package/@stacks/transactions'
  },
  { 
    id: 'tron', 
    symbol: 'TRX', 
    name: 'Tron',
    description: 'A blockchain platform focused on content sharing and entertainment with high throughput.',
    ucid: 1958,
    type: 'coin',
    consensusType: 'delegated-proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    website: 'https://tron.network',
    github: 'https://github.com/tronprotocol',
    npm: 'https://www.npmjs.com/package/tronweb'
  },
  { 
    id: 'vechain', 
    symbol: 'VET', 
    name: 'VeChain',
    description: 'An enterprise-grade blockchain platform focused on supply chain management and business processes.',
    ucid: 3077,
    type: 'coin',
    consensusType: 'proof-of-authority',
    class: ['layer-1', 'infrastructure'],
    website: 'https://vechain.org',
    github: 'https://github.com/vechain',
    npm: 'https://www.npmjs.com/package/@vechain/connex'
  },
  { 
    id: 'waves', 
    symbol: 'WAVES', 
    name: 'Waves',
    description: 'A multi-purpose blockchain platform for custom tokens, smart contracts, and decentralized applications.',
    ucid: 1274,
    type: 'coin',
    consensusType: 'proof-of-stake',
    class: ['layer-1', 'smart-contract-platform'],
    website: 'https://waves.tech',
    github: 'https://github.com/wavesplatform',
    npm: 'https://www.npmjs.com/package/@waves/waves-transactions'
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
    name: 'Ripple',
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
  },
  { 
    id: 'verge', 
    symbol: 'XVG', 
    name: 'Verge',
    description: 'A privacy-focused cryptocurrency using Tor and I2P for anonymous transactions.',
    ucid: 693,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['layer-1', 'privacy', 'payment'],
    website: 'https://vergecurrency.com',
    github: 'https://github.com/vergecurrency',
    npm: null
  },
  { 
    id: 'zilliqa', 
    symbol: 'ZIL', 
    name: 'Zilliqa',
    description: 'A high-throughput blockchain platform using sharding to scale securely for enterprise applications.',
    ucid: 2469,
    type: 'coin',
    consensusType: 'proof-of-work',
    class: ['layer-1', 'smart-contract-platform'],
    website: 'https://zilliqa.com',
    github: 'https://github.com/Zilliqa',
    npm: 'https://www.npmjs.com/package/@zilliqa-js/zilliqa'
  }
];

export default GREENERY36_SET0;

