import { ref, type Ref } from 'vue'

// Define the possible menu types
type MenuType = 'macro' | 'micro'

// Shared reactive state with explicit typing
const menuType: Ref<MenuType> = ref('micro')

export function useMenuState() {
  const changeMenuType = (type: MenuType) => {
    menuType.value = type
  }

  const toggleMenuType = () => {
    menuType.value = menuType.value === 'macro' ? 'micro' : 'macro'
  }

  return {
    menuType,
    changeMenuType,
    toggleMenuType,
  }
} 