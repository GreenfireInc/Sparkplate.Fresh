// Kalamint Marketplace Information
// NFT marketplace on Tezos blockchain
// Source: Research compiled from multiple sources

export interface KalamintListing {
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
  properties?: Record<string, unknown>;
}

export interface KalamintCollection {
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

export interface KalamintPricing {
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

export const kalamintMarketplace = {
  name: "Kalamint",
  blockchain: "Tezos",
  type: "NFT Marketplace",
  description: "Community-driven NFT marketplace on Tezos featuring curated drops, auctions, and artist onboarding with FA2 token support.",
  
  urls: {
    main: "https://kalamint.io/",
    app: "https://kalamint.io/",
    docs: "https://docs.kalamint.io/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.kalamint.io/v1/",
      base: "https://api.kalamint.io/v1/",
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
    },
    documentation: "https://docs.kalamint.io/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://kalamint.io/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.kalamint.io/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "Curated drops",
      "Auction support",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch Kalamint NFT pricing data
async function getKalamintNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.kalamint.io/v1/nft/\${contractAddress}/\${tokenId}/price\`);
  const pricing: KalamintPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getKalamintCollectionFloor(contractAddress: string) {
  const response = await fetch(\`https://api.kalamint.io/v1/collections/\${contractAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchKalamintNFTs(keyword: string) {
  const response = await fetch(\`https://api.kalamint.io/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/kalamint_io",
    discord: "https://discord.gg/kalamint",
    telegram: "https://t.me/kalamint",
    medium: "https://medium.com/kalamint",
    github: null,
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    curatedDrops: true,
    auctions: true,
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
    "One of the earliest NFT marketplaces on Tezos",
    "Focuses on curated drops and artist onboarding",
    "Supports FA2-compliant NFTs and auctions",
  ],
};

export default kalamintMarketplace;
