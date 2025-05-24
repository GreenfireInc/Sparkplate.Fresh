# Vue Package Migration Steps

## Prerequisites
1. Create a new Git branch for the migration:
```bash
git checkout -b feature/vue3-migration
```

2. Backup your current `package.json`:
```bash
cp package.json package.json.backup
```

## Migration Steps

### Phase 1: Core Vue Packages
1. Remove Vue 2 core packages:
```bash
npm uninstall vue vue-router vuex vuex-persistedstate vuex-shared-mutations --force
```

2. Install Vue 3 core packages:
```bash
npm install vue@3.4.15 vue-router@4.2.5 pinia@2.1.7 pinia-plugin-persistedstate@3.2.0
```

3. Test the application:
```bash
npm run dev
```
- Check for any Vue-related errors
- Verify basic application functionality

### Phase 2: UI Components and Plugins
1. Remove Vue 2 specific UI packages:
```bash
npm uninstall vue-chartjs vue-gtag vue-izitoast --force
```

2. Install Vue 3 compatible UI packages:
```bash
npm install vue-chart-3@0.5.10 vue-gtag-next@1.0.0 vue-toastification@2.0.0-rc.5
```

3. Update existing packages to Vue 3 compatible versions:
```bash
npm install vue-js-modal@2.0.1 vue-js-toggle-button@2.1.0 vue-loading-overlay@4.1.0 vue-qrcode-reader@3.1.1
```

4. Test the application:
```bash
npm run dev
```
- Verify all UI components are rendering correctly
- Check for any plugin-related errors

### Phase 3: Development Dependencies
1. Remove Vue 2 specific dev dependencies:
```bash
npm uninstall @vitejs/plugin-vue2 --force
```

2. Install Vue 3 dev dependencies:
```bash
npm install @vitejs/plugin-vue@5.0.3 --save-dev
```

3. Update ESLint plugins:
```bash
npm install eslint-plugin-vue@9.25.0 vue-eslint-parser@9.4.2 --save-dev
```

### Phase 4: Post-Migration Verification
1. Run the build process:
```bash
npm run build
```

2. Check for any build errors or warnings

3. Test the production build:
```bash
npm run build:dir
```

## Rollback Procedure
If any issues are encountered during the migration:

1. Restore the backup package.json:
```bash
cp package.json.backup package.json
```

2. Clean the node_modules:
```bash
rm -rf node_modules
```

3. Reinstall all dependencies:
```bash
npm install
```

## Post-Migration Tasks
1. Update Vite configuration to use Vue 3 plugin
2. Update ESLint configuration for Vue 3
3. Migrate Vuex stores to Pinia
4. Update router configuration
5. Update component syntax to Vue 3

## Notes
- Each phase should be committed separately
- Test thoroughly after each package change
- Keep track of any issues in the migration log
- Document any workarounds or solutions found 