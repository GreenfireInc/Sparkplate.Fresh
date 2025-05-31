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
  shortcut(`${metaKeyIdentifier} + Shift + ~`, 'Go to Home'),
  shortcut(`${metaKeyIdentifier} + Shift + S`, 'Go to Settings'),
  shortcut(`${metaKeyIdentifier} + Shift + ←`, 'Go Back')
]

// pageMap will direct the route to the next tab based on current route
const pageMap = {
  home: '/settings/user', // from "home" we will go to "/settings/user"
  settings: '/'
}

export default {
  name: 'KeyboardShortcuts',
  data: () => ({
    keyboardShortcutsOpen: false,
    shortcuts
  }),
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
      const isAuthenticated = this.accounts.authenticated

      if (metaKey && evt.keyCode === 9) {
        // Ctrl+Tab
        this.nextPage()
        evt.preventDefault()
      } else if (metaKey && evt.shiftKey && evt.keyCode) {
        evt.preventDefault()
        switch (evt.keyCode) {
          case 192: // Ctrl+Shift+~
            this.goToHome()
            break
          case 83: // Ctrl+Shift+S
            this.goToSettings()
            break
          case 76: // Ctrl+Shift+L
            this.logout(isAuthenticated)
            break
          case 37: // Ctrl+Shift+LeftArrow
            this.goBack()
            break
          case 191:
            this.toggleModal()
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
      const currentPage = this.$route.name.toLowerCase()
      const nextPageRoute = pageMap[currentPage]
      if (!nextPageRoute) return // exit if next route not found
      this.$router.push(nextPageRoute)
    },
    logout(isAuthenticated) {
      if (isAuthenticated) this.$store.dispatch('accounts/logout')
    },
    goBack() {
      this.$router.go(-1)
    }
  },
  created() {
    document.addEventListener('keyup', this.keyBoardShortcut)
    window.ipcRenderer.on('keyboard-shortcuts-modal-open', () => {
      this.toggleModal()
    })
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