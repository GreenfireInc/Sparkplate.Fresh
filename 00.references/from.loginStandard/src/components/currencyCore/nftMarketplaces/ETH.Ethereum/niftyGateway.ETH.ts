// Nifty Gateway Marketplace Information
// Curated NFT marketplace on Ethereum
// Source: Research compiled from multiple sources

export interface NiftyGatewayListing {
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

export interface NiftyGatewayCollection {
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

export interface NiftyGatewayPricing {
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

export const niftyGatewayMarketplace = {
  name: "Nifty Gateway",
  blockchain: "Ethereum",
  type: "Curated NFT Marketplace",
  description: "Premier curated NFT marketplace offering drops from established artists, fiat onramps, custodial wallets, and secondary trading.",
  
  urls: {
    main: "https://niftygateway.com/",
    app: "https://niftygateway.com/",
    docs: "https://docs.niftygateway.com/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://api.niftygateway.com/v1/",
      base: "https://api.niftygateway.com/v1/",
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
    documentation: "https://docs.niftygateway.com/api",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: true,
    authentication: {
      type: "API Key required",
      headerName: "X-API-Key",
      getApiKey: "https://niftygateway.com/account/api",
    },
  },
  
  sdk: {
    npm: null,
    documentation: "https://docs.niftygateway.com/developers",
    typescriptSupport: true,
    features: [
      "Curated drops",
      "Fiat onramps",
      "Custodial wallets",
      "Secondary marketplace",
      "Analytics dashboards",
      "Installment plans",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch Nifty Gateway NFT pricing data (requires API key)
async function getNiftyGatewayPricing(contractAddress: string, tokenId: string, apiKey: string) {
  const response = await fetch(\`https://api.niftygateway.com/v1/nft/\${contractAddress}/\${tokenId}/price\`, {
    headers: { 'X-API-Key': apiKey }
  });
  const pricing: NiftyGatewayPricing = await response.json();
  return pricing;
}

// Get collection floor price (requires API key)
async function getNiftyGatewayCollectionFloor(contractAddress: string, apiKey: string) {
  const response = await fetch(\`https://api.niftygateway.com/v1/collections/\${contractAddress}/floor-price\`, {
    headers: { 'X-API-Key': apiKey }
  });
  const data = await response.json();
  return data.floorPrice;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/niftygateway",
    discord: "https://discord.gg/niftygateway",
    telegram: null,
    medium: "https://medium.com/nifty-gateway",
    github: null,
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    curatedDrops: true,
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
    "Premier curated platform with fiat payments and custodial options",
    "Requires API key for developer access",
    "Integrates with major drops and secondary trading",
  ],
};

export default niftyGatewayMarketplace;
