// Arweave Smart Contract Rewards Distribution Engine
// SmartWeave-based stateful smart contract for trustless reward distribution
// This contract tracks player achievements and coordinates reward payouts via relayer

/**
 * SMART CONTRACT OVERVIEW:
 * 
 * This SmartWeave contract provides a reward mechanism where:
 * - Players connect wallet and start game (registerPlayer)
 * - Contract tracks player scores and achievements
 * - When player reaches goal threshold, contract creates payout entry
 * - Relayer monitors contract state and sends AR to eligible players
 * - All state changes are permanent and auditable on Arweave
 * 
 * DEPLOYMENT FLOW:
 * 1. Deploy contract with owner address, reward amount, and point threshold
 * 2. Fund relayer wallet with AR for reward payouts
 * 3. Players call 'startGame' to register
 * 4. Players submit scores via 'submitScore'
 * 5. Relayer monitors payouts array and sends AR to winners
 * 6. Relayer marks payouts as paid in contract state
 * 
 * NOTE: SmartWeave contracts use lazy evaluation - state is computed off-chain.
 * Actual AR transfers require L1 transactions via relayer.
 */

export const SMARTWEAVE_REWARDS_CONTRACT = `
// Arweave Rewards Smart Contract (SmartWeave/JavaScript)
// Trustless reward distribution with relayer-based payout

export function handle(state, action) {
  const input = action.input || {};
  const caller = action.caller;

  // State structure:
  // {
  //   owner: "<owner-address>",
  //   goal: 10000,
  //   winAmountAR: "0.01",
  //   players: {
  //     "<player-address>": {
  //       started: true,
  //       bestScore: 0,
  //       claimed: false,
  //       registeredAt: timestamp
  //     }
  //   },
  //   payouts: [
  //     {
  //       id: "uuid",
  //       to: "<player-address>",
  //       amountAR: "0.01",
  //       score: 10000,
  //       paid: false,
  //       claimed: false,
  //       createdAt: timestamp,
  //       txId: null
  //     }
  //   ]
  // }

  // Helper: initialize players
  function ensurePlayers() {
    if (!state.players) state.players = {};
  }

  // Helper: initialize payouts
  function ensurePayouts() {
    if (!state.payouts) state.payouts = [];
  }

  switch (input.function) {
    case "init":
      // Only on deployment via initialState
      return { state };

    case "startGame":
      // Register player (called when user connects wallet)
      ensurePlayers();
      if (!caller) throw new ContractError("Missing caller");

      state.players[caller] = state.players[caller] || {
        started: true,
        bestScore: 0,
        claimed: false,
        registeredAt: Date.now()
      };
      state.players[caller].started = true;

      return { state };

    case "submitScore":
      // Record player score and create payout if threshold reached
      ensurePlayers();
      ensurePayouts();

      if (!caller) throw new ContractError("Missing caller");

      const score = Number(input.score || 0);
      if (Number.isNaN(score) || score < 0) {
        throw new ContractError("Invalid score");
      }

      const player = state.players[caller];
      if (!player || !player.started) {
        throw new ContractError("Player must call startGame first");
      }

      // Update best score
      if (score > player.bestScore) {
        player.bestScore = score;
      }

      // Create payout if reached goal and no existing pending payout
      const goalThreshold = Number(state.goal || 10000);
      if (score >= goalThreshold) {
        // Check if player already has pending/paid payout
        const existingPayout = state.payouts.some(p => p.to === caller && !p.paid);
        
        if (!existingPayout) {
          const payoutId = \`\${caller}-\${Date.now()}\`;
          const rewardAmount = String(state.winAmountAR || "0.01");
          
          state.payouts.push({
            id: payoutId,
            to: caller,
            amountAR: rewardAmount,
            score: score,
            paid: false,
            claimed: false,
            createdAt: Date.now(),
            txId: null
          });
        }
      }

      return { state };

    case "claim":
      // Mark that player has claimed (optional step before relayer payout)
      ensurePlayers();
      ensurePayouts();

      if (!caller) throw new ContractError("Missing caller");

      const pendingPayout = state.payouts.find(p => p.to === caller && !p.paid);
      if (!pendingPayout) {
        throw new ContractError("No pending payout for caller");
      }

      pendingPayout.claimed = true;
      pendingPayout.claimedAt = Date.now();

      return { state };

    case "adminSetGoal":
      // Owner can update the goal threshold
      if (caller !== state.owner) throw new ContractError("Only owner");

      const newGoal = Number(input.goal);
      if (Number.isNaN(newGoal) || newGoal <= 0) {
        throw new ContractError("Invalid goal");
      }

      state.goal = newGoal;
      return { state };

    case "adminSetWinAmount":
      // Owner can update the reward amount
      if (caller !== state.owner) throw new ContractError("Only owner");
      if (!input.amountAR) throw new ContractError("Missing amountAR");

      state.winAmountAR = String(input.amountAR);
      return { state };

    case "adminMarkPaid":
      // Admin/relayer marks a payout as paid after sending AR
      if (caller !== state.owner) throw new ContractError("Only owner");
      if (!input.id) throw new ContractError("Missing payout id");

      ensurePayouts();
      
      for (let payout of state.payouts) {
        if (payout.id === input.id) {
          payout.paid = true;
          payout.txId = input.txId || null;
          payout.paidAt = Date.now();
          break;
        }
      }

      return { state };

    case "getPlayerStats":
      // Query player statistics (read-only)
      ensurePlayers();
      
      if (!caller) throw new ContractError("Missing caller");
      
      const playerStats = state.players[caller] || null;
      
      // Return as state modification is required by SmartWeave
      // In practice, use readState() from client
      return { state, result: playerStats };

    default:
      throw new ContractError(\`Invalid function: \${input.function}\`);
  }
}
`;

