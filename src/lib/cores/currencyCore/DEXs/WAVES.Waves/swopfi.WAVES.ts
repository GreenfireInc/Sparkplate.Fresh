// Swop.fi - AMM DEX on Waves
// Type: Automated Market Maker (AMM)
// Blockchain: Waves (WAVES)

export const swopfiDEX = {
  name: "Swop.fi",
  blockchain: "Waves (WAVES)",
  type: "AMM DEX",
  description: "Leading automated market maker DEX on Waves with liquidity pools, yield farming, and governance token SWOP",
  
  url: "https://swop.fi/",
  app: "https://swop.fi/",
  docs: "https://docs.swop.fi/",
  
  api: {
    restEndpoint: "https://api.swop.fi/v1",
    nodeEndpoint: "https://nodes.wavesnodes.com",
    dataServiceEndpoint: "https://api.wavesplatform.com/v0",
    dappAddress: "3PJaDyprveVP7agoN4w3CwvjDoMoH5meDpP", // Swop.fi dApp address
    documentation: "https://docs.swop.fi/",
    rateLimit: "Public endpoints rate limited",
    authentication: "None required for public data",
  },
  
  sdk: {
    npm: "@waves/signer, @waves/waves-transactions",
    installation: "npm install @waves/signer @waves/waves-transactions",
    documentation: "https://docs.waves.tech/en/building-apps/waves-api-and-sdk/",
    features: [
      "Swap execution",
      "Liquidity provision",
      "Pool queries",
      "Yield farming",
      "Governance participation",
    ],
  },
  
  integration: {
    example: `
// Swop.fi Integration Example
import { invokeScript } from '@waves/waves-transactions';
import { Signer } from '@waves/signer';
import fetch from 'node-fetch';

const SWOPFI_DAPP = '3PJaDyprveVP7agoN4w3CwvjDoMoH5meDpP';
const NODE_URL = 'https://nodes.wavesnodes.com';

// Get pool info from dApp state
async function getPoolInfo(poolAddress: string) {
  const response = await fetch(
    \`\${NODE_URL}/addresses/data/\${poolAddress}\`
  );
  const data = await response.json();
  
  // Parse pool reserves and other data
  const poolData = data.reduce((acc: any, entry: any) => {
    acc[entry.key] = entry.value;
    return acc;
  }, {});
  
  console.log('Pool Data:', poolData);
  return poolData;
}`,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/Swopfi",
    telegram: "https://t.me/swopfi",
    medium: "https://swopfi.medium.com/",
    github: "https://github.com/swopfi",
  },
  
  features: {
    orderbook: false,
    amm: true,
    limit_orders: false,
    market_orders: true,
    liquidity_pools: true,
    yield_farming: true,
    governance: true,
    staking: true,
    flash_loans: false,
    price_oracle: true,
  },
  
  fees: {
    swap: "0.3% (0.25% to LPs, 0.05% to SWOP stakers)",
    withdrawal: "Free",
    deposit: "Free",
  },
  
  notes: [
    "Largest AMM DEX on Waves by TVL",
    "SWOP governance token for fee sharing",
    "Multiple liquidity pool types (flat, stable)",
    "Yield farming with SWOP rewards",
    "Price oracle data available on-chain",
    "Built on Ride smart contracts",
    "Low slippage for major pairs",
    "Community-driven governance",
  ],
};
