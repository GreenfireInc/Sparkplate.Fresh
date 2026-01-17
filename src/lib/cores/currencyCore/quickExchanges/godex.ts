// Godex Exchange API Integration
// Anonymous instant cryptocurrency exchange

export interface GodexConfig {
  apiKey?: string;
  baseUrl?: string;
  sandbox?: boolean;
}

export class GodexExchangeClass {
  private config: GodexConfig;
  private baseUrl: string;

  constructor(config: GodexConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api.godex.io';
  }

  // Basic Information
  static readonly info = {
    name: 'Godex',
    country: 'Global',
    founded: 2018,
    website: 'https://godex.io/',
    apiDocs: 'https://godex.io/api',
    status: 'Active',
    supportedCurrencies: '200+',
    features: ['Anonymous Exchange', 'No KYC', 'No Registration', 'Instant Exchange'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/godex_io',
    telegram: 'https://t.me/godex_io',
    reddit: 'https://www.reddit.com/r/godex/',
    youtube: 'https://www.youtube.com/godex',
    facebook: 'https://www.facebook.com/godex.io',
    linkedin: 'https://www.linkedin.com/company/godex',
  };

  /**
   * Make request to Godex API
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
      throw new Error(`Godex API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(`Godex API error: ${result.error}`);
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
  async getExchangeRate(fromCurrency: string, toCurrency: string, amount: number): Promise<number> {
    const result = await this.makeRequest('/api/v1/info', {
      from: fromCurrency,
      to: toCurrency,
      amount: amount,
    });
    return parseFloat(result.amount);
  }

  /**
   * Get minimum exchange amount
   */
  async getMinAmount(fromCurrency: string, toCurrency: string): Promise<number> {
    const result = await this.makeRequest('/api/v1/min', {
      from: fromCurrency,
      to: toCurrency,
    });
    return parseFloat(result.min);
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
      estimatedTime: '5-60 minutes',
      exchangeId: 'godex',
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
    const [minAmount, exchangeInfo] = await Promise.all([
      this.getMinAmount(fromCurrency, toCurrency),
      this.makeRequest('/api/v1/info', { from: fromCurrency, to: toCurrency }),
    ]);

    return {
      min: minAmount,
      max: parseFloat(exchangeInfo.max),
      from: fromCurrency,
      to: toCurrency,
    };
  }

  /**
   * Get supported pairs
   */
  async getSupportedPairs(): Promise<string[]> {
    const currencies = await this.getCurrencies();
    const pairs: string[] = [];
    
    for (let i = 0; i < currencies.length; i++) {
      for (let j = i + 1; j < currencies.length; j++) {
        pairs.push(`${currencies[i]}-${currencies[j]}`);
        pairs.push(`${currencies[j]}-${currencies[i]}`);
      }
    }
    
    return pairs;
  }
}

// Static methods for quick access
export const GodexExchange = {
  // Quick access methods
  async getCurrencies(): Promise<string[]> {
    const instance = new GodexExchangeClass();
    return instance.getCurrencies();
  },

  async getExchangeRate(fromCurrency: string, toCurrency: string, amount: number): Promise<number> {
    const instance = new GodexExchangeClass();
    return instance.getExchangeRate(fromCurrency, toCurrency, amount);
  },

  async getMinAmount(fromCurrency: string, toCurrency: string): Promise<number> {
    const instance = new GodexExchangeClass();
    return instance.getMinAmount(fromCurrency, toCurrency);
  },

  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new GodexExchangeClass();
    return instance.getQuote(fromCurrency, toCurrency, amount);
  },

  async validateAddress(currency: string, address: string): Promise<boolean> {
    const instance = new GodexExchangeClass();
    return instance.validateAddress(currency, address);
  },

  async getExchangeLimits(fromCurrency: string, toCurrency: string): Promise<any> {
    const instance = new GodexExchangeClass();
    return instance.getExchangeLimits(fromCurrency, toCurrency);
  },

  async getSupportedPairs(): Promise<string[]> {
    const instance = new GodexExchangeClass();
    return instance.getSupportedPairs();
  },

  async getTransactionStatus(transactionId: string): Promise<any> {
    const instance = new GodexExchangeClass();
    return instance.getTransactionStatus(transactionId);
  },

  // Static properties
  info: GodexExchangeClass.info,
  socialMedia: GodexExchangeClass.socialMedia,
};

// Export the class as default
export default GodexExchange;
