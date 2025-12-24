// Efinity Marketplace Information
// NFT marketplace on Efinity parachain
// Source: Research compiled from multiple sources

export interface EfinityListing {
  nftId: string;
  collectionId: string;
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

export interface EfinityCollection {
  collectionId: string;
  name: string;
  description?: string;
  creator: string;
  totalSupply: number;
  floorPrice?: number;
  totalVolume?: number;
  imageUrl?: string;
  verified: boolean;
}

export interface EfinityPricing {
  nftId: string;
  collectionId: string;
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

export const efinityMarketplace = {
  name: "Efinity",
  blockchain: "Polkadot",
  type: "NFT Parachain Marketplace",
  description: "NFT marketplace on Efinity parachain. Features gasless transactions, cross-chain NFT transfers, and scalable NFT infrastructure.",
  
  urls: {
    main: "https://efinity.io/",
    app: "https://efinity.io/marketplace",
    docs: "https://docs.efinity.io/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.efinity.io/v1/",
      base: "https://api.efinity.io/v1/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{collectionId}/{nftId}/price",
      getCollectionFloorPrice: "GET /collections/{collectionId}/floor-price",
      getPriceHistory: "GET /nft/{collectionId}/{nftId}/price-history",
      getMarketStats: "GET /market/stats",
    },
    listings: {
      getListings: "GET /listings",
      getListingById: "GET /listings/{listingId}",
      getListingsByCollection: "GET /collections/{collectionId}/listings",
      getListingsByOwner: "GET /accounts/{address}/listings",
    },
    collections: {
      getCollections: "GET /collections",
      getCollectionById: "GET /collections/{collectionId}",
      getCollectionStats: "GET /collections/{collectionId}/stats",
      searchCollections: "GET /collections/search",
    },
    nfts: {
      getNFT: "GET /nft/{collectionId}/{nftId}",
      getNFTsByCollection: "GET /collections/{collectionId}/nfts",
      getNFTsByOwner: "GET /accounts/{address}/nfts",
      searchNFTs: "GET /nfts/search",
    },
    efinity: {
      getCrossChainNFTs: "GET /nft/{collectionId}/{nftId}/cross-chain",
      getGaslessTransactions: "GET /transactions/gasless",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{collectionId}/metrics",
    },
    documentation: "https://docs.efinity.io/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://efinity.io/api",
    },
  },
  
  sdk: {
    npm: {
      package: "@enjin/efinity-sdk",
      version: "latest",
      installCommand: "npm install @enjin/efinity-sdk",
      github: "https://github.com/enjin/efinity",
      npmLink: "https://www.npmjs.com/package/@enjin/efinity-sdk",
    },
    documentation: "https://docs.efinity.io/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Gasless transactions",
      "Cross-chain transfers",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(collectionId: string, nftId: string) {
  const response = await fetch(\`https://api.efinity.io/v1/nft/\${collectionId}/\${nftId}/price\`);
  const pricing: EfinityPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionId: string) {
  const response = await fetch(\`https://api.efinity.io/v1/collections/\${collectionId}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.efinity.io/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}

// Using Efinity SDK
import { EfinitySDK } from '@enjin/efinity-sdk';

const sdk = new EfinitySDK({
  apiEndpoint: 'https://api.efinity.io/v1/',
});
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/efinityio",
    discord: "https://discord.gg/efinity",
    telegram: "https://t.me/efinityio",
    medium: "https://medium.com/@efinity",
    github: "https://github.com/enjin/efinity",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    gaslessTransactions: true,
    crossChainTransfers: true,
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
    "NFT marketplace on Efinity parachain",
    "Gasless transaction support",
    "Cross-chain NFT transfer capabilities",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Scalable NFT infrastructure",
    "Cross-chain support via XCM",
  ],
};

export default efinityMarketplace;

