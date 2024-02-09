import React, { useState } from "react";
import styled from "styled-components";
import {
  MDBValidation,
  MDBValidationItem,
  MDBInput,
  MDBInputGroup,
  MDBBtn,
  MDBCheckbox,
} from "mdb-react-ui-kit";

export function Prop1() {
  const [formValue, setFormValue] = useState({
    fname: "",
    emailSet: "",
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
          Basic Information
        </p>

        <div style={{ width: "100%", margin: "auto" }}>
          <div className='d-flex mt-3 flex-wrap mt-5'>
            <div style={{width:"33%"}} className="mb-3">
              <p style={{ fontSize: "16px", fontWeight: "600" }}>Are you a?</p>
              <div className='d-flex djdJM'>
                <div className='d-flex'>
                  <input
                    type='radio'
                    className='ng-untouched ng-valid'
                    name='type'
                    id='owner'
                    value='owner'
                  />
                  <label htmlFor='owner' className='djwOPM'>
                    Owner
                  </label>
                  <div></div>
                  <input
                    type='radio'
                    className='ng-untouched ng-valid'
                    name='type'
                    id='broker'
                    value='broker'
                  />
                  <label htmlFor='broker' className='djwOPM'>
                    Broker
                  </label>
                </div>
              </div>
            </div>
            <div style={{width:"33%"}} className="mb-3" >
              <p style={{ fontSize: "16px", fontWeight: "600" }}>
                Enter your Email
              </p>
              <div className='d-flex '>
                <MDBValidationItem
                  className='col-md-12'
                  feedback='Please provide with the appropriate'
                  invalid>
                  <MDBInput
                    onChange={onChange}
                    value={formValue.emailSet}
                    label='Email'
                    id='typeEmail'
                    className='typeReset'
                    name='emailSet'
                    required
                    type='email'
                    style={{ border: "0px" }}
                  />
                </MDBValidationItem>
              </div>
            </div>
            <div style={{width:"33%"}} className="mb-3">
              <div>
                <p style={{ fontSize: "16px", fontWeight: "600" }}>
                  Would you like to?
                </p>
                <div className='d-flex djdJM'>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untoucheded ng-valid'
                      name='prop'
                      id='Buy'
                      value='Buy'
                    />
                    <label htmlFor='Buy' className='djwOPM'>
                      Buy
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untoucheded ng-valid'
                      name='prop'
                      id='Rent'
                      value='Rent'
                    />
                    <label htmlFor='Rent' className='djwOPM'>
                      Rent
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div style={{width:"33%"}} className="mb-3">
              <div >
                <p style={{ fontSize: "16px", fontWeight: "600" }}>
                  Property Type
                </p>
                <div className='d-flex djdJM flex-wrap'>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untoucheded ng-valid'
                      name='propType'
                      id='apartment'
                      value='apartment'
                    />
                    <label htmlFor='apartment' className='djwOPM'>
                      Apartments
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untoucheded ng-valid'
                      name='propType'
                      id='villas'
                      value='villas'
                    />
                    <label htmlFor='villas' className='djwOPM'>
                      Villas
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untoucheded ng-valid'
                      name='propType'
                      id='plot'
                      value='plot'
                    />
                    <label htmlFor='plot' className='djwOPM'>
                      Plot
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untoucheded ng-valid'
                      name='propType'
                      id='independent'
                      value='independent'
                    />
                    <label htmlFor='independent' className='djwOPM'>
                      Independent House
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div style={{width:"33%"}} className="mb-3">
              <div>
                <p style={{ fontSize: "16px", fontWeight: "600" }}>
                  Building Type?
                </p>
                <div className='d-flex djdJM'>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untoucheded ng-valid'
                      name='builType'
                      id='residencial'
                      value='residencial'
                    />
                    <label htmlFor='residencial' className='djwOPM'>
                      Residencial
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untoucheded ng-valid'
                      name='builType'
                      id='commercial'
                      value='commercial'
                    />
                    <label htmlFor='commercial' className='djwOPM'>
                      Commercial
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div style={{width:"33%"}} className="mb-3">
            <div>
              <p style={{ fontSize: "16px", fontWeight: "600" }}>
                Locality Name
              </p>
              <div className='d-flex '>
                <MDBValidationItem
                  className='col-md-12'
                  feedback='Please provide with the appropriate'
                  invalid>
                  <MDBInput
                    onChange={onChange}
                    value={formValue.emailSet}
                    label='Locality'
                    id='typeLocality'
                    className='typeReset'
                    name='emailSet'
                    required
                    type='text'
                    style={{ border: "0px" }}
                  />
                </MDBValidationItem>
              </div>
            </div>
            </div>
            <div style={{width:"33%"}} className="mb-3">
            <div>
              <p style={{ fontSize: "16px", fontWeight: "600" }}>
                City
              </p>
              <div className='d-flex '>
                <MDBValidationItem
                  className='col-md-12'
                  feedback='Please provide with the appropriate'
                  invalid>
                  <MDBInput
                    onChange={onChange}
                    value={formValue.emailSet}
                    label='City'
                    id='typeLocality'
                    className='typeReset'
                    name='emailSet'
                    required
                    type='text'
                    style={{ border: "0px" }}
                  />
                </MDBValidationItem>
              </div>
            </div>
            </div>
            <div style={{width:"33%"}} className="mb-2">
            <div>
              <p style={{ fontSize: "16px", fontWeight: "600" }}>
                Property Name
              </p>
              <div className='d-flex '>
              <MDBValidationItem
              className='col-md-12'
              feedback='Please provide with the appropriate'
              invalid>
              <MDBInput
                onChange={onChange}
                value={formValue.emailSet}
                label='Name'
                id='PropName'
                className='typeReset'
                name='PropName'
                required
                type='text'
                style={{ border: "0px" }}
              />
            </MDBValidationItem>
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
max-width:860px;
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
  label{
    font-size:14px;
  }
`;
