<template>
  <div class="ts-view">
    <header class="ts-view__header">
      <h1 class="ts-view__title">
        <Layers :size="22" class="ts-view__title-icon" aria-hidden="true" />
        Sparkplate techstack
      </h1>
      <p class="ts-view__subtitle">
        Versions for featured packages follow the semver ranges in
        <strong class="ts-view__mono">package.json</strong>
        (app {{ packageLabel }}). Full inventory below is generated from the same file.
      </p>
    </header>

    <Separator class="ts-view__separator" />

    <section class="ts-view__section" aria-label="Technology stack">
      <TabsRoot v-model="activeTab" class="ts-tabs">
        <TabsList class="ts-tabs__list" aria-label="Techstack sections">
          <TabsTrigger value="core" class="ts-tabs__trigger">
            <Cpu :size="14" class="ts-tabs__icon" aria-hidden="true" />
            Core
            <span class="ts-tabs__badge">{{ coreTechnologies.length }}</span>
          </TabsTrigger>
          <TabsTrigger value="tools" class="ts-tabs__trigger">
            <Wrench :size="14" class="ts-tabs__icon" aria-hidden="true" />
            Dev tools
            <span class="ts-tabs__badge ts-tabs__badge--muted">{{ developmentTools.length }}</span>
          </TabsTrigger>
          <TabsTrigger value="libraries" class="ts-tabs__trigger">
            <Library :size="14" class="ts-tabs__icon" aria-hidden="true" />
            Libraries
            <span class="ts-tabs__badge ts-tabs__badge--muted">{{ utilityLibraries.length }}</span>
          </TabsTrigger>
          <TabsTrigger value="packages" class="ts-tabs__trigger">
            <Package :size="14" class="ts-tabs__icon" aria-hidden="true" />
            Packages
            <span class="ts-tabs__badge">{{ allDependencies.length }}</span>
          </TabsTrigger>
        </TabsList>

        <div class="ts-panel-shell">
          <TabsContent value="core" class="ts-tabs__panel">
            <div class="ts-scroll ts-scroll--pad">
              <div class="ts-tech-grid">
                <div
                  v-for="tech in coreTechnologies"
                  :key="tech.name"
                  class="ts-item"
                >
                  <div class="ts-item-icon">
                    <img :src="tech.icon" :alt="tech.name" loading="lazy" />
                  </div>
                  <div class="ts-item-body">
                    <span class="ts-item-name">{{ tech.name }}</span>
                    <span class="ts-item-version">v{{ tech.version }}</span>
                    <p class="ts-item-desc">{{ tech.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="tools" class="ts-tabs__panel">
            <div class="ts-scroll ts-scroll--pad">
              <div class="ts-tech-grid">
                <div
                  v-for="tool in developmentTools"
                  :key="tool.name"
                  class="ts-item"
                >
                  <div class="ts-item-icon">
                    <img :src="tool.icon" :alt="tool.name" loading="lazy" />
                  </div>
                  <div class="ts-item-body">
                    <span class="ts-item-name">{{ tool.name }}</span>
                    <span class="ts-item-version">v{{ tool.version }}</span>
                    <p class="ts-item-desc">{{ tool.description }}</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="libraries" class="ts-tabs__panel">
            <div class="ts-scroll ts-scroll--pad">
              <div class="ts-libs-grid">
                <div
                  v-for="lib in utilityLibraries"
                  :key="lib.name"
                  class="ts-lib-card"
                >
                  <div class="ts-lib-header">
                    <span class="ts-lib-name">{{ lib.name }}</span>
                    <span class="ts-lib-version">v{{ lib.version }}</span>
                  </div>
                  <p class="ts-lib-desc">{{ lib.description }}</p>
                  <div class="ts-lib-tags">
                    <span v-for="tag in lib.tags" :key="tag" class="ts-tag">
                      {{ tag }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="packages" class="ts-tabs__panel">
            <div class="ts-packages">
              <div class="ts-packages__stats">
                <div class="ts-stat">
                  <span class="ts-stat-value">{{ packageStats.total }}</span>
                  <span class="ts-stat-label">Total packages</span>
                </div>
                <div class="ts-stat">
                  <span class="ts-stat-value">{{ packageStats.dependencies }}</span>
                  <span class="ts-stat-label">Dependencies</span>
                </div>
                <div class="ts-stat">
                  <span class="ts-stat-value">{{ packageStats.devDependencies }}</span>
                  <span class="ts-stat-label">Dev dependencies</span>
                </div>
              </div>

              <Separator class="ts-packages__separator" />

              <div class="ts-packages__filter">
                <label class="ts-filter-label" for="ts-dep-filter">Filter</label>
                <input
                  id="ts-dep-filter"
                  v-model="depFilter"
                  type="search"
                  class="ts-filter-input"
                  placeholder="Search package name or version…"
                  autocomplete="off"
                  spellcheck="false"
                />
              </div>

              <h3 class="ts-subsection-title">
                All dependencies
                <span v-if="depFilter.trim()" class="ts-subsection-meta">
                  ({{ filteredDependencies.length }} of {{ allDependencies.length }})
                </span>
              </h3>

              <div class="ts-dep-list-wrap">
                <div class="ts-dep-list">
                  <div
                    v-for="dep in filteredDependencies"
                    :key="dep.name + dep.type"
                    class="ts-dep-item"
                  >
                    <div class="ts-dep-info">
                      <span class="ts-dep-name">{{ dep.name }}</span>
                      <span class="ts-dep-version">{{ dep.version }}</span>
                    </div>
                    <span class="ts-dep-badge" :class="dep.type">
                      {{ dep.type === 'dependency' ? 'Runtime' : 'Development' }}
                    </span>
                  </div>
                  <p v-if="filteredDependencies.length === 0" class="ts-dep-empty">
                    No packages match “{{ depFilter.trim() }}”.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>
        </div>
      </TabsRoot>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
} from 'radix-vue'
import { Layers, Cpu, Wrench, Library, Package } from 'lucide-vue-next'
import packageJson from '../../package.json'

defineOptions({ name: 'Techstack' })

const activeTab = ref<'core' | 'tools' | 'libraries' | 'packages'>('core')
const depFilter = ref('')

const packageLabel = packageJson.version

interface Technology {
  name: string
  version: string
  description: string
  icon: string
}

interface Library {
  name: string
  version: string
  description: string
  tags: string[]
}

interface Dependency {
  name: string
  version: string
  type: 'dependency' | 'devDependency'
}

/** Strip leading range prefix from package.json entries for card display */
function semverLabel(raw: string | undefined): string {
  if (!raw) return '—'
  const t = raw.trim()
  if (t.startsWith('^') || t.startsWith('~')) return t.slice(1)
  return t
}

function pickDeps(map: Record<string, string> | undefined, key: string): string {
  return map?.[key] ?? ''
}

const coreTechnologies = computed<Technology[]>(() => {
  const dev = packageJson.devDependencies
  const dep = packageJson.dependencies
  return [
    {
      name: 'Electron',
      version: semverLabel(pickDeps(dev, 'electron')),
      description: 'Build cross-platform desktop apps with JavaScript, HTML, and CSS',
      icon: '/assets/icons/development/electron.svg',
    },
    {
      name: 'Vue 3',
      version: semverLabel(pickDeps(dep, 'vue')),
      description: 'Progressive JavaScript framework for building user interfaces',
      icon: '/assets/icons/development/vue.svg',
    },
    {
      name: 'Vite',
      version: semverLabel(pickDeps(dev, 'vite')),
      description: 'Fast build tool and development server for modern web projects',
      icon: '/assets/icons/development/vite.svg',
    },
    {
      name: 'TypeScript',
      version: semverLabel(pickDeps(dev, 'typescript')),
      description: 'Typed superset of JavaScript that compiles to plain JavaScript',
      icon: '/assets/icons/development/typescript.svg',
    },
  ]
})

const developmentTools = computed<Technology[]>(() => {
  const dev = packageJson.devDependencies
  const dep = packageJson.dependencies
  return [
    {
      name: 'Electron Builder',
      version: semverLabel(pickDeps(dev, 'electron-builder')),
      description: 'Complete solution to package and build Electron apps',
      icon: '/assets/icons/development/electronbuilder.svg',
    },
    {
      name: 'Tailwind CSS',
      version: semverLabel(pickDeps(dev, 'tailwindcss')),
      description: 'Utility-first CSS framework for rapid UI development',
      icon: '/assets/icons/development/tailwindcss.svg',
    },
    {
      name: 'PostCSS',
      version: semverLabel(pickDeps(dev, 'postcss')),
      description: 'Tool for transforming CSS with JavaScript',
      icon: '/assets/icons/development/postcss.svg',
    },
    {
      name: 'Sass',
      version: semverLabel(pickDeps(dep, 'sass')),
      description: 'Stylesheet preprocessor (runtime) + sass-embedded in dev for builds',
      icon: '/assets/icons/development/sass.svg',
    },
  ]
})

const utilityLibraries = computed<Library[]>(() => {
  const dep = packageJson.dependencies
  return [
    {
      name: 'Vue Router',
      version: semverLabel(pickDeps(dep, 'vue-router')),
      description: 'Official router for Vue.js applications',
      tags: ['routing', 'navigation', 'SPA'],
    },
    {
      name: 'Radix Vue',
      version: semverLabel(pickDeps(dep, 'radix-vue')),
      description: 'Unstyled, accessible components for building design systems',
      tags: ['UI', 'accessibility', 'components'],
    },
    {
      name: 'CryptoJS',
      version: semverLabel(pickDeps(dep, 'crypto-js')),
      description: 'JavaScript library of crypto standards',
      tags: ['encryption', 'hashing', 'security'],
    },
    {
      name: 'BigNumber.js',
      version: semverLabel(pickDeps(dep, 'bignumber.js')),
      description: 'Arbitrary precision decimal arithmetic',
      tags: ['math', 'precision', 'numbers'],
    },
    {
      name: 'Lucide Vue Next',
      version: semverLabel(pickDeps(dep, 'lucide-vue-next')),
      description: 'Beautiful & consistent icon toolkit made by the Lucide team',
      tags: ['icons', 'UI', 'components'],
    },
    {
      name: 'TanStack Vue Table',
      version: semverLabel(pickDeps(dep, '@tanstack/vue-table')),
      description: 'Headless table utilities for Vue',
      tags: ['tables', 'data', 'UI'],
    },
    {
      name: 'Currency Codes',
      version: semverLabel(pickDeps(dep, 'currency-codes')),
      description: 'ISO 4217 currency codes list',
      tags: ['currency', 'finance', 'internationalization'],
    },
    {
      name: 'PapaParse',
      version: semverLabel(pickDeps(dep, 'papaparse')),
      description: 'CSV parser and stringifier for the browser and Node',
      tags: ['csv', 'parse', 'import'],
    },
    {
      name: 'SheetJS (xlsx)',
      version: semverLabel(pickDeps(dep, 'xlsx')),
      description: 'Spreadsheet read/write for Excel and related workbook formats',
      tags: ['xlsx', 'export', 'tabular'],
    },
  ]
})

function buildDependencyList(): Dependency[] {
  const out: Dependency[] = []
  const deps = packageJson.dependencies ?? {}
  const devDeps = packageJson.devDependencies ?? {}
  for (const [name, version] of Object.entries(deps)) {
    out.push({ name, version: String(version), type: 'dependency' })
  }
  for (const [name, version] of Object.entries(devDeps)) {
    out.push({ name, version: String(version), type: 'devDependency' })
  }
  out.sort((a, b) => a.name.localeCompare(b.name))
  return out
}

const allDependencies = computed(() => buildDependencyList())

const packageStats = computed(() => {
  const list = allDependencies.value
  const dependencies = list.filter((d) => d.type === 'dependency').length
  const devDependencies = list.filter((d) => d.type === 'devDependency').length
  return {
    total: list.length,
    dependencies,
    devDependencies,
  }
})

const filteredDependencies = computed(() => {
  const q = depFilter.value.trim().toLowerCase()
  if (!q) return allDependencies.value
  return allDependencies.value.filter(
    (d) =>
      d.name.toLowerCase().includes(q) ||
      d.version.toLowerCase().includes(q)
  )
})
</script>

<style lang="scss" scoped>
.ts-view {
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  min-height: 0;
  padding: 0.75rem 1.25rem 0.75rem;
  box-sizing: border-box;
  background: #fff;
  font-family: inherit;
  color: #111827;
}

.ts-view__header {
  flex-shrink: 0;
  margin-bottom: 0.5rem;
}

.ts-view__title {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.375rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
}

.ts-view__title-icon {
  flex-shrink: 0;
  color: #4b5563;
}

.ts-view__subtitle {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.45;
  color: #6b7280;
  max-width: 44rem;
}

.ts-view__mono {
  font-family: ui-monospace, 'Cascadia Code', monospace;
  font-size: 0.95em;
  font-weight: 600;
  color: #374151;
}

.ts-view__separator {
  flex-shrink: 0;
  height: 1px;
  margin: 0 0 0.5rem;
  background: #e5e7eb;
}

.ts-view__section {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: #f9fafb;
  overflow: hidden;
}

.ts-tabs {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.ts-tabs__list {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: 0.2rem;
  border-bottom: 1px solid #d1d5db;
  padding: 0 0.65rem;
  background: #f9fafb;
}

.ts-tabs__trigger {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.55rem 0.75rem;
  border: none;
  background: none;
  font-size: 0.8125rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  font-family: inherit;
  transition: color 0.15s;

  &:hover {
    color: #111827;
  }

  &[data-state='active'] {
    color: #2563eb;
    font-weight: 600;

    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      right: 0;
      height: 2px;
      background: #2563eb;
      border-radius: 1px;
    }
  }
}

.ts-tabs__icon {
  flex-shrink: 0;
  opacity: 0.9;
}

.ts-tabs__badge {
  margin-left: 0.15rem;
  padding: 0.05rem 0.4rem;
  border-radius: 999px;
  font-size: 0.625rem;
  font-weight: 700;
  background: #dbeafe;
  color: #1d4ed8;
  line-height: 1.4;

  &--muted {
    background: #e5e7eb;
    color: #4b5563;
  }
}

.ts-panel-shell {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.ts-tabs__panel {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  outline: none;

  &:focus-visible {
    box-shadow: inset 0 0 0 2px rgba(37, 99, 235, 0.35);
  }
}

.ts-scroll {
  flex: 1;
  min-height: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.ts-scroll--pad {
  padding: 0.65rem 0.85rem 0.85rem;
  box-sizing: border-box;
}

.ts-tech-grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1fr;
}

@media (min-width: 40rem) {
  .ts-tech-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.ts-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: #fafafa;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
}

.ts-item-icon {
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.ts-item-body {
  flex: 1;
  min-width: 0;
}

.ts-item-name {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.125rem;
}

.ts-item-version {
  display: block;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.ts-item-desc {
  font-size: 0.8125rem;
  color: #6b7280;
  line-height: 1.4;
  margin: 0;
}

.ts-libs-grid {
  display: grid;
  gap: 0.75rem;
  grid-template-columns: 1fr;
}

@media (min-width: 36rem) {
  .ts-libs-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 56rem) {
  .ts-libs-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.ts-lib-card {
  padding: 1rem;
  background: #fafafa;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
}

.ts-lib-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.ts-lib-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
}

.ts-lib-version {
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  background: #eff6ff;
  color: #1d4ed8;
  border-radius: 0.25rem;
  font-weight: 500;
  flex-shrink: 0;
}

.ts-lib-desc {
  font-size: 0.8125rem;
  color: #6b7280;
  line-height: 1.4;
  margin: 0 0 0.75rem;
}

.ts-lib-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.ts-tag {
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  background: #f3f4f6;
  color: #374151;
  border-radius: 0.25rem;
}

.ts-packages {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  padding: 0.65rem 0.85rem 0.85rem;
  box-sizing: border-box;
  overflow: hidden;
}

.ts-packages__stats {
  flex-shrink: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.ts-stat {
  padding: 0.85rem 0.5rem;
  text-align: center;
  background: #fafafa;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
}

.ts-stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.25rem;
}

.ts-stat-label {
  font-size: 0.6875rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.ts-packages__separator {
  flex-shrink: 0;
  height: 1px;
  margin: 0.65rem 0 0.5rem;
  background: #e5e7eb;
}

.ts-packages__filter {
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 0.35rem;
  margin-bottom: 0.5rem;
}

.ts-filter-label {
  font-size: 0.75rem;
  font-weight: 600;
  color: #374151;
}

.ts-filter-input {
  width: 100%;
  max-width: 28rem;
  padding: 0.45rem 0.65rem;
  font-size: 0.8125rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  font-family: inherit;
  background: #fff;

  &::placeholder {
    color: #9ca3af;
  }

  &:focus {
    outline: none;
    border-color: #2563eb;
    box-shadow: 0 0 0 1px rgba(37, 99, 235, 0.25);
  }
}

.ts-subsection-title {
  flex-shrink: 0;
  font-size: 0.8125rem;
  font-weight: 600;
  color: #374151;
  margin: 0 0 0.45rem;
}

.ts-subsection-meta {
  font-weight: 500;
  color: #6b7280;
}

.ts-dep-list-wrap {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.ts-dep-list {
  flex: 1;
  min-height: 0;
  overflow: auto;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: #fafafa;
  -webkit-overflow-scrolling: touch;
}

.ts-dep-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 0.85rem;
  border-bottom: 1px solid #f3f4f6;
  background: #fff;

  &:last-child {
    border-bottom: none;
  }
}

.ts-dep-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
  min-width: 0;
}

.ts-dep-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
  word-break: break-word;
}

.ts-dep-version {
  font-size: 0.75rem;
  color: #6b7280;
  font-family: ui-monospace, monospace;
}

.ts-dep-badge {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  flex-shrink: 0;

  &.dependency {
    background: #d1fae5;
    color: #065f46;
  }

  &.devDependency {
    background: #dbeafe;
    color: #1e40af;
  }
}

.ts-dep-empty {
  margin: 0;
  padding: 1.25rem 1rem;
  text-align: center;
  font-size: 0.8125rem;
  color: #6b7280;
}
</style>
