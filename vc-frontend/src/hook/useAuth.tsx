import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import useLocalStorage from '../hook/useLocalStorage';
import type { AuthContextType } from '../types/context';
import type { User } from '../types/types.d';
import type { API_Response } from '../types/api';

interface useAuthType extends AuthContextType {
  initUser?: () => Promise<void>;
}

export default function useAuth(): useAuthType {
  const context = useContext(AuthContext);
  const { saveUser, clearUser } = useLocalStorage();

  if (context == null) throw new Error('useAuth debe usarse dentro de un <AuthProvider>')

  const login = async (email: string, password: string) 
    : Promise<API_Response<User | null>> => {
    const response : API_Response<User | null> = { data: null };

    try {
      const apiResponse = await context.login(email, password)
      saveUser(apiResponse.data) // usuario
      response.data = apiResponse.data
    } catch (error) {
      if (error instanceof Error) {
        response.error = error.message
      } else {
        response.error = String(error)
      }
    }

    return response
  }

  const logout = () => {
    clearUser()
    return context.logout();
  }

  const { user, isAuthenticated } = context;

  return { user, isAuthenticated, login, logout };
}