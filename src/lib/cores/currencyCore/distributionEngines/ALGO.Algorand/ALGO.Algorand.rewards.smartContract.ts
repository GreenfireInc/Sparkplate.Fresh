// Algorand Smart Contract Rewards Distribution Engine
// PyTEAL-based stateful smart contract for trustless reward distribution
// This contract allows users to claim rewards after achieving goals (e.g., game scores)

/**
 * SMART CONTRACT OVERVIEW:
 * 
 * This PyTEAL contract provides a trustless reward mechanism where:
 * - Players register (call 'start') to begin tracking
 * - Game server signs attestations proving player achievements
 * - Players submit signed attestations to claim rewards
 * - Contract verifies signatures and sends rewards via inner transactions
 * 
 * DEPLOYMENT FLOW:
 * 1. Deploy contract with owner public key, reward amount, and threshold
 * 2. Fund contract account with ALGO for rewards
 * 3. Players call 'start' to register
 * 4. When player achieves goal, server signs attestation
 * 5. Player submits 'claim' with signed attestation
 * 6. Contract verifies and sends reward automatically
 */

export const PYTEAL_CONTRACT_SOURCE = `
# Algorand Reward Smart Contract (PyTEAL)
# Secure, trustless reward distribution with server-signed attestations

from pyteal import *

# Keys for global/local storage
OWNER_PK_KEY = Bytes("OWNER_PK")        # bytes: 32-byte ed25519 public key
REWARD_AMOUNT_KEY = Bytes("REWARD_AMOUNT")  # uint64: microAlgos or asset units
REWARD_ASSET_KEY = Bytes("REWARD_ASSET")    # uint64: 0 => ALGO, else ASA id
THRESHOLD_KEY = Bytes("THRESHOLD")          # uint64: points threshold

LOCAL_REGISTERED = Bytes("registered")      # 0/1 flag
LOCAL_LAST_NONCE = Bytes("last_nonce")      # bytes - prevents replay attacks

def approval_program():
    # Creation: Set owner and parameters
    on_creation = Seq([
        # Expected args: [owner_pk, reward_amount, reward_asset_id, threshold]
        Assert(Txn.application_args.length() == Int(4)),
        App.globalPut(OWNER_PK_KEY, Txn.application_args[0]),
        App.globalPut(REWARD_AMOUNT_KEY, Btoi(Txn.application_args[1])),
        App.globalPut(REWARD_ASSET_KEY, Btoi(Txn.application_args[2])),
        App.globalPut(THRESHOLD_KEY, Btoi(Txn.application_args[3])),
        Approve()
    ])

    # Opt-in: Allow local state allocation
    on_opt_in = Seq([
        App.localPut(Txn.sender(), LOCAL_REGISTERED, Int(0)),
        App.localPut(Txn.sender(), LOCAL_LAST_NONCE, Bytes("")),
        Approve()
    ])

    # Start: Mark user as registered
    op_start = Bytes("start")
    start = Seq([
        If(App.optedIn(Txn.sender(), Txn.application_id()),
           Seq(App.localPut(Txn.sender(), LOCAL_REGISTERED, Int(1)),
               Approve()),
           Seq(App.localPut(Txn.sender(), LOCAL_REGISTERED, Int(1)),
               Approve()))
    ])

    # Claim: Verify server-signed attestation and send reward
    # Expected args: ["claim", points_bytes, nonce, signature]
    claim = Seq([
        Assert(Txn.application_args.length() == Int(4)),
        
        player_addr = Txn.sender(),
        points_bytes = Txn.application_args[1],
        nonce = Txn.application_args[2],
        sig = Txn.application_args[3],

        # Compose message: player_pk || points || nonce
        message = Concat(AddrToPk(Txn.sender()), points_bytes, nonce),

        # Verify signature from owner
        Assert(Ed25519Verify(App.globalGet(OWNER_PK_KEY), message, sig)),

        # Enforce threshold
        Assert(Btoi(points_bytes) >= App.globalGet(THRESHOLD_KEY)),

        # Ensure user is registered
        Assert(App.localGet(Txn.sender(), LOCAL_REGISTERED) == Int(1)),

        # Prevent nonce reuse
        Assert(App.localGet(Txn.sender(), LOCAL_LAST_NONCE) != nonce),
        App.localPut(Txn.sender(), LOCAL_LAST_NONCE, nonce),

        # Send reward via inner transaction
        If(App.globalGet(REWARD_ASSET_KEY) == Int(0)).Then(
            # Send ALGO
            Seq(
                InnerTxnBuilder.Begin(),
                InnerTxnBuilder.SetFields({
                    TxnField.type_enum: TxnType.Payment,
                    TxnField.receiver: Txn.sender(),
                    TxnField.amount: App.globalGet(REWARD_AMOUNT_KEY),
                }),
                InnerTxnBuilder.Submit()
            )
        ).Else(
            # Send ASA
            Seq(
                InnerTxnBuilder.Begin(),
                InnerTxnBuilder.SetFields({
                    TxnField.type_enum: TxnType.AssetTransfer,
                    TxnField.xfer_asset: App.globalGet(REWARD_ASSET_KEY),
                    TxnField.asset_receiver: Txn.sender(),
                    TxnField.asset_amount: App.globalGet(REWARD_AMOUNT_KEY),
                }),
                InnerTxnBuilder.Submit()
            )
        ),

        Approve()
    ])

    # Main dispatcher
    program = Cond(
        [Txn.application_id() == Int(0), on_creation],
        [Txn.on_completion() == OnComplete.OptIn, on_opt_in],
        [And(Txn.on_completion() == OnComplete.NoOp, Txn.application_args[0] == op_start), start],
        [And(Txn.on_completion() == OnComplete.NoOp, Txn.application_args[0] == Bytes("claim")), claim],
    )

    return program

def clear_state_program():
    return Approve()
`;

