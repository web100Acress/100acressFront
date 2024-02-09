import React from "react";
import styled from "styled-components";

export function AddressForm() {
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
          Address Information
        </p>
        <p style={{ fontSize: "small" }}>
          Please fill the details to proceed furthur
        </p>
        <div style={{ width: "90%", margin: "auto" }}>
          <div className="mb-3">
            <input autoFocus required type='text' placeholder='Address Line 1' />
          </div>
          <div className="mb-3">
            <input autoFocus required type='text' placeholder='Address Line 2' />
          </div>
          <div className="mb-3">
            <input type='text' placeholder='City' required />
          </div>
          <div className="mb-3">
            <input type='text' placeholder='State' required />
          </div>
          <div className="mb-3">
            <input type='number' max={6} placeholder='Pincode' min={1} required />
          </div>
          <div className="mb-3">
            <input type='text' placeholder='Country' min={1} required />
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  input {
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

