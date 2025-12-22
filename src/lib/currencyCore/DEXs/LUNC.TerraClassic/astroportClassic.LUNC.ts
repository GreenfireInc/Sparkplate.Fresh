// Astroport Classic DEX Information
// Astroport deployment on Terra Classic
// Source: Research compiled from Oct14.Research.Cryptocurrency.LUNC.TerraClassic

export const astroportClassicDEX = {
  name: "Astroport Classic",
  blockchain: "Terra Classic (LUNC)",
  type: "Classic AMM",
  description: "Astroport's deployment on Terra Classic (Columbus-5). While Astroport primarily focuses on Terra 2.0, the Classic deployment continues to serve the Terra Classic community with advanced AMM features and multiple pool types.",
  
  urls: {
    main: "https://astroport.fi/",
    classic: "https://classic.astroport.fi/",
    docs: "https://docs.astroport.fi/",
    app: "https://app.astroport.fi/",
  },
  
  api: {
    endpoints: {
      terraClassicLcd: "https://fcd.terra.money/",
      publicNodeLcd: "https://terra-classic-lcd.publicnode.com/",
      contractQuery: "CosmWasm smart contract queries via LCD",
    },
    documentation: "https://docs.astroport.fi/",
    apiReference: "https://docs.astroport.fi/docs/develop/smart-contracts/introduction",
    rateLimit: "Public LCD API available",
    requiresApiKey: false,
  },
  
  contracts: {
    terraClassic: {
      chainId: "columbus-5",
      factory: "terra1...",
      router: "terra1...",
    },
  },
  
  sdk: {
    typescript: {
      packages: [
        {
          name: "@terra-money/terra.js",
          package: "@terra-money/terra.js",
          description: "Terra Classic SDK for contract interaction",
          installCommand: "npm install @terra-money/terra.js",
        },
        {
          name: "@cosmjs/stargate",
          package: "@cosmjs/stargate",
          description: "CosmJS for Cosmos SDK chain interaction",
          installCommand: "npm install @cosmjs/stargate",
        },
        {
          name: "axios",
          package: "axios",
          description: "HTTP client for API requests",
          installCommand: "npm install axios",
        },
      ],
      documentation: "https://docs.astroport.fi/",
    },
  },
  
  integration: {
    poolQueryExample: `
import { LCDClient } from '@terra-money/terra.js';

const lcd = new LCDClient({
  URL: 'https://fcd.terra.money',
  chainID: 'columbus-5',
});

// Query Astroport Classic pool
async function getAstroportClassicPoolInfo(pairAddress: string) {
  const poolInfo = await lcd.wasm.contractQuery(pairAddress, {
    pool: {}
  });
  
  console.log('Astroport Classic Pool Info:', poolInfo);
  console.log('Assets:', poolInfo.assets);
  
  return poolInfo;
}

getAstroportClassicPoolInfo('terra1...');
    `,
    
    swapSimulationExample: `
import { LCDClient } from '@terra-money/terra.js';

const lcd = new LCDClient({
  URL: 'https://fcd.terra.money',
  chainID: 'columbus-5',
});

// Simulate swap on Astroport Classic
async function simulateAstroportClassicSwap(pairAddress: string, offerAsset: any) {
  const simulation = await lcd.wasm.contractQuery(pairAddress, {
    simulation: {
      offer_asset: offerAsset
    }
  });
  
  console.log('Swap Simulation:', simulation);
  console.log('Return amount:', simulation.return_amount);
  console.log('Commission:', simulation.commission_amount);
  console.log('Spread:', simulation.spread_amount);
  
  return simulation;
}

simulateAstroportClassicSwap('terra1...', {
  info: { native_token: { denom: 'uluna' } },
  amount: '1000000'
});
    `,
    
    pairQueryExample: `
import { LCDClient } from '@terra-money/terra.js';

const lcd = new LCDClient({
  URL: 'https://fcd.terra.money',
  chainID: 'columbus-5',
});

// Query pair from Astroport Classic factory
async function getAstroportClassicPair(factoryAddress: string, assetInfos: any[]) {
  const pairInfo = await lcd.wasm.contractQuery(factoryAddress, {
    pair: {
      asset_infos: assetInfos
    }
  });
  
  console.log('Pair Address:', pairInfo.contract_addr);
  console.log('Liquidity Token:', pairInfo.liquidity_token);
  
  return pairInfo;
}

getAstroportClassicPair('terra1...', [
  { native_token: { denom: 'uluna' } },
  { token: { contract_addr: 'terra1...' } }
]);
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
    hasSdk: false,
    hasSubgraph: false,
    hasGraphQL: false,
    isActive: true,
    supportsCrossChain: false,
    hasLiquidityMining: false,
    isEvmCompatible: false,
    isCosmWasm: true,
    isLegacyDeployment: true,
    supportsTerraClassic: true,
    hasMultiplePoolTypes: true,
    tvl: "$800k+",
    volume24h: "$40k+",
  },
  
  notes: [
    "Astroport Classic is the Terra Classic deployment",
    "Main Astroport focus is on Terra 2.0 (phoenix-1)",
    "Multiple pool types: XYK, Stable Swap",
    "Built on CosmWasm smart contracts",
    "Limited maintenance compared to Terra 2.0 version",
    "Community continues to use for Classic liquidity",
    "Advanced AMM features available",
    "Part of original Terra DeFi ecosystem",
  ],
};
