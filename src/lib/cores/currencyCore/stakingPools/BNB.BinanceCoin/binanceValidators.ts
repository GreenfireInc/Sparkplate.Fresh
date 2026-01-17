// BNB Chain Validators - Native Staking
// Direct staking with BNB Chain validators

export const BinanceValidators = {
  name: 'BNB Chain Validators',
  ticker: 'BNB',
  liquidStakingToken: 'N/A (Native staking)',
  
  // Pool Information
  description: 'Native staking on BNB Chain allows users to delegate BNB directly to any of the 21 active validators. Users earn staking rewards while helping secure the BNB Smart Chain network.',
  type: 'Native Validator Staking',
  location: 'Decentralized (BNB Chain)',
  features: [
    '21 active validators',
    'Decentralized validation',
    'Slashing protection',
    'Governance participation',
    'Commission-based rewards',
    'Validator choice flexibility'
  ],
  
  // Official Links
  website: 'https://www.bnbchain.org/',
  validators: 'https://www.bnbchain.org/en/bnb-smart-chain/validators',
  docs: 'https://docs.bnbchain.org/',
  explorer: 'https://bscscan.com/',
  staking: 'https://www.bnbchain.org/en/staking',
  
  // API & SDK
  api: {
    rpcEndpoint: 'https://bsc-dataseed.binance.org/',
    alternativeRPC: [
      'https://bsc-dataseed1.defibit.io/',
      'https://bsc-dataseed1.ninicoin.io/',
      'https://rpc.ankr.com/bsc',
    ],
    endpoints: {
      validators: '/api/v1/validators',
      stakingPool: '/api/v1/staking/pool',
      delegations: '/api/v1/delegations/:address',
    },
  },
  
  // SDK Information
  sdk: {
    npm: 'ethers',
    web3: 'web3',
    docs: 'https://docs.bnbchain.org/docs/develop/',
    github: 'https://github.com/bnb-chain',
    installation: 'npm install ethers web3',
  },
  
  // Chain Details
  chain: {
    chainId: 56,
    networkName: 'BNB Smart Chain',
    nativeCurrency: 'BNB',
    decimals: 18,
    rpcUrls: ['https://bsc-dataseed.binance.org/'],
    blockExplorerUrls: ['https://bscscan.com/'],
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/BNBCHAIN',
    discord: 'https://discord.gg/bnbchain',
    telegram: 'https://t.me/bnbchain',
    reddit: 'https://www.reddit.com/r/bnbchainofficial/',
    youtube: 'https://www.youtube.com/c/BNBChain',
  },
  
  // Integration Examples
  integration: {
    getValidators: `
import { ethers } from 'ethers';

async function getBNBValidators() {
  try {
    // Connect to BSC
    const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    
    // Get validator information from BSC API
    const response = await fetch('https://api.bscscan.com/api?module=validators&action=getvalidators');
    const data = await response.json();
    
    if (data.status === '1') {
      const validators = data.result.map((v: any) => ({
        address: v.validatorAddress,
        name: v.name,
        commission: parseFloat(v.commissionRate) / 100, // Convert to decimal
        votingPower: parseFloat(v.votingPower),
        uptime: parseFloat(v.uptime),
        jailed: v.jailed === 'true'
      }));
      
      console.log('BNB Validators:', validators);
      return validators;
    }
    
    return [];
  } catch (error) {
    console.error('Error fetching BNB validators:', error);
    throw error;
  }
}
    `,
    
    delegate: `
import { ethers } from 'ethers';

async function delegateBNB(
  privateKey: string,
  validatorAddress: string,
  amount: string // Amount in BNB
) {
  try {
    // Connect wallet
    const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    const wallet = new ethers.Wallet(privateKey, provider);
    
    // Convert BNB to Wei
    const amountWei = ethers.parseEther(amount);
    
    // BNB delegation transaction (simplified - actual implementation requires specific contract calls)
    const tx = await wallet.sendTransaction({
      to: validatorAddress,
      value: amountWei,
      gasLimit: 300000,
    });
    
    console.log('Delegation transaction sent:', tx.hash);
    
    // Wait for confirmation
    const receipt = await tx.wait();
    console.log('Delegation confirmed:', receipt.transactionHash);
    
    return receipt;
  } catch (error) {
    console.error('Error delegating BNB:', error);
    throw error;
  }
}
    `,
    
    undelegate: `
import { ethers } from 'ethers';

async function undelegateBNB(
  privateKey: string,
  validatorAddress: string,
  amount: string // Amount in BNB
) {
  try {
    const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    const wallet = new ethers.Wallet(privateKey, provider);
    
    // Convert BNB to Wei
    const amountWei = ethers.parseEther(amount);
    
    // BNB undelegation transaction
    const tx = await wallet.sendTransaction({
      to: validatorAddress,
      value: amountWei,
      gasLimit: 300000,
    });
    
    const receipt = await tx.wait();
    console.log('Undelegation transaction:', receipt.transactionHash);
    
    // Note: BNB has a 7-day unbonding period
    console.log('Note: 7-day unbonding period applies');
    
    return receipt;
  } catch (error) {
    console.error('Error undelegating BNB:', error);
    throw error;
  }
}
    `,
    
    claimRewards: `
import { ethers } from 'ethers';

async function claimBNBRewards(
  privateKey: string,
  validatorAddress: string
) {
  try {
    const provider = new ethers.JsonRpcProvider('https://bsc-dataseed.binance.org/');
    const wallet = new ethers.Wallet(privateKey, provider);
    
    // Claim rewards transaction (implementation depends on specific validator contract)
    const tx = await wallet.sendTransaction({
      to: validatorAddress,
      value: 0,
      gasLimit: 200000,
    });
    
    const receipt = await tx.wait();
    console.log('Rewards claimed:', receipt.transactionHash);
    
    return receipt;
  } catch (error) {
    console.error('Error claiming BNB rewards:', error);
    throw error;
  }
}
    `,
  },
  
  // Staking Metrics
  metrics: {
    estimatedAPY: '5-8%',
    minimumStake: '0.001 BNB',
    unbondingPeriod: '7 days',
    validators: '21 active validators',
    averageCommission: '5-15%',
    slashingRisk: 'Yes (downtime: 0.01%, double-sign: 5%)',
  },
  
  // Validator Selection Tips
  validatorSelection: {
    factors: [
      'Commission rate (typically 5-15%)',
      'Uptime and reliability',
      'Voting power distribution',
      'Community involvement',
      'Security measures',
      'Self-bond amount'
    ],
    recommendedPractices: [
      'Diversify across multiple validators',
      'Check validator uptime history',
      'Review governance participation',
      'Verify validator identity',
      'Monitor slashing history'
    ]
  },
  
  // Additional Resources
  resources: [
    {
      title: 'BNB Chain Documentation',
      url: 'https://docs.bnbchain.org/',
    },
    {
      title: 'Validator List',
      url: 'https://www.bnbchain.org/en/bnb-smart-chain/validators',
    },
    {
      title: 'Staking Guide',
      url: 'https://docs.bnbchain.org/docs/staking/',
    },
    {
      title: 'BSC Explorer',
      url: 'https://bscscan.com/',
    },
    {
      title: 'Developer Resources',
      url: 'https://docs.bnbchain.org/docs/develop/',
    },
  ],
};
