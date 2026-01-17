# Algorand Distribution Engines

Complete suite of reward and escrow distribution mechanisms for the Algorand blockchain.

## Available Engines

### 1. Manual Rewards Distribution
**File**: `ALGO.Algorand.rewards.manual.ts`

Server-managed reward system for distributing ALGO or ASA tokens based on user achievements.

**Use Cases:**
- Gaming rewards (high scores, achievements)
- Loyalty programs
- Referral bonuses
- Content creator tips

**Features:**
- Support for ALGO and ASA tokens
- Human-readable address resolution
- Event callbacks for tracking
- Automatic transaction confirmation

**Example:**
```typescript
import { AlgorandRewarder } from './ALGO.Algorand.rewards.manual';

const rewarder = new AlgorandRewarder({
  algodServer: "https://testnet-algorand.api.purestake.io/ps2",
  algodToken: process.env.PURESTAKE_API_KEY,
  senderMnemonic: process.env.REWARD_WALLET_MNEMONIC,
  nameResolver: async (name) => {
    // Optional: resolve .algo names or custom handles
    return resolveCustomName(name);
  }
});

// Set up event listeners
rewarder.onRewardSent(({ txId, confirmedRound }) => {
  console.log(`Reward sent: ${txId} (round ${confirmedRound})`);
});

rewarder.onError((error) => {
  console.error('Reward error:', error);
});

// Send reward
await rewarder.rewardUser(userAddress, {
  currency: 'ALGO',
  amount: 0.1, // 0.1 ALGO
  note: 'Achievement: Level 10!'
});
```

---

### 2. Smart Contract Rewards Distribution
**File**: `ALGO.Algorand.rewards.smartContract.ts`

Trustless reward system using PyTEAL smart contracts with server-signed attestations.

**Use Cases:**
- Verifiable gaming rewards
- Transparent achievement systems
- Auditable loyalty programs
- Fair competition prizes

**Features:**
- On-chain reward verification
- Server-signed attestations prevent cheating
- Nonce-based replay protection
- Support for ALGO and ASA
- Inner transactions for automatic payout

**Architecture:**
```
Player achieves goal → Server validates → Server signs attestation → 
Player claims reward → Contract verifies signature → Contract pays out
```

**Example:**
```typescript
import { AlgorandSmartContractRewarder } from './ALGO.Algorand.rewards.smartContract';

// Initialize (after deploying contract)
const rewarder = new AlgorandSmartContractRewarder({
  algodServer: "https://testnet-algorand.api.purestake.io/ps2",
  algodToken: process.env.PURESTAKE_API_KEY,
  appId: 123456, // Your deployed contract app ID
  ownerAccount: serverAccount,
});

// Player registers for rewards
await rewarder.registerPlayer(playerAccount);

// When player achieves 10,000 points, server creates attestation
const attestation = rewarder.generateAttestation(playerAddress, 10000);

// Player claims reward using attestation
const txId = await rewarder.claimReward(playerAccount, attestation);
console.log('Reward claimed:', txId);
```

**Deployment:**
1. Save the PyTEAL contract from `PYTEAL_CONTRACT_SOURCE`
2. Compile: `python contract.py > approval.teal`
3. Deploy using `AlgorandSmartContractRewarder.deployContract()`
4. Fund the contract account
5. Players can now claim rewards

---

### 3. Manual Escrow Distribution
**File**: `ALGO.Algorand.escrow.manual.ts`

Server-managed escrow for two-party interactions (gaming, trading, wagering).

**Use Cases:**
- PvP game matches
- Peer-to-peer trades
- Wagering/betting
- Service deposits

**Features:**
- Automatic escrow wallet creation
- Encrypted private key storage
- Deposit verification via Indexer
- Configurable stake amounts
- Winner payout automation

**Security:**
- Private keys encrypted with AES-256-GCM
- PBKDF2 key derivation
- Keys never exposed to clients
- Secure storage recommendations

