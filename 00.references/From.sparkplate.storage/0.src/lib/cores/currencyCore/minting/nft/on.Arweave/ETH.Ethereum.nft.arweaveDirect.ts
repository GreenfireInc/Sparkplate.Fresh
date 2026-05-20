// Ethereum NFT Minting with Arweave Storage
// Mints ERC-721 NFTs on Ethereum with assets stored permanently on Arweave

/**
 * OVERVIEW:
 * 
 * This module mints NFTs on Ethereum with assets stored permanently on Arweave.
 * - Upload files directly to Arweave (permanent storage)
 * - Upload metadata to Arweave (immutable)
 * - Create ERC-721 NFT on Ethereum
 * - Link NFT metadata to Arweave URLs
 * - Best of both worlds: Ethereum blockchain transactions + Arweave permanent storage
 * 
 * BENEFITS:
 * - Ethereum: Largest NFT ecosystem, most marketplaces, highest liquidity
 * - Arweave: Permanent storage (200+ year guarantee)
 * - No recurring storage fees
 * - Immutable metadata and assets on Arweave
 * - ERC-721 NFT standard (industry standard)
 * 
 * COSTS:
 * - Arweave: ~0.01-0.02 AR per NFT (one-time, permanent)
 * - Ethereum: ~0.01-0.1 ETH per mint (gas fee, varies with network)
 * - Total: ~0.01-0.02 AR + 0.01-0.1 ETH per NFT
 * 
 * ETHEREUM NFT STANDARD:
 * Uses ERC-721 standard with metadata pointing to Arweave.
 */

// @ts-expect-error - ethers is a runtime dependency
import { ethers, Contract } from 'ethers';
// @ts-expect-error - arweave is a runtime dependency
import Arweave from 'arweave';
// @ts-expect-error - arweave types may not be available
import { JWKInterface } from 'arweave/node/lib/wallet';

export interface ETHArweaveNFTConfig {
  rpcUrl?: string; // Ethereum RPC URL
  chainId?: number; // Chain ID (1 for mainnet, 11155111 for Sepolia, 17000 for Holesky)
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
  // Ethereum
  tokenId: string; // ERC-721 token ID
  transactionHash: string; // Ethereum transaction hash
  blockNumber: number; // Block number
  explorerUrl: string; // Etherscan URL
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
    ethereum: {
      gasUsed: string;
      gasPrice: string;
      feeETH: string;
      totalETH: string;
    };
  };
}

// Standard ERC-721 ABI for minting
const ERC721_ABI = [
  'function mint(address to, string memory tokenURI) public returns (uint256)',
  'function safeMint(address to, string memory tokenURI) public returns (uint256)',
  'function mint(address to) public returns (uint256)',
  'function tokenURI(uint256 tokenId) public view returns (string memory)',
  'function totalSupply() public view returns (uint256)',
];

export class ETHArweaveNFTMinter {
  private provider: ethers.Provider;
  private chainId: number;
  private arweave: Arweave;

