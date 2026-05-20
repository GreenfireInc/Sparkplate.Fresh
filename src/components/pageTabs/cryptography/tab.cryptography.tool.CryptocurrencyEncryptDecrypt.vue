<template>
  <TooltipProvider :delay-duration="300" :skip-delay-duration="200">
    <div class="cced">
      <header class="cced__header">
        <h2 class="cced__title">Cryptocurrency-aware file encryption</h2>
        <p class="cced__lead">
          Derive wallet material from a <code>%ticker%://%privateKey%</code> URI, then encrypt or
          decrypt files with native SPCK (secp256k1 / Ed25519 / X25519) or armored OpenPGP keys.
        </p>
      </header>

      <Separator class="cced__sep" />

      <div class="cced__layout">
        <!-- Left: keypair / wallet derivation -->
        <section class="cced__surface cced__derive">
          <div class="cced__panel-head">
            <h3 class="cced__panel-title">Derive wallet</h3>
            <p class="cced__panel-desc">
              Paste a private key as <code>%ticker%://%privateKey%</code>. Supported tickers:
              <strong>{{ SUPPORTED_TICKERS.join(', ') }}</strong>.
            </p>
          </div>

          <div class="cced__field">
            <div class="cced__field-label-row">
              <Label for="cced-crypto-uri" class="cced__label">Private key (URI)</Label>
              <TooltipRoot>
                <TooltipTrigger as-child>
                  <button
                    type="button"
                    class="cced__icon-btn"
                    aria-label="Import private key from JSON file"
                    @click="triggerCryptoImport"
                  >
                    <Upload :size="14" :stroke-width="2" />
                  </button>
                </TooltipTrigger>
                <TooltipPortal>
                  <TooltipContent class="cced__tooltip" side="top" :side-offset="6">
                    Import private key from JSON file
                  </TooltipContent>
                </TooltipPortal>
              </TooltipRoot>
              <input
                ref="cryptoImportInput"
                type="file"
                accept="application/json,.json"
                class="cced__hidden-file"
                @change="handleCryptoKeyImport"
              />
            </div>
            <input
              id="cced-crypto-uri"
              v-model="cryptoInput"
              class="cced__control cced__control--input"
              spellcheck="false"
              autocomplete="off"
              placeholder="BTC://…"
            />
          </div>

          <p v-if="cryptoImportStatus" class="cced__import-status">{{ cryptoImportStatus }}</p>
          <p v-if="cryptoTickerSymbol && !cryptoErrorMessage" class="cced__ticker-tag">
            Detected ticker: <strong>{{ cryptoTickerSymbol }}</strong>
            <span v-if="cryptoSpckCurve" class="cced__ticker-curve">
              ({{ cryptoSpckCurve === 'secp256k1' ? 'SPCK v1 / secp256k1' : 'SPCK v2 / X25519' }})
            </span>
          </p>

          <div class="cced__field">
            <Label for="cced-public-key" class="cced__label">Public key</Label>
            <textarea
              id="cced-public-key"
              v-model="cryptoPublicKey"
              readonly
              class="cced__control cced__control--textarea cced__control--readonly"
              placeholder="Derived public key"
            />
          </div>

          <div class="cced__field">
            <Label for="cced-wallet-address" class="cced__label">Wallet address</Label>
            <input
              id="cced-wallet-address"
              v-model="cryptoWalletAddress"
              readonly
              class="cced__control cced__control--input cced__control--readonly"
              placeholder="Derived address"
            />
          </div>

          <p v-if="cryptoErrorMessage" class="cced__error">{{ cryptoErrorMessage }}</p>
        </section>

        <!-- Right column: stacked Encrypt / Decrypt panels -->
        <aside class="cced__side">
          <section class="cced__surface cced__panel-block">
            <div class="cced__panel-head">
              <h3 class="cced__panel-title">Encrypt file</h3>
              <p class="cced__panel-desc">
                SPCK for hex / Ed25519 keys; OpenPGP for armored public keys (writes <code>.gpg</code>).
              </p>
            </div>

            <div class="cced__field">
              <Label for="cced-encrypt-file" class="cced__label">File</Label>
              <input
                id="cced-encrypt-file"
                type="file"
                class="cced__control cced__control--file"
                @change="handleEncryptFileSelect"
              />
              <p v-if="fileToEncrypt" class="cced__file-meta">
                Selected: <strong>{{ fileToEncrypt.name }}</strong>
                <span>({{ formatFileSize(fileToEncrypt.size) }})</span>
              </p>
            </div>

            <div class="cced__field cced__field--grow">
              <Label for="cced-encrypt-pubkey" class="cced__label">Public key</Label>
              <textarea
                id="cced-encrypt-pubkey"
                v-model="encryptionPublicKey"
                class="cced__control cced__control--textarea"
                placeholder="Armored PGP key, hex secp256k1, or Ed25519 public key"
                spellcheck="false"
              />
            </div>

            <div class="cced__btn-row">
              <button
                type="button"
                class="cced__btn cced__btn--outline"
                :disabled="!cryptoPublicKey"
                @click="pullPublicKey"
              >
                Pull public key
              </button>
              <button
                type="button"
                class="cced__btn cced__btn--primary"
                :disabled="!fileToEncrypt || !encryptionPublicKey.trim()"
                @click="encryptFile"
              >
                <Lock :size="14" :stroke-width="2" /> Encrypt
              </button>
            </div>
            <p class="cced__status" :class="{ 'cced__status--error': encryptionStatusError }">
              {{ encryptionStatus }}
            </p>
          </section>

          <section class="cced__surface cced__panel-block">
            <div class="cced__panel-head">
              <h3 class="cced__panel-title">Decrypt file</h3>
              <p class="cced__panel-desc">
                Binary SPCK (cryptocurrency ECIES) or armored OpenPGP (<code>.gpg</code>).
              </p>
            </div>

            <div class="cced__field">
              <Label for="cced-decrypt-file" class="cced__label">File</Label>
              <input
                id="cced-decrypt-file"
                type="file"
                class="cced__control cced__control--file"
                @change="handleDecryptFileSelect"
              />
              <p v-if="fileToDecrypt" class="cced__file-meta">
                Selected: <strong>{{ fileToDecrypt.name }}</strong>
                <span>({{ formatFileSize(fileToDecrypt.size) }})</span>
              </p>
            </div>

            <div class="cced__field cced__field--grow">
              <Label for="cced-decrypt-privkey" class="cced__label">Private key</Label>
              <textarea
                id="cced-decrypt-privkey"
                v-model="privateKey"
                class="cced__control cced__control--textarea"
                placeholder="Matching private key material (armored PGP or ticker-native)"
                spellcheck="false"
              />
            </div>

            <div class="cced__btn-row">
              <button
                type="button"
                class="cced__btn cced__btn--outline"
                :disabled="!cryptoInput.trim()"
                @click="pullPrivateKey"
              >
                Pull private key
              </button>
              <button
                type="button"
                class="cced__btn cced__btn--primary"
                :disabled="!fileToDecrypt || !privateKey.trim()"
                @click="decryptFile"
              >
                <Unlock :size="14" :stroke-width="2" /> Decrypt
              </button>
            </div>
            <p class="cced__status" :class="{ 'cced__status--error': decryptionStatusError }">
              {{ decryptionStatus }}
            </p>
          </section>
        </aside>
      </div>
    </div>
  </TooltipProvider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  Label,
  Separator,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from 'radix-vue'
