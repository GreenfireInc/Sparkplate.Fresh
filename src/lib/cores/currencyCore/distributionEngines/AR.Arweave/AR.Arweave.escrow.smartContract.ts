// Arweave Smart Contract Escrow Distribution Engine
// SmartWeave-based stateful smart contract for trustless two-party escrow
// This contract coordinates escrow state while a relayer handles actual AR transfers

/**
 * SMART CONTRACT ESCROW OVERVIEW:
 * 
 * This SmartWeave contract provides a trustless escrow coordination mechanism where:
 * - Operator (game server) creates match and sets parameters
 * - Players register and deposit funds via L1 transactions to escrow wallet
 * - Contract tracks deposits and marks match ready when both players have paid
 * - Operator can start the match when deposits are complete
 * - After match ends, operator triggers payout which relayer executes
 * - Relayer sends AR to winner via L1 transaction
 * 
 * TRUST MODEL:
 * - Contract coordinates state (deposits, winner)
 * - Relayer actually sends AR (must be trusted/operated by game server)
 * - Players trust operator for fair game arbitration
 * - All state changes are permanent and auditable on Arweave
 * 
 * NOTE: SmartWeave contracts use lazy evaluation - state is computed off-chain
 * when reading. Actual AR transfers require L1 transactions via relayer.
 */

