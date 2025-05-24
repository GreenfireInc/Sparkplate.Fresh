# Sparkplate Source Preparation

## Project Overview
Sparkplate is a boilerplate for creating Vue + Vite + Electron cryptocurrency and blockchain-augmented applications. It provides a foundation for developers to build decentralized applications with built-in cryptocurrency functionality.

### Project Information
- GitHub Repository: [https://github.com/yourusername/sparkplate](https://github.com/yourusername/sparkplate)
- Documentation: [https://sparkplate.io/docs](https://sparkplate.io/docs)

## Project Structure and AI Assistant Guidelines

### Directory Structure
```
sparkplate/
├── .rules/                    # Core project documentation and rules
│   ├── sourcePrep.md          # This file - main source of truth
│   ├── projectBrief.md        # Project overview and goals
│   ├── applicationFlowDocument.md # User flows and processes
│   ├── techstackAndPackages.md # Technology stack details
│   ├── schemaDesignDoc.md     # System design and architecture
│   ├── apiDocs.md            # API integration documentation
│   ├── systemPrompts.md      # System configuration details
│   ├── sparkplatePrepAndExecution.md # Development action plan
│   └── documentationTemplate.md # Template for new documentation
└── docs/
    └── reasonings/           # Branch-specific documentation
        └── YYYYMMDD.featureName.md # Date-prefixed action files
```

### AI Assistant Guidelines

#### Documentation Management
1. All core documentation should be maintained in the `.rules` directory
2. Each file in `.rules` serves a specific purpose:
   - `sourcePrep.md`: Main reference document
   - `projectBrief.md`: Project overview and goals
   - `applicationFlowDocument.md`: User flows and processes
   - `techstackAndPackages.md`: Technology stack details
   - `schemaDesignDoc.md`: System design and architecture
   - `apiDocs.md`: API integration documentation
   - `systemPrompts.md`: System configuration details
   - `sparkplatePrepAndExecution.md`: Development action plan
   - `documentationTemplate.md`: Template for new documentation

3. When creating new documentation:
   - Use the `documentationTemplate.md` as a base
   - Follow the established markdown format
   - Include clear section headers
   - Use consistent formatting

#### Branch Documentation
1. All branch-specific documentation should be in `docs/reasonings/`
2. File naming convention:
   - Format: `YYYYMMDD.featureName.md`
   - Example: `20240414.esmMigration.md`
3. Each branch documentation should:
   - Reference relevant sections from `.rules` files
   - Document specific implementation decisions
   - Include any deviations from standard patterns
   - Note any challenges or considerations

#### Code Changes
1. When making code changes:
   - Reference relevant documentation in `.rules`
   - Update or create branch documentation in `docs/reasonings/`
   - Follow the established tech stack guidelines
   - Maintain consistent code style

2. For new features:
   - Create corresponding documentation in `.rules` if needed
   - Update relevant existing documentation
   - Create branch documentation in `docs/reasonings/`

#### Communication
1. When interacting with other AI assistants:
   - Reference specific files and sections
   - Use clear, consistent terminology
   - Document any assumptions or decisions
   - Maintain the established folder structure

#### Date Handling and Version Management
1. Date Format:
   - Use `date +%Y%m%d` for file naming
   - Use `date +%Y-%m-%d` for version history
   - Example: `2024-04-15` for version history, `20240415` for filenames

2. Version History Updates:
   - Always use current date from system
   - Format: `YYYY-MM-DD`
   - Include clear description of changes
   - Maintain chronological order
   - Example:
     ```bash
     # Get current date for version history
     CURRENT_DATE=$(date +%Y-%m-%d)
     # Get current date for filenames
     FILENAME_DATE=$(date +%Y%m%d)
     ```

3. Branch Naming:
   - Use system date in branch names
   - Format: `CS.Park.$(date +%Y%m%d)`
   - Example: `CS.Park.20240415`

## Core Requirements

### Project Brief
- Boilerplate for cryptocurrency applications
- Vue + Vite + Electron foundation
- Built-in cryptocurrency functionality
- Cross-platform support

### Application Flow
1. User Interface:
   - Navigation through sections
   - Address resolution
   - File system exploration
   - Network discovery
   - Settings management

2. Development Features:
   - Build system
   - Packaging tools
   - Publishing guides
   - Documentation

3. Additional Features:
   - Demo games
   - Cryptography tools
   - Network capabilities
   - Customization options

### Tech Stack
- Vite
- Vue 2 (Migrating to Vue 3)
- Electron
- Tailwind CSS
- Bootstrap
- shadcn-ui
- Node.js v23
- Linux development environment
- Bash shell

### Cryptocurrency Features
- Multiple blockchain support
- Address resolution system
- Domain name services:
  - Ada Domains
  - Bonfida
  - Ethereum Name Service
  - Interchain Name Service
  - BTC.us
  - Terra Name Service
  - Tezos Domains
  - Unstoppable Domains
  - Handshake

### API Integration
- CoinGecko (cryptocurrency pricing)
- WalletBeacon (Tezos wallet integration)
- Tezos Domains (domain name resolution)

### Development Environment
- Linux-based development
- Bash shell
- Node.js v23
- Cross-platform compatibility

### Documentation Structure
- All documentation in .rules directory
- Branch-specific documentation in docs/reasonings
- Date-prefixed action files
- Comprehensive action plan

## Implementation Guidelines
1. Follow Linux-based development practices
2. Use Node.js v23
3. Maintain consistent code style
4. Document all major changes
5. Create reasonings files for each branch
6. Ensure cross-platform compatibility
7. Implement comprehensive error handling
8. Follow security best practices
9. Maintain clear documentation
10. Regular testing and validation

### Branch Management
1. Pre-staging Branch Protocol:
   - Always check current branch before making changes
   - If in prestaging:
     - Pull latest changes
     - Create new feature branch: `CS.Park.$(date +%Y%m%d)`
     - Switch to new branch
   - Never commit directly to prestaging
   - Use pull requests for all changes

2. Branch Naming Convention:
   - Format: `CS.Park.$(date +%Y%m%d)`
   - Example: `CS.Park.20240415`
   - Use system date for consistency

3. Branch Workflow:
   - Create branch from latest prestaging
   - Make changes in feature branch
   - Create pull request for review
   - Merge only after approval
   - Delete feature branch after merge 