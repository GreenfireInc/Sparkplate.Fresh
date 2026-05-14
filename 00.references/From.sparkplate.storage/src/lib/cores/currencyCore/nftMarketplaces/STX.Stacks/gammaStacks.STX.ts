// Gamma Stacks Marketplace Information
// Primary NFT marketplace on Stacks blockchain
// Source: Research compiled from multiple sources

export interface GammaStacksListing {
  tokenId: string;
  contractAddress: string;
  name: string;
  description?: string;
  collection?: string;
  creator: string;
  owner: string;
  price?: number;
  currency: string;
  imageUrl?: string;
  metadataUrl?: string;
  listedAt?: string;
  properties?: Record<string, any>;
}

export interface GammaStacksCollection {
  contractAddress: string;
  name: string;
  description?: string;
  creator: string;
  totalSupply: number;
  floorPrice?: number;
  totalVolume?: number;
  imageUrl?: string;
  verified: boolean;
}

export interface GammaStacksPricing {
  tokenId: string;
  contractAddress: string;
  currentPrice?: number;
  floorPrice?: number;
  averagePrice?: number;
  currency: string;
  priceHistory?: Array<{
    price: number;
    timestamp: string;
  }>;
  volume24h?: number;
  volume7d?: number;
  volume30d?: number;
}

export interface GammaStacksMetrics {
  contractAddress: string;
  totalVolume: number;
  floorPrice: number;
  averagePrice: number;
  salesCount: number;
  uniqueOwners: number;
  marketCap?: number;
  priceChange24h?: number;
  priceChange7d?: number;
  priceChange30d?: number;
  volumeChange24h?: number;
  volumeChange7d?: number;
  volumeChange30d?: number;
}

export const gammaStacksMarketplace = {
  name: "Gamma",
  blockchain: "Stacks",
  type: "NFT Marketplace",
  description: "Primary NFT marketplace on Stacks blockchain. Features SIP-009 NFT trading, collections, and marketplace tools integrated with Stacks ecosystem and Bitcoin anchoring.",
  
  urls: {
    main: "https://gamma.io/",
    app: "https://gamma.io/",
    docs: "https://docs.gamma.io/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.gamma.io/v1/stacks/",
      stacks: "https://api.gamma.io/v1/stacks/",
      base: "https://api.gamma.io/v1/stacks/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{contractAddress}/{tokenId}/price",
      getCollectionFloorPrice: "GET /collections/{contractAddress}/floor-price",
      getPriceHistory: "GET /nft/{contractAddress}/{tokenId}/price-history",
      getMarketStats: "GET /market/stats",
    },
    listings: {
      getListings: "GET /listings",
      getListingById: "GET /listings/{listingId}",
      getListingsByCollection: "GET /collections/{contractAddress}/listings",
      getListingsByOwner: "GET /accounts/{address}/listings",
    },
    collections: {
      getCollections: "GET /collections",
      getCollectionById: "GET /collections/{contractAddress}",
      getCollectionStats: "GET /collections/{contractAddress}/stats",
      searchCollections: "GET /collections/search",
    },
    nfts: {
      getNFT: "GET /nft/{contractAddress}/{tokenId}",
      getNFTsByCollection: "GET /collections/{contractAddress}/nfts",
      getNFTsByOwner: "GET /accounts/{address}/nfts",
      searchNFTs: "GET /nfts/search",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{contractAddress}/metrics",
      getMarketTrends: "GET /metrics/trends",
    },
    documentation: "https://docs.gamma.io/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://gamma.io/api",
    },
  },
  
  sdk: {
    npm: {
      package: "@stacks/transactions",
      version: "latest",
      installCommand: "npm install @stacks/transactions",
      github: "https://github.com/stacks-network/stacks.js",
      npmLink: "https://www.npmjs.com/package/@stacks/transactions",
    },
    documentation: "https://docs.gamma.io/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Stacks wallet integration",
      "Bitcoin anchoring",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.gamma.io/v1/stacks/nft/\${contractAddress}/\${tokenId}/price\`);
  const pricing: GammaStacksPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(contractAddress: string) {
  const response = await fetch(\`https://api.gamma.io/v1/stacks/collections/\${contractAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.gamma.io/v1/stacks/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}

// Using Stacks SDK
import { makeContractCall, broadcastTransaction } from '@stacks/transactions';
import { StacksMainnet } from '@stacks/network';

const network = new StacksMainnet();
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/gamma_io",
    discord: "https://discord.gg/gamma",
    telegram: null,
    medium: "https://medium.com/@gamma",
    github: "https://github.com/gamma-io",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    stacksWalletIntegration: true,
    bitcoinAnchoring: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
    ],
  },
  
  notes: [
    "Primary NFT marketplace for Stacks blockchain",
    "Uses SIP-009 (Stacks NFT standard)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Integrated with Stacks wallets (Leather, Xverse)",
    "Transactions anchored to Bitcoin",
  ],
};

export default gammaStacksMarketplace;

