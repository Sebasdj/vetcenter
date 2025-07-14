import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Navbar from './components/Navbar'
import Home from './components/Home'
import Gallery from './components/Gallery'
import About from './components/About'
import Login from './components/Login'
import Footer from './components/Footer'
import Mascotas from './components/Mascotas'


// import AuthProvider from './context/AuthProvider'
// import AuthContext from './context/AuthContext'

import './styles/App.css'
// import { useContext } from 'react'
import useAuth from './hook/useAuth'

export default function App() {
  const {isAuthenticated, user} = useAuth();

  return (
    <BrowserRouter>
    {
      isAuthenticated ?
      <>
        <Navbar />
        <main> 
          <Routes>
            <Route path="/" element={<Home userName={user.userName}/>} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/mascotas" element={<Mascotas />} />
          </Routes> 
        </main>
        <Footer />
      </> 
      : 
      <>
        <Routes>
          <Route path="/*" element={<Login />} />
        </Routes>
      </>
    }

      
      
    </BrowserRouter>
  )
}
