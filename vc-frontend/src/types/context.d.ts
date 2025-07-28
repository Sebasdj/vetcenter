import type { User } from 'types'

export interface AuthContext {
  user: User | null
  jwt: string
  isLoading: boolean
  login(name: string, email: string, jwt: string)
  logout()
};