export const SMARTWEAVE_ESCROW_CONTRACT = `
// Arweave Escrow Smart Contract (SmartWeave/JavaScript)
// Secure multi-player escrow with relayer-based payout

export function handle(state, action) {
  const input = action.input || {};
  const caller = action.caller;

  // State structure:
  // {
  //   owner: "<owner-address>",
  //   escrowWallet: "<escrow-wallet-address>",
  //   matches: {
  //     "<match-id>": {
  //       id: "match-id",
  //       stakeWinstons: "1000000000000",
  //       maxPlayers: 2,
  //       players: {
  //         "<player-address>": { deposited: false, depositTxId: null, joinedAt: timestamp }
  //       },
  //       status: 0, // 0=waiting, 1=depositsComplete, 2=started, 3=finished
  //       winnerAddr: null,
  //       payoutTxId: null,
  //       createdAt: timestamp
  //     }
  //   }
  // }

  // Helper: initialize matches object
  function ensureMatches() {
    if (!state.matches) state.matches = {};
  }

  // Helper: get match
  function getMatch(matchId) {
    ensureMatches();
    const match = state.matches[matchId];
    if (!match) throw new ContractError(\`Match \${matchId} not found\`);
    return match;
  }

  switch (input.function) {
    case "init":
      // Only on deployment
      return { state };

    case "setEscrowWallet":
      // Owner sets the escrow wallet address
      if (caller !== state.owner) throw new ContractError("Only owner can set escrow wallet");
      if (!input.escrowWallet) throw new ContractError("Missing escrowWallet");
      state.escrowWallet = input.escrowWallet;
      return { state };

    case "createMatch":
      // Create a new match
      if (caller !== state.owner) throw new ContractError("Only owner can create matches");
      if (!input.matchId) throw new ContractError("Missing matchId");
      if (!input.stakeWinstons) throw new ContractError("Missing stakeWinstons");

      ensureMatches();
      if (state.matches[input.matchId]) {
        throw new ContractError("Match already exists");
      }

      state.matches[input.matchId] = {
        id: input.matchId,
        stakeWinstons: String(input.stakeWinstons),
        maxPlayers: Number(input.maxPlayers) || 2,
        players: {},
        status: 0, // waiting
        winnerAddr: null,
        payoutTxId: null,
        createdAt: Date.now(),
        hostMetadata: input.hostMetadata || null
      };

      return { state };

    case "joinMatch":
      // Player joins a match
      if (!input.matchId) throw new ContractError("Missing matchId");
      const match = getMatch(input.matchId);

      if (Object.keys(match.players).length >= match.maxPlayers) {
        throw new ContractError("Match is full");
      }

      if (match.players[caller]) {
        throw new ContractError("Player already joined");
      }

      match.players[caller] = {
        deposited: false,
        depositTxId: null,
        joinedAt: Date.now()
      };

      return { state };

    case "markDeposit":
      // Mark that a player has deposited (verified by operator/relayer)
      if (caller !== state.owner) throw new ContractError("Only owner can mark deposits");
      if (!input.matchId) throw new ContractError("Missing matchId");
      if (!input.playerAddr) throw new ContractError("Missing playerAddr");
      if (!input.depositTxId) throw new ContractError("Missing depositTxId");

      const matchDep = getMatch(input.matchId);
      if (!matchDep.players[input.playerAddr]) {
        throw new ContractError("Player not in match");
      }

      matchDep.players[input.playerAddr].deposited = true;
      matchDep.players[input.playerAddr].depositTxId = input.depositTxId;

      // Check if all players deposited
      const playerAddrs = Object.keys(matchDep.players);
      const allDeposited = playerAddrs.every(addr => matchDep.players[addr].deposited);

      if (allDeposited && playerAddrs.length === matchDep.maxPlayers) {
        matchDep.status = 1; // depositsComplete
      }

      return { state };

    case "startMatch":
      // Operator starts the match
      if (caller !== state.owner) throw new ContractError("Only owner can start match");
      if (!input.matchId) throw new ContractError("Missing matchId");

      const matchStart = getMatch(input.matchId);
      if (matchStart.status !== 1) {
        throw new ContractError("Match not ready to start (deposits incomplete)");
      }

      matchStart.status = 2; // started
      return { state };

    case "setPayout":
      // Operator sets the winner and creates payout entry
      if (caller !== state.owner) throw new ContractError("Only owner can set payout");
      if (!input.matchId) throw new ContractError("Missing matchId");
      if (!input.winnerAddr) throw new ContractError("Missing winnerAddr");

      const matchPayout = getMatch(input.matchId);
      if (matchPayout.status !== 2) {
        throw new ContractError("Match not in started state");
      }

      if (!matchPayout.players[input.winnerAddr]) {
        throw new ContractError("Winner not in match");
      }

      matchPayout.winnerAddr = input.winnerAddr;
      matchPayout.status = 3; // finished (pending relayer)
      
      return { state };

    case "markPayout":
      // Relayer marks that payout was executed
      if (caller !== state.owner) throw new ContractError("Only owner can mark payout");
      if (!input.matchId) throw new ContractError("Missing matchId");
      if (!input.payoutTxId) throw new ContractError("Missing payoutTxId");

      const matchPaid = getMatch(input.matchId);
      if (matchPaid.status !== 3) {
        throw new ContractError("Match not in payout state");
      }

      matchPaid.payoutTxId = input.payoutTxId;
      matchPaid.paidAt = Date.now();

      return { state };

    default:
      throw new ContractError(\`Invalid function: \${input.function}\`);
  }
}
`;

/**
 * Initial State Template for Contract Deployment
 */
export const ESCROW_INITIAL_STATE_TEMPLATE = {
  owner: '<OWNER_ADDRESS>', // Replace with deployer address
  escrowWallet: '<ESCROW_WALLET_ADDRESS>', // Replace with escrow wallet
  matches: {},
};

/**
 * TypeScript Client Interface for Escrow Contract
 */

// @ts-expect-error - arweave is a runtime dependency
import Arweave from 'arweave';
// @ts-expect-error - arweave types may not be available
import { JWKInterface } from 'arweave/node/lib/wallet';
// @ts-expect-error - warp-contracts is a runtime dependency
import { WarpFactory, Contract } from 'warp-contracts';

export interface EscrowContractConfig {
  contractId: string; // Deployed SmartWeave contract transaction ID
  operatorKey: JWKInterface; // Game server/operator wallet
  escrowWalletKey?: JWKInterface; // Optional: escrow wallet for relayer
  host?: string;
  port?: number;
  protocol?: string;
}

