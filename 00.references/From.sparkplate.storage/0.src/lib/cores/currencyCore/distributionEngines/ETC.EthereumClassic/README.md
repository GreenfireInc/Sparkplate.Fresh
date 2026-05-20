# Ethereum Classic (ETC) Distribution Engines

**"Code is Law"** - Immutable blockchain technology

This directory contains distribution engine implementations for Ethereum Classic, providing both reward distribution and escrow functionality for gaming applications.

## Contents

### Reward Systems
- **ETC.EthereumClassic.rewards.manual.ts**: Server-side manual reward distribution
- **ETC.EthereumClassic.rewards.smartContract.ts**: Solidity smart contract-based rewards

### Escrow Systems
- **ETC.EthereumClassic.escrow.manual.ts**: Server-managed escrow for peer-to-peer gaming
- **ETC.EthereumClassic.escrow.smartContract.ts**: Solidity smart contract-based escrow

## What is Ethereum Classic?

Ethereum Classic is the original Ethereum blockchain that continued after the 2016 DAO fork. It maintains the principle of **"Code is Law"** - immutability above all else.

### Key Principles
- **Immutability**: Smart contracts cannot be changed
- **Decentralization**: No central authority
- **Code is Law**: Smart contract code is the ultimate authority

## Features

### Manual Rewards
- Direct wallet-to-wallet ETC transfers
- ERC-20 token support
- Score-based automatic reward distribution
- Secure private key management (server-side only)

### Smart Contract Rewards
- Solidity-based on-chain contracts
- Server-signed attestations for validation
- Trustless reward distribution
- Claim-based mechanism with double-claim prevention

### Manual Escrow
- AES-256-GCM encrypted private key storage
- Server-controlled pot distribution
- Two-player game support
- Gas-optimized payouts

### Smart Contract Escrow
- Solidity-based escrow contract
- On-chain pot management
- Server-verified winner payout
- Refund mechanism for cancelled games
- Immutable game rules

## Usage

```typescript
import { 
  EthereumClassicRewarder, 
  EthereumClassicGameRewardManager,
  EthereumClassicGameEscrow,
  EthereumClassicSmartContractRewarder
} from './ETC.EthereumClassic';

// Manual rewards (native ETC)
const rewarder = new EthereumClassicRewarder('mainnet');
const gameManager = new EthereumClassicGameRewardManager(
  {
    rewardThreshold: 100,
    rewardAmount: '0.1',
    network: 'mainnet'
  },
  {
    privateKey: process.env.ETC_PRIVATE_KEY!,
    network: 'mainnet'
  }
);

await gameManager.initialize();
await gameManager.startGame('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');

// Manual escrow
const escrow = new EthereumClassicGameEscrow({
  betAmount: '1.0',
  player1Address: '0x...',
  player2Address: '0x...',
  hostEncryptionKey: EthereumClassicGameEscrow.generateHostEncryptionKey(),
  network: 'mainnet'
});

const escrowAddress = await escrow.createEscrowWallet();
await escrow.canStartGame();
await escrow.distributePot('0x...');

// Smart contract rewards
const smartRewarder = new EthereumClassicSmartContractRewarder(
  process.env.SERVER_PRIVATE_KEY!,
  '0x...', // deployed contract address
  'mainnet'
);

await smartRewarder.initialize();
await smartRewarder.rewardUser('0x...', '0.5', playerPrivateKey);
```

## Network Configuration

### Mainnet
- **RPC**: `https://etc.rivet.link`
- **Chain ID**: 61
- **Symbol**: ETC
- **Explorer**: https://blockscout.com/etc/mainnet/

### Testnet (Mordor)
- **RPC**: `https://rpc.mordor.etccooperative.org`
- **Chain ID**: 63
- **Symbol**: METC
- **Explorer**: https://explorer.mordor.etclabs.org/
- **Faucet**: https://easy.hebeswap.com/#/faucet

## EVM Compatibility

Ethereum Classic is fully EVM-compatible:
- **Solidity Support**: Full compatibility
- **Web3 API**: Standard Ethereum JSON-RPC
- **Tooling**: Works with Hardhat, Truffle, Remix
- **Addresses**: Same 0x format as Ethereum

