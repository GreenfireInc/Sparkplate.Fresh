// SpicySwap - AMM DEX on Tezos with Gamification
// Type: AMM DEX
// Blockchain: Tezos (XTZ)

export const spicySwapDEX = {
  name: "SpicySwap",
  blockchain: "Tezos (XTZ)",
  type: "AMM DEX",
  description: "Gamified AMM DEX with NFT rewards, yield farming, and community-driven features",
  
  url: "https://spicyswap.xyz/",
  app: "https://app.spicyswap.xyz/",
  docs: "https://docs.spicyswap.xyz/",
  
  api: {
    graphql: "https://api.spicyswap.xyz/graphql",
    restEndpoint: "https://api.spicyswap.xyz",
    rpcEndpoint: "https://mainnet.api.tez.ie",
    documentation: "https://docs.spicyswap.xyz/developers",
    rateLimit: "Public API available",
  },
  
  sdk: {
    npm: "@taquito/taquito",
    installation: "npm install @taquito/taquito @taquito/signer",
    documentation: "https://docs.spicyswap.xyz/",
    github: "https://github.com/SalsaSwap",
    features: [
      "AMM swaps",
      "Liquidity provision",
      "Yield farming",
      "NFT rewards",
      "Gamification",
    ],
  },
  
  integration: {
    example: `
// SpicySwap Integration Example
import { TezosToolkit } from '@taquito/taquito';
import axios from 'axios';

const Tezos = new TezosToolkit('https://mainnet.api.tez.ie');
const SPICY_API = 'https://api.spicyswap.xyz';
const SPICY_GRAPHQL = 'https://api.spicyswap.xyz/graphql';

// Get all token pairs
async function getAllPairs() {
  try {
    const response = await axios.get(\`\${SPICY_API}/pairs\`);
    console.log(\`Found \${response.data.length} pairs\`);
    return response.data;
  } catch (error) {
    console.error('Error fetching pairs:', error);
    throw error;
  }
}

// Get token price
async function getTokenPrice(tokenAddress: string) {
  try {
    const response = await axios.get(\`\${SPICY_API}/tokens/\${tokenAddress}/price\`);
    
    console.log(\`Token \${tokenAddress} Price: $\${response.data.priceUsd}\`);
    return response.data;
  } catch (error) {
    console.error('Error fetching token price:', error);
    throw error;
  }
}

// Get pair by token addresses
async function getPairByTokens(token1Address: string, token2Address: string) {
  try {
    const pairs = await getAllPairs();
    const pair = pairs.find((p: any) =>
      (p.token1.address === token1Address && p.token2.address === token2Address) ||
      (p.token1.address === token2Address && p.token2.address === token1Address)
    );
    
    if (pair) {
      console.log(\`Pair found: \${pair.token1.symbol}/\${pair.token2.symbol}\`);
      console.log(\`TVL: $\${pair.tvl}, 24h Volume: $\${pair.volume24h}\`);
    }
    
    return pair;
  } catch (error) {
    console.error('Error fetching pair:', error);
    throw error;
  }
}

// Get pair statistics via GraphQL
async function getPairStats(pairAddress: string) {
  try {
    const query = \`
      query {
        pair(id: "\${pairAddress}") {
          id
          token1 {
            symbol
            name
            address
          }
          token2 {
            symbol
            name
            address
          }
          reserve1
          reserve2
          totalSupply
          volumeUSD
          tvlUSD
          apr
        }
      }
    \`;
    
    const response = await axios.post(SPICY_GRAPHQL, {
      query,
      headers: { 'Content-Type': 'application/json' }
    });
    
    const pair = response.data.data.pair;
    console.log('Pair Stats:', pair);
    return pair;
  } catch (error) {
    console.error('Error fetching pair stats:', error);
    throw error;
  }
}

// Calculate price from reserves
async function getPriceFromReserves(token1Address: string, token2Address: string) {
  try {
    const pair = await getPairByTokens(token1Address, token2Address);
    
    if (!pair) {
      throw new Error(\`No pair found for \${token1Address}/\${token2Address}\`);
    }
    
    // Calculate price based on reserves
    const price = pair.token1.address === token1Address
      ? pair.reserve2 / pair.reserve1
      : pair.reserve1 / pair.reserve2;
    
    console.log(\`Price: \${price}\`);
    return price;
  } catch (error) {
    console.error('Error calculating price:', error);
    throw error;
  }
}

// Swap tokens
async function swapTokens(
  pairAddress: string,
  tokenIn: string,
  tokenOut: string,
  amountIn: number,
  minAmountOut: number
) {
  try {
    const contract = await Tezos.wallet.at(pairAddress);
    
    const operation = await contract.methods
      .swap(tokenIn, tokenOut, amountIn, minAmountOut, await Tezos.wallet.pkh())
      .send();
    
    await operation.confirmation();
    console.log('Swap confirmed:', operation.hash);
    return operation;
  } catch (error) {
    console.error('Error executing swap:', error);
    throw error;
  }
}

// Add liquidity
async function addLiquidity(
  pairAddress: string,
  token1Amount: number,
  token2Amount: number,
  minLPTokens: number
) {
  try {
    const contract = await Tezos.wallet.at(pairAddress);
    
    const operation = await contract.methods
      .addLiquidity(token1Amount, token2Amount, minLPTokens, await Tezos.wallet.pkh())
      .send();
    
    await operation.confirmation();
    console.log('Liquidity added:', operation.hash);
    return operation;
  } catch (error) {
    console.error('Error adding liquidity:', error);
    throw error;
  }
}

// Get NFT rewards
async function getNFTRewards(userAddress: string) {
  try {
    const response = await axios.get(\`\${SPICY_API}/users/\${userAddress}/nfts\`);
    
    console.log(\`User has \${response.data.length} NFT rewards\`);
    return response.data;
  } catch (error) {
    console.error('Error fetching NFT rewards:', error);
    throw error;
  }
}

// Usage
getAllPairs().then(pairs => console.log(\`Total pairs: \${pairs.length}\`));
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/spicyswap",
    telegram: "https://t.me/spicyswap",
    discord: "https://discord.gg/spicyswap",
    medium: "https://spicyswap.medium.com/",
    github: "https://github.com/SalsaSwap",
  },
  
  features: {
    amm: true,
    farming: true,
    nftRewards: true,
    gamification: true,
    multiToken: true,
    fa12Support: true,
    fa2Support: true,
  },
  
  fees: {
    trading: "0.30% per swap",
    withdrawal: "Network fee only (~0.01-0.05 XTZ)",
    deposit: "Network fee only",
    farmingFee: "No fee for staking",
  },
  
  contracts: {
    factory: "KT1PwnYo5cT27K4sSfx84QEkzEbZTbV8LhWz",
    router: "KT1RxKJyi48W3bZR8HEr49F6g2HR9bCJQF4d",
  },
  
  notes: [
    "Gamified trading experience with NFT rewards",
    "Fork of Uniswap V2 for Tezos",
    "Lower TVL (~$50k) as of October 2025",
    "Community-driven development",
    "Unique NFT collectibles for active traders",
    "Audited smart contracts",
    "Supports both FA1.2 and FA2 token standards",
  ],
  
  tokenInfo: {
    governanceToken: "SPI",
    tokenContract: "KT1CS2xKGHNPTauSh5Re4qE3N9PCfG5u4dPx",
    tokenSymbol: "SPI",
    tokenDecimals: 6,
  },
};

