// Stride - Cosmos Liquid Staking Protocol
// Liquid staking with stATOM tokens

export const StridePool = {
  name: 'Stride',
  ticker: 'ATOM',
  liquidStakingToken: 'stATOM',
  
  // Pool Information
  description: 'Stride is a liquid staking protocol built on Cosmos that allows users to stake ATOM and receive stATOM tokens. Users can use stATOM in DeFi while earning staking rewards from the underlying ATOM.',
  type: 'Liquid Staking',
  location: 'Decentralized (Cosmos Blockchain)',
  features: [
    'Liquid staking with stATOM',
    'Multi-chain liquid staking support',
    'DeFi composability',
    'Instant liquidity',
    'No minimum stake',
    'IBC-enabled cross-chain transfers'
  ],
  
  // Official Links
  website: 'https://stride.zone/',
  app: 'https://app.stride.zone/',
  docs: 'https://docs.stride.zone/',
  blog: 'https://medium.com/@stride_zone',
  
  // API & SDK
  api: {
    rpcEndpoint: 'https://stride-rpc.polkachu.com',
    restEndpoint: 'https://stride-api.polkachu.com',
    grpcEndpoint: 'stride-grpc.polkachu.com:12290',
    endpoints: {
      validators: '/cosmos/staking/v1beta1/validators',
      stakingPool: '/cosmos/staking/v1beta1/pool',
      delegations: '/cosmos/staking/v1beta1/delegations/:address',
      exchangeRate: '/stride-labs/stride/stakeibc/host_zone',
    },
  },
  
  // SDK Information
  sdk: {
    npm: '@cosmjs/stargate',
    cosmjs: '@cosmjs/proto-signing',
    docs: 'https://docs.stride.zone/docs/integrate-liquid-staking',
    github: 'https://github.com/Stride-Labs/stride',
    installation: 'npm install @cosmjs/stargate @cosmjs/proto-signing',
  },
  
  // Chain Details
  chain: {
    chainId: 'stride-1',
    bech32Prefix: 'stride',
    nativeDenom: 'ustrd',
    stTokenDenom: 'stuatom',
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/stride_zone',
    discord: 'https://discord.gg/stride-zone',
    telegram: 'https://t.me/stride_zone',
    medium: 'https://medium.com/@stride_zone',
  },
  
  // Integration Examples
  integration: {
    getExchangeRate: `
import { StargateClient } from '@cosmjs/stargate';

async function getStATOMExchangeRate() {
  const client = await StargateClient.connect('https://stride-rpc.polkachu.com');
  
  try {
    // Query Stride chain for host zone information
    const response = await fetch(
      'https://stride-api.polkachu.com/Stride-Labs/stride/stakeibc/host_zone/cosmoshub-4'
    );
    const data = await response.json();
    
    // Calculate exchange rate: stATOM to ATOM
    const redemptionRate = parseFloat(data.host_zone.redemption_rate);
    console.log(\`1 stATOM = \${redemptionRate} ATOM\`);
    
    return redemptionRate;
  } catch (error) {
    console.error('Error fetching stATOM rate:', error);
    throw error;
  } finally {
    client.disconnect();
  }
}
    `,
    
    liquidStake: `
import { SigningStargateClient } from '@cosmjs/stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';

async function liquidStakeATOM(
  mnemonic: string,
  amount: number // Amount in ATOM
) {
  // Connect wallet
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: 'cosmos'
  });
  const [account] = await wallet.getAccounts();
  
  // Connect to Stride chain
  const client = await SigningStargateClient.connectWithSigner(
    'https://stride-rpc.polkachu.com',
    wallet
  );
  
  try {
    // Liquid stake message (IBC transfer to Stride)
    const msg = {
      typeUrl: '/ibc.applications.transfer.v1.MsgTransfer',
      value: {
        sourcePort: 'transfer',
        sourceChannel: 'channel-0', // Cosmos Hub to Stride channel
        token: {
          denom: 'uatom',
          amount: (amount * 1_000_000).toString() // Convert to microATOM
        },
        sender: account.address,
        receiver: account.address, // Same address on Stride
        timeoutHeight: {
          revisionNumber: 0,
          revisionHeight: 0
        },
        timeoutTimestamp: (Date.now() + 600000) * 1000000, // 10 min timeout
        memo: 'liquid-stake'
      }
    };
    
    const fee = {
      amount: [{ denom: 'uatom', amount: '5000' }],
      gas: '200000'
    };
    
    const result = await client.signAndBroadcast(account.address, [msg], fee);
    console.log('Liquid stake transaction:', result.transactionHash);
    
    return result;
  } catch (error) {
    console.error('Error liquid staking:', error);
    throw error;
  } finally {
    client.disconnect();
  }
}
    `,
    
    unstake: `
import { SigningStargateClient } from '@cosmjs/stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';

async function unstakeStATOM(
  mnemonic: string,
  amount: number // Amount in stATOM
) {
  const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
    prefix: 'stride'
  });
  const [account] = await wallet.getAccounts();
  
  const client = await SigningStargateClient.connectWithSigner(
    'https://stride-rpc.polkachu.com',
    wallet
  );
  
  try {
    // Redeem stATOM for ATOM
    const msg = {
      typeUrl: '/stride.stakeibc.MsgRedeemStake',
      value: {
        creator: account.address,
        amount: (amount * 1_000_000).toString(),
        hostZone: 'cosmoshub-4',
        receiver: account.address
      }
    };
    
    const fee = {
      amount: [{ denom: 'ustrd', amount: '5000' }],
      gas: '200000'
    };
    
    const result = await client.signAndBroadcast(account.address, [msg], fee);
    console.log('Unstake transaction:', result.transactionHash);
    
    return result;
  } finally {
    client.disconnect();
  }
}
    `,
  },
  
  // Staking Metrics
  metrics: {
    estimatedAPY: '15-20%',
    minimumStake: '0 ATOM',
    unbondingPeriod: '21 days (Cosmos standard)',
    liquidityPremium: 'Instant via stATOM',
    fees: '~10% of staking rewards as protocol fee',
    exchangeRate: 'Dynamic (typically > 1 stATOM per ATOM)',
  },
  
  // Additional Resources
  resources: [
    {
      title: 'Stride Documentation',
      url: 'https://docs.stride.zone/',
    },
    {
      title: 'Liquid Staking Guide',
      url: 'https://docs.stride.zone/docs/integrate-liquid-staking',
    },
    {
      title: 'stATOM Tokenomics',
      url: 'https://docs.stride.zone/docs/tokenomics',
    },
    {
      title: 'IBC Integration',
      url: 'https://docs.stride.zone/docs/ibc-integration',
    },
    {
      title: 'API Reference',
      url: 'https://docs.stride.zone/docs/api',
    },
  ],
};

