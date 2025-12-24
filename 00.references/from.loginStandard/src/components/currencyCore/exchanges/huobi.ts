// Huobi Exchange API Integration
// Major Asian cryptocurrency exchange

export interface HuobiConfig {
  apiKey?: string;
  apiSecret?: string;
  sandbox?: boolean;
  baseUrl?: string;
}

export class HuobiExchangeClass {
  private config: HuobiConfig;
  private baseUrl: string;

  constructor(config: HuobiConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api.huobi.pro';
  }

  // Basic Information
  static readonly info = {
    name: 'Huobi',
    country: 'Seychelles',
    founded: 2013,
    website: 'https://www.huobi.com/',
    apiDocs: 'https://huobiapi.github.io/docs/spot/v1/en/',
    status: 'Active',
    tradingPairs: '500+',
    volume24h: '$1B+',
    features: ['Spot Trading', 'Futures Trading', 'Options', 'Margin Trading', 'Staking'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/HuobiGlobal',
    telegram: 'https://t.me/huobiglobal',
    reddit: 'https://www.reddit.com/r/HuobiGlobal/',
    youtube: 'https://www.youtube.com/huobi',
    facebook: 'https://www.facebook.com/huobiglobal',
    linkedin: 'https://www.linkedin.com/company/huobi-global',
  };

  /**
   * Make public request to Huobi API
   */
  private async makePublicRequest(endpoint: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Huobi API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.status === 'error') {
      throw new Error(`Huobi API error: ${result.err_msg}`);
    }

    return result.data;
  }

  /**
   * Get server time
   */
  async getServerTime(): Promise<any> {
    return this.makePublicRequest('/v1/common/timestamp');
  }

  /**
   * Get symbols
   */
  async getSymbols(): Promise<any> {
    return this.makePublicRequest('/v1/common/symbols');
  }

  /**
   * Get currencies
   */
  async getCurrencies(): Promise<any> {
    return this.makePublicRequest('/v1/common/currencys');
  }

  /**
   * Get ticker
   */
  async getTicker(symbol?: string): Promise<any> {
    const endpoint = symbol ? `/market/detail/merged?symbol=${symbol}` : '/market/tickers';
    return this.makePublicRequest(endpoint);
  }

  /**
   * Get depth
   */
  async getDepth(symbol: string, type: string = 'step0'): Promise<any> {
    return this.makePublicRequest(`/market/depth?symbol=${symbol}&type=${type}`);
  }

  /**
   * Get trades
   */
  async getTrades(symbol: string): Promise<any> {
    return this.makePublicRequest(`/market/trade?symbol=${symbol}`);
  }

  /**
   * Get history trades
   */
  async getHistoryTrades(symbol: string, size?: number): Promise<any> {
    const endpoint = size ? `/market/history/trade?symbol=${symbol}&size=${size}` : `/market/history/trade?symbol=${symbol}`;
    return this.makePublicRequest(endpoint);
  }

  /**
   * Get kline
   */
  async getKline(symbol: string, period: string, size?: number): Promise<any> {
    const endpoint = size ? `/market/history/kline?symbol=${symbol}&period=${period}&size=${size}` : `/market/history/kline?symbol=${symbol}&period=${period}`;
    return this.makePublicRequest(endpoint);
  }

  /**
   * Get price for a specific symbol
   */
  async getPrice(symbol: string): Promise<number> {
    const ticker = await this.getTicker(symbol);
    return parseFloat(ticker.tick.close);
  }

  /**
   * Get 24hr price change
   */
  async get24hrChange(symbol: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const ticker = await this.getTicker(symbol);
    const tick = ticker.tick;
    const currentPrice = parseFloat(tick.close);
    const openPrice = parseFloat(tick.open);
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
  async getVolume(symbol: string): Promise<{ volume: number; amount: number }> {
    const ticker = await this.getTicker(symbol);
    const tick = ticker.tick;
    return {
      volume: parseFloat(tick.vol),
      amount: parseFloat(tick.amount),
    };
  }
}

// Static methods for quick access
export const HuobiExchange = {
  async getTicker(symbol?: string): Promise<any> {
    const instance = new HuobiExchangeClass();
    return instance.getTicker(symbol);
  },

  async getDepth(symbol: string, type: string = 'step0'): Promise<any> {
    const instance = new HuobiExchangeClass();
    return instance.getDepth(symbol, type);
  },

  async getTrades(symbol: string): Promise<any> {
    const instance = new HuobiExchangeClass();
    return instance.getTrades(symbol);
  },

  async getHistoryTrades(symbol: string, size?: number): Promise<any> {
    const instance = new HuobiExchangeClass();
    return instance.getHistoryTrades(symbol, size);
  },

  async getKline(symbol: string, period: string, size?: number): Promise<any> {
    const instance = new HuobiExchangeClass();
    return instance.getKline(symbol, period, size);
  },

  async getPrice(symbol: string): Promise<number> {
    const instance = new HuobiExchangeClass();
    return instance.getPrice(symbol);
  },

  async get24hrChange(symbol: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const instance = new HuobiExchangeClass();
    return instance.get24hrChange(symbol);
  },

  async getVolume(symbol: string): Promise<{ volume: number; amount: number }> {
    const instance = new HuobiExchangeClass();
    return instance.getVolume(symbol);
  },

  async getServerTime(): Promise<any> {
    const instance = new HuobiExchangeClass();
    return instance.getServerTime();
  },

  async getSymbols(): Promise<any> {
    const instance = new HuobiExchangeClass();
    return instance.getSymbols();
  },

  async getCurrencies(): Promise<any> {
    const instance = new HuobiExchangeClass();
    return instance.getCurrencies();
  },

  info: HuobiExchangeClass.info,
  socialMedia: HuobiExchangeClass.socialMedia,
};

export default HuobiExchange;
