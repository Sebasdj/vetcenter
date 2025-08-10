import MisionIcon from '../assets/misionIcon.png'
import VisionIcon from '../assets/visionIcon.png'
import ValoresIcon from '../assets/valoresIcon.png'

import MarielyIcon from '../assets/mariely.png'
import SebasIcon from '../assets/sebas.png'

const About = () => {

  return (
    <div className="about-container">
      <section id="historia">
        <h1>Sobre Nosotros</h1>
        <p>VetCenter nació en 2015 con el propósito de ofrecer atención veterinaria profesional y, al mismo tiempo, dar una oportunidad a los animales en situación de abandono. Con el tiempo, nuestra labor se ha consolidado como un compromiso social para rescatar, rehabilitar y encontrar hogares responsables para cientos de mascotas.</p>
      </section>

      <section id="mision-vision">
        <div>
          <div className="title">
            <img src={MisionIcon} alt="icono de la mision" />
            <h2>Misión</h2>
          </div>
          <p>Promover el bienestar animal mediante atención veterinaria de calidad, rescate de animales vulnerables y su adopción responsable.</p>
        </div>
        <div>
          <div className="title">
            <img src={VisionIcon} alt="icono de la vision" />
            <h2>Visión</h2>
          </div>
          <p>Ser un referente regional en protección y adopción responsable, inspirando a la comunidad a involucrarse en la defensa y cuidado de los animales.</p>
        </div>
      </section>

      <section id="valores">
        <div className="title">
          <img src={ValoresIcon} alt="icono de los valores" />
          <h2>Nuestros Valores</h2>
        </div>
        <ul>
          <li>Compasión</li>
          <li>Compromiso</li>
          <li>Transparencia</li>
          <li>Profesionalismo</li>
          <li>Responsabilidad</li>
        </ul>
      </section>

      <section id="equipo">
        <h2 style={{padding: '.4rem 0'}}>Conoce a Nuestro Equipo</h2>
        <div className="equipo-grid">
          <article className="miembro">
            <div className="title">
              <img src={MarielyIcon} alt="Nombre del miembro" />
              <div>
                <h3>Mariely Sánchez</h3>
                <p>2022-0223</p>
              </div>
            </div>
          </article>
          <article className="miembro">
            <div className="title">
              <img src={SebasIcon} alt="Nombre del miembro" />
              <div>
                <h3>Sebastian Ruiz</h3>
                <p>2022-0707</p>
              </div>
            </div>
          </article>
        </div>
      </section>

      <section id="impacto">
        <h2>Nuestro Impacto</h2>
        <ul>
          <li>+500 mascotas rescatadas</li>
          <li>+400 adopciones exitosas</li>
          <li>+50 campañas de esterilización</li>
        </ul>
      </section>

      <section id="compromiso">
        <h2>Compromiso con la Comunidad</h2>
        <p>Trabajamos en alianza con organizaciones y voluntarios locales para educar sobre el cuidado responsable de los animales, fomentar la esterilización y prevenir el abandono.</p>
      </section>
    </div>
  )
}

export default About