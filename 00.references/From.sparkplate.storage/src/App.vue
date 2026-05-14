<script setup lang="ts">
import { ref } from 'vue';
// OpenPGP: `readKey` / `readPrivateKey` on PGP tab for validate & derive keypair. File **encrypt**: `encryption.openPGP.PublicKey.general`; armored **decrypt**: `decryption.openPGP.PublicKey.general`.
import * as openpgp from 'openpgp';
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRoot,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Label,
  Separator,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsRoot,
  TabsTrigger,
  TooltipContent,
  TooltipPortal,
  TooltipProvider,
  TooltipRoot,
  TooltipTrigger,
} from 'radix-vue';
import { ChevronDown, Upload } from 'lucide-vue-next';
import {
  SUPPORTED_TICKERS,
  useCryptocurrencyEngine,
} from './lib/cores/bridge/bridge.Cryptography.Via.Currency';
// JSON wallet / key export files → parsed into `TICKER://…` URIs for `useCryptocurrencyEngine`.
import {
  parsePrivateKeyFile,
  triggerFileInput,
} from './lib/cores/importStandard/fileImports.privateKey';
// SPCK v1 (secp256k1): envelope encrypt (`encryptWithCryptoPublicKey`, `isHexCryptoPublicKey`); **decrypt** in `decryption.crypto.PublicKey.general`.
import {
  CRYPTO_PUBKEY_FILE_EXTENSION,
  encryptWithCryptoPublicKey,
  isHexCryptoPublicKey,
} from './lib/cores/cryptographyCore/encryption.crypto.PublicKey.general';
// SPCK v2 (Ed25519 / X25519): encrypt when `isEd25519PublicKey`; **decrypt** in `decryption.crypto.PublicKey.general`.
import {
  encryptWithEd25519PublicKey,
  isEd25519PublicKey,
} from './lib/cores/cryptographyCore/encryption.crypto.PublicKey.ed25519';
/** `.spck` filename + optional `.{TICKER}` segment before extension (see `buildEncryptedFilename`). */
import {
  buildEncryptedFilename,
  resolveEncryptedExtension,
} from './lib/cores/exportStandard/fileExports.Encrypted';
import { encryptBinaryWithArmoredPublicKey } from './lib/cores/cryptographyCore/encryption.openPGP.PublicKey.general';
import { decryptArmoredMessageWithPrivateKey } from './lib/cores/cryptographyCore/decryption.openPGP.PublicKey.general';
import { tryDecryptSpckFile } from './lib/cores/cryptographyCore/decryption.crypto.PublicKey.general';

const activeTab = ref<'pgp' | 'crypto'>('pgp');

/** Armored OpenPGP public (and paired private) key material on the PGP / GPG tab; `publicKey` is what **Pull public key** prefers when that tab is active for GPG file encryption. */
const publicKey = ref('');
/**
 * Shared across PGP tab, Decrypt panel, and `generatePublicKey` / `validateKeys`.
 * **GPG decrypt:** armored `BEGIN PGP PRIVATE KEY` block (same field as PGP tab). **SPCK decrypt:** native private-key
 * material (often filled via **Pull private key** from the crypto URI field, not armored OpenPGP).
 */
const privateKey = ref('');
const validationMessage = ref('');
const keyFingerprint = ref('');
const rawFingerprint = ref('');
/** Plain file chosen in the Encrypt panel; encrypted bytes are written via `downloadFile`. */
const fileToEncrypt = ref<File | null>(null);
/** Ciphertext in **Decrypt**: binary SPCK (starts with `SPCK` magic) or armored OpenPGP / `*.gpg`. */
const fileToDecrypt = ref<File | null>(null);
/** Feedback for Encrypt panel: pull-public-key hints, SPCK/OpenPGP outcomes, or errors. */
const encryptionStatus = ref('');
/** Feedback for Decrypt panel: SPCK vs OpenPGP success, or parser / crypto errors. */
const decryptionStatus = ref('');
/**
 * Recipient key pasted or pulled into the Encrypt panel. **GPG/PGP path:** armored `BEGIN PGP PUBLIC KEY` block
 * (after SPCK shape checks fail). **Crypto path:** hex secp256k1 or Ed25519 for `.spck` (see `encryptFile`).
 */
const encryptionPublicKey = ref('');

const cryptoInput = ref('');
/** Hidden `<input type="file">`; opened programmatically by the upload icon next to the URI field. */
const cryptoImportInput = ref<HTMLInputElement | null>(null);
/** User-facing result of the last JSON import attempt (success message or parser error). */
const cryptoImportStatus = ref('');
const {
  ticker: cryptoTickerSymbol,
  publicKey: cryptoPublicKey,
  walletAddress: cryptoWalletAddress,
  errorMessage: cryptoErrorMessage,
  spckCurve: cryptoSpckCurve,
  isSpckCompatible,
} = useCryptocurrencyEngine(cryptoInput);
// Engine drives Crypto tab; **Pull private key** copies URI-derived secret into `privateKey` for SPCK **decrypt**.

/** Opens the OS file picker for a JSON private-key file (same flow as clicking the hidden file input). */
const triggerCryptoImport = () => {
  triggerFileInput(cryptoImportInput.value);
};

/**
 * Reads chosen JSON, extracts ticker + native key material, and fills `cryptoInput` with the
 * canonical `TICKER://…` URI. Clears the input value afterwards so picking the same file again re-fires change.
 */
