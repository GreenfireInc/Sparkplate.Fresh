# Sparkplate Migration Guide: Vue 2 to Vue 3 + ESM

This document outlines the migration process for converting the Sparkplate boilerplate from Vue 2 + CommonJS to Vue 3 + ESM. This boilerplate is derived from Greenery (https://greenery.finance), a cryptocurrency bookkeeping and accounting wallet.

## Prerequisites

- Node.js 23+ (required for latest ESM features and Vue 3)
- npm 7+ or yarn 1.22+
- Understanding of Vue 3 Composition API
- Familiarity with ESM modules

## Development Workflow

Throughout the migration process, we'll use both `npm run dev` and `npm run build` to continuously test our changes. This will help us:
- Catch errors early in the development process
- Verify that each change doesn't break the application
- Ensure both development and production builds work correctly
- Test the render process changes in real-time
- Verify Electron packaging remains functional

### Development Testing Strategy

1. **Before Each Change**:
   - [ ] Start `npm run dev` in a separate terminal
   - [ ] Verify the application loads correctly
   - [ ] Test basic functionality
   - [ ] Run `npm run build` to verify current build state

2. **During Changes**:
   - [ ] Make small, incremental changes
   - [ ] Watch the dev server output for errors
   - [ ] Test affected functionality immediately
   - [ ] If errors occur, revert and fix before proceeding

3. **After Each Change**:
   - [ ] Verify the application still loads in dev mode
   - [ ] Test all affected features
   - [ ] Check both renderer and main process logs
   - [ ] Run `npm run build` to verify build still works
   - [ ] Document any issues or workarounds needed

### Build Verification Strategy

1. **After Each Phase**:
   - [ ] Run `npm run build`
   - [ ] Verify no build errors
   - [ ] Check build output in `dist/` directory
   - [ ] Verify Electron packaging
   - [ ] Test the built application

2. **Build-Specific Checks**:
   - [ ] Verify all assets are properly bundled
   - [ ] Check for any missing dependencies
   - [ ] Verify Electron main process files
   - [ ] Test production environment variables
   - [ ] Verify minification and optimization

## Migration Strategy

### Phase 0: Preparation
- [x] Set up ESLint with ESM rules
- [x] Configure Vite for ESM support
- [x] Add necessary ESM-compatible polyfills
- [x] DO NOT set `"type": "module"` in package.json yet
- [x] Start `npm run dev` and verify baseline functionality
- [x] Run `npm run build` to establish baseline build state
- [x] Document any existing build warnings or issues

### Phase 1: Initial ESM Migration (Render Process Only)

#### Development Testing Setup
- [ ] Keep `npm run dev` running throughout this phase
- [ ] Monitor both renderer and main process logs
- [ ] Test application after each file conversion
- [ ] Run `npm run build` after each significant change
- [ ] Verify build output matches expected structure

#### Critical Files Requiring ESM Migration (Render Process)

1. **Source Files**:
   - `src/main.js` - Entry point needs ESM conversion
   - `src/mixins.js` - Global mixins need ESM conversion
   - `src/initializer.js` - Initialization code needs ESM conversion
   - `src/utils/*.js` - All utility files need ESM conversion
   - `src/service/*.js` - Service files need ESM conversion
   - `src/models/*.js` - Model files need ESM conversion
   - `src/config/*.js` - Configuration files need ESM conversion

2. **Build Configuration**:
   - `vite.config.js` - Needs ESM configuration
   - `postcss.config.cjs` - Keep as CommonJS for now
   - `tailwind.config.cjs` - Keep as CommonJS for now

#### ESM Migration Steps (Render Process)

1. **File Extension Updates**:
   - [ ] Convert render process `.js` files to `.mjs` where appropriate
   - [ ] Update imports to use `.mjs` extensions
   - [ ] Update Vite configuration to handle `.mjs` files
   - [ ] Test with `npm run dev` after each file conversion
   - [ ] Run `npm run build` to verify build still works
   - [ ] Check for any new build warnings or errors
   - [ ] Verify build output structure

2. **Import/Export Syntax**:
   - [ ] Replace `require()` with `import` in render process files
   - [ ] Replace `module.exports` with `export` in render process files
   - [ ] Update dynamic imports to use `import()`
   - [ ] Convert `__dirname` and `__filename` usage to ESM equivalents
   - [ ] Test with `npm run dev` after each file conversion
   - [ ] Run `npm run build` to verify build still works
   - [ ] Check for any new build warnings or errors
   - [ ] Verify build output structure

3. **Dependency Updates**:
   - [ ] Update all render process dependencies to ESM-compatible versions
   - [ ] Replace CommonJS-only dependencies with ESM alternatives
   - [ ] Update crypto-related dependencies to ESM versions
   - [ ] Test with `npm run dev` after each dependency update
   - [ ] Run `npm run build` to verify build still works
   - [ ] Check for any new build warnings or errors
   - [ ] Verify build output structure

### Phase 2: Vue 3 Migration

#### Development Testing Setup
- [ ] Keep `npm run dev` running throughout this phase
- [ ] Monitor for Vue 3 compatibility warnings
- [ ] Test each component migration individually
- [ ] Run `npm run build` after each component migration
- [ ] Verify Vue 3 build output

## Migration Checklist

### 1. Dependencies Update

- [ ] Update Vue from 2.7.14 to Vue 3.x
- [ ] Update Vue Router from 3.x to 4.x
- [ ] Update Vuex from 3.x to 4.x or migrate to Pinia
- [ ] Update all Vue 2 plugins to their Vue 3 equivalents:
  - [ ] `vue-js-modal` → `@kyvg/vue3-notification`
  - [ ] `vue-izitoast` → `vue-toastification`
  - [ ] `vue-click-outside` → `@vueuse/core`
  - [ ] `vue-ripple-directive` → `@vueuse/core`
  - [ ] `vue-qrcode` → `qrcode.vue@next`
  - [ ] `vue-chartjs` → `vue-chart-3`
  - [ ] `vuex-persistedstate` → `pinia-plugin-persistedstate`
  - [ ] `vuex-shared-mutations` → Pinia's built-in state sharing

### 2. Vue Instance Migration

- [ ] Replace `new Vue()` with `createApp()` in `src/main.js`
- [ ] Update Vue Router initialization
- [ ] Update Vuex store initialization
- [ ] Migrate global mixins to composables
- [ ] Update global directives registration

### 3. Component Migration

- [ ] Convert Options API to Composition API:
  - [ ] Replace `data()` with `ref()` or `reactive()`
  - [ ] Convert `methods` to regular functions
  - [ ] Replace `computed` with `computed()`
  - [ ] Update lifecycle hooks:
    - `beforeCreate` → `setup()`
    - `created` → `setup()`
    - `beforeMount` → `onBeforeMount`
    - `mounted` → `onMounted`
    - `beforeUpdate` → `onBeforeUpdate`
    - `updated` → `onUpdated`
    - `beforeDestroy` → `onBeforeUnmount`
    - `destroyed` → `onUnmounted`
    - `errorCaptured` → `onErrorCaptured`

### 4. Store Migration

- [ ] Convert Vuex store to Pinia:
  - [ ] Create Pinia stores for each Vuex module
  - [ ] Replace `state` with `ref()` or `reactive()`
  - [ ] Convert mutations to actions
  - [ ] Update getters to computed properties
  - [ ] Migrate store plugins

### 5. Router Migration

- [ ] Update route definitions to Vue Router 4 syntax
- [ ] Migrate navigation guards
- [ ] Update route meta fields
- [ ] Convert route components to async components

### 6. Event Bus Migration

- [ ] Replace Event Bus with provide/inject
- [ ] Implement composables for shared state
- [ ] Use Pinia for global state management

### 7. CommonJS to ESM Migration

- [ ] Convert all `.js` files to use ESM syntax:
  - [ ] Replace `require()` with `import`
  - [ ] Replace `module.exports` with `export`
  - [ ] Update file extensions to `.mjs` where needed
  - [ ] Update `package.json` to use `"type": "module"`
  - [ ] Update Vite configuration for ESM support

### 8. Build System Updates

- [ ] Update Vite configuration:
  - [ ] Update `vite.config.js` for Vue 3
  - [ ] Configure ESM support
  - [ ] Update build targets
  - [ ] Configure proper chunk splitting

### 9. Testing Updates

- [ ] Update test files to use Vue 3 testing utilities
- [ ] Migrate from `@vue/test-utils` v1 to v2
- [ ] Update test setup files
- [ ] Convert test utilities to ESM

### 10. Electron Integration

- [ ] Update Electron main process code to ESM
- [ ] Update IPC communication patterns
- [ ] Verify preload script compatibility
- [ ] Update build configuration for Electron

## Special Considerations for Cryptocurrency Features

1. **Wallet Integration**:
   - Ensure all cryptocurrency-related libraries are ESM compatible
   - Update blockchain interaction patterns
   - Verify transaction signing mechanisms

2. **Security Updates**:
   - Review and update encryption methods
   - Update key management systems
   - Verify secure storage implementations

3. **Performance Optimization**:
   - Implement proper code splitting for wallet features
   - Optimize blockchain data handling
   - Update caching mechanisms

## Post-Migration Checklist

- [ ] Verify all cryptocurrency features work correctly
- [ ] Test wallet creation and recovery
- [ ] Verify transaction signing and broadcasting
- [ ] Test blockchain synchronization
- [ ] Verify secure storage functionality
- [ ] Test all UI components
- [ ] Verify Electron integration
- [ ] Run performance benchmarks
- [ ] Security audit

## Resources

- [Vue 3 Migration Guide](https://v3.vuejs.org/guide/migration/introduction.html)
- [Vue Router 4 Migration Guide](https://router.vuejs.org/guide/migration/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Electron Documentation](https://www.electronjs.org/docs/latest)

### Phase 3: Electron Main Process ESM Migration

#### Development Testing Setup
- [ ] Keep `npm run dev` running throughout this phase
- [ ] Monitor main process logs carefully
- [ ] Test IPC communication after each change
- [ ] Run `npm run build` after each main process change
- [ ] Verify Electron packaging

1. **Background Process Files**:
   - [ ] Convert `background/index.js` to ESM
   - [ ] Convert `background/preload.js` to ESM
   - [ ] Convert `background/utils/*.js` to ESM
   - [ ] Update `.electron-builder.config.js` for ESM support
   - [ ] Test with `npm run dev` after each file conversion
   - [ ] Run `npm run build` to verify build still works
   - [ ] Check Electron-specific build output
   - [ ] Verify packaged application functionality

2. **Electron-Specific Updates**:
   - [ ] Update IPC communication patterns
   - [ ] Convert preload script to full ESM
   - [ ] Update main process code to ESM
   - [ ] Verify contextBridge usage with ESM
   - [ ] Test with `npm run dev` after each change
   - [ ] Run `npm run build` to verify build still works
   - [ ] Check Electron-specific build output
   - [ ] Verify packaged application functionality

3. **Final ESM Configuration**:
   - [ ] Set `"type": "module"` in package.json
   - [ ] Update all remaining CommonJS files to ESM
   - [ ] Convert all `.cjs` configuration files to ESM
   - [ ] Update build scripts for ESM support
   - [ ] Test with `npm run dev` after each configuration change
   - [ ] Run `npm run build` to verify build still works
   - [ ] Check Electron-specific build output
   - [ ] Verify packaged application functionality

## Error Handling During Development

1. **Common Issues to Watch For**:
   - [ ] ESM import/export syntax errors
   - [ ] Vue 3 compatibility warnings
   - [ ] Electron main process errors
   - [ ] IPC communication failures
   - [ ] Build configuration issues

2. **Troubleshooting Steps**:
   - [ ] Check both renderer and main process logs
   - [ ] Verify file extensions and import paths
   - [ ] Test IPC communication channels
   - [ ] Check for mixed CommonJS/ESM usage
   - [ ] Verify Vue 3 component compatibility

## Build-Specific Error Handling

1. **Common Build Issues**:
   - [ ] Missing dependencies in production build
   - [ ] Incorrect file extensions in build output
   - [ ] ESM/CommonJS module conflicts
   - [ ] Electron packaging errors
   - [ ] Asset bundling issues

2. **Build Troubleshooting Steps**:
   - [ ] Check build logs for specific errors
   - [ ] Verify all required files are included
   - [ ] Check for circular dependencies
   - [ ] Verify production environment variables
   - [ ] Test with different build configurations

[Rest of the document remains the same...] 