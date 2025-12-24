// Stellar NFT Minting via Infura IPFS

import { Keypair, Asset, Operation, TransactionBuilder, Networks, Server } from '@stellar/stellar-sdk';
import { create } from 'kubo-rpc-client';
import type { IPFSHTTPClient } from 'kubo-rpc-client';

export interface InfuraConfig { projectId: string; projectSecret: string; dedicatedGateway?: string }
export interface NFTMetadata { name: string; description: string; image?: string; animation_url?: string; external_url?: string; attributes?: Array<{ trait_type: string; value: string | number }>; properties?: Record<string, any> }
export interface MintResult { ipfsCid: string; ipfsUrl: string; metadataCid: string; metadataUrl: string; assetCode: string; issuerAddress: string; txHash: string; explorerUrl: string }

export class StellarInfuraNFTMinter {
  private ipfs: IPFSHTTPClient;
  private infuraGateway: string;
  private server: Server;
  private network: typeof Networks.PUBLIC | typeof Networks.TESTNET;
  private networkName: 'mainnet' | 'testnet';

  constructor(infuraConfig: InfuraConfig, horizonUrl: string = 'https://horizon.stellar.org', network: 'mainnet' | 'testnet' = 'mainnet') {
    const auth = 'Basic ' + Buffer.from(infuraConfig.projectId + ':' + infuraConfig.projectSecret).toString('base64');
    this.ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https', headers: { authorization: auth } });
    this.infuraGateway = infuraConfig.dedicatedGateway || 'https://infura-ipfs.io/ipfs';
    this.server = new Server(horizonUrl);
    this.network = network === 'mainnet' ? Networks.PUBLIC : Networks.TESTNET;
    this.networkName = network;
  }

  private async uploadFileToInfura(fileData: Buffer, fileName: string): Promise<{ cid: string; url: string }> {
    const result = await this.ipfs.add({ path: fileName, content: fileData }, { pin: true });
    const cid = result.cid.toString();
    return { cid, url: `${this.infuraGateway}/${cid}` };
  }

  private async uploadMetadataToInfura(metadata: NFTMetadata, fileName: string = 'metadata.json'): Promise<{ cid: string; url: string }> {
    const jsonBuffer = Buffer.from(JSON.stringify(metadata, null, 2));
    const result = await this.ipfs.add({ path: fileName, content: jsonBuffer }, { pin: true });
    const cid = result.cid.toString();
    return { cid, url: `${this.infuraGateway}/${cid}` };
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
    const fileUpload = await this.uploadFileToInfura(fileData, fileName);
    console.log(`File uploaded: ${fileUpload.cid}`);

    const completeMetadata: NFTMetadata = { ...metadata, image: `ipfs://${fileUpload.cid}` };
    const metadataUpload = await this.uploadMetadataToInfura(completeMetadata, `${fileName.replace(/\.[^/.]+$/, '')}_metadata.json`);
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

export default StellarInfuraNFTMinter;

