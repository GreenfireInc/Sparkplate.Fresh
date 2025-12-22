// Astroport DEX Information
// Leading multi-chain AMM on Terra
// Source: Research compiled from Oct14.Research.Cryptocurrency.LUNA.Terra

export const astroportDEX = {
  name: "Astroport",
  blockchain: "Terra (LUNA)",
  type: "Multi-Chain AMM",
  description: "Leading DEX protocol on Terra with advanced AMM features, cross-chain support, and the largest TVL in the Terra ecosystem. Built on CosmWasm with multiple pool types including XYK, stable swap, and PCL (passive concentrated liquidity).",
  
  urls: {
    main: "https://astroport.fi/",
    app: "https://app.astroport.fi/",
    docs: "https://docs.astroport.fi/",
    analytics: "https://app.astroport.fi/analytics",
  },
  
  api: {
    endpoints: {
      graphql: "https://api.astroport.fi/graphql",
      terraLcd: "https://phoenix-lcd.terra.dev/",
      contractQuery: "CosmWasm smart contract queries via LCD",
    },
    documentation: "https://docs.astroport.fi/",
    apiReference: "https://docs.astroport.fi/docs/develop/smart-contracts/introduction",
    rateLimit: "Public GraphQL API available",
    requiresApiKey: false,
  },
  
  contracts: {
    terra2: {
      chainId: "phoenix-1",
      factory: "terra1fnywlw4edny3vw44x04xd67uzkdqluymgreu7g",
      router: "terra1j8hayvehvlwc8h6x5zz9zcz3jh7p7j8v6z8z8z",
      generator: "terra1gc4d4v82vjgkz0ag28lrmlxx3tf6sq69tmaujj",
    },
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@astroport/sdk",
          package: "@astroport/sdk",
          description: "Official Astroport SDK for TypeScript/JavaScript",
          installCommand: "npm install @astroport/sdk",
        },
        {
          name: "@terra-money/feather.js",
          package: "@terra-money/feather.js",
          description: "Terra multi-chain SDK for contract interaction",
          installCommand: "npm install @terra-money/feather.js",
        },
        {
          name: "@cosmjs/stargate",
          package: "@cosmjs/stargate",
          description: "CosmJS for Cosmos SDK chain interaction",
          installCommand: "npm install @cosmjs/stargate",
        },
        {
          name: "@apollo/client",
          package: "@apollo/client",
          description: "Apollo Client for GraphQL queries",
          installCommand: "npm install @apollo/client graphql",
        },
      ],
      documentation: "https://docs.astroport.fi/docs/develop/smart-contracts/introduction",
    },
  },
  
  integration: {
    graphqlExample: `
import { ApolloClient, InMemoryCache, gql } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api.astroport.fi/graphql',
  cache: new InMemoryCache(),
});

const query = gql\`
  query GetPools {
    pools {
      id
      token0 {
        symbol
        name
      }
      token1 {
        symbol
        name
      }
      totalLiquidityUSD
      volume24h
      apr
    }
  }
\`;

async function fetchAstroportPools() {
  const { data } = await client.query({ query });
  console.log('Astroport Pools:', data.pools);
  return data.pools;
}

fetchAstroportPools();
    `,
    
    contractQueryExample: `
import { LCDClient } from '@terra-money/feather.js';

const lcd = new LCDClient({
  terra: {
    lcd: 'https://phoenix-lcd.terra.dev',
    chainID: 'phoenix-1',
    gasAdjustment: 1.75,
    gasPrices: { uluna: 0.015 },
    prefix: 'terra',
  },
});

// Query pool info from Astroport factory
async function getAstroportPoolInfo(pairAddress: string) {
  const poolInfo = await lcd.wasm.contractQuery(pairAddress, {
    pool: {}
  });
  
  console.log('Pool reserves:', poolInfo);
  return poolInfo;
}

// Query pair info
async function getAstroportPairInfo(factoryAddress: string, assetInfos: any[]) {
  const pairInfo = await lcd.wasm.contractQuery(factoryAddress, {
    pair: { asset_infos: assetInfos }
  });
  
  console.log('Pair info:', pairInfo);
  return pairInfo;
}

const factoryAddress = 'terra1fnywlw4edny3vw44x04xd67uzkdqluymgreu7g';
getAstroportPairInfo(factoryAddress, [
  { native_token: { denom: 'uluna' } },
  { token: { contract_addr: 'terra1...' } }
]);
    `,
    
    swapSimulationExample: `
import { LCDClient } from '@terra-money/feather.js';

const lcd = new LCDClient({
  terra: {
    lcd: 'https://phoenix-lcd.terra.dev',
    chainID: 'phoenix-1',
    gasAdjustment: 1.75,
    gasPrices: { uluna: 0.015 },
    prefix: 'terra',
  },
});

// Simulate a swap on Astroport
async function simulateAstroportSwap(pairAddress: string, offerAsset: any) {
  const simulation = await lcd.wasm.contractQuery(pairAddress, {
    simulation: {
      offer_asset: offerAsset
    }
  });
  
  console.log('Swap simulation:', simulation);
  console.log('Return amount:', simulation.return_amount);
  console.log('Commission:', simulation.commission_amount);
  console.log('Spread:', simulation.spread_amount);
  
  return simulation;
}

// Example: Simulate swapping 1000 LUNA
simulateAstroportSwap('terra1...', {
  info: { native_token: { denom: 'uluna' } },
  amount: '1000000000' // 1000 LUNA (6 decimals)
});
    `,
  },
  
  social: {
    twitter: "https://twitter.com/astroport_fi",
    discord: "https://discord.gg/astroport",
    telegram: "https://t.me/astroport_fi",
    github: "https://github.com/astroport-fi",
    medium: "https://astroport.medium.com/",
  },
  
  features: {
    hasApi: true,
    hasSdk: true,
    hasSubgraph: false,
    hasGraphQL: true,
    isActive: true,
    supportsCrossChain: true,
    hasLiquidityMining: true,
    isEvmCompatible: false,
    isCosmWasm: true,
    hasMultiplePoolTypes: true,
    hasConcentratedLiquidity: true, // PCL pools
    hasStableSwap: true,
    tvl: "$50+ million",
    volume24h: "$5+ million",
  },
  
  notes: [
    "Astroport is the largest DEX on Terra by TVL and volume",
    "Supports multiple pool types: XYK, Stable Swap, and PCL (Passive Concentrated Liquidity)",
    "Built on CosmWasm smart contracts",
    "Cross-chain support via IBC and Wormhole",
    "GraphQL API for easy data access",
    "Governance via ASTRO token",
    "Liquidity incentives through generator contracts",
  ],
};

