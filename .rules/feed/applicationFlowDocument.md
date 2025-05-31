# Sparkplate Application Flow

## User Journey

### 1. Application Launch
- User opens the Sparkplate application
- Application initializes with default settings
- Main dashboard is displayed

### 2. Navigation
- User can access different sections via sidebar navigation
- Each section provides specific functionality:
  - Home: Introduction and overview
  - Directories: File structure exploration
  - Cryptocurrency: Address resolution
  - Cryptography: File encryption/decryption
  - Networking: Network discovery
  - Techstack: Technology overview
  - Repurposing: Customization guide
  - Build: Build instructions
  - Package: Packaging guide
  - Publish: Publishing instructions
  - Games: Demo games
  - Settings: Application configuration

### 3. Address Resolution
- User navigates to Cryptocurrency section
- Enters human-readable address
- System resolves to cryptocurrency address
- Supports multiple blockchain domains:
  - Ada Domains
  - Bonfida
  - Ethereum Name Service
  - Interchain Name Service
  - BTC.us
  - Terra Name Service
  - Tezos Domains
  - Unstoppable Domains
  - Handshake

### 4. File System Exploration
- User accesses Directories section
- Views application file structure
- Navigates through directories
- Views file contents and documentation

### 5. Network Discovery
- Application automatically enters "network mode"
- Scans for other Sparkplate instances
- Displays connected instances
- Enables inter-instance communication

### 6. Settings Management
- User accesses Settings section
- Configures application appearance
- Toggles features:
  - Dark mode
  - Blessed interface
  - Express server
  - Network visibility
- Changes are applied immediately

### 7. Game Interaction
- User accesses Games section
- Selects from available games:
  - Pong
  - Tic Tac Toe
  - Breakout
- Plays games with local high score tracking
- Scores saved using Pinia/SQLite

### 8. Development Tools
- User accesses Build section
- Follows platform-specific build instructions
- Creates executables for:
  - Windows
  - Linux
  - macOS

### 9. Packaging and Publishing
- User accesses Package section
- Creates installable packages for:
  - Windows (MSI, EXE)
  - Linux (DEB, RPM, Flatpak, Snap, AppImage)
  - macOS (DMG, PKG)
- Follows publishing instructions for:
  - Chocolatey
  - Flathub
  - Snapcraft
  - Homebrew
  - Windows Store
  - Apple App Store 