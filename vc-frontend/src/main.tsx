import { createRoot } from 'react-dom/client'
import AuthProvider from './context/AuthProvider.tsx'

import App from './App.tsx'

import './styles/index.css'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>
)
