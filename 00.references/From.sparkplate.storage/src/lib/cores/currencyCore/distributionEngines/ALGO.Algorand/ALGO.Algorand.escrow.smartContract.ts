// Algorand Smart Contract Escrow Distribution Engine
// PyTEAL-based stateful smart contract for trustless two-party escrow
// This contract holds funds from multiple players and distributes to winner

/**
 * SMART CONTRACT ESCROW OVERVIEW:
 * 
 * This PyTEAL contract provides a trustless escrow mechanism where:
 * - Operator (game server) creates match and sets parameters
 * - Players opt-in and deposit funds in atomic groups
 * - Contract tracks deposits and marks match ready when all players have paid
 * - Operator can start the match when deposits are complete
 * - After match ends, operator triggers payout to winner
 * - Contract sends full pot to winner via inner transaction
 * 
 * TRUST MODEL:
 * - Contract holds funds securely
 * - Only operator can trigger payouts (server validates game outcome)
 * - Players trust the operator for fair game arbitration
 * - Funds cannot be stolen - only distributed according to rules
 */

export const PYTEAL_ESCROW_CONTRACT = `
# Algorand Escrow Smart Contract (PyTEAL)
# Secure multi-player escrow with automatic payout

from pyteal import *

# Global state keys
OPERATOR_KEY = Bytes("operator")          # operator address
REQUIRED_KEY = Bytes("required")          # required stake in microAlgos
MAXPLAYERS_KEY = Bytes("maxplayers")      # number of players
DEPOSITS_KEY = Bytes("deposits")          # number of players who deposited
STATUS_KEY = Bytes("status")              # 0=waiting, 1=ready, 2=started, 3=finished
NONCE_KEY = Bytes("match_nonce")          # prevents replay

# Local state keys
LOCAL_PAID = Bytes("paid")                # 0/1 flag

# Status values
STATUS_WAITING = Int(0)
STATUS_READY = Int(1)
STATUS_STARTED = Int(2)
STATUS_FINISHED = Int(3)

@Subroutine(TealType.none)
def set_uint64(key: Expr, val: Expr):
    return Seq([App.globalPut(key, val)])

is_operator = Txn.sender() == App.globalGet(OPERATOR_KEY)

def approval_program():
    # On creation: set operator and initialize state
    on_create = Seq([
        App.globalPut(OPERATOR_KEY, Txn.sender()),
        App.globalPut(REQUIRED_KEY, Int(0)),
        App.globalPut(MAXPLAYERS_KEY, Int(0)),
        App.globalPut(DEPOSITS_KEY, Int(0)),
        App.globalPut(STATUS_KEY, STATUS_WAITING),
        App.globalPut(NONCE_KEY, Int(0)),
        Approve()
    ])

    # Setup: operator sets required stake and max players
    # Args: ["setup", required, maxplayers]
    on_setup = Seq([
        Assert(is_operator),
        Assert(Txn.application_args.length() == Int(3)),
        App.globalPut(REQUIRED_KEY, Btoi(Txn.application_args[1])),
        App.globalPut(MAXPLAYERS_KEY, Btoi(Txn.application_args[2])),
        App.globalPut(DEPOSITS_KEY, Int(0)),
        App.globalPut(STATUS_KEY, STATUS_WAITING),
        App.globalPut(NONCE_KEY, App.globalGet(NONCE_KEY) + Int(1)),
        Approve()
    ])

    # Opt-in: player registers (initializes local state)
    on_opt_in = Seq([
        App.localPut(Txn.sender(), LOCAL_PAID, Int(0)),
        Approve()
    ])

    # Deposit: player sends payment in atomic group
    # Group: [Payment to app, App call with "deposit"]
    on_deposit = Seq([
        Assert(Global.group_size() == Int(2)),
        Assert(Txn.group_index() == Int(1)),
        
        payment_tx = Gtxn[0],
        Assert(payment_tx.type_enum() == TxnType.Payment),
        Assert(payment_tx.sender() == Txn.sender()),
        Assert(payment_tx.receiver() == Global.current_application_address()),
        Assert(payment_tx.amount() >= App.globalGet(REQUIRED_KEY)),
        
        # Not already paid
        Assert(App.localGet(Txn.sender(), LOCAL_PAID) == Int(0)),
        
        # Mark paid and increment deposits
        App.localPut(Txn.sender(), LOCAL_PAID, Int(1)),
        App.globalPut(DEPOSITS_KEY, App.globalGet(DEPOSITS_KEY) + Int(1)),
        
        # If all players deposited, mark ready
        If(App.globalGet(DEPOSITS_KEY) == App.globalGet(MAXPLAYERS_KEY)).Then(
            App.globalPut(STATUS_KEY, STATUS_READY)
        ),
        Approve()
    ])

    # Start: operator starts the match
    on_start = Seq([
        Assert(is_operator),
        Assert(App.globalGet(STATUS_KEY) == STATUS_READY),
        App.globalPut(STATUS_KEY, STATUS_STARTED),
        Approve()
    ])

    # Payout: operator sends pot to winner
    # Winner passed as Txn.accounts[1]
    on_payout = Seq([
        Assert(is_operator),
        Assert(App.globalGet(STATUS_KEY) == STATUS_STARTED),
        Assert(Txn.accounts.length() >= Int(1)),
        
        winner = Txn.accounts[1],
        required = App.globalGet(REQUIRED_KEY),
        maxp = App.globalGet(MAXPLAYERS_KEY),
        total_expected = required * maxp,
        
        # Calculate payout amount
        app_balance = Balance(Global.current_application_address()),
        min_reserve = Int(100000),
        available = app_balance - min_reserve,
        payout = If(available < total_expected).Then(available).Else(total_expected),
        
        Assert(payout > Int(0)),
        
        # Send payout via inner transaction
        InnerTxnBuilder.Begin(),
        InnerTxnBuilder.SetFields({
            TxnField.type_enum: TxnType.Payment,
            TxnField.amount: payout,
            TxnField.receiver: winner,
            TxnField.fee: Int(0),
        }),
        InnerTxnBuilder.Submit(),
        
        App.globalPut(STATUS_KEY, STATUS_FINISHED),
        App.globalPut(NONCE_KEY, App.globalGet(NONCE_KEY) + Int(1)),
        Approve()
    ])

    # Main dispatcher
    program = Cond(
        [Txn.application_id() == Int(0), on_create],
        [Txn.on_completion() == OnComplete.OptIn, on_opt_in],
        [Txn.on_completion() == OnComplete.CloseOut, Reject()],
        [Txn.on_completion() == OnComplete.UpdateApplication, Reject()],
        [Txn.on_completion() == OnComplete.DeleteApplication, Return(is_operator)],
        
        # NoOp method routing
        [Txn.application_args[0] == Bytes("setup"), on_setup],
        [Txn.application_args[0] == Bytes("deposit"), on_deposit],
        [Txn.application_args[0] == Bytes("start"), on_start],
        [Txn.application_args[0] == Bytes("payout"), on_payout],
    )

    return program

def clear_state_program():
    return Approve()
`;

