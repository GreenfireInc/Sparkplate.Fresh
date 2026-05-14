/**
 * Solana (SOL) Smart Contract Escrow System
 * Anchor-based on-chain escrow with server arbitration
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
import * as crypto from 'crypto';

export const ESCROW_PROGRAM_RUST = `
// Solana Anchor Program for Escrow System
// Anchor.toml:
// [dependencies]
// anchor-lang = "0.28.0"

use anchor_lang::prelude::*;

declare_id!("YourEscrowProgramID111111111111111111111111");

#[program]
pub mod escrow_game {
    use super::*;

    pub fn initialize(
        ctx: Context<Initialize>,
        player1: Pubkey,
        player2: Pubkey,
        server: Pubkey,
        bet_amount: u64,
    ) -> Result<()> {
        let game_state = &mut ctx.accounts.game_state;
        game_state.player1 = player1;
        game_state.player2 = player2;
        game_state.server = server;
        game_state.bet_amount = bet_amount;
        game_state.player1_deposited = false;
        game_state.player2_deposited = false;
        game_state.game_started = false;
        game_state.game_ended = false;
        game_state.winner = None;
        game_state.total_pot = 0;
        game_state.bump = *ctx.bumps.get("game_state").unwrap();
        Ok(())
    }

    pub fn deposit(ctx: Context<Deposit>) -> Result<()> {
        let game_state = &mut ctx.accounts.game_state;
        
        require!(!game_state.game_ended, ErrorCode::GameEnded);
        
        let player = ctx.accounts.player.key();
        let deposit_amount = game_state.bet_amount;
        
        // Transfer SOL to escrow vault
        let cpi_context = CpiContext::new(
            ctx.accounts.system_program.to_account_info(),
            anchor_lang::system_program::Transfer {
                from: ctx.accounts.player.to_account_info(),
                to: ctx.accounts.escrow_vault.to_account_info(),
            },
        );
        anchor_lang::system_program::transfer(cpi_context, deposit_amount)?;
        
        // Update deposit status
        if player == game_state.player1 {
            require!(!game_state.player1_deposited, ErrorCode::AlreadyDeposited);
            game_state.player1_deposited = true;
        } else if player == game_state.player2 {
            require!(!game_state.player2_deposited, ErrorCode::AlreadyDeposited);
            game_state.player2_deposited = true;
        } else {
            return Err(ErrorCode::NotAPlayer.into());
        }
        
        game_state.total_pot += deposit_amount;
        
        // Start game if both deposited
        if game_state.player1_deposited && game_state.player2_deposited {
            game_state.game_started = true;
        }
        
        Ok(())
    }

    pub fn declare_winner(
        ctx: Context<DeclareWinner>,
        winner: Pubkey,
        signature: Vec<u8>,
    ) -> Result<()> {
        let game_state = &mut ctx.accounts.game_state;
        
        require!(game_state.game_started, ErrorCode::GameNotStarted);
        require!(!game_state.game_ended, ErrorCode::GameEnded);
        require!(
            ctx.accounts.server.key() == game_state.server,
            ErrorCode::UnauthorizedServer
        );
        require!(
            winner == game_state.player1 || winner == game_state.player2,
            ErrorCode::InvalidWinner
        );
        
        game_state.winner = Some(winner);
        game_state.game_ended = true;
        
        // Transfer pot to winner
        **ctx.accounts.escrow_vault.try_borrow_mut_lamports()? -= game_state.total_pot;
        **ctx.accounts.winner_account.try_borrow_mut_lamports()? += game_state.total_pot;
        
        Ok(())
    }

    pub fn refund(ctx: Context<Refund>) -> Result<()> {
        let game_state = &ctx.accounts.game_state;
        
        require!(!game_state.game_started, ErrorCode::GameAlreadyStarted);
        
        let player = ctx.accounts.player.key();
        let refund_amount = game_state.bet_amount;
        
        if player == game_state.player1 && game_state.player1_deposited {
            **ctx.accounts.escrow_vault.try_borrow_mut_lamports()? -= refund_amount;
            **ctx.accounts.player.try_borrow_mut_lamports()? += refund_amount;
        } else if player == game_state.player2 && game_state.player2_deposited {
            **ctx.accounts.escrow_vault.try_borrow_mut_lamports()? -= refund_amount;
            **ctx.accounts.player.try_borrow_mut_lamports()? += refund_amount;
        } else {
            return Err(ErrorCode::NoRefundAvailable.into());
        }
        
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Initialize<'info> {
    #[account(
        init,
        payer = initializer,
        space = 8 + GameState::INIT_SPACE,
        seeds = [b"game_state", initializer.key().as_ref()],
        bump
    )]
    pub game_state: Account<'info, GameState>,
    #[account(mut)]
    pub initializer: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Deposit<'info> {
    #[account(mut, seeds = [b"game_state", game_state.server.as_ref()], bump = game_state.bump)]
    pub game_state: Account<'info, GameState>,
    #[account(mut)]
    pub player: Signer<'info>,
    #[account(mut, seeds = [b"escrow_vault", game_state.key().as_ref()], bump)]
    pub escrow_vault: SystemAccount<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct DeclareWinner<'info> {
    #[account(mut, seeds = [b"game_state", game_state.server.as_ref()], bump = game_state.bump)]
    pub game_state: Account<'info, GameState>,
    #[account(mut)]
    pub server: Signer<'info>,
    #[account(mut)]
    pub escrow_vault: SystemAccount<'info>,
    #[account(mut)]
    pub winner_account: SystemAccount<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Refund<'info> {
    #[account(mut, seeds = [b"game_state", game_state.server.as_ref()], bump = game_state.bump)]
    pub game_state: Account<'info, GameState>,
    #[account(mut)]
    pub player: Signer<'info>,
    #[account(mut)]
    pub escrow_vault: SystemAccount<'info>,
    pub system_program: Program<'info, System>,
}

#[account]
pub struct GameState {
    pub player1: Pubkey,
    pub player2: Pubkey,
    pub server: Pubkey,
    pub bet_amount: u64,
    pub player1_deposited: bool,
    pub player2_deposited: bool,
    pub game_started: bool,
    pub game_ended: bool,
    pub winner: Option<Pubkey>,
    pub total_pot: u64,
    pub bump: u8,
}

impl GameState {
    pub const INIT_SPACE: usize = 32 + 32 + 32 + 8 + 1 + 1 + 1 + 1 + 33 + 8 + 1;
}

#[error_code]
pub enum ErrorCode {
    #[msg("Game has already ended")]
    GameEnded,
    #[msg("Player has already deposited")]
    AlreadyDeposited,
    #[msg("Player is not part of this game")]
    NotAPlayer,
    #[msg("Game has not started yet")]
    GameNotStarted,
    #[msg("Unauthorized server")]
    UnauthorizedServer,
    #[msg("Invalid winner address")]
    InvalidWinner,
    #[msg("Game has already started")]
    GameAlreadyStarted,
    #[msg("No refund available")]
    NoRefundAvailable,
}
`;

export interface EscrowProgramConfig {
  programId: string;
  player1: string;
  player2: string;
  server: string;
  betAmount: number;
  network: 'mainnet' | 'devnet' | 'testnet';
}

export interface WinnerDeclaration {
  winner: 'player1' | 'player2';
  timestamp: number;
  signature: string;
}

export class SolanaEscrowProgram {
  private connection: Connection;
  private server: Keypair;
  private programId: PublicKey;
  private gameStateAddress?: PublicKey;

  constructor(serverSecretKey: Uint8Array, config: EscrowProgramConfig) {
    this.connection = new Connection(this.getRpcUrl(config.network), {
      commitment: 'confirmed',
    });
    this.server = Keypair.fromSecretKey(serverSecretKey);
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

  async deployEscrowGame(config: EscrowProgramConfig): Promise<string> {
    try {
      const [gameStatePda] = PublicKey.findProgramAddressSync(
        [Buffer.from('game_state'), this.server.publicKey.toBuffer()],
        this.programId
      );

      this.gameStateAddress = gameStatePda;

      const betLamports = Math.floor(config.betAmount * 1e9);

      const data = Buffer.alloc(1 + 32 + 32 + 32 + 8);
      data.writeUInt8(0, 0);
      new PublicKey(config.player1).toBuffer().copy(data, 1);
      new PublicKey(config.player2).toBuffer().copy(data, 33);
      this.server.publicKey.toBuffer().copy(data, 65);
      data.writeBigUInt64LE(BigInt(betLamports), 97);

      const instruction = {
        keys: [
          { pubkey: gameStatePda, isSigner: false, isWritable: true },
          { pubkey: this.server.publicKey, isSigner: true, isWritable: true },
          { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
          { pubkey: SYSVAR_RENT_PUBKEY, isSigner: false, isWritable: false },
        ],
        programId: this.programId,
        data,
      };

      const tx = new Transaction().add(instruction);

      const signature = await sendAndConfirmTransaction(this.connection, tx, [this.server], {
        commitment: 'confirmed',
      });

      console.log(`✅ Escrow game deployed`);
      console.log(`   Game State: ${gameStatePda.toBase58()}`);
      console.log(`   Transaction: ${signature}`);

      return signature;
    } catch (error) {
      throw new Error(`Failed to deploy escrow game: ${error}`);
    }
  }

  async deposit(playerSecretKey: Uint8Array): Promise<string> {
    if (!this.gameStateAddress) {
      throw new Error('Game not deployed');
    }

    try {
      const playerKeypair = Keypair.fromSecretKey(playerSecretKey);

      const [escrowVaultPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('escrow_vault'), this.gameStateAddress.toBuffer()],
        this.programId
      );

      const data = Buffer.alloc(1);
      data.writeUInt8(1, 0);

      const instruction = {
        keys: [
          { pubkey: this.gameStateAddress, isSigner: false, isWritable: true },
          { pubkey: playerKeypair.publicKey, isSigner: true, isWritable: true },
          { pubkey: escrowVaultPda, isSigner: false, isWritable: true },
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

      console.log(`✅ Player deposited to escrow`);
      console.log(`   Transaction: ${signature}`);

      return signature;
    } catch (error) {
      throw new Error(`Failed to deposit: ${error}`);
    }
  }

  signWinnerDeclaration(winner: 'player1' | 'player2', serverPrivateKey: string): WinnerDeclaration {
    const timestamp = Date.now();
    const message = `${winner}:${timestamp}`;
    const messageHash = crypto.createHash('sha256').update(message).digest();

    const sign = crypto.createSign('RSA-SHA256');
    sign.update(messageHash);
    const signature = sign.sign(serverPrivateKey, 'hex');

    return {
      winner,
      timestamp,
      signature,
    };
  }

  async declareWinner(
    winnerAddress: string,
    declaration: WinnerDeclaration
  ): Promise<string> {
    if (!this.gameStateAddress) {
      throw new Error('Game not deployed');
    }

    try {
      const [escrowVaultPda] = PublicKey.findProgramAddressSync(
        [Buffer.from('escrow_vault'), this.gameStateAddress.toBuffer()],
        this.programId
      );

      const winnerPubkey = new PublicKey(winnerAddress);
      const signatureBytes = Buffer.from(declaration.signature, 'hex');

      const data = Buffer.alloc(1 + 32 + signatureBytes.length + 4);
      data.writeUInt8(2, 0);
      winnerPubkey.toBuffer().copy(data, 1);
      data.writeUInt32LE(signatureBytes.length, 33);
      signatureBytes.copy(data, 37);

      const instruction = {
        keys: [
          { pubkey: this.gameStateAddress, isSigner: false, isWritable: true },
          { pubkey: this.server.publicKey, isSigner: true, isWritable: false },
          { pubkey: escrowVaultPda, isSigner: false, isWritable: true },
          { pubkey: winnerPubkey, isSigner: false, isWritable: true },
          { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        ],
        programId: this.programId,
        data,
      };

      const tx = new Transaction().add(instruction);

      const signature = await sendAndConfirmTransaction(this.connection, tx, [this.server], {
        commitment: 'confirmed',
      });

      console.log(`✅ Winner declared: ${winnerAddress}`);
      console.log(`   Transaction: ${signature}`);

      return signature;
    } catch (error) {
      throw new Error(`Failed to declare winner: ${error}`);
    }
  }

  setGameStateAddress(address: string): void {
    this.gameStateAddress = new PublicKey(address);
  }
}

export class SolanaEscrowContractClient {
  private program: SolanaEscrowProgram;
  private config: EscrowProgramConfig;

  constructor(serverSecretKey: Uint8Array, config: EscrowProgramConfig) {
    this.program = new SolanaEscrowProgram(serverSecretKey, config);
    this.config = config;
  }

  async deployEscrowContract(): Promise<string> {
    return await this.program.deployEscrowGame(this.config);
  }

  async player1Deposit(player1SecretKey: Uint8Array): Promise<string> {
    return await this.program.deposit(player1SecretKey);
  }

  async player2Deposit(player2SecretKey: Uint8Array): Promise<string> {
    return await this.program.deposit(player2SecretKey);
  }

  signWinner(winner: 'player1' | 'player2', serverPrivateKey: string): WinnerDeclaration {
    return this.program.signWinnerDeclaration(winner, serverPrivateKey);
  }

  async payoutToWinner(
    winnerAddress: string,
    declaration: WinnerDeclaration
  ): Promise<string> {
    return await this.program.declareWinner(winnerAddress, declaration);
  }

  useExistingContract(gameStateAddress: string): void {
    this.program.setGameStateAddress(gameStateAddress);
  }
}

export default SolanaEscrowContractClient;
