# Binance (BNB) Distribution Engines

This directory contains distribution engine implementations for BNB Smart Chain (BSC), providing both reward distribution and escrow functionality for gaming applications.

## Contents

### Reward Systems
- **BNB.Binance.rewards.manual.ts**: Server-side manual reward distribution
- **BNB.Binance.rewards.smartContract.ts**: Solidity smart contract-based rewards

### Escrow Systems
- **BNB.Binance.escrow.manual.ts**: Server-managed escrow for peer-to-peer gaming
- **BNB.Binance.escrow.smartContract.ts**: Solidity smart contract-based escrow

## Features

### Manual Rewards
- Direct wallet-to-wallet BNB transfers
- BEP-20 token support (ERC-20 compatible)
- Score-based automatic reward distribution
- Secure private key management (server-side only)
- Support for both mainnet and testnet

### Smart Contract Rewards
- Solidity-based on-chain contracts
- Server-signed attestations for validation
- Trustless reward distribution
- Claim-based reward mechanism
- Prevents double-claiming

### Manual Escrow
- AES-256-GCM encrypted private key storage
- Server-controlled pot distribution
- Two-player game support
- Automatic deposit verification
- Gas-optimized payouts

### Smart Contract Escrow
- Solidity-based escrow contract
- On-chain pot management
- Server-signed winner verification
- Refund mechanism for cancelled games
- Immutable game rules

## Usage

```typescript
import { 
  BinanceRewarder, 
  BinanceGameRewardManager,
  BinanceGameEscrow,
  BinanceSmartContractRewarder
} from './BNB.Binance';

// Manual rewards (native BNB)
const rewarder = new BinanceRewarder('mainnet', 'bsc');
const gameManager = new BinanceGameRewardManager(
  {
    rewardThreshold: 100,
    rewardAmount: '0.01',
    network: 'mainnet',
    chain: 'bsc'
  },
  {
    privateKey: process.env.BSC_PRIVATE_KEY!,
    network: 'mainnet',
    chain: 'bsc'
  }
);

await gameManager.initialize();
await gameManager.startGame('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');

// Manual rewards (BEP-20 tokens)
const tokenGameManager = new BinanceGameRewardManager(
  {
    rewardThreshold: 100,
    rewardAmount: '10',
    network: 'mainnet',
    chain: 'bsc'
  },
  {
    privateKey: process.env.BSC_PRIVATE_KEY!,
    network: 'mainnet',
    chain: 'bsc'
  },
  {
    address: '0x...',  // BEP-20 token contract
    decimals: 18,
    symbol: 'GAME'
  }
);

// Manual escrow
const escrow = new BinanceGameEscrow({
  betAmount: '0.01',
  player1Address: '0x...',
  player2Address: '0x...',
  hostEncryptionKey: BinanceGameEscrow.generateHostEncryptionKey(),
  network: 'mainnet'
});

const escrowAddress = await escrow.createEscrowWallet();
await escrow.canStartGame();
await escrow.distributePot('0x...');

// Smart contract rewards
const smartRewarder = new BinanceSmartContractRewarder(
  process.env.SERVER_PRIVATE_KEY!,
  '0x...', // deployed contract address
  'mainnet'
);

await smartRewarder.initialize();
await smartRewarder.rewardUser('0x...', '0.01', playerPrivateKey);
```

## Network Configuration

### BNB Smart Chain (BSC)
- **Mainnet RPC**: `https://bsc-dataseed.binance.org/`
- **Testnet RPC**: `https://data-seed-prebsc-1-s1.binance.org:8545/`
- **Chain ID (Mainnet)**: 56
- **Chain ID (Testnet)**: 97

### BNB Beacon Chain
- Requires `@binance-chain/javascript-sdk`
- Different architecture (Tendermint-based)
- Not covered in current implementation

## Smart Contracts

### Reward Contract Features
- Server signature verification
- Single-claim enforcement
- Native BNB rewards
- EVM-compatible (can be extended for BEP-20)

### Escrow Contract Features
- Two-player deposit verification
- Server-verified winner payout
- Refund mechanism
- Event emission for tracking

### Deploying Contracts

```bash
# Install Hardhat
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# Compile contracts
npx hardhat compile

# Deploy to BSC Testnet
npx hardhat run scripts/deploy.js --network bscTestnet

# Deploy to BSC Mainnet
npx hardhat run scripts/deploy.js --network bscMainnet
```

## Security

- **Private Keys**: Always keep private keys server-side
- **Encryption**: Use strong encryption keys for stored data
- **Gas Management**: Account for gas costs in escrow distributions
- **Signature Verification**: Verify all server signatures on-chain
- **Anti-cheat**: Implement proper game validation before rewards
- **Contract Audits**: Audit smart contracts before mainnet deployment

## Token Standards

### BEP-20 (BSC)
- ERC-20 compatible token standard
- Used for game tokens, rewards, etc.
- Requires contract address and decimals

### BEP-2 (Beacon Chain)
- Native Binance Chain token standard
- Different SDK required
- Not covered in current implementation

## Gas Optimization

- Use appropriate gas limits (21000 for simple transfers)
- Monitor gas prices and adjust accordingly
- Consider gas tokens for high-volume operations
- Batch transactions when possible

## Dependencies

```json
{
  "ethers": "^6.x",
  "crypto": "node built-in"
}
```

## Resources

- [BNB Smart Chain Documentation](https://docs.bnbchain.org/)
- [BEP-20 Token Standard](https://github.com/bnb-chain/BEPs/blob/master/BEP20.md)
- [BSC Testnet Faucet](https://testnet.bnbchain.org/faucet-smart)
- [BscScan Explorer](https://bscscan.com/)
