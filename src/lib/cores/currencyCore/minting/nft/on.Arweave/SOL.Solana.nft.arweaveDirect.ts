// Solana NFT Minting with Arweave Storage
// Mints Metaplex NFTs on Solana with assets stored permanently on Arweave

/**
 * OVERVIEW:
 * 
 * This module mints NFTs on Solana with assets stored permanently on Arweave.
 * - Upload files directly to Arweave (permanent storage)
 * - Upload metadata to Arweave (immutable)
 * - Create Metaplex NFT on Solana
 * - Link NFT metadata to Arweave URLs
 * - Best of both worlds: Solana fast transactions + Arweave permanent storage
 * 
 * BENEFITS:
 * - Solana: Ultra-fast, low-cost, high throughput
 * - Arweave: Permanent storage (200+ year guarantee)
 * - No recurring storage fees
 * - Immutable metadata and assets on Arweave
 * - Metaplex NFT standard (industry standard on Solana)
 * 
 * COSTS:
 * - Arweave: ~0.01-0.02 AR per NFT (one-time, permanent)
 * - Solana: ~0.00001-0.001 SOL per mint (transaction fee, very low)
 * - Total: ~0.01-0.02 AR + 0.00001-0.001 SOL per NFT
 * 
 * SOLANA NFT STANDARD:
 * Uses Metaplex Token Metadata standard with metadata pointing to Arweave.
 */

// @ts-expect-error - @solana/web3.js is a runtime dependency
import { Connection, Keypair, PublicKey, Transaction, sendAndConfirmTransaction } from '@solana/web3.js';
// @ts-expect-error - @metaplex-foundation packages are runtime dependencies
import { createCreateMetadataAccountV3Instruction, CreateMetadataAccountArgsV3, PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID } from '@metaplex-foundation/mpl-token-metadata';
// @ts-expect-error - @solana/spl-token is a runtime dependency
import { createMint, createAccount, mintTo, TOKEN_PROGRAM_ID, getAccount, MINT_SIZE } from '@solana/spl-token';
// @ts-expect-error - arweave is a runtime dependency
import Arweave from 'arweave';
// @ts-expect-error - arweave types may not be available
import { JWKInterface } from 'arweave/node/lib/wallet';

export interface SolanaArweaveNFTConfig {
  rpcUrl?: string; // Solana RPC URL
  commitment?: 'processed' | 'confirmed' | 'finalized'; // Commitment level
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
  seller_fee_basis_points?: number; // Royalty percentage (e.g., 500 = 5%)
  creators?: Array<{
    address: string;
    verified: boolean;
    share: number;
  }>;
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
  // Solana
  mintAddress: string; // Solana mint address
  tokenAccount: string; // Token account address
  transactionSignature: string; // Solana transaction signature
  explorerUrl: string; // Solscan/Solana Explorer URL
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
    solana: {
      feeSOL: string;
      totalSOL: string;
    };
  };
}

export class SolanaArweaveNFTMinter {
  private connection: Connection;
  private arweave: Arweave;
  private commitment: 'processed' | 'confirmed' | 'finalized';

