// Chainlink Oracle - Industry-Standard Decentralized Oracle for Ethereum
// The most widely adopted oracle network providing secure and reliable data feeds

export const chainlinkOracle = {
  name: 'Chainlink',
  blockchain: 'Ethereum (ETH)',
  type: 'Decentralized Oracle Network',
  
  description: `Chainlink is the industry-standard decentralized oracle network for Ethereum, providing secure and reliable data feeds to thousands of smart contracts. With institutional adoption from SWIFT, DTCC, Euroclear, UBS, and ANZ, Chainlink offers extensive price feeds, VRF (Verifiable Random Function), automation, and cross-chain messaging capabilities.`,

  features: [
    'Industry standard with billions in TVL secured',
    '1000+ decentralized node operators',
    'Multiple data source aggregation',
    'Price feeds for ETH and thousands of assets',
    'Verifiable Random Function (VRF)',
    'Automation (Keepers)',
    'Cross-chain messaging (CCIP)',
    'Institutional partnerships',
  ],

  api: {
    website: 'https://chain.link/',
    documentation: 'https://docs.chain.link/',
    priceFeeds: 'https://data.chain.link/',
    dataFeedsDocs: 'https://docs.chain.link/data-feeds',
    vrf: 'https://docs.chain.link/vrf',
    automation: 'https://docs.chain.link/chainlink-automation',
  },

  sdk: {
    primaryPackage: 'ethers',
    secondaryPackage: '@dev3/chainlink-sdk',
    installCommand: 'npm install ethers @chainlink/contracts',
    dev3SDK: 'npm install @dev3/chainlink-sdk',
    supportedLanguages: ['TypeScript', 'JavaScript', 'Solidity'],
  },

  socialMedia: {
    website: 'https://chain.link/',
    twitter: 'https://twitter.com/chainlink',
    telegram: 'https://t.me/chainlinkofficial',
    discord: 'https://discord.gg/chainlink',
    github: 'https://github.com/smartcontractkit',
    reddit: 'https://www.reddit.com/r/Chainlink/',
    youtube: 'https://www.youtube.com/chainlink',
  },

  priceFeedAddresses: {
    ETH_USD: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
    BTC_USD: '0xF4030086522a5bEEa4988F8cA5B36dbC97beE88c',
    USDC_USD: '0x8fFfFfd4AfB6115b954Bd29BFD33fa9e603f7717',
    DAI_USD: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1235',
    USDT_USD: '0x3E7d1eAB13ad0104d2750B8863529e3175eEe394',
    LINK_USD: '0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c',
  },

  useCases: [
    'DeFi price feeds for lending/borrowing protocols',
    'Decentralized stablecoin collateral valuation',
    'Derivatives and perpetual contracts',
    'Insurance protocols',
    'Gaming and NFT floor price tracking',
    'Cross-chain bridge data',
    'Random number generation for gaming',
  ],

  integration: {
    example: `
import { ethers } from 'ethers';

/**
 * Chainlink Oracle Integration for Ethereum
 * Fetch price data from Chainlink Data Feeds
 */

// Chainlink Price Feed Addresses (Ethereum Mainnet)
const CHAINLINK_FEEDS = {
  ETH_USD: '0x5f4eC3Df9cbd43714FE2740f5E3616155c5b8419',
  BTC_USD: '0xF4030086522a5bEEa4988F8cA5B36dbC97beE88c',
  USDC_USD: '0x8fFfFfd4AfB6115b954Bd29BFD33fa9e603f7717',
  DAI_USD: '0xAed0c38402a5d19df6E4c03F4E2DceD6e29c1235',
  USDT_USD: '0x3E7d1eAB13ad0104d2750B8863529e3175eEe394',
  LINK_USD: '0x2c1d072e956AFFC0D435Cb7AC38EF18d24d9127c',
};

// AggregatorV3Interface ABI
const AggregatorV3InterfaceABI = [
  {
    inputs: [],
    name: 'latestRoundData',
    outputs: [
      { name: 'roundId', type: 'uint80' },
      { name: 'answer', type: 'int256' },
      { name: 'startedAt', type: 'uint256' },
      { name: 'updatedAt', type: 'uint256' },
      { name: 'answeredInRound', type: 'uint80' },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', type: 'uint8' }],
    stateMutability: 'view',
    type: 'function',
  },
];

/**
 * Get price from Chainlink Data Feed
 */
async function getChainlinkPrice(
  priceFeedAddress: string,
  provider: ethers.Provider
): Promise<number> {
  try {
    const priceFeed = new ethers.Contract(
      priceFeedAddress,
      AggregatorV3InterfaceABI,
      provider
    );

    const roundData = await priceFeed.latestRoundData();
    const decimals = await priceFeed.decimals();

    const price = Number(roundData.answer) / Math.pow(10, decimals);
    const timestamp = Number(roundData.updatedAt);

    console.log(\`Chainlink Price: $\${price}\`);
    console.log(\`Updated: \${new Date(timestamp * 1000)}\`);

    return price;
  } catch (error) {
    console.error('Error fetching Chainlink price:', error);
    throw error;
  }
}

/**
 * Get latest round data with full details
 */
async function getLatestRoundData(
  feedAddress: string,
  provider: ethers.Provider
) {
  try {
    const priceFeed = new ethers.Contract(
      feedAddress,
      AggregatorV3InterfaceABI,
      provider
    );

    const roundData = await priceFeed.latestRoundData();
    const decimals = await priceFeed.decimals();

    return {
      roundId: roundData.roundId.toString(),
      price: Number(roundData.answer) / Math.pow(10, decimals),
      startedAt: new Date(Number(roundData.startedAt) * 1000),
      updatedAt: new Date(Number(roundData.updatedAt) * 1000),
      answeredInRound: roundData.answeredInRound.toString(),
      decimals,
    };
  } catch (error) {
    console.error('Error fetching round data:', error);
    throw error;
  }
}

/**
 * Monitor price changes
 */
async function monitorPrice(
  feedAddress: string,
  provider: ethers.Provider,
  callback: (price: number, timestamp: Date) => void,
  intervalMs: number = 60000
) {
  setInterval(async () => {
    try {
      const data = await getLatestRoundData(feedAddress, provider);
      callback(data.price, data.updatedAt);
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Get multiple prices at once
 */
async function getMultiplePrices(provider: ethers.Provider) {
  const feeds = [
    { name: 'ETH/USD', address: CHAINLINK_FEEDS.ETH_USD },
    { name: 'BTC/USD', address: CHAINLINK_FEEDS.BTC_USD },
    { name: 'LINK/USD', address: CHAINLINK_FEEDS.LINK_USD },
  ];

  const prices = await Promise.all(
    feeds.map(async (feed) => {
      try {
        const price = await getChainlinkPrice(feed.address, provider);
        return { name: feed.name, price };
      } catch (error) {
        return { name: feed.name, error: error.message };
      }
    })
  );

  return prices;
}

// Example usage
async function main() {
  const provider = new ethers.JsonRpcProvider(
    'https://eth-mainnet.alchemyapi.io/v2/YOUR_API_KEY'
  );

  console.log('Fetching ETH price from Chainlink...');

  const ethPrice = await getChainlinkPrice(CHAINLINK_FEEDS.ETH_USD, provider);
  console.log(\`Current ETH Price: $\${ethPrice.toFixed(2)}\`);

  const allPrices = await getMultiplePrices(provider);
  console.log('All prices:', allPrices);
}

export {
  getChainlinkPrice,
  getLatestRoundData,
  monitorPrice,
  getMultiplePrices,
  CHAINLINK_FEEDS,
};
    `.trim(),
  },

  notes: [
    'Industry standard oracle with billions in TVL secured',
    'Institutional adoption from major financial institutions',
    'Most reliable and battle-tested oracle network',
    'Extensive documentation and community support',
    '1000+ decentralized node operators',
    'Multiple data source aggregation reduces risk',
    'Regular updates (typically every ~1 minute)',
    'Gas-efficient for on-chain smart contracts',
    'Supports custom data feeds via Chainlink Any API',
  ],

  limitations: [
    'Update frequency ~1 minute (not ideal for high-frequency trading)',
    'Gas costs for on-chain reads',
    'Some price feeds have deviation thresholds before updating',
  ],

  alternatives: [
    'Pyth Network (for high-frequency data)',
    'Band Protocol',
    'DIA Oracle',
    'RedStone',
  ],
};

