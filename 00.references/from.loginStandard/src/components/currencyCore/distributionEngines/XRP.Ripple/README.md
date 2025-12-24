# Ripple (XRP) Distribution Engines

This directory contains optimized TypeScript implementations for distributing XRP rewards and managing escrow for gaming applications on the XRP Ledger.

## 📁 Structure

```
XRP.Ripple/
├── XRP.Ripple.rewards.manual.ts           # Server-managed reward distribution
├── XRP.Ripple.rewards.smartContract.ts    # Smart contract-based rewards (Hooks)
├── XRP.Ripple.escrow.manual.ts            # Server-managed escrow system
├── XRP.Ripple.escrow.smartContract.ts     # Smart contract-based escrow (Native Escrow)
├── index.ts                                # Main exports
└── README.md                                # This file
```

## 🎯 Distribution Mechanisms

### 1. Manual Rewards (`XRP.Ripple.rewards.manual.ts`)

Server-controlled reward distribution using xrpl.js.

**Features:**
- Direct XRP payments
- Issued currency support
- Address validation
- Balance checking
- Memo support for transaction notes
- Network support: Mainnet, Testnet, Devnet

**Key Classes:**
- `RippleRewarder`: Core reward distribution logic
- `GameRewardManager`: Game session and score management
- `RippleService`: Blockchain interaction wrapper
- `AddressResolver`: Address validation

**Example Usage:**
```typescript
import { GameRewardManager } from '@currencyCore/distributionEngines';

const config = {
  rewardThreshold: 10000,
  rewardAmount: '10',
  tickerSymbol: 'XRP',
  network: 'mainnet',
};

const walletConfig = {
  seed: process.env.XRP_REWARD_SEED,
  network: 'mainnet',
};

const manager = new GameRewardManager(config, walletConfig);

// Start game
const { success, address, sessionId } = await manager.startGame('r...');

// Update score and auto-reward
const result = await manager.updateScore(address, 10000);
if (result.rewardSent) {
  console.log(`Reward sent! TX: ${result.txHash}`);
}

// Cleanup connection
await manager.cleanup();
```

### 2. Smart Contract Rewards (`XRP.Ripple.rewards.smartContract.ts`)

On-chain reward distribution via XRP Ledger Hooks.

**Features:**
- C-based Hooks (compiled to WASM)
- Player registration system
- On-chain state management
- Claim-based reward distribution
- Memo-based actions (REGISTER, UPDATE, CLAIM)

**Key Components:**
- `game_reward_hook.c`: XRP Ledger Hook (C code)
- `RippleSmartContractRewarder`: TypeScript client

**Note:** XRP Ledger Hooks are an experimental feature. This implementation is conceptual and may need adjustments based on the final Hooks specification.

**Example Usage:**
```typescript
import { RippleSmartContractRewarder } from '@currencyCore/distributionEngines';

const config = {
  hookAccountAddress: 'r...',
  network: 'testnet',
};

const rewarder = new RippleSmartContractRewarder(config);

// Register player
await rewarder.registerPlayer(playerSeed);

// Update score
await rewarder.updateScore(playerSeed, 10000);

// Claim reward
await rewarder.claimReward(playerSeed);

// Cleanup
await rewarder.disconnect();
```

### 3. Manual Escrow (`XRP.Ripple.escrow.manual.ts`)

Server-managed escrow for peer-to-peer gaming with encrypted seeds.

**Features:**
- Random wallet generation
- AES-256-GCM encryption
- Multi-player support
- Deposit monitoring
- Automatic pot distribution
- Minimum reserve handling (10 XRP)
- Network support: Mainnet, Testnet, Devnet

**Key Classes:**
- `RippleGameEscrow`: Core escrow logic
- `GameServer`: Match management

**Example Usage:**
```typescript
import { GameServer } from '@currencyCore/distributionEngines';

const config = {
  buyInAmount: 10,
  network: 'testnet',
  maxPlayers: 2,
};

const server = new GameServer(config, process.env.MACHINE_SECRET);

// Create match
const match = await server.createMatch();
console.log(`Escrow address: ${match.escrowAddress}`);

// Players join
server.joinMatch(match.matchId, 'rPlayer1...');
server.joinMatch(match.matchId, 'rPlayer2...');

// Check deposits
const ready = await server.checkMatchReady(match.matchId);

// Settle match
if (ready) {
  const result = await server.settleMatch(match.matchId, 'rPlayer1...');
  console.log(`Winner paid! TX: ${result.txHash}`);
}

// Cleanup
await server.cleanup();
```

### 4. Smart Contract Escrow (`XRP.Ripple.escrow.smartContract.ts`)

On-chain escrow using XRP Ledger's native Escrow functionality.

**Features:**
- Native Escrow transactions
- Time-locked escrow
- Crypto-conditional releases
- Automatic game start when deposits complete
- On-chain winner declaration
- Escrow cancellation support

**Key Components:**
- Uses native `EscrowCreate`, `EscrowFinish`, `EscrowCancel` transactions
- `RippleEscrowContractClient`: TypeScript client

