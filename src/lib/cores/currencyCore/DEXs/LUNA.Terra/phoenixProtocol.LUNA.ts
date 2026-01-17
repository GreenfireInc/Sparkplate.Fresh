// Phoenix Protocol DEX Information
// Native Terra DEX rising from Terra 2.0
// Source: Research compiled from Oct14.Research.Cryptocurrency.LUNA.Terra

export const phoenixProtocolDEX = {
  name: "Phoenix Protocol",
  blockchain: "Terra (LUNA)",
  type: "AMM DEX",
  description: "Native Terra DEX rising from the ashes of Terra 2.0. Phoenix Protocol provides automated market maker functionality with a focus on simplicity and community governance.",
  
  urls: {
    main: "https://phoenixfi.app/",
    app: "https://app.phoenixfi.app/",
    docs: "https://docs.phoenixfi.app/",
    analytics: "https://app.phoenixfi.app/analytics",
  },
  
  api: {
    endpoints: {
      terraLcd: "https://phoenix-lcd.terra.dev/",
      contractQuery: "CosmWasm smart contract queries via LCD",
    },
    documentation: "https://docs.phoenixfi.app/",
    apiReference: "https://docs.phoenixfi.app/developers/smart-contracts",
    rateLimit: "Public LCD API available",
    requiresApiKey: false,
  },
  
  contracts: {
    terra2: {
      chainId: "phoenix-1",
      factory: "terra1...",
      router: "terra1...",
    },
  },
  
  sdk: {
    typescript: {
      packages: [
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
          name: "axios",
          package: "axios",
          description: "HTTP client for API requests",
          installCommand: "npm install axios",
        },
      ],
      documentation: "https://docs.phoenixfi.app/",
    },
  },
  
  integration: {
    poolQueryExample: `
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

// Query Phoenix Protocol pool
async function getPhoenixPoolInfo(pairAddress: string) {
  const poolInfo = await lcd.wasm.contractQuery(pairAddress, {
    pool: {}
  });
  
  console.log('Phoenix Pool Info:', poolInfo);
  console.log('Asset 0:', poolInfo.assets[0]);
  console.log('Asset 1:', poolInfo.assets[1]);
  
  return poolInfo;
}

getPhoenixPoolInfo('terra1...');
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

// Simulate swap on Phoenix Protocol
async function simulatePhoenixSwap(pairAddress: string, offerAsset: any) {
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

simulatePhoenixSwap('terra1...', {
  info: { native_token: { denom: 'uluna' } },
  amount: '1000000'
});
    `,
    
    pairQueryExample: `
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

// Query pair from factory
async function getPhoenixPair(factoryAddress: string, assetInfos: any[]) {
  const pairInfo = await lcd.wasm.contractQuery(factoryAddress, {
    pair: {
      asset_infos: assetInfos
    }
  });
  
  console.log('Pair Address:', pairInfo.contract_addr);
  console.log('Liquidity Token:', pairInfo.liquidity_token);
  
  return pairInfo;
}

const factoryAddress = 'terra1...';
getPhoenixPair(factoryAddress, [
  { native_token: { denom: 'uluna' } },
  { token: { contract_addr: 'terra1...' } }
]);
    `,
  },
  
  social: {
    twitter: "https://twitter.com/PhoenixFi_Terra",
    discord: "https://discord.gg/phoenixfi",
    telegram: "https://t.me/phoenixfi",
    github: "https://github.com/phoenixfi",
  },
  
  features: {
    hasApi: true,
    hasSdk: false,
    hasSubgraph: false,
    hasGraphQL: false,
    isActive: true,
    supportsCrossChain: false,
    hasLiquidityMining: true,
    isEvmCompatible: false,
    isCosmWasm: true,
    hasCommunityGovernance: true,
    tvl: "$5+ million",
    volume24h: "$500k+",
  },
  
  notes: [
    "Phoenix Protocol emerged after Terra 2.0 launch",
    "Community-driven DEX with governance token",
    "Simple AMM model focused on core functionality",
    "Built on CosmWasm smart contracts",
    "Native to Terra blockchain",
    "Competitive fee structure",
    "Growing liquidity pools",
  ],
};
