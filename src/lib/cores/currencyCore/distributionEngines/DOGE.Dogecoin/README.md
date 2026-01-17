# Dogecoin (DOGE) Distribution Engines

Much README! Very documentation! Wow! 🐕

This directory contains distribution engine implementations for Dogecoin blockchain, providing both reward distribution and escrow functionality for gaming applications.

## Contents

### Reward Systems
- **DOGE.Dogecoin.rewards.manual.ts**: Server-side manual reward distribution
- **DOGE.Dogecoin.rewards.smartContract.ts**: Bitcoin Script-based smart contract rewards

### Escrow Systems
- **DOGE.Dogecoin.escrow.manual.ts**: Server-managed escrow for peer-to-peer gaming
- **DOGE.Dogecoin.escrow.smartContract.ts**: Multi-signature and script-based escrow contracts

## Features

### Manual Rewards
- Direct wallet-to-wallet DOGE transfers
- UTXO-based transaction building (inherited from Bitcoin)
- Dogecoin address format support (starts with 'D')
- Very low transaction fees (typically 1 DOGE)
- Secure private key management (server-side only)
- Much fast! (1-minute block time)

### Smart Contract Rewards
- Bitcoin Script-based rewards (no Taproot/SegWit yet)
- P2SH for custom script logic
- Server-signed attestations for validation
- Time-locked rewards
- Dogethereum bridge support (experimental)

### Manual Escrow
- AES-256-GCM encrypted private key storage
- Server-controlled pot distribution
- UTXO management and consolidation
- Two-player game support
- Automatic deposit verification
- Much secure! Very encrypt! Wow!

### Smart Contract Escrow
- 2-of-3 multi-signature escrow (players + server arbiter)
- Time-locked refund mechanisms
- P2SH for trustless escrow
- Dogethereum bridge contracts (experimental)

## Usage

```typescript
import { 
  DogecoinRewarder, 
  DogecoinGameRewardManager,
  DogecoinGameEscrow,
  DogecoinSmartContractRewarder,
  DogecoinEscrowMultiSig
} from './DOGE.Dogecoin';

// Manual rewards (requires UTXO and broadcast providers)
const rewarder = new DogecoinRewarder('mainnet');

const utxoProvider = async (address: string) => {
  // Fetch UTXOs from blockchain API (e.g., Blockchair, SoChain)
  return [];
};

const broadcastProvider = async (rawTx: string) => {
  // Broadcast transaction via blockchain API
  return 'txid';
};

const gameManager = new DogecoinGameRewardManager(
  {
    rewardThreshold: 100,
    rewardAmountDOGE: 10,
    network: 'mainnet'
  },
  {
    privateKeyWIF: process.env.DOGE_WIF!,
    network: 'mainnet'
  },
  utxoProvider,
  broadcastProvider
);

await gameManager.initialize();
await gameManager.startGame('DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L'); // Much address!

// Manual escrow
const escrow = new DogecoinGameEscrow(
  {
    betAmountDOGE: 100,
    player1Address: 'DH5...',
    player2Address: 'DJ3...',
    hostEncryptionKey: DogecoinGameEscrow.generateHostEncryptionKey(),
    network: 'mainnet'
  },
  utxoProvider,
  broadcastProvider
);

const escrowAddress = await escrow.createEscrowWallet();
console.log('🐕 Escrow address:', escrowAddress);

await escrow.canStartGame();
await escrow.distributePot('DH5...'); // Winner address

// Smart contract escrow (2-of-3 multisig)
const multiSigEscrow = new DogecoinEscrowMultiSig('mainnet');

const escrowData = multiSigEscrow.createMultiSigEscrow({
  player1PubKey: Buffer.from('...', 'hex'),
  player2PubKey: Buffer.from('...', 'hex'),
  serverPubKey: Buffer.from('...', 'hex'),
  betAmountKoinus: 10000000000 // 100 DOGE
});

console.log('🐕 Multisig escrow address:', escrowData.address);
```

## Dogecoin Network Details

### Network Parameters
- **Block Time**: ~1 minute (much fast!)
- **Block Reward**: 10,000 DOGE per block (wow!)
- **Max Supply**: None (infinite supply, such abundance!)
- **Fees**: Very low (typically 1 DOGE per transaction)
- **Algorithm**: Scrypt (merged mining with Litecoin)

### Address Formats

