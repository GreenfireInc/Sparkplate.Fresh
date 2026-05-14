// Refinable Marketplace Information
// NFT marketplace on BNB Smart Chain
// Source: Research compiled from multiple sources

export interface RefinableListing {
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

export interface RefinableCollection {
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

export interface RefinablePricing {
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

export const refinableMarketplace = {
  name: "Refinable",
  blockchain: "BNB Smart Chain",
  type: "NFT Marketplace",
  description: "NFT marketplace on BNB Smart Chain. Features NFT creation, trading, and marketplace tools for creators and collectors.",
  
  urls: {
    main: "https://refinable.com/",
    app: "https://app.refinable.com/",
    docs: "https://docs.refinable.com/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.refinable.com/v1/",
      bsc: "https://api.refinable.com/v1/bsc/",
      base: "https://api.refinable.com/v1/",
    },
    pricing: {
      getNFTPrice: "GET /nft/{contractAddress}/{tokenId}/price?chain=bsc",
      getCollectionFloorPrice: "GET /collection/{contractAddress}/floor-price?chain=bsc",
      getPriceHistory: "GET /nft/{contractAddress}/{tokenId}/price-history?chain=bsc",
      getMarketStats: "GET /market/stats?chain=bsc",
    },
    listings: {
      getListings: "GET /listings?chain=bsc",
      getListingById: "GET /listings/{listingId}",
      getListingsByCollection: "GET /collections/{contractAddress}/listings?chain=bsc",
      getListingsByOwner: "GET /accounts/{address}/listings?chain=bsc",
    },
    collections: {
      getCollections: "GET /collections?chain=bsc",
      getCollectionById: "GET /collections/{contractAddress}?chain=bsc",
      getCollectionStats: "GET /collections/{contractAddress}/stats?chain=bsc",
      searchCollections: "GET /collections/search?chain=bsc&keyword={keyword}",
    },
    nfts: {
      getNFT: "GET /nft/{contractAddress}/{tokenId}?chain=bsc",
      getNFTsByCollection: "GET /collections/{contractAddress}/nfts?chain=bsc",
      getNFTsByOwner: "GET /accounts/{address}/nfts?chain=bsc",
      searchNFTs: "GET /nfts/search?chain=bsc&keyword={keyword}",
    },
    metrics: {
      getVolumeStats: "GET /metrics/volume?chain=bsc",
      getTradingStats: "GET /metrics/trading?chain=bsc",
      getCollectionMetrics: "GET /collections/{contractAddress}/metrics?chain=bsc",
    },
    documentation: "https://docs.refinable.com/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: false,
    authentication: {
      type: "Optional API Key for higher limits",
      headerName: "X-API-Key",
      getApiKey: "https://refinable.com/api",
    },
  },
  
  sdk: {
    npm: {
      package: "@refinable/refinable-sdk",
      version: "latest",
      installCommand: "npm install @refinable/refinable-sdk",
      github: "https://github.com/refinable/refinable-sdk",
      npmLink: "https://www.npmjs.com/package/@refinable/refinable-sdk",
    },
    documentation: "https://docs.refinable.com/developers",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "NFT creation tools",
      "Marketplace tools",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.refinable.com/v1/nft/\${contractAddress}/\${tokenId}/price?chain=bsc\`);
  const pricing: RefinablePricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(contractAddress: string) {
  const response = await fetch(\`https://api.refinable.com/v1/collections/\${contractAddress}/floor-price?chain=bsc\`);
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.refinable.com/v1/nfts/search?chain=bsc&keyword=\${encodeURIComponent(keyword)}\`);
  const data = await response.json();
  return data.results;
}

// Using Refinable SDK
import { Refinable } from '@refinable/refinable-sdk';

const refinable = new Refinable({
  apiKey: 'YOUR_API_KEY',
  chainId: 56, // BSC mainnet
});
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/refinableapp",
    discord: "https://discord.gg/refinable",
    telegram: "https://t.me/refinable",
    medium: "https://medium.com/@refinable",
    github: "https://github.com/refinable",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    nftCreationTools: true,
    marketplaceTools: true,
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
    "NFT marketplace on BNB Smart Chain",
    "Uses BEP-721 (ERC-721 compatible) and BEP-1155 standards",
    "Free API access with optional API key for higher limits",
    "Real-time pricing and market data",
    "Collection verification available",
    "Creator tools and marketplace features",
    "SDK available for developers",
  ],
};

export default refinableMarketplace;