/**
 * Initial State Template for Contract Deployment
 */
export const REWARDS_INITIAL_STATE_TEMPLATE = {
  owner: '<OWNER_ADDRESS>', // Replace with deployer/admin address
  goal: 10000, // Points threshold to earn reward
  winAmountAR: '0.01', // Reward amount in AR
  players: {},
  payouts: [],
};

/**
 * Relayer Script Template
 * This Node.js script watches the contract and sends AR to eligible players
 */
export const RELAYER_SCRIPT_TEMPLATE = `
// relayer.js - Monitors contract and sends AR rewards
const fs = require('fs');
const Arweave = require('arweave');
const { WarpFactory } = require('warp-contracts');

const KEYFILE_PATH = './relayer-key.json';
const CONTRACT_ID = '<YOUR_CONTRACT_TX_ID>';
const POLL_INTERVAL = 20000; // 20 seconds

async function main() {
  const arweave = Arweave.init({
    host: 'arweave.net',
    port: 443,
    protocol: 'https'
  });

  const warp = WarpFactory.forMainnet();
  const key = JSON.parse(fs.readFileSync(KEYFILE_PATH, 'utf8'));
  const walletAddress = await arweave.wallets.jwkToAddress(key);

  console.log('Relayer wallet:', walletAddress);

  while (true) {
    try {
      const contract = warp.contract(CONTRACT_ID).connect(key);
      const { cachedValue } = await contract.readState();
      const state = cachedValue.state;

      const payouts = state.payouts || [];

      for (const payout of payouts) {
        if (!payout.paid) {
          console.log('Processing payout:', payout.id);

          // Convert AR to Winston (1 AR = 1e12 Winston)
          const amountAR = Number(payout.amountAR);
          if (!(amountAR > 0)) {
            console.log('Invalid amount:', payout.amountAR);
            continue;
          }

          const winston = arweave.ar.arToWinston(amountAR.toString());

          // Create transaction
          const tx = await arweave.createTransaction(
            { target: payout.to, quantity: winston },
            key
          );
          tx.addTag('App-Name', 'GameRewardRelayer');
          tx.addTag('Contract-ID', CONTRACT_ID);
          tx.addTag('Payout-ID', payout.id);

          await arweave.transactions.sign(tx, key);

          // Submit transaction
          const response = await arweave.transactions.post(tx);
          
          if (response.status === 200 || response.status === 202) {
            console.log('Payout sent. TX ID:', tx.id);

            // Mark as paid in contract
            await contract.writeInteraction({
              function: 'adminMarkPaid',
              id: payout.id,
              txId: tx.id
            });

            console.log('Marked paid in contract');
          } else {
            console.error('Failed to send AR:', response.status);
          }

          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    } catch (error) {
      console.error('Relayer error:', error);
    }

    await new Promise(resolve => setTimeout(resolve, POLL_INTERVAL));
  }
}

main();
`;

/**
 * TypeScript Client Interface for Smart Contract Interaction
 */

// @ts-expect-error - arweave is a runtime dependency
import Arweave from 'arweave';
// @ts-expect-error - arweave types may not be available
import { JWKInterface } from 'arweave/node/lib/wallet';
// @ts-expect-error - warp-contracts is a runtime dependency
import { WarpFactory, Contract } from 'warp-contracts';

