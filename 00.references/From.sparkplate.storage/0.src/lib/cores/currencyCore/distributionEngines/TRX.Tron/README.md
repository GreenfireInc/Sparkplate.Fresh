# Tron (TRX) Distribution Engines

This directory contains optimized TypeScript implementations for distributing TRX rewards and managing escrow for gaming applications on the Tron blockchain.

## 📁 Structure

```
TRX.Tron/
├── TRX.Tron.rewards.manual.ts           # Server-managed reward distribution
├── TRX.Tron.rewards.smartContract.ts    # Smart contract-based rewards
├── TRX.Tron.escrow.manual.ts            # Server-managed escrow system
├── TRX.Tron.escrow.smartContract.ts     # Smart contract-based escrow
├── index.ts                              # Main exports
└── README.md                             # This file
```

## 🎯 Distribution Mechanisms

### 1. Manual Rewards (`TRX.Tron.rewards.manual.ts`)

Server-controlled reward distribution using TronWeb.

**Features:**
- Direct TRX transfers
- TRC20 token support
- Address validation
- Human-readable address resolution (future)
- Balance checking
- Network support: Mainnet, Shasta, Nile

**Key Classes:**
- `TronRewarder`: Core reward distribution logic
- `GameRewardManager`: Game session and score management
- `TronService`: Blockchain interaction wrapper
- `AddressResolver`: Address validation and resolution

**Example Usage:**
```typescript
import { GameRewardManager } from '@currencyCore/distributionEngines';

const config = {
  rewardThreshold: 10000,
  rewardAmount: '10',
  tickerSymbol: 'TRX',
  network: 'mainnet',
  rewardType: 'TRX',
};

const walletConfig = {
  privateKey: process.env.TRX_REWARD_PRIVATE_KEY,
  network: 'mainnet',
};

const manager = new GameRewardManager(config, walletConfig);

// Start game
const { success, address, sessionId } = await manager.startGame('TExampleAddress...');

// Update score and auto-reward
const result = await manager.updateScore(address, 10000);
if (result.rewardSent) {
  console.log(`Reward sent! TX: ${result.txId}`);
}
```

### 2. Smart Contract Rewards (`TRX.Tron.rewards.smartContract.ts`)

On-chain reward distribution via Solidity smart contracts.

**Features:**
- Solidity contract template
- Player session management
- On-chain score tracking
- Automatic reward distribution
- Contract funding and management
- Pausable functionality

**Key Components:**
- `GameRewardContract.sol`: Solidity smart contract
- `TronSmartContractRewarder`: TypeScript client

**Example Usage:**
```typescript
import { TronSmartContractRewarder } from '@currencyCore/distributionEngines';

const config = {
  contractAddress: 'TContractAddress...',
  network: 'mainnet',
  ownerPrivateKey: process.env.TRX_OWNER_PRIVATE_KEY,
};

const rewarder = new TronSmartContractRewarder(config);
await rewarder.initialize();

// Player starts game
await rewarder.startGame(playerPrivateKey);

// Update score
await rewarder.updateScore(playerPrivateKey, 10000);

// Claim reward
await rewarder.claimReward(playerPrivateKey);
```

### 3. Manual Escrow (`TRX.Tron.escrow.manual.ts`)

Server-managed escrow for peer-to-peer gaming with encrypted private keys.

**Features:**
- Temporary escrow wallet generation
- AES-256-GCM encryption
- Multi-player support
- Deposit monitoring
- Automatic pot distribution
- Network support: Mainnet, Shasta, Nile

**Key Classes:**
- `TronGameEscrow`: Core escrow logic
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
server.joinMatch(match.matchId, 'TPlayer1Address...');
server.joinMatch(match.matchId, 'TPlayer2Address...');

// Check deposits
const ready = await server.checkMatchReady(match.matchId);

