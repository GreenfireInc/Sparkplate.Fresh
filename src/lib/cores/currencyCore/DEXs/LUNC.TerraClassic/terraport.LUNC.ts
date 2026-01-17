// Terraport DEX Information
// Cross-chain bridge and DEX connecting Terra Classic
// Source: Research compiled from Oct14.Research.Cryptocurrency.LUNC.TerraClassic

export const terraportDEX = {
  name: "Terraport",
  blockchain: "Terra Classic (LUNC)",
  type: "Cross-Chain Bridge & DEX",
  description: "A decentralized finance (DeFi) platform on Terra Classic that includes a cross-chain bridge and DEX for trading LUNC and other tokens. Terraport focuses on generating revenue for the protocol and burning LUNC supply to reduce inflation.",
  
  urls: {
    main: "https://terraport.finance/",
    app: "https://app.terraport.finance/",
    docs: "https://docs.terraport.finance/",
    proposal: "https://classic-agora.terra.money/t/terra-classic-community-dex/48567",
  },
  
  api: {
    endpoints: {
      terraClassicLcd: "https://fcd.terra.money/",
      publicNodeLcd: "https://terra-classic-lcd.publicnode.com/",
      contractQuery: "CosmWasm smart contract queries via LCD",
      bridge: "Cross-chain bridge endpoints",
    },
    documentation: "https://docs.terraport.finance/",
    apiReference: "https://docs.terraport.finance/api",
    rateLimit: "Public LCD API available",
    requiresApiKey: false,
  },
  
  contracts: {
    terraClassic: {
      chainId: "columbus-5",
      bridge: "terra1...",
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
      documentation: "https://docs.terraport.finance/",
    },
  },
  
  integration: {
    poolQueryExample: `
import { LCDClient } from '@terra-money/terra.js';

const lcd = new LCDClient({
  URL: 'https://fcd.terra.money',
  chainID: 'columbus-5',
});

// Query Terraport pool info
async function getTerraportPoolInfo(poolAddress: string) {
  const poolInfo = await lcd.wasm.contractQuery(poolAddress, {
    pool: {}
  });
  
  console.log('Terraport Pool Info:', poolInfo);
  return poolInfo;
}

getTerraportPoolInfo('terra1...');
    `,
    
    bridgeQueryExample: `
import { LCDClient } from '@terra-money/terra.js';

const lcd = new LCDClient({
  URL: 'https://fcd.terra.money',
  chainID: 'columbus-5',
});

// Query bridge status
async function getBridgeStatus(bridgeAddress: string) {
  const status = await lcd.wasm.contractQuery(bridgeAddress, {
    status: {}
  });
  
  console.log('Bridge Status:', status);
  console.log('Supported Chains:', status.supported_chains);
  
  return status;
}

getBridgeStatus('terra1...');
    `,
    
    swapExample: `
import { LCDClient } from '@terra-money/terra.js';

const lcd = new LCDClient({
  URL: 'https://fcd.terra.money',
  chainID: 'columbus-5',
});

// Simulate swap on Terraport
async function simulateTerraportSwap(poolAddress: string, offerAsset: any) {
  const simulation = await lcd.wasm.contractQuery(poolAddress, {
    simulation: {
      offer_asset: offerAsset
    }
  });
  
  console.log('Swap Simulation:', simulation);
  return simulation;
}

simulateTerraportSwap('terra1...', {
  info: { native_token: { denom: 'uluna' } },
  amount: '1000000'
});
    `,
  },
  
  social: {
    twitter: "https://twitter.com/TerraportFi",
    telegram: "https://t.me/terraportfinance",
    discord: "https://discord.gg/terraport",
    github: "https://github.com/terraport-finance",
  },
  
  features: {
    hasApi: true,
    hasSdk: false,
    hasSubgraph: false,
    hasGraphQL: false,
    isActive: true,
    supportsCrossChain: true,
    hasLiquidityMining: true,
    isEvmCompatible: false,
    isCosmWasm: true,
    hasBridge: true,
    hasLuncBurning: true,
    supportsTerraClassic: true,
    tvl: "$500k+",
    volume24h: "$30k+",
  },
  
  notes: [
    "Terraport is a Terra Classic community DeFi platform",
    "Focuses on LUNC burning to reduce supply",
    "Cross-chain bridge for connecting to other blockchains",
    "Revenue generation for protocol sustainability",
    "Built on CosmWasm smart contracts",
    "Community governance and proposal system",
    "Supports LUNC, USTC, and bridged tokens",
    "Part of Terra Classic revival effort",
  ],
};
