// Binance Exchange API Integration
// Largest global cryptocurrency exchange by trading volume

// Note: crypto import should be handled by the runtime environment
// For browser environments, use Web Crypto API or a crypto library like crypto-js

export interface BinanceConfig {
  apiKey?: string;
  apiSecret?: string;
  sandbox?: boolean;
  baseUrl?: string;
}

export class BinanceExchangeClass {
  private config: BinanceConfig;
  private baseUrl: string;
  private apiUrl: string;

  constructor(config: BinanceConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || (config.sandbox ? 'https://testnet.binance.vision' : 'https://api.binance.com');
    this.apiUrl = `${this.baseUrl}/api/v3`;
  }

  // Basic Information
  static readonly info = {
    name: 'Binance',
    country: 'Global',
    founded: 2017,
    website: 'https://www.binance.com/',
    apiDocs: 'https://binance-docs.github.io/apidocs/spot/en/',
    status: 'Active',
    tradingPairs: '1000+',
    volume24h: '$10B+',
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/binance',
    telegram: 'https://t.me/binanceexchange',
    discord: 'https://discord.gg/binance',
    reddit: 'https://www.reddit.com/r/binance/',
    youtube: 'https://www.youtube.com/binance',
    facebook: 'https://www.facebook.com/binance',
    linkedin: 'https://www.linkedin.com/company/binance',
    instagram: 'https://www.instagram.com/binance/',
  };

  /**
   * Generate signature for authenticated requests
   */
  private generateSignature(queryString: string): string {
    if (!this.config.apiSecret) {
      throw new Error('API secret is required for authenticated requests');
    }
    
    // Note: This should be implemented using a crypto library compatible with your environment
    // For Node.js: use 'crypto' module
    // For browser: use crypto-js or Web Crypto API
    // This is a placeholder implementation
    try {
      const crypto = require('crypto');
      return crypto.createHmac('sha256', this.config.apiSecret).update(queryString).digest('hex');
    } catch (error) {
      throw new Error('Crypto module not available. Please install crypto-js or use a compatible crypto library.');
    }
  }