import { Lock, Unlock, Upload } from 'lucide-vue-next'

import {
  SUPPORTED_TICKERS,
  useCryptocurrencyEngine,
} from '@/lib/cores/bridge/bridge.Cryptography.Via.Currency'
import {
  parsePrivateKeyFile,
  triggerFileInput,
} from '@/lib/cores/importStandard/fileImports.privateKey'
import {
  encryptWithCryptoPublicKey,
  isHexCryptoPublicKey,
} from '@/lib/cores/cryptographyCore/encryption/encryption.crypto.PublicKey.general'
import {
  encryptWithEd25519PublicKey,
  isEd25519PublicKey,
} from '@/lib/cores/cryptographyCore/encryption/encryption.crypto.PublicKey.ed25519'
import {
  buildEncryptedFilename,
  resolveEncryptedExtension,
} from '@/lib/cores/exportStandard/fileExports.Encrypted'
import { encryptBinaryWithArmoredPublicKey } from '@/lib/cores/cryptographyCore/encryption/encryption.openPGP.PublicKey.general'
import { decryptArmoredMessageWithPrivateKey } from '@/lib/cores/cryptographyCore/decryption/decryption.openPGP.PublicKey.general'
import { tryDecryptSpckFile } from '@/lib/cores/cryptographyCore/decryption/decryption.crypto.PublicKey.general'

defineOptions({ name: 'CryptocurrencyEncryptDecryptTool' })

