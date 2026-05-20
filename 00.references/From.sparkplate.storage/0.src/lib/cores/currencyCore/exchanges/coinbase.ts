// Coinbase Exchange API Integration
// US-based cryptocurrency exchange

// Note: crypto import should be handled by the runtime environment
// For browser environments, use Web Crypto API or a crypto library like crypto-js

export interface CoinbaseConfig {
  apiKey?: string;
  apiSecret?: string;
  passphrase?: string;
  sandbox?: boolean;
  baseUrl?: string;
}

export class CoinbaseExchangeClass {
  private config: CoinbaseConfig;
  private baseUrl: string;

  constructor(config: CoinbaseConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || (config.sandbox ? 'https://api-public.sandbox.pro.coinbase.com' : 'https://api.exchange.coinbase.com');
  }

  // Basic Information
  static readonly info = {
    name: 'Coinbase',
    country: 'United States',
    founded: 2012,
    website: 'https://www.coinbase.com/',
    apiDocs: 'https://docs.cloud.coinbase.com/exchange/reference',
    status: 'Active',
    tradingPairs: '100+',
    volume24h: '$1B+',
    features: ['Spot Trading', 'Advanced Trading', 'Staking', 'Institutional Services'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/coinbase',
    telegram: 'https://t.me/coinbase',
    reddit: 'https://www.reddit.com/r/CoinBase/',
    youtube: 'https://www.youtube.com/coinbase',
    facebook: 'https://www.facebook.com/coinbase',
    linkedin: 'https://www.linkedin.com/company/coinbase',
    instagram: 'https://www.instagram.com/coinbase/',
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
      return crypto.createHmac('sha256', Buffer.from(this.config.apiSecret, 'base64')).update(message).digest('base64');
    } catch (error) {
      throw new Error('Crypto module not available. Please install crypto-js or use a compatible crypto library.');
    }
  }