  /**
   * Make authenticated request to Binance API
   */
  private async makeAuthenticatedRequest(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    if (!this.config.apiKey || !this.config.apiSecret) {
      throw new Error('API key and secret are required for authenticated requests');
    }

    try {
      const timestamp = Date.now();
      const queryParams = {
        ...params,
        timestamp,
      };

      const queryString = Object.keys(queryParams)
        .map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
        .join('&');

      const signature = this.generateSignature(queryString);
      const url = `${this.apiUrl}${endpoint}?${queryString}&signature=${signature}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'X-MBX-APIKEY': this.config.apiKey,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Binance API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      
      // Check for Binance-specific error codes
      if (data.code && data.code !== 200) {
        throw new Error(`Binance API error: ${data.msg || 'Unknown error'} (Code: ${data.code})`);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Binance authenticated request failed: ${error.message}`);
      }
      throw new Error('Binance authenticated request failed: Unknown error');
    }
  }

  /**
   * Make public request to Binance API
   */
  private async makePublicRequest(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    try {
      const queryString = Object.keys(params)
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');

      const url = `${this.apiUrl}${endpoint}${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Binance API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const data = await response.json();
      
      // Check for Binance-specific error codes
      if (data.code && data.code !== 200) {
        throw new Error(`Binance API error: ${data.msg || 'Unknown error'} (Code: ${data.code})`);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Binance public request failed: ${error.message}`);
      }
      throw new Error('Binance public request failed: Unknown error');
    }
  }

  /**
   * Test connectivity to the Rest API
   */
  async ping(): Promise<{}> {
    return this.makePublicRequest('/ping');
  }

  /**
   * Get server time
   */
  async getServerTime(): Promise<{ serverTime: number }> {
    return this.makePublicRequest('/time');
  }

  /**
   * Get exchange trading rules and symbol information
   */
  async getExchangeInfo(): Promise<any> {
    return this.makePublicRequest('/exchangeInfo');
  }

  /**
   * Get 24hr ticker price change statistics
   */
  async get24hrTicker(symbol?: string): Promise<any> {
    const params = symbol ? { symbol } : {};
    return this.makePublicRequest('/ticker/24hr', params);
  }

  /**
   * Get latest price for a symbol or all symbols
   */
  async getTickerPrice(symbol?: string): Promise<any> {
    const params = symbol ? { symbol } : {};
    return this.makePublicRequest('/ticker/price', params);
  }

  /**
   * Get best price/qty on the order book for a symbol or all symbols
   */
  async getBookTicker(symbol?: string): Promise<any> {
    const params = symbol ? { symbol } : {};
    return this.makePublicRequest('/ticker/bookTicker', params);
  }

  /**
   * Get order book depth
   */
  async getOrderBook(symbol: string, limit: number = 100): Promise<any> {
    return this.makePublicRequest('/depth', { symbol, limit });
  }

  /**
   * Get recent trades list
   */
  async getRecentTrades(symbol: string, limit: number = 500): Promise<any> {
    return this.makePublicRequest('/trades', { symbol, limit });
  }

  /**
   * Get kline/candlestick data
   */
  async getKlines(symbol: string, interval: string, limit: number = 500, startTime?: number, endTime?: number): Promise<any> {
    const params: any = { symbol, interval, limit };
    if (startTime) params.startTime = startTime;
    if (endTime) params.endTime = endTime;
    return this.makePublicRequest('/klines', params);
  }

  /**
   * Get current average price for a symbol
   */
  async getAveragePrice(symbol: string): Promise<any> {
    return this.makePublicRequest('/avgPrice', { symbol });
  }

  /**
   * Get account information (requires authentication)
   */
  async getAccountInfo(): Promise<any> {
    return this.makeAuthenticatedRequest('/account');
  }

  /**
   * Get all open orders on a symbol (requires authentication)
   */
  async getOpenOrders(symbol?: string): Promise<any> {
    const params = symbol ? { symbol } : {};
    return this.makeAuthenticatedRequest('/openOrders', params);
  }

  /**
   * Get account balance in a specific asset
   */
  async getBalance(asset: string): Promise<{ asset: string; free: number; locked: number }> {
    const accountInfo = await this.getAccountInfo();
    const balance = accountInfo.balances.find((b: any) => b.asset === asset);
    return balance || { asset, free: 0, locked: 0 };
  }

  /**
   * Get all account balances
   */
  async getAllBalances(): Promise<Array<{ asset: string; free: number; locked: number }>> {
    const accountInfo = await this.getAccountInfo();
    return accountInfo.balances.filter((b: any) => parseFloat(b.free) > 0 || parseFloat(b.locked) > 0);
  }

  /**
   * Get price for a specific trading pair
   */
  async getPrice(symbol: string): Promise<number> {
    const ticker = await this.getTickerPrice(symbol);
    return parseFloat(ticker.price);
  }

  /**
   * Get 24hr price change for a symbol
   */
  async get24hrChange(symbol: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const ticker = await this.get24hrTicker(symbol);
    return {
      priceChange: parseFloat(ticker.priceChange),
      priceChangePercent: parseFloat(ticker.priceChangePercent),
    };
  }
}

// Static methods for quick access without authentication
export const BinanceExchange = {
  // Quick access methods for public data
  async getTickerPrice(symbol: string): Promise<any> {
    const instance = new BinanceExchangeClass();
    return instance.getTickerPrice(symbol);
  },

  async get24hrTicker(symbol: string): Promise<any> {
    const instance = new BinanceExchangeClass();
    return instance.get24hrTicker(symbol);
  },

  async getOrderBook(symbol: string, limit: number = 100): Promise<any> {
    const instance = new BinanceExchangeClass();
    return instance.getOrderBook(symbol, limit);
  },

  async getRecentTrades(symbol: string, limit: number = 500): Promise<any> {
    const instance = new BinanceExchangeClass();
    return instance.getRecentTrades(symbol, limit);
  },

  async getKlines(symbol: string, interval: string, limit: number = 500): Promise<any> {
    const instance = new BinanceExchangeClass();
    return instance.getKlines(symbol, interval, limit);
  },

  async getPrice(symbol: string): Promise<number> {
    const instance = new BinanceExchangeClass();
    return instance.getPrice(symbol);
  },

  async getExchangeInfo(): Promise<any> {
    const instance = new BinanceExchangeClass();
    return instance.getExchangeInfo();
  },

  async ping(): Promise<{}> {
    const instance = new BinanceExchangeClass();
    return instance.ping();
  },

  async getServerTime(): Promise<{ serverTime: number }> {
    const instance = new BinanceExchangeClass();
    return instance.getServerTime();
  },

  // Static properties
  info: BinanceExchangeClass.info,
  socialMedia: BinanceExchangeClass.socialMedia,
};

// Export the class as default
export default BinanceExchange;
