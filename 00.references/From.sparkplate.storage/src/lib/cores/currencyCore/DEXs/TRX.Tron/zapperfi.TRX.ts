// ZapperFi DEX Information
// Multi-chain DeFi dashboard with Tron support
// Source: Research compiled from Oct14.Research.Cryptocurrency.TRX.Tron

export const zapperfiDEX = {
  name: "ZapperFi (Tron)",
  blockchain: "Tron (TRX)",
  type: "DeFi Dashboard",
  description: "Multi-chain DeFi dashboard and aggregator with Tron DEX aggregation. ZapperFi provides a unified interface for managing DeFi positions across multiple blockchains including Tron.",
  
  urls: {
    main: "https://zapper.fi/",
    app: "https://zapper.fi/dashboard",
    swap: "https://zapper.fi/exchange",
    docs: "https://docs.zapper.fi/",
  },
  
  api: {
    endpoints: {
      zapperApi: "https://api.zapper.fi",
      tronGridApi: "https://api.trongrid.io",
    },
    documentation: "https://docs.zapper.fi/",
    apiReference: "https://api.zapper.fi/api/static/index.html",
    rateLimit: "Requires API key",
    requiresApiKey: true,
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@zapper-fi/sdk",
          package: "@zapper-fi/sdk",
          description: "Zapper SDK for DeFi integrations",
          installCommand: "npm install @zapper-fi/sdk",
        },
        {
          name: "tronweb",
          package: "tronweb",
          description: "Tron blockchain SDK",
          installCommand: "npm install tronweb",
        },
      ],
      documentation: "https://docs.zapper.fi/",
    },
  },
  
  integration: {
    example: `
import axios from 'axios';

// Get portfolio balance from ZapperFi
async function getZapperBalance(address: string, apiKey: string) {
  const response = await axios.get(
    \`https://api.zapper.fi/v2/balances?addresses[]=\${address}&networks[]=tron\`,
    {
      headers: {
        'Authorization': \`Basic \${apiKey}\`
      }
    }
  );
  
  console.log('Zapper Portfolio:', response.data);
  
  return response.data;
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/zapper_fi",
    discord: "https://discord.gg/zapper",
  },
  
  features: {
    hasApi: true,
    hasSdk: true,
    hasSubgraph: false,
    hasGraphQL: false,
    isActive: true,
    supportsCrossChain: true,
    hasLiquidityMining: false,
    isEvmCompatible: true,
    isTVM: false, // Multi-chain aggregator
    hasSolidityContracts: false,
    isDashboard: true,
    isAggregator: true,
    supportsMultipleChains: true,
    tvl: "N/A (Aggregator)",
    volume24h: "N/A (Aggregator)",
  },
  
  notes: [
    "ZapperFi is a multi-chain DeFi dashboard",
    "Aggregates data from Tron and other blockchains",
    "Unified interface for portfolio management",
    "Supports Ethereum, BSC, Polygon, Tron, and more",
    "Real-time portfolio tracking",
    "DEX aggregation for best swap rates",
    "API requires authentication",
    "Popular tool for DeFi users",
  ],
};
