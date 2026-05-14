<template>
  <div class="rp-view">
    <header class="rp-view__header">
      <h1 class="rp-view__title">
        <Recycle :size="22" class="rp-view__title-icon" aria-hidden="true" />
        Repurposing Sparkplate
      </h1>
      <p class="rp-view__subtitle">
        Turn this repo into your own Electron + Vue app — overview, setup commands, structure, and checklists in one viewport (inner panels scroll).
      </p>
      <p v-if="copyFeedback" class="rp-view__toast" role="status">{{ copyFeedback }}</p>
    </header>

    <Separator class="rp-view__separator" />

    <section class="rp-view__section" aria-label="Repurposing guide">
      <TabsRoot v-model="activeSection" class="rp-tabs">
        <TabsList class="rp-tabs__list" aria-label="Guide sections">
          <TabsTrigger value="overview" class="rp-tabs__trigger">
            <Sparkles :size="14" class="rp-tabs__icon" aria-hidden="true" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="setup" class="rp-tabs__trigger">
            <Rocket :size="14" class="rp-tabs__icon" aria-hidden="true" />
            Setup
          </TabsTrigger>
          <TabsTrigger value="structure" class="rp-tabs__trigger">
            <FolderTree :size="14" class="rp-tabs__icon" aria-hidden="true" />
            Structure
          </TabsTrigger>
          <TabsTrigger value="customize" class="rp-tabs__trigger">
            <SlidersHorizontal :size="14" class="rp-tabs__icon" aria-hidden="true" />
            Customize
          </TabsTrigger>
          <TabsTrigger value="practices" class="rp-tabs__trigger">
            <ShieldCheck :size="14" class="rp-tabs__icon" aria-hidden="true" />
            Practices
          </TabsTrigger>
        </TabsList>

        <div class="rp-panel-shell">
          <TabsContent value="overview" class="rp-tabs__panel">
            <div class="rp-scroll rp-scroll--pad">
              <div class="rp-highlight-grid">
                <div class="rp-highlight">
                  <div class="rp-highlight__icon" aria-hidden="true">
                    <CircleCheck :size="28" stroke-width="1.75" />
                  </div>
                  <h3 class="rp-highlight__title">Quick start</h3>
                  <p class="rp-highlight__text">Clone, install, and run in minutes.</p>
                </div>
                <div class="rp-highlight">
                  <div class="rp-highlight__icon" aria-hidden="true">
                    <Puzzle :size="28" stroke-width="1.75" />
                  </div>
                  <h3 class="rp-highlight__title">Modular design</h3>
                  <p class="rp-highlight__text">Remove what you don’t need; add what you do.</p>
                </div>
                <div class="rp-highlight">
                  <div class="rp-highlight__icon" aria-hidden="true">
                    <UsersRound :size="28" stroke-width="1.75" />
                  </div>
                  <h3 class="rp-highlight__title">Community</h3>
                  <p class="rp-highlight__text">Built as a sane base for real apps.</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="setup" class="rp-tabs__panel">
            <div class="rp-scroll rp-scroll--pad">
              <ol class="rp-steps">
                <li class="rp-step">
                  <span class="rp-step__num">1</span>
                  <div class="rp-step__body">
                    <h3 class="rp-step__title">Clone the repository</h3>
                    <p class="rp-step__desc">Copy the template into a new folder.</p>
                    <div class="rp-code" role="group" aria-label="Clone command">
                      <span class="rp-code__prompt" aria-hidden="true">$</span>
                      <code class="rp-code__text">{{ cloneCmd }}</code>
                      <button
                        type="button"
                        class="rp-code__copy"
                        :data-copied="copiedCmd === cloneCmd ? 'true' : 'false'"
                        :title="copiedCmd === cloneCmd ? 'Copied' : 'Copy command'"
                        @click="copyToClipboard(cloneCmd)"
                      >
                        <component
                          :is="copiedCmd === cloneCmd ? Check : Copy"
                          :size="14"
                          aria-hidden="true"
                        />
                        <span class="rp-code__copy-label">
                          {{ copiedCmd === cloneCmd ? 'Copied' : 'Copy' }}
                        </span>
                      </button>
                    </div>
                  </div>
                </li>
                <li class="rp-step">
                  <span class="rp-step__num">2</span>
                  <div class="rp-step__body">
                    <h3 class="rp-step__title">Install dependencies</h3>
                    <p class="rp-step__desc">From the project root.</p>
                    <div class="rp-code" role="group" aria-label="Install command">
                      <span class="rp-code__prompt" aria-hidden="true">$</span>
                      <code class="rp-code__text">{{ installCmd }}</code>
                      <button
                        type="button"
                        class="rp-code__copy"
                        :data-copied="copiedCmd === installCmd ? 'true' : 'false'"
                        :title="copiedCmd === installCmd ? 'Copied' : 'Copy command'"
                        @click="copyToClipboard(installCmd)"
                      >
                        <component
                          :is="copiedCmd === installCmd ? Check : Copy"
                          :size="14"
                          aria-hidden="true"
                        />
                        <span class="rp-code__copy-label">
                          {{ copiedCmd === installCmd ? 'Copied' : 'Copy' }}
                        </span>
                      </button>
                    </div>
                  </div>
                </li>
                <li class="rp-step">
                  <span class="rp-step__num">3</span>
                  <div class="rp-step__body">
                    <h3 class="rp-step__title">Customize your app</h3>
                    <p class="rp-step__desc">Metadata, branding, and entry points.</p>
                    <div class="rp-mini-grid">
                      <div class="rp-mini-card">
                        <strong>package.json</strong>
                        <span>Name, description, author</span>
                      </div>
                      <div class="rp-mini-card">
                        <strong>App title</strong>
                        <span><code class="rp-inline-code">index.html</code></span>
                      </div>
                      <div class="rp-mini-card">
                        <strong>Icons</strong>
                        <span><code class="rp-inline-code">public/assets/icons</code></span>
                      </div>
                      <div class="rp-mini-card">
                        <strong>Views</strong>
                        <span><code class="rp-inline-code">src/views</code></span>
                      </div>
                    </div>
                  </div>
                </li>
                <li class="rp-step">
                  <span class="rp-step__num">4</span>
                  <div class="rp-step__body">
                    <h3 class="rp-step__title">Start development</h3>
                    <p class="rp-step__desc">Launch the Vite + Electron dev loop.</p>
                    <div class="rp-code" role="group" aria-label="Dev command">
                      <span class="rp-code__prompt" aria-hidden="true">$</span>
                      <code class="rp-code__text">{{ devCmd }}</code>
                      <button
                        type="button"
                        class="rp-code__copy"
                        :data-copied="copiedCmd === devCmd ? 'true' : 'false'"
                        :title="copiedCmd === devCmd ? 'Copied' : 'Copy command'"
                        @click="copyToClipboard(devCmd)"
                      >
                        <component
                          :is="copiedCmd === devCmd ? Check : Copy"
                          :size="14"
                          aria-hidden="true"
                        />
                        <span class="rp-code__copy-label">
                          {{ copiedCmd === devCmd ? 'Copied' : 'Copy' }}
                        </span>
                      </button>
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </TabsContent>

          <TabsContent value="structure" class="rp-tabs__panel">
            <div class="rp-scroll rp-scroll--pad">
              <div class="rp-split">
                <div class="rp-card-block">
                  <h2 class="rp-card-block__title">Project structure</h2>
                  <div class="rp-file-tree">
                    <div class="rp-file rp-file--folder">
                      <Folder :size="14" class="rp-file__ic" aria-hidden="true" />
                      <span class="rp-file__name">src/</span>
                    </div>
                    <div class="rp-file rp-file--nested">
                      <FileCode :size="14" class="rp-file__ic" aria-hidden="true" />
                      <span class="rp-file__name">App.vue</span>
                      <span class="rp-file__hint">Root shell</span>
                    </div>
                    <div class="rp-file rp-file--nested">
                      <FileCode :size="14" class="rp-file__ic" aria-hidden="true" />
                      <span class="rp-file__name">main.ts</span>
                      <span class="rp-file__hint">Renderer entry</span>
                    </div>
                    <div class="rp-file rp-file--nested rp-file--folder">
                      <Folder :size="14" class="rp-file__ic" aria-hidden="true" />
                      <span class="rp-file__name">views/</span>
                      <span class="rp-file__hint">Pages</span>
                    </div>
                    <div class="rp-file rp-file--nested rp-file--folder">
                      <Folder :size="14" class="rp-file__ic" aria-hidden="true" />
                      <span class="rp-file__name">components/</span>
                      <span class="rp-file__hint">UI pieces</span>
                    </div>
                    <div class="rp-file rp-file--nested rp-file--folder">
                      <Folder :size="14" class="rp-file__ic" aria-hidden="true" />
                      <span class="rp-file__name">router/</span>
                      <span class="rp-file__hint">Routes</span>
                    </div>
                    <div class="rp-file rp-file--folder">
                      <Folder :size="14" class="rp-file__ic" aria-hidden="true" />
                      <span class="rp-file__name">background/</span>
                      <span class="rp-file__hint">Electron main</span>
                    </div>
                    <div class="rp-file rp-file--folder">
                      <Folder :size="14" class="rp-file__ic" aria-hidden="true" />
                      <span class="rp-file__name">public/</span>
                      <span class="rp-file__hint">Static assets</span>
                    </div>
                  </div>
                </div>
                <div class="rp-card-block">
                  <h2 class="rp-card-block__title">Configuration files</h2>
                  <ul class="rp-config-list">
                    <li v-for="c in configFiles" :key="c.name" class="rp-config">
                      <div>
                        <h4 class="rp-config__name">{{ c.name }}</h4>
                        <p class="rp-config__desc">{{ c.desc }}</p>
                      </div>
                      <span class="rp-pill" :data-level="c.level">{{ c.levelLabel }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="customize" class="rp-tabs__panel">
            <div class="rp-customize">
              <TabsRoot v-model="activeCustomizeTab" class="rp-inner-tabs">
                <TabsList class="rp-inner-tabs__list" aria-label="Customization topics">
                  <TabsTrigger
                    v-for="tab in customizationTabs"
                    :key="tab.id"
                    :value="tab.id"
                    class="rp-inner-tabs__trigger"
                  >
                    {{ tab.title }}
                  </TabsTrigger>
                </TabsList>
                <div class="rp-inner-tabs__body">
                  <TabsContent value="branding" class="rp-inner-tabs__panel">
                    <h3 class="rp-panel-h">Branding &amp; identity</h3>
                    <ul class="rp-checklist">
                      <li v-for="item in lists.branding" :key="item">{{ item }}</li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="features" class="rp-inner-tabs__panel">
                    <h3 class="rp-panel-h">Feature changes</h3>
                    <ul class="rp-checklist">
                      <li v-for="item in lists.features" :key="item">{{ item }}</li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="dependencies" class="rp-inner-tabs__panel">
                    <h3 class="rp-panel-h">Dependencies</h3>
                    <ul class="rp-checklist">
                      <li v-for="item in lists.dependencies" :key="item">{{ item }}</li>
                    </ul>
                  </TabsContent>
                  <TabsContent value="deployment" class="rp-inner-tabs__panel">
                    <h3 class="rp-panel-h">Deployment</h3>
                    <ul class="rp-checklist">
                      <li v-for="item in lists.deployment" :key="item">{{ item }}</li>
                    </ul>
                  </TabsContent>
                </div>
              </TabsRoot>
            </div>
          </TabsContent>

          <TabsContent value="practices" class="rp-tabs__panel">
            <div class="rp-scroll rp-scroll--pad">
              <div class="rp-practices">
                <div v-for="p in practices" :key="p.title" class="rp-practice">
                  <h4 class="rp-practice__title">{{ p.title }}</h4>
                  <p class="rp-practice__text">{{ p.body }}</p>
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
import { ref, onUnmounted } from 'vue'
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
} from 'radix-vue'
import {
  Recycle,
  Sparkles,
  Rocket,
  FolderTree,
  SlidersHorizontal,
  ShieldCheck,
  CircleCheck,
  Puzzle,
  UsersRound,
  Copy,
  Check,
  Folder,
  FileCode,
} from 'lucide-vue-next'

