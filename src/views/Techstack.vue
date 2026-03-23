<template>
  <div class="view techstack">
    <h1 class="techstack-title">Sparkplate Techstack</h1>
    <p class="techstack-subtitle">
      The powerful technologies that drive Sparkplate development
    </p>

    <div class="techstack-layout">
      <!-- Core Technologies -->
      <div class="techstack-section">
        <h2 class="techstack-section-title">Core Technologies</h2>
        <div class="techstack-section-content">
          <div
            v-for="tech in coreTechnologies"
            :key="tech.name"
            class="techstack-item"
          >
            <div class="techstack-item-icon">
              <img :src="tech.icon" :alt="tech.name" />
            </div>
            <div class="techstack-item-body">
              <span class="techstack-item-name">{{ tech.name }}</span>
              <span class="techstack-item-version">v{{ tech.version }}</span>
              <p class="techstack-item-desc">{{ tech.description }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Development Tools -->
      <div class="techstack-section">
        <h2 class="techstack-section-title">Development Tools</h2>
        <div class="techstack-section-content">
          <div
            v-for="tool in developmentTools"
            :key="tool.name"
            class="techstack-item"
          >
            <div class="techstack-item-icon">
              <img :src="tool.icon" :alt="tool.name" />
            </div>
            <div class="techstack-item-body">
              <span class="techstack-item-name">{{ tool.name }}</span>
              <span class="techstack-item-version">v{{ tool.version }}</span>
              <p class="techstack-item-desc">{{ tool.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Utility Libraries -->
    <div class="techstack-section">
      <h2 class="techstack-section-title">Utility Libraries</h2>
      <div class="techstack-section-content techstack-libs-grid">
        <div
          v-for="lib in utilityLibraries"
          :key="lib.name"
          class="techstack-lib-card"
        >
          <div class="techstack-lib-header">
            <span class="techstack-lib-name">{{ lib.name }}</span>
            <span class="techstack-lib-version">v{{ lib.version }}</span>
          </div>
          <p class="techstack-lib-desc">{{ lib.description }}</p>
          <div class="techstack-lib-tags">
            <span v-for="tag in lib.tags" :key="tag" class="techstack-tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- Package Statistics -->
    <div class="techstack-section">
      <h2 class="techstack-section-title">Package Statistics</h2>
      <div class="techstack-section-content">
        <div class="techstack-stats-grid">
          <div class="techstack-stat">
            <span class="techstack-stat-value">{{ packageStats.total }}</span>
            <span class="techstack-stat-label">Total Packages</span>
          </div>
          <div class="techstack-stat">
            <span class="techstack-stat-value">{{ packageStats.dependencies }}</span>
            <span class="techstack-stat-label">Dependencies</span>
          </div>
          <div class="techstack-stat">
            <span class="techstack-stat-value">{{ packageStats.devDependencies }}</span>
            <span class="techstack-stat-label">Dev Dependencies</span>
          </div>
        </div>

        <Separator class="techstack-separator" />

        <h3 class="techstack-subsection-title">All Dependencies</h3>
        <div class="techstack-dep-list">
          <div
            v-for="dep in allDependencies"
            :key="dep.name"
            class="techstack-dep-item"
          >
            <div class="techstack-dep-info">
              <span class="techstack-dep-name">{{ dep.name }}</span>
              <span class="techstack-dep-version">{{ dep.version }}</span>
            </div>
            <span class="techstack-dep-badge" :class="dep.type">
              {{ dep.type === 'dependency' ? 'Runtime' : 'Development' }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Separator } from 'radix-vue'

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

const coreTechnologies = ref<Technology[]>([
  {
    name: 'Electron',
    version: '37.1.0',
    description: 'Build cross-platform desktop apps with JavaScript, HTML, and CSS',
    icon: '/assets/icons/development/electron.svg'
  },
  {
    name: 'Vue 3',
    version: '3.5.22',
    description: 'Progressive JavaScript framework for building user interfaces',
    icon: '/assets/icons/development/vue.svg'
  },
  {
    name: 'Vite',
    version: '6.0.0',
    description: 'Fast build tool and development server for modern web projects',
    icon: '/assets/icons/development/vite.svg'
  },
  {
    name: 'TypeScript',
    version: '5.4.2',
    description: 'Typed superset of JavaScript that compiles to plain JavaScript',
    icon: '/assets/icons/development/typescript.svg'
  }
])

const developmentTools = ref<Technology[]>([
  {
    name: 'Electron Builder',
    version: '26.0.12',
    description: 'Complete solution to package and build Electron apps',
    icon: '/assets/icons/development/electronbuilder.svg'
  },
  {
    name: 'Tailwind CSS',
    version: '4.1.7',
    description: 'Utility-first CSS framework for rapid UI development',
    icon: '/assets/icons/development/tailwindcss.svg'
  },
  {
    name: 'PostCSS',
    version: '8.5.3',
    description: 'Tool for transforming CSS with JavaScript',
    icon: '/assets/icons/development/postcss.svg'
  },
  {
    name: 'Sass',
    version: '1.89.0',
    description: 'Syntactically awesome stylesheets preprocessor',
    icon: '/assets/icons/development/sass.svg'
  }
])

const utilityLibraries = ref<Library[]>([
  {
    name: 'Vue Router',
    version: '4.5.1',
    description: 'Official router for Vue.js applications',
    tags: ['routing', 'navigation', 'SPA']
  },
  {
    name: 'Radix Vue',
    version: '1.9.17',
    description: 'Unstyled, accessible components for building design systems',
    tags: ['UI', 'accessibility', 'components']
  },
  {
    name: 'CryptoJS',
    version: '4.2.0',
    description: 'JavaScript library of crypto standards',
    tags: ['encryption', 'hashing', 'security']
  },
  {
    name: 'BigNumber.js',
    version: '9.3.0',
    description: 'Arbitrary precision decimal arithmetic',
    tags: ['math', 'precision', 'numbers']
  },
  {
    name: 'Lucide Vue Next',
    version: '0.511.0',
    description: 'Beautiful & consistent icon toolkit made by the Lucide team',
    tags: ['icons', 'UI', 'components']
  },
  {
    name: 'TanStack Vue Table',
    version: '8.21.3',
    description: 'Headless table utilities for Vue',
    tags: ['tables', 'data', 'UI']
  },
  {
    name: 'Currency Codes',
    version: '2.2.0',
    description: 'ISO 4217 currency codes list',
    tags: ['currency', 'finance', 'internationalization']
  }
])

const packageStats = ref({
  total: 100,
  dependencies: 74,
  devDependencies: 26
})

const allDependencies = ref<Dependency[]>([
  { name: '@iconify/vue', version: '5.0.0', type: 'dependency' },
  { name: '@bonfida/spl-name-service', version: '0.1.51', type: 'dependency' },
  { name: '@cosmjs/proto-signing', version: '0.37.0', type: 'dependency' },
  { name: '@cosmjs/stargate', version: '0.37.0', type: 'dependency' },
  { name: '@ensdomains/ensjs', version: '4.0.2', type: 'dependency' },
  { name: '@lobehub/icons', version: '4.9.0', type: 'dependency' },
  { name: '@lobehub/icons-static-svg', version: '1.81.0', type: 'dependency' },
  { name: '@noble/curves', version: '2.0.1', type: 'dependency' },
  { name: '@noble/ed25519', version: '3.0.0', type: 'dependency' },
  { name: '@noble/hashes', version: '2.0.1', type: 'dependency' },
  { name: '@noble/secp256k1', version: '3.0.0', type: 'dependency' },
  { name: '@polkadot/api', version: '16.5.4', type: 'dependency' },
  { name: '@polkadot/keyring', version: '14.0.1', type: 'dependency' },
  { name: '@polkadot/util-crypto', version: '14.0.1', type: 'dependency' },
  { name: '@radix-icons/vue', version: '1.0.0', type: 'dependency' },
  { name: '@scure/btc-signer', version: '2.0.1', type: 'dependency' },
  { name: '@solana/spl-token', version: '0.3.11', type: 'dependency' },
  { name: '@solana/web3.js', version: '1.95.5', type: 'dependency' },
  { name: '@stacks/network', version: '7.3.1', type: 'dependency' },
  { name: '@stacks/transactions', version: '7.3.1', type: 'dependency' },
  { name: '@stellar/stellar-base', version: '14.0.4', type: 'dependency' },
  { name: '@stellar/stellar-sdk', version: '14.4.3', type: 'dependency' },
  { name: '@tanstack/vue-table', version: '8.21.3', type: 'dependency' },
  { name: '@taquito/signer', version: '23.1.0', type: 'dependency' },
  { name: '@taquito/taquito', version: '23.1.0', type: 'dependency' },
  { name: '@taquito/tzip16', version: '23.1.0', type: 'dependency' },
  { name: '@terra-money/feather.js', version: '2.1.0-beta.3', type: 'dependency' },
  { name: '@terra-money/terra.js', version: '3.1.10', type: 'dependency' },
  { name: '@tezos-domains/taquito-client', version: '1.33.1', type: 'dependency' },
  { name: '@unstoppabledomains/resolution', version: '9.3.3', type: 'dependency' },
  { name: '@waves/signer', version: '1.1.0', type: 'dependency' },
  { name: '@waves/ts-lib-crypto', version: '1.4.4', type: 'dependency' },
  { name: '@waves/waves-transactions', version: '4.3.11', type: 'dependency' },
  { name: 'algosdk', version: '3.5.2', type: 'dependency' },
  { name: 'arweave', version: '1.15.7', type: 'dependency' },
  { name: 'bignumber.js', version: '9.3.0', type: 'dependency' },
  { name: 'bip32', version: '5.0.0', type: 'dependency' },
  { name: 'bip39', version: '3.1.0', type: 'dependency' },
  { name: 'bitcoinjs-lib', version: '7.0.0', type: 'dependency' },
  { name: 'bitcore-lib-cash', version: '10.10.5', type: 'dependency' },
  { name: 'bootstrap-icons', version: '1.13.1', type: 'dependency' },
  { name: 'bs58', version: '6.0.0', type: 'dependency' },
  { name: 'bs58check', version: '4.0.0', type: 'dependency' },
  { name: 'country-state-city', version: '1.0.5', type: 'dependency' },
  { name: 'crypto-js', version: '4.2.0', type: 'dependency' },
  { name: 'currency-codes', version: '2.2.0', type: 'dependency' },
  { name: 'currency-symbol-map', version: '5.1.0', type: 'dependency' },
  { name: 'drivelist', version: '12.0.2', type: 'dependency' },
  { name: 'ecpair', version: '3.0.0', type: 'dependency' },
  { name: 'ethers', version: '6.14.3', type: 'dependency' },
  { name: 'html2canvas', version: '1.4.1', type: 'dependency' },
  { name: 'is-online', version: '9.0.1', type: 'dependency' },
  { name: 'jspdf', version: '3.0.4', type: 'dependency' },
  { name: 'libsodium-wrappers-sumo', version: '0.7.15', type: 'dependency' },
  { name: 'lucide-vue-next', version: '0.511.0', type: 'dependency' },
  { name: 'moment', version: '2.30.1', type: 'dependency' },
  { name: 'openpgp', version: '6.3.0', type: 'dependency' },
  { name: 'qrcode', version: '1.5.4', type: 'dependency' },
  { name: 'qrcode.vue', version: '3.6.0', type: 'dependency' },
  { name: 'radix-vue', version: '1.9.17', type: 'dependency' },
  { name: 'ripple-keypairs', version: '2.0.0', type: 'dependency' },
  { name: 'sass', version: '1.89.0', type: 'dependency' },
  { name: 'scrypt-js', version: '3.0.1', type: 'dependency' },
  { name: 'systeminformation', version: '5.31.1', type: 'dependency' },
  { name: 'tiny-secp256k1', version: '2.2.4', type: 'dependency' },
  { name: 'tronweb', version: '6.1.1', type: 'dependency' },
  { name: 'tweetnacl', version: '1.0.3', type: 'dependency' },
  { name: 'usb-detection', version: '4.14.2', type: 'dependency' },
  { name: 'vue', version: '3.5.22', type: 'dependency' },
  { name: 'vue-router', version: '4.5.1', type: 'dependency' },
  { name: 'web3', version: '4.16.0', type: 'dependency' },
  { name: 'wif', version: '5.0.0', type: 'dependency' },
  { name: 'xrpl', version: '4.5.0', type: 'dependency' },
  { name: '@iconify-json/logos', version: '1.2.6', type: 'devDependency' },
  { name: '@rollup/plugin-commonjs', version: '28.0.8', type: 'devDependency' },
  { name: '@rollup/plugin-node-resolve', version: '16.0.3', type: 'devDependency' },
  { name: '@tailwindcss/postcss', version: '4.1.7', type: 'devDependency' },
  { name: '@tailwindcss/vite', version: '4.1.8', type: 'devDependency' },
  { name: '@types/crypto-js', version: '4.2.2', type: 'devDependency' },
  { name: '@vitejs/plugin-vue', version: '6.0.0', type: 'devDependency' },
  { name: '@vue/runtime-core', version: '3.5.22', type: 'devDependency' },
  { name: '@vue/runtime-dom', version: '3.5.22', type: 'devDependency' },
  { name: 'autoprefixer', version: '10.4.21', type: 'devDependency' },
  { name: 'buffer', version: '6.0.3', type: 'devDependency' },
  { name: 'electron', version: '37.1.0', type: 'devDependency' },
  { name: 'electron-builder', version: '26.0.12', type: 'devDependency' },
  { name: 'postcss', version: '8.5.3', type: 'devDependency' },
  { name: 'sass-embedded', version: '1.89.0', type: 'devDependency' },
  { name: 'sharp', version: '0.33.2', type: 'devDependency' },
  { name: 'stream-browserify', version: '3.0.0', type: 'devDependency' },
  { name: 'tailwindcss', version: '4.1.7', type: 'devDependency' },
  { name: 'typescript', version: '5.4.2', type: 'devDependency' },
  { name: 'vite', version: '6.0.0', type: 'devDependency' },
  { name: 'vite-plugin-electron', version: '0.29.0', type: 'devDependency' },
  { name: 'vite-plugin-electron-renderer', version: '0.14.5', type: 'devDependency' },
  { name: 'vite-plugin-node-polyfills', version: '0.23.0', type: 'devDependency' },
  { name: 'vite-plugin-top-level-await', version: '1.6.0', type: 'devDependency' },
  { name: 'vite-plugin-wasm', version: '3.5.0', type: 'devDependency' },
  { name: 'vue-tsc', version: '3.1.1', type: 'devDependency' }
])
</script>

<style lang="scss" scoped>
.techstack {
  width: 100%;
  padding: 2rem;
  padding-bottom: 3rem;
  min-height: 100vh;
  background: #fff;
}

.techstack-title {
  font-size: 1.5rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.5rem;
}

.techstack-subtitle {
  font-size: 0.875rem;
  color: #6b7280;
  margin-bottom: 1.5rem;
}

.techstack-layout {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.techstack-section {
  flex: 1;
  min-width: 280px;
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 0.5rem;
  overflow: visible;
}

.techstack-section-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  padding: 0.75rem 1rem;
  background: #f3f4f6;
  border-bottom: 1px solid #e5e7eb;
}

.techstack-section-content {
  padding: 1rem;
  padding-bottom: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.techstack-item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  padding: 0.75rem 1rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
}

.techstack-item-icon {
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.techstack-item-body {
  flex: 1;
  min-width: 0;
}

.techstack-item-name {
  display: block;
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  margin-bottom: 0.125rem;
}

.techstack-item-version {
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  margin-bottom: 0.25rem;
}

.techstack-item-desc {
  font-size: 0.8125rem;
  color: #6b7280;
  line-height: 1.4;
  margin: 0;
}

.techstack-libs-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 0.75rem;
}

.techstack-lib-card {
  padding: 1rem;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
}

.techstack-lib-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
  margin-bottom: 0.5rem;
}

.techstack-lib-name {
  font-size: 0.875rem;
  font-weight: 600;
  color: #111827;
  color: #111827;
}

.techstack-lib-version {
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  background: #eff6ff;
  color: #1d4ed8;
  border-radius: 0.25rem;
  font-weight: 500;
}

.techstack-lib-desc {
  font-size: 0.8125rem;
  color: #6b7280;
  line-height: 1.4;
  margin: 0 0 0.75rem;
}

.techstack-lib-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.25rem;
}

.techstack-tag {
  font-size: 0.75rem;
  padding: 0.125rem 0.5rem;
  background: #f3f4f6;
  color: #374151;
  border-radius: 0.25rem;
}

.techstack-stats-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
}