**Example Usage:**
```typescript
import { RippleEscrowContractClient } from '@currencyCore/distributionEngines';

const config = {
  network: 'testnet',
  gameManagerSeed: process.env.XRP_MANAGER_SEED,
};

const client = new RippleEscrowContractClient(config);
await client.connect();

// Create game
await client.createGame('game123', 10.0, 2);

// Players join and create escrows
await client.joinGame('game123', player1Seed);
await client.joinGame('game123', player2Seed);

// Declare winner
await client.declareWinner('game123', 'rPlayer1...');

// Cleanup
await client.disconnect();
```

## 🔐 Security Considerations

### Manual Implementations
- **Seed Storage**: Use environment variables or secure vaults (never hardcode)
- **Seed Encryption**: AES-256-GCM for escrow seeds
- **Machine Secrets**: Use unique, strong secrets for each deployment
- **Key Cleanup**: Delete escrow seeds after distribution
- **Minimum Reserve**: XRP accounts require 10 XRP minimum balance

### Smart Contract Implementations
- **Hooks Auditing**: Thoroughly audit Hooks before deployment
- **Testing**: Test extensively on Testnet/Devnet
- **Escrow Timing**: Set appropriate time locks for escrows
- **Manager Control**: Secure game manager seeds

## 📦 Dependencies

```json
{
  "xrpl": "^2.11.0"
}
```

## 🌐 Network Support

### Mainnet
- **WebSocket URL**: `wss://xrplcluster.com`
- **Explorer**: `https://livenet.xrpl.org`
- **Alternative**: `wss://s1.ripple.com` or `wss://s2.ripple.com`

### Testnet
- **WebSocket URL**: `wss://s.altnet.rippletest.net:51233`
- **Explorer**: `https://testnet.xrpl.org`
- **Faucet**: `https://faucet.altnet.rippletest.net`

### Devnet
- **WebSocket URL**: `wss://s.devnet.rippletest.net:51233`
- **Explorer**: `https://devnet.xrpl.org`
- **Faucet**: `https://faucet.devnet.rippletest.net`

## 🚀 Deployment

### Smart Contracts (Hooks)

**Note:** Hooks are currently experimental. Check the latest documentation at https://hooks.xrpl.org

1. **Install Hook Builder**:
   ```bash
   git clone https://github.com/XRPL-Labs/xrpl-hooks-sdk
   cd xrpl-hooks-sdk
   ```

2. **Compile Hook**:
   ```bash
   clang -O3 --target=wasm32 -nostdlib \
     -I./hooks-c \
     -Wl,--no-entry \
     -o game_reward_hook.wasm \
     game_reward_hook.c
   ```

3. **Deploy Hook**:
   ```bash
   # Use xrpl.js to deploy the compiled WASM
   ```

### Native Escrow

No deployment needed - uses built-in XRP Ledger transactions:
- `EscrowCreate`: Create time-locked escrow
- `EscrowFinish`: Release funds to destination
- `EscrowCancel`: Cancel and return funds

### TypeScript Clients

```bash
npm install xrpl
```

Set environment variables:
```bash
export XRP_REWARD_SEED="s..."
export XRP_MANAGER_SEED="s..."
export MACHINE_SECRET="your_machine_secret"
```

## 💡 Best Practices

1. **Start with Testnet**: Always test on Testnet/Devnet before Mainnet
2. **Fee Management**: XRP uses dynamic fees (typically 0.00001 XRP)
3. **Error Handling**: Implement comprehensive error handling and logging
4. **Transaction Confirmation**: Wait for ledger validation before proceeding
5. **Balance Checks**: Always verify sufficient balance before transactions
6. **Minimum Reserve**: Accounts need 10 XRP + (2 XRP × number of objects)
7. **Connection Management**: Always disconnect clients when done
8. **Destination Tags**: Use destination tags for exchanges when applicable
9. **Memos**: Use memos to identify transactions (max 1KB)

## 🌟 XRP Ledger Features

- **Fast Finality**: 3-5 second confirmation times
- **Low Fees**: Fractions of a cent per transaction
- **Built-in DEX**: Decentralized exchange on-chain
- **Payment Channels**: Instant, off-chain micropayments
- **Escrow**: Native time-locked and crypto-conditional escrow
- **Checks**: Similar to paper checks, can be cashed or cancelled
- **Hooks**: Smart contract functionality (experimental)
- **NFTs**: Native NFT support (XLS-20)
- **AMM**: Automated Market Maker functionality

## 📚 Additional Resources

- [XRP Ledger Documentation](https://xrpl.org/)
- [xrpl.js Documentation](https://js.xrpl.org/)
- [XRP Ledger Explorer](https://livenet.xrpl.org/)
- [Hooks Documentation](https://hooks.xrpl.org/)
- [XRPL Dev Portal](https://xrpl.org/docs.html)
- [XRP Scan](https://xrpscan.com/)

## 🤝 Integration

These engines are designed to integrate with:
- **WebRTC**: For real-time peer-to-peer gaming
- **Colyseus**: For multiplayer game server management
- **Express/Fastify**: As REST API endpoints
- **Socket.io**: For real-time communication

## 📝 License

Part of the loginStandard project. See project root for license information.

