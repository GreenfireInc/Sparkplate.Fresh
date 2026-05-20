// StackSwap DEX Information
// First AMM on Stacks
// Source: Research compiled from Oct14.Research.Cryptocurrency.STX.Stacks

export const stackswapDEX = {
  name: "StackSwap",
  blockchain: "Stacks (STX)",
  type: "AMM DEX",
  description: "The first automated market maker (AMM) DEX on Stacks, pioneering DeFi on Bitcoin. StackSwap enables token swaps, liquidity provision, and yield farming on the Bitcoin Layer 2.",
  
  urls: {
    main: "https://www.stackswap.org/",
    app: "https://app.stackswap.org/",
    pools: "https://app.stackswap.org/pools",
    docs: "https://docs.stackswap.org/",
  },
  
  api: {
    endpoints: {
      stacksApi: "https://api.mainnet.stacks.co/",
      contractRead: "Stacks Blockchain API for contract queries",
    },
    documentation: "https://docs.stackswap.org/",
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
      documentation: "https://docs.stackswap.org/",
    },
  },
  
  integration: {
    example: `
import { callReadOnlyFunction } from '@stacks/transactions';
import { StacksMainnet } from '@stacks/network';

// Get StackSwap pool reserves
async function getStackSwapPool(tokenA: string, tokenB: string) {
  const network = new StacksMainnet();
  
  const result = await callReadOnlyFunction({
    network,
    contractAddress: 'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9',
    contractName: 'stackswap-swap-v5k',
    functionName: 'get-pool',
    functionArgs: [],
    senderAddress: 'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9',
  });
  
  console.log('StackSwap Pool:', result);
  
  return result;
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/StackSwap_STX",
    discord: "https://discord.gg/stackswap",
    telegram: "https://t.me/stackswap",
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
    isFirstOnStacks: true,
    inheritsFromBitcoin: true,
    tvl: "$20+ million",
    volume24h: "$5+ million",
  },
  
  notes: [
    "StackSwap was the first AMM DEX on Stacks",
    "Pioneer in bringing DeFi to Bitcoin",
    "Simple and user-friendly interface",
    "STSW token for governance",
    "Liquidity mining rewards",
    "Built on Clarity smart contracts",
    "Inherits Bitcoin security",
    "Community-driven development",
  ],
};