**Example:**
```typescript
import { AlgorandEscrowManager } from './ALGO.Algorand.escrow.manual';

const escrow = new AlgorandEscrowManager({
  algodServer: "https://testnet-algorand.api.purestake.io/ps2",
  algodToken: process.env.PURESTAKE_API_KEY,
  storageKey: process.env.ESCROW_ENCRYPTION_KEY, // Keep this secret!
});

// Create match
const match = await escrow.createMatch(1000000); // 1 ALGO stake
console.log('Escrow address:', match.escrowAddr);

// Players join
escrow.addPlayer(match.id, player1Address);
escrow.addPlayer(match.id, player2Address);

// Monitor deposits
const status = await escrow.checkMatchStatus(match.id);
if (status.status === 'ready_to_start') {
  console.log('Both players deposited! Start the game.');
}

// After game ends, payout winner
const txId = await escrow.payoutWinner(match.id, winnerAddress);
console.log('Payout complete:', txId);
```

---

### 4. Smart Contract Escrow Distribution
**File**: `ALGO.Algorand.escrow.smartContract.ts`

On-chain escrow with trustless fund management and automatic payout.

**Use Cases:**
- Trustless gaming
- Decentralized competitions
- Fair PvP matches
- Public tournaments

**Features:**
- Funds secured in smart contract
- On-chain deposit verification
- Atomic transaction groups for deposits
- Inner transactions for payout
- Transparent rules and state

**Trust Model:**
- Funds cannot be stolen (secured by contract)
- Operator triggers payout (validates game outcome)
- Contract enforces payout rules
- All state visible on-chain

**Example:**
```typescript
import { AlgorandEscrowContract } from './ALGO.Algorand.escrow.smartContract';

const escrow = new AlgorandEscrowContract({
  algodServer: "https://testnet-algorand.api.purestake.io/ps2",
  algodToken: process.env.PURESTAKE_API_KEY,
  appId: 789012, // Your deployed contract
  operatorAccount: serverAccount,
});

// Setup match (operator only)
await escrow.setupMatch(1000000, 2); // 1 ALGO stake, 2 players

// Players deposit (atomic group: payment + app call)
await escrow.playerDeposit(player1Account, 1000000);
await escrow.playerDeposit(player2Account, 1000000);

// Check contract state
const state = await escrow.getMatchState();
console.log('Deposits:', state.deposits, '/', state.maxPlayers);

// Start match when ready
if (state.status === 1) { // Status: Ready
  await escrow.startMatch();
}

// Payout winner (operator only)
await escrow.payoutWinner(winnerAddress);
```

**Deployment:**
1. Save the PyTEAL contract from `PYTEAL_ESCROW_CONTRACT`
2. Compile: `python escrow_contract.py > approval.teal`
3. Deploy using `AlgorandEscrowContract.deployContract()`
4. Fund the contract account (minimum balance)
5. Contract is ready for matches

---

## Comparison Matrix

| Feature | Manual Rewards | SC Rewards | Manual Escrow | SC Escrow |
|---------|---------------|------------|---------------|-----------|
| **Trustless** | ❌ | ✅ | ❌ | ✅ |
| **Setup Time** | Fast | Slow | Fast | Slow |
| **Gas Cost** | Low | Medium | Low | Medium |
| **Transparency** | Low | High | Low | High |
| **Flexibility** | High | Medium | High | Medium |
| **Custody** | Server | Contract | Server | Contract |
| **Best For** | Quick MVP | Production | Quick MVP | Production |

## Prerequisites

### Required Tools
```bash
# Node.js & npm
npm install algosdk

# For smart contracts
pip install pyteal
```

