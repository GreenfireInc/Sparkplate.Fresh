<template>
  <div class="view publish">
    <div class="content">
      <h1 class="text-4xl font-bold mb-8 text-center">Publish Applications</h1>
      <p class="text-lg mb-8 text-center text-gray-600">
        Distribute your Sparkplate application to various stores and repositories
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
          <!-- Windows Publishing -->
          <div v-if="activePlatform === 'windows'" class="tab-panel">
            <div class="platform-header">
              <h2 class="text-2xl font-semibold mb-4">Windows Publishing</h2>
              <p class="text-gray-600 mb-6">Distribute your app through various Windows channels</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div class="card store-card">
                <div class="store-header">
                  <div class="store-icon">🏪</div>
                  <h3>Microsoft Store</h3>
                  <span class="store-badge official">Official</span>
                </div>
                <ul class="store-features">
                  <li>Automatic updates</li>
                  <li>Built-in payment processing</li>
                  <li>Windows 10/11 integration</li>
                  <li>Global distribution</li>
                </ul>
                <div class="store-requirements">
                  <h4>Requirements:</h4>
                  <ul>
                    <li>Microsoft Partner Center account</li>
                    <li>App certification</li>
                    <li>MSIX packaging</li>
                    <li>Age rating</li>
                  </ul>
                </div>
              </div>

              <div class="card store-card">
                <div class="store-header">
                  <div class="store-icon">📦</div>
                  <h3>Chocolatey</h3>
                  <span class="store-badge community">Community</span>
                </div>
                <ul class="store-features">
                  <li>Command-line installation</li>
                  <li>Developer-friendly</li>
                  <li>Automated updates</li>
                  <li>Package management</li>
                </ul>
                <div class="store-requirements">
                  <h4>Requirements:</h4>
                  <ul>
                    <li>Chocolatey package</li>
                    <li>Package maintainer</li>
                    <li>Executable URL</li>
                    <li>Checksum verification</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="card mb-6">
              <h3 class="text-xl font-semibold mb-4">Publishing Configuration</h3>
              <div class="config-tabs">
                <button 
                  v-for="config in windowsPublishConfigs" 
                  :key="config.id"
                  @click="activeWindowsPublishConfig = config.id"
                  :class="['config-tab', { active: activeWindowsPublishConfig === config.id }]"
                >
                  {{ config.name }}
                </button>
              </div>
              <div class="config-content">
                <div v-if="activeWindowsPublishConfig === 'store'">
                  <h4 class="text-lg font-medium mb-2">Microsoft Store Configuration</h4>
                  <pre class="config-code"><code>{
  "appx": {
    "applicationId": "SparkplateFresh",
    "backgroundColor": "#667eea",
    "displayName": "Sparkplate Fresh",
    "identityName": "12345YourPublisher.SparkplateFresh",
    "publisher": "CN=Your Publisher",
    "publisherDisplayName": "Your Company Name"
  },
  "publish": {
    "provider": "generic",
    "url": "https://releases.yourapp.com/",
    "channel": "latest"
  }
}</code></pre>
                </div>
                <div v-if="activeWindowsPublishConfig === 'chocolatey'">
                  <h4 class="text-lg font-medium mb-2">Chocolatey Package</h4>
                  <pre class="config-code"><code># chocolateyinstall.ps1
$ErrorActionPreference = 'Stop'
$packageName = 'sparkplate-fresh'
$toolsDir = "$(Split-Path -parent $MyInvocation.MyCommand.Definition)"
$url64 = 'https://github.com/your-org/sparkplate-fresh/releases/download/v2.0.0/sparkplate-fresh-2.0.0.exe'
$checksum64 = 'YOUR_CHECKSUM_HERE'

