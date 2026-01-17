// MoonPay Ramp API Integration
// Leading crypto payment infrastructure

import crypto from 'crypto';

export interface MoonPayConfig {
  apiKey?: string;
  apiSecret?: string;
  baseUrl?: string;
  sandbox?: boolean;
}

export class MoonPayRampClass {
  private config: MoonPayConfig;
  private baseUrl: string;

  constructor(config: MoonPayConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || (config.sandbox ? 'https://api-sandbox.moonpay.com' : 'https://api.moonpay.com');
  }

  // Basic Information
  static readonly info = {
    name: 'MoonPay',
    country: 'Global',
    founded: 2018,
    website: 'https://www.moonpay.com/',
    apiDocs: 'https://docs.moonpay.com/',
    status: 'Active',
    supportedCurrencies: '100+',
    features: ['Credit Card', 'Bank Transfer', 'Apple Pay', 'Google Pay', 'SEPA', 'Wire Transfer'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/moonpay',
    telegram: 'https://t.me/moonpay',
    discord: 'https://discord.gg/moonpay',
    reddit: 'https://www.reddit.com/r/moonpay/',
    youtube: 'https://www.youtube.com/moonpay',
    facebook: 'https://www.facebook.com/moonpay',
    linkedin: 'https://www.linkedin.com/company/moonpay',
    instagram: 'https://www.instagram.com/moonpay/',
  };

  /**
   * Generate signature for authenticated requests
   */
  private generateSignature(queryString: string): string {
    if (!this.config.apiSecret) {
      throw new Error('API secret is required for authenticated requests');
    }
    return crypto.createHmac('sha256', this.config.apiSecret).update(queryString).digest('hex');
  }

  /**
   * Make authenticated request to MoonPay API
   */
  private async makeAuthenticatedRequest(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    if (!this.config.apiKey || !this.config.apiSecret) {
      throw new Error('API key and secret are required for authenticated requests');
    }

    const queryParams = {
      ...params,
      apiKey: this.config.apiKey,
    };

    const queryString = Object.keys(queryParams)
      .map(key => `${key}=${encodeURIComponent(queryParams[key])}`)
      .join('&');

    const signature = this.generateSignature(queryString);
    const url = `${this.baseUrl}${endpoint}?${queryString}&signature=${signature}`;

    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`MoonPay API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Make public request to MoonPay API
   */
  private async makePublicRequest(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    const queryString = Object.keys(params)
      .map(key => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');

    const url = `${this.baseUrl}${endpoint}${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`MoonPay API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get list of supported currencies
   */
  async getCurrencies(): Promise<any[]> {
    return this.makePublicRequest('/v3/currencies');
  }

  /**
   * Get currency info
   */
  async getCurrencyInfo(currencyCode: string): Promise<any> {
    return this.makePublicRequest(`/v3/currencies/${currencyCode}`);
  }

  /**
   * Get buy quote
   */
  async getBuyQuote(currencyCode: string, baseCurrencyCode: string, baseCurrencyAmount: number): Promise<any> {
    return this.makePublicRequest('/v3/currencies/buy_quote', {
      currencyCode,
      baseCurrencyCode,
      baseCurrencyAmount,
    });
  }

  /**
   * Get sell quote
   */
  async getSellQuote(currencyCode: string, baseCurrencyCode: string, baseCurrencyAmount: number): Promise<any> {
    return this.makePublicRequest('/v3/currencies/sell_quote', {
      currencyCode,
      baseCurrencyCode,
      baseCurrencyAmount,
    });
  }

  /**
   * Get payment methods
   */
  async getPaymentMethods(): Promise<any[]> {
    return this.makePublicRequest('/v3/payment_methods');
  }

  /**
   * Get payment method limits
   */
  async getPaymentMethodLimits(paymentMethod: string, currencyCode: string): Promise<any> {
    return this.makePublicRequest('/v3/payment_method_limits', {
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
    return this.makeAuthenticatedRequest('/v1/transactions', params);
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
    return this.makeAuthenticatedRequest('/v1/transactions', params);
  }

  /**
   * Get transaction by ID
   */
  async getTransaction(transactionId: string): Promise<any> {
    return this.makeAuthenticatedRequest(`/v1/transactions/${transactionId}`);
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

    return this.makeAuthenticatedRequest('/v1/transactions', params);
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
      toAmount: quote.quoteCurrencyAmount,
      rate: quote.quoteCurrencyAmount / amount,
      fee: quote.totalFee,
      paymentMethod: 'credit_card', // Default payment method
      estimatedTime: '1-3 minutes',
      rampId: 'moonpay',
      timestamp: Date.now(),
    };
  }

  /**
   * Validate wallet address
   */
  async validateWalletAddress(currencyCode: string, walletAddress: string): Promise<boolean> {
    try {
      const result = await this.makePublicRequest('/v3/wallet_address_validation', {
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
    return this.makePublicRequest('/v3/exchange_rates');
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
export const MoonPayRamp = {
  // Quick access methods
  async getCurrencies(): Promise<any[]> {
    const instance = new MoonPayRampClass();
    return instance.getCurrencies();
  },

  async getBuyQuote(currencyCode: string, baseCurrencyCode: string, baseCurrencyAmount: number): Promise<any> {
    const instance = new MoonPayRampClass();
    return instance.getBuyQuote(currencyCode, baseCurrencyCode, baseCurrencyAmount);
  },

  async getSellQuote(currencyCode: string, baseCurrencyCode: string, baseCurrencyAmount: number): Promise<any> {
    const instance = new MoonPayRampClass();
    return instance.getSellQuote(currencyCode, baseCurrencyCode, baseCurrencyAmount);
  },

  async getPaymentMethods(): Promise<any[]> {
    const instance = new MoonPayRampClass();
    return instance.getPaymentMethods();
  },

  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new MoonPayRampClass();
    return instance.getQuote(fromCurrency, toCurrency, amount);
  },

  async validateWalletAddress(currencyCode: string, walletAddress: string): Promise<boolean> {
    const instance = new MoonPayRampClass();
    return instance.validateWalletAddress(currencyCode, walletAddress);
  },

  async getSupportedRegions(): Promise<string[]> {
    const instance = new MoonPayRampClass();
    return instance.getSupportedRegions();
  },

  async getExchangeRates(): Promise<any> {
    const instance = new MoonPayRampClass();
    return instance.getExchangeRates();
  },

  async getTransactionStatus(transactionId: string): Promise<any> {
    const instance = new MoonPayRampClass();
    return instance.getTransactionStatus(transactionId);
  },

  // Static properties
  info: MoonPayRampClass.info,
  socialMedia: MoonPayRampClass.socialMedia,
};

// Export the class as default
export default MoonPayRamp;
