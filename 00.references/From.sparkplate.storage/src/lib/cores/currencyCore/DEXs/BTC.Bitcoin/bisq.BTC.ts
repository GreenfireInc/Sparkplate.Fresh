/**
 * Bisq - Peer-to-Peer Decentralized Exchange
 *
 * Decentralized bitcoin exchange that operates without any central authority
 * Peer-to-peer trading platform with multisig escrow and arbitration system
 *
 * @type P2P Decentralized Exchange
 * @custody Non-custodial
 */

export const bisq = {
  name: 'Bisq',
  type: 'P2P Decentralized Exchange',

  // Platform URLs
  website: 'https://bisq.network/',
  app: 'https://bisq.network/downloads/',
  docs: 'https://bisq.network/docs/',

  // Social Media
  social: {
    twitter: 'https://twitter.com/bisq_network',
    reddit: 'https://reddit.com/r/bisq',
    github: 'https://github.com/bisq-network',
    telegram: 'https://t.me/bisq_network',
    matrix: 'https://matrix.to/#/#bisq:matrix.org',
  },

  // Features
  features: {
    p2p: true,
    decentralized: true,
    nonCustodial: true,
    multisigEscrow: true,
    arbitration: true,
    noKYC: true,
    privacy: true,
    crossChain: false,
    subgraph: false,
    officialSDK: false,
    restAPI: false,
  },

  // Supported Assets
  supportedAssets: [
    'BTC (Bitcoin)',
    'Other cryptocurrencies via cross-chain atomic swaps',
  ],

  // Architecture
  architecture: {
    multisigEscrow: {
      description: '2-of-3 multisig escrow system',
      parties: ['Buyer', 'Seller', 'Arbitrator'],
      security: 'Funds locked until trade completion or arbitration',
    },
    arbitration: {
      description: 'Community-based arbitration system',
      mediators: 'Trained community mediators',
      resolution: 'Fair dispute resolution process',
    },
    reputation: {
      description: 'Built-in reputation system',
      accounts: 'Account age and trade history',
      security: 'Identifies reliable trading partners',
    },
  },

  // Trading Features
  tradingFeatures: [
    'Direct P2P trading',
    'No exchange fees',
    'Built-in dispute resolution',
    'Multi-language support',
    'Community governance',
    'Privacy protection',
  ],

  // Integration via Bisq Daemon
  integrationExample: `
// Bisq Daemon Integration (Advanced)
// Bisq provides a daemon for programmatic access
// Requires running Bisq daemon locally

import { spawn } from 'child_process';

interface BisqOffer {
  id: string;
  direction: 'BUY' | 'SELL';
  currencyCode: string;
  amount: number;
  minAmount: number;
  price: number;
  paymentMethod: string;
}

// Start Bisq daemon (requires Bisq installation)
async function startBisqDaemon(): Promise<void> {
  return new Promise((resolve, reject) => {
    const daemon = spawn('bisq-daemon', ['--apiPort=9998', '--apiPassword=password'], {
      stdio: 'inherit'
    });

    daemon.on('error', (error) => {
      console.error('Failed to start Bisq daemon:', error);
      reject(error);
    });

    daemon.on('close', (code) => {
      console.log(\`Bisq daemon exited with code \${code}\`);
    });

    // Wait for daemon to be ready
    setTimeout(() => {
      console.log('Bisq daemon started');
      resolve();
    }, 5000);
  });
}

// Get market offers via daemon API
async function getBisqOffers(): Promise<BisqOffer[]> {
  try {
    const response = await fetch('http://localhost:9998/api/v1/offers', {
      headers: {
        'Authorization': 'Basic ' + btoa('bisq:password')
      }
    });

    const data = await response.json();
    return data.offers || [];
  } catch (error) {
    console.error('Failed to fetch Bisq offers:', error);
    return [];
  }
}

// Create a trading offer
async function createBisqOffer(offerData: {
  direction: 'BUY' | 'SELL';
  currencyCode: string;
  amount: number;
  minAmount: number;
  price: number;
  paymentMethod: string;
}): Promise<any> {
  try {
    const response = await fetch('http://localhost:9998/api/v1/offers', {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa('bisq:password'),
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(offerData)
    });

    const result = await response.json();
    console.log('Offer created:', result);
    return result;
  } catch (error) {
    console.error('Failed to create offer:', error);
    throw error;
  }
}

// Monitor market prices
async function monitorBisqPrices(): Promise<void> {
  console.log('Monitoring Bisq BTC prices...');

  setInterval(async () => {
    try {
      const offers = await getBisqOffers();

      // Filter BTC offers
      const btcOffers = offers.filter(offer =>
        offer.currencyCode === 'BTC' || offer.currencyCode === 'XBT'
      );

      if (btcOffers.length > 0) {
        // Calculate average price
        const totalPrice = btcOffers.reduce((sum, offer) => sum + offer.price, 0);
        const averagePrice = totalPrice / btcOffers.length;

        console.log(\`Bisq BTC Average Price: $\${averagePrice.toFixed(2)}\`);
        console.log(\`Active BTC offers: \${btcOffers.length}\`);
      }
    } catch (error) {
      console.error('Price monitoring error:', error);
    }
  }, 30000); // Update every 30 seconds
}

// Usage
async function main() {
  try {
    // Start daemon (requires Bisq to be installed)
    await startBisqDaemon();

    // Monitor prices
    await monitorBisqPrices();

  } catch (error) {
    console.error('Bisq integration error:', error);
  }
}

// Note: This requires running Bisq locally
// For production use, consider using public Bisq nodes
`,

  // Data Sources
  dataSources: [
    {
      name: 'Bisq Daemon API',
      type: 'Local REST API',
      description: 'Run Bisq daemon locally for programmatic access to offers and trades',
      setup: 'Requires Bisq desktop application installation',
    },
    {
      name: 'Bisq Network',
      type: 'P2P Network',
      description: 'Decentralized P2P network for trading offers and escrow',
      access: 'Via Bisq application or daemon',
    },
    {
      name: 'Bisq Price Node',
      type: 'Public API',
      url: 'https://price.bisq.network/',
      description: 'Public price feed for market data',
    },
  ],

  // Network Requirements
  networkRequirements: {
    description: 'Bisq requires Bitcoin node or trusted third party for verification',
    options: [
      'Run local Bitcoin node',
      'Use trusted third party service',
      'Use Bisq\'s built-in price feed',
    ],
  },

  // Important Notes
  notes: [
    'Bisq is a desktop application, not web-based',
    'Requires Bitcoin node or trusted third party for verification',
    'Trades use 2-of-3 multisig escrow',
    'Community-based arbitration system',
    'No KYC or account registration required',
    'Supports multiple payment methods',
    'Privacy-focused with Tor integration',
    'Community governed through DAO',
  ],
};

export default bisq;
