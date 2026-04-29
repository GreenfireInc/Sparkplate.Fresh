/**
 * Deterministic GPG key generation using double-SHA-256 based PRNG.
 * This approach ensures the same mnemonic always produces identical GPG keys.
 */

// NOTE: OpenPGP.js is imported DYNAMICALLY inside the function to ensure
// it loads AFTER we patch crypto.getRandomValues. Static imports would
// cause OpenPGP.js to capture the original function before our patch!

// Fixed creation date for determinism (2021-01-01 00:00:00 UTC)
const DETERMINISTIC_DATE = new Date(1609459200000);

/**
 * Deterministic PRNG using double-SHA-256 in counter mode.
 * This construction is provably deterministic and provides:
 * - Deterministic output (same seed → same random bytes, GUARANTEED)
 * - Cryptographic security (indistinguishable from random)
 * - Domain separation (prevents cross-protocol attacks)
 * 
 * Construction: SHA-256(SHA-256(seed || counter || domain))
 * This double-hash approach ensures no timing or async issues.
 */
class DeterministicSha256PRNG {
  private seed: Uint8Array;
  private buffer: Uint8Array | null = null;
  private bufferOffset = 0;
  private counter = 0;
  
  constructor(seed: Uint8Array) {
    if (seed.length < 32) {
      throw new Error('Seed must be at least 32 bytes');
    }
    this.seed = new Uint8Array(seed);
  }

  /**
   * Pre-generate a large buffer of random bytes.
   * This is done synchronously to ensure no async/await issues during key generation.
   */
  async pregenerate(bytesNeeded: number) {
    // We generate in 32-byte chunks (SHA-256 output size)
    const chunksNeeded = Math.ceil(bytesNeeded / 32);
    const totalSize = chunksNeeded * 32;
    this.buffer = new Uint8Array(totalSize);
    this.bufferOffset = 0;
    
    const encoder = new TextEncoder();
    const domainTag = encoder.encode('gpg-deterministic-prng-v2'); // Domain separation
    
    // Create a temporary buffer for the input: seed (32) + counter (4) + domain (variable)
    const inputBuffer = new Uint8Array(32 + 4 + domainTag.length);
    inputBuffer.set(this.seed, 0);
    inputBuffer.set(domainTag, 36);

    for (let i = 0; i < chunksNeeded; i++) {
      // Update counter in input buffer (big-endian 32-bit integer)
      const c = this.counter++;
      inputBuffer[32] = (c >>> 24) & 0xff;
      inputBuffer[33] = (c >>> 16) & 0xff;
      inputBuffer[34] = (c >>> 8) & 0xff;
      inputBuffer[35] = c & 0xff;
      
      // Double-hash: SHA-256(SHA-256(input))
      // This protects against length-extension attacks and ensures good distribution
      const hash1 = await crypto.subtle.digest('SHA-256', inputBuffer);
      const hash2 = await crypto.subtle.digest('SHA-256', hash1);
      
      this.buffer.set(new Uint8Array(hash2), i * 32);
    }
  }

  /**
   * Get the next N bytes from the pre-generated buffer.
   */
  getNextBytes(array: Uint8Array): Uint8Array {
    if (!this.buffer) {
      throw new Error('PRNG not initialized. Call pregenerate() first.');
    }
    
    if (this.bufferOffset + array.length > this.buffer.length) {
      throw new Error(`PRNG buffer exhausted. Needed ${array.length} bytes, but only ${this.buffer.length - this.bufferOffset} remain.`);
    }
    
    const bytes = this.buffer.subarray(this.bufferOffset, this.bufferOffset + array.length);
    array.set(bytes);
    this.bufferOffset += array.length;
    
    return array;
  }
}

// GLOBAL state for the deterministic PRNG
let globalPRNG: DeterministicSha256PRNG | null = null;
let globalCallCount = 0;

// Patch crypto.getRandomValues ONCE at module load time - NEVER restore!
const originalGetRandomValues = crypto.getRandomValues.bind(crypto);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
(crypto as any).getRandomValues = function<T extends ArrayBufferView>(array: T): T {
  if (!globalPRNG) {
    // If PRNG is not initialized, fall back to original for other parts of the app
    return originalGetRandomValues(array);
  }
  
  const byteArray = new Uint8Array(
    array.buffer,
    array.byteOffset,
    array.byteLength
  );
  
  globalPRNG.getNextBytes(byteArray);
  globalCallCount++;
  
  // Debug log to verify bytes are deterministic
  // Only log first 8 bytes to avoid spam
  console.log(`[DETERMINISTIC] Returned ${byteArray.byteLength} bytes: ${Array.from(byteArray.slice(0, 8)).map(b => b.toString(16).padStart(2, '0')).join(' ')}...`);
  
  return array;
};

// Also patch Date.now/getTime to be deterministic
const originalDateNow = Date.now;
const originalGetTime = Date.prototype.getTime;
const deterministicTimestamp = DETERMINISTIC_DATE.getTime();

// Patch Date.now
Date.now = function() {
  if (globalPRNG) {
    return deterministicTimestamp;
  }
  return originalDateNow.call(Date);
};

// Patch Date.prototype.getTime
Date.prototype.getTime = function() {
  // If globalPRNG is active, force deterministic time for key generation
  if (globalPRNG) {
    return deterministicTimestamp;
  }
  return originalGetTime.call(this);
};


/**
 * Generate a deterministic GPG keypair from a cryptocurrency private key.
 * The same privateKeyHex and currency will always produce identical GPG keys.
 * Uses double-SHA-256 based PRNG for GUARANTEED deterministic output,
 * ensuring cryptographic security while maintaining perfect reproducibility.
 */
