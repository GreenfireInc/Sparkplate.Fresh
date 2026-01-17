# Terra Classic (LUNC) Distribution Engines

**The Original Terra Blockchain** - Community-driven decentralized finance

This directory contains distribution engine implementations for Terra Classic, providing both reward distribution and escrow functionality for gaming applications.

## Features

### Manual Rewards
- Direct wallet-to-wallet LUNC transfers
- Columbus-5 blockchain support
- Terra.js SDK integration
- Score-based automatic reward distribution
- Higher gas price configuration for Terra Classic

### Smart Contract Rewards (CosmWasm 0.16)
- Rust-based CosmWasm 0.16 smart contracts
- Server-signed attestations
- Trustless reward distribution
- On-chain verification
- Claim-based mechanism

### Manual Escrow
- AES-256-GCM encrypted mnemonic storage
- Server-controlled pot distribution
- Two-player game support
- Automatic deposit detection
- Winner payout

### Smart Contract Escrow (CosmWasm 0.16)
- CosmWasm 0.16 escrow contract
- On-chain pot management
- Server arbitration capability
- Atomic deposit and payout
- Refund mechanism

## Network Configuration

### Mainnet (Columbus-5)
- **LCD**: `https://terra-classic-lcd.publicnode.com`
- **Chain ID**: `columbus-5`
- **Symbol**: LUNC
- **Gas Price**: 28.325 uluna (higher than Terra 2.0)
- **Consensus**: Tendermint

### Testnet (Bombay-12)
- **LCD**: `https://bombay-lcd.terra.dev`
- **Chain ID**: `bombay-12`
- **Gas Price**: 0.15 uluna
- **Faucet**: Community-run faucets

## Usage

### Manual Rewards

\`\`\`typescript
import { 
  GameRewardManager,
  GameConfig,
  WalletConfig 
} from './LUNC.TerraClassic';

const gameConfig: GameConfig = {
  rewardThreshold: 10000,
  rewardAmount: '100',  // 100 LUNC
  tickerSymbol: 'LUNC',
  network: 'mainnet'
};

const walletConfig: WalletConfig = {
  mnemonic: process.env.LUNC_MNEMONIC!,
  network: 'mainnet'
};

const gameManager = new GameRewardManager(gameConfig, walletConfig);

await gameManager.startGame('terra1abc...');
await gameManager.updateScore('terra1abc...', 10000);
\`\`\`

### Smart Contract Rewards

\`\`\`typescript
import { TerraClassicSmartContractRewarder } from './LUNC.TerraClassic';

const rewarder = new TerraClassicSmartContractRewarder(
  process.env.LUNC_MNEMONIC!,
  {
    admin: 'terra1admin...',
    highScoreReward: '100000000',  // 100 LUNC in uluna
    rewardDenom: 'uluna',
    network: 'mainnet'
  }
);

// Deploy contract (one time)
const contractAddress = await rewarder.deployRewardContract(codeId);

// Attest player score
const attestation = rewarder.attestPlayerScore(
  'terra1player...',
  10000,
  serverPrivateKey
);

// Player submits score
await rewarder.submitPlayerScore(playerMnemonic, 10000, attestation);
\`\`\`

## CosmWasm Smart Contracts

Terra Classic uses CosmWasm 0.16 for smart contract functionality:

### Building Contracts

\`\`\`bash
# Install Rust and cargo-generate
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
cargo install cargo-generate

# Create new contract from template
cargo generate --git https://github.com/CosmWasm/cosmwasm-template.git --name game-contract

# Build the contract (ensure CosmWasm 0.16 in Cargo.toml)
cargo wasm

# Optimize for deployment
docker run --rm -v "$(pwd)":/code \\
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \\
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \\
  cosmwasm/rust-optimizer:0.12.6
\`\`\`

### Deploying Contracts

\`\`\`bash
# Upload contract to Columbus-5
terrad tx wasm store artifacts/contract.wasm \\
  --from wallet \\
  --chain-id columbus-5 \\
  --gas-prices 28.325uluna \\
  --gas auto \\
  --gas-adjustment 1.75

# Instantiate contract
terrad tx wasm instantiate CODE_ID '{}' \\
  --from wallet \\
  --label "game-reward-v1" \\
  --chain-id columbus-5 \\
  --gas-prices 28.325uluna \\
  --gas auto \\
  --gas-adjustment 1.75
\`\`\`

## Key Differences from Terra 2.0

| Feature | Terra Classic (LUNC) | Terra 2.0 (LUNA) |
|---------|----------------------|------------------|
| Chain ID | columbus-5 | phoenix-1 |
| Token | LUNC | LUNA |
| Gas Price | 28.325 uluna | 0.015 uluna |
| CosmWasm | 0.16 | 1.3+ |
| Status | Community-maintained | Official |

## Important Notes

⚠️ **High Gas Prices**: Terra Classic has significantly higher gas prices than Terra 2.0

💰 **Community Driven**: Terra Classic is maintained by the community after the UST depeg event

🔄 **Legacy Chain**: This is the original Terra blockchain (pre-fork)

📉 **Token Economics**: LUNC has different tokenomics than the new LUNA

## Address Format

Terra Classic addresses use Bech32 encoding (same as Terra 2.0):
- **Prefix**: `terra`
- **Format**: `terra1` + 38 characters
- **Example**: `terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v`

## Dependencies

\`\`\`json
{
  "@terra-money/terra.js": "^3.x",
  "crypto": "node built-in"
}
\`\`\`

## Resources

- [Terra Classic Docs](https://docs.terra.money/docs/develop/terrain/terrain.html)
- [Terra Classic Finder](https://finder.terra.money/classic)
- [Terra Classic Station](https://station.terra.money/)
- [Community Forum](https://agora.terra.money/)

---

**The Original Terra Blockchain** - Build gaming experiences on the community-driven Terra Classic.