const handleCryptoKeyImport = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (!file) return;

  const result = await parsePrivateKeyFile(file);
  if (result.ok) {
    cryptoInput.value = result.value.cryptoUri;
    cryptoImportStatus.value = `Imported ${result.value.ticker} private key from ${result.value.filename}.`;
  } else {
    cryptoImportStatus.value = result.error;
  }

  target.value = '';
};

/**
 * Copies the best-available public key into `encryptionPublicKey` for the Encrypt panel.
 * Prefers the **current tab** (Crypto → `cryptoPublicKey`, PGP → armored **`publicKey`**), then the other tab.
 * For **GPG file encryption**, use the PGP tab (or pull when `activeTab === 'pgp'`) so the armored block lands in the Encrypt textarea.
 * Warns when the derived crypto key is not SPCK-capable (use PGP with an armored key instead).
 */
const pullPublicKey = () => {
  const fromActiveTab =
    activeTab.value === 'crypto' ? cryptoPublicKey.value : publicKey.value;
  const fromOtherTab =
    activeTab.value === 'crypto' ? publicKey.value : cryptoPublicKey.value;
  const source = fromActiveTab || fromOtherTab;

  if (!source) {
    encryptionStatus.value = 'No public key available to pull yet.';
    return;
  }

  encryptionPublicKey.value = source;
  if (
    source === cryptoPublicKey.value &&
    cryptoPublicKey.value &&
    !isSpckCompatible.value &&
    cryptoTickerSymbol.value
  ) {
    encryptionStatus.value =
      `Pulled ${cryptoTickerSymbol.value} public key. This ticker's key is neither secp256k1 SEC1 hex nor 32-byte Ed25519 (hex/Base58), so neither SPCK v1 nor v2 applies. Use PGP for file encryption with this key.`;
    return;
  }
  const label = source === cryptoPublicKey.value ? `${cryptoTickerSymbol.value || 'crypto'} public key` : 'PGP public key';
  const curveSuffix =
    source === cryptoPublicKey.value && cryptoSpckCurve.value
      ? ` (${cryptoSpckCurve.value === 'secp256k1' ? 'SPCK v1 / secp256k1' : 'SPCK v2 / X25519'})`
      : '';
  encryptionStatus.value = `Pulled ${label}${curveSuffix} into encryption panel.`;
};

/**
 * Copies URI-derived private key material from the Crypto tab into `privateKey` for **Decrypt** (SPCK path).
 * Does not produce armored OpenPGP; use the PGP tab private key field for `.gpg` decryption.
 */
const pullPrivateKey = () => {
  const raw = cryptoInput.value.trim();
  if (!raw) {
    decryptionStatus.value = 'No private key available to pull yet.';
    return;
  }

  const match = raw.match(/^([A-Za-z0-9]+):\/\/(.+)$/);
  const extracted = match && match[2] ? match[2].trim() : raw;
  privateKey.value = extracted;
  const tickerLabel = match && match[1] ? match[1].toUpperCase() : 'crypto';
  decryptionStatus.value = `Pulled ${tickerLabel} private key into decryption panel.`;
};

/** Strips wrapping quotes; used before `openpgp.readKey` / `readPrivateKey` so pasted armored PGP material parses reliably. */
const cleanArmoredKey = (key: string) => {
  return key.trim().replace(/^"|"$/g, '');
};

const formatFingerprint = (fingerprint: string) => {
  return fingerprint.toUpperCase().replace(/(.{2})(?!$)/g, '$1 ');
};

const downloadFile = (content: BlobPart, filename: string, contentType: string) => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
};

const exportKeyData = (format: 'txt' | 'csv' | 'json' | 'vcf') => {
  if (!publicKey.value || !rawFingerprint.value) {
    validationMessage.value = "No key to export.";
    return;
  }

  const filename = `pgp-key-${rawFingerprint.value.substring(0, 8)}`;
  let content = '';

  switch (format) {
    case 'txt':
      content = `Public Key:\n${publicKey.value}\n\nFingerprint: ${keyFingerprint.value.replace('Fingerprint: ','')}`;
      downloadFile(content, `${filename}.txt`, 'text/plain');
      break;
    case 'csv':
      content = `"publicKey","fingerprint"\n"${publicKey.value}","${rawFingerprint.value}"`;
      downloadFile(content, `${filename}.csv`, 'text/csv');
      break;
    case 'json':
      content = JSON.stringify({
        publicKey: publicKey.value,
        fingerprint: rawFingerprint.value
      }, null, 2);
      downloadFile(content, `${filename}.json`, 'application/json');
      break;
    case 'vcf':
      content = [
        'BEGIN:VCARD',
        'VERSION:3.0',
        'FN:PGP Key Export',
        `NOTE:Fingerprint: ${keyFingerprint.value.replace('Fingerprint: ','')}`,
        `KEY;TYPE=PGP:${publicKey.value}`,
        'END:VCARD'
      ].join('\n');
      downloadFile(content, `${filename}.vcf`, 'text/vcard');
      break;
  }
};

