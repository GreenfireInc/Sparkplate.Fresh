# Quick Cryptocurrency Exchanges API Integrations

This directory contains comprehensive TypeScript integrations for instant cryptocurrency exchange services, allowing users to swap cryptocurrencies quickly without creating accounts or going through KYC processes.

## 🚀 Supported Quick Exchanges

| Exchange | Country | Founded | Features | Specialization |
|----------|---------|---------|----------|----------------|
| [Bity](bity.ts) | Switzerland | 2014 | Fiat to Crypto, Swiss Compliance | European Market |
| [Changelly](changelly.ts) | Global | 2015 | 200+ Currencies, Fixed Rate | Global Coverage |
| [Coinswitch](coinswitch.ts) | India | 2017 | INR Trading, Mobile App | Indian Market |
| [Easybit](easybit.ts) | Global | 2019 | Simple Interface, No Registration | User-Friendly |
| [EXMO](exmo.ts) | UK | 2014 | Spot Trading, Instant Swaps | European Exchange |
| [Faa.st](faast.ts) | Global | 2020 | Fast Exchange, Simple Interface | Speed Focus |
| [Godex](godex.ts) | Global | 2018 | Anonymous, No KYC | Privacy Focus |
| [Shapeshift](shapeshift.ts) | Switzerland | 2014 | Non-custodial, Decentralized | Privacy & Security |
| [Simpleswap](simpleswap.ts) | Global | 2018 | No Registration, Fixed Rate | Simplicity |
| [Swapzone](swapzone.ts) | Global | 2019 | Exchange Aggregator, Best Rates | Rate Comparison |
| [Switchain](switchain.ts) | Global | 2019 | Multiple Payment Methods | Payment Options |
| [Totle](totle.ts) | Global | 2018 | DEX Aggregator, Decentralized | DeFi Integration |

## 🔧 Key Features

### Instant Exchange Capabilities
- **No Registration Required**: Most services allow instant swaps without account creation
- **No KYC**: Many services prioritize privacy and don't require identity verification
- **Fixed & Floating Rates**: Options for both fixed and market-based exchange rates
- **Multiple Payment Methods**: Support for various deposit and withdrawal methods

### API Features
- **Quote Generation**: Get real-time exchange rates and estimated amounts
- **Transaction Tracking**: Monitor swap progress and status
- **Address Validation**: Verify cryptocurrency addresses before transactions
- **Rate Comparison**: Compare rates across multiple exchanges

## 🚀 Quick Start

### Basic Usage

```typescript
import { ChangellyExchange, SimpleswapExchange, SwapzoneExchange } from '@/components/currencyCore/quickExchanges';

// Get exchange quotes from multiple services
const changellyQuote = await ChangellyExchange.getQuote('btc', 'eth', 1);
const simpleswapQuote = await SimpleswapExchange.getQuote('btc', 'eth', 1);
const swapzoneQuote = await SwapzoneExchange.getQuote('btc', 'eth', 1);

console.log('Changelly:', changellyQuote);
console.log('Simpleswap:', simpleswapQuote);
console.log('Swapzone:', swapzoneQuote);
```

### Multi-Exchange Rate Comparison

```typescript
import { getMultiExchangeQuotes, findBestExchangeRate } from '@/components/currencyCore/quickExchanges';

// Get quotes from multiple exchanges
const quotes = await getMultiExchangeQuotes('btc', 'eth', 1, ['Changelly', 'Simpleswap', 'Switchain']);
console.log('All Quotes:', quotes);

// Find the best exchange rate
const bestRate = await findBestExchangeRate('btc', 'eth', 1);
console.log('Best Rate:', bestRate);
```

### Transaction Creation and Tracking

```typescript
import { ChangellyExchange } from '@/components/currencyCore/quickExchanges';

// Create authenticated instance
const changelly = new ChangellyExchange({
  apiKey: 'your_api_key',
  apiSecret: 'your_api_secret'
});

// Create a transaction
const transaction = await changelly.createTransaction(
  'btc',
  'eth',
  1,
  '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b6'
);

console.log('Transaction ID:', transaction.id);

// Track transaction status
const status = await changelly.getTransactionStatus(transaction.id);
console.log('Transaction Status:', status);
```

## 📊 Available Data Types

### Exchange Quotes
```typescript
interface ExchangeQuote {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  rate: number;
  fee: number;
  estimatedTime?: string;
  exchangeId?: string;
  timestamp: number;
}
```

### Transaction Information
```typescript
interface ExchangeTransaction {
  id: string;
  status: 'pending' | 'waiting' | 'confirming' | 'exchanging' | 'finished' | 'failed' | 'refunded';
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  fromAddress: string;
  toAddress: string;
  rate: number;
  fee: number;
  createdAt: string;
  updatedAt: string;
  estimatedTime?: string;
  transactionHash?: string;
}
```

