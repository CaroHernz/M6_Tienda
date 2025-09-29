import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const user = ref(null)
  const isAuthenticated = computed(() => !!user.value)

  const validUsers = [
    { email: 'usuario@ejemplo.com', password: 'password123', name: 'Usuario' },
  ]

  const login = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const foundUser = validUsers.find(u => u.email === email && u.password === password)
        
        if (foundUser) {
          user.value = {
            email: foundUser.email,
            name: foundUser.name
          }
          localStorage.setItem('user', JSON.stringify(user.value))
          resolve(foundUser)
        } else {
          reject(new Error('Credenciales incorrectas'))
        }
      }, 1000) 
    })
  }

  const logout = () => {
    user.value = null
    localStorage.removeItem('user')
  }

  const checkAuth = () => {
    const savedUser = localStorage.getItem('user')
    if (savedUser) {
      user.value = JSON.parse(savedUser)
    }
  }

  return {
    user,
    isAuthenticated,
    login,
    logout,
    checkAuth
  }
})