// Settle match
if (ready) {
  const result = await server.settleMatch(match.matchId, 'TPlayer1Address...');
  console.log(`Winner paid! TX: ${result.txId}`);
}
```

### 4. Smart Contract Escrow (`TRX.Tron.escrow.smartContract.ts`)

On-chain escrow via Solidity smart contracts for trustless multiplayer games.

**Features:**
- Solidity escrow contract
- Automatic game start when deposits complete
- On-chain winner declaration
- Automatic pot distribution
- Player list tracking

**Key Components:**
- `GamePot.sol`: Solidity smart contract
- `TronEscrowContractClient`: TypeScript client

**Example Usage:**
```typescript
import { TronEscrowContractClient } from '@currencyCore/distributionEngines';

const config = {
  contractAddress: 'TContractAddress...',
  network: 'mainnet',
  ownerPrivateKey: process.env.TRX_OWNER_PRIVATE_KEY,
};

const client = new TronEscrowContractClient(config);
await client.initialize();

// Players join and deposit
await client.joinGame(player1PrivateKey, 1.0);
await client.joinGame(player2PrivateKey, 1.0);

// Check if game started
const started = await client.isGameStarted();

// Declare winner
if (started) {
  await client.declareWinner('TPlayer1Address...', ownerPrivateKey);
}
```

## 🔐 Security Considerations

### Manual Implementations
- **Private Key Storage**: Use environment variables or secure vaults (never hardcode)
- **Encryption**: AES-256-GCM for escrow private keys
- **Machine Secrets**: Use unique, strong secrets for each deployment
- **Key Cleanup**: Delete escrow keys after distribution

### Smart Contract Implementations
- **Auditing**: Thoroughly audit contracts before mainnet deployment
- **Testing**: Test extensively on Shasta or Nile testnet
- **Owner Control**: Secure owner private keys (used for winner declaration)
- **Energy/Bandwidth**: Ensure sufficient resources for transactions

## 📦 Dependencies

```json
{
  "tronweb": "^5.3.0"
}
```

## 🌐 Network Support

### Mainnet
- **Full Host**: `https://api.trongrid.io`
- **Explorer**: `https://tronscan.org`

### Shasta Testnet
- **Full Host**: `https://api.shasta.trongrid.io`
- **Explorer**: `https://shasta.tronscan.org`
- **Faucet**: https://www.trongrid.io/faucet

### Nile Testnet
- **Full Host**: `https://nile.trongrid.io`
- **Explorer**: `https://nile.tronscan.org`

## 🚀 Deployment

### Smart Contracts

1. **Using Tron IDE**:
   - Visit https://www.tronide.io
   - Paste contract code
   - Compile with Solidity 0.8.x
   - Deploy via TronLink

2. **Using TronBox**:
   ```bash
   npm install -g tronbox
   tronbox init
   # Configure tronbox.js
   tronbox compile
   tronbox migrate --network nile
   ```

### TypeScript Clients

```bash
npm install tronweb
```

Set environment variables:
```bash
export TRX_REWARD_PRIVATE_KEY="your_private_key"
export TRX_OWNER_PRIVATE_KEY="your_owner_key"
export MACHINE_SECRET="your_machine_secret"
```

## 💡 Best Practices

1. **Start with Testnet**: Always test on Shasta or Nile before mainnet
2. **Energy Management**: Ensure adequate TRX frozen for Energy and Bandwidth
3. **Error Handling**: Implement comprehensive error handling and logging
4. **Transaction Confirmation**: Wait for transaction confirmation before proceeding
5. **Balance Checks**: Always verify sufficient balance before transactions
6. **Rate Limiting**: Implement rate limiting to avoid API throttling
7. **Event Monitoring**: Subscribe to contract events for real-time updates

## 📚 Additional Resources

- [Tron Developer Hub](https://developers.tron.network/)
- [TronWeb Documentation](https://tronweb.network/)
- [TronGrid API](https://www.trongrid.io/)
- [Tron Solidity Differences](https://developers.tron.network/docs/vm-vs-evm)

## 🤝 Integration

These engines are designed to integrate with:
- **WebRTC**: For real-time peer-to-peer gaming
- **Colyseus**: For multiplayer game server management
- **Express/Fastify**: As REST API endpoints
- **Socket.io**: For real-time communication

## 📝 License

Part of the loginStandard project. See project root for license information.
