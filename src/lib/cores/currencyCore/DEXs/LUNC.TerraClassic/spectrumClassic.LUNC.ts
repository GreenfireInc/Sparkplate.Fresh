// Spectrum Protocol Classic DEX Information
// Auto-compounding yield optimizer on Terra Classic
// Source: Research compiled from Oct14.Research.Cryptocurrency.LUNC.TerraClassic

export const spectrumClassicDEX = {
  name: "Spectrum Protocol Classic",
  blockchain: "Terra Classic (LUNC)",
  type: "Yield Optimizer with DEX",
  description: "Auto-compounding yield optimizer with integrated DEX features on Terra Classic. Spectrum Protocol Classic automatically compounds rewards from various Terra Classic DeFi protocols and provides optimized yield farming strategies.",
  
  urls: {
    main: "https://spec.finance/",
    classic: "https://classic.spec.finance/vaults",
    vaults: "https://classic.spec.finance/vaults",
    docs: "https://docs.spec.finance/",
  },
  
  api: {
    endpoints: {
      terraClassicLcd: "https://fcd.terra.money/",
      publicNodeLcd: "https://terra-classic-lcd.publicnode.com/",
      contractQuery: "CosmWasm smart contract queries via LCD",
    },
    documentation: "https://docs.spec.finance/",
    apiReference: "https://docs.spec.finance/developers/api-reference",
    rateLimit: "Public LCD API available",
    requiresApiKey: false,
  },
  
  contracts: {
    terraClassic: {
      chainId: "columbus-5",
      gov: "terra1...",
      farm: "terra1...",
      vault: "terra1...",
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
      documentation: "https://docs.spec.finance/",
    },
  },
  
  integration: {
    vaultQueryExample: `
import { LCDClient } from '@terra-money/terra.js';

const lcd = new LCDClient({
  URL: 'https://fcd.terra.money',
  chainID: 'columbus-5',
});

// Query Spectrum Classic vault info
async function getSpectrumClassicVaultInfo(vaultAddress: string) {
  const vaultInfo = await lcd.wasm.contractQuery(vaultAddress, {
    state: {}
  });
  
  console.log('Spectrum Classic Vault Info:', vaultInfo);
  console.log('Total Share:', vaultInfo.total_share);
  console.log('Total Balance:', vaultInfo.total_balance);
  
  return vaultInfo;
}

getSpectrumClassicVaultInfo('terra1...');
    `,
    
    farmQueryExample: `
import { LCDClient } from '@terra-money/terra.js';

const lcd = new LCDClient({
  URL: 'https://fcd.terra.money',
  chainID: 'columbus-5',
});

// Query Spectrum Classic farm info
async function getSpectrumClassicFarmInfo(farmAddress: string, userAddress: string) {
  const farmInfo = await lcd.wasm.contractQuery(farmAddress, {
    reward_info: {
      staker_addr: userAddress
    }
  });
  
  console.log('Farm Info:', farmInfo);
  console.log('Pending Rewards:', farmInfo.pending_reward);
  console.log('Bond Amount:', farmInfo.bond_amount);
  
  return farmInfo;
}

getSpectrumClassicFarmInfo('terra1...', 'terra1...');
    `,
    
    poolStatsExample: `
import axios from 'axios';

// Fetch pool statistics from Spectrum Classic
async function getSpectrumClassicPoolStats() {
  // Note: This would require a Spectrum Classic API endpoint
  // Using Terra Classic LCD as fallback
  const lcd = new LCDClient({
    URL: 'https://fcd.terra.money',
    chainID: 'columbus-5',
  });
  
  // Query vault configs
  const vaultConfig = await lcd.wasm.contractQuery('VAULT_ADDRESS', {
    config: {}
  });
  
  console.log('Vault Config:', vaultConfig);
  return vaultConfig;
}

getSpectrumClassicPoolStats();
    `,
  },
  
  social: {
    twitter: "https://twitter.com/SpecProtocol",
    discord: "https://discord.gg/specprotocol",
    telegram: "https://t.me/specprotocol",
    github: "https://github.com/specprotocol",
    medium: "https://specprotocol.medium.com/",
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
    hasAutoCompounding: true,
    hasYieldOptimization: true,
    hasVaults: true,
    hasFarms: true,
    supportsTerraClassic: true,
    tvl: "$600k+",
    volume24h: "$20k+",
  },
  
  notes: [
    "Spectrum Classic specializes in auto-compounding yield on Terra Classic",
    "Automatically harvests and reinvests rewards",
    "Optimizes yield farming strategies across Terra Classic protocols",
    "Built on CosmWasm smart contracts",
    "SPEC token for governance and fee sharing",
    "Integrates with Terra Classic DEXs (TerraSwap, Astroport Classic)",
    "Reduces gas costs through batch compounding",
    "User-friendly vault system for passive yield",
  ],
};
