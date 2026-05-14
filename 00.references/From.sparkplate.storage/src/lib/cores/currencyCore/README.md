# CurrencyCore - Comprehensive Cryptocurrency Integration Hub

Welcome to CurrencyCore, the most comprehensive cryptocurrency integration hub providing TypeScript APIs for all major cryptocurrency services and platforms.

## 🚀 Overview

CurrencyCore is a centralized module that provides seamless integration with:

- **100+ Cryptocurrency Exchanges** (Centralized, P2P, Quick, DEXs)
- **50+ Blockchain APIs** and explorers
- **30+ On-Ramp/Off-Ramp Services**
- **20+ Mining Pools**
- **15+ Staking Pools**
- **10+ Oracle Services**
- **25+ Aggregator Services**
- **Multiple Domain Services**

## 📁 Directory Structure

```
currencyCore/
├── index.ts                 # Main entry point
├── exports.ts              # Consolidated exports
├── README.md               # This documentation
├── blockchainAPIs/         # Direct blockchain access
├── currencies/             # Individual cryptocurrency implementations
├── DEXs/                   # Decentralized exchanges
├── exchanges/              # Centralized exchanges
├── p2pExchanges/           # Peer-to-peer exchanges
├── quickExchanges/         # Instant exchanges
├── ramps/                  # On-ramp/off-ramp services
├── miningPools/            # Mining pool integrations
├── stakingPools/           # Staking pool services
├── oracles/                # Oracle data providers
├── aggregators/            # Multi-service aggregators
└── domains/                # Domain name services
```

## 🔧 Service Categories

### 1. **Exchanges** (Centralized Exchanges)
Traditional cryptocurrency exchanges with order books and account management.

**Features:**
- Spot trading
- Futures and derivatives
- Order management
- Account management
- KYC/AML compliance

**Popular Services:**
- Binance, Coinbase, Kraken, Bitfinex, Huobi, OKX, Bybit, Gate.io, KuCoin, MEXC

### 2. **P2P Exchanges** (Peer-to-Peer)
Direct user-to-user trading platforms.

**Features:**
- Direct trading
- Escrow systems
- Multiple payment methods
- Dispute resolution
- Privacy options

**Popular Services:**
- Bisq, LocalBitcoins, HodlHodl, LocalCoinSwap, Remitano, Noones

### 3. **Quick Exchanges** (Instant Exchanges)
Fast cryptocurrency swapping without accounts.

**Features:**
- Instant swaps
- No account required
- Rate comparison
- Transaction tracking
- Multiple currencies

**Popular Services:**
- Changelly, Simpleswap, ChangeNOW, Godex, StealthEX, FixedFloat

### 4. **DEXs** (Decentralized Exchanges)
Decentralized trading protocols.

**Features:**
- Automated Market Makers (AMMs)
- Liquidity pools
- Yield farming
- Non-custodial trading
- Governance tokens

**Popular Services:**
- Uniswap, SushiSwap, PancakeSwap, 1inch, Curve, Balancer

### 5. **Ramps** (On-Ramp/Off-Ramp Services)
Fiat to crypto and crypto to fiat conversions.

**Features:**
- Fiat on-ramps
- Fiat off-ramps
- Payment processing
- KYC/AML compliance
- Multiple payment methods

**Popular Services:**
- MoonPay, Ramp, Transak, Simplex, Mercuryo, Banxa

### 6. **Mining Pools**
Cryptocurrency mining pool integrations.

**Features:**
- Hashrate monitoring
- Pool statistics
- Payout tracking
- Mining rewards
- Pool switching

**Popular Services:**
- Antpool, F2Pool, ViaBTC, Slush Pool, BTC.com

### 7. **Staking Pools**
Proof-of-stake validator services.

**Features:**
- Validator services
- Staking rewards
- Delegation management
- Network participation
- Slashing protection

**Popular Services:**
- Lido, Rocket Pool, Ankr, Staked, Figment

### 8. **Oracles**
External data providers for smart contracts.

**Features:**
- Price feeds
- Data providers
- External data sources
- Smart contract integrations
- Decentralized data

**Popular Services:**
- Chainlink, Band Protocol, UMA, Tellor, API3

### 9. **Aggregators**
Multi-service price and liquidity aggregation.

**Features:**
- Price aggregation
- Best rate finding
- Liquidity aggregation
- Cross-platform trading
- Route optimization

**Popular Services:**
- 1inch, Paraswap, Matcha, OpenOcean, DODO

### 10. **Blockchain APIs**
Direct blockchain access and explorers.

**Features:**
- Node APIs
- Block explorers
- Transaction tracking
- Address validation
- Network monitoring

**Popular Services:**
- Alchemy, Infura, QuickNode, Moralis, Covalent

### 11. **Domains**
Blockchain domain name services.

**Features:**
- Domain registration
- ENS integration
- Domain management
- Resolution services
- Subdomain support

**Popular Services:**
- ENS, Unstoppable Domains, Handshake, Namecoin

## 🚀 Quick Start

### Basic Usage

```typescript
import { Exchanges, QuickExchanges, P2PExchanges } from '@/components/currencyCore';

// Use centralized exchanges
const binance = new Exchanges.Binance({ 
  apiKey: 'your_api_key', 
  apiSecret: 'your_api_secret' 
});
const ticker = await binance.getTicker('BTC/USDT');

// Use quick exchanges
const changelly = await QuickExchanges.Changelly.getQuote('BTC', 'ETH', 1);

// Use P2P exchanges
const bisq = await P2PExchanges.Bisq.getOrderBook('BTC', 'USD');
```

