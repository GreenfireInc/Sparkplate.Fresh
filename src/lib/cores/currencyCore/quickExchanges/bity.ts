// Bity Exchange API Integration
// Swiss instant exchange service

export interface BityConfig {
  apiKey?: string;
  apiSecret?: string;
  baseUrl?: string;
  sandbox?: boolean;
}

export class BityExchangeClass {
  private config: BityConfig;
  private baseUrl: string;

  constructor(config: BityConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || (config.sandbox ? 'https://go-sandbox.bity.com' : 'https://go.bity.com');
  }

  // Basic Information
  static readonly info = {
    name: 'Bity',
    country: 'Switzerland',
    founded: 2014,
    website: 'https://bity.com/',
    apiDocs: 'https://bity.com/api/',
    status: 'Active',
    supportedCurrencies: '50+',
    features: ['Fiat to Crypto', 'Crypto to Fiat', 'Crypto to Crypto', 'Swiss Compliance'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/bity_com',
    linkedin: 'https://www.linkedin.com/company/bity',
    facebook: 'https://www.facebook.com/bity.com',
  };

  /**
   * Make request to Bity API
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
      throw new Error(`Bity API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(`Bity API error: ${result.error}`);
    }

    return result;
  }

  /**
   * Get list of available currencies
   */
  async getCurrencies(): Promise<string[]> {
    const result = await this.makeRequest('/api/v1/rates');
    return Object.keys(result);
  }

  /**
   * Get exchange rates
   */
  async getExchangeRates(): Promise<any> {
    return this.makeRequest('/api/v1/rates');
  }

  /**
   * Get exchange rate for a specific pair
   */
  async getExchangeRate(fromCurrency: string, toCurrency: string): Promise<any> {
    const rates = await this.getExchangeRates();
    const pair = `${fromCurrency.toLowerCase()}_${toCurrency.toLowerCase()}`;
    return rates[pair];
  }

  /**
   * Create order
   */
  async createOrder(
    inputCurrency: string,
    outputCurrency: string,
    amount: number,
    outputAddress: string,
    customerEmail?: string
  ): Promise<any> {
    const params: any = {
      input: {
        amount: amount.toString(),
        currency: inputCurrency,
      },
      output: {
        currency: outputCurrency,
        address: outputAddress,
      },
    };

    if (customerEmail) {
      params.customer = {
        email: customerEmail,
      };
    }

    return this.makeRequest('/api/v1/orders', params);
  }

  /**
   * Get order status
   */
  async getOrderStatus(orderId: string): Promise<any> {
    return this.makeRequest(`/api/v1/orders/${orderId}`);
  }

  /**
   * Get quote for exchange
   */
  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const rate = await this.getExchangeRate(fromCurrency, toCurrency);
    const estimatedAmount = amount * parseFloat(rate.rate);

    return {
      fromCurrency: fromCurrency.toLowerCase(),
      toCurrency: toCurrency.toLowerCase(),
      fromAmount: amount,
      toAmount: estimatedAmount,
      rate: parseFloat(rate.rate),
      fee: parseFloat(rate.fee) || 0,
      minAmount: parseFloat(rate.min) || 0,
      estimatedTime: '10-60 minutes',
      exchangeId: 'bity',
      timestamp: Date.now(),
    };
  }

  /**
   * Get order history
   */
  async getOrderHistory(): Promise<any[]> {
    return this.makeRequest('/api/v1/orders');
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
   * Get supported pairs
   */
  async getSupportedPairs(): Promise<string[]> {
    const rates = await this.getExchangeRates();
    return Object.keys(rates);
  }

  /**
   * Get exchange limits
   */
  async getExchangeLimits(fromCurrency: string, toCurrency: string): Promise<any> {
    const rate = await this.getExchangeRate(fromCurrency, toCurrency);
    
    return {
      min: parseFloat(rate.min) || 0,
      max: parseFloat(rate.max) || 0,
      from: fromCurrency,
      to: toCurrency,
    };
  }
}

// Static methods for quick access
export const BityExchange = {
  // Quick access methods
  async getCurrencies(): Promise<string[]> {
    const instance = new BityExchangeClass();
    return instance.getCurrencies();
  },

  async getExchangeRates(): Promise<any> {
    const instance = new BityExchangeClass();
    return instance.getExchangeRates();
  },

  async getExchangeRate(fromCurrency: string, toCurrency: string): Promise<any> {
    const instance = new BityExchangeClass();
    return instance.getExchangeRate(fromCurrency, toCurrency);
  },

  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new BityExchangeClass();
    return instance.getQuote(fromCurrency, toCurrency, amount);
  },

  async validateAddress(currency: string, address: string): Promise<boolean> {
    const instance = new BityExchangeClass();
    return instance.validateAddress(currency, address);
  },

  async getSupportedPairs(): Promise<string[]> {
    const instance = new BityExchangeClass();
    return instance.getSupportedPairs();
  },

  async getExchangeLimits(fromCurrency: string, toCurrency: string): Promise<any> {
    const instance = new BityExchangeClass();
    return instance.getExchangeLimits(fromCurrency, toCurrency);
  },

  async getOrderStatus(orderId: string): Promise<any> {
    const instance = new BityExchangeClass();
    return instance.getOrderStatus(orderId);
  },

  // Static properties
  info: BityExchangeClass.info,
  socialMedia: BityExchangeClass.socialMedia,
};

// Export the class as default
export default BityExchange;
