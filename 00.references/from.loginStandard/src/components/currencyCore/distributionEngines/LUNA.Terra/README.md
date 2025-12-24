# Terra (LUNA) Distribution Engines

**The Decentralized Economy Platform** - Programmable money for the internet

This directory contains distribution engine implementations for Terra, providing both reward distribution and escrow functionality for gaming applications.

## Features

### Manual Rewards
- Direct wallet-to-wallet LUNA transfers
- Terra 2.0 (Phoenix) blockchain support
- Feather.js SDK integration
- Score-based automatic reward distribution
- TNS (Terra Name Service) ready

### Smart Contract Rewards (CosmWasm)
- Rust-based CosmWasm smart contracts
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

### Smart Contract Escrow (CosmWasm)
- CosmWasm escrow contract
- On-chain pot management
- Server arbitration capability
- Atomic deposit and payout
- Refund mechanism

## Network Configuration

### Mainnet (Phoenix-1)
- **LCD**: `https://phoenix-lcd.terra.dev`
- **Chain ID**: `phoenix-1`
- **Symbol**: LUNA
- **Gas Price**: 0.015 uluna
- **Consensus**: Tendermint

### Testnet (Pisco-1)
- **LCD**: `https://pisco-lcd.terra.dev`
- **Chain ID**: `pisco-1`
- **Faucet**: https://faucet.terra.money/

## Usage

### Manual Rewards

\`\`\`typescript
import { 
  GameRewardManager,
  GameConfig,
  WalletConfig 
} from './LUNA.Terra';

const gameConfig: GameConfig = {
  rewardThreshold: 10000,
  rewardAmount: '10',  // 10 LUNA
  tickerSymbol: 'LUNA',
  network: 'mainnet'
};

const walletConfig: WalletConfig = {
  mnemonic: process.env.TERRA_MNEMONIC!,
  chainID: 'phoenix-1',
  lcdUrl: 'https://phoenix-lcd.terra.dev',
  network: 'mainnet'
};

const gameManager = new GameRewardManager(gameConfig, walletConfig);

await gameManager.startGame('terra1abc...');
await gameManager.updateScore('terra1abc...', 10000);
\`\`\`

### Smart Contract Rewards

\`\`\`typescript
import { TerraSmartContractRewarder } from './LUNA.Terra';

const rewarder = new TerraSmartContractRewarder(
  process.env.TERRA_MNEMONIC!,
  {
    admin: 'terra1admin...',
    highScoreReward: '10000000',  // 10 LUNA in uluna
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

Terra uses CosmWasm for smart contract functionality:

### Building Contracts

\`\`\`bash
# Install Rust and cargo-generate
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
cargo install cargo-generate

# Build the contract
cargo wasm

# Optimize for deployment
docker run --rm -v "$(pwd)":/code \
  --mount type=volume,source="$(basename "$(pwd)")_cache",target=/code/target \
  --mount type=volume,source=registry_cache,target=/usr/local/cargo/registry \
  cosmwasm/rust-optimizer:0.12.13
\`\`\`

### Deploying Contracts

\`\`\`bash
# Upload contract
terrad tx wasm store artifacts/contract.wasm \\
  --from wallet \\
  --chain-id phoenix-1 \\
  --gas auto \\
  --fees 100000uluna

# Instantiate contract
terrad tx wasm instantiate CODE_ID '{}' \\
  --from wallet \\
  --label "game-reward-v1" \\
  --chain-id phoenix-1 \\
  --gas auto \\
  --fees 100000uluna
\`\`\`

## Key Advantages

- **Fast Finality**: ~6 second block time
- **Low Fees**: Microtransactions possible
- **CosmWasm**: Secure smart contract platform
- **IBC Compatible**: Inter-blockchain communication
- **Stablecoin Ecosystem**: Terra Classic legacy
- **Cosmos SDK**: Built on proven technology

## Address Format

Terra addresses use Bech32 encoding:
- **Prefix**: `terra`
- **Format**: `terra1` + 38 characters
- **Example**: `terra1x46rqay4d3cssq8gxxvqz8xt6nwlz4td20k38v`

## Dependencies

\`\`\`json
{
  "@terra-money/feather.js": "^1.x",
  "@terra-money/terra.proto": "^2.x",
  "crypto": "node built-in"
}
\`\`\`

## Resources

- [Terra Docs](https://docs.terra.money/)
- [Terra Finder](https://finder.terra.money/)
- [CosmWasm Docs](https://docs.cosmwasm.com/)
- [Feather.js Docs](https://github.com/terra-money/feather.js)

---

**The Decentralized Economy Platform** - Build programmable gaming experiences on Terra.
