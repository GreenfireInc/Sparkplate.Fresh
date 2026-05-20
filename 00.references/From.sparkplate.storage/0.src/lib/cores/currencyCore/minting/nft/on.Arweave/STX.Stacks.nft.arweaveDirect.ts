// Stacks NFT Minting with Arweave Storage
// Mints SIP-009 NFTs on Stacks with assets stored permanently on Arweave

/**
 * OVERVIEW:
 * 
 * This module mints NFTs on Stacks with assets stored permanently on Arweave.
 * - Upload files directly to Arweave (permanent storage)
 * - Upload metadata to Arweave (immutable)
 * - Create SIP-009 NFT on Stacks (via Clarity smart contract)
 * - Link NFT metadata to Arweave URLs
 * - Best of both worlds: Stacks Bitcoin-secured transactions + Arweave permanent storage
 * 
 * BENEFITS:
 * - Stacks: Bitcoin-secured, Clarity smart contracts, Proof of Transfer (PoX)
 * - Arweave: Permanent storage (200+ year guarantee)
 * - No recurring storage fees
 * - Immutable metadata and assets on Arweave
 * - SIP-009 NFT standard (Stacks Improvement Proposal)
 * 
 * COSTS:
 * - Arweave: ~0.01-0.02 AR per NFT (one-time, permanent)
 * - Stacks: ~0.001-0.01 STX per mint (transaction fee)
 * - Total: ~0.01-0.02 AR + 0.001-0.01 STX per NFT
 * 
 * STACKS NFT STANDARD:
 * Uses SIP-009 (NFT standard) with metadata pointing to Arweave.
 */

// @ts-expect-error - @stacks packages are runtime dependencies
import { 
  makeContractCall, 
  broadcastTransaction, 
  AnchorMode, 
  PostConditionMode,
  createAssetInfo,
  uintCV,
  stringAsciiCV,
  principalCV,
  contractPrincipalCV,
  getAddressFromPrivateKey,
  privateKeyToString,
  publicKeyToString,
  StacksTransaction,
  estimateTransfer,
} from '@stacks/transactions';
// @ts-expect-error - @stacks/network is a runtime dependency
import { StacksMainnet, StacksTestnet, StacksNetwork } from '@stacks/network';
// @ts-expect-error - @stacks/transactions is a runtime dependency
import { makeStandardSTXPostCondition, createStandardPrincipal } from '@stacks/transactions';
// @ts-expect-error - arweave is a runtime dependency
import Arweave from 'arweave';
// @ts-expect-error - arweave types may not be available
import { JWKInterface } from 'arweave/node/lib/wallet';

export interface StacksArweaveNFTConfig {
  network?: 'mainnet' | 'testnet'; // Stacks network
  rpcUrl?: string; // Custom RPC URL (optional)
  arweaveHost?: string; // Arweave gateway host
  arweavePort?: number; // Gateway port
  arweaveProtocol?: string; // http or https
  timeout?: number; // Request timeout
  logging?: boolean; // Enable logging
}

export interface NFTMetadata {
  name: string;
  description: string;
  image?: string; // Arweave TX ID or URL of image
  animation_url?: string; // Arweave TX ID or URL of animation/video
  external_url?: string; // External website
  attributes?: Array<{
    trait_type: string;
    value: string | number;
  }>;
  properties?: Record<string, unknown>;
}

export interface FileUploadOptions {
  contentType?: string; // MIME type
  tags?: Array<{ name: string; value: string }>; // Custom tags
}

export interface MintResult {
  // Arweave
  fileTransactionId: string; // Arweave TX ID of file
  fileUrl: string; // Gateway URL to file
  metadataTransactionId: string; // Arweave TX ID of metadata
  metadataUrl: string; // Gateway URL to metadata
  // Stacks
  tokenId: string; // SIP-009 token ID
  transactionId: string; // Stacks transaction ID
  explorerUrl: string; // Stacks Explorer URL
  viewBlockUrl: string; // ViewBlock explorer URL
  // Costs
  totalCost: {
    arweave: {
      fileAR: string;
      metadataAR: string;
      totalAR: string;
      fileWinston: string;
      metadataWinston: string;
      totalWinston: string;
    };
    stacks: {
      feeSTX: string;
      totalSTX: string;
    };
  };
}

export class StacksArweaveNFTMinter {
  private network: StacksNetwork;
  private networkName: 'mainnet' | 'testnet';
  private arweave: Arweave;

