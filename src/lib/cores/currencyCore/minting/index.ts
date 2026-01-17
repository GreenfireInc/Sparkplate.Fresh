/**
 * Minting Index - Token and NFT creation mechanisms
 * 
 * This module exports minting implementations for creating fungible tokens (FTs)
 * and non-fungible tokens (NFTs) across multiple blockchain networks.
 * 
 * Structure:
 *   - Token Minting: Birthday tokens and custom fungible tokens
 *   - NFT Minting: IPFS-based and Arweave-based NFT creation
 *   - Blockchain Inscriptions: Bitcoin OP_RETURN data inscriptions
 * 
 * Supported Networks:
 *   ALGO, AR, ATOM, BNB, BTC, DOT, ETC, ETH, LUNA, LUNC, SOL, STX, TRX, WAVES, XLM, XRP, XTZ
 * 
 * Usage:
 *   import { TokenMinting, NFTMinting, BlockchainInscriptions } from '@minting';
 * 
 * Token Minting Example:
 *   const creator = new TokenMinting.ArweaveTokens.ArweaveBirthdayTokenCreator();
 *   await creator.deployToken(privateKey, { initials: "CS", birthYear: 1985 });
 * 
 * NFT Minting Example (IPFS):
 *   const minter = new NFTMinting.IPFS.EthereumIPFS.EthereumPinataNFTMinter(apiKey);
 *   await minter.mintNFT(wallet, metadata, imageFile);
 * 
 * NFT Minting Example (Arweave):
 *   const minter = new NFTMinting.Arweave.EthereumArweave.EthereumArweaveNFTMinter(arKey);
 *   await minter.mintNFT(wallet, metadata, imageFile);
 * 
 * Last Updated: December 2025
 * Source: Token and NFT minting implementations across all supported blockchains
 */

// ============================================================================
// TOKEN MINTING
// ============================================================================

/**
 * Token Minting Modules
 * Exports all fungible token creation mechanisms including birthday tokens
 */
export * as TokenMinting from './token';

// ============================================================================
// NFT MINTING
// ============================================================================

/**
 * NFT Minting Modules
 * Exports all non-fungible token creation mechanisms
 */

// IPFS-based NFT Minting
// Upload metadata and assets to IPFS providers (Pinata, Infura, NFT.Storage, etc.)
export * as NFTMintingIPFS from './nft/ipfs';

// Arweave Direct NFT Minting
// Store NFT assets permanently on Arweave with blockchain-native minting
export * as NFTMintingArweave from './nft/on.Arweave';

// Re-export grouped under NFTMinting namespace
export const NFTMinting = {
  IPFS: await import('./nft/ipfs'),
  Arweave: await import('./nft/on.Arweave')
};

// ============================================================================
// BLOCKCHAIN INSCRIPTIONS
// ============================================================================

/**
 * Blockchain Inscription Modules
 * Bitcoin OP_RETURN inscriptions for storing data from various blockchains
 */
export * as BlockchainInscriptions from './blockchain';

// ============================================================================
// CONVENIENCE EXPORTS
// ============================================================================

// Direct exports for common use cases
export { ArweaveTokens } from './token';
export { AlgorandIPFS, EthereumIPFS, SolanaIPFS, TezosIPFS } from './nft/ipfs';
export { ArweaveDirect, EthereumArweave, SolanaArweave } from './nft/on.Arweave';
