// Harbinger Oracle - Native Tezos Price Oracle
// Type: Decentralized Price Oracle
// Blockchain: Tezos (XTZ)

export const harbingerOracle = {
  name: "Harbinger",
  blockchain: "Tezos (XTZ)",
  type: "Decentralized Price Oracle",
  description: "Native Tezos oracle for reliable price feeds, aggregating signed data from exchanges and on-chain sources to compute medians and exclude outliers. Self-sustaining via fees.",
  
  url: "https://github.com/tacoinfra/harbinger",
  docs: "https://github.com/tacoinfra/harbinger/blob/master/docs/architecture.md",
  
  api: {
    normalizerContract: "KT1Jr5t9UvGiqkvvsuUbPJHaYx24NzdUwNW9", // Mainnet
    alternativeContract: "KT1AdbYiPYb5hDuEuVrfxmFehtnBCXv4Np7r", // Alternative mainnet
    rpcEndpoint: "https://mainnet.api.tez.ie",
    documentation: "https://github.com/tacoinfra/harbinger/blob/master/README.md",
    contractAddresses: "https://github.com/tacoinfra/harbinger/blob/master/CONTRACT_ADDRESSES.md",
  },
  
  sdk: {
    npm: "@tacoinfra/harbinger-cli",
    installation: "npm install @tacoinfra/harbinger-cli @taquito/taquito @taquito/signer",
    documentation: "https://www.npmjs.com/package/@tacoinfra/harbinger-cli",
    github: "https://github.com/tacoinfra/harbinger-lib",
    features: [
      "Signed price feeds from multiple exchanges",
      "Volume-weighted average price calculation",
      "Outlier exclusion",
      "Self-sustaining via transaction fees",
      "Normalizer contract for aggregation",
    ],
  },
  
  integration: {
    example: `
// Harbinger Oracle Integration Example
import { TezosToolkit } from '@taquito/taquito';

const Tezos = new TezosToolkit('https://mainnet.api.tez.ie');
const HARBINGER_NORMALIZER = 'KT1Jr5t9UvGiqkvvsuUbPJHaYx24NzdUwNW9';

// Get price for a specific asset from Harbinger
async function getHarbingerPrice(assetSymbol: string) {
  try {
    const contract = await Tezos.contract.at(HARBINGER_NORMALIZER);
    const storage: any = await contract.storage();
    
    // Get the asset data from the map
    const assetData = await storage.assets.get(assetSymbol);
    
    if (!assetData) {
      throw new Error(\`Asset \${assetSymbol} not found in oracle\`);
    }

    // Convert from fixed-point number (typically 6 decimals)
    const price = assetData.price.toNumber() / 1000000;
    const timestamp = new Date(assetData.timestamp.toNumber());
    const volume = assetData.volume.toNumber() / 1000000;

    console.log(\`\${assetSymbol} Price: $\${price}\`);
    console.log(\`Last Updated: \${timestamp.toISOString()}\`);
    
    return {
      price,
      timestamp,
      volume
    };
  } catch (error) {
    console.error('Error fetching price from Harbinger:', error);
    throw error;
  }
}

// Get multiple asset prices
async function getMultiplePrices(assetSymbols: string[]) {
  const prices: any = {};
  
  for (const symbol of assetSymbols) {
    try {
      const assetData = await getHarbingerPrice(symbol);
      prices[symbol] = {
        price: assetData.price,
        timestamp: assetData.timestamp
      };
    } catch (error) {
      console.error(\`Error getting price for \${symbol}:\`, error);
      prices[symbol] = null;
    }
  }
  
  return prices;
}

// Alternative: Using TzKT API for faster queries
async function getHarbingerPriceViaTzKT(assetSymbol: string) {
  try {
    const response = await fetch(
      \`https://api.tzkt.io/v1/contracts/\${HARBINGER_NORMALIZER}/storage\`
    );
    const storage = await response.json();

    // Parse for price (adjust keys based on actual storage structure)
    const assetData = storage.assets?.[assetSymbol];
    const price = assetData ? Number(assetData.price) / 1e6 : null;

    console.log(\`\${assetSymbol} Price: $\${price || 'N/A'}\`);
    return price;
  } catch (error) {
    console.error('Error fetching price via TzKT:', error);
    throw error;
  }
}

// Usage
getHarbingerPrice('XTZ').then(data => console.log('XTZ Price:', data));
getHarbingerPrice('BTC').then(data => console.log('BTC Price:', data));
getMultiplePrices(['XTZ', 'BTC', 'ETH', 'USDT']).then(prices => console.log('All Prices:', prices));
    `,
  },
  
  socialMedia: {
    github: "https://github.com/tacoinfra/harbinger",
    medium: "https://medium.com/@Blockscale/introducing-harbinger-a-self-sustaining-price-oracle-for-tezos-7cab5c9971d",
  },
  
  features: {
    decentralized: true,
    selfSustaining: true,
    multiSource: true,
    volumeWeighted: true,
    outlierExclusion: true,
    signedData: true,
  },
  
  supportedAssets: [
    "XTZ",
    "BTC",
    "ETH",
    "USDT",
    "DOGE",
    "LINK",
  ],
  
  dataFormat: {
    priceDecimals: 6,
    priceScale: 1000000,
    timestampFormat: "Unix timestamp (seconds)",
    updateFrequency: "Variable (typically every few minutes)",
  },
  
  contracts: {
    normalizer: "KT1Jr5t9UvGiqkvvsuUbPJHaYx24NzdUwNW9",
    alternativeNormalizer: "KT1AdbYiPYb5hDuEuVrfxmFehtnBCXv4Np7r",
  },
  
  notes: [
    "Most widely adopted price oracle on Tezos",
    "Self-sustaining via transaction fees",
    "Aggregates data from multiple exchanges (Binance, CoinMarketCap, Quipuswap)",
    "Uses volume-weighted median to exclude outliers",
    "Used in major Tezos DeFi protocols (stablecoins, lending)",
    "Open-source and community-maintained",
    "Active since 2020",
    "Normalizer contract calculates volume-weighted average price",
    "Data is cryptographically signed by multiple sources",
  ],
};

