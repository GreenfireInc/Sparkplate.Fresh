// Finchpay Ramp API Integration
// Mobile-first payment platform

export interface FinchpayConfig {
  apiKey?: string;
  baseUrl?: string;
  sandbox?: boolean;
}

export class FinchpayRampClass {
  private config: FinchpayConfig;
  private baseUrl: string;

  constructor(config: FinchpayConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || (config.sandbox ? 'https://api-sandbox.finchpay.com' : 'https://api.finchpay.com');
  }

  // Basic Information
  static readonly info = {
    name: 'Finchpay',
    country: 'Global',
    founded: 2021,
    website: 'https://finchpay.com/',
    apiDocs: 'https://finchpay.com/api/',
    status: 'Active',
    supportedCurrencies: '30+',
    features: ['Mobile Payment', 'Credit Card', 'Bank Transfer', 'Instant Purchase'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/finchpay',
    telegram: 'https://t.me/finchpay',
    reddit: 'https://www.reddit.com/r/finchpay/',
    youtube: 'https://www.youtube.com/finchpay',
    facebook: 'https://www.facebook.com/finchpay',
    linkedin: 'https://www.linkedin.com/company/finchpay',
  };

  /**
   * Make request to Finchpay API
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
      throw new Error(`Finchpay API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(`Finchpay API error: ${result.error}`);
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
      paymentMethod: 'mobile_payment',
      estimatedTime: '1-3 minutes',
      rampId: 'finchpay',
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
export const FinchpayRamp = {
  async getCurrencies(): Promise<any[]> {
    const instance = new FinchpayRampClass();
    return instance.getCurrencies();
  },

  async getBuyQuote(currencyCode: string, baseCurrencyCode: string, baseCurrencyAmount: number): Promise<any> {
    const instance = new FinchpayRampClass();
    return instance.getBuyQuote(currencyCode, baseCurrencyCode, baseCurrencyAmount);
  },

  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new FinchpayRampClass();
    return instance.getQuote(fromCurrency, toCurrency, amount);
  },

  async validateWalletAddress(currencyCode: string, walletAddress: string): Promise<boolean> {
    const instance = new FinchpayRampClass();
    return instance.validateWalletAddress(currencyCode, walletAddress);
  },

  async getTransactionStatus(transactionId: string): Promise<any> {
    const instance = new FinchpayRampClass();
    return instance.getTransactionStatus(transactionId);
  },

  info: FinchpayRampClass.info,
  socialMedia: FinchpayRampClass.socialMedia,
};

export default FinchpayRamp;
