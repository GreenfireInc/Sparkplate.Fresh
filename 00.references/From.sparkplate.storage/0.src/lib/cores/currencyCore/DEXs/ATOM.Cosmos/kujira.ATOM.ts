// Kujira DEX Information
// Comprehensive DeFi platform with DEX and liquidation features
// Source: Research compiled from multiple sources

export const kujiraDEX = {
  name: "Kujira",
  blockchain: "Cosmos",
  type: "DeFi Platform",
  description: "Comprehensive DeFi platform with DEX and liquidation features. Kujira is a sustainable, community-focused DeFi hub built on Cosmos with FIN (orderbook DEX), BOW (liquidity hub), and ORCA (liquidation marketplace).",
  
  urls: {
    main: "https://kujira.app/",
    fin: "https://fin.kujira.app/",
    bow: "https://bow.kujira.app/",
    docs: "https://docs.kujira.app/",
  },
  
  api: {
    endpoints: {
      rpc: "https://rpc.kaiyo.kujira.setten.io",
      lcd: "https://lcd.kaiyo.kujira.setten.io",
      publicRpc: "https://kujira-rpc.polkachu.com",
      publicLcd: "https://kujira-api.polkachu.com",
    },
    documentation: "https://docs.kujira.app/developers/",
    rateLimit: "Check documentation for current limits",
    requiresApiKey: false,
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "kujira.js",
          package: "kujira.js",
          description: "Official Kujira JavaScript/TypeScript SDK",
          installCommand: "npm install kujira.js",
          github: "https://github.com/Team-Kujira/kujira.js",
          documentation: "https://docs.kujira.app/developers/kujira.js",
        },
        {
          name: "@cosmjs/stargate",
          package: "@cosmjs/stargate",
          description: "Core Cosmos SDK interaction",
          installCommand: "npm install @cosmjs/stargate",
        },
      ],
      documentation: "https://docs.kujira.app/developers/",
    },
  },
  
  integration: {
    exampleUsage: `
import { KujiraQueryClient } from "kujira.js";
import { StargateClient } from "@cosmjs/stargate";

// Connect to Kujira
const rpcEndpoint = "https://rpc.kaiyo.kujira.setten.io";
const client = await StargateClient.connect(rpcEndpoint);

// Initialize Kujira query client
const kujiraClient = await KujiraQueryClient.connect(rpcEndpoint);

// Query FIN orderbook
async function getFinOrderbook(contractAddress: string) {
  const orderbook = await kujiraClient.wasm.queryContractSmart(
    contractAddress,
    { book: {} }
  );
  
  return orderbook;
}

// Query pool pricing from BOW
async function getBowPoolPrice(poolAddress: string) {
  const pool = await kujiraClient.wasm.queryContractSmart(
    poolAddress,
    { pool: {} }
  );
  
  const reserve1 = BigInt(pool.assets[0].amount);
  const reserve2 = BigInt(pool.assets[1].amount);
  
  return {
    pool: poolAddress,
    price: Number(reserve2) / Number(reserve1),
    asset1: pool.assets[0].info,
    asset2: pool.assets[1].info,
  };
}

// Get market data from FIN
async function getFinMarketData(market: string) {
  const lcdEndpoint = "https://lcd.kaiyo.kujira.setten.io";
  
  const response = await fetch(
    \`\${lcdEndpoint}/cosmwasm/wasm/v1/contract/\${market}/smart/eyJib29rIjp7fX0=\`
  );
  
  const data = await response.json();
  return data;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/TeamKujira",
    discord: "https://discord.gg/teamkujira",
    telegram: "https://t.me/team_kujira",
    medium: "https://medium.com/team-kujira",
    github: "https://github.com/Team-Kujira",
  },
  
  network: {
    mainnet: {
      chainId: "kaiyo-1",
      rpc: "https://rpc.kaiyo.kujira.setten.io",
      lcd: "https://lcd.kaiyo.kujira.setten.io",
    },
  },
  
  products: {
    fin: {
      name: "FIN",
      description: "Orderbook DEX with limit orders and advanced trading",
      url: "https://fin.kujira.app/",
    },
    bow: {
      name: "BOW",
      description: "Liquidity hub and AMM pools",
      url: "https://bow.kujira.app/",
    },
    orca: {
      name: "ORCA",
      description: "Liquidation marketplace for discounted collateral",
      url: "https://orca.kujira.app/",
    },
    ghost: {
      name: "GHOST",
      description: "Money market for lending and borrowing",
      url: "https://ghost.kujira.app/",
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
    liquidations: true,
    lending: true,
    borrowing: true,
    marginTrading: true,
  },
  
  notes: [
    "Comprehensive DeFi suite with multiple products",
    "FIN: orderbook DEX with advanced trading features",
    "BOW: liquidity pools and AMM functionality",
    "ORCA: liquidation marketplace for protocol debt",
    "Official kujira.js SDK for TypeScript integration",
    "Native Cosmos SDK chain (kaiyo-1)",
    "KUJI token for governance and fee discounts",
    "Sustainable fee model focused on community value",
    "CosmWasm smart contracts",
  ],
};

export default kujiraDEX;