### API Access
- **Free TestNet**: [AlgoNode](https://algonode.io/)
- **Paid API**: [PureStake](https://www.purestake.com/)
- **TestNet Faucet**: [Algorand Dispenser](https://bank.testnet.algorand.network/)

### Accounts Needed
1. **Reward Wallet**: Funded account for manual rewards
2. **Server Account**: For signing attestations/operating contracts
3. **Test Players**: Accounts for testing deposits/claims

## Security Checklist

### Manual Engines
- [ ] Store mnemonics in environment variables (not in code)
- [ ] Use KMS or HSM for production keys
- [ ] Encrypt escrow keys with strong algorithm (AES-256-GCM)
- [ ] Rotate encryption keys periodically
- [ ] Implement rate limiting on reward endpoints
- [ ] Log all transactions for audit trail
- [ ] Monitor for unusual patterns
- [ ] Use secure HTTPS endpoints only

### Smart Contract Engines
- [ ] Audit PyTEAL code before deployment
- [ ] Test on TestNet extensively
- [ ] Verify compiled TEAL matches source
- [ ] Fund contracts appropriately
- [ ] Secure operator/owner accounts
- [ ] Implement nonce/replay protection
- [ ] Set appropriate transaction fees
- [ ] Test all contract methods
- [ ] Verify minimum balance requirements
- [ ] Document contract addresses

## Testing Strategy

```typescript
import { AlgorandRewarder } from './ALGO.Algorand.rewards.manual';

describe('Algorand Distribution Engines', () => {
  describe('Manual Rewards', () => {
    it('should send ALGO rewards', async () => {
      const rewarder = new AlgorandRewarder(config);
      const txId = await rewarder.rewardUser(testAddress, {
        currency: 'ALGO',
        amount: 0.001,
        note: 'Test reward'
      });
      expect(txId).toBeDefined();
    });

    it('should send ASA rewards', async () => {
      const rewarder = new AlgorandRewarder(config);
      const txId = await rewarder.rewardUser(testAddress, {
        currency: 'ASA',
        amount: 10,
        assetId: 123456,
        note: 'Test ASA reward'
      });
      expect(txId).toBeDefined();
    });
  });

  describe('Smart Contract Rewards', () => {
    it('should allow player registration', async () => {
      const rewarder = new AlgorandSmartContractRewarder(config);
      const txId = await rewarder.registerPlayer(playerAccount);
      expect(txId).toBeDefined();
    });

    it('should verify attestation signatures', async () => {
      const rewarder = new AlgorandSmartContractRewarder(config);
      const attestation = rewarder.generateAttestation(playerAddr, 10000);
      expect(attestation.signature).toBeDefined();
    });
  });
});
```

## Common Issues & Solutions

### Issue: "Transaction not confirmed"
**Solution:** Increase timeout or check network status
```typescript
// Increase timeout to 20 rounds
await waitForConfirmation(txId, 20);
```

### Issue: "Insufficient funds"
**Solution:** Ensure accounts have minimum balance + fees
```typescript
// Check balance before sending
const accountInfo = await algodClient.accountInformation(address).do();
if (accountInfo.amount < 100000) {
  throw new Error('Insufficient balance');
}
```

### Issue: "Invalid address"
**Solution:** Validate addresses before use
```typescript
if (!algosdk.isValidAddress(address)) {
  throw new Error('Invalid Algorand address');
}
```

### Issue: "Contract not found"
**Solution:** Verify app ID and ensure contract is deployed
```typescript
const appInfo = await algodClient.getApplicationByID(appId).do();
```

## Performance Optimization

### Batch Processing
```typescript
// Process multiple rewards in parallel
const rewards = [
  rewarder.rewardUser(user1, spec1),
  rewarder.rewardUser(user2, spec2),
  rewarder.rewardUser(user3, spec3),
];
await Promise.all(rewards);
```

### Caching
```typescript
// Cache algod params for multiple transactions
const params = await algodClient.getTransactionParams().do();
// Reuse params for multiple txns within same round
```

## Additional Resources

- [Algorand Developer Docs](https://developer.algorand.org/)
- [PyTEAL Documentation](https://pyteal.readthedocs.io/)
- [AlgoSDK Reference](https://algorand.github.io/js-algorand-sdk/)
- [Algorand Discord](https://discord.com/invite/algorand)

## Support

For issues specific to these distribution engines:
1. Check this README and main README
2. Review example code in files
3. Test on TestNet first
4. Open an issue with detailed error logs

---

**⚠️ Security Warning**: Never commit private keys, mnemonics, or API keys to version control. Always use environment variables or secure secret management systems.

