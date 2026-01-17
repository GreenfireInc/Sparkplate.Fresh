# Polkadot (DOT) Distribution Engines

This directory contains distribution engine implementations for Polkadot/Substrate blockchain, providing both reward distribution and escrow functionality for gaming applications.

## Contents

### Reward Systems
- **DOT.Polkadot.rewards.manual.ts**: Server-side manual reward distribution
- **DOT.Polkadot.rewards.smartContract.ts**: ink! smart contract-based rewards

### Escrow Systems
- **DOT.Polkadot.escrow.manual.ts**: Server-managed escrow for peer-to-peer gaming
- **DOT.Polkadot.escrow.smartContract.ts**: ink! smart contract-based escrow

## Features

### Manual Rewards
- Direct wallet-to-wallet DOT transfers
- Substrate-based transaction building
- SS58 address format support
- Polkadot/Kusama/Westend network support
- Secure mnemonic management (server-side only)
- Fast block finality (6-12 seconds)

### Smart Contract Rewards
- ink! smart contract language (Rust-based WASM)
- Server-signed attestations for validation
- Trustless reward distribution
- Claim-based reward mechanism
- Prevents double-claiming

### Manual Escrow
- AES-256-GCM encrypted mnemonic storage
- Server-controlled pot distribution
- Two-player game support
- Automatic deposit verification
- Existential deposit handling

### Smart Contract Escrow
- ink! smart contract-based escrow
- On-chain pot management
- Server-verified winner payout
- Player deposit verification
- Immutable game rules

## Usage

```typescript
import { 
  PolkadotRewarder, 
  PolkadotGameRewardManager,
  PolkadotGameEscrow,
  PolkadotSmartContractRewarder
} from './DOT.Polkadot';

// Manual rewards
const rewarder = new PolkadotRewarder('polkadot');
await rewarder.initialize();

const gameManager = new PolkadotGameRewardManager(
  {
    rewardThreshold: 100,
    rewardAmountDOT: 1,
    network: 'polkadot'
  },
  {
    mnemonic: process.env.POLKADOT_MNEMONIC!,
    network: 'polkadot'
  }
);

await gameManager.initialize();
await gameManager.startGame('15oF4...');

// Manual escrow
const escrow = new PolkadotGameEscrow({
  betAmountDOT: 10,
  player1Address: '15oF4...',
  player2Address: '14E5n...',
  hostEncryptionKey: PolkadotGameEscrow.generateHostEncryptionKey(),
  network: 'polkadot'
});

await escrow.initialize();
const escrowAddress = await escrow.createEscrowWallet();
await escrow.canStartGame();
await escrow.distributePot('15oF4...');

// Cleanup
await escrow.disconnect();
```

## Polkadot Network Details

### Network Parameters
- **Block Time**: ~6 seconds (Polkadot), ~6 seconds (Kusama)
- **Finality**: 6-12 seconds (GRANDPA finality)
- **Decimals**: 10 (1 DOT = 10^10 Planck)
- **Existential Deposit**: 1 DOT (Polkadot), 0.00333 KSM (Kusama)
- **Consensus**: Nominated Proof-of-Stake (NPoS)

### Supported Networks

#### Polkadot (Mainnet)
- RPC: `wss://rpc.polkadot.io`
- Symbol: DOT
- Chain ID: 0
- SS58 Prefix: 0

#### Kusama (Canary Network)
- RPC: `wss://kusama-rpc.polkadot.io`
- Symbol: KSM
- Chain ID: 2
- SS58 Prefix: 2

#### Westend (Testnet)
- RPC: `wss://westend-rpc.polkadot.io`
- Symbol: WND
- Chain ID: 42
- SS58 Prefix: 42
- Faucet: https://faucet.polkadot.io/westend

### Address Format (SS58)

Polkadot uses SS58 address encoding:
- Polkadot addresses start with '1'
- Kusama addresses start with capital letters (e.g., 'D', 'F', 'G')
- Westend addresses start with '5'