$packageArgs = @{
  packageName   = $packageName
  unzipLocation = $toolsDir
  fileType      = 'exe'
  url64bit      = $url64
  checksum64    = $checksum64
  checksumType64= 'sha256'
  silentArgs    = '/S'
  validExitCodes= @(0)
}</code></pre>
                </div>
                <div v-if="activeWindowsPublishConfig === 'github'">
                  <h4 class="text-lg font-medium mb-2">GitHub Releases</h4>
                  <pre class="config-code"><code>{
  "publish": [
    {
      "provider": "github",
      "owner": "your-username",
      "repo": "sparkplate-fresh",
      "token": "ghp_your_token_here",
      "releaseType": "release"
    }
  ]
}</code></pre>
                </div>
              </div>
            </div>
          </div>

          <!-- Linux Publishing -->
          <div v-if="activePlatform === 'linux'" class="tab-panel">
            <div class="platform-header">
              <h2 class="text-2xl font-semibold mb-4">Linux Publishing</h2>
              <p class="text-gray-600 mb-6">Distribute across Linux package repositories and stores</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
              <div class="card store-card">
                <div class="store-header">
                  <div class="store-icon">📦</div>
                  <h3>Ubuntu PPA</h3>
                  <span class="store-badge official">Official</span>
                </div>
                <ul class="store-features">
                  <li>APT integration</li>
                  <li>Automatic updates</li>
                  <li>Ubuntu/Debian support</li>
                  <li>GPG signing</li>
                </ul>
              </div>

              <div class="card store-card">
                <div class="store-header">
                  <div class="store-icon">📱</div>
                  <h3>Snap Store</h3>
                  <span class="store-badge community">Universal</span>
                </div>
                <ul class="store-features">
                  <li>Universal packages</li>
                  <li>Sandboxed execution</li>
                  <li>Automatic updates</li>
                  <li>Cross-distro support</li>
                </ul>
              </div>

              <div class="card store-card">
                <div class="store-header">
                  <div class="store-icon">📥</div>
                  <h3>Flatpak</h3>
                  <span class="store-badge community">Universal</span>
                </div>
                <ul class="store-features">
                  <li>Sandbox security</li>
                  <li>Runtime isolation</li>
                  <li>Distribution agnostic</li>
                  <li>Flathub store</li>
                </ul>
              </div>
            </div>

            <div class="card mb-6">
              <h3 class="text-xl font-semibold mb-4">Distribution Commands</h3>
              <div class="command-grid">
                <div class="command-item">
                  <h4>Upload to PPA</h4>
                  <div class="code-block">
                    <code>dput ppa:your-ppa/sparkplate sparkplate-fresh_2.0.0_source.changes</code>
                    <button @click="copyCommand('dput ppa:your-ppa/sparkplate sparkplate-fresh_2.0.0_source.changes')" class="copy-btn">Copy</button>
                  </div>
                </div>
                <div class="command-item">
                  <h4>Build Snap</h4>
                  <div class="code-block">
                    <code>snapcraft</code>
                    <button @click="copyCommand('snapcraft')" class="copy-btn">Copy</button>
                  </div>
                </div>
                <div class="command-item">
                  <h4>Build Flatpak</h4>
                  <div class="code-block">
                    <code>flatpak-builder --repo=repo build-dir org.example.SparkplateFresh.yml</code>
                    <button @click="copyCommand('flatpak-builder --repo=repo build-dir org.example.SparkplateFresh.yml')" class="copy-btn">Copy</button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- macOS Publishing -->
          <div v-if="activePlatform === 'macos'" class="tab-panel">
            <div class="platform-header">
              <h2 class="text-2xl font-semibold mb-4">macOS Publishing</h2>
              <p class="text-gray-600 mb-6">Distribute through official and community channels</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div class="card store-card">
                <div class="store-header">
                  <div class="store-icon">🍎</div>
                  <h3>Mac App Store</h3>
                  <span class="store-badge official">Official</span>
                </div>
                <ul class="store-features">
                  <li>Built-in payment system</li>
                  <li>Automatic updates</li>
                  <li>Global distribution</li>
                  <li>Family sharing support</li>
                </ul>
                <div class="store-requirements">
                  <h4>Requirements:</h4>
                  <ul>
                    <li>Apple Developer Program</li>
                    <li>App Store guidelines compliance</li>
                    <li>Sandboxing</li>
                    <li>App Review process</li>
                  </ul>
                </div>
              </div>

              <div class="card store-card">
                <div class="store-header">
                  <div class="store-icon">🍺</div>
                  <h3>Homebrew</h3>
                  <span class="store-badge community">Community</span>
                </div>
                <ul class="store-features">
                  <li>Command-line installation</li>
                  <li>Developer-friendly</li>
                  <li>Dependency management</li>
                  <li>Community maintained</li>
                </ul>
                <div class="store-requirements">
                  <h4>Requirements:</h4>
                  <ul>
                    <li>GitHub repository</li>
                    <li>Release artifacts</li>
                    <li>Formula creation</li>
                    <li>Community approval</li>
                  </ul>
                </div>
              </div>
            </div>

            <div class="card">
              <h3 class="text-xl font-semibold mb-4">Publishing Configurations</h3>
              <div class="config-tabs">
                <button 
                  v-for="config in macosPublishConfigs" 
                  :key="config.id"
                  @click="activeMacosPublishConfig = config.id"
                  :class="['config-tab', { active: activeMacosPublishConfig === config.id }]"
                >
                  {{ config.name }}
                </button>
              </div>
              <div class="config-content">
                <div v-if="activeMacosPublishConfig === 'appstore'">
                  <h4 class="text-lg font-medium mb-2">App Store Configuration</h4>
                  <pre class="config-code"><code>{
  "mas": {
    "category": "public.app-category.utilities",
    "provisioningProfile": "path/to/mas.provisioningprofile",
    "entitlements": "build/entitlements.mas.plist",
    "entitlementsInherit": "build/entitlements.mas.inherit.plist"
  },
  "publish": {
    "provider": "generic",
    "url": "https://releases.yourapp.com/",
    "channel": "latest"
  }
}</code></pre>
                </div>
                <div v-if="activeMacosPublishConfig === 'homebrew'">
                  <h4 class="text-lg font-medium mb-2">Homebrew Formula</h4>
                  <pre class="config-code"><code>class SparkplateFresh < Formula
  desc "A fresh take on Electron development"
  homepage "https://github.com/your-org/sparkplate-fresh"
  url "https://github.com/your-org/sparkplate-fresh/archive/v2.0.0.tar.gz"
  sha256 "YOUR_SHA256_HERE"
  license "MIT"

  depends_on "node"

  def install
    system "npm", "install", *Language::Node.std_npm_install_args(libexec)
    bin.install_symlink Dir["#{libexec}/bin/*"]
  end

  test do
    system "#{bin}/sparkplate-fresh", "--version"
  end
