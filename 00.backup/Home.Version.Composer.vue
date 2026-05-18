<template>
  <div class="home-view">
    <header class="home-view__header">
      <h1 class="home-view__title">
        <Sparkles :size="20" class="home-view__title-icon" aria-hidden="true" />
        Sparkplate
      </h1>
      <p class="home-view__subtitle">
        {{ t('placeStaticFiles') }}
        <code class="home-view__code">{{ t('publicFolder') }}</code>
        {{ t('folder') }}
      </p>
    </header>

    <Separator class="home-view__separator" />

    <div class="home-view__body">
      <div class="home-view__logo-row">
        <a
          href="https://www.electronjs.org/"
          target="_blank"
          rel="noreferrer"
          class="home-view__logo-link"
        >
          <img
            src="/assets/icons/development/electron.svg"
            class="home-view__logo home-view__logo--electron"
            alt="Electron logo"
          />
        </a>
        <a
          href="https://vitejs.dev/"
          target="_blank"
          rel="noreferrer"
          class="home-view__logo-link"
        >
          <img
            src="/assets/icons/development/vite.svg"
            class="home-view__logo"
            alt="Vite logo"
          />
        </a>
        <a
          href="https://vuejs.org/"
          target="_blank"
          rel="noreferrer"
          class="home-view__logo-link"
        >
          <img
            src="/assets/icons/development/vue.svg"
            class="home-view__logo home-view__logo--vue"
            alt="Vue logo"
          />
        </a>
        <a
          href="http://greenfire.io/"
          target="_blank"
          rel="noreferrer"
          class="home-view__logo-link"
        >
          <img
            src="/assets/icons/greenfire/greenfire.svg"
            class="home-view__logo home-view__logo--gf"
            alt="Greenfire logo"
          />
        </a>
      </div>

      <div class="home-view__card">
        <HelloWorld msg="Electron + Vite + Vue" />
      </div>

      <div class="home-view__node-row" aria-hidden="true">
        <img
          src="/assets/icons/development/node.svg"
          class="home-view__node"
          alt="Node logo"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Separator } from 'radix-vue'
import { Sparkles } from 'lucide-vue-next'
import HelloWorld from '../components/HelloWorld.vue'
import { useI18n } from '@/composables/useI18n'

defineOptions({ name: 'HomeView' })

const { t } = useI18n()
</script>

<style lang="scss" scoped>
/*
 * Override the global `.view { overflow-y: auto }` rule from App.vue.
 * The home page fits all content within the available height — no scroll needed.
 * When Alt reveals the Electron auto-hide menu bar the window shrinks briefly;
 * `overflow: hidden` ensures that never triggers a scrollbar.
 */
.home-view {
  /* stretch to fill main-content exactly */
  width: 100%;
  height: 100%;
  overflow: hidden;

  /* vertical column, everything centered */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0;

  padding: 1rem 1.5rem;
  box-sizing: border-box;
  background: #fff;
  font-family: inherit;
}

/* ── Header ─────────────────────────────────────────────────── */
.home-view__header {
  flex-shrink: 0;
  text-align: center;
  margin-bottom: 0.6rem;
}

.home-view__title {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  font-size: 1.375rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.25rem;
}

.home-view__title-icon {
  flex-shrink: 0;
  color: #2563eb;
}

.home-view__subtitle {
  margin: 0;
  font-size: 0.875rem;
  line-height: 1.5;
  color: #6b7280;
}

.home-view__code {
  background: #f3f4f6;
  border: 1px solid #e5e7eb;
  border-radius: 0.25rem;
  padding: 0.1rem 0.35rem;
  font-size: 0.85em;
  margin: 0 0.15rem;
}

/* ── Separator ───────────────────────────────────────────────── */
.home-view__separator {
  display: block;
  width: 100%;
  max-width: 52rem;
  height: 1px;
  background: #e5e7eb;
  flex-shrink: 0;
  margin-bottom: 0.75rem;
}

/* ── Body ────────────────────────────────────────────────────── */
.home-view__body {
  flex: 0 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  width: 100%;
  max-width: 52rem;
}

/* ── Logo row ────────────────────────────────────────────────── */
.home-view__logo-row {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: nowrap;
  gap: 0.5rem;
}

.home-view__logo-link {
  display: inline-flex;
  line-height: 0;
  border-radius: 0.5rem;
  outline: none;

  &:focus-visible {
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #2563eb;
  }
}

/*
 * Logo height uses clamp() so logos shrink gracefully at small viewport heights
 * (e.g. when the Electron menu bar is visible) without ever causing overflow.
 */
.home-view__logo {
  height: clamp(3.5rem, 7vh, 5.5rem);
  padding: clamp(0.6rem, 1.2vh, 1rem);
  will-change: filter;
  transition: filter 300ms;
}

.home-view__logo--electron:hover {
  filter: drop-shadow(0 0 1.5rem #9feaf9);
}

.home-view__logo-link:hover .home-view__logo:not(.home-view__logo--electron):not(.home-view__logo--vue):not(.home-view__logo--gf) {
  filter: drop-shadow(0 0 1.5rem #646cffaa);
}

.home-view__logo--vue:hover {
  filter: drop-shadow(0 0 1.5rem #42b883aa);
}

.home-view__logo--gf:hover {
  filter: drop-shadow(0 0 1.5rem #f97316aa);
}

/* ── Card ────────────────────────────────────────────────────── */
.home-view__card {
  width: 100%;
  padding: 0.9rem 1.25rem;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  text-align: center;

  :deep(h1) {
    font-size: 1.25rem;
    color: #111827;
    margin-bottom: 0.4rem;
  }

  :deep(p) {
    color: #374151;
    line-height: 1.5;
    font-size: 0.875rem;
  }

  :deep(.read-the-docs) {
    color: #9ca3af;
    font-size: 0.8125rem;
  }

  :deep(a) {
    color: #2563eb;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }

  :deep(button) {
    background: #2563eb;
    color: #fff;
    border: none;
    border-radius: 0.375rem;
    padding: 0.4rem 1rem;
    font-size: 0.875rem;
    cursor: pointer;
    margin-bottom: 0.5rem;
    transition: background 0.15s;

    &:hover {
      background: #1d4ed8;
    }
  }
}

/* ── Node footer ─────────────────────────────────────────────── */
.home-view__node-row {
  display: flex;
  align-items: center;
  justify-content: center;
}

.home-view__node {
  width: clamp(3rem, 5vw, 4.5rem);
  height: auto;
  opacity: 0.8;
}
</style>
