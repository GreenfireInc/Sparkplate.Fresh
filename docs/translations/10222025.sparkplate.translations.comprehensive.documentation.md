# Multi-Language Menu Translations

This document explains how to use the multi-language translation system for Sparkplate's menu items.

## Overview

The translation system provides support for 5 languages:
- **English** (en) - Default
- **Spanish** (es) - Español
- **French** (fr) - Français
- **German** (de) - Deutsch
- **Portuguese** (pt) - Português

## Files Structure

```
src/locales/
├── menuTranslations.ts          # TypeScript translations with type safety
├── menuTranslations.js          # JavaScript version
└── menuIntegration.ts           # Electron menu integration utilities

src/composables/
└── useMenuTranslations.ts       # Vue composable for reactive translations
```

## Quick Start

### 1. Using in Vue Components

```vue
<script setup lang="ts">
import { useMenuTranslations, useLanguageSelector } from '@/composables/useMenuTranslations'

// Get translations
const { t, file, edit, about, setLanguage } = useMenuTranslations()

// Language selector
const { currentLanguage, availableLanguages, changeLanguage } = useLanguageSelector()
</script>

<template>
  <div>
    <!-- Use individual translations -->
    <h1>{{ file }}</h1>
    <button>{{ edit }}</button>
    
    <!-- Use translation function -->
    <p>{{ t('about') }}</p>
    
    <!-- Language selector -->
    <select v-model="currentLanguage" @change="changeLanguage(currentLanguage)">
      <option 
        v-for="lang in availableLanguages" 
        :key="lang.code" 
        :value="lang.code"
      >
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>
```

### 2. Using in Electron Main Process

```typescript
// In background/main/index.ts
import { setLocalizedAppMenu, updateMenuLanguage } from '../locales/menuIntegration'

// Set initial menu
setLocalizedAppMenu(win, 'en')

// Handle language changes from renderer
ipcMain.handle('change-language', (event, language) => {
  updateMenuLanguage(win, language)
})
```

### 3. Direct Translation Usage

```typescript
import { getTranslation, getLanguageTranslations } from '@/locales/menuTranslations'

// Get single translation
const fileLabel = getTranslation('file', 'es') // Returns "Archivo"

// Get all translations for a language
const spanishTranslations = getLanguageTranslations('es')
console.log(spanishTranslations.file) // "Archivo"
```

## Available Translation Keys

### Main Menu Labels
- `file` - File menu
- `edit` - Edit menu
- `view` - View menu
- `window` - Window menu
- `help` - Help menu

### File Menu Items
- `close` - Close
- `quit` - Quit

### Edit Menu Items
- `undo` - Undo
- `redo` - Redo
- `cut` - Cut
- `copy` - Copy
- `paste` - Paste
- `delete` - Delete
- `selectAll` - Select All

### View Menu Items
- `toggleDevTools` - Toggle Developer Tools
- `forceReload` - Force Reload
- `resetZoom` - Reset Zoom
- `zoomIn` - Zoom In
- `zoomOut` - Zoom Out
- `toggleFullscreen` - Toggle Fullscreen

### Window Menu Items
- `minimize` - Minimize
- `zoom` - Zoom
- `front` - Bring All to Front
- `window` - Window

### Help Menu Items
- `keyboardShortcuts` - Keyboard Shortcuts
- `about` - About
- `restoreBackup` - Restore Backup

### Navigation Items
- `home` - Home
- `keyFiles` - Key Files
- `cryptocurrency` - Cryptocurrency
- `cryptography` - Cryptography
- `networking` - Networking
- `techStack` - Tech Stack
- `repurposing` - Repurposing
- `build` - Build
- `package` - Package
- `publish` - Publish
- `games` - Games
- `sandbox` - Sandbox
- `settings` - Settings

## Implementation Examples

### Example 1: Language Selector Component

```vue
<template>
  <div class="language-selector">
    <label for="language-select">Language:</label>
    <select 
      id="language-select"
      v-model="selectedLanguage" 
      @change="handleLanguageChange"
    >
      <option 
        v-for="lang in availableLanguages" 
        :key="lang.code" 
        :value="lang.code"
      >
        {{ lang.name }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useLanguageSelector } from '@/composables/useMenuTranslations'

const { currentLanguage, availableLanguages, changeLanguage, loadSavedLanguage } = useLanguageSelector()
const selectedLanguage = ref(currentLanguage.value)

const handleLanguageChange = () => {
  changeLanguage(selectedLanguage.value)
}

onMounted(() => {
  loadSavedLanguage()
  selectedLanguage.value = currentLanguage.value
})
</script>
```

