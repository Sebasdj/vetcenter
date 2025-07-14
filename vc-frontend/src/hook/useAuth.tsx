import { useContext } from 'react';
import AuthContext from '../context/AuthContext';
import type { AuthContextType } from '../context/context';

export default function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (context == null) {
    throw new Error('useAuth debe usarse dentro de un <AuthProvider>')
  }

  console.log('useAuth context:', context);
  
  return context;
}