Example addresses:
- Polkadot: `15oF4uVJwmo4TdGW7VfQxNLavjCXviqxT9S1MgbjMNHr6Sp5`
- Kusama: `FLSigzvJPPscgs72m9TiYUqNGLMCRkPwRnFQq5zCUo8Lqah`
- Westend: `5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY`

## Smart Contract Capabilities

### ink! Smart Contracts

ink! is Polkadot's native smart contract language:

**Features:**
- Rust-based (safe, efficient)
- Compiles to WebAssembly (WASM)
- Integrated with Substrate's Contracts pallet
- Lower gas costs than EVM
- Formal verification support

**Example Contract Structure:**
```rust
#[ink::contract]
mod my_contract {
    #[ink(storage)]
    pub struct MyContract { /* ... */ }
    
    #[ink(constructor)]
    pub fn new() -> Self { /* ... */ }
    
    #[ink(message)]
    pub fn my_function(&self) { /* ... */ }
}
```

### Contracts Pallet

The Contracts pallet provides:
- Gas metering
- Storage rent
- Contract instantiation
- Message calls
- Event emission

### Alternative: Moonbeam (EVM-compatible)

For Ethereum-compatible contracts, consider Moonbeam parachain:
- Full EVM compatibility
- Solidity support
- Web3 API compatibility

## Transaction Fees

Polkadot uses a weight-based fee system:

```typescript
// Fee calculation
const info = await api.tx.balances.transfer(dest, value).paymentInfo(sender);
console.log('Fee:', info.partialFee.toHuman());

// Typical transfer fee: ~0.01 DOT
```

## Existential Deposit

Polkadot requires minimum balance to keep accounts alive:
- **Polkadot**: 1 DOT
- **Kusama**: 0.00333 KSM
- **Westend**: 0.01 WND

Accounts below this threshold are reaped (deleted).

## Key Management

### Mnemonic Phrases
- 12 or 24-word BIP39 mnemonics
- Derivation path support
- HD wallet capabilities

### Cryptography
- **sr25519**: Schnorr signatures (default, recommended)
- **ed25519**: Edwards-curve signatures
- **ecdsa**: Secp256k1 (Bitcoin/Ethereum compatible)

## API Connection

```typescript
import { ApiPromise, WsProvider } from '@polkadot/api';

// Connect to network
const provider = new WsProvider('wss://rpc.polkadot.io');
const api = await ApiPromise.create({ provider });

// Always disconnect when done
await api.disconnect();
```

## Security

- **Private Keys**: Always keep mnemonics server-side
- **Encryption**: Use strong encryption for stored mnemonics
- **Existential Deposit**: Account for minimum balance requirements
- **Finality**: Wait for finalization (not just inclusion)
- **Validation**: Verify all transactions on-chain
- **Nonce Management**: Handle nonce correctly for multiple transactions

## Dependencies

```json
{
  "@polkadot/api": "^10.x",
  "@polkadot/api-contract": "^10.x",
  "@polkadot/keyring": "^12.x",
  "@polkadot/util-crypto": "^12.x",
  "crypto": "node built-in"
}
```

## Parachain Ecosystem

Polkadot's unique architecture includes:
- **Relay Chain**: Main chain providing security
- **Parachains**: Specialized blockchains
- **Bridges**: Cross-chain communication

Relevant parachains for gaming:
- **Moonbeam**: EVM-compatible
- **Astar**: Smart contracts + dApp staking
- **Acala**: DeFi hub
- **Phala**: Confidential contracts

## Resources

- [Polkadot Documentation](https://wiki.polkadot.network/)
- [Substrate Documentation](https://docs.substrate.io/)
- [ink! Documentation](https://use.ink/)
- [Polkadot.js Documentation](https://polkadot.js.org/docs/)
- [Polkadot Explorer](https://polkadot.subscan.io/)
- [Kusama Explorer](https://kusama.subscan.io/)

## Advanced Features

### Nomination Pools
For staking rewards integration.

### Treasury
For community-funded game rewards.

### XCM (Cross-Consensus Messaging)
For cross-parachain asset transfers.

### Identity Pallet
For verified player identities.

---

Built on Substrate framework with enterprise-grade security and scalability.
