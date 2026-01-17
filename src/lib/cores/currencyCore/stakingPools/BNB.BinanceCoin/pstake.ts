// pSTAKE Finance - BNB Liquid Staking
// Liquid staking with stkBNB tokens

export const PStakeBNBPool = {
  name: 'pSTAKE Finance',
  ticker: 'BNB',
  liquidStakingToken: 'stkBNB',
  
  // Pool Information
  description: 'pSTAKE Finance provides liquid staking for BNB, allowing users to mint stkBNB tokens while earning staking rewards. stkBNB can be used across DeFi protocols while the underlying BNB remains staked.',
  type: 'Liquid Staking',
  location: 'Decentralized (Multi-chain)',
  features: [
    'Liquid staking with stkBNB',
    'Cross-chain compatibility',
    'Instant liquidity',
    'No minimum stake',
    'Auto-compounding rewards',
    'DeFi composability'
  ],
  
  // Official Links
  website: 'https://pstake.finance/',
  staking: 'https://pstake.finance/stake/bnb',
  docs: 'https://docs.pstake.finance/',
  app: 'https://app.pstake.finance/',
  blog: 'https://blog.pstake.finance/',
  
  // Smart Contract Information
  contracts: {
    stkBNB: '0x...', // stkBNB token contract on BSC
    stakingPool: '0x...', // Main staking pool contract
    bscNetwork: 56,
  },
  
  // API & SDK
  api: {
    rpcEndpoint: 'https://bsc-dataseed.binance.org/',
    alternativeRPC: [
      'https://bsc-dataseed1.defibit.io/',
      'https://bsc-dataseed1.ninicoin.io/',
      'https://rpc.ankr.com/bsc',
    ],
    endpoints: {
      exchangeRate: '/api/v1/bnb/exchange-rate',
      totalStaked: '/api/v1/bnb/total-staked',
      stakingStats: '/api/v1/bnb/staking-stats',
    },
  },
  
  // SDK Information
  sdk: {
    npm: 'ethers',
    web3: 'web3',
    docs: 'https://docs.pstake.finance/developers',
    github: 'https://github.com/persistenceOne/pstake-native',
    installation: 'npm install ethers web3',
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/pStakeFinance',
    discord: 'https://discord.gg/pstake',
    telegram: 'https://t.me/pStakeFinance',
    medium: 'https://blog.pstake.finance/',
  },
  
  // Integration Examples
  integration: {
    getExchangeRate: `
import { ethers } from 'ethers';

const PSTAKE_BNB_CONTRACT = '0x...'; // stkBNB contract address

async function getStkBNBExchangeRate() {
  try {
    // Connect to BSC
    const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    
    // Get stkBNB contract
    const stkBNBContract = new ethers.Contract(
      PSTAKE_BNB_CONTRACT,
      [
        'function totalSupply() view returns (uint256)',
        'function decimals() view returns (uint8)',
        'function getExchangeRate() view returns (uint256)'
      ],
      provider
    );
    
    // Get exchange rate directly from contract (if available)
    let exchangeRate;
    try {
      exchangeRate = await stkBNBContract.getExchangeRate();
    } catch {
      // Fallback: calculate from total supply and staked amount
      const totalSupply = await stkBNBContract.totalSupply();
      const decimals = await stkBNBContract.decimals();
      
      // This would require the staked BNB amount - simplified example
      const totalStakedBNB = await provider.getBalance('0x...'); // Staking pool
      exchangeRate = totalStakedBNB / (totalSupply / (10 ** decimals));
    }
    
    console.log('stkBNB Exchange Rate:', exchangeRate);
    return exchangeRate;
  } catch (error) {
    console.error('Error fetching stkBNB exchange rate:', error);
    throw error;
  }
}
    `,
    
    stakeBNB: `
import { ethers } from 'ethers';

async function stakeBNBWithPStake(
  privateKey: string,
  amount: string // Amount in BNB
) {
  try {
    // Connect wallet
    const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    const wallet = new ethers.Wallet(privateKey, provider);
    
    // Convert BNB to Wei
    const amountWei = ethers.parseEther(amount);
    
    // pSTAKE staking transaction
    const tx = await wallet.sendTransaction({
      to: '0x...', // pSTAKE staking contract address
      value: amountWei,
      gasLimit: 300000,
    });
    
    console.log('Staking transaction sent:', tx.hash);
    
    // Wait for confirmation
    const receipt = await tx.wait();
    console.log('Staking confirmed:', receipt.transactionHash);
    
    return receipt;
  } catch (error) {
    console.error('Error staking BNB with pSTAKE:', error);
    throw error;
  }
}
    `,
    
    unstakeStkBNB: `
import { ethers } from 'ethers';

const PSTAKE_BNB_CONTRACT = '0x...';

async function unstakeStkBNB(
  privateKey: string,
  amount: string // Amount in stkBNB
) {
  try {
    const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    const wallet = new ethers.Wallet(privateKey, provider);
    
    // Get stkBNB contract
    const stkBNBContract = new ethers.Contract(
      PSTAKE_BNB_CONTRACT,
      [
        'function decimals() view returns (uint8)',
        'function approve(address spender, uint256 amount) returns (bool)',
        'function unstake(uint256 amount) returns (bool)'
      ],
      wallet
    );
    
    const decimals = await stkBNBContract.decimals();
    const amountWei = ethers.parseUnits(amount, decimals);
    
    // Approve spending
    const approveTx = await stkBNBContract.approve(
      '0x...', // pSTAKE staking contract
      amountWei
    );
    await approveTx.wait();
    
    // Unstake stkBNB for BNB
    const unstakeTx = await stkBNBContract.unstake(amountWei);
    const receipt = await unstakeTx.wait();
    
    console.log('Unstaking transaction:', receipt.transactionHash);
    return receipt;
  } catch (error) {
    console.error('Error unstaking stkBNB:', error);
    throw error;
  }
}
    `,
  },
  
  // Staking Metrics
  metrics: {
    estimatedAPY: '5-8%',
    minimumStake: '0 BNB',
    unbondingPeriod: 'Instant (liquid)',
    liquidityPremium: 'Instant via stkBNB',
    fees: '~5% of staking rewards',
    exchangeRate: 'Dynamic (typically > 1 stkBNB per BNB)',
  },
  
  // Additional Resources
  resources: [
    {
      title: 'pSTAKE BNB Staking',
      url: 'https://pstake.finance/stake/bnb',
    },
    {
      title: 'Documentation',
      url: 'https://docs.pstake.finance/',
    },
    {
      title: 'Developer Guide',
      url: 'https://docs.pstake.finance/developers',
    },
    {
      title: 'Smart Contracts',
      url: 'https://docs.pstake.finance/developers/smart-contracts',
    },
  ],
};