const generatePublicKey = async () => {
  if (!privateKey.value) {
    publicKey.value = '';
    keyFingerprint.value = '';
    rawFingerprint.value = '';
    return;
  }

  try {
    const armoredKey = cleanArmoredKey(privateKey.value);
    const privateKeyObj = await openpgp.readPrivateKey({ armoredKey });
    if (privateKeyObj.isPrivate()) {
      const publicKeyObj = privateKeyObj.toPublic();
      publicKey.value = publicKeyObj.armor();
      const fingerprint = await publicKeyObj.getFingerprint();
      rawFingerprint.value = fingerprint;
      keyFingerprint.value = `Fingerprint: ${formatFingerprint(fingerprint)}`;
    } else {
      publicKey.value = '';
      keyFingerprint.value = '';
      rawFingerprint.value = '';
    }
  } catch (error) {
    publicKey.value = '';
    keyFingerprint.value = '';
    rawFingerprint.value = '';
  }
};

const validateKeys = async () => {
  validationMessage.value = '';
  keyFingerprint.value = '';
  rawFingerprint.value = '';
  try {
    const cleanPublicKey = cleanArmoredKey(publicKey.value);
    const cleanPrivateKey = cleanArmoredKey(privateKey.value);
    const publicKeyObj = await openpgp.readKey({ armoredKey: cleanPublicKey });
    const privateKeyObj = await openpgp.readPrivateKey({ armoredKey: cleanPrivateKey });

    if (publicKeyObj && privateKeyObj) {
      validationMessage.value = 'Keys are valid!';
      const fingerprint = await publicKeyObj.getFingerprint();
      rawFingerprint.value = fingerprint;
      keyFingerprint.value = `Fingerprint: ${formatFingerprint(fingerprint)}`;
    } else {
      validationMessage.value = 'Invalid keys.';
    }
  } catch (error) {
    validationMessage.value = `Error: ${(error as Error).message}`;
  }
};

/** Stores the plaintext file picked from the Encrypt panel before **Encrypt** runs. */
const handleEncryptFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    fileToEncrypt.value = file;
  }
};

/**
 * Encrypts `fileToEncrypt` using `encryptionPublicKey`.
 *
 * **Cryptocurrency / SPCK:** secp256k1 SEC1 hex → `encryptWithCryptoPublicKey` (`.spck` naming via
 * `buildEncryptedFilename` / `resolveEncryptedExtension`); Ed25519-shaped key → `encryptWithEd25519PublicKey` (SPCK v2).
 * **OpenPGP / GPG:** if the string is not SPCK-eligible, see `encryptBinaryWithArmoredPublicKey` in
 * `encryption.openPGP.PublicKey.general.ts` → download `${originalName}.gpg`.
 */
const encryptFile = async () => {
  if (!fileToEncrypt.value || !encryptionPublicKey.value) {
    encryptionStatus.value = 'Please select a file and provide a public key.';
    return;
  }

  const file = fileToEncrypt.value;
  const trimmedKey = encryptionPublicKey.value.trim();

  try {
    const fileData = new Uint8Array(await file.arrayBuffer());

    // SPCK v1: uncompressed SEC1 hex public key (BTC, ETH, DOGE, …).
    if (isHexCryptoPublicKey(trimmedKey)) {
      const { envelope } = await encryptWithCryptoPublicKey(trimmedKey, fileData);
      const extensionResolution = resolveEncryptedExtension(
        trimmedKey,
        cryptoPublicKey.value,
        cryptoTickerSymbol.value,
      );
      downloadFile(
        envelope,
        buildEncryptedFilename(file.name, extensionResolution),
        'application/octet-stream',
      );
      encryptionStatus.value = extensionResolution.ticker
        ? `File encrypted with ${extensionResolution.ticker} public key (SPCK v1 / secp256k1 ECIES)!`
        : 'File encrypted with cryptocurrency public key (SPCK v1 / secp256k1 ECIES)!';
      return;
    }

    // SPCK v2: 32-byte Ed25519 public key material (e.g. SOL); X25519 ECDH inside envelope.
    if (isEd25519PublicKey(trimmedKey)) {
      const { envelope } = await encryptWithEd25519PublicKey(trimmedKey, fileData);
      const extensionResolution = resolveEncryptedExtension(
        trimmedKey,
        cryptoPublicKey.value,
        cryptoTickerSymbol.value,
      );
      downloadFile(
        envelope,
        buildEncryptedFilename(file.name, extensionResolution),
        'application/octet-stream',
      );
      encryptionStatus.value = extensionResolution.ticker
        ? `File encrypted with ${extensionResolution.ticker} public key (SPCK v2 / X25519 ECIES)!`
        : 'File encrypted with Ed25519 public key (SPCK v2 / X25519 ECIES)!';
      return;
    }

    // User pasted the wallet-derived key/address for a ticker we cannot map to SPCK; steer to armored PGP instead of OpenPGP.parse failing.
    if (
      cryptoTickerSymbol.value &&
      !isSpckCompatible.value &&
      (trimmedKey === cryptoPublicKey.value.trim() ||
        trimmedKey === cryptoWalletAddress.value.trim())
    ) {
      encryptionStatus.value =
        `${cryptoTickerSymbol.value} is not compatible with native SPCK/ECIES in this app (public key is neither secp256k1 SEC1 hex nor 32-byte Ed25519). OpenPGP would attempt to parse this as armored text and fail with "Misformed armored text". Use PGP with an armored key, or pick a ticker on secp256k1 (BTC/ETH/DOGE/…) or Ed25519 (SOL, XTZ tz1).`;
      return;
    }

    // --- GPG / PGP file encryption (armored `.gpg` via `encryption.openPGP.PublicKey.general`) ---
    const encrypted = await encryptBinaryWithArmoredPublicKey(trimmedKey, fileData);

    // Distinct from binary `.spck` envelopes above.
    downloadFile(encrypted, `${file.name}.gpg`, 'application/octet-stream');
    encryptionStatus.value = 'File encrypted successfully!';
  } catch (error) {
    encryptionStatus.value = `Error: ${(error as Error).message}`;
  }
};

