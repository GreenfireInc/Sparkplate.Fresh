<template>
  <div class="view techstack">
    <div class="content">
      <h1 class="text-4xl font-bold mb-8 text-center">Sparkplate Techstack</h1>
      <p class="text-lg mb-8 text-center text-gray-600">
        The powerful technologies that drive Sparkplate development
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div class="card">
          <h2 class="text-2xl font-semibold mb-6">Core Technologies</h2>
          <div class="tech-grid">
            <div 
              v-for="tech in coreTechnologies" 
              :key="tech.name"
              class="tech-item core"
            >
              <div class="tech-icon">
                <img :src="tech.icon" :alt="tech.name" />
              </div>
              <div class="tech-info">
                <h3 class="tech-name">{{ tech.name }}</h3>
                <p class="tech-version">{{ tech.version }}</p>
                <p class="tech-description">{{ tech.description }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <h2 class="text-2xl font-semibold mb-6">Development Tools</h2>
          <div class="tech-grid">
            <div 
              v-for="tool in developmentTools" 
              :key="tool.name"
              class="tech-item dev"
            >
              <div class="tech-icon">
                <img :src="tool.icon" :alt="tool.name" />
              </div>
              <div class="tech-info">
                <h3 class="tech-name">{{ tool.name }}</h3>
                <p class="tech-version">{{ tool.version }}</p>
                <p class="tech-description">{{ tool.description }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card mb-8">
        <h2 class="text-2xl font-semibold mb-6">Utility Libraries</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div 
            v-for="lib in utilityLibraries" 
            :key="lib.name"
            class="lib-card"
          >
            <div class="lib-header">
              <h3 class="lib-name">{{ lib.name }}</h3>
              <span class="lib-version">v{{ lib.version }}</span>
            </div>
            <p class="lib-description">{{ lib.description }}</p>
            <div class="lib-tags">
              <span 
                v-for="tag in lib.tags" 
                :key="tag"
                class="tag"
              >
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h2 class="text-2xl font-semibold mb-6">Package Statistics</h2>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="stat-card">
            <div class="stat-number">{{ packageStats.total }}</div>
            <div class="stat-label">Total Packages</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ packageStats.dependencies }}</div>
            <div class="stat-label">Dependencies</div>
          </div>
          <div class="stat-card">
            <div class="stat-number">{{ packageStats.devDependencies }}</div>
            <div class="stat-label">Dev Dependencies</div>
          </div>
        </div>

        <div class="package-breakdown mt-8">
          <h3 class="text-xl font-semibold mb-4">All Dependencies</h3>
          <div class="dependency-list">
            <div 
              v-for="dep in allDependencies" 
              :key="dep.name"
              class="dependency-item"
              :class="dep.type"
            >
              <div class="dep-info">
                <span class="dep-name">{{ dep.name }}</span>
                <span class="dep-version">{{ dep.version }}</span>
              </div>
              <div class="dep-type">
                <span class="type-badge" :class="dep.type">
                  {{ dep.type === 'dependency' ? 'Runtime' : 'Development' }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

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
    version: '29.1.1',
    description: 'Build cross-platform desktop apps with JavaScript, HTML, and CSS',
    icon: '/assets/icons/development/electron.svg'
  },
  {
    name: 'Vue 3',
    version: '3.4.21',
    description: 'Progressive JavaScript framework for building user interfaces',
    icon: '/assets/icons/development/vue.svg'
  },
  {
    name: 'Vite',
    version: '5.1.5',
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
    version: '24.13.3',
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
    name: 'Flowbite',
    version: '3.1.2',
    description: 'Component library built on top of Tailwind CSS',
    tags: ['components', 'UI', 'design-system']
  },
  {
    name: 'Currency Codes',
    version: '2.2.0',
    description: 'ISO 4217 currency codes list',
    tags: ['currency', 'finance', 'internationalization']
  }
])

// Package statistics from package.json
const packageStats = ref({
  total: 19,
  dependencies: 7,
  devDependencies: 12
})

