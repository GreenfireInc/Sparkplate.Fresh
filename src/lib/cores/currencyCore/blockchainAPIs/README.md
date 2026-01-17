# Blockchain APIs

This directory contains modular blockchain API implementations for interacting with various cryptocurrency networks.

## Structure

Each cryptocurrency has its own directory with separate implementations for different blockchain API providers:

```
blockchainAPIs/
├── BCH.BitcoinCash/
│   ├── blockchair.ts           # Blockchair API (5k/day free)
│   ├── fullstackCashAPI.ts     # FullStack.cash API (100/min with key)
│   ├── bitcoinComAPI.ts        # Bitcoin.com REST API (free with limits)
│   ├── blockcypherAPI.ts       # BlockCypher API (200/hour free)
│   ├── bitqueryAPI.ts          # Bitquery GraphQL API (free with key)
│   ├── README.md                # BCH API documentation
│   └── index.ts                 # Exports all APIs
├── ALGO.Algorand/
│   ├── algoExplorerAPI.ts      # AlgoExplorer API (free, public)
│   ├── algoNodeAPI.ts          # Algorand Node/Algod API (free)
│   ├── algoIndexerAPI.ts       # Algorand Indexer API (free)
│   ├── pureStakeAPI.ts         # PureStake API (25k/day with key)
│   ├── dappflowAPI.ts          # Dappflow API (free, optional key)
│   ├── nodelyAPI.ts            # Nodely API (free, 4 networks)
│   ├── README.md                # ALGO API documentation
│   └── index.ts                 # Exports all APIs
├── ATOM.Cosmos/
│   ├── mintscanAPI.ts          # Mintscan API (2 req/sec, 10k/day)
│   ├── atomscanAPI.ts          # ATOMScan LCD/REST gateway (free)
│   ├── publicLCDAPI.ts         # Public LCD endpoints (free, multiple)
│   ├── README.md                # ATOM API documentation
│   └── index.ts                 # Exports all APIs
├── BNB.BinanceCoin/
│   ├── bscscanAPI.ts           # BscScan API (5 req/sec with key)
│   ├── publicRPCAPI.ts         # Public RPC endpoints (free, multiple)
│   ├── ankrAPI.ts              # Ankr API (50M/month with key)
│   ├── oneRPCAPI.ts            # 1RPC API (privacy-focused, free)
│   ├── nowNodesAPI.ts          # NOWNodes API (5k/month with key)
│   ├── bitqueryAPI.ts          # Bitquery GraphQL API (free with key)
│   ├── README.md                # BNB API documentation
│   └── index.ts                 # Exports all APIs
├── BTC.Bitcoin/
│   ├── blockstreamAPI.ts       # Blockstream API (free, privacy-focused)
│   ├── blockchainComAPI.ts     # Blockchain.com API (trusted, oldest)
│   ├── blockcypherAPI.ts       # BlockCypher API (200/hour free)
│   ├── bitapsAPI.ts            # Bitaps API (modern, clean)
│   ├── tokenviewAPI.ts         # Tokenview API (100/day with key)
│   ├── nowNodesAPI.ts          # NOWNodes API (5k/month with key)
│   ├── blastAPI.ts             # Blast API (12M/month with key)
│   ├── sochainAPI.ts           # SoChain API (300/min, free)
│   ├── README.md                # BTC API documentation
│   └── index.ts                 # Exports all APIs
├── DOGE.Dogecoin/
│   ├── dogechainAPI.ts         # Dogechain.info API (free, popular)
│   ├── blockcypherAPI.ts       # BlockCypher API (200/hour free)
│   ├── blockchairAPI.ts        # Blockchair API (limited free)
│   ├── tokenviewAPI.ts         # Tokenview API (100/day with key)
│   ├── nowNodesAPI.ts          # NOWNodes API (5k/month with key)
│   ├── dogeClientAPI.ts        # DogeClient API (community-run)
│   ├── electrsDogeAPI.ts       # Electrs-Dogecoin API (free)
│   ├── README.md                # DOGE API documentation
│   └── index.ts                 # Exports all APIs
├── DOT.Polkadot/
│   ├── subscanAPI.ts           # Subscan API (most comprehensive)
│   ├── polkadotjsAPI.ts        # Polkadot.js API (official library)
│   ├── statescanAPI.ts         # Statescan API (free)
│   ├── getblockAPI.ts          # GetBlock API (free tier)
│   ├── nownodesAPI.ts          # NOWNodes API (5k/month)
│   ├── tokenviewAPI.ts         # Tokenview API (100/day)
│   ├── 3xplAPI.ts              # 3xpl API (free)
│   ├── polkascanAPI.ts         # Polkascan API (free)
│   ├── README.md                # DOT API documentation
│   └── index.ts                 # Exports all APIs
├── ETC.EthereumClassic/
│   ├── blockscoutAPI.ts        # Blockscout API (official, free)
│   ├── blockcypherAPI.ts       # BlockCypher API (3 req/sec)
│   ├── blockchairAPI.ts        # Blockchair API (1k/day)
│   ├── getblockAPI.ts          # GetBlock API (RPC access)
│   ├── nownodesAPI.ts          # NOWNodes API (5k/month)
│   ├── tokenviewAPI.ts         # Tokenview API (100/day)
│   ├── README.md                # ETC API documentation
│   └── index.ts                 # Exports all APIs
├── LTC.Litecoin/
│   ├── blockchairAPI.ts        # Blockchair API (1k/day)
│   ├── blockcypherAPI.ts       # BlockCypher API (3 req/sec)
│   ├── sochainAPI.ts           # SoChain API (free, unlimited)
│   ├── getblockAPI.ts          # GetBlock API (RPC access)
│   ├── README.md                # LTC API documentation
│   └── index.ts                 # Exports all APIs
├── LUNA.Terra/
│   ├── mintscanAPI.ts          # Mintscan API (Terra 2.0, 10k/day)
│   ├── terraFinderAPI.ts       # Terra Finder LCD (official, free)
│   ├── atomscanAPI.ts          # ATOMScan API (Terra 2.0, free)
│   ├── stakeIdAPI.ts           # Stake.ID API (Terra 2.0, free)
│   ├── getblockAPI.ts          # GetBlock API (50k units/mo)
│   ├── nownodesAPI.ts          # NOWNodes API (Terra 2.0, key)
│   ├── README.md                # LUNA API documentation
│   └── index.ts                 # Exports all APIs
├── LUNC.TerraClassic/
│   ├── luncScanAPI.ts          # LuncScan API (burn tracking, free)
│   ├── terraClassicAtomScanAPI.ts  # ATOMScan (Terra Classic, free)
│   ├── terraClassicToolsAPI.ts # Terra Classic Tools (DeFi, free)
│   ├── terraClassicNOWNodesAPI.ts  # NOWNodes (Terra Classic, key)
│   ├── terrascopeAPI.ts        # Terrasco.pe API (analytics, free)
│   ├── publicNodeAPI.ts        # PublicNode API (RPC/LCD/FCD, free)
│   ├── autostakeAPI.ts         # Autostake API (RPC/gRPC/LCD, free)
│   ├── mintscanClassicAPI.ts   # Mintscan Classic (10k/day, free)
│   ├── bitqueryAPI.ts          # Bitquery GraphQL API (free tier)
│   ├── README.md                # LUNC API documentation
│   └── index.ts                 # Exports all APIs
├── SOL.Solana/
│   ├── solanaFMAPI.ts          # SolanaFM API (10 RPS, free)
│   ├── solscanAPI.ts           # Solscan API (free tier)
│   ├── solanaExplorerAPI.ts    # Official Solana RPC (free)
│   ├── solanaBeachAPI.ts       # Solana Beach API (staking, free)
│   ├── heliusAPI.ts            # Helius API (enhanced, key)
│   ├── README.md                # SOL API documentation
│   └── index.ts                 # Exports all APIs
├── STX.Stacks/
│   ├── hiroStacksAPI.ts        # Hiro Stacks API (official, free)
│   ├── quicknodeAPI.ts         # QuickNode API (fast RPC, key)
│   ├── nowNodesAPI.ts          # NOWNodes API (5k/month, key)
│   ├── README.md                # STX API documentation
│   └── index.ts                 # Exports all APIs
├── TRX.Tron/
│   ├── tronscanAPI.ts          # TRONSCAN API (official explorer)
│   ├── tronGridAPI.ts          # TronGrid API (official, free)
│   ├── getBlockAPI.ts          # GetBlock API (RPC, key)
│   ├── nowNodesAPI.ts          # NOWNodes API (5k/month, key)
│   ├── blockchairAPI.ts        # Blockchair API (fast, free)
│   ├── README.md                # TRX API documentation
│   └── index.ts                 # Exports all APIs
├── WAVES.Waves/
│   ├── wavesNodeAPI.ts         # Waves Node REST API (official, free)
│   ├── wscanAPI.ts             # WScan API (NFT tracking, free)
│   ├── getBlockAPI.ts          # GetBlock API (RPC, key)
│   ├── README.md                # WAVES API documentation
│   └── index.ts                 # Exports all APIs
├── XLM.Stellar/
│   ├── horizonAPI.ts           # Horizon API (official, free)
│   ├── stellarExpertAPI.ts     # StellarExpert API (analytics, free)
│   ├── nowNodesAPI.ts          # NOWNodes API (5k/day, key)
│   ├── bitqueryAPI.ts          # Bitquery API (GraphQL, key)
│   ├── tatumAPI.ts             # Tatum API (multi-chain, key)
│   ├── getBlockAPI.ts          # GetBlock API (RPC, key)
│   ├── ankrAPI.ts              # Ankr API (free tier)
│   ├── README.md                # XLM API documentation
│   └── index.ts                 # Exports all APIs
├── XRP.Ripple/
│   ├── xrplAPI.ts              # XRPL API (official, free)
│   ├── xrpscanAPI.ts           # XRPSCAN API (explorer, free)
│   ├── bithompAPI.ts           # Bithomp API (usernames, free)
│   ├── bitqueryAPI.ts          # Bitquery API (GraphQL, key)
│   ├── nowNodesAPI.ts          # NOWNodes API (5k/day, key)
│   ├── getBlockAPI.ts          # GetBlock API (RPC, key)
│   ├── quickNodeAPI.ts         # QuickNode API (fast RPC, key)
│   ├── README.md                # XRP API documentation
│   └── index.ts                 # Exports all APIs
├── ETH.Ethereum/
│   ├── etherscanAPI.ts         # Etherscan API (5/sec with key)
│   ├── infuraAPI.ts            # Infura API (100K/day)
│   ├── alchemyAPI.ts           # Alchemy API (300M CU/month)
│   ├── blockscoutAPI.ts        # Blockscout API (free, open-source)
│   ├── ethplorerAPI.ts         # Ethplorer API (ERC20 specialist)
│   ├── quicknodeAPI.ts         # QuickNode API (high-performance)
│   ├── getblockAPI.ts          # GetBlock API (instant access)
│   ├── README.md                # ETH API documentation
│   └── index.ts                 # Exports all APIs
├── README.md                    # This file
└── index.ts                     # Central export point
```