// ── Cryptocurrency derivation (powers Pull public/private key) ─────────────
const cryptoInput = ref('')
const cryptoImportInput = ref<HTMLInputElement | null>(null)
const cryptoImportStatus = ref('')
const {
  ticker: cryptoTickerSymbol,
  publicKey: cryptoPublicKey,
  walletAddress: cryptoWalletAddress,
  errorMessage: cryptoErrorMessage,
  spckCurve: cryptoSpckCurve,
  isSpckCompatible,
} = useCryptocurrencyEngine(cryptoInput)

const triggerCryptoImport = () => {
  triggerFileInput(cryptoImportInput.value)
}

const handleCryptoKeyImport = async (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (!file) return

  const result = await parsePrivateKeyFile(file)
  if (result.ok) {
    cryptoInput.value = result.value.cryptoUri
    cryptoImportStatus.value = `Imported ${result.value.ticker} private key from ${result.value.filename}.`
  } else {
    cryptoImportStatus.value = result.error
  }
  target.value = ''
}

// ── Encrypt panel state ───────────────────────────────────────────────────
const fileToEncrypt = ref<File | null>(null)
const encryptionPublicKey = ref('')
const encryptionStatus = ref('')
const encryptionStatusError = ref(false)

// ── Decrypt panel state ───────────────────────────────────────────────────
const fileToDecrypt = ref<File | null>(null)
const privateKey = ref('')
const decryptionStatus = ref('')
const decryptionStatusError = ref(false)

const handleEncryptFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    fileToEncrypt.value = file
    encryptionStatus.value = ''
    encryptionStatusError.value = false
  }
}

const handleDecryptFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    fileToDecrypt.value = file
    decryptionStatus.value = ''
    decryptionStatusError.value = false
  }
}

const pullPublicKey = () => {
  if (!cryptoPublicKey.value) {
    encryptionStatus.value = 'No public key available to pull yet.'
    encryptionStatusError.value = true
    return
  }

  encryptionPublicKey.value = cryptoPublicKey.value
  encryptionStatusError.value = false

  if (!isSpckCompatible.value && cryptoTickerSymbol.value) {
    encryptionStatus.value = `Pulled ${cryptoTickerSymbol.value} public key. This ticker's key is neither secp256k1 SEC1 hex nor 32-byte Ed25519, so neither SPCK v1 nor v2 applies. Use an armored PGP key for file encryption with this ticker.`
    return
  }

  const curveSuffix = cryptoSpckCurve.value
    ? ` (${cryptoSpckCurve.value === 'secp256k1' ? 'SPCK v1 / secp256k1' : 'SPCK v2 / X25519'})`
    : ''
  encryptionStatus.value = `Pulled ${cryptoTickerSymbol.value || 'crypto'} public key${curveSuffix} into encryption panel.`
}

const pullPrivateKey = () => {
  const raw = cryptoInput.value.trim()
  if (!raw) {
    decryptionStatus.value = 'No private key available to pull yet.'
    decryptionStatusError.value = true
    return
  }

  const match = raw.match(/^([A-Za-z0-9]+):\/\/(.+)$/)
  const extracted = match && match[2] ? match[2].trim() : raw
  privateKey.value = extracted
  decryptionStatusError.value = false
  const tickerLabel = match && match[1] ? match[1].toUpperCase() : 'crypto'
  decryptionStatus.value = `Pulled ${tickerLabel} private key into decryption panel.`
}

