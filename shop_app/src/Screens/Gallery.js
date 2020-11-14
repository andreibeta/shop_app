import React from 'react'
import Carousel from 'react-grid-carousel'
import image1 from '../images/nike-air-720-1.png';
import image2 from '../images/nike-air-720-2.png';
import image3 from '../images/nike-air-720-3.png';


const Gallery = () => {
  return (
    <Carousel loop>
      <Carousel.Item>
        <img src={image1} />
      </Carousel.Item>
      <Carousel.Item>
        <img  src={image2} />
      </Carousel.Item>
      <Carousel.Item>
        <img src={image3} />
      </Carousel.Item>
    </Carousel>
  )
}

export default Gallery;