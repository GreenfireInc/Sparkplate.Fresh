// Vortex - Concentrated Liquidity DEX on Tezos
// Type: Concentrated Liquidity AMM
// Blockchain: Tezos (XTZ)

export const vortexDEX = {
  name: "Vortex",
  blockchain: "Tezos (XTZ)",
  type: "Concentrated Liquidity AMM",
  description: "Next-generation AMM with concentrated liquidity similar to Uniswap V3, offering improved capital efficiency",
  
  url: "https://vortex.network/",
  app: "https://app.vortex.network/",
  docs: "https://docs.vortex.network/",
  
  api: {
    graphql: "https://api.vortex.network/graphql",
    restEndpoint: "https://api.vortex.network",
    rpcEndpoint: "https://mainnet.api.tez.ie",
    documentation: "https://docs.vortex.network/developers",
    rateLimit: "Public API available",
  },
  
  sdk: {
    npm: "@taquito/taquito",
    installation: "npm install @taquito/taquito @taquito/signer",
    documentation: "https://docs.vortex.network/",
    github: "https://github.com/Vortex-Protocol",
    features: [
      "Concentrated liquidity positions",
      "Multiple fee tiers",
      "Range orders",
      "Non-fungible LP tokens (NFT positions)",
      "Advanced price oracles",
    ],
  },
  
  integration: {
    example: `
// Vortex Concentrated Liquidity Integration Example
import { TezosToolkit } from '@taquito/taquito';
import axios from 'axios';

const Tezos = new TezosToolkit('https://mainnet.api.tez.ie');
const VORTEX_API = 'https://api.vortex.network';
const VORTEX_GRAPHQL = 'https://api.vortex.network/graphql';

// Get all pools with fee tiers
async function getAllPools() {
  try {
    const response = await axios.get(\`\${VORTEX_API}/pools\`);
    console.log(\`Found \${response.data.length} pools\`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pools:', error);
    throw error;
  }
}

// Get pool by token pair and fee tier
async function getPoolByPairAndFee(
  token1Address: string,
  token2Address: string,
  feeTier: number // 500 (0.05%), 3000 (0.30%), or 10000 (1.00%)
) {
  try {
    const response = await axios.get(
      \`\${VORTEX_API}/pools/\${token1Address}/\${token2Address}/\${feeTier}\`
    );
    
    console.log(\`Pool: \${response.data.token1.symbol}/\${response.data.token2.symbol}\`);
    console.log(\`Fee Tier: \${feeTier / 10000}%\`);
    console.log(\`TVL: $\${response.data.tvl}\`);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching pool:', error);
    throw error;
  }
}

// Get current price and tick
async function getCurrentPriceAndTick(poolAddress: string) {
  try {
    const response = await axios.get(\`\${VORTEX_API}/pools/\${poolAddress}/slot0\`);
    
    const price = Math.pow(1.0001, response.data.tick);
    
    console.log('Current State:', {
      sqrtPriceX96: response.data.sqrtPriceX96,
      tick: response.data.tick,
      price: price,
      observationIndex: response.data.observationIndex,
      observationCardinality: response.data.observationCardinality,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching price and tick:', error);
    throw error;
  }
}

// Get position details
async function getPosition(positionId: number) {
  try {
    const response = await axios.get(\`\${VORTEX_API}/positions/\${positionId}\`);
    
    console.log('Position Details:', {
      id: response.data.id,
      pool: response.data.pool,
      tickLower: response.data.tickLower,
      tickUpper: response.data.tickUpper,
      liquidity: response.data.liquidity,
      token1Amount: response.data.token1Amount,
      token2Amount: response.data.token2Amount,
      feesEarned: response.data.feesEarned,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching position:', error);
    throw error;
  }
}

// Get user positions
async function getUserPositions(userAddress: string) {
  try {
    const response = await axios.get(\`\${VORTEX_API}/users/\${userAddress}/positions\`);
    
    console.log(\`User has \${response.data.length} positions\`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user positions:', error);
    throw error;
  }
}

// Quote swap
async function quoteSwap(
  poolAddress: string,
  tokenIn: string,
  tokenOut: string,
  amountIn: number
) {
  try {
    const response = await axios.post(\`\${VORTEX_API}/quote\`, {
      poolAddress,
      tokenIn,
      tokenOut,
      amountIn,
    });
    
    console.log('Swap Quote:', {
      amountIn: response.data.amountIn,
      amountOut: response.data.amountOut,
      priceImpact: response.data.priceImpact,
      fee: response.data.fee,
    });
    
    return response.data;
  } catch (error) {
    console.error('Error quoting swap:', error);
    throw error;
  }
}

// Execute swap
async function swapTokens(
  poolAddress: string,
  tokenIn: string,
  tokenOut: string,
  amountIn: number,
  minAmountOut: number,
  sqrtPriceLimitX96: string
) {
  try {
    const contract = await Tezos.wallet.at(poolAddress);
    
    const operation = await contract.methods
      .swap(
        await Tezos.wallet.pkh(),
        tokenIn === 'token0',
        amountIn,
        sqrtPriceLimitX96,
        minAmountOut
      )
      .send();
    
    await operation.confirmation();
    console.log('Swap confirmed:', operation.hash);
    return operation;
  } catch (error) {
    console.error('Error executing swap:', error);
    throw error;
  }
}

// Mint concentrated liquidity position
async function mintPosition(
  poolAddress: string,
  tickLower: number,
  tickUpper: number,
  amount0Desired: number,
  amount1Desired: number,
  amount0Min: number,
  amount1Min: number
) {
  try {
    const positionManager = await Tezos.wallet.at('KT1...(position_manager_address)');
    
    const operation = await positionManager.methods
      .mint({
        pool: poolAddress,
        tickLower,
        tickUpper,
        amount0Desired,
        amount1Desired,
        amount0Min,
        amount1Min,
        recipient: await Tezos.wallet.pkh(),
        deadline: Math.floor(Date.now() / 1000) + 3600,
      })
      .send();
    
    await operation.confirmation();
    console.log('Position minted:', operation.hash);
    return operation;
  } catch (error) {
    console.error('Error minting position:', error);
    throw error;
  }
}

// Collect fees from position
async function collectFees(positionId: number) {
  try {
    const positionManager = await Tezos.wallet.at('KT1...(position_manager_address)');
    
    const operation = await positionManager.methods
      .collect({
        tokenId: positionId,
        recipient: await Tezos.wallet.pkh(),
        amount0Max: '340282366920938463463374607431768211455', // max uint128
        amount1Max: '340282366920938463463374607431768211455',
      })
      .send();
    
    await operation.confirmation();
    console.log('Fees collected:', operation.hash);
    return operation;
  } catch (error) {
    console.error('Error collecting fees:', error);
    throw error;
  }
}

// Usage
getAllPools().then(pools => console.log(\`Total pools: \${pools.length}\`));
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/VortexNetwork",
    telegram: "https://t.me/vortexnetwork",
    discord: "https://discord.gg/vortexnetwork",
    medium: "https://vortex.medium.com/",
    github: "https://github.com/Vortex-Protocol",
  },
  
  features: {
    concentratedLiquidity: true,
    multipleFeeTiers: true,
    rangeOrders: true,
    nftPositions: true,
    priceOracles: true,
    fa12Support: true,
    fa2Support: true,
  },
  
  fees: {
    trading: "0.05%, 0.30%, or 1.00% (3 fee tiers)",
    withdrawal: "Network fee only (~0.01-0.05 XTZ)",
    deposit: "Network fee only",
    positionManagement: "Network fee only",
  },
  
  contracts: {
    factory: "KT1VortexFactoryAddress",
    positionManager: "KT1VortexPositionManager",
    quoter: "KT1VortexQuoter",
  },
  
  notes: [
    "First Uniswap V3-style concentrated liquidity DEX on Tezos",
    "LP positions are NFTs (non-fungible)",
    "Three fee tiers for different trading pair types",
    "Up to 4000x capital efficiency vs traditional AMMs",
    "Advanced features for market makers",
    "Audited smart contracts",
    "Growing ecosystem with improved TVL",
    "Tick-based pricing system",
  ],
  
  feeTiers: [
    {
      fee: 500, // 0.05%
      description: "For stablecoin pairs with very low volatility",
    },
    {
      fee: 3000, // 0.30%
      description: "For most standard pairs",
    },
    {
      fee: 10000, // 1.00%
      description: "For exotic or high-volatility pairs",
    },
  ],
};

