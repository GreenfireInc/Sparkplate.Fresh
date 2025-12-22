// Ankr - BNB Liquid Staking Protocol
// Liquid staking with ankrBNB tokens

export const AnkrPool = {
  name: 'Ankr',
  ticker: 'BNB',
  liquidStakingToken: 'ankrBNB',
  
  // Pool Information
  description: 'Ankr provides liquid staking for BNB, allowing users to stake BNB and receive ankrBNB tokens. ankrBNB can be used in DeFi while earning staking rewards from the underlying BNB.',
  type: 'Liquid Staking',
  location: 'Decentralized (BNB Smart Chain)',
  features: [
    'Liquid staking with ankrBNB',
    'DeFi composability',
    'Instant liquidity',
    'No minimum stake',
    'Auto-compounding rewards',
    'Multi-chain support'
  ],
  
  // Official Links
  website: 'https://www.ankr.com/',
  staking: 'https://www.ankr.com/staking/stake/bnb/',
  docs: 'https://docs.ankr.com/staking/liquid-staking/bnb',
  app: 'https://www.ankr.com/staking/stake/bnb/',
  blog: 'https://www.ankr.com/blog/',
  
  // Smart Contract Information
  contracts: {
    ankrBNB: '0x52F24a5e03aee338Da5fd9Df68D2b6FAe1178827', // ankrBNB token contract
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
      exchangeRate: '/api/v1/staking/bnb/exchange-rate',
      totalStaked: '/api/v1/staking/bnb/total-staked',
      validators: '/api/v1/staking/bnb/validators',
    },
  },
  
  // SDK Information
  sdk: {
    npm: 'ethers',
    web3: 'web3',
    docs: 'https://docs.ankr.com/staking/liquid-staking/bnb',
    github: 'https://github.com/Ankr-network',
    installation: 'npm install ethers web3',
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/ankr',
    discord: 'https://discord.gg/ankr',
    telegram: 'https://t.me/ankrnetwork',
    medium: 'https://medium.com/ankr-network',
  },
  
  // Integration Examples
  integration: {
    getExchangeRate: `
import { ethers } from 'ethers';

const ANKR_BNB_CONTRACT = '0x52F24a5e03aee338Da5fd9Df68D2b6FAe1178827';

async function getAnkrBNBExchangeRate() {
  try {
    // Connect to BSC
    const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    
    // Get ankrBNB contract
    const ankrBNBContract = new ethers.Contract(
      ANKR_BNB_CONTRACT,
      [
        'function totalSupply() view returns (uint256)',
        'function decimals() view returns (uint8)',
        'function balanceOf(address) view returns (uint256)'
      ],
      provider
    );
    
    // Get total supply of ankrBNB
    const totalSupply = await ankrBNBContract.totalSupply();
    const decimals = await ankrBNBContract.decimals();
    
    // Calculate exchange rate: total BNB staked / total ankrBNB supply
    // This is a simplified calculation - actual rate may vary
    const totalStakedBNB = await provider.getBalance('0x...'); // Staking pool address
    const exchangeRate = totalStakedBNB / (totalSupply / (10 ** decimals));
    
    console.log('ankrBNB Exchange Rate:', exchangeRate);
    return exchangeRate;
  } catch (error) {
    console.error('Error fetching ankrBNB exchange rate:', error);
    throw error;
  }
}
    `,
    
    stakeBNB: `
import { ethers } from 'ethers';

async function stakeBNBWithAnkr(
  privateKey: string,
  amount: string // Amount in BNB
) {
  try {
    // Connect wallet
    const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    const wallet = new ethers.Wallet(privateKey, provider);
    
    // Convert BNB to Wei
    const amountWei = ethers.parseEther(amount);
    
    // Ankr staking transaction (simplified - actual implementation requires contract calls)
    const tx = await wallet.sendTransaction({
      to: '0x...', // Ankr staking contract address
      value: amountWei,
      gasLimit: 300000,
    });
    
    console.log('Staking transaction sent:', tx.hash);
    
    // Wait for confirmation
    const receipt = await tx.wait();
    console.log('Staking confirmed:', receipt.transactionHash);
    
    return receipt;
  } catch (error) {
    console.error('Error staking BNB with Ankr:', error);
    throw error;
  }
}
    `,
    
    unstakeAnkrBNB: `
import { ethers } from 'ethers';

const ANKR_BNB_CONTRACT = '0x52F24a5e03aee338Da5fd9Df68D2b6FAe1178827';

async function unstakeAnkrBNB(
  privateKey: string,
  amount: string // Amount in ankrBNB
) {
  try {
    const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    const wallet = new ethers.Wallet(privateKey, provider);
    
    // Get ankrBNB contract
    const ankrBNBContract = new ethers.Contract(
      ANKR_BNB_CONTRACT,
      [
        'function decimals() view returns (uint8)',
        'function approve(address spender, uint256 amount) returns (bool)',
        'function redeem(uint256 amount) returns (bool)'
      ],
      wallet
    );
    
    const decimals = await ankrBNBContract.decimals();
    const amountWei = ethers.parseUnits(amount, decimals);
    
    // Approve spending (if needed)
    const approveTx = await ankrBNBContract.approve(
      '0x...', // Ankr staking contract
      amountWei
    );
    await approveTx.wait();
    
    // Redeem ankrBNB for BNB
    const redeemTx = await ankrBNBContract.redeem(amountWei);
    const receipt = await redeemTx.wait();
    
    console.log('Unstaking transaction:', receipt.transactionHash);
    return receipt;
  } catch (error) {
    console.error('Error unstaking ankrBNB:', error);
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
    liquidityPremium: 'Instant via ankrBNB',
    fees: '~10% of staking rewards',
    exchangeRate: 'Dynamic (typically > 1 ankrBNB per BNB)',
  },
  
  // Additional Resources
  resources: [
    {
      title: 'Ankr BNB Staking',
      url: 'https://www.ankr.com/staking/stake/bnb/',
    },
    {
      title: 'Documentation',
      url: 'https://docs.ankr.com/staking/liquid-staking/bnb',
    },
    {
      title: 'Smart Contracts',
      url: 'https://docs.ankr.com/staking/liquid-staking/bnb/smart-contracts',
    },
    {
      title: 'API Reference',
      url: 'https://docs.ankr.com/',
    },
  ],
};
