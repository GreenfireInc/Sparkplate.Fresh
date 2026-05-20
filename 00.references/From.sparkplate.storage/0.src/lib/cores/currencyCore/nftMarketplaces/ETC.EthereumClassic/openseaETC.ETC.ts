// OpenSea Ethereum Classic Marketplace Information
// NFT marketplace supporting Ethereum Classic network
// Source: Research compiled from multiple sources

export interface OpenSeaETCListing {
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

export interface OpenSeaETCCollection {
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

export interface OpenSeaETCPricing {
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

export const openseaETCMarketplace = {
  name: "OpenSea (Ethereum Classic)",
  blockchain: "Ethereum Classic",
  type: "Multi-Chain NFT Marketplace",
  description: "Multi-chain NFT marketplace supporting Ethereum Classic network. Features ERC-721 and ERC-1155 NFT trading with OpenSea's infrastructure.",
  
  urls: {
    main: "https://opensea.io/",
    app: "https://opensea.io/collection?chain=ethereum_classic",
    docs: "https://docs.opensea.io/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.opensea.io/api/v2/",
      etc: "https://api.opensea.io/api/v2/chain/ethereum_classic/",
      base: "https://api.opensea.io/api/v2/",
    },
    pricing: {
      getNFTPrice: "GET /chain/ethereum_classic/contract/{contractAddress}/nfts/{tokenId}/listings",
      getCollectionFloorPrice: "GET /chain/ethereum_classic/collection/{collectionSlug}/stats",
      getPriceHistory: "GET /chain/ethereum_classic/contract/{contractAddress}/nfts/{tokenId}/events",
      getMarketStats: "GET /chain/ethereum_classic/stats",
    },
    listings: {
      getListings: "GET /chain/ethereum_classic/listings",
      getListingById: "GET /chain/ethereum_classic/listings/{listingId}",
      getListingsByCollection: "GET /chain/ethereum_classic/collection/{collectionSlug}/listings",
      getListingsByOwner: "GET /chain/ethereum_classic/accounts/{address}/listings",
    },
    collections: {
      getCollections: "GET /chain/ethereum_classic/collections",
      getCollectionById: "GET /chain/ethereum_classic/collection/{collectionSlug}",
      getCollectionStats: "GET /chain/ethereum_classic/collection/{collectionSlug}/stats",
      searchCollections: "GET /chain/ethereum_classic/collections/search",
    },
    nfts: {
      getNFT: "GET /chain/ethereum_classic/contract/{contractAddress}/nfts/{tokenId}",
      getNFTsByCollection: "GET /chain/ethereum_classic/collection/{collectionSlug}/nfts",
      getNFTsByOwner: "GET /chain/ethereum_classic/accounts/{address}/nfts",
      searchNFTs: "GET /chain/ethereum_classic/nfts/search",
    },
    metrics: {
      getVolumeStats: "GET /chain/ethereum_classic/stats/volume",
      getTradingStats: "GET /chain/ethereum_classic/stats/trading",
      getCollectionMetrics: "GET /chain/ethereum_classic/collection/{collectionSlug}/metrics",
    },
    documentation: "https://docs.opensea.io/reference/overview",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: true,
    authentication: {
      type: "API Key required",
      headerName: "X-API-KEY",
      getApiKey: "https://opensea.io/account/api-keys",
    },
  },
  
  sdk: {
    npm: {
      package: "opensea-js",
      version: "latest",
      installCommand: "npm install opensea-js",
      github: "https://github.com/ProjectOpenSea/opensea-js",
      npmLink: "https://www.npmjs.com/package/opensea-js",
    },
    documentation: "https://docs.opensea.io/",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Multi-chain support",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://api.opensea.io/api/v2/chain/ethereum_classic/contract/\${contractAddress}/nfts/\${tokenId}/listings\`, {
    headers: {
      'X-API-KEY': 'YOUR_API_KEY'
    }
  });
  const pricing: OpenSeaETCPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionSlug: string) {
  const response = await fetch(\`https://api.opensea.io/api/v2/chain/ethereum_classic/collection/\${collectionSlug}/stats\`, {
    headers: {
      'X-API-KEY': 'YOUR_API_KEY'
    }
  });
  const data = await response.json();
  return data.stats?.floor_price;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://api.opensea.io/api/v2/chain/ethereum_classic/nfts/search?query=\${encodeURIComponent(keyword)}\`, {
    headers: {
      'X-API-KEY': 'YOUR_API_KEY'
    }
  });
  const data = await response.json();
  return data.nfts;
}

// Using OpenSea SDK
import { OpenSeaSDK, Network } from 'opensea-js';

const sdk = new OpenSeaSDK(provider, {
  chain: Network.EthereumClassic,
  apiKey: 'YOUR_API_KEY'
});
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/opensea",
    discord: "https://discord.gg/opensea",
    telegram: null,
    medium: "https://medium.com/@opensea",
    github: "https://github.com/ProjectOpenSea",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    multiChainSupport: true,
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
    "Multi-chain NFT marketplace supporting Ethereum Classic",
    "Uses ERC-721 and ERC-1155 standards (EVM-compatible)",
    "Requires API key for access",
    "Real-time pricing and market data",
    "Collection verification available",
    "EVM-compatible with Ethereum tooling",
    "Part of OpenSea's multi-chain infrastructure",
  ],
};

export default openseaETCMarketplace;

