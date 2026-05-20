// Chainlink Oracle - Decentralized Oracle Network for BNB Chain
// Type: Decentralized Price Feeds, VRF, Automation
// Blockchain: BNB Chain (BNB)

export const bnbChainlinkOracle = {
  name: "Chainlink",
  blockchain: "BNB Chain (BNB)",
  type: "Decentralized Oracle Network",
  description: "Chainlink is the industry-standard decentralized oracle network on BNB Chain, providing secure, reliable price feeds, VRF randomness, automation, and any-API connectivity. Powers major DeFi protocols like PancakeSwap and Venus with 200+ price feeds.",
  
  url: "https://chain.link/",
  docs: "https://docs.chain.link/",
  
  api: {
    bnbChainDocs: "https://docs.chain.link/docs/bnb-chain-addresses/",
    priceFeeds: "https://docs.chain.link/data-feeds/price-feeds/addresses?network=bnb-chain",
    vrfDocs: "https://docs.chain.link/vrf/v2/introduction/",
    automationDocs: "https://docs.chain.link/chainlink-automation/introduction/",
    dataFeedsMainnet: "https://docs.chain.link/docs/bnb-chain-addresses/#bnb-mainnet",
  },
  
  sdk: {
    npm: "@chainlink/contracts",
    ethers: "ethers",
    installation: "npm install @chainlink/contracts ethers",
    documentation: "https://docs.chain.link/",
    github: "https://github.com/smartcontractkit/chainlink",
  },
  
  integration: {
    example: `
// Chainlink Oracle Integration for BNB Chain
import { ethers } from 'ethers';

// Chainlink AggregatorV3Interface ABI (Price Feeds)
const AGGREGATOR_ABI = [
  'function latestRoundData() external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)',
  'function decimals() external view returns (uint8)',
  'function description() external view returns (string memory)'
];

// VRF Coordinator ABI (for randomness)
const VRF_COORDINATOR_ABI = [
  'function requestRandomWords(bytes32 keyHash, uint64 subId, uint16 minimumRequestConfirmations, uint32 callbackGasLimit, uint32 numWords) external returns (uint256 requestId)'
];

class ChainlinkBNBOracle {
  private provider: ethers.providers.Provider;
  
  // Chainlink Price Feed addresses on BNB Chain Mainnet
  private readonly PRICE_FEEDS = {
    'BNB/USD': '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE',
    'BTC/USD': '0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf',
    'ETH/USD': '0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e',
    'CAKE/USD': '0xB6064eD41d4f67e353768aA239cA86f4F73665a1',
    'BUSD/USD': '0xcBb98864Ef56E9042e7d2efef76141f15731B82f',
    'USDT/USD': '0xB97Ad0E74fa7d920791E90258A6E2085088b4320',
    'LINK/USD': '0xca236E327F629f9Fc2c30A4E95775EbF0B89fac8',
    'ADA/USD': '0xa767f745331D267c7751297D982b050c93985627',
    'DOT/USD': '0xC333eb0086309a16aa7c8308DfD32c8BBA0a2592',
    'MATIC/USD': '0x7CA57b0cA6367191c94C8914d7Df09A57655905f'
  };

  // VRF Coordinator addresses
  private readonly VRF_COORDINATOR = '0xc587d9053cd1118f25F645F9E08BB98c9712A4EE'; // BNB Mainnet
  private readonly LINK_TOKEN = '0x404460C6A5EdE2D891e8297795264fDe62ADBB75'; // LINK on BNB
  private readonly KEY_HASH = '0x114f3da0a805b6a67d6e9cd2ec746f7028f1b7376365af575cfea3550dd1aa04'; // 500 gwei

  constructor(rpcUrl: string = 'https://bsc-dataseed.binance.org/') {
    this.provider = new ethers.providers.JsonRpcProvider(rpcUrl);
  }

  // Method 1: Get latest price from Chainlink feed
  async getLatestPrice(pair: keyof typeof this.PRICE_FEEDS): Promise<{
    price: number;
    decimals: number;
    timestamp: number;
    roundId: number;
  }> {
    try {
      const feedAddress = this.PRICE_FEEDS[pair];
      if (!feedAddress) {
        throw new Error(\`Price feed not available for \${pair}\`);
      }

      const priceFeed = new ethers.Contract(feedAddress, AGGREGATOR_ABI, this.provider);
      
      const [roundData, decimals] = await Promise.all([
        priceFeed.latestRoundData(),
        priceFeed.decimals()
      ]);

      const price = parseFloat(ethers.utils.formatUnits(roundData.answer, decimals));
      
      return {
        price,
        decimals,
        timestamp: roundData.updatedAt.toNumber(),
        roundId: roundData.roundId.toNumber()
      };
    } catch (error) {
      console.error(\`Error fetching Chainlink price for \${pair}:\`, error);
      throw error;
    }
  }

  // Method 2: Get historical price by round ID
  async getHistoricalPrice(
    pair: keyof typeof this.PRICE_FEEDS,
    roundId: number
  ): Promise<{
    price: number;
    timestamp: number;
  }> {
    try {
      const feedAddress = this.PRICE_FEEDS[pair];
      if (!feedAddress) {
        throw new Error(\`Price feed not available for \${pair}\`);
      }

      const priceFeed = new ethers.Contract(
        feedAddress,
        [
          ...AGGREGATOR_ABI,
          'function getRoundData(uint80 roundId) external view returns (uint80, int256, uint256, uint256, uint80)'
        ],
        this.provider
      );

      const [decimals, roundData] = await Promise.all([
        priceFeed.decimals(),
        priceFeed.getRoundData(roundId)
      ]);

      return {
        price: parseFloat(ethers.utils.formatUnits(roundData[1], decimals)),
        timestamp: roundData[3].toNumber()
      };
    } catch (error) {
      console.error('Error fetching historical price:', error);
      throw error;
    }
  }

  // Method 3: Get multiple prices at once
  async getMultiplePrices(pairs: Array<keyof typeof this.PRICE_FEEDS>): Promise<{
    [key: string]: number;
  }> {
    const prices: { [key: string]: number } = {};

    for (const pair of pairs) {
      try {
        const priceData = await this.getLatestPrice(pair);
        prices[pair] = priceData.price;
      } catch (error) {
        console.error(\`Error fetching price for \${pair}:\`, error);
        prices[pair] = 0;
      }
    }

    return prices;
  }

  // Method 4: Check if price feed is fresh (updated recently)
  async isPriceFresh(
    pair: keyof typeof this.PRICE_FEEDS,
    maxAgeSeconds: number = 3600
  ): Promise<boolean> {
    try {
      const priceData = await this.getLatestPrice(pair);
      const now = Math.floor(Date.now() / 1000);
      return (now - priceData.timestamp) < maxAgeSeconds;
    } catch (error) {
      console.error('Error checking price freshness:', error);
      return false;
    }
  }

  // Method 5: Get price feed description
  async getFeedDescription(pair: keyof typeof this.PRICE_FEEDS): Promise<string> {
    try {
      const feedAddress = this.PRICE_FEEDS[pair];
      if (!feedAddress) {
        throw new Error(\`Price feed not available for \${pair}\`);
      }

      const priceFeed = new ethers.Contract(feedAddress, AGGREGATOR_ABI, this.provider);
      return await priceFeed.description();
    } catch (error) {
      console.error('Error fetching feed description:', error);
      throw error;
    }
  }

  // Method 6: Request VRF randomness (requires LINK and consumer contract)
  async requestRandomness(
    signer: ethers.Signer,
    subscriptionId: number,
    numWords: number = 1,
    callbackGasLimit: number = 100000
  ): Promise<string> {
    try {
      const vrfCoordinator = new ethers.Contract(
        this.VRF_COORDINATOR,
        VRF_COORDINATOR_ABI,
        signer
      );

      const tx = await vrfCoordinator.requestRandomWords(
        this.KEY_HASH,
        subscriptionId,
        3, // minimum confirmations
        callbackGasLimit,
        numWords
      );

      const receipt = await tx.wait();
      console.log('VRF request submitted:', receipt.transactionHash);
      
      return receipt.transactionHash;
    } catch (error) {
      console.error('Error requesting VRF randomness:', error);
      throw error;
    }
  }

  // Method 7: Monitor price changes
  async monitorPrice(
    pair: keyof typeof this.PRICE_FEEDS,
    callback: (price: number, timestamp: Date) => void,
    intervalMs: number = 60000
  ): NodeJS.Timeout {
    const monitor = async () => {
      try {
        const priceData = await this.getLatestPrice(pair);
        callback(priceData.price, new Date(priceData.timestamp * 1000));
      } catch (error) {
        console.error('Error in price monitoring:', error);
      }
    };

    // Initial call
    await monitor();

    // Set up interval
    return setInterval(monitor, intervalMs);
  }
}

// Usage examples
async function main() {
  const oracle = new ChainlinkBNBOracle();

  // Get BNB/USD price
  const bnbPrice = await oracle.getLatestPrice('BNB/USD');
  console.log(\`BNB/USD: $\${bnbPrice.price}\`);
  console.log(\`Last Updated: \${new Date(bnbPrice.timestamp * 1000).toISOString()}\`);

  // Get multiple prices
  const prices = await oracle.getMultiplePrices(['BNB/USD', 'BTC/USD', 'ETH/USD']);
  console.log('Multiple Prices:', prices);

  // Check if price is fresh
  const isFresh = await oracle.isPriceFresh('BNB/USD', 3600);
  console.log('Price is fresh (< 1 hour):', isFresh);

  // Monitor BNB price
  const interval = await oracle.monitorPrice('BNB/USD', (price, timestamp) => {
    console.log(\`[\${timestamp.toISOString()}] BNB: $\${price.toFixed(2)}\`);
  }, 30000);

  // Stop monitoring after 5 minutes
  setTimeout(() => clearInterval(interval), 300000);
}

// main();
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/chainlink",
    discord: "https://discord.com/invite/aSK4zew",
    telegram: "https://t.me/chainlinkofficial",
    reddit: "https://www.reddit.com/r/Chainlink/",
    github: "https://github.com/smartcontractkit/chainlink",
  },
  
  features: {
    decentralizedOracles: true,
    priceFeeds: true,
    vrfRandomness: true,
    automation: true,
    anyAPI: true,
    proofOfReserve: true,
    crossChainInteroperability: true,
    highReliability: true,
  },
  
  supportedData: [
    "200+ cryptocurrency price feeds (BNB, BTC, ETH, CAKE, etc.)",
    "Forex rates (EUR/USD, JPY/USD, etc.)",
    "Commodity prices (Gold, Silver, Oil)",
    "Equities and indices",
    "Weather data",
    "Sports results",
    "VRF randomness",
    "Proof of Reserve",
    "Any API data (via Chainlink Functions)",
  ],
  
  bnbChainIntegration: {
    status: "Fully Integrated since 2020",
    priceFeeds: "200+ feeds on BNB Mainnet",
    vrfSupport: "VRF V2 available",
    automationSupport: "Keepers (Automation) available",
    method: "On-chain smart contracts via ethers.js/web3.js",
    gasOptimization: "Low fees on BNB Chain (~$0.10-0.50 per call)",
    benefits: [
      "Industry-leading security and decentralization",
      "Proven track record securing billions in TVL",
      "200+ price feeds covering major crypto assets",
      "VRF for provably fair randomness",
      "Automation for time-based or condition-based execution",
      "Cross-chain interoperability via CCIP",
      "Strong ecosystem support (PancakeSwap, Venus, etc.)",
      "Comprehensive documentation and tooling",
    ],
    bestFor: [
      "Production DeFi protocols (lending, DEXs, derivatives)",
      "Gaming applications requiring VRF randomness",
      "NFT platforms with fair minting",
      "Prediction markets and betting platforms",
      "Insurance protocols",
      "Automated trading strategies",
      "Cross-chain applications",
    ],
  },
  
  priceFeeds: {
    mainnet: {
      'BNB/USD': '0x0567F2323251f0Aab15c8dFb1967E4e8A7D42aeE',
      'BTC/USD': '0x264990fbd0A4796A3E3d8E37C4d5F87a3aCa5Ebf',
      'ETH/USD': '0x9ef1B8c0E4F7dc8bF5719Ea496883DC6401d5b2e',
      'CAKE/USD': '0xB6064eD41d4f67e353768aA239cA86f4F73665a1',
      'BUSD/USD': '0xcBb98864Ef56E9042e7d2efef76141f15731B82f',
      'USDT/USD': '0xB97Ad0E74fa7d920791E90258A6E2085088b4320',
      'LINK/USD': '0xca236E327F629f9Fc2c30A4E95775EbF0B89fac8',
    },
    testnet: {
      'BNB/USD': '0x2514895c72f50D8bd4B4F9b1110F0D6bD2c97526',
      'BTC/USD': '0x5741306c21795FdCBb9b265Ea0255F499DFe515C',
      'ETH/USD': '0x143db3CEEfbdfe5631aDD3E50f7614B6ba708BA7',
    },
  },
  
  vrf: {
    mainnet: {
      coordinator: '0xc587d9053cd1118f25F645F9E08BB98c9712A4EE',
      linkToken: '0x404460C6A5EdE2D891e8297795264fDe62ADBB75',
      keyHash: '0x114f3da0a805b6a67d6e9cd2ec746f7028f1b7376365af575cfea3550dd1aa04',
      fee: '0.2 LINK',
    },
    testnet: {
      coordinator: '0x6A2AAd07396B36Fe02a22b33cf443582f682c82f',
      linkToken: '0x84b9B910527Ad5C03A9Ca831909E21e236EA7b06',
      keyHash: '0xd4bb89654db74673a187bd804519e65e3f71a52bc55f11da7601a13dcf505314',
      fee: '0.1 LINK',
    },
  },
  
  notes: [
    "Chainlink is the most widely adopted oracle on BNB Chain",
    "Powers major protocols like PancakeSwap, Venus, Alpaca Finance",
    "200+ price feeds covering crypto, forex, commodities",
    "VRF V2 provides cryptographically secure randomness",
    "Automation (Keepers) enables time/condition-based execution",
    "CCIP enables cross-chain interoperability",
    "Extremely reliable with proven security",
    "Low gas costs on BNB Chain (~$0.10-0.50 per oracle call)",
    "Active development and ecosystem support",
    "Comprehensive documentation and TypeScript SDK",
  ],
  
  useCases: [
    "DeFi lending protocols (Venus, Alpaca)",
    "DEX price feeds (PancakeSwap)",
    "Derivatives and options trading",
    "Stablecoin collateral pricing",
    "Yield farming and liquidity mining",
    "NFT fair minting with VRF",
    "Gaming randomness (loot boxes, battles)",
    "Prediction markets",
    "Insurance products",
    "Automated yield optimization",
    "Cross-chain bridges",
  ],
  
  technicalDetails: {
    updateFrequency: "Every 0.5% deviation or 1 hour heartbeat",
    decentralization: "Multiple node operators per feed",
    dataAggregation: "Median of multiple sources",
    securityModel: "Staking + reputation",
    gasOptimization: "Optimized for BNB Chain",
    sdkLanguages: ["TypeScript", "JavaScript", "Python", "Go"],
  },
  
  resources: {
    mainWebsite: "https://chain.link/",
    documentation: "https://docs.chain.link/",
    bnbChainDocs: "https://docs.chain.link/docs/bnb-chain-addresses/",
    priceFeeds: "https://data.chain.link/bsc/mainnet",
    github: "https://github.com/smartcontractkit/chainlink",
    blog: "https://blog.chain.link/",
    academy: "https://chain.link/education-hub",
  },
};

