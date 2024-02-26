import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('user', () => {

    interface User {
      name: string
      email: string
    }

    const user = ref<User | null>(null)

    const logout = () => {
      user.value = null
    }
  
    return { user, logout }
  })