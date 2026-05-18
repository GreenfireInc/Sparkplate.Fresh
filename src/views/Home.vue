<template>
  <div class="hv">
    <!-- <header class="hv__header">
      <h1 class="hv__title">
        <HomeIcon :size="22" class="hv__title-icon" aria-hidden="true" />
        Sparkplate
      </h1>
    </header> -->

    <Separator class="hv__separator" />

    <div class="hv__body">
      <div class="hv__logo-row">
        <a
          href="https://www.electronjs.org/"
          target="_blank"
          rel="noreferrer"
          class="hv__logo-link"
        >
          <img
            src="/assets/icons/development/electron.svg"
            class="hv__logo hv__logo--electron"
            alt="Electron logo"
          />
        </a>
        <a
          href="https://vitejs.dev/"
          target="_blank"
          rel="noreferrer"
          class="hv__logo-link"
        >
          <img
            src="/assets/icons/development/vite.svg"
            class="hv__logo"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://vuejs.org/"
          target="_blank"
          rel="noreferrer"
          class="hv__logo-link"
        >
          <img
            src="/assets/icons/development/vue.svg"
            class="hv__logo hv__logo--vue"
            alt="Vue logo"
          />
        </a>
      </div>

      <div class="hv__logo-row">
        <a
          href="http://greenfire.io/"
          target="_blank"
          rel="noreferrer"
          class="hv__logo-link"
        >
          <img
            src="/assets/icons/greenfire/greenfire.svg"
            class="hv__logo hv__logo--greenfire"
            alt="Greenfire logo"
          />
        </a>
      </div>

      <div class="hv__card">
        <HelloWorld msg="Electron + Vite + Vue">
          Electron <span class="hv__ver">({{ electronVer }})</span>
          + Vite <span class="hv__ver">({{ viteVer }})</span>
          + Vue <span class="hv__ver">({{ vueVer }})</span>
        </HelloWorld>
      </div>

      <div class="hv__info-row">
        {{ t('placeStaticFiles') }}
        <code class="hv__code">{{ t('publicFolder') }}</code>
        {{ t('folder') }}
        <img
          class="hv__node-logo"
          src="/assets/icons/development/node.svg"
          alt="Node logo"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Separator } from 'radix-vue'
import { Home as HomeIcon } from 'lucide-vue-next'
import HelloWorld from '../components/HelloWorld.vue'
import { useI18n } from '@/composables/useI18n'
import pkg from '../../package.json'

defineOptions({ name: 'HomeView' })

const { t } = useI18n()

const electronVer = pkg.devDependencies['electron']
const viteVer    = pkg.devDependencies['vite']
const vueVer     = pkg.dependencies['vue']
</script>

<style lang="scss" scoped>
/*
 * Root intentionally does NOT use the global `.view` class.
 * That class carries `overflow-y: auto` which causes a scrollbar to flash
 * when Alt reveals the Electron auto-hide menu bar (window height shrinks).
 * We set height: 100% ourselves and lock overflow to hidden.
 */
.hv {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow: hidden;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background: #fff;
  font-family: inherit;
}

/* ── Header ─────────────────────────────────────────────────── */
.hv__header {
  flex-shrink: 0;
  text-align: center;
  margin-bottom: 0.75rem;
}

.hv__title {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0;
}

.hv__title-icon {
  flex-shrink: 0;
  color: #4b5563;
}

/* ── Separator ───────────────────────────────────────────────── */
.hv__separator {
  display: block;
  width: min(52rem, 100%);
  height: 1px;
  background: #e5e7eb;
  flex-shrink: 0;
  margin-bottom: 0.75rem;
}

/* ── Body ────────────────────────────────────────────────────── */
.hv__body {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1028px;
}

/* ── Logo rows ───────────────────────────────────────────────── */
.hv__logo-row {
  display: flex;
  align-items: center;
  justify-content: center;
}

.hv__logo-link {
  display: inline-flex;
  line-height: 0;
  border-radius: 0.5rem;
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #2563eb;
  }
}

/* Preserved exactly from original: height 8rem, padding 1.5rem */
.hv__logo {
  height: 8rem;
  padding: 1.5rem;
  will-change: filter;
  transition: filter 300ms;
}

.hv__logo--electron:hover {
  filter: drop-shadow(0 0 2rem #9feaf9);
}

.hv__logo-link:hover .hv__logo:not(.hv__logo--electron):not(.hv__logo--vue) {
  filter: drop-shadow(0 0 2rem #646cffaa);
}

.hv__logo--vue:hover {
  filter: drop-shadow(0 0 2rem #42b883aa);
}

/* ── Version badge inside HelloWorld slot ────────────────────── */
.hv__ver {
  font-size: 0.65em;
  font-weight: 400;
  color: #9ca3af;
  letter-spacing: 0.01em;
}

/* ── Card ────────────────────────────────────────────────────── */
.hv__card {
  width: 100%;
  max-width: 52rem;
  padding: 1rem 1.5rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  text-align: center;
  margin-top: 0.25rem;

  :deep(h1) {
    font-size: 1.375rem;
    color: #111827;
  }

  :deep(p) {
    color: #374151;
    line-height: 1.5;
  }

  :deep(.read-the-docs) {
    color: #888;
  }

  :deep(a) {
    color: #2563eb;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
}

/* ── Info row ────────────────────────────────────────────────── */
.hv__info-row {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 0.2rem;
  margin-top: 0.5rem;
  font-size: 0.9375rem;
  color: #6b7280;
}

.hv__code {
  background-color: #f9f9f9;
  padding: 2px 4px;
  margin: 0 4px;
  border-radius: 4px;
}

/* Preserved exactly from original: width 5em */
.hv__node-logo {
  width: 5em;
}
</style>
