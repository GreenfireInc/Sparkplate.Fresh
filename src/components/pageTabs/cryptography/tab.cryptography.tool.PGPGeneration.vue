<template>
  <div class="pgp-gen">
    <header class="pgp-gen__header">
      <h2 class="pgp-gen__title">Generate PGP / GPG key pair</h2>
      <p class="pgp-gen__lead">
        Create a new OpenPGP key pair for your identity. Keys are generated locally in your browser.
      </p>
    </header>

    <div class="pgp-gen__panel">
      <div class="pgp-gen__grid">
        <div class="pgp-gen__field">
          <Label for="pgp-gen-name" class="pgp-gen__label">Full name</Label>
          <input
            id="pgp-gen-name"
            v-model="displayName"
            type="text"
            class="pgp-gen__input"
            placeholder="Ada Lovelace"
            autocomplete="name"
            spellcheck="false"
          />
        </div>
        <div class="pgp-gen__field">
          <Label for="pgp-gen-email" class="pgp-gen__label">Email</Label>
          <input
            id="pgp-gen-email"
            v-model="email"
            type="email"
            class="pgp-gen__input"
            placeholder="ada@example.com"
            autocomplete="email"
            spellcheck="false"
          />
        </div>
      </div>

      <div class="pgp-gen__field">
        <Label for="pgp-gen-key-type" class="pgp-gen__label">Key type</Label>
        <SelectRoot v-model="keyType">
          <SelectTrigger id="pgp-gen-key-type" class="pgp-gen__select-trigger" aria-label="Key type">
            <SelectValue placeholder="Key type" />
            <SelectIcon class="pgp-gen__select-chevron" aria-hidden="true">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M6 9l6 6 6-6" stroke-linecap="round" stroke-linejoin="round" />
              </svg>
            </SelectIcon>
          </SelectTrigger>
          <SelectPortal>
            <SelectContent class="pgp-gen__select-content" position="popper" :side-offset="4">
              <SelectViewport class="pgp-gen__select-viewport">
                <SelectItem value="rsa4096" class="pgp-gen__select-item">
                  <SelectItemText>RSA 4096-bit (wide compatibility)</SelectItemText>
                </SelectItem>
                <SelectItem value="curve25519" class="pgp-gen__select-item">
                  <SelectItemText>Curve25519 / Ed25519 (modern, smaller keys)</SelectItemText>
                </SelectItem>
              </SelectViewport>
            </SelectContent>
          </SelectPortal>
        </SelectRoot>
      </div>

      <div class="pgp-gen__field">
        <Label for="pgp-gen-passphrase" class="pgp-gen__label">
          Passphrase <span class="pgp-gen__optional">(optional)</span>
        </Label>
        <input
          id="pgp-gen-passphrase"
          v-model="passphrase"
          type="password"
          class="pgp-gen__input"
          placeholder="Protects your private key — leave empty for unencrypted export"
          autocomplete="new-password"
        />
        <p class="pgp-gen__hint">
          If set, the private key is encrypted; you’ll need this passphrase to import or use it.
        </p>
      </div>

      <Separator class="pgp-gen__separator" />

      <button
        type="button"
        class="pgp-gen__btn"
        :disabled="!canGenerate || isGenerating"
        @click="generateKeys"
      >
        <span v-if="isGenerating" class="pgp-gen__btn-inner">
          <span class="pgp-gen__spinner" aria-hidden="true" />
          Generating…
        </span>
        <span v-else>Generate key pair</span>
      </button>
    </div>

    <div v-if="error" class="pgp-gen__error" role="alert">
      {{ error }}
    </div>

    <div v-if="publicKeyArmored" class="pgp-gen__results">
      <h3 class="pgp-gen__results-title">Generated keys</h3>
      <p class="pgp-gen__results-meta">
        Fingerprint: <code class="pgp-gen__fp">{{ fingerprintFormatted }}</code>
        <button type="button" class="pgp-gen__mini-btn" @click="copyText(fingerprintRaw)">Copy</button>
      </p>

      <div class="pgp-gen__block">
        <div class="pgp-gen__block-head">
          <Label class="pgp-gen__label">Public key</Label>
          <button type="button" class="pgp-gen__mini-btn" @click="copyText(publicKeyArmored, 'public')">
            {{ copied === 'public' ? 'Copied' : 'Copy' }}
          </button>
        </div>
        <textarea :value="publicKeyArmored" class="pgp-gen__textarea" readonly rows="8" spellcheck="false" />
      </div>

      <div class="pgp-gen__block">
        <div class="pgp-gen__block-head">
          <Label class="pgp-gen__label">Private key</Label>
          <button type="button" class="pgp-gen__mini-btn" @click="copyText(privateKeyArmored, 'private')">
            {{ copied === 'private' ? 'Copied' : 'Copy' }}
          </button>
        </div>
        <textarea :value="privateKeyArmored" class="pgp-gen__textarea" readonly rows="10" spellcheck="false" />
      </div>

      <div v-if="revocationCertificate" class="pgp-gen__block">
        <div class="pgp-gen__block-head">
          <Label class="pgp-gen__label">Revocation certificate</Label>
          <button type="button" class="pgp-gen__mini-btn" @click="copyText(revocationCertificate, 'revoke')">
            {{ copied === 'revoke' ? 'Copied' : 'Copy' }}
          </button>
        </div>
        <textarea :value="revocationCertificate" class="pgp-gen__textarea" readonly rows="6" spellcheck="false" />
      </div>

      <div class="pgp-gen__download-row">
        <button type="button" class="pgp-gen__btn pgp-gen__btn--secondary" @click="downloadBundle">
          Download as text file
        </button>
      </div>
    </div>

    <div class="pgp-gen__info">
      <h3 class="pgp-gen__info-title">Before you continue</h3>
      <ul class="pgp-gen__info-list">
        <li>Store your <strong>private key</strong> and passphrase securely — anyone with them can impersonate you.</li>
        <li>Share only your <strong>public key</strong> with others for encryption and signature verification.</li>
        <li>Keep the <strong>revocation certificate</strong> safe; publish it if this key is ever compromised.</li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import * as openpgp from 'openpgp'
