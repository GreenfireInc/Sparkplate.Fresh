// TerraSwap DEX Information
// Original Terra DEX, primarily on Terra Classic
// Source: Research compiled from Oct14.Research.Cryptocurrency.LUNA.Terra

export const terraswapDEX = {
  name: "TerraSwap",
  blockchain: "Terra (LUNA) / Terra Classic (LUNC)",
  type: "Classic AMM",
  description: "Original Terra DEX, primarily operating on Terra Classic now. TerraSwap was the first major DEX on Terra and continues to serve the Terra Classic community with AMM functionality.",
  
  urls: {
    main: "https://terraswap.io/",
    app: "https://app.terraswap.io/",
    docs: "https://docs.terraswap.io/",
    classicApp: "https://classic.terraswap.io/",
  },
  
  api: {
    endpoints: {
      terraClassicLcd: "https://terra-classic-lcd.publicnode.com/",
      terra2Lcd: "https://phoenix-lcd.terra.dev/",
      contractQuery: "CosmWasm smart contract queries via LCD",
      restApi: "https://api.terraswap.io/v1/",
    },
    documentation: "https://docs.terraswap.io/",
    apiReference: "https://docs.terraswap.io/docs/contract/pair",
    rateLimit: "Public API available",
    requiresApiKey: false,
  },
  
  contracts: {
    terraClassic: {
      chainId: "columbus-5",
      factory: "terra1ulgw0td86nvs4wtpsc80thv6xelk76ut7a7apj",
      router: "terra19qx5xe6q9ll4w0890ux7lv2p4mf3csd4qvt3ex",
    },
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
          name: "@terra-money/terra.js",
          package: "@terra-money/terra.js",
          description: "Terra Classic SDK for contract interaction",
          installCommand: "npm install @terra-money/terra.js",
        },
        {
          name: "@terra-money/feather.js",
          package: "@terra-money/feather.js",
          description: "Terra 2.0 multi-chain SDK",
          installCommand: "npm install @terra-money/feather.js",
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
    restApiExample: `
import axios from 'axios';

// Fetch token price from TerraSwap API
async function getTerraswapPrice(tokenSymbol: string) {
  const response = await axios.get(
    \`https://api.terraswap.io/v1/price?token=\${tokenSymbol}\`
  );
  
  console.log(\`\${tokenSymbol} Price:\`, response.data.price);
  return response.data.price;
}

getTerraswapPrice('LUNA');
    `,
    
    poolQueryExample: `
import { LCDClient } from '@terra-money/terra.js';

const lcd = new LCDClient({
  URL: 'https://terra-classic-lcd.publicnode.com',
  chainID: 'columbus-5',
});

// Query TerraSwap pool on Terra Classic
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
  URL: 'https://terra-classic-lcd.publicnode.com',
  chainID: 'columbus-5',
});

// Simulate swap on TerraSwap
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
  URL: 'https://terra-classic-lcd.publicnode.com',
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
    tvl: "$2+ million (Classic)",
    volume24h: "$100k+ (Classic)",
  },
  
  notes: [
    "TerraSwap was the first major DEX on Terra",
    "Primarily operates on Terra Classic (LUNC) now",
    "Limited activity on Terra 2.0 (LUNA)",
    "Simple AMM model similar to Uniswap V2",
    "Built on CosmWasm smart contracts",
    "Historical significance in Terra ecosystem",
    "REST API for easy price queries",
    "Community continues to support on Terra Classic",
  ],
};

