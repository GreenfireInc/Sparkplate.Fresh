// Stader Labs - BNB Liquid Staking
// Liquid staking with BNBx tokens

export const StaderPool = {
  name: 'Stader Labs',
  ticker: 'BNB',
  liquidStakingToken: 'BNBx',
  
  // Pool Information
  description: 'Stader Labs provides liquid staking for BNB, allowing users to stake BNB and receive BNBx tokens. BNBx can be used in DeFi while earning staking rewards from the underlying BNB.',
  type: 'Liquid Staking',
  location: 'Decentralized (Multi-chain)',
  features: [
    'Liquid staking with BNBx',
    'Multi-chain support',
    'DeFi composability',
    'Instant liquidity',
    'No minimum stake',
    'Auto-compounding rewards'
  ],
  
  // Official Links
  website: 'https://www.staderlabs.com/',
  staking: 'https://www.staderlabs.com/stake/bnb',
  docs: 'https://docs.staderlabs.com/',
  app: 'https://www.staderlabs.com/stake/bnb',
  blog: 'https://blog.staderlabs.com/',
  
  // Smart Contract Information
  contracts: {
    bnbx: '0x...', // BNBx token contract on BSC
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
    docs: 'https://docs.staderlabs.com/developers',
    github: 'https://github.com/stader-labs',
    installation: 'npm install ethers web3',
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/staderlabs',
    discord: 'https://discord.gg/staderlabs',
    telegram: 'https://t.me/staderlabs',
    medium: 'https://blog.staderlabs.com/',
  },
  
  // Integration Examples
  integration: {
    getExchangeRate: `
import { ethers } from 'ethers';

const STADER_BNBX_CONTRACT = '0x...'; // BNBx contract address

async function getBNBxExchangeRate() {
  try {
    // Connect to BSC
    const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    
    // Get BNBx contract
    const bnbxContract = new ethers.Contract(
      STADER_BNBX_CONTRACT,
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
      exchangeRate = await bnbxContract.getExchangeRate();
    } catch {
      // Fallback: calculate from total supply and staked amount
      const totalSupply = await bnbxContract.totalSupply();
      const decimals = await bnbxContract.decimals();
      
      // This would require the staked BNB amount - simplified example
      const totalStakedBNB = await provider.getBalance('0x...'); // Staking pool
      exchangeRate = totalStakedBNB / (totalSupply / (10 ** decimals));
    }
    
    console.log('BNBx Exchange Rate:', exchangeRate);
    return exchangeRate;
  } catch (error) {
    console.error('Error fetching BNBx exchange rate:', error);
    throw error;
  }
}
    `,
    
    stakeBNB: `
import { ethers } from 'ethers';

async function stakeBNBWithStader(
  privateKey: string,
  amount: string // Amount in BNB
) {
  try {
    // Connect wallet
    const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    const wallet = new ethers.Wallet(privateKey, provider);
    
    // Convert BNB to Wei
    const amountWei = ethers.parseEther(amount);
    
    // Stader staking transaction
    const tx = await wallet.sendTransaction({
      to: '0x...', // Stader staking contract address
      value: amountWei,
      gasLimit: 300000,
    });
    
    console.log('Staking transaction sent:', tx.hash);
    
    // Wait for confirmation
    const receipt = await tx.wait();
    console.log('Staking confirmed:', receipt.transactionHash);
    
    return receipt;
  } catch (error) {
    console.error('Error staking BNB with Stader:', error);
    throw error;
  }
}
    `,
    
    unstakeBNBx: `
import { ethers } from 'ethers';

const STADER_BNBX_CONTRACT = '0x...';

async function unstakeBNBx(
  privateKey: string,
  amount: string // Amount in BNBx
) {
  try {
    const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    const wallet = new ethers.Wallet(privateKey, provider);
    
    // Get BNBx contract
    const bnbxContract = new ethers.Contract(
      STADER_BNBX_CONTRACT,
      [
        'function decimals() view returns (uint8)',
        'function approve(address spender, uint256 amount) returns (bool)',
        'function unstake(uint256 amount) returns (bool)'
      ],
      wallet
    );
    
    const decimals = await bnbxContract.decimals();
    const amountWei = ethers.parseUnits(amount, decimals);
    
    // Approve spending
    const approveTx = await bnbxContract.approve(
      '0x...', // Stader staking contract
      amountWei
    );
    await approveTx.wait();
    
    // Unstake BNBx for BNB
    const unstakeTx = await bnbxContract.unstake(amountWei);
    const receipt = await unstakeTx.wait();
    
    console.log('Unstaking transaction:', receipt.transactionHash);
    return receipt;
  } catch (error) {
    console.error('Error unstaking BNBx:', error);
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
    liquidityPremium: 'Instant via BNBx',
    fees: '~5% of staking rewards',
    exchangeRate: 'Dynamic (typically > 1 BNBx per BNB)',
  },
  
  // Additional Resources
  resources: [
    {
      title: 'Stader BNB Staking',
      url: 'https://www.staderlabs.com/stake/bnb',
    },
    {
      title: 'Documentation',
      url: 'https://docs.staderlabs.com/',
    },
    {
      title: 'Developer Guide',
      url: 'https://docs.staderlabs.com/developers',
    },
    {
      title: 'Smart Contracts',
      url: 'https://docs.staderlabs.com/developers/smart-contracts',
    },
  ],
};
