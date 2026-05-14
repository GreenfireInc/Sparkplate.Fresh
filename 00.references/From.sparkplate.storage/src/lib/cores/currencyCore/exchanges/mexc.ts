// MEXC Exchange API Integration
// Global cryptocurrency exchange

export interface MEXCConfig {
  apiKey?: string;
  apiSecret?: string;
  sandbox?: boolean;
  baseUrl?: string;
}

export class MEXCExchangeClass {
  private config: MEXCConfig;
  private baseUrl: string;

  constructor(config: MEXCConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api.mexc.com';
  }

  // Basic Information
  static readonly info = {
    name: 'MEXC',
    country: 'Seychelles',
    founded: 2018,
    website: 'https://www.mexc.com/',
    apiDocs: 'https://mexcdevelop.github.io/apidocs/spot_v3_en/',
    status: 'Active',
    tradingPairs: '1000+',
    volume24h: '$300M+',
    features: ['Spot Trading', 'Futures Trading', 'Margin Trading'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/MEXC_Global',
    telegram: 'https://t.me/MEXC_Global',
    discord: 'https://discord.gg/mexc',
    reddit: 'https://www.reddit.com/r/MEXC/',
    youtube: 'https://www.youtube.com/mexc',
    facebook: 'https://www.facebook.com/MEXCGlobal',
    linkedin: 'https://www.linkedin.com/company/mexc',
  };

  /**
   * Make public request to MEXC API
   */
  private async makePublicRequest(endpoint: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error(`MEXC API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get server time
   */
  async getServerTime(): Promise<any> {
    return this.makePublicRequest('/api/v3/time');
  }

  /**
   * Get exchange info
   */
  async getExchangeInfo(): Promise<any> {
    return this.makePublicRequest('/api/v3/exchangeInfo');
  }

  /**
   * Get ticker price
   */
  async getTickerPrice(symbol?: string): Promise<any> {
    const endpoint = symbol ? `/api/v3/ticker/price?symbol=${symbol}` : '/api/v3/ticker/price';
    return this.makePublicRequest(endpoint);
  }

  /**
   * Get 24hr ticker
   */
  async get24hrTicker(symbol?: string): Promise<any> {
    const endpoint = symbol ? `/api/v3/ticker/24hr?symbol=${symbol}` : '/api/v3/ticker/24hr';
    return this.makePublicRequest(endpoint);
  }

  /**
   * Get order book
   */
  async getOrderBook(symbol: string, limit?: number): Promise<any> {
    const endpoint = limit ? `/api/v3/depth?symbol=${symbol}&limit=${limit}` : `/api/v3/depth?symbol=${symbol}`;
    return this.makePublicRequest(endpoint);
  }

  /**
   * Get recent trades
   */
  async getRecentTrades(symbol: string, limit?: number): Promise<any> {
    const endpoint = limit ? `/api/v3/trades?symbol=${symbol}&limit=${limit}` : `/api/v3/trades?symbol=${symbol}`;
    return this.makePublicRequest(endpoint);
  }

  /**
   * Get klines
   */
  async getKlines(symbol: string, interval: string, limit?: number): Promise<any> {
    const endpoint = limit ? `/api/v3/klines?symbol=${symbol}&interval=${interval}&limit=${limit}` : `/api/v3/klines?symbol=${symbol}&interval=${interval}`;
    return this.makePublicRequest(endpoint);
  }

  /**
   * Get price for a specific symbol
   */
  async getPrice(symbol: string): Promise<number> {
    const ticker = await this.getTickerPrice(symbol);
    return parseFloat(ticker.price);
  }

  /**
   * Get 24hr price change
   */
  async get24hrChange(symbol: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const ticker = await this.get24hrTicker(symbol);
    const currentPrice = parseFloat(ticker.lastPrice);
    const openPrice = parseFloat(ticker.openPrice);
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
  async getVolume(symbol: string): Promise<{ volume: number; quoteVolume: number }> {
    const ticker = await this.get24hrTicker(symbol);
    return {
      volume: parseFloat(ticker.volume),
      quoteVolume: parseFloat(ticker.quoteVolume),
    };
  }
}

// Static methods for quick access
export const MEXCExchange = {
  async getTickerPrice(symbol?: string): Promise<any> {
    const instance = new MEXCExchangeClass();
    return instance.getTickerPrice(symbol);
  },

  async get24hrTicker(symbol?: string): Promise<any> {
    const instance = new MEXCExchangeClass();
    return instance.get24hrTicker(symbol);
  },

  async getOrderBook(symbol: string, limit?: number): Promise<any> {
    const instance = new MEXCExchangeClass();
    return instance.getOrderBook(symbol, limit);
  },

  async getRecentTrades(symbol: string, limit?: number): Promise<any> {
    const instance = new MEXCExchangeClass();
    return instance.getRecentTrades(symbol, limit);
  },

  async getKlines(symbol: string, interval: string, limit?: number): Promise<any> {
    const instance = new MEXCExchangeClass();
    return instance.getKlines(symbol, interval, limit);
  },

  async getPrice(symbol: string): Promise<number> {
    const instance = new MEXCExchangeClass();
    return instance.getPrice(symbol);
  },

  async get24hrChange(symbol: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const instance = new MEXCExchangeClass();
    return instance.get24hrChange(symbol);
  },

  async getVolume(symbol: string): Promise<{ volume: number; quoteVolume: number }> {
    const instance = new MEXCExchangeClass();
    return instance.getVolume(symbol);
  },

  async getServerTime(): Promise<any> {
    const instance = new MEXCExchangeClass();
    return instance.getServerTime();
  },

  async getExchangeInfo(): Promise<any> {
    const instance = new MEXCExchangeClass();
    return instance.getExchangeInfo();
  },

  info: MEXCExchangeClass.info,
  socialMedia: MEXCExchangeClass.socialMedia,
};

export default MEXCExchange;
