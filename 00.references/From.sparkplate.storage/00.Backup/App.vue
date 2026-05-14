<script setup lang="ts">
import { ref } from 'vue';
import * as openpgp from 'openpgp';
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  TabsIndicator,
  Label,
  Separator,
} from 'radix-vue';
import {
  SUPPORTED_TICKERS,
  useCryptocurrencyEngine,
} from './lib/cores/engine/cryptocurrencyEngine';
import {
  CRYPTO_PUBKEY_FILE_EXTENSION,
  SPCK_MAGIC,
  decryptWithCryptoPrivateKey,
  encryptWithCryptoPublicKey,
  isHexCryptoPublicKey,
} from './lib/cores/cryptographyCore/encryption.crypto.PublicKey.general';
import { FileJson } from 'lucide-vue-next';

const activeTab = ref<'pgp' | 'crypto'>('pgp');

const publicKey = ref('');
const privateKey = ref('');
const validationMessage = ref('');
const keyFingerprint = ref('');
const rawFingerprint = ref('');
const showExportOptions = ref(false);
const fileToEncrypt = ref<File | null>(null);
const fileToDecrypt = ref<File | null>(null);
const encryptionStatus = ref('');
const decryptionStatus = ref('');
const encryptionPublicKey = ref('');

const cryptoInput = ref('');
const cryptoKeyImportStatus = ref('');
const cryptoKeyFileInputRef = ref<HTMLInputElement | null>(null);

const {
  ticker: cryptoTickerSymbol,
  publicKey: cryptoPublicKey,
  walletAddress: cryptoWalletAddress,
  errorMessage: cryptoErrorMessage,
} = useCryptocurrencyEngine(cryptoInput);

type CryptoKeyFilePayload = {
  privateKey?: string;
  wif?: string;
  ticker?: string;
  symbol?: string;
};

const stripTrailingJsonExtensions = (filename: string): string => {
  let base = filename.replace(/^.*[/\\]/, '');
  while (/\.json$/i.test(base)) {
    base = base.slice(0, -5);
  }
  return base;
};

const tickerFromCryptoKeyFilename = (filename: string): string | null => {
  const base = stripTrailingJsonExtensions(filename);
  const parts = base.split('.');
  if (parts.length >= 2 && /^[A-Za-z0-9]+$/.test(parts[1])) {
    return parts[1].toUpperCase();
  }
  return null;
};

const triggerCryptoKeyFilePick = () => {
  cryptoKeyFileInputRef.value?.click();
};

const handleCryptoKeyFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  cryptoKeyImportStatus.value = '';
  if (!file) {
    return;
  }

  try {
    const text = await file.text();
    const parsed = JSON.parse(text) as CryptoKeyFilePayload;
    const secret =
      (typeof parsed.privateKey === 'string' && parsed.privateKey.trim()) ||
      (typeof parsed.wif === 'string' && parsed.wif.trim()) ||
      '';

    if (!secret) {
      cryptoKeyImportStatus.value = 'JSON must include a privateKey or wif field.';
      return;
    }

    const fromJson =
      (typeof parsed.ticker === 'string' && parsed.ticker.trim()) ||
      (typeof parsed.symbol === 'string' && parsed.symbol.trim()) ||
      '';
    const fromName = tickerFromCryptoKeyFilename(file.name);
    const tickerRaw = (fromJson || fromName || '').toUpperCase();

    if (!tickerRaw) {
      cryptoKeyImportStatus.value =
        'Could not detect ticker. Use a filename like CoreyStedman.doge.<address>.json or add "ticker" in JSON.';
      return;
    }

    cryptoInput.value = `${tickerRaw}://${secret}`;
    cryptoKeyImportStatus.value = `Imported ${file.name} (${tickerRaw})`;
  } catch (err) {
    cryptoKeyImportStatus.value = `Import failed: ${(err as Error).message}`;
  } finally {
    target.value = '';
  }
};

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
  const label = source === cryptoPublicKey.value ? `${cryptoTickerSymbol.value || 'crypto'} public key` : 'PGP public key';
  encryptionStatus.value = `Pulled ${label} into encryption panel.`;
};

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
  showExportOptions.value = false;
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

const handleEncryptFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    fileToEncrypt.value = file;
  }
};

const encryptFile = async () => {
  if (!fileToEncrypt.value || !encryptionPublicKey.value) {
    encryptionStatus.value = 'Please select a file and provide a public key.';
    return;
  }

  const file = fileToEncrypt.value;
  const trimmedKey = encryptionPublicKey.value.trim();

  try {
    const fileData = new Uint8Array(await file.arrayBuffer());

    if (isHexCryptoPublicKey(trimmedKey)) {
      const { envelope } = await encryptWithCryptoPublicKey(trimmedKey, fileData);
      downloadFile(
        envelope,
        `${file.name}.${CRYPTO_PUBKEY_FILE_EXTENSION}`,
        'application/octet-stream',
      );
      encryptionStatus.value = 'File encrypted with cryptocurrency public key (ECIES)!';
      return;
    }

    const cleanPublicKey = cleanArmoredKey(trimmedKey);
    const publicKeyObj = await openpgp.readKey({ armoredKey: cleanPublicKey });
    const message = await openpgp.createMessage({ binary: fileData });

    const encrypted = await openpgp.encrypt({
      message,
      encryptionKeys: publicKeyObj,
    });

    downloadFile(encrypted as string, `${file.name}.gpg`, 'application/octet-stream');
    encryptionStatus.value = 'File encrypted successfully!';
  } catch (error) {
    encryptionStatus.value = `Error: ${(error as Error).message}`;
  }
};

const handleDecryptFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  const file = target.files?.[0];
  if (file) {
    fileToDecrypt.value = file;
  }
};

const hasSpckMagic = (bytes: Uint8Array): boolean => {
  if (bytes.length < SPCK_MAGIC.length) return false;
  for (let i = 0; i < SPCK_MAGIC.length; i++) {
    if (bytes[i] !== SPCK_MAGIC[i]) return false;
  }
  return true;
};

const decryptFile = async () => {
  if (!fileToDecrypt.value || !privateKey.value) {
    decryptionStatus.value = 'Please select a file and provide a private key.';
    return;
  }

  const file = fileToDecrypt.value;

  try {
    const fileBytes = new Uint8Array(await file.arrayBuffer());

    if (hasSpckMagic(fileBytes)) {
      const trimmedKey = privateKey.value.trim();
      const plaintext = await decryptWithCryptoPrivateKey(trimmedKey, fileBytes);
      const outputName = file.name.replace(
        new RegExp(`\\.${CRYPTO_PUBKEY_FILE_EXTENSION}$`),
        '',
      );
      downloadFile(plaintext, outputName, 'application/octet-stream');
      decryptionStatus.value = 'File decrypted with cryptocurrency private key (ECIES)!';
      return;
    }

    const cleanPrivateKey = cleanArmoredKey(privateKey.value);
    const privateKeyObj = await openpgp.readPrivateKey({ armoredKey: cleanPrivateKey });
    const message = await openpgp.readMessage({
      armoredMessage: new TextDecoder().decode(fileBytes),
    });

    const { data: decrypted } = await openpgp.decrypt({
      message,
      decryptionKeys: privateKeyObj,
    });

    downloadFile(decrypted as string, file.name.replace('.gpg', ''), 'application/octet-stream');
    decryptionStatus.value = 'File decrypted successfully!';
  } catch (error) {
    decryptionStatus.value = `Error: ${(error as Error).message}`;
  }
};

</script>

