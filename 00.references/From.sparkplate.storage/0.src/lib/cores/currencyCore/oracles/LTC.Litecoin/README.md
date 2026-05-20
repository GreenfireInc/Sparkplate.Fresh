# Litecoin (LTC) Oracles

Complete oracle integration guide for Litecoin blockchain data, price feeds, UTXO tracking, and market analytics.

## Overview

This directory contains oracle integrations for Litecoin (LTC), a UTXO-based cryptocurrency created as a Bitcoin fork. Litecoin uses Scrypt Proof of Work, supports SegWit and MWEB (MimbleWimble Extension Block) for privacy, and provides faster block times (2.5 minutes) compared to Bitcoin.

## Important Note: Chainlink Support

⚠️ **Chainlink does not support native Litecoin directly.** Chainlink only provides price feeds for wrapped LTC (wLTC) on EVM-compatible chains like Ethereum and BSC. For native LTC price data, use:
- **Pyth Network** (recommended for speed)
- **DIA** (recommended for transparency)
- **RedStone** (recommended for flexibility)
- **CoinGecko** (recommended for comprehensive market data)

## Available Oracles

### Price Oracles

1. **Pyth Network** - High-Frequency (Primary)
   - 400ms update frequency
   - 70+ data publishers
   - Confidence intervals included
   - Ideal for real-time price tracking

2. **DIA** - Open-Source (Recommended for Transparency)
   - Transparent methodologies
   - Historical data available
   - Supply information
   - No API key required

3. **RedStone** - Modular
   - Pull-based data model
   - Cost-effective pricing
   - Flexible architecture
   - TypeScript-first SDK

4. **CoinGecko** - Market Data (Comprehensive)
   - Real-time and historical prices
   - Market cap and volume
   - Exchange listings
   - No API key required

### Block Explorers

5. **Blockchair** - Multi-Chain Explorer (Primary)
   - 1,000 free requests/day
   - Comprehensive UTXO data
   - Network statistics
   - Address balance tracking

6. **BlockCypher** - Fast API with Webhooks
   - 3 requests/second free
   - Webhook support
   - Transaction broadcasting
   - UTXO queries

### Limited Support

7. **Chainlink** - Wrapped LTC Only
   - ⚠️ No native LTC support
   - Only wLTC on EVM chains
   - Use alternatives for native LTC

## Quick Start

### Installation

```bash
# Core dependencies
npm install axios

# Optional: For Pyth Network
npm install @pythnetwork/pyth-sdk-js

# Optional: For RedStone
npm install redstone-sdk
```

### Basic Price Feed Examples

#### Pyth Network (Fastest - Recommended)
```typescript
import axios from 'axios';

const LTC_USD_FEED_ID = '0x6e3f3fa8253588df9326580180233eb791e03b443a3ba7a1d892e73874e19a54';

async function getPythLTCPrice() {
  const response = await axios.get(
    'https://hermes.pyth.network/v2/updates/price/latest',
    { params: { ids: [LTC_USD_FEED_ID] } }
  );
  
  const priceData = response.data.parsed[0].price;
  const price = parseFloat(priceData.price) * Math.pow(10, priceData.expo);
  
  console.log('LTC Price:', price);
  return price;
}
```

#### CoinGecko (Comprehensive Market Data)
```typescript
import axios from 'axios';

async function getCoinGeckoLTCPrice() {
  const response = await axios.get(
    'https://api.coingecko.com/api/v3/simple/price',
    {
      params: {
        ids: 'litecoin',
        vs_currencies: 'usd',
        include_24hr_change: true,
      },
    }
  );
  
  console.log('LTC Price:', response.data.litecoin.usd);
  console.log('24h Change:', response.data.litecoin.usd_24h_change);
  
  return response.data.litecoin;
}
```

