# Ethereum (ETH) Distribution Engines

**The World Computer** - Programmable blockchain platform

This directory contains distribution engine implementations for Ethereum, providing both reward distribution and escrow functionality for gaming applications.

## Features

### Manual Rewards
- Direct wallet-to-wallet ETH transfers
- ERC-20 token support
- EIP-1559 gas optimization
- Score-based automatic reward distribution

### Smart Contract Rewards
- Solidity-based on-chain contracts
- Server-signed attestations
- Trustless reward distribution
- Claim-based mechanism

### Manual Escrow
- AES-256-GCM encrypted storage
- Server-controlled pot distribution
- EIP-1559 gas optimization
- Two-player game support

### Smart Contract Escrow
- Solidity escrow contract
- On-chain pot management
- Server-verified winner payout
- Refund mechanism

## Network Configuration

### Mainnet
- **RPC**: `https://eth.llamarpc.com`
- **Chain ID**: 1
- **Symbol**: ETH
- **Consensus**: Proof-of-Stake

### Sepolia (Testnet)
- **RPC**: `https://rpc.sepolia.org`
- **Chain ID**: 11155111
- **Faucet**: https://sepoliafaucet.com/

### Goerli (Testnet - Deprecated)
- **RPC**: `https://rpc.ankr.com/eth_goerli`
- **Chain ID**: 5

## Usage

\`\`\`typescript
import { 
  EthereumRewarder, 
  EthereumGameRewardManager
} from './ETH.Ethereum';

const gameManager = new EthereumGameRewardManager(
  {
    rewardThreshold: 100,
    rewardAmount: '0.01',
    network: 'mainnet'
  },
  {
    privateKey: process.env.ETH_PRIVATE_KEY!,
    network: 'mainnet'
  }
);

await gameManager.initialize();
await gameManager.startGame('0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb');
\`\`\`

## EIP-1559 Gas System

Ethereum uses EIP-1559 for gas fees:
- **Base Fee**: Algorithmically determined
- **Priority Fee**: Tip to miners/validators
- **Max Fee**: Maximum willing to pay

## Key Advantages

- **Largest Ecosystem**: Most developers and projects
- **EVM Standard**: Most copied architecture
- **DeFi Hub**: Largest TVL
- **NFT Marketplace**: Most active
- **Layer 2 Solutions**: Optimism, Arbitrum, zkSync

## Dependencies

\`\`\`json
{
  "ethers": "^6.x",
  "crypto": "node built-in"
}
\`\`\`

## Resources

- [Ethereum.org](https://ethereum.org/)
- [Etherscan](https://etherscan.io/)
- [Sepolia Explorer](https://sepolia.etherscan.io/)

---

**The World Computer** - Build decentralized gaming experiences on Ethereum.
