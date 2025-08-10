import React from 'react'

import PerritoBonito from '../assets/perrito-bonito.png'
import { Link } from 'react-router-dom'

interface Props {
  userName?: string
}
const Home: React.FC<Props> = () => {
  return (
    <div className='home-container'>
      <section id="hero">
        <div>
          <h1>Rescatamos, cuidamos y encontramos un hogar</h1>
          <p>
            En <strong>VetCenter</strong> creemos que cada vida importa. Somos más que una clínica veterinaria:
            somos un equipo comprometido con el rescate, rehabilitación y adopción responsable de animales
            que han sufrido abandono o maltrato.
          </p>
          <div className="hero-buttons">
            <a href="/adopciones" className="btn-primary">Ver Mascotas en Adopción</a>
            <br />
            <br />
            <a href="/contacto" className="btn-secondary">Contáctanos</a>
          </div>
        </div>
        <div>
          <img src={PerritoBonito} alt="perrito bonito" />
        </div>
      </section>

      <section id="destacados">
        <h2>Mascotas que buscan un hogar</h2>
        <div className="mascotas-grid">
          <article className="mascota-card">
            <img src="ruta-foto.jpg" alt="Nombre de la mascota" />
            <h3>Nombre de la Mascota</h3>
            <p>Pequeña descripción o estado de salud.</p>
            <a href="/mascota/1" className="btn-card">Conóceme</a>
          </article>
        </div>
      </section>

      <section id="beneficios">
        <h2>Nuestro Compromiso</h2>
        <ul>
          <li>Atención veterinaria de calidad.</li>
          <li>Rescate y rehabilitación de animales.</li>
          <li>Adopciones responsables con seguimiento.</li>
          <li>Campañas de esterilización y vacunación.</li>
        </ul>
      </section>

      <section id="testimonios">
        <h2>Historias con Final Feliz</h2>
        <div className="testimonios-grid">
          <article>
            <blockquote>“Adoptar en VetCenter fue una experiencia increíble. Nos ayudaron en todo el proceso.”</blockquote>
            <p>- María y Luna</p>
          </article>
          <article>
            <blockquote>“Gracias a ellos, Max encontró un hogar lleno de amor.”</blockquote>
            <p>- Jorge y Max</p>
          </article>
        </div>
      </section>

      <section id="enlaces-rapidos">
        <h2>Explora</h2>
        <nav>
          <ul>
            <li>
              <Link to="/mascotas" target='_blank'>Adopciones</Link>
            </li>
            <li>
              <Link to="/servicios" target='_blank'>Servicios Clínicos</Link>
            </li>
            <li>
              <Link to="/eventos" target='_blank'>Eventos y Campañas</Link>
            </li>
            <li>
              <Link to="/contacto" target='_blank'>Contacto</Link>
            </li>
          </ul>
        </nav>
      </section>
    </div>
  )
}

export default Home