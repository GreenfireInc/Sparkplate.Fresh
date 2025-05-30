<template>
  <div class="view build">
    <div class="content">
      <h1 class="text-4xl font-bold mb-8 text-center">Build Executables</h1>
      <p class="text-lg mb-8 text-center text-gray-600">
        Create executable files for Windows, Linux, and macOS platforms
      </p>

      <div class="platform-tabs">
        <div class="tab-headers">
          <button 
            v-for="platform in platforms" 
            :key="platform.id"
            @click="activePlatform = platform.id"
            :class="['tab-header', { active: activePlatform === platform.id }]"
          >
            <img :src="platform.icon" :alt="platform.name" class="platform-icon" />
            {{ platform.name }}
          </button>
        </div>

        <div class="tab-content">
          <!-- Windows Build -->
          <div v-if="activePlatform === 'windows'" class="tab-panel">
            <div class="platform-header">
              <h2 class="text-2xl font-semibold mb-4">Windows Build</h2>
              <p class="text-gray-600 mb-6">Build executables for Windows 10/11 (x64 and x86)</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div class="card">
                <h3 class="text-xl font-semibold mb-4">Prerequisites</h3>
                <ul class="requirements-list">
                  <li>Node.js 16+ installed</li>
                  <li>Visual Studio Build Tools (recommended)</li>
                  <li>Windows SDK (for advanced features)</li>
                  <li>Code signing certificate (optional)</li>
                </ul>
              </div>

              <div class="card">
                <h3 class="text-xl font-semibold mb-4">Output Formats</h3>
                <div class="format-grid">
                  <div class="format-item">
                    <span class="format-icon">📦</span>
                    <div>
                      <strong>NSIS Installer</strong>
                      <p class="text-sm text-gray-600">Self-extracting installer</p>
                    </div>
                  </div>
                  <div class="format-item">
                    <span class="format-icon">📁</span>
                    <div>
                      <strong>Portable</strong>
                      <p class="text-sm text-gray-600">Standalone executable</p>
                    </div>
                  </div>
                  <div class="format-item">
                    <span class="format-icon">🏪</span>
                    <div>
                      <strong>Microsoft Store</strong>
                      <p class="text-sm text-gray-600">APPX package</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card mb-6">
              <h3 class="text-xl font-semibold mb-4">Build Commands</h3>
              <div class="command-group">
                <div class="command-item">
                  <h4 class="command-title">Standard Build</h4>
                  <div class="code-block">
                    <code>npm run build -- --win</code>
                    <button @click="copyCommand('npm run build -- --win')" class="copy-btn">Copy</button>
                  </div>
                </div>

                <div class="command-item">
                  <h4 class="command-title">Specific Architecture</h4>
                  <div class="code-block">
                    <code>npm run build -- --win --x64</code>
                    <button @click="copyCommand('npm run build -- --win --x64')" class="copy-btn">Copy</button>
                  </div>
                  <div class="code-block">
                    <code>npm run build -- --win --ia32</code>
                    <button @click="copyCommand('npm run build -- --win --ia32')" class="copy-btn">Copy</button>
                  </div>
                </div>

                <div class="command-item">
                  <h4 class="command-title">Portable Build</h4>
                  <div class="code-block">
                    <code>npx electron-builder --win portable</code>
                    <button @click="copyCommand('npx electron-builder --win portable')" class="copy-btn">Copy</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <h3 class="text-xl font-semibold mb-4">Configuration</h3>
              <div class="config-editor">
                <h4 class="text-lg font-medium mb-2">electron-builder.json5</h4>
                <pre class="config-code"><code>{
  "win": {
    "target": [
      {
        "target": "nsis",
        "arch": ["x64", "ia32"]
      },
      {
        "target": "portable",
        "arch": ["x64"]
      }
    ],
    "icon": "build/icons/icon.ico",
    "certificateFile": "path/to/certificate.p12",
    "certificatePassword": "password"
  }
}</code></pre>
              </div>
            </div>
          </div>

          <!-- Linux Build -->
          <div v-if="activePlatform === 'linux'" class="tab-panel">
            <div class="platform-header">
              <h2 class="text-2xl font-semibold mb-4">Linux Build</h2>
              <p class="text-gray-600 mb-6">Build packages for various Linux distributions</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div class="card">
                <h3 class="text-xl font-semibold mb-4">Prerequisites</h3>
                <ul class="requirements-list">
                  <li>Node.js 16+ installed</li>
                  <li>Build tools (build-essential)</li>
                  <li>Docker (for cross-platform builds)</li>
                  <li>GPG key for signing (optional)</li>
                </ul>
              </div>

              <div class="card">
                <h3 class="text-xl font-semibold mb-4">Output Formats</h3>
                <div class="format-grid">
                  <div class="format-item">
                    <span class="format-icon">📦</span>
                    <div>
                      <strong>DEB Package</strong>
                      <p class="text-sm text-gray-600">Debian/Ubuntu installer</p>
                    </div>
                  </div>
                  <div class="format-item">
                    <span class="format-icon">📦</span>
                    <div>
                      <strong>RPM Package</strong>
                      <p class="text-sm text-gray-600">Red Hat/Fedora installer</p>
                    </div>
                  </div>
                  <div class="format-item">
                    <span class="format-icon">🎯</span>
                    <div>
                      <strong>AppImage</strong>
                      <p class="text-sm text-gray-600">Universal Linux package</p>
                    </div>
                  </div>
                  <div class="format-item">
                    <span class="format-icon">📁</span>
                    <div>
                      <strong>TAR.XZ</strong>
                      <p class="text-sm text-gray-600">Compressed archive</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card mb-6">
              <h3 class="text-xl font-semibold mb-4">Build Commands</h3>
              <div class="command-group">
                <div class="command-item">
                  <h4 class="command-title">All Linux Formats</h4>
                  <div class="code-block">
                    <code>npm run build -- --linux</code>
                    <button @click="copyCommand('npm run build -- --linux')" class="copy-btn">Copy</button>
                  </div>
                </div>

                <div class="command-item">
                  <h4 class="command-title">Specific Formats</h4>
                  <div class="code-block">
                    <code>npm run build -- --linux deb</code>
                    <button @click="copyCommand('npm run build -- --linux deb')" class="copy-btn">Copy</button>
                  </div>
                  <div class="code-block">
                    <code>npm run build -- --linux rpm</code>
                    <button @click="copyCommand('npm run build -- --linux rpm')" class="copy-btn">Copy</button>
                  </div>
                  <div class="code-block">
                    <code>npm run build -- --linux AppImage</code>
                    <button @click="copyCommand('npm run build -- --linux AppImage')" class="copy-btn">Copy</button>
                  </div>
                </div>

                <div class="command-item">
                  <h4 class="command-title">Architecture Specific</h4>
                  <div class="code-block">
                    <code>npm run build -- --linux --x64</code>
                    <button @click="copyCommand('npm run build -- --linux --x64')" class="copy-btn">Copy</button>
                  </div>
                  <div class="code-block">
                    <code>npm run build -- --linux --arm64</code>
                    <button @click="copyCommand('npm run build -- --linux --arm64')" class="copy-btn">Copy</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <h3 class="text-xl font-semibold mb-4">Configuration</h3>
              <div class="config-editor">
                <h4 class="text-lg font-medium mb-2">electron-builder.json5</h4>
                <pre class="config-code"><code>{
  "linux": {
    "target": [
      {
        "target": "deb",
        "arch": ["x64", "arm64"]
      },
      {
        "target": "rpm",
        "arch": ["x64"]
      },
      {
        "target": "AppImage",
        "arch": ["x64"]
      }
    ],
    "icon": "build/icons/",
    "category": "Utility",
    "desktop": {
      "StartupWMClass": "sparkplate-fresh"
    }
  }
}</code></pre>
              </div>
            </div>
          </div>

          <!-- macOS Build -->
          <div v-if="activePlatform === 'macos'" class="tab-panel">
            <div class="platform-header">
              <h2 class="text-2xl font-semibold mb-4">macOS Build</h2>
              <p class="text-gray-600 mb-6">Build applications for macOS Intel and Apple Silicon</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div class="card">
                <h3 class="text-xl font-semibold mb-4">Prerequisites</h3>
                <ul class="requirements-list">
                  <li>macOS 10.15+ (for building)</li>
                  <li>Xcode Command Line Tools</li>
                  <li>Apple Developer Account</li>
                  <li>Code signing certificates</li>
                  <li>Notarization credentials</li>
                </ul>
              </div>

              <div class="card">
                <h3 class="text-xl font-semibold mb-4">Output Formats</h3>
                <div class="format-grid">
                  <div class="format-item">
                    <span class="format-icon">📱</span>
                    <div>
                      <strong>DMG</strong>
                      <p class="text-sm text-gray-600">Disk image installer</p>
                    </div>
                  </div>
                  <div class="format-item">
                    <span class="format-icon">📦</span>
                    <div>
                      <strong>PKG</strong>
                      <p class="text-sm text-gray-600">Installer package</p>
                    </div>
                  </div>
                  <div class="format-item">
                    <span class="format-icon">🏪</span>
                    <div>
                      <strong>Mac App Store</strong>
                      <p class="text-sm text-gray-600">MAS package</p>
                    </div>
                  </div>
                  <div class="format-item">
                    <span class="format-icon">📁</span>
                    <div>
                      <strong>ZIP</strong>
                      <p class="text-sm text-gray-600">Compressed app bundle</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card mb-6">
              <h3 class="text-xl font-semibold mb-4">Build Commands</h3>
              <div class="command-group">
                <div class="command-item">
                  <h4 class="command-title">Universal Build</h4>
                  <div class="code-block">
                    <code>npm run build -- --mac</code>
                    <button @click="copyCommand('npm run build -- --mac')" class="copy-btn">Copy</button>
                  </div>
                </div>

                <div class="command-item">
                  <h4 class="command-title">Architecture Specific</h4>
                  <div class="code-block">
                    <code>npm run build -- --mac --x64</code>
                    <button @click="copyCommand('npm run build -- --mac --x64')" class="copy-btn">Copy</button>
                  </div>
                  <div class="code-block">
                    <code>npm run build -- --mac --arm64</code>
                    <button @click="copyCommand('npm run build -- --mac --arm64')" class="copy-btn">Copy</button>
                  </div>
                  <div class="code-block">
                    <code>npm run build -- --mac --universal</code>
                    <button @click="copyCommand('npm run build -- --mac --universal')" class="copy-btn">Copy</button>
                  </div>
                </div>

                <div class="command-item">
                  <h4 class="command-title">Specific Formats</h4>
                  <div class="code-block">
                    <code>npm run build -- --mac dmg</code>
                    <button @click="copyCommand('npm run build -- --mac dmg')" class="copy-btn">Copy</button>
                  </div>
                  <div class="code-block">
                    <code>npm run build -- --mac pkg</code>
                    <button @click="copyCommand('npm run build -- --mac pkg')" class="copy-btn">Copy</button>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <h3 class="text-xl font-semibold mb-4">Configuration</h3>
              <div class="config-editor">
                <h4 class="text-lg font-medium mb-2">electron-builder.json5</h4>
                <pre class="config-code"><code>{
  "mac": {
    "target": [
      {
        "target": "dmg",
        "arch": ["universal"]
      },
      {
        "target": "zip",
        "arch": ["universal"]
      }
    ],
    "icon": "build/icons/icon.icns",
    "category": "public.app-category.utilities",
    "hardenedRuntime": true,
    "entitlements": "build/entitlements.plist",
    "notarize": {
      "teamId": "TEAM_ID"
    }
  }
}</code></pre>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div class="card">
          <h3 class="text-xl font-semibold mb-4">Build Output</h3>
          <p class="text-gray-600 mb-4">Built files will be located in the <code>dist</code> directory:</p>
          <div class="file-tree">
            <div class="file-item folder">
              <span class="file-icon">📁</span>
              <span class="file-name">dist/</span>
            </div>
            <div class="file-item nested">
              <span class="file-icon">📦</span>
              <span class="file-name">sparkplate-fresh-2.0.0.exe</span>
            </div>
            <div class="file-item nested">
              <span class="file-icon">📦</span>
              <span class="file-name">sparkplate-fresh-2.0.0.dmg</span>
            </div>
            <div class="file-item nested">
              <span class="file-icon">📦</span>
              <span class="file-name">sparkplate-fresh_2.0.0_amd64.deb</span>
            </div>
            <div class="file-item nested">
              <span class="file-icon">📄</span>
              <span class="file-name">latest.yml (update metadata)</span>
            </div>
          </div>
        </div>

        <div class="card">
          <h3 class="text-xl font-semibold mb-4">Tips & Troubleshooting</h3>
          <div class="tips-list">
            <div class="tip-item">
              <h4 class="tip-title">Build Speed</h4>
              <p>Use <code>--publish never</code> to skip upload during development builds</p>
            </div>
            <div class="tip-item">
              <h4 class="tip-title">Code Signing</h4>
              <p>Set up proper certificates to avoid security warnings</p>
            </div>
            <div class="tip-item">
              <h4 class="tip-title">Cross-Platform</h4>
              <p>Use Docker or cloud CI for building on different platforms</p>
            </div>
            <div class="tip-item">
              <h4 class="tip-title">Bundle Size</h4>
              <p>Use <code>--analyze</code> flag to inspect bundle contents</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const activePlatform = ref('windows')

