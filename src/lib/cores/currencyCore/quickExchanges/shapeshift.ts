// Shapeshift Exchange API Integration
// Decentralized cryptocurrency exchange

export interface ShapeshiftConfig {
  apiKey?: string;
  baseUrl?: string;
  sandbox?: boolean;
}

export class ShapeshiftExchangeClass {
  private config: ShapeshiftConfig;
  private baseUrl: string;

  constructor(config: ShapeshiftConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api.shapeshift.io';
  }

  // Basic Information
  static readonly info = {
    name: 'Shapeshift',
    country: 'Switzerland',
    founded: 2014,
    website: 'https://shapeshift.com/',
    apiDocs: 'https://shapeshift.com/api',
    status: 'Active',
    supportedCurrencies: '50+',
    features: ['Non-custodial', 'Decentralized', 'Privacy-focused', 'No KYC'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/shapeshift_io',
    telegram: 'https://t.me/shapeshift',
    reddit: 'https://www.reddit.com/r/shapeshift/',
    youtube: 'https://www.youtube.com/shapeshift',
    facebook: 'https://www.facebook.com/shapeshift',
    linkedin: 'https://www.linkedin.com/company/shapeshift',
    discord: 'https://discord.gg/shapeshift',
  };

  /**
   * Make request to Shapeshift API
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
      throw new Error(`Shapeshift API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.error) {
      throw new Error(`Shapeshift API error: ${result.error}`);
    }

    return result;
  }

  /**
   * Get list of supported coins
   */
  async getCoins(): Promise<any[]> {
    return this.makeRequest('/coins');
  }

  /**
   * Get market info for a pair
   */
  async getMarketInfo(pair: string): Promise<any> {
    return this.makeRequest('/marketinfo', { pair });
  }

  /**
   * Get recent transaction status
   */
  async getRecentTransactionStatus(address: string): Promise<any> {
    return this.makeRequest('/txStat', { address });
  }

  /**
   * Get time remaining for a transaction
   */
  async getTimeRemaining(address: string): Promise<any> {
    return this.makeRequest('/timeremaining', { address });
  }

  /**
   * Get supported coins list
   */
  async getSupportedCoins(): Promise<string[]> {
    const coins = await this.getCoins();
    return Object.keys(coins);
  }

  /**
   * Get exchange rate for a pair
   */
  async getExchangeRate(fromCurrency: string, toCurrency: string): Promise<any> {
    const pair = `${fromCurrency.toLowerCase()}_${toCurrency.toLowerCase()}`;
    return this.makeRequest('/rate', { pair });
  }

  /**
   * Get deposit limit
   */
  async getDepositLimit(fromCurrency: string, toCurrency: string): Promise<any> {
    const pair = `${fromCurrency.toLowerCase()}_${toCurrency.toLowerCase()}`;
    return this.makeRequest('/limit', { pair });
  }

  /**
   * Send amount (create transaction)
   */
  async sendAmount(
    withdrawalAddress: string,
    pair: string,
    returnAddress?: string,
    destTag?: string
  ): Promise<any> {
    const params: any = {
      withdrawal: withdrawalAddress,
      pair: pair,
    };

    if (returnAddress) {
      params.returnAddress = returnAddress;
    }

    if (destTag) {
      params.destTag = destTag;
    }

    return this.makeRequest('/sendamount', params);
  }

  /**
   * Get quote for exchange
   */
  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const [rate, limit] = await Promise.all([
      this.getExchangeRate(fromCurrency, toCurrency),
      this.getDepositLimit(fromCurrency, toCurrency),
    ]);

    const estimatedAmount = amount * parseFloat(rate.rate);
    const pair = `${fromCurrency.toLowerCase()}_${toCurrency.toLowerCase()}`;

    return {
      fromCurrency: fromCurrency.toLowerCase(),
      toCurrency: toCurrency.toLowerCase(),
      fromAmount: amount,
      toAmount: estimatedAmount,
      rate: parseFloat(rate.rate),
      fee: limit.minerFee,
      minAmount: parseFloat(limit.min),
      maxAmount: parseFloat(limit.limit),
      estimatedTime: '10-60 minutes',
      exchangeId: 'shapeshift',
      timestamp: Date.now(),
      pair: pair,
    };
  }

  /**
   * Get transaction status
   */
  async getTransactionStatus(address: string): Promise<any> {
    const [status, timeRemaining] = await Promise.all([
      this.getRecentTransactionStatus(address),
      this.getTimeRemaining(address),
    ]);

    return {
      address: address,
      status: status.status,
      transactionHash: status.tx,
      incomingCoin: status.incomingCoin,
      outgoingCoin: status.outgoingCoin,
      incomingType: status.incomingType,
      outgoingType: status.outgoingType,
      timeRemaining: timeRemaining.seconds_remaining,
    };
  }

  /**
   * Validate address format
   */
  async validateAddress(currency: string, address: string): Promise<boolean> {
    try {
      const coins = await this.getCoins();
      const coin = coins[currency.toLowerCase()];
      if (!coin) return false;

      // Basic validation - in real implementation, you'd use coin-specific validation
      return address.length > 10 && address.length < 100;
    } catch (error) {
      return false;
    }
  }

  /**
   * Get trading pairs
   */
  async getTradingPairs(): Promise<string[]> {
    const coins = await this.getSupportedCoins();
    const pairs: string[] = [];
    
    for (let i = 0; i < coins.length; i++) {
      for (let j = i + 1; j < coins.length; j++) {
        pairs.push(`${coins[i]}_${coins[j]}`);
        pairs.push(`${coins[j]}_${coins[i]}`);
      }
    }
    
    return pairs;
  }
}

// Static methods for quick access
export const ShapeshiftExchange = {
  // Quick access methods
  async getCoins(): Promise<any[]> {
    const instance = new ShapeshiftExchangeClass();
    return instance.getCoins();
  },

  async getSupportedCoins(): Promise<string[]> {
    const instance = new ShapeshiftExchangeClass();
    return instance.getSupportedCoins();
  },

  async getExchangeRate(fromCurrency: string, toCurrency: string): Promise<any> {
    const instance = new ShapeshiftExchangeClass();
    return instance.getExchangeRate(fromCurrency, toCurrency);
  },

  async getMarketInfo(pair: string): Promise<any> {
    const instance = new ShapeshiftExchangeClass();
    return instance.getMarketInfo(pair);
  },

  async getQuote(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    const instance = new ShapeshiftExchangeClass();
    return instance.getQuote(fromCurrency, toCurrency, amount);
  },

  async getTransactionStatus(address: string): Promise<any> {
    const instance = new ShapeshiftExchangeClass();
    return instance.getTransactionStatus(address);
  },

  async validateAddress(currency: string, address: string): Promise<boolean> {
    const instance = new ShapeshiftExchangeClass();
    return instance.validateAddress(currency, address);
  },

  async getTradingPairs(): Promise<string[]> {
    const instance = new ShapeshiftExchangeClass();
    return instance.getTradingPairs();
  },

  // Static properties
  info: ShapeshiftExchangeClass.info,
  socialMedia: ShapeshiftExchangeClass.socialMedia,
};

// Export the class as default
export default ShapeshiftExchange;
