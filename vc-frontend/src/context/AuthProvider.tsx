import { useState, useEffect } from 'react'
import AuthContext from './AuthContext'
import type { User } from '../types/types.d'

import { login as apiLogin } from '../API/API'


export default function AuthProvider({ children }: { children: React.ReactNode }){
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const loadUser = async () => {
      const userData = window.localStorage.getItem('usuario')
      if (userData) {
        const parsedUser = JSON.parse(userData)
        await login(parsedUser.correo, parsedUser.clave)
      }
    }
    loadUser()
  }, [])

  const login = async (email: string, password: string) => {
    const response = await apiLogin(email, password)

    if (response.error) {
      throw new Error(response.error)
    }

    setUser(response.data)
    setIsAuthenticated(true)
    return response
  }

  const logout = () => {
    console.log('Logging out')
    setIsAuthenticated(false)
    setUser(null)
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