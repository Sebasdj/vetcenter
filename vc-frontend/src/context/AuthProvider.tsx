import { useState, useEffect } from 'react'

import AuthContext from './AuthContext'

import type { User } from '../types/types.d'
import useLocalStorage from '../hook/useLocalStorage'


export default function AuthProvider({ children }: { children: React.ReactNode }){
  const { getSession, getExpTime, clearSession } = useLocalStorage()

  const [user, setUser] = useState<User | null>(null)
  const [jwt, setJWT] = useState<string>('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (getExpTime()) {
      const session = getSession()
      
      if (session) {
        setUser(session.user)
        setJWT(session.token)
      }
    } else clearSession()
    
    setIsLoading(false)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  const login = async (name: string, email: string, jwt: string) => {
    setUser({nombre: name, email: email})
    setJWT(jwt)
  }

  const logout = () => {
    setUser(null)
    setJWT('')
  }

  return (
    <AuthContext.Provider value={{
      user,
      jwt,
      login,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  )
}