#### Mainnet
- **P2PKH**: Starts with 'D' (e.g., `DH5yaieqoZN36fDVciNyRueRGvGLR3mr7L`)
- **P2SH**: Starts with '9' or 'A' (e.g., `9vtSZcP6dR9YZ9BH6f1CZ34bPFfB1eRn5G`)

#### Testnet
- **P2PKH**: Starts with 'n'
- **P2SH**: Different prefix

### Currency Units
- 1 DOGE = 100,000,000 koinus (like satoshis for Bitcoin)
- Typical fee: 1 DOGE
- Dust limit: 0.01 DOGE

## Smart Contract Capabilities

Dogecoin inherited Bitcoin Script but hasn't implemented newer features:

### Supported
- Multi-signature (2-of-3, 3-of-5, etc.)
- Time locks (`OP_CHECKLOCKTIMEVERIFY`)
- Hash verification (`OP_SHA256`, `OP_HASH160`)
- P2SH scripts

### Not Yet Supported
- SegWit (no Bech32 addresses)
- Taproot (no Schnorr signatures)
- Advanced witness programs

### Bridge Solutions
For advanced smart contracts, consider:
- **Dogethereum**: Ethereum-compatible wrapped DOGE
- **RenVM**: Cross-chain DOGE on Ethereum
- **Wrapped DOGE**: ERC-20 representation

## Transaction Fees

Dogecoin is known for very low fees:

```typescript
// Typical Dogecoin transaction
const fee = 1.0; // DOGE (fixed)
const feeInKoinus = 100000000;

// Much cheaper than Bitcoin!
// Very affordable! Wow!
```

## Community & Culture

Dogecoin has a unique, fun-loving community:
- 🐕 "Much wow!" - Expression of amazement
- "To the moon!" - Price enthusiasm
- "Do Only Good Everyday" - Community motto
- Tipping culture - Used extensively for tipping content creators

## UTXO Model

Like Bitcoin, Dogecoin uses UTXOs:

```typescript
// Example UTXO
const utxo = {
  txid: '1a2b3c...',
  vout: 0,
  value: 10000000000, // 100 DOGE in koinus
  scriptPubKey: '76a914...' // hex
};
```

## Network Configuration

### Mainnet
- RPC: Various public nodes
- Explorer: https://dogechain.info/
- Symbol: DOGE

### Testnet
- RPC: testnet nodes
- Explorer: https://sochain.com/DOGETEST
- Symbol: DOGETEST

## Blockchain APIs

For UTXO fetching and broadcasting:
- **SoChain**: https://sochain.com/api/
- **Blockchair**: https://blockchair.com/dogecoin
- **Dogechain**: https://dogechain.info/api/
- **BlockCypher**: https://www.blockcypher.com/dev/dogecoin/

## Security

- **Private Keys**: Always keep WIF keys server-side
- **UTXO Management**: Consolidate UTXOs to reduce transaction size
- **Multi-sig**: Use 2-of-3 for trustless escrow
- **Validation**: Always verify addresses before sending
- **Much secure!**: Implement proper anti-cheat mechanisms

## Dependencies

```json
{
  "bitcoinjs-lib": "^6.x",
  "ecpair": "^2.x",
  "tiny-secp256k1": "^2.x",
  "crypto": "node built-in"
}
```

## Fun Facts

- 🐕 Created in 2013 as a joke based on the "Doge" meme
- 📈 Market cap has reached billions of dollars
- 🚀 Elon Musk's favorite cryptocurrency
- 🏎️ Sponsored a NASCAR race car
- 🎁 Used extensively for tipping on social media
- 🌙 Community goal: "To the moon!"

## Resources

- [Dogecoin Official Website](https://dogecoin.com/)
- [Dogecoin GitHub](https://github.com/dogecoin/dogecoin)
- [Dogecoin Reddit](https://www.reddit.com/r/dogecoin/)
- [Dogechain Explorer](https://dogechain.info/)
- [SoChain API](https://sochain.com/api/)
- [Much Manual!](https://dogecoin.com/)

## Meme Integration

For maximum authenticity, all console logs include Doge-speak:
- "Much wow!" - Success
- "Very crypto!" - Blockchain operation
- "Such secure!" - Security feature
- "Many coins!" - Large amounts
- "So transaction!" - Transaction created

---

**Remember**: Much development! Very code! Wow! 🐕🚀🌙
