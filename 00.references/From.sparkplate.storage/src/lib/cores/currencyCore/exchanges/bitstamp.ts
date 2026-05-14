// Bitstamp Exchange API Integration
// European cryptocurrency exchange

export interface BitstampConfig {
  apiKey?: string;
  apiSecret?: string;
  customerId?: string;
  sandbox?: boolean;
  baseUrl?: string;
}

export class BitstampExchangeClass {
  private config: BitstampConfig;
  private baseUrl: string;

  constructor(config: BitstampConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://www.bitstamp.net/api';
  }

  // Basic Information
  static readonly info = {
    name: 'Bitstamp',
    country: 'Luxembourg',
    founded: 2011,
    website: 'https://www.bitstamp.net/',
    apiDocs: 'https://www.bitstamp.net/api/',
    status: 'Active',
    tradingPairs: '50+',
    volume24h: '$100M+',
    features: ['Spot Trading', 'Fiat Trading', 'Institutional Services'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/bitstamp',
    facebook: 'https://www.facebook.com/bitstamp',
    linkedin: 'https://www.linkedin.com/company/bitstamp',
    youtube: 'https://www.youtube.com/bitstamp',
  };

  /**
   * Make public request to Bitstamp API
   */
  private async makePublicRequest(endpoint: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Bitstamp API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get ticker
   */
  async getTicker(symbol: string): Promise<any> {
    return this.makePublicRequest(`/v2/ticker/${symbol}/`);
  }

  /**
   * Get hourly ticker
   */
  async getHourlyTicker(symbol: string): Promise<any> {
    return this.makePublicRequest(`/v2/ticker_hour/${symbol}/`);
  }

  /**
   * Get order book
   */
  async getOrderBook(symbol: string): Promise<any> {
    return this.makePublicRequest(`/v2/order_book/${symbol}/`);
  }

  /**
   * Get transactions
   */
  async getTransactions(symbol: string, time?: string): Promise<any> {
    const endpoint = time ? `/v2/transactions/${symbol}/?time=${time}` : `/v2/transactions/${symbol}/`;
    return this.makePublicRequest(endpoint);
  }

  /**
   * Get trading pairs info
   */
  async getTradingPairsInfo(): Promise<any> {
    return this.makePublicRequest('/v2/trading-pairs-info/');
  }

  /**
   * Get conversion rate
   */
  async getConversionRate(fromCurrency: string, toCurrency: string, amount: number): Promise<any> {
    return this.makePublicRequest(`/v2/conversion_rate/${fromCurrency}/${toCurrency}/?amount=${amount}`);
  }

  /**
   * Get price for a specific symbol
   */
  async getPrice(symbol: string): Promise<number> {
    const ticker = await this.getTicker(symbol);
    return parseFloat(ticker.last);
  }

  /**
   * Get 24hr price change
   */
  async get24hrChange(symbol: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const ticker = await this.getTicker(symbol);
    const currentPrice = parseFloat(ticker.last);
    const openPrice = parseFloat(ticker.open);
    const priceChange = currentPrice - openPrice;
    const priceChangePercent = (priceChange / openPrice) * 100;

    return {
      priceChange,
      priceChangePercent,
    };
  }

  /**
   * Get trading volume
   */
  async getVolume(symbol: string): Promise<{ volume: number }> {
    const ticker = await this.getTicker(symbol);
    return {
      volume: parseFloat(ticker.volume),
    };
  }
}

// Static methods for quick access
export const BitstampExchange = {
  async getTicker(symbol: string): Promise<any> {
    const instance = new BitstampExchangeClass();
    return instance.getTicker(symbol);
  },

  async getHourlyTicker(symbol: string): Promise<any> {
    const instance = new BitstampExchangeClass();
    return instance.getHourlyTicker(symbol);
  },

  async getOrderBook(symbol: string): Promise<any> {
    const instance = new BitstampExchangeClass();
    return instance.getOrderBook(symbol);
  },

  async getTransactions(symbol: string, time?: string): Promise<any> {
    const instance = new BitstampExchangeClass();
    return instance.getTransactions(symbol, time);
  },

  async getTradingPairsInfo(): Promise<any> {
    const instance = new BitstampExchangeClass();
    return instance.getTradingPairsInfo();
  },

  async getPrice(symbol: string): Promise<number> {
    const instance = new BitstampExchangeClass();
    return instance.getPrice(symbol);
  },

  async get24hrChange(symbol: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const instance = new BitstampExchangeClass();
    return instance.get24hrChange(symbol);
  },

  async getVolume(symbol: string): Promise<{ volume: number }> {
    const instance = new BitstampExchangeClass();
    return instance.getVolume(symbol);
  },

  info: BitstampExchangeClass.info,
  socialMedia: BitstampExchangeClass.socialMedia,
};

export default BitstampExchange;