import {
  Label,
  SelectRoot,
  SelectTrigger,
  SelectContent,
  SelectPortal,
  SelectViewport,
  SelectItem,
  SelectItemText,
  SelectValue,
  SelectIcon,
  Separator,
} from 'radix-vue'

defineOptions({
  name: 'PGPGenerateTool',
})

const displayName = ref('')
const email = ref('')
const passphrase = ref('')
const keyType = ref('rsa4096')

const publicKeyArmored = ref('')
const privateKeyArmored = ref('')
const revocationCertificate = ref('')
const fingerprintRaw = ref('')

const isGenerating = ref(false)
const error = ref('')
const copied = ref<'public' | 'private' | 'revoke' | ''>('')

const fingerprintFormatted = computed(() => {
  const fp = fingerprintRaw.value
  if (!fp) return ''
  return fp.toUpperCase().replace(/(.{4})(?!$)/g, '$1 ')
})

const canGenerate = computed(() => {
  const name = displayName.value.trim()
  const em = email.value.trim()
  if (name.length < 1 || em.length < 3) return false
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em)
})

async function generateKeys() {
  if (!canGenerate.value) return

  isGenerating.value = true
  error.value = ''
  publicKeyArmored.value = ''
  privateKeyArmored.value = ''
  revocationCertificate.value = ''
  fingerprintRaw.value = ''
  copied.value = ''

  try {
    const userIDs = [{ name: displayName.value.trim(), email: email.value.trim() }]
    const pass = passphrase.value.trim()
    const passOpt = pass ? { passphrase: pass } : {}

    const result =
      keyType.value === 'rsa4096'
        ? await openpgp.generateKey({
            userIDs,
            format: 'armored',
            type: 'rsa',
            rsaBits: 4096,
            ...passOpt,
          })
        : await openpgp.generateKey({
            userIDs,
            format: 'armored',
            type: 'curve25519',
            ...passOpt,
          })

    publicKeyArmored.value = result.publicKey
    privateKeyArmored.value = result.privateKey
    revocationCertificate.value = result.revocationCertificate

    const pub = await openpgp.readKey({ armoredKey: result.publicKey })
    const fp = await pub.getFingerprint()
    fingerprintRaw.value = fp
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Key generation failed'
    error.value = message
  } finally {
    isGenerating.value = false
  }
}

