// Coinswitch Exchange API Integration
// Indian instant exchange service

export interface CoinswitchConfig {
  apiKey?: string;
  baseUrl?: string;
  sandbox?: boolean;
}

export class CoinswitchExchangeClass {
  private config: CoinswitchConfig;
  private baseUrl: string;

  constructor(config: CoinswitchConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api.coinswitch.co';
  }

  // Basic Information
  static readonly info = {
    name: 'Coinswitch',
    country: 'India',
    founded: 2017,
    website: 'https://coinswitch.co/',
    apiDocs: 'https://coinswitch.co/api/',
    status: 'Active',
    supportedCurrencies: '100+',
    features: ['Indian Market Focus', 'INR Trading', 'Instant Exchange', 'Mobile App'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/coinswitch',
    telegram: 'https://t.me/coinswitch',
    reddit: 'https://www.reddit.com/r/coinswitch/',
    youtube: 'https://www.youtube.com/coinswitch',
    facebook: 'https://www.facebook.com/coinswitch',
    linkedin: 'https://www.linkedin.com/company/coinswitch',
  };

  /**
   * Make request to Coinswitch API
   */
  private async makeRequest(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.config.apiKey) {
      headers['X-API-Key'] = this.config.apiKey;
    }

    const response = await fetch(url.toString(), { headers });

    if (!response.ok) {
      throw new Error(`Coinswitch API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(`Coinswitch API error: ${result.error}`);
    }

    return result;
  }

  /**
   * Get list of available currencies
   */
  async getCurrencies(): Promise<string[]> {
    const result = await this.makeRequest('/api/v1/coins');
    return result.map((currency: any) => currency.symbol);
  }

  /**
   * Get exchange rate
   */
  async getExchangeRate(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    return this.makeRequest('/api/v1/rate', {
      from: fromCurrency,
      to: toCurrency,
      amount: amount,
    });
  }

  /**
   * Get minimum exchange amount
   */
  async getMinAmount(fromCurrency: string, toCurrency: string): Promise<number> {
    const result = await this.makeRequest('/api/v1/limits', {
      from: fromCurrency,
      to: toCurrency,
    });
    return parseFloat(result.min);
  }

  /**
   * Get maximum exchange amount
   */
  async getMaxAmount(fromCurrency: string, toCurrency: string): Promise<number> {
    const result = await this.makeRequest('/api/v1/limits', {
      from: fromCurrency,
      to: toCurrency,
    });
    return parseFloat(result.max);
  }

  /**
   * Create exchange order
   */
  async createOrder(
    fromCurrency: string,
    toCurrency: string,
    amount: number,
    withdrawalAddress: string,
    returnAddress?: string
  ): Promise<any> {
    const params: any = {
      from: fromCurrency,
      to: toCurrency,
      amount: amount,
      withdrawal: withdrawalAddress,
    };

    if (returnAddress) {
      params.return = returnAddress;
    }

    return this.makeRequest('/api/v1/order', params);
  }

  /**
   * Get order status
   */
  async getOrderStatus(orderId: string): Promise<any> {
    return this.makeRequest('/api/v1/order', { id: orderId });
  }

  /**
   * Get quote for exchange
   */
  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const [rateInfo, minAmount, maxAmount] = await Promise.all([
      this.getExchangeRate(fromCurrency, toCurrency, amount),
      this.getMinAmount(fromCurrency, toCurrency),
      this.getMaxAmount(fromCurrency, toCurrency),
    ]);

    return {
      fromCurrency: fromCurrency.toLowerCase(),
      toCurrency: toCurrency.toLowerCase(),
      fromAmount: amount,
      toAmount: parseFloat(rateInfo.amount),
      rate: parseFloat(rateInfo.rate),
      fee: parseFloat(rateInfo.fee),
      minAmount: minAmount,
      maxAmount: maxAmount,
      estimatedTime: '5-60 minutes',
      exchangeId: 'coinswitch',
      timestamp: Date.now(),
    };
  }

  /**
   * Validate address
   */
  async validateAddress(currency: string, address: string): Promise<boolean> {
    try {
      const result = await this.makeRequest('/api/v1/validate', {
        currency: currency,
        address: address,
      });
      return result.valid;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get order history
   */
  async getOrderHistory(): Promise<any[]> {
    return this.makeRequest('/api/v1/history');
  }

  /**
   * Get supported pairs
   */
  async getSupportedPairs(): Promise<string[]> {
    const result = await this.makeRequest('/api/v1/pairs');
    return result.map((pair: any) => `${pair.from}-${pair.to}`);
  }

  /**
   * Get exchange limits
   */
  async getExchangeLimits(fromCurrency: string, toCurrency: string): Promise<any> {
    const result = await this.makeRequest('/api/v1/limits', {
      from: fromCurrency,
      to: toCurrency,
    });

    return {
      min: parseFloat(result.min),
      max: parseFloat(result.max),
      from: fromCurrency,
      to: toCurrency,
    };
  }

  /**
   * Get INR rates
   */
  async getINRRates(): Promise<any> {
    return this.makeRequest('/api/v1/inr-rates');
  }
}

// Static methods for quick access
export const CoinswitchExchange = {
  // Quick access methods
  async getCurrencies(): Promise<string[]> {
    const instance = new CoinswitchExchangeClass();
    return instance.getCurrencies();
  },

  async getExchangeRate(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new CoinswitchExchangeClass();
    return instance.getExchangeRate(fromCurrency, toCurrency, amount);
  },

  async getMinAmount(fromCurrency: string, toCurrency: string): Promise<number> {
    const instance = new CoinswitchExchangeClass();
    return instance.getMinAmount(fromCurrency, toCurrency);
  },

  async getMaxAmount(fromCurrency: string, toCurrency: string): Promise<number> {
    const instance = new CoinswitchExchangeClass();
    return instance.getMaxAmount(fromCurrency, toCurrency);
  },

  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new CoinswitchExchangeClass();
    return instance.getQuote(fromCurrency, toCurrency, amount);
  },

  async validateAddress(currency: string, address: string): Promise<boolean> {
    const instance = new CoinswitchExchangeClass();
    return instance.validateAddress(currency, address);
  },

  async getSupportedPairs(): Promise<string[]> {
    const instance = new CoinswitchExchangeClass();
    return instance.getSupportedPairs();
  },

  async getExchangeLimits(fromCurrency: string, toCurrency: string): Promise<any> {
    const instance = new CoinswitchExchangeClass();
    return instance.getExchangeLimits(fromCurrency, toCurrency);
  },

  async getINRRates(): Promise<any> {
    const instance = new CoinswitchExchangeClass();
    return instance.getINRRates();
  },

  async getOrderStatus(orderId: string): Promise<any> {
    const instance = new CoinswitchExchangeClass();
    return instance.getOrderStatus(orderId);
  },

  // Static properties
  info: CoinswitchExchangeClass.info,
  socialMedia: CoinswitchExchangeClass.socialMedia,
};

// Export the class as default
export default CoinswitchExchange;
