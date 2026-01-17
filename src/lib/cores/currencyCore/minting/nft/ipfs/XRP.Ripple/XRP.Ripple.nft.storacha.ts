// XRP NFT Minting via Storacha

import { Client, Wallet } from 'xrpl';

export interface StorachaConfig { email: string; space?: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; nftokenId: string; txHash: string; explorerUrl: string }

export class XRPStorachaNFTMinter {
  private storachaConfig: StorachaConfig;
  private storachaGateway = 'https://w3s.link/ipfs';
  private client: Client;
  private network: 'mainnet' | 'testnet' | 'devnet';

  constructor(storachaConfig: StorachaConfig, xrplServer: string = 'wss://xrplcluster.com', network: 'mainnet' | 'testnet' | 'devnet' = 'mainnet') {
    this.storachaConfig = storachaConfig;
    this.client = new Client(xrplServer);
    this.network = network;
  }

  private convertStringToHex(str: string): string {
    return Buffer.from(str, 'utf-8').toString('hex').toUpperCase();
  }

  private async mintXRPNFT(seed: string, metadataUrl: string, taxon: number = 0): Promise<{ nftokenId: string; txHash: string }> {
    await this.client.connect();
    
    try {
      const wallet = Wallet.fromSeed(seed);
      
      const nftMintTx = {
        TransactionType: 'NFTokenMint',
        Account: wallet.address,
        URI: this.convertStringToHex(metadataUrl),
        Flags: 8,
        TransferFee: 0,
        NFTokenTaxon: taxon,
      };

      const prepared = await this.client.autofill(nftMintTx);
      const signed = wallet.sign(prepared);
      const result = await this.client.submitAndWait(signed.tx_blob);

      const meta = result.result.meta as any;
      const nftokenId = meta?.nftoken_id || meta?.CreatedNode?.find((n: any) => n.CreatedNode?.LedgerEntryType === 'NFTokenPage')?.CreatedNode?.NewFields?.NFTokens?.[0]?.NFToken?.NFTokenID || '';

      return { nftokenId, txHash: result.result.hash };
    } finally {
      await this.client.disconnect();
    }
  }

  async mintNFT(seed: string, fileData: Buffer, metadata: Omit<NFTMetadata, 'image'>, taxon: number = 0, fileName: string = 'nft-asset'): Promise<MintResult> {
    // Placeholder implementation - Storacha requires additional setup
    const fileCid = 'placeholder-cid';
    const metadataCid = 'placeholder-metadata-cid';
    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileCid}` };
    const xrpNFT = await this.mintXRPNFT(seed, `ipfs://${metadataCid}`, taxon);
    
    const explorerBase = this.network === 'mainnet' 
      ? 'https://livenet.xrpl.org/transactions' 
      : this.network === 'testnet' 
      ? 'https://testnet.xrpl.org/transactions' 
      : 'https://devnet.xrpl.org/transactions';

    return {
      ipfsCid: fileCid,
      ipfsUrl: `${this.storachaGateway}/${fileCid}`,
      metadataCid,
      metadataUrl: `${this.storachaGateway}/${metadataCid}`,
      nftokenId: xrpNFT.nftokenId,
      txHash: xrpNFT.txHash,
      explorerUrl: `${explorerBase}/${xrpNFT.txHash}`,
    };
  }

  async checkBalance(seedOrAddress: string): Promise<{ address: string; balanceXrp: string }> {
    await this.client.connect();
    
    try {
      let address: string;
      if (seedOrAddress.split(' ').length >= 12 || seedOrAddress.startsWith('s')) {
        const wallet = Wallet.fromSeed(seedOrAddress);
        address = wallet.address;
      } else {
        address = seedOrAddress;
      }

      const balance = await this.client.getXrpBalance(address);
      return { address, balanceXrp: balance };
    } finally {
      await this.client.disconnect();
    }
  }
}

export default XRPStorachaNFTMinter;

