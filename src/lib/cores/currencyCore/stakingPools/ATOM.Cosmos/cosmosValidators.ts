// Cosmos Hub Validators - Native Staking
// Direct staking with Cosmos Hub validators

export const CosmosValidators = {
  name: 'Cosmos Hub Validators',
  ticker: 'ATOM',
  liquidStakingToken: 'N/A (Native staking)',
  
  // Pool Information
  description: 'Native staking on the Cosmos Hub allows users to delegate ATOM directly to any of the 175+ active validators. Users earn staking rewards while helping secure the Cosmos Hub network.',
  type: 'Native Validator Staking',
  location: 'Decentralized (Cosmos Hub)',
  features: [
    '175+ active validators',
    'Decentralized validation',
    'Slashing protection',
    'Governance participation',
    'Commission-based rewards',
    'Validator choice flexibility'
  ],
  
  // Official Links
  website: 'https://cosmos.network/',
  hub: 'https://hub.cosmos.network/',
  validators: 'https://www.mintscan.io/cosmos/validators',
  docs: 'https://docs.cosmos.network/',
  governance: 'https://www.mintscan.io/cosmos/proposals',
  
  // API & SDK
  api: {
    rpcEndpoint: 'https://rpc.cosmos.network',
    restEndpoint: 'https://api.cosmos.network',
    grpcEndpoint: 'grpc.cosmos.network:443',
    endpoints: {
      validators: '/cosmos/staking/v1beta1/validators',
      delegations: '/cosmos/staking/v1beta1/delegations/:address',
      rewards: '/cosmos/distribution/v1beta1/delegators/:address/rewards',
      stakingPool: '/cosmos/staking/v1beta1/pool',
      validatorInfo: '/cosmos/staking/v1beta1/validators/:validatorAddress',
    },
  },
  
  // SDK Information
  sdk: {
    npm: '@cosmjs/stargate',
    cosmjs: '@cosmjs/proto-signing',
    docs: 'https://cosmos.github.io/cosmjs/',
    github: 'https://github.com/cosmos/cosmjs',
    installation: 'npm install @cosmjs/stargate @cosmjs/proto-signing @cosmjs/amino',
  },
  
  // Chain Details
  chain: {
    chainId: 'cosmoshub-4',
    bech32Prefix: 'cosmos',
    nativeDenom: 'uatom',
    decimals: 6,
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/cosmos',
    discord: 'https://discord.gg/cosmosnetwork',
    telegram: 'https://t.me/cosmosproject',
    reddit: 'https://www.reddit.com/r/cosmosnetwork/',
    forum: 'https://forum.cosmos.network/',
  },
  
  // Integration Examples
  integration: {
    getValidators: `
import { StargateClient } from '@cosmjs/stargate';

async function getCosmosValidators() {
  const client = await StargateClient.connect('https://rpc.cosmos.network');
  
  try {
    // Get all active validators
    const response = await fetch(
      'https://api.cosmos.network/cosmos/staking/v1beta1/validators?status=BOND_STATUS_BONDED&pagination.limit=200'
    );
    const data = await response.json();
    
    const validators = data.validators.map((v: any) => ({
      address: v.operator_address,
      moniker: v.description.moniker,
      commission: parseFloat(v.commission.commission_rates.rate),
      votingPower: parseInt(v.tokens) / 1_000_000, // Convert to ATOM
      jailed: v.jailed,
      status: v.status
    }));
    
    // Sort by voting power
    validators.sort((a, b) => b.votingPower - a.votingPower);
    
    console.log(\`Found \${validators.length} active validators\`);
    return validators;
  } catch (error) {
    console.error('Error fetching validators:', error);
    throw error;
  } finally {
    client.disconnect();
  }
}
    `,
    
    delegate: `
import { SigningStargateClient } from '@cosmjs/stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';

async function delegateATOM(
  mnemonic: string,
  validatorAddress: string,
  amount: number // Amount in ATOM
) {
  // Connect wallet
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: 'cosmos'
  });
  const [account] = await wallet.getAccounts();
  
  // Connect to Cosmos Hub
  const client = await SigningStargateClient.connectWithSigner(
    'https://rpc.cosmos.network',
    wallet
  );
  
  try {
    // Create delegation message
    const msg = {
      typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
      value: {
        delegatorAddress: account.address,
        validatorAddress: validatorAddress,
        amount: {
          denom: 'uatom',
          amount: (amount * 1_000_000).toString() // Convert to microATOM
        }
      }
    };
    
    // Calculate fee
    const fee = {
      amount: [{ denom: 'uatom', amount: '5000' }],
      gas: '200000'
    };
    
    const result = await client.signAndBroadcast(account.address, [msg], fee);
    
    if (result.code !== 0) {
      throw new Error(\`Transaction failed: \${result.rawLog}\`);
    }
    
    console.log('Delegation successful:', result.transactionHash);
    return result;
  } catch (error) {
    console.error('Error delegating ATOM:', error);
    throw error;
  } finally {
    client.disconnect();
  }
}
    `,
    
    undelegate: `
import { SigningStargateClient } from '@cosmjs/stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';

async function undelegateATOM(
  mnemonic: string,
  validatorAddress: string,
  amount: number // Amount in ATOM
) {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: 'cosmos'
  });
  const [account] = await wallet.getAccounts();
  
  const client = await SigningStargateClient.connectWithSigner(
    'https://rpc.cosmos.network',
    wallet
  );
  
  try {
    const msg = {
      typeUrl: '/cosmos.staking.v1beta1.MsgUndelegate',
      value: {
        delegatorAddress: account.address,
        validatorAddress: validatorAddress,
        amount: {
          denom: 'uatom',
          amount: (amount * 1_000_000).toString()
        }
      }
    };
    
    const fee = {
      amount: [{ denom: 'uatom', amount: '5000' }],
      gas: '200000'
    };
    
    const result = await client.signAndBroadcast(account.address, [msg], fee);
    
    console.log('Undelegation successful:', result.transactionHash);
    console.log('Note: 21-day unbonding period applies');
    
    return result;
  } finally {
    client.disconnect();
  }
}
    `,
    
    claimRewards: `
import { SigningStargateClient } from '@cosmjs/stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';

async function claimStakingRewards(
  mnemonic: string,
  validatorAddress: string
) {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: 'cosmos'
  });
  const [account] = await wallet.getAccounts();
  
  const client = await SigningStargateClient.connectWithSigner(
    'https://rpc.cosmos.network',
    wallet
  );
  
  try {
    // Withdraw delegation rewards
    const msg = {
      typeUrl: '/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward',
      value: {
        delegatorAddress: account.address,
        validatorAddress: validatorAddress
      }
    };
    
    const fee = {
      amount: [{ denom: 'uatom', amount: '5000' }],
      gas: '200000'
    };
    
    const result = await client.signAndBroadcast(account.address, [msg], fee);
    
    console.log('Rewards claimed:', result.transactionHash);
    return result;
  } finally {
    client.disconnect();
  }
}
    `,
    
    getDelegations: `
import { StargateClient } from '@cosmjs/stargate';

async function getUserDelegations(address: string) {
  try {
    const response = await fetch(
      \`https://api.cosmos.network/cosmos/staking/v1beta1/delegations/\${address}\`
    );
    const data = await response.json();
    
    const delegations = data.delegation_responses.map((d: any) => ({
      validator: d.delegation.validator_address,
      amount: parseInt(d.balance.amount) / 1_000_000, // Convert to ATOM
      shares: d.delegation.shares
    }));
    
    console.log(\`User has \${delegations.length} delegations\`);
    return delegations;
  } catch (error) {
    console.error('Error fetching delegations:', error);
    throw error;
  }
}
    `,
  },
  
  // Staking Metrics
  metrics: {
    estimatedAPY: '15-20%',
    minimumStake: '0.000001 ATOM (1 microATOM)',
    unbondingPeriod: '21 days',
    validators: '175+ active validators',
    averageCommission: '5-10%',
    slashingRisk: 'Yes (downtime: 0.01%, double-sign: 5%)',
  },
  
  // Validator Selection Tips
  validatorSelection: {
    factors: [
      'Commission rate (typically 5-10%)',
      'Uptime and reliability',
      'Voting power (avoid over-concentrated)',
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
      title: 'Cosmos Hub Documentation',
      url: 'https://docs.cosmos.network/',
    },
    {
      title: 'Validator List (Mintscan)',
      url: 'https://www.mintscan.io/cosmos/validators',
    },
    {
      title: 'Staking Guide',
      url: 'https://cosmos.network/learn/staking',
    },
    {
      title: 'CosmJS Documentation',
      url: 'https://cosmos.github.io/cosmjs/',
    },
    {
      title: 'Governance Portal',
      url: 'https://www.mintscan.io/cosmos/proposals',
    },
    {
      title: 'Cosmos Forum',
      url: 'https://forum.cosmos.network/',
    },
  ],
};

