// MonoNFT Marketplace Information
// NFT marketplace on Ethereum Classic
// Source: Research compiled from multiple sources

export interface MonoNFTListing {
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

export interface MonoNFTCollection {
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

export interface MonoNFTPricing {
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

export const mononftMarketplace = {
  name: "MonoNFT",
  blockchain: "Ethereum Classic",
  type: "NFT Marketplace",
  description: "Ethereum Classic native NFT marketplace focused on collectible drops, curated artists, and community governance with MONO token rewards.",
  
  urls: {
    main: "https://mononft.io/",
    app: "https://mononft.io/",
    docs: "https://docs.mononft.io/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.mononft.io/v1/",
      base: "https://api.mononft.io/v1/",
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
    documentation: "https://docs.mononft.io/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://mononft.io/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.mononft.io/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Launchpad drops",
      "MONO rewards",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.mononft.io/v1/nft/\${contractAddress}/\${tokenId}/price\`);
  const pricing: MonoNFTPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(contractAddress: string) {
  const response = await fetch(\`https://api.mononft.io/v1/collections/\${contractAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.mononft.io/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/mononft",
    discord: "https://discord.gg/mononft",
    telegram: "https://t.me/mononft",
    medium: "https://medium.com/@mononft",
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
    ],
  },
  
  notes: [
    "Native marketplace for Ethereum Classic community",
    "Supports BEP-721 compatible ERC-721 contracts ported to ETC",
    "Offers MONO staking rewards and governance",
  ],
};

export default mononftMarketplace;
