// Shade Protocol DEX Information
// Privacy-focused DeFi platform on Secret Network (Cosmos)
// Source: Research compiled from multiple sources

export const shadeProtocolDEX = {
  name: "Shade Protocol",
  blockchain: "Cosmos (Secret Network)",
  type: "Private DeFi",
  description: "Privacy-focused DEX on Secret Network. Shade Protocol is a suite of privacy-preserving DeFi applications built on Secret Network, including ShadeSwap DEX with private transactions.",
  
  urls: {
    main: "https://shadeprotocol.io/",
    app: "https://app.shadeprotocol.io/",
    swap: "https://app.shadeprotocol.io/swap",
    docs: "https://docs.shadeprotocol.io/",
  },
  
  api: {
    endpoints: {
      secretRpc: "https://rpc.secret.express",
      secretLcd: "https://lcd.secret.express",
      publicRpc: "https://secret-rpc.lavenderfive.com",
    },
    documentation: "https://docs.shadeprotocol.io/shade-protocol/",
    rateLimit: "Check documentation for current limits",
    requiresApiKey: false,
    note: "Privacy features may limit public query capabilities",
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "secretjs",
          package: "secretjs",
          description: "Secret Network JavaScript SDK",
          installCommand: "npm install secretjs",
          github: "https://github.com/scrtlabs/secret.js",
          documentation: "https://secretjs.scrt.network/",
        },
        {
          name: "@cosmjs/stargate",
          package: "@cosmjs/stargate",
          description: "Core Cosmos SDK interaction",
          installCommand: "npm install @cosmjs/stargate",
        },
      ],
      documentation: "https://docs.shadeprotocol.io/shade-protocol/developers/",
    },
  },
  
  integration: {
    exampleUsage: `
import { SecretNetworkClient } from "secretjs";

// Connect to Secret Network
const grpcWebUrl = "https://grpc.secret.express";
const chainId = "secret-4";

const client = new SecretNetworkClient({
  url: grpcWebUrl,
  chainId: chainId,
});

// Query Shade Swap contract (with viewing key for private data)
async function getShadeSwapPrice(
  contractAddress: string,
  contractCodeHash: string
) {
  // Note: Some data may require viewing keys for privacy
  const poolInfo = await client.query.compute.queryContract({
    contract_address: contractAddress,
    code_hash: contractCodeHash,
    query: { get_pair_info: {} },
  });
  
  return poolInfo;
}

// Query public pool data
async function getPublicPoolInfo(pairContract: string, codeHash: string) {
  const query = await client.query.compute.queryContract({
    contract_address: pairContract,
    code_hash: codeHash,
    query: {
      pool: {},
    },
  });
  
  // Extract reserves (may be private)
  return query;
}

// Simulate swap (public)
async function simulateSwap(
  pairContract: string,
  codeHash: string,
  offerAmount: string,
  offerAsset: any
) {
  const simulation = await client.query.compute.queryContract({
    contract_address: pairContract,
    code_hash: codeHash,
    query: {
      simulation: {
        offer_asset: offerAsset,
        amount: offerAmount,
      },
    },
  });
  
  return simulation;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/Shade_Protocol",
    discord: "https://discord.gg/shadeprotocol",
    telegram: "https://t.me/ShadeProtocol",
    medium: "https://medium.com/@shadeprotocoldevs",
    github: "https://github.com/securesecrets/shade",
  },
  
  network: {
    mainnet: {
      chainId: "secret-4",
      rpc: "https://rpc.secret.express",
      lcd: "https://lcd.secret.express",
      grpc: "https://grpc.secret.express",
    },
  },
  
  products: {
    shadeSwap: {
      name: "ShadeSwap",
      description: "Privacy-preserving AMM DEX",
      url: "https://app.shadeprotocol.io/swap",
    },
    silk: {
      name: "Silk",
      description: "Privacy-preserving stablecoin",
      url: "https://app.shadeprotocol.io/silk",
    },
    shadeLend: {
      name: "Shade Lend",
      description: "Private lending and borrowing",
      url: "https://app.shadeprotocol.io/lend",
    },
  },
  
  features: {
    swaps: true,
    liquidityProvision: true,
    yieldFarming: true,
    limitOrders: false,
    governance: true,
    nftSupport: false,
    privateTransactions: true,
    stablecoin: true,
    lending: true,
    borrowing: true,
    syntheticAssets: true,
  },
  
  notes: [
    "Privacy-focused DeFi suite on Secret Network",
    "Uses Secret Network's encrypted smart contracts",
    "ShadeSwap: private AMM with encrypted reserves",
    "SILK: privacy-preserving stablecoin",
    "SHD token for governance and rewards",
    "Requires secretjs SDK for integration",
    "Some data may require viewing keys due to privacy",
    "Secret Network is a Cosmos SDK chain with TEE (Trusted Execution Environment)",
    "CosmWasm contracts with privacy features",
  ],
};

export default shadeProtocolDEX;
