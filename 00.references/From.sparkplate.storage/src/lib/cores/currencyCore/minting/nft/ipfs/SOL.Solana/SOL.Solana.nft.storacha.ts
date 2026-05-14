// Solana NFT Minting via Storacha

import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { Metaplex, keypairIdentity, bundlrStorage } from '@metaplex-foundation/js';
import bs58 from 'bs58';

export interface StorachaConfig { email: string; space?: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; mintAddress: string; txSignature: string; explorerUrl: string }

export class SolanaStorachaNFTMinter {
  private storachaConfig: StorachaConfig;
  private storachaGateway = 'https://w3s.link/ipfs';
  private connection: Connection;
  private metaplex: Metaplex | null = null;
  private network: 'mainnet-beta' | 'devnet' | 'testnet';

  constructor(storachaConfig: StorachaConfig, rpcEndpoint: string = 'https://api.mainnet-beta.solana.com', network: 'mainnet-beta' | 'devnet' | 'testnet' = 'mainnet-beta') {
    this.storachaConfig = storachaConfig; this.connection = new Connection(rpcEndpoint, 'confirmed'); this.network = network;
  }

  private initMetaplex(keypair: Keypair) {
    if (!this.metaplex) {
      this.metaplex = Metaplex.make(this.connection).use(keypairIdentity(keypair)).use(bundlrStorage());
    }
  }

  private async mintSolanaNFT(privateKey: string, metadataUrl: string, metadata: NFTMetadata): Promise<{ mintAddress: string; txSignature: string }> {
    const keypair = privateKey.length === 64 ? Keypair.fromSecretKey(Buffer.from(privateKey, 'hex')) : Keypair.fromSecretKey(bs58.decode(privateKey));
    this.initMetaplex(keypair);
    const { nft } = await this.metaplex!.nfts().create({ uri: metadataUrl, name: metadata.name, sellerFeeBasisPoints: 500, symbol: metadata.properties?.category?.substring(0, 10) || 'NFT' });
    return { mintAddress: nft.address.toString(), txSignature: nft.mint.address.toString() };
  }

  async mintNFT(privateKey: string, fileData: Buffer, fileName: string, metadata: Omit<NFTMetadata, 'image'>): Promise<MintResult> {
    const fileCid = 'placeholder-cid';
    const metadataCid = 'placeholder-metadata-cid';
    const completeMetadata: NFTMetadata = { ...metadata, image: `${this.storachaGateway}/${fileCid}` };
    const solanaNFT = await this.mintSolanaNFT(privateKey, `${this.storachaGateway}/${metadataCid}`, completeMetadata);
    const explorerBase = this.network === 'mainnet-beta' ? 'https://solscan.io/token' : `https://solscan.io/token?cluster=${this.network}`;
    return { ipfsCid: fileCid, ipfsUrl: `${this.storachaGateway}/${fileCid}`, metadataCid, metadataUrl: `${this.storachaGateway}/${metadataCid}`, mintAddress: solanaNFT.mintAddress, txSignature: solanaNFT.txSignature, explorerUrl: `${explorerBase}/${solanaNFT.mintAddress}` };
  }

  async checkBalance(privateKeyOrAddress: string): Promise<{ address: string; balanceSol: string }> {
    let publicKey: PublicKey;
    if (privateKeyOrAddress.length === 64 || privateKeyOrAddress.length === 88) {
      const keypair = privateKeyOrAddress.length === 64 ? Keypair.fromSecretKey(Buffer.from(privateKey, 'hex')) : Keypair.fromSecretKey(bs58.decode(privateKeyOrAddress));
      publicKey = keypair.publicKey;
    } else {
      publicKey = new PublicKey(privateKeyOrAddress);
    }
    const balance = await this.connection.getBalance(publicKey);
    return { address: publicKey.toString(), balanceSol: (balance / 1e9).toString() };
  }
}

export default SolanaStorachaNFTMinter;