export interface MatchState {
  id: string;
  stakeWinstons: string;
  maxPlayers: number;
  players: Record<string, {
    deposited: boolean;
    depositTxId: string | null;
    joinedAt: number;
  }>;
  status: number; // 0=waiting, 1=depositsComplete, 2=started, 3=finished
  winnerAddr: string | null;
  payoutTxId: string | null;
  createdAt: number;
  hostMetadata?: unknown;
}

export interface EscrowContractState {
  owner: string;
  escrowWallet: string;
  matches: Record<string, MatchState>;
}

export class ArweaveEscrowContract {
  private arweave: Arweave;
  private warp: any; // WarpFactory instance
  private contract: Contract<EscrowContractState>;
  private operatorKey: JWKInterface;
  private contractId: string;
  private escrowWalletKey?: JWKInterface;

  constructor(config: EscrowContractConfig) {
    this.arweave = Arweave.init({
      host: config.host || 'arweave.net',
      port: config.port || 443,
      protocol: config.protocol || 'https',
    });

    this.warp = WarpFactory.forMainnet();
    this.operatorKey = config.operatorKey;
    this.contractId = config.contractId;
    this.escrowWalletKey = config.escrowWalletKey;

    // Connect contract
    this.contract = this.warp.contract(this.contractId).connect(this.operatorKey);
  }

  /**
   * Create a new match
   */
  async createMatch(matchId: string, stakeWinstons: string, maxPlayers: number = 2, hostMetadata?: unknown): Promise<string> {
    const result = await this.contract.writeInteraction({
      function: 'createMatch',
      matchId,
      stakeWinstons,
      maxPlayers,
      hostMetadata,
    });

    return result.originalTxId;
  }

  /**
   * Player joins a match (called by player's wallet)
   */
  async joinMatch(matchId: string, playerKey: JWKInterface): Promise<string> {
    const playerContract = this.warp.contract(this.contractId).connect(playerKey);

    const result = await playerContract.writeInteraction({
      function: 'joinMatch',
      matchId,
    });

    return result.originalTxId;
  }

  /**
   * Mark that a player has deposited (after verifying L1 transaction)
   */
  async markDeposit(matchId: string, playerAddr: string, depositTxId: string): Promise<string> {
    const result = await this.contract.writeInteraction({
      function: 'markDeposit',
      matchId,
      playerAddr,
      depositTxId,
    });

    return result.originalTxId;
  }

  /**
   * Start the match
   */
  async startMatch(matchId: string): Promise<string> {
    const result = await this.contract.writeInteraction({
      function: 'startMatch',
      matchId,
    });

    return result.originalTxId;
  }

  /**
   * Set winner and trigger payout
   */
  async setPayout(matchId: string, winnerAddr: string): Promise<string> {
    const result = await this.contract.writeInteraction({
      function: 'setPayout',
      matchId,
      winnerAddr,
    });

    return result.originalTxId;
  }

  /**
   * Execute payout via L1 transaction (relayer function)
   */
  async executePayoutL1(matchId: string, winnerAddr: string, amountWinstons: string): Promise<string> {
    if (!this.escrowWalletKey) {
      throw new Error('Escrow wallet key not provided');
    }

    // Create L1 transaction from escrow wallet to winner
    const transaction = await this.arweave.createTransaction(
      {
        target: winnerAddr,
        quantity: amountWinstons,
      },
      this.escrowWalletKey
    );

    transaction.addTag('App-Name', 'ArweaveEscrowPayout');
    transaction.addTag('Match-ID', matchId);
    transaction.addTag('Contract-ID', this.contractId);

    await this.arweave.transactions.sign(transaction, this.escrowWalletKey);
    const response = await this.arweave.transactions.post(transaction);

    if (response.status !== 200 && response.status !== 202) {
      throw new Error(`Failed to post payout transaction: ${response.status}`);
    }

    const txId = transaction.id;

    // Mark payout in contract
    await this.markPayout(matchId, txId);

    return txId;
  }

  /**
   * Mark payout as complete
   */
  async markPayout(matchId: string, payoutTxId: string): Promise<string> {
    const result = await this.contract.writeInteraction({
      function: 'markPayout',
      matchId,
      payoutTxId,
    });

    return result.originalTxId;
  }

