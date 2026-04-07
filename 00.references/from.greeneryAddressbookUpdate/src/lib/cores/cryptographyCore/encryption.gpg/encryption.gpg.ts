/**
 * GPG File Encryption Utilities
 * Encrypts files using OpenPGP.js with GPG public keys
 */

/**
 * Encrypts a file using a GPG public key
 * @param file The file to encrypt
 * @param publicKeyArmored The GPG public key in armored format
 * @returns A Promise that resolves to the encrypted file as a Blob
 */
export async function encryptFileWithGpgPublicKey(
  file: File,
  publicKeyArmored: string
): Promise<Blob> {
  try {
    // Dynamically import openpgp to avoid loading it if not needed
    const openpgp = await import('openpgp');
    
    // Read the public key
    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored });
    
    // Read the file content
    const fileContent = await file.arrayBuffer();
    
    // Encrypt the file
    const message = await openpgp.createMessage({ binary: new Uint8Array(fileContent) });
    const encrypted = await openpgp.encrypt({
      message: message,
      encryptionKeys: publicKey,
      format: 'armored' // Use armored format (ASCII text) for compatibility with decryption
    });
    
    // In OpenPGP.js v6+, when format: 'armored' is used, encrypt returns a stream that yields strings
    // Collect all chunks and join them into a single armored string
    const chunks: string[] = [];
    for await (const chunk of encrypted) {
      chunks.push(chunk);
    }
    
    // Combine all chunks into a single armored string
    const armoredString = chunks.join('');
    
    // Return as Blob with text/plain content type (armored format is ASCII text)
    // Using text/plain matches the actual content and ensures proper encoding
    return new Blob([armoredString], { type: 'text/plain' });
  } catch (error) {
    console.error('Error encrypting file:', error);
    throw new Error(`Failed to encrypt file: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

/**
 * Downloads an encrypted file
 * @param encryptedBlob The encrypted file blob
 * @param originalFileName The original file name (to create the .gpg extension)
 */
export function downloadEncryptedFile(encryptedBlob: Blob, originalFileName: string): void {
  const url = URL.createObjectURL(encryptedBlob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `${originalFileName}.gpg`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

/**
 * Encrypts a file and triggers download
 * @param file The file to encrypt
 * @param publicKeyArmored The GPG public key in armored format
 */
export async function encryptAndDownloadFile(
  file: File,
  publicKeyArmored: string
): Promise<void> {
  try {
    const encryptedBlob = await encryptFileWithGpgPublicKey(file, publicKeyArmored);
    downloadEncryptedFile(encryptedBlob, file.name);
  } catch (error) {
    console.error('Error in encryptAndDownloadFile:', error);
    throw error;
  }
}

