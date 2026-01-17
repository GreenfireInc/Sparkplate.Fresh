// Bisq P2P Exchange API Integration
// Decentralized peer-to-peer exchange

export interface BisqConfig {
  apiKey?: string;
  baseUrl?: string;
  sandbox?: boolean;
}

export class BisqExchangeClass {
  private config: BisqConfig;
  private baseUrl: string;

  constructor(config: BisqConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || (config.sandbox ? 'https://api-sandbox.bisq.network' : 'https://api.bisq.network');
  }

  // Basic Information
  static readonly info = {
    name: 'Bisq',
    country: 'Global',
    founded: 2014,
    website: 'https://bisq.network/',
    apiDocs: 'https://bisq.network/api/',
    status: 'Active',
    supportedCurrencies: '100+',
    features: ['Decentralized', 'No KYC', 'Privacy-focused', 'Escrow System'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/bisq_network',
    telegram: 'https://t.me/bisq',
    discord: 'https://discord.gg/bisq',
    reddit: 'https://www.reddit.com/r/bisq/',
    youtube: 'https://www.youtube.com/bisq',
    facebook: 'https://www.facebook.com/bisq',
    linkedin: 'https://www.linkedin.com/company/bisq',
    github: 'https://github.com/bisq-network',
  };

  /**
   * Make request to Bisq API
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
      throw new Error(`Bisq API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(`Bisq API error: ${result.error}`);
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
    return this.makeRequest('/api/v1/orderbook', {
      currency: currency,
      baseCurrency: baseCurrency,
    });
  }

  /**
   * Get buy orders
   */
  async getBuyOrders(currency: string, baseCurrency: string): Promise<any[]> {
    return this.makeRequest('/api/v1/orders/buy', {
      currency: currency,
      baseCurrency: baseCurrency,
    });
  }

  /**
   * Get sell orders
   */
  async getSellOrders(currency: string, baseCurrency: string): Promise<any[]> {
    return this.makeRequest('/api/v1/orders/sell', {
      currency: currency,
      baseCurrency: baseCurrency,
    });
  }

  /**
   * Get payment methods
   */
  async getPaymentMethods(): Promise<string[]> {
    return this.makeRequest('/api/v1/payment-methods');
  }

  /**
   * Get trading pairs
   */
  async getTradingPairs(): Promise<any[]> {
    return this.makeRequest('/api/v1/trading-pairs');
  }

  /**
   * Get market statistics
   */
  async getMarketStats(currency: string, baseCurrency: string): Promise<any> {
    return this.makeRequest('/api/v1/market-stats', {
      currency: currency,
      baseCurrency: baseCurrency,
    });
  }

  /**
   * Get trade history
   */
  async getTradeHistory(currency: string, baseCurrency: string, limit?: number): Promise<any[]> {
    const params: any = { currency, baseCurrency };
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
    const params: any = { userId };
    if (limit) params.limit = limit;
    
    return this.makeRequest('/api/v1/user-trades', params);
  }

  /**
   * Get dispute information
   */
  async getDisputeInfo(disputeId: string): Promise<any> {
    return this.makeRequest(`/api/v1/disputes/${disputeId}`);
  }

  /**
   * Get arbitration information
   */
  async getArbitrationInfo(arbitrationId: string): Promise<any> {
    return this.makeRequest(`/api/v1/arbitrations/${arbitrationId}`);
  }

  /**
   * Get escrow status
   */
  async getEscrowStatus(tradeId: string): Promise<any> {
    return this.makeRequest(`/api/v1/escrow/${tradeId}`);
  }

  /**
   * Get network statistics
   */
  async getNetworkStats(): Promise<any> {
    return this.makeRequest('/api/v1/network-stats');
  }

  /**
   * Get price history
   */
  async getPriceHistory(currency: string, baseCurrency: string, period: string = '7d'): Promise<any[]> {
    return this.makeRequest('/api/v1/price-history', {
      currency: currency,
      baseCurrency: baseCurrency,
      period: period,
    });
  }

  /**
   * Get market depth
   */
  async getMarketDepth(currency: string, baseCurrency: string): Promise<any> {
    return this.makeRequest('/api/v1/market-depth', {
      currency: currency,
      baseCurrency: baseCurrency,
    });
  }

  /**
   * Get recent trades
   */
  async getRecentTrades(currency: string, baseCurrency: string, limit: number = 50): Promise<any[]> {
    return this.makeRequest('/api/v1/recent-trades', {
      currency: currency,
      baseCurrency: baseCurrency,
      limit: limit,
    });
  }

  /**
   * Get supported payment methods for a currency pair
   */
  async getPaymentMethodsForPair(currency: string, baseCurrency: string): Promise<string[]> {
    return this.makeRequest('/api/v1/payment-methods/pair', {
      currency: currency,
      baseCurrency: baseCurrency,
    });
  }

  /**
   * Get order statistics
   */
  async getOrderStats(currency: string, baseCurrency: string): Promise<any> {
    return this.makeRequest('/api/v1/order-stats', {
      currency: currency,
      baseCurrency: baseCurrency,
    });
  }
}

// Static methods for quick access
export const BisqExchange = {
  // Quick access methods
  async getCurrencies(): Promise<string[]> {
    const instance = new BisqExchangeClass();
    return instance.getCurrencies();
  },

  async getOrderBook(currency: string, baseCurrency: string): Promise<any[]> {
    const instance = new BisqExchangeClass();
    return instance.getOrderBook(currency, baseCurrency);
  },

  async getBuyOrders(currency: string, baseCurrency: string): Promise<any[]> {
    const instance = new BisqExchangeClass();
    return instance.getBuyOrders(currency, baseCurrency);
  },

  async getSellOrders(currency: string, baseCurrency: string): Promise<any[]> {
    const instance = new BisqExchangeClass();
    return instance.getSellOrders(currency, baseCurrency);
  },

  async getPaymentMethods(): Promise<string[]> {
    const instance = new BisqExchangeClass();
    return instance.getPaymentMethods();
  },

  async getTradingPairs(): Promise<any[]> {
    const instance = new BisqExchangeClass();
    return instance.getTradingPairs();
  },

  async getMarketStats(currency: string, baseCurrency: string): Promise<any> {
    const instance = new BisqExchangeClass();
    return instance.getMarketStats(currency, baseCurrency);
  },

  async getTradeHistory(currency: string, baseCurrency: string, limit?: number): Promise<any[]> {
    const instance = new BisqExchangeClass();
    return instance.getTradeHistory(currency, baseCurrency, limit);
  },

  async getPriceHistory(currency: string, baseCurrency: string, period?: string): Promise<any[]> {
    const instance = new BisqExchangeClass();
    return instance.getPriceHistory(currency, baseCurrency, period);
  },

  async getMarketDepth(currency: string, baseCurrency: string): Promise<any> {
    const instance = new BisqExchangeClass();
    return instance.getMarketDepth(currency, baseCurrency);
  },

  async getRecentTrades(currency: string, baseCurrency: string, limit?: number): Promise<any[]> {
    const instance = new BisqExchangeClass();
    return instance.getRecentTrades(currency, baseCurrency, limit);
  },

  async getPaymentMethodsForPair(currency: string, baseCurrency: string): Promise<string[]> {
    const instance = new BisqExchangeClass();
    return instance.getPaymentMethodsForPair(currency, baseCurrency);
  },

  async getOrderStats(currency: string, baseCurrency: string): Promise<any> {
    const instance = new BisqExchangeClass();
    return instance.getOrderStats(currency, baseCurrency);
  },

  // Static properties
  info: BisqExchangeClass.info,
  socialMedia: BisqExchangeClass.socialMedia,
};

// Export the class as default
export default BisqExchange;