end</code></pre>
                </div>
                <div v-if="activeMacosPublishConfig === 'direct'">
                  <h4 class="text-lg font-medium mb-2">Direct Distribution</h4>
                  <pre class="config-code"><code>{
  "publish": [
    {
      "provider": "github",
      "owner": "your-username",
      "repo": "sparkplate-fresh"
    },
    {
      "provider": "s3",
      "bucket": "your-releases-bucket",
      "region": "us-east-1",
      "path": "/releases"
    }
  ],
  "mac": {
    "notarize": {
      "teamId": "YOUR_TEAM_ID"
    }
  }
}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
        <div class="card">
          <h3 class="text-xl font-semibold mb-4">Auto-Updates</h3>
          <p class="text-gray-600 mb-4">Configure automatic updates for your application</p>
          <div class="update-config">
            <h4 class="font-medium mb-2">Update Server Configuration</h4>
            <pre class="config-code"><code>{
  "publish": {
    "provider": "github",
    "owner": "your-username",
    "repo": "sparkplate-fresh",
    "publishAutoUpdate": true
  },
  "updater": {
    "enabled": true,
    "checkOnStart": true,
    "checkInterval": 3600000,
    "allowPrerelease": false
  }
}</code></pre>
          </div>
        </div>

        <div class="card">
          <h3 class="text-xl font-semibold mb-4">Release Workflow</h3>
          <div class="workflow-steps">
            <div class="step">
              <div class="step-number">1</div>
              <div>
                <h4>Version Bump</h4>
                <p>Update version in package.json</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">2</div>
              <div>
                <h4>Build & Test</h4>
                <p>Run tests and build for all platforms</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">3</div>
              <div>
                <h4>Code Sign</h4>
                <p>Sign binaries with certificates</p>
              </div>
            </div>
            <div class="step">
              <div class="step-number">4</div>
              <div>
                <h4>Publish</h4>
                <p>Upload to configured providers</p>
              </div>
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
const activeWindowsPublishConfig = ref('store')
const activeMacosPublishConfig = ref('appstore')

