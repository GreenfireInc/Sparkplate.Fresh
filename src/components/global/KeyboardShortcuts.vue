<template>
  <Teleport to="body">
    <div 
      v-if="keyboardShortcutsOpen" 
      class="modal-overlay"
      @click.self="hideModal"
    >
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="h4 font-semibold mb-0">Keyboard Shortcuts</h4>
          <button @click="hideModal" class="close-btn">&times;</button>
        </div>
        
        <div class="table-container">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Function</th>
                <th scope="col">Keyboard Shortcut</th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="(shortcut, i) in shortcuts"
                :key="`shortcut-${shortcut.action}`"
              >
                <th>{{ i + 1 }}</th>
                <td>{{ shortcut.action }}</td>
                <td>{{ shortcut.key }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script>
// Utilities
const isMac = window.app.platform === 'darwin'

// Shortcuts table array
const shortcut = (key, action) => ({ key, action })
const metaKeyIdentifier = isMac ? '⌘' : 'Ctrl'
const shortcuts = [
  shortcut(`${metaKeyIdentifier} + Tab`, 'Go to Next Page'),
  shortcut(`${metaKeyIdentifier} + Shift + Tab`, 'Go to Previous Page'),
  shortcut(`${metaKeyIdentifier} + Shift + ~`, 'Go to Home'),
  shortcut(`${metaKeyIdentifier} + ,`, 'Go to Settings'),
  shortcut(`${metaKeyIdentifier} + .`, 'Toggle Sidebar'),
  shortcut(`${metaKeyIdentifier} + Shift + ←`, 'Go Back'),
  shortcut(`${metaKeyIdentifier} + Shift + ?`, 'Toggle Keyboard Shortcuts')
]

// Complete list of pages in order for navigation
const pageOrder = [
  'home',
  'keyfiles',
  'cryptocurrency',
  'cryptography',
  'networking',
  'techstack',
  'repurposing',
  'build',
  'package',
  'publish',
  'games',
  'sandbox',
  'settings'
]

// Path map for each page
const pathMap = {
  home: '/',
  keyfiles: '/keyfiles',
  cryptocurrency: '/cryptocurrency',
  cryptography: '/cryptography',
  networking: '/networking',
  techstack: '/techstack',
  repurposing: '/repurposing',
  build: '/build',
  package: '/package',
  publish: '/publish',
  games: '/games',
  sandbox: '/sandbox',
  settings: '/settings/user'
}

import { useMenuState } from '../../composables/useMenuState'

export default {
  name: 'KeyboardShortcuts',
  data: () => ({
    keyboardShortcutsOpen: false,
    shortcuts
  }),
  setup() {
    const { toggleMenuType } = useMenuState()
    return { toggleMenuType }
  },
  methods: {
    showModal() {
      this.keyboardShortcutsOpen = true
    },
    hideModal() {
      this.keyboardShortcutsOpen = false
    },
    toggleModal() {
      this.keyboardShortcutsOpen = !this.keyboardShortcutsOpen
    },
    keyBoardShortcut(evt) {
      const metaKey = isMac ? evt.metaKey : evt.ctrlKey
      const isAuthenticated = this.accounts?.authenticated

      // Close modal with Escape key
      if (evt.keyCode === 27 && this.keyboardShortcutsOpen) {
        this.hideModal()
        evt.preventDefault()
        return
      }

      if (metaKey && evt.keyCode === 9) {
        evt.preventDefault()
        // Ctrl+Tab or Ctrl+Shift+Tab
        if (evt.shiftKey) {
          // Ctrl+Shift+Tab - Go to previous page
          this.previousPage()
        } else {
          // Ctrl+Tab - Go to next page
          this.nextPage()
        }
      } else if (metaKey && !evt.shiftKey && evt.keyCode === 188) {
        // Ctrl+Comma for settings
        evt.preventDefault()
        this.goToSettings()
      } else if (metaKey && !evt.shiftKey && evt.keyCode === 190) {
        // Ctrl+. (period) to toggle sidebar
        evt.preventDefault()
        this.toggleMenuType()
      } else if (metaKey && evt.shiftKey && evt.keyCode) {
        evt.preventDefault()
        switch (evt.keyCode) {
          case 192: // Ctrl+Shift+~
            this.goToHome()
            break
          case 37: // Ctrl+Shift+LeftArrow
            this.goBack()
            break
          case 191: // Ctrl+Shift+? (191 is the keyCode for '/')
            this.toggleModal()
            break
          case 76: // Ctrl+Shift+L
            this.logout(isAuthenticated)
            break
        }
      }
    },
    goToHome() {
      const path = '/'
      if (this.$route.path !== path) this.$router.push(path)
    },
    goToSettings() {
      const path = '/settings/user'
      if (this.$route.path !== path) this.$router.push(path)
    },
    nextPage() {
      const currentRouteName = this.$route.name?.toLowerCase() || 'home'
      
      // Find current page index in the page order array
      let currentIndex = pageOrder.findIndex(page => page === currentRouteName)
      
      // If current page not found in the array, default to first page
      if (currentIndex === -1) currentIndex = 0
      
      // Get next page index (with circular navigation)
      const nextIndex = (currentIndex + 1) % pageOrder.length
      const nextPage = pageOrder[nextIndex]
      const nextPath = pathMap[nextPage]
      
      // Navigate to the next page
      if (nextPath && this.$route.path !== nextPath) {
        this.$router.push(nextPath)
      }
    },
    previousPage() {
      const currentRouteName = this.$route.name?.toLowerCase() || 'home'
      
      // Find current page index in the page order array
      let currentIndex = pageOrder.findIndex(page => page === currentRouteName)
      
      // If current page not found in the array, default to last page
      if (currentIndex === -1) currentIndex = 0
      
      // Get previous page index (with circular navigation)
      // Adding pageOrder.length ensures we don't get a negative index
      const previousIndex = (currentIndex - 1 + pageOrder.length) % pageOrder.length
      const previousPage = pageOrder[previousIndex]
      const previousPath = pathMap[previousPage]
      
      // Navigate to the previous page
      if (previousPath && this.$route.path !== previousPath) {
        this.$router.push(previousPath)
      }
    },
    logout(isAuthenticated) {
      if (isAuthenticated) this.$store.dispatch('accounts/logout')
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  created() {
    // Change from keyup to keydown to prevent issues with key combinations
    document.addEventListener('keydown', this.keyBoardShortcut)
    window.ipcRenderer.on('keyboard-shortcuts-modal-open', () => {
      this.toggleModal()
    })
  },
  beforeUnmount() {
    // Clean up event listener when component is destroyed
    document.removeEventListener('keydown', this.keyBoardShortcut)
  }
}
</script>

<style lang="scss" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.modal-content {
  background: white;
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  max-height: 90vh;
  max-width: 600px;
  width: 90%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #e5e5e5;
}

.close-btn {
  background: none;
  border: none;
  font-size: 2rem;
  color: #999;
  cursor: pointer;
  padding: 0;
  width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    color: #666;
  }
}

.table-container {
  overflow-y: auto;
  flex: 1;
}

.table {
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 0.75rem;
    text-align: left;
    border-bottom: 1px solid #e5e5e5;
  }
  
  thead th {
    background-color: #f8f9fa;
    font-weight: 600;
    color: #495057;
  }
  
  tbody tr:hover {
    background-color: #f8f9fa;
  }
  
  th:first-child {
    width: 60px;
    text-align: center;
  }
  
  td:last-child {
    font-family: 'Courier New', monospace;
    font-weight: 500;
    background-color: #f1f3f4;
    border-radius: 4px;
    padding: 0.5rem 0.75rem;
  }
}
</style> 