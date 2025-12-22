// ALEX DEX Information
// Comprehensive DeFi platform on Stacks
// Source: Research compiled from Oct14.Research.Cryptocurrency.STX.Stacks

export const alexDEX = {
  name: "ALEX",
  blockchain: "Stacks (STX)",
  type: "DeFi Platform",
  description: "Comprehensive DeFi hub on Stacks featuring AMM, orderbook trading, lending, borrowing, and launchpad. ALEX brings advanced DeFi capabilities to Bitcoin through the Stacks Layer 2.",
  
  urls: {
    main: "https://alexgo.io/",
    app: "https://app.alexgo.io/",
    swap: "https://app.alexgo.io/swap",
    lending: "https://app.alexgo.io/lend",
    docs: "https://docs.alexgo.io/",
  },
  
  api: {
    endpoints: {
      pricing: "https://api.alexlab.co/v1/price",
      pools: "https://api.alexlab.co/v1/pools",
      stacksApi: "https://api.mainnet.stacks.co/",
    },
    documentation: "https://docs.alexgo.io/",
    apiReference: "https://docs.alexgo.io/developers/api",
    rateLimit: "Public API available",
    requiresApiKey: false,
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@alex-go/sdk",
          package: "@alex-go/sdk",
          description: "ALEX SDK for TypeScript integration",
          installCommand: "npm install @alex-go/sdk",
        },
        {
          name: "@stacks/transactions",
          package: "@stacks/transactions",
          description: "Stacks transactions library",
          installCommand: "npm install @stacks/transactions",
        },
        {
          name: "@stacks/network",
          package: "@stacks/network",
          description: "Stacks network configuration",
          installCommand: "npm install @stacks/network",
        },
      ],
      documentation: "https://docs.alexgo.io/",
    },
  },
  
  integration: {
    pricingExample: `
import axios from 'axios';

// Get STX price from ALEX API
async function getALEXPrice(token: string = 'STX') {
  const response = await axios.get(
    \`https://api.alexlab.co/v1/price?token=\${token}\`
  );
  
  console.log('ALEX Price:', response.data);
  console.log('STX Price: $', response.data.price);
  
  return response.data;
}

getALEXPrice('STX');
    `,
    
    contractExample: `
import { callReadOnlyFunction } from '@stacks/transactions';
import { StacksMainnet } from '@stacks/network';

// Read ALEX pool data
async function getALEXPoolData(poolId: string) {
  const network = new StacksMainnet();
  
  const result = await callReadOnlyFunction({
    network,
    contractAddress: 'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9',
    contractName: 'alex-vault',
    functionName: 'get-pool-details',
    functionArgs: [],
    senderAddress: 'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9',
  });
  
  console.log('ALEX Pool Data:', result);
  
  return result;
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/ALEXLabBTC",
    discord: "https://discord.gg/alexlab",
    telegram: "https://t.me/AlexCommunity",
    github: "https://github.com/alexgo-io",
  },
  
  features: {
    hasApi: true,
    hasSdk: true,
    hasSubgraph: false,
    hasGraphQL: false,
    isActive: true,
    supportsCrossChain: false,
    hasLiquidityMining: true,
    isEvmCompatible: false,
    isStacksVM: true,
    hasClarityContracts: true,
    hasAMM: true,
    hasOrderbook: true,
    hasLending: true,
    hasBorrowing: true,
    hasLaunchpad: true,
    inheritsFromBitcoin: true,
    tvl: "$100+ million",
    volume24h: "$20+ million",
  },
  
  notes: [
    "ALEX is the largest DeFi platform on Stacks",
    "Combines AMM and orderbook for optimal trading",
    "Lending and borrowing protocol integrated",
    "Launchpad for new Stacks projects",
    "ALEX token for governance and rewards",
    "Built on Clarity smart contracts",
    "Inherits Bitcoin security via Proof of Transfer",
    "First comprehensive DeFi hub on Bitcoin Layer 2",
  ],
};
