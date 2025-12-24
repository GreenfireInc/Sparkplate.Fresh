// Changelly Exchange API Integration
// Global instant cryptocurrency exchange

import crypto from 'crypto';

export interface ChangellyConfig {
  apiKey?: string;
  apiSecret?: string;
  sandbox?: boolean;
  baseUrl?: string;
}

export class ChangellyExchangeClass {
  private config: ChangellyConfig;
  private baseUrl: string;

  constructor(config: ChangellyConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || (config.sandbox ? 'https://api-demo.changelly.com' : 'https://api.changelly.com');
  }

  // Basic Information
  static readonly info = {
    name: 'Changelly',
    country: 'Global',
    founded: 2015,
    website: 'https://changelly.com/',
    apiDocs: 'https://changelly.com/developers/api',
    status: 'Active',
    supportedCurrencies: '200+',
    features: ['Instant Exchange', 'Fixed Rate', 'Floating Rate', 'No KYC Required'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/Changelly_team',
    telegram: 'https://t.me/changelly',
    reddit: 'https://www.reddit.com/r/Changelly/',
    youtube: 'https://www.youtube.com/changelly',
    facebook: 'https://www.facebook.com/changelly',
    linkedin: 'https://www.linkedin.com/company/changelly',
    instagram: 'https://www.instagram.com/changelly_team/',
  };

  /**
   * Generate signature for authenticated requests
   */
  private generateSignature(body: string): string {
    if (!this.config.apiSecret) {
      throw new Error('API secret is required for authenticated requests');
    }
    return crypto.createHmac('sha512', this.config.apiSecret).update(body).digest('hex');
  }

  /**
   * Make authenticated request to Changelly API
   */
  private async makeAuthenticatedRequest(method: string, params: any = {}): Promise<any> {
    if (!this.config.apiKey || !this.config.apiSecret) {
      throw new Error('API key and secret are required for authenticated requests');
    }

    const body = JSON.stringify({
      id: Date.now(),
      jsonrpc: '2.0',
      method: method,
      params: params,
    });

    const signature = this.generateSignature(body);

    const response = await fetch(`${this.baseUrl}/v1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'api-key': this.config.apiKey,
        'sign': signature,
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error(`Changelly API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(`Changelly API error: ${result.error.message}`);
    }

    return result.result;
  }

  /**
   * Make public request to Changelly API
   */
  private async makePublicRequest(method: string, params: any = {}): Promise<any> {
    const body = JSON.stringify({
      id: Date.now(),
      jsonrpc: '2.0',
      method: method,
      params: params,
    });

    const response = await fetch(`${this.baseUrl}/v1`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body,
    });

    if (!response.ok) {
      throw new Error(`Changelly API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(`Changelly API error: ${result.error.message}`);
    }

    return result.result;
  }

  /**
   * Get list of available currencies
   */
  async getCurrencies(): Promise<string[]> {
    return this.makePublicRequest('getCurrencies');
  }

  /**
   * Get exchange rate for a pair
   */
  async getExchangeRate(fromCurrency: string, toCurrency: string, amount: number): Promise<number> {
    const result = await this.makePublicRequest('getExchangeAmount', {
      from: fromCurrency,
      to: toCurrency,
      amount: amount,
    });
    return parseFloat(result);
  }

  /**
   * Get minimum exchange amount
   */
  async getMinAmount(fromCurrency: string, toCurrency: string): Promise<number> {
    const result = await this.makePublicRequest('getMinAmount', {
      from: fromCurrency,
      to: toCurrency,
    });
    return parseFloat(result);
  }

  /**
   * Create transaction
   */
  async createTransaction(
    fromCurrency: string,
    toCurrency: string,
    amount: number,
    address: string,
    extraId?: string
  ): Promise<any> {
    const params: any = {
      from: fromCurrency,
      to: toCurrency,
      amount: amount,
      address: address,
    };
    if (extraId) params.extraId = extraId;

    return this.makeAuthenticatedRequest('createTransaction', params);
  }

  /**
   * Get transaction status
   */
  async getTransactionStatus(transactionId: string): Promise<any> {
    return this.makeAuthenticatedRequest('getStatus', { id: transactionId });
  }

  /**
   * Get transactions history
   */
  async getTransactions(limit?: number, offset?: number): Promise<any[]> {
    const params: any = {};
    if (limit) params.limit = limit;
    if (offset) params.offset = offset;

    return this.makeAuthenticatedRequest('getTransactions', params);
  }

  /**
   * Get exchange quote with detailed information
   */
  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const [exchangeAmount, minAmount] = await Promise.all([
      this.getExchangeRate(fromCurrency, toCurrency, amount),
      this.getMinAmount(fromCurrency, toCurrency),
    ]);

    return {
      fromCurrency: fromCurrency.toLowerCase(),
      toCurrency: toCurrency.toLowerCase(),
      fromAmount: amount,
      toAmount: exchangeAmount,
      rate: exchangeAmount / amount,
      fee: amount - (exchangeAmount * amount / exchangeAmount), // Approximate fee calculation
      minAmount: minAmount,
      estimatedTime: '5-30 minutes',
      exchangeId: 'changelly',
      timestamp: Date.now(),
    };
  }

  /**
   * Validate address
   */
  async validateAddress(currency: string, address: string): Promise<boolean> {
    try {
      const result = await this.makePublicRequest('validateAddress', {
        currency: currency,
        address: address,
      });
      return result.result;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get fixed rate for a pair
   */
  async getFixedRate(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    return this.makePublicRequest('getExchangeAmount', {
      from: fromCurrency,
      to: toCurrency,
      amount: amount,
      fixed: true,
    });
  }

  /**
   * Create fixed rate transaction
   */
  async createFixedRateTransaction(
    fromCurrency: string,
    toCurrency: string,
    amount: number,
    address: string,
    rateId: string,
    extraId?: string
  ): Promise<any> {
    const params: any = {
      from: fromCurrency,
      to: toCurrency,
      amount: amount,
      address: address,
      rateId: rateId,
    };
    if (extraId) params.extraId = extraId;

    return this.makeAuthenticatedRequest('createFixedRateTransaction', params);
  }

  /**
   * Get transaction by ID
   */
  async getTransaction(transactionId: string): Promise<any> {
    return this.makeAuthenticatedRequest('getTransaction', { id: transactionId });
  }
}

// Static methods for quick access
export const ChangellyExchange = {
  // Quick access methods
  async getCurrencies(): Promise<string[]> {
    const instance = new ChangellyExchangeClass();
    return instance.getCurrencies();
  },

  async getExchangeRate(fromCurrency: string, toCurrency: string, amount: number): Promise<number> {
    const instance = new ChangellyExchangeClass();
    return instance.getExchangeRate(fromCurrency, toCurrency, amount);
  },

  async getMinAmount(fromCurrency: string, toCurrency: string): Promise<number> {
    const instance = new ChangellyExchangeClass();
    return instance.getMinAmount(fromCurrency, toCurrency);
  },

  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new ChangellyExchangeClass();
    return instance.getQuote(fromCurrency, toCurrency, amount);
  },

  async validateAddress(currency: string, address: string): Promise<boolean> {
    const instance = new ChangellyExchangeClass();
    return instance.validateAddress(currency, address);
  },

  async getFixedRate(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new ChangellyExchangeClass();
    return instance.getFixedRate(fromCurrency, toCurrency, amount);
  },

  // Static properties
  info: ChangellyExchangeClass.info,
  socialMedia: ChangellyExchangeClass.socialMedia,
};

// Export the class as default
export default ChangellyExchange;
