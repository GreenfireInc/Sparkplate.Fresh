// Hadeswap Marketplace Information
// NFT marketplace on Solana blockchain
// Source: Research compiled from multiple sources

export interface HadeswapListing {
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
  properties?: Record<string, any>;
}

export interface HadeswapCollection {
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

export interface HadeswapPricing {
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

export const hadeswapMarketplace = {
  name: "Hadeswap",
  blockchain: "Solana",
  type: "NFT Marketplace",
  description: "NFT marketplace on Solana blockchain. Features Metaplex NFT trading with advanced features including bonding curves and liquidity pools.",
  
  urls: {
    main: "https://hadeswap.com/",
    app: "https://hadeswap.com/",
    docs: "https://docs.hadeswap.com/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.hadeswap.com/v1/",
      base: "https://api.hadeswap.com/v1/",
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
      getListingsByOwner: "GET /wallets/{address}/listings",
    },
    collections: {
      getCollections: "GET /collections",
      getCollectionById: "GET /collections/{symbol}",
      getCollectionStats: "GET /collections/{symbol}/stats",
      searchCollections: "GET /collections/search",
    },
    nfts: {
      getNFT: "GET /nft/{tokenMint}",
      getNFTsByCollection: "GET /collections/{symbol}/tokens",
      getNFTsByOwner: "GET /wallets/{address}/tokens",
      searchNFTs: "GET /tokens/search",
    },
    bonding: {
      getBondingCurves: "GET /bonding-curves",
      getBondingCurveById: "GET /bonding-curves/{curveId}",
      getLiquidityPools: "GET /liquidity-pools",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{symbol}/metrics",
    },
    documentation: "https://docs.hadeswap.com/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://hadeswap.com/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.hadeswap.com/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Bonding curves",
      "Liquidity pools",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(tokenMint: string) {
  const response = await fetch(\`https://api.hadeswap.com/v1/nft/\${tokenMint}/price\`);
  const pricing: HadeswapPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(symbol: string) {
  const response = await fetch(\`https://api.hadeswap.com/v1/collections/\${symbol}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Get bonding curves
async function getBondingCurves() {
  const response = await fetch(\`https://api.hadeswap.com/v1/bonding-curves\`);
  const curves = await response.json();
  return curves;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/hadeswap",
    discord: "https://discord.gg/hadeswap",
    telegram: null,
    medium: null,
    github: "https://github.com/hadeswap",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    bondingCurves: true,
    liquidityPools: true,
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
    "NFT marketplace on Solana blockchain",
    "Uses Metaplex NFT standard (SPL Token)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Advanced features: bonding curves and liquidity pools",
  ],
};

export default hadeswapMarketplace;

