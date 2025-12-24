// QuipuSwap - Leading AMM DEX on Tezos
// Type: AMM DEX
// Blockchain: Tezos (XTZ)

export const quipuswapDEX = {
  name: "QuipuSwap",
  blockchain: "Tezos (XTZ)",
  type: "AMM DEX",
  description: "One of the first and most popular AMM DEXs on Tezos, supporting FA1.2 and FA2 tokens with governance via QUIPU token",
  
  url: "https://quipuswap.com/",
  app: "https://quipuswap.com/swap",
  docs: "https://docs.quipuswap.com/",
  
  api: {
    graphql: "https://api.quipuswap.com/v1/graphql",
    analytics: "https://analytics.quipuswap.com",
    rpcEndpoint: "https://mainnet.api.tez.ie",
    documentation: "https://docs.quipuswap.com/",
    rateLimit: "Public API available",
  },
  
  sdk: {
    npm: "@taquito/taquito",
    installation: "npm install @taquito/taquito @taquito/signer",
    documentation: "https://tezostaquito.io/",
    github: "https://github.com/madfish-solutions/quipuswap-core",
    features: [
      "Token swaps",
      "Liquidity provision",
      "Yield farming",
      "QUIPU governance",
      "Contract interactions",
    ],
  },
  
  integration: {
    example: `
// QuipuSwap Integration Example
import { TezosToolkit } from '@taquito/taquito';
import axios from 'axios';

const Tezos = new TezosToolkit('https://mainnet.api.tez.ie');
const QUIPUSWAP_GRAPHQL = 'https://api.quipuswap.com/v1/graphql';

// Get all pools from GraphQL
async function getAllPools() {
  try {
    const query = \`
      query {
        pair {
          contract
          token0 {
            symbol
            address
          }
          token1 {
            symbol
            address
          }
          token0Reserve
          token1Reserve
          totalSupply
          volumeUsd24h
          tvlUsd
        }
      }
    \`;
    
    const response = await axios.post(QUIPUSWAP_GRAPHQL, {
      query,
      headers: { 'Content-Type': 'application/json' }
    });
    
    const pools = response.data.data.pair;
    console.log(\`Found \${pools.length} QuipuSwap pools\`);
    return pools;
  } catch (error) {
    console.error('Error fetching pools:', error);
    throw error;
  }
}

// Get specific pair price
async function getPairPrice(token0Symbol: string, token1Symbol: string) {
  try {
    const query = \`
      query {
        pair(where: {
          token0: {symbol: {_eq: "\${token0Symbol}"}},
          token1: {symbol: {_eq: "\${token1Symbol}"}}
        }) {
          token0Price
          token1Price
          token0Reserve
          token1Reserve
        }
      }
    \`;
    
    const response = await axios.post(QUIPUSWAP_GRAPHQL, { query });
    const pair = response.data.data.pair[0];
    
    if (pair) {
      console.log(\`\${token0Symbol}/\${token1Symbol} Price: \${pair.token0Price}\`);
      console.log(\`Reserves: \${pair.token0Reserve} \${token0Symbol}, \${pair.token1Reserve} \${token1Symbol}\`);
      return pair;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching pair price:', error);
    throw error;
  }
}

// Get pool data from smart contract
async function getPoolStorage(poolAddress: string) {
  try {
    const contract = await Tezos.contract.at(poolAddress);
    const storage: any = await contract.storage();
    
    console.log('Pool Storage:', {
      tokenPool: storage.token_pool,
      xtzPool: storage.tez_pool,
      totalSupply: storage.total_supply
    });
    
    // Calculate price
    const price = Number(storage.tez_pool) / Number(storage.token_pool);
    console.log(\`Pool Price: \${price} XTZ per token\`);
    
    return {
      tokenReserve: storage.token_pool,
      xtzReserve: storage.tez_pool,
      totalSupply: storage.total_supply,
      price
    };
  } catch (error) {
    console.error('Error reading pool storage:', error);
    throw error;
  }
}

// Swap tokens (requires wallet)
async function swapTokens(
  poolAddress: string,
  tokenIn: 'xtz' | 'token',
  amountIn: number,
  minAmountOut: number
) {
  try {
    const contract = await Tezos.wallet.at(poolAddress);
    
    if (tokenIn === 'xtz') {
      // XTZ to token swap
      const operation = await contract.methods
        .tezToTokenPayment(minAmountOut, await Tezos.wallet.pkh())
        .send({ amount: amountIn });
      
      await operation.confirmation();
      console.log('Swap confirmed:', operation.hash);
      return operation;
    } else {
      // Token to XTZ swap
      const operation = await contract.methods
        .tokenToTezPayment(amountIn, minAmountOut, await Tezos.wallet.pkh())
        .send();
      
      await operation.confirmation();
      console.log('Swap confirmed:', operation.hash);
      return operation;
    }
  } catch (error) {
    console.error('Error executing swap:', error);
    throw error;
  }
}

// Add liquidity to pool
async function addLiquidity(
  poolAddress: string,
  xtzAmount: number,
  tokenAmount: number,
  minLPTokens: number
) {
  try {
    const contract = await Tezos.wallet.at(poolAddress);
    
    const operation = await contract.methods
      .investLiquidity(tokenAmount)
      .send({ amount: xtzAmount });
    
    await operation.confirmation();
    console.log('Liquidity added:', operation.hash);
    return operation;
  } catch (error) {
    console.error('Error adding liquidity:', error);
    throw error;
  }
}

// Get farming rewards
async function getFarmingRewards(farmAddress: string, userAddress: string) {
  try {
    const contract = await Tezos.contract.at(farmAddress);
    const storage: any = await contract.storage();
    
    // Get user's staked balance and pending rewards
    const userStake = await storage.stakes.get(userAddress);
    
    if (userStake) {
      console.log('User Farming Info:', {
        staked: userStake.balance,
        pendingRewards: userStake.rewards
      });
      
      return userStake;
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching farming rewards:', error);
    throw error;
  }
}

// Get 24h volume and TVL
async function getPoolAnalytics(poolContract: string) {
  try {
    const query = \`
      query {
        pair(where: {contract: {_eq: "\${poolContract}"}}) {
          volumeUsd24h
          tvlUsd
          feesUsd24h
          apr
          transactions24h
        }
      }
    \`;
    
    const response = await axios.post(QUIPUSWAP_GRAPHQL, { query });
    const analytics = response.data.data.pair[0];
    
    console.log('Pool Analytics:', analytics);
    return analytics;
  } catch (error) {
    console.error('Error fetching analytics:', error);
    throw error;
  }
}

// Usage
getAllPools().then(pools => console.log(\`Total pools: \${pools.length}\`));
getPairPrice('XTZ', 'USDtz').then(pair => console.log('XTZ/USDtz:', pair));
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/QuipuSwap",
    telegram: "https://t.me/MadFishCommunity",
    discord: "https://discord.gg/qFRZ8kVzkv",
    medium: "https://madfish.solutions/blog/",
    github: "https://github.com/madfish-solutions",
  },
  
  features: {
    amm: true,
    orderbook: false,
    farming: true,
    governance: true,
    flashLoans: false,
    multiToken: true,
    fa12Support: true,
    fa2Support: true,
  },
  
  fees: {
    trading: "0.3% per swap (0.25% to LPs, 0.05% to QUIPU holders)",
    withdrawal: "Network fee only (~0.01-0.05 XTZ)",
    deposit: "Network fee only",
  },
  
  contracts: {
    factory: "KT1FWHWkczg5XrQmKzto4KZzqCnjecULf2jC",
    router: "KT1VH3DVKpPYs4H9j3oXxV3J3Jj4tj7LjK6v",
    governance: "KT1Mu2Rch8YRaJ3xYGvEHFzuF5Y6M6dYgxbz",
  },
  
  notes: [
    "One of the first AMM DEXs on Tezos",
    "Supports 300+ token pairs",
    "QUIPU token for governance and fee sharing",
    "Baking rewards delegation for liquidity providers",
    "Flash swaps available",
    "Audited by multiple security firms",
    "~$1.57M TVL as of October 2025",
    "FA1.2 and FA2 token standards supported",
  ],
  
  tokenInfo: {
    governanceToken: "QUIPU",
    tokenContract: "KT193D4vozYnhGJQVtw7CoxxqphqUEEwK6Vb",
    tokenSymbol: "QUIPU",
    tokenDecimals: 6,
  },
};