  /**
   * Get current contract state
   */
  async getState(): Promise<EscrowContractState> {
    const { cachedValue } = await this.contract.readState();
    return cachedValue.state as EscrowContractState;
  }

  /**
   * Get specific match state
   */
  async getMatchState(matchId: string): Promise<MatchState | null> {
    const state = await this.getState();
    return state.matches[matchId] || null;
  }

  /**
   * Deploy a new escrow contract (one-time setup)
   */
  static async deployContract(
    arweave: Arweave,
    operatorKey: JWKInterface,
    escrowWallet: string
  ): Promise<string> {
    const warp = WarpFactory.forMainnet();
    const operatorAddr = await arweave.wallets.jwkToAddress(operatorKey);

    const initialState: EscrowContractState = {
      owner: operatorAddr,
      escrowWallet: escrowWallet,
      matches: {},
    };

    // Deploy contract
    const { contractTxId } = await warp.createContract.deploy({
      wallet: operatorKey,
      initState: JSON.stringify(initialState),
      src: SMARTWEAVE_ESCROW_CONTRACT,
    });

    return contractTxId;
  }
}

/**
 * DEPLOYMENT INSTRUCTIONS:
 * 
 * 1. Install dependencies:
 *    npm install arweave warp-contracts
 * 
 * 2. Deploy the contract:
 *    const arweave = Arweave.init({ host: 'arweave.net', port: 443, protocol: 'https' });
 *    const operatorKey = JSON.parse(fs.readFileSync('operator-wallet.json'));
 *    const escrowKey = await arweave.wallets.generate();
 *    const escrowAddr = await arweave.wallets.jwkToAddress(escrowKey);
 *    
 *    const contractId = await ArweaveEscrowContract.deployContract(
 *      arweave,
 *      operatorKey,
 *      escrowAddr
 *    );
 *    
 *    console.log('Contract deployed:', contractId);
 *    console.log('Escrow wallet:', escrowAddr);
 *    // IMPORTANT: Save escrowKey securely - this wallet holds player funds
 * 
 * 3. Fund escrow wallet:
 *    // Send AR to escrowAddr to cover transaction fees
 * 
 * 4. Usage example:
 *    const escrow = new ArweaveEscrowContract({
 *      contractId: 'deployed-contract-tx-id',
 *      operatorKey: operatorKey,
 *      escrowWalletKey: escrowKey
 *    });
 *    
 *    // Create match
 *    await escrow.createMatch('match-1', '1000000000000', 2); // 1 AR stake
 *    
 *    // Players join
 *    await escrow.joinMatch('match-1', player1Key);
 *    await escrow.joinMatch('match-2', player2Key);
 *    
 *    // Players send AR to escrow wallet (external L1 transactions)
 *    
 *    // Operator verifies deposits and marks them
 *    await escrow.markDeposit('match-1', player1Addr, 'deposit-tx-id-1');
 *    await escrow.markDeposit('match-1', player2Addr, 'deposit-tx-id-2');
 *    
 *    // Check if ready
 *    const matchState = await escrow.getMatchState('match-1');
 *    if (matchState.status === 1) { // depositsComplete
 *      await escrow.startMatch('match-1');
 *    }
 *    
 *    // After game ends, set winner
 *    await escrow.setPayout('match-1', winnerAddr);
 *    
 *    // Execute payout (relayer sends AR)
 *    await escrow.executePayoutL1('match-1', winnerAddr, '2000000000000'); // 2 AR pot
 * 
 * SECURITY NOTES:
 * - Escrow wallet must be funded and secure (server-side only)
 * - Operator key controls all match operations
 * - SmartWeave state is eventually consistent (lazy evaluation)
 * - For production: implement relayer monitoring and auto-payout
 * - Test thoroughly on ArLocal or testnet before mainnet
 * - Consider implementing refund mechanisms for abandoned matches
 */

export { ArweaveEscrowContract as default };