  constructor(config: ETHArweaveNFTConfig = {}) {
    const rpcUrl = config.rpcUrl || 'https://eth.llamarpc.com';
    this.chainId = config.chainId || 1; // Default to mainnet
    
    this.provider = new ethers.JsonRpcProvider(rpcUrl);

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
      transaction.addTag('App-Name', 'Ethereum-NFT');
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
      transaction.addTag('App-Name', 'Ethereum-NFT');
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
   * Mint NFT on Ethereum with assets stored on Arweave
   * Note: This requires a deployed ERC-721 contract address
   */
  async mintNFT(
    wallet: ethers.Wallet,
    arweaveKey: JWKInterface,
    erc721ContractAddress: string,
    fileData: Buffer,
    fileName: string,
    metadata: Omit<NFTMetadata, 'image'>,
    recipientAddress: string,
    options: FileUploadOptions = {},
    network: 'mainnet' | 'sepolia' | 'holesky' = 'mainnet'
  ): Promise<MintResult> {
    console.log('Starting Ethereum NFT minting with Arweave storage...');

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

    // 4. Create contract instance
    const metadataUrl = `https://arweave.net/${metadataUpload.txId}`;
    const contract = new Contract(erc721ContractAddress, ERC721_ABI, wallet);

    // 5. Mint NFT on Ethereum
    console.log('Minting NFT on Ethereum...');
    
    // Try safeMint first, fall back to mint
    let tx: ethers.ContractTransactionResponse;
    try {
      tx = await contract.safeMint(recipientAddress, metadataUrl);
    } catch (error) {
      // Fall back to regular mint if safeMint doesn't exist
      try {
        tx = await contract.mint(recipientAddress, metadataUrl);
      } catch (error2) {
        // Some contracts only accept address
        tx = await contract.mint(recipientAddress);
      }
    }

    console.log(`Transaction submitted: ${tx.hash}`);
    
    // Wait for confirmation
    const receipt = await tx.wait();
    console.log(`NFT minted on Ethereum! Block: ${receipt.blockNumber}`);

    // Get token ID from events
    let tokenId = '0';
    if (receipt.logs && receipt.logs.length > 0) {
      // Try to extract token ID from Transfer event
      const transferInterface = new ethers.Interface([
        'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
      ]);
      
      for (const log of receipt.logs) {
        try {
          const parsed = transferInterface.parseLog(log);
          if (parsed && parsed.name === 'Transfer') {
            tokenId = parsed.args.tokenId.toString();
            break;
          }
        } catch (e) {
          // Continue searching
        }
      }
    }

    // If no token ID found, estimate from total supply
    if (tokenId === '0') {
      try {
        const totalSupply = await contract.totalSupply();
        tokenId = (BigInt(totalSupply.toString()) - 1n).toString();
      } catch (e) {
        tokenId = 'unknown';
      }
    }

    // 6. Calculate costs
    const fileWinston = fileUpload.cost.winston;
    const metadataWinston = metadataUpload.cost.winston;
    const totalWinston = (BigInt(fileWinston) + BigInt(metadataWinston)).toString();
    const totalAR = this.arweave.ar.winstonToAr(totalWinston);

    const gasUsed = receipt.gasUsed.toString();
    const gasPrice = receipt.gasPrice?.toString() || '0';
    const feeWei = BigInt(gasUsed) * BigInt(gasPrice);
    const feeETH = ethers.formatEther(feeWei.toString());

    // 7. Get explorer URLs
    const explorerBase = network === 'mainnet' 
      ? 'https://etherscan.io/tx'
      : network === 'sepolia'
      ? 'https://sepolia.etherscan.io/tx'
      : 'https://holesky.etherscan.io/tx';
    const explorerUrl = `${explorerBase}/${receipt.hash}`;
    const viewBlockUrl = network === 'mainnet'
      ? `https://viewblock.io/ethereum/tx/${receipt.hash}`
      : `https://${network}.viewblock.io/ethereum/tx/${receipt.hash}`;

    return {
      // Arweave
      fileTransactionId: fileUpload.txId,
      fileUrl: fileUpload.url,
      metadataTransactionId: metadataUpload.txId,
      metadataUrl: metadataUpload.url,
      // Ethereum
      tokenId,
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber || 0,
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
        ethereum: {
          gasUsed,
          gasPrice,
          feeETH,
          totalETH: feeETH,
        },
      },
    };
  }

