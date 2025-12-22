// Pyth Network - High-Frequency Oracle for Stacks
// Real-time price feeds with sub-second updates on Bitcoin Layer 2

export const pythOracle = {
  name: 'Pyth Network',
  blockchain: 'Stacks (STX)',
  type: 'Decentralized Oracle Network',
  
  description: `Pyth Network provides high-fidelity, real-time price feeds for the Stacks blockchain, offering over 400 price feeds including STX/USD, BTC/USD, and major assets. With 400ms update latency and data from 90+ first-party publishers, Pyth delivers institutional-grade pricing data to DeFi applications on Bitcoin's Layer 2. The pull-based oracle model integrated via Trust Machines' Stacks-Pyth bridge enables efficient on-chain price verification through Clarity smart contracts.`,

  features: [
    'Sub-second price updates (400ms)',
    '400+ real-time price feeds',
    '90+ first-party data publishers',
    'Confidence intervals included',
    'Pull-based oracle model',
    'Clarity smart contract integration',
    'Wormhole-based bridge',
    'Bitcoin-secured finality',
  ],

  api: {
    website: 'https://pyth.network/',
    documentation: 'https://docs.pyth.network/',
    stacksIntegration: 'https://www.hiro.so/blog/new-oracle-alert-pyth-integration-with-stacks',
    priceFeeds: 'https://pyth.network/price-feeds/',
    hermesAPI: 'https://hermes.pyth.network/',
    stacksBridge: 'https://github.com/Trust-Machines/stacks-pyth-bridge',
  },

  sdk: {
    primaryPackage: '@stacks/transactions',
    networkPackage: '@stacks/network',
    pythClient: '@pythnetwork/client',
    installCommand: 'npm install @stacks/transactions @stacks/network @pythnetwork/client',
    supportedLanguages: ['TypeScript', 'JavaScript', 'Clarity'],
  },

  socialMedia: {
    website: 'https://pyth.network/',
    twitter: 'https://twitter.com/PythNetwork',
    discord: 'https://discord.com/invite/pythnetwork',
    telegram: 'https://t.me/Pyth_Network',
    github: 'https://github.com/pyth-network',
  },

  contracts: {
    mainnet: {
      oracle: 'SP1CGXWEAMG6P6FT04W66NVGJ7PQWMDAC19R7PJ0Y.pyth-oracle-v4',
      storage: 'SP1CGXWEAMG6P6FT04W66NVGJ7PQWMDAC19R7PJ0Y.pyth-storage-v4',
      decoder: 'SP1CGXWEAMG6P6FT04W66NVGJ7PQWMDAC19R7PJ0Y.pyth-pnau-decoder-v3',
      wormhole: 'SP1CGXWEAMG6P6FT04W66NVGJ7PQWMDAC19R7PJ0Y.wormhole-core-v4',
    },
    testnet: {
      oracle: 'STR738QQX1PVTM6WTDF833Z18T8R0ZB791TCNEFM.pyth-oracle-v4',
      storage: 'STR738QQX1PVTM6WTDF833Z18T8R0ZB791TCNEFM.pyth-storage-v4',
      decoder: 'STR738QQX1PVTM6WTDF833Z18T8R0ZB791TCNEFM.pyth-pnau-decoder-v3',
      wormhole: 'STR738QQX1PVTM6WTDF833Z18T8R0ZB791TCNEFM.wormhole-core-v4',
    },
  },

  priceFeeds: {
    'STX/USD': '0xec7a775f46379b5e943c3526b1c8d54cd49749176b0b98e02dde68d1bd335c17',
    'BTC/USD': '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
    'ETH/USD': '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
    'SOL/USD': '0xef0d8b6fda2ceba41da15d4095d1da392a0d2f8ed0c6c7bc0f4cfac8c280b56d',
    'USDC/USD': '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a',
    'USDT/USD': '0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b',
  },

  useCases: [
    'Real-time STX price feeds',
    'DeFi protocol pricing',
    'Lending and borrowing platforms',
    'Stablecoin pegging',
    'AMM price discovery',
    'Liquidation engines',
    'Derivatives settlement',
    'Bitcoin-secured oracles',
  ],

  integration: {
    example: `
import {
  makeReadOnlyCall,
  cvToJSON,
  bufferCV,
  contractPrincipalCV,
} from '@stacks/transactions';
import { StacksMainnet, StacksTestnet } from '@stacks/network';
import axios from 'axios';

/**
 * Pyth Network Integration for Stacks (STX)
 * High-frequency oracle with 400ms updates
 */

const HERMES_API = 'https://hermes.pyth.network';
const MAINNET = new StacksMainnet();
const TESTNET = new StacksTestnet();

// Pyth contract addresses on Stacks mainnet
const PYTH_CONTRACTS = {
  mainnet: {
    oracle: 'SP1CGXWEAMG6P6FT04W66NVGJ7PQWMDAC19R7PJ0Y.pyth-oracle-v4',
    storage: 'SP1CGXWEAMG6P6FT04W66NVGJ7PQWMDAC19R7PJ0Y.pyth-storage-v4',
  },
  testnet: {
    oracle: 'STR738QQX1PVTM6WTDF833Z18T8R0ZB791TCNEFM.pyth-oracle-v4',
    storage: 'STR738QQX1PVTM6WTDF833Z18T8R0ZB791TCNEFM.pyth-storage-v4',
  },
};

// Price feed IDs
const PRICE_FEEDS = {
  'STX/USD': '0xec7a775f46379b5e943c3526b1c8d54cd49749176b0b98e02dde68d1bd335c17',
  'BTC/USD': '0xe62df6c8b4a85fe1a67db44dc12de5db330f7ac66b72dc658afedf0f4a415b43',
  'ETH/USD': '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
};

interface PythPrice {
  priceIdentifier: string;
  price: number;
  conf: number;
  expo: number;
  emaPrice: number;
  emaConf: number;
  publishTime: number;
  prevPublishTime: number;
}

/**
 * Get STX price from Pyth on-chain oracle
 */
async function getPythSTXPrice(network: 'mainnet' | 'testnet' = 'mainnet'): Promise<PythPrice | null> {
  try {
    const contracts = PYTH_CONTRACTS[network];
    const [contractAddress, contractName] = contracts.oracle.split('.');
    const [storageAddress, storageName] = contracts.storage.split('.');

    const feedId = PRICE_FEEDS['STX/USD'];
    const feedIdBuffer = Buffer.from(feedId.replace('0x', ''), 'hex');

    const result = await makeReadOnlyCall({
      network: network === 'mainnet' ? MAINNET : TESTNET,
      contractAddress,
      contractName,
      functionName: 'read-price-feed',
      functionArgs: [
        bufferCV(feedIdBuffer),
        contractPrincipalCV(storageAddress, storageName),
      ],
      senderAddress: contractAddress,
    });

    const jsonResult = cvToJSON(result);
    
    if (jsonResult.success) {
      const data = jsonResult.value.value;
      const price = parseInt(data.price.value);
      const expo = parseInt(data.expo.value);
      const formattedPrice = price * Math.pow(10, expo);

      console.log(\`Pyth STX/USD Price: $\${formattedPrice.toFixed(4)}\`);
      console.log(\`  Confidence: ±$\${(parseInt(data.conf.value) * Math.pow(10, expo)).toFixed(4)}\`);
      console.log(\`  Publish Time: \${new Date(parseInt(data['publish-time'].value) * 1000).toISOString()}\`);

      return {
        priceIdentifier: feedId,
        price: formattedPrice,
        conf: parseInt(data.conf.value) * Math.pow(10, expo),
        expo,
        emaPrice: parseInt(data['ema-price'].value) * Math.pow(10, expo),
        emaConf: parseInt(data['ema-conf'].value) * Math.pow(10, expo),
        publishTime: parseInt(data['publish-time'].value),
        prevPublishTime: parseInt(data['prev-publish-time'].value),
      };
    }

    return null;
  } catch (error) {
    console.error('Error fetching Pyth STX price:', error);
    return null;
  }
}

/**
 * Get latest price from Hermes API (off-chain, faster)
 */
async function getHermesSTXPrice(): Promise<{ price: number; conf: number; timestamp: number } | null> {
  try {
    const feedId = PRICE_FEEDS['STX/USD'];
    
    const response = await axios.get(\`\${HERMES_API}/v2/updates/price/latest\`, {
      params: {
        ids: [feedId],
      },
    });

    if (!response.data || !response.data.parsed || response.data.parsed.length === 0) {
      throw new Error('No price data found');
    }

    const priceData = response.data.parsed[0];
    const price = parseFloat(priceData.price.price) * Math.pow(10, priceData.price.expo);
    const conf = parseFloat(priceData.price.conf) * Math.pow(10, priceData.price.expo);

    console.log(\`Hermes STX/USD Price: $\${price.toFixed(4)}\`);
    console.log(\`  Confidence: ±$\${conf.toFixed(4)}\`);
    console.log(\`  Publish Time: \${new Date(priceData.price.publish_time * 1000).toISOString()}\`);

    return {
      price,
      conf,
      timestamp: priceData.price.publish_time,
    };
  } catch (error) {
    console.error('Error fetching Hermes STX price:', error);
    return null;
  }
}

/**
 * Get multiple asset prices
 */
async function getMultiplePrices(
  symbols: string[],
  network: 'mainnet' | 'testnet' = 'mainnet'
): Promise<{ [symbol: string]: number | null }> {
  const prices: { [symbol: string]: number | null } = {};

  for (const symbol of symbols) {
    const feedId = PRICE_FEEDS[symbol as keyof typeof PRICE_FEEDS];
    if (!feedId) {
      console.warn(\`Unknown price feed: \${symbol}\`);
      prices[symbol] = null;
      continue;
    }

    try {
      const contracts = PYTH_CONTRACTS[network];
      const [contractAddress, contractName] = contracts.oracle.split('.');
      const [storageAddress, storageName] = contracts.storage.split('.');

      const feedIdBuffer = Buffer.from(feedId.replace('0x', ''), 'hex');

      const result = await makeReadOnlyCall({
        network: network === 'mainnet' ? MAINNET : TESTNET,
        contractAddress,
        contractName,
        functionName: 'read-price-feed',
        functionArgs: [
          bufferCV(feedIdBuffer),
          contractPrincipalCV(storageAddress, storageName),
        ],
        senderAddress: contractAddress,
      });

      const jsonResult = cvToJSON(result);
      
      if (jsonResult.success) {
        const data = jsonResult.value.value;
        const price = parseInt(data.price.value);
        const expo = parseInt(data.expo.value);
        prices[symbol] = price * Math.pow(10, expo);
      } else {
        prices[symbol] = null;
      }
    } catch (error) {
      console.error(\`Error fetching \${symbol}:\`, error);
      prices[symbol] = null;
    }
  }

  console.log('\\nPyth Multi-Asset Prices:');
  Object.entries(prices).forEach(([symbol, price]) => {
    console.log(\`  \${symbol}: \${price ? '$' + price.toFixed(4) : 'N/A'}\`);
  });

  return prices;
}

/**
 * Monitor STX price changes
 */
async function monitorPythSTXPrice(
  callback: (price: number, conf: number) => void,
  intervalMs: number = 5000,
  network: 'mainnet' | 'testnet' = 'mainnet'
) {
  console.log('Starting Pyth STX price monitoring...\\n');

  let lastPrice: number | null = null;

  setInterval(async () => {
    try {
      const priceData = await getPythSTXPrice(network);
      
      if (priceData && lastPrice !== null) {
        const change = ((priceData.price - lastPrice) / lastPrice) * 100;
        console.log(
          \`STX: $\${priceData.price.toFixed(4)} (\${change >= 0 ? '+' : ''}\${change.toFixed(2)}%) ±$\${priceData.conf.toFixed(4)}\`
        );
        callback(priceData.price, priceData.conf);
      } else if (priceData) {
        console.log(\`Initial STX price: $\${priceData.price.toFixed(4)}\`);
      }
      
      lastPrice = priceData?.price || lastPrice;
    } catch (error) {
      console.error('Monitoring error:', error);
    }
  }, intervalMs);
}

/**
 * Compare on-chain vs off-chain price
 */
async function compareOnChainVsOffChain(network: 'mainnet' | 'testnet' = 'mainnet') {
  try {
    console.log('Comparing Pyth on-chain vs off-chain prices...\\n');

    const [onChainPrice, offChainPrice] = await Promise.all([
      getPythSTXPrice(network),
      getHermesSTXPrice(),
    ]);

    if (!onChainPrice || !offChainPrice) {
      console.log('Could not fetch prices for comparison');
      return;
    }

    const difference = Math.abs(onChainPrice.price - offChainPrice.price);
    const differencePercent = (difference / offChainPrice.price) * 100;

    console.log(\`\\nPrice Comparison:\`);
    console.log(\`  On-chain (Stacks): $\${onChainPrice.price.toFixed(4)}\`);
    console.log(\`  Off-chain (Hermes): $\${offChainPrice.price.toFixed(4)}\`);
    console.log(\`  Difference: $\${difference.toFixed(4)} (\${differencePercent.toFixed(3)}%)\`);
    console.log(\`  Status: \${differencePercent < 0.5 ? '✅ Synced' : '⚠️ Deviation detected'}\`);

    return {
      onChainPrice: onChainPrice.price,
      offChainPrice: offChainPrice.price,
      difference,
      differencePercent,
    };
  } catch (error) {
    console.error('Error comparing prices:', error);
    throw error;
  }
}

// Example usage
async function main() {
  console.log('Querying Pyth oracle for STX price...\\n');

  // Get on-chain price
  const onChainPrice = await getPythSTXPrice('mainnet');
  if (onChainPrice) {
    console.log(\`\\nSTX Price (on-chain): $\${onChainPrice.price.toFixed(4)}\`);
  }

  // Get off-chain price (faster)
  const offChainPrice = await getHermesSTXPrice();
  if (offChainPrice) {
    console.log(\`\\nSTX Price (Hermes): $\${offChainPrice.price.toFixed(4)}\`);
  }

  // Compare prices
  await compareOnChainVsOffChain('mainnet');

  // Get multiple prices
  await getMultiplePrices(['STX/USD', 'BTC/USD', 'ETH/USD'], 'mainnet');
}

export {
  getPythSTXPrice,
  getHermesSTXPrice,
  getMultiplePrices,
  monitorPythSTXPrice,
  compareOnChainVsOffChain,
  PRICE_FEEDS,
  PYTH_CONTRACTS,
};
    `.trim(),
  },

  notes: [
    'Industry-standard oracle for Stacks DeFi',
    'Sub-second price updates (400ms)',
    'Confidence intervals for risk assessment',
    'Pull-based model reduces gas costs',
    'Bitcoin-secured finality via PoX',
    'Integrated via Wormhole bridge',
    'Clarity smart contract support',
    'Hermes API for off-chain access',
  ],

  limitations: [
    'Requires understanding of Clarity contracts',
    'On-chain reads require Stacks RPC',
    'Price updates require transaction fees',
    'Some feeds may have lower liquidity',
  ],

  alternatives: [
    'DIA (for customizable feeds)',
    'ALEX (for DEX-based pricing)',
    'CoinGecko (for market data)',
    'Hiro API (for blockchain data)',
  ],
};

