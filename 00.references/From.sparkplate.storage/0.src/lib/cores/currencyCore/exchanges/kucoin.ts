// KuCoin Exchange API Integration
// Global cryptocurrency exchange

export interface KucoinConfig {
  apiKey?: string;
  apiSecret?: string;
  passphrase?: string;
  sandbox?: boolean;
  baseUrl?: string;
}

export class KucoinExchangeClass {
  private config: KucoinConfig;
  private baseUrl: string;

  constructor(config: KucoinConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api.kucoin.com';
  }

  // Basic Information
  static readonly info = {
    name: 'KuCoin',
    country: 'Seychelles',
    founded: 2017,
    website: 'https://www.kucoin.com/',
    apiDocs: 'https://docs.kucoin.com/',
    status: 'Active',
    tradingPairs: '700+',
    volume24h: '$500M+',
    features: ['Spot Trading', 'Futures Trading', 'Margin Trading', 'Lending', 'Staking'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/kucoincom',
    telegram: 'https://t.me/Kucoin_Exchange',
    discord: 'https://discord.gg/kucoin',
    reddit: 'https://www.reddit.com/r/kucoin/',
    youtube: 'https://www.youtube.com/kucoin',
    facebook: 'https://www.facebook.com/kucoinexchange',
    linkedin: 'https://www.linkedin.com/company/kucoin',
  };

  /**
   * Make public request to KuCoin API
   */
  private async makePublicRequest(endpoint: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error(`KuCoin API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.code !== '200000') {
      throw new Error(`KuCoin API error: ${result.msg}`);
    }

    return result.data;
  }

  /**
   * Get server time
   */
  async getServerTime(): Promise<any> {
    return this.makePublicRequest('/api/v1/timestamp');
  }

  /**
   * Get symbols
   */
  async getSymbols(): Promise<any> {
    return this.makePublicRequest('/api/v1/symbols');
  }

  /**
   * Get currencies
   */
  async getCurrencies(): Promise<any> {
    return this.makePublicRequest('/api/v1/currencies');
  }

  /**
   * Get ticker
   */
  async getTicker(symbol?: string): Promise<any> {
    const endpoint = symbol ? `/api/v1/market/orderbook/level1?symbol=${symbol}` : '/api/v1/market/allTickers';
    return this.makePublicRequest(endpoint);
  }

  /**
   * Get 24hr stats
   */
  async get24hrStats(symbol?: string): Promise<any> {
    const endpoint = symbol ? `/api/v1/market/stats?symbol=${symbol}` : '/api/v1/market/allTickers';
    return this.makePublicRequest(endpoint);
  }

  /**
   * Get order book
   */
  async getOrderBook(symbol: string): Promise<any> {
    return this.makePublicRequest(`/api/v1/market/orderbook/level2_100?symbol=${symbol}`);
  }

  /**
   * Get trade histories
   */
  async getTradeHistories(symbol: string): Promise<any> {
    return this.makePublicRequest(`/api/v1/market/histories?symbol=${symbol}`);
  }

  /**
   * Get klines
   */
  async getKlines(symbol: string, type: string = '1min', startAt?: number, endAt?: number): Promise<any> {
    const params = new URLSearchParams();
    params.append('symbol', symbol);
    params.append('type', type);
    if (startAt) params.append('startAt', startAt.toString());
    if (endAt) params.append('endAt', endAt.toString());
    
    return this.makePublicRequest(`/api/v1/market/candles?${params.toString()}`);
  }

  /**
   * Get price for a specific symbol
   */
  async getPrice(symbol: string): Promise<number> {
    const ticker = await this.getTicker(symbol);
    return parseFloat(ticker.price);
  }

  /**
   * Get 24hr price change
   */
  async get24hrChange(symbol: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const stats = await this.get24hrStats(symbol);
    const currentPrice = parseFloat(stats.last);
    const openPrice = parseFloat(stats.open);
    const priceChange = currentPrice - openPrice;
    const priceChangePercent = (priceChange / openPrice) * 100;

    return {
      priceChange,
      priceChangePercent,
    };
  }

  /**
   * Get trading volume
   */
  async getVolume(symbol: string): Promise<{ volume: number; turnover: number }> {
    const stats = await this.get24hrStats(symbol);
    return {
      volume: parseFloat(stats.vol),
      turnover: parseFloat(stats.volValue),
    };
  }
}

// Static methods for quick access
export const KucoinExchange = {
  async getTicker(symbol?: string): Promise<any> {
    const instance = new KucoinExchangeClass();
    return instance.getTicker(symbol);
  },

  async get24hrStats(symbol?: string): Promise<any> {
    const instance = new KucoinExchangeClass();
    return instance.get24hrStats(symbol);
  },

  async getOrderBook(symbol: string): Promise<any> {
    const instance = new KucoinExchangeClass();
    return instance.getOrderBook(symbol);
  },

  async getTradeHistories(symbol: string): Promise<any> {
    const instance = new KucoinExchangeClass();
    return instance.getTradeHistories(symbol);
  },

  async getKlines(symbol: string, type: string = '1min', startAt?: number, endAt?: number): Promise<any> {
    const instance = new KucoinExchangeClass();
    return instance.getKlines(symbol, type, startAt, endAt);
  },

  async getPrice(symbol: string): Promise<number> {
    const instance = new KucoinExchangeClass();
    return instance.getPrice(symbol);
  },

  async get24hrChange(symbol: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const instance = new KucoinExchangeClass();
    return instance.get24hrChange(symbol);
  },

  async getVolume(symbol: string): Promise<{ volume: number; turnover: number }> {
    const instance = new KucoinExchangeClass();
    return instance.getVolume(symbol);
  },

  async getServerTime(): Promise<any> {
    const instance = new KucoinExchangeClass();
    return instance.getServerTime();
  },

  async getSymbols(): Promise<any> {
    const instance = new KucoinExchangeClass();
    return instance.getSymbols();
  },

  async getCurrencies(): Promise<any> {
    const instance = new KucoinExchangeClass();
    return instance.getCurrencies();
  },

  info: KucoinExchangeClass.info,
  socialMedia: KucoinExchangeClass.socialMedia,
};

export default KucoinExchange;
