# Vue 2 Package Removal Steps

## Phase 1: Core Vue Packages
```bash
# Remove Vue 2 core packages
npm uninstall --force \
  vue-router \
  vuex \
  vuex-persistedstate \
  vuex-shared-mutations \
  @vitejs/plugin-vue2
```

## Phase 2: UI Components and Directives
```bash
# Remove UI components and directives
npm uninstall --force \
  vue-ripple-directive \
  vue-directive-tooltip \
  vue-js-toggle-button \
  vue-js-modal \
  vue-loading-overlay \
  vue-country-flag
```

## Phase 3: QR Code and Related Packages
```bash
# Remove QR code related packages
npm uninstall --force \
  vue-qrcode-reader \
  vue-qrcode \
  qrcode.vue
```

## Phase 4: Analytics and Notifications
```bash
# Remove analytics and notification packages
npm uninstall --force \
  vue-gtag \
  vue-izitoast
```

## Verification Steps
After each phase, run:
```bash
# Check for any remaining Vue 2 dependencies
npm ls | grep vue

# Verify package.json
cat package.json

# Test the application
npm run dev
```

## Notes
1. Use `--force` flag to ensure complete removal
2. Run `npm install` after each phase to ensure dependencies are properly resolved
3. Keep track of any errors or warnings during the removal process
4. Document any manual cleanup required in components or configuration files

## Post-Removal Tasks
1. Update Vite configuration
2. Update ESLint configuration
3. Update any remaining Vue 2 specific code
4. Test application functionality 