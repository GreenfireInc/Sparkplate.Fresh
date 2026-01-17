/**
 * HODL HODL - Non-Custodial P2P Bitcoin Exchange
 *
 * Non-custodial peer-to-peer Bitcoin exchange with multisig escrow
 * Trust-minimized trading platform for Bitcoin enthusiasts
 *
 * @type P2P Trading Platform
 * @custody Non-custodial
 */

export const hodlHodl = {
  name: 'HODL HODL',
  type: 'P2P Trading Platform',

  // Platform URLs
  website: 'https://hodlhodl.com/',
  app: 'https://hodlhodl.com/pages/trading',
  docs: 'https://hodlhodl.com/pages/faq',

  // Social Media
  social: {
    twitter: 'https://twitter.com/hodlhodl',
    reddit: 'https://reddit.com/r/hodlhodl',
    telegram: 'https://t.me/hodlhodl',
    github: 'https://github.com/hodlhodl',
  },

  // Features
  features: {
    p2p: true,
    nonCustodial: true,
    multisigEscrow: true,
    arbitration: false, // No arbitration, trust-minimized
    noKYC: true,
    privacy: true,
    fiatOnramp: true,
    crossChain: false,
    subgraph: false,
    officialSDK: false,
    restAPI: false,
  },

  // Supported Assets
  supportedAssets: [
    'BTC (Bitcoin) - primary focus',
    'Limited altcoins via partner exchanges',
  ],

  // Escrow System
  escrowSystem: {
    multisig: {
      description: '2-of-2 multisig escrow',
      parties: ['Buyer', 'Seller'],
      security: 'Funds locked in multisig until trade completion',
    },
    trustMinimized: {
      description: 'No third party involvement',
      arbitration: 'No arbitration system - disputes handled by courts if needed',
      security: 'Cryptographic security through multisig',
    },
  },

  // Trading Features
  tradingFeatures: [
    'Non-custodial P2P trading',
    'Multisig escrow protection',
    'Fiat payment methods',
    'Price protection guarantees',
    'Volume-based fee discounts',
    'Advanced trading interface',
  ],

  // Payment Methods
  paymentMethods: [
    'Bank Transfer',
    'Cash by Mail',
    'Money Orders',
    'Wire Transfer',
    'PayPal (limited)',
    'Cash App',
    'Venmo',
    'Revolut',
    'Wise',
    'SEPA',
    'SWIFT',
  ],

  // Integration via Trading Bot API
  integrationExample: `
// HODL HODL Trading Bot Integration
// Limited API access for automated trading

interface HodlHodlOffer {
  id: string;
  type: 'buy' | 'sell';
  asset_code: string;
  fiat_currency_code: string;
  price: number;
  min_amount: number;
  max_amount: number;
  payment_method: string;
  trader: {
    login: string;
    rating: number;
    trades_count: number;
  };
}

// Trading Bot API (Limited Access)
// Note: HODL HODL has restricted API access for security

class HodlHodlBot {
  private apiKey: string;
  private baseUrl = 'https://hodlhodl.com/api/v1';

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  // Get available offers
  async getOffers(options: {
    asset?: string;
    fiat?: string;
    type?: 'buy' | 'sell';
    paymentMethod?: string;
  } = {}): Promise<HodlHodlOffer[]> {
    const params = new URLSearchParams();

    if (options.asset) params.append('asset', options.asset);
    if (options.fiat) params.append('fiat', options.fiat);
    if (options.type) params.append('type', options.type);
    if (options.paymentMethod) params.append('payment_method', options.paymentMethod);

    const url = \`\${this.baseUrl}/offers?\${params}\`;

    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': \`Bearer \${this.apiKey}\`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const data = await response.json();
      return data.offers || [];
    } catch (error) {
      console.error('Failed to fetch offers:', error);
      return [];
    }
  }

  // Get specific offer details
  async getOffer(offerId: string): Promise<HodlHodlOffer | null> {
    try {
      const response = await fetch(\`\${this.baseUrl}/offers/\${offerId}\`, {
        headers: {
          'Authorization': \`Bearer \${this.apiKey}\`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        if (response.status === 404) return null;
        throw new Error(\`HTTP \${response.status}: \${response.statusText}\`);
      }

      const data = await response.json();
      return data.offer;
    } catch (error) {
      console.error('Failed to fetch offer:', error);
      return null;
    }
  }

  // Monitor BTC offers and calculate average price
  async monitorBTCOffers(): Promise<void> {
    console.log('Monitoring HODL HODL BTC offers...');

    setInterval(async () => {
      try {
        // Get BTC buy and sell offers
        const [buyOffers, sellOffers] = await Promise.all([
          this.getOffers({ asset: 'BTC', type: 'buy' }),
          this.getOffers({ asset: 'BTC', type: 'sell' })
        ]);

        if (buyOffers.length > 0 && sellOffers.length > 0) {
          // Calculate average prices
          const avgBuyPrice = buyOffers.reduce((sum, offer) => sum + offer.price, 0) / buyOffers.length;
          const avgSellPrice = sellOffers.reduce((sum, offer) => sum + offer.price, 0) / sellOffers.length;
          const spread = ((avgSellPrice - avgBuyPrice) / avgBuyPrice) * 100;

          console.log(\`HODL HODL BTC Prices:\`);
          console.log(\`  Average Buy: $\${avgBuyPrice.toFixed(2)}\`);
          console.log(\`  Average Sell: $\${avgSellPrice.toFixed(2)}\`);
          console.log(\`  Spread: \${spread.toFixed(2)}%\`);
          console.log(\`  Active Offers: \${buyOffers.length + sellOffers.length}\`);
        }
      } catch (error) {
        console.error('Price monitoring error:', error);
      }
    }, 60000); // Update every minute
  }

  // Get trader statistics
  async getTraderStats(traderLogin: string): Promise<any> {
    try {
      const response = await fetch(\`\${this.baseUrl}/users/\${traderLogin}/stats\`, {
        headers: {
          'Authorization': \`Bearer \${this.apiKey}\`,
          'Content-Type': 'application/json'
        }
      });

      const data = await response.json();
      return data.stats;
    } catch (error) {
      console.error('Failed to fetch trader stats:', error);
      return null;
    }
  }
}

// Usage Example
async function hodlHodlExample() {
  // Note: Requires API key from HODL HODL
  const bot = new HodlHodlBot('your-api-key-here');

  try {
    // Get current BTC offers
    const btcOffers = await bot.getOffers({
      asset: 'BTC',
      fiat: 'USD'
    });

    console.log(\`Found \${btcOffers.length} BTC offers\`);

    // Monitor prices
    await bot.monitorBTCOffers();

  } catch (error) {
    console.error('HODL HODL integration error:', error);
  }
}
window.HodlHodlBot = HodlHodlBot;
`,

  // Data Sources
  dataSources: [
    {
      name: 'HODL HODL API',
      type: 'REST API',
      description: 'Limited API access for trading bots and market data',
      access: 'Requires API key, restricted access',
    },
    {
      name: 'HODL HODL Website',
      type: 'Web Interface',
      description: 'Main platform for P2P trading with escrow',
      access: 'Direct web access, no API key required',
    },
  ],

  // Security Features
  securityFeatures: [
    'Multisig escrow (2-of-2)',
    'No platform custody of funds',
    'Price protection guarantees',
    'Trader reputation system',
    'Volume-based discounts',
    'Secure payment methods',
  ],

  // Important Notes
  notes: [
    'True non-custodial P2P exchange',
    'Uses 2-of-2 multisig escrow (buyer + seller)',
    'No arbitration system - disputes handled legally',
    'Bitcoin-focused trading platform',
    'Supports various fiat payment methods',
    'Limited API access for security',
    'Community-driven platform',
    'No KYC requirements',
    'Focus on privacy and security',
  ],
};

export default hodlHodl;
