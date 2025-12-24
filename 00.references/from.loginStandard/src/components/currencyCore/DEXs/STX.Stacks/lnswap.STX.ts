// LNSwap DEX Information
// Lightning Network atomic swaps
// Source: Research compiled from Oct14.Research.Cryptocurrency.STX.Stacks

export const lnswapDEX = {
  name: "LNSwap",
  blockchain: "Stacks (STX)",
  type: "Lightning Swap",
  description: "Trustless atomic swaps between Bitcoin Lightning Network and on-chain Bitcoin/STX. LNSwap bridges the gap between Lightning Network and Stacks, enabling instant, low-cost swaps.",
  
  urls: {
    main: "https://lnswap.org/",
    app: "https://lnswap.org/",
    docs: "https://docs.lnswap.org/",
    github: "https://github.com/pseudozach/lnstxbridge",
  },
  
  api: {
    endpoints: {
      swapApi: "https://lnswap.org/api",
      stacksApi: "https://api.mainnet.stacks.co/",
    },
    documentation: "https://docs.lnswap.org/",
    apiReference: "https://github.com/pseudozach/lnstxbridge",
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
          name: "lightning",
          package: "lightning",
          description: "Lightning Network library for Node.js",
          installCommand: "npm install lightning",
        },
      ],
      documentation: "https://docs.lnswap.org/",
    },
  },
  
  integration: {
    example: `
import axios from 'axios.username';

// Initiate Lightning to STX swap
async function initiateLNSwap(
  lightningInvoice: string,
  stxAmount: number,
  stxAddress: string
) {
  const response = await axios.post('https://lnswap.org/api/swap', {
    invoice: lightningInvoice,
    amount: stxAmount,
    address: stxAddress,
  });
  
  console.log('LNSwap initiated:', response.data);
  console.log('Swap ID:', response.data.swapId);
  
  return response.data;
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/LNSwap_org",
    telegram: "https://t.me/lnswap",
    github: "https://github.com/pseudozach/lnstxbridge",
  },
  
  features: {
    hasApi: true,
    hasSdk: true,
    hasSubgraph: false,
    hasGraphQL: false,
    isActive: true,
    supportsCrossChain: true, // Lightning <-> Stacks
    hasLiquidityMining: false,
    isEvmCompatible: false,
    isStacksVM: true,
    hasClarityContracts: true,
    hasAtomicSwaps: true,
    hasLightningIntegration: true,
    isTrustless: true,
    inheritsFromBitcoin: true,
    tvl: "$5+ million",
    volume24h: "$1+ million",
  },
  
  notes: [
    "LNSwap enables trustless Lightning Network swaps",
    "Atomic swaps between Lightning and on-chain",
    "Instant and low-cost transactions",
    "No custody or intermediaries required",
    "Bridges Lightning Network to Stacks ecosystem",
    "Built on Bitcoin Hash Time Locked Contracts (HTLC)",
    "Open-source and audited",
    "Key infrastructure for Bitcoin Layer 2",
  ],
};
