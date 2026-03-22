<!--
  PGP public key details — parsed from armored public key (OpenPGP.js).
-->
<template>
  <DialogRoot :open="open" @update:open="onOpenChange">
    <DialogPortal>
      <DialogOverlay class="pgp-details-overlay" />
      <DialogContent class="pgp-details-modal" aria-describedby="pgp-details-desc">
        <div class="pgp-details-modal__header">
          <DialogTitle class="pgp-details-modal__title">Public key details</DialogTitle>
          <p id="pgp-details-desc" class="pgp-details-modal__subtitle">
            Information parsed from your armored public key block
          </p>
          <DialogClose class="pgp-details-modal__close" aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </DialogClose>
        </div>

        <div class="pgp-details-modal__body">
          <div v-if="loading" class="pgp-details-modal__loading">Loading…</div>

          <div v-else-if="parseError" class="pgp-details-modal__error" role="alert">
            {{ parseError }}
          </div>

          <dl v-else class="pgp-details-dl">
            <div class="pgp-details-dl__row">
              <dt>User ID(s) / author</dt>
              <dd>
                <ul v-if="userIdLines.length" class="pgp-details-ul">
                  <li v-for="(uid, i) in userIdLines" :key="i">{{ uid }}</li>
                </ul>
                <span v-else class="pgp-details-muted">—</span>
              </dd>
            </div>

            <div class="pgp-details-dl__row">
              <dt>Created</dt>
              <dd>{{ creationLabel }}</dd>
            </div>

            <div class="pgp-details-dl__row">
              <dt>Primary key algorithm</dt>
              <dd>{{ algorithmLabel }}</dd>
            </div>

            <div class="pgp-details-dl__row">
              <dt>Key ID</dt>
              <dd><code class="pgp-details-code">{{ keyIdHex }}</code></dd>
            </div>

            <div class="pgp-details-dl__row">
              <dt>Fingerprint</dt>
              <dd><code class="pgp-details-code">{{ fingerprintFormatted }}</code></dd>
            </div>

            <div class="pgp-details-dl__row">
              <dt>Key expiration</dt>
              <dd>{{ expirationLabel }}</dd>
            </div>

            <div v-if="subkeySummary" class="pgp-details-dl__row">
              <dt>Subkeys</dt>
              <dd class="pgp-details-subkeys">{{ subkeySummary }}</dd>
            </div>
          </dl>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import * as openpgp from 'openpgp'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogClose,
} from 'radix-vue'

defineOptions({ name: 'DetailsPgpModal' })

const props = defineProps<{
  open: boolean
  /** Armored ASCII public key block */
  armoredPublicKey: string
}>()

const emit = defineEmits<{
  'update:open': [value: boolean]
}>()

const loading = ref(false)
const parseError = ref('')

const userIdLines = ref<string[]>([])
const creationLabel = ref('—')
const algorithmLabel = ref('—')
const keyIdHex = ref('—')
const fingerprintFormatted = ref('—')
const expirationLabel = ref('—')
const subkeySummary = ref('')

function cleanArmoredKey(key: string): string {
  let cleaned = key.trim().replace(/^"|"$/g, '')
  cleaned = cleaned.replace(/\\n/g, '\n')
  return cleaned
}

function formatFingerprintHex(hex: string): string {
  return hex.toUpperCase().replace(/(.{2})(?!$)/g, '$1 ')
}

function onOpenChange(value: boolean) {
  emit('update:open', value)
}