<template>
  <div class="container">
    <h1>PGP/GPG Key Tool</h1>
    <div class="main-layout">
      <div class="card validation-card">
        <TabsRoot v-model="activeTab" default-value="pgp" class="tabs-root">
          <TabsList class="tabs-list" aria-label="Key validation modes">
            <TabsTrigger value="pgp" class="tabs-trigger">PGP/GPG</TabsTrigger>
            <TabsTrigger value="crypto" class="tabs-trigger">Native Cryptocurrency</TabsTrigger>
            <TabsIndicator class="tabs-indicator">
              <div class="tabs-indicator-bar" />
            </TabsIndicator>
          </TabsList>

          <TabsContent value="pgp" class="tabs-content">
            <h2>Validate Keypair</h2>
            <textarea v-model="publicKey" placeholder="Paste your public key"></textarea>
            <textarea
              v-model="privateKey"
              @input="generatePublicKey"
              placeholder="Paste your private key"
            ></textarea>
            <p class="fingerprint">{{ keyFingerprint }}</p>
            <div class="button-group">
              <button @click="validateKeys">Validate</button>
              <div class="export-container">
                <button
                  @click="showExportOptions = !showExportOptions"
                  class="export-button"
                >
                  Export
                </button>
                <div v-if="showExportOptions" class="export-options">
                  <button @click="exportKeyData('txt')">TXT</button>
                  <button @click="exportKeyData('csv')">CSV</button>
                  <button @click="exportKeyData('json')">JSON</button>
                  <button @click="exportKeyData('vcf')">vCard</button>
                </div>
              </div>
            </div>
            <p>{{ validationMessage }}</p>
          </TabsContent>

          <TabsContent value="crypto" class="tabs-content">
            <h2>Derive Wallet</h2>
            <p class="hint">
              Paste a private key prefixed with the ticker symbol:
              <code>%tickerSymbol%://%privateKey%</code>
              <br />
              Supported: {{ SUPPORTED_TICKERS.join(', ') }} (32-byte hex private key).
              <br />
              Or import a JSON export (e.g.
              <code>CoreyStedman.doge.&lt;address&gt;.json.json</code>) — ticker is read from the
              filename or optional <code>ticker</code> in the file.
            </p>

            <div class="crypto-uri-stack">
              <div class="crypto-uri-label-row">
                <Label class="field-label radix-label crypto-uri-label-text" for="crypto-input">
                  Private Key (URI format)
                </Label>
                <button
                  type="button"
                  class="crypto-uri-import-icon-btn"
                  title="Import wallet key JSON file"
                  aria-label="Import wallet key JSON file"
                  @click="triggerCryptoKeyFilePick"
                >
                  <FileJson :size="18" :stroke-width="2" aria-hidden="true" />
                </button>
              </div>
              <div class="crypto-uri-field-bundle">
                <input
                  id="crypto-input"
                  v-model="cryptoInput"
                  class="crypto-input"
                  spellcheck="false"
                  autocomplete="off"
                  placeholder="BTC://0123456789abcdef..."
                />

                <div class="crypto-import-divider" aria-hidden="true">
                  <Separator class="crypto-import-sep" decorative orientation="horizontal" />
                  <span class="crypto-import-divider-text">or import file</span>
                  <Separator class="crypto-import-sep" decorative orientation="horizontal" />
                </div>

                <div class="crypto-import-panel">
                  <Label class="field-label radix-label" for="crypto-key-file-input">
                    Wallet key JSON
                  </Label>
                  <p class="import-file-hint">
                    <code>.json</code> with <code>privateKey</code> or <code>wif</code>; ticker from
                    <code>name.&lt;ticker&gt;.&lt;address&gt;...</code> or JSON <code>ticker</code>.
                  </p>
                  <input
                    id="crypto-key-file-input"
                    ref="cryptoKeyFileInputRef"
                    type="file"
                    class="crypto-key-file-input"
                    accept=".json,application/json"
                    @change="handleCryptoKeyFileChange"
                  />
                  <button
                    type="button"
                    class="secondary-button crypto-import-button"
                    @click="triggerCryptoKeyFilePick"
                  >
                    Choose JSON file…
                  </button>
                  <p v-if="cryptoKeyImportStatus" class="import-file-status">{{ cryptoKeyImportStatus }}</p>
                </div>
              </div>
            </div>

            <p v-if="cryptoTickerSymbol && !cryptoErrorMessage" class="ticker-tag">
              Detected ticker: <strong>{{ cryptoTickerSymbol }}</strong>
            </p>

            <label class="field-label" for="crypto-public-key">Public Key</label>
            <textarea
              id="crypto-public-key"
              v-model="cryptoPublicKey"
              readonly
              class="readonly-area"
              placeholder="Public key will appear here"
            ></textarea>

            <label class="field-label" for="crypto-address">Public Wallet Address</label>
            <input
              id="crypto-address"
              v-model="cryptoWalletAddress"
              readonly
              class="crypto-input readonly-area"
              placeholder="Wallet address will appear here"
            />

            <p v-if="cryptoErrorMessage" class="error-message">{{ cryptoErrorMessage }}</p>
          </TabsContent>
        </TabsRoot>
      </div>
      <div class="side-panel">
        <div class="card">
          <h2>Encrypt File</h2>
          <input type="file" @change="handleEncryptFileSelect" />
          <textarea
            v-model="encryptionPublicKey"
            placeholder="Paste your public key"
          ></textarea>
          <div class="button-group">
            <button
              type="button"
              class="secondary-button"
              :disabled="!publicKey && !cryptoPublicKey"
              @click="pullPublicKey"
            >
              Pull publicKey
            </button>
            <button @click="encryptFile">Encrypt</button>
          </div>
          <p>{{ encryptionStatus }}</p>
        </div>
        <div class="card">
          <h2>Decrypt File</h2>
          <input type="file" @change="handleDecryptFileSelect" />
          <textarea v-model="privateKey" placeholder="Paste your private key"></textarea>
          <div class="button-group">
            <button
              type="button"
              class="secondary-button"
              :disabled="!cryptoInput"
              @click="pullPrivateKey"
            >
              Pull privateKey
            </button>
            <button @click="decryptFile">Decrypt</button>
          </div>
          <p>{{ decryptionStatus }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  font-family: sans-serif;
  background-color: #1a1a1a;
  color: #fff;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.main-layout {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.validation-card {
  flex: 2;
}

