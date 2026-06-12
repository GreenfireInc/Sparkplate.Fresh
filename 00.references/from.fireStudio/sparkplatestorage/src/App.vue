<script setup lang="ts">
import { ref } from 'vue';
import * as openpgp from 'openpgp';

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

const cleanArmoredKey = (key: string) => {
  let cleaned = key.trim().replace(/^"|"$/g, '');
  // Convert literal \n escape sequences to actual newlines
  cleaned = cleaned.replace(/\\n/g, '\n');
  return cleaned;
};

const formatFingerprint = (fingerprint: string) => {
  return fingerprint.toUpperCase().replace(/(.{2})(?!$)/g, '$1 ');
};

const downloadFile = (content: string, filename: string, contentType: string) => {
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
  if (target.files) {
    fileToEncrypt.value = target.files[0];
  }
};

const encryptFile = async () => {
  if (!fileToEncrypt.value || !publicKey.value) {
    encryptionStatus.value = 'Please select a file and provide a public key.';
    return;
  }

  try {
    const cleanPublicKey = cleanArmoredKey(publicKey.value);
    const publicKeyObj = await openpgp.readKey({ armoredKey: cleanPublicKey });
    const fileData = await fileToEncrypt.value.arrayBuffer();
    const message = await openpgp.createMessage({ binary: new Uint8Array(fileData) });

    const encrypted = await openpgp.encrypt({
      message,
      encryptionKeys: publicKeyObj,
    });

    downloadFile(encrypted as string, `${fileToEncrypt.value.name}.gpg`, 'application/octet-stream');
    encryptionStatus.value = 'File encrypted successfully!';
  } catch (error) {
    encryptionStatus.value = `Error: ${(error as Error).message}`;
  }
};

const handleDecryptFileSelect = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    fileToDecrypt.value = target.files[0];
  }
};

const decryptFile = async () => {
  if (!fileToDecrypt.value || !privateKey.value) {
    decryptionStatus.value = 'Please select a file and provide a private key.';
    return;
  }

  try {
    const cleanPrivateKey = cleanArmoredKey(privateKey.value);
    const privateKeyObj = await openpgp.readPrivateKey({ armoredKey: cleanPrivateKey });
    const encryptedData = await fileToDecrypt.value.arrayBuffer();
    const message = await openpgp.readMessage({ armoredMessage: new TextDecoder().decode(encryptedData) });

    const { data: decrypted } = await openpgp.decrypt({
      message,
      decryptionKeys: privateKeyObj,
    });

    downloadFile(decrypted as string, fileToDecrypt.value.name.replace('.gpg', ''), 'application/octet-stream');
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
        <h2>Validate Keypair</h2>
        <textarea v-model="publicKey" placeholder="Paste your public key"></textarea>
        <textarea v-model="privateKey" @input="generatePublicKey" placeholder="Paste your private key"></textarea>
        <p class="fingerprint">{{ keyFingerprint }}</p>
        <div class="button-group">
          <button @click="validateKeys">Validate</button>
          <div class="export-container">
            <button @click="showExportOptions = !showExportOptions" class="export-button">Export</button>
            <div v-if="showExportOptions" class="export-options">
              <button @click="exportKeyData('txt')">TXT</button>
              <button @click="exportKeyData('csv')">CSV</button>
              <button @click="exportKeyData('json')">JSON</button>
              <button @click="exportKeyData('vcf')">vCard</button>
            </div>
          </div>
        </div>
        <p>{{ validationMessage }}</p>
      </div>
      <div class="side-panel">
        <div class="card">
          <h2>Encrypt File</h2>
          <input type="file" @change="handleEncryptFileSelect" />
          <textarea v-model="publicKey" placeholder="Paste your public key"></textarea>
          <button @click="encryptFile">Encrypt</button>
          <p>{{ encryptionStatus }}</p>
        </div>
        <div class="card">
          <h2>Decrypt File</h2>
          <input type="file" @change="handleDecryptFileSelect" />
          <textarea v-model="privateKey" placeholder="Paste your private key"></textarea>
          <button @click="decryptFile">Decrypt</button>
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
</style>