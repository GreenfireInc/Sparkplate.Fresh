// Hebe NFT Marketplace Information
// Primary NFT marketplace on Ethereum Classic
// Source: Research compiled from multiple sources

export interface HebeNFTListing {
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

export interface HebeNFTCollection {
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

export interface HebeNFTPricing {
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

export interface HebeNFTMetrics {
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

export const hebeNFTMarketplace = {
  name: "Hebe NFT Marketplace",
  blockchain: "Ethereum Classic",
  type: "NFT Marketplace",
  description: "Primary NFT marketplace on Ethereum Classic. Features ERC-721 and ERC-1155 NFT trading, collections, and marketplace tools integrated with HebeSwap DEX.",
  
  urls: {
    main: "https://nft.hebe.cc/",
    app: "https://nft.hebe.cc/",
    docs: "https://docs.hebe.cc/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.hebe.cc/v1/nft/",
      base: "https://api.hebe.cc/v1/nft/",
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
    documentation: "https://docs.hebe.cc/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://nft.hebe.cc/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.hebe.cc/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "DEX integration",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.hebe.cc/v1/nft/nft/\${contractAddress}/\${tokenId}/price\`);
  const pricing: HebeNFTPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(contractAddress: string) {
  const response = await fetch(\`https://api.hebe.cc/v1/nft/collections/\${contractAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.hebe.cc/v1/nft/nfts/search?keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}

// Using ethers.js for ETC network
import { ethers } from 'ethers';

const provider = new ethers.JsonRpcProvider('https://etc.etcdesktop.com');
const contract = new ethers.Contract(contractAddress, ERC721_ABI, provider);
const owner = await contract.ownerOf(tokenId);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/hebeswap",
    discord: "https://discord.gg/hebeswap",
    telegram: "https://t.me/hebeswap",
    medium: null,
    github: "https://github.com/hebeswap",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    dexIntegration: true,
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
    "Primary NFT marketplace for Ethereum Classic",
    "Uses ERC-721 and ERC-1155 standards (EVM-compatible)",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Integrated with HebeSwap DEX",
    "EVM-compatible with Ethereum tooling",
  ],
};

export default hebeNFTMarketplace;