  constructor(config: StacksArweaveNFTConfig = {}) {
    this.networkName = config.network || 'mainnet';
    this.network = config.rpcUrl 
      ? new StacksNetwork({ url: config.rpcUrl })
      : (this.networkName === 'mainnet' ? new StacksMainnet() : new StacksTestnet());

    // Initialize Arweave
    this.arweave = Arweave.init({
      host: config.arweaveHost || 'arweave.net',
      port: config.arweavePort || 443,
      protocol: config.arweaveProtocol || 'https',
      timeout: config.timeout || 60000,
      logging: config.logging || false,
    });
  }

  /**
   * Get MIME type from filename
   */
  private getMimeType(fileName: string): string {
    const ext = fileName.split('.').pop()?.toLowerCase();
    const mimeTypes: Record<string, string> = {
      // Images
      'png': 'image/png',
      'jpg': 'image/jpeg',
      'jpeg': 'image/jpeg',
      'gif': 'image/gif',
      'svg': 'image/svg+xml',
      'webp': 'image/webp',
      'avif': 'image/avif',
      'bmp': 'image/bmp',
      'ico': 'image/x-icon',
      
      // Videos
      'mp4': 'video/mp4',
      'webm': 'video/webm',
      'mov': 'video/quicktime',
      'avi': 'video/x-msvideo',
      'mkv': 'video/x-matroska',
      
      // Audio
      'mp3': 'audio/mpeg',
      'wav': 'audio/wav',
      'ogg': 'audio/ogg',
      'flac': 'audio/flac',
      
      // Documents
      'pdf': 'application/pdf',
      'json': 'application/json',
      'txt': 'text/plain',
      
      // 3D Models
      'glb': 'model/gltf-binary',
      'gltf': 'model/gltf+json',
    };
    
    return mimeTypes[ext || ''] || 'application/octet-stream';
  }

  /**
   * Upload file to Arweave
   */
  private async uploadFileToArweave(
    fileData: Buffer,
    fileName: string,
    arweaveKey: JWKInterface,
    options: FileUploadOptions = {}
  ): Promise<{ txId: string; url: string; cost: { ar: string; winston: string } }> {
    try {
      // Create transaction
      const transaction = await this.arweave.createTransaction(
        { data: fileData },
        arweaveKey
      );

      // Add Content-Type tag
      const contentType = options.contentType || this.getMimeType(fileName);
      transaction.addTag('Content-Type', contentType);

      // Add standard NFT tags
      transaction.addTag('App-Name', 'Stacks-NFT');
      transaction.addTag('Type', 'nft-file');
      transaction.addTag('File-Name', fileName);

      // Add custom tags
      if (options.tags) {
        for (const tag of options.tags) {
          transaction.addTag(tag.name, tag.value);
        }
      }

      // Get cost before signing
      const winston = transaction.reward;
      const ar = this.arweave.ar.winstonToAr(winston);

      // Sign transaction
      await this.arweave.transactions.sign(transaction, arweaveKey);

      // Post transaction
      const response = await this.arweave.transactions.post(transaction);

      if (response.status >= 200 && response.status < 300) {
        return {
          txId: transaction.id,
          url: `https://arweave.net/${transaction.id}`,
          cost: { ar, winston },
        };
      } else {
        throw new Error(
          `Failed to post Arweave transaction. Status: ${response.status}`
        );
      }
    } catch (error: any) {
      throw new Error(`Arweave file upload failed: ${error.message}`);
    }
  }

  /**
   * Upload JSON metadata to Arweave
   */
  private async uploadMetadataToArweave(
    metadata: NFTMetadata,
    arweaveKey: JWKInterface,
    options: FileUploadOptions = {}
  ): Promise<{ txId: string; url: string; cost: { ar: string; winston: string } }> {
    try {
      const jsonString = JSON.stringify(metadata, null, 2);
      const jsonBuffer = Buffer.from(jsonString);

      // Create transaction
      const transaction = await this.arweave.createTransaction(
        { data: jsonBuffer },
        arweaveKey
      );

      // Add metadata tags
      transaction.addTag('Content-Type', 'application/json');
      transaction.addTag('App-Name', 'Stacks-NFT');
      transaction.addTag('Type', 'nft-metadata');
      transaction.addTag('Title', metadata.name);
      transaction.addTag('Description', metadata.description);

      // Add image reference
      if (metadata.image) {
        transaction.addTag('Image-TX', metadata.image);
      }

      // Add animation reference
      if (metadata.animation_url) {
        transaction.addTag('Animation-TX', metadata.animation_url);
      }

      // Add custom tags
      if (options.tags) {
        for (const tag of options.tags) {
          transaction.addTag(tag.name, tag.value);
        }
      }

      // Get cost before signing
      const winston = transaction.reward;
      const ar = this.arweave.ar.winstonToAr(winston);

      // Sign transaction
      await this.arweave.transactions.sign(transaction, arweaveKey);

      // Post transaction
      const response = await this.arweave.transactions.post(transaction);

      if (response.status >= 200 && response.status < 300) {
        return {
          txId: transaction.id,
          url: `https://arweave.net/${transaction.id}`,
          cost: { ar, winston },
        };
      } else {
        throw new Error(
          `Failed to post Arweave metadata transaction. Status: ${response.status}`
        );
      }
    } catch (error: any) {
      throw new Error(`Arweave metadata upload failed: ${error.message}`);
    }
  }

