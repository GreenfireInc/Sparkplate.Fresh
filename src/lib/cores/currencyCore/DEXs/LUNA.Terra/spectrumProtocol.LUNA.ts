// Spectrum Protocol DEX Information
// Auto-compounding yield optimizer with integrated DEX on Terra
// Source: Research compiled from Oct14.Research.Cryptocurrency.LUNA.Terra

export const spectrumProtocolDEX = {
  name: "Spectrum Protocol",
  blockchain: "Terra (LUNA)",
  type: "Yield Optimizer with DEX",
  description: "Auto-compounding yield optimizer with integrated DEX features on Terra. Spectrum Protocol automatically compounds rewards from various DeFi protocols and provides optimized yield farming strategies.",
  
  urls: {
    main: "https://spec.finance/",
    app: "https://app.spec.finance/",
    docs: "https://docs.spec.finance/",
    analytics: "https://app.spec.finance/dashboard",
  },
  
  api: {
    endpoints: {
      terraLcd: "https://phoenix-lcd.terra.dev/",
      contractQuery: "CosmWasm smart contract queries via LCD",
      apiEndpoint: "https://api.spec.finance/",
    },
    documentation: "https://docs.spec.finance/",
    apiReference: "https://docs.spec.finance/developers/api-reference",
    rateLimit: "Public API available",
    requiresApiKey: false,
  },
  
  contracts: {
    terra2: {
      chainId: "phoenix-1",
      gov: "terra1...",
      farm: "terra1...",
      vault: "terra1...",
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
      documentation: "https://docs.spec.finance/",
    },
  },
  
  integration: {
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

// Query Spectrum vault info
async function getSpectrumVaultInfo(vaultAddress: string) {
  const vaultInfo = await lcd.wasm.contractQuery(vaultAddress, {
    state: {}
  });
  
  console.log('Spectrum Vault Info:', vaultInfo);
  console.log('Total Share:', vaultInfo.total_share);
  console.log('Total Balance:', vaultInfo.total_balance);
  
  return vaultInfo;
}

getSpectrumVaultInfo('terra1...');
    `,
    
    farmQueryExample: `
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

// Query Spectrum farm info
async function getSpectrumFarmInfo(farmAddress: string, userAddress: string) {
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

getSpectrumFarmInfo('terra1...', 'terra1...');
    `,
    
    apiExample: `
import axios from 'axios';

// Fetch vault APY from Spectrum API
async function getSpectrumVaultApy(vaultId: string) {
  const response = await axios.get(
    \`https://api.spec.finance/vault/\${vaultId}/apy\`
  );
  
  console.log('Vault APY:', response.data.apy);
  console.log('Daily APR:', response.data.daily_apr);
  console.log('Weekly APR:', response.data.weekly_apr);
  
  return response.data;
}

getSpectrumVaultApy('LUNA-USDC');
    `,
    
    poolStatsExample: `
import axios from 'axios';

// Fetch pool statistics from Spectrum
async function getSpectrumPoolStats() {
  const response = await axios.get('https://api.spec.finance/pools');
  
  console.log('All Pools:', response.data);
  
  response.data.forEach((pool: any) => {
    console.log(\`Pool: \${pool.name}\`);
    console.log(\`TVL: $\${pool.tvl}\`);
    console.log(\`APY: \${pool.apy}%\`);
  });
  
  return response.data;
}

getSpectrumPoolStats();
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
    tvl: "$8+ million",
    volume24h: "$600k+",
  },
  
  notes: [
    "Spectrum Protocol specializes in auto-compounding yield",
    "Automatically harvests and reinvests rewards",
    "Optimizes yield farming strategies across multiple protocols",
    "Built on CosmWasm smart contracts",
    "SPEC token for governance and fee sharing",
    "Integrates with major Terra DEXs (Astroport, TerraSwap, etc.)",
    "Reduces gas costs through batch compounding",
    "User-friendly vault system for passive yield",
  ],
};
