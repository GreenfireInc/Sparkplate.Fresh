# Tezos (XTZ) Distribution Engines

This directory contains optimized TypeScript implementations for distributing XTZ rewards and managing escrow for gaming applications on the Tezos blockchain.

## 📁 Structure

```
XTZ.Tezos/
├── XTZ.Tezos.rewards.manual.ts           # Server-managed reward distribution
├── XTZ.Tezos.rewards.smartContract.ts    # Smart contract-based rewards (Michelson/SmartPy)
├── XTZ.Tezos.escrow.manual.ts            # Server-managed escrow system
├── XTZ.Tezos.escrow.smartContract.ts     # Smart contract-based escrow (Michelson/SmartPy)
├── index.ts                                # Main exports
└── README.md                                # This file
```

## 🎯 Distribution Mechanisms

### 1. Manual Rewards (`XTZ.Tezos.rewards.manual.ts`)

Server-controlled reward distribution using Taquito.

**Features:**
- Direct XTZ transfers
- FA1.2 and FA2 token support
- Address validation (tz1, tz2, tz3, KT1)
- Balance checking
- Network support: Mainnet, Testnet (Ghostnet)

**Key Classes:**
- `TezosRewarder`: Core reward distribution logic
- `GameRewardManager`: Game session and score management
- `TezosService`: Blockchain interaction wrapper
- `AddressResolver`: Address validation

**Example Usage:**
```typescript
import { GameRewardManager } from '@currencyCore/distributionEngines';

const config = {
  rewardThreshold: 10000,
  rewardAmount: '10',
  tickerSymbol: 'XTZ',
  network: 'mainnet',
};

const walletConfig = {
  privateKey: process.env.TEZOS_REWARD_PRIVATE_KEY,
  network: 'mainnet',
};

const manager = new GameRewardManager(config, walletConfig);

// Start game
const { success, address, sessionId } = await manager.startGame('tz1...');

// Update score and auto-reward
const result = await manager.updateScore(address, 10000);
if (result.rewardSent) {
  console.log(`Reward sent! TX: ${result.txHash}`);
}
```

### 2. Smart Contract Rewards (`XTZ.Tezos.rewards.smartContract.ts`)

On-chain reward distribution via Michelson/SmartPy smart contracts.

**Features:**
- SmartPy contract template
- Player registration system
- On-chain score tracking
- Claim-based reward distribution
- Contract funding and management
- Active/inactive state control

**Key Components:**
- `game_reward_contract.py`: SmartPy smart contract
- `TezosSmartContractRewarder`: TypeScript client

**Example Usage:**
```typescript
import { TezosSmartContractRewarder } from '@currencyCore/distributionEngines';

const config = {
  contractAddress: 'KT1...',
  network: 'mainnet',
};

const rewarder = new TezosSmartContractRewarder(config);

// Register player
await rewarder.registerPlayer(playerPrivateKey);

// Update score
await rewarder.updateScore(playerPrivateKey, 10000);

// Claim reward
await rewarder.claimReward(playerPrivateKey);
```

### 3. Manual Escrow (`XTZ.Tezos.escrow.manual.ts`)

Server-managed escrow for peer-to-peer gaming with encrypted private keys.

**Features:**
- Account generation from fundraiser
- AES-256-GCM encryption
- Multi-player support
- Deposit monitoring
- Automatic pot distribution
- Minimum reserve handling (~0.257 XTZ)
- Network support: Mainnet, Testnet

**Key Classes:**
- `TezosGameEscrow`: Core escrow logic
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
server.joinMatch(match.matchId, 'tz1Player1...');
server.joinMatch(match.matchId, 'tz1Player2...');

// Check deposits
const ready = await server.checkMatchReady(match.matchId);

// Settle match
if (ready) {
  const result = await server.settleMatch(match.matchId, 'tz1Player1...');
  console.log(`Winner paid! TX: ${result.txHash}`);
}
```

### 4. Smart Contract Escrow (`XTZ.Tezos.escrow.smartContract.ts`)

On-chain escrow via Michelson/SmartPy smart contracts for trustless multiplayer games.

**Features:**
- SmartPy escrow contract
- Automatic game start when deposits complete
- On-chain winner declaration
- Automatic pot distribution
- Game state tracking
- Reset functionality

**Key Components:**
- `game_escrow_contract.py`: SmartPy smart contract
- `TezosEscrowContractClient`: TypeScript client

**Example Usage:**
```typescript
import { TezosEscrowContractClient } from '@currencyCore/distributionEngines';

const config = {
  contractAddress: 'KT1...',
  network: 'testnet',
};

const client = new TezosEscrowContractClient(config);

// Players join and deposit
await client.joinGame(player1PrivateKey, 10.0);
await client.joinGame(player2PrivateKey, 10.0);

