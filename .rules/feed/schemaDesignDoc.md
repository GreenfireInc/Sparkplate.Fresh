# Sparkplate Schema Design

## Page Components

### 1. Home
```javascript
{
  title: "Sparkplate",
  description: "Introduction to the application",
  features: [
    "Overview of capabilities",
    "Quick start guide",
    "Recent updates"
  ]
}
```

### 2. Directories
```javascript
{
  structure: {
    src: {
      components: "Vue components",
      views: "Page components",
      assets: "Static assets",
      styles: "CSS and styling",
      utils: "Utility functions"
    },
    public: "Public assets",
    docs: "Documentation",
    .rules: "Project rules"
  }
}
```

### 3. Cryptocurrency
```javascript
{
  resolvers: {
    ada: "Ada Domains resolver",
    bonfida: "Bonfida resolver",
    ens: "Ethereum Name Service",
    icns: "Interchain Name Service",
    btc: "BTC.us resolver",
    terra: "Terra Name Service",
    tezos: "Tezos Domains",
    unstoppable: "Unstoppable Domains",
    handshake: "Handshake resolver"
  },
  resolution: {
    input: "Human-readable address",
    output: "Cryptocurrency address",
    chain: "Blockchain network"
  }
}
```

### 4. Cryptography
```javascript
{
  methods: {
    hash: [
      "SHA-256",
      "SHA-512",
      "MD5",
      "Bcrypt"
    ],
    encryption: [
      "AES",
      "RSA",
      "ECC"
    ],
    file: {
      encrypt: "File encryption",
      decrypt: "File decryption",
      verify: "File verification"
    }
  }
}
```

### 5. Networking
```javascript
{
  discovery: {
    mode: "Network mode",
    scan: "Network scanning",
    instances: "Connected instances"
  },
  communication: {
    protocol: "WebSocket",
    messages: "Inter-instance messages"
  }
}
```

### 6. Techstack
```javascript
{
  frontend: {
    framework: "Vue.js",
    build: "Vite",
    ui: ["Tailwind CSS", "Bootstrap", "shadcn-ui"]
  },
  backend: {
    runtime: "Node.js v23",
    server: "Express",
    database: "SQLite"
  },
  desktop: {
    framework: "Electron",
    packaging: "Electron Forge"
  }
}
```

### 7. Repurposing
```javascript
{
  customization: {
    sidebar: "Navigation customization",
    pages: "New page addition",
    icons: "Icon replacement",
    theme: "Theme modification"
  },
  filesystem: {
    map: "Directory structure",
    critical: "Essential files",
    configuration: "Config files"
  }
}
```

### 8. Build
```javascript
{
  platforms: {
    windows: "Windows executable",
    linux: "Linux executable",
    macos: "macOS executable"
  },
  configuration: {
    electron: "Electron config",
    forge: "Forge config",
    vite: "Vite config"
  }
}
```

### 9. Package
```javascript
{
  formats: {
    windows: ["MSI", "EXE"],
    linux: ["DEB", "RPM", "Flatpak", "Snap", "AppImage"],
    macos: ["DMG", "PKG"]
  },
  configuration: {
    installer: "Installer settings",
    signing: "Code signing",
    updates: "Update mechanism"
  }
}
```

### 10. Publish
```javascript
{
  repositories: {
    windows: ["Chocolatey", "Windows Store"],
    linux: ["Flathub", "Snapcraft"],
    macos: ["Homebrew", "App Store"]
  },
  requirements: {
    signing: "Code signing",
    metadata: "Store metadata",
    assets: "Marketing assets"
  }
}
```

### 11. Games
```javascript
{
  games: {
    pong: {
      controls: "Keyboard/mouse",
      scoring: "High score tracking",
      multiplayer: "Network play"
    },
    tictactoe: {
      mode: "Single/multiplayer",
      ai: "Computer opponent",
      scoring: "Win tracking"
    },
    breakout: {
      levels: "Multiple levels",
      scoring: "High score system",
      powerups: "Special abilities"
    }
  },
  storage: {
    local: "SQLite database",
    state: "Pinia store"
  }
}
```

### 12. Settings
```javascript
{
  appearance: {
    theme: "Light/Dark mode",
    layout: "Interface layout",
    font: "Text settings"
  },
  features: {
    blessed: "Terminal UI toggle",
    express: "Server toggle",
    network: "Network visibility"
  },
  storage: {
    local: "Local settings",
    sync: "Settings sync"
  }
}
```

## Data Models

### User Settings
```javascript
{
  theme: "light|dark",
  features: {
    blessed: boolean,
    express: boolean,
    network: boolean
  },
  games: {
    highscores: {
      pong: number,
      tictactoe: number,
      breakout: number
    }
  }
}
```

### Network Instance
```javascript
{
  id: string,
  name: string,
  address: string,
  status: "online|offline",
  lastSeen: timestamp
}
```

### Address Resolution
```javascript
{
  input: string,
  output: string,
  resolver: string,
  timestamp: number,
  status: "success|error"
}
```

### Game State
```javascript
{
  game: "pong|tictactoe|breakout",
  score: number,
  level: number,
  player: string,
  timestamp: number
}
``` 