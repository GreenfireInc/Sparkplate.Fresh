<template>
  <div class="kf-view">
    <header class="kf-view__header">
      <h1 class="kf-view__title">
        <FileText :size="22" class="kf-view__title-icon" aria-hidden="true" />
        Key Files
      </h1>
      <p class="kf-view__subtitle">
        Reference map of important project paths — Electron main, Vue renderer, and static assets.
      </p>
    </header>

    <div class="kf-view__brand">
      <img
        src="/assets/icons/greenfire/sparkplate.svg"
        class="kf-view__logo"
        alt="Sparkplate logo"
      />
    </div>

    <Separator class="kf-view__separator" />

    <section class="kf-view__section" aria-label="Key files and folders">
      <TabsRoot v-model="activeTab" class="kf-tabs">
        <TabsList class="kf-tabs__list" aria-label="Path categories">
          <TabsTrigger value="files" class="kf-tabs__trigger">
            <FileText :size="14" class="kf-tabs__icon" aria-hidden="true" />
            Files
          </TabsTrigger>
          <TabsTrigger value="folders" class="kf-tabs__trigger">
            <FolderOpen :size="14" class="kf-tabs__icon" aria-hidden="true" />
            Folders
          </TabsTrigger>
        </TabsList>

        <div class="kf-table-shell">
          <div class="kf-scroll-area">
            <TabsContent value="files" class="kf-tabs__panel">
              <table class="kf-table">
                <thead>
                  <tr>
                    <th scope="col" class="kf-table__th kf-table__th--num">No.</th>
                    <th scope="col" class="kf-table__th">File</th>
                    <th scope="col" class="kf-table__th">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in fileRows" :key="'f-' + row.no" class="kf-table__row">
                    <td class="kf-table__td kf-table__td--num">{{ row.no }}</td>
                    <td class="kf-table__td kf-table__td--mono">{{ row.path }}</td>
                    <td class="kf-table__td">{{ row.description }}</td>
                  </tr>
                </tbody>
              </table>
            </TabsContent>

            <TabsContent value="folders" class="kf-tabs__panel">
              <table class="kf-table">
                <thead>
                  <tr>
                    <th scope="col" class="kf-table__th kf-table__th--num">No.</th>
                    <th scope="col" class="kf-table__th">Folder</th>
                    <th scope="col" class="kf-table__th">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="row in folderRows" :key="'d-' + row.no" class="kf-table__row">
                    <td class="kf-table__td kf-table__td--num">{{ row.no }}</td>
                    <td class="kf-table__td kf-table__td--mono">{{ row.path }}</td>
                    <td class="kf-table__td">{{ row.description }}</td>
                  </tr>
                </tbody>
              </table>
            </TabsContent>
          </div>
        </div>
      </TabsRoot>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  TabsRoot,
  TabsList,
  TabsTrigger,
  TabsContent,
  Separator,
} from 'radix-vue'
import { FileText, FolderOpen } from 'lucide-vue-next'

defineOptions({ name: 'KeyFilesPage' })

interface PathRow {
  no: number
  path: string
  description: string
}

const activeTab = ref('files')

const fileRows: PathRow[] = [
  { no: 1, path: './electron-builder.json5', description: 'Electron build configuration' },
  { no: 2, path: './index.html', description: 'Main HTML entry point' },
  { no: 3, path: './package.json', description: 'Project dependencies and scripts' },
  { no: 4, path: './background/index.js', description: 'Electron background process entrypoint' },
  { no: 5, path: './src/main.ts', description: 'Vue renderer entrypoint' },
  { no: 6, path: './src/App.vue', description: 'Main application component' },
  { no: 7, path: './src/components/global/NavBar.vue', description: 'Top navigation header component' },
  { no: 8, path: './src/components/global/SideNav.vue', description: 'Side navigation component' },
]

const folderRows: PathRow[] = [
  { no: 1, path: './background', description: 'Electron main process code' },
  { no: 2, path: './dist_electron', description: 'Output folder for Electron Builder' },
  { no: 3, path: './docs', description: 'Project documentation (progress reports and notes)' },
  { no: 4, path: './public', description: 'Static assets directory' },
  { no: 5, path: './.rules', description: 'Project documentation and configuration rules' },
  { no: 6, path: './src/views', description: 'View components (pages)' },
  { no: 7, path: './src/composables', description: 'Vue Composition API utilities' },
  { no: 8, path: './src/router', description: 'Vue Router configuration' },
]
</script>

<style lang="scss" scoped>
.kf-view {
  width: 100%;
  height: 100%;
  padding: 1.5rem 2rem 1.5rem;
  box-sizing: border-box;
  background: #fff;
  font-family: inherit;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

.kf-view__header {
  margin-bottom: 1rem;
  flex-shrink: 0;
}

.kf-view__title {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin: 0 0 0.35rem;
}

.kf-view__title-icon {
  flex-shrink: 0;
  color: #4b5563;
}

.kf-view__subtitle {
  margin: 0;
  font-size: 0.9375rem;
  line-height: 1.5;
  color: #6b7280;
  max-width: 42rem;
}

.kf-view__brand {
  display: flex;
  justify-content: center;
  margin: 0.75rem 0 1rem;
  flex-shrink: 0;
}

.kf-view__logo {
  width: 90px;
  height: auto;
  filter: drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1));
}

.kf-view__separator {
  display: block;
  height: 1px;
  margin: 0 0 1.25rem;
  background: #e5e7eb;
  flex-shrink: 0;
}

.kf-view__section {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: hidden;
}

.kf-tabs {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
}

.kf-tabs__list {
  display: flex;
  flex-shrink: 0;
  gap: 0.25rem;
  border-bottom: 1px solid #d1d5db;
  padding: 0 1rem;
  background: #f9fafb;
}

.kf-tabs__trigger {
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  padding: 0.65rem 1rem;
  border: none;
  background: none;
  font-size: 0.9375rem;
  font-weight: 500;
  color: #6b7280;
  cursor: pointer;
  transition: color 0.15s;
  font-family: inherit;

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

.kf-tabs__icon {
  flex-shrink: 0;
  opacity: 0.9;
}

.kf-table-shell {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  background: #fff;
  border-radius: 0;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}

.kf-scroll-area {
  flex: 1;
  min-height: 0;
  overflow: auto;
}

.kf-tabs__panel {
  padding: 0;
  outline: none;

  &:focus-visible {
    box-shadow: inset 0 0 0 2px rgba(37, 99, 235, 0.35);
  }
}

.kf-table {
  width: 100%;
  border-collapse: collapse;
}

.kf-table__th {
  padding: 0.35rem 1rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 600;
  color: #4b5563;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  white-space: nowrap;
  border-bottom: 1px solid #e5e7eb;
  background: #f3f4f6;
  position: sticky;
  top: 0;
  z-index: 1;
}

.kf-table__th--num {
  width: 3.5rem;
  text-align: center;
}

.kf-table__row:hover .kf-table__td {
  background: #f9fafb;
}

.kf-table__td {
  padding: 0.5rem 1rem;
  text-align: left;
  font-size: 0.875rem;
  color: #374151;
  border-bottom: 1px solid #e5e7eb;
  vertical-align: top;
}

.kf-table__td--num {
  width: 3.5rem;
  text-align: center;
  color: #6b7280;
  font-variant-numeric: tabular-nums;
}

.kf-table__td--mono {
  font-family: ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, monospace;
  font-size: 0.8125rem;
  word-break: break-all;
  max-width: 28rem;
}
</style>