  /**
   * Mint media NFT with animation and thumbnail
   */
  async mintMediaNFT(
    wallet: ethers.Wallet,
    arweaveKey: JWKInterface,
    erc721ContractAddress: string,
    mediaData: Buffer,
    mediaFileName: string,
    thumbnailData: Buffer,
    thumbnailFileName: string,
    metadata: Omit<NFTMetadata, 'image' | 'animation_url'>,
    recipientAddress: string,
    options: FileUploadOptions = {},
    network: 'mainnet' | 'sepolia' | 'holesky' = 'sepolia'
  ): Promise<MintResult> {
    console.log('Starting Ethereum media NFT minting with Arweave storage...');

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

    // 5. Mint on Ethereum
    const metadataUrl = `https://arweave.net/${metadataUpload.txId}`;
    const contract = new Contract(erc721ContractAddress, ERC721_ABI, wallet);

    let tx: ethers.ContractTransactionResponse;
    try {
      tx = await contract.safeMint(recipientAddress, metadataUrl);
    } catch (error) {
      try {
        tx = await contract.mint(recipientAddress, metadataUrl);
      } catch (error2) {
        tx = await contract.mint(recipientAddress);
      }
    }

    const receipt = await tx.wait();

    // Get token ID
    let tokenId = '0';
    if (receipt.logs && receipt.logs.length > 0) {
      const transferInterface = new ethers.Interface([
        'event Transfer(address indexed from, address indexed to, uint256 indexed tokenId)',
      ]);
      
      for (const log of receipt.logs) {
        try {
          const parsed = transferInterface.parseLog(log);
          if (parsed && parsed.name === 'Transfer') {
            tokenId = parsed.args.tokenId.toString();
            break;
          }
        } catch (e) {
          // Continue
        }
      }
    }

    if (tokenId === '0') {
      try {
        const totalSupply = await contract.totalSupply();
        tokenId = (BigInt(totalSupply.toString()) - 1n).toString();
      } catch (e) {
        tokenId = 'unknown';
      }
    }

    // Calculate costs
    const mediaWinston = BigInt(mediaUpload.cost.winston);
    const thumbnailWinston = BigInt(thumbnailUpload.cost.winston);
    const metadataWinston = BigInt(metadataUpload.cost.winston);
    const totalWinston = (mediaWinston + thumbnailWinston + metadataWinston).toString();
    const totalAR = this.arweave.ar.winstonToAr(totalWinston);

    const gasUsed = receipt.gasUsed.toString();
    const gasPrice = receipt.gasPrice?.toString() || '0';
    const feeWei = BigInt(gasUsed) * BigInt(gasPrice);
    const feeETH = ethers.formatEther(feeWei.toString());

    const explorerBase = network === 'mainnet' 
      ? 'https://etherscan.io/tx'
      : network === 'sepolia'
      ? 'https://sepolia.etherscan.io/tx'
      : 'https://holesky.etherscan.io/tx';
    const explorerUrl = `${explorerBase}/${receipt.hash}`;
    const viewBlockUrl = network === 'mainnet'
      ? `https://viewblock.io/ethereum/tx/${receipt.hash}`
      : `https://${network}.viewblock.io/ethereum/tx/${receipt.hash}`;

    return {
      fileTransactionId: mediaUpload.txId,
      fileUrl: mediaUpload.url,
      metadataTransactionId: metadataUpload.txId,
      metadataUrl: metadataUpload.url,
      tokenId,
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber || 0,
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
        ethereum: {
          gasUsed,
          gasPrice,
          feeETH,
          totalETH: feeETH,
        },
      },
    };
  }

  /**
   * Check Ethereum account balance
   */
  async checkETHBalance(address: string): Promise<{
    address: string;
    balanceETH: string;
    balanceWei: string;
  }> {
    try {
      const balanceWei = await this.provider.getBalance(address);
      const balanceETH = ethers.formatEther(balanceWei);

      return {
        address,
        balanceETH,
        balanceWei: balanceWei.toString(),
      };
    } catch (error: any) {
      throw new Error(`Failed to check ETH balance: ${error.message}`);
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

  /**
   * Get NFT token URI (should point to Arweave)
   */
  async getTokenURI(
    erc721ContractAddress: string,
    tokenId: string
  ): Promise<string> {
    try {
      const contract = new Contract(erc721ContractAddress, ERC721_ABI, this.provider);
      return await contract.tokenURI(tokenId);
    } catch (error: any) {
      throw new Error(`Failed to get token URI: ${error.message}`);
    }
  }
}

/**
 * USAGE EXAMPLES:
 * 
 * // Basic NFT minting on Ethereum with Arweave storage
 * import { ETHArweaveNFTMinter } from './ETH.Ethereum.nft.arweaveDirect';
 * import { Wallet } from 'ethers';
 * import * as fs from 'fs';
 * 
 * // Initialize minter
 * const minter = new ETHArweaveNFTMinter({
 *   rpcUrl: 'https://eth.llamarpc.com',
 *   chainId: 1, // Mainnet
 *   arweaveHost: 'arweave.net',
 *   arweavePort: 443,
 *   arweaveProtocol: 'https',
 * });
 * 
 * // Load Ethereum wallet (private key or mnemonic)
 * const privateKey = '0x...'; // Your private key
 * const wallet = new Wallet(privateKey, minter['provider']);
 * 
 * // Load Arweave wallet
 * const arweaveKey = JSON.parse(fs.readFileSync('arweave-wallet.json', 'utf-8'));
 * 
 * // ERC-721 contract address (must be deployed first)
 * const erc721Contract = '0x...'; // Your deployed ERC-721 contract
 * 
 * // Check balances
 * const ethBalance = await minter.checkETHBalance(wallet.address);
 * console.log(`ETH balance: ${ethBalance.balanceETH} ETH`);
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
 *   wallet,
 *   arweaveKey,
 *   erc721Contract,
 *   imageData,
 *   'art.png',
 *   {
 *     name: "Ethereum Art #1",
 *     description: "NFT on Ethereum, stored permanently on Arweave",
 *     attributes: [
 *       { trait_type: "Rarity", value: "Legendary" },
 *       { trait_type: "Blockchain", value: "Ethereum" },
 *       { trait_type: "Storage", value: "Arweave" }
 *     ]
 *   },
 *   wallet.address, // Recipient
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
 * console.log('Token ID:', result.tokenId);
 * console.log('Ethereum TX:', result.transactionHash);
 * console.log('Etherscan:', result.explorerUrl);
 * console.log('Arweave File TX:', result.fileUrl);
 * console.log('Arweave Metadata TX:', result.metadataUrl);
 * console.log('Total Arweave cost:', result.totalCost.arweave.totalAR, 'AR');
 * console.log('Total ETH cost:', result.totalCost.ethereum.totalETH, 'ETH');
 * 
 * // Video NFT with thumbnail
 * const videoData = fs.readFileSync('animation.mp4');
 * const thumbnailData = fs.readFileSync('thumbnail.jpg');
 * 
 * const mediaResult = await minter.mintMediaNFT(
 *   wallet,
 *   arweaveKey,
 *   erc721Contract,
 *   videoData,
 *   'animation.mp4',
 *   thumbnailData,
 *   'thumbnail.jpg',
 *   {
 *     name: "Animated Art #1",
 *     description: "Ethereum NFT with permanent Arweave storage",
 *     attributes: [
 *       { trait_type: "Duration", value: "10s" },
 *       { trait_type: "Type", value: "Animation" }
 *     ]
 *   },
 *   wallet.address,
 *   {},
 *   'mainnet'
 * );
 * 
 * // Get token URI (should point to Arweave)
 * const tokenURI = await minter.getTokenURI(erc721Contract, result.tokenId);
 * console.log('Token URI (Arweave):', tokenURI);
 * 
 * // Sepolia testnet example
 * const sepoliaMinter = new ETHArweaveNFTMinter({
 *   rpcUrl: 'https://rpc.sepolia.org',
 *   chainId: 11155111, // Sepolia testnet
 * });
 * 
 * const sepoliaResult = await sepoliaMinter.mintNFT(
 *   testWallet,
 *   arweaveKey,
 *   testContract,
 *   imageData,
 *   'art.png',
 *   {
 *     name: "Test NFT",
 *     description: "Testing on Sepolia testnet"
 *   },
 *   testWallet.address,
 *   {},
 *   'sepolia'
 * );
 * 
 * // Blue-chip collection example (Bored Ape style)
 * const blueChipResult = await minter.mintNFT(
 *   wallet,
 *   arweaveKey,
 *   '0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D', // Example contract
 *   imageData,
 *   'ape.png',
 *   {
 *     name: "Ape #1",
 *     description: "Permanent storage on Arweave",
 *     external_url: "https://boredapeyachtclub.com",
 *     attributes: [
 *       { trait_type: "Background", value: "Blue" },
 *       { trait_type: "Eyes", value: "Laser Eyes" },
 *       { trait_type: "Fur", value: "Gold" }
 *     ]
 *   },
 *   wallet.address,
 *   {},
 *   'mainnet'
 * );
 */

export default ETHArweaveNFTMinter;

