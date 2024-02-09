import React from 'react'
import styled from 'styled-components'

function SearchTop() {
  return (
    <Wrapper className='section'> 
      <div className='SJDMls'>
         <div className='options'>Buy</div>
         <div className='options'>Sell</div>
         <div className='options'>Rent</div>
      </div>
    </Wrapper>
  )
}

export default SearchTop
const Wrapper =styled.section`
font-weight: 400;
font-size:18px;
line-height: 18px;
font-family: "DM Sans", sans-serif;
  div {
    box-sizing: border-box;
  }
  .options{
    padding:20px;
  }
  .options:hover{
    font-size:x-large;
  }
  .SJDMls{
    display:flex;
    box-shadow: 0 25px 60px rgba(113, 106, 147, 0.2);
    width:fit-content;
    border-radius: 40px;
  }

`
