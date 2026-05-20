# Stellar Lumens (XLM) Distribution Engines

This directory contains optimized TypeScript implementations for distributing XLM rewards and managing escrow for gaming applications on the Stellar blockchain.

## 📁 Structure

```
XLM.StellarLumens/
├── XLM.StellarLumens.rewards.manual.ts           # Server-managed reward distribution
├── XLM.StellarLumens.rewards.smartContract.ts    # Smart contract-based rewards (Soroban)
├── XLM.StellarLumens.escrow.manual.ts            # Server-managed escrow system
├── XLM.StellarLumens.escrow.smartContract.ts     # Smart contract-based escrow (Soroban)
├── index.ts                                       # Main exports
└── README.md                                      # This file
```

## 🎯 Distribution Mechanisms

### 1. Manual Rewards (`XLM.StellarLumens.rewards.manual.ts`)

Server-controlled reward distribution using the Stellar SDK.

**Features:**
- Direct XLM payments
- Custom asset support
- Federated address resolution (e.g., `user*stellar.org`)
- Address validation
- Balance checking
- Network support: Public (Mainnet), Testnet

**Key Classes:**
- `StellarRewarder`: Core reward distribution logic
- `GameRewardManager`: Game session and score management
- `StellarService`: Blockchain interaction wrapper
- `AddressResolver`: Address validation and federation resolution

**Example Usage:**
```typescript
import { GameRewardManager } from '@currencyCore/distributionEngines';

const config = {
  rewardThreshold: 10000,
  rewardAmount: '10',
  tickerSymbol: 'XLM',
  network: 'public',
};

const walletConfig = {
  secretKey: process.env.STELLAR_REWARD_SECRET_KEY,
  network: 'public',
};

const manager = new GameRewardManager(config, walletConfig);

// Start game
const { success, address, sessionId } = await manager.startGame('G...');

// Update score and auto-reward
const result = await manager.updateScore(address, 10000);
if (result.rewardSent) {
  console.log(`Reward sent! TX: ${result.txHash}`);
}
```

### 2. Smart Contract Rewards (`XLM.StellarLumens.rewards.smartContract.ts`)

On-chain reward distribution via Soroban smart contracts.

**Features:**
- Rust/WASM Soroban contract
- Player registration system
- On-chain score tracking
- Claim-based reward distribution
- Contract funding and management
- Active/inactive state control

**Key Components:**
- `game_reward_contract.rs`: Soroban smart contract (Rust)
- `StellarSmartContractRewarder`: TypeScript client

**Example Usage:**
```typescript
import { StellarSmartContractRewarder } from '@currencyCore/distributionEngines';

const config = {
  contractId: 'C...',
  network: 'public',
};

const rewarder = new StellarSmartContractRewarder(config);

// Register player
await rewarder.registerPlayer(playerSecretKey);

// Update score
await rewarder.updateScore(playerSecretKey, 10000);

// Claim reward
await rewarder.claimReward(playerSecretKey);
```

### 3. Manual Escrow (`XLM.StellarLumens.escrow.manual.ts`)

Server-managed escrow for peer-to-peer gaming with encrypted keypairs.

**Features:**
- Random keypair generation
- AES-256-GCM encryption
- Multi-player support
- Deposit monitoring
- Automatic pot distribution
- Minimum reserve handling (1 XLM)
- Network support: Public (Mainnet), Testnet

**Key Classes:**
- `StellarGameEscrow`: Core escrow logic
- `GameServer`: Match management

**Example Usage:**
```typescript
import { GameServer } from '@currencyCore/distributionEngines';

const config = {
  buyInAmount: 10,
  network: 'public',
  maxPlayers: 2,
};

const server = new GameServer(config, process.env.MACHINE_SECRET);

// Create match
const match = await server.createMatch();
console.log(`Escrow address: ${match.escrowPublicKey}`);

// Players join
server.joinMatch(match.matchId, 'GPlayer1...');
server.joinMatch(match.matchId, 'GPlayer2...');

// Check deposits
const ready = await server.checkMatchReady(match.matchId);

// Settle match
if (ready) {
  const result = await server.settleMatch(match.matchId, 'GPlayer1...');
  console.log(`Winner paid! TX: ${result.txHash}`);
}
```

### 4. Smart Contract Escrow (`XLM.StellarLumens.escrow.smartContract.ts`)

On-chain escrow via Soroban smart contracts for trustless multiplayer games.

**Features:**
- Soroban escrow contract (Rust)
- Automatic game start when deposits complete
- On-chain winner declaration
- Automatic pot distribution
- Game state tracking
- Reset functionality

**Key Components:**
- `game_escrow_contract.rs`: Soroban smart contract (Rust)
- `StellarEscrowContractClient`: TypeScript client