/** Stores ciphertext for **Decrypt**; `decryptFile` tries `tryDecryptSpckFile` first, then OpenPGP. */
const handleDecryptFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    fileToDecrypt.value = file;
  }
};

/**
 * Decrypts `fileToDecrypt` using `privateKey`.
 *
 * **Cryptocurrency / SPCK (binary):** `tryDecryptSpckFile` (`decryption.crypto.PublicKey.general`) — v2 X25519 vs v1 secp256k1,
 * output name from `stripSpckSuffix` inside that module.
 * **OpenPGP / GPG:** if not SPCK (`null`) → `decryptArmoredMessageWithPrivateKey` (`decryption.openPGP.PublicKey.general`).
 */
const decryptFile = async () => {
  if (!fileToDecrypt.value || !privateKey.value) {
    decryptionStatus.value = 'Please select a file and provide a private key.';
    return;
  }

  const file = fileToDecrypt.value;

  try {
    const fileBytes = new Uint8Array(await file.arrayBuffer());

    const spck = await tryDecryptSpckFile(fileBytes, privateKey.value.trim(), file.name);
    if (spck !== null) {
      if (!spck.success) {
        decryptionStatus.value = spck.errorMessage;
        return;
      }
      downloadFile(spck.plaintext, spck.outputName, 'application/octet-stream');
      decryptionStatus.value = spck.statusMessage;
      return;
    }

    // --- OpenPGP (not SPCK) — see `decryption.openPGP.PublicKey.general` ---
    const { plaintext, suggestedDownloadName } = await decryptArmoredMessageWithPrivateKey(
      privateKey.value,
      fileBytes,
      file.name,
    );
    downloadFile(plaintext, suggestedDownloadName, 'application/octet-stream');
    decryptionStatus.value = 'File decrypted successfully!';
  } catch (error) {
    decryptionStatus.value = `Error: ${(error as Error).message}`;
  }
};

</script>

