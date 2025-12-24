// Crescent DEX Information
// Hybrid orderbook and AMM DEX on Cosmos
// Source: Research compiled from multiple sources

export const crescentDEX = {
  name: "Crescent",
  blockchain: "Cosmos",
  type: "Hybrid DEX",
  description: "DeFi hub with orderbook and AMM functionality. Crescent combines the best of both worlds with a hybrid orderbook-AMM model, offering limit orders and liquidity pools.",
  
  urls: {
    main: "https://crescent.network/",
    app: "https://app.crescent.network/",
    docs: "https://docs.crescent.network/",
  },
  
  api: {
    endpoints: {
      rpc: "https://mainnet.crescent.network:26657",
      lcd: "https://mainnet.crescent.network:1317",
      grpc: "https://mainnet.crescent.network:9090",
    },
    documentation: "https://docs.crescent.network/developers/api",
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
          name: "crescentjs",
          package: "crescentjs",
          description: "Crescent-specific JavaScript library",
          installCommand: "npm install crescentjs",
          note: "Check npm for availability",
        },
      ],
      documentation: "https://docs.crescent.network/developers/",
    },
  },
  
  integration: {
    exampleUsage: `
import { StargateClient } from "@cosmjs/stargate";

// Connect to Crescent Network
const rpcEndpoint = "https://mainnet.crescent.network:26657";
const client = await StargateClient.connect(rpcEndpoint);

// Query Crescent modules
async function getCrescentPools() {
  const lcdEndpoint = "https://mainnet.crescent.network:1317";
  
  // Query liquidity pools
  const poolsResponse = await fetch(
    \`\${lcdEndpoint}/crescent/liquidity/v1beta1/pools\`
  );
  const pools = await poolsResponse.json();
  
  return pools;
}

// Query orderbook
async function getOrderbook(pairId: number) {
  const lcdEndpoint = "https://mainnet.crescent.network:1317";
  
  const response = await fetch(
    \`\${lcdEndpoint}/crescent/liquidity/v1beta1/orderbooks/\${pairId}\`
  );
  const orderbook = await response.json();
  
  return orderbook;
}

// Get pool price
async function getPoolPrice(poolId: number) {
  const lcdEndpoint = "https://mainnet.crescent.network:1317";
  
  const response = await fetch(
    \`\${lcdEndpoint}/crescent/liquidity/v1beta1/pools/\${poolId}\`
  );
  const pool = await response.json();
  
  // Calculate price from pool reserves
  const reserve1 = BigInt(pool.pool.reserve_coin_amount);
  const reserve2 = BigInt(pool.pool.pool_coin_amount);
  
  return {
    poolId,
    price: Number(reserve2) / Number(reserve1),
    reserves: { reserve1: reserve1.toString(), reserve2: reserve2.toString() }
  };
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/CrescentHub",
    discord: "https://discord.gg/crescentnetwork",
    telegram: "https://t.me/crescentnetwork",
    medium: "https://medium.com/crescent-network",
    github: "https://github.com/crescent-network",
  },
  
  network: {
    mainnet: {
      chainId: "crescent-1",
      rpc: "https://mainnet.crescent.network:26657",
      lcd: "https://mainnet.crescent.network:1317",
    },
  },
  
  features: {
    swaps: true,
    liquidityProvision: true,
    yieldFarming: true,
    limitOrders: true,
    governance: true,
    nftSupport: false,
    orderbook: true,
    rangedPools: true,
    lending: true,
    borrowing: true,
  },
  
  notes: [
    "Hybrid model combining orderbook and AMM",
    "Limit orders available via orderbook module",
    "Ranged liquidity pools for capital efficiency",
    "Integrated lending/borrowing protocol",
    "Native Cosmos SDK chain (crescent-1)",
    "CRE token for governance and utility",
    "Uses CosmJS for JavaScript integration",
    "LCD/RPC/gRPC endpoints for direct queries",
  ],
};

export default crescentDEX;
