<template>
  <div>
    <!-- Header -->
    <div class="eula-header">
      <div class="eula-header-icon">
        <FileText :size="26" class="eula-header-icon-svg" />
      </div>
      <DialogTitle class="eula-title">End User License Agreement</DialogTitle>
      <p class="eula-subtitle">Please read and accept the terms to continue</p>
    </div>

    <!-- EULA body -->
    <div class="eula-body">
      <div class="eula-scroll" ref="scrollEl" @scroll="handleScroll">
        <div class="eula-text" v-html="eulaContent" />
      </div>

      <p v-if="!scrolledToBottom" class="eula-scroll-hint">
        <ArrowDown :size="12" /> Scroll to read the full agreement
      </p>

      <!-- Accept checkbox -->
      <div class="eula-accept-row">
        <input
          id="eula-accept"
          v-model="accepted"
          type="checkbox"
          class="eula-checkbox"
          :disabled="!scrolledToBottom"
        />
        <Label for="eula-accept" class="eula-accept-label">
          I have read and agree to the End User License Agreement
        </Label>
      </div>

      <!-- Actions -->
      <div class="eula-actions">
        <button
          type="button"
          class="eula-btn eula-btn--primary"
          :disabled="!accepted"
          @click="emit('accept')"
        >
          Accept &amp; Create Account
        </button>
        <button
          type="button"
          class="eula-btn eula-btn--ghost"
          @click="emit('back')"
        >
          <ChevronLeft :size="14" /> Back
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { DialogTitle, Label } from 'radix-vue'
import { FileText, ArrowDown, ChevronLeft } from 'lucide-vue-next'
import eulaData from '/public/assets/text/eula/eulaLineBreaksBR.json'
// import eulaData from '@/assets/text/eula/eulaLineBreaksBR.json'

const emit = defineEmits<{
  accept: []
  back: []
}>()

const eulaContent      = (eulaData as { content: string }).content
const accepted         = ref(false)
const scrolledToBottom = ref(false)
const scrollEl         = ref<HTMLElement | null>(null)

const handleScroll = () => {
  if (!scrollEl.value) return
  const { scrollTop, scrollHeight, clientHeight } = scrollEl.value
  if (scrollTop + clientHeight >= scrollHeight - 8) {
    scrolledToBottom.value = true
  }
}
</script>

<style lang="scss" scoped>
/* ── Header ──────────────────────────────────────────────────────────────── */
.eula-header {
  background: #2563eb;
  padding: 1.75rem 2rem 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
}

.eula-header-icon {
  width: 3rem;
  height: 3rem;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.2rem;
}

.eula-header-icon-svg {
  color: #ffffff;
}

.eula-title {
  font-size: 1.1rem;
  font-weight: 300;
  color: #ffffff;
  margin: 0;
}

.eula-subtitle {
  font-size: 0.75rem;
  color: rgba(255, 255, 255, 0.75);
  margin: 0;
  font-weight: 300;
}

/* ── Body ────────────────────────────────────────────────────────────────── */
.eula-body {
  padding: 1.25rem 1.5rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.875rem;
}

/* ── Scrollable EULA text ────────────────────────────────────────────────── */
.eula-scroll {
  height: 240px;
  overflow-y: auto;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 0.875rem 1rem;
  scroll-behavior: smooth;

  &::-webkit-scrollbar       { width: 5px; }
  &::-webkit-scrollbar-track { background: #f3f4f6; border-radius: 4px; }
  &::-webkit-scrollbar-thumb { background: #d1d5db; border-radius: 4px; }
  &::-webkit-scrollbar-thumb:hover { background: #9ca3af; }
}

.eula-text {
  font-size: 0.75rem;
  line-height: 1.65;
  color: #374151;
}

/* ── Scroll hint ─────────────────────────────────────────────────────────── */
.eula-scroll-hint {
  display: flex;
  align-items: center;
  gap: 0.3rem;
  font-size: 0.7rem;
  color: #9ca3af;
  margin: -0.25rem 0 0;
  justify-content: center;
}

/* ── Accept row ──────────────────────────────────────────────────────────── */
.eula-accept-row {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

.eula-checkbox {
  width: 18px;
  height: 18px;
  flex-shrink: 0;
  margin: 0;
  accent-color: #2563eb;
  cursor: pointer;
  border: 1px solid #d1d5db;
  border-radius: 0.25rem;
  transition: opacity 0.15s;

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 2px solid rgba(37, 99, 235, 0.5);
    outline-offset: 1px;
  }
}

.eula-accept-label {
  font-size: 0.78rem;
  color: #374151;
  cursor: pointer;
  line-height: 1.4;
}

/* ── Actions ─────────────────────────────────────────────────────────────── */
.eula-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.eula-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.35rem;
  width: 100%;
  padding: 0.5rem 1rem;
  font-size: 0.85rem;
  font-weight: 500;
  border-radius: 0.375rem;
  border: 1px solid transparent;
  cursor: pointer;
  outline: none;
  transition: background 0.15s, opacity 0.15s;

  &--primary {
    background: #2563eb;
    color: #ffffff;

    &:hover:not(:disabled) {
      background: #1d4ed8;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &--ghost {
    background: transparent;
    color: #2563eb;
    border: none;
    font-weight: 400;

    &:hover {
      text-decoration: underline;
    }
  }
}
</style>