  /**
   * Make authenticated request to Coinbase API
   */
  private async makeAuthenticatedRequest(endpoint: string, method: string = 'GET', data: Record<string, any> = {}): Promise<any> {
    if (!this.config.apiKey || !this.config.apiSecret || !this.config.passphrase) {
      throw new Error('API key, secret, and passphrase are required for authenticated requests');
    }

    const timestamp = Math.floor(Date.now() / 1000).toString();
    const body = Object.keys(data).length > 0 ? JSON.stringify(data) : '';
    const signature = this.generateSignature(timestamp, method, endpoint, body);

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      method,
      headers: {
        'CB-ACCESS-KEY': this.config.apiKey,
        'CB-ACCESS-SIGN': signature,
        'CB-ACCESS-TIMESTAMP': timestamp,
        'CB-ACCESS-PASSPHRASE': this.config.passphrase,
        'Content-Type': 'application/json',
      },
      body: body || undefined,
    });

    if (!response.ok) {
      throw new Error(`Coinbase API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Make public request to Coinbase API
   */
  private async makePublicRequest(endpoint: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Coinbase API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get server time
   */
  async getTime(): Promise<any> {
    return this.makePublicRequest('/time');
  }

  /**
   * Get products
   */
  async getProducts(): Promise<any> {
    return this.makePublicRequest('/products');
  }

  /**
   * Get single product
   */
  async getProduct(productId: string): Promise<any> {
    return this.makePublicRequest(`/products/${productId}`);
  }

  /**
   * Get product order book
   */
  async getProductOrderBook(productId: string, level: number = 1): Promise<any> {
    return this.makePublicRequest(`/products/${productId}/book?level=${level}`);
  }

  /**
   * Get product ticker
   */
  async getProductTicker(productId: string): Promise<any> {
    return this.makePublicRequest(`/products/${productId}/ticker`);
  }

  /**
   * Get product trades
   */
  async getProductTrades(productId: string, limit?: number, before?: number, after?: number): Promise<any> {
    const params = new URLSearchParams();
    if (limit) params.append('limit', limit.toString());
    if (before) params.append('before', before.toString());
    if (after) params.append('after', after.toString());
    
    const queryString = params.toString();
    const endpoint = `/products/${productId}/trades${queryString ? `?${queryString}` : ''}`;
    return this.makePublicRequest(endpoint);
  }

  /**
   * Get product candles
   */
  async getProductCandles(productId: string, start?: string, end?: string, granularity?: number): Promise<any> {
    const params = new URLSearchParams();
    if (start) params.append('start', start);
    if (end) params.append('end', end);
    if (granularity) params.append('granularity', granularity.toString());
    
    const queryString = params.toString();
    const endpoint = `/products/${productId}/candles${queryString ? `?${queryString}` : ''}`;
    return this.makePublicRequest(endpoint);
  }

  /**
   * Get accounts (requires authentication)
   */
  async getAccounts(): Promise<any> {
    return this.makeAuthenticatedRequest('/accounts');
  }

  /**
   * Get single account (requires authentication)
   */
  async getAccount(accountId: string): Promise<any> {
    return this.makeAuthenticatedRequest(`/accounts/${accountId}`);
  }

  /**
   * Get account history (requires authentication)
   */
  async getAccountHistory(accountId: string, before?: number, after?: number, limit?: number): Promise<any> {
    const params = new URLSearchParams();
    if (before) params.append('before', before.toString());
    if (after) params.append('after', after.toString());
    if (limit) params.append('limit', limit.toString());
    
    const queryString = params.toString();
    const endpoint = `/accounts/${accountId}/ledger${queryString ? `?${queryString}` : ''}`;
    return this.makeAuthenticatedRequest(endpoint);
  }

  /**
   * Get holds (requires authentication)
   */
  async getHolds(accountId: string, before?: number, after?: number, limit?: number): Promise<any> {
    const params = new URLSearchParams();
    if (before) params.append('before', before.toString());
    if (after) params.append('after', after.toString());
    if (limit) params.append('limit', limit.toString());
    
    const queryString = params.toString();
    const endpoint = `/accounts/${accountId}/holds${queryString ? `?${queryString}` : ''}`;
    return this.makeAuthenticatedRequest(endpoint);
  }

  /**
   * Get orders (requires authentication)
   */
  async getOrders(status?: string, productId?: string, before?: number, after?: number, limit?: number): Promise<any> {
    const params = new URLSearchParams();
    if (status) params.append('status', status);
    if (productId) params.append('product_id', productId);
    if (before) params.append('before', before.toString());
    if (after) params.append('after', after.toString());
    if (limit) params.append('limit', limit.toString());
    
    const queryString = params.toString();
    const endpoint = `/orders${queryString ? `?${queryString}` : ''}`;
    return this.makeAuthenticatedRequest(endpoint);
  }

  /**
   * Get fills (requires authentication)
   */
  async getFills(orderId?: string, productId?: string, before?: number, after?: number, limit?: number): Promise<any> {
    const params = new URLSearchParams();
    if (orderId) params.append('order_id', orderId);
    if (productId) params.append('product_id', productId);
    if (before) params.append('before', before.toString());
    if (after) params.append('after', after.toString());
    if (limit) params.append('limit', limit.toString());
    
    const queryString = params.toString();
    const endpoint = `/fills${queryString ? `?${queryString}` : ''}`;
    return this.makeAuthenticatedRequest(endpoint);
  }

  /**
   * Get price for a specific product
   */
  async getPrice(productId: string): Promise<number> {
    const ticker = await this.getProductTicker(productId);
    return parseFloat(ticker.price);
  }

  /**
   * Get 24hr price change
   */
  async get24hrChange(productId: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const ticker = await this.getProductTicker(productId);
    const currentPrice = parseFloat(ticker.price);
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
  async getVolume(productId: string): Promise<{ volume: number }> {
    const ticker = await this.getProductTicker(productId);
    return {
      volume: parseFloat(ticker.volume),
    };
  }

  /**
   * Get account balance for specific currency
   */
  async getBalance(currency: string): Promise<number> {
    const accounts = await this.getAccounts();
    const account = accounts.find((acc: any) => acc.currency === currency);
    return account ? parseFloat(account.balance) : 0;
  }

  /**
   * Get all non-zero balances
   */
  async getAllBalances(): Promise<Array<{ currency: string; balance: number }>> {
    const accounts = await this.getAccounts();
    return accounts
      .filter((acc: any) => parseFloat(acc.balance) > 0)
      .map((acc: any) => ({ currency: acc.currency, balance: parseFloat(acc.balance) }));
  }
}

// Static methods for quick access without authentication
export const CoinbaseExchange = {
  // Quick access methods for public data
  async getProductTicker(productId: string): Promise<any> {
    const instance = new CoinbaseExchangeClass();
    return instance.getProductTicker(productId);
  },

  async getProductOrderBook(productId: string, level: number = 1): Promise<any> {
    const instance = new CoinbaseExchangeClass();
    return instance.getProductOrderBook(productId, level);
  },

  async getProductTrades(productId: string, limit?: number): Promise<any> {
    const instance = new CoinbaseExchangeClass();
    return instance.getProductTrades(productId, limit);
  },

  async getProductCandles(productId: string, start?: string, end?: string, granularity?: number): Promise<any> {
    const instance = new CoinbaseExchangeClass();
    return instance.getProductCandles(productId, start, end, granularity);
  },

  async getPrice(productId: string): Promise<number> {
    const instance = new CoinbaseExchangeClass();
    return instance.getPrice(productId);
  },

  async get24hrChange(productId: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const instance = new CoinbaseExchangeClass();
    return instance.get24hrChange(productId);
  },

  async getVolume(productId: string): Promise<{ volume: number }> {
    const instance = new CoinbaseExchangeClass();
    return instance.getVolume(productId);
  },

  async getProducts(): Promise<any> {
    const instance = new CoinbaseExchangeClass();
    return instance.getProducts();
  },

  async getProduct(productId: string): Promise<any> {
    const instance = new CoinbaseExchangeClass();
    return instance.getProduct(productId);
  },

  async getTime(): Promise<any> {
    const instance = new CoinbaseExchangeClass();
    return instance.getTime();
  },

  // Static properties
  info: CoinbaseExchangeClass.info,
  socialMedia: CoinbaseExchangeClass.socialMedia,
};

// Export the class as default
export default CoinbaseExchange;
