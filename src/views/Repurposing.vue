<template>
  <div class="view repurposing">
    <div class="content">
      <h1 class="text-4xl font-bold mb-8 text-center">Repurposing Sparkplate</h1>
      <p class="text-lg mb-8 text-center text-gray-600">
        Transform Sparkplate into the foundation for your next Electron application
      </p>

      <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <div class="card highlight">
          <div class="icon-wrapper">
            <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-3">Quick Start</h3>
          <p>Get up and running with Sparkplate in minutes, not hours</p>
        </div>
        
        <div class="card highlight">
          <div class="icon-wrapper">
            <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
              <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-3">Modular Design</h3>
          <p>Remove what you don't need, add what you do</p>
        </div>
        
        <div class="card highlight">
          <div class="icon-wrapper">
            <svg class="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z"></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold mb-3">Community</h3>
          <p>Built by developers, for developers</p>
        </div>
      </div>

      <div class="card mb-8">
        <h2 class="text-2xl font-semibold mb-6">Getting Started</h2>
        <div class="steps">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h3 class="step-title">Clone the Repository</h3>
              <p class="step-description">Start by cloning the Sparkplate repository to your local machine</p>
              <div class="code-block">
                <code>git clone https://github.com/greenfire-io/sparkplate-fresh.git my-app</code>
                <button @click="copyToClipboard('git clone https://github.com/greenfire-io/sparkplate-fresh.git my-app')" class="copy-btn">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h3 class="step-title">Install Dependencies</h3>
              <p class="step-description">Navigate to your project directory and install the required packages</p>
              <div class="code-block">
                <code>cd my-app && npm install</code>
                <button @click="copyToClipboard('cd my-app && npm install')" class="copy-btn">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h3 class="step-title">Customize Your App</h3>
              <p class="step-description">Modify package.json, update branding, and customize the application structure</p>
              <div class="customization-grid">
                <div class="custom-item">
                  <strong>package.json</strong>
                  <span>Update name, description, author</span>
                </div>
                <div class="custom-item">
                  <strong>App Title</strong>
                  <span>Change title in index.html</span>
                </div>
                <div class="custom-item">
                  <strong>Icons</strong>
                  <span>Replace assets/icons with your own</span>
                </div>
                <div class="custom-item">
                  <strong>Views</strong>
                  <span>Create your own pages in src/views</span>
                </div>
              </div>
            </div>
          </div>

          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h3 class="step-title">Start Development</h3>
              <p class="step-description">Launch the development server and start building your application</p>
              <div class="code-block">
                <code>npm run dev</code>
                <button @click="copyToClipboard('npm run dev')" class="copy-btn">
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"></path>
                    <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div class="card">
          <h2 class="text-2xl font-semibold mb-6">Project Structure</h2>
          <div class="file-tree">
            <div class="file-item folder">
              <span class="file-icon">📁</span>
              <span class="file-name">src/</span>
            </div>
            <div class="file-item nested">
              <span class="file-icon">📄</span>
              <span class="file-name">App.vue</span>
              <span class="file-desc">Main application component</span>
            </div>
            <div class="file-item nested">
              <span class="file-icon">📄</span>
              <span class="file-name">main.ts</span>
              <span class="file-desc">Application entry point</span>
            </div>
            <div class="file-item nested folder">
              <span class="file-icon">📁</span>
              <span class="file-name">views/</span>
              <span class="file-desc">Page components</span>
            </div>
            <div class="file-item nested folder">
              <span class="file-icon">📁</span>
              <span class="file-name">components/</span>
              <span class="file-desc">Reusable UI components</span>
            </div>
            <div class="file-item nested folder">
              <span class="file-icon">📁</span>
              <span class="file-name">router/</span>
              <span class="file-desc">Vue Router configuration</span>
            </div>
            <div class="file-item folder">
              <span class="file-icon">📁</span>
              <span class="file-name">background/</span>
              <span class="file-desc">Electron main process</span>
            </div>
            <div class="file-item folder">
              <span class="file-icon">📁</span>
              <span class="file-name">public/</span>
              <span class="file-desc">Static assets</span>
            </div>
          </div>
        </div>

        <div class="card">
          <h2 class="text-2xl font-semibold mb-6">Configuration Files</h2>
          <div class="config-list">
            <div class="config-item">
              <h4 class="config-name">package.json</h4>
              <p class="config-desc">Dependencies, scripts, and app metadata</p>
              <div class="config-actions">
                <span class="priority high">Critical</span>
              </div>
            </div>
            <div class="config-item">
              <h4 class="config-name">electron-builder.json5</h4>
              <p class="config-desc">Build and packaging configuration</p>
              <div class="config-actions">
                <span class="priority medium">Important</span>
              </div>
            </div>
            <div class="config-item">
              <h4 class="config-name">vite.config.ts</h4>
              <p class="config-desc">Vite build configuration</p>
              <div class="config-actions">
                <span class="priority medium">Important</span>
              </div>
            </div>
            <div class="config-item">
              <h4 class="config-name">tailwind.config.js</h4>
              <p class="config-desc">Tailwind CSS configuration</p>
              <div class="config-actions">
                <span class="priority low">Optional</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="card mb-8">
        <h2 class="text-2xl font-semibold mb-6">Common Customizations</h2>
        <div class="customization-tabs">
          <div class="tab-headers">
            <button 
              v-for="tab in customizationTabs" 
              :key="tab.id"
              @click="activeTab = tab.id"
              :class="['tab-header', { active: activeTab === tab.id }]"
            >
              {{ tab.title }}
            </button>
          </div>
          <div class="tab-content">
            <div v-if="activeTab === 'branding'" class="tab-panel">
              <h3 class="text-lg font-semibold mb-4">Branding & Identity</h3>
              <ul class="checklist">
                <li>Update app name in package.json</li>
                <li>Replace icon files in public/assets/icons/</li>
                <li>Modify app title in index.html</li>
                <li>Update window configuration in background/</li>
                <li>Customize color scheme in style.css</li>
              </ul>
            </div>
            <div v-if="activeTab === 'features'" class="tab-panel">
              <h3 class="text-lg font-semibold mb-4">Feature Modification</h3>
              <ul class="checklist">
                <li>Remove existing views you don't need</li>
                <li>Add new routes in src/router/index.ts</li>
                <li>Create new view components in src/views/</li>
                <li>Update navigation in App.vue</li>
                <li>Add new utility functions in src/utils/</li>
              </ul>
            </div>
            <div v-if="activeTab === 'dependencies'" class="tab-panel">
              <h3 class="text-lg font-semibold mb-4">Dependencies</h3>
              <ul class="checklist">
                <li>Remove unused packages from package.json</li>
                <li>Add packages specific to your use case</li>
                <li>Update import statements</li>
                <li>Configure new build tools if needed</li>
                <li>Test compatibility with Electron</li>
              </ul>
            </div>
            <div v-if="activeTab === 'deployment'" class="tab-panel">
              <h3 class="text-lg font-semibold mb-4">Deployment Setup</h3>
              <ul class="checklist">
                <li>Configure electron-builder for your target platforms</li>
                <li>Set up code signing certificates</li>
                <li>Configure auto-updater if needed</li>
                <li>Set up CI/CD pipeline</li>
                <li>Configure distribution channels</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h2 class="text-2xl font-semibold mb-6">Best Practices</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="practice-item">
            <h4 class="practice-title">Version Control</h4>
            <p>Initialize a new git repository and make your first commit early</p>
          </div>
          <div class="practice-item">
            <h4 class="practice-title">Documentation</h4>
            <p>Update README.md with your project-specific information</p>
          </div>
          <div class="practice-item">
            <h4 class="practice-title">Testing</h4>
            <p>Add testing frameworks and write tests for your custom features</p>
          </div>
          <div class="practice-item">
            <h4 class="practice-title">Security</h4>
            <p>Review and update security configurations for your use case</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activeTab = ref('branding')

