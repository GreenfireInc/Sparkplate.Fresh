// OnePlanet Marketplace Information
// Multi-chain NFT marketplace originally on Terra, now cross-chain with Polygon support
// Source: Research compiled from multiple sources

export interface OnePlanetListing {
  tokenId: string;
  collectionAddress: string;
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
  properties?: Record<string, unknown>;
}

export interface OnePlanetCollection {
  collectionAddress: string;
  name: string;
  description?: string;
  creator: string;
  totalSupply: number;
  floorPrice?: number;
  totalVolume?: number;
  imageUrl?: string;
  verified: boolean;
}

export interface OnePlanetPricing {
  tokenId: string;
  collectionAddress: string;
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

export const onePlanetMarketplace = {
  name: "OnePlanet",
  blockchain: "Terra",
  type: "NFT Marketplace & Launchpad",
  description: "NFT marketplace and launchpad that originated on Terra and now operates cross-chain (Polygon) while continuing to support Terra-origin collections.",
  
  urls: {
    main: "https://oneplanetnft.io/",
    app: "https://oneplanetnft.io/",
    docs: "https://docs.oneplanetnft.io/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.oneplanetnft.io/v1/",
      base: "https://api.oneplanetnft.io/v1/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{collectionAddress}/{tokenId}/price",
      getCollectionFloorPrice: "GET /collections/{collectionAddress}/floor-price",
      getPriceHistory: "GET /nft/{collectionAddress}/{tokenId}/price-history",
      getMarketStats: "GET /market/stats",
    },
    listings: {
      getListings: "GET /listings",
      getListingById: "GET /listings/{listingId}",
      getListingsByCollection: "GET /collections/{collectionAddress}/listings",
      getListingsByOwner: "GET /accounts/{address}/listings",
    },
    collections: {
      getCollections: "GET /collections",
      getCollectionById: "GET /collections/{collectionAddress}",
      getCollectionStats: "GET /collections/{collectionAddress}/stats",
      searchCollections: "GET /collections/search",
    },
    nfts: {
      getNFT: "GET /nft/{collectionAddress}/{tokenId}",
      getNFTsByCollection: "GET /collections/{collectionAddress}/nfts",
      getNFTsByOwner: "GET /accounts/{address}/nfts",
      searchNFTs: "GET /nfts/search",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{collectionAddress}/metrics",
    },
    documentation: "https://docs.oneplanetnft.io/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://oneplanetnft.io/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.oneplanetnft.io/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "Launchpad participation",
      "Cross-chain support",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch OnePlanet NFT pricing data
async function getOnePlanetNFTPricing(collectionAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.oneplanetnft.io/v1/nft/\${collectionAddress}/\${tokenId}/price\`);
  const pricing: OnePlanetPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionAddress: string) {
  const response = await fetch(\`https://api.oneplanetnft.io/v1/collections/\${collectionAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchOnePlanetNFTs(keyword: string) {
  const response = await fetch(\`https://api.oneplanetnft.io/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/OnePlanet_NFT",
    discord: "https://discord.gg/oneplanetnft",
    telegram: null,
    medium: "https://medium.com/@OnePlanet_NFT",
    github: null,
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    launchpad: true,
    crossChainSupport: true,
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
    "Originated on Terra Classic, now operates primarily on Polygon",
    "Continues to support Terra-origin collections and community",
    "Provides launchpad and curation for NFT projects",
  ],
};

export default onePlanetMarketplace;
