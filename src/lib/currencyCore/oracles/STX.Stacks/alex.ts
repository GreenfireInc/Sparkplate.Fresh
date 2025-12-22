// ALEX - Leading DEX and DeFi Platform on Stacks
// Comprehensive DeFi hub with AMM, orderbook, lending, and launchpad

export const alexOracle = {
  name: 'ALEX',
  blockchain: 'Stacks (STX)',
  type: 'Decentralized Exchange & DeFi Platform',
  
  description: `ALEX is the largest and most comprehensive DeFi platform on Stacks, offering AMM swaps, orderbook trading, lending, borrowing, and launchpad services. As the primary liquidity hub for Bitcoin DeFi via Stacks, ALEX provides real-time pricing for STX and other Stacks ecosystem tokens through its advanced AMM algorithms and integrated orderbook. With deep liquidity pools and transparent on-chain data, ALEX serves as a reliable oracle for DEX-based price discovery.`,

  features: [
    'AMM and orderbook hybrid',
    'Deep liquidity pools',
    'Lending and borrowing',
    'Launchpad for new tokens',
    'Bitcoin DeFi integration',
    'Real-time price discovery',
    'Staking and yield farming',
    'Governance (ALEX token)',
  ],

  api: {
    website: 'https://alexgo.io/',
    app: 'https://app.alexlab.co/',
    documentation: 'https://docs.alexlab.co/',
    analytics: 'https://stats.alexlab.co/',
    explorer: 'https://explorer.alexlab.co/',
    api: 'https://api.alexlab.co/v1',
  },

  sdk: {
    primaryPackage: '@alexlabs/sdk',
    stacksTransactions: '@stacks/transactions',
    installCommand: 'npm install @stacks/transactions axios',
    supportedLanguages: ['TypeScript', 'JavaScript', 'Clarity'],
  },

  socialMedia: {
    website: 'https://alexgo.io/',
    twitter: 'https://twitter.com/ALEXLabBTC',
    discord: 'https://discord.com/invite/alexlab',
    telegram: 'https://t.me/AlexCommunity',
    medium: 'https://medium.com/alexgobtc',
    github: 'https://github.com/alexgo-io',
  },

  tokenAddress: 'SP3K8BC0PPEVCV7NZ6QSRWPQ2JE9E5B6N3PA0KBR9.age000-governance-token',

  useCases: [
    'Real-time STX price from AMM',
    'Orderbook-based pricing',
    'Liquidity pool analytics',
    'Trading volume tracking',
    'Yield farming APY',
    'Token launch pricing',
    'Slippage estimation',
    'DeFi protocol integration',
  ],

  integration: {
    example: `
import axios from 'axios';
import { makeReadOnlyCall, cvToJSON, uintCV } from '@stacks/transactions';
import { StacksMainnet } from '@stacks/network';

/**
 * ALEX DEX Integration for Stacks (STX)
 * Leading DeFi platform for Bitcoin via Stacks
 */

const ALEX_API = 'https://api.alexlab.co/v1';
const MAINNET = new StacksMainnet();

/**
 * Get STX price from ALEX API
 */
async function getALEXSTXPrice(): Promise<{ price: number; volume24h: number; liquidity: number } | null> {
  try {
    const response = await axios.get(\`\${ALEX_API}/price?token=STX\`);
    
    const data = response.data;

    console.log(\`ALEX STX Price: $\${data.price.toFixed(4)}\`);
    console.log(\`  24h Volume: $\${(data.volume24h / 1e6).toFixed(2)}M\`);
    console.log(\`  Liquidity: $\${(data.liquidity / 1e6).toFixed(2)}M\`);

    return {
      price: data.price,
      volume24h: data.volume24h,
      liquidity: data.liquidity,
    };
  } catch (error) {
    console.error('Error fetching ALEX STX price:', error);
    return null;
  }
}

/**
 * Get STX trading pairs on ALEX
 */
async function getSTXTradingPairs(): Promise<any[]> {
  try {
    const response = await axios.get(\`\${ALEX_API}/pairs\`);
    
    const stxPairs = response.data.filter((pair: any) => 
      pair.token0 === 'STX' || pair.token1 === 'STX'
    );

    console.log(\`\\nFound \${stxPairs.length} STX trading pairs on ALEX:\`);
    
    stxPairs.slice(0, 10).forEach((pair: any, index: number) => {
      console.log(\`\${index + 1}. \${pair.name}\`);
      console.log(\`   Price: $\${pair.price.toFixed(6)}\`);
      console.log(\`   Liquidity: $\${(pair.liquidity / 1e6).toFixed(2)}M\`);
      console.log(\`   24h Volume: $\${(pair.volume24h / 1e6).toFixed(2)}M\`);
    });

    return stxPairs;
  } catch (error) {
    console.error('Error fetching STX trading pairs:', error);
    return [];
  }
}

/**
 * Get liquidity pool information
 */
async function getPoolInfo(poolId: string): Promise<any> {
  try {
    const response = await axios.get(\`\${ALEX_API}/pool/\${poolId}\`);
    
    const pool = response.data;

    console.log(\`\\nALEX Pool Info:\`);
    console.log(\`  Name: \${pool.name}\`);
    console.log(\`  TVL: $\${(pool.tvl / 1e6).toFixed(2)}M\`);
    console.log(\`  Volume 24h: $\${(pool.volume24h / 1e6).toFixed(2)}M\`);
    console.log(\`  APY: \${pool.apy.toFixed(2)}%\`);
    console.log(\`  Fee Tier: \${pool.feeTier}%\`);

    return pool;
  } catch (error) {
    console.error('Error fetching pool info:', error);
    throw error;
  }
}

/**
 * Get STX/USD spot price from orderbook
 */
async function getOrderbookPrice(): Promise<{ bid: number; ask: number; mid: number } | null> {
  try {
    const response = await axios.get(\`\${ALEX_API}/orderbook?pair=STX-USDA\`);
    
    const orderbook = response.data;
    
    const bestBid = orderbook.bids[0]?.price || 0;
    const bestAsk = orderbook.asks[0]?.price || 0;
    const midPrice = (bestBid + bestAsk) / 2;

    console.log(\`\\nALEX Orderbook STX/USDA:\`);
    console.log(\`  Best Bid: $\${bestBid.toFixed(4)}\`);
    console.log(\`  Best Ask: $\${bestAsk.toFixed(4)}\`);
    console.log(\`  Mid Price: $\${midPrice.toFixed(4)}\`);
    console.log(\`  Spread: \${((bestAsk - bestBid) / midPrice * 100).toFixed(3)}%\`);

    return {
      bid: bestBid,
      ask: bestAsk,
      mid: midPrice,
    };
  } catch (error) {
    console.error('Error fetching orderbook price:', error);
    return null;
  }
}

/**
 * Get top liquidity pools
 */
async function getTopLiquidityPools(limit: number = 10): Promise<any[]> {
  try {
    const response = await axios.get(\`\${ALEX_API}/pools?sort=tvl&limit=\${limit}\`);
    
    const pools = response.data;

    console.log(\`\\nTop \${limit} Liquidity Pools on ALEX:\`);
    pools.forEach((pool: any, index: number) => {
      console.log(\`\${index + 1}. \${pool.name}\`);
      console.log(\`   TVL: $\${(pool.tvl / 1e6).toFixed(2)}M\`);
      console.log(\`   24h Volume: $\${(pool.volume24h / 1e6).toFixed(2)}M\`);
      console.log(\`   APY: \${pool.apy.toFixed(2)}%\`);
    });

    return pools;
  } catch (error) {
    console.error('Error fetching top pools:', error);
    return [];
  }
}

/**
 * Get lending/borrowing rates
 */
async function getLendingRates(): Promise<any> {
  try {
    const response = await axios.get(\`\${ALEX_API}/lending/rates\`);
    
    const rates = response.data;

    console.log(\`\\nALEX Lending Rates:\`);
    console.log(\`  STX Supply APY: \${rates.stx?.supplyAPY?.toFixed(2) || 'N/A'}%\`);
    console.log(\`  STX Borrow APY: \${rates.stx?.borrowAPY?.toFixed(2) || 'N/A'}%\`);

    return rates;
  } catch (error) {
    console.error('Error fetching lending rates:', error);
    return null;
  }
}

/**
 * Monitor STX price changes on ALEX
 */
async function monitorALEXSTXPrice(
  callback: (price: number, change: number) => void,
  intervalMs: number = 10000
) {
  console.log('Starting ALEX STX price monitoring...\\n');

  let lastPrice: number | null = null;

  setInterval(async () => {
    try {
      const data = await getALEXSTXPrice();
      
      if (data && lastPrice !== null) {
        const change = ((data.price - lastPrice) / lastPrice) * 100;
        console.log(
          \`STX: $\${data.price.toFixed(4)} (\${change >= 0 ? '+' : ''}\${change.toFixed(2)}%) | Liquidity: $\${(data.liquidity / 1e6).toFixed(2)}M\`
        );
        callback(data.price, change);
      } else if (data) {
        console.log(\`Initial STX price: $\${data.price.toFixed(4)}\`);
      }
      
      lastPrice = data?.price || lastPrice;
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Compare AMM vs Orderbook pricing
 */
async function compareAMMvsOrderbook() {
  try {
    const [ammPrice, orderbookPrice] = await Promise.all([
      getALEXSTXPrice(),
      getOrderbookPrice(),
    ]);

    if (!ammPrice || !orderbookPrice) {
      console.log('Could not fetch prices for comparison');
      return;
    }

    const difference = Math.abs(ammPrice.price - orderbookPrice.mid);
    const differencePercent = (difference / orderbookPrice.mid) * 100;

    console.log(\`\\nPrice Comparison (AMM vs Orderbook):\`);
    console.log(\`  AMM Price: $\${ammPrice.price.toFixed(4)}\`);
    console.log(\`  Orderbook Mid: $\${orderbookPrice.mid.toFixed(4)}\`);
    console.log(\`  Difference: $\${difference.toFixed(4)} (\${differencePercent.toFixed(3)}%)\`);
    console.log(\`  Status: \${differencePercent < 0.5 ? '✅ Aligned' : '⚠️ Arbitrage opportunity'}\`);

    return {
      ammPrice: ammPrice.price,
      orderbookMid: orderbookPrice.mid,
      difference,
      differencePercent,
    };
  } catch (error) {
    console.error('Error comparing prices:', error);
    throw error;
  }
}

// Example usage
async function main() {
  console.log('Querying ALEX DEX for STX data...\\n');

  // Get STX price
  const price = await getALEXSTXPrice();
  if (price) {
    console.log(\`\\nSTX Price: $\${price.price.toFixed(4)}\`);
  }

  // Get trading pairs
  await getSTXTradingPairs();

  // Get orderbook price
  await getOrderbookPrice();

  // Compare AMM vs Orderbook
  await compareAMMvsOrderbook();

  // Get top pools
  await getTopLiquidityPools(5);

  // Get lending rates
  await getLendingRates();
}

export {
  getALEXSTXPrice,
  getSTXTradingPairs,
  getPoolInfo,
  getOrderbookPrice,
  getTopLiquidityPools,
  getLendingRates,
  monitorALEXSTXPrice,
  compareAMMvsOrderbook,
  ALEX_API,
};
    `.trim(),
  },

  notes: [
    'Largest DEX on Stacks',
    'Hybrid AMM + orderbook model',
    'Deep liquidity for STX',
    'Bitcoin DeFi integration',
    'Lending and borrowing',
    'Free API access',
    'Real-time price discovery',
    'Ideal for DEX-based pricing',
  ],

  limitations: [
    'Price depends on liquidity',
    'API may have rate limits',
    'Limited to Stacks ecosystem',
    'Some features require ALEX token',
  ],

  alternatives: [
    'Pyth Network (for oracle feeds)',
    'DIA (for customizable feeds)',
    'StackSwap (alternative DEX)',
    'CoinGecko (for market data)',
  ],
};