/**
 * TypeScript Client Interface for Smart Contract Interaction
 */

import algosdk from "algosdk";

export interface SmartContractRewardConfig {
  algodServer: string;
  algodToken: string;
  algodPort?: number | string;
  appId: number; // Deployed application ID
  ownerAccount: algosdk.Account; // Server account that signs attestations
}

export class AlgorandSmartContractRewarder {
  private algodClient: algosdk.Algodv2;
  private appId: number;
  private ownerAccount: algosdk.Account;

  constructor(config: SmartContractRewardConfig) {
    this.algodClient = new algosdk.Algodv2(
      { "X-API-Key": config.algodToken },
      config.algodServer,
      config.algodPort ?? ""
    );
    this.appId = config.appId;
    this.ownerAccount = config.ownerAccount;
  }

  /**
   * Player calls this to register (opt-in and start)
   */
  async registerPlayer(playerAccount: algosdk.Account): Promise<string> {
    const params = await this.algodClient.getTransactionParams().do();

    // Opt-in transaction
    const optInTxn = algosdk.makeApplicationOptInTxnFromObject({
      from: playerAccount.addr,
      appIndex: this.appId,
      appArgs: [new Uint8Array(Buffer.from("start"))],
      suggestedParams: params,
    });

    const signedTxn = optInTxn.signTxn(playerAccount.sk);
    const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do();
    
    await this.waitForConfirmation(txId);
    return txId;
  }

  /**
   * Server generates signed attestation for player achievement
   */
  generateAttestation(playerAddr: string, points: number): {
    pointsBytes: Uint8Array;
    nonce: Uint8Array;
    signature: Uint8Array;
  } {
    // Decode player address to public key
    const playerPk = algosdk.decodeAddress(playerAddr).publicKey;
    
    // Encode points as uint64
    const pointsBytes = algosdk.encodeUint64(points);
    
    // Generate random nonce
    const nonce = crypto.randomBytes(32);
    
    // Compose message: player_pk || points || nonce
    const message = Buffer.concat([playerPk, pointsBytes, nonce]);
    
    // Sign with owner's secret key
    const signature = algosdk.signBytes(message, this.ownerAccount.sk);
    
    return {
      pointsBytes,
      nonce,
      signature,
    };
  }

