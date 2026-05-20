// 3Route - DEX Aggregator on Tezos
// Type: DEX Aggregator
// Blockchain: Tezos (XTZ)

export const threeRouteDEX = {
  name: "3Route",
  blockchain: "Tezos (XTZ)",
  type: "DEX Aggregator",
  description: "Leading DEX aggregator on Tezos, finding optimal swap routes across multiple DEXs for best prices",
  
  url: "https://3route.io/",
  app: "https://app.3route.io/",
  docs: "https://docs.3route.io/",
  
  api: {
    restEndpoint: "https://api.3route.io",
    swapApi: "https://api.3route.io/v1/swap",
    quoteApi: "https://api.3route.io/v1/quote",
    rpcEndpoint: "https://mainnet.api.tez.ie",
    documentation: "https://docs.3route.io/api",
    rateLimit: "Public API available",
  },
  
  sdk: {
    npm: "@taquito/taquito",
    installation: "npm install @taquito/taquito @taquito/signer axios",
    documentation: "https://docs.3route.io/",
    github: "https://github.com/3route-io",
    features: [
      "Multi-DEX routing",
      "Split routes for optimal pricing",
      "Gas optimization",
      "Slippage protection",
      "Price impact calculation",
    ],
  },
  
  integration: {
    example: `
// 3Route DEX Aggregator Integration Example
import { TezosToolkit } from '@taquito/taquito';
import axios from 'axios';

const Tezos = new TezosToolkit('https://mainnet.api.tez.ie');
const THREE_ROUTE_API = 'https://api.3route.io/v1';

// Get quote for token swap
async function getSwapQuote(
  tokenIn: string,
  tokenOut: string,
  amountIn: number
) {
  try {
    const response = await axios.get(\`\${THREE_ROUTE_API}/quote\`, {
      params: {
        tokenIn,
        tokenOut,
        amountIn,
      },
    });
    
    console.log('Swap Quote:', {
      amountIn: response.data.amountIn,
      amountOut: response.data.amountOut,
      priceImpact: response.data.priceImpact,
      route: response.data.route,
      estimatedGas: response.data.estimatedGas,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching swap quote:', error);
    throw error;
  }
}

// Get supported tokens
async function getSupportedTokens() {
  try {
    const response = await axios.get(\`\${THREE_ROUTE_API}/tokens\`);
    
    console.log(\`Supported tokens: \${response.data.length}\`);
    return response.data;
  } catch (error) {
    console.error('Error fetching supported tokens:', error);
    throw error;
  }
}

// Get supported DEXs
async function getSupportedDEXs() {
  try {
    const response = await axios.get(\`\${THREE_ROUTE_API}/dexs\`);
    
    console.log('Supported DEXs:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching supported DEXs:', error);
    throw error;
  }
}

// Get token price in XTZ
async function getTokenPriceInXTZ(tokenAddress: string) {
  try {
    const response = await axios.get(\`\${THREE_ROUTE_API}/price\`, {
      params: {
        token: tokenAddress,
        currency: 'XTZ',
      },
    });
    
    console.log(\`Token price: \${response.data.price} XTZ\`);
    return response.data;
  } catch (error) {
    console.error('Error fetching token price:', error);
    throw error;
  }
}

// Get best swap route with multiple hops
async function getBestRoute(
  tokenIn: string,
  tokenOut: string,
  amountIn: number,
  maxHops: number = 3
) {
  try {
    const response = await axios.get(\`\${THREE_ROUTE_API}/route\`, {
      params: {
        tokenIn,
        tokenOut,
        amountIn,
        maxHops,
      },
    });
    
    console.log('Best Route:', {
      route: response.data.route,
      hops: response.data.hops.length,
      expectedOutput: response.data.expectedOutput,
      priceImpact: response.data.priceImpact,
    });
    
    response.data.hops.forEach((hop: any, index: number) => {
      console.log(\`Hop \${index + 1}: \${hop.dex} - \${hop.tokenIn} → \${hop.tokenOut}\`);
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching best route:', error);
    throw error;
  }
}

// Execute swap via 3Route
async function executeSwap(
  tokenIn: string,
  tokenOut: string,
  amountIn: number,
  minAmountOut: number,
  slippageTolerance: number = 0.5 // 0.5%
) {
  try {
    // Get swap data from 3Route API
    const swapDataResponse = await axios.post(\`\${THREE_ROUTE_API}/swap\`, {
      tokenIn,
      tokenOut,
      amountIn,
      minAmountOut,
      slippageTolerance,
      sender: await Tezos.wallet.pkh(),
    });
    
    const { contractAddress, entrypoint, parameters } = swapDataResponse.data;
    
    // Execute the swap
    const contract = await Tezos.wallet.at(contractAddress);
    const operation = await contract.methods[entrypoint](parameters).send();
    
    await operation.confirmation();
    console.log('Swap confirmed:', operation.hash);
    
    return operation;
  } catch (error) {
    console.error('Error executing swap:', error);
    throw error;
  }
}

// Compare prices across multiple DEXs
async function comparePrices(
  tokenIn: string,
  tokenOut: string,
  amountIn: number
) {
  try {
    const response = await axios.get(\`\${THREE_ROUTE_API}/compare\`, {
      params: {
        tokenIn,
        tokenOut,
        amountIn,
      },
    });
    
    console.log('Price Comparison:');
    response.data.forEach((dex: any) => {
      console.log(\`\${dex.name}: \${dex.amountOut} \${tokenOut} (Impact: \${dex.priceImpact}%)\`);
    });
    
    return response.data;
  } catch (error) {
    console.error('Error comparing prices:', error);
    throw error;
  }
}

// Get historical swap data
async function getHistoricalSwaps(limit: number = 100) {
  try {
    const response = await axios.get(\`\${THREE_ROUTE_API}/swaps\`, {
      params: { limit },
    });
    
    console.log(\`Recent swaps: \${response.data.length}\`);
    return response.data;
  } catch (error) {
    console.error('Error fetching historical swaps:', error);
    throw error;
  }
}

// Get user swap history
async function getUserSwapHistory(userAddress: string) {
  try {
    const response = await axios.get(\`\${THREE_ROUTE_API}/users/\${userAddress}/swaps\`);
    
    console.log(\`User has \${response.data.length} swaps\`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user swap history:', error);
    throw error;
  }
}

// Get gas estimates for swap
async function getGasEstimate(
  tokenIn: string,
  tokenOut: string,
  amountIn: number
) {
  try {
    const response = await axios.post(\`\${THREE_ROUTE_API}/gas-estimate\`, {
      tokenIn,
      tokenOut,
      amountIn,
    });
    
    console.log('Gas Estimate:', {
      gasLimit: response.data.gasLimit,
      storageLimit: response.data.storageLimit,
      estimatedFee: response.data.estimatedFee,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error estimating gas:', error);
    throw error;
  }
}

// Usage
getSupportedTokens().then(tokens => console.log(\`Total tokens: \${tokens.length}\`));
getSupportedDEXs().then(dexs => console.log('Supported DEXs:', dexs));

// Example: Get best route for XTZ → USDt swap
getBestRoute('XTZ', 'KT1XnTn74bUtxHfDtBmm2bGZAQfhPbvKWR8o', 100);

// Example: Execute swap with 0.5% slippage tolerance
// executeSwap('XTZ', 'KT1XnTn74bUtxHfDtBmm2bGZAQfhPbvKWR8o', 100, 95, 0.5);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/3route_io",
    telegram: "https://t.me/threeroute",
    discord: "https://discord.gg/3route",
    medium: "https://3route.medium.com/",
    github: "https://github.com/3route-io",
  },
  
  features: {
    multiDexRouting: true,
    splitRoutes: true,
    gasOptimization: true,
    slippageProtection: true,
    priceImpactCalculation: true,
    historicalData: true,
    fa12Support: true,
    fa2Support: true,
  },
  
  fees: {
    aggregatorFee: "0.05% per swap",
    networkFee: "~0.01-0.1 XTZ (varies by route complexity)",
    dexFees: "Varies by DEX (typically 0.25-0.35%)",
  },
  
  supportedDEXs: [
    "QuipuSwap",
    "Plenty DeFi",
    "SpicySwap",
    "Vortex",
    "Youves",
    "Ctez",
    "Flat Curve",
    "Liquidity Baking",
  ],
  
  notes: [
    "Leading DEX aggregator on Tezos",
    "Finds optimal routes across 8+ DEXs",
    "Split routes for better price execution",
    "Gas optimization reduces transaction costs",
    "Real-time price comparison",
    "Audited smart contracts",
    "Integrated with major Tezos wallets (Temple, Kukai)",
    "Supports both FA1.2 and FA2 tokens",
    "Active development and regular updates",
  ],
  
  contracts: {
    router: "KT1...(router_contract)",
    aggregator: "KT1...(aggregator_contract)",
  },
};