.side-panel {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.card {
  background-color: #2a2a2a;
  padding: 1.5rem;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

h2 {
  margin-top: 0;
  margin-bottom: 1rem;
  color: #42b883;
}

textarea {
  width: 100%;
  height: 100px;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #444;
  background-color: #333;
  color: #fff;
  box-sizing: border-box;
}

input[type='file'] {
  margin-bottom: 1rem;
}

.button-group {
  display: flex;
  gap: 1rem;
  align-items: center;
}

button {
  background-color: #42b883;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

button:hover {
  background-color: #36a374;
  box-shadow: 0 0 10px #42b883;
}

.secondary-button {
  background-color: transparent;
  color: #42b883;
  border: 1px solid #42b883;
  box-shadow: none;
}

.secondary-button:hover {
  background-color: rgba(66, 184, 131, 0.12);
  box-shadow: none;
}

.secondary-button:disabled {
  color: #555;
  border-color: #444;
  background-color: transparent;
  cursor: not-allowed;
  box-shadow: none;
}

.secondary-button:disabled:hover {
  background-color: transparent;
  box-shadow: none;
}

.export-container {
  position: relative;
}

.export-options {
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #333;
  border-radius: 4px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  display: flex;
  flex-direction: column;
  z-index: 10;
  overflow: hidden;
}

.export-options button {
  background-color: transparent;
  text-align: left;
  padding: 0.75rem 1.5rem;
  width: 100%;
  border-radius: 0;
  box-shadow: none;
}

.export-options button:hover {
  background-color: #444;
}

p {
  margin-top: 1rem;
  color: #aaa;
}

.fingerprint {
  color: #ccc;
  font-family: monospace;
  word-break: break-all;
  margin-bottom: 1rem;
}

.tabs-root {
  display: flex;
  flex-direction: column;
}

.tabs-list {
  position: relative;
  display: flex;
  gap: 0.25rem;
  border-bottom: 1px solid #444;
  margin-bottom: 1.25rem;
}

.tabs-trigger {
  background-color: transparent;
  color: #aaa;
  border: none;
  border-radius: 0;
  box-shadow: none;
  padding: 0.65rem 1rem;
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: color 0.2s;
}

.tabs-trigger:hover {
  color: #fff;
  background-color: transparent;
  box-shadow: none;
}

.tabs-trigger[data-state='active'] {
  color: #42b883;
}

.tabs-indicator {
  position: absolute;
  left: 0;
  bottom: -1px;
  height: 2px;
  width: var(--radix-tabs-indicator-size);
  transform: translateX(var(--radix-tabs-indicator-position));
  transition: transform 0.25s ease, width 0.25s ease;
}

.tabs-indicator-bar {
  width: 100%;
  height: 100%;
  background-color: #42b883;
  border-radius: 2px;
}

.tabs-content:focus-visible {
  outline: none;
}

.field-label,
.radix-label {
  display: block;
  font-size: 0.85rem;
  color: #ccc;
  margin-bottom: 0.35rem;
  letter-spacing: 0.02em;
}

.crypto-uri-stack {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.crypto-uri-label-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.35rem;
}

.crypto-uri-label-text {
  margin-bottom: 0;
  flex: 1;
  min-width: 0;
}

.crypto-uri-import-icon-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  border-radius: 6px;
  border: 1px solid #555;
  background-color: #333;
  color: #42b883;
  cursor: pointer;
  transition:
    background-color 0.2s,
    border-color 0.2s,
    color 0.2s,
    box-shadow 0.2s;
}

.crypto-uri-import-icon-btn:hover {
  background-color: #3a3a3a;
  border-color: #42b883;
  color: #5fd49a;
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.2);
}

.crypto-uri-import-icon-btn:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.45);
}