<template>
  <TooltipProvider :delay-duration="300" :skip-delay-duration="200">
    <div class="app-root">
      <header class="app-header">
        <h1 class="app-title">PGP/GPG Key Tool</h1>
        <p class="app-lead">
          Validate OpenPGP keypairs, derive cryptocurrency material, encrypt or decrypt files.
        </p>
      </header>

      <div class="main-layout">
        <section class="surface validation-card">
          <TabsRoot v-model="activeTab" default-value="pgp" class="tabs-root">
            <TabsList class="tabs-list" aria-label="Key validation modes">
              <TabsTrigger value="pgp" class="tabs-trigger">PGP / GPG</TabsTrigger>
              <TabsTrigger value="crypto" class="tabs-trigger">Cryptocurrency</TabsTrigger>
              <TabsIndicator class="tabs-indicator">
                <div class="tabs-indicator-bar" />
              </TabsIndicator>
            </TabsList>

            <TabsContent value="pgp" class="tabs-content">
              <div class="panel-head">
                <h2 class="panel-title">Validate keypair</h2>
                <p class="panel-description">
                  Paste armored keys. The private key field can derive the public key and fingerprint.
                </p>
              </div>
              <Separator decorative class="section-separator" />

              <div class="field-group">
                <Label for="pgp-public-key" class="field-label">Public key</Label>
                <!-- Armored pubkey for validation/export; same value can be sent to Encrypt via **Pull public key** when this tab is active. -->
                <textarea
                  id="pgp-public-key"
                  v-model="publicKey"
                  class="control control-textarea"
                  placeholder="-----BEGIN PGP PUBLIC KEY BLOCK-----"
                  spellcheck="false"
                />
              </div>
              <div class="field-group">
                <Label for="pgp-private-key" class="field-label">Private key</Label>
                <!-- Used with `openpgp.readPrivateKey` for validation and to derive `publicKey` / fingerprint for export. Same `privateKey` ref powers **Decrypt** for `.gpg` when pasted here or bound from the Decrypt panel. -->
                <textarea
                  id="pgp-private-key"
                  v-model="privateKey"
                  class="control control-textarea"
                  placeholder="-----BEGIN PGP PRIVATE KEY BLOCK-----"
                  spellcheck="false"
                  @input="generatePublicKey"
                />
              </div>

              <p class="fingerprint">{{ keyFingerprint }}</p>

              <div class="button-group">
                <button type="button" class="button button-primary" @click="validateKeys">
                  Validate
                </button>
                <DropdownMenuRoot>
                  <DropdownMenuTrigger class="button button-outline menu-trigger" :disabled="!rawFingerprint">
                    Export
                    <ChevronDown class="menu-trigger-chevron" :size="16" :stroke-width="2" aria-hidden="true" />
                  </DropdownMenuTrigger>
                  <DropdownMenuPortal>
                    <DropdownMenuContent class="dropdown-content" :side-offset="6" align="start">
                      <DropdownMenuLabel class="dropdown-label">Export format</DropdownMenuLabel>
                      <DropdownMenuSeparator class="dropdown-separator" />
                      <DropdownMenuItem class="dropdown-item" @click="exportKeyData('txt')">
                        Plain text (.txt)
                      </DropdownMenuItem>
                      <DropdownMenuItem class="dropdown-item" @click="exportKeyData('csv')">
                        CSV
                      </DropdownMenuItem>
                      <DropdownMenuItem class="dropdown-item" @click="exportKeyData('json')">
                        JSON
                      </DropdownMenuItem>
                      <DropdownMenuItem class="dropdown-item" @click="exportKeyData('vcf')">
                        vCard (.vcf)
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenuPortal>
                </DropdownMenuRoot>
              </div>
              <p class="status-line">{{ validationMessage }}</p>
            </TabsContent>

            <TabsContent value="crypto" class="tabs-content">
              <div class="panel-head">
                <h2 class="panel-title">Derive wallet</h2>
                <p class="hint">
                  Paste a private key as
                  <code>%ticker%://%privateKey%</code>
                  . Supported:
                  {{ SUPPORTED_TICKERS.join(', ') }}
                  (native formats per ticker).
                </p>
              </div>
              <Separator decorative class="section-separator" />

              <div class="field-group">
                <div class="field-label-row">
                  <Label for="crypto-input" class="field-label field-label-centered">
                    Private key (URI)
                  </Label>
                  <!-- Browse for JSON: `parsePrivateKeyFile` fills the URI field via `handleCryptoKeyImport`. -->
                  <TooltipRoot>
                    <TooltipTrigger as-child>
                      <button
                        type="button"
                        class="icon-button"
                        aria-label="Import private key from JSON file"
                        @click="triggerCryptoImport"
                      >
                        <Upload :size="16" :stroke-width="2" />
                      </button>
                    </TooltipTrigger>
                    <TooltipPortal>
                      <TooltipContent class="tooltip-content" side="top" :side-offset="6">
                        Import private key from JSON file
                      </TooltipContent>
                    </TooltipPortal>
                  </TooltipRoot>
                  <input
                    ref="cryptoImportInput"
                    type="file"
                    accept="application/json,.json"
                    class="hidden-file-input"
                    @change="handleCryptoKeyImport"
                  />
                </div>
                <input
                  id="crypto-input"
                  v-model="cryptoInput"
                  class="control control-input"
                  spellcheck="false"
                  autocomplete="off"
                  placeholder="BTC://…"
                />
              </div>
              <!-- Shown only after a JSON import succeeds or fails (see `cryptoImportStatus`). -->
              <p v-if="cryptoImportStatus" class="import-status">{{ cryptoImportStatus }}</p>
              <p v-if="cryptoTickerSymbol && !cryptoErrorMessage" class="ticker-tag">
                Detected ticker:
                <strong>{{ cryptoTickerSymbol }}</strong>
              </p>

              <div class="field-group">
                <Label for="crypto-public-key" class="field-label">Public key</Label>
                <textarea
                  id="crypto-public-key"
                  v-model="cryptoPublicKey"
                  readonly
                  class="control control-textarea control-readonly"
                  placeholder="Derived public key"
                />
              </div>

              <div class="field-group">
                <Label for="crypto-address" class="field-label">Wallet address</Label>
                <input
                  id="crypto-address"
                  v-model="cryptoWalletAddress"
                  readonly
                  class="control control-input control-readonly"
                  placeholder="Derived address"
                />
              </div>

              <p v-if="cryptoErrorMessage" class="error-message">{{ cryptoErrorMessage }}</p>
            </TabsContent>
          </TabsRoot>
        </section>

        <aside class="side-panel">
          <section class="surface panel-block">
            <div class="panel-head">
              <h2 class="panel-title">Encrypt file</h2>
              <p class="panel-description">
                SPCK for hex / Ed25519 keys; OpenPGP for armored public keys.
              </p>
            </div>
            <Separator decorative class="section-separator" />

            <!-- Plaintext input: encrypted as `.gpg` (OpenPGP) or `.spck` (native crypto), depending on recipient key shape in the field below. -->
            <div class="field-group">
              <Label for="encrypt-file-input" class="field-label">File</Label>
              <input
                id="encrypt-file-input"
                class="control control-file"
                type="file"
                @change="handleEncryptFileSelect"
              />
            </div>
            <div class="field-group">
              <Label for="encrypt-public-key" class="field-label">Public key</Label>
              <!--
                GPG/PGP: armored public key block → `encryptFile` uses `openpgp.encrypt` and downloads `*.gpg`.
                Crypto: hex SEC1 / Ed25519 (SPCK) or pull from Cryptocurrency tab via **Pull public key**.
              -->
              <textarea
                id="encrypt-public-key"
                v-model="encryptionPublicKey"
                class="control control-textarea"
                placeholder="Armored PGP key, hex secp256k1, or Ed25519 public key"
                spellcheck="false"
              />
            </div>
            <div class="button-group">
              <!-- With PGP tab focused: copies armored `publicKey`. With Crypto tab focused: copies `cryptoPublicKey` (SPCK if compatible). -->
              <button
                type="button"
                class="button button-outline"
                :disabled="!publicKey && !cryptoPublicKey"
                @click="pullPublicKey"
              >
                Pull public key
              </button>
              <!-- Runs SPCK branches first; remaining armored material is encrypted with OpenPGP (`*.gpg`). -->
              <button type="button" class="button button-primary" @click="encryptFile">Encrypt</button>
            </div>
            <p class="status-line">{{ encryptionStatus }}</p>
          </section>

          <section class="surface panel-block">
            <div class="panel-head">
              <h2 class="panel-title">Decrypt file</h2>
              <p class="panel-description">
                Binary SPCK (cryptocurrency ECIES) or armored OpenPGP / `.gpg`.
              </p>
            </div>
            <Separator decorative class="section-separator" />

            <!-- Ciphertext: SPCK binary from crypto encrypt, or armored PGP message. -->
            <div class="field-group">
              <Label for="decrypt-file-input" class="field-label">File</Label>
              <input
                id="decrypt-file-input"
                class="control control-file"
                type="file"
                @change="handleDecryptFileSelect"
              />
            </div>
            <div class="field-group">
              <Label for="decrypt-private-key" class="field-label">Private key</Label>
              <!--
                **SPCK decrypt:** ticker-native secret in `privateKey` (paste or **Pull private key** from `BTC://…` URI).
                **OpenPGP decrypt:** armored private key (often same field as PGP tab).
              -->
              <textarea
                id="decrypt-private-key"
                v-model="privateKey"
                class="control control-textarea"
                placeholder="Matching private key material"
                spellcheck="false"
              />
            </div>
            <div class="button-group">
              <!-- Copies crypto URI payload into `privateKey` for **SPCK** decrypt (`tryDecryptSpckFile`). -->
              <button
                type="button"
                class="button button-outline"
                :disabled="!cryptoInput"
                @click="pullPrivateKey"
              >
                Pull private key
              </button>
              <!-- If file has `SPCK` magic: `tryDecryptSpckFile` in `decryption.crypto.PublicKey.general`; else OpenPGP helper. -->
              <button type="button" class="button button-primary" @click="decryptFile">Decrypt</button>
            </div>
            <p class="status-line">{{ decryptionStatus }}</p>
          </section>
        </aside>
      </div>
    </div>
  </TooltipProvider>
