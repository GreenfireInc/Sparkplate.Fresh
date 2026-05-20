// Chainlink Oracle Pallet - Decentralized Oracle for Substrate
// Type: Decentralized Oracle Network
// Blockchain: Polkadot (DOT) / Substrate / Moonbeam

export const chainlinkOracle = {
  name: "Chainlink",
  fullName: "Chainlink Oracle Pallet",
  blockchain: "Polkadot (DOT) / Substrate / Moonbeam",
  type: "Decentralized Oracle Network",
  description: "Chainlink feed pallet for Substrate-based chains and native Chainlink price feeds on Moonbeam (EVM parachain). Provides tamper-proof, decentralized data feeds for DOT and other assets.",
  
  url: "https://chain.link/",
  moonbeamIntegration: "https://cointelegraph.com/news/chainlink-integrates-with-moonbeam-to-provide-price-data-to-polkadot-developers",
  docs: "https://docs.chain.link/",
  
  api: {
    substratePallet: "https://github.com/smartcontractkit/chainlink-polkadot",
    palletReadme: "https://github.com/smartcontractkit/chainlink-polkadot/blob/master/pallet-chainlink-feed/README.md",
    polkadotDocs: "https://docs.polkadot.com/develop/toolkit/integrations/oracles/",
    exampleNode: "https://github.com/smartcontractkit/chainlink-polkadot/tree/master/substrate-node-example",
    documentation: "https://docs.chain.link/",
  },
  
  sdk: {
    npm: "@polkadot/api",
    installation: "npm install @polkadot/api @polkadot/util-crypto",
    documentation: "https://docs.chain.link/",
    github: "https://github.com/smartcontractkit/chainlink-polkadot",
    features: [
      "Decentralized price feeds",
      "Runtime pallet integration",
      "Job-based oracle system",
      "Multiple feed support",
      "Proven security model",
      "Cross-chain compatibility",
    ],
  },
  
  integration: {
    example: `
// Chainlink Oracle Pallet Integration for Polkadot
import { ApiPromise, WsProvider } from '@polkadot/api';

// Connect to chain with Chainlink pallet
async function initChainlink(wsUrl: string) {
  const provider = new WsProvider(wsUrl);
  const api = await ApiPromise.create({ provider });
  return api;
}

// Read Chainlink feed data from pallet
async function getChainlinkFeed(api: ApiPromise, feedId: number) {
  try {
    // Query the chainlink feed pallet
    // Storage path depends on pallet configuration
    const feedData = await api.query.chainlinkFeed?.latestRoundData?.(feedId);
    
    if (!feedData) {
      throw new Error(\`Feed \${feedId} not found\`);
    }
    
    const data = feedData.toJSON() as any;
    
    return {
      answer: data.answer,
      roundId: data.roundId,
      startedAt: data.startedAt,
      updatedAt: data.updatedAt,
      answeredInRound: data.answeredInRound,
    };
  } catch (error) {
    console.error('Error reading Chainlink feed:', error);
    throw error;
  }
}

// Get DOT/USD price from Chainlink
async function getDOTPrice(api: ApiPromise, feedId: number = 0) {
  try {
    const feedData = await getChainlinkFeed(api, feedId);
    
    // Answer is typically scaled (e.g., 8 decimals for USD pairs)
    const price = parseFloat(feedData.answer) / 1e8;
    
    console.log(\`DOT/USD Price: $\${price}\`);
    console.log(\`Round ID: \${feedData.roundId}\`);
    console.log(\`Updated At: \${new Date(feedData.updatedAt * 1000).toISOString()}\`);
    
    return price;
  } catch (error) {
    console.error('Error fetching DOT price:', error);
    throw error;
  }
}

// Subscribe to feed updates
async function subscribeFeedUpdates(api: ApiPromise, feedId: number, callback: (price: number) => void) {
  try {
    const unsubscribe = await api.query.chainlinkFeed.latestRoundData(feedId, (feedData) => {
      const data = feedData.toJSON() as any;
      const price = parseFloat(data.answer) / 1e8;
      
      console.log('Price updated:', price);
      callback(price);
    });
    
    return unsubscribe;
  } catch (error) {
    console.error('Error subscribing to feed:', error);
    throw error;
  }
}

// Query feed decimals
async function getFeedDecimals(api: ApiPromise, feedId: number) {
  try {
    const decimals = await api.query.chainlinkFeed?.decimals?.(feedId);
    return decimals?.toNumber() || 8; // Default to 8 decimals
  } catch (error) {
    console.error('Error getting feed decimals:', error);
    return 8;
  }
}

// Get historical round data
async function getHistoricalRound(api: ApiPromise, feedId: number, roundId: number) {
  try {
    const roundData = await api.query.chainlinkFeed?.getRoundData?.(feedId, roundId);
    
    if (!roundData) {
      throw new Error(\`Round \${roundId} not found for feed \${feedId}\`);
    }
    
    return roundData.toJSON();
  } catch (error) {
    console.error('Error fetching historical round:', error);
    throw error;
  }
}

// Example: Moonbeam Chainlink integration (EVM-based)
import { ethers } from 'ethers';

async function getMoonbeamChainlinkPrice() {
  // Moonbeam is EVM-compatible, use standard Chainlink approach
  const provider = new ethers.JsonRpcProvider('https://rpc.api.moonbeam.network');
  
  // Chainlink DOT/USD feed on Moonbeam (example address)
  const feedAddress = '0x1466b4bD0C4B6B661d5A4e7B85E4Fbbe1422DdF4';
  const abi = [
    'function latestRoundData() external view returns (uint80 roundId, int256 answer, uint256 startedAt, uint256 updatedAt, uint80 answeredInRound)',
    'function decimals() external view returns (uint8)',
  ];
  
  try {
    const priceFeed = new ethers.Contract(feedAddress, abi, provider);
    
    const [roundId, answer, startedAt, updatedAt, answeredInRound] = 
      await priceFeed.latestRoundData();
    const decimals = await priceFeed.decimals();
    
    const price = Number(answer) / Math.pow(10, decimals);
    
    console.log(\`DOT/USD on Moonbeam: $\${price}\`);
    console.log(\`Round ID: \${roundId}\`);
    console.log(\`Updated: \${new Date(Number(updatedAt) * 1000).toISOString()}\`);
    
    return price;
  } catch (error) {
    console.error('Error fetching Moonbeam Chainlink price:', error);
    throw error;
  }
}

// Usage example
async function main() {
  // Substrate approach
  const api = await initChainlink('wss://your-parachain-node');
  
  const price = await getDOTPrice(api, 0);
  console.log('DOT Price:', price);
  
  // Subscribe to updates
  const unsubscribe = await subscribeFeedUpdates(api, 0, (newPrice) => {
    console.log('New price:', newPrice);
  });
  
  // Later: unsubscribe()
  
  await api.disconnect();
  
  // Moonbeam EVM approach
  const moonbeamPrice = await getMoonbeamChainlinkPrice();
  console.log('Moonbeam DOT Price:', moonbeamPrice);
}

main().catch(console.error);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/chainlink",
    telegram: "https://t.me/chainlinkofficial",
    discord: "https://discord.gg/chainlink",
    reddit: "https://www.reddit.com/r/Chainlink/",
    github: "https://github.com/smartcontractkit/chainlink",
    youtube: "https://www.youtube.com/chainlink",
  },
  
  features: {
    decentralized: true,
    provenSecurity: true,
    palletIntegration: true,
    evmCompatible: true,
    multipleFeeds: true,
    historicalData: true,
    crossChain: true,
  },
  
  supportedData: [
    "DOT/USD price feeds",
    "DOT/EUR and other pairs",
    "Multiple asset prices",
    "Verifiable Random Function (VRF)",
    "External APIs",
    "Custom data feeds",
  ],
  
  deployment: {
    substratePallet: "pallet-chainlink-feed for runtime integration",
    moonbeam: "Native Chainlink price feed contracts on Moonbeam",
    feeders: "Decentralized network of oracle nodes",
    verification: "On-chain aggregation and verification",
  },
  
  notes: [
    "Substrate pallet repository is archived (read-only) as of 2025",
    "Active integration on Moonbeam parachain (EVM-compatible)",
    "Provides DOT price data to Polkadot developers via Moonbeam",
    "Proven security model used by major DeFi protocols",
    "Decentralized node operators ensure data integrity",
    "Can integrate via runtime pallet or EVM contracts",
    "Example node available in GitHub repository",
    "Requires feeder nodes to push updates to feeds",
    "Listed in Polkadot official oracle documentation",
    "Best for production DeFi requiring high security",
  ],
  
  useCases: [
    "DeFi price oracles (lending, derivatives)",
    "Decentralized exchanges",
    "Synthetic assets",
    "Automated market makers",
    "Insurance protocols",
    "Prediction markets",
  ],
  
  resources: {
    palletRepo: "https://github.com/smartcontractkit/chainlink-polkadot",
    exampleNode: "https://github.com/smartcontractkit/chainlink-polkadot/tree/master/substrate-node-example",
    moonbeamAnnouncement: "https://cointelegraph.com/news/chainlink-integrates-with-moonbeam-to-provide-price-data-to-polkadot-developers",
    polkadotForum: "https://forum.polkadot.network/t/oracles-for-polkadot/1286",
  },
  
  limitations: [
    "Substrate pallet repository is archived",
    "Requires running oracle node infrastructure",
    "Gas/transaction fees for on-chain updates",
    "Limited to chains that integrate the pallet",
    "Moonbeam integration more actively maintained than substrate pallet",
  ],
};

