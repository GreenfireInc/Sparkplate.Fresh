// Sardine Ramp API Integration
// Fraud prevention platform

export interface SardineConfig {
  apiKey?: string;
  baseUrl?: string;
  sandbox?: boolean;
}

export class SardineRampClass {
  private config: SardineConfig;
  private baseUrl: string;

  constructor(config: SardineConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || (config.sandbox ? 'https://api-sandbox.sardine.ai' : 'https://api.sardine.ai');
  }

  // Basic Information
  static readonly info = {
    name: 'Sardine',
    country: 'Global',
    founded: 2020,
    website: 'https://sardine.ai/',
    apiDocs: 'https://sardine.ai/api/',
    status: 'Active',
    supportedCurrencies: '30+',
    features: ['Fraud Prevention', 'Credit Card', 'Bank Transfer', 'Compliance'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/sardine_ai',
    telegram: 'https://t.me/sardine',
    reddit: 'https://www.reddit.com/r/sardine/',
    youtube: 'https://www.youtube.com/sardine',
    facebook: 'https://www.facebook.com/sardine',
    linkedin: 'https://www.linkedin.com/company/sardine',
  };

  /**
   * Make request to Sardine API
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
      throw new Error(`Sardine API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(`Sardine API error: ${result.error}`);
    }

    return result;
  }

  /**
   * Get list of supported currencies
   */
  async getCurrencies(): Promise<any[]> {
    return this.makeRequest('/api/v1/currencies');
  }

  /**
   * Get currency info
   */
  async getCurrencyInfo(currencyCode: string): Promise<any> {
    return this.makeRequest(`/api/v1/currencies/${currencyCode}`);
  }

  /**
   * Get buy quote
   */
  async getBuyQuote(currencyCode: string, baseCurrencyCode: string, baseCurrencyAmount: number): Promise<any> {
    return this.makeRequest('/api/v1/quote', {
      cryptoCurrencyCode: currencyCode,
      fiatCurrencyCode: baseCurrencyCode,
      fiatValue: baseCurrencyAmount,
      type: 'BUY',
    });
  }

  /**
   * Get sell quote
   */
  async getSellQuote(currencyCode: string, baseCurrencyCode: string, baseCurrencyAmount: number): Promise<any> {
    return this.makeRequest('/api/v1/quote', {
      cryptoCurrencyCode: currencyCode,
      fiatCurrencyCode: baseCurrencyCode,
      fiatValue: baseCurrencyAmount,
      type: 'SELL',
    });
  }

  /**
   * Get payment methods
   */
  async getPaymentMethods(): Promise<any[]> {
    return this.makeRequest('/api/v1/payment_methods');
  }

  /**
   * Get payment method limits
   */
  async getPaymentMethodLimits(paymentMethod: string, currencyCode: string): Promise<any> {
    return this.makeRequest('/api/v1/limits', {
      paymentMethod,
      currencyCode,
    });
  }

  /**
   * Create buy transaction
   */
  async createBuyTransaction(params: {
    currencyCode: string;
    baseCurrencyCode: string;
    baseCurrencyAmount: number;
    walletAddress: string;
    externalTransactionId?: string;
    customer?: any;
  }): Promise<any> {
    return this.makeRequest('/api/v1/transactions', {
      ...params,
      type: 'BUY',
    });
  }

  /**
   * Create sell transaction
   */
  async createSellTransaction(params: {
    currencyCode: string;
    baseCurrencyCode: string;
    baseCurrencyAmount: number;
    walletAddress: string;
    externalTransactionId?: string;
    customer?: any;
  }): Promise<any> {
    return this.makeRequest('/api/v1/transactions', {
      ...params,
      type: 'SELL',
    });
  }

  /**
   * Get transaction by ID
   */
  async getTransaction(transactionId: string): Promise<any> {
    return this.makeRequest(`/api/v1/transactions/${transactionId}`);
  }

  /**
   * Get transaction status
   */
  async getTransactionStatus(transactionId: string): Promise<any> {
    const transaction = await this.getTransaction(transactionId);
    return {
      id: transaction.id,
      status: transaction.status,
      type: transaction.type,
      currencyCode: transaction.currencyCode,
      baseCurrencyCode: transaction.baseCurrencyCode,
      baseCurrencyAmount: transaction.baseCurrencyAmount,
      currencyAmount: transaction.currencyAmount,
      fee: transaction.fee,
      paymentMethod: transaction.paymentMethod,
      walletAddress: transaction.walletAddress,
      createdAt: transaction.createdAt,
      updatedAt: transaction.updatedAt,
    };
  }

  /**
   * Get user transactions
   */
  async getUserTransactions(userId: string, limit?: number, page?: number): Promise<any[]> {
    const params: any = { userId };
    if (limit) params.limit = limit;
    if (page) params.page = page;

    return this.makeRequest('/api/v1/transactions', params);
  }

  /**
   * Get buy quote with detailed information
   */
  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const quote = await this.getBuyQuote(toCurrency, fromCurrency, amount);

    return {
      fromCurrency: fromCurrency.toLowerCase(),
      toCurrency: toCurrency.toLowerCase(),
      fromAmount: amount,
      toAmount: quote.cryptoAmount,
      rate: quote.cryptoAmount / amount,
      fee: quote.fee,
      paymentMethod: 'credit_card', // Default payment method
      estimatedTime: '1-3 minutes',
      rampId: 'sardine',
      timestamp: Date.now(),
    };
  }