**Example Usage:**
```typescript
import { StellarEscrowContractClient } from '@currencyCore/distributionEngines';

const config = {
  contractId: 'C...',
  network: 'public',
};

const client = new StellarEscrowContractClient(config);

// Players join and deposit
await client.joinGame(player1SecretKey, 10.0);
await client.joinGame(player2SecretKey, 10.0);

// Check if game started
const started = await client.isGameActive();

// Declare winner
if (started) {
  await client.declareWinner(ownerSecretKey, 'GPlayer1...');
}
```

## 🔐 Security Considerations

### Manual Implementations
- **Secret Key Storage**: Use environment variables or secure vaults (never hardcode)
- **Keypair Encryption**: AES-256-GCM for escrow secret keys
- **Machine Secrets**: Use unique, strong secrets for each deployment
- **Key Cleanup**: Delete escrow keys after distribution
- **Minimum Reserve**: Stellar accounts require 1 XLM minimum balance

### Smart Contract Implementations
- **Auditing**: Thoroughly audit Soroban contracts before mainnet deployment
- **Testing**: Test extensively on Testnet
- **Owner Control**: Secure owner secret keys (used for admin functions)
- **Payment Validation**: Contracts validate payment amounts

## 📦 Dependencies

```json
{
  "stellar-sdk": "^11.0.0"
}
```

## 🌐 Network Support

### Public Network (Mainnet)
- **Horizon URL**: `https://horizon.stellar.org`
- **Soroban RPC**: `https://soroban-rpc.stellar.org`
- **Explorer**: `https://stellarchain.io`
- **Network Passphrase**: `Public Global Stellar Network ; September 2015`

### Testnet
- **Horizon URL**: `https://horizon-testnet.stellar.org`
- **Soroban RPC**: `https://soroban-testnet.stellar.org`
- **Explorer**: `https://testnet.stellarchain.io`
- **Network Passphrase**: `Test SDF Network ; September 2015`
- **Friendbot (Faucet)**: `https://friendbot.stellar.org`

## 🚀 Deployment

### Smart Contracts (Soroban)

1. **Install Soroban CLI**:
   ```bash
   cargo install --locked soroban-cli
   ```

2. **Build Contract**:
   ```bash
   cd contract
   cargo build --target wasm32-unknown-unknown --release
   ```

3. **Deploy to Testnet**:
   ```bash
   soroban contract deploy \
     --wasm target/wasm32-unknown-unknown/release/contract.wasm \
     --source <SECRET_KEY> \
     --rpc-url https://soroban-testnet.stellar.org \
     --network-passphrase "Test SDF Network ; September 2015"
   ```

### TypeScript Clients

```bash
npm install stellar-sdk
```

Set environment variables:
```bash
export STELLAR_REWARD_SECRET_KEY="S..."
export STELLAR_OWNER_SECRET_KEY="S..."
export MACHINE_SECRET="your_machine_secret"
```

## 💡 Best Practices

1. **Start with Testnet**: Always test on Testnet before Public network
2. **Fee Management**: Stellar uses dynamic base fees (~100 stroops default)
3. **Error Handling**: Implement comprehensive error handling and logging
4. **Transaction Confirmation**: Wait for ledger confirmation before proceeding
5. **Balance Checks**: Always verify sufficient balance before transactions
6. **Minimum Reserve**: Accounts need 1 XLM + (0.5 XLM × number of entries)
7. **Rate Limiting**: Respect Horizon API rate limits
8. **Federation**: Use federated addresses for better UX (e.g., `user*domain.com`)
9. **Asset Codes**: Stellar assets have 1-12 character codes

## 🌟 Stellar Blockchain Features

- **Fast Finality**: 3-5 second confirmation times
- **Low Fees**: Fractions of a cent per transaction
- **Built-in DEX**: Decentralized exchange on-chain
- **Multi-signature**: Native multi-sig support
- **Atomic Swaps**: Path payments for instant swaps
- **Anchors**: Fiat on/off ramps
- **SEP Standards**: Stellar Ecosystem Proposals for interoperability
- **Soroban**: WebAssembly-based smart contract platform

## 📚 Additional Resources

- [Stellar Documentation](https://developers.stellar.org/)
- [Stellar SDK Documentation](https://stellar.github.io/js-stellar-sdk/)
- [Soroban Documentation](https://soroban.stellar.org/docs)
- [Stellar Laboratory](https://laboratory.stellar.org/)
- [Stellar Explorer](https://stellarchain.io/)
- [SEP Standards](https://github.com/stellar/stellar-protocol/tree/master/ecosystem)

## 🤝 Integration

These engines are designed to integrate with:
- **WebRTC**: For real-time peer-to-peer gaming
- **Colyseus**: For multiplayer game server management
- **Express/Fastify**: As REST API endpoints
- **Socket.io**: For real-time communication

## 📝 License

Part of the loginStandard project. See project root for license information.