  /**
   * Player submits claim with server attestation
   */
  async claimReward(
    playerAccount: algosdk.Account,
    attestation: {
      pointsBytes: Uint8Array;
      nonce: Uint8Array;
      signature: Uint8Array;
    }
  ): Promise<string> {
    const params = await this.algodClient.getTransactionParams().do();

    const claimTxn = algosdk.makeApplicationNoOpTxnFromObject({
      from: playerAccount.addr,
      appIndex: this.appId,
      appArgs: [
        new Uint8Array(Buffer.from("claim")),
        attestation.pointsBytes,
        attestation.nonce,
        attestation.signature,
      ],
      suggestedParams: params,
    });

    const signedTxn = claimTxn.signTxn(playerAccount.sk);
    const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do();
    
    await this.waitForConfirmation(txId);
    return txId;
  }

  /**
   * Deploy the smart contract (one-time setup)
   */
  static async deployContract(
    algodClient: algosdk.Algodv2,
    creatorAccount: algosdk.Account,
    ownerPk: Uint8Array,
    rewardAmount: number,
    rewardAssetId: number, // 0 for ALGO
    threshold: number
  ): Promise<number> {
    // NOTE: In production, compile PyTEAL to TEAL first
    // This is a placeholder - actual deployment requires compiled TEAL
    const params = await algodClient.getTransactionParams().do();

    const approvalProgram = new Uint8Array([]); // TODO: Load compiled approval.teal
    const clearProgram = new Uint8Array([]); // TODO: Load compiled clear.teal

    const createTxn = algosdk.makeApplicationCreateTxnFromObject({
      from: creatorAccount.addr,
      approvalProgram,
      clearProgram,
      numLocalInts: 2,
      numLocalByteSlices: 2,
      numGlobalInts: 3,
      numGlobalByteSlices: 1,
      appArgs: [
        ownerPk,
        algosdk.encodeUint64(rewardAmount),
        algosdk.encodeUint64(rewardAssetId),
        algosdk.encodeUint64(threshold),
      ],
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      suggestedParams: params,
    });

    const signedTxn = createTxn.signTxn(creatorAccount.sk);
    const { txId } = await algodClient.sendRawTransaction(signedTxn).do();
    
    const confirmedTxn = await algosdk.waitForConfirmation(algodClient, txId, 4);
    return confirmedTxn["application-index"];
  }

  private async waitForConfirmation(txId: string): Promise<void> {
    await algosdk.waitForConfirmation(this.algodClient, txId, 4);
  }
}

/**
 * DEPLOYMENT INSTRUCTIONS:
 * 
 * 1. Install PyTEAL: pip install pyteal
 * 
 * 2. Save the PyTEAL contract to a file (e.g., reward_contract.py)
 * 
 * 3. Compile to TEAL:
 *    python reward_contract.py > approval.teal
 * 
 * 4. Compile TEAL to bytecode:
 *    goal clerk compile approval.teal
 *    goal clerk compile clear.teal
 * 
 * 5. Deploy using AlgorandSmartContractRewarder.deployContract()
 * 
 * 6. Fund the contract account:
 *    const appAddress = algosdk.getApplicationAddress(appId);
 *    // Send ALGO to appAddress
 * 
 * 7. Integration example:
 *    const rewarder = new AlgorandSmartContractRewarder(config);
 *    
 *    // Player registers
 *    await rewarder.registerPlayer(playerAccount);
 *    
 *    // Player achieves goal, server creates attestation
 *    const attestation = rewarder.generateAttestation(playerAddr, 10000);
 *    
 *    // Player claims reward
 *    await rewarder.claimReward(playerAccount, attestation);
 */

export { AlgorandSmartContractRewarder as default };

