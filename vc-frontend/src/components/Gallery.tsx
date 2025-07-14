import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.webp'
import img3 from '../assets/img3.webp'

import styled from 'styled-components'

const Gallery = () => {
  return (
    <GalleryContainer>
      <h2>Galeria de producciones</h2>
      <p>Explora nuestro contenido multimedia.</p>
      <div>
        <GalleryImage src={img1} alt="soy una imagen" />
      </div>
      <div>
        <GalleryImage src={img2} alt="soy una imagen" />
      </div>
      <div>
        <GalleryImage src={img3} alt="soy una imagen" />
      </div>
    </GalleryContainer>
  )
}

const GalleryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`

const GalleryImage = styled.img`
  width: 100%;
  max-width: 600px;
  height: auto;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`

export default Gallery 