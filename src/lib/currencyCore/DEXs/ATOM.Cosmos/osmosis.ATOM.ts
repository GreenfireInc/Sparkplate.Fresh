// Osmosis DEX Information
// Leading decentralized AMM on Cosmos ecosystem
// Source: Research compiled from Oct13.Research.Cryptocurrency.ATOM.Cosmos

export const osmosisDEX = {
  name: "Osmosis",
  blockchain: "Cosmos",
  type: "AMM DEX",
  description: "The largest decentralized exchange in the Cosmos ecosystem with advanced AMM features. Osmosis is an appchain DEX built with the Cosmos SDK that runs a fully native AMM with IBC support for cross-chain swaps.",
  
  urls: {
    main: "https://osmosis.zone/",
    app: "https://app.osmosis.zone/",
    docs: "https://docs.osmosis.zone/",
    info: "https://info.osmosis.zone/",
  },
  
  api: {
    endpoints: {
      lcd: "https://lcd.osmosis.zone",
      rpc: "https://rpc.osmosis.zone",
      grpc: "https://grpc.osmosis.zone",
      historicalData: "https://stage-docs.osmosis.zone/api/?v=DATA",
    },
    documentation: "https://docs.osmosis.zone/overview/integrate/rest/",
    apiReference: "https://stage-docs.osmosis.zone/api/",
    rateLimit: "Public endpoints available - check documentation for limits",
    requiresApiKey: false,
    publicProviders: [
      "https://osmosis-rpc.stakely.io",
      "https://rpc.osmosis.zone",
      "https://lcd.osmosis.zone",
    ],
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "OsmoJS",
          package: "osmojs",
          description: "Composes and broadcasts Osmosis and Cosmos messages with proto and amino encoding",
          installCommand: "npm install osmojs",
        },
        {
          name: "@cosmjs/stargate",
          package: "@cosmjs/stargate",
          description: "Core Cosmos SDK interaction library",
          installCommand: "npm install @cosmjs/stargate @cosmjs/encoding",
          github: "https://github.com/cosmos/cosmjs",
          documentation: "https://cosmos.github.io/cosmjs",
        },
        {
          name: "@osmosis-labs/math",
          package: "@osmosis-labs/math",
          description: "Math functions for Osmosis AMM state change estimation",
          installCommand: "npm install @osmosis-labs/math",
        },
        {
          name: "@osmosis-labs/pools",
          package: "@osmosis-labs/pools",
          description: "Pool interface and routing logic for Osmosis DEX",
          installCommand: "npm install @osmosis-labs/pools",
        },
        {
          name: "@osmosis-labs/stores",
          package: "@osmosis-labs/stores",
          description: "Observable stores via mobx data storage framework",
          installCommand: "npm install @osmosis-labs/stores",
        },
      ],
      frontendTools: [
        {
          name: "Cosmos Kit",
          description: "Wallet adapter for React with mobile WalletConnect support",
        },
        {
          name: "Telescope",
          description: "TypeScript Transpiler for Cosmos Protobufs",
        },
        {
          name: "Create Cosmos App",
          description: "CLI tool to set up modern Cosmos apps",
        },
      ],
      documentation: "https://docs.osmosis.zone/frontend/",
    },
  },
  
  integration: {
    exampleUsage: `
import { StargateClient } from "@cosmjs/stargate";

// Connect to Osmosis mainnet
const rpcEndpoint = "https://rpc.osmosis.zone";
const client = await StargateClient.connect(rpcEndpoint);

// Get chain info
const chainId = await client.getChainId();
console.log("Chain ID:", chainId);

// Query pool data for pricing
async function getOsmosisPoolPrice(poolId: number) {
  const lcdEndpoint = "https://lcd.osmosis.zone";
  
  // Get pool info
  const poolResponse = await fetch(
    \`\${lcdEndpoint}/osmosis/gamm/v1beta1/pools/\${poolId}\`
  );
  const poolData = await poolResponse.json();
  
  // Extract token reserves
  const pool = poolData.pool;
  const poolAssets = pool.pool_assets;
  
  // Calculate price ratio
  const asset1 = poolAssets[0];
  const asset2 = poolAssets[1];
  
  const reserve1 = BigInt(asset1.token.amount);
  const reserve2 = BigInt(asset2.token.amount);
  
  // Price of asset1 in terms of asset2
  const price = Number(reserve2) / Number(reserve1);
  
  return {
    poolId,
    price,
    reserve1: reserve1.toString(),
    reserve2: reserve2.toString(),
    denom1: asset1.token.denom,
    denom2: asset2.token.denom
  };
}

// Get spot price
async function getSpotPrice(poolId: number, baseAsset: string, quoteAsset: string) {
  const lcdEndpoint = "https://lcd.osmosis.zone";
  
  const url = \`\${lcdEndpoint}/osmosis/gamm/v1beta1/pools/\${poolId}/prices?\` +
    \`base_asset_denom=\${baseAsset}&quote_asset_denom=\${quoteAsset}\`;
  
  const response = await fetch(url);
  const data = await response.json();
  
  return data.spot_price;
}

// Example: Get ATOM price in OSMO (Pool ID 1)
const atomPrice = await getSpotPrice(
  1, 
  "ibc/27394FB092D2ECCD56123C74F36E4C1F926001CEADA9CA97EA622B25F41E5EB2", // ATOM
  "uosmo" // OSMO
);
    `,
  },
  
  subgraph: {
    provider: "SubQuery",
    documentation: "https://docs.osmosis.zone/overview/integrate/external_projects/subquery",
    description: "SubQuery starter project that indexes all swaps on Osmosis' on-chain DEX",
    quickStart: "https://subquery.network/doc/indexer/quickstart/quickstart_chains/cosmos-osmosis.html",
    theGraph: {
      supported: true,
      documentation: "https://docs.thegraph.academy/official-docs/supported-networks/building-subgraphs-on-cosmos",
      description: "The Graph protocol now supports Cosmos events for indexing",
    },
  },
  
  socialMedia: {
    twitter: "https://twitter.com/osmosiszone",
    discord: "https://discord.gg/osmosis",
    telegram: "https://t.me/osmosis_chat",
    medium: "https://medium.com/osmosis",
    github: "https://github.com/osmosis-labs",
  },
  
  network: {
    mainnet: {
      chainId: "osmosis-1",
      rpc: "https://rpc.osmosis.zone",
      lcd: "https://lcd.osmosis.zone",
    },
    testnet: {
      chainId: "osmo-test-4",
      rpc: "https://rpc.testnet.osmosis.zone",
      lcd: "https://lcd.testnet.osmosis.zone",
    },
  },
  
  features: {
    swaps: true,
    liquidityProvision: true,
    yieldFarming: true,
    limitOrders: false,
    governance: true,
    nftSupport: false,
    crossChainIBC: true,
    concentratedLiquidity: true,
    customizablePools: true,
    superfluidStaking: true,
  },
  
  notes: [
    "Leading DEX in Cosmos ecosystem with deep liquidity",
    "Supports IBC cross-chain swaps across all Cosmos chains",
    "Comprehensive TypeScript SDK ecosystem (OsmoJS, CosmJS)",
    "SubQuery and The Graph support for indexed data",
    "Multiple pool types: constant-product, stable swap, concentrated liquidity",
    "Superfluid staking allows simultaneous LP and staking rewards",
    "Free public RPC/LCD endpoints available (Algonode, Nodely, etc.)",
    "Historical data API for pools, liquidity, volume, tokens",
    "Query pricing via REST, gRPC, or GraphQL (SubQuery)",
  ],
};

export default osmosisDEX;
