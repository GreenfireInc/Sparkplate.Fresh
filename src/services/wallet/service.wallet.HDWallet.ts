/**
 * HD wallet session context — Greenery `HDWalletService` equivalent (phrase + precomputed seed).
 *
 * Implements `docs/findings/20260612.findings.hd.seed.buffer.precompute.signup.login.md`.
 * The 64-byte BIP-39 seed buffer is computed once at signup/login and held in memory for the
 * session only — never persisted. Downstream derivation (`cryptoGenerator`, future IPC) should
 * call `getSeed()` rather than re-running `mnemonicToSeed` on every wallet click.
 */
import * as bip39 from 'bip39'

/** In-memory session holder for the account HD seed (Greenery `accounts.hdWallet`). */
export interface HDWalletContext {
  readonly phrase: string
  readonly email: string
  getSeed(): Buffer
  getPhrase(): string
}

/**
 * Build session HD context from a verified BIP-39 phrase. Runs PBKDF2 (`mnemonicToSeed`) exactly once.
 * @throws when the phrase fails BIP-39 validation
 */
export async function createHDWalletContext(
  phrase: string,
  email: string,
): Promise<HDWalletContext> {
  const normalized = phrase.trim().replace(/\s+/g, ' ')
  if (!bip39.validateMnemonic(normalized)) {
    throw new Error('Invalid BIP-39 recovery phrase.')
  }
  const seed = await bip39.mnemonicToSeed(normalized)
  return {
    phrase: normalized,
    email,
    getSeed: () => seed,
    getPhrase: () => normalized,
  }
}
