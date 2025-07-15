import type { User } from '../types/types.d';

export default function useLocalStorage() {
  const USER_KEY = 'usuario';
  
  const saveUser = (user: User) => {
    console.log('Saving user:', user)
    window.localStorage.setItem(USER_KEY, JSON.stringify(user))
  }

  const clearUser = () => {
    console.log('Clearing user')
    window.localStorage.removeItem(USER_KEY)
  }

  return { saveUser, clearUser };
}