### Advanced Usage

```typescript
import * as CurrencyCore from '@/components/currencyCore';

// Access all services
const exchanges = CurrencyCore.Exchanges;
const quickExchanges = CurrencyCore.QuickExchanges;
const p2pExchanges = CurrencyCore.P2PExchanges;

// Compare rates across different exchange types
const centralizedRate = await exchanges.Binance.getTicker('BTC/USDT');
const quickRate = await quickExchanges.Changelly.getQuote('BTC', 'ETH', 1);
const p2pRate = await p2pExchanges.Bisq.getOrderBook('BTC', 'USD');

// Use utility functions
const serviceCounts = CurrencyCore.getServiceCounts();
const searchResults = CurrencyCore.searchServices('binance');
```

## 🔧 Configuration

### API Keys Setup

```typescript
// Configure authentication for different services
const exchangeConfig = {
  apiKey: 'your_api_key',
  apiSecret: 'your_api_secret',
  sandbox: false // Use production or sandbox
};

const binance = new Exchanges.Binance(exchangeConfig);
const changelly = new QuickExchanges.Changelly(exchangeConfig);
```

### Environment Variables

```bash
# .env file
BINANCE_API_KEY=your_binance_api_key
BINANCE_API_SECRET=your_binance_api_secret
COINBASE_API_KEY=your_coinbase_api_key
COINBASE_API_SECRET=your_coinbase_api_secret
```

## 📊 Rate Comparison

```typescript
import { 
  Exchanges, 
  QuickExchanges, 
  P2PExchanges,
  getMultiExchangeQuotes,
  findBestExchangeRate 
} from '@/components/currencyCore';

// Compare rates across multiple exchanges
const quotes = await getMultiExchangeQuotes('BTC', 'ETH', 1, [
  'Binance', 'Coinbase', 'Kraken'
]);

// Find the best rate
const bestRate = await findBestExchangeRate('BTC', 'ETH', 1, [
  'Binance', 'Coinbase', 'Kraken', 'Changelly', 'Simpleswap'
]);
```

## 🔐 Security Best Practices

1. **API Key Management**
   - Store API keys in environment variables
   - Use read-only keys when possible
   - Regularly rotate API keys
   - Use IP whitelisting

2. **Error Handling**
   ```typescript
   try {
     const result = await exchange.getTicker('BTC/USDT');
   } catch (error) {
     console.error('Exchange error:', error);
     // Handle error appropriately
   }
   ```

3. **Rate Limiting**
   ```typescript
   // Built-in rate limiting
   const exchange = new Exchanges.Binance({
     apiKey: 'key',
     apiSecret: 'secret',
     rateLimit: 1200 // requests per minute
   });
   ```

## 🧪 Testing

### Sandbox Environments

```typescript
// Use sandbox for testing
const exchange = new Exchanges.Binance({
  apiKey: 'sandbox_api_key',
  apiSecret: 'sandbox_api_secret',
  sandbox: true
});
```

### Mock Data

```typescript
// Use mock data for development
const mockTicker = {
  symbol: 'BTC/USDT',
  price: 50000,
  change: 0.05
};
```

## 📈 Performance Optimization

1. **Caching**
   ```typescript
   // Implement caching for frequently accessed data
   const cache = new Map();
   
   async function getCachedTicker(symbol: string) {
     if (cache.has(symbol)) {
       return cache.get(symbol);
     }
     
     const ticker = await exchange.getTicker(symbol);
     cache.set(symbol, ticker);
     return ticker;
   }
   ```

2. **Batch Requests**
   ```typescript
   // Batch multiple requests
   const symbols = ['BTC/USDT', 'ETH/USDT', 'BNB/USDT'];
   const tickers = await Promise.all(
     symbols.map(symbol => exchange.getTicker(symbol))
   );
   ```

## 🔄 Transaction Management

```typescript
// Track transactions across different services
async function trackTransaction(service: string, transactionId: string) {
  const services = {
    binance: Exchanges.Binance,
    changelly: QuickExchanges.Changelly,
    bisq: P2PExchanges.Bisq
  };
  
  const service = new services[service]();
  return await service.getTransactionStatus(transactionId);
}
```

## 🌐 Multi-Service Integration

```typescript
// Integrate multiple services for comprehensive trading
class TradingBot {
  async findBestRate(from: string, to: string, amount: number) {
    const centralized = await Exchanges.Binance.getTicker(`${from}/${to}`);
    const quick = await QuickExchanges.Changelly.getQuote(from, to, amount);
    const p2p = await P2PExchanges.Bisq.getOrderBook(from, to);
    
    return {
      centralized: centralized.price,
      quick: quick.rate,
      p2p: p2p.bestPrice
    };
  }
}
```

## 📚 Documentation

Each service category includes comprehensive documentation:

- **API Reference**: Complete method documentation
- **Examples**: Usage examples and best practices
- **Error Handling**: Error codes and handling strategies
- **Rate Limits**: API rate limiting information
- **Authentication**: Setup and configuration guides

## 🤝 Contributing

To add a new service:

1. Create the service file in the appropriate category
2. Follow the established patterns and interfaces
3. Add comprehensive documentation
4. Include error handling and validation
5. Update the category's index file
6. Add tests and examples

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🔗 Links

- [GitHub Repository](https://github.com/your-repo/currency-core)
- [Documentation](https://docs.currency-core.com)
- [API Reference](https://api.currency-core.com)
- [Support](https://support.currency-core.com)

---

**Note**: Always verify API documentation for the most up-to-date information and rate limits. Service APIs may change without notice.
