// OKX Exchange API Integration
// Major derivatives exchange

export interface OKXConfig {
  apiKey?: string;
  apiSecret?: string;
  passphrase?: string;
  sandbox?: boolean;
  baseUrl?: string;
}

export class OKXExchangeClass {
  private config: OKXConfig;
  private baseUrl: string;

  constructor(config: OKXConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://www.okx.com';
  }

  // Basic Information
  static readonly info = {
    name: 'OKX',
    country: 'Seychelles',
    founded: 2017,
    website: 'https://www.okx.com/',
    apiDocs: 'https://www.okx.com/docs-v5/en/',
    status: 'Active',
    tradingPairs: '300+',
    volume24h: '$2B+',
    features: ['Spot Trading', 'Futures Trading', 'Options', 'Margin Trading'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/okx',
    telegram: 'https://t.me/okx',
    discord: 'https://discord.gg/okx',
    reddit: 'https://www.reddit.com/r/okx/',
    youtube: 'https://www.youtube.com/okx',
    facebook: 'https://www.facebook.com/okx',
    linkedin: 'https://www.linkedin.com/company/okx',
  };

  /**
   * Make public request to OKX API
   */
  private async makePublicRequest(endpoint: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error(`OKX API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.code !== '0') {
      throw new Error(`OKX API error: ${result.msg}`);
    }

    return result.data;
  }

  /**
   * Get server time
   */
  async getServerTime(): Promise<any> {
    return this.makePublicRequest('/api/v5/public/time');
  }

  /**
   * Get instruments
   */
  async getInstruments(instType: string, uly?: string, instId?: string): Promise<any> {
    const params = new URLSearchParams();
    params.append('instType', instType);
    if (uly) params.append('uly', uly);
    if (instId) params.append('instId', instId);
    
    return this.makePublicRequest(`/api/v5/public/instruments?${params.toString()}`);
  }

  /**
   * Get ticker
   */
  async getTicker(instId?: string): Promise<any> {
    const endpoint = instId ? `/api/v5/market/ticker?instId=${instId}` : '/api/v5/market/tickers';
    return this.makePublicRequest(endpoint);
  }

  /**
   * Get order book
   */
  async getOrderBook(instId: string, sz?: number): Promise<any> {
    const params = new URLSearchParams();
    params.append('instId', instId);
    if (sz) params.append('sz', sz.toString());
    
    return this.makePublicRequest(`/api/v5/market/books?${params.toString()}`);
  }

  /**
   * Get trades
   */
  async getTrades(instId: string, limit?: number): Promise<any> {
    const params = new URLSearchParams();
    params.append('instId', instId);
    if (limit) params.append('limit', limit.toString());
    
    return this.makePublicRequest(`/api/v5/market/trades?${params.toString()}`);
  }

  /**
   * Get candles
   */
  async getCandles(instId: string, bar: string = '1m', limit?: number, before?: string, after?: string): Promise<any> {
    const params = new URLSearchParams();
    params.append('instId', instId);
    params.append('bar', bar);
    if (limit) params.append('limit', limit.toString());
    if (before) params.append('before', before);
    if (after) params.append('after', after);
    
    return this.makePublicRequest(`/api/v5/market/candles?${params.toString()}`);
  }

  /**
   * Get price for a specific instrument
   */
  async getPrice(instId: string): Promise<number> {
    const tickers = await this.getTicker(instId);
    const ticker = tickers[0];
    return parseFloat(ticker.last);
  }

  /**
   * Get 24hr price change
   */
  async get24hrChange(instId: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const tickers = await this.getTicker(instId);
    const ticker = tickers[0];
    const currentPrice = parseFloat(ticker.last);
    const openPrice = parseFloat(ticker.open);
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
  async getVolume(instId: string): Promise<{ volume: number; turnover: number }> {
    const tickers = await this.getTicker(instId);
    const ticker = tickers[0];
    return {
      volume: parseFloat(ticker.vol24h),
      turnover: parseFloat(ticker.volCcy24h),
    };
  }
}

// Static methods for quick access
export const OKXExchange = {
  async getTicker(instId?: string): Promise<any> {
    const instance = new OKXExchangeClass();
    return instance.getTicker(instId);
  },

  async getOrderBook(instId: string, sz?: number): Promise<any> {
    const instance = new OKXExchangeClass();
    return instance.getOrderBook(instId, sz);
  },

  async getTrades(instId: string, limit?: number): Promise<any> {
    const instance = new OKXExchangeClass();
    return instance.getTrades(instId, limit);
  },

  async getCandles(instId: string, bar: string = '1m', limit?: number, before?: string, after?: string): Promise<any> {
    const instance = new OKXExchangeClass();
    return instance.getCandles(instId, bar, limit, before, after);
  },

  async getPrice(instId: string): Promise<number> {
    const instance = new OKXExchangeClass();
    return instance.getPrice(instId);
  },

  async get24hrChange(instId: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const instance = new OKXExchangeClass();
    return instance.get24hrChange(instId);
  },

  async getVolume(instId: string): Promise<{ volume: number; turnover: number }> {
    const instance = new OKXExchangeClass();
    return instance.getVolume(instId);
  },

  async getServerTime(): Promise<any> {
    const instance = new OKXExchangeClass();
    return instance.getServerTime();
  },

  async getInstruments(instType: string, uly?: string, instId?: string): Promise<any> {
    const instance = new OKXExchangeClass();
    return instance.getInstruments(instType, uly, instId);
  },

  info: OKXExchangeClass.info,
  socialMedia: OKXExchangeClass.socialMedia,
};

export default OKXExchange;
