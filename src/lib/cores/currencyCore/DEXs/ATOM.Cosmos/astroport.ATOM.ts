// Astroport DEX Information
// Advanced multi-chain AMM protocol on Cosmos
// Source: Research compiled from multiple sources

export const astroportDEX = {
  name: "Astroport",
  blockchain: "Cosmos",
  type: "Multi-Chain AMM",
  description: "Advanced AMM DEX protocol across Cosmos chains. Astroport is a next-generation automated market maker (AMM) designed to unlock deep liquidity across connected Cosmos chains.",
  
  urls: {
    main: "https://astroport.fi/",
    app: "https://app.astroport.fi/",
    docs: "https://docs.astroport.fi/",
    governance: "https://gov.astroport.fi/",
  },
  
  api: {
    endpoints: {
      mainnet: "Use Terra/Neutron/Injective RPC endpoints",
      neutron: "https://rpc.neutron.org",
      terra: "https://terra-rpc.polkachu.com",
    },
    documentation: "https://docs.astroport.fi/docs/develop/smart-contracts/introduction",
    rateLimit: "Check documentation for current limits",
    requiresApiKey: false,
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@cosmjs/stargate",
          package: "@cosmjs/stargate",
          description: "Core Cosmos SDK interaction",
          installCommand: "npm install @cosmjs/stargate",
        },
        {
          name: "@cosmjs/cosmwasm-stargate",
          package: "@cosmjs/cosmwasm-stargate",
          description: "CosmWasm contract interaction",
          installCommand: "npm install @cosmjs/cosmwasm-stargate",
        },
      ],
      documentation: "https://docs.astroport.fi/docs/develop/",
    },
    contractAddresses: "https://docs.astroport.fi/docs/develop/smart-contracts/contract-addresses",
  },
  
  integration: {
    exampleUsage: `
import { CosmWasmClient } from "@cosmjs/cosmwasm-stargate";

// Connect to Neutron (primary Astroport chain)
const rpcEndpoint = "https://rpc.neutron.org";
const client = await CosmWasmClient.connect(rpcEndpoint);

// Query Astroport pool contract
async function getAstroportPoolPrice(poolContractAddress: string) {
  const poolInfo = await client.queryContractSmart(
    poolContractAddress,
    { pool: {} }
  );
  
  const assets = poolInfo.assets;
  const reserve1 = BigInt(assets[0].amount);
  const reserve2 = BigInt(assets[1].amount);
  
  // Calculate spot price
  const price = Number(reserve2) / Number(reserve1);
  
  return {
    pool: poolContractAddress,
    price,
    asset1: assets[0].info,
    asset2: assets[1].info,
    reserve1: reserve1.toString(),
    reserve2: reserve2.toString(),
  };
}

// Query pair contract for simulation
async function simulateSwap(
  pairContract: string,
  offerAsset: any,
  offerAmount: string
) {
  const simulation = await client.queryContractSmart(
    pairContract,
    {
      simulation: {
        offer_asset: {
          info: offerAsset,
          amount: offerAmount,
        },
      },
    }
  );
  
  return simulation;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/astroport_fi",
    discord: "https://discord.gg/astroport",
    telegram: "https://t.me/astroport_fi",
    medium: "https://medium.com/astroport",
    github: "https://github.com/astroport-fi",
  },
  
  chains: {
    neutron: {
      chainId: "neutron-1",
      rpc: "https://rpc.neutron.org",
      primary: true,
    },
    terra: {
      chainId: "phoenix-1",
      rpc: "https://terra-rpc.polkachu.com",
    },
    injective: {
      chainId: "injective-1",
      rpc: "https://injective-rpc.polkachu.com",
    },
  },
  
  features: {
    swaps: true,
    liquidityProvision: true,
    yieldFarming: true,
    limitOrders: false,
    governance: true,
    nftSupport: false,
    multiChain: true,
    stableSwap: true,
    passiveConcentratedLiquidity: true,
  },
  
  notes: [
    "Multi-chain AMM deployed on Neutron, Terra, and Injective",
    "Advanced pool types: XYK, stable swap, passive concentrated liquidity",
    "CosmWasm smart contracts for flexible integrations",
    "ASTRO token governance across all chains",
    "Built for capital efficiency and low slippage",
    "Uses @cosmjs libraries for integration",
    "Query contracts directly via CosmWasm client",
  ],
};

export default astroportDEX;
