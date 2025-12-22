// Bitflow DEX Information
// Native Bitcoin DEX on Stacks
// Source: Research compiled from Oct14.Research.Cryptocurrency.STX.Stacks

export const bitflowDEX = {
  name: "Bitflow",
  blockchain: "Stacks (STX)",
  type: "Bitcoin DeFi",
  description: "Native Bitcoin DEX using UTXO-based swaps on Stacks. Bitflow enables direct Bitcoin trading and DeFi without wrapping, leveraging Stacks' connection to Bitcoin for true Bitcoin-native DeFi.",
  
  urls: {
    main: "https://www.bitflow.finance/",
    app: "https://app.bitflow.finance/",
    swap: "https://app.bitflow.finance/swap",
    docs: "https://docs.bitflow.finance/",
  },
  
  api: {
    endpoints: {
      stacksApi: "https://api.mainnet.stacks.co/",
      bitcoinApi: "Bitcoin RPC for UTXO queries",
    },
    documentation: "https://docs.bitflow.finance/",
    apiReference: "https://docs.hiro.so/api",
    rateLimit: "Public API available",
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
      documentation: "https://docs.bitflow.finance/",
    },
  },
  
  integration: {
    example: `
import { callReadOnlyFunction } from '@stacks/transactions';
import { StacksMainnet } from '@stacks/network';

// Get Bitflow pool info
async function getBitflowPool(poolId: string) {
  const network = new StacksMainnet();
  
  const result = await callReadOnlyFunction({
    network,
    contractAddress: 'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9',
    contractName: 'bitflow-core',
    functionName: 'get-pool-details',
    functionArgs: [],
    senderAddress: 'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9',
  });
  
  console.log('Bitflow Pool:', result);
  
  return result;
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/BitflowFinance",
    discord: "https://discord.gg/bitflow",
    telegram: "https://t.me/bitflowfinance",
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
    hasNativeBitcoinSwaps: true,
    hasUTXOBased: true,
    inheritsFromBitcoin: true,
    tvl: "$15+ million",
    volume24h: "$2+ million",
  },
  
  notes: [
    "Bitflow enables native Bitcoin DeFi on Stacks",
    "UTXO-based swaps for true Bitcoin integration",
    "No need to wrap Bitcoin tokens",
    "Direct Bitcoin to STX and other tokens",
    "Built on Clarity smart contracts",
    "Leverages Stacks' Proof of Transfer",
    "First truly Bitcoin-native DEX",
    "Innovative approach to Bitcoin DeFi",
  ],
};
