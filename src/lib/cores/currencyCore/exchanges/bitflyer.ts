// Bitflyer Exchange API Integration
// Japanese cryptocurrency exchange

export interface BitflyerConfig {
  apiKey?: string;
  apiSecret?: string;
  sandbox?: boolean;
  baseUrl?: string;
}

export class BitflyerExchangeClass {
  private config: BitflyerConfig;
  private baseUrl: string;

  constructor(config: BitflyerConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || 'https://api.bitflyer.com';
  }

  // Basic Information
  static readonly info = {
    name: 'Bitflyer',
    country: 'Japan',
    founded: 2014,
    website: 'https://bitflyer.com/',
    apiDocs: 'https://lightning.bitflyer.com/docs',
    status: 'Active',
    tradingPairs: '50+',
    volume24h: '$100M+',
    features: ['Spot Trading', 'Lightning FX', 'Lightning Bitcoin'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/bitflyer',
    facebook: 'https://www.facebook.com/bitflyer',
    linkedin: 'https://www.linkedin.com/company/bitflyer',
  };

  /**
   * Make public request to Bitflyer API
   */
  private async makePublicRequest(endpoint: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Bitflyer API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get market status
   */
  async getMarketStatus(): Promise<any> {
    return this.makePublicRequest('/v1/getmarkets');
  }

  /**
   * Get board state
   */
  async getBoardState(productCode: string): Promise<any> {
    return this.makePublicRequest(`/v1/getboardstate?product_code=${productCode}`);
  }

  /**
   * Get ticker
   */
  async getTicker(productCode: string): Promise<any> {
    return this.makePublicRequest(`/v1/getticker?product_code=${productCode}`);
  }

  /**
   * Get executions
   */
  async getExecutions(productCode: string, count?: number, before?: number, after?: number): Promise<any> {
    const params = new URLSearchParams();
    params.append('product_code', productCode);
    if (count) params.append('count', count.toString());
    if (before) params.append('before', before.toString());
    if (after) params.append('after', after.toString());
    
    return this.makePublicRequest(`/v1/getexecutions?${params.toString()}`);
  }

  /**
   * Get board
   */
  async getBoard(productCode: string): Promise<any> {
    return this.makePublicRequest(`/v1/getboard?product_code=${productCode}`);
  }

  /**
   * Get price for a specific product
   */
  async getPrice(productCode: string): Promise<number> {
    const ticker = await this.getTicker(productCode);
    return ticker.ltp; // Last traded price
  }

  /**
   * Get 24hr price change
   */
  async get24hrChange(productCode: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const ticker = await this.getTicker(productCode);
    const currentPrice = ticker.ltp;
    const openPrice = ticker.open;
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
  async getVolume(productCode: string): Promise<{ volume: number }> {
    const ticker = await this.getTicker(productCode);
    return {
      volume: ticker.volume_by_product,
    };
  }
}

// Static methods for quick access
export const BitflyerExchange = {
  async getTicker(productCode: string): Promise<any> {
    const instance = new BitflyerExchangeClass();
    return instance.getTicker(productCode);
  },

  async getBoard(productCode: string): Promise<any> {
    const instance = new BitflyerExchangeClass();
    return instance.getBoard(productCode);
  },

  async getExecutions(productCode: string, count?: number): Promise<any> {
    const instance = new BitflyerExchangeClass();
    return instance.getExecutions(productCode, count);
  },

  async getPrice(productCode: string): Promise<number> {
    const instance = new BitflyerExchangeClass();
    return instance.getPrice(productCode);
  },

  async get24hrChange(productCode: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const instance = new BitflyerExchangeClass();
    return instance.get24hrChange(productCode);
  },

  async getVolume(productCode: string): Promise<{ volume: number }> {
    const instance = new BitflyerExchangeClass();
    return instance.getVolume(productCode);
  },

  async getMarketStatus(): Promise<any> {
    const instance = new BitflyerExchangeClass();
    return instance.getMarketStatus();
  },

  async getBoardState(productCode: string): Promise<any> {
    const instance = new BitflyerExchangeClass();
    return instance.getBoardState(productCode);
  },

  info: BitflyerExchangeClass.info,
  socialMedia: BitflyerExchangeClass.socialMedia,
};

export default BitflyerExchange;
