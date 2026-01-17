// SolSea Marketplace Information
// NFT marketplace on Solana blockchain
// Source: Research compiled from multiple sources

export interface SolSeaListing {
  tokenMint: string;
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

export interface SolSeaCollection {
  symbol: string;
  name: string;
  description?: string;
  creator: string;
  totalSupply: number;
  floorPrice?: number;
  totalVolume?: number;
  imageUrl?: string;
  verified: boolean;
}

export interface SolSeaPricing {
  tokenMint: string;
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

export const solseaMarketplace = {
  name: "SolSea",
  blockchain: "Solana",
  type: "NFT Marketplace",
  description: "Established NFT marketplace on Solana offering creator tools, licensing options, launchpad drops, and analytics for SPL NFT collections.",
  
  urls: {
    main: "https://solsea.io/",
    app: "https://solsea.io/",
    docs: "https://docs.solsea.io/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.solsea.io/v1/",
      base: "https://api.solsea.io/v1/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{tokenMint}/price",
      getCollectionFloorPrice: "GET /collections/{symbol}/floor-price",
      getPriceHistory: "GET /nft/{tokenMint}/price-history",
      getMarketStats: "GET /market/stats",
    },
    listings: {
      getListings: "GET /listings",
      getListingById: "GET /listings/{listingId}",
      getListingsByCollection: "GET /collections/{symbol}/listings",
      getListingsByOwner: "GET /accounts/{address}/listings",
    },
    collections: {
      getCollections: "GET /collections",
      getCollectionById: "GET /collections/{symbol}",
      getCollectionStats: "GET /collections/{symbol}/stats",
      searchCollections: "GET /collections/search",
    },
    nfts: {
      getNFT: "GET /nft/{tokenMint}",
      getNFTsByCollection: "GET /collections/{symbol}/nfts",
      getNFTsByOwner: "GET /accounts/{address}/nfts",
      searchNFTs: "GET /nfts/search",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{symbol}/metrics",
    },
    documentation: "https://docs.solsea.io/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://solsea.io/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.solsea.io/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "Creator licensing options",
      "Launchpad drops",
      "Analytics dashboards",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch SolSea NFT pricing data
async function getSolSeaNFTPricing(tokenMint: string) {
  const response = await fetch(\`https://api.solsea.io/v1/nft/\${tokenMint}/price\`);
  const pricing: SolSeaPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getSolSeaCollectionFloor(symbol: string) {
  const response = await fetch(\`https://api.solsea.io/v1/collections/\${symbol}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchSolSeaNFTs(keyword: string) {
  const response = await fetch(\`https://api.solsea.io/v1/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/SolSeaNFT",
    discord: "https://discord.gg/solsea",
    telegram: null,
    medium: "https://medium.com/@solsea.io",
    github: null,
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    licensingTools: true,
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
    "Offers creator licensing options and verified collections",
    "Supports SPL token standard and Candy Machine drops",
    "Provides launchpad for curated projects and analytics tools",
  ],
};

export default solseaMarketplace;
