// Solana NFT Minting via Fleek IPFS

import { Connection, Keypair, PublicKey } from '@solana/web3.js';
import { Metaplex, keypairIdentity, bundlrStorage } from '@metaplex-foundation/js';
import bs58 from 'bs58';
import axios from 'axios';
import FormData from 'form-data';

export interface FleekConfig { apiKey: string; apiSecret: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; mintAddress: string; txSignature: string; explorerUrl: string }

export class SolanaFleekNFTMinter {
  private fleekConfig: FleekConfig;
  private fleekBaseUrl = 'https://api.fleek.co/ipfs';
  private fleekGateway = 'https://ipfs.fleek.co/ipfs';
  private connection: Connection;
  private metaplex: Metaplex | null = null;
  private network: 'mainnet-beta' | 'devnet' | 'testnet';

  constructor(fleekConfig: FleekConfig, rpcEndpoint: string = 'https://api.mainnet-beta.solana.com', network: 'mainnet-beta' | 'devnet' | 'testnet' = 'mainnet-beta') {
    this.fleekConfig = fleekConfig; this.connection = new Connection(rpcEndpoint, 'confirmed'); this.network = network;
  }

  private initMetaplex(keypair: Keypair) {
    if (!this.metaplex) {
      this.metaplex = Metaplex.make(this.connection).use(keypairIdentity(keypair)).use(bundlrStorage());
    }
  }

  private async uploadFileToFleek(fileData: Buffer, fileName: string): Promise<{ cid: string; url: string }> {
    const formData = new FormData();
    formData.append('file', fileData, fileName);
    const response = await axios.post(`${this.fleekBaseUrl}/add`, formData, { headers: { ...formData.getHeaders(), 'x-api-key': this.fleekConfig.apiKey, 'x-api-secret': this.fleekConfig.apiSecret }, maxContentLength: Infinity, maxBodyLength: Infinity });
    const cid = response.data.hash;
    return { cid, url: `${this.fleekGateway}/${cid}` };
  }

  private async uploadJSONToFleek(metadata: NFTMetadata, fileName: string): Promise<{ cid: string; url: string }> {
    const jsonBuffer = Buffer.from(JSON.stringify(metadata, null, 2));
    const formData = new FormData();
    formData.append('file', jsonBuffer, fileName);
    const response = await axios.post(`${this.fleekBaseUrl}/add`, formData, { headers: { ...formData.getHeaders(), 'x-api-key': this.fleekConfig.apiKey, 'x-api-secret': this.fleekConfig.apiSecret } });
    const cid = response.data.hash;
    return { cid, url: `${this.fleekGateway}/${cid}` };
  }

  private async mintSolanaNFT(privateKey: string, metadataUrl: string, metadata: NFTMetadata): Promise<{ mintAddress: string; txSignature: string }> {
    const keypair = privateKey.length === 64 ? Keypair.fromSecretKey(Buffer.from(privateKey, 'hex')) : Keypair.fromSecretKey(bs58.decode(privateKey));
    this.initMetaplex(keypair);
    const { nft } = await this.metaplex!.nfts().create({ uri: metadataUrl, name: metadata.name, sellerFeeBasisPoints: 500, symbol: metadata.properties?.category?.substring(0, 10) || 'NFT' });
    return { mintAddress: nft.address.toString(), txSignature: nft.mint.address.toString() };
  }

  async mintNFT(privateKey: string, fileData: Buffer, fileName: string, metadata: Omit<NFTMetadata, 'image'>): Promise<MintResult> {
    const fileUpload = await this.uploadFileToFleek(fileData, fileName);
    const completeMetadata: NFTMetadata = { ...metadata, image: fileUpload.url };
    const metadataUpload = await this.uploadJSONToFleek(completeMetadata, `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`);
    const solanaNFT = await this.mintSolanaNFT(privateKey, metadataUpload.url, completeMetadata);
    const explorerBase = this.network === 'mainnet-beta' ? 'https://solscan.io/token' : `https://solscan.io/token?cluster=${this.network}`;
    return { ipfsCid: fileUpload.cid, ipfsUrl: fileUpload.url, metadataCid: metadataUpload.cid, metadataUrl: metadataUpload.url, mintAddress: solanaNFT.mintAddress, txSignature: solanaNFT.txSignature, explorerUrl: `${explorerBase}/${solanaNFT.mintAddress}` };
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

export default SolanaFleekNFTMinter;