export interface SmartContractRewardConfig {
  contractId: string; // Deployed SmartWeave contract TX ID
  ownerKey?: JWKInterface; // Admin wallet (optional for read-only)
  relayerKey?: JWKInterface; // Relayer wallet for payouts
  host?: string;
  port?: number;
  protocol?: string;
}

export interface PlayerState {
  started: boolean;
  bestScore: number;
  claimed: boolean;
  registeredAt: number;
}

export interface PayoutEntry {
  id: string;
  to: string;
  amountAR: string;
  score: number;
  paid: boolean;
  claimed: boolean;
  createdAt: number;
  claimedAt?: number;
  paidAt?: number;
  txId: string | null;
}

export interface RewardsContractState {
  owner: string;
  goal: number;
  winAmountAR: string;
  players: Record<string, PlayerState>;
  payouts: PayoutEntry[];
}

export class ArweaveSmartContractRewarder {
  private arweave: Arweave;
  private warp: any;
  private contract: Contract<RewardsContractState>;
  private contractId: string;
  private ownerKey?: JWKInterface;
  private relayerKey?: JWKInterface;

  constructor(config: SmartContractRewardConfig) {
    this.arweave = Arweave.init({
      host: config.host || 'arweave.net',
      port: config.port || 443,
      protocol: config.protocol || 'https',
    });

    this.warp = WarpFactory.forMainnet();
    this.contractId = config.contractId;
    this.ownerKey = config.ownerKey;
    this.relayerKey = config.relayerKey;

    // Connect contract (with owner key if provided)
    this.contract = this.ownerKey
      ? this.warp.contract(this.contractId).connect(this.ownerKey)
      : this.warp.contract(this.contractId);
  }

  /**
   * Player starts game (registers in contract)
   */
  async startGame(playerKey: JWKInterface): Promise<string> {
    const playerContract = this.warp.contract(this.contractId).connect(playerKey);

    const result = await playerContract.writeInteraction({
      function: 'startGame',
    });

    return result.originalTxId;
  }

  /**
   * Submit player score
   */
  async submitScore(playerKey: JWKInterface, score: number): Promise<string> {
    const playerContract = this.warp.contract(this.contractId).connect(playerKey);

    const result = await playerContract.writeInteraction({
      function: 'submitScore',
      score,
    });

    return result.originalTxId;
  }

  /**
   * Player claims reward (marks intent to receive)
   */
  async claimReward(playerKey: JWKInterface): Promise<string> {
    const playerContract = this.warp.contract(this.contractId).connect(playerKey);

    const result = await playerContract.writeInteraction({
      function: 'claim',
    });

    return result.originalTxId;
  }

  /**
   * Admin: Set goal threshold
   */
  async setGoal(newGoal: number): Promise<string> {
    if (!this.ownerKey) throw new Error('Owner key required');

    const result = await this.contract.writeInteraction({
      function: 'adminSetGoal',
      goal: newGoal,
    });

    return result.originalTxId;
  }

  /**
   * Admin: Set win amount
   */
  async setWinAmount(amountAR: string): Promise<string> {
    if (!this.ownerKey) throw new Error('Owner key required');

    const result = await this.contract.writeInteraction({
      function: 'adminSetWinAmount',
      amountAR,
    });

    return result.originalTxId;
  }

