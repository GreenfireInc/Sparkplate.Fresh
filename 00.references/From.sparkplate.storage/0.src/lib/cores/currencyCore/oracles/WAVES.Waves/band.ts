// Band Protocol Oracle - Decentralized Oracle Network on Waves
// Type: Decentralized Oracle Network (Cross-chain)
// Blockchain: Waves (WAVES)

export const bandOracle = {
  name: "Band Protocol",
  blockchain: "Waves (WAVES)",
  type: "Decentralized Oracle Network",
  description: "Band Protocol provides decentralized price feeds for cryptocurrencies (including WAVES, BTC, ETH) and other assets. Data is aggregated from sources like CoinGecko, CryptoCompare, and Binance, and is accessible via bridge contract on Waves.",
  
  url: "https://bandprotocol.com/",
  tezosIntegration: "https://docs.waves.tech/en/building-apps/how-to/dapp/band-price-oracle",
  docs: "https://docs.bandchain.org/",
  
  api: {
    bridgeContract: "Contract address varies by network",
    nodeAPI: "https://nodes.wavesnodes.com",
    bandChainAPI: "https://laozi1.bandchain.org/api",
    documentation: "https://docs.bandchain.org/",
    priceFeeds: "https://docs.bandchain.org/band-standard-dataset/supported-blockchains.html",
  },
  
  sdk: {
    npm: "@waves/waves-transactions",
    installation: "npm install @waves/waves-transactions @waves/ts-lib-crypto",
    documentation: "https://docs.bandchain.org/",
    github: "https://github.com/bandprotocol",
    features: [
      "Decentralized price feeds",
      "Multi-source aggregation",
      "Bridge contract integration",
      "Cross-chain compatibility",
      "Validator network",
    ],
  },
  
  integration: {
    example: `
// Band Protocol Oracle Integration Example
import fetch from 'node-fetch';

const BAND_CHAIN_API = 'https://laozi1.bandchain.org/api';
const WAVES_NODE_URL = 'https://nodes.wavesnodes.com';

// ============================================================================
// QUERY BAND PROTOCOL PRICE FEEDS
// ============================================================================

/**
 * Get price from Band Protocol API (off-chain)
 */
async function getBandPrice(symbol: string): Promise<number> {
  try {
    const response = await fetch(
      \`\${BAND_CHAIN_API}/oracle/v1/request_prices?symbols=\${symbol}&min_count=10&ask_count=16\`
    );

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: Failed to fetch Band price\`);
    }

    const data = await response.json();
    const priceData = data.price_results[0];
    const price = Number(priceData.px) / 1e9; // Band uses 9 decimals

    console.log(\`\${symbol} Price from Band: $\${price}\`);
    return price;
  } catch (error) {
    console.error('Error fetching Band price:', error);
    throw error;
  }
}

/**
 * Get price from Band bridge contract on Waves (on-chain)
 */
async function getBandPriceOnChain(
  bridgeContractAddress: string,
  assetSymbol: string
): Promise<{ price: number; timestamp: number }> {
  try {
    // Read from bridge contract's data storage
    const response = await fetch(
      \`\${WAVES_NODE_URL}/addresses/data/\${bridgeContractAddress}/\${assetSymbol}\`
    );

    if (!response.ok) {
      throw new Error(\`HTTP \${response.status}: Failed to read bridge contract\`);
    }

    const data = await response.json();
    
    // Parse price (format depends on bridge implementation)
    const price = Number(data.value);
    const timestamp = data.lastUpdated || Date.now();

    console.log(\`\${assetSymbol} Price from Band Bridge: $\${price}\`);
    return { price, timestamp };
  } catch (error) {
    console.error('Error fetching Band price on-chain:', error);
    throw error;
  }
}

/**
 * Get multiple asset prices in batch
 */
async function getBandPricesBatch(symbols: string[]): Promise<Map<string, number>> {
  try {
    const symbolsParam = symbols.join(',');
    const response = await fetch(
      \`\${BAND_CHAIN_API}/oracle/v1/request_prices?symbols=\${symbolsParam}&min_count=10&ask_count=16\`
    );

    const data = await response.json();
    const prices = new Map<string, number>();

    for (const result of data.price_results) {
      const symbol = result.symbol;
      const price = Number(result.px) / 1e9;
      prices.set(symbol, price);
      console.log(\`\${symbol}: $\${price}\`);
    }

    return prices;
  } catch (error) {
    console.error('Error fetching Band prices batch:', error);
    throw error;
  }
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

// Example 1: Get WAVES price
getBandPrice('WAVES')
  .then(price => console.log('WAVES Price:', price))
  .catch(console.error);

// Example 2: Get BTC price
getBandPrice('BTC')
  .then(price => console.log('BTC Price:', price))
  .catch(console.error);

// Example 3: Get multiple prices in batch
getBandPricesBatch(['WAVES', 'BTC', 'ETH', 'USDT'])
  .then(prices => {
    console.log('All Prices:', prices);
  })
  .catch(console.error);

// Example 4: Get price from on-chain bridge contract (if available)
// const BRIDGE_CONTRACT = 'KT1...'; // Replace with actual bridge contract address
// getBandPriceOnChain(BRIDGE_CONTRACT, 'WAVES')
//   .then(data => console.log('WAVES Price (On-chain):', data))
//   .catch(console.error);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/BandProtocol",
    telegram: "https://t.me/bandprotocol",
    discord: "https://discord.com/invite/3t4bsY7",
    medium: "https://medium.com/bandprotocol",
    github: "https://github.com/bandprotocol",
  },
  
  features: {
    decentralized: true,
    multiSource: true,
    crossChain: true,
    validatorNetwork: true,
    bridgeContract: true,
    priceFeeds: true,
    cryptoAssets: true,
    realTimeData: true,
  },
  
  supportedAssets: [
    "WAVES",
    "BTC (Bitcoin)",
    "ETH (Ethereum)",
    "USDT (Tether)",
    "BNB (Binance Coin)",
    "And 100+ other cryptocurrencies",
  ],
  
  dataSources: [
    "CoinGecko",
    "CryptoCompare",
    "Binance",
    "Coinbase",
    "Kraken",
    "And 80+ other exchanges",
  ],
  
  notes: [
    "Band Protocol aggregates data from 80+ sources",
    "Decentralized validator network ensures data accuracy",
    "Cross-chain compatibility (Ethereum, BSC, Cosmos, etc.)",
    "Bridge contract enables on-chain price feeds on Waves",
    "9 decimal precision for price data",
    "Supports 100+ cryptocurrency price feeds",
    "Free API access for basic usage",
    "Real-time price updates",
    "Integrated with Waves since 2020-2021",
    "Suitable for DeFi applications requiring multi-source validation",
  ],
  
  resources: {
    documentation: "https://docs.bandchain.org/",
    wavesIntegration: "https://docs.waves.tech/en/building-apps/how-to/dapp/band-price-oracle",
    priceAPI: "https://docs.bandchain.org/band-standard-dataset/using-band-dataset/using-band-dataset-evm.html",
    supportedChains: "https://docs.bandchain.org/band-standard-dataset/supported-blockchains.html",
    github: "https://github.com/bandprotocol",
    blog: "https://medium.com/bandprotocol",
  },
};

