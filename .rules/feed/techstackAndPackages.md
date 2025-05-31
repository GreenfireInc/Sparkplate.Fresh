# Sparkplate Tech Stack and Packages

## Core Technologies

### Frontend Framework
- **Vue.js** (Currently Vue 2, Migrating to Vue 3)
  - Vue Router
  - Vuex (Migrating to Pinia)
  - Vue Composition API

### Build Tools
- **Vite**
  - Fast development server
  - Optimized production builds
  - Hot module replacement

### Desktop Framework
- **Electron**
  - Cross-platform desktop application
  - Native system integration
  - Main and renderer processes

### UI Framework
- **Tailwind CSS**
  - Utility-first CSS framework
  - Responsive design
  - Custom theme support

- **Bootstrap**
  - Component library
  - Grid system
  - Responsive utilities

- **shadcn-ui**
  - Component library
  - Design system
  - Accessibility features

### Backend
- **Node.js v23**
  - Runtime environment
  - Package management
  - Native modules

- **Express**
  - Web server framework
  - API endpoints
  - Middleware support

### Database
- **SQLite**
  - Local data storage
  - Lightweight database
  - File-based storage

### Networking
- **Colyseus**
  - Real-time multiplayer
  - Game server framework
  - WebSocket support

### Terminal UI
- **Blessed**
  - Terminal interface library
  - TUI components
  - Keyboard input handling

### Build and Packaging
- **Electron Forge**
  - Application packaging
  - Cross-platform builds
  - Installer generation

## Development Environment
- **Linux** (Primary development OS)
- **Bash** (Shell environment)
- **Node.js v23** (Runtime)
- **npm** (Package manager)

## Package Management
```json
{
  "dependencies": {
    "vue": "^2.7.14", // Migrating to Vue 3
    "electron": "^latest",
    "express": "^latest",
    "sqlite3": "^latest",
    "colyseus": "^latest",
    "blessed": "^latest",
    "tailwindcss": "^latest",
    "bootstrap": "^latest",
    "@shadcn/ui": "^latest"
  },
  "devDependencies": {
    "vite": "^latest",
    "electron-forge": "^latest",
    "@vitejs/plugin-vue": "^latest"
  }
}
```

## Version Control
- Git
- GitHub
- Branch management:
  - Main branch
  - Development branch
  - Feature branches

## Development Tools
- VS Code
- ESLint
- Prettier
- Git
- npm scripts

## Testing Tools
- Jest
- Vue Test Utils
- Electron Test Utils

## Documentation
- Markdown
- JSDoc
- Vue Style Guide
- Electron Documentation 