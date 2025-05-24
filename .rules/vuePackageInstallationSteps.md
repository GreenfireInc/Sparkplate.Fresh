# Vue 3 Package Installation Steps

## Prerequisites
1. Ensure all Vue 2 packages have been removed (follow `vuePackageRemovalSteps.md`)
2. Backup your current `package.json`:
```bash
cp package.json package.json.backup
```

## Phase 1: Core Vue Packages
```bash
# Install Vue 3 core packages
npm install \
  vue@3.4.15 \
  vue-router@4.2.5 \
  pinia@2.1.7 \
  pinia-plugin-persistedstate@3.2.0 \
  @vitejs/plugin-vue@5.0.3 --save-dev
```

## Phase 2: UI Components and Directives
```bash
# Install UI components and directives
npm install \
  vue3-ripple-directive \
  vue-directive-tooltip@2.0.0 \
  vue-js-toggle-button@2.1.0 \
  vue-js-modal@2.0.1 \
  vue-loading-overlay@4.1.0 \
  vue-country-flag@2.1.0
```

## Phase 3: QR Code and Related Packages
```bash
# Install QR code related packages
npm install \
  vue3-qrcode-reader@3.1.1 \
  @chenfengyuan/vue-qrcode@1.0.2
```

## Phase 4: Analytics and Notifications
```bash
# Install analytics and notification packages
npm install \
  vue-gtag-next@1.0.0 \
  vue-toastification@2.0.0-rc.5
```

## Development Dependencies
```bash
# Install Vue 3 specific dev dependencies
npm install --save-dev \
  @vue/compiler-sfc@3.4.15 \
  eslint-plugin-vue@9.25.0 \
  vue-eslint-parser@9.4.2
```

## Verification Steps
After each phase, run:
```bash
# Check installed Vue dependencies
npm ls | grep vue

# Verify package.json
cat package.json

# Test the application
npm run dev
```

## Configuration Updates

### Vite Configuration
Update `vite.config.js`:
```javascript
import vue from '@vitejs/plugin-vue'

export default {
  plugins: [
    vue()
  ]
}
```

### ESLint Configuration
Update `.eslintrc.js`:
```javascript
module.exports = {
  extends: [
    'plugin:vue/vue3-recommended'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  }
}
```

## Notes
1. Install packages in the specified order to avoid dependency conflicts
2. Run `npm install` after each phase
3. Test the application after each phase
4. Document any configuration changes or workarounds needed

## Post-Installation Tasks
1. Update component syntax to Vue 3
2. Migrate Vuex stores to Pinia
3. Update router configuration
4. Test all application functionality
5. Update any custom directives to Vue 3 syntax 