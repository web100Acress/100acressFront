import React from 'react'
import styled from 'styled-components';

function ProfileSetup() {
  return (
    <Wrapper className='section'>
      <div
        style={{
          border: "1px solid #e6e6e6",
          padding: "20px",
          borderRadius: "10px",
        }}>
        <p
          style={{
            fontSize: "x-large",
            fontWeight: "bold",
            marginBottom: "0px",
          }}>
          Profile Setup
        </p>
        <p style={{ fontSize: "small" }}>
          Please fill the details to proceed furthur
        </p>
        <div style={{ width: "90%", margin: "auto" }}>
          <div className="mb-3 position-relative" >
            <img src="../Images/india.png" alt="" style={{position:"absolute",top:"0.7rem",left:"1rem"}} />
            <input autoFocus required type='number' placeholder='Mobile No.' style={{paddingLeft:"3rem"}} />
          </div>
          <p>What do you describe yourself ?</p>
        <div>
        <input type='radio' name='role' value={"male"} required ></input>
        <span className='ml-2'>Individual Seller</span>
        </div>
        <div>
        <input type='radio' name='role' value={"male"} required ></input>
        <span className='ml-2'>Individual Buyer</span>
        </div>
        <div>
        <input type='radio' name='role' value={"male"} required ></input>
        <span className='ml-2'>Broker</span>
        </div>
        <p style={{fontSize:"small"}}>Note:- A verification will be done furthur to verify your account</p>
        </div>
      </div>
    </Wrapper>
  )
}

export default ProfileSetup
const Wrapper = styled.section`
input[type="text"],input[type="phone"],input[type="email"],input[type="date"],input[type="number"] {
    width: 100%;
    height: calc(2.25rem + 2px);
    padding: 0.375rem 0.75rem;
    font-size: 1rem;
    line-height: 1.5;
    color: #495057;
    background-color: #fff;
    background-clip: padding-box;
    border: 1px solid #ced4da;
    border-radius: 0.25rem;
    transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
    outline: none;
    overflow: visible;
  }
  input:focus{
    border-color:green;
    box-shadow:0px 0px 7px green;
    tranform:scale(1.2);
  }
`;

