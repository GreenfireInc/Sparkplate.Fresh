// Upbit Exchange API Integration
// Korean cryptocurrency exchange

export interface UpbitConfig {
  apiKey?: string;
  apiSecret?: string;
  sandbox?: boolean;
  baseUrl?: string;
}

export class UpbitExchangeClass {
  private config: UpbitConfig;
  private baseUrl: string;

  constructor(config: UpbitConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api.upbit.com';
  }

  // Basic Information
  static readonly info = {
    name: 'Upbit',
    country: 'South Korea',
    founded: 2017,
    website: 'https://upbit.com/',
    apiDocs: 'https://docs.upbit.com/',
    status: 'Active',
    tradingPairs: '200+',
    volume24h: '$200M+',
    features: ['Spot Trading', 'KRW Trading', 'Korean Won Pairs'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/upbitglobal',
    telegram: 'https://t.me/upbit',
    youtube: 'https://www.youtube.com/upbit',
    facebook: 'https://www.facebook.com/upbit',
    linkedin: 'https://www.linkedin.com/company/upbit',
  };

  /**
   * Make public request to Upbit API
   */
  private async makePublicRequest(endpoint: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Upbit API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(`Upbit API error: ${result.error.message}`);
    }

    return result;
  }

  /**
   * Get market all
   */
  async getMarketAll(): Promise<any> {
    return this.makePublicRequest('/v1/market/all');
  }

  /**
   * Get candles
   */
  async getCandles(market: string, count?: number, to?: string): Promise<any> {
    const params = new URLSearchParams();
    params.append('market', market);
    if (count) params.append('count', count.toString());
    if (to) params.append('to', to);
    
    return this.makePublicRequest(`/v1/candles/minutes/1?${params.toString()}`);
  }

  /**
   * Get candles by time unit
   */
  async getCandlesByTimeUnit(market: string, unit: string, count?: number, to?: string): Promise<any> {
    const params = new URLSearchParams();
    params.append('market', market);
    params.append('unit', unit);
    if (count) params.append('count', count.toString());
    if (to) params.append('to', to);
    
    return this.makePublicRequest(`/v1/candles/minutes/${unit}?${params.toString()}`);
  }

  /**
   * Get ticker
   */
  async getTicker(markets?: string[]): Promise<any> {
    const endpoint = markets ? `/v1/ticker?markets=${markets.join(',')}` : '/v1/ticker';
    return this.makePublicRequest(endpoint);
  }

  /**
   * Get order book
   */
  async getOrderBook(markets: string[]): Promise<any> {
    return this.makePublicRequest(`/v1/orderbook?markets=${markets.join(',')}`);
  }

  /**
   * Get trades ticks
   */
  async getTradesTicks(market: string, count?: number, to?: string, cursor?: string): Promise<any> {
    const params = new URLSearchParams();
    params.append('market', market);
    if (count) params.append('count', count.toString());
    if (to) params.append('to', to);
    if (cursor) params.append('cursor', cursor);
    
    return this.makePublicRequest(`/v1/trades/ticks?${params.toString()}`);
  }

  /**
   * Get price for a specific market
   */
  async getPrice(market: string): Promise<number> {
    const tickers = await this.getTicker([market]);
    const ticker = tickers[0];
    return ticker.trade_price;
  }

  /**
   * Get 24hr price change
   */
  async get24hrChange(market: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const tickers = await this.getTicker([market]);
    const ticker = tickers[0];
    const currentPrice = ticker.trade_price;
    const openPrice = ticker.opening_price;
    const priceChange = currentPrice - openPrice;
    const priceChangePercent = ticker.signed_change_rate * 100;

    return {
      priceChange,
      priceChangePercent,
    };
  }

  /**
   * Get trading volume
   */
  async getVolume(market: string): Promise<{ volume: number; accTradeVolume24h: number }> {
    const tickers = await this.getTicker([market]);
    const ticker = tickers[0];
    return {
      volume: ticker.acc_trade_volume_24h,
      accTradeVolume24h: ticker.acc_trade_volume_24h,
    };
  }
}

// Static methods for quick access
export const UpbitExchange = {
  async getTicker(markets?: string[]): Promise<any> {
    const instance = new UpbitExchangeClass();
    return instance.getTicker(markets);
  },

  async getOrderBook(markets: string[]): Promise<any> {
    const instance = new UpbitExchangeClass();
    return instance.getOrderBook(markets);
  },

  async getTradesTicks(market: string, count?: number, to?: string, cursor?: string): Promise<any> {
    const instance = new UpbitExchangeClass();
    return instance.getTradesTicks(market, count, to, cursor);
  },

  async getCandles(market: string, count?: number, to?: string): Promise<any> {
    const instance = new UpbitExchangeClass();
    return instance.getCandles(market, count, to);
  },

  async getCandlesByTimeUnit(market: string, unit: string, count?: number, to?: string): Promise<any> {
    const instance = new UpbitExchangeClass();
    return instance.getCandlesByTimeUnit(market, unit, count, to);
  },

  async getPrice(market: string): Promise<number> {
    const instance = new UpbitExchangeClass();
    return instance.getPrice(market);
  },

  async get24hrChange(market: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const instance = new UpbitExchangeClass();
    return instance.get24hrChange(market);
  },

  async getVolume(market: string): Promise<{ volume: number; accTradeVolume24h: number }> {
    const instance = new UpbitExchangeClass();
    return instance.getVolume(market);
  },

  async getMarketAll(): Promise<any> {
    const instance = new UpbitExchangeClass();
    return instance.getMarketAll();
  },

  info: UpbitExchangeClass.info,
  socialMedia: UpbitExchangeClass.socialMedia,
};

export default UpbitExchange;
