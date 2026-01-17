// Figment - Enterprise Cosmos Validator
// Enterprise-grade staking services

export const FigmentValidator = {
  name: 'Figment',
  ticker: 'ATOM',
  liquidStakingToken: 'N/A (Direct delegation)',
  
  // Pool Information
  description: 'Figment is an enterprise-grade infrastructure provider and validator for Cosmos Hub and multiple blockchain networks. They offer comprehensive staking solutions with institutional-grade security and support.',
  type: 'Institutional Validator',
  location: 'Global Infrastructure',
  features: [
    'Enterprise infrastructure',
    'Institutional custody support',
    'Dedicated customer support',
    'Real-time monitoring',
    'Multi-network expertise',
    'Governance analytics'
  ],
  
  // Official Links
  website: 'https://figment.io/',
  staking: 'https://figment.io/protocols/cosmos/',
  docs: 'https://docs.figment.io/',
  blog: 'https://www.figment.io/insights',
  hub: 'https://hub.figment.io/',
  
  // Validator Information
  validator: {
    operatorAddress: 'cosmosvaloper1hjct6q7npsspsg3dgvzk3sdf89spmlpfdn6m9d',
    moniker: 'Figment',
    website: 'https://figment.io',
    commission: {
      rate: '0.10', // 10%
      maxRate: '0.20',
      maxChangeRate: '0.01'
    },
  },
  
  // API & SDK
  api: {
    figmentHub: 'https://hub.figment.io/',
    dataHub: 'https://datahub.figment.io/',
    restEndpoint: 'https://cosmos--rpc--full.datahub.figment.io/',
    endpoints: {
      staking: '/staking',
      rewards: '/rewards',
      transactions: '/transactions',
      validators: '/validators',
    },
  },
  
  // SDK Information
  sdk: {
    npm: '@cosmjs/stargate',
    figmentSDK: '@figment/cosmos-sdk',
    docs: 'https://docs.figment.io/network-documentation/cosmos',
    github: 'https://github.com/figment-networks',
    installation: 'npm install @cosmjs/stargate',
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/Figment_io',
    linkedin: 'https://www.linkedin.com/company/figmentnetworks/',
    discord: 'https://discord.gg/figment',
  },
  
  // Integration Examples
  integration: {
    delegate: `
import { SigningStargateClient } from '@cosmjs/stargate';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';

const FIGMENT_VALIDATOR = 'cosmosvaloper1hjct6q7npsspsg3dgvzk3sdf89spmlpfdn6m9d';

async function delegateToFigment(
  mnemonic: string,
  amount: number
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
      typeUrl: '/cosmos.staking.v1beta1.MsgDelegate',
      value: {
        delegatorAddress: account.address,
        validatorAddress: FIGMENT_VALIDATOR,
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
    return result;
  } finally {
    client.disconnect();
  }
}
    `,
  },
  
  // Staking Metrics
  metrics: {
    estimatedAPY: '17-19%',
    commission: '10%',
    minimumStake: '0.000001 ATOM',
    unbondingPeriod: '21 days',
    uptime: '99.9%',
  },
  
  // Enterprise Features
  enterpriseFeatures: {
    services: [
      'DataHub API access',
      'Staking rewards optimization',
      'Governance voting services',
      'Custom reporting dashboards',
      'Compliance support',
      '24/7 monitoring'
    ],
    custody: [
      'Anchorage',
      'BitGo',
      'Fireblocks',
      'Coinbase Custody'
    ]
  },
  
  // Additional Resources
  resources: [
    {
      title: 'Figment Website',
      url: 'https://figment.io/',
    },
    {
      title: 'Cosmos Protocol Page',
      url: 'https://figment.io/protocols/cosmos/',
    },
    {
      title: 'Documentation',
      url: 'https://docs.figment.io/',
    },
    {
      title: 'DataHub',
      url: 'https://datahub.figment.io/',
    },
  ],
};