  /**
   * Relayer: Execute payout by sending AR L1 transaction
   */
  async executePayouts(): Promise<string[]> {
    if (!this.relayerKey) throw new Error('Relayer key required');

    const state = await this.getState();
    const pendingPayouts = state.payouts.filter(p => !p.paid);

    const txIds: string[] = [];

    for (const payout of pendingPayouts) {
      try {
        // Convert AR to Winston
        const amountAR = Number(payout.amountAR);
        if (!(amountAR > 0)) {
          console.log('Invalid amount:', payout.amountAR);
          continue;
        }

        const winston = this.arweave.ar.arToWinston(amountAR.toString());

        // Create L1 transaction
        const transaction = await this.arweave.createTransaction(
          { target: payout.to, quantity: winston },
          this.relayerKey
        );

        transaction.addTag('App-Name', 'GameRewardRelayer');
        transaction.addTag('Contract-ID', this.contractId);
        transaction.addTag('Payout-ID', payout.id);

        await this.arweave.transactions.sign(transaction, this.relayerKey);

        // Submit transaction
        const response = await this.arweave.transactions.post(transaction);

        if (response.status === 200 || response.status === 202) {
          console.log('Payout sent. TX ID:', transaction.id);

          // Mark as paid in contract
          await this.markPaid(payout.id, transaction.id);

          txIds.push(transaction.id);
        } else {
          console.error('Failed to send AR:', response.status);
        }

        // Rate limiting delay
        await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (error) {
        console.error('Error processing payout:', payout.id, error);
      }
    }

    return txIds;
  }

  /**
   * Mark payout as paid (called by relayer after sending AR)
   */
  async markPaid(payoutId: string, txId: string): Promise<string> {
    if (!this.ownerKey) throw new Error('Owner key required');

    const result = await this.contract.writeInteraction({
      function: 'adminMarkPaid',
      id: payoutId,
      txId,
    });

    return result.originalTxId;
  }

  /**
   * Get current contract state
   */
  async getState(): Promise<RewardsContractState> {
    const { cachedValue } = await this.contract.readState();
    return cachedValue.state as RewardsContractState;
  }

  /**
   * Get player stats
   */
  async getPlayerStats(playerAddr: string): Promise<PlayerState | null> {
    const state = await this.getState();
    return state.players[playerAddr] || null;
  }

  /**
   * Get pending payouts
   */
  async getPendingPayouts(): Promise<PayoutEntry[]> {
    const state = await this.getState();
    return state.payouts.filter(p => !p.paid);
  }

  /**
   * Deploy a new rewards contract (one-time setup)
   */
  static async deployContract(
    arweave: Arweave,
    ownerKey: JWKInterface,
    initialGoal: number = 10000,
    initialRewardAR: string = '0.01'
  ): Promise<string> {
    const warp = WarpFactory.forMainnet();
    const ownerAddr = await arweave.wallets.jwkToAddress(ownerKey);

    const initialState: RewardsContractState = {
      owner: ownerAddr,
      goal: initialGoal,
      winAmountAR: initialRewardAR,
      players: {},
      payouts: [],
    };

    // Deploy contract
    const { contractTxId } = await warp.createContract.deploy({
      wallet: ownerKey,
      initState: JSON.stringify(initialState),
      src: SMARTWEAVE_REWARDS_CONTRACT,
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
 *    const ownerKey = JSON.parse(fs.readFileSync('owner-wallet.json', 'utf-8'));
 *    
 *    const contractId = await ArweaveSmartContractRewarder.deployContract(
 *      arweave,
 *      ownerKey,
 *      10000,  // Goal threshold
 *      '0.01'  // Reward amount in AR
 *    );
 *    
 *    console.log('Contract deployed:', contractId);
 * 
 * 3. Fund relayer wallet:
 *    // Create a separate relayer wallet and fund it with AR for payouts
 *    const relayerKey = await arweave.wallets.generate();
 *    const relayerAddr = await arweave.wallets.jwkToAddress(relayerKey);
 *    // Send AR to relayerAddr
 * 
 * 4. Frontend integration (player side):
 *    const rewarder = new ArweaveSmartContractRewarder({
 *      contractId: 'deployed-contract-tx-id',
 *    });
 *    
 *    // Player connects wallet and starts game
 *    await rewarder.startGame(playerKey);
 *    
 *    // Player achieves score
 *    await rewarder.submitScore(playerKey, 12345);
 *    
 *    // Player claims reward
 *    await rewarder.claimReward(playerKey);
 * 
 * 5. Backend relayer:
 *    const relayerRewarder = new ArweaveSmartContractRewarder({
 *      contractId: 'deployed-contract-tx-id',
 *      ownerKey: ownerKey,
 *      relayerKey: relayerKey
 *    });
 *    
 *    // Run periodically or as a service
 *    setInterval(async () => {
 *      const txIds = await relayerRewarder.executePayouts();
 *      console.log('Processed payouts:', txIds.length);
 *    }, 30000);
 * 
 * SECURITY NOTES:
 * - Relayer wallet must be funded and secure (server-side only)
 * - Owner key controls contract parameters
 * - SmartWeave state is eventually consistent (lazy evaluation)
 * - For production: implement monitoring and alerting for failed payouts
 * - Test thoroughly on ArLocal or testnet before mainnet
 * - Consider implementing maximum payout limits and rate limiting
 * - Store relayer script template in a separate file for reference
 * 
 * RELAYER SCRIPT USAGE:
 * - Save the RELAYER_SCRIPT_TEMPLATE to a file (e.g., relayer.js)
 * - Update CONTRACT_ID and KEYFILE_PATH
 * - Run: node relayer.js
 * - Relayer will monitor contract and automatically send rewards
 */

export { ArweaveSmartContractRewarder as default };

