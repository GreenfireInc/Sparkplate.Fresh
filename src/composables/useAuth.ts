import { ref, computed } from 'vue'

export interface User {
  id: number
  name: string
  email: string
}

const authenticated = ref(false)
const currentUser = ref<User | null>(null)

export function useAuth() {
  const isAuthenticated = computed(() => authenticated.value)
  
  const login = (user: User) => {
    currentUser.value = user
    authenticated.value = true
  }
  
  const logout = () => {
    currentUser.value = null
    authenticated.value = false
  }
  
  const mockUsers: User[] = [
    { id: 1, name: 'Goldie', email: 'goldie@greenfire.io' },
    { id: 2, name: 'Francis', email: 'francis@greenfire.io' },
    { id: 3, name: 'Elizabeth', email: 'elizabeth@greenfire.io' },
    { id: 4, name: 'Guest', email: 'guest@greenfire.io' }
  ]
  
  return {
    isAuthenticated,
    currentUser,
    mockUsers,
    login,
    logout
  }
}