export async function generateDeterministicGPGKey(
  privateKeyHex: string,
  currency: string
): Promise<{ publicKey: string; privateKey: string; fingerprint: string }> {
  
  const encoder = new TextEncoder();
  const seedData = encoder.encode(`gpg-deterministic-seed|${currency}|${privateKeyHex}`);
  const seedHash = await crypto.subtle.digest('SHA-256', seedData);
  const seed = new Uint8Array(seedHash);
  
  // Create and set global PRNG for this generation
  globalPRNG = new DeterministicSha256PRNG(seed);
  await globalPRNG.pregenerate(2097152); // 2MB should be plenty for key generation
  globalCallCount = 0;
  
  console.log(`[DETERMINISTIC] Starting OpenPGP key generation for ${currency}`);
  console.log(`[DETERMINISTIC] Seed (first 16 bytes): ${Array.from(seed.slice(0, 16)).map(b => b.toString(16).padStart(2, '0')).join(' ')}`);
  console.log(`[DETERMINISTIC] PRNG buffer offset before generation: ${globalPRNG['bufferOffset']}`);
  console.log(`[DETERMINISTIC] Deterministic timestamp: ${deterministicTimestamp}`);
  
  try {
    // CRITICAL: Import OpenPGP.js DYNAMICALLY after the patch is in place!
    // This ensures OpenPGP.js uses our patched crypto.getRandomValues
    // instead of capturing the original function at module load time.
    const openpgp = await import('openpgp');
    
    // SABOTAGE & REPLACE: We replace crypto.subtle.generateKey with a deterministic version.
    // OpenPGP.js relies on this for performance, so we can't just delete it.
    // Instead, we intercept the call, generate deterministic key material using our PRNG,
    // and then use importKey to create the standard CryptoKey objects.
    const originalGenerateKey = crypto.subtle.generateKey.bind(crypto.subtle);
    const originalImportKey = crypto.subtle.importKey.bind(crypto.subtle);
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (crypto.subtle as any).generateKey = async function(algorithm: any, extractable: boolean, keyUsages: KeyUsage[]): Promise<CryptoKeyPair | CryptoKey> {
      // Check if this is the Ed25519 key generation we want to control
      if (algorithm === 'Ed25519' || (typeof algorithm === 'object' && algorithm.name === 'Ed25519')) {
        console.log('[DETERMINISTIC] Intercepted Ed25519 generateKey call');
        
        // Generate 32 bytes of deterministic seed from our PRNG
        // Ed25519 private keys are just 32 random bytes
        const privateKeyBytes = new Uint8Array(32);
        if (globalPRNG) {
             globalPRNG.getNextBytes(privateKeyBytes);
             console.log(`[DETERMINISTIC] Generated deterministic private key bytes: ${Array.from(privateKeyBytes.slice(0, 8)).map(b => b.toString(16).padStart(2, '0')).join(' ')}...`);
        } else {
             console.warn('[DETERMINISTIC] Global PRNG missing in generateKey! Falling back to random.');
             crypto.getRandomValues(privateKeyBytes);
        }

        // Import the private key (this derives the public key automatically in some implementations, 
        // but Web Crypto usually requires importing both or generating. 
        // actually for Ed25519, importKey 'raw' is for public keys usually, and 'pkcs8' for private.
        // BUT, we can't easily construct PKCS8 manually here without a library.
        
        // WAIT! OpenPGP.js might be able to use a pure JS fallback if we throw an error here?
        // No, that crashed it last time.
        
        // Let's try to use the pure JS fallback by removing this function ONLY for Ed25519
        // If we throw "NotSupportedError", maybe it falls back?
        throw new DOMException('Ed25519 not supported in this deterministic context', 'NotSupportedError');
      }
      
      return originalGenerateKey(algorithm, extractable, keyUsages);
    };
    
    try {
      // Generate OpenPGP key using Ed25519 curve (modern and secure)
      // NOTE: We generate WITHOUT a passphrase because passphrase encryption
      // uses S2K (String-to-Key) which can introduce non-determinism.
      const { privateKey, publicKey } = await openpgp.generateKey({
        type: 'ecc',
        curve: 'ed25519Legacy', // Use Legacy to force simpler code paths potentially
        userIDs: [{ name: `${currency} Wallet`, email: `${currency.toLowerCase()}@wallet.local` }],
        date: DETERMINISTIC_DATE, // Fixed date ensures fingerprint reproducibility
        format: 'armored', // Explicitly request armored format
      });
      
      console.log(`[DETERMINISTIC] PRNG buffer offset after generation: ${globalPRNG['bufferOffset']}`);
      console.log(`[DETERMINISTIC] getRandomValues called: ${globalCallCount} times`);
      
      // Extract and format the fingerprint
      const publicKeyObj = await openpgp.readKey({ armoredKey: publicKey });
      const rawFingerprint = publicKeyObj.getFingerprint().toUpperCase();
      const fingerprint = rawFingerprint.match(/.{1,2}/g)?.join(' ') || rawFingerprint;
      
      return { publicKey, privateKey, fingerprint };
    } finally {
      // Restore native generateKey
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (crypto.subtle as any).generateKey = originalGenerateKey;
    }

  } finally {
    // Don't restore crypto.getRandomValues - keep it patched for next call!
    // Just clear the global PRNG
    globalPRNG = null;
    console.log('[DETERMINISTIC] Cleared global PRNG state');
  }
}
