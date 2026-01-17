// Karura Swap DEX Information
// DEX on Karura parachain (Kusama ecosystem)
// Source: Research compiled from Oct14.Research.Cryptocurrency.DOT.Polkadot

export const karuraSwapDEX = {
  name: "Karura Swap",
  blockchain: "Karura (Kusama)",
  type: "AMM DEX",
  description: "Cross-chain swaps and liquidity provision on Karura network. Karura Swap is the first DEX in the Polkadot ecosystem, launched on Kusama (Polkadot's canary network). Built by Acala, it supports cross-chain swaps and liquidity provision.",
  
  urls: {
    main: "https://karura.network/",
    app: "https://apps.karura.network/swap",
    docs: "https://docs.karura.network/",
    dexDocs: "https://docs.karura.network/integrate/karura-swap",
  },
  
  api: {
    endpoints: {
      rpc: "wss://karura.api.onfinality.io/public-ws",
      subgraph: "https://api.subquery.network/sq/acalanetwork/karura",
      baseUrl: "https://api.karura.network",
    },
    documentation: "https://docs.karura.network/",
    rateLimit: "Public endpoints available",
    requiresApiKey: false,
  },
  
  tokens: {
    KAR: {
      symbol: "KAR",
      name: "Karura",
      isNative: true,
      decimals: 12,
    },
    KUSD: {
      symbol: "KUSD",
      name: "Karura USD",
      decimals: 12,
      description: "Over-collateralized stablecoin",
    },
    LKSM: {
      symbol: "LKSM",
      name: "Liquid KSM",
      decimals: 12,
      description: "Liquid staked KSM",
    },
    KSM: {
      symbol: "KSM",
      name: "Kusama",
      decimals: 12,
    },
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@acala-network/sdk",
          package: "@acala-network/sdk",
          description: "Official Acala/Karura SDK for DeFi operations",
          installCommand: "npm install @acala-network/sdk",
          github: "https://github.com/AcalaNetwork",
        },
        {
          name: "@polkadot/api",
          package: "@polkadot/api",
          description: "Polkadot.js API for Substrate chains",
          installCommand: "npm install @polkadot/api",
        },
      ],
      documentation: "https://docs.karura.network/",
    },
  },
  
  integration: {
    substrateExample: `
import { ApiPromise, WsProvider } from '@polkadot/api';

const KARURA_WS_ENDPOINT = 'wss://karura.api.onfinality.io/public-ws';

async function connectToKarura() {
  const provider = new WsProvider(KARURA_WS_ENDPOINT);
  const api = await ApiPromise.create({ provider });

  // Query DEX liquidity pools
  const liquidity = await api.query.dex.liquidityPool('KSM', 'KUSD');
  console.log('KSM/KUSD Liquidity:', liquidity.toHuman());

  // Get trading pair info
  const tradingPair = await api.query.dex.tradingPairStatuses('KSM', 'KUSD');
  console.log('Trading Pair Status:', tradingPair.toHuman());

  return api;
}

// Get swap amount calculation
async function getSwapAmount(api: ApiPromise) {
  const amountOut = await api.call.dexApi.getSwapAmount({
    supplyAmount: '1000000000000', // 1 KSM
    path: ['KSM', 'KUSD'],
    exchangeFee: false
  });

  console.log('Expected Output Amount:', amountOut.toHuman());
}
    `,
    
    kusamaEcosystemExample: `
import { ApiPromise, WsProvider } from '@polkadot/api';

async function kusamaCrossChain() {
  const karuraApi = await ApiPromise.create({
    provider: new WsProvider('wss://karura.api.onfinality.io/public-ws')
  });

  // Check token balances
  const kusdBalance = await karuraApi.query.tokens.accounts('YOUR_ADDRESS', { Token: 'KUSD' });
  console.log('KUSD Balance:', kusdBalance.toHuman());

  // Get crowdloan rewards (Karura was launched via Kusama crowdloan)
  const rewards = await karuraApi.query.rewards.poolInfos();
  console.log('Crowdloan Rewards:', rewards.toHuman());
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/KaruraNetwork",
    telegram: "https://t.me/karuranetwork",
    discord: "https://discord.gg/Ac6GGx",
    github: "https://github.com/AcalaNetwork",
    medium: "https://medium.com/karuranetwork",
  },
  
  features: {
    hasApi: true,
    hasSdk: true,
    hasSubgraph: true,
    isActive: true,
    supportsCrossChain: true,
    hasLiquidityMining: true,
    hasStablecoin: true, // KUSD stablecoin
    isKusamaEcosystem: true, // Part of Kusama ecosystem
    hasCrowdloanRewards: true,
  },
  
  notes: [
    "Karura is Acala's canary network on Kusama",
    "First DEX in the Polkadot/Kusama ecosystem",
    "Features KUSD stablecoin and LKSM liquid staking",
    "Part of the Kusama parachain ecosystem",
  ],
};
