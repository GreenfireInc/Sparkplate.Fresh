// Stellar NFT Minting via Lighthouse IPFS

import { Keypair, Asset, Operation, TransactionBuilder, Networks, Server } from '@stellar/stellar-sdk';
import axios from 'axios';
import FormData from 'form-data';

export interface LighthouseConfig { apiKey: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; assetCode: string; issuerAddress: string; txHash: string; explorerUrl: string }

export class StellarLighthouseNFTMinter {
  private lighthouseConfig: LighthouseConfig;
  private lighthouseBaseUrl = 'https://node.lighthouse.storage/api/v0';
  private lighthouseGateway = 'https://gateway.lighthouse.storage/ipfs';
  private server: Server;
  private network: typeof Networks.PUBLIC | typeof Networks.TESTNET;
  private networkName: 'mainnet' | 'testnet';

  constructor(lighthouseConfig: LighthouseConfig, horizonUrl: string = 'https://horizon.stellar.org', network: 'mainnet' | 'testnet' = 'mainnet') {
    this.lighthouseConfig = lighthouseConfig;
    this.server = new Server(horizonUrl);
    this.network = network === 'mainnet' ? Networks.PUBLIC : Networks.TESTNET;
    this.networkName = network;
  }

  private async uploadFileToLighthouse(fileData: Buffer, fileName: string): Promise<{ cid: string; url: string }> {
    const formData = new FormData();
    formData.append('file', fileData, fileName);
    const response = await axios.post(`${this.lighthouseBaseUrl}/add`, formData, { headers: { ...formData.getHeaders(), Authorization: `Bearer ${this.lighthouseConfig.apiKey}` }, maxContentLength: Infinity, maxBodyLength: Infinity });
    const cid = response.data.Hash;
    return { cid, url: `${this.lighthouseGateway}/${cid}` };
  }

  private async uploadJSONToLighthouse(metadata: NFTMetadata, fileName: string): Promise<{ cid: string; url: string }> {
    const jsonBuffer = Buffer.from(JSON.stringify(metadata, null, 2));
    const formData = new FormData();
    formData.append('file', jsonBuffer, fileName);
    const response = await axios.post(`${this.lighthouseBaseUrl}/add`, formData, { headers: { ...formData.getHeaders(), Authorization: `Bearer ${this.lighthouseConfig.apiKey}` } });
    const cid = response.data.Hash;
    return { cid, url: `${this.lighthouseGateway}/${cid}` };
  }

  private async mintStellarNFT(secretKey: string, metadataUrl: string, assetCode: string): Promise<{ assetCode: string; issuerAddress: string; txHash: string }> {
    const sourceKeypair = Keypair.fromSecret(secretKey);
    const account = await this.server.loadAccount(sourceKeypair.publicKey());
    
    const asset = new Asset(assetCode.substring(0, 12), sourceKeypair.publicKey());

    const transaction = new TransactionBuilder(account, {
      fee: '100000',
      networkPassphrase: this.network,
    })
      .addOperation(Operation.payment({
        destination: sourceKeypair.publicKey(),
        asset: asset,
        amount: '1',
      }))
      .addOperation(Operation.setOptions({
        setFlags: 2,
      }))
      .addOperation(Operation.manageData({
        name: 'ipfs_hash',
        value: metadataUrl,
      }))
      .setTimeout(180)
      .build();

    transaction.sign(sourceKeypair);
    const result = await this.server.submitTransaction(transaction);

    return { assetCode, issuerAddress: sourceKeypair.publicKey(), txHash: result.hash };
  }

  async mintNFT(secretKey: string, fileData: Buffer, metadata: Omit<NFTMetadata, 'image'>, assetCode: string, fileName: string = 'nft-asset'): Promise<MintResult> {
    console.log('Starting Stellar NFT minting process...');
    const fileUpload = await this.uploadFileToLighthouse(fileData, fileName);
    console.log(`File uploaded: ${fileUpload.cid}`);

    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadJSONToLighthouse(completeMetadata, `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`);
    console.log(`Metadata uploaded: ${metadataUpload.cid}`);

    const stellarNFT = await this.mintStellarNFT(secretKey, `ipfs://${metadataUpload.cid}`, assetCode);
    console.log(`Stellar NFT minted: Asset ${stellarNFT.assetCode}`);

    const explorerBase = this.networkName === 'mainnet' ? 'https://stellar.expert/explorer/public/tx' : 'https://stellar.expert/explorer/testnet/tx';

    return {
      ipfsCid: fileUpload.cid,
      ipfsUrl: fileUpload.url,
      metadataCid: metadataUpload.cid,
      metadataUrl: metadataUpload.url,
      assetCode: stellarNFT.assetCode,
      issuerAddress: stellarNFT.issuerAddress,
      txHash: stellarNFT.txHash,
      explorerUrl: `${explorerBase}/${stellarNFT.txHash}`,
    };
  }

  async checkBalance(secretKeyOrAddress: string): Promise<{ address: string; balanceXlm: string }> {
    let address: string;
    if (secretKeyOrAddress.startsWith('S')) {
      const keypair = Keypair.fromSecret(secretKeyOrAddress);
      address = keypair.publicKey();
    } else {
      address = secretKeyOrAddress;
    }

    const account = await this.server.loadAccount(address);
    const xlmBalance = account.balances.find(b => b.asset_type === 'native');
    const balanceXlm = xlmBalance ? xlmBalance.balance : '0';

    return { address, balanceXlm };
  }
}

export default StellarLighthouseNFTMinter;

