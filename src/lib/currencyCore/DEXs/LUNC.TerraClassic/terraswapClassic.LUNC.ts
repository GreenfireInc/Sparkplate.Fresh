// TerraSwap Classic DEX Information
// Original Terra DEX, primary exchange on Terra Classic
// Source: Research compiled from Oct14.Research.Cryptocurrency.LUNC.TerraClassic

export const terraswapClassicDEX = {
  name: "TerraSwap Classic",
  blockchain: "Terra Classic (LUNC)",
  type: "Classic AMM",
  description: "The original Terra DEX and primary decentralized exchange on Terra Classic (Columbus-5). TerraSwap Classic continues to serve the Terra Classic community with AMM functionality for LUNC, USTC, and CW20 token pairs.",
  
  urls: {
    main: "https://terraswap.io/",
    app: "https://app.terraswap.io/",
    classic: "https://classic.terraswap.io/",
    docs: "https://docs.terraswap.io/",
  },
  
  api: {
    endpoints: {
      tfmAggregator: "https://routing-api.tfm.dev/route",
      terraClassicLcd: "https://fcd.terra.money/",
      publicNodeLcd: "https://terra-classic-lcd.publicnode.com/",
      contractQuery: "CosmWasm smart contract queries via LCD",
    },
    documentation: "https://docs.terraswap.io/",
    apiReference: "https://docs.terraswap.io/docs/contract/pair",
    rateLimit: "Public LCD API available",
    requiresApiKey: false,
  },
  
  contracts: {
    terraClassic: {
      chainId: "columbus-5",
      factory: "terra1ulgw0td86nvs4wtpsc80thv6xelk76ut7a7apj",
      router: "terra19qx5xe6q9ll4w0890ux7lv2p4mf3csd4qvt3ex",
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
      documentation: "https://docs.terraswap.io/",
    },
  },
  
  integration: {
    tfmAggregatorExample: `
import axios from 'axios';

// Fetch LUNC/USTC price from TFM DEX aggregator
async function fetchTerraswapLuncPrice() {
  const response = await axios.get(
    'https://routing-api.tfm.dev/route?from=LUNC&to=USTC&amount=1000000'
  );
  
  console.log('LUNC/USTC Price:', response.data.price);
  console.log('Best Route:', response.data.route);
  
  return response.data;
}

fetchTerraswapLuncPrice();
    `,
    
    poolQueryExample: `
import { LCDClient } from '@terra-money/terra.js';

const lcd = new LCDClient({
  URL: 'https://fcd.terra.money',
  chainID: 'columbus-5',
});

// Query TerraSwap Classic pool
async function getTerraswapPoolInfo(pairAddress: string) {
  const poolInfo = await lcd.wasm.contractQuery(pairAddress, {
    pool: {}
  });
  
  console.log('TerraSwap Pool Info:', poolInfo);
  console.log('Asset 0:', poolInfo.assets[0]);
  console.log('Asset 1:', poolInfo.assets[1]);
  console.log('Total Share:', poolInfo.total_share);
  
  return poolInfo;
}

getTerraswapPoolInfo('terra1...');
    `,
    
    swapSimulationExample: `
import { LCDClient } from '@terra-money/terra.js';

const lcd = new LCDClient({
  URL: 'https://fcd.terra.money',
  chainID: 'columbus-5',
});

// Simulate swap on TerraSwap Classic
async function simulateTerraswapSwap(pairAddress: string, offerAsset: any) {
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

simulateTerraswapSwap('terra1...', {
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

// Query pair from TerraSwap factory
async function getTerraswapPair(assetInfos: any[]) {
  const factoryAddress = 'terra1ulgw0td86nvs4wtpsc80thv6xelk76ut7a7apj';
  
  const pairInfo = await lcd.wasm.contractQuery(factoryAddress, {
    pair: {
      asset_infos: assetInfos
    }
  });
  
  console.log('Pair Address:', pairInfo.contract_addr);
  console.log('Liquidity Token:', pairInfo.liquidity_token);
  
  return pairInfo;
}

getTerraswapPair([
  { native_token: { denom: 'uluna' } },
  { native_token: { denom: 'uusd' } }
]);
    `,
  },
  
  social: {
    twitter: "https://twitter.com/terraswap_io",
    telegram: "https://t.me/terraswap",
    github: "https://github.com/terraswap",
    medium: "https://terraswap.medium.com/",
  },
  
  features: {
    hasApi: true,
    hasSdk: true,
    hasSubgraph: false,
    hasGraphQL: false,
    isActive: true,
    supportsCrossChain: false,
    hasLiquidityMining: false,
    isEvmCompatible: false,
    isCosmWasm: true,
    isLegacyDex: true,
    supportsTerraClassic: true,
    tvl: "$1+ million",
    volume24h: "$50k+",
  },
  
  notes: [
    "TerraSwap Classic is the original Terra DEX",
    "Primary exchange on Terra Classic (columbus-5)",
    "Simple AMM model similar to Uniswap V2",
    "Built on CosmWasm smart contracts",
    "Supports LUNC, USTC, and CW20 tokens",
    "Community continues to support Terra Classic",
    "TFM DEX aggregator provides routing API",
    "Historical significance in Terra ecosystem",
  ],
};
