// Onramp Ramp API Integration
// Crypto payment infrastructure

export interface OnrampConfig {
  apiKey?: string;
  baseUrl?: string;
  sandbox?: boolean;
}

export class OnrampRampClass {
  private config: OnrampConfig;
  private baseUrl: string;

  constructor(config: OnrampConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || (config.sandbox ? 'https://api-sandbox.onramp.com' : 'https://api.onramp.com');
  }

  // Basic Information
  static readonly info = {
    name: 'Onramp',
    country: 'Global',
    founded: 2020,
    website: 'https://onramp.com/',
    apiDocs: 'https://onramp.com/api/',
    status: 'Active',
    supportedCurrencies: '40+',
    features: ['Fiat-to-Crypto', 'Credit Card', 'Bank Transfer', 'Global Coverage'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/onramp',
    telegram: 'https://t.me/onramp',
    reddit: 'https://www.reddit.com/r/onramp/',
    youtube: 'https://www.youtube.com/onramp',
    facebook: 'https://www.facebook.com/onramp',
    linkedin: 'https://www.linkedin.com/company/onramp',
  };

  /**
   * Make request to Onramp API
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
      throw new Error(`Onramp API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(`Onramp API error: ${result.error}`);
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
   * Get quote with detailed information
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
      paymentMethod: 'credit_card',
      estimatedTime: '1-3 minutes',
      rampId: 'onramp',
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
   * Get transaction status
   */
  async getTransactionStatus(transactionId: string): Promise<any> {
    const transaction = await this.makeRequest(`/api/v1/transactions/${transactionId}`);
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
}

// Static methods for quick access
export const OnrampRamp = {
  async getCurrencies(): Promise<any[]> {
    const instance = new OnrampRampClass();
    return instance.getCurrencies();
  },

  async getBuyQuote(currencyCode: string, baseCurrencyCode: string, baseCurrencyAmount: number): Promise<any> {
    const instance = new OnrampRampClass();
    return instance.getBuyQuote(currencyCode, baseCurrencyCode, baseCurrencyAmount);
  },

  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new OnrampRampClass();
    return instance.getQuote(fromCurrency, toCurrency, amount);
  },

  async validateWalletAddress(currencyCode: string, walletAddress: string): Promise<boolean> {
    const instance = new OnrampRampClass();
    return instance.validateWalletAddress(currencyCode, walletAddress);
  },

  async getTransactionStatus(transactionId: string): Promise<any> {
    const instance = new OnrampRampClass();
    return instance.getTransactionStatus(transactionId);
  },

  info: OnrampRampClass.info,
  socialMedia: OnrampRampClass.socialMedia,
};

export default OnrampRamp;
