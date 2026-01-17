# Cryptocurrency Exchanges API Integrations

This directory contains comprehensive TypeScript integrations for major cryptocurrency exchanges, providing unified access to pricing data, account information, and trading functionality.

## 🏦 Supported Exchanges

| Exchange | Country | Founded | Volume (24h) | Features |
|----------|---------|---------|--------------|----------|
| [Binance](binance.ts) | Global | 2017 | $10B+ | Spot, Futures, Options |
| [Bitfinex](bitfinex.ts) | BVI | 2012 | $300M+ | Spot, Margin, Derivatives |
| [Bitflyer](bitflyer.ts) | Japan | 2014 | $100M+ | Lightning FX, Bitcoin |
| [Bitget](bitget.ts) | Singapore | 2018 | $500M+ | Spot, Derivatives, Copy Trading |
| [Bitstamp](bitstamp.ts) | Luxembourg | 2011 | $100M+ | Spot, Fiat Trading |
| [Bybit](bybit.ts) | Singapore | 2018 | $2B+ | Derivatives, Perpetuals |
| [Coinbase](coinbase.ts) | USA | 2012 | $1B+ | Spot, Advanced Trading |
| [Gate.io](gateio.ts) | Cayman Islands | 2013 | $500M+ | Spot, Futures, Options |
| [Huobi](huobi.ts) | Seychelles | 2013 | $1B+ | Spot, Futures, Margin |
| [Kraken](kraken.ts) | USA | 2011 | $500M+ | Spot, Futures, Staking |
| [KuCoin](kucoin.ts) | Seychelles | 2017 | $500M+ | Spot, Futures, Margin |
| [MEXC](mexc.ts) | Seychelles | 2018 | $300M+ | Spot, Futures, Margin |
| [OKX](okx.ts) | Seychelles | 2017 | $2B+ | Spot, Futures, Options |
| [Upbit](upbit.ts) | South Korea | 2017 | $200M+ | Spot, KRW Trading |

## 🚀 Quick Start

### Basic Usage

```typescript
import { BinanceExchange, KrakenExchange, BybitExchange } from '@/components/currencyCore/exchanges';

// Get BTC price from multiple exchanges
const binancePrice = await BinanceExchange.getPrice('BTCUSDT');
const krakenPrice = await KrakenExchange.getPrice('XXBTZUSD');
const bybitPrice = await BybitExchange.getPrice('spot', 'BTCUSDT');

console.log('Binance BTC:', binancePrice);
console.log('Kraken BTC:', krakenPrice);
console.log('Bybit BTC:', bybitPrice);
```

### Multi-Exchange Price Comparison

```typescript
import { getMultiExchangePrice, getAveragePrice } from '@/components/currencyCore/exchanges';

// Get BTC price from multiple exchanges
const prices = await getMultiExchangePrice('BTC', ['Binance', 'Kraken', 'Coinbase']);
console.log('BTC Prices:', prices);

// Get average BTC price across exchanges
const averagePrice = await getAveragePrice('BTC', ['Binance', 'Kraken', 'Coinbase', 'Bybit']);
console.log('Average BTC Price:', averagePrice);
```

### Authenticated Requests

```typescript
import { BinanceExchange } from '@/components/currencyCore/exchanges';

// Create authenticated instance
const binance = new BinanceExchange({
  apiKey: 'your_api_key',
  apiSecret: 'your_api_secret'
});

// Get account information
const accountInfo = await binance.getAccountInfo();
console.log('Account:', accountInfo);

// Get balances
const balances = await binance.getAllBalances();
console.log('Balances:', balances);
```

## 📊 Available Data Types

### Pricing Data
- **Ticker Information**: Current price, 24h change, volume
- **Order Book**: Bid/ask prices and quantities
- **Recent Trades**: Latest trade history
- **Candlestick Data**: OHLCV data for technical analysis

### Account Data (Requires Authentication)
- **Account Information**: Account status and permissions
- **Balances**: Available and locked balances
- **Order History**: Open and closed orders
- **Trade History**: Executed trades and fills