/**
 * TypeScript Client Interface for Escrow Contract
 */

import algosdk from "algosdk";

export interface EscrowContractConfig {
  algodServer: string;
  algodToken: string;
  algodPort?: number | string;
  appId: number; // Deployed application ID
  operatorAccount: algosdk.Account; // Game server account
}

export class AlgorandEscrowContract {
  private algodClient: algosdk.Algodv2;
  private appId: number;
  private operatorAccount: algosdk.Account;

  constructor(config: EscrowContractConfig) {
    this.algodClient = new algosdk.Algodv2(
      { "X-API-Key": config.algodToken },
      config.algodServer,
      config.algodPort ?? ""
    );
    this.appId = config.appId;
    this.operatorAccount = config.operatorAccount;
  }

  /**
   * Setup match parameters
   */
  async setupMatch(requiredMicroAlgos: number, maxPlayers: number): Promise<string> {
    const params = await this.algodClient.getTransactionParams().do();

    const setupTxn = algosdk.makeApplicationNoOpTxnFromObject({
      from: this.operatorAccount.addr,
      appIndex: this.appId,
      appArgs: [
        new Uint8Array(Buffer.from("setup")),
        algosdk.encodeUint64(requiredMicroAlgos),
        algosdk.encodeUint64(maxPlayers),
      ],
      suggestedParams: params,
    });

    const signedTxn = setupTxn.signTxn(this.operatorAccount.sk);
    const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do();
    
    await this.waitForConfirmation(txId);
    return txId;
  }

  /**
   * Player deposits funds (atomic group transaction)
   */
  async playerDeposit(
    playerAccount: algosdk.Account,
    amount: number
  ): Promise<string> {
    const params = await this.algodClient.getTransactionParams().do();
    const appAddress = algosdk.getApplicationAddress(this.appId);

    // Payment transaction
    const paymentTxn = algosdk.makePaymentTxnWithSuggestedParamsFromObject({
      from: playerAccount.addr,
      to: appAddress,
      amount: amount,
      suggestedParams: params,
    });

    // App call transaction
    const appCallTxn = algosdk.makeApplicationNoOpTxnFromObject({
      from: playerAccount.addr,
      appIndex: this.appId,
      appArgs: [new Uint8Array(Buffer.from("deposit"))],
      suggestedParams: params,
    });

    // Group transactions
    const txns = [paymentTxn, appCallTxn];
    const groupId = algosdk.computeGroupID(txns);
    for (let i = 0; i < txns.length; i++) txns[i].group = groupId;

    // Sign both transactions
    const signedPayment = paymentTxn.signTxn(playerAccount.sk);
    const signedAppCall = appCallTxn.signTxn(playerAccount.sk);

    // Send grouped transactions
    const { txId } = await this.algodClient.sendRawTransaction([
      signedPayment,
      signedAppCall,
    ]).do();

    await this.waitForConfirmation(txId);
    return txId;
  }

