// Binance NFT Marketplace Information
// Primary NFT marketplace on Binance Smart Chain
// Source: Research compiled from multiple sources

export interface BinanceNFTListing {
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

export interface BinanceNFTCollection {
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

export interface BinanceNFTPricing {
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

export interface BinanceNFTMetrics {
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

export const binanceNFTMarketplace = {
  name: "Binance NFT Marketplace",
  blockchain: "BNB Smart Chain",
  type: "NFT Marketplace",
  description: "Primary NFT marketplace on Binance Smart Chain. Official Binance NFT platform offering curated collections, mystery boxes, and NFT trading with BNB and other supported tokens.",
  
  urls: {
    main: "https://www.binance.com/en/nft/home",
    app: "https://www.binance.com/en/nft/home",
    docs: "https://developers.binance.com/en/nft",
  },
  
  api: {
    endpoints: {
      mainnet: "https://www.binance.com/bapi/nft/v1/",
      api: "https://www.binance.com/bapi/nft/v1/",
      base: "https://www.binance.com/bapi/nft/v1/",
    },
    pricing: {
      getNFTPrice: "GET /friendly/nft/nft-product-detail?productId={productId}",
      getCollectionFloorPrice: "GET /friendly/nft/nft-product-list?nftType=1&orderBy=amount_sort&orderType=asc",
      getPriceHistory: "GET /friendly/nft/nft-product-detail?productId={productId}",
      getMarketStats: "GET /friendly/nft/nft-market-stats",
    },
    listings: {
      getListings: "GET /friendly/nft/nft-product-list",
      getListingById: "GET /friendly/nft/nft-product-detail?productId={productId}",
      getListingsByCollection: "GET /friendly/nft/nft-product-list?nftType=1&collectionId={collectionId}",
      getListingsByOwner: "GET /friendly/nft/nft-product-list?owner={address}",
    },
    collections: {
      getCollections: "GET /friendly/nft/nft-collection-list",
      getCollectionById: "GET /friendly/nft/nft-collection-detail?collectionId={collectionId}",
      getCollectionStats: "GET /friendly/nft/nft-collection-stats?collectionId={collectionId}",
      searchCollections: "GET /friendly/nft/nft-collection-list?keyword={keyword}",
    },
    nfts: {
      getNFT: "GET /friendly/nft/nft-product-detail?productId={productId}",
      getNFTsByCollection: "GET /friendly/nft/nft-product-list?collectionId={collectionId}",
      getNFTsByOwner: "GET /friendly/nft/nft-product-list?owner={address}",
      searchNFTs: "GET /friendly/nft/nft-product-list?keyword={keyword}",
    },
    metrics: {
      getVolumeStats: "GET /friendly/nft/nft-market-stats",
      getTradingStats: "GET /friendly/nft/nft-trading-stats",
      getCollectionMetrics: "GET /friendly/nft/nft-collection-stats?collectionId={collectionId}",
      getMarketTrends: "GET /friendly/nft/nft-market-trends",
    },
    mysteryBoxes: {
      getMysteryBoxes: "GET /friendly/nft/mystery-box/list",
      getMysteryBoxDetail: "GET /friendly/nft/mystery-box/detail?productId={productId}",
    },
    documentation: "https://developers.binance.com/en/nft",
    rateLimit: "Rate limits apply (check documentation for current limits)",
    requiresApiKey: true,
    authentication: {
      type: "API Key required",
      headerName: "X-MBX-APIKEY",
      getApiKey: "https://www.binance.com/en/my/settings/api-management",
    },
  },
  
  sdk: {
    npm: {
      package: "binance-api-node",
      version: "latest",
      installCommand: "npm install binance-api-node",
      github: "https://github.com/binance/binance-api-nodejs",
      npmLink: "https://www.npmjs.com/package/binance-api-node",
    },
    documentation: "https://developers.binance.com/en/nft",
    typescriptSupport: true,
    features: [
      "Browse NFTs",
      "Search collections",
      "View pricing data",
      "Track floor prices",
      "View trading history",
      "Collection analytics",
      "Mystery boxes",
      "Curated collections",
    ],
  },
  
  integration: {
    exampleUsage: `
// Fetch NFT pricing data
async function getNFTPricing(productId: string) {
  const response = await fetch(\`https://www.binance.com/bapi/nft/v1/friendly/nft/nft-product-detail?productId=\${productId}\`, {
    headers: {
      'X-MBX-APIKEY': 'YOUR_API_KEY'
    }
  });
  const pricing: BinanceNFTPricing = await response.json();
  return pricing;
}

// Get collection floor price
async function getCollectionFloorPrice(collectionId: string) {
  const response = await fetch(\`https://www.binance.com/bapi/nft/v1/friendly/nft/nft-product-list?nftType=1&collectionId=\${collectionId}&orderBy=amount_sort&orderType=asc\`, {
    headers: {
      'X-MBX-APIKEY': 'YOUR_API_KEY'
    }
  });
  const data = await response.json();
  return data.data?.[0]?.amount;
}

// Search NFTs
async function searchNFTs(keyword: string) {
  const response = await fetch(\`https://www.binance.com/bapi/nft/v1/friendly/nft/nft-product-list?keyword=\${encodeURIComponent(keyword)}\`, {
    headers: {
      'X-MBX-APIKEY': 'YOUR_API_KEY'
    }
  });
  const data = await response.json();
  return data.data;
}

// Using Binance API SDK
import Binance from 'binance-api-node';

const client = Binance({
  apiKey: 'YOUR_API_KEY',
  apiSecret: 'YOUR_API_SECRET',
});
    `,
  },
  
  socialMedia: {
    twitter: "https://twitter.com/binance",
    discord: "https://discord.gg/binance",
    telegram: "https://t.me/binance",
    medium: "https://medium.com/@binance",
    github: "https://github.com/binance",
  },
  
  features: {
    buyNFTs: true,
    sellNFTs: true,
    createCollections: true,
    analytics: true,
    priceTracking: true,
    verifiedCollections: true,
    mysteryBoxes: true,
    curatedCollections: true,
    auctions: true,
  },
  
  metrics: {
    supported: true,
    endpoints: [
      "Volume statistics",
      "Trading statistics",
      "Collection metrics",
      "Price history",
      "Market trends",
      "Sales analytics",
      "Mystery box analytics",
    ],
  },
  
  notes: [
    "Primary NFT marketplace for Binance Smart Chain",
    "Official Binance NFT platform",
    "Uses BEP-721 (ERC-721 compatible) and BEP-1155 standards",
    "Requires API key for access",
    "Real-time pricing and market data",
    "Collection verification available",
    "Supports mystery boxes and curated collections",
    "Integrated with Binance exchange ecosystem",
  ],
};

export default binanceNFTMarketplace;

