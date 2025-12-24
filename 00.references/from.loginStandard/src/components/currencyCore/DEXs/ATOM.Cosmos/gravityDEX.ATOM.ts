// Gravity DEX Information
// Native DEX built on Cosmos Hub
// Source: Research compiled from multiple sources

export const gravityDEX = {
  name: "Gravity DEX",
  blockchain: "Cosmos",
  type: "Native DEX",
  description: "Built on Cosmos Hub with deep liquidity pools. Gravity DEX is a decentralized exchange built natively on the Cosmos Hub, providing efficient token swaps and liquidity provision.",
  
  urls: {
    main: "https://app.gravitychain.io/",
    app: "https://app.gravitychain.io/",
    docs: "https://docs.gravitychain.io/",
    github: "https://github.com/Gravity-Bridge/Gravity-Bridge",
  },
  
  api: {
    endpoints: {
      cosmosRpc: "https://rpc.cosmos.network",
      cosmosLcd: "https://lcd.cosmos.network",
      publicRpc: "https://cosmos-rpc.polkachu.com",
      publicLcd: "https://cosmos-api.polkachu.com",
    },
    documentation: "https://docs.gravitychain.io/",
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
          name: "@gravity-bridge/client",
          package: "@gravity-bridge/client",
          description: "Gravity Bridge client library",
          installCommand: "npm install @gravity-bridge/client",
          note: "Check npm for availability",
        },
      ],
      documentation: "https://docs.gravitychain.io/",
    },
  },
  
  integration: {
    exampleUsage: `
import { StargateClient } from "@cosmjs/stargate";

// Connect to Cosmos Hub (where Gravity DEX modules run)
const rpcEndpoint = "https://rpc.cosmos.network";
const client = await StargateClient.connect(rpcEndpoint);

// Query Gravity DEX liquidity module
async function getGravityPools() {
  const lcdEndpoint = "https://lcd.cosmos.network";
  
  // Query liquidity pools
  const poolsResponse = await fetch(
    \`\${lcdEndpoint}/cosmos/liquidity/v1beta1/pools\`
  );
  const pools = await poolsResponse.json();
  
  return pools;
}

// Get pool price
async function getPoolPrice(poolId: string) {
  const lcdEndpoint = "https://lcd.cosmos.network";
  
  const response = await fetch(
    \`\${lcdEndpoint}/cosmos/liquidity/v1beta1/pools/\${poolId}\`
  );
  const pool = await response.json();
  
  if (pool.pool && pool.pool.reserve_coins) {
    const reserves = pool.pool.reserve_coins;
    const reserve1 = BigInt(reserves[0].amount);
    const reserve2 = BigInt(reserves[1].amount);
    
    return {
      poolId,
      price: Number(reserve2) / Number(reserve1),
      denom1: reserves[0].denom,
      denom2: reserves[1].denom,
    };
  }
  
  return null;
}

// Query swap messages for pair
async function getSwapPrice(
  offerCoin: string,
  demandCoinDenom: string
) {
  const lcdEndpoint = "https://lcd.cosmos.network";
  
  // Simulate swap to get price
  const response = await fetch(
    \`\${lcdEndpoint}/cosmos/liquidity/v1beta1/simulate?offer_coin=\${offerCoin}&demand_coin_denom=\${demandCoinDenom}\`
  );
  const simulation = await response.json();
  
  return simulation;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/gravity_bridge",
    discord: "https://discord.gg/gravitybridge",
    telegram: "https://t.me/gravitybridge",
    medium: "https://medium.com/gravity-bridge",
    github: "https://github.com/Gravity-Bridge",
  },
  
  network: {
    cosmosHub: {
      chainId: "cosmoshub-4",
      rpc: "https://rpc.cosmos.network",
      lcd: "https://lcd.cosmos.network",
    },
    gravityBridge: {
      chainId: "gravity-bridge-3",
      rpc: "https://gravitychain.io:26657",
      lcd: "https://gravitychain.io:1317",
    },
  },
  
  features: {
    swaps: true,
    liquidityProvision: true,
    yieldFarming: true,
    limitOrders: false,
    governance: true,
    nftSupport: false,
    ethereumBridge: true,
    atomicSwaps: true,
  },
  
  modules: {
    liquidity: {
      name: "Liquidity Module",
      description: "Native Cosmos SDK liquidity module for AMM",
      type: "Built-in module on Cosmos Hub",
    },
    gravityBridge: {
      name: "Gravity Bridge",
      description: "Ethereum to Cosmos bridge for cross-chain assets",
      type: "Separate chain with bridge functionality",
    },
  },
  
  notes: [
    "Native DEX built on Cosmos Hub using liquidity module",
    "Part of Gravity Bridge ecosystem",
    "Enables Ethereum asset transfers to Cosmos",
    "Uses Cosmos SDK liquidity module (x/liquidity)",
    "Deep integration with ATOM and Cosmos Hub",
    "Supports IBC tokens across Cosmos ecosystem",
    "Uses CosmJS for JavaScript integration",
    "Query via Cosmos Hub LCD/RPC endpoints",
    "GRAV token for Gravity Bridge chain governance",
  ],
};

export default gravityDEX;
