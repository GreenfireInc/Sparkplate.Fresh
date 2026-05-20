// Bybit Exchange API Integration
// Derivatives-focused cryptocurrency exchange

// Note: crypto import should be handled by the runtime environment
// For browser environments, use Web Crypto API or a crypto library like crypto-js

export interface BybitConfig {
  apiKey?: string;
  apiSecret?: string;
  sandbox?: boolean;
  baseUrl?: string;
}

export class BybitExchangeClass {
  private config: BybitConfig;
  private baseUrl: string;
  private apiUrl: string;

  constructor(config: BybitConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || (config.sandbox ? 'https://api-testnet.bybit.com' : 'https://api.bybit.com');
    this.apiUrl = `${this.baseUrl}/v5`;
  }

  // Basic Information
  static readonly info = {
    name: 'Bybit',
    country: 'Singapore',
    founded: 2018,
    website: 'https://www.bybit.com/',
    apiDocs: 'https://bybit-exchange.github.io/docs/',
    status: 'Active',
    tradingPairs: '400+',
    volume24h: '$2B+',
    features: ['Spot Trading', 'Derivatives', 'Perpetual Contracts', 'Options', 'Unified Trading Account'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/Bybit_Official',
    telegram: 'https://t.me/bybit',
    discord: 'https://discord.gg/bybit',
    reddit: 'https://www.reddit.com/r/Bybit/',
    youtube: 'https://www.youtube.com/bybit',
    facebook: 'https://www.facebook.com/Bybit',
    linkedin: 'https://www.linkedin.com/company/bybit',
    instagram: 'https://www.instagram.com/bybit_official/',
  };

  /**
   * Generate signature for authenticated requests
   */
  private generateSignature(timestamp: string, method: string, endpoint: string, body: string = ''): string {
    if (!this.config.apiSecret) {
      throw new Error('API secret is required for authenticated requests');
    }

    const message = timestamp + this.config.apiKey + '5000' + body;
    try {
      const crypto = require('crypto');
      return crypto.createHmac('sha256', this.config.apiSecret).update(message).digest('hex');
    } catch (error) {
      throw new Error('Crypto module not available. Please install crypto-js or use a compatible crypto library.');
    }
  }

  /**
   * Make authenticated request to Bybit API
   */
  private async makeAuthenticatedRequest(endpoint: string, method: string = 'GET', data: Record<string, any> = {}): Promise<any> {
    if (!this.config.apiKey || !this.config.apiSecret) {
      throw new Error('API key and secret are required for authenticated requests');
    }

    const timestamp = Date.now().toString();
    const body = Object.keys(data).length > 0 ? JSON.stringify(data) : '';
    const signature = this.generateSignature(timestamp, method, endpoint, body);

    const response = await fetch(`${this.apiUrl}${endpoint}`, {
      method,
      headers: {
        'X-BAPI-API-KEY': this.config.apiKey,
        'X-BAPI-SIGN': signature,
        'X-BAPI-SIGN-TYPE': '2',
        'X-BAPI-TIMESTAMP': timestamp,
        'X-BAPI-RECV-WINDOW': '5000',
        'Content-Type': 'application/json',
      },
      body: body || undefined,
    });

    if (!response.ok) {
      throw new Error(`Bybit API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.retCode !== 0) {
      throw new Error(`Bybit API error: ${result.retMsg}`);
    }

    return result.result;
  }

  /**
   * Make public request to Bybit API
   */
  private async makePublicRequest(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    const queryString = Object.keys(params)
      .map(key => `${key}=${encodeURIComponent(params[key])}`)
      .join('&');

    const url = `${this.apiUrl}${endpoint}${queryString ? `?${queryString}` : ''}`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Bybit API error: ${response.status} ${response.statusText}`);
    }

    const result = await response.json();
    if (result.retCode !== 0) {
      throw new Error(`Bybit API error: ${result.retMsg}`);
    }

    return result.result;
  }

  /**
   * Get server time
   */
  async getServerTime(): Promise<{ timeSecond: string; timeNano: string }> {
    return this.makePublicRequest('/market/time');
  }

  /**
   * Get server status
   */
  async getServerStatus(): Promise<any> {
    return this.makePublicRequest('/market/status');
  }

  /**
   * Get instruments info
   */
  async getInstrumentsInfo(category: string, symbol?: string): Promise<any> {
    const params: any = { category };
    if (symbol) params.symbol = symbol;
    return this.makePublicRequest('/market/instruments-info', params);
  }

  /**
   * Get order book
   */
  async getOrderBook(category: string, symbol: string, limit?: number): Promise<any> {
    const params: any = { category, symbol };
    if (limit) params.limit = limit;
    return this.makePublicRequest('/market/orderbook', params);
  }

  /**
   * Get kline data
   */
  async getKline(category: string, symbol: string, interval: string, start?: number, end?: number, limit?: number): Promise<any> {
    const params: any = { category, symbol, interval };
    if (start) params.start = start;
    if (end) params.end = end;
    if (limit) params.limit = limit;
    return this.makePublicRequest('/market/kline', params);
  }

  /**
   * Get recent trades
   */
  async getRecentTrades(category: string, symbol: string, limit?: number): Promise<any> {
    const params: any = { category, symbol };
    if (limit) params.limit = limit;
    return this.makePublicRequest('/market/recent-trade', params);
  }

  /**
   * Get tickers
   */
  async getTickers(category: string, symbol?: string): Promise<any> {
    const params: any = { category };
    if (symbol) params.symbol = symbol;
    return this.makePublicRequest('/market/tickers', params);
  }

  /**
   * Get funding rate history
   */
  async getFundingRateHistory(category: string, symbol?: string, startTime?: number, endTime?: number, limit?: number): Promise<any> {
    const params: any = { category };
    if (symbol) params.symbol = symbol;
    if (startTime) params.startTime = startTime;
    if (endTime) params.endTime = endTime;
    if (limit) params.limit = limit;
    return this.makePublicRequest('/market/funding/history', params);
  }

  /**
   * Get account info (requires authentication)
   */
  async getAccountInfo(accountType?: string): Promise<any> {
    const data = accountType ? { accountType } : {};
    return this.makeAuthenticatedRequest('/account/info', 'GET', data);
  }

  /**
   * Get wallet balance (requires authentication)
   */
  async getWalletBalance(accountType?: string, coin?: string): Promise<any> {
    const data: any = {};
    if (accountType) data.accountType = accountType;
    if (coin) data.coin = coin;
    return this.makeAuthenticatedRequest('/account/wallet-balance', 'GET', data);
  }

  /**
   * Get positions (requires authentication)
   */
  async getPositions(category: string, symbol?: string, baseCoin?: string, settleCoin?: string, limit?: number): Promise<any> {
    const data: any = { category };
    if (symbol) data.symbol = symbol;
    if (baseCoin) data.baseCoin = baseCoin;
    if (settleCoin) data.settleCoin = settleCoin;
    if (limit) data.limit = limit;
    return this.makeAuthenticatedRequest('/position/list', 'GET', data);
  }

  /**
   * Get open orders (requires authentication)
   */
  async getOpenOrders(category: string, symbol?: string, baseCoin?: string, settleCoin?: string, orderId?: string, openOnly?: number, limit?: number): Promise<any> {
    const data: any = { category };
    if (symbol) data.symbol = symbol;
    if (baseCoin) data.baseCoin = baseCoin;
    if (settleCoin) data.settleCoin = settleCoin;
    if (orderId) data.orderId = orderId;
    if (openOnly !== undefined) data.openOnly = openOnly;
    if (limit) data.limit = limit;
    return this.makeAuthenticatedRequest('/order/realtime', 'GET', data);
  }

  /**
   * Get order history (requires authentication)
   */
  async getOrderHistory(category: string, symbol?: string, baseCoin?: string, settleCoin?: string, orderId?: string, startTime?: number, endTime?: number, limit?: number): Promise<any> {
    const data: any = { category };
    if (symbol) data.symbol = symbol;
    if (baseCoin) data.baseCoin = baseCoin;
    if (settleCoin) data.settleCoin = settleCoin;
    if (orderId) data.orderId = orderId;
    if (startTime) data.startTime = startTime;
    if (endTime) data.endTime = endTime;
    if (limit) data.limit = limit;
    return this.makeAuthenticatedRequest('/order/history', 'GET', data);
  }

  /**
   * Get trade history (requires authentication)
   */
  async getTradeHistory(category: string, symbol?: string, baseCoin?: string, orderId?: string, startTime?: number, endTime?: number, limit?: number): Promise<any> {
    const data: any = { category };
    if (symbol) data.symbol = symbol;
    if (baseCoin) data.baseCoin = baseCoin;
    if (orderId) data.orderId = orderId;
    if (startTime) data.startTime = startTime;
    if (endTime) data.endTime = endTime;
    if (limit) data.limit = limit;
    return this.makeAuthenticatedRequest('/execution/list', 'GET', data);
  }

  /**
   * Get price for a specific symbol
   */
  async getPrice(category: string, symbol: string): Promise<number> {
    const tickers = await this.getTickers(category, symbol);
    const ticker = tickers.list[0];
    return parseFloat(ticker.lastPrice);
  }

  /**
   * Get 24hr price change
   */
  async get24hrChange(category: string, symbol: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const tickers = await this.getTickers(category, symbol);
    const ticker = tickers.list[0];
    
    const currentPrice = parseFloat(ticker.lastPrice);
    const priceChange = parseFloat(ticker.price24hPcnt);
    const priceChangePercent = priceChange * 100;

    return {
      priceChange: currentPrice * priceChange,
      priceChangePercent,
    };
  }

  /**
   * Get trading volume
   */
  async getVolume(category: string, symbol: string): Promise<{ volume: number; turnover: number }> {
    const tickers = await this.getTickers(category, symbol);
    const ticker = tickers.list[0];
    
    return {
      volume: parseFloat(ticker.volume24h),
      turnover: parseFloat(ticker.turnover24h),
    };
  }

  /**
   * Get account balance for specific coin
   */
  async getBalance(accountType: string, coin: string): Promise<number> {
    const balances = await this.getWalletBalance(accountType, coin);
    const coinBalance = balances.list[0]?.coin?.find((c: any) => c.coin === coin);
    return parseFloat(coinBalance?.walletBalance || '0');
  }

  /**
   * Get all non-zero balances
   */
  async getAllBalances(accountType: string): Promise<Array<{ coin: string; balance: number }>> {
    const balances = await this.getWalletBalance(accountType);
    const result: Array<{ coin: string; balance: number }> = [];
    
    balances.list.forEach((account: any) => {
      account.coin.forEach((coin: any) => {
        const balance = parseFloat(coin.walletBalance);
        if (balance > 0) {
          result.push({ coin: coin.coin, balance });
        }
      });
    });
    
    return result;
  }
}

// Static methods for quick access without authentication
export const BybitExchange = {
  // Quick access methods for public data
  async getTickers(category: string, symbol?: string): Promise<any> {
    const instance = new BybitExchangeClass();
    return instance.getTickers(category, symbol);
  },

  async getOrderBook(category: string, symbol: string, limit?: number): Promise<any> {
    const instance = new BybitExchangeClass();
    return instance.getOrderBook(category, symbol, limit);
  },

  async getRecentTrades(category: string, symbol: string, limit?: number): Promise<any> {
    const instance = new BybitExchangeClass();
    return instance.getRecentTrades(category, symbol, limit);
  },

  async getKline(category: string, symbol: string, interval: string, start?: number, end?: number, limit?: number): Promise<any> {
    const instance = new BybitExchangeClass();
    return instance.getKline(category, symbol, interval, start, end, limit);
  },

  async getPrice(category: string, symbol: string): Promise<number> {
    const instance = new BybitExchangeClass();
    return instance.getPrice(category, symbol);
  },

  async get24hrChange(category: string, symbol: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const instance = new BybitExchangeClass();
    return instance.get24hrChange(category, symbol);
  },

  async getVolume(category: string, symbol: string): Promise<{ volume: number; turnover: number }> {
    const instance = new BybitExchangeClass();
    return instance.getVolume(category, symbol);
  },

  async getServerTime(): Promise<{ timeSecond: string; timeNano: string }> {
    const instance = new BybitExchangeClass();
    return instance.getServerTime();
  },

  async getServerStatus(): Promise<any> {
    const instance = new BybitExchangeClass();
    return instance.getServerStatus();
  },

  async getInstrumentsInfo(category: string, symbol?: string): Promise<any> {
    const instance = new BybitExchangeClass();
    return instance.getInstrumentsInfo(category, symbol);
  },

  // Static properties
  info: BybitExchangeClass.info,
  socialMedia: BybitExchangeClass.socialMedia,
};

// Export the class as default
export default BybitExchange;
