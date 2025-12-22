// APENFT Marketplace Information
// Primary NFT marketplace on Tron blockchain
// Source: Research compiled from multiple sources

export interface APENFTListing {
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

export interface APENFTCollection {
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

export interface APENFTPricing {
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

export interface APENFTMetrics {
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

export const apenftMarketplace = {
  name: "APENFT",
  blockchain: "Tron",
  type: "NFT Marketplace",
  description: "Primary NFT marketplace on Tron blockchain. Features TRC-721 NFT trading, collections, and marketplace tools integrated with Tron ecosystem.",
  
  urls: {
    main: "https://apenft.io/",
    app: "https://apenft.io/",
    docs: "https://docs.apenft.io/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.apenft.io/v1/tron/",
      tron: "https://api.apenft.io/v1/tron/",
      base: "https://api.apenft.io/v1/tron/",
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
    staking: {
      getStakingInfo: "GET /staking/info",
      getStakingRewards: "GET /staking/rewards",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{contractAddress}/metrics",
      getMarketTrends: "GET /metrics/trends",
    },
    documentation: "https://docs.apenft.io/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://apenft.io/api",
    },
  },
  
  sdk: {
    npm: {
      package: "tronweb",
      version: "latest",
      installCommand: "npm install tronweb",
      github: "https://github.com/tronprotocol/tronweb",
      npmLink: "https://www.npmjs.com/package/tronweb",
    },
    documentation: "https://docs.apenft.io/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "TronLink integration",
      "Staking rewards",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.apenft.io/v1/tron/nft/\${contractAddress}/\${tokenId}/price\`);
  const pricing: APENFTPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(contractAddress: string) {
  const response = await fetch(\`https://api.apenft.io/v1/tron/collections/\${contractAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.apenft.io/v1/tron/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}

// Using TronWeb SDK
import TronWeb from 'tronweb';

const tronWeb = new TronWeb({
  fullHost: 'https://api.trongrid.io',
});
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/apenft",
    discord: "https://discord.gg/apenft",
    telegram: "https://t.me/apenft",
    medium: "https://medium.com/@apenft",
    github: "https://github.com/apenft",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    tronLinkIntegration: true,
    stakingRewards: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "Staking information",
    ],
  },
  
  notes: [
    "Primary NFT marketplace for Tron blockchain",
    "Uses TRC-721 (ERC-721 compatible)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Integrated with TronLink wallet",
    "Staking rewards for NFT holders",
  ],
};

export default apenftMarketplace;

