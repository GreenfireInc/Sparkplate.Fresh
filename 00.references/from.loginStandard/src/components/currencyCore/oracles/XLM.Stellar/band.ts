// Band Protocol Oracle - Cross-Chain Oracle on Stellar
// Type: Cross-Chain Oracle Network
// Blockchain: Stellar (XLM)

export const bandOracle = {
  name: "Band Protocol",
  blockchain: "Stellar (XLM)",
  type: "Cross-Chain Oracle Network",
  description: "Band Protocol provides real-time oracle services on Stellar's Soroban mainnet. Integrated via Stellar Community Fund in 2023-2024, Band delivers cross-chain data feeds and price information to Rust-based Soroban smart contracts with multi-source aggregation and decentralized validation.",
  
  url: "https://bandprotocol.com/",
  docs: "https://docs.bandchain.org/",
  stellarIntegration: "https://blog.bandprotocol.com/bandprotocol-integration-with-stellar-smart-contracts/",
  
  api: {
    bandChainAPI: "https://laozi1.bandchain.org/api",
    sorobanContracts: "Available on Stellar mainnet",
    rpcEndpoint: "https://rpc.stellar.org",
    testnetRPC: "https://rpc-testnet.stellar.org",
    documentation: "https://docs.bandchain.org/",
  },
  
  sdk: {
    npm: "@stellar/stellar-sdk",
    installation: "npm install @stellar/stellar-sdk",
    bandSDK: "@bandprotocol/band.js (for BandChain queries)",
    documentation: "https://docs.bandchain.org/",
    github: "https://github.com/bandprotocol",
    sorobanPackage: "Band Soroban smart contracts",
    features: [
      "Cross-chain oracle data",
      "Real-time price feeds",
      "Multi-source aggregation",
      "Decentralized validators",
      "Rust-based Soroban contracts",
    ],
  },
  
  integration: {
    example: `
// Band Protocol Oracle Integration Example
import { Contract, SorobanRpc } from '@stellar/stellar-sdk';
import axios from 'axios';

const BAND_CHAIN_API = 'https://laozi1.bandchain.org/api';
const BAND_SOROBAN_CONTRACT = 'YOUR_BAND_CONTRACT_ADDRESS'; // Replace with actual address
const RPC_URL = 'https://rpc.stellar.org';

// ============================================================================
// QUERY BAND PROTOCOL VIA BANDCHAIN API (OFF-CHAIN)
// ============================================================================

/**
 * Get price from Band Protocol API
 */
async function getBandPrice(symbol: string): Promise<number> {
  try {
    const response = await axios.get(
      \`\${BAND_CHAIN_API}/oracle/v1/request_prices?symbols=\${symbol}&min_count=10&ask_count=16\`
    );

    if (!response.data.price_results || response.data.price_results.length === 0) {
      throw new Error(\`No price data available for \${symbol}\`);
    }

    const priceData = response.data.price_results[0];
    const price = Number(priceData.px) / 1e9; // Band uses 9 decimals

    console.log(\`\${symbol} Price from Band: $\${price}\`);
    return price;
  } catch (error) {
    console.error('Error fetching Band price:', error);
    throw error;
  }
}

/**
 * Get multiple asset prices in batch
 */
async function getBandPricesBatch(symbols: string[]): Promise<Map<string, number>> {
  try {
    const symbolsParam = symbols.join(',');
    const response = await axios.get(
      \`\${BAND_CHAIN_API}/oracle/v1/request_prices?symbols=\${symbolsParam}&min_count=10&ask_count=16\`
    );

    const prices = new Map<string, number>();

    for (const result of response.data.price_results) {
      const symbol = result.symbol;
      const price = Number(result.px) / 1e9;
      prices.set(symbol, price);
      console.log(\`✓ \${symbol}: $\${price}\`);
    }

    return prices;
  } catch (error) {
    console.error('Error fetching Band prices batch:', error);
    throw error;
  }
}

// ============================================================================
// QUERY BAND ORACLE VIA SOROBAN CONTRACT (ON-CHAIN)
// ============================================================================

/**
 * Get price from Band Soroban oracle contract
 */
async function getBandSorobanPrice(
  contractAddress: string,
  symbol: string
): Promise<{ price: number; timestamp: number; decimals: number }> {
  try {
    const rpc = new SorobanRpc.Server(RPC_URL);
    const contract = new Contract(contractAddress);

    // Call Band oracle contract's method to get latest data
    const result = await contract.methods.get_latest_data(\`\${symbol}/USD\`).call({ rpc });

    const price = Number(result.price);
    const timestamp = Number(result.timestamp);
    const decimals = Number(result.decimals || 18);

    const adjustedPrice = price / Math.pow(10, decimals);

    console.log(\`\${symbol} Price from Band Soroban: $\${adjustedPrice}\`);

    return {
      price: adjustedPrice,
      timestamp,
      decimals
    };
  } catch (error) {
    console.error('Error fetching Band Soroban price:', error);
    throw error;
  }
}

/**
 * Get oracle reference data with validation info
 */
async function getBandReferenceData(
  symbol: string,
  quote: string = 'USD'
): Promise<{
  rate: number;
  lastUpdatedBase: number;
  lastUpdatedQuote: number;
}> {
  try {
    const response = await axios.get(
      \`\${BAND_CHAIN_API}/oracle/v1/request_prices?symbols=\${symbol},\${quote}&min_count=10&ask_count=16\`
    );

    const results = response.data.price_results;
    const basePrice = Number(results[0].px) / 1e9;
    const quotePrice = Number(results[1]?.px || 1e9) / 1e9;
    
    const rate = basePrice / quotePrice;

    return {
      rate,
      lastUpdatedBase: Date.now(),
      lastUpdatedQuote: Date.now()
    };
  } catch (error) {
    console.error('Error fetching Band reference data:', error);
    throw error;
  }
}

/**
 * Query oracle with validation parameters
 */
async function getBandValidatedPrice(
  contractAddress: string,
  symbol: string,
  maxAge: number = 3600
): Promise<{ price: number; valid: boolean; age: number }> {
  try {
    const rpc = new SorobanRpc.Server(RPC_URL);
    const contract = new Contract(contractAddress);

    const result = await contract.methods.get_latest_data(symbol).call({ rpc });

    const price = Number(result.price);
    const timestamp = Number(result.timestamp);
    const currentTime = Math.floor(Date.now() / 1000);
    const age = currentTime - timestamp;
    const valid = age <= maxAge;

    console.log(\`\${symbol} Price: $\${price}, Age: \${age}s, Valid: \${valid}\`);

    return { price, valid, age };
  } catch (error) {
    console.error('Error fetching Band validated price:', error);
    throw error;
  }
}

// ============================================================================
// USAGE EXAMPLES
// ============================================================================

// Example 1: Get XLM price via BandChain API
getBandPrice('XLM')
  .then(price => console.log('XLM Price:', price))
  .catch(console.error);

// Example 2: Get multiple prices in batch
getBandPricesBatch(['XLM', 'BTC', 'ETH', 'USDT'])
  .then(prices => {
    console.log('All Prices:', prices);
  })
  .catch(console.error);

// Example 3: Get price from Soroban contract
getBandSorobanPrice(BAND_SOROBAN_CONTRACT, 'XLM')
  .then(data => console.log('Soroban XLM Data:', data))
  .catch(console.error);

// Example 4: Get reference data for XLM/USD pair
getBandReferenceData('XLM', 'USD')
  .then(data => console.log('Reference Data:', data))
  .catch(console.error);

// Example 5: Get validated price (max 1 hour old)
getBandValidatedPrice(BAND_SOROBAN_CONTRACT, 'BTC', 3600)
  .then(data => console.log('Validated BTC Price:', data))
  .catch(console.error);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/BandProtocol",
    telegram: "https://t.me/bandprotocol",
    discord: "https://discord.gg/3t4bsY7",
    medium: "https://medium.com/bandprotocol",
    github: "https://github.com/bandprotocol",
  },
  
  features: {
    crossChain: true,
    realTime: true,
    decentralized: true,
    multiSource: true,
    validatorNetwork: true,
    sorobanIntegration: true,
    priceFeeds: true,
    customDataFeeds: true,
  },
  
  supportedAssets: [
    "XLM (Stellar Lumens)",
    "BTC (Bitcoin)",
    "ETH (Ethereum)",
    "USDT (Tether)",
    "USDC (USD Coin)",
    "100+ major cryptocurrencies",
    "Forex pairs",
    "Commodities",
  ],
  
  dataSources: [
    "CoinGecko",
    "CryptoCompare",
    "Binance",
    "Coinbase",
    "Kraken",
    "80+ exchanges and data providers",
  ],
  
  stellarIntegration: {
    year: "2023-2024",
    funding: "Stellar Community Fund Award (May 2023)",
    status: "Integrated on Soroban Mainnet",
    contractLanguage: "Rust (Soroban)",
    description: "Band Protocol received Stellar Community Fund award and successfully integrated oracle services on Soroban mainnet",
  },
  
  notes: [
    "Integrated with Stellar via Stellar Community Fund (May 2023)",
    "Active on Soroban mainnet as of 2024",
    "Cross-chain oracle with proven security on multiple chains",
    "Decentralized validator network ensures data accuracy",
    "Rust-based Soroban smart contracts",
    "9 decimal precision for price data (1e9 scaling)",
    "Supports real-time and historical data queries",
    "No API key required for basic BandChain API usage",
    "Developer contact: dev@bandprotocol.com",
    "Suitable for cross-chain DeFi applications",
  ],
  
  resources: {
    website: "https://bandprotocol.com/",
    documentation: "https://docs.bandchain.org/",
    stellarBlog: "https://blog.bandprotocol.com/bandprotocol-integration-with-stellar-smart-contracts/",
    stellarDocs: "https://developers.stellar.org/docs/data/oracles/oracle-providers",
    github: "https://github.com/bandprotocol",
    sorobanContracts: "https://github.com/bandprotocol/soroban-contracts",
    developerEmail: "dev@bandprotocol.com",
    discord: "https://discord.bandprotocol.com/",
  },
};

