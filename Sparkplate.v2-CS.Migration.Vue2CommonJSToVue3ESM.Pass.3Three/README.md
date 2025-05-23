# Sparkplate.Vue

Sparkplate features base components and methods for interfacing with various APIs. Built in is a test page for resolving human readable domains to crypto addresses.

## Project Documentation

The `.rules` directory serves as a central location for project documentation, guidelines, and instructions. This directory is particularly important for:

1. **AI Assistant Guidance**
   - Contains detailed instructions for AI assistants working on the project
   - Provides templates and standards for documentation
   - Includes migration guides and implementation details

2. **Current Documentation**
   - `migrationRules.md`: Comprehensive guide for migrating from Vue 2 to Vue 3 and CommonJS to ESM
   - `documentationTemplate.md`: Template for creating new project documentation

3. **Documentation Standards**
   - All documentation follows a consistent format
   - Includes checklists for tracking progress
   - Contains version history for tracking changes
   - Provides clear prerequisites and testing strategies

4. **Purpose**
   - Maintain project consistency
   - Guide development processes
   - Document best practices
   - Provide clear instructions for both humans and AI
   - Track project evolution and changes

### Contributing to Documentation

1. **Creating New Documentation**
   - Use `documentationTemplate.md` as a starting point
   - Follow the established format and structure
   - Include all necessary sections from the template
   - Add version history for tracking changes

2. **Documentation Standards**
   - All files must use Markdown format (.md)
   - Use camelCase for file names (e.g., `migrationRules.md`)
   - Include a clear title and overview
   - Use checkboxes for tracking progress
   - Provide clear prerequisites and testing steps

3. **Updating Existing Documentation**
   - Update version history with changes
   - Maintain backward compatibility
   - Document any breaking changes
   - Update related documentation if needed

4. **Review Process**
   - Documentation should be reviewed before merging
   - Verify all links and references
   - Ensure consistency with other documentation
   - Check for completeness and clarity

5. **AI Assistant Considerations**
   - Include clear instructions for AI
   - Document any project-specific conventions
   - Provide context for automated tasks
   - Include examples where helpful

### Get Started

```
npm install
npm run dev
```

Most APIs will need keys, secrets, and/or ids to perform as expected. Use the table below as a reference to get and setup your api keys with a `.env` file.

| Service                                                                                                                | Description | Env Variable Name                |
| ---------------------------------------------------------------------------------------------------------------------- | ----------- | -------------------------------- |
| [Alchemy](https://www.alchemy.com/transfers-api) (Used for ETH transaction history)                                    | API Key     | `VITE_ALCHEMY_API_KEY`           |
| [Blockchair](https://blockchair.com/api) (Used for BTC, DOGE, LTC integration)                                         | API Key     | `VITE_BLOCKCHAIR_API_KEY`        |
| [Coin Market Cap](https://coinmarketcap.com/api/) (Used for realtime market info)                                      | API Key     | `VITE_COINMARKET_API_KEY`        |
| [Changelly](https://changelly.com/api-for-partners/exchange-api) (Used for exchanging cryptocurrencies)                | API Key     | `VITE_CHANGELLY_API_KEY`         |
| [Changelly](https://changelly.com/api-for-partners/exchange-api) (Used for exchanging cryptocurrencies)                | API Secret  | `VITE_CHANGELLY_API_SECRET`      |
| [Infura](https://www.infura.io/) (Used for ETH integration)                                                            | Project ID  | `VITE_INFURA_PROJECT_ID`         |
| [Wallet Connect](https://docs.walletconnect.com/2.0/web/web3wallet/installation) (Connect with dApps as a web3 wallet) | Project ID  | `VITE_WALLET_CONNECT_PROJECT_ID` |
| [Wert](https://docs.wert.io/docs) (Purchase crypto using the Wert widget)                                              | Partner ID  | `VITE_WERT_PARTNER_ID`           |
| [Wert](https://docs.wert.io/docs) (Purchase crypto using the Wert widget)                                              | Origin URL  | `VITE_WERT_ORIGIN`               |