let copyTimer: ReturnType<typeof setTimeout> | null = null
async function copyText(text: string, kind?: 'public' | 'private' | 'revoke') {
  try {
    await navigator.clipboard.writeText(text)
    if (kind) {
      copied.value = kind
      if (copyTimer) clearTimeout(copyTimer)
      copyTimer = setTimeout(() => {
        copied.value = ''
      }, 2000)
    } else {
      copied.value = ''
    }
  } catch {
    error.value = 'Could not copy to clipboard'
  }
}

function downloadBundle() {
  if (!publicKeyArmored.value || !privateKeyArmored.value) return

  const safe = email.value.trim().replace(/[^a-z0-9._-]+/gi, '_') || 'key'
  const header = `----- OpenPGP key export for ${displayName.value.trim()} <${email.value.trim()}> -----\n\n`

  const pubBlob = new Blob([header + publicKeyArmored.value], { type: 'text/plain' })
  const privBlob = new Blob([header + privateKeyArmored.value], { type: 'text/plain' })
  const revBlob = revocationCertificate.value
    ? new Blob([header + revocationCertificate.value], { type: 'text/plain' })
    : null

  // Simple multi-download: trigger three downloads (browsers may block multiple — offer combined text file as fallback)
  const combined = [
    '=== PUBLIC KEY ===\n\n',
    publicKeyArmored.value,
    '\n\n=== PRIVATE KEY ===\n\n',
    privateKeyArmored.value,
    revocationCertificate.value ? `\n\n=== REVOCATION CERTIFICATE ===\n\n${revocationCertificate.value}` : '',
    `\n\n=== FINGERPRINT ===\n${fingerprintRaw.value}\n`,
  ].join('')

  const allBlob = new Blob([combined], { type: 'text/plain' })
  const url = URL.createObjectURL(allBlob)
  const a = document.createElement('a')
  a.href = url
  a.download = `openpgp-keys-${safe}.txt`
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style lang="scss" scoped>
.pgp-gen {
  width: 100%;
  max-width: 52rem;
}

.pgp-gen__header {
  margin-bottom: 1.25rem;
}

.pgp-gen__title {
  font-size: 1.25rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.375rem;
}

.pgp-gen__lead {
  font-size: 0.875rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.5;
}

.pgp-gen__panel {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1.25rem;
}

.pgp-gen__grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  margin-bottom: 1rem;

  @media (min-width: 640px) {
    grid-template-columns: 1fr 1fr;
  }
}

.pgp-gen__field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 1rem;

  &:last-of-type {
    margin-bottom: 0;
  }
}

