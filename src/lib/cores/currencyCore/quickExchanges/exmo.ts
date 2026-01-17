// EXMO Exchange API Integration
// European exchange with instant swaps

export interface ExmoConfig {
  apiKey?: string;
  apiSecret?: string;
  baseUrl?: string;
  sandbox?: boolean;
}

export class ExmoExchangeClass {
  private config: ExmoConfig;
  private baseUrl: string;

  constructor(config: ExmoConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api.exmo.com';
  }

  // Basic Information
  static readonly info = {
    name: 'EXMO',
    country: 'United Kingdom',
    founded: 2014,
    website: 'https://exmo.com/',
    apiDocs: 'https://exmo.com/en/api',
    status: 'Active',
    supportedCurrencies: '200+',
    features: ['Spot Trading', 'Instant Swaps', 'Margin Trading', 'Staking'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/exmo_com',
    telegram: 'https://t.me/exmo_com',
    reddit: 'https://www.reddit.com/r/exmo/',
    youtube: 'https://www.youtube.com/exmo',
    facebook: 'https://www.facebook.com/exmo.com',
    linkedin: 'https://www.linkedin.com/company/exmo',
  };

  /**
   * Make request to EXMO API
   */
  private async makeRequest(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.config.apiKey) {
      headers['Key'] = this.config.apiKey;
      headers['Sign'] = this.config.apiSecret || ''; // In real implementation, you'd generate HMAC signature
    }

    const response = await fetch(url.toString(), { headers });

    if (!response.ok) {
      throw new Error(`EXMO API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(`EXMO API error: ${result.error}`);
    }

    return result;
  }

  /**
   * Get list of available currencies
   */
  async getCurrencies(): Promise<string[]> {
    const result = await this.makeRequest('/v1/currency');
    return result;
  }

  /**
   * Get exchange rates
   */
  async getExchangeRates(): Promise<any> {
    return this.makeRequest('/v1/ticker');
  }

  /**
   * Get exchange rate for a specific pair
   */
  async getExchangeRate(fromCurrency: string, toCurrency: string): Promise<any> {
    const rates = await this.getExchangeRates();
    const pair = `${fromCurrency}_${toCurrency}`;
    return rates[pair];
  }

  /**
   * Get order book
   */
  async getOrderBook(pair: string, limit?: number): Promise<any> {
    const params: any = { pair };
    if (limit) params.limit = limit;
    return this.makeRequest('/v1/order_book', params);
  }

  /**
   * Get trades
   */
  async getTrades(pair: string, limit?: number): Promise<any> {
    const params: any = { pair };
    if (limit) params.limit = limit;
    return this.makeRequest('/v1/trades', params);
  }

  /**
   * Get user info (requires authentication)
   */
  async getUserInfo(): Promise<any> {
    return this.makeRequest('/v1/user_info');
  }

  /**
   * Get user trades (requires authentication)
   */
  async getUserTrades(pair?: string, limit?: number): Promise<any> {
    const params: any = {};
    if (pair) params.pair = pair;
    if (limit) params.limit = limit;
    return this.makeRequest('/v1/user_trades', params);
  }

  /**
   * Get user orders (requires authentication)
   */
  async getUserOrders(pair?: string): Promise<any> {
    const params: any = {};
    if (pair) params.pair = pair;
    return this.makeRequest('/v1/user_orders', params);
  }

  /**
   * Get quote for exchange
   */
  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const rateInfo = await this.getExchangeRate(fromCurrency, toCurrency);
    const estimatedAmount = amount * parseFloat(rateInfo.last_trade);

    return {
      fromCurrency: fromCurrency.toLowerCase(),
      toCurrency: toCurrency.toLowerCase(),
      fromAmount: amount,
      toAmount: estimatedAmount,
      rate: parseFloat(rateInfo.last_trade),
      fee: parseFloat(rateInfo.avg) - parseFloat(rateInfo.last_trade), // Approximate fee
      estimatedTime: 'Instant',
      exchangeId: 'exmo',
      timestamp: Date.now(),
    };
  }

  /**
   * Get trading pairs
   */
  async getTradingPairs(): Promise<string[]> {
    const result = await this.makeRequest('/v1/pair_settings');
    return Object.keys(result);
  }

  /**
   * Get exchange limits
   */
  async getExchangeLimits(fromCurrency: string, toCurrency: string): Promise<any> {
    const pairSettings = await this.makeRequest('/v1/pair_settings');
    const pair = `${fromCurrency}_${toCurrency}`;
    const settings = pairSettings[pair];

    return {
      min: parseFloat(settings.min_quantity) || 0,
      max: parseFloat(settings.max_quantity) || 0,
      from: fromCurrency,
      to: toCurrency,
    };
  }

  /**
   * Get exchange status
   */
  async getExchangeStatus(): Promise<any> {
    return this.makeRequest('/v1/exchange_status');
  }

  /**
   * Validate address
   */
  async validateAddress(currency: string, address: string): Promise<boolean> {
    try {
      const result = await this.makeRequest('/v1/validate_address', {
        currency: currency,
        address: address,
      });
      return result.valid;
    } catch (error) {
      return false;
    }
  }
}

// Static methods for quick access
export const ExmoExchange = {
  // Quick access methods
  async getCurrencies(): Promise<string[]> {
    const instance = new ExmoExchangeClass();
    return instance.getCurrencies();
  },

  async getExchangeRates(): Promise<any> {
    const instance = new ExmoExchangeClass();
    return instance.getExchangeRates();
  },

  async getExchangeRate(fromCurrency: string, toCurrency: string): Promise<any> {
    const instance = new ExmoExchangeClass();
    return instance.getExchangeRate(fromCurrency, toCurrency);
  },

  async getOrderBook(pair: string, limit?: number): Promise<any> {
    const instance = new ExmoExchangeClass();
    return instance.getOrderBook(pair, limit);
  },

  async getTrades(pair: string, limit?: number): Promise<any> {
    const instance = new ExmoExchangeClass();
    return instance.getTrades(pair, limit);
  },

  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new ExmoExchangeClass();
    return instance.getQuote(fromCurrency, toCurrency, amount);
  },

  async getTradingPairs(): Promise<string[]> {
    const instance = new ExmoExchangeClass();
    return instance.getTradingPairs();
  },

  async getExchangeLimits(fromCurrency: string, toCurrency: string): Promise<any> {
    const instance = new ExmoExchangeClass();
    return instance.getExchangeLimits(fromCurrency, toCurrency);
  },

  async getExchangeStatus(): Promise<any> {
    const instance = new ExmoExchangeClass();
    return instance.getExchangeStatus();
  },

  async validateAddress(currency: string, address: string): Promise<boolean> {
    const instance = new ExmoExchangeClass();
    return instance.validateAddress(currency, address);
  },

  // Static properties
  info: ExmoExchangeClass.info,
  socialMedia: ExmoExchangeClass.socialMedia,
};

// Export the class as default
export default ExmoExchange;