// Check if game started
const started = await client.isGameActive();

// Declare winner
if (started) {
  await client.declareWinner(ownerPrivateKey, 'tz1Player1...');
}
```

## 🔐 Security Considerations

### Manual Implementations
- **Private Key Storage**: Use environment variables or secure vaults (never hardcode)
- **Key Encryption**: AES-256-GCM for escrow private keys
- **Machine Secrets**: Use unique, strong secrets for each deployment
- **Key Cleanup**: Delete escrow keys after distribution
- **Minimum Reserve**: Tezos accounts require ~0.257 XTZ minimum balance

### Smart Contract Implementations
- **Auditing**: Thoroughly audit SmartPy contracts before mainnet deployment
- **Testing**: Test extensively on Ghostnet (testnet)
- **Owner Control**: Secure owner private keys (used for admin functions)
- **Gas Limits**: Set appropriate gas limits for contract calls

## 📦 Dependencies

```json
{
  "@taquito/taquito": "^17.0.0",
  "@taquito/signer": "^17.0.0"
}
```

## 🌐 Network Support

### Mainnet
- **RPC URL**: `https://mainnet.api.tez.ie`
- **Explorer**: `https://tzstats.com`
- **Alternative RPCs**: 
  - `https://mainnet.smartpy.io`
  - `https://rpc.tzbeta.net`

### Testnet (Ghostnet)
- **RPC URL**: `https://ghostnet.ecadinfra.com`
- **Explorer**: `https://ghostnet.tzstats.com`
- **Faucet**: `https://faucet.ghostnet.teztnets.xyz`

## 🚀 Deployment

### Smart Contracts (SmartPy)

1. **Write Contract in SmartPy**:
   ```python
   # See contract examples in the .ts files
   ```

2. **Test Contract**:
   ```bash
   smartpy test contract.py output/
   ```

3. **Deploy via SmartPy CLI**:
   ```bash
   smartpy originate contract.py \
     --storage storage.json \
     --rpc https://ghostnet.ecadinfra.com
   ```

4. **Or Deploy via Taquito**:
   ```typescript
   const op = await tezos.contract.originate({
     code: contractCode,
     storage: initialStorage,
   });
   await op.confirmation();
   const contract = await op.contract();
   console.log('Contract address:', contract.address);
   ```

### TypeScript Clients

```bash
npm install @taquito/taquito @taquito/signer
```

Set environment variables:
```bash
export TEZOS_REWARD_PRIVATE_KEY="edsk..."
export TEZOS_OWNER_PRIVATE_KEY="edsk..."
export MACHINE_SECRET="your_machine_secret"
```

## 💡 Best Practices

1. **Start with Testnet**: Always test on Ghostnet before Mainnet
2. **Fee Management**: Tezos uses dynamic gas/storage fees
3. **Error Handling**: Implement comprehensive error handling and logging
4. **Transaction Confirmation**: Wait for confirmation before proceeding
5. **Balance Checks**: Always verify sufficient balance before transactions
6. **Minimum Reserve**: Accounts need ~0.257 XTZ + (storage × 0.25 XTZ/KB)
7. **Reveal Operation**: New accounts must be revealed (costs ~0.001257 XTZ)
8. **Gas Limits**: Set appropriate gas limits (default ~1420 gas units)
9. **Address Types**: 
   - `tz1`: Ed25519 keys (most common)
   - `tz2`: Secp256k1 keys
   - `tz3`: P-256 keys
   - `KT1`: Smart contract addresses

## 🌟 Tezos Blockchain Features

- **Fast Finality**: ~30 second block times
- **Low Fees**: Typically < $0.01 per transaction
- **Smart Contracts**: Michelson (low-level) or SmartPy/LIGO (high-level)
- **Formal Verification**: Mathematical proof of contract correctness
- **On-Chain Governance**: Protocol upgrades via voting
- **FA Standards**: FA1.2 (fungible tokens), FA2 (multi-asset)
- **Sapling**: Privacy-preserving transactions
- **Timelock**: Time-locked cryptographic puzzles

## 📚 Additional Resources

- [Tezos Documentation](https://tezos.com/developers/)
- [Taquito Documentation](https://tezostaquito.io/)
- [SmartPy](https://smartpy.io/)
- [LIGO](https://ligolang.org/)
- [TzStats Explorer](https://tzstats.com/)
- [Better Call Dev](https://better-call.dev/)
- [Tezos Agora](https://www.tezosagora.org/)

## 🤝 Integration

These engines are designed to integrate with:
- **WebRTC**: For real-time peer-to-peer gaming
- **Colyseus**: For multiplayer game server management
- **Express/Fastify**: As REST API endpoints
- **Socket.io**: For real-time communication

## 📝 License

Part of the loginStandard project. See project root for license information.

