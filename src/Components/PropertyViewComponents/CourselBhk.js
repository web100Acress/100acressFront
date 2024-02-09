import React from 'react'
import { ScrollingCarousel, Carousel } from "@trendyol-js/react-carousel";
import styled from 'styled-components';

function CourselBhk(elem) {
    console.log(elem)
    const{build_area,image,input_Bhk,possession} = elem
  return (
    <Wrapper className="div">
    <div style={{width:"100%"}}>
       <img
        src={image.url}
        alt='Developer Image'
        srcset=''
        className='dfdd'
        width="100%"
  />
  </div>
       <div className='gridBtm  Posum'>
        <div className='mlsM'>
            <span>Built-Up area</span>
            <p className='NNO'>{build_area} Sq. Ft.</p>
        </div>
       <div className='mlsM'>
        <span>Possession</span>
        <p className='NNO'>{possession}</p>
       </div>
       <div className='mlsM'>
        <span>Type</span>
        <p className='NNO'>{input_Bhk}</p>
    </div>
    </div>
    </Wrapper>
  )
}

export default CourselBhk
const Wrapper=styled.div`
width:100%;
.dfdd{
    padding-top:30px;
}
`
