# DEXs - Decentralized Exchanges

Welcome to the DEXs module, providing comprehensive integrations for decentralized exchanges across multiple blockchains.

## 🚀 Overview

This module provides TypeScript integrations for decentralized exchanges (DEXs) across various blockchains. DEXs enable peer-to-peer trading without intermediaries, offering:

- **Automated Market Makers (AMMs)**
- **Liquidity Pools**
- **Yield Farming**
- **Non-custodial Trading**
- **Governance Tokens**

## 📁 Supported Blockchains

### **Algorand (ALGO)**
- **Tinyman** - Leading AMM on Algorand
- **Pact** - Multi-asset AMM protocol
- **HumbleSwap** - Community-driven DEX
- **AlgoFi** - DeFi protocol with DEX functionality
- **Folks Finance** - Lending and DEX platform
- **Vestige** - Asset management and trading
- **WagmiSwap** - Gaming-focused DEX
- **AlgoDex** - Advanced trading features

### **Cosmos (ATOM)**
- **Osmosis** - Interchain DEX hub
- **Astroport** - Terra ecosystem DEX
- **Crescent** - Cosmos Hub DEX
- **Gravity DEX** - IBC-enabled trading
- **Kujira** - Cosmos DeFi platform
- **Shade Protocol** - Privacy-focused DEX
- **Umee** - Cross-chain DeFi protocol

### **Binance Smart Chain (BNB)**
- **PancakeSwap** - Leading BSC DEX
- **Biswap** - Multi-reward AMM
- **ApeSwap** - Community-driven DEX
- **DODO** - Proactive Market Maker
- **Thena** - BSC native DEX
- **Uniswap V3** - Concentrated liquidity
- **BabySwap** - Multi-chain DEX

### **Bitcoin Cash (BCH)**
- **BenSwap** - BCH native DEX
- **CashDEX** - Bitcoin Cash trading
- **MistSwap** - Community DEX
- **TangoSwap** - BCH DeFi platform
- **SideShift** - Cross-chain swaps
- **SimpleSwap** - Instant exchanges

### **Bitcoin (BTC)**
- **Bisq** - Decentralized Bitcoin exchange
- **Boltz** - Lightning Network swaps
- **FixedFloat** - Instant Bitcoin swaps
- **HodlHodl** - P2P Bitcoin trading
- **RoboSats** - Lightning-powered DEX
- **THORChain** - Cross-chain swaps

### **Dogecoin (DOGE)**
- **DogeSwap** - Dogecoin DEX
- **KibbleSwap** - DOGE trading platform
- **YodeSwap** - Multi-asset DEX
- **StealthEX** - Privacy-focused swaps

### **Polkadot (DOT)**
- **AcalaSwap** - Polkadot DeFi hub
- **HydraDX** - Omnipool AMM
- **KaruraSwap** - Kusama DEX
- **StellaSwap** - Moonbeam DEX
- **Zenlink** - Cross-chain DEX
- **BeamSwap** - Moonbeam AMM
- **ArthSwap** - Astar DEX
- **Polkaswap** - Polkadot ecosystem DEX

### **Ethereum Classic (ETC)**
- **ClassicDAO** - ETC DeFi platform
- **ETCDEX** - ETC native DEX
- **HebeSwap** - ETC trading platform
- **StealthEX** - Privacy-focused swaps
- **ChangeNOW** - Instant exchanges
- **SideShift** - Cross-chain swaps
- **SimpleSwap** - Multi-asset trading

### **Ethereum (ETH)**
- **Uniswap** - Leading Ethereum DEX
- **Curve** - Stablecoin AMM
- **SushiSwap** - Community-driven DEX
- **Balancer** - Weighted pools
- **1inch** - DEX aggregator
- **Bancor** - Automated market maker
- **KyberSwap** - Dynamic AMM

### **Litecoin (LTC)**
- **ChangeNOW** - Instant LTC swaps
- **Exolix** - Multi-asset exchange
- **FixedFloat** - Lightning Network swaps
- **SideShift** - Cross-chain trading
- **SimpleSwap** - Instant exchanges
- **StealthEX** - Privacy-focused swaps
- **LetsExchange** - Multi-asset DEX

### **Terra 2.0 (LUNA)**
- **Astroport** - Terra ecosystem DEX
- **Edge Protocol** - Terra DeFi platform
- **Phoenix Protocol** - Terra trading
- **Spectrum Protocol** - Yield farming
- **Terraswap** - Terra AMM
- **WhiteWhale** - Terra DeFi hub
- **Loop Markets** - Terra trading platform

### **Terra Classic (LUNC)**
- **Astroport Classic** - Classic Terra DEX
- **Terraport** - LUNC trading platform
- **Terraswap Classic** - Classic AMM
- **Spectrum Classic** - Classic yield farming
- **ChangeNOW** - Instant LUNC swaps
- **SideShift** - Cross-chain trading

### **Solana (SOL)**
- **Jupiter** - Solana DEX aggregator
- **Orca** - Leading Solana AMM
- **Raydium** - Solana DeFi platform
- **Drift** - Solana derivatives
- **Lifinity** - Concentrated liquidity
- **Meteora** - Solana AMM
- **Phoenix** - Solana order book

### **Stacks (STX)**
- **ALEX** - Stacks DeFi platform
- **Arkadiko** - Stacks lending and DEX
- **Bitflow** - Stacks trading platform
- **Charisma** - Stacks DeFi hub
- **LNswap** - Lightning Network swaps
- **Stackswap** - Stacks AMM
- **Velar** - Stacks DeFi protocol

