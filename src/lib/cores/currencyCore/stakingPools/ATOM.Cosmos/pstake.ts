// pStake Finance - Cosmos Liquid Staking
// Liquid staking with pATOM tokens

export const PStakePool = {
  name: 'pStake Finance',
  ticker: 'ATOM',
  liquidStakingToken: 'pATOM',
  
  // Pool Information
  description: 'pStake Finance provides liquid staking for ATOM, allowing users to mint pATOM tokens while earning staking rewards. pATOM can be used across DeFi protocols while the underlying ATOM remains staked.',
  type: 'Liquid Staking',
  location: 'Decentralized (Cosmos & Ethereum)',
  features: [
    'Liquid staking with pATOM',
    'Cross-chain compatibility (Cosmos & Ethereum)',
    'Instant liquidity',
    'No minimum stake',
    'Auto-compounding rewards',
    'DeFi composability'
  ],
  
  // Official Links
  website: 'https://pstake.finance/',
  app: 'https://app.pstake.finance/',
  docs: 'https://docs.pstake.finance/',
  blog: 'https://blog.pstake.finance/',
  
  // API & SDK
  api: {
    pstakeChain: {
      rpcEndpoint: 'https://rpc.persistence.one',
      restEndpoint: 'https://rest.persistence.one',
      grpcEndpoint: 'grpc.persistence.one:443',
    },
    cosmosHub: {
      rpcEndpoint: 'https://rpc.cosmos.network',
      restEndpoint: 'https://api.cosmos.network',
    },
    endpoints: {
      stakingInfo: '/pstake/liquidstakeibc/v1beta1/host_chain_params',
      exchangeRate: '/pstake/liquidstakeibc/v1beta1/exchange_rate',
      delegations: '/pstake/liquidstakeibc/v1beta1/delegations',
    },
  },
  
  // SDK Information
  sdk: {
    npm: '@cosmjs/stargate',
    cosmjs: '@cosmjs/proto-signing',
    persistence: '@persistenceone/persistencejs',
    docs: 'https://docs.pstake.finance/developers',
    github: 'https://github.com/persistenceOne/pstake-native',
    installation: 'npm install @cosmjs/stargate @cosmjs/proto-signing',
  },
  
  // Chain Details
  chain: {
    pstakeChainId: 'core-1',
    cosmosChainId: 'cosmoshub-4',
    bech32Prefix: 'persistence',
    nativeDenom: 'uxprt',
    pAtomDenom: 'stk/uatom',
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
import { StargateClient } from '@cosmjs/stargate';

async function getPATOMExchangeRate() {
  try {
    // Query pStake chain for exchange rate
    const response = await fetch(
      'https://rest.persistence.one/pstake/liquidstakeibc/v1beta1/exchange_rate/cosmoshub-4'
    );
    const data = await response.json();
    
    // Exchange rate: 1 pATOM = X ATOM
    const rate = parseFloat(data.exchange_rate);
    console.log(\`1 pATOM = \${rate} ATOM\`);
    
    return rate;
  } catch (error) {
    console.error('Error fetching pATOM rate:', error);
    throw error;
  }
}

// Get total staked amount
async function getTotalStaked() {
  try {
    const response = await fetch(
      'https://rest.persistence.one/pstake/liquidstakeibc/v1beta1/host_chain_params/cosmoshub-4'
    );
    const data = await response.json();
    
    const totalStaked = parseFloat(data.host_chain_params.delegations_amount);
    console.log(\`Total staked: \${totalStaked / 1_000_000} ATOM\`);
    
    return totalStaked;
  } catch (error) {
    console.error('Error fetching total staked:', error);
    throw error;
  }
}
    `,
    
    liquidStake: `
import { SigningStargateClient } from '@cosmjs/stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import { coins } from '@cosmjs/stargate';

async function stakeToPStake(
  mnemonic: string,
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
    // IBC transfer to pStake Persistence chain
    const msg = {
      typeUrl: '/ibc.applications.transfer.v1.MsgTransfer',
      value: {
        sourcePort: 'transfer',
        sourceChannel: 'channel-190', // Cosmos Hub to Persistence channel
        token: {
          denom: 'uatom',
          amount: (amount * 1_000_000).toString()
        },
        sender: account.address,
        receiver: account.address, // Receiver on pStake chain
        timeoutHeight: {
          revisionNumber: 0,
          revisionHeight: 0
        },
        timeoutTimestamp: (Date.now() + 600000) * 1000000,
        memo: JSON.stringify({
          action: 'LiquidStake',
          params: {}
        })
      }
    };
    
    const fee = {
      amount: coins(5000, 'uatom'),
      gas: '200000'
    };
    
    const result = await client.signAndBroadcast(account.address, [msg], fee);
    console.log('pStake liquid stake transaction:', result.transactionHash);
    
    return result;
  } catch (error) {
    console.error('Error staking to pStake:', error);
    throw error;
  } finally {
    client.disconnect();
  }
}
    `,
    
    unstake: `
import { SigningStargateClient } from '@cosmjs/stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';

async function unstakePATOM(
  mnemonic: string,
  amount: number // Amount in pATOM
) {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: 'persistence'
  });
  const [account] = await wallet.getAccounts();
  
  const client = await SigningStargateClient.connectWithSigner(
    'https://rpc.persistence.one',
    wallet
  );
  
  try {
    // Create unstake message
    const msg = {
      typeUrl: '/pstake.liquidstakeibc.v1beta1.MsgUnstake',
      value: {
        delegator: account.address,
        amount: {
          denom: 'stk/uatom',
          amount: (amount * 1_000_000).toString()
        }
      }
    };
    
    const fee = {
      amount: [{ denom: 'uxprt', amount: '5000' }],
      gas: '200000'
    };
    
    const result = await client.signAndBroadcast(account.address, [msg], fee);
    console.log('pATOM unstake transaction:', result.transactionHash);
    
    // Note: Unstaking has 21-day unbonding period
    console.log('Unbonding period: 21 days');
    
    return result;
  } catch (error) {
    console.error('Error unstaking pATOM:', error);
    throw error;
  } finally {
    client.disconnect();
  }
}
    `,
  },
  
  // Staking Metrics
  metrics: {
    estimatedAPY: '16-19%',
    minimumStake: '0 ATOM',
    unbondingPeriod: '21 days',
    liquidityPremium: 'Instant via pATOM',
    fees: '~5% of staking rewards',
    exchangeRate: 'Dynamic (typically > 1 pATOM per ATOM)',
  },
  
  // Additional Resources
  resources: [
    {
      title: 'pStake Documentation',
      url: 'https://docs.pstake.finance/',
    },
    {
      title: 'Developer Guide',
      url: 'https://docs.pstake.finance/developers',
    },
    {
      title: 'Liquid Staking Overview',
      url: 'https://docs.pstake.finance/liquid-staking/cosmos-atom',
    },
    {
      title: 'pATOM Tokenomics',
      url: 'https://docs.pstake.finance/tokenomics/patom',
    },
    {
      title: 'Security Audits',
      url: 'https://docs.pstake.finance/security',
    },
  ],
};

