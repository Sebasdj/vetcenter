import type { User } from "../types/types"

export default function useLocalStorage() {
  const KEYS = {
    SESSION_KEY: 'session',
    JWT_KEY: 'token',
    EXP_JWT: 'expJWT'
  }

  const saveSession = (jwt: string, expTime: string, user: User) => {
    console.log('Saving Session:', KEYS.SESSION_KEY)
    window.localStorage.setItem(KEYS.SESSION_KEY, JSON.stringify({
      user: user
    }))
    window.localStorage.setItem(KEYS.JWT_KEY, jwt)

    saveExpTime(expTime)
  }

  const saveExpTime = (exp: string) => {
    window.localStorage.setItem(KEYS.EXP_JWT, exp.toString())
  }
  const getExpTime = (): Date =>  {
    const expTime = window.localStorage.getItem(KEYS.EXP_JWT)
    return expTime ? new Date(expTime) : new Date(Date.now())
  }

  const getSession = (): ({ user: User, token: string} | null) => {
    console.log('Getting Session')
    
    const session = window.localStorage.getItem(KEYS.SESSION_KEY)
    if (session)
      return JSON.parse(session)
    return null
  }

  const getToken = () => {
    const token = window.localStorage.getItem(KEYS.JWT_KEY) ?? ''
    return token
  }

  const clearSession = () => {
    console.log('Clearing Session')
    window.localStorage.removeItem(KEYS.SESSION_KEY)
    window.localStorage.removeItem(KEYS.JWT_KEY)
    window.localStorage.removeItem(KEYS.EXP_JWT)
  }

  return {
    saveSession, getSession, clearSession, 
    getToken, 
    saveExpTime, getExpTime 
  }
}