import { useContext } from 'react';

import AuthContext from '../context/AuthContext';
import useLocalStorage from './useLocalStorage';

import AuthAPI from '../API/AuthAPI';

export default function useAuth() {
  const { jwt, user, login, logout, isLoading } = useContext(AuthContext)
  const { saveSession, clearSession } = useLocalStorage()

  const loginRequest = async (email: string, password: string) => {
    const response = await AuthAPI.login(email, password)
    
    if (!response.data) return response.error

    console.log(response)

    const { nombre, correo } = response.data.user
    const { token, dateOfExpTime } = response.data

    login(nombre, correo, token)

    saveSession(
      token, 
      dateOfExpTime, 
      { nombre: nombre, email: correo }
    )
  }

  const logoutRequest = () => {
    logout()

    clearSession()
  }
  

  return { user, jwt, loginRequest, logoutRequest, isLoading };
}