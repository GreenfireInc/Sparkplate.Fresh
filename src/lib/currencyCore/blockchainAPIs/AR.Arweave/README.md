# Arweave (AR) Blockchain APIs

This directory contains comprehensive API implementations for interacting with the Arweave blockchain and its ecosystem.

## 🌐 Available APIs

### 1. **ArweaveNetworkAPI** - Direct Gateway Access
- **File**: `arweaveNetworkAPI.AR.ts`
- **Purpose**: Direct access to Arweave network through official gateways
- **Features**: 
  - Wallet balance queries
  - Transaction retrieval and status
  - Block information
  - Network statistics
  - Data retrieval from transaction IDs
- **Rate Limits**: Public gateway limits apply
- **Authentication**: None required

**Usage:**
```typescript
import { ArweaveNetworkAPI } from './arweaveNetworkAPI.AR';

const api = new ArweaveNetworkAPI('mainnet');
const walletInfo = await api.getWalletInfo('your-arweave-address');
const transaction = await api.getTransaction('transaction-id');
```

### 2. **ViewBlockAPI** - Enhanced Block Explorer
- **File**: `viewBlockAPI.AR.ts`
- **Purpose**: Enhanced blockchain data through ViewBlock's indexed API
- **Features**:
  - Rich address information
  - Transaction history with pagination
  - Block explorer data
  - Network statistics
  - Search functionality
- **Rate Limits**: 100 req/min (free), higher with API key
- **Authentication**: Optional API key for premium features

**Usage:**
```typescript
import { ViewBlockAPI } from './viewBlockAPI.AR';

const api = new ViewBlockAPI({ apiKey: 'your-api-key' });
const address = await api.getAddress('arweave-address');
const transactions = await api.getAddressTransactions('arweave-address', { limit: 50 });
```

### 3. **ArIOGatewayAPI** - AR.IO Network Integration
- **File**: `arIOGatewayAPI.AR.ts`
- **Purpose**: Integration with AR.IO decentralized gateway network
- **Features**:
  - Gateway-specific operations
  - Enhanced data retrieval
  - Storage pricing information
  - Gateway performance metrics
- **Rate Limits**: Gateway-specific limits
- **Authentication**: None required (premium features with AR staking)

**Usage:**
```typescript
import { ArIOGatewayAPI } from './arIOGatewayAPI.AR';

const api = new ArIOGatewayAPI({ gatewayUrl: 'https://ar-io.net' });
const balance = await api.getWalletBalance('arweave-address');
const data = await api.getData('transaction-id');
```

### 4. **ArweaveSearchAPI** - Advanced Search Capabilities
- **File**: `arweaveSearchAPI.AR.ts`
- **Purpose**: Advanced transaction searching using ArQL
- **Features**:
  - ArQL query execution
  - Tag-based searching
  - Owner/target filtering
  - Content type filtering
  - Batch transaction details
- **Rate Limits**: Gateway limits apply
- **Authentication**: None required

**Usage:**
```typescript
import { ArweaveSearchAPI } from './arweaveSearchAPI.AR';

const api = new ArweaveSearchAPI();
const txIds = await api.searchByTags([
  { name: 'App-Name', value: 'MyApp' },
  { name: 'Content-Type', value: 'image/png' }
]);
const details = await api.getTransactionDetails(txIds);
```

## 🔧 Common Use Cases

### Balance Checking
```typescript
import { arweaveNetworkMainnet } from './index.AR';

const walletInfo = await arweaveNetworkMainnet.getWalletInfo('address');
console.log(`Balance: ${walletInfo.balanceAR} AR`);
```

### Transaction Monitoring
```typescript
import { viewBlockMainnet } from './index.AR';

const tx = await viewBlockMainnet.getTransaction('tx-id');
console.log(`Transaction amount: ${tx.quantity.ar} AR`);
```

### Data Retrieval
```typescript
import { arIOGatewayMainnet } from './index.AR';

const { data, contentType } = await arIOGatewayMainnet.getData('tx-id');
console.log(`Retrieved ${contentType} data`);
```

### Advanced Search
```typescript
import { arweaveSearchMainnet } from './index.AR';

const nftTxIds = await arweaveSearchMainnet.searchByTags([
  { name: 'Content-Type', value: 'image/png' },
  { name: 'App-Name', value: 'ArDrive' }
]);
```

## 🏗 Architecture

### Gateway Infrastructure
Arweave uses a **gateway-based architecture** where:
- **Official Gateways**: `arweave.net`, `arweave.dev`
- **AR.IO Network**: Decentralized gateway network
- **Community Gateways**: Various community-operated gateways

### Data Permanence
- **Pay Once, Store Forever**: Single payment for permanent storage
- **Blockweave Technology**: Links blocks for data redundancy
- **Proof of Access**: Consensus mechanism ensuring data availability

### API Patterns
- **REST-based**: HTTP requests to gateway endpoints
- **ArQL**: GraphQL-like query language for searching
- **Transaction-centric**: Focus on transaction IDs for data access

## 🔑 Key Differences from Other Blockchains

1. **No Account Model**: Arweave doesn't have traditional accounts
2. **Transaction-based Storage**: Data is stored in transactions
3. **Permanent Data**: Data remains accessible indefinitely
4. **Gateway Access**: Data accessed through HTTP gateways
5. **ArQL Queries**: Specialized query language for searching

## 📊 Rate Limits & Best Practices

### Free Tier Limits
- **Arweave Network**: Public gateway rate limits
- **ViewBlock**: 100 requests/minute, 10,000/day
- **AR.IO**: Gateway-specific limits

### Best Practices
1. **Use multiple gateways** for redundancy
2. **Implement retry logic** for failed requests
3. **Cache frequently accessed data**
4. **Respect rate limits** to avoid blocking
5. **Use batch operations** when possible

## 🚀 Getting Started

```typescript
// Import all Arweave APIs
import { BlockchainAPIs } from '@/components/currencyCore/blockchainAPIs';

// Get Arweave APIs
const arweaveAPIs = await BlockchainAPIs.AR();

// Use default API (ArweaveNetwork)
const walletInfo = await arweaveAPIs.default.getWalletInfo('address');

// Or use specific API
const viewBlock = new arweaveAPIs.ViewBlockAPI({ apiKey: 'your-key' });
const addressInfo = await viewBlock.getAddress('address');
```

## 🔗 External Resources

- **Arweave Documentation**: https://docs.arweave.org/
- **ViewBlock API**: https://viewblock.io/api
- **AR.IO Documentation**: https://docs.ar.io/
- **ArQL Guide**: https://docs.arweave.org/developers/tools/arql
- **Gateway List**: https://ar-io.net/gateways
