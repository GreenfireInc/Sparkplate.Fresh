// OKX Tron Marketplace Information
// Multi-chain NFT marketplace supporting Tron network
// Source: Research compiled from multiple sources

export interface OKXTronListing {
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

export interface OKXTronCollection {
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

export interface OKXTronPricing {
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

export const okxTronMarketplace = {
  name: "OKX (Tron)",
  blockchain: "Tron",
  type: "Multi-Chain NFT Marketplace",
  description: "Multi-chain NFT marketplace supporting Tron network. Features TRC-721 NFT trading with OKX's infrastructure and multi-chain support.",
  
  urls: {
    main: "https://www.okx.com/",
    app: "https://www.okx.com/web3/marketplace/nft/tron",
    docs: "https://www.okx.com/web3/build/docs/",
  },
  
  api: {
    endpoints: {
      mainnet: "https://www.okx.com/api/v5/web3/nft/",
      tron: "https://www.okx.com/api/v5/web3/nft/tron/",
      base: "https://www.okx.com/api/v5/web3/nft/",
    },
    pricing: {
      getNFTPrice: "GET /tron/nft/{contractAddress}/{tokenId}/price",
      getCollectionFloorPrice: "GET /tron/collections/{contractAddress}/floor-price",
      getPriceHistory: "GET /tron/nft/{contractAddress}/{tokenId}/price-history",
      getMarketStats: "GET /tron/market/stats",
    },
    listings: {
      getListings: "GET /tron/listings",
      getListingById: "GET /tron/listings/{listingId}",
      getListingsByCollection: "GET /tron/collections/{contractAddress}/listings",
      getListingsByOwner: "GET /tron/accounts/{address}/listings",
    },
    collections: {
      getCollections: "GET /tron/collections",
      getCollectionById: "GET /tron/collections/{contractAddress}",
      getCollectionStats: "GET /tron/collections/{contractAddress}/stats",
      searchCollections: "GET /tron/collections/search",
    },
    nfts: {
      getNFT: "GET /tron/nft/{contractAddress}/{tokenId}",
      getNFTsByCollection: "GET /tron/collections/{contractAddress}/nfts",
      getNFTsByOwner: "GET /tron/accounts/{address}/nfts",
      searchNFTs: "GET /tron/nfts/search",
    },
    metrics: {
      getVolumeStats: "GET /tron/metrics/volume",
      getTradingStats: "GET /tron/metrics/trading",
      getCollectionMetrics: "GET /tron/collections/{contractAddress}/metrics",
    },
    documentation: "https://www.okx.com/web3/build/docs/api/",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: true,
    authentication: {
      type: "API Key required",
      headerName: "OK-ACCESS-KEY",
      getApiKey: "https://www.okx.com/account/api",
    },
  },
  
  sdk: {
    npm: {
      package: "okx-node",
      version: "latest",
      installCommand: "npm install okx-node",
      github: "https://github.com/okx/okx-node",
      npmLink: "https://www.npmjs.com/package/okx-node",
    },
    documentation: "https://www.okx.com/web3/build/docs/",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Multi-chain support",
      "Exchange integration",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(contractAddress: string, tokenId: string) {
  const response = await fetch(\`https://www.okx.com/api/v5/web3/nft/tron/nft/\${contractAddress}/\${tokenId}/price\`, {
    headers: {
      'OK-ACCESS-KEY': 'YOUR_API_KEY',
      'OK-ACCESS-SIGN': 'YOUR_SIGNATURE',
      'OK-ACCESS-TIMESTAMP': 'TIMESTAMP',
    }
  });
  const pricing: OKXTronPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(contractAddress: string) {
  const response = await fetch(\`https://www.okx.com/api/v5/web3/nft/tron/collections/\${contractAddress}/floor-price\`, {
    headers: {
      'OK-ACCESS-KEY': 'YOUR_API_KEY',
      'OK-ACCESS-SIGN': 'YOUR_SIGNATURE',
      'OK-ACCESS-TIMESTAMP': 'TIMESTAMP',
    }
  });
  const data = await response.json();
  return data.floorPrice;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://www.okx.com/api/v5/web3/nft/tron/nfts/search?keyword=\${encodeURIComponent(keyword)}\`, {
    headers: {
      'OK-ACCESS-KEY': 'YOUR_API_KEY',
      'OK-ACCESS-SIGN': 'YOUR_SIGNATURE',
      'OK-ACCESS-TIMESTAMP': 'TIMESTAMP',
    }
  });
  const data = await response.json();
  return data.results;
}
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/okx",
    discord: "https://discord.gg/okx",
    telegram: "https://t.me/okx_official",
    medium: "https://medium.com/@okx",
    github: "https://github.com/okx",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    multiChainSupport: true,
    exchangeIntegration: true,
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
    "Multi-chain NFT marketplace supporting Tron",
    "Uses TRC-721 (ERC-721 compatible)",
    "Requires API key for access",
    "Real-time pricing and market data",
    "Collection verification available",
    "Part of OKX exchange ecosystem",
    "Multi-chain support",
  ],
};

export default okxTronMarketplace;