</template>

<style scoped>
/* Radix-style design tokens (shadcn-like HSL triplets) */
.app-root {
  --background: 240 6% 6%;
  --foreground: 0 0% 96%;
  --card: 240 5% 9%;
  --muted: 240 4% 18%;
  --muted-foreground: 240 4% 58%;
  --border: 240 4% 16%;
  --input: 240 4% 16%;
  --ring: 154 60% 45%;
  --accent: 154 55% 12%;
  --accent-foreground: 154 65% 88%;
  --primary: 154 55% 42%;
  --primary-foreground: 0 0% 98%;
  --destructive: 0 72% 55%;
  --popover: 240 5% 10%;
  --radius: 0.5rem;

  box-sizing: border-box;
  flex: 1 1 0;
  min-height: 0;
  width: 100%;
  max-width: none;
  margin: 0;
  padding: clamp(0.4rem, 1.2vh, 0.85rem) clamp(0.6rem, 1.5vw, 1rem);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  font-family:
    ui-sans-serif,
    system-ui,
    -apple-system,
    'Segoe UI',
    Roboto,
    'Helvetica Neue',
    Arial,
    sans-serif;
  font-size: clamp(0.82rem, 0.9vw + 0.78rem, 0.9375rem);
  line-height: 1.45;
  color: hsl(var(--foreground));
  background-color: hsl(var(--background));
  -webkit-font-smoothing: antialiased;
  text-align: start;
}

.app-header {
  flex-shrink: 0;
  text-align: center;
  margin-bottom: clamp(0.35rem, 1vh, 0.65rem);
}

.app-title {
  margin: 0 0 0.2rem;
  font-size: clamp(1.15rem, 1.5vw + 0.9rem, 1.65rem);
  font-weight: 600;
  letter-spacing: -0.02em;
  color: hsl(var(--foreground));
}

