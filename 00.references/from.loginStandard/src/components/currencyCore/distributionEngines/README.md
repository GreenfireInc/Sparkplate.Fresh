# Distribution Engines

This directory contains blockchain-based distribution mechanisms for rewards and escrow systems. These engines enable secure, automated distribution of cryptocurrency tokens based on achievements, competitions, or contractual agreements.

## Overview

Distribution engines fall into two main categories:

### 1. **Rewards Engines**
Mechanisms for distributing tokens as rewards for achievements, milestones, or participation.

- **Manual Rewards**: Server-managed reward distribution
- **Smart Contract Rewards**: Trustless, on-chain reward claims

### 2. **Escrow Engines**
Mechanisms for holding and distributing funds between multiple parties based on predetermined conditions.

- **Manual Escrow**: Server-managed escrow with encrypted keys
- **Smart Contract Escrow**: On-chain escrow with automatic payout

## Supported Blockchains

### Algorand (ALGO)
- ✅ Manual Rewards Distribution
- ✅ Smart Contract Rewards Distribution
- ✅ Manual Escrow Distribution
- ✅ Smart Contract Escrow Distribution

*More blockchains coming soon...*

## Architecture

Each blockchain has its own subdirectory following this structure:

```
distributionEngines/
├── ALGO.Algorand/
│   ├── ALGO.Algorand.rewards.manual.ts
│   ├── ALGO.Algorand.rewards.smartContract.ts
│   ├── ALGO.Algorand.escrow.manual.ts
│   ├── ALGO.Algorand.escrow.smartContract.ts
│   ├── index.ts
│   └── README.md
├── index.ts
└── README.md
```

## Quick Start

### Manual Rewards (Algorand)

```typescript
import { AlgorandRewarder } from './distributionEngines/ALGO.Algorand';

const rewarder = new AlgorandRewarder({
  algodServer: "https://testnet-algorand.api.purestake.io/ps2",
  algodToken: "<YOUR_API_KEY>",
  senderMnemonic: "<YOUR_MNEMONIC>",
});

// Register callbacks
rewarder.onRewardSent(({ txId, confirmedRound }) => {
  console.log('Reward sent!', txId, confirmedRound);
});

// Send reward
await rewarder.rewardUser(userAddress, {
  currency: 'ALGO',
  amount: 1.0, // 1 ALGO
  note: 'Achievement unlocked!'
});
```

### Smart Contract Rewards (Algorand)

```typescript
import { AlgorandSmartContractRewarder } from './distributionEngines/ALGO.Algorand';

const rewarder = new AlgorandSmartContractRewarder({
  algodServer: "https://testnet-algorand.api.purestake.io/ps2",
  algodToken: "<YOUR_API_KEY>",
  appId: 123456, // Your deployed contract
  ownerAccount: ownerAccount,
});

// Player registers
await rewarder.registerPlayer(playerAccount);

// Server generates attestation when player achieves goal
const attestation = rewarder.generateAttestation(playerAddress, 10000);

// Player claims reward
await rewarder.claimReward(playerAccount, attestation);
```

### Manual Escrow (Algorand)

```typescript
import { AlgorandEscrowManager } from './distributionEngines/ALGO.Algorand';

const escrow = new AlgorandEscrowManager({
  algodServer: "https://testnet-algorand.api.purestake.io/ps2",
  algodToken: "<YOUR_API_KEY>",
  storageKey: process.env.ESCROW_STORAGE_KEY,
});

// Create match
const match = await escrow.createMatch(1000000); // 1 ALGO stake

// Players join
escrow.addPlayer(match.id, player1Address);
escrow.addPlayer(match.id, player2Address);

// Check status
const status = await escrow.checkMatchStatus(match.id);

// Payout winner
await escrow.payoutWinner(match.id, winnerAddress);
```

### Smart Contract Escrow (Algorand)

```typescript
import { AlgorandEscrowContract } from './distributionEngines/ALGO.Algorand';

const escrow = new AlgorandEscrowContract({
  algodServer: "https://testnet-algorand.api.purestake.io/ps2",
  algodToken: "<YOUR_API_KEY>",
  appId: 123456,
  operatorAccount: operatorAccount,
});

// Setup match
await escrow.setupMatch(1000000, 2); // 1 ALGO, 2 players

// Players deposit
await escrow.playerDeposit(player1Account, 1000000);
await escrow.playerDeposit(player2Account, 1000000);

// Start match
await escrow.startMatch();

// Payout winner
await escrow.payoutWinner(winnerAddress);
```

## Comparison: Manual vs Smart Contract

| Feature | Manual | Smart Contract |
|---------|--------|----------------|
| **Trust Model** | Centralized (server) | Decentralized (blockchain) |
| **Setup Complexity** | Low | High |
| **Transparency** | Limited | Full (on-chain) |
| **Custody Risk** | Server holds keys | Funds locked in contract |
| **Flexibility** | High | Medium |
| **Gas Fees** | Lower (fewer txns) | Higher (on-chain operations) |
| **Best For** | Rapid prototyping, trusted environments | Production, public systems |

