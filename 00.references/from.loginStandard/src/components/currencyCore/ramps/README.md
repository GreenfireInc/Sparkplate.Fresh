# Cryptocurrency On-Ramp and Off-Ramp Services API Integrations

This directory contains comprehensive TypeScript integrations for fiat-to-crypto and crypto-to-fiat services, allowing users to buy and sell cryptocurrencies using traditional payment methods.

## 🚀 Supported Ramp Services

| Service | Country | Founded | Features | Specialization |
|---------|---------|---------|----------|----------------|
| [AlchemyPay](alchemypay.ts) | Global | 2020 | Fiat & Crypto Payment Solutions | Global Infrastructure |
| [Banxa](banxa.ts) | Global | 2014 | Licensed Payment Infrastructure | Global Gateway |
| [ChangeNow](changenow.ts) | Global | 2017 | Instant Exchange, Non-custodial | Privacy Focus |
| [Coinify](coinify.ts) | Denmark | 2014 | European Crypto Broker | European Market |
| [Finchpay](finchpay.ts) | Global | 2021 | Mobile-first Platform | Mobile Payments |
| [Guardarian](guardarian.ts) | Estonia | 2018 | European Crypto Gateway | European Focus |
| [Invity](invity.ts) | Global | 2020 | Multiple Payment Methods | Payment Options |
| [Kado](kado.ts) | Global | 2021 | Cross-border Payments | Global Remittance |
| [Kriptomat](kriptomat.ts) | Estonia | 2018 | Licensed Crypto Exchange | European Licensed |
| [Mercuryo](mercuryo.ts) | Global | 2018 | Global Crypto Payment Platform | Global Coverage |
| [MoonPay](moonpay.ts) | Global | 2018 | Leading Crypto Payment Infrastructure | Global Platform |
| [Noah](noah.ts) | Asia | 2021 | Regional Payment Solutions | Asian Market |
| [Onramp](onramp.ts) | Global | 2020 | Crypto Payment Infrastructure | Global Coverage |
| [Ramp](ramp.ts) | Global | 2018 | Global Crypto Payment Platform | Global Infrastructure |
| [Sardine](sardine.ts) | Global | 2020 | Fraud Prevention Platform | Security Focus |
| [Simplex](simplex.ts) | Global | 2014 | Licensed Payment Processor | Compliance |
| [Transak](transak.ts) | Global | 2018 | Global Crypto Payment Gateway | Global Services |
| [Utorg](utorg.ts) | Global | 2019 | Global Crypto Payment Platform | Global Gateway |
| [Wert](wert.ts) | Estonia | 2019 | European Crypto Payment Platform | European Focus |
| [Wyre](wyre.ts) | Global | 2013 | Global Crypto Payment Infrastructure | Global Platform |
| [ZKP2P](zkp2p.ts) | Global | 2022 | Privacy-focused P2P Platform | Privacy & Decentralization |

## 🔧 Key Features

### On-Ramp Capabilities
- **Fiat-to-Crypto**: Buy cryptocurrencies with traditional payment methods
- **Multiple Payment Methods**: Credit cards, bank transfers, Apple Pay, Google Pay, SEPA
- **Global Coverage**: Support for multiple regions and currencies
- **Compliance**: KYC/AML compliance and regulatory adherence

### Off-Ramp Capabilities
- **Crypto-to-Fiat**: Sell cryptocurrencies for traditional currencies
- **Instant Processing**: Quick transaction processing and settlement
- **Multiple Withdrawal Methods**: Bank transfers, wire transfers, digital wallets
- **Competitive Rates**: Real-time pricing and competitive exchange rates

### API Features
- **Quote Generation**: Get real-time exchange rates and estimated amounts
- **Transaction Management**: Create, track, and monitor buy/sell transactions
- **Address Validation**: Verify cryptocurrency addresses before transactions
- **Rate Comparison**: Compare rates across multiple ramp services

## 🚀 Quick Start

### Basic Usage

```typescript
import { MoonPayRamp, RampRamp, TransakRamp } from '@/components/currencyCore/ramps';

// Get buy quotes from multiple ramps
const moonpayQuote = await MoonPayRamp.getBuyQuote('BTC', 'USD', 100);
const rampQuote = await RampRamp.getBuyQuote('BTC', 'USD', 100);
const transakQuote = await TransakRamp.getBuyQuote('BTC', 'USD', 100);

console.log('MoonPay Quote:', moonpayQuote);
console.log('Ramp Quote:', rampQuote);
console.log('Transak Quote:', transakQuote);
```

### Multi-Ramp Rate Comparison

```typescript
import { getMultiRampQuotes, findBestRampRate } from '@/components/currencyCore/ramps';

// Get quotes from multiple ramps
const quotes = await getMultiRampQuotes('USD', 'BTC', 100, ['MoonPay', 'Ramp', 'Transak']);
console.log('All Quotes:', quotes);

// Find the best ramp rate
const bestRate = await findBestRampRate('USD', 'BTC', 100);
console.log('Best Rate:', bestRate);
```

### Transaction Creation and Tracking

```typescript
import { MoonPayRamp } from '@/components/currencyCore/ramps';

// Create authenticated instance
const moonpay = new MoonPayRamp({
  apiKey: 'your_api_key',
  apiSecret: 'your_api_secret'
});

// Create a buy transaction
const transaction = await moonpay.createBuyTransaction({
  currencyCode: 'btc',
  baseCurrencyCode: 'usd',
  baseCurrencyAmount: 100,
  walletAddress: '1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa'
});

console.log('Transaction ID:', transaction.id);

// Track transaction status
const status = await moonpay.getTransactionStatus(transaction.id);
console.log('Transaction Status:', status);
```

