# Waves (WAVES) Distribution Engines

This directory contains optimized TypeScript implementations for distributing WAVES rewards and managing escrow for gaming applications on the Waves blockchain.

## 📁 Structure

```
WAVES.Waves/
├── WAVES.Waves.rewards.manual.ts           # Server-managed reward distribution
├── WAVES.Waves.rewards.smartContract.ts    # Smart contract-based rewards (Ride)
├── WAVES.Waves.escrow.manual.ts            # Server-managed escrow system
├── WAVES.Waves.escrow.smartContract.ts     # Smart contract-based escrow (Ride)
├── index.ts                                 # Main exports
└── README.md                                # This file
```

## 🎯 Distribution Mechanisms

### 1. Manual Rewards (`WAVES.Waves.rewards.manual.ts`)

Server-controlled reward distribution using the Waves SDK.

**Features:**
- Direct WAVES transfers
- Custom asset support
- Alias resolution (e.g., `alias:W:username`)
- Address validation
- Balance checking
- Network support: Mainnet, Testnet, Stagenet

**Key Classes:**
- `WavesRewarder`: Core reward distribution logic
- `GameRewardManager`: Game session and score management
- `WavesService`: Blockchain interaction wrapper
- `AddressResolver`: Address validation and alias resolution

**Example Usage:**
```typescript
import { GameRewardManager } from '@currencyCore/distributionEngines';

const config = {
  rewardThreshold: 10000,
  rewardAmount: '10',
  tickerSymbol: 'WAVES',
  network: 'mainnet',
};

const walletConfig = {
  privateKey: process.env.WAVES_REWARD_PRIVATE_KEY,
  network: 'mainnet',
};

const manager = new GameRewardManager(config, walletConfig);

// Start game
const { success, address, sessionId } = await manager.startGame('3P...');

// Update score and auto-reward
const result = await manager.updateScore(address, 10000);
if (result.rewardSent) {
  console.log(`Reward sent! TX: ${result.txId}`);
}
```

### 2. Smart Contract Rewards (`WAVES.Waves.rewards.smartContract.ts`)

On-chain reward distribution via Ride smart contracts.

**Features:**
- Ride smart contract template
- Player registration system
- On-chain score tracking
- Claim intervals (anti-spam)
- Automatic reward distribution
- Contract funding and management
- Game activation control

**Key Components:**
- `GameRewardContract.ride`: Ride smart contract
- `WavesSmartContractRewarder`: TypeScript client

**Example Usage:**
```typescript
import { WavesSmartContractRewarder } from '@currencyCore/distributionEngines';

const config = {
  contractAddress: '3P...',
  network: 'mainnet',
  chainId: 'W',
};

const rewarder = new WavesSmartContractRewarder(config);

// Register player
await rewarder.registerPlayer(playerPrivateKey);

// Update score
await rewarder.updateScore(playerPrivateKey, 10000);

// Claim reward
await rewarder.claimReward(playerPrivateKey);
```

### 3. Manual Escrow (`WAVES.Waves.escrow.manual.ts`)

Server-managed escrow for peer-to-peer gaming with encrypted seeds.

**Features:**
- Seed-based account generation
- AES-256-GCM encryption
- Multi-player support
- Deposit monitoring
- Automatic pot distribution
- Network support: Mainnet, Testnet, Stagenet

**Key Classes:**
- `WavesGameEscrow`: Core escrow logic
- `GameServer`: Match management

**Example Usage:**
```typescript
import { GameServer } from '@currencyCore/distributionEngines';

const config = {
  buyInAmount: 10,
  network: 'mainnet',
  maxPlayers: 2,
};

const server = new GameServer(config, process.env.MACHINE_SECRET);

// Create match
const match = await server.createMatch();
console.log(`Escrow address: ${match.escrowAddress}`);

// Players join
server.joinMatch(match.matchId, '3PPlayer1...');
server.joinMatch(match.matchId, '3PPlayer2...');

// Check deposits
const ready = await server.checkMatchReady(match.matchId);

// Settle match
if (ready) {
  const result = await server.settleMatch(match.matchId, '3PPlayer1...');
  console.log(`Winner paid! TX: ${result.txId}`);
}
```

### 4. Smart Contract Escrow (`WAVES.Waves.escrow.smartContract.ts`)

On-chain escrow via Ride smart contracts for trustless multiplayer games.

**Features:**
- Ride escrow contract
- Automatic game start when deposits complete
- On-chain winner declaration
- Automatic pot distribution
- Game state tracking
- Reset functionality

**Key Components:**
- `GameEscrowContract.ride`: Ride smart contract
- `WavesEscrowContractClient`: TypeScript client