## Bitcoin Cash (BCH)

Bitcoin Cash has **5 different API implementations** available:

### 1. Blockchair API (Recommended)

Located in `BCH.BitcoinCash/blockchair.ts`

**Features:**
- Fetch UTXOs for an address
- Get balance and transaction count
- Broadcast transactions
- Get transaction history
- Get network statistics
- Bulk balance queries for multiple addresses

**API Limits:**
- Free tier: 5,000 requests/day
- Rate limiting applies

**Usage:**
```typescript
import { BlockchairAPI } from '@/components/currencyCore/blockchainAPIs/BCH.BitcoinCash';

const api = new BlockchairAPI('mainnet');
const utxos = await api.fetchUTXOs('bitcoincash:qp...');
```

### 2. FullStack.cash API

Located in `BCH.BitcoinCash/fullstackCashAPI.ts`

**Features:**
- BCH-specific API with comprehensive features
- Fetch UTXOs via Electrumx
- Get balance with confirmed/unconfirmed split
- Broadcast transactions
- Get transaction history
- Network statistics

**API Limits:**
- Free: 10 requests/minute (no key)
- Free tier with key: 100 requests/minute
- Rate limiting: Per-minute basis

**Usage:**
```typescript
import { FullStackCashAPI } from '@/components/currencyCore/blockchainAPIs/BCH.BitcoinCash';

const api = new FullStackCashAPI('mainnet', { apiKey: 'your-key' });
const balance = await api.getBalance('bitcoincash:qp...');
```

