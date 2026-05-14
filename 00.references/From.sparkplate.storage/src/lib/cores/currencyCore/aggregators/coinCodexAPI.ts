/**
 * CoinCodex API
 * 
 * Cryptocurrency prices, charts, and market cap data
 * Tracks 44,000+ cryptocurrencies on 400+ exchanges
 * 
 * @see https://coincodex.com/
 * @see https://coincodex.com/page/api/
 */

export const coinCodexAPI = {
  name: 'CoinCodex',
  description: 'Cryptocurrency prices, charts, and market cap data for 44,000+ cryptocurrencies',
  
  // API Configuration
  baseURL: 'https://coincodex.com/api/coincodex/',
  apiVersion: 'v0.2 (Beta)',
  
  // Endpoints
  endpoints: {
    // Firstpage History
    firstpageHistory: 'get_firstpage_history/{days}/{samples}/{coins_limit}',
    
    // Coin Data
    getCoin: 'get_coin/{symbol}',
    getCoinHistory: 'get_coin_history/{symbol}/{start_date}/{end_date}/{samples}',
    getCoinMarkets: 'get_coin_markets/{symbol}',
    getCoinRanges: 'get_coin_ranges/{comma_separated_list_of_symbols}',
  },
  
  // Exchange Endpoints
  exchangeEndpoints: {
    baseURL: 'https://coincodex.com/api/exchange/',
    getMarketsByCoin: 'get_markets_by_coin/{symbol}/',
  },
  
  // Authentication
  authentication: {
    required: false,
    type: 'None required',
    note: 'Free API access, no authentication needed',
  },
  
  // Rate Limits
  rateLimits: {
    free: {
      requestsPerSecond: 'Not specified',
      note: 'Free to use under Attribution-NonCommercial 3.0 Unported (CC BY-NC 3.0) license',
      attribution: 'CoinCodex must be credited if API is used in services',
    },
  },
  
  // License
  license: {
    type: 'Attribution-NonCommercial 3.0 Unported (CC BY-NC 3.0)',
    attribution: 'CoinCodex must be credited if the API is used in your services',
    note: 'Free to use for non-commercial purposes',
  },
  
  // NPM SDK
  npmPackages: {
    official: null,
    community: [
      {
        name: 'coincodex-api',
        url: 'https://www.npmjs.com/package/coincodex-api',
        install: 'npm install coincodex-api',
      },
    ],
  },
  
  // Subgraph
  subgraph: {
    available: false,
    note: 'CoinCodex does not provide a subgraph; uses REST API and WebSocket',
  },
  
  // Documentation
  documentation: {
    main: 'https://coincodex.com/page/api/',
    apiReference: 'https://coincodex.com/page/api/',
    contact: 'info@coincodex.com',
  },
  
  // Social Media
  socialMedia: {
    website: 'https://coincodex.com/',
    twitter: 'https://twitter.com/coincodex',
    facebook: 'https://www.facebook.com/coincodex',
    telegram: 'https://t.me/coincodex',
    linkedin: 'https://www.linkedin.com/company/coincodex',
    youtube: 'https://www.youtube.com/coincodex',
    tiktok: 'https://www.tiktok.com/@coincodex',
  },
  
  // Features
  features: {
    realTimePrices: true,
    historicalData: true,
    marketData: true,
    exchangeData: true,
    coinData: true,
    priceRanges: true,
    websocketSupport: true,
    firstpageHistory: true,
    portfolioTracking: false,
  },
  
  // CORS Support
  cors: {
    enabled: true,
    note: 'CORS support for browser requests',
  },
  
  // WebSocket
  websocket: {
    available: true,
    url: 'wss://ws.coincodex.com/subscriptions?transport=websocket',
    note: 'Real-time price updates via WebSocket',
    frames: {
      action: 'refresh',
      what: 'all_coins_ticker',
      data: 'USD/{symbol}: {value, volume}',
    },
  },
  
  // Response Status Codes
  statusCodes: {
    200: 'Everything is OK',
    400: 'Bad request',
    401: 'Unauthorized',
    403: 'Forbidden',
    409: 'Conflict (registration/confirmation)',
    418: 'No session available (refresh)',
    422: 'Unprocessable entity (parameters not present)',
    423: 'Locked (registration/password reset)',
    500: 'Internal Server Error',
  },
  
  // Data Coverage
  dataCoverage: {
    cryptocurrencies: '44,000+',
    exchanges: '400+',
    markets: 'Multiple per coin',
  },
  
  // Example Usage
  examples: {
    firstpageHistory: 'https://coincodex.com/api/coincodex/get_firstpage_history/7/100/50',
    getCoin: 'https://coincodex.com/api/coincodex/get_coin/bitcoin',
    getCoinHistory: 'https://coincodex.com/api/coincodex/get_coin_history/bitcoin/2024-01-01/2024-01-31/30',
    getCoinMarkets: 'https://coincodex.com/api/exchange/get_markets_by_coin/bitcoin/',
    getCoinRanges: 'https://coincodex.com/api/coincodex/get_coin_ranges/bitcoin,ethereum,solana/',
  },
  
  // Response Formats
  responseFormats: {
    firstpageHistory: {
      structure: '{coin_id}: [[timestamp, price_usd], ...]',
      note: 'Array of arrays with timestamp and price',
    },
    getCoin: {
      structure: '{description, ico_price, price_high_24_usd, price_low_24_usd, release_date, social, today_open, website, whitepaper}',
      note: 'Object with coin properties',
    },
    getCoinHistory: {
      structure: '{coin_id}: [[timestamp, price_usd, volume_24hr_usd], ...]',
      note: 'Array of arrays with timestamp, price, and volume',
    },
    getCoinMarkets: {
      structure: '[{name, shortname, share, volume, value: {USD: {value, volume}}, markets: [...]}]',
      note: 'Array of exchange objects with market data',
    },
    getCoinRanges: {
      structure: '{coin_id: {range_name: {min, max}}}',
      note: 'Object with price ranges for each coin',
    },
  },
  
  // Notes
  notes: [
    'API is in beta and subject to change',
    'Free to use under CC BY-NC 3.0 license',
    'CoinCodex must be credited if used in services',
    'Tracks 44,000+ cryptocurrencies',
    'Data from 400+ exchanges',
    'WebSocket support for real-time updates',
    'No authentication required',
    'Contact info@coincodex.com for feedback',
  ],

  // Utility Functions
  utils: {
    /**
     * Build URL for firstpage history endpoint
     */
    buildFirstpageHistoryURL: (params: {
      days: number;
      samples: number;
      coinsLimit: number;
    }) => {
      const { days, samples, coinsLimit } = params;
      return `${coinCodexAPI.baseURL}${coinCodexAPI.endpoints.firstpageHistory
        .replace('{days}', days.toString())
        .replace('{samples}', samples.toString())
        .replace('{coins_limit}', coinsLimit.toString())}`;
    },

    /**
     * Build URL for get coin endpoint
     */
    buildGetCoinURL: (symbol: string) => {
      return `${coinCodexAPI.baseURL}${coinCodexAPI.endpoints.getCoin.replace('{symbol}', symbol)}`;
    },

    /**
     * Build URL for get coin history endpoint
     */
    buildGetCoinHistoryURL: (params: {
      symbol: string;
      startDate: string; // YYYY-MM-DD
      endDate: string; // YYYY-MM-DD
      samples: number;
    }) => {
      const { symbol, startDate, endDate, samples } = params;
      return `${coinCodexAPI.baseURL}${coinCodexAPI.endpoints.getCoinHistory
        .replace('{symbol}', symbol)
        .replace('{start_date}', startDate)
        .replace('{end_date}', endDate)
        .replace('{samples}', samples.toString())}`;
    },

    /**
     * Build URL for get coin markets endpoint
     */
    buildGetCoinMarketsURL: (symbol: string) => {
      return `${coinCodexAPI.exchangeEndpoints.baseURL}${coinCodexAPI.exchangeEndpoints.getMarketsByCoin.replace('{symbol}', symbol)}`;
    },

    /**
     * Build URL for get coin ranges endpoint
     */
    buildGetCoinRangesURL: (symbols: string[]) => {
      const symbolsList = symbols.join(',');
      return `${coinCodexAPI.baseURL}${coinCodexAPI.endpoints.getCoinRanges.replace('{comma_separated_list_of_symbols}', symbolsList)}`;
    },

    /**
     * Fetch firstpage history data
     */
    fetchFirstpageHistory: async (params: {
      days: number;
      samples: number;
      coinsLimit: number;
      timeout?: number;
    }): Promise<Record<string, Array<[number, number]>>> => {
      const { timeout = 5000, ...urlParams } = params;
      const url = coinCodexAPI.utils.buildFirstpageHistoryURL(urlParams);

      try {
        const response = await fetch(url, {
          signal: AbortSignal.timeout(timeout)
        });

        if (!response.ok) {
          throw new Error(`CoinCodex API error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
      } catch (error) {
        console.error('[CoinCodex] API fetch error:', error);
        throw new Error(`Failed to fetch CoinCodex data: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    /**
     * Fetch coin data
     */
    fetchCoinData: async (params: {
      symbol: string;
      timeout?: number;
    }): Promise<{
      description?: string;
      ico_price?: number;
      price_high_24_usd?: number;
      price_low_24_usd?: number;
      release_date?: string | null;
      social?: Record<string, string>;
      today_open?: number;
      website?: string;
      whitepaper?: string;
    }> => {
      const { symbol, timeout = 5000 } = params;
      const url = coinCodexAPI.utils.buildGetCoinURL(symbol);

      try {
        const response = await fetch(url, {
          signal: AbortSignal.timeout(timeout)
        });

        if (!response.ok) {
          throw new Error(`CoinCodex API error: ${response.status} ${response.statusText}`);
        }

        return await response.json();
      } catch (error) {
        console.error('[CoinCodex] API fetch error:', error);
        throw new Error(`Failed to fetch CoinCodex coin data: ${error instanceof Error ? error.message : 'Unknown error'}`);
      }
    },

    /**
     * Map CoinCodex response to standard format
     */
    mapToStandardFormat: (data: {
      description?: string;
      ico_price?: number;
      price_high_24_usd?: number;
      price_low_24_usd?: number;
      today_open?: number;
    }): {
      description?: string;
      icoPrice?: number;
      priceHigh24h?: number;
      priceLow24h?: number;
      todayOpen?: number;
    } => {
      return {
        description: data.description,
        icoPrice: data.ico_price,
        priceHigh24h: data.price_high_24_usd,
        priceLow24h: data.price_low_24_usd,
        todayOpen: data.today_open,
      };
    }
  }
};

export default coinCodexAPI;

