// SunSwap - Official DEX on Tron
// Leading AMM with deep liquidity and low fees

export const sunswapOracle = {
  name: 'SunSwap',
  blockchain: 'Tron (TRX)',
  type: 'Automated Market Maker (AMM) DEX',
  
  description: `SunSwap is the official and largest decentralized exchange on the Tron blockchain, offering automated market maker (AMM) functionality with deep liquidity and low fees. As Tron's premier DEX, SunSwap enables efficient token swaps, liquidity provision, and yield farming for TRX and TRC-20 tokens. With its robust smart contract infrastructure and integration with TronGrid, SunSwap provides reliable on-chain price discovery and real-time trading data for the Tron DeFi ecosystem.`,

  features: [
    'Official Tron DEX',
    'Deep liquidity pools',
    'Low transaction fees',
    'Automated market maker (AMM)',
    'Yield farming',
    'Liquidity mining',
    'TRC-20 token support',
    'Real-time price discovery',
  ],

  api: {
    website: 'https://sunswap.com/',
    app: 'https://sunswap.com/#/v2',
    documentation: 'https://sunswap.com/docs/justswap-interfaces_en.pdf',
    analytics: 'https://sunswap.com/#/scan',
    routerV2: 'TKzxdSv2FZKQrEqkKVgp5DcwEXBEKMg2Ax',
  },

  sdk: {
    primaryPackage: 'tronweb',
    installCommand: 'npm install tronweb',
    supportedLanguages: ['JavaScript', 'TypeScript', 'Solidity'],
  },

  socialMedia: {
    website: 'https://sunswap.com/',
    twitter: 'https://twitter.com/sunswapV2',
    telegram: 'https://t.me/SunSwapV2',
    medium: 'https://sunswap.medium.com/',
  },

  contractAddresses: {
    routerV2: 'TKzxdSv2FZKQrEqkKVgp5DcwEXBEKMg2Ax',
    factoryV2: 'TXJgMdjVX5dKiQaUi9QobwNxtSQaFqccvd',
    wtrx: 'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR',
  },

  useCases: [
    'Real-time TRX price from AMM',
    'DEX-based price discovery',
    'Liquidity pool analytics',
    'Slippage estimation',
    'Yield farming APY',
    'Volume tracking',
    'Price impact analysis',
    'TRC-20 token pricing',
  ],

  integration: {
    example: `
import TronWeb from 'tronweb';

/**
 * SunSwap DEX Integration for Tron (TRX)
 * Official DEX for Tron price discovery
 */

// Initialize TronWeb
const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
});

// SunSwap V2 Router Contract
const SUNSWAP_V2_ROUTER = 'TKzxdSv2FZKQrEqkKVgp5DcwEXBEKMg2Ax';

// Common token addresses on Tron
const TOKEN_ADDRESSES = {
  WTRX: 'TNUC9Qb1rRpS5CbWLmNMxXBjyFoydXjWFR',
  USDT: 'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t',
  USDC: 'TEkxiTehnzSmSe2XqrBj4w32RUN966rdz8',
  USDD: 'TPYmHEhy5n8TCEfYGqW2rPxsghSfzghPDn',
};

// Router ABI (simplified)
const ROUTER_ABI = [
  {
    "outputs": [{"type": "uint256[]"}],
    "inputs": [
      {"type": "uint256"},
      {"type": "address[]"}
    ],
    "name": "getAmountsOut",
    "stateMutability": "View",
    "type": "Function"
  },
  {
    "outputs": [{"type": "address"}],
    "name": "factory",
    "stateMutability": "View",
    "type": "Function"
  }
];

interface PriceData {
  inputAmount: string;
  outputAmount: string;
  price: number;
  path: string[];
}

/**
 * Get TRX price from SunSwap
 */
async function getSunSwapTRXPrice(): Promise<PriceData> {
  try {
    const routerContract = await tronWeb.contract(ROUTER_ABI, SUNSWAP_V2_ROUTER);

    // Get price for 1000 TRX to USDT
    const amountIn = tronWeb.toSun(1000); // 1000 TRX in sun
    const path = [TOKEN_ADDRESSES.WTRX, TOKEN_ADDRESSES.USDT];

    const amounts = await routerContract.getAmountsOut(amountIn, path).call();

    const outputAmount = tronWeb.fromSun(amounts[1]);
    const price = Number(outputAmount) / 1000;

    console.log(\`SunSwap TRX/USDT Price: $\${price.toFixed(6)}\`);
    console.log(\`  Input: 1000 TRX\`);
    console.log(\`  Output: \${outputAmount} USDT\`);
    console.log(\`  Price per TRX: $\${price.toFixed(6)}\`);

    return {
      inputAmount: '1000',
      outputAmount: outputAmount.toString(),
      price,
      path,
    };
  } catch (error) {
    console.error('Error fetching SunSwap TRX price:', error);
    throw error;
  }
}

/**
 * Get price for any token pair
 */
async function getSunSwapPrice(
  tokenIn: string,
  tokenOut: string,
  amountIn: number
): Promise<PriceData> {
  try {
    const routerContract = await tronWeb.contract(ROUTER_ABI, SUNSWAP_V2_ROUTER);

    const amountInSun = tronWeb.toSun(amountIn);
    const path = [tokenIn, tokenOut];

    const amounts = await routerContract.getAmountsOut(amountInSun, path).call();

    const outputAmount = tronWeb.fromSun(amounts[1]);
    const price = Number(outputAmount) / amountIn;

    console.log(\`SunSwap Price:\`);
    console.log(\`  Input: \${amountIn} tokens\`);
    console.log(\`  Output: \${outputAmount} tokens\`);
    console.log(\`  Price: \${price.toFixed(6)}\`);

    return {
      inputAmount: amountIn.toString(),
      outputAmount: outputAmount.toString(),
      price,
      path,
    };
  } catch (error) {
    console.error('Error fetching SunSwap price:', error);
    throw error;
  }
}

/**
 * Get TRX trading pairs
 */
async function getTRXTradingPairs(): Promise<string[]> {
  try {
    // Common TRX pairs on SunSwap
    const pairs = [
      'TRX/USDT',
      'TRX/USDC',
      'TRX/USDD',
      'TRX/SUN',
      'TRX/JST',
    ];

    console.log(\`\\nTRX Trading Pairs on SunSwap:\`);
    pairs.forEach((pair, index) => {
      console.log(\`\${index + 1}. \${pair}\`);
    });

    return pairs;
  } catch (error) {
    console.error('Error fetching TRX trading pairs:', error);
    return [];
  }
}

/**
 * Calculate price impact
 */
async function calculatePriceImpact(
  tokenIn: string,
  tokenOut: string,
  amountIn: number
): Promise<number> {
  try {
    // Get price for small amount (reference)
    const smallAmount = amountIn * 0.01; // 1% of amount
    const smallPrice = await getSunSwapPrice(tokenIn, tokenOut, smallAmount);

    // Get price for actual amount
    const actualPrice = await getSunSwapPrice(tokenIn, tokenOut, amountIn);

    // Calculate price impact
    const impact = ((actualPrice.price - smallPrice.price) / smallPrice.price) * 100;

    console.log(\`\\nPrice Impact Analysis:\`);
    console.log(\`  Small Amount Price: \${smallPrice.price.toFixed(6)}\`);
    console.log(\`  Large Amount Price: \${actualPrice.price.toFixed(6)}\`);
    console.log(\`  Price Impact: \${impact.toFixed(2)}%\`);

    return impact;
  } catch (error) {
    console.error('Error calculating price impact:', error);
    return 0;
  }
}

/**
 * Monitor TRX price changes on SunSwap
 */
async function monitorSunSwapTRXPrice(
  callback: (price: number, change: number) => void,
  intervalMs: number = 10000
) {
  console.log('Starting SunSwap TRX price monitoring...\\n');

  let lastPrice: number | null = null;

  setInterval(async () => {
    try {
      const data = await getSunSwapTRXPrice();
      
      if (lastPrice !== null) {
        const change = ((data.price - lastPrice) / lastPrice) * 100;
        console.log(
          \`TRX: $\${data.price.toFixed(6)} (\${change >= 0 ? '+' : ''}\${change.toFixed(2)}%)\`
        );
        callback(data.price, change);
      } else {
        console.log(\`Initial TRX price: $\${data.price.toFixed(6)}\`);
      }
      
      lastPrice = data.price;
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Get optimal swap route
 */
async function getOptimalRoute(
  tokenIn: string,
  tokenOut: string,
  amountIn: number
): Promise<{ path: string[]; expectedOutput: number }> {
  try {
    // For simplicity, using direct route
    // In production, check multiple routes through different intermediary tokens
    const directRoute = await getSunSwapPrice(tokenIn, tokenOut, amountIn);

    console.log(\`\\nOptimal Route:\`);
    console.log(\`  Path: \${directRoute.path.join(' → ')}\`);
    console.log(\`  Expected Output: \${directRoute.outputAmount}\`);

    return {
      path: directRoute.path,
      expectedOutput: Number(directRoute.outputAmount),
    };
  } catch (error) {
    console.error('Error finding optimal route:', error);
    throw error;
  }
}

/**
 * Compare SunSwap with oracle price
 */
async function compareWithOracle(oraclePrice: number, oracleName: string) {
  try {
    const sunswapData = await getSunSwapTRXPrice();
    
    const difference = Math.abs(sunswapData.price - oraclePrice);
    const differencePercent = (difference / oraclePrice) * 100;

    console.log(\`\\nPrice Comparison:\`);
    console.log(\`  SunSwap (DEX): $\${sunswapData.price.toFixed(6)}\`);
    console.log(\`  \${oracleName}: $\${oraclePrice.toFixed(6)}\`);
    console.log(\`  Difference: $\${difference.toFixed(6)} (\${differencePercent.toFixed(3)}%)\`);
    console.log(\`  Status: \${differencePercent < 0.5 ? '✅ Close' : '⚠️ Variance detected'}\`);

    return {
      sunswapPrice: sunswapData.price,
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

// Example usage
async function main() {
  console.log('Querying SunSwap DEX for TRX data...\\n');

  // Get TRX price
  const price = await getSunSwapTRXPrice();
  console.log(\`\\nTRX Price: $\${price.price.toFixed(6)}\`);

  // Get trading pairs
  await getTRXTradingPairs();

  // Calculate price impact
  await calculatePriceImpact(TOKEN_ADDRESSES.WTRX, TOKEN_ADDRESSES.USDT, 100000);

  // Get optimal route
  await getOptimalRoute(TOKEN_ADDRESSES.WTRX, TOKEN_ADDRESSES.USDT, 1000);
}

export {
  getSunSwapTRXPrice,
  getSunSwapPrice,
  getTRXTradingPairs,
  calculatePriceImpact,
  monitorSunSwapTRXPrice,
  getOptimalRoute,
  compareWithOracle,
  SUNSWAP_V2_ROUTER,
  TOKEN_ADDRESSES,
};
    `.trim(),
  },

  notes: [
    'Official Tron DEX',
    'Largest DEX on Tron',
    'Deep liquidity for TRX',
    'Low transaction fees',
    'Real-time price discovery',
    'Free API access',
    'TRC-20 token support',
    'Ideal for DEX-based pricing',
  ],

  limitations: [
    'Price depends on liquidity',
    'Can have slippage on large trades',
    'Limited to Tron ecosystem',
    'Requires TronWeb for integration',
  ],

  alternatives: [
    'Chainlink (for oracle feeds)',
    'DIA (for customizable feeds)',
    'JustSwap (alternative DEX)',
    'CoinGecko (for market data)',
  ],
};

