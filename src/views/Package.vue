<template>
  <div class="view package">
    <div class="content">
      <h1 class="text-4xl font-bold mb-8 text-center">Package for Installation</h1>
      <p class="text-lg mb-8 text-center text-gray-600">
        Create installer packages for distribution across platforms
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
          <!-- Windows Packaging -->
          <div v-if="activePlatform === 'windows'" class="tab-panel">
            <div class="platform-header">
              <h2 class="text-2xl font-semibold mb-4">Windows Packaging</h2>
              <p class="text-gray-600 mb-6">Create installers and packages for Windows distribution</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div class="card">
                <h3 class="text-xl font-semibold mb-4">Installer Types</h3>
                <div class="installer-grid">
                  <div class="installer-item">
                    <div class="installer-icon">🔧</div>
                    <div>
                      <h4>NSIS Installer</h4>
                      <p>Traditional Windows installer with uninstaller</p>
                      <span class="recommendation">Recommended</span>
                    </div>
                  </div>
                  <div class="installer-item">
                    <img src="/assets/icons/operatingSystems/windows.svg" alt="MSI Package" class="installer-icon" />
                    <div>
                      <h4>MSI Package</h4>
                      <p>Enterprise-friendly installer format</p>
                      <span class="recommendation">Enterprise</span>
                    </div>
                  </div>
                  <div class="installer-item">
                    <img src="/assets/icons/storesRepositories/appStore.microsoft.svg" alt="Microsoft Store" class="installer-icon" />
                    <div>
                      <h4>Microsoft Store</h4>
                      <p>MSIX package for store distribution</p>
                      <span class="recommendation">Store Only</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card">
                <h3 class="text-xl font-semibold mb-4">Code Signing</h3>
                <div class="signing-steps">
                  <div class="step">
                    <span class="step-number">1</span>
                    <div>
                      <h4>Get Certificate</h4>
                      <p>Purchase from CA like DigiCert, Sectigo</p>
                    </div>
                  </div>
                  <div class="step">
                    <span class="step-number">2</span>
                    <div>
                      <h4>Configure</h4>
                      <p>Set certificateFile and password</p>
                    </div>
                  </div>
                  <div class="step">
                    <span class="step-number">3</span>
                    <div>
                      <h4>Sign & Build</h4>
                      <p>Automatically signs during build</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card mb-6">
              <h3 class="text-xl font-semibold mb-4">Configuration</h3>
              <div class="config-tabs">
                <button 
                  v-for="config in windowsConfigs" 
                  :key="config.id"
                  @click="activeWindowsConfig = config.id"
                  :class="['config-tab', { active: activeWindowsConfig === config.id }]"
                >
                  {{ config.name }}
                </button>
              </div>
              <div class="config-content">
                <pre class="config-code" v-if="activeWindowsConfig === 'nsis'"><code>{
  "nsis": {
    "oneClick": false,
    "allowToChangeInstallationDirectory": true,
    "installerIcon": "build/icons/icon.ico",
    "uninstallerIcon": "build/icons/icon.ico",
    "installerHeaderIcon": "build/icons/icon.ico",
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true,
    "shortcutName": "Sparkplate Fresh"
  }
}</code></pre>
                <pre class="config-code" v-if="activeWindowsConfig === 'msi'"><code>{
  "msi": {
    "upgradeCode": "YOUR-UPGRADE-CODE-GUID",
    "createDesktopShortcut": true,
    "createStartMenuShortcut": true,
    "menuCategory": "Utilities"
  }
}</code></pre>
                <pre class="config-code" v-if="activeWindowsConfig === 'appx'"><code>{
  "appx": {
    "applicationId": "SparkplateFresh",
    "backgroundColor": "#667eea",
    "displayName": "Sparkplate Fresh",
    "identityName": "com.greenfire.sparkplate",
    "publisher": "CN=YourPublisher",
    "publisherDisplayName": "Your Company"
  }
}</code></pre>
              </div>
            </div>
          </div>

          <!-- Linux Packaging -->
          <div v-if="activePlatform === 'linux'" class="tab-panel">
            <div class="platform-header">
              <h2 class="text-2xl font-semibold mb-4">Linux Packaging</h2>
              <p class="text-gray-600 mb-6">Create packages for various Linux distributions</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div class="card package-type">
                <img src="/assets/icons/packageFormats/packageFormat.debian.svg" alt="DEB Package" class="package-icon" />
                <h3>DEB Package</h3>
                <p>Debian, Ubuntu, and derivatives</p>
                <ul class="features">
                  <li>APT integration</li>
                  <li>Dependency management</li>
                  <li>Desktop file integration</li>
                </ul>
              </div>
              <div class="card package-type">
                <img src="/assets/icons/operatingSystems/fedora.svg" alt="RPM Package" class="package-icon" />
                <h3>RPM Package</h3>
                <p>Red Hat, Fedora, openSUSE</p>
                <ul class="features">
                  <li>YUM/DNF integration</li>
                  <li>Automatic updates</li>
                  <li>System integration</li>
                </ul>
              </div>
              <div class="card package-type">
                <img src="/assets/icons/packageFormats/packageFormat.appimage.svg" alt="AppImage" class="package-icon" />
                <h3>AppImage</h3>
                <p>Portable Linux application</p>
                <ul class="features">
                  <li>No installation required</li>
                  <li>Portable executable</li>
                  <li>Works on most Linux distributions</li>
                </ul>
              </div>
            </div>

            <div class="card mb-6">
              <h3 class="text-xl font-semibold mb-4">Package Configuration</h3>
              <div class="config-editor">
                <pre class="config-code"><code>{
  "linux": {
    "category": "Utility",
    "description": "A fresh take on Electron development",
    "desktop": {
      "Name": "Sparkplate Fresh",
      "Comment": "Modern Electron application",
      "Keywords": "electron;development;utility",
      "StartupWMClass": "sparkplate-fresh"
    },
    "deb": {
      "depends": ["gconf2", "gconf-service"],
      "maintainer": "Your Name &lt;email@example.com&gt;",
      "homepage": "https://your-website.com"
    },
    "rpm": {
      "vendor": "Your Company",
      "license": "MIT",
      "group": "Applications/Utilities"
    }
  }
}</code></pre>
              </div>
            </div>
          </div>

          <!-- macOS Packaging -->
          <div v-if="activePlatform === 'macos'" class="tab-panel">
            <div class="platform-header">
              <h2 class="text-2xl font-semibold mb-4">macOS Packaging</h2>
              <p class="text-gray-600 mb-6">Create distribution packages for macOS</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div class="card">
                <h3 class="text-xl font-semibold mb-4">Distribution Options</h3>
                <div class="distribution-grid">
                  <div class="dist-item">
                    <div class="dist-icon">💿</div>
                    <div>
                      <h4>DMG (Disk Image)</h4>
                      <p>Standard macOS installer format</p>
                      <span class="popularity">Most Popular</span>
                    </div>
                  </div>
                  <div class="dist-item">
                    <img src="/assets/icons/operatingSystems/apple.svg" alt="PKG Installer" class="dist-icon" />
                    <div>
                      <h4>PKG Installer</h4>
                      <p>System-level installation package</p>
                      <span class="popularity">Enterprise</span>
                    </div>
                  </div>
                  <div class="dist-item">
                    <img src="/assets/icons/storesRepositories/appStore.apple.svg" alt="Mac App Store" class="dist-icon" />
                    <div>
                      <h4>Mac App Store</h4>
                      <p>Sandboxed app for store</p>
                      <span class="popularity">Store Only</span>
                    </div>
                  </div>
                </div>
              </div>

              <div class="card">
                <h3 class="text-xl font-semibold mb-4">Notarization Process</h3>
                <div class="notarization-steps">
                  <div class="step">
                    <div class="step-icon">🔐</div>
                    <div>
                      <h4>Code Signing</h4>
                      <p>Sign with Developer ID certificate</p>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-icon">📤</div>
                    <div>
                      <h4>Upload to Apple</h4>
                      <p>Automatic submission for notarization</p>
                    </div>
                  </div>
                  <div class="step">
                    <div class="step-icon">✅</div>
                    <div>
                      <h4>Stapling</h4>
                      <p>Attach notarization ticket</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div class="card">
              <h3 class="text-xl font-semibold mb-4">Configuration</h3>
              <div class="config-editor">
                <pre class="config-code"><code>{
  "mac": {
    "category": "public.app-category.utilities",
    "target": [
      {
        "target": "dmg",
        "arch": ["universal"]
      }
    ],
    "icon": "build/icons/icon.icns",
    "hardenedRuntime": true,
    "gatekeeperAssess": false,
    "entitlements": "build/entitlements.plist",
    "entitlementsInherit": "build/entitlements.plist",
    "notarize": {
      "teamId": "YOUR_TEAM_ID"
    }
  },
  "dmg": {
    "title": "Sparkplate Fresh",
    "icon": "build/icons/icon.icns",
    "iconSize": 80,
    "contents": [
      {
        "x": 130,
        "y": 220,
        "type": "file"
      },
      {
        "x": 410,
        "y": 220,
        "type": "link",
        "path": "/Applications"
      }
    ],
    "window": {
      "width": 540,
      "height": 380
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
          <h3 class="text-xl font-semibold mb-4">Package Commands</h3>
          <div class="command-list">
            <div class="command-item">
              <h4>Build All Packages</h4>
              <div class="code-block">
                <code>npm run build</code>
                <button @click="copyCommand('npm run build')" class="copy-btn">Copy</button>
              </div>
            </div>
            <div class="command-item">
              <h4>Platform Specific</h4>
              <div class="code-block">
                <code>npm run build -- --{{ activePlatform === 'macos' ? 'mac' : activePlatform }}</code>
                <button @click="copyCommand(`npm run build -- --${activePlatform === 'macos' ? 'mac' : activePlatform}`)" class="copy-btn">Copy</button>
              </div>
            </div>
            <div class="command-item">
              <h4>Skip Publishing</h4>
              <div class="code-block">
                <code>npm run build -- --publish never</code>
                <button @click="copyCommand('npm run build -- --publish never')" class="copy-btn">Copy</button>
              </div>
            </div>
          </div>
        </div>

        <div class="card">
          <h3 class="text-xl font-semibold mb-4">Troubleshooting</h3>
          <div class="troubleshoot-list">
            <div class="trouble-item">
              <h4>Code Signing Errors</h4>
              <p>Ensure certificates are properly installed and configured</p>
            </div>
            <div class="trouble-item">
              <h4>Large Bundle Size</h4>
              <p>Use electron-builder's compression and exclusion options</p>
            </div>
            <div class="trouble-item">
              <h4>Permission Issues</h4>
              <p>Check file permissions and entitlements configuration</p>
            </div>
            <div class="trouble-item">
              <h4>Notarization Failures</h4>
              <p>Verify hardened runtime and entitlements are correct</p>
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
const activeWindowsConfig = ref('nsis')

const platforms = [
  { id: 'windows', name: 'Windows', icon: '/assets/icons/operatingSystems/windows.svg' },
  { id: 'linux', name: 'Linux', icon: '/assets/icons/operatingSystems/linux.svg' },
  { id: 'macos', name: 'macOS', icon: '/assets/icons/operatingSystems/macos.svg' }
]

const windowsConfigs = [
  { id: 'nsis', name: 'NSIS' },
  { id: 'msi', name: 'MSI' },
  { id: 'appx', name: 'APPX' }
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
.package {
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);

  .content {
    max-width: 1400px;
    margin: 0 auto;
  }

  .card {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

    &.package-type {
      text-align: center;
      
      .package-icon {
        font-size: 3rem;
        width: 3rem;
        height: 3rem;
        margin-bottom: 1rem;
      }

      h3 {
        margin-bottom: 0.5rem;
        color: #1a202c;
      }

      p {
        color: #718096;
        margin-bottom: 1rem;
      }

      .features {
        list-style: none;
        padding: 0;
        
        li {
          padding: 0.25rem 0;
          color: #4a5568;
          font-size: 0.875rem;
        }
      }
    }
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
          color: #10b981;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);

          .platform-icon {
            filter: none;
          }
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

  .installer-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .installer-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;
      transition: all 0.2s;

      &:hover {
        border-color: #10b981;
        background: #f0fdf4;
      }

      .installer-icon {
        font-size: 2rem;
        width: 3rem;
        height: 3rem;
        text-align: center;
      }

      h4 {
        margin: 0 0 0.25rem 0;
        color: #1a202c;
      }

      p {
        margin: 0 0 0.5rem 0;
        color: #6b7280;
        font-size: 0.875rem;
      }

      .recommendation {
        display: inline-block;
        padding: 0.125rem 0.5rem;
        background: #dbeafe;
        color: #1e40af;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
      }
    }
  }

  .signing-steps {
    .step {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      .step-number {
        width: 2rem;
        height: 2rem;
        background: #10b981;
        color: white;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        flex-shrink: 0;
      }

      h4 {
        margin: 0 0 0.25rem 0;
        color: #1a202c;
      }

      p {
        margin: 0;
        color: #6b7280;
        font-size: 0.875rem;
      }
    }
  }

  .config-tabs {
    display: flex;
    margin-bottom: 1rem;
    border-bottom: 1px solid #e5e7eb;

    .config-tab {
      padding: 0.75rem 1.5rem;
      background: none;
      border: none;
      color: #6b7280;
      cursor: pointer;
      border-bottom: 3px solid transparent;
      transition: all 0.2s;

      &.active {
        color: #10b981;
        border-bottom-color: #10b981;
      }
    }
  }

  .config-code {
    background: #1a202c;
    color: #e2e8f0;
    padding: 1.5rem;
    border-radius: 8px;
    font-family: monospace;
    font-size: 0.875rem;
    line-height: 1.6;
    overflow-x: auto;
  }

  .distribution-grid {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    .dist-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      border: 1px solid #e5e7eb;
      border-radius: 8px;

      .dist-icon {
        font-size: 2rem;
        width: 3rem;
        height: 3rem;
        text-align: center;
      }

      h4 {
        margin: 0 0 0.25rem 0;
        color: #1a202c;
      }

      p {
        margin: 0 0 0.5rem 0;
        color: #6b7280;
        font-size: 0.875rem;
      }

      .popularity {
        display: inline-block;
        padding: 0.125rem 0.5rem;
        background: #ecfdf5;
        color: #047857;
        border-radius: 12px;
        font-size: 0.75rem;
        font-weight: 600;
      }
    }
  }

  .notarization-steps {
    .step {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem 0;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      .step-icon {
        font-size: 1.5rem;
        width: 2.5rem;
        text-align: center;
      }

      h4 {
        margin: 0 0 0.25rem 0;
        color: #1a202c;
      }

      p {
        margin: 0;
        color: #6b7280;
        font-size: 0.875rem;
      }
    }
  }

  .command-list {
    .command-item {
      margin-bottom: 1.5rem;

      h4 {
        margin-bottom: 0.5rem;
        color: #1a202c;
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

        .copy-btn {
          background: #10b981;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
          transition: background-color 0.2s;

          &:hover {
            background: #059669;
          }
        }
      }
    }
  }

  .troubleshoot-list {
    .trouble-item {
      padding: 1rem 0;
      border-bottom: 1px solid #f0f0f0;

      &:last-child {
        border-bottom: none;
      }

      h4 {
        margin-bottom: 0.5rem;
        color: #1a202c;
      }

      p {
        margin: 0;
        color: #6b7280;
        font-size: 0.875rem;
        line-height: 1.5;
      }
    }
  }
}
</style> 