### Example 2: Updating Existing appMenu.js

```javascript
// Replace your existing appMenu.js with this localized version
import { app, Menu } from 'electron'
import { getTranslation } from '../locales/menuTranslations'

const isMac = process.platform === 'darwin'
const isDevelopment = import.meta.env.DEV

// Get current language from settings or default to English
const currentLanguage = 'en' // This should come from user settings

function setAppMenu(browserWindow) {
  const t = (key) => getTranslation(key, currentLanguage)
  
  const template = [
    ...(isMac ? [{
      label: app.name,
      submenu: [
        { role: 'quit', label: t('quit') }
      ]
    }] : []),
    {
      label: t('file'),
      submenu: [
        isMac ? { role: 'close', label: t('close') } : { role: 'quit', label: t('quit') }
      ]
    },
    {
      label: t('edit'),
      submenu: [
        { role: 'undo', label: t('undo') },
        { role: 'redo', label: t('redo') },
        { type: 'separator' },
        { role: 'cut', label: t('cut') },
        { role: 'copy', label: t('copy') },
        { role: 'paste', label: t('paste') },
        { role: 'delete', label: t('delete') },
        { type: 'separator' },
        { role: 'selectAll', label: t('selectAll') }
      ]
    },
    {
      label: t('view'),
      submenu: [
        ...(isDevelopment
          ? [
            { role: 'toggleDevTools', label: t('toggleDevTools') },
            { role: 'forceReload', label: t('forceReload') },
            { type: 'separator' }
          ] : []
        ),
        { role: 'resetZoom', label: t('resetZoom') },
        { role: 'zoomIn', label: t('zoomIn') },
        { role: 'zoomOut', label: t('zoomOut') },
        { type: 'separator' },
        { role: 'togglefullscreen', label: t('toggleFullscreen') }
      ]
    },
    {
      label: t('window'),
      submenu: [
        { role: 'minimize', label: t('minimize') },
        { role: 'zoom', label: t('zoom') },
        ...(isMac ? [
          { type: 'separator' },
          { role: 'front', label: t('front') },
          { type: 'separator' },
          { role: 'window', label: t('window') }
        ] : [])
      ]
    },
    {
      label: t('help'),
      submenu: [
        {
          label: t('keyboardShortcuts'),
          click: () => {
            browserWindow?.webContents.send('keyboard-shortcuts-modal-open')
          }
        },
        {
          label: t('about'),
          click: () => {
            browserWindow?.webContents.send('about-modal-open')
          }
        }
      ]
    }
  ]

  const menu = Menu.buildFromTemplate(template)
  Menu.setApplicationMenu(menu)
}

export default setAppMenu
```

## Adding New Languages

To add a new language:

1. Add the language code to the `SupportedLanguage` type in `menuTranslations.ts`
2. Add the language object to the `menuTranslations` object
3. Add the language to the `availableLanguages` array

```typescript
// Example: Adding Italian
export type SupportedLanguage = 'en' | 'es' | 'fr' | 'de' | 'pt' | 'it'

export const menuTranslations: Record<SupportedLanguage, MenuTranslations> = {
  // ... existing languages
  it: {
    file: 'File',
    edit: 'Modifica',
    // ... rest of Italian translations
  }
}

export const availableLanguages = [
  // ... existing languages
  { code: 'it' as SupportedLanguage, name: 'Italiano' }
] as const
```

## Best Practices

1. **Always use the translation functions** instead of hardcoded strings
2. **Store language preference** in localStorage or user settings
3. **Update Electron menu** when language changes
4. **Provide fallback** to English if translation is missing
5. **Test all languages** to ensure UI elements fit properly
6. **Use TypeScript** for better type safety and IDE support

## Troubleshooting

### Common Issues

1. **Translation not showing**: Check if the key exists in the translation object
2. **TypeScript errors**: Ensure you're using the correct key types
3. **Menu not updating**: Make sure to call `updateMenuLanguage()` after language change
4. **Missing translations**: Add the missing key to all language objects

### Debug Mode

Enable debug logging to see translation lookups:

```typescript
const t = (key: keyof MenuTranslations) => {
  const translation = getTranslation(key, language.value)
  if (import.meta.env.DEV) {
    console.log(`Translation: ${key} -> ${translation}`)
  }
  return translation
}
```

## Future Enhancements

- [ ] Add more languages (Italian, Japanese, Chinese, etc.)
- [ ] Implement pluralization support
- [ ] Add date/time formatting translations
- [ ] Create translation management interface
- [ ] Add RTL (Right-to-Left) language support
- [ ] Implement translation validation
