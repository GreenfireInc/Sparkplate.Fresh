/**
 * Account user service — owns local account persistence + password hashing.
 *
 * Implements §9.2 of `docs/executions/20260610.execution.vuex.to.pinia.store.conversion.md`. This is the
 * V2 equivalent of Greenery's `service/UserService.js`, ported to the project's existing `localStorage`
 * service pattern (`src/services/addressBook/service.addressBook.Contact.ts`) and the already-installed
 * `crypto-js` PBKDF2 hasher (Greenery used `bcryptjs`, which V2 does not ship).
 *
 * SECURITY: this service is the ONLY place the password hash + salt live. Everything it returns is a
 * `PublicUser` (hash/salt stripped), so the Pinia store and UI never hold credential material. Plaintext
 * passwords are never stored. Encrypted seed/secret custody remains a separate Phase 4 concern.
 */
import CryptoJS from 'crypto-js'

/** Full record persisted to localStorage. Never leaves this module. */
export interface StoredUser {
  id: number
  firstName: string
  lastName: string
  email: string
  passwordHash: string
  salt: string
  createdAt: number
  /**
   * The account's BIP-39 recovery phrase, AES-encrypted with a key derived from the user's
   * password (see {@link encryptMnemonic}). Never stored in plaintext, never leaves this module.
   * Optional so legacy accounts created before seed custody remain valid.
   */
  mnemonicCipher?: string
}

/** Credential-free projection — the only shape the store / UI ever see. */
export type PublicUser = Omit<StoredUser, 'passwordHash' | 'salt' | 'mnemonicCipher'>

export interface CreateUserInput {
  firstName: string
  lastName: string
  email: string
  password: string
  /**
   * The recovery phrase generated + verified during registration
   * (`03.registration.mnemonicHDSeedPhrase.vue`). Persisted encrypted at rest.
   */
  mnemonic?: string
}

const STORAGE_KEY = 'sparkplate.accounts.users.v1'
/** PBKDF2 work factor. 256-bit derived key (8 words), SHA-256, 100k iterations. */
const PBKDF2_ITERATIONS = 100_000
const KEY_SIZE_WORDS = 256 / 32

let users: StoredUser[] = load()

function load(): StoredUser[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as StoredUser[]
  } catch {
    return []
  }
}

function save(): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(users))
}

function nextId(): number {
  return users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1
}

function sanitize(user: StoredUser): PublicUser {
  const {
    passwordHash: _passwordHash,
    salt: _salt,
    mnemonicCipher: _mnemonicCipher,
    ...pub
  } = user
  return pub
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase()
}

function hashPassword(password: string, saltHex: string): string {
  return CryptoJS.PBKDF2(password, CryptoJS.enc.Hex.parse(saltHex), {
    keySize: KEY_SIZE_WORDS,
    iterations: PBKDF2_ITERATIONS,
    hasher: CryptoJS.algo.SHA256,
  }).toString(CryptoJS.enc.Hex)
}

/**
 * Derive the AES key used to encrypt the recovery phrase. Domain-separated from {@link hashPassword}
 * (different input prefix) so the at-rest seed key is never equal to the stored verification hash.
 */
function deriveSeedKey(password: string, saltHex: string): string {
  return CryptoJS.PBKDF2(`seed-custody|${password}`, CryptoJS.enc.Hex.parse(saltHex), {
    keySize: KEY_SIZE_WORDS,
    iterations: PBKDF2_ITERATIONS,
    hasher: CryptoJS.algo.SHA256,
  }).toString(CryptoJS.enc.Hex)
}

/** Encrypt a recovery phrase for at-rest storage (key derived from the password — never persisted). */
function encryptMnemonic(mnemonic: string, password: string, saltHex: string): string {
  return CryptoJS.AES.encrypt(mnemonic, deriveSeedKey(password, saltHex)).toString()
}

/** Length-safe comparison to avoid trivially leaking match progress via early-exit timing. */
function constantTimeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let diff = 0
  for (let i = 0; i < a.length; i++) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return diff === 0
}

/** All saved accounts, credential-free. */
export async function listUsers(): Promise<PublicUser[]> {
  return users.map(sanitize)
}

/** Look up a single account by email, credential-free. */
export async function getUserByEmail(email: string): Promise<PublicUser | null> {
  const found = users.find((u) => u.email === normalizeEmail(email))
  return found ? sanitize(found) : null
}

/**
 * Create a new account: enforce a unique email, derive a salted PBKDF2 hash, persist, and return the
 * sanitized profile. Throws on missing fields or duplicate email (mirrors Greenery `UserService.addUser`).
 */
export async function createUser(input: CreateUserInput): Promise<PublicUser> {
  const email = normalizeEmail(input.email)
  if (!email || !input.password) {
    throw new Error('Email and password are required.')
  }
  if (users.some((u) => u.email === email)) {
    throw new Error('An account with that email already exists.')
  }

  const salt = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex)
  const mnemonic = input.mnemonic?.trim()
  const user: StoredUser = {
    id: nextId(),
    firstName: input.firstName.trim(),
    lastName: input.lastName.trim(),
    email,
    salt,
    passwordHash: hashPassword(input.password, salt),
    mnemonicCipher: mnemonic ? encryptMnemonic(mnemonic, input.password, salt) : undefined,
    createdAt: Date.now(),
  }

  users = [...users, user]
  save()
  return sanitize(user)
}

/**
 * Verify credentials. Returns the sanitized profile on success or `null` on unknown email / bad password
 * (mirrors Greenery `UserService.login` + `bcrypt.compareSync`).
 */
export async function verifyLogin(email: string, password: string): Promise<PublicUser | null> {
  const found = users.find((u) => u.email === normalizeEmail(email))
  if (!found) return null
  const candidate = hashPassword(password, found.salt)
  return constantTimeEqual(candidate, found.passwordHash) ? sanitize(found) : null
}

/**
 * Decrypt and return the account's recovery phrase, gated on a correct password (so the secret is
 * only ever recoverable by re-supplying the credential that encrypted it). Returns `null` for an
 * unknown email, a bad password, or an account that has no stored seed (legacy / seedless accounts).
 * The plaintext phrase is returned only to the in-memory session holder (`useAccountsStore`); it is
 * never persisted or surfaced through {@link PublicUser}.
 */
export async function decryptMnemonic(email: string, password: string): Promise<string | null> {
  const found = users.find((u) => u.email === normalizeEmail(email))
  if (!found || !found.mnemonicCipher) return null
  if (!constantTimeEqual(hashPassword(password, found.salt), found.passwordHash)) return null
  try {
    const text = CryptoJS.AES.decrypt(
      found.mnemonicCipher,
      deriveSeedKey(password, found.salt),
    ).toString(CryptoJS.enc.Utf8)
    return text || null
  } catch {
    return null
  }
}

/** Remove an account by id. */
export async function removeUser(id: number): Promise<void> {
  users = users.filter((u) => u.id !== id)
  save()
}
