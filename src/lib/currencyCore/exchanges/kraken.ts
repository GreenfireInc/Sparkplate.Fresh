// Kraken Exchange API Integration
// US-based cryptocurrency exchange with spot and futures trading

// Note: crypto import should be handled by the runtime environment
// For browser environments, use Web Crypto API or a crypto library like crypto-js

export interface KrakenConfig {
  apiKey?: string;
  apiSecret?: string;
  sandbox?: boolean;
  baseUrl?: string;
}

export class KrakenExchangeClass {
  private config: KrakenConfig;
  private baseUrl: string;
  private apiUrl: string;

  constructor(config: KrakenConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api.kraken.com';
    this.apiUrl = `${this.baseUrl}/0`;
  }

  // Basic Information
  static readonly info = {
    name: 'Kraken',
    country: 'United States',
    founded: 2011,
    website: 'https://www.kraken.com/',
    apiDocs: 'https://docs.kraken.com/rest/',
    status: 'Active',
    tradingPairs: '200+',
    volume24h: '$500M+',
    features: ['Spot Trading', 'Futures Trading', 'Staking', 'Margin Trading'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/krakenfx',
    telegram: 'https://t.me/krakenexchange',
    reddit: 'https://www.reddit.com/r/kraken/',
    youtube: 'https://www.youtube.com/kraken',
    facebook: 'https://www.facebook.com/KrakenExchange',
    linkedin: 'https://www.linkedin.com/company/kraken-exchange',
    instagram: 'https://www.instagram.com/krakenfx/',
    discord: 'https://discord.gg/kraken',
  };

  /**
   * Generate signature for authenticated requests
   */
  private generateSignature(endpoint: string, nonce: number, postData: string): string {
    if (!this.config.apiSecret) {
      throw new Error('API secret is required for authenticated requests');
    }

    try {
      const crypto = require('crypto');
      const message = endpoint + crypto.createHash('sha256').update(nonce + postData, 'binary').digest('binary');
      const signature = crypto.createHmac('sha512', Buffer.from(this.config.apiSecret, 'base64')).update(message, 'binary').digest('base64');
      return signature;
    } catch (error) {
      throw new Error('Crypto module not available. Please install crypto-js or use a compatible crypto library.');
    }
  }

  /**
   * Make authenticated request to Kraken API
   */
  private async makeAuthenticatedRequest(endpoint: string, data: Record<string, any> = {}): Promise<any> {
    if (!this.config.apiKey || !this.config.apiSecret) {
      throw new Error('API key and secret are required for authenticated requests');
    }

    try {
      const nonce = Date.now() * 1000;
      const postData = Object.keys(data).length > 0 ? new URLSearchParams(data).toString() : '';
      const signature = this.generateSignature(endpoint, nonce, postData);

      const response = await fetch(`${this.apiUrl}${endpoint}`, {
        method: 'POST',
        headers: {
          'API-Key': this.config.apiKey,
          'API-Sign': signature,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: postData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Kraken API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      if (result.error && result.error.length > 0) {
        throw new Error(`Kraken API error: ${result.error.join(', ')}`);
      }

      return result.result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Kraken authenticated request failed: ${error.message}`);
      }
      throw new Error('Kraken authenticated request failed: Unknown error');
    }
  }

  /**
   * Make public request to Kraken API
   */
  private async makePublicRequest(endpoint: string, params: Record<string, any> = {}): Promise<any> {
    try {
      const queryString = Object.keys(params)
        .map(key => `${key}=${encodeURIComponent(params[key])}`)
        .join('&');

      const url = `${this.apiUrl}${endpoint}${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Kraken API error: ${response.status} ${response.statusText} - ${errorText}`);
      }

      const result = await response.json();
      if (result.error && result.error.length > 0) {
        throw new Error(`Kraken API error: ${result.error.join(', ')}`);
      }

      return result.result;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Kraken public request failed: ${error.message}`);
      }
      throw new Error('Kraken public request failed: Unknown error');
    }
  }

  /**
   * Get server time
   */
  async getServerTime(): Promise<{ unixtime: number; rfc1123: string }> {
    return this.makePublicRequest('/public/Time');
  }

  /**
   * Get system status
   */
  async getSystemStatus(): Promise<any> {
    return this.makePublicRequest('/public/SystemStatus');
  }

  /**
   * Get asset information
   */
  async getAssetInfo(assets?: string[]): Promise<any> {
    const params = assets ? { asset: assets.join(',') } : {};
    return this.makePublicRequest('/public/Assets', params);
  }

  /**
   * Get tradable asset pairs
   */
  async getTradableAssetPairs(pairs?: string[]): Promise<any> {
    const params = pairs ? { pair: pairs.join(',') } : {};
    return this.makePublicRequest('/public/AssetPairs', params);
  }

  /**
   * Get ticker information
   */
  async getTickerInfo(pairs?: string[]): Promise<any> {
    const params = pairs ? { pair: pairs.join(',') } : {};
    return this.makePublicRequest('/public/Ticker', params);
  }

  /**
   * Get OHLC data
   */
  async getOHLCData(pair: string, interval: number = 1, since?: number): Promise<any> {
    const params: any = { pair, interval };
    if (since) params.since = since;
    return this.makePublicRequest('/public/OHLC', params);
  }

  /**
   * Get order book
   */
  async getOrderBook(pair: string, count?: number): Promise<any> {
    const params = count ? { pair, count } : { pair };
    return this.makePublicRequest('/public/Depth', params);
  }

  /**
   * Get recent trades
   */
  async getRecentTrades(pair: string, since?: number): Promise<any> {
    const params = since ? { pair, since } : { pair };
    return this.makePublicRequest('/public/Trades', params);
  }

  /**
   * Get spread data
   */
  async getSpreadData(pair: string, since?: number): Promise<any> {
    const params = since ? { pair, since } : { pair };
    return this.makePublicRequest('/public/Spread', params);
  }

  /**
   * Get account balance (requires authentication)
   */
  async getAccountBalance(): Promise<any> {
    return this.makeAuthenticatedRequest('/private/Balance');
  }

  /**
   * Get trade balance (requires authentication)
   */
  async getTradeBalance(asset?: string): Promise<any> {
    const data = asset ? { asset } : {};
    return this.makeAuthenticatedRequest('/private/TradeBalance', data);
  }

  /**
   * Get open orders (requires authentication)
   */
  async getOpenOrders(trades?: boolean, userref?: number): Promise<any> {
    const data: any = {};
    if (trades !== undefined) data.trades = trades;
    if (userref !== undefined) data.userref = userref;
    return this.makeAuthenticatedRequest('/private/OpenOrders', data);
  }

  /**
   * Get closed orders (requires authentication)
   */
  async getClosedOrders(trades?: boolean, userref?: number, start?: number, end?: number): Promise<any> {
    const data: any = {};
    if (trades !== undefined) data.trades = trades;
    if (userref !== undefined) data.userref = userref;
    if (start !== undefined) data.start = start;
    if (end !== undefined) data.end = end;
    return this.makeAuthenticatedRequest('/private/ClosedOrders', data);
  }

  /**
   * Query orders info (requires authentication)
   */
  async queryOrdersInfo(txid: string[], trades?: boolean, userref?: number): Promise<any> {
    const data: any = { txid: txid.join(',') };
    if (trades !== undefined) data.trades = trades;
    if (userref !== undefined) data.userref = userref;
    return this.makeAuthenticatedRequest('/private/QueryOrders', data);
  }

  /**
   * Get trades history (requires authentication)
   */
  async getTradesHistory(type?: string, trades?: boolean, start?: number, end?: number): Promise<any> {
    const data: any = {};
    if (type !== undefined) data.type = type;
    if (trades !== undefined) data.trades = trades;
    if (start !== undefined) data.start = start;
    if (end !== undefined) data.end = end;
    return this.makeAuthenticatedRequest('/private/TradesHistory', data);
  }

  /**
   * Get specific ticker price
   */
  async getPrice(pair: string): Promise<number> {
    const ticker = await this.getTickerInfo([pair]);
    const pairData = ticker[Object.keys(ticker)[0]];
    return parseFloat(pairData.c[0]); // Last trade closed price
  }

  /**
   * Get 24hr price change
   */
  async get24hrChange(pair: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const ticker = await this.getTickerInfo([pair]);
    const pairData = ticker[Object.keys(ticker)[0]];
    
    const currentPrice = parseFloat(pairData.c[0]);
    const openPrice = parseFloat(pairData.o);
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
  async getVolume(pair: string): Promise<{ volume: number; volumeWeighted: number }> {
    const ticker = await this.getTickerInfo([pair]);
    const pairData = ticker[Object.keys(ticker)[0]];
    
    return {
      volume: parseFloat(pairData.v[1]), // Volume today
      volumeWeighted: parseFloat(pairData.p[1]), // Volume weighted average price today
    };
  }

  /**
   * Get account balance for specific asset
   */
  async getBalance(asset: string): Promise<number> {
    const balances = await this.getAccountBalance();
    return parseFloat(balances[asset] || '0');
  }

  /**
   * Get all non-zero balances
   */
  async getAllBalances(): Promise<Array<{ asset: string; balance: number }>> {
    const balances = await this.getAccountBalance();
    return Object.entries(balances)
      .filter(([_, balance]) => parseFloat(balance as string) > 0)
      .map(([asset, balance]) => ({ asset, balance: parseFloat(balance as string) }));
  }
}

// Static methods for quick access without authentication
export const KrakenExchange = {
  // Quick access methods for public data
  async getTickerInfo(pairs?: string[]): Promise<any> {
    const instance = new KrakenExchangeClass();
    return instance.getTickerInfo(pairs);
  },

  async getOrderBook(pair: string, count?: number): Promise<any> {
    const instance = new KrakenExchangeClass();
    return instance.getOrderBook(pair, count);
  },

  async getRecentTrades(pair: string, since?: number): Promise<any> {
    const instance = new KrakenExchangeClass();
    return instance.getRecentTrades(pair, since);
  },

  async getOHLCData(pair: string, interval: number = 1, since?: number): Promise<any> {
    const instance = new KrakenExchangeClass();
    return instance.getOHLCData(pair, interval, since);
  },

  async getPrice(pair: string): Promise<number> {
    const instance = new KrakenExchangeClass();
    return instance.getPrice(pair);
  },

  async get24hrChange(pair: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const instance = new KrakenExchangeClass();
    return instance.get24hrChange(pair);
  },

  async getVolume(pair: string): Promise<{ volume: number; volumeWeighted: number }> {
    const instance = new KrakenExchangeClass();
    return instance.getVolume(pair);
  },

  async getServerTime(): Promise<{ unixtime: number; rfc1123: string }> {
    const instance = new KrakenExchangeClass();
    return instance.getServerTime();
  },

  async getSystemStatus(): Promise<any> {
    const instance = new KrakenExchangeClass();
    return instance.getSystemStatus();
  },

  async getAssetInfo(assets?: string[]): Promise<any> {
    const instance = new KrakenExchangeClass();
    return instance.getAssetInfo(assets);
  },

  async getTradableAssetPairs(pairs?: string[]): Promise<any> {
    const instance = new KrakenExchangeClass();
    return instance.getTradableAssetPairs(pairs);
  },

  // Static properties
  info: KrakenExchangeClass.info,
  socialMedia: KrakenExchangeClass.socialMedia,
};

// Export the class as default
export default KrakenExchange;
