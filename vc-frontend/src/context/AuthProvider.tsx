import { useState } from 'react'
import AuthContext from './AuthContext'
import type { User } from '../types.d'


export default function AuthProvider({ children }: { children: React.ReactNode }){
  const [user, setUser] = useState<User|null>(() => {
    const userStr = window.localStorage.getItem('user')
    if (!userStr) {
      return null
    }

    const user: User = JSON.parse(userStr)
    console.log('Retrieved user:', user)
    return user
  })
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (user != null) return true
    return false
  })

  const saveUser = (user: User) => {
    console.log('Saving user:', user)
    window.localStorage.setItem('user', JSON.stringify(user))
  }

  const clearUser = () => {
    console.log('Clearing user')
    window.localStorage.removeItem('user')
  }

  const login = (email: string, password: string) => {
    console.log(`Logging in with email: ${email} and password: ${password}`)
    setIsAuthenticated(true)
    setUser({ userName: 'Usuario', email })

    saveUser({ userName: 'Usuario', email, password })
  }

  const logout = () => {
    console.log('Logging out')
    setIsAuthenticated(false)
    setUser(null)
    clearUser()
  }

  return (
    <AuthContext.Provider value={{
      isAuthenticated,
      user,
      login,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}