### 3. Bitcoin.com REST API

Located in `BCH.BitcoinCash/bitcoinComAPI.ts`

**Features:**
- Official Bitcoin.com REST API
- Fetch UTXOs
- Get address balance and details
- Broadcast transactions
- Get transaction history with full details
- Transaction detail lookup

**API Limits:**
- Free tier available
- Rate limiting applies

**Usage:**
```typescript
import { BitcoinComAPI } from '@/components/currencyCore/blockchainAPIs/BCH.BitcoinCash';

const api = new BitcoinComAPI('mainnet');
const txHistory = await api.getTransactionHistory('bitcoincash:qp...');
```

### 4. BlockCypher API

Located in `BCH.BitcoinCash/blockcypherAPI.ts`

**Features:**
- Well-documented, reliable API
- Fetch UTXOs with script data
- Get balance with unconfirmed amounts
- Broadcast transactions
- Get transaction history
- Network statistics
- Transaction skeleton creation (helper for building txs)

**API Limits:**
- Free: 200 requests/hour
- Rate limit: 3 requests/second
- Optional API token for higher limits

**Usage:**
```typescript
import { BlockCypherAPI } from '@/components/currencyCore/blockchainAPIs/BCH.BitcoinCash';

const api = new BlockCypherAPI('mainnet', { apiKey: 'your-token' });
const stats = await api.getNetworkStats();
```

### 5. Bitquery GraphQL API

Located in `BCH.BitcoinCash/bitqueryAPI.ts`

**Features:**
- GraphQL-based queries
- Fetch UTXOs
- Get balance
- Get transaction history
- **Note:** Does NOT support transaction broadcasting (data API only)

**API Limits:**
- Free tier available with API key
- Rate limiting applies

**Usage:**
```typescript
import { BitqueryAPI } from '@/components/currencyCore/blockchainAPIs/BCH.BitcoinCash';

const api = new BitqueryAPI('mainnet', { apiKey: 'your-key' });
const utxos = await api.fetchUTXOs('bitcoincash:qp...');
```

### API Comparison

| API | UTXO Fetch | Balance | Broadcast | Tx History | Free Tier | Best For |
|-----|------------|---------|-----------|------------|-----------|----------|
| **Blockchair** | ✅ | ✅ | ✅ | ✅ | 5k/day | General purpose, reliable |
| **FullStack.cash** | ✅ | ✅ | ✅ | ✅ | 100/min with key | BCH-specific features |
| **Bitcoin.com** | ✅ | ✅ | ✅ | ✅ | Rate limited | Official BCH API |
| **BlockCypher** | ✅ | ✅ | ✅ | ✅ | 200/hour | Well-documented |
| **Bitquery** | ✅ | ✅ | ❌ | ✅ | With key | Data queries only |

### Recommended Usage Pattern

Use a fallback pattern for maximum reliability:

```typescript
async function fetchUTXOsWithFallback(address: string) {
  try {
    // Try primary API
    const api = new BlockchairAPI('mainnet');
    return await api.fetchUTXOs(address);
  } catch (error) {
    console.warn('Blockchair failed, trying FullStack.cash...', error);
    try {
      // Fallback to second API
      const api = new FullStackCashAPI('mainnet');
      return await api.fetchUTXOs(address);
    } catch (error2) {
      console.warn('FullStack.cash failed, trying BlockCypher...', error2);
      // Final fallback
      const api = new BlockCypherAPI('mainnet');
      return await api.fetchUTXOs(address);
    }
  }
}
```

## Adding New APIs

To add a new blockchain API implementation:

1. Create a directory for the currency (e.g., `BTC.Bitcoin/`)
2. Create separate files for each API provider (e.g., `blockchair.ts`, `blockchain.com.ts`)
3. Create an `index.ts` file to export all implementations
4. Update the main `blockchainAPIs/index.ts` to export the new currency APIs

### Example Structure

```typescript
// BTC.Bitcoin/blockchair.ts
export class BlockchairBTCAPI {
  // Implementation
}

// BTC.Bitcoin/blockchain.com.ts
export class BlockchainComAPI {
  // Implementation
}

// BTC.Bitcoin/index.ts
export * from './blockchair';
export * from './blockchain.com';
export { BlockchairBTCAPI as default } from './blockchair';
```

