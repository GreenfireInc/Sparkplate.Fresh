# Solana (SOL) Distribution Engines

**The High-Performance Blockchain** - Fast, low-cost, and scalable

This directory contains distribution engine implementations for Solana, providing both reward distribution and escrow functionality for gaming applications.

## Features

### Manual Rewards
- Direct wallet-to-wallet SOL transfers
- SPL token support
- Solana Name Service (.sol) resolution
- Score-based automatic reward distribution
- Sub-second finality

### Smart Contract Rewards (Anchor)
- Rust-based Anchor programs
- Server-signed attestations
- Trustless reward distribution
- On-chain verification
- Program Derived Addresses (PDAs)

### Manual Escrow
- AES-256-GCM encrypted secret key storage
- Server-controlled pot distribution
- Two-player game support
- Automatic deposit detection
- Winner payout

### Smart Contract Escrow (Anchor)
- Anchor-based escrow program
- On-chain pot management
- Server arbitration capability
- Atomic deposits and payouts
- Refund mechanism

## Network Configuration

### Mainnet Beta
- **RPC**: \`https://api.mainnet-beta.solana.com\`
- **Block Time**: ~400ms
- **Symbol**: SOL
- **Finality**: Confirmed (~400ms) or Finalized (~13s)

### Devnet
- **RPC**: \`https://api.devnet.solana.com\`
- **Faucet**: \`solana airdrop 2\` (CLI)
- **Symbol**: SOL (testnet)

### Testnet
- **RPC**: \`https://api.testnet.solana.com\`
- **Symbol**: SOL (testnet)

## Usage

### Manual Rewards

\`\`\`typescript
import { 
  GameRewardManager,
  GameConfig,
  WalletConfig 
} from './SOL.Solana';

// For SOL rewards
const gameConfig: GameConfig = {
  rewardThreshold: 10000,
  rewardAmount: '0.1',  // 0.1 SOL
  tickerSymbol: 'SOL',
  network: 'mainnet',
  currencyType: 'SOL'
};

// For SPL token rewards
const splConfig: GameConfig = {
  rewardThreshold: 10000,
  rewardAmount: '10',  // 10 tokens
  tickerSymbol: 'USDC',
  network: 'mainnet',
  currencyType: 'SPL',
  mintAddress: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',  // USDC
  decimals: 6
};

const walletConfig: WalletConfig = {
  secretKey: new Uint8Array(JSON.parse(process.env.SOLANA_SECRET_KEY!)),
  network: 'mainnet'
};

const gameManager = new GameRewardManager(gameConfig, walletConfig);

// Start game (supports .sol names)
await gameManager.startGame('alice.sol');
// or use base58 address
await gameManager.startGame('9x4...Base58');

await gameManager.updateScore('alice.sol', 10000);
\`\`\`

### Smart Contract Rewards

\`\`\`typescript
import { SolanaSmartContractRewarder } from './SOL.Solana';

const rewarder = new SolanaSmartContractRewarder(
  serverSecretKey,
  {
    programId: 'YourProgramID111111111111111111111111111111',
    admin: 'AdminPublicKey...',
    rewardAmount: '0.1',  // 0.1 SOL
    network: 'mainnet'
  }
);

// Initialize program (one time)
await rewarder.initializeRewardProgram();

// Attest player score
const attestation = rewarder.attestPlayerScore(
  'PlayerPublicKey...',
  10000,
  serverPrivateKey
);

// Player submits score
await rewarder.submitPlayerScore(playerSecretKey, 10000, attestation);
\`\`\`

## Anchor Programs

Solana uses Anchor for smart contract development:

### Building Programs

\`\`\`bash
# Install Anchor
cargo install --git https://github.com/coral-xyz/anchor --tag v0.28.0 anchor-cli

# Create new project
anchor init game-program

# Build
anchor build

# Deploy to devnet
anchor deploy --provider.cluster devnet

# Deploy to mainnet
anchor deploy --provider.cluster mainnet
\`\`\`

### Testing Programs

\`\`\`bash
# Run tests
anchor test

# Test on devnet
anchor test --provider.cluster devnet
\`\`\`

## Key Advantages

- **Ultra-Fast**: ~400ms block time
- **Low Fees**: Fraction of a cent per transaction
- **High Throughput**: 50,000+ TPS theoretical
- **Parallel Execution**: Sealevel runtime
- **Rust Programs**: Security and performance
- **SPL Tokens**: Native token standard

## Solana Name Service (SNS)

Solana supports human-readable addresses:
- **Format**: \`username.sol\`
- **Example**: \`alice.sol\` → \`9x4...Base58\`
- **Library**: \`@bonfida/spl-name-service\`

## Address Format

Solana addresses use base58 encoding:
- **Length**: 32-44 characters
- **Example**: \`9xQeWvG816bUx9EPjHmaT23yvVM2ZWbrrpZb9PusVFin\`

## Transaction Structure

Solana uses a unique transaction model:
- **Atomic**: All instructions succeed or all fail
- **Parallel**: Multiple transactions can execute simultaneously
- **Accounts**: Explicit account list for parallelization
- **Rent**: Accounts need rent exemption balance

## Dependencies

\`\`\`json
{
  "@solana/web3.js": "^1.x",
  "@solana/spl-token": "^0.3.x",
  "@bonfida/spl-name-service": "^0.1.x",
  "borsh": "^0.7.x",
  "crypto": "node built-in"
}
\`\`\`

## Resources

- [Solana Docs](https://docs.solana.com/)
- [Anchor Book](https://book.anchor-lang.com/)
- [Solana Explorer](https://explorer.solana.com/)
- [Solana Cookbook](https://solanacookbook.com/)

---

**The High-Performance Blockchain** - Build lightning-fast gaming experiences on Solana.
