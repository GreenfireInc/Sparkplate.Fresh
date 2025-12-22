// HydraDX DEX Information
// Native Polkadot DEX with Omnipool AMM
// Source: Research compiled from Oct14.Research.Cryptocurrency.DOT.Polkadot

export const hydraDXDEX = {
  name: "HydraDX",
  blockchain: "Polkadot",
  type: "Omnipool AMM",
  description: "Next-gen AMM with single-sided liquidity provision on Polkadot. HydraDX is a decentralized finance hub on Polkadot with its main function being a DEX utilizing an innovative Omnipool design.",
  
  urls: {
    main: "https://hydradx.io/",
    app: "https://hydration.net/",
    docs: "https://docs.hydration.net/",
    apiDocs: "https://apidocs.bsx.fi/HydraDX",
    dexScreener: "https://dexscreener.com/polkadot/hydration",
  },
  
  api: {
    endpoints: {
      rpc: "wss://rpc.hydradx.cloud",
      subgraph: "https://api.subquery.network/sq/galacticcouncil/hydration",
      baseUrl: "https://api.hydradx.cloud",
    },
    documentation: "https://docs.hydration.net/",
    apiReference: "https://apidocs.bsx.fi/HydraDX",
    rateLimit: "Public endpoints available",
    requiresApiKey: false,
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@galacticcouncil/sdk",
          package: "@galacticcouncil/sdk",
          description: "Official SDK for HydraDX/Hydration",
          installCommand: "npm install @galacticcouncil/sdk",
          github: "https://github.com/galacticcouncil/sdk",
        },
        {
          name: "@polkadot/api",
          package: "@polkadot/api",
          description: "Polkadot.js API for Substrate chains",
          installCommand: "npm install @polkadot/api @polkadot/util @polkadot/util-crypto",
        },
      ],
      documentation: "https://docs.hydration.net/",
    },
  },
  
  integration: {
    polkadotJsExample: `
// Connect to HydraDX
import { ApiPromise, WsProvider } from '@polkadot/api';

const provider = new WsProvider('wss://rpc.hydradx.cloud');
const api = await ApiPromise.create({ provider });

// Get asset data from Omnipool
const assetId = 5; // DOT
const assetData = await api.query.omnipool.assets(assetId);
console.log('DOT Asset Data:', assetData.toHuman());
    `,
    
    routerExample: `
import { ApiPromise, WsProvider } from '@polkadot/api';

const api = await ApiPromise.create({ provider: new WsProvider('wss://rpc.hydradx.cloud') });

// Get best route for DOT to USDT swap
const route = await api.call.routerApi.getBestRoute({
  assetIn: 5,    // DOT
  assetOut: 10,  // USDT
  amount: '1000000000000' // 1 DOT (12 decimals)
});

console.log('Best Route:', route.toHuman());
    `,
    
    subqueryExample: `
import { request, gql } from 'graphql-request';

const query = gql\`
  query GetAssetPrice($assetId: String!) {
    assets(where: { assetId_eq: $assetId }) {
      price
      volume
      liquidity
    }
  }
\`;

const data = await request('https://api.subquery.network/sq/galacticcouncil/hydration', query, { assetId: "5" });
console.log('DOT Price Data:', data);
    `,
  },
  
  social: {
    twitter: "https://twitter.com/hydra_dx",
    telegram: "https://t.me/hydradx",
    discord: "https://discord.gg/hydradx",
    github: "https://github.com/galacticcouncil",
  },
  
  features: {
    hasApi: true,
    hasSdk: true,
    hasSubgraph: true,
    isActive: true,
    supportsCrossChain: true,
    hasLiquidityMining: true,
  },
  
  notes: [
    "HydraDX uses an innovative Omnipool design for single-sided liquidity",
    "Native Polkadot DEX with deep DOT liquidity",
    "Supports XCM for cross-chain asset transfers",
    "Part of the Polkadot DeFi Hub ecosystem",
  ],
};
