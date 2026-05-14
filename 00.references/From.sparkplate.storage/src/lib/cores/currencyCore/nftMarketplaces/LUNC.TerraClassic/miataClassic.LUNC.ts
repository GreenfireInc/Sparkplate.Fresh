// Miata Marketplace Information
// NFT marketplace on Terra Classic blockchain
// Source: Research compiled from multiple sources

export interface MiataClassicListing {
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

export interface MiataClassicCollection {
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

export interface MiataClassicPricing {
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

export interface MiataClassicMetrics {
  collectionAddress: string;
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

export const miataClassicMarketplace = {
  name: "Miata",
  blockchain: "Terra Classic",
  type: "NFT Marketplace",
  description: "Early NFT marketplace on Terra Classic offering minting, trading, and curated drops for CW721 NFTs across art, collectibles, and gaming projects.",
  
  urls: {
    main: "https://miata.io/",
    app: "https://miata.io/",
    docs: "https://docs.miata.io/",
  },
  
  api: {
    endpoints: {
      classic: "https://classic-api.miata.io/v1/",
      base: "https://api.miata.io/v1/",
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
      getHolderStats: "GET /metrics/holders",
    },
    documentation: "https://docs.miata.io/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://miata.io/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.miata.io/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Minting tools",
      "Launchpad drops",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data on Terra Classic
async function getMiataNFTPricing(collectionAddress: string, tokenId: string) {
  const response = await fetch(\`https://classic-api.miata.io/v1/nft/\${collectionAddress}/\${tokenId}/price\`);
  const pricing: MiataClassicPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getMiataCollectionFloor(collectionAddress: string) {
  const response = await fetch(\`https://classic-api.miata.io/v1/collections/\${collectionAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchMiataNFTs(keyword: string) {
  const response = await fetch(\`https://classic-api.miata.io/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/miata_io",
    discord: "https://discord.gg/miata",
    telegram: "https://t.me/miata_io",
    medium: null,
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
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "Holder metrics",
    ],
  },
  
  notes: [
    "Supports Terra Classic CW721 NFT standard",
    "Offers launchpad and featured drops for community collections",
    "Provides analytics dashboards for collectors and creators",
  ],
};

export default miataClassicMarketplace;