  constructor(config: SolanaArweaveNFTConfig = {}) {
    const rpcUrl = config.rpcUrl || 'https://api.mainnet-beta.solana.com';
    this.commitment = config.commitment || 'confirmed';

    this.connection = new Connection(rpcUrl, this.commitment);

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
      transaction.addTag('App-Name', 'Solana-NFT');
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
      transaction.addTag('App-Name', 'Solana-NFT');
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
   * Find metadata PDA (Program Derived Address)
   */
  private async findMetadataPDA(mint: PublicKey): Promise<PublicKey> {
    const [metadataPDA] = PublicKey.findProgramAddressSync(
      [
        Buffer.from('metadata'),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        mint.toBuffer(),
      ],
      TOKEN_METADATA_PROGRAM_ID
    );
    return metadataPDA;
  }

  /**
   * Mint NFT on Solana with assets stored on Arweave
   */
  async mintNFT(
    payer: Keypair,
    arweaveKey: JWKInterface,
    fileData: Buffer,
    fileName: string,
    metadata: Omit<NFTMetadata, 'image'>,
    recipientAddress: string,
    options: FileUploadOptions = {},
    network: 'mainnet' | 'devnet' = 'mainnet'
  ): Promise<MintResult> {
    console.log('Starting Solana NFT minting with Arweave storage...');

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
          ...(options.tags || []),
        ],
      }
    );
    console.log(`Metadata uploaded to Arweave: ${metadataUpload.txId}`);

    // 4. Create mint account
    console.log('Creating Solana mint account...');
    const mint = await createMint(
      this.connection,
      payer,
      payer.publicKey,
      null, // No mint authority (NFT)
      0 // Decimals (NFTs have 0 decimals)
    );
    console.log(`Mint created: ${mint.toString()}`);

    // 5. Create token account for recipient
    const recipientPublicKey = new PublicKey(recipientAddress);
    const tokenAccount = await createAccount(
      this.connection,
      payer,
      mint,
      recipientPublicKey
    );
    console.log(`Token account created: ${tokenAccount.toString()}`);

    // 6. Mint token (1 token for NFT)
    await mintTo(
      this.connection,
      payer,
      mint,
      tokenAccount,
      payer, // Mint authority
      1 // Amount (1 for NFT)
    );
    console.log('Token minted');

    // 7. Create metadata account
    console.log('Creating metadata account...');
    const metadataPDA = await this.findMetadataPDA(mint);
    const metadataUrl = `https://arweave.net/${metadataUpload.txId}`;

    const metadataData: CreateMetadataAccountArgsV3['data'] = {
      name: metadata.name,
      symbol: metadata.name.substring(0, 10), // Symbol from name
      uri: metadataUrl, // Point to Arweave metadata
      sellerFeeBasisPoints: metadata.seller_fee_basis_points || 0,
      creators: metadata.creators ? metadata.creators.map(c => ({
        address: new PublicKey(c.address),
        verified: c.verified,
        share: c.share,
      })) : [
        {
          address: payer.publicKey,
          verified: true,
          share: 100,
        },
      ],
      collection: null,
      uses: null,
    };

    const createMetadataInstruction = createCreateMetadataAccountV3Instruction(
      {
        metadata: metadataPDA,
        mint: mint,
        mintAuthority: payer.publicKey,
        payer: payer.publicKey,
        updateAuthority: payer.publicKey,
      },
      {
        createMetadataAccountArgsV3: {
          data: metadataData,
          isMutable: false, // Immutable metadata
        },
      }
    );

    const transaction = new Transaction().add(createMetadataInstruction);
    const signature = await sendAndConfirmTransaction(
      this.connection,
      transaction,
      [payer],
      { commitment: this.commitment }
    );

    console.log(`NFT minted on Solana! Signature: ${signature}`);

    // 8. Calculate costs
    const fileWinston = fileUpload.cost.winston;
    const metadataWinston = metadataUpload.cost.winston;
    const totalWinston = (BigInt(fileWinston) + BigInt(metadataWinston)).toString();
    const totalAR = this.arweave.ar.winstonToAr(totalWinston);

    // Get transaction fee (Solana fees are typically 0.000005 SOL per signature)
    const transactionDetails = await this.connection.getTransaction(signature, {
      commitment: this.commitment,
    });
    const feeSOL = transactionDetails?.meta?.fee 
      ? (transactionDetails.meta.fee / 1e9).toFixed(9)
      : '0.000005'; // Default fee estimate

    // 9. Get explorer URLs
    const explorerBase = network === 'mainnet' 
      ? 'https://solscan.io/tx'
      : 'https://solscan.io/tx?cluster=devnet';
    const explorerUrl = `${explorerBase}/${signature}`;
    const viewBlockUrl = network === 'mainnet'
      ? `https://viewblock.io/solana/tx/${signature}`
      : `https://devnet.viewblock.io/solana/tx/${signature}`;

    return {
      // Arweave
      fileTransactionId: fileUpload.txId,
      fileUrl: fileUpload.url,
      metadataTransactionId: metadataUpload.txId,
      metadataUrl: metadataUpload.url,
      // Solana
      mintAddress: mint.toString(),
      tokenAccount: tokenAccount.toString(),
      transactionSignature: signature,
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
        solana: {
          feeSOL,
          totalSOL: feeSOL,
        },
      },
    };
  }

  /**
   * Mint media NFT with animation and thumbnail
   */
  async mintMediaNFT(
    payer: Keypair,
    arweaveKey: JWKInterface,
    mediaData: Buffer,
    mediaFileName: string,
    thumbnailData: Buffer,
    thumbnailFileName: string,
    metadata: Omit<NFTMetadata, 'image' | 'animation_url'>,
    recipientAddress: string,
    options: FileUploadOptions = {},
    network: 'mainnet' | 'devnet' = 'devnet'
  ): Promise<MintResult> {
    console.log('Starting Solana media NFT minting with Arweave storage...');

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
          ...(options.tags || []),
        ],
      }
    );
    console.log(`Metadata uploaded: ${metadataUpload.txId}`);

    // 5. Create mint and mint NFT
    const mint = await createMint(
      this.connection,
      payer,
      payer.publicKey,
      null,
      0
    );

    const recipientPublicKey = new PublicKey(recipientAddress);
    const tokenAccount = await createAccount(
      this.connection,
      payer,
      mint,
      recipientPublicKey
    );

    await mintTo(
      this.connection,
      payer,
      mint,
      tokenAccount,
      payer,
      1
    );

    // 6. Create metadata account
    const metadataPDA = await this.findMetadataPDA(mint);
    const metadataUrl = `https://arweave.net/${metadataUpload.txId}`;

    const metadataData: CreateMetadataAccountArgsV3['data'] = {
      name: metadata.name,
      symbol: metadata.name.substring(0, 10),
      uri: metadataUrl,
      sellerFeeBasisPoints: metadata.seller_fee_basis_points || 0,
      creators: metadata.creators ? metadata.creators.map(c => ({
        address: new PublicKey(c.address),
        verified: c.verified,
        share: c.share,
      })) : [
        {
          address: payer.publicKey,
          verified: true,
          share: 100,
        },
      ],
      collection: null,
      uses: null,
    };

    const createMetadataInstruction = createCreateMetadataAccountV3Instruction(
      {
        metadata: metadataPDA,
        mint: mint,
        mintAuthority: payer.publicKey,
        payer: payer.publicKey,
        updateAuthority: payer.publicKey,
      },
      {
        createMetadataAccountArgsV3: {
          data: metadataData,
          isMutable: false,
        },
      }
    );

    const transaction = new Transaction().add(createMetadataInstruction);
    const signature = await sendAndConfirmTransaction(
      this.connection,
      transaction,
      [payer],
      { commitment: this.commitment }
    );

    // Calculate costs
    const mediaWinston = BigInt(mediaUpload.cost.winston);
    const thumbnailWinston = BigInt(thumbnailUpload.cost.winston);
    const metadataWinston = BigInt(metadataUpload.cost.winston);
    const totalWinston = (mediaWinston + thumbnailWinston + metadataWinston).toString();
    const totalAR = this.arweave.ar.winstonToAr(totalWinston);

    const transactionDetails = await this.connection.getTransaction(signature, {
      commitment: this.commitment,
    });
    const feeSOL = transactionDetails?.meta?.fee 
      ? (transactionDetails.meta.fee / 1e9).toFixed(9)
      : '0.000005';

    const explorerBase = network === 'mainnet' 
      ? 'https://solscan.io/tx'
      : 'https://solscan.io/tx?cluster=devnet';
    const explorerUrl = `${explorerBase}/${signature}`;
    const viewBlockUrl = network === 'mainnet'
      ? `https://viewblock.io/solana/tx/${signature}`
      : `https://devnet.viewblock.io/solana/tx/${signature}`;

    return {
      fileTransactionId: mediaUpload.txId,
      fileUrl: mediaUpload.url,
      metadataTransactionId: metadataUpload.txId,
      metadataUrl: metadataUpload.url,
      mintAddress: mint.toString(),
      tokenAccount: tokenAccount.toString(),
      transactionSignature: signature,
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
        solana: {
          feeSOL,
          totalSOL: feeSOL,
        },
      },
    };
  }

  /**
   * Check Solana account balance
   */
  async checkSolanaBalance(address: string): Promise<{
    address: string;
    balanceSOL: string;
    balanceLamports: number;
  }> {
    try {
      const publicKey = new PublicKey(address);
      const balance = await this.connection.getBalance(publicKey);
      const balanceSOL = (balance / 1e9).toFixed(9);

      return {
        address,
        balanceSOL,
        balanceLamports: balance,
      };
    } catch (error: any) {
      throw new Error(`Failed to check Solana balance: ${error.message}`);
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
 * // Basic NFT minting on Solana with Arweave storage
 * import { SolanaArweaveNFTMinter } from './SOL.Solana.nft.arweaveDirect';
 * import { Keypair } from '@solana/web3.js';
 * import * as fs from 'fs';
 * 
 * // Initialize minter
 * const minter = new SolanaArweaveNFTMinter({
 *   rpcUrl: 'https://api.mainnet-beta.solana.com',
 *   commitment: 'confirmed',
 *   arweaveHost: 'arweave.net',
 *   arweavePort: 443,
 *   arweaveProtocol: 'https',
 * });
 * 
 * // Load Solana wallet (Keypair from secret key)
 * const secretKey = JSON.parse(fs.readFileSync('solana-wallet.json', 'utf-8'));
 * const payer = Keypair.fromSecretKey(Uint8Array.from(secretKey));
 * 
 * // Load Arweave wallet
 * const arweaveKey = JSON.parse(fs.readFileSync('arweave-wallet.json', 'utf-8'));
 * 
 * // Check balances
 * const solBalance = await minter.checkSolanaBalance(payer.publicKey.toString());
 * console.log(`Solana balance: ${solBalance.balanceSOL} SOL`);
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
 *   payer,
 *   arweaveKey,
 *   imageData,
 *   'art.png',
 *   {
 *     name: "Solana Art #1",
 *     description: "NFT on Solana, stored permanently on Arweave",
 *     attributes: [
 *       { trait_type: "Rarity", value: "Legendary" },
 *       { trait_type: "Blockchain", value: "Solana" },
 *       { trait_type: "Storage", value: "Arweave" }
 *     ],
 *     seller_fee_basis_points: 500, // 5% royalty
 *     creators: [
 *       {
 *         address: payer.publicKey.toString(),
 *         verified: true,
 *         share: 100
 *       }
 *     ]
 *   },
 *   payer.publicKey.toString(), // Recipient
 *   {
 *     tags: [
 *       { name: 'Collection', value: 'My Collection' },
 *       { name: 'Creator', value: 'Artist Name' }
 *     ]
 *   },
 *   'mainnet'
 * );
 * 
 * console.log('NFT Minted!');
 * console.log('Mint Address:', result.mintAddress);
 * console.log('Token Account:', result.tokenAccount);
 * console.log('Solana TX:', result.transactionSignature);
 * console.log('Solscan:', result.explorerUrl);
 * console.log('Arweave File TX:', result.fileUrl);
 * console.log('Arweave Metadata TX:', result.metadataUrl);
 * console.log('Total Arweave cost:', result.totalCost.arweave.totalAR, 'AR');
 * console.log('Total Solana cost:', result.totalCost.solana.totalSOL, 'SOL');
 * 
 * // Video NFT with thumbnail
 * const videoData = fs.readFileSync('animation.mp4');
 * const thumbnailData = fs.readFileSync('thumbnail.jpg');
 * 
 * const mediaResult = await minter.mintMediaNFT(
 *   payer,
 *   arweaveKey,
 *   videoData,
 *   'animation.mp4',
 *   thumbnailData,
 *   'thumbnail.jpg',
 *   {
 *     name: "Animated Art #1",
 *     description: "Solana NFT with permanent Arweave storage",
 *     attributes: [
 *       { trait_type: "Duration", value: "10s" },
 *       { trait_type: "Type", value: "Animation" }
 *     ],
 *     seller_fee_basis_points: 750, // 7.5% royalty
 *   },
 *   payer.publicKey.toString(),
 *   {},
 *   'mainnet'
 * );
 * 
 * // Devnet example
 * const devnetMinter = new SolanaArweaveNFTMinter({
 *   rpcUrl: 'https://api.devnet.solana.com',
 *   commitment: 'confirmed',
 * });
 * 
 * const devnetResult = await devnetMinter.mintNFT(
 *   testPayer,
 *   arweaveKey,
 *   imageData,
 *   'art.png',
 *   {
 *     name: "Test NFT",
 *     description: "Testing on Solana devnet"
 *   },
 *   testPayer.publicKey.toString(),
 *   {},
 *   'devnet'
 * );
 * 
 * // Magic Eden compatible NFT
 * const magicEdenNFT = await minter.mintNFT(
 *   payer,
 *   arweaveKey,
 *   imageData,
 *   'art.png',
 *   {
 *     name: "Magic Eden NFT #1",
 *     description: "Permanently stored on Arweave",
 *     seller_fee_basis_points: 500, // Standard 5% royalty
 *     attributes: [
 *       { trait_type: "Background", value: "Blue" },
 *       { trait_type: "Eyes", value: "Laser" },
 *       { trait_type: "Mouth", value: "Smile" }
 *     ],
 *     properties: {
 *       category: "image",
 *       files: [
 *         {
 *           uri: `https://arweave.net/${fileUpload.txId}`,
 *           type: "image/png"
 *         }
 *       ]
 *     }
 *   },
 *   payer.publicKey.toString(),
 *   {},
 *   'mainnet'
 * );
 */

export default SolanaArweaveNFTMinter;