const platforms = [
  {
    id: 'windows',
    name: 'Windows',
    icon: '/assets/icons/windows.svg'
  },
  {
    id: 'linux',
    name: 'Linux',
    icon: '/assets/icons/linux.svg'
  },
  {
    id: 'macos',
    name: 'macOS',
    icon: '/assets/icons/apple.svg'
  }
]

const copyCommand = async (command: string) => {
  try {
    await navigator.clipboard.writeText(command)
    console.log('Command copied:', command)
  } catch (err) {
    console.error('Failed to copy command:', err)
  }
}
</script>

<style lang="scss" scoped>
.build {
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%);

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

  .platform-tabs {
    .tab-headers {
      display: flex;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 12px;
      padding: 0.5rem;
      margin-bottom: 2rem;
      backdrop-filter: blur(10px);

      .tab-header {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
        padding: 1rem 2rem;
        background: transparent;
        border: none;
        color: rgba(255, 255, 255, 0.7);
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s;
        border-radius: 8px;

        .platform-icon {
          width: 24px;
          height: 24px;
          filter: invert(1) opacity(0.7);
        }

        &.active {
          background: white;
          color: #4f46e5;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

          .platform-icon {
            filter: none;
          }
        }

        &:hover:not(.active) {
          color: rgba(255, 255, 255, 0.9);
          background: rgba(255, 255, 255, 0.1);
        }
      }
    }

    .tab-content {
      background: white;
      border-radius: 16px;
      padding: 2rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    }
  }

  .platform-header {
    margin-bottom: 2rem;
    
    h2 {
      color: #1a202c;
    }
  }

  .requirements-list {
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

  .format-grid {
    display: grid;
    gap: 1rem;

    .format-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: #f8fafc;
      border-radius: 8px;
      border: 1px solid #e2e8f0;

      .format-icon {
        font-size: 1.5rem;
      }

      strong {
        display: block;
        color: #1a202c;
        margin-bottom: 0.25rem;
      }
    }
  }

  .command-group {
    display: flex;
    flex-direction: column;
    gap: 2rem;

    .command-item {
      .command-title {
        font-size: 1.125rem;
        font-weight: 600;
        color: #1a202c;
        margin-bottom: 1rem;
      }

      .code-block {
        background: #1a202c;
        color: #e2e8f0;
        padding: 1rem;
        border-radius: 8px;
        font-family: monospace;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 0.5rem;

        &:last-child {
          margin-bottom: 0;
        }

        .copy-btn {
          background: #4f46e5;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
          transition: background-color 0.2s;

          &:hover {
            background: #4338ca;
          }
        }
      }
    }
  }

  .config-editor {
    .config-code {
      background: #1a202c;
      color: #e2e8f0;
      padding: 1.5rem;
      border-radius: 8px;
      font-family: monospace;
      font-size: 0.875rem;
      line-height: 1.6;
      overflow-x: auto;
      white-space: pre;
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

      &:last-child {
        border-bottom: none;
      }
    }
  }

  .tips-list {
    .tip-item {
      padding: 1rem 0;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      .tip-title {
        font-weight: 600;
        color: #1a202c;
        margin-bottom: 0.5rem;
      }

      p {
        color: #718096;
        font-size: 0.875rem;
        line-height: 1.5;

        code {
          background: #f1f5f9;
          color: #475569;
          padding: 0.125rem 0.25rem;
          border-radius: 3px;
          font-size: 0.8125rem;
        }
      }
    }
  }

  code {
    background: #f1f5f9;
    color: #475569;
    padding: 0.125rem 0.25rem;
    border-radius: 3px;
    font-size: 0.875rem;
    font-family: monospace;
  }
}
</style> 