/**
 * BenSwap - Leading SmartBCH DEX
 * 
 * First decentralized exchange on Smart Bitcoin Cash (smartBCH) chain
 * Aims to be one of the leading DEXs on smartBCH as well as a one-stop 
 * service provider for all projects
 * 
 * @chain smartBCH (EVM-compatible sidechain, Chain ID 10000)
 * @type AMM DEX (Automated Market Maker)
 */

export const benSwap = {
  name: 'BenSwap',
  chain: 'smartBCH',
  type: 'AMM',
  
  // Platform URLs
  website: 'https://benswap.cash/',
  app: 'https://app.benswap.cash/',
  
  // Documentation
  docs: 'https://docs.benswap.cash/',
  apiDocs: 'https://docs.benswap.cash/features/api',
  github: 'https://github.com/BenTokenFinance/benswapbch-assets',
  
  // REST API Base URL
  apiBase: 'https://api.benswap.cash',
  
  // API Endpoints
  endpoints: {
    // Price Data
    bchPrice: '/api/bch/price',
    bchHistoryPrices: '/api/bch/historyPrices',
    smartBCHPrice: '/api/smartbch/price',
    
    // DEX Data
    dexStats: '/api/dex/stats',
    dexStatsBlock: '/api/dex/stats/{block}',
    allPairs: '/api/dex/pairs',
    pairData: '/api/dex/pair/{lpAddress}',
    pairDataBlock: '/api/dex/pair/{lpAddress}/{block}',
    allTokens: '/api/dex/tokens',
    tokenData: '/api/dex/token/{tokenAddress}',
    tokenDataBlock: '/api/dex/token/{tokenAddress}/{block}',
    
    // Trading Data (Candlestick/OHLCV)
    tradingData: '/api/dex/trade/{baseCurrency}/{range}/{tokenAddress}',
    tradingDataBefore: '/api/dex/trade/{baseCurrency}/{range}/{tokenAddress}/{before}',
    
    // Token Data (SEP-20)
    tokenBasics: '/api/sep20/tokenbasics/{tokenAddress}',
    tokenInfo: '/api/sep20/token/{tokenAddress}',
    tokenLiquidity: '/api/sep20/liquidity/{tokenAddress}',
  },
  
  // Trading Data Parameters
  tradingParams: {
    baseCurrency: ['bch', 'usd'],
    ranges: ['1min', '15mins', '1h', '1d', '1w'],
    maxRecords: 1000,
  },
  
  // Social Media
  social: {
    twitter: 'https://twitter.com/BenSwapDEX',
    telegram: 'https://t.me/benswap',
    discord: 'https://discord.gg/benswap',
    medium: 'https://medium.com/@benswap',
  },
  
  // Network Information
  network: {
    chainId: 10000,
    chainName: 'Smart Bitcoin Cash',
    nativeCurrency: {
      name: 'Bitcoin Cash',
      symbol: 'BCH',
      decimals: 18,
    },
    rpcUrls: [
      'https://smartbch.greyh.at',
      'https://smartbch.fountainhead.cash/mainnet',
    ],
    blockExplorerUrls: ['https://www.smartscan.cash/'],
  },
  
  // Tokens
  tokens: {
    EBEN: {
      address: '0x77CB87b57F54667978Eb1B199b28a0db8C8E1c0B',
      symbol: 'EBEN',
      decimals: 18,
      name: 'Green Ben',
    },
    WBCH: {
      address: '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04',
      symbol: 'WBCH',
      decimals: 18,
      name: 'Wrapped BCH',
    },
  },
  
  // Features
  features: {
    restAPI: true,
    swaps: true,
    liquidityPools: true,
    farming: true,
    staking: true,
    lottery: true,
    nftMarketplace: true,
    launchpad: true, // IAO - Initial Ape Offerings
    crossChain: false,
    subgraph: false,
    officialSDK: false,
  },
  
  // Integration Example (TypeScript)
  integrationExample: `
// BenSwap API Client for smartBCH
import fetch from 'node-fetch';

class BenSwapAPI {
  private baseUrl = 'https://api.benswap.cash';

  async getBCHPrice(): Promise<number> {
    const response = await fetch(\`\${this.baseUrl}/api/bch/price\`);
    const data = await response.json();
    return data.price;
  }

  async getBCHHistoricalPrices(): Promise<any[]> {
    const response = await fetch(\`\${this.baseUrl}/api/bch/historyPrices\`);
    return await response.json();
  }

  async getDEXStats(block?: number): Promise<any> {
    const url = block 
      ? \`\${this.baseUrl}/api/dex/stats/\${block}\`
      : \`\${this.baseUrl}/api/dex/stats\`;
    
    const response = await fetch(url);
    return await response.json();
  }

  async getAllPairs(): Promise<any[]> {
    const response = await fetch(\`\${this.baseUrl}/api/dex/pairs\`);
    return await response.json();
  }

  async getPairData(lpAddress: string, block?: number): Promise<any> {
    const url = block
      ? \`\${this.baseUrl}/api/dex/pair/\${lpAddress}/\${block}\`
      : \`\${this.baseUrl}/api/dex/pair/\${lpAddress}\`;
    
    const response = await fetch(url);
    return await response.json();
  }

  async getTokenData(tokenAddress: string, block?: number): Promise<any> {
    const url = block
      ? \`\${this.baseUrl}/api/dex/token/\${tokenAddress}/\${block}\`
      : \`\${this.baseUrl}/api/dex/token/\${tokenAddress}\`;
    
    const response = await fetch(url);
    return await response.json();
  }

  async getTradingData(
    baseCurrency: 'bch' | 'usd',
    range: '1min' | '15mins' | '1h' | '1d' | '1w',
    tokenAddress: string,
    before?: number
  ): Promise<any[]> {
    let url = \`\${this.baseUrl}/api/dex/trade/\${baseCurrency}/\${range}/\${tokenAddress}\`;
    
    if (before) {
      url += \`/\${before}\`;
    }
    
    const response = await fetch(url);
    return await response.json();
  }

  async getTokenLiquidity(tokenAddress: string): Promise<any> {
    const response = await fetch(
      \`\${this.baseUrl}/api/sep20/liquidity/\${tokenAddress}\`
    );
    return await response.json();
  }
}

// Usage
const api = new BenSwapAPI();

// Get BCH price
const bchPrice = await api.getBCHPrice();
console.log('BCH Price:', bchPrice);

// Get all trading pairs
const pairs = await api.getAllPairs();
console.log('Available pairs:', pairs.length);

// Get token trading data (1 hour candles)
const tokenAddress = '0x3743eC0673453E5009310C727Ba4eaF7b3a1cc04'; // WBCH
const tradingData = await api.getTradingData('usd', '1h', tokenAddress);
console.log('Trading data:', tradingData);
  `,
  
  // Important Notes
  notes: [
    'smartBCH is an EVM-compatible sidechain of Bitcoin Cash',
    'Chain ID: 10000 (mainnet)',
    'USD-based data missing before block 820000',
    'USD data distorted between May-September 2022 due to flexUSD de-pegging',
    'Always validate historical data carefully',
    'Uses standard Ethereum tooling (ethers.js, web3.js)',
    'SEP-20 tokens are ERC-20 compatible on smartBCH',
  ],
};

export default benSwap;
