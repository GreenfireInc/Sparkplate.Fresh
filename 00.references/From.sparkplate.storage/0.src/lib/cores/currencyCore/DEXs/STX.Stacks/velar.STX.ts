// Velar DEX Information
// Leading liquidity protocol on Stacks
// Source: Research compiled from Oct14.Research.Cryptocurrency.STX.Stacks

export const velarDEX = {
  name: "Velar",
  blockchain: "Stacks (STX)",
  type: "Liquidity Protocol",
  description: "Leading liquidity protocol on Stacks with concentrated liquidity pools and yield farming. Velar provides efficient capital deployment for Bitcoin DeFi through the Stacks Layer 2.",
  
  urls: {
    main: "https://www.velar.co/",
    app: "https://app.velar.co/",
    pools: "https://app.velar.co/pools",
    docs: "https://docs.velar.co/",
  },
  
  api: {
    endpoints: {
      stacksApi: "https://api.mainnet.stacks.co/",
      contractRead: "Stacks Blockchain API read-only function calls",
    },
    documentation: "https://docs.velar.co/",
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
          description: "Stacks transactions library for contract interactions",
          installCommand: "npm install @stacks/transactions",
        },
        {
          name: "@stacks/network",
          package: "@stacks/network",
          description: "Stacks network configuration",
          installCommand: "npm install @stacks/network",
        },
      ],
      documentation: "https://docs.velar.co/",
    },
  },
  
  integration: {
    contractExample: `
import { makeContractCall, callReadOnlyFunction } from '@stacks/transactions';
import { StacksMainnet } from '@stacks/network';

// Read pool information
async function getVelarPoolInfo(poolId: string) {
  const network = new StacksMainnet();
  
  const result = await callReadOnlyFunction({
    network,
    contractAddress: 'SP1Y5YSTAHZ88XYK1VPDH24GY0HPX5J4JECTMY4A1',
    contractName: 'velar-core',
    functionName: 'get-pool-details',
    functionArgs: [
      // Pool ID argument
    ],
    senderAddress: 'SP1Y5YSTAHZ88XYK1VPDH24GY0HPX5J4JECTMY4A1',
  });
  
  console.log('Velar Pool Info:', result);
  
  return result;
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/VelarBTC",
    discord: "https://discord.gg/velar",
    telegram: "https://t.me/velarbtc",
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
    hasConcentratedLiquidity: true,
    inheritsFromBitcoin: true,
    tvl: "$50+ million",
    volume24h: "$10+ million",
  },
  
  notes: [
    "Velar is the leading liquidity protocol on Stacks",
    "Concentrated liquidity pools for capital efficiency",
    "Yield farming and staking rewards",
    "Built on Clarity smart contracts",
    "Inherits Bitcoin security through Proof of Transfer",
    "Native Bitcoin DeFi experience",
    "Multi-asset liquidity pools",
    "Growing ecosystem with active development",
  ],
};