## Design Principles

1. **Modularity**: Each API implementation is in its own file
2. **Consistency**: All APIs follow similar interface patterns
3. **Type Safety**: Full TypeScript support with proper interfaces
4. **Error Handling**: Comprehensive error handling and logging
5. **Documentation**: Clear console logging for debugging
6. **Flexibility**: Easy to swap between different API providers

## Integration

The blockchain APIs are integrated into the currency data files. For example, in `BCH.BitcoinCash.ts`:

```typescript
fetchUTXOs: async (address: string, network: 'mainnet' | 'testnet' = 'mainnet') => {
  const { BlockchairAPI } = await import('@/components/currencyCore/blockchainAPIs/BCH.BitcoinCash');
  const api = new BlockchairAPI(network);
  return await api.fetchUTXOs(address);
}
```

This approach provides:
- **Code Splitting**: APIs are loaded only when needed
- **Maintainability**: Easy to update or replace API implementations
- **Testing**: Each API can be tested independently
- **Reusability**: API classes can be used directly outside of currency data

## Algorand (ALGO)

Algorand has **4 different API implementations** available:

**Note:** Algorand is account-based (not UTXO-based like Bitcoin).

### Available APIs:
1. **AlgoExplorer API** - Free public API, no key required
2. **AlgoNode API (Algod)** - Free public nodes, best for broadcasting
3. **AlgoIndexer API** - Free public indexer, best for transaction history
4. **PureStake API** - 25,000 requests/day with free API key

**Usage:**
```typescript
import { 
  AlgoExplorerAPI,
  AlgoNodeAPI,
  AlgoIndexerAPI,
  PureStakeAPI 
} from '@/components/currencyCore/blockchainAPIs/ALGO.Algorand';

// For simple queries
const explorer = new AlgoExplorerAPI('mainnet');
const balance = await explorer.getBalance('ALGORAND_ADDRESS');

// For broadcasting
const algod = new AlgoNodeAPI('mainnet');
const result = await algod.broadcastTransaction(signedTxn);

// For transaction history
const indexer = new AlgoIndexerAPI('mainnet');
const history = await indexer.getTransactionHistory('ALGORAND_ADDRESS');

// For higher limits (requires API key)
const purestake = new PureStakeAPI('mainnet', { apiKey: 'YOUR_KEY' });
```

**Detailed Documentation:** See [ALGO.Algorand/README.md](./ALGO.Algorand/README.md)

---

## Cosmos (ATOM)

Cosmos has **3 different API implementations** available:

### 1. Mintscan API (by Cosmostation) - Recommended for Production

Located in `ATOM.Cosmos/mintscanAPI.ts`

**Features:**
- Enterprise-grade indexed API
- Get account balance and information
- Get transaction by hash and history
- Get blocks and latest block height
- Broadcast transactions
- Get validator information
- Historical statistics

**API Limits:**
- Free tier: 2 requests/second, 10,000 calls/day
- Optional API key for higher limits

**Usage:**
```typescript
import { MintscanAPI } from '@/components/currencyCore/blockchainAPIs/ATOM.Cosmos';

const api = new MintscanAPI('mainnet');
const balance = await api.getBalance('cosmos1...');
```

---

### 2. ATOMScan API - Recommended for Simple Queries

Located in `ATOM.Cosmos/atomscanAPI.ts`

**Features:**
- Public LCD/REST gateway
- Get account balance and information
- Get transactions and history
- Get blocks
- Broadcast transactions
- Get delegations and validators

**API Limits:**
- Free public access
- No API key required

**Usage:**
```typescript
import { atomscanMainnet } from '@/components/currencyCore/blockchainAPIs/ATOM.Cosmos';

const balance = await atomscanMainnet.getBalance('cosmos1...');
const delegations = await atomscanMainnet.getDelegations('cosmos1...');
```

---

### 3. Public LCD API - Direct Node Access

Located in `ATOM.Cosmos/publicLCDAPI.ts`

**Features:**
- Direct access to public Cosmos SDK nodes
- Multiple endpoint support with fallback
- Standard gRPC-gateway (REST/LCD) endpoints
- Get balance, transactions, delegations
- Broadcast transactions
- Get staking pool information

**API Limits:**
- Free public access
- Rate limits vary by provider (~5-10 req/sec)

**Usage:**
```typescript
import { PublicLCDAPI, publicLCD } from '@/components/currencyCore/blockchainAPIs/ATOM.Cosmos';

// Using default endpoint
const balance = await publicLCD.getBalance('cosmos1...');

// Switch between public endpoints
const api = new PublicLCDAPI();
api.switchEndpoint(1); // Switch to second endpoint
```

**Detailed Documentation:** See [ATOM.Cosmos/README.md](./ATOM.Cosmos/README.md)

---

## Bitcoin (BTC)

Bitcoin has **8 different API implementations** available:

### 1. Blockstream API (Recommended) - Privacy-Focused

Located in `BTC.Bitcoin/blockstreamAPI.ts`

**Features:**
- Open-source and tracking-free
- Fetch UTXOs for an address
- Get address balance and transaction history
- Broadcast transactions
- Get blocks by hash or height
- WebSocket support for real-time updates
- Supports Mainnet, Testnet, and Liquid

**API Limits:**
- Free, no API key required
- Generous rate limits

**Usage:**
```typescript
import { blockstreamMainnet } from '@/components/currencyCore/blockchainAPIs/BTC.Bitcoin';

const utxos = await blockstreamMainnet.getUTXOs('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
const balance = await blockstreamMainnet.getBalance('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
```

---

### 2. Blockchain.com API - Trusted & Oldest

