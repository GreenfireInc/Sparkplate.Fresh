// FixedFloat Quick Exchange API Integration
// Global instant exchange service

export interface FixedFloatConfig {
  apiKey?: string;
  baseUrl?: string;
  sandbox?: boolean;
}

export class FixedFloatExchangeClass {
  private config: FixedFloatConfig;
  private baseUrl: string;

  constructor(config: FixedFloatConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || (config.sandbox ? 'https://api-sandbox.fixedfloat.com' : 'https://api.fixedfloat.com');
  }

  // Basic Information
  static readonly info = {
    name: 'FixedFloat',
    country: 'Global',
    founded: 2018,
    website: 'https://fixedfloat.com/',
    apiDocs: 'https://fixedfloat.com/api/',
    status: 'Active',
    supportedCurrencies: '100+',
    features: ['Fixed Rate', 'Fast Exchange', 'Low Fees', 'No KYC'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/fixedfloat',
    telegram: 'https://t.me/fixedfloat',
    reddit: 'https://www.reddit.com/r/fixedfloat/',
    youtube: 'https://www.youtube.com/fixedfloat',
    facebook: 'https://www.facebook.com/fixedfloat',
    linkedin: 'https://www.linkedin.com/company/fixedfloat',
  };

  /**
   * Make request to FixedFloat API
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
      throw new Error(`FixedFloat API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(`FixedFloat API error: ${result.error}`);
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
   * Get exchange rate
   */
  async getExchangeRate(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    return this.makeRequest('/api/v1/exchange-rate', {
      from: fromCurrency,
      to: toCurrency,
      amount: amount,
    });
  }

  /**
   * Get estimated amount
   */
  async getEstimatedAmount(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const rate = await this.getExchangeRate(fromCurrency, toCurrency, amount);
    return {
      fromCurrency: fromCurrency.toLowerCase(),
      toCurrency: toCurrency.toLowerCase(),
      fromAmount: amount,
      toAmount: rate.estimatedAmount,
      rate: rate.rate,
      fee: rate.fee,
      estimatedTime: '5-30 minutes',
      exchangeId: 'fixedfloat',
      timestamp: Date.now(),
    };
  }

  /**
   * Get quote
   */
  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    return this.getEstimatedAmount(fromCurrency, toCurrency, amount);
  }

  /**
   * Create transaction
   */
  async createTransaction(params: {
    fromCurrency: string;
    toCurrency: string;
    fromAmount: number;
    fromAddress: string;
    toAddress: string;
  }): Promise<any> {
    return this.makeRequest('/api/v1/transactions', params);
  }

  /**
   * Get transaction status
   */
  async getTransactionStatus(transactionId: string): Promise<any> {
    return this.makeRequest(`/api/v1/transactions/${transactionId}`);
  }

  /**
   * Get transaction history
   */
  async getTransactionHistory(limit?: number): Promise<any[]> {
    const params: any = {};
    if (limit) params.limit = limit;
    
    return this.makeRequest('/api/v1/transactions', params);
  }

  /**
   * Get minimum amount
   */
  async getMinimumAmount(fromCurrency: string, toCurrency: string): Promise<any> {
    return this.makeRequest('/api/v1/min-amount', {
      from: fromCurrency,
      to: toCurrency,
    });
  }

  /**
   * Get maximum amount
   */
  async getMaximumAmount(fromCurrency: string, toCurrency: string): Promise<any> {
    return this.makeRequest('/api/v1/max-amount', {
      from: fromCurrency,
      to: toCurrency,
    });
  }

  /**
   * Validate address
   */
  async validateAddress(currency: string, address: string): Promise<any> {
    return this.makeRequest('/api/v1/validate-address', {
      currency: currency,
      address: address,
    });
  }
}

// Static methods for quick access
export const FixedFloatExchange = {
  // Quick access methods
  async getCurrencies(): Promise<string[]> {
    const instance = new FixedFloatExchangeClass();
    return instance.getCurrencies();
  },

  async getExchangeRate(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new FixedFloatExchangeClass();
    return instance.getExchangeRate(fromCurrency, toCurrency, amount);
  },

  async getEstimatedAmount(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new FixedFloatExchangeClass();
    return instance.getEstimatedAmount(fromCurrency, toCurrency, amount);
  },

  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new FixedFloatExchangeClass();
    return instance.getQuote(fromCurrency, toCurrency, amount);
  },

  async getTransactionStatus(transactionId: string): Promise<any> {
    const instance = new FixedFloatExchangeClass();
    return instance.getTransactionStatus(transactionId);
  },

  async getMinimumAmount(fromCurrency: string, toCurrency: string): Promise<any> {
    const instance = new FixedFloatExchangeClass();
    return instance.getMinimumAmount(fromCurrency, toCurrency);
  },

  async getMaximumAmount(fromCurrency: string, toCurrency: string): Promise<any> {
    const instance = new FixedFloatExchangeClass();
    return instance.getMaximumAmount(fromCurrency, toCurrency);
  },

  async validateAddress(currency: string, address: string): Promise<any> {
    const instance = new FixedFloatExchangeClass();
    return instance.validateAddress(currency, address);
  },

  // Static properties
  info: FixedFloatExchangeClass.info,
  socialMedia: FixedFloatExchangeClass.socialMedia,
};

// Export the class as default
export default FixedFloatExchange;
