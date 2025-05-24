# Vue Migration Troubleshooting Guide

## Common Issues and Solutions

### 1. Dependency Resolution Conflicts
**Symptoms:**
- `ERESOLVE` errors in npm logs
- Incompatible peer dependencies
- Package version conflicts

**Solutions:**
```bash
# First, ensure Node.js 23 is installed and active
nvm install 23
nvm use 23

# Clean npm cache and node_modules
rm -rf node_modules
rm package-lock.json
npm cache clean --force

# Install with strict peer dependency checking
npm install

# If specific package conflicts are identified, resolve them individually
npm install package@version --save-exact
```

**Proper Dependency Resolution Steps:**
1. Check package.json for exact versions
2. Update peer dependency requirements
3. Use `npm ls` to identify dependency trees
4. Resolve conflicts by updating to compatible versions

### 2. Vue Router Migration Issues
**Symptoms:**
- Navigation errors
- Route guards not working
- Component mounting issues

**Solutions:**
```javascript
// Update router configuration
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    // your routes
  ]
})

// Update navigation guards
router.beforeEach((to, from, next) => {
  // Vue 3 syntax
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login')
  } else {
    next()
  }
})
```

### 3. State Management (Vuex to Pinia)
**Symptoms:**
- Store not accessible
- Actions not working
- State not persisting

**Solutions:**
```javascript
// Create Pinia store
import { defineStore } from 'pinia'

export const useMainStore = defineStore('main', {
  state: () => ({
    // your state
  }),
  actions: {
    // your actions
  },
  persist: true // for persisted state
})

// Update component usage
import { useMainStore } from '@/stores/main'

export default {
  setup() {
    const store = useMainStore()
    return { store }
  }
}
```

### 4. Component Syntax Issues
**Symptoms:**
- Template errors
- Event handling not working
- Props not being received

**Solutions:**
```vue
<!-- Update component syntax -->
<template>
  <!-- Use v-model:propName instead of .sync -->
  <child-component v-model:title="title" />
  
  <!-- Use @update:propName for custom v-model -->
  <child-component @update:title="title = $event" />
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  // Composition API
  setup() {
    // your setup code
  }
})
</script>
```

### 5. Directive Issues
**Symptoms:**
- Custom directives not working
- v-model issues
- Event modifiers not functioning

**Solutions:**
```javascript
// Update custom directives
const vRipple = {
  mounted(el, binding) {
    // Vue 3 directive syntax
    el.addEventListener('click', (e) => {
      // your directive logic
    })
  }
}

// Register globally
app.directive('ripple', vRipple)
```

### 6. Build Configuration Issues
**Symptoms:**
- Vite build errors
- Asset loading issues
- Module resolution problems

**Solutions:**
```javascript
// Update vite.config.js
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  build: {
    // Add any necessary build options
  }
})
```

### 7. ESLint Configuration
**Symptoms:**
- Linting errors
- Vue 3 specific syntax warnings
- Parser errors

**Solutions:**
```javascript
// Update .eslintrc.js
module.exports = {
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-essential'
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser',
    ecmaVersion: 2020
  },
  rules: {
    // Add any necessary rules
  }
}
```

## Debugging Steps

1. **Check npm logs**
```bash
# View recent npm logs
cat docs/_logsFrom.npm/$(ls -t docs/_logsFrom.npm | head -1)
```

2. **Verify package versions**
```bash
# Check installed versions
npm ls vue
npm ls vue-router
npm ls pinia
```

3. **Test in isolation**
```bash
# Create a test component
# Test specific functionality
# Verify each migration step
```

## Dependency Resolution Best Practices

1. **Version Management**
```bash
# Use exact versions in package.json
npm install package@version --save-exact

# Update dependencies systematically
npm update package@version
```

2. **Peer Dependency Resolution**
```bash
# Check peer dependency requirements
npm ls peer

# Resolve conflicts by updating to compatible versions
npm install package@version --save-exact
```

3. **Node.js 23 Compatibility**
```bash
# Verify Node.js version
node -v

# Update npm to latest version
npm install -g npm@latest

# Check for outdated packages
npm outdated
```

## Rollback Procedure

If issues persist:
1. Restore package.json backup
2. Clear node_modules
3. Reinstall dependencies
4. Document the specific issue
5. Create a new branch for the next attempt

## Additional Resources
- [Vue 3 Migration Guide](https://v3.vuejs.org/guide/migration/introduction.html)
- [Pinia Documentation](https://pinia.vuejs.org/)
- [Vue Router 4 Documentation](https://router.vuejs.org/)
- [Node.js 23 Documentation](https://nodejs.org/docs/latest-v23.x/api/) 