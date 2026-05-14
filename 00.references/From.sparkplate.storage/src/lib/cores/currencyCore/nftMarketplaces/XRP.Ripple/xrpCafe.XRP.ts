// XRP Cafe Marketplace Information
// Primary NFT marketplace on XRP Ledger blockchain
// Source: Research compiled from multiple sources

export interface XRPCafeListing {
  nftId: string;
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

export interface XRPCafeCollection {
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

export interface XRPCafePricing {
  nftId: string;
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

export interface XRPCafeMetrics {
  collectionId: string;
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

export const xrpCafeMarketplace = {
  name: "XRP Cafe",
  blockchain: "XRP Ledger",
  type: "NFT Marketplace",
  description: "Primary NFT marketplace on XRP Ledger blockchain. Features XLS-20 NFT trading, collections, and marketplace tools integrated with XRP Ledger ecosystem.",
  
  urls: {
    main: "https://xrp.cafe/",
    app: "https://xrp.cafe/",
    docs: "https://docs.xrp.cafe/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.xrp.cafe/v1/xrpl/",
      xrpl: "https://api.xrp.cafe/v1/xrpl/",
      base: "https://api.xrp.cafe/v1/xrpl/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{nftId}/price",
      getCollectionFloorPrice: "GET /collections/{collectionId}/floor-price",
      getPriceHistory: "GET /nft/{nftId}/price-history",
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
      getNFT: "GET /nft/{nftId}",
      getNFTsByCollection: "GET /collections/{collectionId}/nfts",
      getNFTsByOwner: "GET /accounts/{address}/nfts",
      searchNFTs: "GET /nfts/search",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{collectionId}/metrics",
      getMarketTrends: "GET /metrics/trends",
    },
    documentation: "https://docs.xrp.cafe/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://xrp.cafe/api",
    },
  },
  
  sdk: {
    npm: {
      package: "xrpl",
      version: "latest",
      installCommand: "npm install xrpl",
      github: "https://github.com/XRPLF/xrpl.js",
      npmLink: "https://www.npmjs.com/package/xrpl",
    },
    documentation: "https://docs.xrp.cafe/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Xumm wallet integration",
      "XRP Ledger DEX integration",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(nftId: string) {
  const response = await fetch(\`https://api.xrp.cafe/v1/xrpl/nft/\${nftId}/price\`);
  const pricing: XRPCafePricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionId: string) {
  const response = await fetch(\`https://api.xrp.cafe/v1/xrpl/collections/\${collectionId}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.xrp.cafe/v1/xrpl/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}

// Using XRPL SDK
import { Client, Wallet } from 'xrpl';

const client = new Client('wss://xrplcluster.com');
await client.connect();
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/xrpcafe",
    discord: "https://discord.gg/xrpcafe",
    telegram: "https://t.me/xrpcafe",
    medium: null,
    github: "https://github.com/xrpcafe",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    xummWalletIntegration: true,
    xrplDEXIntegration: true,
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
    "Primary NFT marketplace for XRP Ledger blockchain",
    "Uses XLS-20 (native NFT standard on XRP Ledger)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Integrated with Xumm wallet",
    "Uses nftId for NFT identification",
    "XRP Ledger DEX integration for trading",
  ],
};

export default xrpCafeMarketplace;

