import vuePlugin from 'eslint-plugin-vue'
import js from '@eslint/js'
import vueEslintParser from 'vue-eslint-parser'
import babelParser from '@babel/eslint-parser'

export default [
  js.configs.recommended,
  {
    files: ['src/**/*.js', 'src/**/*.vue'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/patches/**',
      '**/build/**',
      '**/coverage/**',
      '**/.git/**'
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: vueEslintParser,
      parserOptions: {
        parser: babelParser,
        ecmaVersion: 2022,
        sourceType: 'module',
        requireConfigFile: false
      },
      globals: {
        // Browser globals
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        console: 'readonly',
        Blob: 'readonly',
        URL: 'readonly',
        Buffer: 'readonly',
        fetch: 'readonly',
        localStorage: 'readonly',
        FileReader: 'readonly',
        Image: 'readonly',
        // Timer functions
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly'
      }
    },
    plugins: {
      vue: vuePlugin
    },
    rules: {
      ...vuePlugin.configs.base.rules,
      ...vuePlugin.configs.essential.rules,
      'no-console': 'off',
      'no-debugger': 'off',
      'vue/comment-directive': 'off'
    }
  },
  {
    files: ['background/**/*.js'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/patches/**',
      '**/build/**',
      '**/coverage/**',
      '**/.git/**'
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        requireConfigFile: false
      },
      globals: {
        // Node.js globals
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        // Buffer
        Buffer: 'readonly',
        // Console
        console: 'readonly'
      }
    },
    rules: {
      'no-console': 'off'
    }
  },
  {
    files: ['vite.config.js'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.git/**'
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        requireConfigFile: false
      },
      globals: {
        // Node.js globals
        process: 'readonly',
        require: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        global: 'readonly',
        // Web APIs
        URL: 'readonly',
        // Console
        console: 'readonly'
      }
    },
    rules: {
      'no-console': 'off'
    }
  },
  {
    files: ['src/polyfills.js'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/build/**',
      '**/coverage/**',
      '**/.git/**'
    ],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      parser: babelParser,
      parserOptions: {
        ecmaVersion: 2022,
        sourceType: 'module',
        requireConfigFile: false
      },
      globals: {
        // Global object
        global: 'readonly',
        // Browser globals
        window: 'readonly',
        // Buffer
        Buffer: 'readonly'
      }
    },
    rules: {
      'no-console': 'off'
    }
  }
]