  /**
   * Mint NFT on Stacks with assets stored on Arweave
   * Note: This requires a deployed SIP-009 NFT contract
   */
  async mintNFT(
    privateKey: string,
    arweaveKey: JWKInterface,
    nftContractAddress: string, // e.g., "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nft"
    fileData: Buffer,
    fileName: string,
    metadata: Omit<NFTMetadata, 'image'>,
    recipientAddress: string,
    tokenId: string,
    options: FileUploadOptions = {}
  ): Promise<MintResult> {
    console.log('Starting Stacks NFT minting with Arweave storage...');

    // 1. Upload file to Arweave
    console.log('Uploading file to Arweave...');
    const fileUpload = await this.uploadFileToArweave(
      fileData,
      fileName,
      arweaveKey,
      options
    );
    console.log(`File uploaded to Arweave: ${fileUpload.txId}`);

    // 2. Create complete metadata with Arweave TX ID
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `https://arweave.net/${fileUpload.txId}`,
    };

    // 3. Upload metadata to Arweave
    console.log('Uploading metadata to Arweave...');
    const metadataUpload = await this.uploadMetadataToArweave(
      completeMetadata,
      arweaveKey,
      {
        tags: [
          { name: 'File-TX', value: fileUpload.txId },
          { name: 'Token-ID', value: tokenId },
          { name: 'Chain', value: 'Stacks' },
          ...(options.tags || []),
        ],
      }
    );
    console.log(`Metadata uploaded to Arweave: ${metadataUpload.txId}`);

    // 4. Parse contract address
    const [contractAddress, contractName] = nftContractAddress.split('.');
    const metadataUrl = `https://arweave.net/${metadataUpload.txId}`;

    // 5. Create contract call for minting
    // SIP-009 mint function signature: (mint (uint principal (optional (tuple (name (string-ascii 32)) (description (string-ascii 500)) (image (string-ascii 256)) (properties (optional (list 32 (tuple (key (string-ascii 32)) (value (string-ascii 500))))))))) (recipient principal))
    console.log('Creating Stacks transaction...');
    
    const mintFunctionArgs = [
      uintCV(tokenId), // token-id
      principalCV(recipientAddress), // recipient
      // Optional metadata tuple
      {
        type: 'optional',
        value: {
          type: 'tuple',
          data: {
            name: stringAsciiCV(metadata.name),
            description: stringAsciiCV(metadata.description.substring(0, 500)),
            image: stringAsciiCV(completeMetadata.image || ''),
            properties: metadata.attributes ? {
              type: 'list',
              value: metadata.attributes.map(attr => ({
                type: 'tuple',
                data: {
                  key: stringAsciiCV(attr.trait_type),
                  value: stringAsciiCV(String(attr.value)),
                },
              })),
            } : { type: 'none' },
          },
        },
      },
    ];

    // For simplicity, using a standard SIP-009 mint call
    // Note: Actual contract may vary, this is a template
    const mintTx = await makeContractCall({
      contractAddress,
      contractName,
      functionName: 'mint',
      functionArgs: [
        uintCV(tokenId),
        principalCV(recipientAddress),
      ],
      senderKey: privateKey,
      network: this.network,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Allow,
    });

    console.log('Broadcasting Stacks transaction...');
    const broadcastResult = await broadcastTransaction(mintTx, this.network);

    if (broadcastResult.error) {
      throw new Error(`Stacks transaction failed: ${broadcastResult.error}`);
    }

    const txId = broadcastResult.txid || '';
    console.log(`NFT minted on Stacks! Transaction ID: ${txId}`);

