// Zora Marketplace Information
// NFT marketplace on Ethereum
// Source: Research compiled from multiple sources

export interface ZoraListing {
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

export interface ZoraCollection {
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

export interface ZoraPricing {
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

export const zoraMarketplace = {
  name: "Zora",
  blockchain: "Ethereum",
  type: "NFT Marketplace & Protocol",
  description: "NFT marketplace and protocol on Ethereum. Open protocol for NFTs with creator-friendly tools, on-chain metadata, and decentralized marketplace infrastructure.",
  
  urls: {
    main: "https://zora.co/",
    app: "https://zora.co/",
    docs: "https://docs.zora.co/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.zora.co/v1/",
      graphql: "https://api.zora.co/graphql",
      base: "https://api.zora.co/v1/",
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
    protocol: {
      getProtocolData: "GET /protocol/data",
      getOnChainMetadata: "GET /nft/{contractAddress}/{tokenId}/metadata",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume",
      getTradingStats: "GET /metrics/trading",
      getCollectionMetrics: "GET /collections/{contractAddress}/metrics",
    },
    documentation: "https://docs.zora.co/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://zora.co/api",
    },
  },
  
  sdk: {
    npm: {
      package: "@zoralabs/nft-hooks",
      version: "latest",
      installCommand: "npm install @zoralabs/nft-hooks",
      github: "https://github.com/ourzora/nft-hooks",
      npmLink: "https://www.npmjs.com/package/@zoralabs/nft-hooks",
    },
    documentation: "https://docs.zora.co/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "On-chain metadata",
      "Creator tools",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.zora.co/v1/nft/\${contractAddress}/\${tokenId}/price\`);
  const pricing: ZoraPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(contractAddress: string) {
  const response = await fetch(\`https://api.zora.co/v1/collections/\${contractAddress}/floor-price\`);
  const data = await response.json();
  return data.floorPrice;
}

// Get on-chain metadata
async function getOnChainMetadata(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.zora.co/v1/nft/\${contractAddress}/\${tokenId}/metadata\`);
  const metadata = await response.json();
  return metadata;
}

// Using Zora SDK
import { useNFT } from '@zoralabs/nft-hooks';

const { data, error } = useNFT(contractAddress, tokenId);
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/zora",
    discord: "https://discord.gg/zora",
    telegram: null,
    medium: "https://medium.com/@zora",
    github: "https://github.com/ourzora",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    onChainMetadata: true,
    creatorTools: true,
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
    "NFT marketplace and protocol on Ethereum",
    "Uses ERC-721 and ERC-1155 standards",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Open protocol with on-chain metadata",
    "Creator-friendly tools and infrastructure",
  ],
};

export default zoraMarketplace;

