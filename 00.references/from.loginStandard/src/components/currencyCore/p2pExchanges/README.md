# Peer-to-Peer Cryptocurrency Exchanges API Integrations

This directory contains comprehensive TypeScript integrations for peer-to-peer cryptocurrency exchange services, allowing users to trade cryptocurrencies directly with each other without intermediaries.

## 🚀 Supported P2P Exchanges

| Exchange | Country | Founded | Features | Specialization |
|----------|---------|---------|----------|----------------|
| [Bisq](bisq.ts) | Global | 2014 | Decentralized, No KYC, Privacy-focused | Fully Decentralized |
| [Bitbns](bitbns.ts) | India | 2017 | Indian Market, INR Trading | Indian Focus |
| [Bitpapa](bitpapa.ts) | Global | 2019 | Multiple Payment Methods, Global Coverage | Global P2P |
| [Bitvalve](bitvalve.ts) | Europe | 2018 | European Focus, SEPA Support | European Market |
| [Coinsutra](coinsutra.ts) | India | 2018 | Indian Market, INR Trading | Indian Platform |
| [Hodlhodl](hodlhodl.ts) | Global | 2018 | Non-custodial, Bitcoin-focused, No KYC | Bitcoin P2P |
| [Localcoinswap](localcoinswap.ts) | Global | 2017 | Privacy-focused, Multiple Payment Methods | Privacy P2P |
| [Noones](noones.ts) | Africa | 2020 | African Market, Mobile Money | African Focus |
| [Openpeer](openpeer.ts) | Global | 2021 | Decentralized, Ethereum-based | DeFi P2P |
| [Peachbitcoin](peachbitcoin.ts) | Global | 2020 | Bitcoin-only, No KYC, Privacy-focused | Bitcoin P2P |
| [Remitano](remitano.ts) | Global | 2014 | Multiple Payment Methods, Global Coverage | Global P2P |
| [Robosats](robosats.ts) | Global | 2021 | Lightning Network, Bitcoin-only, No KYC | Lightning P2P |

## 🔧 Key Features

### P2P Trading Capabilities
- **Direct Trading**: Trade cryptocurrencies directly with other users
- **Multiple Payment Methods**: Support for various payment options
- **Escrow Systems**: Secure transaction handling with escrow protection
- **Dispute Resolution**: Built-in dispute resolution mechanisms
- **Privacy Options**: Many exchanges offer privacy-focused trading

### Order Management
- **Order Books**: View buy and sell orders from other users
- **Price Discovery**: Real-time price discovery through P2P trading
- **Order Creation**: Create buy and sell orders
- **Order Matching**: Automatic matching of compatible orders
- **Order Tracking**: Monitor order status and execution

### User Features
- **User Profiles**: View trader profiles and reputation
- **Rating Systems**: Rate and review trading partners
- **Verification**: Optional identity verification for enhanced trust
- **Chat Systems**: Communicate with trading partners
- **Trade History**: Track completed and ongoing trades

## 🚀 Quick Start

### Basic Usage

```typescript
import { BisqExchange, HodlhodlExchange, LocalcoinswapExchange } from '@/components/currencyCore/p2pExchanges';

// Get P2P order books from multiple exchanges
const bisqOrders = await BisqExchange.getOrderBook('BTC', 'USD');
const hodlhodlOrders = await HodlhodlExchange.getOrderBook('BTC', 'USD');
const localcoinswapOrders = await LocalcoinswapExchange.getOrderBook('BTC', 'USD');

console.log('Bisq Orders:', bisqOrders);
console.log('Hodlhodl Orders:', hodlhodlOrders);
console.log('Localcoinswap Orders:', localcoinswapOrders);
```

### Multi-Exchange Rate Comparison

```typescript
import { getMultiP2POrderBooks, findBestP2PRates } from '@/components/currencyCore/p2pExchanges';

// Get order books from multiple P2P exchanges
const orderBooks = await getMultiP2POrderBooks('BTC', 'USD', ['Bisq', 'Hodlhodl', 'Localcoinswap']);
console.log('All Order Books:', orderBooks);

// Find the best P2P rates
const bestBuyRate = await findBestP2PRates('BTC', 'USD', 0.1, 'BUY');
const bestSellRate = await findBestP2PRates('BTC', 'USD', 0.1, 'SELL');
console.log('Best Buy Rate:', bestBuyRate);
console.log('Best Sell Rate:', bestSellRate);
```

## 📊 Available Data Types