Located in `BTC.Bitcoin/blockchainComAPI.ts`

**Features:**
- Oldest and most trusted Bitcoin API
- Fetch UTXOs and balances
- Multi-address balance queries
- Transaction broadcasting
- Transaction history
- WebSocket support

**API Limits:**
- Free tier with moderate rate limits
- No API key required for basic endpoints

**Usage:**
```typescript
import { blockchainCom } from '@/components/currencyCore/blockchainAPIs/BTC.Bitcoin';

const info = await blockchainCom.getAddressInfo('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
const balances = await blockchainCom.getMultiAddressBalance(['addr1', 'addr2']);
```

---

### 3. BlockCypher API - Advanced Features

Located in `BTC.Bitcoin/blockcypherAPI.ts`

**Features:**
- Unified blockchain API
- WebHooks for address monitoring
- Transaction confidence scores
- Address generation for testing
- Transaction decoding
- Comprehensive blockchain info

**API Limits:**
- Free: 3 requests/second, 200 requests/hour
- Optional API key for higher limits

**Usage:**
```typescript
import { BlockCypherAPI } from '@/components/currencyCore/blockchainAPIs/BTC.Bitcoin';

const api = new BlockCypherAPI({ apiKey: 'YOUR_KEY' });
const info = await api.getAddressInfo('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
```

---

### 4. Bitaps API - Modern & Clean

Located in `BTC.Bitcoin/bitapsAPI.ts`

**Features:**
- Modern RESTful API
- No API key required
- Clean JSON responses
- UTXO fetching
- Transaction decoding
- Fee recommendations

**API Limits:**
- Free with reasonable rate limits

**Usage:**
```typescript
import { bitapsMainnet } from '@/components/currencyCore/blockchainAPIs/BTC.Bitcoin';

const balance = await bitapsMainnet.getBalance('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
const fees = await bitapsMainnet.getRecommendedFees();
```

---

### 5. SoChain API - Simple & Reliable

Located in `BTC.Bitcoin/sochainAPI.ts`

**Features:**
- Simple and reliable API
- No API key required
- Address validation
- Network statistics
- High rate limits (300 req/min)

**API Limits:**
- Free: 300 requests/minute

**Usage:**
```typescript
import { sochainMainnet } from '@/components/currencyCore/blockchainAPIs/BTC.Bitcoin';

const isValid = await sochainMainnet.isAddressValid('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
const networkInfo = await sochainMainnet.getNetworkInfo();
```

---

### 6. Tokenview API - Multi-Chain

Located in `BTC.Bitcoin/tokenviewAPI.ts`

**Features:**
- Multi-chain support (70+ blockchains)
- Comprehensive API coverage
- Transaction history with pagination
- Block explorer functionality

**API Limits:**
- Free: 100 requests/day (requires API key)
- Paid plans for higher limits

**Usage:**
```typescript
import { TokenviewAPI } from '@/components/currencyCore/blockchainAPIs/BTC.Bitcoin';

const api = new TokenviewAPI({ apiKey: 'YOUR_KEY' });
const utxos = await api.getUTXOs('1A1zP1eP5QGefi2DMPTfTL5SLmv7DivfNa');
```

---

### 7. NOWNodes API - Full Node Access

Located in `BTC.Bitcoin/nowNodesAPI.ts`

**Features:**
- Full node access via Blockbook
- Multi-chain support (60+ blockchains)
- Real blockchain node data
- Comprehensive block explorer features

**API Limits:**
- Free: 5,000 requests/month (requires API key)
- Paid plans for unlimited access

**Usage:**
```typescript
import { NOWNodesAPI } from '@/components/currencyCore/blockchainAPIs/BTC.Bitcoin';

const api = new NOWNodesAPI({ apiKey: 'YOUR_KEY' });
const chainInfo = await api.getBlockchainInfo();
```

---

### 8. Blast API - Enterprise-Grade

Located in `BTC.Bitcoin/blastAPI.ts`

**Features:**
- High-performance infrastructure
- Full Bitcoin Core RPC access
- WebSocket support
- Very generous free tier (12M req/month)
- Transaction validation (testMempoolAccept)

**API Limits:**
- Free: 12M requests/month (requires API key)

**Usage:**
```typescript
import { BlastAPI } from '@/components/currencyCore/blockchainAPIs/BTC.Bitcoin';

const api = new BlastAPI({ apiKey: 'YOUR_KEY', projectId: 'YOUR_PROJECT' });
const fee = await api.estimateSmartFee(6);
const validation = await api.testMempoolAccept('txhex');
```

**Detailed Documentation:** See [BTC.Bitcoin/README.md](./BTC.Bitcoin/README.md)

---

## Ethereum (ETH) 🔷

**7 API Implementations** | See: [`ETH.Ethereum/README.md`](./ETH.Ethereum/README.md)

### Implemented APIs:

1. **Etherscan API** - Most comprehensive block explorer (5 calls/sec, requires API key)
2. **Infura API** - Node provider by Consensys (100K requests/day)
3. **Alchemy API** - Enterprise-grade infrastructure (300M CU/month, NFT support)
4. **Blockscout API** - Open-source, Etherscan-compatible (unlimited, no key required)
5. **Ethplorer API** - ERC20 token tracking specialist (limited free tier)
6. **QuickNode API** - High-performance RPC (trial available)
7. **GetBlock API** - Instant node access (free tier available)

**Key Features:**
- Account balance queries
- Transaction history
- ERC20/ERC721/ERC1155 token tracking
- Smart contract interaction
- Gas estimation
- NFT metadata and ownership
- Transaction broadcasting