### **Tron (TRX)**
- **JustLend** - Tron DeFi platform
- **JustMoney** - Tron trading
- **SunSwap** - Tron DEX
- **TronTrade** - Tron trading platform
- **ZapperFi** - Tron DeFi aggregator
- **Poloniex** - Tron exchange
- **SunSwap V2** - Enhanced Tron DEX

### **Waves (WAVES)**
- **Waves DEX** - Native Waves exchange
- **Waves.Exchange** - Waves trading platform
- **Waves DeFi** - Waves DeFi protocols

### **Stellar (XLM)**
- **Stellar DEX** - Native Stellar exchange
- **StellarX** - Stellar trading platform
- **Stellar DeFi** - Stellar DeFi protocols

### **Ripple (XRP)**
- **XRP Ledger DEX** - Native XRP exchange
- **XRPL DEX** - XRP trading platform
- **XRP DeFi** - XRP DeFi protocols

### **Tezos (XTZ)**
- **QuipuSwap** - Leading Tezos DEX
- **SpicySwap** - Tezos AMM
- **Plenty** - Tezos DeFi platform
- **Vortex** - Tezos trading
- **Youves** - Tezos synthetic assets
- **3Route** - Tezos DEX aggregator
- **CTez** - Tezos wrapped token

## 🚀 Usage Examples

### **Basic Usage**

```typescript
import { DEXs } from '@/components/currencyCore/DEXs';

// Access Algorand DEXs
const algoDEXs = await DEXs.ALGO();
const tinyman = algoDEXs.tinymanDEX;

// Access Ethereum DEXs
const ethDEXs = await DEXs.ETH();
const uniswap = ethDEXs.uniswapDEX;

// Access Solana DEXs
const solDEXs = await DEXs.SOL();
const jupiter = solDEXs.jupiterDEX;
```

### **Advanced Usage**

```typescript
import { DEXs } from '@/components/currencyCore/DEXs';

// Get quotes from multiple DEXs
async function getBestQuote(tokenA: string, tokenB: string, amount: number) {
  const ethDEXs = await DEXs.ETH();
  const solDEXs = await DEXs.SOL();
  
  // Compare Uniswap vs Jupiter
  const uniswapQuote = await ethDEXs.uniswapDEX.getQuote(tokenA, tokenB, amount);
  const jupiterQuote = await solDEXs.jupiterDEX.getQuote(tokenA, tokenB, amount);
  
  return uniswapQuote.rate > jupiterQuote.rate ? uniswapQuote : jupiterQuote;
}
```

### **Multi-Chain Trading**

```typescript
import { DEXs } from '@/components/currencyCore/DEXs';

// Cross-chain trading
async function crossChainTrade() {
  const ethDEXs = await DEXs.ETH();
  const bnbDEXs = await DEXs.BNB();
  
  // Trade on Ethereum
  const ethTrade = await ethDEXs.uniswapDEX.swap('ETH', 'USDC', 1);
  
  // Trade on BSC
  const bnbTrade = await bnbDEXs.pancakeSwapDEX.swap('BNB', 'USDC', 1);
  
  return { ethTrade, bnbTrade };
}
```

## 🔧 Key Features

### **AMM Protocols**
- **Constant Product Formula** (x * y = k)
- **Weighted Pools** (Balancer)
- **Concentrated Liquidity** (Uniswap V3)
- **Proactive Market Making** (DODO)

### **Liquidity Management**
- **Add Liquidity**
- **Remove Liquidity**
- **Stake LP Tokens**
- **Harvest Rewards**

### **Trading Features**
- **Spot Trading**
- **Limit Orders**
- **Stop Loss**
- **DCA (Dollar Cost Averaging)**

### **Yield Farming**
- **Liquidity Mining**
- **Staking Rewards**
- **Governance Tokens**
- **Auto-compounding**

## 🔐 Security Features

### **Non-Custodial**
- **User Controls Private Keys**
- **No Central Authority**
- **Decentralized Governance**

### **Smart Contract Security**
- **Audited Contracts**
- **Bug Bounty Programs**
- **Insurance Protocols**

### **Privacy**
- **No KYC Required**
- **Anonymous Trading**
- **Private Transactions**

## 📊 Analytics & Monitoring

### **Price Tracking**
- **Real-time Prices**
- **Historical Data**
- **Price Alerts**

### **Portfolio Management**
- **Balance Tracking**
- **P&L Calculation**
- **Tax Reporting**

### **Market Analysis**
- **Volume Analysis**
- **Liquidity Metrics**
- **Trading Patterns**

## 🌐 Cross-Chain Integration

### **Bridge Protocols**
- **Wormhole** (Solana ↔ Ethereum)
- **LayerZero** (Multi-chain)
- **Axelar** (Cosmos ecosystem)

### **Multi-Chain DEXs**
- **THORChain** (Bitcoin, Ethereum, BNB)
- **RenVM** (Cross-chain assets)
- **Anyswap** (Multi-chain swaps)

## 🛠️ Development Tools

### **SDKs & Libraries**
- **Web3.js** (Ethereum)
- **Solana Web3.js** (Solana)
- **Algorand SDK** (Algorand)
- **Cosmos SDK** (Cosmos)

### **Testing**
- **Testnet Support**
- **Mock Contracts**
- **Integration Tests**

### **Deployment**
- **Smart Contract Deployment**
- **Frontend Integration**
- **API Configuration**

## 📚 Documentation

Each DEX implementation includes:
- **API Documentation**
- **Usage Examples**
- **Configuration Options**
- **Error Handling**
- **Rate Limiting**

## 🤝 Contributing

To add a new DEX:
1. Create the DEX implementation file
2. Add to the appropriate blockchain index
3. Update this README
4. Add tests and documentation

## 📄 License

This project is licensed under the MIT License.

---

**Note**: Always verify smart contract addresses and use testnets for development. DEX protocols may have different fee structures and slippage tolerances.