## Security Best Practices

### Manual Engines
- 🔐 Store private keys securely (environment variables, KMS, HSM)
- 🔒 Encrypt escrow keys at rest using AES-256-GCM
- 🛡️ Implement rate limiting to prevent abuse
- 🔑 Use secure authentication for payout endpoints
- 📊 Monitor and log all transactions
- 🚨 Set up alerts for suspicious activity

### Smart Contract Engines
- 🔍 Audit all PyTEAL/TEAL code before deployment
- 🧪 Test extensively on TestNet
- 🔐 Secure operator/owner keys
- 🎫 Implement nonce mechanisms to prevent replay attacks
- 💰 Fund contract accounts with appropriate reserves
- ⚖️ Account for minimum balance requirements
- ✅ Validate all inputs on-chain
- 🔗 Use atomic transactions for multi-step operations

## Use Cases

### Gaming
- **Tournament Prizes**: Automatic reward distribution to winners
- **Achievement Rewards**: Unlock rewards for completing milestones
- **PvP Wagering**: Escrow for player-vs-player matches
- **Leaderboard Rewards**: Periodic payouts to top players

### DeFi
- **Yield Distribution**: Automated yield farming rewards
- **Liquidity Mining**: Reward liquidity providers
- **Governance Rewards**: Distribute tokens to voters
- **Staking Rewards**: Pay staking participants

### NFTs & Digital Assets
- **Creator Royalties**: Automatic royalty distribution
- **Drop Rewards**: Reward early supporters
- **Auction Escrow**: Hold bids until auction ends
- **Trading Escrow**: P2P NFT trading with security

### Business & Commerce
- **Affiliate Payouts**: Distribute commissions
- **Loyalty Programs**: Reward customer engagement
- **Referral Bonuses**: Pay for successful referrals
- **Milestone Payments**: Escrow for project deliverables

## Development Roadmap

### Phase 1: Algorand ✅
- [x] Manual Rewards
- [x] Smart Contract Rewards
- [x] Manual Escrow
- [x] Smart Contract Escrow

### Phase 2: Additional Chains 🚧
- [ ] Bitcoin (BTC) - Multi-sig escrow
- [ ] Ethereum (ETH) - ERC-20 rewards, smart contract escrow
- [ ] Solana (SOL) - Program-based distribution
- [ ] Polkadot (DOT) - Substrate-based mechanisms

### Phase 3: Advanced Features 📋
- [ ] Multi-token support (mixed currencies)
- [ ] Scheduled/recurring distributions
- [ ] Conditional payouts (oracle integration)
- [ ] Cross-chain distribution
- [ ] Batch processing optimization
- [ ] Gas optimization strategies

## Testing

All distribution engines should be thoroughly tested on TestNet before production use:

```typescript
// Example test suite structure
describe('AlgorandRewarder', () => {
  it('should send ALGO rewards', async () => {
    // Test manual ALGO rewards
  });

  it('should send ASA rewards', async () => {
    // Test Algorand Standard Asset rewards
  });

  it('should handle address resolution', async () => {
    // Test human-readable address resolution
  });
});
```

## API Reference

See individual blockchain subdirectories for detailed API documentation:
- [Algorand API Reference](./ALGO.Algorand/README.md)

## Contributing

When adding a new blockchain:

1. Create a new subdirectory: `{TICKER}.{Name}/`
2. Implement the four core engines:
   - `{TICKER}.{Name}.rewards.manual.ts`
   - `{TICKER}.{Name}.rewards.smartContract.ts`
   - `{TICKER}.{Name}.escrow.manual.ts`
   - `{TICKER}.{Name}.escrow.smartContract.ts`
3. Create `index.ts` with exports and metadata
4. Create `README.md` with usage examples
5. Update this main README with the new blockchain
6. Add comprehensive tests

## Resources

### Algorand
- [Algorand Developer Portal](https://developer.algorand.org/)
- [AlgoSDK Documentation](https://algorand.github.io/js-algorand-sdk/)
- [PyTEAL Documentation](https://pyteal.readthedocs.io/)
- [Algorand TestNet Faucet](https://bank.testnet.algorand.network/)

### General
- [Distribution Engine Best Practices](./docs/best-practices.md)
- [Security Guidelines](./docs/security.md)
- [Testing Guide](./docs/testing.md)

## License

This project is licensed under the same license as the parent project.

## Support

For issues, questions, or contributions:
- Open an issue in the repository
- Refer to blockchain-specific documentation
- Join our community channels

---

**⚠️ Important**: Always test on TestNet before using on MainNet. Never expose private keys or mnemonics in client-side code or public repositories.

