// Gate.io Exchange API Integration
// Global digital asset exchange

// Note: crypto import should be handled by the runtime environment
// For browser environments, use Web Crypto API or a crypto library like crypto-js

export interface GateioConfig {
  apiKey?: string;
  apiSecret?: string;
  sandbox?: boolean;
  baseUrl?: string;
}

export class GateioExchangeClass {
  private config: GateioConfig;
  private baseUrl: string;

  constructor(config: GateioConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api.gateio.ws';
  }

  // Basic Information
  static readonly info = {
    name: 'Gate.io',
    country: 'Cayman Islands',
    founded: 2013,
    website: 'https://www.gate.io/',
    apiDocs: 'https://www.gate.io/docs/developers/apiv4/',
    status: 'Active',
    tradingPairs: '1000+',
    volume24h: '$500M+',
    features: ['Spot Trading', 'Futures Trading', 'Options', 'Margin Trading'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/gate_io',
    telegram: 'https://t.me/gateio',
    discord: 'https://discord.gg/gateio',
    reddit: 'https://www.reddit.com/r/gate_io/',
    youtube: 'https://www.youtube.com/gateio',
    facebook: 'https://www.facebook.com/gateio',
    linkedin: 'https://www.linkedin.com/company/gate-io',
  };

  /**
   * Generate signature for authenticated requests
   */
  private generateSignature(method: string, url: string, queryString: string, body: string, timestamp: string): string {
    if (!this.config.apiSecret) {
      throw new Error('API secret is required for authenticated requests');
    }

    try {
      const crypto = require('crypto');
      const message = method + '\n' + url + '\n' + queryString + '\n' + crypto.createHash('sha512').update(body).digest('hex') + '\n' + timestamp;
      return crypto.createHmac('sha512', this.config.apiSecret).update(message).digest('hex');
    } catch (error) {
      throw new Error('Crypto module not available. Please install crypto-js or use a compatible crypto library.');
    }
  }

  /**
   * Make public request to Gate.io API
   */
  private async makePublicRequest(endpoint: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Gate.io API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.label) {
      throw new Error(`Gate.io API error: ${result.label}`);
    }

    return result;
  }

  /**
   * Get server time
   */
  async getServerTime(): Promise<any> {
    return this.makePublicRequest('/api/v4/spot/time');
  }

  /**
   * Get currencies
   */
  async getCurrencies(): Promise<any> {
    return this.makePublicRequest('/api/v4/spot/currencies');
  }

  /**
   * Get currency pairs
   */
  async getCurrencyPairs(): Promise<any> {
    return this.makePublicRequest('/api/v4/spot/currency_pairs');
  }

  /**
   * Get ticker
   */
  async getTicker(currencyPair?: string): Promise<any> {
    const endpoint = currencyPair ? `/api/v4/spot/tickers?currency_pair=${currencyPair}` : '/api/v4/spot/tickers';
    return this.makePublicRequest(endpoint);
  }

  /**
   * Get order book
   */
  async getOrderBook(currencyPair: string, limit?: number, interval?: string): Promise<any> {
    const params = new URLSearchParams();
    params.append('currency_pair', currencyPair);
    if (limit) params.append('limit', limit.toString());
    if (interval) params.append('interval', interval);
    
    return this.makePublicRequest(`/api/v4/spot/order_book?${params.toString()}`);
  }

  /**
   * Get trades
   */
  async getTrades(currencyPair: string, limit?: number, lastId?: string): Promise<any> {
    const params = new URLSearchParams();
    params.append('currency_pair', currencyPair);
    if (limit) params.append('limit', limit.toString());
    if (lastId) params.append('last_id', lastId);
    
    return this.makePublicRequest(`/api/v4/spot/trades?${params.toString()}`);
  }

  /**
   * Get candlesticks
   */
  async getCandlesticks(currencyPair: string, interval: string, limit?: number, from?: number, to?: number): Promise<any> {
    const params = new URLSearchParams();
    params.append('currency_pair', currencyPair);
    params.append('interval', interval);
    if (limit) params.append('limit', limit.toString());
    if (from) params.append('from', from.toString());
    if (to) params.append('to', to.toString());
    
    return this.makePublicRequest(`/api/v4/spot/candlesticks?${params.toString()}`);
  }

  /**
   * Get price for a specific currency pair
   */
  async getPrice(currencyPair: string): Promise<number> {
    const tickers = await this.getTicker(currencyPair);
    const ticker = tickers[0];
    return parseFloat(ticker.last);
  }

  /**
   * Get 24hr price change
   */
  async get24hrChange(currencyPair: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const tickers = await this.getTicker(currencyPair);
    const ticker = tickers[0];
    const currentPrice = parseFloat(ticker.last);
    const changePercent = parseFloat(ticker.change_percentage);
    const priceChange = currentPrice * (changePercent / 100);

    return {
      priceChange,
      priceChangePercent: changePercent,
    };
  }

  /**
   * Get trading volume
   */
  async getVolume(currencyPair: string): Promise<{ volume: number; quoteVolume: number }> {
    const tickers = await this.getTicker(currencyPair);
    const ticker = tickers[0];
    return {
      volume: parseFloat(ticker.base_volume),
      quoteVolume: parseFloat(ticker.quote_volume),
    };
  }
}

// Static methods for quick access
export const GateioExchange = {
  async getTicker(currencyPair?: string): Promise<any> {
    const instance = new GateioExchangeClass();
    return instance.getTicker(currencyPair);
  },

  async getOrderBook(currencyPair: string, limit?: number, interval?: string): Promise<any> {
    const instance = new GateioExchangeClass();
    return instance.getOrderBook(currencyPair, limit, interval);
  },

  async getTrades(currencyPair: string, limit?: number, lastId?: string): Promise<any> {
    const instance = new GateioExchangeClass();
    return instance.getTrades(currencyPair, limit, lastId);
  },

  async getCandlesticks(currencyPair: string, interval: string, limit?: number, from?: number, to?: number): Promise<any> {
    const instance = new GateioExchangeClass();
    return instance.getCandlesticks(currencyPair, interval, limit, from, to);
  },

  async getPrice(currencyPair: string): Promise<number> {
    const instance = new GateioExchangeClass();
    return instance.getPrice(currencyPair);
  },

  async get24hrChange(currencyPair: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const instance = new GateioExchangeClass();
    return instance.get24hrChange(currencyPair);
  },

  async getVolume(currencyPair: string): Promise<{ volume: number; quoteVolume: number }> {
    const instance = new GateioExchangeClass();
    return instance.getVolume(currencyPair);
  },

  async getServerTime(): Promise<any> {
    const instance = new GateioExchangeClass();
    return instance.getServerTime();
  },

  async getCurrencies(): Promise<any> {
    const instance = new GateioExchangeClass();
    return instance.getCurrencies();
  },

  async getCurrencyPairs(): Promise<any> {
    const instance = new GateioExchangeClass();
    return instance.getCurrencyPairs();
  },

  info: GateioExchangeClass.info,
  socialMedia: GateioExchangeClass.socialMedia,
};

export default GateioExchange;
