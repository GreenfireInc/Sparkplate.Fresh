// Switchain Exchange API Integration
// Instant cryptocurrency exchange

export interface SwitchainConfig {
  apiKey?: string;
  baseUrl?: string;
  sandbox?: boolean;
}

export class SwitchainExchangeClass {
  private config: SwitchainConfig;
  private baseUrl: string;

  constructor(config: SwitchainConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api.switchain.com';
  }

  // Basic Information
  static readonly info = {
    name: 'Switchain',
    country: 'Global',
    founded: 2019,
    website: 'https://switchain.com/',
    apiDocs: 'https://switchain.com/api',
    status: 'Active',
    supportedCurrencies: '150+',
    features: ['Instant Exchange', 'Multiple Payment Methods', 'Fixed Rate', 'No KYC'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/switchain',
    telegram: 'https://t.me/switchain',
    reddit: 'https://www.reddit.com/r/switchain/',
    youtube: 'https://www.youtube.com/switchain',
    facebook: 'https://www.facebook.com/switchain',
    linkedin: 'https://www.linkedin.com/company/switchain',
  };

  /**
   * Make request to Switchain API
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
      throw new Error(`Switchain API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(`Switchain API error: ${result.error}`);
    }

    return result;
  }

  /**
   * Get list of available currencies
   */
  async getCurrencies(): Promise<string[]> {
    const result = await this.makeRequest('/api/v1/currencies');
    return result.map((currency: any) => currency.code);
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
   * Get exchange quote with detailed information
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
      estimatedTime: rateInfo.estimated_time || '10-60 minutes',
      exchangeId: 'switchain',
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
   * Get supported pairs
   */
  async getSupportedPairs(): Promise<string[]> {
    const result = await this.makeRequest('/api/v1/pairs');
    return result.map((pair: any) => `${pair.from}-${pair.to}`);
  }

  /**
   * Get exchange status
   */
  async getExchangeStatus(): Promise<any> {
    return this.makeRequest('/api/v1/status');
  }
}

// Static methods for quick access
export const SwitchainExchange = {
  // Quick access methods
  async getCurrencies(): Promise<string[]> {
    const instance = new SwitchainExchangeClass();
    return instance.getCurrencies();
  },

  async getExchangeRate(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new SwitchainExchangeClass();
    return instance.getExchangeRate(fromCurrency, toCurrency, amount);
  },

  async getMinAmount(fromCurrency: string, toCurrency: string): Promise<number> {
    const instance = new SwitchainExchangeClass();
    return instance.getMinAmount(fromCurrency, toCurrency);
  },

  async getMaxAmount(fromCurrency: string, toCurrency: string): Promise<number> {
    const instance = new SwitchainExchangeClass();
    return instance.getMaxAmount(fromCurrency, toCurrency);
  },

  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new SwitchainExchangeClass();
    return instance.getQuote(fromCurrency, toCurrency, amount);
  },

  async validateAddress(currency: string, address: string): Promise<boolean> {
    const instance = new SwitchainExchangeClass();
    return instance.validateAddress(currency, address);
  },

  async getExchangeLimits(fromCurrency: string, toCurrency: string): Promise<any> {
    const instance = new SwitchainExchangeClass();
    return instance.getExchangeLimits(fromCurrency, toCurrency);
  },

  async getSupportedPairs(): Promise<string[]> {
    const instance = new SwitchainExchangeClass();
    return instance.getSupportedPairs();
  },

  async getTransactionStatus(transactionId: string): Promise<any> {
    const instance = new SwitchainExchangeClass();
    return instance.getTransactionStatus(transactionId);
  },

  async getExchangeStatus(): Promise<any> {
    const instance = new SwitchainExchangeClass();
    return instance.getExchangeStatus();
  },

  // Static properties
  info: SwitchainExchangeClass.info,
  socialMedia: SwitchainExchangeClass.socialMedia,
};

// Export the class as default
export default SwitchainExchange;