## 🔧 API Features

### Common Methods
Each exchange integration provides these standard methods:

```typescript
// Price and market data
await exchange.getPrice(symbol)
await exchange.get24hrChange(symbol)
await exchange.getVolume(symbol)
await exchange.getTicker(symbol)
await exchange.getOrderBook(symbol)
await exchange.getRecentTrades(symbol)
await exchange.getKlines(symbol, interval)

// Account data (requires authentication)
await exchange.getAccountInfo()
await exchange.getBalance(currency)
await exchange.getAllBalances()
await exchange.getOrders(symbol)
await exchange.getTradeHistory(symbol)
```

### Exchange-Specific Methods
Some exchanges offer unique features:

```typescript
// Binance - Multiple price sources
await BinanceExchange.getAveragePrice('BTCUSDT')
await BinanceExchange.getBookTicker('BTCUSDT')

// Kraken - Asset information
await KrakenExchange.getAssetInfo(['BTC', 'ETH'])
await KrakenExchange.getTradableAssetPairs()

// Bybit - Category-based trading
await BybitExchange.getTickers('spot', 'BTCUSDT')
await BybitExchange.getInstrumentsInfo('spot')

// OKX - Instrument details
await OKXExchange.getInstruments('SPOT')
```

## 🔐 Authentication

### API Key Setup
Most exchanges require API keys for account-related endpoints:

1. **Create API Key**: Log into your exchange account
2. **Set Permissions**: Enable required permissions (read, trade, etc.)
3. **Configure Instance**: Pass credentials to exchange constructor

```typescript
const exchange = new BinanceExchange({
  apiKey: 'your_api_key',
  apiSecret: 'your_api_secret',
  sandbox: false // Use production or sandbox environment
});
```

### Security Best Practices
- Store API keys securely (environment variables)
- Use IP whitelisting when available
- Enable 2FA on exchange accounts
- Regularly rotate API keys
- Use read-only keys for data fetching

## 📈 Error Handling

All integrations include comprehensive error handling:

```typescript
try {
  const price = await BinanceExchange.getPrice('BTCUSDT');
  console.log('BTC Price:', price);
} catch (error) {
  console.error('Error fetching price:', error.message);
  // Handle specific error types
  if (error.message.includes('API error')) {
    // Handle API-specific errors
  }
}
```

## 🌐 Rate Limiting

Each exchange has different rate limits:

| Exchange | Public API | Private API |
|----------|------------|-------------|
| Binance | 1200/min | 1200/min |
| Kraken | 1/sec | 1/sec |
| Bybit | 120/min | 120/min |
| Coinbase | 10/sec | 10/sec |

## 📱 Social Media & Support

Each exchange integration includes official social media links and documentation:

```typescript
// Access exchange information
console.log(BinanceExchange.info);
console.log(BinanceExchange.socialMedia);

// Access official documentation
console.log(BinanceExchange.info.apiDocs);
```

## 🔄 WebSocket Support

Some exchanges support WebSocket connections for real-time data:

- **Binance**: WebSocket API available
- **Kraken**: WebSocket API available
- **Bybit**: WebSocket API available
- **Coinbase**: WebSocket API available

## 🧪 Testing

Use sandbox environments for testing:

```typescript
const binance = new BinanceExchange({
  apiKey: 'sandbox_api_key',
  apiSecret: 'sandbox_api_secret',
  sandbox: true
});
```

## 📚 Additional Resources

- [Exchange API Documentation](https://docs.example.com)
- [Rate Limiting Guide](https://docs.example.com/rate-limits)
- [Authentication Guide](https://docs.example.com/auth)
- [WebSocket Integration](https://docs.example.com/websocket)

## 🤝 Contributing

To add a new exchange:

1. Create a new file following the existing pattern
2. Implement standard methods (getPrice, getTicker, etc.)
3. Add authentication support
4. Include comprehensive documentation
5. Add social media links and official resources
6. Update the main index.ts file

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: Always verify exchange API documentation for the most up-to-date information and rate limits. Exchange APIs may change without notice.