## 📊 Available Data Types

### Ramp Quotes
```typescript
interface RampQuote {
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  rate: number;
  fee: number;
  paymentMethod: string;
  estimatedTime?: string;
  rampId?: string;
  timestamp: number;
}
```

### Transaction Information
```typescript
interface RampTransaction {
  id: string;
  status: 'pending' | 'waiting_payment' | 'confirming' | 'processing' | 'completed' | 'failed' | 'cancelled' | 'refunded';
  type: 'buy' | 'sell';
  fromCurrency: string;
  toCurrency: string;
  fromAmount: number;
  toAmount: number;
  paymentMethod: string;
  walletAddress: string;
  rate: number;
  fee: number;
  createdAt: string;
  updatedAt: string;
  estimatedTime?: string;
  transactionHash?: string;
  paymentId?: string;
  kycStatus?: string;
}
```

### Exchange Limits
```typescript
interface RampLimits {
  min: number;
  max: number;
  currency: string;
  paymentMethod: string;
  region: string;
}
```

## 🔐 Authentication

### API Key Setup
Most ramp services require API keys for transaction creation and tracking:

1. **Register for API Access**: Visit the ramp's website and register for API access
2. **Generate API Keys**: Create API key and secret in your account settings
3. **Configure Permissions**: Set appropriate permissions (read, trade, etc.)
4. **Use in Integration**: Pass credentials to ramp constructor

```typescript
const ramp = new MoonPayRamp({
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

Each ramp service has different rate limits:

| Service | Rate Limit | Notes |
|---------|------------|-------|
| MoonPay | 100 requests/min | Public endpoints |
| Ramp | 60 requests/min | API key required |
| Transak | 120 requests/min | Global service |
| Banxa | 80 requests/min | Licensed service |
| Simplex | 60 requests/min | Licensed processor |

## 🌐 Regional Coverage

### Global Services
- **MoonPay**: Worldwide coverage with local payment methods
- **Ramp**: Global infrastructure with regional compliance
- **Transak**: Global gateway with local banking partners
- **Banxa**: Licensed global payment infrastructure

### Regional Specialists
- **European Focus**: Coinify, Guardarian, Kriptomat, Wert
- **Asian Market**: Noah
- **Mobile-First**: Finchpay
- **Privacy-Focused**: ZKP2P

## 🔄 Transaction Lifecycle

### Typical Buy Process
1. **Quote Request**: Get exchange rate and estimated amount
2. **Address Validation**: Verify recipient wallet address
3. **Transaction Creation**: Create buy transaction
4. **Payment Processing**: Process fiat payment
5. **KYC/AML**: Complete compliance checks if required
6. **Crypto Transfer**: Send cryptocurrency to wallet
7. **Completion**: Transaction marked as complete

### Typical Sell Process
1. **Quote Request**: Get exchange rate and estimated amount
2. **Crypto Transfer**: Send cryptocurrency to ramp address
3. **Confirmation**: Wait for blockchain confirmation
4. **KYC/AML**: Complete compliance checks if required
5. **Fiat Transfer**: Send fiat currency to bank account
6. **Completion**: Transaction marked as complete

### Status Tracking
```typescript
// Monitor transaction status
const status = await ramp.getTransactionStatus('transaction_id');

switch (status.status) {
  case 'pending':
    console.log('Transaction pending...');
    break;
  case 'waiting_payment':
    console.log('Waiting for payment...');
    break;
  case 'confirming':
    console.log('Confirming transaction...');
    break;
  case 'processing':
    console.log('Processing transaction...');
    break;
  case 'completed':
    console.log('Transaction completed!');
    break;
  case 'failed':
    console.log('Transaction failed:', status.error);
    break;
}
```

## 🧪 Testing

### Sandbox Environments
Many ramps provide sandbox environments for testing:

```typescript
const ramp = new MoonPayRamp({
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

## 📚 Service-Specific Features

### MoonPay
- Leading global crypto payment infrastructure
- Support for 100+ cryptocurrencies
- Multiple payment methods and regions
- API Documentation: https://docs.moonpay.com/

### Ramp
- Global crypto payment platform
- Fiat-to-crypto infrastructure
- Multiple payment methods
- API Documentation: https://docs.ramp.network/

### Transak
- Global crypto payment gateway
- Fiat-to-crypto services
- Local banking partners
- API Documentation: https://docs.transak.com/

### Banxa
- Licensed payment infrastructure
- Global fiat-to-crypto gateway
- Regulatory compliance
- API Documentation: https://docs.banxa.com/

### Simplex
- Licensed payment processor
- Fiat-to-crypto infrastructure
- Compliance focused
- API Documentation: https://www.simplex.com/api/

## 🤝 Contributing

To add a new ramp service:

1. Create a new file following the existing pattern
2. Implement standard methods (getQuote, createBuyTransaction, etc.)
3. Add authentication support
4. Include comprehensive documentation
5. Add social media links and official resources
6. Update the main index.ts file

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: Always verify ramp API documentation for the most up-to-date information and rate limits. Ramp APIs may change without notice.

## 🔗 Additional Resources

- [Ramp Comparison Guide](https://docs.example.com/ramp-comparison)
- [Payment Method Support](https://docs.example.com/payment-methods)
- [Regional Compliance](https://docs.example.com/compliance)
- [Transaction Tracking](https://docs.example.com/tracking)
- [Error Handling](https://docs.example.com/errors)