const customizationTabs = [
  { id: 'branding', title: 'Branding' },
  { id: 'features', title: 'Features' },
  { id: 'dependencies', title: 'Dependencies' },
  { id: 'deployment', title: 'Deployment' }
]

const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
    // You could add a toast notification here
    console.log('Copied to clipboard:', text)
  } catch (err) {
    console.error('Failed to copy to clipboard:', err)
  }
}
</script>

<style lang="scss" scoped>
.repurposing {
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

  .content {
    max-width: 1200px;
    margin: 0 auto;
  }

  .card {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

    &.highlight {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      text-align: center;

      .icon-wrapper {
        display: flex;
        justify-content: center;
        margin-bottom: 1rem;
        opacity: 0.9;
      }
    }
  }

  .steps {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .step {
      display: flex;
      align-items: flex-start;
      gap: 2rem;

      .step-number {
        width: 3rem;
        height: 3rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        font-size: 1.25rem;
        flex-shrink: 0;
      }

      .step-content {
        flex: 1;

        .step-title {
          font-size: 1.25rem;
          font-weight: 600;
          margin-bottom: 0.5rem;
          color: #1a202c;
        }

        .step-description {
          color: #718096;
          margin-bottom: 1rem;
        }

        .code-block {
          background: #2d3748;
          color: #e2e8f0;
          padding: 1rem;
          border-radius: 8px;
          font-family: monospace;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 1rem;

          .copy-btn {
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: #e2e8f0;
            padding: 0.5rem;
            border-radius: 4px;
            cursor: pointer;
            transition: background-color 0.2s;

            &:hover {
              background: rgba(255, 255, 255, 0.2);
            }
          }
        }

        .customization-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;

          .custom-item {
            background: #f7fafc;
            padding: 1rem;
            border-radius: 8px;
            border-left: 4px solid #667eea;
            display: flex;
            flex-direction: column;
            gap: 0.25rem;

            strong {
              color: #2d3748;
            }

            span {
              color: #718096;
              font-size: 0.875rem;
            }
          }
        }
      }
    }
  }

  .file-tree {
    font-family: monospace;
    font-size: 0.875rem;

    .file-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.5rem 0;
      border-bottom: 1px solid #f0f0f0;

      &.nested {
        padding-left: 1.5rem;
      }

      &.folder {
        font-weight: 600;
      }

      .file-icon {
        font-size: 1rem;
      }

      .file-name {
        color: #2d3748;
        font-weight: inherit;
      }

      .file-desc {
        color: #718096;
        font-size: 0.75rem;
        margin-left: auto;
      }
    }
  }

  .config-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .config-item {
      padding: 1rem;
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      display: flex;
      flex-direction: column;
      gap: 0.5rem;

      .config-name {
        font-weight: 600;
        color: #2d3748;
      }

      .config-desc {
        color: #718096;
        font-size: 0.875rem;
      }

      .priority {
        padding: 0.25rem 0.75rem;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
        align-self: flex-start;

        &.high {
          background: #fee2e2;
          color: #991b1b;
        }

        &.medium {
          background: #fef3c7;
          color: #92400e;
        }

        &.low {
          background: #d1fae5;
          color: #065f46;
        }
      }
    }
  }

  .customization-tabs {
    .tab-headers {
      display: flex;
      border-bottom: 2px solid #e2e8f0;
      margin-bottom: 2rem;

      .tab-header {
        padding: 1rem 2rem;
        background: none;
        border: none;
        color: #718096;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.2s;
        border-bottom: 3px solid transparent;

        &.active {
          color: #667eea;
          border-bottom-color: #667eea;
        }

        &:hover:not(.active) {
          color: #4a5568;
        }
      }
    }

    .tab-content {
      .checklist {
        list-style: none;
        padding: 0;

        li {
          padding: 0.75rem 0;
          border-bottom: 1px solid #f0f0f0;
          display: flex;
          align-items: center;

          &:before {
            content: '✓';
            background: #10b981;
            color: white;
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 1rem;
            font-size: 0.875rem;
            flex-shrink: 0;
          }

          &:last-child {
            border-bottom: none;
          }
        }
      }
    }
  }

  .practice-item {
    padding: 1.5rem;
    background: #f7fafc;
    border-radius: 8px;
    border-left: 4px solid #667eea;

    .practice-title {
      font-weight: 600;
      color: #2d3748;
      margin-bottom: 0.5rem;
    }

    p {
      color: #718096;
      font-size: 0.875rem;
      line-height: 1.5;
    }
  }
}
</style> 