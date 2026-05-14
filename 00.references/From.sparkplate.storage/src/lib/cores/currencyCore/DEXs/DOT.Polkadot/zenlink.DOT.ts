// Zenlink DEX Information
// Cross-parachain DEX protocol for Polkadot
// Source: Research compiled from Oct14.Research.Cryptocurrency.DOT.Polkadot

export const zenlinkDEX = {
  name: "Zenlink",
  blockchain: "Polkadot (Multi-parachain)",
  type: "Cross-Parachain DEX Protocol",
  description: "DEX protocol aggregating liquidity across parachains. Zenlink is a cross-chain DEX protocol built for Polkadot ecosystem, enabling parachains to integrate DEX functionality and share liquidity.",
  
  urls: {
    main: "https://dex.zenlink.pro/",
    app: "https://dex.zenlink.pro/swap",
    docs: "https://wiki.zenlink.pro/",
    wiki: "https://wiki.zenlink.pro/",
  },
  
  api: {
    endpoints: {
      subgraph: "https://api.subquery.network/sq/zenlink-protocol",
      baseUrl: "https://dex.zenlink.pro",
    },
    documentation: "https://wiki.zenlink.pro/",
    rateLimit: "Public endpoints available - varies by parachain",
    requiresApiKey: false,
    publicProviders: [
      "Check individual parachain RPC endpoints",
      "Zenlink operates across multiple parachains",
    ],
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@zenlink-dex/sdk",
          package: "@zenlink-dex/sdk",
          description: "Official Zenlink SDK for DEX integration",
          installCommand: "npm install @zenlink-dex/sdk",
          github: "https://github.com/zenlinkpro",
        },
        {
          name: "@polkadot/api",
          package: "@polkadot/api",
          description: "Polkadot.js API for Substrate chains",
          installCommand: "npm install @polkadot/api",
        },
      ],
      documentation: "https://docs.zenlink.pro/",
    },
  },
  
  integration: {
    polkadotJsExample: `
// Connect to a parachain with Zenlink module
import { ApiPromise, WsProvider } from '@polkadot/api';

const provider = new WsProvider('wss://your-parachain-node');
const api = await ApiPromise.create({ provider });

// Query Zenlink DEX module (if available)
async function getZenlinkPool() {
  try {
    const pool = await api.query.zenlinkProtocol.pairs('0x123...');
    console.log('Pool Data:', pool.toHuman());
  } catch (error) {
    console.log('Zenlink module not available on this parachain');
  }
}

await getZenlinkPool();
    `,
    
    subqueryExample: `
import { request, gql } from 'graphql-request';

const query = gql\`
  query GetZenlinkData {
    zenlinkDayDatas(orderBy: DATE_DESC, first: 7) {
      date
      dailyVolumeUSD
      totalLiquidityUSD
    }
    zenlinkPairs(where: { token0: { symbol_eq: "DOT" } }) {
      token0 { symbol }
      token1 { symbol }
      reserve0
      reserve1
      totalSupply
    }
  }
\`;

const data = await request('https://api.subquery.network/sq/zenlink-protocol', query);
console.log('Zenlink Analytics:', data);
    `,
    
    aggregationExample: `
// Zenlink as a cross-chain DEX aggregator
import { ApiPromise, WsProvider } from '@polkadot/api';

async function getCrossChainPrice() {
  const parachains = [
    { name: 'Moonbeam', ws: 'wss://wss.api.moonbeam.network' },
    { name: 'Astar', ws: 'wss://rpc.astar.network' },
    { name: 'Acala', ws: 'wss://acala-rpc-0.aca-api.network' }
  ];

  const prices = [];

  for (const chain of parachains) {
    try {
      const provider = new WsProvider(chain.ws);
      const api = await ApiPromise.create({ provider });

      const liquidity = await api.query.zenlinkProtocol.totalLiquidity();

      prices.push({
        chain: chain.name,
        liquidity: liquidity.toHuman()
      });

      await api.disconnect();
    } catch (error) {
      console.log(\`Error on \${chain.name}:\`, error.message);
    }
  }

  console.log('Cross-chain liquidity:', prices);
}
    `,
  },
  
  social: {
    twitter: "https://twitter.com/ZenlinkPro",
    telegram: "https://t.me/zenlink_chat",
    discord: "https://discord.gg/zenlink",
    github: "https://github.com/zenlinkpro",
    medium: "https://medium.com/zenlink",
  },
  
  features: {
    hasApi: false, // Limited public API
    hasSdkRB: true,
    hasSubgraph: true,
    isActive: true,
    supportsCrossChain: true,
    hasLiquidityMining: true,
    isProtocolLevel: true, // Module-based DEX protocol
  },
  
  notes: [
    "Zenlink is a protocol-level DEX that parachains can integrate",
    "Enables cross-chain liquidity sharing across Polkadot ecosystem",
    "Operates as Substrate modules integrated into parachains",
    "Limited public API - mostly accessed via parachain RPC",
  ],
};
