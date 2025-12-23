/**
 * Greenery V1 Index - Core cryptocurrencies from Greenery reference implementation
 * 
 * This list contains 9 cryptocurrencies that form a core subset from the
 * Greenery reference implementation. These currencies have full wallet
 * functionality implemented and are commonly used for core operations.
 * 
 * Based on reference files: bnb.js, btc.js, doge.js, eth.js, ltc.js,
 * lunc.js, sol.js, xrp.js, xtz.js
 * 
 * Last Updated: December 2025
 */

export type CurrencyType = 'coin' | 'token';
export type ConsensusType = 'proof-of-stake' | 'proof-of-work' | 'proof-of-authority' | 'delegated-proof-of-stake' | 'nominated-proof-of-stake' | 'liquid-proof-of-stake' | 'byzantine-fault-tolerance' | 'proof-of-transfer' | 'proof-of-coverage' | 'token' | 'hybrid' | 'optimistic-rollup';
export type CurrencyClass = 'layer-1' | 'layer-2' | 'defi' | 'dex' | 'nft' | 'gaming' | 'metaverse' | 'oracle' | 'privacy' | 'meme' | 'staking' | 'governance' | 'lending' | 'data' | 'infrastructure' | 'smart-contract-platform' | 'exchange-token' | 'ai' | 'storage' | 'payment' | 'social' | 'interoperability' | 'sports' | 'iot';

export interface GreeneryV1Item {
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

export const GREENERY_V1: GreeneryV1Item[] = [
  { 
    id: 'binancecoin', 
    symbol: 'BNB', 
    name: 'Binance Coin',
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
  }
];

export default GREENERY_V1;

