// HTX Exchange API Integration
// Major Asian cryptocurrency exchange (formerly Huobi; rebranded to HTX in 2023)

export interface HTXConfig {
  apiKey?: string;
  apiSecret?: string;
  sandbox?: boolean;
  baseUrl?: string;
}

export class HTXExchangeClass {
  private config: HTXConfig;
  private baseUrl: string;

  constructor(config: HTXConfig = {}) {
    this.config = config;
    // api.huobi.pro remains the canonical HTX spot API host post-rebrand
    this.baseUrl = config.baseUrl || 'https://api.huobi.pro';
  }

  // Basic Information
  static readonly info = {
    name: 'HTX',
    formerName: 'Huobi',
    country: 'Seychelles',
    founded: 2013,
    rebranded: 2023,
    website: 'https://www.htx.com/',
    apiDocs: 'https://huobiapi.github.io/docs/spot/v1/en/',
    status: 'Active',
    tradingPairs: '500+',
    volume24h: '$1B+',
    features: ['Spot Trading', 'Futures Trading', 'Options', 'Margin Trading', 'Staking'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/HTX_Global',
    telegram: 'https://t.me/htxglobalofficial',
    reddit: 'https://www.reddit.com/r/HTX_Global/',
    youtube: 'https://www.youtube.com/@HTXGlobal',
    facebook: 'https://www.facebook.com/htxglobalofficial',
    linkedin: 'https://www.linkedin.com/company/htx-global',
  };

  /**
   * Make public request to HTX API
   */
  private async makePublicRequest(endpoint: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error(`HTX API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.status === 'error') {
      throw new Error(`HTX API error: ${result.err_msg}`);
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
export const HTXExchange = {
  async getTicker(symbol?: string): Promise<any> {
    const instance = new HTXExchangeClass();
    return instance.getTicker(symbol);
  },

  async getDepth(symbol: string, type: string = 'step0'): Promise<any> {
    const instance = new HTXExchangeClass();
    return instance.getDepth(symbol, type);
  },

  async getTrades(symbol: string): Promise<any> {
    const instance = new HTXExchangeClass();
    return instance.getTrades(symbol);
  },

  async getHistoryTrades(symbol: string, size?: number): Promise<any> {
    const instance = new HTXExchangeClass();
    return instance.getHistoryTrades(symbol, size);
  },

  async getKline(symbol: string, period: string, size?: number): Promise<any> {
    const instance = new HTXExchangeClass();
    return instance.getKline(symbol, period, size);
  },

  async getPrice(symbol: string): Promise<number> {
    const instance = new HTXExchangeClass();
    return instance.getPrice(symbol);
  },

  async get24hrChange(symbol: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const instance = new HTXExchangeClass();
    return instance.get24hrChange(symbol);
  },

  async getVolume(symbol: string): Promise<{ volume: number; amount: number }> {
    const instance = new HTXExchangeClass();
    return instance.getVolume(symbol);
  },

  async getServerTime(): Promise<any> {
    const instance = new HTXExchangeClass();
    return instance.getServerTime();
  },

  async getSymbols(): Promise<any> {
    const instance = new HTXExchangeClass();
    return instance.getSymbols();
  },

  async getCurrencies(): Promise<any> {
    const instance = new HTXExchangeClass();
    return instance.getCurrencies();
  },

  info: HTXExchangeClass.info,
  socialMedia: HTXExchangeClass.socialMedia,
};

export default HTXExchange;