async function loadKeyDetails() {
  parseError.value = ''
  userIdLines.value = []
  creationLabel.value = '—'
  algorithmLabel.value = '—'
  keyIdHex.value = '—'
  fingerprintFormatted.value = '—'
  expirationLabel.value = '—'
  subkeySummary.value = ''

  const raw = props.armoredPublicKey?.trim()
  if (!raw) {
    parseError.value = 'No public key to read.'
    return
  }

  loading.value = true
  try {
    const key = await openpgp.readKey({ armoredKey: cleanArmoredKey(raw) })

    const uids = key.getUserIDs()
    userIdLines.value = uids.length ? uids : []

    const created = key.getCreationTime()
    creationLabel.value = created ? created.toLocaleString() : '—'

    const algo = key.getAlgorithmInfo()
    const algoName = String(algo.algorithm ?? 'unknown')
    const bits = algo.bits != null ? `${algo.bits} bits` : ''
    const curve = algo.curve != null ? ` (${algo.curve})` : ''
    algorithmLabel.value = [algoName, bits, curve].filter(Boolean).join(' ').trim() || '—'

    keyIdHex.value = key.getKeyID().toHex().toUpperCase()

    const fp = key.getFingerprint()
    fingerprintFormatted.value = formatFingerprintHex(fp)

    const exp = await key.getExpirationTime()
    if (exp === Infinity) {
      expirationLabel.value = 'No expiration'
    } else if (exp instanceof Date) {
      expirationLabel.value = exp.toLocaleString()
    } else {
      expirationLabel.value = '—'
    }

    const subkeys = key.getSubkeys()
    if (subkeys.length) {
      const parts = subkeys.map((sk, i) => {
        const info = sk.getAlgorithmInfo()
        const b = info.bits != null ? `${info.bits} bit` : ''
        const c = info.curve != null ? String(info.curve) : ''
        return `Subkey ${i + 1}: ${info.algorithm}${b ? ` ${b}` : ''}${c ? ` (${c})` : ''}`
      })
      subkeySummary.value = parts.join('\n')
    }
  } catch (e: unknown) {
    parseError.value = e instanceof Error ? e.message : 'Could not parse public key'
  } finally {
    loading.value = false
  }
}

watch(
  () => [props.open, props.armoredPublicKey] as const,
  ([isOpen]) => {
    if (isOpen) {
      loadKeyDetails()
    }
  }
)
</script>

<style lang="scss">
.pgp-details-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  z-index: 10060;
  animation: pgp-details-fade 0.15s ease;
}

@keyframes pgp-details-fade {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.pgp-details-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10061;
  width: min(92vw, 32rem);
  max-height: 85vh;
  background: #fff;
  border-radius: 0.75rem;
  box-shadow: 0 20px 60px -10px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: pgp-details-pop 0.18s ease;
}

@keyframes pgp-details-pop {
  from {
    opacity: 0;
    transform: translate(-50%, -48%);
  }
  to {
    opacity: 1;
    transform: translate(-50%, -50%);
  }
}

.pgp-details-modal__header {
  position: relative;
  padding: 1.25rem 3rem 1rem 1.5rem;
  border-bottom: 1px solid #e5e7eb;
}

.pgp-details-modal__title {
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.pgp-details-modal__subtitle {
  font-size: 0.8125rem;
  color: #6b7280;
  margin: 0.375rem 0 0;
  line-height: 1.4;
}

.pgp-details-modal__close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border: none;
  background: #f3f4f6;
  border-radius: 0.375rem;
  cursor: pointer;
  color: #6b7280;
  transition: background 0.12s, color 0.12s;
}

.pgp-details-modal__close svg {
  width: 1rem;
  height: 1rem;
}

.pgp-details-modal__close:hover {
  background: #e5e7eb;
  color: #111827;
}

.pgp-details-modal__body {
  overflow-y: auto;
  padding: 1rem 1.5rem 1.5rem;
}

.pgp-details-modal__loading,
.pgp-details-modal__error {
  font-size: 0.875rem;
  padding: 0.5rem 0;
}

.pgp-details-modal__error {
  color: #991b1b;
}

.pgp-details-dl {
  margin: 0;
}

.pgp-details-dl__row {
  display: grid;
  grid-template-columns: 8.5rem 1fr;
  gap: 0.75rem 1rem;
  padding: 0.625rem 0;
  border-bottom: 1px solid #f3f4f6;
  font-size: 0.875rem;

  &:last-child {
    border-bottom: none;
  }

  dt {
    margin: 0;
    font-weight: 600;
    color: #6b7280;
  }

  dd {
    margin: 0;
    color: #111827;
    min-width: 0;
  }
}

.pgp-details-ul {
  margin: 0;
  padding-left: 1.125rem;
  line-height: 1.45;
}

.pgp-details-muted {
  color: #9ca3af;
}

.pgp-details-code {
  display: inline-block;
  font-size: 0.75rem;
  word-break: break-all;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  line-height: 1.45;
}

.pgp-details-subkeys {
  white-space: pre-wrap;
  font-size: 0.8125rem;
  line-height: 1.45;
}
</style>