## Smart Contract Development

### Deployment

```bash
# Install Hardhat
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# Compile contracts
npx hardhat compile

# Deploy to Mordor (testnet)
npx hardhat run scripts/deploy.js --network mordor

# Deploy to Mainnet
npx hardhat run scripts/deploy.js --network mainnet
```

### Hardhat Config

```javascript
module.exports = {
  networks: {
    mainnet: {
      url: 'https://etc.rivet.link',
      chainId: 61,
      accounts: [process.env.PRIVATE_KEY]
    },
    mordor: {
      url: 'https://rpc.mordor.etccooperative.org',
      chainId: 63,
      accounts: [process.env.PRIVATE_KEY]
    }
  }
};
```

## Gas and Fees

ETC typically has lower fees than Ethereum:

```typescript
// Get current gas price
const feeData = await provider.getFeeData();
const gasPrice = feeData.gasPrice;

// Typical transfer: 21000 gas
// Smart contract calls: varies
```

## History and Philosophy

### The DAO Fork (2016)
- Ethereum forked to reverse the DAO hack
- Ethereum Classic chose immutability
- "Code is Law" became the defining principle

### Key Differences from Ethereum
- **No PoS**: Stays with Proof-of-Work
- **Smaller Market Cap**: More focused community
- **Original Chain**: Continues from genesis block
- **Immutability**: Strict adherence to principle

## Security

- **Private Keys**: Always keep private keys server-side
- **Smart Contracts**: Audit thoroughly before deployment
- **Immutability**: Once deployed, contracts cannot be changed
- **Gas Management**: Account for gas costs
- **51% Attacks**: ETC has experienced these; consider confirmation depth

### Best Practices
1. Wait for deep confirmations (10+ blocks)
2. Audit all smart contracts
3. Test extensively on Mordor testnet
4. Implement proper anti-cheat mechanisms
5. Monitor for chain reorganizations

## Token Standards

### ERC-20 Tokens
- Standard token interface
- Compatible with Ethereum ERC-20
- Used for game tokens, rewards

## Community and Ecosystem

### Core Values
- **Decentralization**: No central authority
- **Immutability**: Smart contracts are law
- **Censorship Resistance**: Unstoppable applications

### Resources
- [Official Website](https://ethereumclassic.org/)
- [GitHub](https://github.com/ethereumclassic)
- [Discord](https://ethereumclassic.org/discord)
- [Reddit](https://www.reddit.com/r/EthereumClassic/)

## Mining

ETC uses Proof-of-Work (Ethash):
- ASIC-resistant (initially)
- GPU-mineable
- Block time: ~13 seconds
- Block reward: 3.2 ETC + fees

## Differences from Ethereum

| Feature | Ethereum Classic | Ethereum |
|---------|-----------------|----------|
| Consensus | Proof-of-Work | Proof-of-Stake |
| Philosophy | Code is Law | Social Consensus |
| Forks | Avoided | Accepted |
| Market Cap | Smaller | Larger |
| Development | Conservative | Progressive |

## Dependencies

```json
{
  "ethers": "^6.x",
  "crypto": "node built-in"
}
```

## Explorer APIs

- **BlockScout**: https://blockscout.com/etc/mainnet/api
- **ETC Cooperative**: Various public nodes
- **Rivet**: https://etc.rivet.link

## Notable Projects on ETC

- DeFi protocols
- NFT marketplaces  
- DAOs and governance
- Gaming applications

## Advantages for Gaming

1. **Lower Fees**: Typically cheaper than Ethereum
2. **Immutability**: Game rules are truly permanent
3. **EVM Compatibility**: Easy to port from Ethereum
4. **Proven Technology**: Battle-tested blockchain
5. **PoW Security**: Proven consensus mechanism

## Disadvantages to Consider

1. **Smaller Community**: Less developer support
2. **51% Attacks**: Has experienced in the past
3. **Market Volatility**: Smaller market cap
4. **Slower Development**: More conservative approach

---

**"Code is Law"** - Build immutable, trustless gaming experiences on Ethereum Classic.