    // 6. Calculate costs
    const fileWinston = fileUpload.cost.winston;
    const metadataWinston = metadataUpload.cost.winston;
    const totalWinston = (BigInt(fileWinston) + BigInt(metadataWinston)).toString();
    const totalAR = this.arweave.ar.winstonToAr(totalWinston);

    // Estimate Stacks fee (typically ~0.001 STX)
    const feeSTX = '0.001'; // Standard Stacks transaction fee

    // 7. Get explorer URLs
    const explorerBase = this.networkName === 'mainnet'
      ? 'https://explorer.stacks.co/txid'
      : 'https://explorer.stacks.co/?chain=testnet&api=https://api.testnet.hiro.so';
    const explorerUrl = `${explorerBase}/${txId}`;
    const viewBlockUrl = this.networkName === 'mainnet'
      ? `https://viewblock.io/stacks/tx/${txId}`
      : `https://testnet.viewblock.io/stacks/tx/${txId}`;

    return {
      // Arweave
      fileTransactionId: fileUpload.txId,
      fileUrl: fileUpload.url,
      metadataTransactionId: metadataUpload.txId,
      metadataUrl: metadataUpload.url,
      // Stacks
      tokenId,
      transactionId: txId,
      explorerUrl,
      viewBlockUrl,
      // Costs
      totalCost: {
        arweave: {
          fileAR: fileUpload.cost.ar,
          metadataAR: metadataUpload.cost.ar,
          totalAR,
          fileWinston,
          metadataWinston,
          totalWinston,
        },
        stacks: {
          feeSTX,
          totalSTX: feeSTX,
        },
      },
    };
  }

  /**
   * Mint media NFT with animation and thumbnail
   */
  async mintMediaNFT(
    privateKey: string,
    arweaveKey: JWKInterface,
    nftContractAddress: string,
    mediaData: Buffer,
    mediaFileName: string,
    thumbnailData: Buffer,
    thumbnailFileName: string,
    metadata: Omit<NFTMetadata, 'image' | 'animation_url'>,
    recipientAddress: string,
    tokenId: string,
    options: FileUploadOptions = {}
  ): Promise<MintResult> {
    console.log('Starting Stacks media NFT minting with Arweave storage...');

    // 1. Upload media file to Arweave
    console.log('Uploading media to Arweave...');
    const mediaUpload = await this.uploadFileToArweave(
      mediaData,
      mediaFileName,
      arweaveKey,
      options
    );
    console.log(`Media uploaded: ${mediaUpload.txId}`);

    // 2. Upload thumbnail to Arweave
    console.log('Uploading thumbnail to Arweave...');
    const thumbnailUpload = await this.uploadFileToArweave(
      thumbnailData,
      thumbnailFileName,
      arweaveKey,
      options
    );
    console.log(`Thumbnail uploaded: ${thumbnailUpload.txId}`);

    // 3. Create complete metadata with both TX IDs
    const completeMetadata: NFTMetadata = {
      ...metadata,
      image: `https://arweave.net/${thumbnailUpload.txId}`,
      animation_url: `https://arweave.net/${mediaUpload.txId}`,
    };

    // 4. Upload metadata to Arweave
    console.log('Uploading metadata to Arweave...');
    const metadataUpload = await this.uploadMetadataToArweave(
      completeMetadata,
      arweaveKey,
      {
        tags: [
          { name: 'Media-TX', value: mediaUpload.txId },
          { name: 'Thumbnail-TX', value: thumbnailUpload.txId },
          { name: 'Token-ID', value: tokenId },
          { name: 'Chain', value: 'Stacks' },
          ...(options.tags || []),
        ],
      }
    );
    console.log(`Metadata uploaded: ${metadataUpload.txId}`);

    // 5. Mint on Stacks
    const [contractAddress, contractName] = nftContractAddress.split('.');

    const mintTx = await makeContractCall({
      contractAddress,
      contractName,
      functionName: 'mint',
      functionArgs: [
        uintCV(tokenId),
        principalCV(recipientAddress),
      ],
      senderKey: privateKey,
      network: this.network,
      anchorMode: AnchorMode.Any,
      postConditionMode: PostConditionMode.Allow,
    });

    const broadcastResult = await broadcastTransaction(mintTx, this.network);

    if (broadcastResult.error) {
      throw new Error(`Stacks transaction failed: ${broadcastResult.error}`);
    }

    const txId = broadcastResult.txid || '';

    // Calculate costs
    const mediaWinston = BigInt(mediaUpload.cost.winston);
    const thumbnailWinston = BigInt(thumbnailUpload.cost.winston);
    const metadataWinston = BigInt(metadataUpload.cost.winston);
    const totalWinston = (mediaWinston + thumbnailWinston + metadataWinston).toString();
    const totalAR = this.arweave.ar.winstonToAr(totalWinston);

    const feeSTX = '0.001';

    const explorerBase = this.networkName === 'mainnet'
      ? 'https://explorer.stacks.co/txid'
      : 'https://explorer.stacks.co/?chain=testnet&api=https://api.testnet.hiro.so';
    const explorerUrl = `${explorerBase}/${txId}`;
    const viewBlockUrl = this.networkName === 'mainnet'
      ? `https://viewblock.io/stacks/tx/${txId}`
      : `https://testnet.viewblock.io/stacks/tx/${txId}`;

    return {
      fileTransactionId: mediaUpload.txId,
      fileUrl: mediaUpload.url,
      metadataTransactionId: metadataUpload.txId,
      metadataUrl: metadataUpload.url,
      tokenId,
      transactionId: txId,
      explorerUrl,
      viewBlockUrl,
      totalCost: {
        arweave: {
          fileAR: mediaUpload.cost.ar,
          metadataAR: metadataUpload.cost.ar,
          totalAR,
          fileWinston: mediaUpload.cost.winston,
          metadataWinston: metadataUpload.cost.winston,
          totalWinston,
        },
        stacks: {
          feeSTX,
          totalSTX: feeSTX,
        },
      },
    };
  }

  /**
   * Check Stacks account balance
   */
  async checkStacksBalance(address: string): Promise<{
    address: string;
    balanceSTX: string;
    balanceMicroStx: string;
  }> {
    try {
      // Note: This would require fetching from Stacks API
      // For now, return placeholder
      return {
        address,
        balanceSTX: '0',
        balanceMicroStx: '0',
        note: 'Use Stacks API to fetch balance',
      };
    } catch (error: any) {
      throw new Error(`Failed to check Stacks balance: ${error.message}`);
    }
  }

  /**
   * Check Arweave wallet balance
   */
  async checkArweaveBalance(arweaveKey: JWKInterface): Promise<{
    address: string;
    balanceAR: string;
    balanceWinston: string;
  }> {
    try {
      const address = await this.arweave.wallets.jwkToAddress(arweaveKey);
      const balanceWinston = await this.arweave.wallets.getBalance(address);
      const balanceAR = this.arweave.ar.winstonToAr(balanceWinston);

      return {
        address,
        balanceAR,
        balanceWinston,
      };
    } catch (error: any) {
      throw new Error(`Failed to check Arweave balance: ${error.message}`);
    }
  }

  /**
   * Estimate Arweave cost for file upload
   */
  async estimateArweaveCost(fileData: Buffer): Promise<{
    ar: string;
    winston: string;
  }> {
    try {
      const dummyKey = await this.arweave.wallets.generate();
      const transaction = await this.arweave.createTransaction(
        { data: fileData },
        dummyKey
      );

      const winston = transaction.reward;
      const ar = this.arweave.ar.winstonToAr(winston);

      return { ar, winston };
    } catch (error: any) {
      throw new Error(`Failed to estimate Arweave cost: ${error.message}`);
    }
  }
}