### P2P Orders
```typescript
interface P2POrder {
  id: string;
  currency: string;
  baseCurrency: string;
  amount: number;
  price: number;
  type: 'BUY' | 'SELL';
  paymentMethod: string;
  paymentWindow: number;
  minAmount: number;
  maxAmount: number;
  traderId: string;
  traderRating: number;
  traderTrades: number;
  createdAt: string;
  updatedAt: string;
  status: 'ACTIVE' | 'PAUSED' | 'COMPLETED' | 'CANCELLED';
  escrowSupported: boolean;
  disputeSupported: boolean;
}
```

### P2P Trades
```typescript
interface P2PTrade {
  id: string;
  orderId: string;
  buyerId: string;
  sellerId: string;
  currency: string;
  baseCurrency: string;
  amount: number;
  price: number;
  totalAmount: number;
  paymentMethod: string;
  status: 'PENDING' | 'PAID' | 'CONFIRMED' | 'DISPUTED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  updatedAt: string;
  paymentWindow: number;
  escrowStatus: 'PENDING' | 'ACTIVE' | 'RELEASED' | 'DISPUTED';
  disputeReason?: string;
  chatMessages?: any[];
}
```

## 🔐 Authentication

### API Key Setup
Most P2P exchanges require API keys for advanced functionality:

1. **Register for API Access**: Visit the exchange's website and register for API access
2. **Generate API Keys**: Create API key and secret in your account settings
3. **Configure Permissions**: Set appropriate permissions (read, trade, etc.)
4. **Use in Integration**: Pass credentials to exchange constructor

```typescript
const exchange = new BisqExchange({
  apiKey: 'your_api_key',
  apiSecret: 'your_api_secret',
  sandbox: false // Use production or sandbox environment
});
```

## 📈 Rate Limiting

Each P2P exchange has different rate limits:

| Exchange | Rate Limit | Notes |
|----------|------------|-------|
| Bisq | 100 requests/min | Public endpoints |
| Hodlhodl | 60 requests/min | API key required |
| Localcoinswap | 120 requests/min | Global service |
| Remitano | 80 requests/min | Popular service |
| Robosats | 60 requests/min | Lightning Network |

## 🌐 Regional Coverage

### Global Services
- **Bisq**: Worldwide coverage with decentralized infrastructure
- **Hodlhodl**: Global Bitcoin-focused P2P trading
- **Localcoinswap**: Global privacy-focused P2P exchange
- **Remitano**: Global P2P exchange with multiple payment methods

### Regional Specialists
- **Indian Focus**: Bitbns, Coinsutra
- **European Focus**: Bitvalve
- **African Focus**: Noones
- **Bitcoin-only**: Hodlhodl, Peachbitcoin, Robosats

## 🔄 Trading Lifecycle

### Typical P2P Trading Process
1. **Order Discovery**: Browse available buy/sell orders
2. **Order Selection**: Choose an order that matches your needs
3. **Trade Initiation**: Start a trade with the order creator
4. **Payment Processing**: Send/receive payment according to terms
5. **Escrow Protection**: Funds held in escrow during trade
6. **Confirmation**: Both parties confirm payment receipt
7. **Completion**: Trade marked as complete, funds released

### Order Types
```typescript
// Buy orders - looking to buy cryptocurrency
const buyOrders = await exchange.getBuyOrders('BTC', 'USD');

// Sell orders - looking to sell cryptocurrency
const sellOrders = await exchange.getSellOrders('BTC', 'USD');

// Filter orders by criteria
const filteredOrders = buyOrders.filter(order => 
  order.amount >= 0.1 && 
  order.price <= 50000 &&
  order.paymentMethod === 'bank_transfer'
);
```

## 📚 Exchange-Specific Features

### Bisq
- Fully decentralized P2P exchange
- No KYC requirements
- Privacy-focused trading
- API Documentation: https://bisq.network/api/

### Hodlhodl
- Non-custodial Bitcoin P2P exchange
- No KYC required
- Bitcoin-focused trading
- API Documentation: https://hodlhodl.com/api/

### Localcoinswap
- Privacy-focused P2P exchange
- Multiple payment methods
- Global coverage
- API Documentation: https://localcoinswap.com/api/

### Robosats
- Lightning Network P2P exchange
- Bitcoin-only trading
- No KYC required
- API Documentation: https://robosats.com/api/

### Remitano
- Global P2P exchange
- Multiple payment methods
- Mobile app support
- API Documentation: https://remitano.com/api/

## 🤝 Contributing

To add a new P2P exchange:

1. Create a new file following the existing pattern
2. Implement standard methods (getOrderBook, getBuyOrders, etc.)
3. Add authentication support
4. Include comprehensive documentation
5. Add social media links and official resources
6. Update the main index.ts file

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

**Note**: Always verify P2P exchange API documentation for the most up-to-date information and rate limits. P2P exchange APIs may change without notice.