#### Blockchair (Blockchain Data)
```typescript
import axios from 'axios';

async function getAddressBalance(address: string) {
  const response = await axios.get(
    `https://api.blockchair.com/litecoin/dashboards/address/${address}`
  );
  
  const data = response.data.data[address];
  const balance = data.address.balance / 100000000; // Convert satoshis to LTC
  
  console.log('Balance:', balance, 'LTC');
  return balance;
}
```

## Use Case Recommendations

### For Wallets
- **Address Balance**: Blockchair, BlockCypher
- **Transaction History**: Blockchair, BlockCypher
- **Price Display**: CoinGecko, Pyth
- **UTXO Management**: Blockchair, BlockCypher

### For Trading Applications
- **Real-Time Prices**: Pyth Network (fastest)
- **Market Data**: CoinGecko
- **Historical Analysis**: DIA, CoinGecko
- **Price Alerts**: Pyth, CoinGecko

### For Payment Processing
- **Transaction Broadcasting**: BlockCypher
- **Payment Monitoring**: BlockCypher (webhooks)
- **Address Verification**: Blockchair, BlockCypher
- **UTXO Tracking**: Blockchair, BlockCypher

### For Analytics Dashboards
- **Historical Data**: CoinGecko, DIA
- **Network Statistics**: Blockchair
- **Market Analysis**: CoinGecko
- **Blockchain Metrics**: Blockchair

## Oracle Comparison

| Oracle | Type | Update Speed | Free Tier | Best For |
|--------|------|-------------|-----------|----------|
| **Pyth** | Price | 400ms | Unlimited | Real-time price tracking |
| **DIA** | Price | Minutes | Unlimited | Transparent data |
| **RedStone** | Price | On-demand | Unlimited | Modular architecture |
| **CoinGecko** | Market | Minutes | 10-50 calls/min | Market data & history |
| **Blockchair** | Explorer | Real-time | 1,000 req/day | UTXO & blockchain data |
| **BlockCypher** | Explorer | Real-time | 200 req/hour | Webhooks & broadcasting |
| **Chainlink** | Price | N/A | N/A | ⚠️ wLTC only (not native) |

## Litecoin-Specific Features

### Address Formats

Litecoin supports multiple address formats:

```
P2PKH (Legacy):    L... (Base58)
P2SH (SegWit):     M... (Base58)
P2WPKH (SegWit):   ltc1... (Bech32)
MWEB (Privacy):    ltc1mweb... (Bech32)
```

### MWEB (MimbleWimble Extension Block)

Litecoin's privacy feature with:
- Confidential transactions (amounts hidden)
- CoinJoin mixing
- Stealth addresses
- Blockchain pruning for efficiency
- 150,000+ LTC already locked in MWEB

**Wallets supporting MWEB:**
- Cake Wallet (mobile)
- Litecoin Core (desktop)
- Electrum LTC

### Network Statistics

- **Max Supply**: 84,000,000 LTC (4x Bitcoin)
- **Block Time**: 2.5 minutes (4x faster than Bitcoin)
- **Consensus**: Proof of Work (Scrypt algorithm)
- **Block Reward**: Halves every 840,000 blocks
- **Transaction Speed**: ~2.5 minutes per confirmation

## Rate Limits & Pricing

### Free Tiers
```
Pyth Network:    Unlimited (no API key)
DIA:             Unlimited (no API key)
RedStone:        Unlimited (no API key)
CoinGecko:       10-50 calls/minute (no API key)
Blockchair:      1,000 requests/day (no API key)
BlockCypher:     3 req/sec, 200 req/hour (no API key)
```

### Paid Tiers
- **CoinGecko Pro**: Higher rate limits, advanced features
- **Blockchair Premium**: More requests, priority support
- **BlockCypher Premium**: Higher limits, advanced webhooks

## Integration Examples

### Multi-Oracle Price Verification

```typescript
async function getVerifiedLTCPrice() {
  const [pythPrice, diaPrice, geckoPrice] = await Promise.all([
    getPythLTCPrice(),
    getDIALTCPrice(),
    getCoinGeckoLTCPrice().then(d => d.usd),
  ]);

  const prices = [pythPrice, diaPrice, geckoPrice];
  const avgPrice = prices.reduce((a, b) => a + b) / prices.length;
  const maxDev = Math.max(...prices.map(p => Math.abs(p - avgPrice)));

  if (maxDev / avgPrice > 0.02) {
    console.warn('⚠️ Price deviation > 2%');
  }

  return {
    pyth: pythPrice,
    dia: diaPrice,
    coingecko: geckoPrice,
    average: avgPrice,
    maxDeviation: (maxDev / avgPrice) * 100,
  };
}
```

### Transaction Monitoring with Webhooks

```typescript
// BlockCypher webhook for address monitoring
async function monitorAddress(address: string, webhookUrl: string) {
  const response = await axios.post(
    'https://api.blockcypher.com/v1/ltc/main/hooks',
    {
      event: 'unconfirmed-tx',
      address,
      url: webhookUrl,
    }
  );

  console.log('Webhook created:', response.data.id);
  return response.data;
}
```

### UTXO Selection for Transactions

```typescript
async function selectUTXOs(address: string, targetAmount: number) {
  const response = await axios.get(
    `https://api.blockchair.com/litecoin/dashboards/address/${address}`
  );

  const utxos = response.data.data[address].utxo || [];
  let selected = [];
  let total = 0;

  for (const utxo of utxos) {
    selected.push(utxo);
    total += utxo.value / 100000000;
    
    if (total >= targetAmount) break;
  }

  return { selected, total };
}
```

## Important Notes

1. **No Native Chainlink**: Use Pyth, DIA, or RedStone for native LTC
2. **UTXO Model**: Unlike Ethereum's account model, LTC uses UTXOs
3. **Multiple Addresses**: Wallets typically use multiple addresses
4. **SegWit Support**: Use bech32 addresses (ltc1...) for lower fees
5. **MWEB Privacy**: Optional privacy feature with ltc1mweb addresses
6. **Scrypt Mining**: Different from Bitcoin's SHA-256
7. **4x Supply**: 84M LTC max supply vs 21M BTC

## Security Considerations

1. **Verify addresses** before sending transactions
2. **Use multiple oracles** for price verification
3. **Monitor UTXO set** for payment tracking
4. **Check confirmations** (typically 6 confirmations recommended)
5. **Validate address formats** (P2PKH, P2SH, P2WPKH, MWEB)
6. **Implement rate limiting** to avoid API bans
7. **Store API keys securely** if using paid tiers

## Additional Resources

### Documentation
- Litecoin Official: https://litecoin.org/
- Pyth Network: https://docs.pyth.network/
- DIA: https://docs.diadata.org/
- RedStone: https://docs.redstone.finance/
- CoinGecko: https://docs.coingecko.com/
- Blockchair: https://blockchair.com/api/docs
- BlockCypher: https://www.blockcypher.com/dev/litecoin/

### Explorers
- Blockchair: https://blockchair.com/litecoin
- BlockCypher: https://live.blockcypher.com/ltc/
- Litecoin Space: https://litecoinspace.org/
- SoChain: https://chain.so/ltc

### Community
- Litecoin Foundation: https://litecoin-foundation.org/
- Reddit: https://www.reddit.com/r/litecoin/
- Twitter: https://twitter.com/LitecoinProject
- Discord: https://discord.gg/litecoin

## Testing

### Testnet Resources
- **Network**: Litecoin Testnet
- **Address Prefix**: Testnet addresses start with `m` or `n`
- **Faucets**: Available for testing (search "Litecoin testnet faucet")
- **Explorers**: Most explorers support testnet

### Example Test Flow

```typescript
// 1. Get testnet address balance
const balance = await getAddressBalance('testnet_address');

// 2. Create test transaction
const tx = await createTransaction(utxos, recipients);

// 3. Broadcast to testnet
const result = await broadcastTransaction(tx);

// 4. Monitor confirmation
const status = await getTransactionInfo(result.hash);
```

## License

This oracle integration guide is provided as-is for educational and development purposes.

---

**Remember**: Always use native LTC oracles (Pyth, DIA, RedStone, CoinGecko) for Litecoin applications. Chainlink only supports wrapped LTC on EVM chains.

