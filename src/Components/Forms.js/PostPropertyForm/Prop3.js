/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBInputGroup,
  MDBBtn,
  MDBCheckbox,
  MDBTextArea,
} from "mdb-react-ui-kit";

export function Prop3() {
  const [formValue, setFormValue] = useState({
    fname: "",
    emailSet: "",
    propDim: "",
    pno: "",
  });
  const onChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  return (
    <Wrapper className='section'>
      <div
        style={{
          border: "1px solid #e6e6e6",
          padding: "20px",
          borderRadius: "10px",
        }}>
        <p
          className='skSNPqkm'
          style={{
            fontSize: "x-large",
            fontWeight: "bold",
            marginBottom: "0px",
            position: "relative",
          }}>
          Further Information
        </p>

        <div style={{ width: "100%", margin: "auto" }}>
          <div
            className='d-flex mt-3 flex-wrap mt-5'
            style={{ margin: "auto" }}>
            <div style={{ width: "33%" }} className='mb-3'>
              <div>
                <p style={{ fontSize: "16px", fontWeight: "600" }}>
                  Total Floor(s)
                </p>
                <div className='d-flex '>
                  <MDBValidationItem
                    className='col-md-12'
                    feedback='Please provide with the appropriate'
                    invalid>
                    <MDBInput
                      onChange={onChange}
                      value={formValue.propDim}
                      label='Floors'
                      id='dimesion'
                      className='typeReset'
                      name='dimension'
                      required
                      type='number'
                      style={{ border: "0px" }}
                    />
                  </MDBValidationItem>
                </div>
              </div>
            </div>
            <div style={{ width: "33%" }} className='mb-3'>
              <div>
                <p style={{ fontSize: "16px", fontWeight: "600" }}>
                  Which Floor
                </p>
                <div className='d-flex '>
                  <MDBValidationItem
                    className='col-md-12'
                    feedback='Please provide with the appropriate'
                    invalid>
                    <MDBInput
                      onChange={onChange}
                      value={formValue.propDim}
                      label='Total Floors'
                      id='dimesion'
                      className='typeReset'
                      name='dimension'
                      required
                      type='number'
                      style={{ border: "0px" }}
                    />
                  </MDBValidationItem>
                </div>
              </div>
            </div>
            <div style={{ width: "33%" }} className='mb-3'>
              <div>
                <p style={{ fontSize: "16px", fontWeight: "600" }}>
                  Price
                </p>
                <div className='d-flex '>
                  <MDBValidationItem
                    className='col-md-12'
                    feedback='Please provide with the appropriate'
                    invalid>
                    <MDBInput
                      onChange={onChange}
                      value={formValue.propDim}
                      label='Price'
                      id='dimesion'
                      className='typeReset'
                      name='dimension'
                      required
                      type='number'
                      style={{ border: "0px" }}
                    />
                  </MDBValidationItem>
                </div>
              </div>
            </div>
            <div style={{ width: "33%" }} className='mb-3'>
              <div>
                <p style={{ fontSize: "16px", fontWeight: "600" }}>
                  Maintenance Charge
                </p>
                <div className='d-flex '>
                  <MDBValidationItem
                    className='col-md-12'
                    feedback='Please provide with the appropriate'
                    invalid>
                    <MDBInput
                      onChange={onChange}
                      value={formValue.propDim}
                      label='Maintenance'
                      id='dimesion'
                      className='typeReset'
                      name='dimension'
                      required
                      type='number'
                      style={{ border: "0px" }}
                    />
                  </MDBValidationItem>
                </div>
              </div>
            </div>
            <div style={{ width: "33%" }} className='mb-3'>
            <p style={{ fontSize: "16px", fontWeight: "600" }}>
              Write about your property
            </p>
            <div className='d-flex djdJM'>
              <div className='d-flex flex-wrap ml-3' style={{width:"90%"}}>
              <MDBTextArea label='Message' id='textAreaExample' rows={1}/>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}
const Wrapper = styled.section`
  max-width: 860px;
  input[type="text"],
  input[type="phone"],
  input[type="email"],
  input[type="date"] {
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
  input:focus {
    border-color: green;
    box-shadow: 0px 0px 7px green;
    tranform: scale(1.2);
  }
  .skSNPqkm:after {
    content: "";
    position: absolute;
    height: 2px;
    top: 35px;
    margin: 0 auto;
    left: 0px !important;
    width: 150px;
    right: auto;
    background: #e5652e;
    border-radius: 10px;
  }
  .djdJM input {
    visibility: hidden;
  }
  .djwOPM {
    display: flex;
    vertical-align: middle;
    align-items: center;
    justify-content: center;
    text-align: center;
    cursor: pointer;
    background: #fff;
    color: #a7a7a7;
    border: 1px solid #a7a7a7;
    padding: 5px 10px;
    border-radius: 6px;
    user-select: none;
    width: fit-content;
  }
  .ng-untouched:checked + label {
    color: #e5652e;
    border-color: #e5652e;
    background: rgba(255, 99, 71, 0.2);
  }
  .ng-untoucheded:checked + label {
    color: #e5652e;
    border-color: #e5652e;
    background: rgba(255, 99, 71, 0.2);
  }
  label {
    font-size: 14px;
  }
`;