### Exchange Limits
```typescript
interface ExchangeLimits {
  min: number;
  max: number;
  currency: string;
}
```

## 🔐 Authentication

### API Key Setup
Most quick exchanges require API keys for transaction creation and tracking:

1. **Register for API Access**: Visit the exchange's website and register for API access
2. **Generate API Keys**: Create API key and secret in your account settings
3. **Configure Permissions**: Set appropriate permissions (read, trade, etc.)
4. **Use in Integration**: Pass credentials to exchange constructor

```typescript
const exchange = new ChangellyExchange({
  apiKey: 'your_api_key',
  apiSecret: 'your_api_secret',
  sandbox: false // Use production or sandbox environment
});
```

### Security Best Practices
- Store API keys securely (environment variables)
- Use IP whitelisting when available
- Regularly rotate API keys
- Use read-only keys for data fetching
- Monitor API usage and set rate limits

## 📈 Rate Limiting

Each exchange has different rate limits:

| Exchange | Rate Limit | Notes |
|----------|------------|-------|
| Changelly | 100 requests/min | Public endpoints |
| Simpleswap | 60 requests/min | API key required |
| Swapzone | 120 requests/min | Aggregator service |
| Shapeshift | 1 request/sec | Decentralized |
| Godex | 60 requests/min | Anonymous service |

## 🌐 Privacy and Security

### Privacy-Focused Exchanges
- **Shapeshift**: Non-custodial, decentralized swaps
- **Godex**: Anonymous exchanges, no KYC required
- **Totle**: DEX aggregator, decentralized

### Security Features
- **Address Validation**: Verify addresses before transactions
- **Transaction Tracking**: Monitor swap progress
- **Refund Support**: Most exchanges support refunds for failed transactions
- **Multi-Signature**: Some exchanges use multi-sig for security

## 🔄 Transaction Lifecycle

### Typical Swap Process
1. **Quote Request**: Get exchange rate and estimated amount
2. **Address Validation**: Verify recipient address
3. **Transaction Creation**: Create swap transaction
4. **Deposit**: Send funds to exchange address
5. **Confirmation**: Wait for blockchain confirmation
6. **Exchange**: Exchange processes the swap
7. **Withdrawal**: Funds sent to recipient address
8. **Completion**: Transaction marked as complete

### Status Tracking
```typescript
// Monitor transaction status
const status = await exchange.getTransactionStatus('transaction_id');

switch (status.status) {
  case 'pending':
    console.log('Waiting for deposit...');
    break;
  case 'confirming':
    console.log('Confirming deposit...');
    break;
  case 'exchanging':
    console.log('Processing exchange...');
    break;
  case 'finished':
    console.log('Exchange completed!');
    break;
  case 'failed':
    console.log('Exchange failed:', status.error);
    break;
}
```

## 🧪 Testing

### Sandbox Environments
Many exchanges provide sandbox environments for testing:

```typescript
const exchange = new ChangellyExchange({
  apiKey: 'sandbox_api_key',
  apiSecret: 'sandbox_api_secret',
  sandbox: true
});
```

### Test Transactions
- Use small amounts for testing
- Verify address formats
- Test error handling
- Validate rate calculations

## 📚 Exchange-Specific Features

### Changelly
- Fixed and floating rate options
- 200+ supported cryptocurrencies
- Global coverage
- API Documentation: https://changelly.com/developers/api

### Simpleswap
- Simple interface
- No registration required
- Fixed rate exchanges
- API Documentation: https://simpleswap.io/api

### Swapzone
- Exchange aggregator
- Best rate comparison
- Multiple exchange options
- API Documentation: https://swapzone.io/api

### Shapeshift
- Non-custodial swaps
- Privacy-focused
- Decentralized
- API Documentation: https://shapeshift.com/api

### Godex
- Anonymous exchanges
- No KYC required
- Privacy-focused
- API Documentation: https://godex.io/api

## 🤝 Contributing

To add a new quick exchange:

1. Create a new file following the existing pattern
2. Implement standard methods (getQuote, createTransaction, etc.)
3. Add authentication support
4. Include comprehensive documentation
5. Add social media links and official resources
6. Update the main index.ts file

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: Always verify exchange API documentation for the most up-to-date information and rate limits. Exchange APIs may change without notice.

## 🔗 Additional Resources

- [Exchange Comparison Guide](https://docs.example.com/comparison)
- [Security Best Practices](https://docs.example.com/security)
- [API Rate Limiting](https://docs.example.com/rate-limits)
- [Transaction Tracking](https://docs.example.com/tracking)
- [Error Handling](https://docs.example.com/errors)