**Usage:**
```typescript
import { EtherscanAPI, AlchemyAPI, blockscoutMainnet } from '@/components/currencyCore/blockchainAPIs/ETH.Ethereum';

// Option 1: Etherscan (comprehensive)
const etherscan = new EtherscanAPI({ apiKey: 'YOUR_KEY' }, 'mainnet');
const balance = await etherscan.getBalance('0x...');

// Option 2: Alchemy (enterprise features)
const alchemy = new AlchemyAPI({ apiKey: 'YOUR_KEY' }, 'mainnet');
const nfts = await alchemy.getNFTsForOwner('0x...');

// Option 3: Blockscout (no key required)
const history = await blockscoutMainnet.getTransactionHistory('0x...');
```

---

## Polkadot (DOT) 🔗

**8 API Implementations** | See: [`DOT.Polkadot/README.md`](./DOT.Polkadot/README.md)

### Implemented APIs:

1. **Subscan API** - Most comprehensive Substrate explorer (~100 networks, staking info)
2. **Polkadot.js API** - Official library for direct blockchain interaction (placeholder)
3. **Statescan API** - Substrate chain explorer (free, no key required)
4. **GetBlock API** - Instant RPC node access (free tier available)
5. **NOWNodes API** - Full node access (5k requests/month with key)
6. **Tokenview API** - Multi-chain support (100 requests/day)
7. **3xpl API** - Multi-chain explorer (free, no key required)
8. **Polkascan API** - Substrate-focused explorer (free, no key required)

**Key Features:**
- Account balance queries (free, reserved, locked)
- Transfer and extrinsic history
- Block information
- Staking and bonding data
- Identity lookups
- SS58 address format support
- Multi-network support (Polkadot, Kusama, Westend)

**Usage:**
```typescript
import { subscanPolkadot, statescanPolkadot, threexplPolkadot } from '@/components/currencyCore/blockchainAPIs/DOT.Polkadot';

// Option 1: Subscan (most comprehensive)
const accountInfo = await subscanPolkadot.getAccountInfo('1a1LcBX6hGPKg5aQ6DXZpAHCCzWjckhea4sz3P1PvL3oc4F');
const transfers = await subscanPolkadot.getTransferHistory('1a1LcBX6...', 0, 25);

// Option 2: Statescan (no key required)
const balance = await statescanPolkadot.getBalance('1a1LcBX6...');

// Option 3: 3xpl (quick lookups)
const history = await threexplPolkadot.getTransactionHistory('1a1LcBX6...', 25, 0);
```

---

## Ethereum Classic (ETC) ⛓️

**6 API Implementations** | See: [`ETC.EthereumClassic/README.md`](./ETC.EthereumClassic/README.md)

### Implemented APIs:

1. **Blockscout API** - Official ETC explorer (free, open-source, Etherscan-compatible)
2. **BlockCypher API** - Comprehensive with webhooks (3 req/sec free)
3. **Blockchair API** - Analytics platform (1,000 requests/day free)
4. **GetBlock API** - RPC node access (free tier available)
5. **NOWNodes API** - Full node access (5,000 requests/month)
6. **Tokenview API** - Multi-chain explorer (100 requests/day)

**Key Features:**
- EVM-compatible (same as Ethereum)
- Balance and transaction queries
- ERC20 token tracking
- Smart contract interaction
- Gas estimation
- Transaction broadcasting
- Internal transaction tracking

**Usage:**
```typescript
import { blockscoutETC, blockcypherETC, blockchairETC } from '@/components/currencyCore/blockchainAPIs/ETC.EthereumClassic';

// Option 1: Blockscout (official, unlimited)
const balance = await blockscoutETC.getBalance('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');
const history = await blockscoutETC.getTransactionHistory('0x742d35Cc...');

// Option 2: BlockCypher (webhooks support)
const addressInfo = await blockcypherETC.getAddressInfo('0x742d35Cc...');

// Option 3: Blockchair (analytics)
const stats = await blockchairETC.getNetworkStats();
```

---

## Litecoin (LTC) 🪙

**4 API Implementations** | See: [`LTC.Litecoin/README.md`](./LTC.Litecoin/README.md)

### Implemented APIs:

1. **Blockchair API** - Best free tier (1,000 requests/day, no key required)
2. **BlockCypher API** - Comprehensive with webhooks (3 req/sec free)
3. **SoChain API** - Fast and reliable (free, unlimited)
4. **GetBlock API** - RPC node access (free tier available)

**Key Features:**
- Bitcoin-based UTXO model
- Faster block time (2.5 minutes)
- SegWit and MWEB support
- Balance and UTXO queries
- Transaction broadcasting
- Fee estimation
- Multiple address formats (Legacy, P2SH, SegWit, MWEB)

**Usage:**
```typescript
import { blockchairLTC, sochainLTC, blockcypherLTC } from '@/components/currencyCore/blockchainAPIs/LTC.Litecoin';

// Option 1: Blockchair (1k/day, no key)
const balance = await blockchairLTC.getBalance('LMfFTdS67NzKxfUqMTf5JWCJXt5dgu1Eom');
const utxos = await blockchairLTC.fetchUTXOs('LMfFTdS67...');

// Option 2: SoChain (free, unlimited)
const networkInfo = await sochainLTC.getNetworkInfo();

// Option 3: BlockCypher (webhooks)
const fees = await blockcypherLTC.getFeeEstimates();
```

---

## Terra 2.0 (LUNA) 🌍

**6 API Implementations** | See: [`LUNA.Terra/README.md`](./LUNA.Terra/README.md)

### Implemented APIs:

