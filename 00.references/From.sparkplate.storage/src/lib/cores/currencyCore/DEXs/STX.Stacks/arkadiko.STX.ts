// Arkadiko Swap DEX Information
// DeFi protocol with stablecoin and AMM
// Source: Research compiled from Oct14.Research.Cryptocurrency.STX.Stacks

export const arkadikoSwapDEX = {
  name: "Arkadiko Swap",
  blockchain: "Stacks (STX)",
  type: "DeFi Protocol",
  description: "Comprehensive DeFi protocol featuring a decentralized stablecoin (USDA) and AMM swap functionality. Arkadiko provides stablecoin minting, borrowing, and token swaps on the Bitcoin Layer 2.",
  
  urls: {
    main: "https://arkadiko.finance/",
    app: "https://app.arkadiko.finance/",
    swap: "https://app.arkadiko.finance/swap",
    vaults: "https://app.arkadiko.finance/vaults",
    docs: "https://docs.arkadiko.finance/",
  },
  
  api: {
    endpoints: {
      stacksApi: "https://api.mainnet.stacks.co/",
      contractRead: "Stacks Blockchain API for Arkadiko contracts",
    },
    documentation: "https://docs.arkadiko.finance/",
    apiReference: "https://docs.hiro.so/api",
    rateLimit: "Public Stacks API available",
    requiresApiKey: false,
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@arkadiko-dao/arkadiko-sdk",
          package: "@arkadiko-dao/arkadiko-sdk",
          description: "Arkadiko SDK for protocol interactions",
          installCommand: "npm install @arkadiko-dao/arkadiko-sdk",
        },
        {
          name: "@stacks/transactions",
          package: "@stacks/transactions",
          description: "Stacks transactions library",
          installCommand: "npm install @stacks/transactions",
        },
      ],
      documentation: "https://docs.arkadiko.finance/",
    },
  },
  
  integration: {
    example: `
import { callReadOnlyFunction } from '@stacks/transactions';
import { StacksMainnet } from '@stacks/network';

// Get Arkadiko swap pair info
async function getArkadikoSwapPair(tokenA: string, tokenB: string) {
  const network = new StacksMainnet();
  
  const result = await callReadOnlyFunction({
    network,
    contractAddress: 'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR',
    contractName: 'arkadiko-swap-v2-1',
    functionName: 'get-pair-details',
    functionArgs: [],
    senderAddress: 'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR',
  });
  
  console.log('Arkadiko Pair:', result);
  
  return result;
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/ArkadikoFinance",
    discord: "https://discord.gg/arkadiko",
    telegram: "https://t.me/arkadikofinance",
    github: "https://github.com/arkadiko-dao",
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
    hasStablecoin: true, // USDA
    hasVaults: true,
    hasSwap: true,
    inheritsFromBitcoin: true,
    tvl: "$30+ million",
    volume24h: "$3+ million",
  },
  
  notes: [
    "Arkadiko pioneered decentralized stablecoins on Bitcoin",
    "USDA stablecoin backed by STX collateral",
    "AMM swap integrated with stablecoin minting",
    "Vault system for collateralized debt positions",
    "DIKO token for governance",
    "Self-repaying loans feature",
    "Built on Clarity smart contracts",
    "Key DeFi infrastructure on Stacks",
  ],
};
