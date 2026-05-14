// ViresFinance - Lending Protocol with Swap on Waves
// Type: Lending Protocol with Integrated Swap
// Blockchain: Waves (WAVES)

export const viresFinanceDEX = {
  name: "ViresFinance",
  blockchain: "Waves (WAVES)",
  type: "Lending Protocol with Swap",
  description: "Decentralized lending and borrowing protocol on Waves with integrated swap functionality for collateral management",
  
  url: "https://vires.finance/",
  app: "https://app.vires.finance/",
  docs: "https://docs.vires.finance/",
  
  api: {
    restEndpoint: "https://api.vires.finance/v1",
    nodeEndpoint: "https://nodes.wavesnodes.com",
    dappAddress: "3P6s5wTVyjjVCqzjGYjDPE6K4nK8Ru6b6Bx", // ViresFinance dApp address
    dataEndpoint: "https://data.vires.finance/",
    documentation: "https://docs.vires.finance/api",
    rateLimit: "Public endpoints available",
    authentication: "None required for public data",
  },
  
  sdk: {
    npm: "@waves/signer, @waves/waves-transactions",
    installation: "npm install @waves/signer @waves/waves-transactions",
    documentation: "https://docs.vires.finance/integration",
    features: [
      "Supply and borrow",
      "Collateral management",
      "Interest rate queries",
      "Liquidation monitoring",
      "Swap functionality",
    ],
  },
  
  integration: {
    example: `
// ViresFinance Integration Example
import { invokeScript } from '@waves/waves-transactions';
import { Signer } from '@waves/signer';
import fetch from 'node-fetch';

const VIRES_DAPP = '3P6s5wTVyjjVCqzjGYjDPE6K4nK8Ru6b6Bx';
const VIRES_API = 'https://api.vires.finance/v1';
const NODE_URL = 'https://nodes.wavesnodes.com';

// Get market data (supply/borrow rates)
async function getViresMarkets() {
  const response = await fetch(\`\${VIRES_API}/markets\`);
  const markets = await response.json();
  
  console.log('Vires Markets:', markets);
  return markets;
}`,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/ViresFinance",
    telegram: "https://t.me/viresfinance",
    medium: "https://viresfinance.medium.com/",
    discord: "https://discord.gg/viresfinance",
  },
  
  features: {
    lending: true,
    borrowing: true,
    collateral_swap: true,
    interest_bearing: true,
    liquidations: true,
    governance: false,
    flash_loans: false,
    amm: false,
    orderbook: false,
  },
  
  fees: {
    supply: "Free",
    borrow: "Interest rate based on utilization",
    swap: "0.3% on collateral swaps",
    liquidation: "5% liquidation penalty",
  },
  
  notes: [
    "Largest lending protocol on Waves",
    "Supply assets to earn interest",
    "Borrow against collateral",
    "Integrated swap for collateral management",
    "Variable interest rates based on utilization",
    "Over-collateralized borrowing model",
    "Real-time liquidation monitoring",
    "Supports major Waves assets",
  ],
};