.techstack-stat {
  padding: 1rem;
  text-align: center;
  background: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
}

.techstack-stat-value {
  display: block;
  font-size: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin-bottom: 0.25rem;
}

.techstack-stat-label {
  font-size: 0.75rem;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.techstack-separator {
  height: 1px;
  background: #e5e7eb;
  margin: 0.75rem 0;
}

.techstack-subsection-title {
  font-size: 0.8125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
}

.techstack-dep-list {
  max-height: 400px;
  overflow-y: auto;
  border: 1px solid #e5e7eb;
  border-radius: 0.375rem;
  background: #fff;
  padding-bottom: 0.5rem;
}

.techstack-dep-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #f3f4f6;
}

.techstack-dep-item:last-child {
  border-bottom: none;
}

.techstack-dep-info {
  display: flex;
  flex-direction: column;
  gap: 0.125rem;
}

.techstack-dep-name {
  font-size: 0.875rem;
  font-weight: 500;
  color: #111827;
}

.techstack-dep-version {
  font-size: 0.75rem;
  color: #6b7280;
  font-family: ui-monospace, monospace;
}

.techstack-dep-badge {
  font-size: 0.75rem;
  font-weight: 500;
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;

  &.dependency {
    background: #d1fae5;
    color: #065f46;
  }

  &.devDependency {
    background: #dbeafe;
    color: #1e40af;
  }
}
</style>
