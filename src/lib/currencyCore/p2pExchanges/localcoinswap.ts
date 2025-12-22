// Localcoinswap P2P Exchange API Integration
// Global peer-to-peer exchange

export interface LocalcoinswapConfig {
  apiKey?: string;
  baseUrl?: string;
  sandbox?: boolean;
}

export class LocalcoinswapExchangeClass {
  private config: LocalcoinswapConfig;
  private baseUrl: string;

  constructor(config: LocalcoinswapConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || (config.sandbox ? 'https://api-sandbox.localcoinswap.com' : 'https://api.localcoinswap.com');
  }

  // Basic Information
  static readonly info = {
    name: 'Localcoinswap',
    country: 'Global',
    founded: 2017,
    website: 'https://localcoinswap.com/',
    apiDocs: 'https://localcoinswap.com/api/',
    status: 'Active',
    supportedCurrencies: '50+',
    features: ['Privacy-focused', 'Multiple Payment Methods', 'Escrow System', 'Global Coverage'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/localcoinswap',
    telegram: 'https://t.me/localcoinswap',
    discord: 'https://discord.gg/localcoinswap',
    reddit: 'https://www.reddit.com/r/localcoinswap/',
    youtube: 'https://www.youtube.com/localcoinswap',
    facebook: 'https://www.facebook.com/localcoinswap',
    linkedin: 'https://www.linkedin.com/company/localcoinswap',
  };

  /**
   * Make request to Localcoinswap API
   */
  private async makeRequest(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.config.apiKey) {
      headers['Authorization'] = `Bearer ${this.config.apiKey}`;
    }

    const response = await fetch(url.toString(), { headers });

    if (!response.ok) {
      throw new Error(`Localcoinswap API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(`Localcoinswap API error: ${result.error}`);
    }

    return result;
  }

  /**
   * Get list of supported currencies
   */
  async getCurrencies(): Promise<string[]> {
    return this.makeRequest('/api/v1/currencies');
  }

  /**
   * Get order book for a trading pair
   */
  async getOrderBook(currency: string, baseCurrency: string): Promise<any[]> {
    return this.makeRequest('/api/v1/ads', {
      cryptocurrency: currency,
      currency: baseCurrency,
    });
  }

  /**
   * Get buy ads
   */
  async getBuyAds(currency: string, baseCurrency: string): Promise<any[]> {
    return this.makeRequest('/api/v1/ads', {
      cryptocurrency: currency,
      currency: baseCurrency,
      trade_type: 'buy',
    });
  }

  /**
   * Get sell ads
   */
  async getSellAds(currency: string, baseCurrency: string): Promise<any[]> {
    return this.makeRequest('/api/v1/ads', {
      cryptocurrency: currency,
      currency: baseCurrency,
      trade_type: 'sell',
    });
  }

  /**
   * Get payment methods
   */
  async getPaymentMethods(): Promise<string[]> {
    return this.makeRequest('/api/v1/payment_methods');
  }

  /**
   * Get trading pairs
   */
  async getTradingPairs(): Promise<any[]> {
    return this.makeRequest('/api/v1/trading_pairs');
  }

  /**
   * Get market statistics
   */
  async getMarketStats(currency: string, baseCurrency: string): Promise<any> {
    return this.makeRequest('/api/v1/stats', {
      cryptocurrency: currency,
      currency: baseCurrency,
    });
  }

  /**
   * Get trade history
   */
  async getTradeHistory(currency: string, baseCurrency: string, limit?: number): Promise<any[]> {
    const params: any = { cryptocurrency: currency, currency: baseCurrency };
    if (limit) params.limit = limit;
    
    return this.makeRequest('/api/v1/trades', params);
  }

  /**
   * Get user profile
   */
  async getUserProfile(userId: string): Promise<any> {
    return this.makeRequest(`/api/v1/users/${userId}`);
  }

  /**
   * Get user trades
   */
  async getUserTrades(userId: string, limit?: number): Promise<any[]> {
    const params: any = { user_id: userId };
    if (limit) params.limit = limit;
    
    return this.makeRequest('/api/v1/user_trades', params);
  }

  /**
   * Get dispute information
   */
  async getDisputeInfo(disputeId: string): Promise<any> {
    return this.makeRequest(`/api/v1/disputes/${disputeId}`);
  }

  /**
   * Get escrow status
   */
  async getEscrowStatus(tradeId: string): Promise<any> {
    return this.makeRequest(`/api/v1/escrow/${tradeId}`);
  }

  /**
   * Get price history
   */
  async getPriceHistory(currency: string, baseCurrency: string, period: string = '7d'): Promise<any[]> {
    return this.makeRequest('/api/v1/price_history', {
      cryptocurrency: currency,
      currency: baseCurrency,
      period: period,
    });
  }

  /**
   * Get market depth
   */
  async getMarketDepth(currency: string, baseCurrency: string): Promise<any> {
    return this.makeRequest('/api/v1/market_depth', {
      cryptocurrency: currency,
      currency: baseCurrency,
    });
  }

  /**
   * Get recent trades
   */
  async getRecentTrades(currency: string, baseCurrency: string, limit: number = 50): Promise<any[]> {
    return this.makeRequest('/api/v1/recent_trades', {
      cryptocurrency: currency,
      currency: baseCurrency,
      limit: limit,
    });
  }

  /**
   * Get supported payment methods for a currency pair
   */
  async getPaymentMethodsForPair(currency: string, baseCurrency: string): Promise<string[]> {
    return this.makeRequest('/api/v1/payment_methods/pair', {
      cryptocurrency: currency,
      currency: baseCurrency,
    });
  }

  /**
   * Get ad statistics
   */
  async getAdStats(currency: string, baseCurrency: string): Promise<any> {
    return this.makeRequest('/api/v1/ad_stats', {
      cryptocurrency: currency,
      currency: baseCurrency,
    });
  }
}

// Static methods for quick access
export const LocalcoinswapExchange = {
  // Quick access methods
  async getCurrencies(): Promise<string[]> {
    const instance = new LocalcoinswapExchangeClass();
    return instance.getCurrencies();
  },

  async getOrderBook(currency: string, baseCurrency: string): Promise<any[]> {
    const instance = new LocalcoinswapExchangeClass();
    return instance.getOrderBook(currency, baseCurrency);
  },

  async getBuyAds(currency: string, baseCurrency: string): Promise<any[]> {
    const instance = new LocalcoinswapExchangeClass();
    return instance.getBuyAds(currency, baseCurrency);
  },

  async getSellAds(currency: string, baseCurrency: string): Promise<any[]> {
    const instance = new LocalcoinswapExchangeClass();
    return instance.getSellAds(currency, baseCurrency);
  },

  async getPaymentMethods(): Promise<string[]> {
    const instance = new LocalcoinswapExchangeClass();
    return instance.getPaymentMethods();
  },

  async getTradingPairs(): Promise<any[]> {
    const instance = new LocalcoinswapExchangeClass();
    return instance.getTradingPairs();
  },

  async getMarketStats(currency: string, baseCurrency: string): Promise<any> {
    const instance = new LocalcoinswapExchangeClass();
    return instance.getMarketStats(currency, baseCurrency);
  },

  async getTradeHistory(currency: string, baseCurrency: string, limit?: number): Promise<any[]> {
    const instance = new LocalcoinswapExchangeClass();
    return instance.getTradeHistory(currency, baseCurrency, limit);
  },

  async getPriceHistory(currency: string, baseCurrency: string, period?: string): Promise<any[]> {
    const instance = new LocalcoinswapExchangeClass();
    return instance.getPriceHistory(currency, baseCurrency, period);
  },

  async getMarketDepth(currency: string, baseCurrency: string): Promise<any> {
    const instance = new LocalcoinswapExchangeClass();
    return instance.getMarketDepth(currency, baseCurrency);
  },

  async getRecentTrades(currency: string, baseCurrency: string, limit?: number): Promise<any[]> {
    const instance = new LocalcoinswapExchangeClass();
    return instance.getRecentTrades(currency, baseCurrency, limit);
  },

  async getPaymentMethodsForPair(currency: string, baseCurrency: string): Promise<string[]> {
    const instance = new LocalcoinswapExchangeClass();
    return instance.getPaymentMethodsForPair(currency, baseCurrency);
  },

  async getAdStats(currency: string, baseCurrency: string): Promise<any> {
    const instance = new LocalcoinswapExchangeClass();
    return instance.getAdStats(currency, baseCurrency);
  },

  // Static properties
  info: LocalcoinswapExchangeClass.info,
  socialMedia: LocalcoinswapExchangeClass.socialMedia,
};

// Export the class as default
export default LocalcoinswapExchange;
