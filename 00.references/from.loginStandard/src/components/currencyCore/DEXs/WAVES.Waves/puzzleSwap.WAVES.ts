// Puzzle Swap - DEX Aggregator on Waves
// Type: DEX Aggregator
// Blockchain: Waves (WAVES)

export const puzzleSwapDEX = {
  name: "Puzzle Swap",
  blockchain: "Waves (WAVES)",
  type: "DEX Aggregator",
  description: "Intelligent DEX aggregator finding best prices across Waves ecosystem by routing through multiple DEXs and pools",
  
  url: "https://puzzleswap.org/",
  app: "https://puzzleswap.org/",
  docs: "https://docs.puzzleswap.org/",
  
  api: {
    restEndpoint: "https://api.puzzleswap.org/v1",
    nodeEndpoint: "https://nodes.wavesnodes.com",
    routingEngine: "https://routing.puzzleswap.org/",
    documentation: "https://docs.puzzleswap.org/",
    rateLimit: "Public endpoints available",
    authentication: "None required",
  },
  
  sdk: {
    npm: "@waves/signer, @waves/waves-transactions, @puzzle/sdk",
    installation: "npm install @waves/signer @waves/waves-transactions",
    documentation: "https://docs.puzzleswap.org/integration",
    features: [
      "Best route finding",
      "Multi-hop swaps",
      "Price comparison",
      "Slippage optimization",
      "Gas estimation",
    ],
  },
  
  integration: {
    example: `
// Puzzle Swap Integration Example
import { invokeScript } from '@waves/waves-transactions';
import { Signer } from '@waves/signer';
import fetch from 'node-fetch';

const PUZZLE_API = 'https://api.puzzleswap.org/v1';
const NODE_URL = 'https://nodes.wavesnodes.com';

// Get best swap route
async function getBestRoute(
  fromAssetId: string | null,
  toAssetId: string | null,
  amount: number
) {
  const response = await fetch(
    \`\${PUZZLE_API}/route?\` +
    \`fromAsset=\${fromAssetId || 'WAVES'}&\` +
    \`toAsset=\${toAssetId || 'WAVES'}&\` +
    \`amount=\${amount}\`
  );
  
  const route = await response.json();
  console.log('Best Route:', route);
  return route}`,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/PuzzleSwap",
    telegram: "https://t.me/puzzleswap",
    medium: "https://puzzleswap.medium.com/",
    discord: "https://discord.gg/puzzleswap",
  },
  
  features: {
    orderbook: false,
    amm: false,
    aggregator: true,
    limit_orders: false,
    market_orders: true,
    multi_hop: true,
    price_comparison: true,
    route_optimization: true,
    slippage_protection: true,
    gas_optimization: true,
  },
  
  fees: {
    aggregation: "No additional fee (pays underlying DEX fees)",
    routing: "Free",
  },
  
  notes: [
    "Aggregates liquidity from Swop.fi, Waves.Exchange, and other DEXs",
    "Finds optimal routes for best prices",
    "Supports multi-hop swaps",
    "Reduces slippage through route optimization",
    "No additional aggregation fee",
    "Open-source routing engine",
    "Real-time price comparison",
    "Automatic best execution",
  ],
};