  /**
   * Validate wallet address
   */
  async validateWalletAddress(currencyCode: string, walletAddress: string): Promise<boolean> {
    try {
      const result = await this.makeRequest('/api/v1/validate_address', {
        currencyCode,
        walletAddress,
      });
      return result.isValid;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get supported regions
   */
  async getSupportedRegions(): Promise<string[]> {
    const currencies = await this.getCurrencies();
    const regions = new Set<string>();
    
    currencies.forEach((currency: any) => {
      if (currency.isSupportedInUS) regions.add('US');
      if (currency.isSupportedInEU) regions.add('EU');
      if (currency.isSupportedInUK) regions.add('UK');
    });
    
    return Array.from(regions);
  }

  /**
   * Get exchange rates
   */
  async getExchangeRates(): Promise<any> {
    return this.makeRequest('/api/v1/exchange_rates');
  }

  /**
   * Get transaction limits
   */
  async getTransactionLimits(currencyCode: string, paymentMethod: string): Promise<any> {
    const limits = await this.getPaymentMethodLimits(paymentMethod, currencyCode);
    
    return {
      min: limits.minAmount,
      max: limits.maxAmount,
      currency: currencyCode,
      paymentMethod: paymentMethod,
      region: 'global',
    };
  }
}

// Static methods for quick access
export const SardineRamp = {
  // Quick access methods
  async getCurrenciesElements(): Promise<any[]> {
    const instance = new SardineRampClass();
    return instance.getCurrencies();
  },

  async getBuyQuote(currencyCode: string, baseCurrencyCode: string, baseCurrencyAmount: number): Promise<any> {
    const instance = new SardineRampClass();
    return instance.getBuyQuote(currencyCode, baseCurrencyCode, baseCurrencyAmount);
  },

  async getSellQuote(currencyCode: string, baseCurrencyCode: string, baseCurrencyAmount: number): Promise<any> {
    const instance = new SardineRampClass();
    return instance.getSellQuote(currencyCode, baseCurrencyCode, baseCurrencyAmount);
  },

  async getPaymentMethods(): Promise<any[]> {
    const instance = new SardineRampClass();
    return instance.getPaymentMethods();
  },

  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new SardineRampClass();
    return instance.getQuote(fromCurrency, toCurrency, amount);
  },

  async validateWalletAddress(currencyCode: string, walletAddress: string): Promise<boolean> {
    const instance = new SardineRampClass();
    return instance.validateWalletAddress(currencyCode, walletAddress);
  },

  async getSupportedRegions(): Promise<string[]> {
    const instance = new SardineRampClass();
    return instance.getSupportedRegions();
  },

  async getExchangeRates(): Promise<any> {
    const instance = new SardineRampClass();
    return instance.getExchangeRates();
  },

  async getTransactionStatus(transactionId: string): Promise<any> {
    const instance = new SardineRampClass();
    return instance.getTransactionStatus(transactionId);
  },

  // Static properties
  info: SardineRampClass.info,
  socialMedia: SardineRampClass.socialMedia,
};

// Export the class as default
export default SardineRamp;