const allDependencies = ref<Dependency[]>([
  // Runtime dependencies
  { name: 'bignumber.js', version: '9.3.0', type: 'dependency' },
  { name: 'crypto-js', version: '4.2.0', type: 'dependency' },
  { name: 'currency-codes', version: '2.2.0', type: 'dependency' },
  { name: 'currency-symbol-map', version: '5.1.0', type: 'dependency' },
  { name: 'flowbite', version: '3.1.2', type: 'dependency' },
  { name: 'lucide-vue-next', version: '0.511.0', type: 'dependency' },
  { name: 'sass', version: '1.89.0', type: 'dependency' },
  { name: 'vue-router', version: '4.5.1', type: 'dependency' },
  
  // Development dependencies
  { name: '@tailwindcss/postcss', version: '4.1.7', type: 'devDependency' },
  { name: '@types/crypto-js', version: '4.2.2', type: 'devDependency' },
  { name: '@vitejs/plugin-vue', version: '5.0.4', type: 'devDependency' },
  { name: 'autoprefixer', version: '10.4.21', type: 'devDependency' },
  { name: 'electron', version: '29.1.1', type: 'devDependency' },
  { name: 'electron-builder', version: '24.13.3', type: 'devDependency' },
  { name: 'postcss', version: '8.5.3', type: 'devDependency' },
  { name: 'sass-embedded', version: '1.89.0', type: 'devDependency' },
  { name: 'tailwindcss', version: '4.1.7', type: 'devDependency' },
  { name: 'typescript', version: '5.4.2', type: 'devDependency' },
  { name: 'vite', version: '5.1.5', type: 'devDependency' },
  { name: 'vite-plugin-electron', version: '0.28.4', type: 'devDependency' },
  { name: 'vite-plugin-electron-renderer', version: '0.14.5', type: 'devDependency' },
  { name: 'vue', version: '3.4.21', type: 'devDependency' },
  { name: 'vue-tsc', version: '2.0.6', type: 'devDependency' }
])
</script>

<style lang="scss" scoped>
.techstack {
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .content {
    max-width: 1400px;
    margin: 0 auto;
  }

  .card {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  }

  .tech-grid {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .tech-item {
    display: flex;
    align-items: center;
    padding: 1.5rem;
    border-radius: 12px;
    transition: all 0.3s ease;

    &.core {
      background: linear-gradient(135deg, #e3f2fd 0%, #f3e5f5 100%);
      border: 2px solid #2196f3;
    }

    &.dev {
      background: linear-gradient(135deg, #f3e5f5 0%, #fce4ec 100%);
      border: 2px solid #9c27b0;
    }

    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    .tech-icon {
      width: 64px;
      height: 64px;
      margin-right: 1.5rem;
      flex-shrink: 0;

      img {
        width: 100%;
        height: 100%;
        object-fit: contain;
      }
    }

    .tech-info {
      flex: 1;

      .tech-name {
        font-size: 1.25rem;
        font-weight: 700;
        color: #1a202c;
        margin-bottom: 0.25rem;
      }

      .tech-version {
        font-size: 0.875rem;
        color: #4a5568;
        font-weight: 600;
        margin-bottom: 0.5rem;
      }

      .tech-description {
        color: #718096;
        font-size: 0.875rem;
        line-height: 1.5;
      }
    }
  }

  .lib-card {
    background: #f8fafc;
    border: 1px solid #e2e8f0;
    border-radius: 12px;
    padding: 1.5rem;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      border-color: #3b82f6;
    }

    .lib-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.75rem;

      .lib-name {
        font-weight: 700;
        color: #1a202c;
      }

      .lib-version {
        font-size: 0.75rem;
        background: #3b82f6;
        color: white;
        padding: 0.25rem 0.5rem;
        border-radius: 6px;
      }
    }

    .lib-description {
      color: #718096;
      font-size: 0.875rem;
      line-height: 1.5;
      margin-bottom: 1rem;
    }

    .lib-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;

      .tag {
        background: #e2e8f0;
        color: #4a5568;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.75rem;
        font-weight: 500;
      }
    }
  }

  .stat-card {
    text-align: center;
    padding: 2rem;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 12px;

    .stat-number {
      font-size: 3rem;
      font-weight: 900;
      margin-bottom: 0.5rem;
    }

    .stat-label {
      font-size: 1rem;
      opacity: 0.9;
      text-transform: uppercase;
      letter-spacing: 0.05em;
    }
  }

  .dependency-list {
    max-height: 400px;
    overflow-y: auto;
    border: 1px solid #e2e8f0;
    border-radius: 8px;
    background: #f8fafc;

    .dependency-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem 1rem;
      border-bottom: 1px solid #e2e8f0;

      &:last-child {
        border-bottom: none;
      }

      &:hover {
        background: #f1f5f9;
      }

      .dep-info {
        display: flex;
        flex-direction: column;

        .dep-name {
          font-weight: 600;
          color: #1a202c;
        }

        .dep-version {
          font-size: 0.875rem;
          color: #718096;
          font-family: monospace;
        }
      }

      .type-badge {
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;

        &.dependency {
          background: #d1fae5;
          color: #065f46;
        }

        &.devDependency {
          background: #dbeafe;
          color: #1e40af;
        }
      }
    }
  }
}
</style> 