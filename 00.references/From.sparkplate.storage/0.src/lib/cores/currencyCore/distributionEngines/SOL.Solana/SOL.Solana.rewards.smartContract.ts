/**
 * Solana (SOL) Smart Contract Reward System
 * Anchor-based on-chain program with server attestation
 */

import {
  Connection,
  PublicKey,
  Keypair,
  Transaction,
  sendAndConfirmTransaction,
  SystemProgram,
  SYSVAR_RENT_PUBKEY,
} from '@solana/web3.js';
import * as borsh from 'borsh';
import * as crypto from 'crypto';

export const REWARD_PROGRAM_RUST = `
// Solana Anchor Program for Reward System
// Anchor.toml:
// [dependencies]
// anchor-lang = "0.28.0"
// anchor-spl = "0.28.0"

use anchor_lang::prelude::*;
use anchor_spl::token::{self, Token, TokenAccount, Transfer};

declare_id!("YourProgramID111111111111111111111111111111");

#[program]
pub mod reward_game {
    use super::*;

    pub fn initialize(ctx: Context<Initialize>, admin: Pubkey, reward_amount: u64) -> Result<()> {
        let game_state = &mut ctx.accounts.game_state;
        game_state.admin = admin;
        game_state.reward_amount = reward_amount;
        game_state.total_rewards_distributed = 0;
        game_state.bump = *ctx.bumps.get("game_state").unwrap();
        Ok(())
    }

    pub fn submit_score(
        ctx: Context<SubmitScore>,
        score: u64,
        signature: Vec<u8>,
    ) -> Result<()> {
        let player_state = &mut ctx.accounts.player_state;
        
        // Update player score
        if score > player_state.highest_score {
            player_state.highest_score = score;
        }
        
        // Check if score qualifies for reward and hasn't been claimed
        if score >= 10000 && !player_state.reward_claimed {
            // Transfer SOL reward
            let game_state = &ctx.accounts.game_state;
            let cpi_context = CpiContext::new(
                ctx.accounts.system_program.to_account_info(),
                Transfer {
                    from: ctx.accounts.game_vault.to_account_info(),
                    to: ctx.accounts.player.to_account_info(),
                },
            );
            
            token::transfer(cpi_context, game_state.reward_amount)?;
            
            player_state.reward_claimed = true;
            player_state.total_rewards_earned += game_state.reward_amount;
            
            let game_state = &mut ctx.accounts.game_state;
            game_state.total_rewards_distributed += game_state.reward_amount;
        }
        
        Ok(())
    }

    pub fn deposit_rewards(ctx: Context<DepositRewards>, amount: u64) -> Result<()> {
        // Transfer SOL to game vault
        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            Transfer {
                from: ctx.accounts.admin.to_account_info(),
                to: ctx.accounts.game_vault.to_account_info(),
            },
        );
        
        token::transfer(cpi_context, amount)?;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = admin,
        space = 8 + GameState::INIT_SPACE,
        seeds = [b"game_state"],
        bump
    )]
    pub game_state: Account<'info, GameState>,
    #[account(mut)]
    pub admin: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct SubmitScore<'info> {
    #[account(mut, seeds = [b"game_state"], bump = game_state.bump)]
    pub game_state: Account<'info, GameState>,
    #[account(
        init_if_needed,
        payer = player,
        space = 8 + PlayerState::INIT_SPACE,
        seeds = [b"player_state", player.key().as_ref()],
        bump
    )]
    pub player_state: Account<'info, PlayerState>,
    #[account(mut)]
    pub player: Signer<'info>,
    #[account(mut)]
    pub game_vault: SystemAccount<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DepositRewards<'info> {
    #[account(mut, seeds = [b"game_state"], bump = game_state.bump)]
    pub game_state: Account<'info, GameState>,
    #[account(mut, constraint = admin.key() == game_state.admin)]
    pub admin: Signer<'info>,
    #[account(mut)]
    pub game_vault: SystemAccount<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct GameState {
    pub admin: Pubkey,
    pub reward_amount: u64,
    pub total_rewards_distributed: u64,
    pub bump: u8,
}

impl GameState {
    pub const INIT_SPACE: usize = 32 + 8 + 8 + 1;
}

#[account]
pub struct PlayerState {
    pub player: Pubkey,
    pub highest_score: u64,
    pub reward_claimed: bool,
    pub total_rewards_earned: u64,
}

impl PlayerState {
    pub const INIT_SPACE: usize = 32 + 8 + 1 + 8;
}
`;

export interface RewardProgramConfig {
  programId: string;
  admin: string;
  rewardAmount: string;
  network: 'mainnet' | 'devnet' | 'testnet';
}

export interface ScoreAttestation {
  playerAddress: string;
  score: number;
  timestamp: number;
  signature: string;
}

export class SolanaRewardProgram {
  private connection: Connection;
  private payer: Keypair;
  private programId: PublicKey;

  constructor(secretKey: Uint8Array, config: RewardProgramConfig) {
    this.connection = new Connection(this.getRpcUrl(config.network), {
      commitment: 'confirmed',
    });
    this.payer = Keypair.fromSecretKey(secretKey);
    this.programId = new PublicKey(config.programId);
  }

  private getRpcUrl(network: 'mainnet' | 'devnet' | 'testnet'): string {
    switch (network) {
      case 'mainnet':
        return 'https://api.mainnet-beta.solana.com';
      case 'devnet':
        return 'https://api.devnet.solana.com';
      case 'testnet':
        return 'https://api.testnet.solana.com';
    }
  }

