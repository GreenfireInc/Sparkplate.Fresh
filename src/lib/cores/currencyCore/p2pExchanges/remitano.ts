// Remitano P2P Exchange API Integration
// Global peer-to-peer exchange

export interface RemitanoConfig {
  apiKey?: string;
  baseUrl?: string;
  sandbox?: boolean;
}

export class RemitanoExchangeClass {
  private config: RemitanoConfig;
  private baseUrl: string;

  constructor(config: RemitanoConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || (config.sandbox ? 'https://api-sandbox.remitano.com' : 'https://api.remitano.com');
  }

  // Basic Information
  static readonly info = {
    name: 'Remitano',
    country: 'Global',
    founded: 2014,
    website: 'https://remitano.com/',
    apiDocs: 'https://remitano.com/api/',
    status: 'Active',
    supportedCurrencies: '30+',
    features: ['Multiple Payment Methods', 'Escrow System', 'Global Coverage', 'Mobile App'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/remitano',
    telegram: 'https://t.me/remitano',
    reddit: 'https://www.reddit.com/r/remitano/',
    youtube: 'https://www.youtube.com/remitano',
    facebook: 'https://www.facebook.com/remitano',
    linkedin: 'https://www.linkedin.com/company/remitano',
  };

  /**
   * Make request to Remitano API
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
      throw new Error(`Remitano API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(`Remitano API error: ${result.error}`);
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
    return this.makeRequest('/api/v1/offers', {
      cryptocurrency: currency,
      currency: baseCurrency,
    });
  }

  /**
   * Get buy offers
   */
  async getBuyOffers(currency: string, baseCurrency: string): Promise<any[]> {
    return this.makeRequest('/api/v1/offers', {
      cryptocurrency: currency,
      currency: baseCurrency,
      offer_type: 'buy',
    });
  }

  /**
   * Get sell offers
   */
  async getSellOffers(currency: string, baseCurrency: string): Promise<any[]> {
    return this.makeRequest('/api/v1/offers', {
      cryptocurrency: currency,
      currency: baseCurrency,
      offer_type: 'sell',
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
   * Get offer statistics
   */
  async getOfferStats(currency: string, baseCurrency: string): Promise<any> {
    return this.makeRequest('/api/v1/offer_stats', {
      cryptocurrency: currency,
      currency: baseCurrency,
    });
  }
}

// Static methods for quick access
export const RemitanoExchange = {
  // Quick access methods
  async getCurrencies(): Promise<string[]> {
    const instance = new RemitanoExchangeClass();
    return instance.getCurrencies();
  },

  async getOrderBook(currency: string, baseCurrency: string): Promise<any[]> {
    const instance = new RemitanoExchangeClass();
    return instance.getOrderBook(currency, baseCurrency);
  },

  async getBuyOffers(currency: string, baseCurrency: string): Promise<any[]> {
    const instance = new RemitanoExchangeClass();
    return instance.getBuyOffers(currency, baseCurrency);
  },

  async getSellOffers(currency: string, baseCurrency: string): Promise<any[]> {
    const instance = new RemitanoExchangeClass();
    return instance.getSellOffers(currency, baseCurrency);
  },

  async getPaymentMethods(): Promise<string[]> {
    const instance = new RemitanoExchangeClass();
    return instance.getPaymentMethods();
  },

  async getTradingPairs(): Promise<any[]> {
    const instance = new RemitanoExchangeClass();
    return instance.getTradingPairs();
  },

  async getMarketStats(currency: string, baseCurrency: string): Promise<any> {
    const instance = new RemitanoExchangeClass();
    return instance.getMarketStats(currency, baseCurrency);
  },

  async getTradeHistory(currency: string, baseCurrency: string, limit?: number): Promise<any[]> {
    const instance = new RemitanoExchangeClass();
    return instance.getTradeHistory(currency, baseCurrency, limit);
  },

  async getPriceHistory(currency: string, baseCurrency: string, period?: string): Promise<any[]> {
    const instance = new RemitanoExchangeClass();
    return instance.getPriceHistory(currency, baseCurrency, period);
  },

  async getMarketDepth(currency: string, baseCurrency: string): Promise<any> {
    const instance = new RemitanoExchangeClass();
    return instance.getMarketDepth(currency, baseCurrency);
  },

  async getRecentTrades(currency: string, baseCurrency: string, limit?: number): Promise<any[]> {
    const instance = new RemitanoExchangeClass();
    return instance.getRecentTrades(currency, baseCurrency, limit);
  },

  async getPaymentMethodsForPair(currency: string, baseCurrency: string): Promise<string[]> {
    const instance = new RemitanoExchangeClass();
    return instance.getPaymentMethodsForPair(currency, baseCurrency);
  },

  async getOfferStats(currency: string, baseCurrency: string): Promise<any> {
    const instance = new RemitanoExchangeClass();
    return instance.getOfferStats(currency, baseCurrency);
  },

  // Static properties
  info: RemitanoExchangeClass.info,
  socialMedia: RemitanoExchangeClass.socialMedia,
};

// Export the class as default
export default RemitanoExchange;