defineOptions({ name: 'RepurposingPage' })

const activeSection = ref('overview')
const activeCustomizeTab = ref<'branding' | 'features' | 'dependencies' | 'deployment'>('branding')

const customizationTabs = [
  { id: 'branding' as const, title: 'Branding' },
  { id: 'features' as const, title: 'Features' },
  { id: 'dependencies' as const, title: 'Dependencies' },
  { id: 'deployment' as const, title: 'Deployment' },
]

const cloneCmd = 'git clone https://github.com/greenfire-io/sparkplate-fresh.git my-app'
const installCmd = 'cd my-app && npm install'
const devCmd = 'npm run dev'

const configFiles = [
  { name: 'package.json', desc: 'Dependencies, scripts, app metadata', level: 'high' as const, levelLabel: 'Critical' },
  { name: 'electron-builder.json5', desc: 'Build & packaging', level: 'medium' as const, levelLabel: 'Important' },
  { name: 'vite.config.ts', desc: 'Vite build setup', level: 'medium' as const, levelLabel: 'Important' },
  { name: 'tailwind.config.js', desc: 'Tailwind (if used)', level: 'low' as const, levelLabel: 'Optional' },
]

const lists = {
  branding: [
    'Update app name in package.json',
    'Replace icons under public/assets/icons/',
    'Change document title in index.html',
    'Adjust Electron window options in background/',
    'Tune global styles (e.g. style.css / Tailwind)',
  ],
  features: [
    'Remove views you do not need',
    'Add routes in src/router',
    'Add pages under src/views/',
    'Update NavBar / SideNav for your IA',
    'Add helpers under src/lib or composables/',
  ],
  dependencies: [
    'Prune unused packages from package.json',
    'Add libraries for your product',
    'Fix imports after dependency changes',
    'Align tooling with Vite + Electron constraints',
    'Smoke-test production build',
  ],
  deployment: [
    'Target OS/arch in electron-builder',
    'Code signing when you ship',
    'Auto-update if you need it',
    'CI/CD for repeatable releases',
    'Distribution channel (GitHub Releases, etc.)',
  ],
}

