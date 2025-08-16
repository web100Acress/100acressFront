import React from 'react'
import Carousel from "react-bootstrap/Carousel"
import Image1 from "../../Images/naomi-hebert-MP0bgaS_d1c-unsplash.jpg"
import Image2 from "../../Images/etpb4z-kjnhxk-3t59vo.jpg"
import Image3 from "../../Images/unnamed.png"

function Hero() {
  return (
    <Carousel>
      <Carousel.Item>
      <img
      className="d-block w-100"
      src={Image1}  
      alt="Second slide"
      
    />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
      className="d-block w-100"
      src={Image2}
      alt="Second slide"

    />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
      <img
      className="d-block w-100"
      src={Image3}
      alt="Second slide"
    />
        <Carousel.Caption>
          
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  )
}

export default Hero

