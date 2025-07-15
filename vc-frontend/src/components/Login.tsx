import { useState, useId } from 'react'

import LoginIcon from '../assets/key.png'
import styled from 'styled-components'
import useAuth from '../hook/useAuth'

export default function Login() {
  const { login } = useAuth()
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    const response = await login(email, password)
    if (response.error) {
      alert(response.error)
    }
  }

  const emailInputId = useId()
  const passwordInputId = useId()
  
  return (
    <FullScreenContainer>
      <LoginContainer>
        <header>
          <LoginImage src={LoginIcon} alt="Imagen de inicio de sesión" />
          <h2>Iniciar Sesión</h2>
        </header>
        <LoginForm onSubmit={handleSubmit}>
          <InputGroup>
            <label htmlFor={emailInputId}>Email:</label>
            <input 
              type="email" 
              id={emailInputId}
              onChange={e => setEmail(e.target.value)} />
          </InputGroup>

          <InputGroup>
            <label htmlFor={passwordInputId}>Contraseña:</label>
            <input 
              type="password" 
              id={passwordInputId}
              onChange={e => setPassword(e.target.value)} />
          </InputGroup>

          <LoginButton type="submit">Iniciar Sesión</LoginButton>

          <ForgotPasswordLink>
            <a href="#">Olvidaste tu contraseña</a>
          </ForgotPasswordLink>
        </LoginForm>
      </LoginContainer>
    </FullScreenContainer>
    
  )
}

const FullScreenContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.1);
  padding: 20px;
`

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;

  width: min-content;
  margin: 0 auto;

  background: rgba(255, 255, 255, 0.9);
  padding: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  & > header {
    text-align: center;
  }
`

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 1rem;
  width: 100%;
`

const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  & > input {
    width: 350px;
  }
`

const LoginButton = styled.button`
  background-color: #007bff;
  color: white;

  transition: background 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`

const ForgotPasswordLink = styled.div`
  color: #007bff;
  text-decoration: none;
  margin-right: 10px;
  font-size: .9rem;
  margin: 0 auto;

  &:hover {
    text-decoration: underline;
  }
`

const LoginImage = styled.img`
  width: 25%;
`
