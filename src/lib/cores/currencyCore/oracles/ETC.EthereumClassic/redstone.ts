// RedStone Oracle - Ethereum Classic Integration
// RedStone provides decentralized oracle services with direct ETC support

export const redstoneOracle = {
  name: 'RedStone Oracle',
  blockchain: 'Ethereum Classic (ETC)',
  type: 'Decentralized Oracle',
  
  description: `RedStone is a decentralized oracle that supports multiple chains, including Ethereum Classic. It provides price feeds for ETC and other assets, making it a viable option for ETC-based DeFi applications. RedStone is notable for directly supporting ETC price feeds without requiring wrapped tokens.`,

  features: [
    'Direct Ethereum Classic blockchain support',
    'ETC price feeds without requiring wrapped tokens',
    'Multi-chain oracle platform',
    'Real-time price data aggregation',
    'Decentralized data validation',
    'REST API for easy integration',
    'Support for multiple asset classes',
  ],

  api: {
    baseUrl: 'https://api.redstone.finance',
    priceEndpoint: 'https://api.redstone.finance/prices',
    documentation: 'https://docs.redstone.finance/',
    apiType: 'REST API',
    responseFormat: 'JSON',
  },

  sdk: {
    primaryPackage: 'axios (for REST API calls)',
    installCommand: 'npm install axios',
    supportedLanguages: ['TypeScript', 'JavaScript', 'Python', 'Go'],
  },

  socialMedia: {
    website: 'https://redstone.finance/',
    twitter: 'https://twitter.com/redstone_defi',
    telegram: 'https://t.me/redstonefinance',
    discord: 'https://discord.gg/redstone',
    github: 'https://github.com/redstone-finance',
    medium: 'https://medium.com/redstone-finance',
  },

  useCases: [
    'ETC price feeds for DeFi applications',
    'Real-time market data for trading applications',
    'Portfolio tracking and analytics',
    'Cross-chain price references',
    'Smart contract price oracles',
  ],

  integration: {
    example: `
import axios from 'axios';

/**
 * RedStone Oracle Integration for Ethereum Classic
 * Fetch ETC price data directly from RedStone API
 */

const REDSTONE_API = {
  baseUrl: 'https://api.redstone.finance',
  pricesEndpoint: '/prices',
};

/**
 * Get ETC price from RedStone
 */
async function getETCPriceFromRedStone(): Promise<number> {
  try {
    const response = await axios.get(
      \`\${REDSTONE_API.baseUrl}\${REDSTONE_API.pricesEndpoint}\`,
      {
        params: {
          symbol: 'ETC',
          provider: 'redstone',
        },
      }
    );
    
    const price = response.data.value || response.data.price;
    
    console.log(\`ETC Price from RedStone: $\${price}\`);
    return price;
  } catch (error) {
    console.error('Error fetching ETC price from RedStone:', error);
    throw error;
  }
}

/**
 * Get multiple cryptocurrency prices including ETC
 */
async function getMultiplePrices(symbols: string[]): Promise<Record<string, number>> {
  try {
    const response = await axios.get(
      \`\${REDSTONE_API.baseUrl}\${REDSTONE_API.pricesEndpoint}\`,
      {
        params: {
          symbols: symbols.join(','),
          provider: 'redstone',
        },
      }
    );
    
    const prices: Record<string, number> = {};
    
    if (Array.isArray(response.data)) {
      response.data.forEach((item: any) => {
        prices[item.symbol] = item.value || item.price;
      });
    }
    
    console.log('Prices from RedStone:', prices);
    return prices;
  } catch (error) {
    console.error('Error fetching prices from RedStone:', error);
    throw error;
  }
}

/**
 * Get ETC price with additional metadata
 */
async function getETCPriceWithMetadata() {
  try {
    const response = await axios.get(
      \`\${REDSTONE_API.baseUrl}\${REDSTONE_API.pricesEndpoint}?symbol=ETC\`
    );
    
    return {
      symbol: response.data.symbol,
      price: response.data.value || response.data.price,
      timestamp: response.data.timestamp,
      source: response.data.source,
      provider: 'RedStone',
    };
  } catch (error) {
    console.error('Error fetching ETC metadata:', error);
    throw error;
  }
}

/**
 * Monitor ETC price changes
 */
async function monitorETCPrice(
  callback: (price: number) => void,
  intervalMs: number = 60000
) {
  setInterval(async () => {
    try {
      const price = await getETCPriceFromRedStone();
      callback(price);
    } catch (error) {
      console.error('Error in price monitoring:', error);
    }
  }, intervalMs);
}

// Example usage
async function main() {
  console.log('Fetching ETC price from RedStone Oracle...');
  
  const etcPrice = await getETCPriceFromRedStone();
  console.log(\`Current ETC Price: $\${etcPrice.toFixed(2)}\`);
  
  const multiplePrices = await getMultiplePrices(['ETC', 'BTC', 'ETH']);
  console.log('Multiple prices:', multiplePrices);
  
  const priceWithMetadata = await getETCPriceWithMetadata();
  console.log('Price with metadata:', priceWithMetadata);
}

export {
  getETCPriceFromRedStone,
  getMultiplePrices,
  getETCPriceWithMetadata,
  monitorETCPrice,
};
    `.trim(),
  },

  notes: [
    'RedStone is the only major oracle with direct ETC price feed support',
    'No need for wrapped tokens (unlike Chainlink)',
    'REST API is easy to integrate into any application',
    'Provides decentralized data validation',
    'Suitable for off-chain and on-chain integrations',
    'Regularly updated price feeds',
    'Multi-chain support makes it flexible for cross-chain applications',
  ],

  limitations: [
    'Smaller validator network compared to Chainlink',
    'Less documentation for Ethereum Classic specific integration',
    'Primarily REST API based (may require additional on-chain contracts for smart contracts)',
  ],

  alternatives: [
    'HebeSwap Oracle (native ETC)',
    'Chainlink (via wrapped ETC)',
    'Band Protocol',
  ],
};