const practices = [
  { title: 'Version control', body: 'Start a fresh git history and commit early, often.' },
  { title: 'Documentation', body: 'Rewrite README for your product, not the template.' },
  { title: 'Testing', body: 'Add tests around the behaviors you care about.' },
  { title: 'Security', body: 'Review preload exposure, IPC, and dependency hygiene.' },
]

const copyFeedback = ref('')
const copiedCmd = ref('')
let copyTimer: ReturnType<typeof setTimeout> | null = null

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    copyFeedback.value = 'Copied to clipboard.'
    copiedCmd.value = text
    if (copyTimer) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => {
      copyFeedback.value = ''
      copiedCmd.value = ''
      copyTimer = null
    }, 1800)
  } catch {
    copyFeedback.value = 'Copy failed — try manually.'
    copiedCmd.value = ''
    if (copyTimer) clearTimeout(copyTimer)
    copyTimer = setTimeout(() => {
      copyFeedback.value = ''
      copyTimer = null
    }, 3200)
  }
}

onUnmounted(() => {
  if (copyTimer) clearTimeout(copyTimer)
})
</script>

<style lang="scss" scoped>
.rp-view {
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

.rp-view__header {
  flex-shrink: 0;
  margin-bottom: 0.5rem;
}

.rp-view__title {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.375rem;
  font-weight: 700;
  margin: 0 0 0.25rem;
}

.rp-view__title-icon {
  flex-shrink: 0;
  color: #4b5563;
}

.rp-view__subtitle {
  margin: 0;
  font-size: 0.8125rem;
  line-height: 1.45;
  color: #6b7280;
  max-width: 46rem;
}

.rp-view__toast {
  margin: 0.4rem 0 0;
  font-size: 0.75rem;
  font-weight: 500;
  color: #059669;
}

.rp-view__separator {
  flex-shrink: 0;
  height: 1px;
  margin: 0 0 0.5rem;
  background: #e5e7eb;
}

.rp-view__section {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  background: #f9fafb;
  overflow: hidden;
}

.rp-tabs {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.rp-tabs__list {
  display: flex;
  flex-shrink: 0;
  flex-wrap: wrap;
  gap: 0.2rem;
  border-bottom: 1px solid #d1d5db;
  padding: 0 0.65rem;
  background: #f9fafb;
}

.rp-tabs__trigger {
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

.rp-tabs__icon {
  flex-shrink: 0;
  opacity: 0.9;
}

.rp-panel-shell {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  background: #fff;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.rp-tabs__panel {
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

.rp-scroll {
  flex: 1;
  min-height: 0;
  overflow: auto;
  -webkit-overflow-scrolling: touch;
}

.rp-scroll--pad {
  padding: 0.65rem 0.85rem 0.85rem;
  box-sizing: border-box;
}

.rp-highlight-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(11rem, 1fr));
  gap: 0.75rem;
}

.rp-highlight {
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  padding: 1rem 1rem 1.1rem;
  background: linear-gradient(180deg, #fafafa 0%, #fff 100%);
  text-align: center;
}

.rp-highlight__icon {
  display: flex;
  justify-content: center;
  margin-bottom: 0.5rem;
  color: #2563eb;
}

.rp-highlight__title {
  margin: 0 0 0.35rem;
  font-size: 0.9375rem;
  font-weight: 600;
}

.rp-highlight__text {
  margin: 0;
  font-size: 0.8125rem;
  color: #6b7280;
  line-height: 1.4;
}

.rp-steps {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.rp-step {
  display: flex;
  gap: 0.85rem;
  align-items: flex-start;
}

.rp-step__num {
  flex-shrink: 0;
  width: 2.25rem;
  height: 2.25rem;
  border-radius: 999px;
  background: #2563eb;
  color: #fff;
  font-weight: 700;
  font-size: 0.9375rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rp-step__body {
  flex: 1;
  min-width: 0;
}

.rp-step__title {
  margin: 0 0 0.2rem;
  font-size: 1rem;
  font-weight: 600;
}

.rp-step__desc {
  margin: 0 0 0.5rem;
  font-size: 0.8125rem;
  color: #6b7280;
}

.rp-code {
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.55rem 0.55rem 0.55rem 1rem;
  background:
    linear-gradient(180deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.9),
    0 1px 2px rgba(15, 23, 42, 0.04);
  font-family: ui-monospace, 'JetBrains Mono', 'Fira Code', 'SFMono-Regular', Menlo, monospace;
  font-size: 0.8125rem;
  transition: border-color 0.18s ease, box-shadow 0.18s ease, transform 0.18s ease;
}

.rp-code::before {
  content: '';
  position: absolute;
  left: 0;
  top: 0.45rem;
  bottom: 0.45rem;
  width: 3px;
  border-radius: 0 2px 2px 0;
  background: linear-gradient(180deg, #2563eb 0%, #6366f1 100%);
  opacity: 0.85;
}

.rp-code:hover {
  border-color: #d1d5db;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.95),
    0 4px 12px -6px rgba(15, 23, 42, 0.14);
}

.rp-code:focus-within {
  border-color: #93c5fd;
  box-shadow:
    inset 0 1px 0 rgba(255, 255, 255, 0.95),
    0 0 0 3px rgba(37, 99, 235, 0.16);
}

.rp-code__prompt {
  flex-shrink: 0;
  color: #94a3b8;
  font-weight: 600;
  user-select: none;
  letter-spacing: 0;
}

.rp-code__text {
  flex: 1;
  min-width: 0;
  color: #0f172a;
  line-height: 1.5;
  letter-spacing: -0.005em;
  word-break: break-all;
}

.rp-code__copy {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  padding: 0.3rem 0.55rem;
  border: 1px solid transparent;
  border-radius: 0.3rem;
  background: transparent;
  color: #6b7280;
  font-size: 0.6875rem;
  font-weight: 600;
  font-family: inherit;
  letter-spacing: 0.02em;
  cursor: pointer;
  transition: background 0.15s, color 0.15s, border-color 0.15s, box-shadow 0.15s;
}

.rp-code__copy:hover {
  background: #ffffff;
  border-color: #e5e7eb;
  color: #2563eb;
  box-shadow: 0 1px 2px rgba(15, 23, 42, 0.06);
}

.rp-code__copy:focus-visible {
  outline: none;
  border-color: #93c5fd;
  color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.18);
}

.rp-code__copy[data-copied='true'] {
  color: #059669;
  border-color: rgba(5, 150, 105, 0.25);
  background: rgba(16, 185, 129, 0.08);
}

.rp-code__copy-label {
  line-height: 1;
}

.rp-mini-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(10rem, 1fr));
  gap: 0.5rem;
}

.rp-mini-card {
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.55rem 0.65rem;
  background: #fafafa;
  font-size: 0.8125rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  border-left: 3px solid #2563eb;

  strong {
    color: #111827;
  }

  span {
    color: #6b7280;
    font-size: 0.75rem;
  }
}

.rp-inline-code {
  font-family: ui-monospace, Menlo, monospace;
  font-size: 0.75em;
  background: #f3f4f6;
  padding: 0.05rem 0.25rem;
  border-radius: 0.2rem;
}

.rp-split {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(14rem, 1fr));
  gap: 1rem;
  align-items: start;
}

.rp-card-block__title {
  margin: 0 0 0.65rem;
  font-size: 1rem;
  font-weight: 600;
}

.rp-file-tree {
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: #fafafa;
  padding: 0.35rem 0.5rem;
  font-size: 0.8125rem;
}

.rp-file {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.35rem 0.25rem;
  border-bottom: 1px solid #f3f4f6;

  &:last-child {
    border-bottom: none;
  }

  &--nested {
    padding-left: 1.25rem;
  }

  &--folder .rp-file__name {
    font-weight: 600;
  }
}

.rp-file__ic {
  flex-shrink: 0;
  color: #6b7280;
}

.rp-file__name {
  color: #111827;
}

.rp-file__hint {
  margin-left: auto;
  font-size: 0.6875rem;
  color: #9ca3af;
}

.rp-config-list {
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.rp-config {
  display: flex;
  gap: 0.65rem;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0.65rem 0.75rem;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: #fafafa;
}

.rp-config__name {
  margin: 0 0 0.2rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.rp-config__desc {
  margin: 0;
  font-size: 0.75rem;
  color: #6b7280;
}

.rp-pill {
  flex-shrink: 0;
  font-size: 0.625rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  padding: 0.2rem 0.45rem;
  border-radius: 999px;

  &[data-level='high'] {
    background: #fee2e2;
    color: #991b1b;
  }

  &[data-level='medium'] {
    background: #fef3c7;
    color: #92400e;
  }

  &[data-level='low'] {
    background: #d1fae5;
    color: #065f46;
  }
}

.rp-customize {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.rp-inner-tabs {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.rp-inner-tabs__list {
  flex-shrink: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 0.15rem;
  padding: 0.5rem 0.65rem 0;
  border-bottom: 1px solid #e5e7eb;
  background: #fafafa;
}

.rp-inner-tabs__trigger {
  padding: 0.4rem 0.75rem;
  border: none;
  border-radius: 0.25rem 0.25rem 0 0;
  background: transparent;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  font-family: inherit;

  &:hover {
    color: #111827;
  }

  &[data-state='active'] {
    color: #2563eb;
    font-weight: 600;
    background: #fff;
    box-shadow: 0 1px 0 #fff;
  }
}

.rp-inner-tabs__body {
  flex: 1;
  min-height: 0;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.rp-inner-tabs__panel {
  flex: 1;
  min-height: 0;
  overflow: auto;
  padding: 0.65rem 0.85rem 0.85rem;
  outline: none;
}

.rp-panel-h {
  margin: 0 0 0.65rem;
  font-size: 0.9375rem;
  font-weight: 600;
}

.rp-checklist {
  margin: 0;
  padding: 0;
  list-style: none;

  li {
    padding: 0.5rem 0;
    border-bottom: 1px solid #f3f4f6;
    font-size: 0.8125rem;
    line-height: 1.45;
    display: flex;
    align-items: flex-start;
    gap: 0.55rem;

    &::before {
      content: '';
      flex-shrink: 0;
      width: 1.25rem;
      height: 1.25rem;
      margin-top: 0.1rem;
      border-radius: 999px;
      background: #10b981;
      mask: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='3'%3E%3Cpath d='M20 6L9 17l-5-5'/%3E%3C/svg%3E") center / 0.7rem no-repeat;
    }

    &:last-child {
      border-bottom: none;
    }
  }
}

.rp-practices {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 0.65rem;
}

.rp-practice {
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  padding: 0.65rem 0.75rem;
  background: #fafafa;
  border-left: 3px solid #2563eb;
}

.rp-practice__title {
  margin: 0 0 0.35rem;
  font-size: 0.875rem;
  font-weight: 600;
}

.rp-practice__text {
  margin: 0;
  font-size: 0.75rem;
  color: #6b7280;
  line-height: 1.45;
}
</style>