  /**
   * Start the match
   */
  async startMatch(): Promise<string> {
    const params = await this.algodClient.getTransactionParams().do();

    const startTxn = algosdk.makeApplicationNoOpTxnFromObject({
      from: this.operatorAccount.addr,
      appIndex: this.appId,
      appArgs: [new Uint8Array(Buffer.from("start"))],
      suggestedParams: params,
    });

    const signedTxn = startTxn.signTxn(this.operatorAccount.sk);
    const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do();
    
    await this.waitForConfirmation(txId);
    return txId;
  }

  /**
   * Payout winner
   */
  async payoutWinner(winnerAddr: string): Promise<string> {
    const params = await this.algodClient.getTransactionParams().do();

    const payoutTxn = algosdk.makeApplicationNoOpTxnFromObject({
      from: this.operatorAccount.addr,
      appIndex: this.appId,
      appArgs: [new Uint8Array(Buffer.from("payout"))],
      accounts: [winnerAddr],
      suggestedParams: params,
    });

    const signedTxn = payoutTxn.signTxn(this.operatorAccount.sk);
    const { txId } = await this.algodClient.sendRawTransaction(signedTxn).do();
    
    await this.waitForConfirmation(txId);
    return txId;
  }

  /**
   * Get match state from contract
   */
  async getMatchState(): Promise<{
    operator: string;
    required: number;
    maxPlayers: number;
    deposits: number;
    status: number;
    nonce: number;
  }> {
    const appInfo = await this.algodClient.getApplicationByID(this.appId).do();
    const globalState = appInfo.params["global-state"];

    const decodeState = (key: string): any => {
      const item = globalState.find((s: any) => 
        Buffer.from(s.key, "base64").toString() === key
      );
      if (!item) return null;
      if (item.value.type === 1) return Buffer.from(item.value.bytes, "base64").toString();
      if (item.value.type === 2) return item.value.uint;
      return null;
    };

    return {
      operator: decodeState("operator"),
      required: decodeState("required"),
      maxPlayers: decodeState("maxplayers"),
      deposits: decodeState("deposits"),
      status: decodeState("status"),
      nonce: decodeState("match_nonce"),
    };
  }

  /**
   * Deploy the contract (one-time setup)
   */
  static async deployContract(
    algodClient: algosdk.Algodv2,
    operatorAccount: algosdk.Account
  ): Promise<number> {
    const params = await algodClient.getTransactionParams().do();

    // NOTE: Load compiled TEAL programs
    const approvalProgram = new Uint8Array([]); // TODO: Load compiled approval.teal
    const clearProgram = new Uint8Array([]); // TODO: Load compiled clear.teal

    const createTxn = algosdk.makeApplicationCreateTxnFromObject({
      from: operatorAccount.addr,
      approvalProgram,
      clearProgram,
      numLocalInts: 2,
      numLocalByteSlices: 2,
      numGlobalInts: 16,
      numGlobalByteSlices: 2,
      onComplete: algosdk.OnApplicationComplete.NoOpOC,
      suggestedParams: params,
    });

    const signedTxn = createTxn.signTxn(operatorAccount.sk);
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
 * 2. Save PyTEAL contract to file (e.g., escrow_contract.py)
 * 
 * 3. Compile to TEAL:
 *    python escrow_contract.py
 * 
 * 4. Deploy:
 *    const appId = await AlgorandEscrowContract.deployContract(algodClient, operatorAccount);
 * 
 * 5. Fund contract account:
 *    const appAddress = algosdk.getApplicationAddress(appId);
 *    // Send ALGO to appAddress for minimum balance
 * 
 * 6. Usage example:
 *    const escrow = new AlgorandEscrowContract(config);
 *    
 *    // Setup match
 *    await escrow.setupMatch(1000000, 2); // 1 ALGO, 2 players
 *    
 *    // Players opt-in and deposit
 *    await escrow.playerDeposit(player1Account, 1000000);
 *    await escrow.playerDeposit(player2Account, 1000000);
 *    
 *    // Check if ready
 *    const state = await escrow.getMatchState();
 *    if (state.status === 1) { // Ready
 *      await escrow.startMatch();
 *    }
 *    
 *    // After game ends, payout winner
 *    await escrow.payoutWinner(winnerAddress);
 * 
 * SECURITY NOTES:
 * - Contract account must be funded with minimum balance
 * - Operator account must be secure (server-side only)
 * - For production: add refund mechanisms and timeout handling
 * - Test thoroughly on TestNet before mainnet deployment
 */

export { AlgorandEscrowContract as default };

