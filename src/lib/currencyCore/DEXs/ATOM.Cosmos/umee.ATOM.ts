// Umee DEX Information
// Cross-chain DeFi hub with lending and trading on Cosmos
// Source: Research compiled from multiple sources

export const umeeDEX = {
  name: "Umee",
  blockchain: "Cosmos",
  type: "Cross-Chain DEX",
  description: "Cross-chain DeFi hub with lending and trading. Umee is a cross-chain DeFi hub that bridges lending markets between blockchains, featuring native DEX functionality and interoperability.",
  
  urls: {
    main: "https://www.umee.cc/",
    app: "https://app.umee.cc/",
    docs: "https://docs.umee.cc/",
  },
  
  api: {
    endpoints: {
      rpc: "https://umee-rpc.polkachu.com",
      lcd: "https://umee-api.polkachu.com",
      grpc: "https://umee-grpc.polkachu.com",
    },
    documentation: "https://docs.umee.cc/developers/",
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
          name: "umee-js",
          package: "umee-js",
          description: "Umee-specific JavaScript library",
          installCommand: "npm install umee-js",
          note: "Check npm/GitHub for availability",
        },
      ],
      documentation: "https://docs.umee.cc/developers/",
    },
  },
  
  integration: {
    exampleUsage: `
import { StargateClient } from "@cosmjs/stargate";

// Connect to Umee
const rpcEndpoint = "https://umee-rpc.polkachu.com";
const client = await StargateClient.connect(rpcEndpoint);

// Query Umee modules via LCD
async function getUmeePools() {
  const lcdEndpoint = "https://umee-api.polkachu.com";
  
  // Query leverage module (lending/borrowing)
  const leverageResponse = await fetch(
    \`\${lcdEndpoint}/umee/leverage/v1/registered_tokens\`
  );
  const tokens = await leverageResponse.json();
  
  return tokens;
}

// Query market data
async function getMarketData(denom: string) {
  const lcdEndpoint = "https://umee-api.polkachu.com";
  
  const response = await fetch(
    \`\${lcdEndpoint}/umee/leverage/v1/market_summary\`
  );
  const marketData = await response.json();
  
  return marketData;
}

// Get oracle prices
async function getOraclePrice(denom: string) {
  const lcdEndpoint = "https://umee-api.polkachu.com";
  
  const response = await fetch(
    \`\${lcdEndpoint}/umee/oracle/v1/denoms/exchange_rates\`
  );
  const prices = await response.json();
  
  return prices;
}

// Query liquidity positions
async function getUserPositions(userAddress: string) {
  const lcdEndpoint = "https://umee-api.polkachu.com";
  
  const response = await fetch(
    \`\${lcdEndpoint}/umee/leverage/v1/account_balances/\${userAddress}\`
  );
  const positions = await response.json();
  
  return positions;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/Umee_CrossChain",
    discord: "https://discord.gg/umee",
    telegram: "https://t.me/umeecrosschain",
    medium: "https://medium.com/umeeblog",
    github: "https://github.com/umee-network",
  },
  
  network: {
    mainnet: {
      chainId: "umee-1",
      rpc: "https://umee-rpc.polkachu.com",
      lcd: "https://umee-api.polkachu.com",
    },
  },
  
  features: {
    swaps: true,
    liquidityProvision: true,
    yieldFarming: true,
    limitOrders: false,
    governance: true,
    nftSupport: false,
    crossChain: true,
    lending: true,
    borrowing: true,
    leveragedYield: true,
    meTokens: true,
  },
  
  products: {
    lending: {
      name: "Lending Markets",
      description: "Cross-chain lending and borrowing protocol",
    },
    meTokens: {
      name: "meTokens",
      description: "Interest-bearing collateral tokens",
    },
    gravity: {
      name: "Gravity Bridge",
      description: "Ethereum to Cosmos bridge integration",
    },
  },
  
  notes: [
    "Cross-chain DeFi hub connecting multiple blockchains",
    "Native lending/borrowing protocol with DEX integration",
    "meTokens: interest-bearing collateral tokens",
    "Leveraged yield farming opportunities",
    "UMEE token for governance and staking",
    "Native Cosmos SDK chain (umee-1)",
    "Gravity Bridge integration for Ethereum assets",
    "Oracle module for price feeds",
    "Uses CosmJS for JavaScript integration",
    "LCD/RPC endpoints for direct queries",
  ],
};

export default umeeDEX;