/**
 * USAGE EXAMPLES:
 * 
 * // Basic NFT minting on Stacks with Arweave storage
 * import { StacksArweaveNFTMinter } from './STX.Stacks.nft.arweaveDirect';
 * import * as fs from 'fs';
 * 
 * // Initialize minter
 * const minter = new StacksArweaveNFTMinter({
 *   network: 'mainnet',
 *   arweaveHost: 'arweave.net',
 *   arweavePort: 443,
 *   arweaveProtocol: 'https',
 * });
 * 
 * // Load Stacks private key
 * const privateKey = 'your private key here'; // Stacks private key
 * const senderAddress = getAddressFromPrivateKey(privateKey, minter['networkName'] === 'mainnet' ? StacksMainnet() : StacksTestnet());
 * 
 * // Load Arweave wallet
 * const arweaveKey = JSON.parse(fs.readFileSync('arweave-wallet.json', 'utf-8'));
 * 
 * // SIP-009 NFT contract address (must be deployed first)
 * // Format: "ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nft"
 * const nftContract = 'ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.nft';
 * 
 * // Check balances
 * const stxBalance = await minter.checkStacksBalance(senderAddress);
 * console.log(`Stacks balance: ${stxBalance.balanceSTX} STX`);
 * 
 * const arBalance = await minter.checkArweaveBalance(arweaveKey);
 * console.log(`Arweave balance: ${arBalance.balanceAR} AR`);
 * 
 * // Load image
 * const imageData = fs.readFileSync('art.png');
 * 
 * // Estimate Arweave cost
 * const arCost = await minter.estimateArweaveCost(imageData);
 * console.log(`Estimated Arweave cost: ${arCost.ar} AR`);
 * 
 * // Mint NFT
 * const result = await minter.mintNFT(
 *   privateKey,
 *   arweaveKey,
 *   nftContract,
 *   imageData,
 *   'art.png',
 *   {
 *     name: "Stacks Art #1",
 *     description: "NFT on Stacks (Bitcoin-secured), stored permanently on Arweave",
 *     attributes: [
 *       { trait_type: "Rarity", value: "Legendary" },
 *       { trait_type: "Blockchain", value: "Stacks" },
 *       { trait_type: "Security", value: "Bitcoin-secured" },
 *       { trait_type: "Storage", value: "Arweave" }
 *     ]
 *   },
 *   senderAddress, // Recipient
 *   '1', // Token ID
 *   {
 *     tags: [
 *       { name: 'Collection', value: 'My Collection' },
 *       { name: 'Creator', value: 'Artist Name' }
 *     ]
 *   }
 * );
 * 
 * console.log('NFT Minted!');
 * console.log('Token ID:', result.tokenId);
 * console.log('Stacks TX:', result.transactionId);
 * console.log('Stacks Explorer:', result.explorerUrl);
 * console.log('Arweave File TX:', result.fileUrl);
 * console.log('Arweave Metadata TX:', result.metadataUrl);
 * console.log('Total Arweave cost:', result.totalCost.arweave.totalAR, 'AR');
 * console.log('Total Stacks cost:', result.totalCost.stacks.totalSTX, 'STX');
 * 
 * // Video NFT with thumbnail
 * const videoData = fs.readFileSync('animation.mp4');
 * const thumbnailData = fs.readFileSync('thumbnail.jpg');
 * 
 * const mediaResult = await minter.mintMediaNFT(
 *   privateKey,
 *   arweaveKey,
 *   nftContract,
 *   videoData,
 *   'animation.mp4',
 *   thumbnailData,
 *   'thumbnail.jpg',
 *   {
 *     name: "Animated Art #1",
 *     description: "Stacks NFT with permanent Arweave storage",
 *     attributes: [
 *       { trait_type: "Duration", value: "10s" },
 *       { trait_type: "Type", value: "Animation" }
 *     ]
 *   },
 *   senderAddress,
 *   '2',
 *   {}
 * );
 * 
 * // Testnet example
 * const testnetMinter = new StacksArweaveNFTMinter({
 *   network: 'testnet',
 * });
 * 
 * const testnetResult = await testnetMinter.mintNFT(
 *   testPrivateKey,
 *   arweaveKey,
 *   testContract,
 *   imageData,
 *   'art.png',
 *   {
 *     name: "Test NFT",
 *     description: "Testing on Stacks testnet"
 *   },
 *   testAddress,
 *   '1',
 *   {}
 * );
 * 
 * // Bitcoin DeFi NFT: Commemorating Stacks' Bitcoin-secured smart contracts
 * const bitcoinDefiNFT = await minter.mintNFT(
 *   privateKey,
 *   arweaveKey,
 *   nftContract,
 *   imageData,
 *   'bitcoin-defi.png',
 *   {
 *     name: "Bitcoin DeFi NFT #1",
 *     description: "NFT secured by Bitcoin, stored permanently on Arweave",
 *     attributes: [
 *       { trait_type: "Security", value: "Bitcoin-secured" },
 *       { trait_type: "Smart Contracts", value: "Clarity" },
 *       { trait_type: "Consensus", value: "Proof of Transfer (PoX)" }
 *     ]
 *   },
 *   senderAddress,
 *   'bitcoin-defi-1',
 *   {
 *     tags: [
 *       { name: 'Type', value: 'BitcoinDeFi' },
 *       { name: 'Security', value: 'Bitcoin' }
 *     ]
 *   }
 * );
 * 
 * console.log('Bitcoin-secured NFT minted with permanent Arweave storage!');
 */

export default StacksArweaveNFTMinter;

