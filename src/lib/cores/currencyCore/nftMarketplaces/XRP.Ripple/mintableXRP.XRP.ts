// Mintable XRPL Marketplace Information
// Multi-chain NFT marketplace with XRP Ledger support
// Source: Research compiled from multiple sources

export interface MintableXRPListing {
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

export interface MintableXRPCollection {
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

export interface MintableXRPPricing {
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

export const mintableXRPMarketplace = {
  name: "Mintable",
  blockchain: "XRP Ledger",
  type: "Multi-chain NFT Marketplace",
  description: "Utility-focused NFT marketplace offering cross-chain support including the XRP Ledger via ZUSE Labs integration, enabling low-cost minting and trading for XLS-20 NFTs.",
  
  urls: {
    main: "https://mintable.app/",
    app: "https://mintable.app/",
    docs: "https://docs.mintable.app/",
  },
  
  api: {
    endpoints: {
      xrpl: "https://xrpl-api.mintable.app/v1/",
      base: "https://api.mintable.app/v1/",
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
    documentation: "https://docs.mintable.app/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: true,
    authentication: {
      type: "API Key required",
      headerName: "X-API-Key",
      getApiKey: "https://mintable.app/account/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.mintable.app/developers",
    typescriptSupport: true,
    features: [
      "Cross-chain minting",
      "Creator storefronts",
      "Launchpad drops",
      "Analytics dashboards",
      "Token gating",
      "Fiat onramps",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch Mintable NFT pricing data on XRPL (requires API key)
async function getMintableXRPPricing(contractAddress: string, tokenId: string, apiKey: string) {
  const response = await fetch(\`https://xrpl-api.mintable.app/v1/nft/\${contractAddress}/\${tokenId}/price\`, {
    headers: { 'X-API-Key': apiKey }
  });
  const pricing: MintableXRPPricing = await response.json();
  return pricing;
}

// Get collection floor price (requires API key)
async function getMintableXRPCollectionFloor(contractAddress: string, apiKey: string) {
  const response = await fetch(\`https://xrpl-api.mintable.app/v1/collections/\${contractAddress}/floor-price\`, {
    headers: { 'X-API-Key': apiKey }
  });
  const data = await response.json();
  return data.floorPrice;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/mintable_app",
    discord: "https://discord.gg/mintable",
    telegram: null,
    medium: "https://medium.com/mintable-app",
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
    fiatSupport: true,
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
    "Supports XRP Ledger via ZUSE Labs integration",
    "Provides user-friendly minting and storefront tools",
    "Requires API key for developer access",
  ],
};

export default mintableXRPMarketplace;
