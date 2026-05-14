// Gemini Exchange API Integration
// US-based cryptocurrency exchange (formerly Gemini Trust)

// Note: crypto import should be handled by the runtime environment
// For browser environments, use Web Crypto API or a crypto library like crypto-js

export interface GeminiConfig {
  apiKey?: string;
  apiSecret?: string;
  sandbox?: boolean;
  baseUrl?: string;
}

export class GeminiExchangeClass {
  private config: GeminiConfig;
  private baseUrl: string;

  constructor(config: GeminiConfig = {}) {
    this.config = config;
    this.baseUrl = config.baseUrl || (config.sandbox ? 'https://api.sandbox.gemini.com' : 'https://api.gemini.com');
  }

  // Basic Information
  static readonly info = {
    name: 'Gemini',
    country: 'United States',
    founded: 2014,
    website: 'https://www.gemini.com/',
    apiDocs: 'https://docs.gemini.com/rest-api/',
    status: 'Active',
    tradingPairs: '100+',
    volume24h: '$100M+',
    features: ['Spot Trading', 'Custody', 'Staking', 'Institutional Services'],
  };

  // Social Media Links
  static readonly socialMedia = {
    twitter: 'https://twitter.com/gemini',
    telegram: 'https://t.me/geminiexchange',
    reddit: 'https://www.reddit.com/r/Gemini/',
    youtube: 'https://www.youtube.com/gemini',
    facebook: 'https://www.facebook.com/GeminiTrust',
    linkedin: 'https://www.linkedin.com/company/gemini-trust',
    instagram: 'https://www.instagram.com/gemini/',
  };

  /**
   * Generate authenticated payload and signature for Gemini API.
   * Gemini uses: X-GEMINI-APIKEY, X-GEMINI-PAYLOAD (base64 JSON), X-GEMINI-SIGNATURE (HMAC SHA384).
   */
  private generatePayloadAndSignature(requestPath: string): { payload: Record<string, string>; headers: Record<string, string> } {
    if (!this.config.apiKey || !this.config.apiSecret) {
      throw new Error('API key and secret are required for authenticated requests');
    }

    const nonce = Date.now().toString();
    const payload = {
      request: requestPath,
      nonce,
    };

    try {
      const crypto = require('crypto');
      const encodedPayload = Buffer.from(JSON.stringify(payload), 'utf-8').toString('base64');
      const signature = crypto
        .createHmac('sha384', this.config.apiSecret)
        .update(encodedPayload)
        .digest('hex');

      return {
        payload,
        headers: {
          'Content-Type': 'text/plain',
          'X-GEMINI-APIKEY': this.config.apiKey,
          'X-GEMINI-PAYLOAD': encodedPayload,
          'X-GEMINI-SIGNATURE': signature,
        },
      };
    } catch (error) {
      throw new Error('Crypto module not available. Please install crypto-js or use a compatible crypto library.');
    }
  }

  /**
   * Make authenticated POST request to Gemini API
   */
  private async makeAuthenticatedRequest(requestPath: string): Promise<any> {
    const { payload, headers } = this.generatePayloadAndSignature(requestPath);

    const response = await fetch(`${this.baseUrl}${requestPath}`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Gemini API error: ${response.status} ${response.statusText} - ${errorText}`);
    }

    return response.json();
  }

  /**
   * Make public GET request to Gemini API
   */
  private async makePublicRequest(endpoint: string): Promise<any> {
    const response = await fetch(`${this.baseUrl}${endpoint}`);

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get public ticker for a symbol (e.g. btcusd, ethusd).
   * Gemini uses lowercase symbols.
   */
  async getPubTicker(symbol: string): Promise<any> {
    const normalizedSymbol = symbol.toLowerCase();
    return this.makePublicRequest(`/v1/pubticker/${normalizedSymbol}`);
  }

  /**
   * Get price for a specific symbol
   */
  async getPrice(symbol: string): Promise<number> {
    const ticker = await this.getPubTicker(symbol);
    return parseFloat(ticker.last);
  }

  /**
   * Get ticker price - returns shape compatible with getMultiExchangePrice
   */
  async getTickerPrice(symbol: string): Promise<{ symbol: string; price: number; volume?: number; change24h?: number; high24h?: number; low24h?: number }> {
    const ticker = await this.getPubTicker(symbol);
    const normalizedSymbol = symbol.toLowerCase();
    return {
      symbol: normalizedSymbol,
      price: parseFloat(ticker.last),
      volume: parseFloat(ticker.volume?.volume || ticker.volume || '0') || undefined,
      change24h: ticker.percentChange24h ? parseFloat(ticker.percentChange24h) : undefined,
      high24h: ticker.high ? parseFloat(ticker.high) : undefined,
      low24h: ticker.low ? parseFloat(ticker.low) : undefined,
    };
  }

  /**
   * Get 24hr price change
   */
  async get24hrChange(symbol: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const ticker = await this.getPubTicker(symbol);
    const currentPrice = parseFloat(ticker.last);
    const openPrice = ticker.open ? parseFloat(ticker.open) : currentPrice;
    const priceChange = currentPrice - openPrice;
    const priceChangePercent = openPrice > 0 ? (priceChange / openPrice) * 100 : 0;

    return {
      priceChange,
      priceChangePercent,
    };
  }

  /**
   * Get trading volume
   */
  async getVolume(symbol: string): Promise<{ volume: number }> {
    const ticker = await this.getPubTicker(symbol);
    const volume = ticker.volume?.volume ?? ticker.volume ?? '0';
    return {
      volume: parseFloat(volume),
    };
  }

  /**
   * Get account balances (requires authentication)
   */
  async getBalances(): Promise<any[]> {
    return this.makeAuthenticatedRequest('/v1/balances');
  }

  /**
   * Get transfers history (requires authentication)
   */
  async getTransfers(): Promise<any[]> {
    return this.makeAuthenticatedRequest('/v1/transfers');
  }

  /**
   * Get all non-zero balances (requires authentication)
   */
  async getAllBalances(): Promise<Array<{ currency: string; balance: number }>> {
    const balances = await this.getBalances();
    return balances
      .filter((b: any) => parseFloat(b.availableForWithdrawal || '0') > 0 || parseFloat(b.amount || '0') > 0)
      .map((b: any) => ({
        currency: b.currency,
        balance: parseFloat(b.availableForWithdrawal ?? b.amount ?? '0'),
      }));
  }
}

// Static methods for quick access
export const GeminiExchange = {
  async getPubTicker(symbol: string): Promise<any> {
    const instance = new GeminiExchangeClass();
    return instance.getPubTicker(symbol);
  },

  async getTickerPrice(symbol: string): Promise<{ symbol: string; price: number; volume?: number; change24h?: number; high24h?: number; low24h?: number }> {
    const instance = new GeminiExchangeClass();
    return instance.getTickerPrice(symbol);
  },

  async getPrice(symbol: string): Promise<number> {
    const instance = new GeminiExchangeClass();
    return instance.getPrice(symbol);
  },

  async get24hrChange(symbol: string): Promise<{ priceChange: number; priceChangePercent: number }> {
    const instance = new GeminiExchangeClass();
    return instance.get24hrChange(symbol);
  },

  async getVolume(symbol: string): Promise<{ volume: number }> {
    const instance = new GeminiExchangeClass();
    return instance.getVolume(symbol);
  },

  info: GeminiExchangeClass.info,
  socialMedia: GeminiExchangeClass.socialMedia,
};

export default GeminiExchange;
