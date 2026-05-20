// Jupiter - Leading DEX Aggregator on Solana
// Best price routing across all Solana liquidity sources

export const jupiterOracle = {
  name: 'Jupiter Aggregator',
  blockchain: 'Solana (SOL)',
  type: 'DEX Aggregator & Price Oracle',
  
  description: `Jupiter is the leading DEX aggregator on Solana, routing trades across all major liquidity sources to provide the best prices with minimal slippage. By aggregating liquidity from Raydium, Orca, Meteora, Phoenix, and other DEXs, Jupiter offers real-time SOL price discovery based on actual trading pools. With its comprehensive Price API and Quote API, Jupiter is ideal for applications requiring DEX-based pricing and optimal trade routing.`,

  features: [
    'Aggregates all Solana DEX liquidity',
    'Best price routing',
    'Real-time pool-based pricing',
    'Low slippage optimization',
    'Price impact calculation',
    'Multi-hop routing',
    'Free API access',
    'High throughput',
  ],

  api: {
    website: 'https://jup.ag/',
    documentation: 'https://station.jup.ag/docs',
    priceAPI: 'https://price.jup.ag/v4',
    quoteAPI: 'https://quote-api.jup.ag/v6',
    app: 'https://jup.ag/',
    statsAPI: 'https://stats.jup.ag/',
  },

  sdk: {
    primaryPackage: '@jup-ag/api',
    solanaWeb3: '@solana/web3.js',
    installCommand: 'npm install @jup-ag/api @solana/web3.js',
    supportedLanguages: ['TypeScript', 'JavaScript'],
  },

  socialMedia: {
    website: 'https://jup.ag/',
    twitter: 'https://twitter.com/JupiterExchange',
    discord: 'https://discord.gg/jup',
    telegram: 'https://t.me/jupiterexchange',
    github: 'https://github.com/jup-ag',
    blog: 'https://station.jup.ag/blog',
  },

  tokenAddresses: {
    SOL: 'So11111111111111111111111111111111111111112', // Wrapped SOL
    USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
  },

  useCases: [
    'Real-time SOL price discovery',
    'Best execution price quotes',
    'DEX-based price feeds',
    'Slippage estimation',
    'Liquidity analytics',
    'Trade routing optimization',
    'Price impact analysis',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * Jupiter Aggregator Integration for Solana (SOL)
 * DEX aggregator providing best prices across all Solana liquidity
 */

const JUPITER_PRICE_API = 'https://price.jup.ag/v4';
const JUPITER_QUOTE_API = 'https://quote-api.jup.ag/v6';

const TOKEN_ADDRESSES = {
  SOL: 'So11111111111111111111111111111111111111112',
  USDC: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
  USDT: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB',
};

/**
 * Get SOL price from Jupiter Price API
 */
async function getJupiterSOLPrice() {
  try {
    const response = await axios.get(\`\${JUPITER_PRICE_API}/price\`, {
      params: {
        ids: TOKEN_ADDRESSES.SOL,
      },
    });

    const priceData = response.data.data[TOKEN_ADDRESSES.SOL];
    const price = priceData.price;

    console.log(\`Jupiter SOL/USD Price: $\${price.toFixed(4)}\`);
    console.log(\`Source: Jupiter DEX Aggregator\`);

    return {
      price,
      mintAddress: TOKEN_ADDRESSES.SOL,
      timestamp: new Date(),
    };
  } catch (error) {
    console.error('Error fetching Jupiter SOL price:', error);
    throw error;
  }
}

/**
 * Get detailed price with multiple vs currencies
 */
async function getSOLPriceMultiCurrency(vsTokens: string[] = [TOKEN_ADDRESSES.USDC]) {
  try {
    const prices = await Promise.all(
      vsTokens.map(async (vsToken) => {
        const response = await axios.get(\`\${JUPITER_QUOTE_API}/quote\`, {
          params: {
            inputMint: TOKEN_ADDRESSES.SOL,
            outputMint: vsToken,
            amount: 1000000000, // 1 SOL (9 decimals)
            slippageBps: 50, // 0.5% slippage
          },
        });

        const outAmount = parseInt(response.data.outAmount);
        const price = outAmount / 1000000; // Assuming USDC/USDT 6 decimals

        return {
          vsToken,
          price,
          priceImpact: parseFloat(response.data.priceImpactPct),
        };
      })
    );

    console.log('\\nJupiter SOL Prices:');
    prices.forEach(p => {
      console.log(\`  vs \${p.vsToken.substring(0, 10)}...: $\${p.price.toFixed(4)} (impact: \${p.priceImpact.toFixed(3)}%)\`);
    });

    return prices;
  } catch (error) {
    console.error('Error fetching multi-currency prices:', error);
    throw error;
  }
}

/**
 * Get best route and price for a swap
 */
async function getBestSwapRoute(
  inputMint: string,
  outputMint: string,
  amount: number,
  slippageBps: number = 50
) {
  try {
    const response = await axios.get(\`\${JUPITER_QUOTE_API}/quote\`, {
      params: {
        inputMint,
        outputMint,
        amount,
        slippageBps,
      },
    });

    const quote = response.data;
    
    const inAmount = parseInt(quote.inAmount) / 1e9; // SOL 9 decimals
    const outAmount = parseInt(quote.outAmount) / 1e6; // USDC 6 decimals
    const price = outAmount / inAmount;

    console.log(\`\\nBest Swap Route:\`);
    console.log(\`  Input: \${inAmount} SOL\`);
    console.log(\`  Output: \${outAmount.toFixed(2)} USDC\`);
    console.log(\`  Price: $\${price.toFixed(4)}\`);
    console.log(\`  Price Impact: \${parseFloat(quote.priceImpactPct).toFixed(3)}%\`);
    console.log(\`  Route: \${quote.routePlan.length} step(s)\`);

    return {
      inAmount,
      outAmount,
      price,
      priceImpact: parseFloat(quote.priceImpactPct),
      routePlan: quote.routePlan,
    };
  } catch (error) {
    console.error('Error fetching swap route:', error);
    throw error;
  }
}

/**
 * Get token prices for multiple tokens
 */
async function getMultipleTokenPrices(tokenMints: string[]) {
  try {
    const response = await axios.get(\`\${JUPITER_PRICE_API}/price\`, {
      params: {
        ids: tokenMints.join(','),
      },
    });

    const prices = response.data.data;

    console.log(\`\\nJupiter Token Prices:\`);
    Object.entries(prices).forEach(([mint, data]: [string, any]) => {
      console.log(\`  \${mint.substring(0, 10)}...: $\${data.price.toFixed(6)}\`);
    });

    return prices;
  } catch (error) {
    console.error('Error fetching multiple token prices:', error);
    throw error;
  }
}

/**
 * Calculate price impact for different trade sizes
 */
async function analyzePriceImpact(amounts: number[]) {
  try {
    console.log('\\nPrice Impact Analysis:');

    const results = await Promise.all(
      amounts.map(async (amount) => {
        const response = await axios.get(\`\${JUPITER_QUOTE_API}/quote\`, {
          params: {
            inputMint: TOKEN_ADDRESSES.SOL,
            outputMint: TOKEN_ADDRESSES.USDC,
            amount: amount * 1e9, // Convert to lamports
            slippageBps: 50,
          },
        });

        const outAmount = parseInt(response.data.outAmount) / 1e6;
        const price = outAmount / amount;
        const priceImpact = parseFloat(response.data.priceImpactPct);

        console.log(\`  \${amount} SOL: $\${price.toFixed(4)} (impact: \${priceImpact.toFixed(3)}%)\`);

        return {
          amount,
          price,
          priceImpact,
        };
      })
    );

    return results;
  } catch (error) {
    console.error('Error analyzing price impact:', error);
    throw error;
  }
}

/**
 * Monitor SOL price changes
 */
async function monitorJupiterSOLPrice(
  callback: (price: number) => void,
  intervalMs: number = 5000
) {
  console.log('Starting Jupiter SOL price monitoring...\\n');

  let lastPrice: number | null = null;

  setInterval(async () => {
    try {
      const data = await getJupiterSOLPrice();
      
      if (lastPrice !== null) {
        const change = ((data.price - lastPrice) / lastPrice) * 100;
        console.log(
          \`SOL: $\${data.price.toFixed(4)} (\${change >= 0 ? '+' : ''}\${change.toFixed(2)}%)\`
        );
      } else {
        console.log(\`Initial SOL price: $\${data.price.toFixed(4)}\`);
      }
      
      lastPrice = data.price;
      callback(data.price);
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Compare Jupiter price with other oracles
 */
async function compareWithOracle(oraclePrice: number, oracleName: string) {
  try {
    const jupiterData = await getJupiterSOLPrice();
    
    const difference = Math.abs(jupiterData.price - oraclePrice);
    const differencePercent = (difference / oraclePrice) * 100;

    console.log(\`\\nPrice Comparison:\`);
    console.log(\`  Jupiter (DEX): $\${jupiterData.price.toFixed(4)}\`);
    console.log(\`  \${oracleName}: $\${oraclePrice.toFixed(4)}\`);
    console.log(\`  Difference: $\${difference.toFixed(4)} (\${differencePercent.toFixed(3)}%)\`);
    console.log(\`  Status: \${differencePercent < 0.5 ? '✅ Close' : '⚠️ Variance detected'}\`);

    return {
      jupiterPrice: jupiterData.price,
      oraclePrice,
      oracleName,
      difference,
      differencePercent,
    };
  } catch (error) {
    console.error('Error comparing prices:', error);
    throw error;
  }
}

/**
 * Get liquidity-weighted average price
 */
async function getLiquidityWeightedPrice() {
  try {
    // Get quotes for different amounts to estimate liquidity
    const amounts = [1, 10, 100, 1000];
    const quotes = await analyzePriceImpact(amounts);
    
    // Calculate weighted average (simple average for demonstration)
    const avgPrice = quotes.reduce((sum, q) => sum + q.price, 0) / quotes.length;
    
    console.log(\`\\nLiquidity-Weighted Average: $\${avgPrice.toFixed(4)}\`);

    return {
      avgPrice,
      quotes,
    };
  } catch (error) {
    console.error('Error calculating liquidity-weighted price:', error);
    throw error;
  }
}

// Example usage
async function main() {
  console.log('Querying Jupiter DEX Aggregator for SOL price...\\n');

  // Get simple price
  const price = await getJupiterSOLPrice();
  console.log(\`\\nSOL Price: $\${price.price.toFixed(4)}\`);

  // Get best swap route
  await getBestSwapRoute(TOKEN_ADDRESSES.SOL, TOKEN_ADDRESSES.USDC, 1000000000);

  // Analyze price impact
  await analyzePriceImpact([1, 10, 100]);

  // Get liquidity-weighted price
  await getLiquidityWeightedPrice();
}

export {
  getJupiterSOLPrice,
  getSOLPriceMultiCurrency,
  getBestSwapRoute,
  getMultipleTokenPrices,
  analyzePriceImpact,
  monitorJupiterSOLPrice,
  compareWithOracle,
  getLiquidityWeightedPrice,
  TOKEN_ADDRESSES,
};
    `.trim(),
  },

  notes: [
    'Leading DEX aggregator on Solana',
    'Aggregates all major DEX liquidity',
    'Best price routing across multiple hops',
    'Real-time pool-based pricing',
    'Price impact calculation',
    'Free API with high throughput',
    'No API key required',
    'Ideal for DEX-based price discovery',
  ],

  limitations: [
    'Price depends on DEX liquidity',
    'Can have slippage on large trades',
    'Limited to Solana ecosystem',
    'Requires understanding of token mints',
  ],

  alternatives: [
    'Pyth Network (for oracle-based feeds)',
    'Raydium (for direct AMM pricing)',
    'Orca (for concentrated liquidity)',
    'CoinGecko (for market data)',
  ],
};

