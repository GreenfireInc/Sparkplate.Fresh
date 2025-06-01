# Sparkplate System Prompts

## Development Environment

### 1. Operating System
- Primary OS: Linux
- Shell: Bash
- Node.js Version: 23
- Package Manager: npm

### 2. Branch Management
```bash
# Check current branch
git branch --show-current

# If in prestaging:
git pull origin prestaging
git checkout -b "CS.Park.$(date +%Y%m%d)"
git push -u origin "CS.Park.$(date +%Y%m%d)"
```

### 3. Commit Guidelines
- Never commit directly to prestaging
- Use pull requests for all changes
- Follow conventional commits
- Include relevant issue numbers

## Code Style

### 1. JavaScript/TypeScript
- Use ES modules (import/export)
- Follow Vue 3 Composition API
- Use TypeScript where possible
- Follow ESLint rules

### 2. Vue Components
```javascript
// Component structure
<script setup>
// Imports
import { ref, onMounted } from 'vue'

// Props
const props = defineProps({
  // prop definitions
})

// Emits
const emit = defineEmits(['eventName'])

// State
const state = ref(null)

// Methods
const methodName = () => {
  // implementation
}

// Lifecycle
onMounted(() => {
  // implementation
})
</script>

<template>
  <!-- Template -->
</template>

<style scoped>
/* Styles */
</style>
```

### 3. File Organization
```
src/
├── components/     # Reusable components
├── views/         # Page components
├── assets/        # Static assets
├── styles/        # CSS and styling
├── utils/         # Utility functions
├── services/      # API services
├── stores/        # State management
└── types/         # TypeScript types
```

### 4. Documentation Organization
```
docs/
├── prRequests/     # PR request summaries
├── progress/       # Progress documentation
├── errorsIssues/   # Error reports and issues
├── research/       # Research and analysis
├── findings/       # Project findings
└── reasonings/     # Decision reasoning
```

### 5. File Naming Conventions
- **PR Request files**: 
  - Location: `docs/prRequests/`
  - Format: camelCase, no hyphens or underscores
  - Style: camelCase, no hyphens or underscores
  - Example: `06012025.prRequest.keyboardShortcuts.md`

- **Progress Documentation**:
  - Location: `docs/progress/`
  - Format: `MMDDYYYY.progress.category.component.md`
  - Style: Use dots as separators, lowercase
  - Example: `06012025.progress.menumodal.keyboardshortcuts.md`

- **Vue Components**:
  - Format: PascalCase for component names
  - Example: `KeyboardShortcuts.vue`

- **Utility/Helper Files**:
  - Format: camelCase
  - Example: `useMenuState.ts`

## Documentation

### 1. File Headers
```javascript
/**
 * @fileoverview Brief description of the file
 * @author Your Name
 * @version 1.0.0
 * @date YYYY-MM-DD
 */
```

### 2. Function Documentation
```javascript
/**
 * Brief description of the function
 * @param {Type} paramName - Description of parameter
 * @returns {Type} Description of return value
 * @throws {ErrorType} Description of error
 */
```

### 3. Component Documentation
```javascript
/**
 * @component ComponentName
 * @description Brief description of the component
 * @props {Type} propName - Description of prop
 * @emits eventName - Description of event
 * @example
 * <ComponentName propName="value" @eventName="handler" />
 */
```

### 4. Progress Documentation Format
```markdown
# Component Name Progress Report

**Date:** Month DD, YYYY  
**Component:** `path/to/Component.vue`  
**Type:** Component Type  
**Status:** ✅ **Status Description**

---

## 🎯 **Overview**
Brief description of the component and its purpose.

### **Key Achievements**
- ✅ **Achievement 1** - Description
- ✅ **Achievement 2** - Description

---

## 🔧 **Technical Implementation**
Technical details and code samples.

---

## 📊 **Testing Status**
Testing information and checklist.

---

## 🚀 **Future Enhancements**
Planned improvements and future work.
```

## Testing

### 1. Unit Tests
```javascript
describe('ComponentName', () => {
  it('should do something', () => {
    // Test implementation
  })
})
```

### 2. E2E Tests
```javascript
describe('Feature', () => {
  it('should work end-to-end', () => {
    // Test implementation
  })
})
```

## Build and Deployment

### 1. Development
```bash
# Start development server
npm run dev

# Run tests
npm run test

# Lint code
npm run lint
```

### 2. Production
```bash
# Build application
npm run build

# Package for distribution
npm run package

# Publish to stores
npm run publish
```

## Error Handling

### 1. API Errors
```javascript
try {
  // API call
} catch (error) {
  console.error('API Error:', error)
  // Handle error
}
```

### 2. Component Errors
```javascript
onErrorCaptured((err, instance, info) => {
  console.error('Component Error:', err)
  // Handle error
  return false // Prevent error propagation
})
```

## Performance

### 1. Code Splitting
```javascript
// Dynamic imports
const Component = defineAsyncComponent(() =>
  import('./Component.vue')
)
```

### 2. Caching
```javascript
// Cache API responses
const cache = new Map()

async function fetchWithCache(url) {
  if (cache.has(url)) {
    return cache.get(url)
  }
  const response = await fetch(url)
  cache.set(url, response)
  return response
}
```

## Security

### 1. Input Validation
```javascript
function validateInput(input) {
  // Validate input
  if (!isValid(input)) {
    throw new Error('Invalid input')
  }
  return sanitize(input)
}
```

### 2. Environment Variables
```bash
# .env file
API_KEY=your_api_key
NODE_ENV=development
```

## Common Patterns

### 1. Keyboard Shortcuts
```javascript
// Implement keyboard shortcuts
keyBoardShortcut(evt) {
  const metaKey = isMac ? evt.metaKey : evt.ctrlKey
  
  // Handle keyboard event
  if (metaKey && evt.keyCode === 9) { // Tab key
    evt.preventDefault()
    // Handle shortcut
  } else if (metaKey && evt.shiftKey && evt.keyCode === 191) { // Ctrl+Shift+?
    evt.preventDefault()
    // Handle shortcut
  }
}

// Register event listener
created() {
  document.addEventListener('keydown', this.keyBoardShortcut)
}

// Clean up event listener
beforeUnmount() {
  document.removeEventListener('keydown', this.keyBoardShortcut)
}
```

### 2. Composable State Management
```javascript
// State management composable
import { ref } from 'vue'

export function useState() {
  const state = ref(initialValue)
  
  const updateState = (newValue) => {
    state.value = newValue
  }
  
  return {
    state,
    updateState
  }
}

// Usage in component
import { useState } from '@/composables/useState'

export default {
  setup() {
    const { state, updateState } = useState()
    return { state, updateState }
  }
}
```

### 3. Platform Detection
```javascript
// Platform detection
const isMac = window.app.platform === 'darwin'
const metaKeyIdentifier = isMac ? '⌘' : 'Ctrl'
```

### 4. Modal Implementation
```javascript
// Modal implementation with teleport
<template>
  <Teleport to="body">
    <div 
      v-if="isOpen" 
      class="modal-overlay"
      @click.self="closeModal"
    >
      <div class="modal-content">
        <!-- Modal content -->
      </div>
    </div>
  </Teleport>
</template>
``` 