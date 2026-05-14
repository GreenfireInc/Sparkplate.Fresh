// Bitvalve P2P Exchange API Integration
// European peer-to-peer exchange

export interface BitvalveConfig {
  apiKey?: string;
  baseUrl?: string;
  sandbox?: boolean;
}

export class BitvalveExchangeClass {
  private config: BitvalveConfig;
  private baseUrl: string;

  constructor(config: BitvalveConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || (config.sandbox ? 'https://api-sandbox.bitvalve.com' : 'https://api.bitvalve.com');
  }

  // Basic Information
  static readonly info = {
    name: 'Bitvalve',
    country: 'Europe',
    founded: 2018,
    website: 'https://bitvalve.com/',
    apiDocs: 'https://bitvalve.com/api/',
    status: 'Active',
    supportedCurrencies: '30+',
    features: ['European Focus', 'SEPA Support', 'Escrow System', 'Privacy-focused'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/bitvalve',
    telegram: 'https://t.me/bitvalve',
    reddit: 'https://www.reddit.com/r/bitvalve/',
    youtube: 'https://www.youtube.com/bitvalve',
    facebook: 'https://www.facebook.com/bitvalve',
    linkedin: 'https://www.linkedin.com/company/bitvalve',
  };

  /**
   * Make request to Bitvalve API
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
      throw new Error(`Bitvalve API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(`Bitvalve API error: ${result.error}`);
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
    return this.makeRequest('/api/v1/orders', {
      cryptocurrency: currency,
      currency: baseCurrency,
    });
  }

  /**
   * Get buy orders
   */
  async getBuyOrders(currency: string, baseCurrency: string): Promise<any[]> {
    return this.makeRequest('/api/v1/orders', {
      cryptocurrency: currency,
      currency: baseCurrency,
      order_type: 'buy',
    });
  }

  /**
   * Get sell orders
   */
  async getSellOrders(currency: string, baseCurrency: string): Promise<any[]> {
    return this.makeRequest('/api/v1/orders', {
      cryptocurrency: currency,
      currency: baseCurrency,
      order_type: 'sell',
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
   * Get order statistics
   */
  async getOrderStats(currency: string, baseCurrency: string): Promise<any> {
    return this.makeRequest('/api/v1/order_stats', {
      cryptocurrency: currency,
      currency: baseCurrency,
    });
  }
}

// Static methods for quick access
export const BitvalveExchange = {
  // Quick access methods
  async getCurrencies(): Promise<string[]> {
    const instance = new BitvalveExchangeClass();
    return instance.getCurrencies();
  },

  async getOrderBook(currency: string, baseCurrency: string): Promise<any[]> {
    const instance = new BitvalveExchangeClass();
    return instance.getOrderBook(currency, baseCurrency);
  },

  async getBuyOrders(currency: string, baseCurrency: string): Promise<any[]> {
    const instance = new BitvalveExchangeClass();
    return instance.getBuyOrders(currency, baseCurrency);
  },

  async getSellOrders(currency: string, baseCurrency: string): Promise<any[]> {
    const instance = new BitvalveExchangeClass();
    return instance.getSellOrders(currency, baseCurrency);
  },

  async getPaymentMethods(): Promise<string[]> {
    const instance = new BitvalveExchangeClass();
    return instance.getPaymentMethods();
  },

  async getTradingPairs(): Promise<any[]> {
    const instance = new BitvalveExchangeClass();
    return instance.getTradingPairs();
  },

  async getMarketStats(currency: string, baseCurrency: string): Promise<any> {
    const instance = new BitvalveExchangeClass();
    return instance.getMarketStats(currency, baseCurrency);
  },

  async getTradeHistory(currency: string, baseCurrency: string, limit?: number): Promise<any[]> {
    const instance = new BitvalveExchangeClass();
    return instance.getTradeHistory(currency, baseCurrency, limit);
  },

  async getPriceHistory(currency: string, baseCurrency: string, period?: string): Promise<any[]> {
    const instance = new BitvalveExchangeClass();
    return instance.getPriceHistory(currency, baseCurrency, period);
  },

  async getMarketDepth(currency: string, baseCurrency: string): Promise<any> {
    const instance = new BitvalveExchangeClass();
    return instance.getMarketDepth(currency, baseCurrency);
  },

  async getRecentTrades(currency: string, baseCurrency: string, limit?: number): Promise<any[]> {
    const instance = new BitvalveExchangeClass();
    return instance.getRecentTrades(currency, baseCurrency, limit);
  },

  async getPaymentMethodsForPair(currency: string, baseCurrency: string): Promise<string[]> {
    const instance = new BitvalveExchangeClass();
    return instance.getPaymentMethodsForPair(currency, baseCurrency);
  },

  async getOrderStats(currency: string, baseCurrency: string): Promise<any> {
    const instance = new BitvalveExchangeClass();
    return instance.getOrderStats(currency, baseCurrency);
  },

  // Static properties
  info: BitvalveExchangeClass.info,
  socialMedia: BitvalveExchangeClass.socialMedia,
};

// Export the class as default
export default BitvalveExchange;
