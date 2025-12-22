// Bancor DEX Information
// Single-sided liquidity AMM with impermanent loss protection
// Source: Research compiled from Oct14.Research.Cryptocurrency.ETH.Ethereum

export const bancorDEX = {
  name: "Bancor",
  blockchain: "Ethereum",
  type: "Single-Sided Liquidity AMM",
  description: "DEX with impermanent loss protection and single-sided liquidity provision. Bancor allows users to provide liquidity with only one token while earning from both sides of the pool.",
  
  urls: {
    main: "https://bancor.network/",
    app: "https://app.bancor.network/",
    docs: "https://docs.bancor.network/",
  },
  
  api: {
    endpoints: {
      ethRpc: "https://eth-mainnet.alchemyapi.io/v2/YOUR_KEY",
    },
    documentation: "https://docs.bancor.network/",
    rateLimit: "Use Ethereum RPC",
    requiresApiKey: false,
  },
  
  contracts: {
    mainnet: {
      chainId: 1,
      network: "Check Bancor docs for current addresses",
    },
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "ethers.js",
          package: "ethers",
          description: "Ethereum library for smart contract interaction",
          installCommand: "npm install ethers",
        },
      ],
      documentation: "https://docs.bancor.network/",
    },
  },
  
  integration: {
    basicExample: `
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider('YOUR_RPC_URL');

// Bancor network contract
const bancorAddress = 'CHECK_BANCOR_DOCS';
const bancorABI = ['function convert(...) returns (uint256)'];

const bancor = new ethers.Contract(bancorAddress, bancorABI, provider);

// Query Bancor for conversion rate
console.log('Bancor integration - check official docs for latest contract addresses');
    `,
  },
  
  social: {
    twitter: "https://twitter.com/Bancor",
    telegram: "https://t.me/bancor",
    discord: "https://discord.gg/bancor",
    github: "https://github.com/bancorprotocol",
  },
  
  features: {
    hasApi: false,
    hasSdk: false,
    hasSubgraph: false,
    isActive: true,
    supportsCrossChain: false,
    hasLiquidityMining: true,
    isEvmCompatible: true,
    singleSidedLiquidity: true,
    impermanentLossProtection: true,
  },
  
  notes: [
    "Bancor offers impermanent loss protection",
    "Single-sided liquidity provision supported",
    "Automatic rebalancing of pools",
    "BNT token required for some features",
  ],
};
