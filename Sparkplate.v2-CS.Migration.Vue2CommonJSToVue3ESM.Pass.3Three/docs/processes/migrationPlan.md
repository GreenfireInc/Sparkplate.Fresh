# Sparkplate Migration Plan: Vue 2 to Vue 3 + ESM

## Overview
This document outlines the detailed plan for migrating Sparkplate from Vue 2 + CommonJS to Vue 3 + ESM, based on the migration rules in `.rules/migrationRules.md`.

## Project Structure
The project is an Electron-based Vue application with:
- Vue 2.7.14 frontend
- Electron main process and preload scripts
- Vuex store for state management
- Vue Router for navigation
- Multiple Vue plugins

## Migration Strategy

### Phase 0: Preparation
- [x] Current analysis of codebase completed
- [ ] Set up ESLint with ESM rules 
- [ ] Configure Vite for ESM support
- [ ] Add necessary ESM-compatible polyfills
- [ ] **Important**: Do not set `"type": "module"` in package.json yet

### Phase 1: Initial ESM Migration (Render Process Only)

#### Dependencies Update
- [ ] Update dependencies to ESM-compatible versions
- [ ] Keep Vue 2.7.14 for now until render process is fully migrated to ESM

#### File Migration
1. **Key files to migrate first**:
   - [ ] `src/main.js` - Entry point
   - [ ] `src/initializer.js` - Initialization code
   - [ ] `src/mixins.js` - Global mixins
   - [ ] `src/utils/*.js` - Utility files
   - [ ] `src/service/*.js` - Service files
   - [ ] `src/models/*.js` - Model files
   - [ ] `src/config/*.js` - Configuration files

2. **Import/Export Syntax Updates**:
   - [ ] Replace `require()` with `import` statements
   - [ ] Replace `module.exports` with `export` statements
   - [ ] Update dynamic imports to use `import()`
   - [ ] Convert `__dirname` and `__filename` usage to ESM equivalents

3. **Vite Configuration**:
   - [ ] Update `vite.config.js` for ESM support
   - [ ] Keep `postcss.config.cjs` and `tailwind.config.cjs` as CommonJS for now

### Phase 2: Vue 3 Migration

#### Dependencies Update
- [ ] Update Vue from 2.7.14 to Vue 3.x
- [ ] Update Vue Router from 3.x to 4.x
- [ ] Update Vuex to Pinia
- [ ] Update Vue plugins to Vue 3 compatible versions:
  - [ ] `vue-js-modal` → `@kyvg/vue3-notification`
  - [ ] `vue-izitoast` → `vue-toastification`
  - [ ] `vue-click-outside` → `@vueuse/core`
  - [ ] `vue-ripple-directive` → `@vueuse/core`
  - [ ] `vue-qrcode` → `qrcode.vue@next`
  - [ ] `vue-chartjs` → `vue-chart-3`
  - [ ] `vuex-persistedstate` → `pinia-plugin-persistedstate`
  - [ ] `vuex-shared-mutations` → Pinia's built-in state sharing

#### Vue Instance Migration
- [ ] Update `src/main.js` to use `createApp()` instead of `new Vue()`
- [ ] Update `src/initializer.js` to use the Vue 3 app creation pattern
- [ ] Migrate global mixins to composables
- [ ] Update global directives registration

#### Router Migration
- [ ] Migrate router to Vue Router 4
- [ ] Update route definitions
- [ ] Migrate navigation guards
- [ ] Convert route components to async components

#### Store Migration
- [ ] Migrate Vuex store modules to Pinia stores:
  - [ ] `walletModule.js`
  - [ ] `contactModule.js`
  - [ ] `accountsModule.js`
  - [ ] `activityModule.js`
  - [ ] `settingsModule.js`
  - [ ] `web3ConnectionModule.js`
- [ ] Replace Vuex plugins with Pinia equivalents

#### Component Migration
- [ ] Convert Vue components from Options API to Composition API
- [ ] Update lifecycle hooks to their Vue 3 equivalents
- [ ] Replace `this` references with reactive state

### Phase 3: Electron Main Process ESM Migration

#### Background Process Files
- [ ] Update `background/index.js` to fully embrace ESM:
  - [ ] Remove `'use strict'` directive
  - [ ] Ensure all imports are ESM style
  - [ ] Update file handling and path manipulation for ESM
- [ ] Update IPC communication patterns
- [ ] Update Electron build configuration

#### Final ESM Configuration
- [ ] Set `"type": "module"` in package.json
- [ ] Update all remaining CommonJS files to ESM
- [ ] Convert `.cjs` configuration files to ESM
- [ ] Update build scripts for ESM support

## Testing Strategy

### For Each Phase
- [ ] Start `npm run dev` to test development build
- [ ] Test all affected functionality
- [ ] Run `npm run build` to verify production build
- [ ] Test the built application

### Specific Tests
- [ ] Test IPC communication between render and main processes
- [ ] Verify all Vue components render correctly
- [ ] Test all Vue Router navigation
- [ ] Verify state management with Pinia
- [ ] Test all cryptocurrency-related functionality
- [ ] Verify Electron packaging and distribution

## Error Handling
- Watch for common issues during development:
  - ESM import/export syntax errors
  - Vue 3 compatibility warnings
  - Electron main process errors
  - IPC communication failures
  - Build configuration issues

## Resources
- [Vue 3 Migration Guide](https://v3.vuejs.org/guide/migration/introduction.html)
- [Vue Router 4 Migration Guide](https://router.vuejs.org/guide/migration/)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Electron Documentation](https://www.electronjs.org/docs/latest) 