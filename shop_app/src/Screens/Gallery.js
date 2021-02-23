import React from 'react'
import Carousel from 'react-grid-carousel'
import image1 from '../images/nike-air-720-1.png';
import image2 from '../images/nike-air-720-2.png';
import image3 from '../images/nike-air-720-3.png';


const MyDot = ({ isActive }) => (
  <span
    style={{
      marginTop:'2rem',
      display: 'inline-block',
      height: isActive ? '8px' : '5px',
      width: isActive ? '8px' : '5px',
      background: '#203040',
      borderRadius:'50%'
    }}
  ></span>
)


const Gallery = () => {
  return (
    <Carousel width="100%" dot={MyDot} showDots autoplay={5000} loop>
      <Carousel.Item>
        <img width="100%" min-height="25rem" src={image2} />
      </Carousel.Item>
      <Carousel.Item>
        <img width="100%" src={image2} />
      </Carousel.Item>
      <Carousel.Item>
        <img width="100%" src={image3} />
      </Carousel.Item>
    </Carousel>
  )
}

export default Gallery;