// Objkt Marketplace Information
// Primary NFT marketplace on Tezos blockchain
// Source: Research compiled from multiple sources

export interface ObjktListing {
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

export interface ObjktCollection {
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

export interface ObjktPricing {
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

export interface ObjktMetrics {
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

export const objktMarketplace = {
  name: "Objkt",
  blockchain: "Tezos",
  type: "NFT Marketplace",
  description: "Primary NFT marketplace on Tezos blockchain. Features FA2 (TZIP-12) NFT trading, collections, and marketplace tools integrated with Tezos ecosystem.",
  
  urls: {
    main: "https://objkt.com/",
    app: "https://objkt.com/",
    docs: "https://docs.objkt.com/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.objkt.com/v2/",
      tezos: "https://api.objkt.com/v2/",
      base: "https://api.objkt.com/v2/",
    },
    pricing: {
      getNFTPrice: "GET /tokens/{contractAddress}/{tokenId}/price",
      getCollectionFloorPrice: "GET /collections/{contractAddress}/floor-price",
      getPriceHistory: "GET /tokens/{contractAddress}/{tokenId}/price-history",
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
      getNFT: "GET /tokens/{contractAddress}/{tokenId}",
      getNFTsByCollection: "GET /collections/{contractAddress}/tokens",
      getNFTsByOwner: "GET /accounts/{address}/tokens",
      searchNFTs: "GET /tokens/search",
    },
    events: {
      getEvents: "GET /events",
      getNFTEvents: "GET /tokens/{contractAddress}/{tokenId}/events",
      getCollectionEvents: "GET /collections/{contractAddress}/events",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{contractAddress}/metrics",
      getMarketTrends: "GET /metrics/trends",
    },
    documentation: "https://docs.objkt.com/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://objkt.com/api",
    },
  },
  
  sdk: {
    npm: {
      package: "@taquito/taquito",
      version: "latest",
      installCommand: "npm install @taquito/taquito",
      github: "https://github.com/ecadlabs/taquito",
      npmLink: "https://www.npmjs.com/package/@taquito/taquito",
    },
    documentation: "https://docs.objkt.com/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Temple wallet integration",
      "Event tracking",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.objkt.com/v2/tokens/\${contractAddress}/\${tokenId}/price\`);
  const pricing: ObjktPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(contractAddress: string) {
  const response = await fetch(\`https://api.objkt.com/v2/collections/\${contractAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.objkt.com/v2/tokens/search?q=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.tokens;
}

// Using Taquito SDK
import { TezosToolkit } from '@taquito/taquito';

const tezos = new TezosToolkit('https://mainnet.api.tez.ie');
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/objktcom",
    discord: "https://discord.gg/objkt",
    telegram: "https://t.me/objkt",
    medium: "https://medium.com/@objkt",
    github: "https://github.com/objkt",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    templeWalletIntegration: true,
    eventTracking: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "Event tracking",
    ],
  },
  
  notes: [
    "Primary NFT marketplace for Tezos blockchain",
    "Uses FA2 (TZIP-12 multi-asset standard)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Integrated with Temple wallet",
    "Uses contractAddress and tokenId for NFT identification",
  ],
};

export default objktMarketplace;

