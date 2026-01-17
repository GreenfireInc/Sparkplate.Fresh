// Acala Swap DEX Information
// DeFi hub DEX on Acala parachain
// Source: Research compiled from Oct14.Research.Cryptocurrency.DOT.Polkadot

export const acalaSwapDEX = {
  name: "Acala Swap",
  blockchain: "Acala (Polkadot)",
  type: "DeFi Hub DEX",
  description: "All-in-one DeFi platform with DEX on Polkadot. Acala Swap is part of the Acala Network, a comprehensive DeFi hub on Polkadot offering swaps, liquid staking (LDOT), and the AUSD stablecoin.",
  
  urls: {
    main: "https://apps.acala.network/",
    app: "https://apps.acala.network/swap",
    docs: "https://docs.acala.network/",
    dexDocs: "https://docs.acala.network/integrate/acala-swap",
  },
  
  api: {
    endpoints: {
      rpc: "wss://acala-rpc-0.aca-api.network",
      subgraph: "https://api.subquery.network/sq/acalanetwork",
      baseUrl: "https://api.acala.network",
    },
    documentation: "https://docs.acala.network/",
    rateLimit: "Public endpoints available",
    requiresApiKey: false,
  },
  
  tokens: {
    ACA: {
      symbol: "ACA",
      name: "Acala",
      isNative: true,
      decimals: 12,
    },
    AUSD: {
      symbol: "AUSD",
      name: "Acala USD",
      decimals: 12,
      description: "Over-collateralized stablecoin",
    },
    LDOT: {
      symbol: "LDOT",
      name: "Liquid DOT",
      decimals: 10,
      description: "Liquid staked DOT",
    },
    DOT: {
      symbol: "DOT",
      name: "Polkadot",
      decimals: 10,
    },
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@acala-network/sdk",
          package: "@acala-network/sdk",
          description: "Official Acala SDK for DeFi operations",
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
      documentation: "https://docs.acala.network/",
    },
  },
  
  integration: {
    substrateExample: `
import { ApiPromise, WsProvider } from '@polkadot/api';

const ACALA_WS_ENDPOINT = 'wss://acala-rpc-0.aca-api.network';

async function connectToAcala() {
  const provider = new WsProvider(ACALA_WS_ENDPOINT);
  const api = await ApiPromise.create({ provider });

  // Query DEX liquidity
  const liquidity = await api.query.dex.liquidityPool('DOT', 'AUSD');
  console.log('DOT/AUSD Liquidity:', liquidity.toHuman());

  // Get trading pair info
  const tradingPair = await api.query.dex.tradingPairStatuses('DOT', 'AUSD');
  console.log('Trading Pair Status:', tradingPair.toHuman());

  return api;
}

// Get swap amount
async function getSwapAmount(api: ApiPromise) {
  const amountOut = await api.call.dexApi.getSwapAmount({
    supplyAmount: '1000000000000', // 1 DOT
    path: ['DOT', 'AUSD'],
    exchangeFee: false
  });

  console.log('Expected Output Amount:', amountOut.toHuman());
}
    `,
    
    liquidStakingExample: `
import { ApiPromise, WsProvider } from '@polkadot/api';

async function liquidStakingExample() {
  const api = await ApiPromise.create({
    provider: new WsProvider('wss://acala-rpc-0.aca-api.network')
  });

  // Mint LDOT (Liquid DOT)
  const mintTx = api.tx.homa.mint('1000000000000'); // 1 DOT worth
  console.log('Mint LDOT Transaction:', mintTx.toHuman());

  // Redeem LDOT for DOT
  const redeemTx = api.tx.homa.redeem('1000000000000'); // 1 LDOT
  console.log('Redeem DOT Transaction:', redeemTx.toHuman());

  // Check LDOT exchange rate
  const exchangeRate = await api.query.homa.stakingLedgers();
  console.log('LDOT Exchange Rate:', exchangeRate.toHuman());
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/AcalaNetwork",
    telegram: "https://t.me/acalaofficial",
    discord: "https://discord.gg/acala",
    github: "https://github.com/AcalaNetwork",
    medium: "https://medium.com/acalanetwork",
  },
  
  features: {
    hasApi: true,
    hasSdk: true,
    hasSubgraph: true,
    isActive: true,
    supportsCrossChain: true,
    hasLiquidityMining: true,
    hasLiquidStaking: true, // LDOT feature
    hasStablecoin: true, // AUSD stablecoin
    isDeFiHub: true,
  },
  
  notes: [
    "Acala is a comprehensive DeFi hub on Polkadot",
    "Features liquid staking (LDOT) and AUSD stablecoin",
    "Integrated DEX with deep Polkadot ecosystem integration",
    "Supports cross-chain assets via XCM",
  ],
};
