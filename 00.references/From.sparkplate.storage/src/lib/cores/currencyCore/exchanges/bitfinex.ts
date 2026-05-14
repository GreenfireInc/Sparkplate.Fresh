// Bitfinex Exchange API Integration
// Professional trading platform with advanced features

// Note: crypto import should be handled by the runtime environment
// For browser environments, use Web Crypto API or a crypto library like crypto-js

export interface BitfinexConfig {
  apiKey?: string;
  apiSecret?: string;
  sandbox?: boolean;
  baseUrl?: string;
}

export class BitfinexExchangeClass {
  private config: BitfinexConfig;
  private baseUrl: string;

  constructor(config: BitfinexConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api-pub.bitfinex.com';
  }

  // Basic Information
  static readonly info = {
    name: 'Bitfinex',
    country: 'British Virgin Islands',
    founded: 2012,
    website: 'https://www.bitfinex.com/',
    apiDocs: 'https://docs.bitfinex.com/',
    status: 'Active',
    tradingPairs: '200+',
    volume24h: '$300M+',
    features: ['Spot Trading', 'Margin Trading', 'Derivatives', 'Lending', 'Staking'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/bitfinex',
    telegram: 'https://t.me/bitfinex',
    reddit: 'https://www.reddit.com/r/bitfinex/',
    youtube: 'https://www.youtube.com/bitfinex',
    facebook: 'https://www.facebook.com/bitfinex',
    linkedin: 'https://www.linkedin.com/company/bitfinex',
  };

  /**
   * Generate signature for authenticated requests
   */
  private generateSignature(payload: string): string {
    if (!this.config.apiSecret) {
      throw new Error('API secret is required for authenticated requests');
    }
    try {
      const crypto = require('crypto');
      return crypto.createHmac('sha384', this.config.apiSecret).update(payload).digest('hex');
    } catch (error) {
      throw new Error('Crypto module not available. Please install crypto-js or use a compatible crypto library.');
    }
  }

  /**
   * Make authenticated request to Bitfinex API
   */
  private async makeAuthenticatedRequest(endpoint: string, data: Record<string, any> = {}): Promise<any> {
    if (!this.config.apiKey || !this.config.apiSecret) {
      throw new Error('API key and secret are required for authenticated requests');
    }

    const payload = JSON.stringify(data);
    const signature = this.generateSignature(payload);

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-BFX-APIKEY': this.config.apiKey,
        'X-BFX-SIGNATURE': signature,
        'X-BFX-PAYLOAD': payload,
      },
      body: payload,
    });

    if (!response.ok) {
      throw new Error(`Bitfinex API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Make public request to Bitfinex API
   */
  private async makePublicRequest(endpoint: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Bitfinex API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get platform status
   */
  async getPlatformStatus(): Promise<any> {
    return this.makePublicRequest('/v2/platform/status');
  }

  /**
   * Get tickers
   */
  async getTickers(symbols?: string[]): Promise<any> {
    const endpoint = symbols ? `/v2/tickers?symbols=${symbols.join(',')}` : '/v2/tickers';
    return this.makePublicRequest(endpoint);
  }

  /**
   * Get ticker for specific symbol
   */
  async getTicker(symbol: string): Promise<any> {
    return this.makePublicRequest(`/v2/ticker/${symbol}`);
  }

  /**
   * Get order book
   */
  async getOrderBook(symbol: string, precision: string = 'P0', len: number = 25): Promise<any> {
    return this.makePublicRequest(`/v2/book/${symbol}/${precision}?len=${len}`);
  }

  /**
   * Get trades
   */
  async getTrades(symbol: string, limit: number = 120): Promise<any> {
    return this.makePublicRequest(`/v2/trades/${symbol}/hist?limit=${limit}`);
  }

  /**
   * Get candles
   */
  async getCandles(symbol: string, timeframe: string = '1m', limit: number = 120): Promise<any> {
    return this.makePublicRequest(`/v2/candles/trade:${timeframe}:${symbol}/hist?limit=${limit}`);
  }

  /**
   * Get account info (requires authentication)
   */
  async getAccountInfo(): Promise<any> {
    return this.makeAuthenticatedRequest('/v2/auth/r/info/user');
  }

  /**
   * Get wallet balances (requires authentication)
   */
  async getWalletBalances(): Promise<any> {
    return this.makeAuthenticatedRequest('/v2/auth/r/wallets');
  }

  /**
   * Get orders (requires authentication)
   */
  async getOrders(symbol?: string): Promise<any> {
    const data = symbol ? { symbol } : {};
    return this.makeAuthenticatedRequest('/v2/auth/r/orders', data);
  }

  /**
   * Get positions (requires authentication)
   */
  async getPositions(): Promise<any> {
    return this.makeAuthenticatedRequest('/v2/auth/r/positions');
  }

  /**
   * Get trades history (requires authentication)
   */
  async getTradesHistory(symbol?: string, start?: number, end?: number, limit?: number): Promise<any> {
    const data: any = {};
    if (symbol) data.symbol = symbol;
    if (start) data.start = start;
    if (end) data.end = end;
    if (limit) data.limit = limit;
    return this.makeAuthenticatedRequest('/v2/auth/r/trades/hist', data);
  }

  /**
   * Get price for a specific symbol
   */
  async getPrice(symbol: string): Promise<number> {
    const ticker = await this.getTicker(symbol);
    return ticker[6]; // Last price is at index 6
  }

  /**
   * Get 24hr price change
   */
  async get24hrChange(symbol: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const ticker = await this.getTicker(symbol);
    const currentPrice = ticker[6]; // Last price
    const openPrice = ticker[1]; // Open price
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
  async getVolume(symbol: string): Promise<{ volume: number }> {
    const ticker = await this.getTicker(symbol);
    return {
      volume: ticker[7], // Volume is at index 7
    };
  }
}

// Static methods for quick access without authentication
export const BitfinexExchange = {
  // Quick access methods for public data
  async getTicker(symbol: string): Promise<any> {
    const instance = new BitfinexExchangeClass();
    return instance.getTicker(symbol);
  },

  async getTickers(symbols?: string[]): Promise<any> {
    const instance = new BitfinexExchangeClass();
    return instance.getTickers(symbols);
  },

  async getOrderBook(symbol: string, precision: string = 'P0', len: number = 25): Promise<any> {
    const instance = new BitfinexExchangeClass();
    return instance.getOrderBook(symbol, precision, len);
  },

  async getTrades(symbol: string, limit: number = 120): Promise<any> {
    const instance = new BitfinexExchangeClass();
    return instance.getTrades(symbol, limit);
  },

  async getCandles(symbol: string, timeframe: string = '1m', limit: number = 120): Promise<any> {
    const instance = new BitfinexExchangeClass();
    return instance.getCandles(symbol, timeframe, limit);
  },

  async getPrice(symbol: string): Promise<number> {
    const instance = new BitfinexExchangeClass();
    return instance.getPrice(symbol);
  },

  async get24hrChange(symbol: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const instance = new BitfinexExchangeClass();
    return instance.get24hrChange(symbol);
  },

  async getVolume(symbol: string): Promise<{ volume: number }> {
    const instance = new BitfinexExchangeClass();
    return instance.getVolume(symbol);
  },

  async getPlatformStatus(): Promise<any> {
    const instance = new BitfinexExchangeClass();
    return instance.getPlatformStatus();
  },

  // Static properties
  info: BitfinexExchangeClass.info,
  socialMedia: BitfinexExchangeClass.socialMedia,
};

// Export the class as default
export default BitfinexExchange;
