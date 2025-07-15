import styled from 'styled-components'
import { Link } from 'react-router-dom'
import useAuth from '../hook/useAuth'

import logo from '../assets/logo.png'

// interface Props {
//   onLogout: () => void
//   userName: string
// }
const Navbar = () => {
  const { user, logout } = useAuth();
  
  return (
    <NavbarContainer className="navbar">
      <div className="navbar-left">
        <img src={logo} alt="logo" className="logo" />
        <span className='username'>{user.nombre}</span>
      </div>

      <ul className="navbar-menu">
        <li>
          <LinkStyled to='/'>Inicio</LinkStyled>
        </li>
        <li>
          <LinkStyled to='/mascotas'>Mascotas</LinkStyled>
        </li>  
        <li>
          <LinkStyled to='/about'>Sobre nosotros</LinkStyled>
        </li>
        <li>
          <LinkStyled to='/gallery'>Galeria</LinkStyled>
        </li>
        <li>
          <ButtonStyled 
            onClick={logout} // onLogout
            className='logout-button'>
              Cerrar Sesión
          </ButtonStyled>
        </li>
      </ul>
    </NavbarContainer>
  )
}

const NavbarContainer = styled.nav`
  background: #233e;
  color: white;
`

const InteractionElementStyles = `
  color: white;
  text-decoration: none;
  background: none;
  border: none;
`

const LinkStyled = styled(Link)`
  ${InteractionElementStyles}
  &:hover {
    background: #233f;
  }
`
const ButtonStyled = styled.button`
  ${InteractionElementStyles}
  &:hover {
    background: red;
  }  
`

// const navbarStyle = {
//   display: 'flex',
//   justifyContent: 'space-between',
//   alignItems: 'center',
//   background: '#333',
//   padding: '10px 20px',
//   color: 'white', 
// }

/* Estilos de la barra de navegación */
// .navbar {
//     display: flex;
//     justify-content: space-between;
//     align-items: center;
//     background: #333;
//     padding: 10px 20px;
//     color: white;
// }

// .navbar-left {
//     display: flex;
//     align-items: center;
// }
// .logo {
//     width: 40px;
//     height: 40px;
//     margin-right: 10px;
// }
// .username {
//     font-size: 18px;
//     font-weight: bold;
// }
// .navbar-menu {
//     display: flex;
//     align-items: center;
//     list-style: none;
//     gap: 15px;
// }

// .navbar-menu li {
//     display: inline;
// }
// .navbar-menu a, .logout-button {
//     color: white;
//     text-decoration: none;
//     background: none;
//     border: none;
//     font-size: 16px;
//     cursor: pointer;
// }

export default Navbar