// Easybit Exchange API Integration
// Simple instant exchange service

export interface EasybitConfig {
  apiKey?: string;
  baseUrl?: string;
  sandbox?: boolean;
}

export class EasybitExchangeClass {
  private config: EasybitConfig;
  private baseUrl: string;

  constructor(config: EasybitConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api.easybit.com';
  }

  // Basic Information
  static readonly info = {
    name: 'Easybit',
    country: 'Global',
    founded: 2019,
    website: 'https://easybit.com/',
    apiDocs: 'https://easybit.com/api',
    status: 'Active',
    supportedCurrencies: '100+',
    features: ['Simple Interface', 'Instant Exchange', 'No Registration', 'Fixed Rate'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/easybit',
    telegram: 'https://t.me/easybit',
    reddit: 'https://www.reddit.com/r/easybit/',
    facebook: 'https://www.facebook.com/easybit',
    linkedin: 'https://www.linkedin.com/company/easybit',
  };

  /**
   * Make request to Easybit API
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
      throw new Error(`Easybit API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(`Easybit API error: ${result.error}`);
    }

    return result;
  }

  /**
   * Get list of available currencies
   */
  async getCurrencies(): Promise<string[]> {
    const result = await this.makeRequest('/api/v1/currencies');
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
   * Create exchange transaction
   */
  async createExchange(
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

    return this.makeRequest('/api/v1/transaction', params);
  }

  /**
   * Get transaction status
   */
  async getTransactionStatus(transactionId: string): Promise<any> {
    return this.makeRequest('/api/v1/transaction', { id: transactionId });
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
      exchangeId: 'easybit',
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
   * Get transaction history
   */
  async getTransactionHistory(): Promise<any[]> {
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
   * Get exchange status
   */
  async getExchangeStatus(): Promise<any> {
    return this.makeRequest('/api/v1/status');
  }
}

// Static methods for quick access
export const EasybitExchange = {
  // Quick access methods
  async getCurrencies(): Promise<string[]> {
    const instance = new EasybitExchangeClass();
    return instance.getCurrencies();
  },

  async getExchangeRate(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new EasybitExchangeClass();
    return instance.getExchangeRate(fromCurrency, toCurrency, amount);
  },

  async getMinAmount(fromCurrency: string, toCurrency: string): Promise<number> {
    const instance = new EasybitExchangeClass();
    return instance.getMinAmount(fromCurrency, toCurrency);
  },

  async getMaxAmount(fromCurrency: string, toCurrency: string): Promise<number> {
    const instance = new EasybitExchangeClass();
    return instance.getMaxAmount(fromCurrency, toCurrency);
  },

  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new EasybitExchangeClass();
    return instance.getQuote(fromCurrency, toCurrency, amount);
  },

  async validateAddress(currency: string, address: string): Promise<boolean> {
    const instance = new EasybitExchangeClass();
    return instance.validateAddress(currency, address);
  },

  async getSupportedPairs(): Promise<string[]> {
    const instance = new EasybitExchangeClass();
    return instance.getSupportedPairs();
  },

  async getExchangeLimits(fromCurrency: string, toCurrency: string): Promise<any> {
    const instance = new EasybitExchangeClass();
    return instance.getExchangeLimits(fromCurrency, toCurrency);
  },

  async getTransactionStatus(transactionId: string): Promise<any> {
    const instance = new EasybitExchangeClass();
    return instance.getTransactionStatus(transactionId);
  },

  async getExchangeStatus(): Promise<any> {
    const instance = new EasybitExchangeClass();
    return instance.getExchangeStatus();
  },

  // Static properties
  info: EasybitExchangeClass.info,
  socialMedia: EasybitExchangeClass.socialMedia,
};

// Export the class as default
export default EasybitExchange;