**Example Usage:**
```typescript
import { WavesEscrowContractClient } from '@currencyCore/distributionEngines';

const config = {
  contractAddress: '3P...',
  network: 'mainnet',
  chainId: 'W',
};

const client = new WavesEscrowContractClient(config);

// Players join and deposit
await client.joinGame(player1PrivateKey, 1.0);
await client.joinGame(player2PrivateKey, 1.0);

// Check if game started
const started = await client.isGameActive();

// Declare winner
if (started) {
  await client.declareWinner(ownerPrivateKey, '3PPlayer1...');
}
```

## 🔐 Security Considerations

### Manual Implementations
- **Private Key Storage**: Use environment variables or secure vaults (never hardcode)
- **Seed Encryption**: AES-256-GCM for escrow seeds
- **Machine Secrets**: Use unique, strong secrets for each deployment
- **Key Cleanup**: Delete escrow seeds after distribution

### Smart Contract Implementations
- **Auditing**: Thoroughly audit Ride contracts before mainnet deployment
- **Testing**: Test extensively on Testnet or Stagenet
- **Owner Control**: Secure owner private keys (used for admin functions)
- **Payment Validation**: Contracts validate payment amounts and asset types

## 📦 Dependencies

```json
{
  "@waves/waves-transactions": "^4.2.0",
  "@waves/waves-crypto": "^7.0.0",
  "axios": "^1.6.0"
}
```

## 🌐 Network Support

### Mainnet
- **Node URL**: `https://nodes.wavesnodes.com`
- **Explorer**: `https://wavesexplorer.com`
- **Chain ID**: `W`

### Testnet
- **Node URL**: `https://nodes-testnet.wavesnodes.com`
- **Explorer**: `https://testnet.wavesexplorer.com`
- **Chain ID**: `T`
- **Faucet**: https://testnet.wavesexplorer.com/faucet

### Stagenet
- **Node URL**: `https://nodes-stagenet.wavesnodes.com`
- **Chain ID**: `S`

## 🚀 Deployment

### Smart Contracts (Ride)

1. **Using Waves IDE**:
   - Visit https://waves-ide.com
   - Paste contract code
   - Compile with STDLIB_VERSION 6
   - Deploy via Waves Keeper or Waves Signer

2. **Using Waves Ride CLI**:
   ```bash
   npm install -g @waves/ride-js
   ride compile contract.ride
   # Deploy using @waves/waves-transactions
   ```

### TypeScript Clients

```bash
npm install @waves/waves-transactions @waves/waves-crypto axios
```

Set environment variables:
```bash
export WAVES_REWARD_PRIVATE_KEY="your_private_key"
export WAVES_OWNER_PRIVATE_KEY="your_owner_key"
export MACHINE_SECRET="your_machine_secret"
```

## 💡 Best Practices

1. **Start with Testnet**: Always test on Testnet or Stagenet before mainnet
2. **Fee Management**: WAVES uses 0.005 WAVES (500,000 wavelets) default fee
3. **Error Handling**: Implement comprehensive error handling and logging
4. **Transaction Confirmation**: Wait for transaction confirmation before proceeding
5. **Balance Checks**: Always verify sufficient balance before transactions
6. **Rate Limiting**: Implement rate limiting to avoid node throttling
7. **Alias Resolution**: Use aliases for better UX (e.g., `alias:W:player1`)
8. **Asset Handling**: Specify `assetId: null` for WAVES, asset ID for custom assets

## 🎮 Waves Blockchain Features

- **Ride Language**: Functional smart contract language
- **Fast Finality**: ~1 minute block time
- **Low Fees**: ~0.005 WAVES per transaction
- **Aliases**: Human-readable addresses (e.g., `@username`)
- **Custom Assets**: Easy token creation and transfer
- **Data Transactions**: Store key-value pairs on-chain
- **Lease**: Stake WAVES without lock-up

## 📚 Additional Resources

- [Waves Documentation](https://docs.waves.tech/)
- [Ride Language Reference](https://docs.waves.tech/en/ride/)
- [Waves IDE](https://waves-ide.com/)
- [Waves JS Documentation](https://wavesplatform.github.io/waves-transactions/)
- [Waves Explorer](https://wavesexplorer.com/)

## 🤝 Integration

These engines are designed to integrate with:
- **WebRTC**: For real-time peer-to-peer gaming
- **Colyseus**: For multiplayer game server management
- **Express/Fastify**: As REST API endpoints
- **Socket.io**: For real-time communication

## 📝 License

Part of the loginStandard project. See project root for license information.