.pgp-gen__label {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.pgp-gen__optional {
  font-weight: 400;
  color: #9ca3af;
}

.pgp-gen__input {
  width: 100%;
  padding: 0.625rem 0.875rem;
  font-size: 0.875rem;
  color: #111827;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  outline: none;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
}

.pgp-gen__hint {
  font-size: 0.75rem;
  color: #6b7280;
  margin: 0;
  line-height: 1.4;
}

.pgp-gen__select-trigger {
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  width: 100%;
  min-height: 2.75rem;
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #111827;
  background: #fff;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  cursor: pointer;
  outline: none;
  transition: border-color 0.15s, box-shadow 0.15s;

  &:hover {
    border-color: #9ca3af;
  }

  &[data-state='open'] {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
  }
}

.pgp-gen__select-chevron {
  display: flex;
  color: #6b7280;
  flex-shrink: 0;
  transition: transform 0.15s;
}

.pgp-gen__select-trigger[data-state='open'] .pgp-gen__select-chevron {
  transform: rotate(180deg);
}

.pgp-gen__separator {
  height: 1px;
  background: #e5e7eb;
  margin: 1rem 0;
}

.pgp-gen__btn {
  width: 100%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 2.75rem;
  padding: 0.625rem 1rem;
  font-size: 0.875rem;
  font-weight: 600;
  color: #fff;
  background: #2563eb;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background 0.15s;

  &:hover:not(:disabled) {
    background: #1d4ed8;
  }

  &:focus-visible {
    outline: none;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #2563eb;
  }

  &:disabled {
    background: #d1d5db;
    color: #6b7280;
    cursor: not-allowed;
  }

  &--secondary {
    background: #4b5563;

    &:hover:not(:disabled) {
      background: #374151;
    }

    &:focus-visible {
      box-shadow: 0 0 0 2px #fff, 0 0 0 4px #4b5563;
    }
  }
}

.pgp-gen__btn-inner {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.pgp-gen__spinner {
  width: 1rem;
  height: 1rem;
  border: 2px solid rgba(255, 255, 255, 0.35);
  border-top-color: #fff;
  border-radius: 50%;
  animation: pgp-gen-spin 0.7s linear infinite;
}

@keyframes pgp-gen-spin {
  to {
    transform: rotate(360deg);
  }
}

.pgp-gen__error {
  margin-top: 1rem;
  padding: 0.875rem 1rem;
  font-size: 0.875rem;
  color: #991b1b;
  background: #fef2f2;
  border: 1px solid #fecaca;
  border-radius: 0.5rem;
}

.pgp-gen__results {
  margin-top: 1.25rem;
  padding: 1.25rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
}

.pgp-gen__results-title {
  font-size: 1rem;
  font-weight: 600;
  color: #111827;
  margin: 0 0 0.75rem;
}

.pgp-gen__results-meta {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem;
  font-size: 0.8125rem;
  color: #4b5563;
  margin: 0 0 1rem;
}

.pgp-gen__fp {
  font-family: ui-monospace, monospace;
  font-size: 0.75rem;
  word-break: break-all;
}

.pgp-gen__block {
  margin-bottom: 1rem;

  &:last-of-type {
    margin-bottom: 0;
  }
}

.pgp-gen__block-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  margin-bottom: 0.375rem;
}

.pgp-gen__textarea {
  width: 100%;
  padding: 0.75rem;
  font-size: 0.75rem;
  line-height: 1.45;
  color: #111827;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  resize: vertical;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}

.pgp-gen__mini-btn {
  flex-shrink: 0;
  padding: 0.25rem 0.625rem;
  font-size: 0.75rem;
  font-weight: 500;
  color: #1d4ed8;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    background: #dbeafe;
  }
}

.pgp-gen__download-row {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid #e5e7eb;
}

.pgp-gen__info {
  margin-top: 1.25rem;
  padding: 1rem 1.25rem;
  background: #eff6ff;
  border: 1px solid #bfdbfe;
  border-radius: 0.5rem;
}

.pgp-gen__info-title {
  font-size: 1rem;
  font-weight: 600;
  color: #1e3a8a;
  margin: 0 0 0.75rem;
}

.pgp-gen__info-list {
  margin: 0;
  padding-left: 1.125rem;
  font-size: 0.875rem;
  color: #1e40af;
  line-height: 1.55;

  li {
    margin-bottom: 0.5rem;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

<style lang="scss">
.pgp-gen__select-content {
  z-index: 10050;
  min-width: var(--radix-select-trigger-width);
  max-width: min(90vw, 28rem);
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.12);
}

.pgp-gen__select-viewport {
  padding: 0.25rem;
}

.pgp-gen__select-item {
  padding: 0.5rem 0.75rem;
  font-size: 0.875rem;
  color: #374151;
  border-radius: 0.25rem;
  cursor: pointer;
  outline: none;

  &[data-highlighted] {
    background: #f3f4f6;
  }

  &[data-state='checked'] {
    font-weight: 500;
    color: #1d4ed8;
  }
}
</style>
