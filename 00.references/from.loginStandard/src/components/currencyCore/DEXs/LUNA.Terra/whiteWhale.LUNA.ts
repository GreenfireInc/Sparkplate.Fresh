// White Whale DEX Information
// Interchain liquidity protocol on Terra
// Source: Research compiled from Oct14.Research.Cryptocurrency.LUNA.Terra

export const whiteWhaleDEX = {
  name: "White Whale",
  blockchain: "Terra (LUNA)",
  type: "Multi-Chain Liquidity Protocol",
  description: "Interchain liquidity protocol with arbitrage vaults and DEX functionality. White Whale provides cross-chain liquidity pools and automated arbitrage strategies across Cosmos ecosystem chains.",
  
  urls: {
    main: "https://www.whitewhale.money/",
    app: "https://app.whitewhale.money/",
    docs: "https://white-whale-defi-platform.github.io/docs/",
    analytics: "https://app.whitewhale.money/dashboard",
  },
  
  api: {
    endpoints: {
      terraLcd: "https://phoenix-lcd.terra.dev/",
      contractQuery: "CosmWasm smart contract queries via LCD",
      ibcEndpoints: "Multiple Cosmos chain LCD endpoints",
    },
    documentation: "https://white-whale-defi-platform.github.io/docs/",
    apiReference: "https://white-whale-defi-platform.github.io/docs/smart-contracts/overview",
    rateLimit: "Public LCD API available",
    requiresApiKey: false,
  },
  
  contracts: {
    terra2: {
      chainId: "phoenix-1",
      vaultFactory: "terra1...",
      poolFactory: "terra1...",
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
      documentation: "https://white-whale-defi-platform.github.io/docs/",
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

// Query White Whale pool info
async function getWhiteWhalePoolInfo(poolAddress: string) {
  const poolInfo = await lcd.wasm.contractQuery(poolAddress, {
    pool: {}
  });
  
  console.log('White Whale Pool Info:', poolInfo);
  return poolInfo;
}

// Query pool config
async function getWhiteWhalePoolConfig(poolAddress: string) {
  const config = await lcd.wasm.contractQuery(poolAddress, {
    config: {}
  });
  
  console.log('Pool Config:', config);
  return config;
}

getWhiteWhalePoolInfo('terra1...');
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

// Simulate swap on White Whale
async function simulateWhiteWhaleSwap(poolAddress: string, offerAsset: any, askAsset: any) {
  const simulation = await lcd.wasm.contractQuery(poolAddress, {
    simulation: {
      offer_asset: offerAsset,
      ask_asset_info: askAsset
    }
  });
  
  console.log('Swap Simulation:', simulation);
  console.log('Return amount:', simulation.return_amount);
  console.log('Spread:', simulation.spread_amount);
  console.log('Commission:', simulation.commission_amount);
  
  return simulation;
}

simulateWhiteWhaleSwap(
  'terra1...',
  { native_token: { denom: 'uluna' }, amount: '1000000' },
  { native_token: { denom: 'uusd' } }
);
    `,
    
    vaultQueryExample: `
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

// Query arbitrage vault info
async function getVaultInfo(vaultAddress: string) {
  const vaultInfo = await lcd.wasm.contractQuery(vaultAddress, {
    vault_info: {}
  });
  
  console.log('Vault Info:', vaultInfo);
  console.log('Total Assets:', vaultInfo.total_assets);
  console.log('Total Shares:', vaultInfo.total_shares);
  
  return vaultInfo;
}

getVaultInfo('terra1...');
    `,
  },
  
  social: {
    twitter: "https://twitter.com/WhiteWhaleDefi",
    discord: "https://discord.gg/whitewhale",
    telegram: "https://t.me/whitewhaleofficial",
    github: "https://github.com/White-Whale-Defi-Platform",
    medium: "https://whitewhale.medium.com/",
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
    hasArbitrageVaults: true,
    hasInterchainPools: true,
    supportsIBC: true,
    tvl: "$10+ million",
    volume24h: "$1+ million",
  },
  
  notes: [
    "White Whale focuses on interchain liquidity and arbitrage",
    "Automated arbitrage vaults for passive yield generation",
    "Cross-chain pools via IBC (Inter-Blockchain Communication)",
    "Built on CosmWasm for multi-chain deployment",
    "Supports Terra, Migaloo, Juno, and other Cosmos chains",
    "WHALE token for governance and fee sharing",
    "Flash loan functionality for arbitrage opportunities",
  ],
};
