import { ref } from 'vue'

// Shared reactive state
const menuType = ref('micro')

export function useMenuState() {
  const changeMenuType = (type) => {
    menuType.value = type
  }

  const toggleMenuType = () => {
    menuType.value = menuType.value === 'macro' ? 'micro' : 'macro'
  }

  return {
    menuType,
    changeMenuType,
    toggleMenuType
  }
} 