1. **Mintscan API** - Cosmostation explorer (10k/day, 2 req/sec)
2. **Terra Finder API** - Official Terra LCD (free, unlimited)
3. **ATOMScan API** - Cosmos ecosystem explorer (free, rate limits)
4. **Stake.ID API** - Network visualization (free)
5. **GetBlock API** - RPC node access (50k units/month)
6. **NOWNodes API** - Full node access (requires API key)

**Key Features:**
- Cosmos SDK-based blockchain
- Account balance queries
- Staking and delegation tracking
- Validator information
- Governance proposals
- Transaction broadcasting

**Usage:**
```typescript
import { mintscanAPI, terraFinderAPI } from '@/components/currencyCore/blockchainAPIs/LUNA.Terra';

// Get account balance
const balance = await mintscanAPI.getBalance('terra1...');
const validators = await mintscanAPI.getValidators();

// Get transaction history
const txs = await terraFinderAPI.getTransactionHistory('terra1...');
```

---

## Terra Classic (LUNC) 🌕

**9 API Implementations** | See: [`LUNC.TerraClassic/README.md`](./LUNC.TerraClassic/README.md)

### Implemented APIs:

1. **LuncScan API** - Dedicated LUNC tracker with burn data (free)
2. **ATOMScan Terra Classic API** - LUNC tracking (free, rate limits)
3. **Terra Classic Tools API** - Ecosystem hub with DeFi data (free)
4. **NOWNodes Terra Classic API** - Full node access (requires API key)
5. **Terrasco.pe API** - Terra Classic focused explorer (free)
6. **PublicNode API** - Free public RPC, LCD, and FCD endpoints (free, cached)
7. **Autostake API** - Free developer access tier (free)
8. **Mintscan Classic API** - Enterprise-grade indexing (10k/day)
9. **Bitquery API** - GraphQL-based blockchain data (free tier)

**Key Features:**
- Original Terra blockchain (post-collapse)
- LUNC burn tracking and statistics
- USTC re-peg monitoring
- Tax system queries
- DeFi statistics
- Vesting account information

**Usage:**
```typescript
import { luncScanAPI, terraClassicToolsAPI } from '@/components/currencyCore/blockchainAPIs/LUNC.TerraClassic';

// Track burns
const burnInfo = await luncScanAPI.getBurnInfo();
console.log('Total burned:', burnInfo.total_burned);

// Monitor USTC re-peg
const repegInfo = await terraClassicToolsAPI.getUSTCRepegInfo();
console.log('Re-peg progress:', repegInfo.repeg_progress + '%');
```

---

## Solana (SOL) ⚡

**5 API Implementations** | See: [`SOL.Solana/README.md`](./SOL.Solana/README.md)

### Implemented APIs:

1. **SolanaFM API** - Next-gen explorer with real-time insights (10 RPS free)
2. **Solscan API** - Comprehensive tracker with NFT support (free tier)
3. **Official Solana Explorer API** - Native RPC methods (free)
4. **Solana Beach API** - Staking and validator focused (free tier)
5. **Helius API** - Enterprise-grade with enhanced features (API key required)

**Key Features:**
- High-performance blockchain (thousands of TPS)
- Token and NFT tracking
- Enhanced transaction parsing
- Staking and validator information
- DAS (Digital Asset Standard) support
- Compressed NFT support
- Webhook notifications

**Usage:**
```typescript
import { solanaExplorerAPI, heliusAPI, solanaBeachAPI } from '@/components/currencyCore/blockchainAPIs/SOL.Solana';

// Get SOL balance
const balance = await solanaExplorerAPI.getBalance('address...');

// Get all tokens (with metadata using Helius)
const helius = createHeliusAPI('YOUR_API_KEY');
const tokens = await helius.getTokenBalances('address...');

// Get staking info
const stakeAccounts = await solanaBeachAPI.getStakeAccounts('address...');
```

---

## Stacks (STX) 🔗

**3 API Implementations** | See: [`STX.Stacks/README.md`](./STX.Stacks/README.md)

### Implemented APIs:

1. **Hiro Stacks API** - Official comprehensive REST API (free with rate limits)
2. **QuickNode API** - Fast RPC nodes with free tier
3. **NOWNodes API** - Full node access (5000 requests/month free)

**Key Features:**
- Bitcoin Layer 2 blockchain
- Smart contract interaction
- Account-based model
- Token metadata (FT and NFT)
- Mempool tracking
- Read-only contract calls
- Transaction broadcasting
- Fee estimation

**Usage:**
```typescript
import { hiroStacksAPI, createQuickNodeStacksAPI } from '@/components/currencyCore/blockchainAPIs/STX.Stacks';

// Get STX balance
const balance = await hiroStacksAPI.getBalance('SP2J6ZY48GV1EZ5V2V5RB9MP66SW86PYKKNRV9EJ7');
const stxBalance = parseInt(balance) / 1_000_000; // Convert from microSTX

// Call smart contract
const result = await hiroStacksAPI.callReadOnlyFunction(
  'SP2C2YFP12AJZB4MABJBAJ55XECVS7E4PMMZ89YZR',
  'arkadiko-token',
  'get-balance',
  ['0x...']
);
```

---

## Tron (TRX) 🔴

**5 API Implementations** | See: [`TRX.Tron/README.md`](./TRX.Tron/README.md)

### Implemented APIs:

1. **TRONSCAN API** - Official blockchain explorer (free with registration)
2. **TronGrid API** - Official TRON API with fast node access (free)
3. **GetBlock API** - RPC node access (free tier with API key)
4. **NOWNodes API** - Full node access (5000 requests/month free)
5. **Blockchair API** - Fast blockchain explorer (free tier)

**Key Features:**
- High-throughput blockchain
- Smart contracts and dApps
- TRC10 and TRC20 token support
- Energy and bandwidth resources
- Witness (super representative) system
- Transaction broadcasting
- DeFi ecosystem

