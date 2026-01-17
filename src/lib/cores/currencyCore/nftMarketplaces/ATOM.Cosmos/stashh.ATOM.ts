// Stashh Marketplace Information
// Privacy-focused NFT marketplace on Secret Network (Cosmos ecosystem)
// Source: Research compiled from multiple sources

export interface StashhListing {
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

export interface StashhCollection {
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

export interface StashhPricing {
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

export interface StashhMetrics {
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

export const stashhMarketplace = {
  name: "Stashh",
  blockchain: "Cosmos (Secret Network)",
  type: "NFT Marketplace",
  description: "Privacy-first NFT marketplace built on Secret Network within the Cosmos ecosystem. Supports encrypted metadata, private ownership, and royalty-aware trading for Secret NFTs (SNIP-721).",
  
  urls: {
    main: "https://stashh.io/",
    app: "https://stashh.io/app",
    docs: "https://docs.stashh.io/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.stashh.io/v1/",
      secretRpc: "https://rpc.scrt.network/",
      secretRest: "https://lcd-secret.scrtlabs.com/",
      base: "https://api.stashh.io/",
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
    documentation: "https://docs.stashh.io/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://stashh.io/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.stashh.io/developers",
    typescriptSupport: true,
    features: [
      "Browse Secret NFTs",
      "Encrypted metadata support",
      "Private ownership transfers",
      "Track floor prices",
      "Collection analytics",
      "Royalty enforcement",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch Secret NFT pricing data
async function getSecretNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.stashh.io/v1/nft/\${contractAddress}/\${tokenId}/price\`);
  const pricing: StashhPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(contractAddress: string) {
  const response = await fetch(\`https://api.stashh.io/v1/collections/\${contractAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search Secret NFTs
async function searchSecretNFTs(keyword: string) {
  const response = await fetch(\`https://api.stashh.io/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/stashh_io",
    discord: "https://discord.gg/stashh",
    telegram: null,
    medium: "https://medium.com/@stashh",
    github: "https://github.com/stashh-io",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    privateMetadata: true,
    royaltyManagement: true,
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
    "Built on Secret Network (CosmWasm chain) enabling privacy-preserving NFTs",
    "Uses SNIP-721 standard with view keys for encrypted metadata",
    "Enforces creator royalties and supports private offers",
    "Integrates with Secret wallet ecosystem (Keplr, Leap, Fina)",
  ],
};

export default stashhMarketplace;
