// AlfaCash Quick Exchange API Integration
// Swiss instant exchange service

export interface AlfaCashConfig {
  apiKey?: string;
  baseUrl?: string;
  sandbox?: boolean;
}

export class AlfaCashExchangeClass {
  private config: AlfaCashConfig;
  private baseUrl: string;

  constructor(config: AlfaCashConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || (config.sandbox ? 'https://api-sandbox.alfacash.com' : 'https://api.alfacash.com');
  }

  // Basic Information
  static readonly info = {
    name: 'AlfaCash',
    country: 'Switzerland',
    founded: 2019,
    website: 'https://alfacash.com/',
    apiDocs: 'https://alfacash.com/api/',
    status: 'Active',
    supportedCurrencies: '100+',
    features: ['Swiss Quality', 'Fast Exchange', 'Low Fees', 'Secure'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/alfacash',
    telegram: 'https://t.me/alfacash',
    reddit: 'https://www.reddit.com/r/alfacash/',
    youtube: 'https://www.youtube.com/alfacash',
    facebook: 'https://www.facebook.com/alfacash',
    linkedin: 'https://www.linkedin.com/company/alfacash',
  };

  /**
   * Make request to AlfaCash API
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
      throw new Error(`AlfaCash API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(`AlfaCash API error: ${result.error}`);
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
      exchangeId: 'alfacash',
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
export const AlfaCashExchange = {
  // Quick access methods
  async getCurrencies(): Promise<string[]> {
    const instance = new AlfaCashExchangeClass();
    return instance.getCurrencies();
  },

  async getExchangeRate(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new AlfaCashExchangeClass();
    return instance.getExchangeRate(fromCurrency, toCurrency, amount);
  },

  async getEstimatedAmount(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new AlfaCashExchangeClass();
    return instance.getEstimatedAmount(fromCurrency, toCurrency, amount);
  },

  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new AlfaCashExchangeClass();
    return instance.getQuote(fromCurrency, toCurrency, amount);
  },

  async getTransactionStatus(transactionId: string): Promise<any> {
    const instance = new AlfaCashExchangeClass();
    return instance.getTransactionStatus(transactionId);
  },

  async getMinimumAmount(fromCurrency: string, toCurrency: string): Promise<any> {
    const instance = new AlfaCashExchangeClass();
    return instance.getMinimumAmount(fromCurrency, toCurrency);
  },

  async getMaximumAmount(fromCurrency: string, toCurrency: string): Promise<any> {
    const instance = new AlfaCashExchangeClass();
    return instance.getMaximumAmount(fromCurrency, toCurrency);
  },

  async validateAddress(currency: string, address: string): Promise<any> {
    const instance = new AlfaCashExchangeClass();
    return instance.validateAddress(currency, address);
  },

  // Static properties
  info: AlfaCashExchangeClass.info,
  socialMedia: AlfaCashExchangeClass.socialMedia,
};

// Export the class as default
export default AlfaCashExchange;