**Usage:**
```typescript
import { tronGridAPI, tronscanAPI } from '@/components/currencyCore/blockchainAPIs/TRX.Tron';

// Get TRX balance
const balance = await tronGridAPI.getBalance('TYkJFW7v7A6NmWGKcuNMGbAQWgpPdE7h5');
const trxBalance = balance / 1_000_000; // Convert from SUN to TRX

// Get TRC20 token balance (USDT)
const result = await tronGridAPI.getTRC20Balance(
  'TR7NHqjeKQxGTCi8q8ZY4pL8otSzgjLj6t', // USDT contract
  'TYkJFW7v7A6NmWGKcuNMGbAQWgpPdE7h5'
);
```

---

## Waves (WAVES) 🌊

**3 API Implementations** | See: [`WAVES.Waves/README.md`](./WAVES.Waves/README.md)

### Implemented APIs:

1. **Waves Node REST API** - Official node API (free with rate limits)
2. **WScan API** - Explorer with NFT and portfolio tracking (free)
3. **GetBlock API** - RPC node provider (free tier with API key)

**Key Features:**
- Account-based blockchain
- Smart contracts (dApps)
- Custom tokens and NFTs
- Leasing (staking) system
- Data storage on-chain
- Alias system for addresses
- Asset sponsorship

**Usage:**
```typescript
import { wavesNodeAPI, wscanAPI } from '@/components/currencyCore/blockchainAPIs/WAVES.Waves';

// Get WAVES balance
const balance = await wavesNodeAPI.getBalance('3PMwoP5yMXsj7G4QDSzuTFBAM574mQbHiaa');
const wavesBalance = balance / 100000000; // Convert from wavelets

// Get all assets
const assets = await wavesNodeAPI.getAllAssetBalances('3PMwoP5yMXsj7G4QDSzuTFBAM574mQbHiaa');

// Get NFTs
const nfts = await wscanAPI.getNFTsByOwner('3PMwoP5yMXsj7G4QDSzuTFBAM574mQbHiaa');
```

---

## Stellar (XLM) ⭐

**7 API Implementations** | See: [`XLM.Stellar/README.md`](./XLM.Stellar/README.md)

### Implemented APIs:

1. **Horizon API** - Official Stellar API (free, no auth)
2. **StellarExpert API** - Analytics platform (free, no auth)
3. **NOWNodes API** - Full node access (5k/day free)
4. **Bitquery API** - GraphQL with real-time data (requires key)
5. **Tatum API** - Powerful APIs and RPCs (requires key)
6. **GetBlock API** - RPC node provider (requires key)
7. **Ankr API** - RPC for dApps (free tier)

**Key Features:**
- Account-based blockchain
- Fast (3-5 second finality)
- Low fees (0.00001 XLM/operation)
- Custom assets and tokens
- Built-in DEX
- Multi-signature accounts
- Atomic path payments
- Liquidity pools

**Usage:**
```typescript
import { horizonAPI, stellarExpertAPI } from '@/components/currencyCore/blockchainAPIs/XLM.Stellar';

// Get XLM balance
const balance = await horizonAPI.getBalance('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI');

// Get all assets
const balances = await horizonAPI.getAllBalances('GBZXN7PIRZGNMHGA7MUUUF4GWPY5AYPV6LY4UV2GL6VJGIQRXFDNMADI');

// Get asset price with rating
const asset = await stellarExpertAPI.getAsset('USDC', 'GA5ZSEJYB37JRC5AVCIA5MOP4RHTM335X2KGX3IHOJAPP5RE34K4KZVN');
console.log('Rating:', asset.rating.average);
```

---

## Ripple (XRP) 💧

**7 API Implementations** | See: [`XRP.Ripple/README.md`](./XRP.Ripple/README.md)

### Implemented APIs:

1. **XRP Ledger (XRPL) API** - Official public servers (free, no auth)
2. **XRPSCAN API** - Comprehensive explorer (free)
3. **Bithomp API** - Fast explorer with usernames (free)
4. **Bitquery API** - GraphQL with real-time data (requires key)
5. **NOWNodes API** - Full node access (5k/day free)
6. **GetBlock API** - RPC node provider (requires key)
7. **QuickNode API** - Fast RPC endpoints (requires key)

**Key Features:**
- Ultra-fast (3-5 second finality)
- Low cost (fractions of a cent)
- Built-in DEX
- Issued currencies (IOUs)
- Native NFT support
- Payment channels
- Escrows and checks
- Automated Market Makers (AMMs)
- Multi-signature accounts

**Usage:**
```typescript
import { xrplAPI, xrpscanAPI } from '@/components/currencyCore/blockchainAPIs/XRP.Ripple';

// Get XRP balance
const balance = await xrplAPI.getBalance('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// Get all balances (XRP + issued currencies)
const balances = await xrplAPI.getAllBalances('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');

// Get NFTs
const nfts = await xrpscanAPI.getAccountNFTs('rN7n7otQDd6FczFgLdlqtyMVrn3HMfViYf');
```

---

## Future Enhancements

Potential additions:
- Additional Solana APIs: QuickNode, Triton
- Additional Ethereum APIs: Beaconcha.in (ETH 2.0), Tokenview, BlockCypher, Blockchair
- Additional ETC APIs: Expedition (self-hostable), CryptoAPIs, BlockExplorer.one
- Additional LTC APIs: Litecoin Space, Litecoin Block Explorer, CryptoID, NOWNodes, Tokenview
- WebSocket support for real-time updates
- Caching layer for frequently accessed data
- Retry logic for failed requests
- API key management

