/**
 * GPG File Encryption Utilities
 * Encrypts files using OpenPGP.js with GPG public keys.
 */

export async function encryptFileWithGpgPublicKey(
  file: File,
  publicKeyArmored: string,
): Promise<Blob> {
  try {
    const openpgp = await import('openpgp')

    const publicKey = await openpgp.readKey({ armoredKey: publicKeyArmored })
    const fileContent = await file.arrayBuffer()

    const message = await openpgp.createMessage({ binary: new Uint8Array(fileContent) })
    const encrypted = await openpgp.encrypt({
      message,
      encryptionKeys: publicKey,
      format: 'armored',
    })

    // OpenPGP.js v6+ returns a stream in armored mode; collect chunks into one string.
    const chunks: string[] = []
    for await (const chunk of encrypted as AsyncIterable<string>) {
      chunks.push(chunk)
    }

    return new Blob([chunks.join('')], { type: 'text/plain' })
  } catch (error) {
    console.error('Error encrypting file:', error)
    throw new Error(
      `Failed to encrypt file: ${error instanceof Error ? error.message : 'Unknown error'}`,
    )
  }
}

export function downloadEncryptedFile(encryptedBlob: Blob, originalFileName: string): void {
  const url = URL.createObjectURL(encryptedBlob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${originalFileName}.gpg`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

export async function encryptAndDownloadFile(
  file: File,
  publicKeyArmored: string,
): Promise<void> {
  try {
    const encryptedBlob = await encryptFileWithGpgPublicKey(file, publicKeyArmored)
    downloadEncryptedFile(encryptedBlob, file.name)
  } catch (error) {
    console.error('Error in encryptAndDownloadFile:', error)
    throw error
  }
}
