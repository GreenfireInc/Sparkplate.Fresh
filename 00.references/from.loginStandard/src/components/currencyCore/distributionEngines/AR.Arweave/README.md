# Arweave Distribution Engine

This directory contains the distribution engine for Arweave (AR), allowing for manual reward distribution, escrow management, and smart contract-based coordination.

## Components

### 1. Manual Rewards (`AR.Arweave.rewards.manual.ts`)

The manual rewards system provides a class `ArweaveRewarder` that facilitates sending AR tokens or Profit Sharing Tokens (PSTs) to users.

**Features:**
- Native AR transfers using `arweave-js`.
- PST transfers via SmartWeave interaction tags.
- Address resolution support (e.g., for ArNS).
- Event callbacks for integration (Start, Sent, Error).

**Usage:**

```typescript
import { ArweaveRewarder } from './AR.Arweave.rewards.manual';

const rewarder = new ArweaveRewarder({
  senderKey: myJwkKey, // JWK object
});

await rewarder.rewardUser('target-wallet-address', {
  currency: 'AR',
  amount: 1.5,
  tags: { 'Reward-Type': 'Game-Win' }
});
```

### 2. Manual Escrow (`AR.Arweave.escrow.manual.ts`)

Server-managed escrow system for two-party interactions (gaming, trading, etc.). The server creates and manages escrow wallets with encrypted private keys.

**Features:**
- Creates unique escrow wallets per match
- Encrypts escrow keys with AES-256-GCM
- Tracks player deposits and match status
- Handles winner payouts automatically
- Secure key management (server-side only)

**Usage:**

```typescript
import { ArweaveEscrowManager } from './AR.Arweave.escrow.manual';

const escrowManager = new ArweaveEscrowManager({
  storageKey: process.env.ESCROW_STORAGE_KEY!,
});

// Create match
const match = await escrowManager.createMatch(10); // 10 AR stake
console.log('Escrow Address:', match.escrowAddr);

// Players join and deposit (externally)
escrowManager.addPlayer(match.id, 'player1-address');
escrowManager.addPlayer(match.id, 'player2-address');

// Check deposits
const updatedMatch = await escrowManager.checkMatchStatus(match.id);

// Start match when ready
if (updatedMatch.status === 'ready_to_start') {
  escrowManager.startMatch(match.id);
}

// Payout winner
await escrowManager.payoutWinner(match.id, 'winner-address');
```

### 3. Smart Contract Rewards (`AR.Arweave.rewards.smartContract.ts`)

SmartWeave-based reward distribution contract for game achievements. Players earn rewards by reaching score thresholds, with a relayer handling actual AR transfers.

**Features:**
- Tracks player scores on-chain
- Automatic payout creation when goals reached
- Relayer pattern for L1 transaction execution
- Permanent audit trail
- Admin controls for goal and reward amounts

**Usage:**

```typescript
import { ArweaveSmartContractRewarder } from './AR.Arweave.rewards.smartContract';

// Deploy contract (one-time)
const contractId = await ArweaveSmartContractRewarder.deployContract(
  arweave,
  ownerKey,
  10000,   // Goal: 10,000 points
  '0.01'   // Reward: 0.01 AR
);

// Player interactions
const rewarder = new ArweaveSmartContractRewarder({
  contractId: 'deployed-contract-id',
});

await rewarder.startGame(playerKey);
await rewarder.submitScore(playerKey, 12000);
await rewarder.claimReward(playerKey);

// Relayer (backend)
const relayerRewarder = new ArweaveSmartContractRewarder({
  contractId: 'deployed-contract-id',
  ownerKey: ownerKey,
  relayerKey: relayerKey
});

// Process pending payouts
const txIds = await relayerRewarder.executePayouts();
```

### 4. Smart Contract Escrow (`AR.Arweave.escrow.smartContract.ts`)

SmartWeave-based stateful smart contract for trustless escrow coordination. The contract manages state while a relayer handles actual AR transfers.

**Features:**
- Decentralized state management via SmartWeave
- Trustless match coordination
- Permanent audit trail on Arweave
- Relayer pattern for L1 transaction execution
- Compatible with Warp SDK

**Usage:**

```typescript
import { ArweaveEscrowContract } from './AR.Arweave.escrow.smartContract';

// Deploy contract (one-time)
const contractId = await ArweaveEscrowContract.deployContract(
  arweave,
  operatorKey,
  escrowWalletAddr
);

// Use contract
const escrow = new ArweaveEscrowContract({
  contractId: 'deployed-contract-id',
  operatorKey: operatorKey,
  escrowWalletKey: escrowKey
});

// Create match
await escrow.createMatch('match-1', '1000000000000', 2);

// Players join (via their wallets)
await escrow.joinMatch('match-1', player1Key);

// Mark deposits
await escrow.markDeposit('match-1', player1Addr, 'deposit-tx-id');

// Start and payout
await escrow.startMatch('match-1');
await escrow.setPayout('match-1', winnerAddr);
await escrow.executePayoutL1('match-1', winnerAddr, '2000000000000');
```

## Comparison

| Feature | Manual Rewards | Manual Escrow | Smart Contract Rewards | Smart Contract Escrow |
|---------|---------------|---------------|----------------------|----------------------|
| **Complexity** | Simple | Moderate | Advanced | Advanced |
| **Trust Model** | Server-only | Server-only | Semi-trustless | Semi-trustless |
| **State Storage** | In-memory | In-memory | On-chain (Arweave) | On-chain (Arweave) |
| **Audit Trail** | Transaction tags | Transaction tags | Full contract state | Full contract state |
| **Use Case** | Simple rewards | Two-party games | Achievement rewards | Multi-match coordination |
| **Dependencies** | arweave | arweave, crypto | arweave, warp-contracts | arweave, warp-contracts |
| **Relayer Required** | No | No | Yes | Yes |

## Configuration

All systems require JWK keyfiles for wallets. Ensure keys are kept secure and never exposed on the client side. For production use, implement proper key management and consider using hardware security modules (HSMs) for high-value escrow wallets.

