// Simpleswap Exchange API Integration
// Simple instant cryptocurrency exchange

export interface SimpleswapConfig {
  apiKey?: string;
  baseUrl?: string;
  sandbox?: boolean;
}

export class SimpleswapExchangeClass {
  private config: SimpleswapConfig;
  private baseUrl: string;

  constructor(config: SimpleswapConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api.simpleswap.io';
  }

  // Basic Information
  static readonly info = {
    name: 'Simpleswap',
    country: 'Global',
    founded: 2018,
    website: 'https://simpleswap.io/',
    apiDocs: 'https://simpleswap.io/api',
    status: 'Active',
    supportedCurrencies: '300+',
    features: ['Instant Exchange', 'No Registration', 'Fixed Rate', 'Floating Rate'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/SimpleSwap_io',
    telegram: 'https://t.me/simpleswap',
    reddit: 'https://www.reddit.com/r/simpleswap/',
    youtube: 'https://www.youtube.com/simpleswap',
    facebook: 'https://www.facebook.com/simpleswap',
    linkedin: 'https://www.linkedin.com/company/simpleswap',
  };

  /**
   * Make request to Simpleswap API
   */
  private async makeRequest(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    const url = new URL(`${this.baseUrl}${endpoint}`);
    Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (this.config.apiKey) {
      headers['api-key'] = this.config.apiKey;
    }

    const response = await fetch(url.toString(), { headers });

    if (!response.ok) {
      throw new Error(`Simpleswap API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(`Simpleswap API error: ${result.error}`);
    }

    return result;
  }

  /**
   * Get all available currencies
   */
  async getCurrencies(): Promise<string[]> {
    const result = await this.makeRequest('/get_all_currencies');
    return result.map((currency: any) => currency.symbol);
  }

  /**
   * Get estimated exchange amount
   */
  async getEstimatedAmount(fromCurrency: string, toCurrency: string, amount: number): Promise<number> {
    const result = await this.makeRequest('/get_estimated', {
      currency_from: fromCurrency,
      currency_to: toCurrency,
      amount: amount,
    });
    return parseFloat(result);
  }

  /**
   * Get minimum exchange amount
   */
  async getMinAmount(fromCurrency: string, toCurrency: string): Promise<number> {
    const result = await this.makeRequest('/get_min', {
      currency_from: fromCurrency,
      currency_to: toCurrency,
    });
    return parseFloat(result);
  }

  /**
   * Get maximum exchange amount
   */
  async getMaxAmount(fromCurrency: string, toCurrency: string): Promise<number> {
    const result = await this.makeRequest('/get_max', {
      currency_from: fromCurrency,
      currency_to: toCurrency,
    });
    return parseFloat(result);
  }

  /**
   * Create exchange
   */
  async createExchange(
    fromCurrency: string,
    toCurrency: string,
    amount: number,
    withdrawalAddress: string,
    returnAddress?: string
  ): Promise<any> {
    const params: any = {
      currency_from: fromCurrency,
      currency_to: toCurrency,
      amount: amount,
      withdrawal: withdrawalAddress,
    };

    if (returnAddress) {
      params.refund = returnAddress;
    }

    return this.makeRequest('/create_exchange', params);
  }

  /**
   * Get exchange status
   */
  async getExchangeStatus(exchangeId: string): Promise<any> {
    return this.makeRequest('/get_exchange', { id: exchangeId });
  }

  /**
   * Get exchange quote with detailed information
   */
  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const [estimatedAmount, minAmount, maxAmount] = await Promise.all([
      this.getEstimatedAmount(fromCurrency, toCurrency, amount),
      this.getMinAmount(fromCurrency, toCurrency),
      this.getMaxAmount(fromCurrency, toCurrency),
    ]);

    return {
      fromCurrency: fromCurrency.toLowerCase(),
      toCurrency: toCurrency.toLowerCase(),
      fromAmount: amount,
      toAmount: estimatedAmount,
      rate: estimatedAmount / amount,
      fee: amount - (estimatedAmount * amount / estimatedAmount), // Approximate fee calculation
      minAmount: minAmount,
      maxAmount: maxAmount,
      estimatedTime: '5-60 minutes',
      exchangeId: 'simpleswap',
      timestamp: Date.now(),
    };
  }

  /**
   * Get exchange rate range
   */
  async getExchangeRange(fromCurrency: string, toCurrency: string): Promise<any> {
    const [minAmount, maxAmount] = await Promise.all([
      this.getMinAmount(fromCurrency, toCurrency),
      this.getMaxAmount(fromCurrency, toCurrency),
    ]);

    return {
      min: minAmount,
      max: maxAmount,
      from: fromCurrency,
      to: toCurrency,
    };
  }

  /**
   * Validate address
   */
  async validateAddress(currency: string, address: string): Promise<boolean> {
    try {
      const result = await this.makeRequest('/validate_address', {
        currency: currency,
        address: address,
      });
      return result.valid;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get exchange history
   */
  async getExchangeHistory(): Promise<any[]> {
    return this.makeRequest('/get_exchanges');
  }
}

// Static methods for quick access
export const SimpleswapExchange = {
  // Quick access methods
  async getCurrencies(): Promise<string[]> {
    const instance = new SimpleswapExchangeClass();
    return instance.getCurrencies();
  },

  async getEstimatedAmount(fromCurrency: string, toCurrency: string, amount: number): Promise<number> {
    const instance = new SimpleswapExchangeClass();
    return instance.getEstimatedAmount(fromCurrency, toCurrency, amount);
  },

  async getMinAmount(fromCurrency: string, toCurrency: string): Promise<number> {
    const instance = new SimpleswapExchangeClass();
    return instance.getMinAmount(fromCurrency, toCurrency);
  },

  async getMaxAmount(fromCurrency: string, toCurrency: string): Promise<number> {
    const instance = new SimpleswapExchangeClass();
    return instance.getMaxAmount(fromCurrency, toCurrency);
  },

  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new SimpleswapExchangeClass();
    return instance.getQuote(fromCurrency, toCurrency, amount);
  },

  async getExchangeRange(fromCurrency: string, toCurrency: string): Promise<any> {
    const instance = new SimpleswapExchangeClass();
    return instance.getExchangeRange(fromCurrency, toCurrency);
  },

  async validateAddress(currency: string, address: string): Promise<boolean> {
    const instance = new SimpleswapExchangeClass();
    return instance.validateAddress(currency, address);
  },

  // Static properties
  info: SimpleswapExchangeClass.info,
  socialMedia: SimpleswapExchangeClass.socialMedia,
};

// Export the class as default
export default SimpleswapExchange;