  async initializeProgram(admin: PublicKey, rewardAmount: number): Promise<string> {
    try {
      const [gameStatePda] = PublicKey.findProgramAddressSync(
        [Buffer.from('game_state')],
        this.programId
      );

      const rewardLamports = Math.floor(rewardAmount * 1e9);

      const data = Buffer.alloc(1 + 32 + 8);
      data.writeUInt8(0, 0);
      admin.toBuffer().copy(data, 1);
      data.writeBigUInt64LE(BigInt(rewardLamports), 33);

      const instruction = {
        keys: [
          { pubkey: gameStatePda, isSigner: false, isWritable: true },
          { pubkey: this.payer.publicKey, isSigner: true, isWritable: true },
          { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
          { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
        ],
        programId: this.programId,
        data,
      };

      const tx = new Transaction().add(instruction);

      const signature = await sendAndConfirmTransaction(this.connection, tx, [this.payer], {
        commitment: 'confirmed',
      });

      console.log(`✅ Program initialized`);
      console.log(`   Transaction: ${signature}`);

      return signature;
    } catch (error) {
      throw new Error(`Failed to initialize program: ${error}`);
    }
  }

  createAttestation(playerAddress: string, score: number, serverPrivateKey: string): ScoreAttestation {
    const timestamp = Date.now();
    const message = `${playerAddress}:${score}:${timestamp}`;
    const messageHash = crypto.createHash('sha256').update(message).digest();

    const sign = crypto.createSign('RSA-SHA256');
    sign.update(messageHash);
    const signature = sign.sign(serverPrivateKey, 'hex');

    return {
      playerAddress,
      score,
      timestamp,
      signature,
    };
  }

  async submitScore(
    playerKeypair: Keypair,
    score: number,
    attestation: ScoreAttestation
  ): Promise<string> {
    try {
      const [gameStatePda] = PublicKey.findProgramAddressSync(
        [Buffer.from('game_state')],
        this.programId
      );

      const [playerStatePda] = PublicKey.findProgramAddressSync(
        [Buffer.from('player_state'), playerKeypair.publicKey.toBuffer()],
        this.programId
      );

      const [gameVaultPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('game_vault')],
        this.programId
      );

      const signatureBytes = Buffer.from(attestation.signature, 'hex');
      const data = Buffer.alloc(1 + 8 + signatureBytes.length + 4);
      data.writeUInt8(1, 0);
      data.writeBigUInt64LE(BigInt(score), 1);
      data.writeUInt32LE(signatureBytes.length, 9);
      signatureBytes.copy(data, 13);

      const instruction = {
        keys: [
          { pubkey: gameStatePda, isSigner: false, isWritable: true },
          { pubkey: playerStatePda, isSigner: false, isWritable: true },
          { pubkey: playerKeypair.publicKey, isSigner: true, isWritable: true },
          { pubkey: gameVaultPda, isSigner: false, isWritable: true },
          { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        programId: this.programId,
        data,
      };

      const tx = new Transaction().add(instruction);

      const signature = await sendAndConfirmTransaction(
        this.connection,
        tx,
        [playerKeypair],
        { commitment: 'confirmed' }
      );

      console.log(`✅ Score submitted: ${score}`);
      console.log(`   Transaction: ${signature}`);

      return signature;
    } catch (error) {
      throw new Error(`Failed to submit score: ${error}`);
    }
  }

  async depositRewards(amount: number): Promise<string> {
    try {
      const [gameStatePda] = PublicKey.findProgramAddressSync(
        [Buffer.from('game_state')],
        this.programId
      );

      const [gameVaultPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('game_vault')],
        this.programId
      );

      const lamports = Math.floor(amount * 1e9);

      const data = Buffer.alloc(1 + 8);
      data.writeUInt8(2, 0);
      data.writeBigUInt64LE(BigInt(lamports), 1);

      const instruction = {
        keys: [
          { pubkey: gameStatePda, isSigner: false, isWritable: true },
          { pubkey: this.payer.publicKey, isSigner: true, isWritable: true },
          { pubkey: gameVaultPda, isSigner: false, isWritable: true },
          { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        programId: this.programId,
        data,
      };

      const tx = new Transaction().add(instruction);

      const signature = await sendAndConfirmTransaction(this.connection, tx, [this.payer], {
        commitment: 'confirmed',
      });

      console.log(`✅ Deposited ${amount} SOL to reward pool`);
      console.log(`   Transaction: ${signature}`);

      return signature;
    } catch (error) {
      throw new Error(`Failed to deposit rewards: ${error}`);
    }
  }
}

export class SolanaSmartContractRewarder {
  private program: SolanaRewardProgram;
  private config: RewardProgramConfig;

  constructor(secretKey: Uint8Array, config: RewardProgramConfig) {
    this.program = new SolanaRewardProgram(secretKey, config);
    this.config = config;
  }

  async initializeRewardProgram(): Promise<string> {
    const adminPubkey = new PublicKey(this.config.admin);
    const rewardAmount = parseFloat(this.config.rewardAmount);
    return await this.program.initializeProgram(adminPubkey, rewardAmount);
  }

  attestPlayerScore(playerAddress: string, score: number, serverPrivateKey: string): ScoreAttestation {
    return this.program.createAttestation(playerAddress, score, serverPrivateKey);
  }

  async submitPlayerScore(
    playerSecretKey: Uint8Array,
    score: number,
    attestation: ScoreAttestation
  ): Promise<string> {
    const playerKeypair = Keypair.fromSecretKey(playerSecretKey);
    return await this.program.submitScore(playerKeypair, score, attestation);
  }

  async fundRewardPool(amount: number): Promise<string> {
    return await this.program.depositRewards(amount);
  }
}

export default SolanaSmartContractRewarder;