.app-lead {
  margin: 0 auto;
  max-width: 42rem;
  font-size: clamp(0.75rem, 0.35vw + 0.72rem, 0.9rem);
  color: hsl(var(--muted-foreground));
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.main-layout {
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  gap: clamp(0.65rem, 1.2vw, 1rem);
  align-items: stretch;
  overflow: hidden;
}

.validation-card {
  flex: 2 1 0;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.side-panel {
  flex: 1 1 0;
  min-width: 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  gap: clamp(0.45rem, 1vh, 0.75rem);
  overflow: hidden;
}

.surface {
  background-color: hsl(var(--card));
  border: 1px solid hsl(var(--border));
  border-radius: var(--radius);
  padding: clamp(0.65rem, 1.4vh, 1.1rem) clamp(0.75rem, 1.2vw, 1.2rem);
  box-shadow:
    0 1px 2px hsl(0 0% 0% / 0.25),
    0 12px 28px hsl(0 0% 0% / 0.28);
  box-sizing: border-box;
  min-height: 0;
}

.panel-block {
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.panel-block > .panel-head,
.panel-block > .section-separator {
  flex-shrink: 0;
}

.panel-block > .field-group:has(.control-textarea) {
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.panel-block > .field-group:not(:has(.control-textarea)) {
  flex-shrink: 0;
}

.panel-block .control-textarea {
  flex: 1 1 0;
  min-height: 2.25rem;
  max-height: 100%;
  resize: none;
  overflow-y: auto;
}

.panel-block .button-group {
  flex-shrink: 0;
}

.panel-block .status-line {
  flex-shrink: 0;
  margin-top: auto;
  margin-bottom: 0;
  padding-top: 0.35rem;
}

.panel-head {
  margin-bottom: 0.4rem;
  flex-shrink: 0;
}

.panel-title {
  margin: 0 0 0.35rem;
  font-size: 1.05rem;
  font-weight: 600;
  color: hsl(var(--foreground));
}

.panel-description {
  margin: 0;
  font-size: 0.82rem;
  color: hsl(var(--muted-foreground));
}

.section-separator {
  margin: 0.45rem 0 0.65rem;
  background-color: hsl(var(--border));
  height: 1px;
  flex-shrink: 0;
}

.field-group {
  margin-bottom: 0.5rem;
  flex-shrink: 0;
}

.field-group:last-of-type {
  margin-bottom: 0.35rem;
}

.field-label {
  display: block;
  font-size: 0.8rem;
  font-weight: 500;
  color: hsl(var(--foreground) / 0.85);
  margin-bottom: 0.4rem;
  line-height: 1.3;
}

.field-label-centered {
  text-align: center;
}

.control {
  width: 100%;
  box-sizing: border-box;
  border-radius: calc(var(--radius) - 2px);
  border: 1px solid hsl(var(--input));
  background-color: hsl(var(--background));
  color: hsl(var(--foreground));
  font-size: 0.875rem;
  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;
}

.control:focus-visible {
  outline: none;
  border-color: hsl(var(--ring));
  box-shadow: 0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--ring) / 0.35);
}

.control-textarea {
  min-height: 3rem;
  padding: 0.45rem 0.55rem;
  resize: none;
  overflow-y: auto;
  font-family: ui-monospace, 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.8125rem;
  line-height: 1.45;
}

.control-input {
  padding: 0.55rem 0.65rem;
  font-family: ui-monospace, 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.8125rem;
}

.control-file {
  padding: 0.35rem 0;
  border: none;
  background: transparent;
  font-size: 0.82rem;
  color: hsl(var(--muted-foreground));
}

.control-file::file-selector-button {
  margin-right: 0.75rem;
  padding: 0.4rem 0.75rem;
  border-radius: calc(var(--radius) - 4px);
  border: 1px solid hsl(var(--border));
  background: hsl(var(--muted));
  color: hsl(var(--foreground));
  font-size: 0.8rem;
  cursor: pointer;
}

.control-file::file-selector-button:hover {
  background: hsl(var(--muted-foreground) / 0.15);
}

.control-readonly {
  background-color: hsl(var(--muted) / 0.35);
  color: hsl(var(--foreground) / 0.88);
  cursor: text;
}

.fingerprint {
  flex-shrink: 0;
  margin: 0.1rem 0 0.4rem;
  min-height: 1.1rem;
  font-family: ui-monospace, monospace;
  font-size: 0.75rem;
  color: hsl(var(--muted-foreground));
  word-break: break-all;
}

.button-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  align-items: center;
  margin-top: 0.15rem;
  flex-shrink: 0;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  padding: 0.5rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  border-radius: calc(var(--radius) - 2px);
  border: 1px solid transparent;
  cursor: pointer;
  transition:
    background-color 0.15s ease,
    color 0.15s ease,
    border-color 0.15s ease,
    opacity 0.15s ease;
}

.button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--ring) / 0.45);
}

.button-primary {
  background-color: hsl(var(--primary));
  color: hsl(var(--primary-foreground));
  border-color: hsl(var(--primary));
}

.button-primary:hover {
  filter: brightness(1.06);
}

.button-outline {
  background-color: transparent;
  color: hsl(var(--foreground));
  border-color: hsl(var(--border));
}

.button-outline:hover {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
  border-color: hsl(var(--border));
}

.button-outline:disabled,
.button-primary:disabled {
  opacity: 0.45;
  cursor: not-allowed;
  pointer-events: none;
}

.menu-trigger-chevron {
  flex-shrink: 0;
  opacity: 0.7;
}

.dropdown-content {
  z-index: 100;
  min-width: 12rem;
  padding: 0.35rem;
  border-radius: calc(var(--radius) - 2px);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--popover));
  color: hsl(var(--foreground));
  box-shadow:
    0 4px 16px hsl(0 0% 0% / 0.35),
    0 0 0 1px hsl(0 0% 100% / 0.04);
}

.dropdown-label {
  padding: 0.35rem 0.6rem 0.25rem;
  font-size: 0.7rem;
  font-weight: 600;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: hsl(var(--muted-foreground));
}

.dropdown-separator {
  height: 1px;
  margin: 0.25rem 0;
  background-color: hsl(var(--border));
}

.dropdown-item {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0.45rem 0.6rem;
  border-radius: calc(var(--radius) - 4px);
  font-size: 0.8125rem;
  color: hsl(var(--foreground));
  cursor: pointer;
  user-select: none;
  outline: none;
}

.dropdown-item[data-disabled] {
  opacity: 0.45;
  pointer-events: none;
}

.dropdown-item[data-highlighted] {
  background-color: hsl(var(--accent));
  color: hsl(var(--accent-foreground));
}

