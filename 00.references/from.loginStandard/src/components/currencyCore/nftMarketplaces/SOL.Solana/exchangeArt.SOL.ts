// Exchange Art Marketplace Information
// NFT marketplace on Solana blockchain
// Source: Research compiled from multiple sources

export interface ExchangeArtListing {
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

export interface ExchangeArtCollection {
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

export interface ExchangeArtPricing {
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

export const exchangeArtMarketplace = {
  name: "Exchange Art",
  blockchain: "Solana",
  type: "NFT Marketplace",
  description: "NFT marketplace on Solana blockchain. Features Metaplex NFT trading, collections, and marketplace tools with focus on digital art.",
  
  urls: {
    main: "https://exchange.art/",
    app: "https://exchange.art/",
    docs: "https://docs.exchange.art/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.exchange.art/v1/",
      base: "https://api.exchange.art/v1/",
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
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{symbol}/metrics",
    },
    documentation: "https://docs.exchange.art/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://exchange.art/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.exchange.art/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Digital art focus",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(tokenMint: string) {
  const response = await fetch(\`https://api.exchange.art/v1/nft/\${tokenMint}/price\`);
  const pricing: ExchangeArtPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(symbol: string) {
  const response = await fetch(\`https://api.exchange.art/v1/collections/\${symbol}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.exchange.art/v1/tokens/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/exchange_art",
    discord: "https://discord.gg/exchangeart",
    telegram: null,
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
    digitalArtFocus: true,
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
    "Focus on digital art and collectibles",
  ],
};

export default exchangeArtMarketplace;