const platforms = [
  { id: 'windows', name: 'Windows', icon: '/assets/icons/windows.svg' },
  { id: 'linux', name: 'Linux', icon: '/assets/icons/linux.svg' },
  { id: 'macos', name: 'macOS', icon: '/assets/icons/apple.svg' }
]

const windowsPublishConfigs = [
  { id: 'store', name: 'Microsoft Store' },
  { id: 'chocolatey', name: 'Chocolatey' },
  { id: 'github', name: 'GitHub Releases' }
]

const macosPublishConfigs = [
  { id: 'appstore', name: 'App Store' },
  { id: 'homebrew', name: 'Homebrew' },
  { id: 'direct', name: 'Direct Distribution' }
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
.publish {
  padding: 2rem;
  min-height: 100vh;
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);

  .content {
    max-width: 1400px;
    margin: 0 auto;
  }

  .card {
    background: white;
    border-radius: 16px;
    padding: 2rem;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);

    &.store-card {
      .store-header {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
        padding-bottom: 1rem;
        border-bottom: 1px solid #f0f0f0;

        .store-icon {
          font-size: 2.5rem;
        }

        h3 {
          flex: 1;
          margin: 0;
          color: #1a202c;
        }

        .store-badge {
          padding: 0.25rem 0.75rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;

          &.official {
            background: #dbeafe;
            color: #1e40af;
          }

          &.community {
            background: #dcfce7;
            color: #166534;
          }
        }
      }

      .store-features {
        list-style: none;
        padding: 0;
        margin-bottom: 1.5rem;

        li {
          padding: 0.5rem 0;
          color: #4a5568;
          display: flex;
          align-items: center;

          &:before {
            content: '✓';
            color: #10b981;
            font-weight: bold;
            margin-right: 0.75rem;
          }
        }
      }

      .store-requirements {
        h4 {
          margin-bottom: 0.75rem;
          color: #1a202c;
          font-size: 0.875rem;
          font-weight: 600;
        }

        ul {
          list-style: none;
          padding: 0;

          li {
            padding: 0.25rem 0;
            color: #6b7280;
            font-size: 0.875rem;
            display: flex;
            align-items: center;

            &:before {
              content: '•';
              color: #f59e0b;
              font-weight: bold;
              margin-right: 0.75rem;
            }
          }
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
          color: #f59e0b;
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
        color: #f59e0b;
        border-bottom-color: #f59e0b;
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

  .command-grid {
    display: grid;
    gap: 1.5rem;

    .command-item {
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
        font-size: 0.875rem;

        .copy-btn {
          background: #f59e0b;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          cursor: pointer;
          font-size: 0.875rem;
          transition: background-color 0.2s;

          &:hover {
            background: #d97706;
          }
        }
      }
    }
  }

  .workflow-steps {
    display: flex;
    flex-direction: column;
    gap: 1rem;

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
        background: #f59e0b;
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

  .update-config {
    h4 {
      margin-bottom: 0.5rem;
      color: #1a202c;
    }
  }
}
</style> 