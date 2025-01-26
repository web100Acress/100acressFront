import React from 'react'
import { styled } from 'styled-components'

function Popular() {
  return (
    <Wrapper className="section">
    <div style={{margin:"40px 60px"}}>
      <h3>Popular Projects</h3>
      <div className="flexContainer">
          <div className="flex1">
                <img src="https://img.etimg.com/photo/msid-92893855,imgsize-998731/M3M-Golfestate-pic.jpg" alt="" />
                <div className="pad">
                <p>M3M Urbana . D22</p>
                <p className='sub'>Gurgaon '2022 .206 units</p>
              </div>
            </div>
          <div className="flex1">
          <img src="https://img.etimg.com/photo/msid-92893855,imgsize-998731/M3M-Golfestate-pic.jpg" alt="" />
          <div className="pad">
                <p>M3M Urbana . D22</p>
                <p className='sub'>Gurgaon '2022 .206 units</p>
              </div>
            </div>
          <div className="flex1">
          <img src="https://img.etimg.com/photo/msid-92893855,imgsize-998731/M3M-Golfestate-pic.jpg" alt="" />
          <div className="pad">
          <p>M3M Urbana . D22</p>
          <p className='sub'>Gurgaon '2022 .206 units</p>
        </div>
      </div>
          <div className="flex1">
          <img src="https://img.etimg.com/photo/msid-92893855,imgsize-998731/M3M-Golfestate-pic.jpg" alt="" />
          <div className="pad">
          <p>M3M Urbana . D22</p>
          <p className='sub'>Gurgaon '2022 .206 units</p>
        </div>  
        
      </div>
      </div>
      </div>
    </Wrapper>
  )
}

export default Popular
const Wrapper=styled.section`

.flexContainer{
    display:flex;
    justify-content:space-around;
    flex-wrap:wrap;
}
img{
    width:250px;
    height:auto;
}
p{
    margin-bottom:0px;
    margin-top:0px;
}
.pad{
  padding:10px 10px;
}
h3{
    margin-bottom:50px;
}
.sub{
    color:grey;
    font-size:small;
}
.flex1{
  box-shadow: 0px 0px 30px grey;
  border-radius:15px; 
}
`