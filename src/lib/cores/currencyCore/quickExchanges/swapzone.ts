// Swapzone Exchange API Integration
// Aggregator of instant exchanges

export interface SwapzoneConfig {
  apiKey?: string;
  baseUrl?: string;
  sandbox?: boolean;
}

export class SwapzoneExchangeClass {
  private config: SwapzoneConfig;
  private baseUrl: string;

  constructor(config: SwapzoneConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api.swapzone.io';
  }

  // Basic Information
  static readonly info = {
    name: 'Swapzone',
    country: 'Global',
    founded: 2019,
    website: 'https://swapzone.io/',
    apiDocs: 'https://swapzone.io/api',
    status: 'Active',
    supportedCurrencies: '300+',
    features: ['Exchange Aggregator', 'Best Rates', 'Instant Exchange', 'No Registration'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/swapzone_io',
    telegram: 'https://t.me/swapzone',
    reddit: 'https://www.reddit.com/r/swapzone/',
    youtube: 'https://www.youtube.com/swapzone',
    facebook: 'https://www.facebook.com/swapzone',
    linkedin: 'https://www.linkedin.com/company/swapzone',
  };

  /**
   * Make request to Swapzone API
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
      throw new Error(`Swapzone API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(`Swapzone API error: ${result.error}`);
    }

    return result;
  }

  /**
   * Get list of available currencies
   */
  async getCurrencies(): Promise<string[]> {
    const result = await this.makeRequest('/api/v1/currencies');
    return result.map((currency: any) => currency.symbol);
  }

  /**
   * Get exchange rates from multiple exchanges
   */
  async getExchangeRates(fromCurrency: string, toCurrency: string, amount: number): Promise<any[]> {
    return this.makeRequest('/api/v1/exchanges', {
      from: fromCurrency,
      to: toCurrency,
      amount: amount,
    });
  }

  /**
   * Get best exchange rate
   */
  async getBestRate(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const rates = await this.getExchangeRates(fromCurrency, toCurrency, amount);
    return rates.sort((a, b) => parseFloat(b.amount) - parseFloat(a.amount))[0];
  }

  /**
   * Create exchange transaction
   */
  async createExchange(
    fromCurrency: string,
    toCurrency: string,
    amount: number,
    withdrawalAddress: string,
    exchangeId: string,
    returnAddress?: string
  ): Promise<any> {
    const params: any = {
      from: fromCurrency,
      to: toCurrency,
      amount: amount,
      withdrawal: withdrawalAddress,
      exchange: exchangeId,
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
   * Get quote for exchange
   */
  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const bestRate = await this.getBestRate(fromCurrency, toCurrency, amount);

    return {
      fromCurrency: fromCurrency.toLowerCase(),
      toCurrency: toCurrency.toLowerCase(),
      fromAmount: amount,
      toAmount: parseFloat(bestRate.amount),
      rate: parseFloat(bestRate.rate),
      fee: parseFloat(bestRate.fee),
      exchangeId: bestRate.exchange,
      estimatedTime: bestRate.estimated_time || '5-60 minutes',
      timestamp: Date.now(),
    };
  }

  /**
   * Get all available exchanges
   */
  async getExchanges(): Promise<any[]> {
    return this.makeRequest('/api/v1/exchanges');
  }

  /**
   * Get exchange info
   */
  async getExchangeInfo(exchangeId: string): Promise<any> {
    return this.makeRequest('/api/v1/exchange', { id: exchangeId });
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
   * Get supported pairs
   */
  async getSupportedPairs(): Promise<string[]> {
    const result = await this.makeRequest('/api/v1/pairs');
    return result.map((pair: any) => `${pair.from}-${pair.to}`);
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
   * Get exchange status
   */
  async getExchangeStatus(): Promise<any> {
    return this.makeRequest('/api/v1/status');
  }
}

// Static methods for quick access
export const SwapzoneExchange = {
  // Quick access methods
  async getCurrencies(): Promise<string[]> {
    const instance = new SwapzoneExchangeClass();
    return instance.getCurrencies();
  },

  async getExchangeRates(fromCurrency: string, toCurrency: string, amount: number): Promise<any[]> {
    const instance = new SwapzoneExchangeClass();
    return instance.getExchangeRates(fromCurrency, toCurrency, amount);
  },

  async getBestRate(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new SwapzoneExchangeClass();
    return instance.getBestRate(fromCurrency, toCurrency, amount);
  },

  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new SwapzoneExchangeClass();
    return instance.getQuote(fromCurrency, toCurrency, amount);
  },

  async getExchanges(): Promise<any[]> {
    const instance = new SwapzoneExchangeClass();
    return instance.getExchanges();
  },

  async getExchangeInfo(exchangeId: string): Promise<any> {
    const instance = new SwapzoneExchangeClass();
    return instance.getExchangeInfo(exchangeId);
  },

  async validateAddress(currency: string, address: string): Promise<boolean> {
    const instance = new SwapzoneExchangeClass();
    return instance.validateAddress(currency, address);
  },

  async getSupportedPairs(): Promise<string[]> {
    const instance = new SwapzoneExchangeClass();
    return instance.getSupportedPairs();
  },

  async getExchangeLimits(fromCurrency: string, toCurrency: string): Promise<any> {
    const instance = new SwapzoneExchangeClass();
    return instance.getExchangeLimits(fromCurrency, toCurrency);
  },

  async getTransactionStatus(transactionId: string): Promise<any> {
    const instance = new SwapzoneExchangeClass();
    return instance.getTransactionStatus(transactionId);
  },

  async getExchangeStatus(): Promise<any> {
    const instance = new SwapzoneExchangeClass();
    return instance.getExchangeStatus();
  },

  // Static properties
  info: SwapzoneExchangeClass.info,
  socialMedia: SwapzoneExchangeClass.socialMedia,
};

// Export the class as default
export default SwapzoneExchange;