.tooltip-content {
  z-index: 200;
  max-width: 16rem;
  padding: 0.35rem 0.55rem;
  border-radius: calc(var(--radius) - 4px);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--popover));
  color: hsl(var(--foreground));
  font-size: 0.75rem;
  line-height: 1.35;
  box-shadow: 0 6px 20px hsl(0 0% 0% / 0.38);
}

.status-line {
  flex-shrink: 0;
  margin: 0.55rem 0 0;
  font-size: 0.78rem;
  color: hsl(var(--muted-foreground));
}

.tabs-root {
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.tabs-list {
  position: relative;
  display: flex;
  flex-shrink: 0;
  gap: 0.125rem;
  margin: -0.2rem -0.2rem 0.2rem;
  padding: 0.12rem;
  border-radius: calc(var(--radius) - 2px);
  background-color: hsl(var(--muted) / 0.35);
  border: 1px solid hsl(var(--border));
}

/* Inactive tab panels must not participate in flex layout (avoid empty flex gap) */
.tabs-content[data-state='inactive'] {
  display: none !important;
}

.tabs-trigger {
  position: relative;
  z-index: 1;
  flex: 1;
  background-color: transparent;
  color: hsl(var(--muted-foreground));
  border: none;
  border-radius: calc(var(--radius) - 4px);
  padding: 0.45rem 0.65rem;
  font-size: 0.8125rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: color 0.15s ease;
}

.tabs-trigger:hover {
  color: hsl(var(--foreground));
}

.tabs-trigger[data-state='active'] {
  color: hsl(var(--foreground));
}

.tabs-trigger:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--ring) / 0.45);
}

.tabs-indicator {
  position: absolute;
  left: 0;
  top: 0.15rem;
  bottom: 0.15rem;
  height: auto;
  width: var(--radix-tabs-indicator-size);
  transform: translateX(var(--radix-tabs-indicator-position));
  transition:
    transform 0.2s ease,
    width 0.2s ease;
  pointer-events: none;
}

.tabs-indicator-bar {
  width: 100%;
  height: 100%;
  background-color: hsl(var(--background));
  border: 1px solid hsl(var(--border));
  border-radius: calc(var(--radius) - 4px);
  box-shadow: 0 1px 2px hsl(0 0% 0% / 0.2);
}

.tabs-content {
  flex: 1 1 0;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  outline: none;
}

.tabs-content > .panel-head,
.tabs-content > .section-separator {
  flex-shrink: 0;
}

.tabs-content > .hint {
  flex-shrink: 0;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  line-clamp: 5;
  overflow: hidden;
}

.tabs-content > .fingerprint,
.tabs-content > .button-group,
.tabs-content > .status-line,
.tabs-content > .import-status,
.tabs-content > .ticker-tag,
.tabs-content > .error-message {
  flex-shrink: 0;
}

.tabs-content > .field-group:has(.control-textarea) {
  flex: 1 1 0;
  min-height: 0;
  display: flex;
  flex-direction: column;
  margin-bottom: 0.45rem;
}

.tabs-content > .field-group:not(:has(.control-textarea)) {
  flex-shrink: 0;
}

.tabs-content .control-textarea {
  flex: 1 1 0;
  min-height: 2.25rem;
  max-height: 100%;
}

.tabs-content:focus-visible {
  outline: none;
}

.field-label-row {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.4rem;
}

.field-label-row .field-label {
  margin-bottom: 0;
}

.field-label-row .icon-button {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
}

.icon-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: hsl(var(--background));
  color: hsl(var(--muted-foreground));
  border: 1px solid hsl(var(--border));
  border-radius: calc(var(--radius) - 4px);
  padding: 0.3rem;
  cursor: pointer;
  transition:
    color 0.15s ease,
    border-color 0.15s ease,
    background-color 0.15s ease;
}

.icon-button:hover {
  color: hsl(var(--primary-foreground));
  border-color: hsl(var(--primary));
  background-color: hsl(var(--accent));
}

.icon-button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px hsl(var(--background)), 0 0 0 4px hsl(var(--ring) / 0.35);
}

.hidden-file-input {
  display: none;
}

.import-status {
  margin-top: -0.25rem;
  margin-bottom: 0.75rem;
  font-size: 0.78rem;
  color: hsl(var(--accent-foreground));
}

.hint {
  margin: 0;
  padding: 0.65rem 0.75rem;
  border-radius: calc(var(--radius) - 2px);
  border: 1px solid hsl(var(--border));
  background-color: hsl(var(--muted) / 0.25);
  color: hsl(var(--muted-foreground));
  font-size: 0.8rem;
  line-height: 1.45;
}

.hint code {
  padding: 0.1rem 0.3rem;
  border-radius: 3px;
  background-color: hsl(var(--background));
  font-size: 0.78rem;
  color: hsl(var(--primary));
}

.ticker-tag {
  margin: -0.15rem 0 0.85rem;
  font-size: 0.8rem;
  color: hsl(var(--primary));
}

.error-message {
  margin-top: 0.5rem;
  font-size: 0.82rem;
  color: hsl(var(--destructive));
}

@media (max-width: 900px) {
  .main-layout {
    flex-direction: column;
    flex: 1 1 0;
    min-height: 0;
    overflow: hidden;
  }

  .validation-card {
    flex: 1.45 1 0;
    min-height: 0;
    width: 100%;
  }

  .side-panel {
    flex: 1 1 0;
    min-height: 0;
    width: 100%;
  }
}
</style>