const downloadFile = (content: BlobPart, filename: string, contentType: string) => {
  const blob = new Blob([content], { type: contentType })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

const setEncryptStatus = (message: string, isError = false) => {
  encryptionStatus.value = message
  encryptionStatusError.value = isError
}

const setDecryptStatus = (message: string, isError = false) => {
  decryptionStatus.value = message
  decryptionStatusError.value = isError
}

// SPCK v1 (secp256k1) → SPCK v2 (Ed25519/X25519) → OpenPGP armored fallback
const encryptFile = async () => {
  if (!fileToEncrypt.value || !encryptionPublicKey.value) {
    setEncryptStatus('Please select a file and provide a public key.', true)
    return
  }

  const file = fileToEncrypt.value
  const trimmedKey = encryptionPublicKey.value.trim()

  try {
    const fileData = new Uint8Array(await file.arrayBuffer())

    if (isHexCryptoPublicKey(trimmedKey)) {
      const { envelope } = await encryptWithCryptoPublicKey(trimmedKey, fileData)
      const ext = resolveEncryptedExtension(
        trimmedKey,
        cryptoPublicKey.value,
        cryptoTickerSymbol.value,
      )
      downloadFile(envelope, buildEncryptedFilename(file.name, ext), 'application/octet-stream')
      setEncryptStatus(
        ext.ticker
          ? `File encrypted with ${ext.ticker} public key (SPCK v1 / secp256k1 ECIES)!`
          : 'File encrypted with cryptocurrency public key (SPCK v1 / secp256k1 ECIES)!',
      )
      return
    }

    if (isEd25519PublicKey(trimmedKey)) {
      const { envelope } = await encryptWithEd25519PublicKey(trimmedKey, fileData)
      const ext = resolveEncryptedExtension(
        trimmedKey,
        cryptoPublicKey.value,
        cryptoTickerSymbol.value,
      )
      downloadFile(envelope, buildEncryptedFilename(file.name, ext), 'application/octet-stream')
      setEncryptStatus(
        ext.ticker
          ? `File encrypted with ${ext.ticker} public key (SPCK v2 / X25519 ECIES)!`
          : 'File encrypted with Ed25519 public key (SPCK v2 / X25519 ECIES)!',
      )
      return
    }

    // User pasted the wallet-derived key/address for a ticker we can't map to SPCK; steer to armored PGP.
    if (
      cryptoTickerSymbol.value &&
      !isSpckCompatible.value &&
      (trimmedKey === cryptoPublicKey.value.trim() ||
        trimmedKey === cryptoWalletAddress.value.trim())
    ) {
      setEncryptStatus(
        `${cryptoTickerSymbol.value} is not compatible with native SPCK/ECIES (public key is neither secp256k1 SEC1 hex nor 32-byte Ed25519). Use the PGP/GPG Keys tab to derive an armored public key, or pick a ticker on secp256k1 (BTC/ETH/DOGE/…) or Ed25519 (SOL, XTZ tz1).`,
        true,
      )
      return
    }

    // OpenPGP / GPG armored fallback → writes `${name}.gpg`
    const encrypted = await encryptBinaryWithArmoredPublicKey(trimmedKey, fileData)
    downloadFile(encrypted, `${file.name}.gpg`, 'application/octet-stream')
    setEncryptStatus('File encrypted successfully with armored OpenPGP key!')
  } catch (err) {
    setEncryptStatus(`Error: ${(err as Error).message}`, true)
  }
}

// SPCK first (binary magic detection), then OpenPGP armored fallback
const decryptFile = async () => {
  if (!fileToDecrypt.value || !privateKey.value) {
    setDecryptStatus('Please select a file and provide a private key.', true)
    return
  }

  const file = fileToDecrypt.value

  try {
    const fileBytes = new Uint8Array(await file.arrayBuffer())

    const spck = await tryDecryptSpckFile(fileBytes, privateKey.value.trim(), file.name)
    if (spck !== null) {
      if (!spck.success) {
        setDecryptStatus(spck.errorMessage, true)
        return
      }
      downloadFile(spck.plaintext, spck.outputName, 'application/octet-stream')
      setDecryptStatus(spck.statusMessage)
      return
    }

    const { plaintext, suggestedDownloadName } = await decryptArmoredMessageWithPrivateKey(
      privateKey.value,
      fileBytes,
      file.name,
    )
    downloadFile(plaintext, suggestedDownloadName, 'application/octet-stream')
    setDecryptStatus('File decrypted successfully with armored OpenPGP private key!')
  } catch (err) {
    setDecryptStatus(`Error: ${(err as Error).message}`, true)
  }
}

const formatFileSize = (bytes: number): string => {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`
  if (bytes < 1024 * 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`
  return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`
}
</script>

<style scoped>
.cced {
  display: flex;
  flex-direction: column;
  min-height: 0;
  gap: 0.75rem;
}

.cced__header {
  text-align: left;
}

.cced__title {
  margin: 0 0 0.25rem;
  font-size: 1.125rem;
  font-weight: 600;
  color: #111827;
}

.cced__lead {
  margin: 0;
  font-size: 0.8125rem;
  color: #6b7280;
  line-height: 1.5;
}

.cced__lead code,
.cced__panel-desc code {
  padding: 0.05rem 0.3rem;
  font-family: ui-monospace, 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.78rem;
  background: #eef2ff;
  color: #1d4ed8;
  border-radius: 0.25rem;
}

.cced__sep {
  height: 1px;
  background: #e5e7eb;
}

.cced__layout {
  display: grid;
  gap: 0.75rem;
  align-items: stretch;
  grid-template-columns: 1fr;
}

@media (min-width: 900px) {
  .cced__layout {
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
  }
}

.cced__surface {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.85rem 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  box-sizing: border-box;
  min-width: 0;
}

.cced__derive {
  min-height: 0;
}

.cced__side {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  min-width: 0;
}

.cced__panel-block {
  flex: 1 1 auto;
}

.cced__panel-head {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
}

.cced__panel-title {
  margin: 0;
  font-size: 0.95rem;
  font-weight: 600;
  color: #111827;
}

.cced__panel-desc {
  margin: 0;
  font-size: 0.78rem;
  color: #6b7280;
}

.cced__field {
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
}

.cced__field--grow {
  flex: 1 1 auto;
}

.cced__field-label-row {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cced__field-label-row .cced__label {
  flex: 1;
  margin: 0;
}

.cced__label {
  font-size: 0.78rem;
  font-weight: 500;
  color: #374151;
}

.cced__control {
  width: 100%;
  box-sizing: border-box;
  border: 1px solid #d1d5db;
  background: #ffffff;
  color: #111827;
  border-radius: 0.375rem;
  font-size: 0.8125rem;
  font-family: ui-monospace, 'JetBrains Mono', 'Fira Code', monospace;
  transition: border-color 0.15s, box-shadow 0.15s;
}

.cced__control:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.25);
}

.cced__control--input {
  padding: 0.45rem 0.6rem;
}

.cced__control--textarea {
  padding: 0.45rem 0.6rem;
  min-height: 5rem;
  resize: vertical;
  line-height: 1.45;
}

.cced__control--readonly {
  background: #f3f4f6;
  color: #1f2937;
  cursor: text;
}

.cced__control--file {
  padding: 0.35rem 0;
  border: none;
  background: transparent;
  color: #6b7280;
  font-family: inherit;
  font-size: 0.78rem;
}

.cced__control--file::file-selector-button {
  margin-right: 0.6rem;
  padding: 0.35rem 0.7rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background: #ffffff;
  color: #111827;
  font-size: 0.78rem;
  cursor: pointer;
  transition: background 0.12s, border-color 0.12s;
}

.cced__control--file::file-selector-button:hover {
  background: #f3f4f6;
}

.cced__file-meta {
  margin: 0;
  font-size: 0.72rem;
  color: #4b5563;
}

.cced__hidden-file {
  display: none;
}

.cced__icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.75rem;
  height: 1.75rem;
  padding: 0;
  border: 1px solid #d1d5db;
  background: #ffffff;
  color: #4b5563;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background 0.12s, color 0.12s, border-color 0.12s;
}

.cced__icon-btn:hover {
  background: #eef2ff;
  color: #1d4ed8;
  border-color: #c7d2fe;
}

.cced__btn-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.cced__btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.45rem 0.8rem;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  cursor: pointer;
  font-size: 0.8125rem;
  font-weight: 500;
  font-family: inherit;
  transition: background 0.15s, border-color 0.15s, color 0.15s, opacity 0.15s;
}

.cced__btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.cced__btn--primary {
  background: #2563eb;
  color: #ffffff;
  border-color: #2563eb;
}

.cced__btn--primary:hover:not(:disabled) {
  background: #1d4ed8;
  border-color: #1d4ed8;
}

.cced__btn--outline {
  background: #ffffff;
  color: #1f2937;
  border-color: #d1d5db;
}

.cced__btn--outline:hover:not(:disabled) {
  background: #f3f4f6;
  border-color: #9ca3af;
}

.cced__status {
  margin: 0;
  min-height: 1rem;
  font-size: 0.78rem;
  color: #4b5563;
  line-height: 1.4;
}

.cced__status--error {
  color: #b91c1c;
}

.cced__import-status {
  margin: 0;
  font-size: 0.78rem;
  color: #1d4ed8;
}

.cced__ticker-tag {
  margin: 0;
  font-size: 0.78rem;
  color: #1d4ed8;
}

.cced__ticker-curve {
  color: #4338ca;
}

.cced__error {
  margin: 0;
  font-size: 0.78rem;
  color: #b91c1c;
}

.cced__tooltip {
  z-index: 200;
  max-width: 14rem;
  padding: 0.35rem 0.55rem;
  border-radius: 0.375rem;
  border: 1px solid #d1d5db;
  background: #111827;
  color: #f9fafb;
  font-size: 0.72rem;
  line-height: 1.35;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
}
</style>
