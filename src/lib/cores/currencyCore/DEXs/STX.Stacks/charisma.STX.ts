// Charisma DEX Information
// Gamified DeFi platform on Stacks
// Source: Research compiled from Oct14.Research.Cryptocurrency.STX.Stacks

export const charismaDEX = {
  name: "Charisma",
  blockchain: "Stacks (STX)",
  type: "Gaming DEX",
  description: "Gamified DeFi platform combining token swaps, yield farming, and gaming mechanics. Charisma brings an innovative approach to DeFi with interactive experiences and community engagement on Bitcoin Layer 2.",
  
  urls: {
    main: "https://charisma.rocks/",
    app: "https://app.charisma.rocks/",
    swap: "https://app.charisma.rocks/swap",
    docs: "https://docs.charisma.rocks/",
  },
  
  api: {
    endpoints: {
      stacksApi: "https://api.mainnet.stacks.co/",
      contractRead: "Stacks Blockchain API for Charisma contracts",
    },
    documentation: "https://docs.charisma.rocks/",
    apiReference: "https://docs.hiro.so/api",
    rateLimit: "Public Stacks API available",
    requiresApiKey: false,
  },
  
  sdk: {
    typescript: {
      packages: [
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
      documentation: "https://docs.charisma.rocks/",
    },
  },
  
  integration: {
    example: `
import { callReadOnlyFunction } from '@stacks/transactions';
import { StacksMainnet } from '@stacks/network';

// Get Charisma token info
async function getCharismaTokenInfo(tokenId: string) {
  const network = new StacksMainnet();
  
  const result = await callReadOnlyFunction({
    network,
    contractAddress: 'SP2ZNGJ85ENDY6QRHQ5P2D4FXKGZWCKTB2T0Z55KS',
    contractName: 'charisma-token',
    functionName: 'get-token-info',
    functionArgs: [],
    senderAddress: 'SP2ZNGJ85ENDY6QRHQ5P2D4FXKGZWCKTB2T0Z55KS',
  });
  
  console.log('Charisma Token:', result);
  
  return result;
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/CharismaRocks",
    discord: "https://discord.gg/charisma",
    telegram: "https://t.me/charismarocks",
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
    hasGamification: true,
    hasNFTIntegration: true,
    hasCommunityGovernance: true,
    inheritsFromBitcoin: true,
    tvl: "$10+ million",
    volume24h: "$1+ million",
  },
  
  notes: [
    "Charisma brings gamification to DeFi",
    "Interactive trading and yield farming experiences",
    "NFT integration with DeFi mechanics",
    "Community-driven governance",
    "CHA token for platform utility",
    "Built on Clarity smart contracts",
    "Innovative approach to user engagement",
    "Growing ecosystem on Stacks",
  ],
};
