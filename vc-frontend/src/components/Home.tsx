import React from 'react'

interface Props {
  userName: string
}
const Home: React.FC<Props> = ({ userName }) => {
  return (
    <div>
      <h2>Inicio</h2>
      <p>Bienvenido, {userName}</p>
    </div>
  )
}

export default Home