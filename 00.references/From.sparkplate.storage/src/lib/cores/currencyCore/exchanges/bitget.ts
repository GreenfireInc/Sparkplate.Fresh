// Bitget Exchange API Integration
// Global derivatives exchange

// Note: crypto import should be handled by the runtime environment
// For browser environments, use Web Crypto API or a crypto library like crypto-js

export interface BitgetConfig {
  apiKey?: string;
  apiSecret?: string;
  passphrase?: string;
  sandbox?: boolean;
  baseUrl?: string;
}

export class BitgetExchangeClass {
  private config: BitgetConfig;
  private baseUrl: string;

  constructor(config: BitgetConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api.bitget.com';
  }

  // Basic Information
  static readonly info = {
    name: 'Bitget',
    country: 'Singapore',
    founded: 2018,
    website: 'https://www.bitget.com/',
    apiDocs: 'https://bitgetlimited.github.io/apidoc/en/spot/',
    status: 'Active',
    tradingPairs: '300+',
    volume24h: '$500M+',
    features: ['Spot Trading', 'Derivatives', 'Copy Trading', 'Options'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/bitgetglobal',
    telegram: 'https://t.me/bitgetglobal',
    discord: 'https://discord.gg/bitget',
    reddit: 'https://www.reddit.com/r/bitget/',
    youtube: 'https://www.youtube.com/bitget',
    facebook: 'https://www.facebook.com/bitget',
    linkedin: 'https://www.linkedin.com/company/bitget',
  };

  /**
   * Generate signature for authenticated requests
   */
  private generateSignature(timestamp: string, method: string, requestPath: string, body: string = ''): string {
    if (!this.config.apiSecret) {
      throw new Error('API secret is required for authenticated requests');
    }

    const message = timestamp + method + requestPath + body;
    try {
      const crypto = require('crypto');
      return crypto.createHmac('sha256', this.config.apiSecret).update(message).digest('base64');
    } catch (error) {
      throw new Error('Crypto module not available. Please install crypto-js or use a compatible crypto library.');
    }
  }

  /**
   * Make authenticated request to Bitget API
   */
  private async makeAuthenticatedRequest(endpoint: string, method: string = 'GET', data: Record<string, any> = {}): Promise<any> {
    if (!this.config.apiKey || !this.config.apiSecret || !this.config.passphrase) {
      throw new Error('API key, secret, and passphrase are required for authenticated requests');
    }

    const timestamp = Date.now().toString();
    const body = Object.keys(data).length > 0 ? JSON.stringify(data) : '';
    const signature = this.generateSignature(timestamp, method, endpoint, body);

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        'ACCESS-KEY': this.config.apiKey,
        'ACCESS-SIGN': signature,
        'ACCESS-TIMESTAMP': timestamp,
        'ACCESS-PASSPHRASE': this.config.passphrase,
        'Content-Type': 'application/json',
      },
      body: body || undefined,
    });

    if (!response.ok) {
      throw new Error(`Bitget API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.code !== '00000') {
      throw new Error(`Bitget API error: ${result.msg}`);
    }

    return result.data;
  }

  /**
   * Make public request to Bitget API
   */
  private async makePublicRequest(endpoint: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Bitget API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.code !== '00000') {
      throw new Error(`Bitget API error: ${result.msg}`);
    }

    return result.data;
  }

  /**
   * Get server time
   */
  async getServerTime(): Promise<any> {
    return this.makePublicRequest('/api/spot/v1/public/time');
  }

  /**
   * Get symbols
   */
  async getSymbols(): Promise<any> {
    return this.makePublicRequest('/api/spot/v1/public/symbols');
  }

  /**
   * Get ticker
   */
  async getTicker(symbol?: string): Promise<any> {
    const endpoint = symbol ? `/api/spot/v1/market/ticker?symbol=${symbol}` : '/api/spot/v1/market/tickers';
    return this.makePublicRequest(endpoint);
  }

  /**
   * Get order book
   */
  async getOrderBook(symbol: string, limit?: number): Promise<any> {
    const endpoint = `/api/spot/v1/market/depth?symbol=${symbol}${limit ? `&limit=${limit}` : ''}`;
    return this.makePublicRequest(endpoint);
  }

  /**
   * Get trades
   */
  async getTrades(symbol: string, limit?: number): Promise<any> {
    const endpoint = `/api/spot/v1/market/fills?symbol=${symbol}${limit ? `&limit=${limit}` : ''}`;
    return this.makePublicRequest(endpoint);
  }

  /**
   * Get candles
   */
  async getCandles(symbol: string, granularity: string = '1min', limit?: number): Promise<any> {
    const endpoint = `/api/spot/v1/market/candles?symbol=${symbol}&granularity=${granularity}${limit ? `&limit=${limit}` : ''}`;
    return this.makePublicRequest(endpoint);
  }

  /**
   * Get account info (requires authentication)
   */
  async getAccountInfo(): Promise<any> {
    return this.makeAuthenticatedRequest('/api/spot/v1/account/assets');
  }

  /**
   * Get orders (requires authentication)
   */
  async getOrders(symbol: string, status?: string, limit?: number): Promise<any> {
    const data: any = { symbol };
    if (status) data.status = status;
    if (limit) data.limit = limit;
    return this.makeAuthenticatedRequest('/api/spot/v1/trade/open-orders', 'GET', data);
  }

  /**
   * Get order history (requires authentication)
   */
  async getOrderHistory(symbol: string, status?: string, limit?: number): Promise<any> {
    const data: any = { symbol };
    if (status) data.status = status;
    if (limit) data.limit = limit;
    return this.makeAuthenticatedRequest('/api/spot/v1/trade/history', 'GET', data);
  }

  /**
   * Get fills (requires authentication)
   */
  async getFills(symbol: string, limit?: number): Promise<any> {
    const data: any = { symbol };
    if (limit) data.limit = limit;
    return this.makeAuthenticatedRequest('/api/spot/v1/trade/fills', 'GET', data);
  }

  /**
   * Get price for a specific symbol
   */
  async getPrice(symbol: string): Promise<number> {
    const ticker = await this.getTicker(symbol);
    return parseFloat(ticker.close);
  }

  /**
   * Get 24hr price change
   */
  async get24hrChange(symbol: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const ticker = await this.getTicker(symbol);
    const currentPrice = parseFloat(ticker.close);
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
  async getVolume(symbol: string): Promise<{ volume: number; quoteVolume: number }> {
    const ticker = await this.getTicker(symbol);
    return {
      volume: parseFloat(ticker.baseVolume),
      quoteVolume: parseFloat(ticker.quoteVolume),
    };
  }

  /**
   * Get account balance for specific currency
   */
  async getBalance(currency: string): Promise<number> {
    const balances = await this.getAccountInfo();
    const balance = balances.find((b: any) => b.coinName === currency);
    return balance ? parseFloat(balance.available) : 0;
  }

  /**
   * Get all non-zero balances
   */
  async getAllBalances(): Promise<Array<{ currency: string; balance: number }>> {
    const balances = await this.getAccountInfo();
    return balances
      .filter((b: any) => parseFloat(b.available) > 0)
      .map((b: any) => ({ currency: b.coinName, balance: parseFloat(b.available) }));
  }
}

// Static methods for quick access
export const BitgetExchange = {
  async getTicker(symbol?: string): Promise<any> {
    const instance = new BitgetExchangeClass();
    return instance.getTicker(symbol);
  },

  async getOrderBook(symbol: string, limit?: number): Promise<any> {
    const instance = new BitgetExchangeClass();
    return instance.getOrderBook(symbol, limit);
  },

  async getTrades(symbol: string, limit?: number): Promise<any> {
    const instance = new BitgetExchangeClass();
    return instance.getTrades(symbol, limit);
  },

  async getCandles(symbol: string, granularity: string = '1min', limit?: number): Promise<any> {
    const instance = new BitgetExchangeClass();
    return instance.getCandles(symbol, granularity, limit);
  },

  async getPrice(symbol: string): Promise<number> {
    const instance = new BitgetExchangeClass();
    return instance.getPrice(symbol);
  },

  async get24hrChange(symbol: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const instance = new BitgetExchangeClass();
    return instance.get24hrChange(symbol);
  },

  async getVolume(symbol: string): Promise<{ volume: number; quoteVolume: number }> {
    const instance = new BitgetExchangeClass();
    return instance.getVolume(symbol);
  },

  async getSymbols(): Promise<any> {
    const instance = new BitgetExchangeClass();
    return instance.getSymbols();
  },

  async getServerTime(): Promise<any> {
    const instance = new BitgetExchangeClass();
    return instance.getServerTime();
  },

  info: BitgetExchangeClass.info,
  socialMedia: BitgetExchangeClass.socialMedia,
};

export default BitgetExchange;