.crypto-uri-field-bundle {
  display: flex;
  flex-direction: column;
}

.crypto-uri-field-bundle > .crypto-input {
  margin-bottom: 0;
}

.crypto-import-divider {
  display: flex;
  align-items: center;
  gap: 0.65rem;
  margin: 1rem 0 0.85rem;
}

.crypto-import-sep {
  flex: 1;
  background-color: #3d3d3d;
  min-height: 1px;
}

.crypto-import-divider-text {
  font-size: 0.72rem;
  color: #888;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  white-space: nowrap;
}

.crypto-import-panel {
  position: relative;
  background-color: #252525;
  border: 1px solid #383838;
  border-radius: 6px;
  padding: 0.85rem 1rem 1rem;
  margin-bottom: 0.25rem;
}

.import-file-hint {
  margin: 0 0 0.65rem;
  font-size: 0.8rem;
  line-height: 1.45;
  color: #9a9a9a;
}

.import-file-hint code {
  background-color: #1a1a1a;
  padding: 0.08rem 0.3rem;
  border-radius: 3px;
  font-size: 0.78rem;
  color: #6ec99a;
}

.crypto-key-file-input {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.crypto-import-button {
  width: 100%;
  justify-content: center;
  display: inline-flex;
  box-sizing: border-box;
}

.import-file-status {
  margin: 0.65rem 0 0;
  font-size: 0.82rem;
  color: #7fd4a8;
}

.crypto-input {
  width: 100%;
  padding: 0.65rem 0.75rem;
  margin-bottom: 1rem;
  border-radius: 4px;
  border: 1px solid #444;
  background-color: #333;
  color: #fff;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  font-size: 0.9rem;
  box-sizing: border-box;
}

.crypto-input:focus,
textarea:focus {
  outline: none;
  border-color: #42b883;
  box-shadow: 0 0 0 2px rgba(66, 184, 131, 0.25);
}

.readonly-area {
  background-color: #2f2f2f;
  color: #d6d6d6;
  cursor: text;
}

.hint {
  background-color: #232323;
  border: 1px solid #383838;
  color: #ccc;
  padding: 0.75rem 0.85rem;
  border-radius: 4px;
  font-size: 0.85rem;
  line-height: 1.4;
  margin-top: 0;
  margin-bottom: 1rem;
}

.hint code {
  background-color: #111;
  padding: 0.1rem 0.35rem;
  border-radius: 3px;
  font-size: 0.85rem;
  color: #42b883;
}

.ticker-tag {
  margin-top: -0.5rem;
  margin-bottom: 1rem;
  font-size: 0.85rem;
  color: #42b883;
}

.error-message {
  margin-top: 0.5rem;
  color: #ff6b6b;
  font-size: 0.9rem;
}
</style>
