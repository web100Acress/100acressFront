/** @format */

import React, { useState } from "react";
import styled from "styled-components";
import { MDBFile } from "mdb-react-ui-kit";

export function Prop4() {
  let [coverSrc, setCoverSrc] = useState();
  let [masterSrc, setMasterSrc] = useState();
  let [primarySrc, setPrimarySrc] = useState();
  let [secondarySrc, setSecondarySrc] = useState();

  function uploadPrimary(e) {
    setPrimarySrc(URL.createObjectURL(e.target.files[0]));
  }
  function uploadSecondary(e) {
    setSecondarySrc(URL.createObjectURL(e.target.files[0]));
  }
  function uploadCover(e) {
    setCoverSrc(URL.createObjectURL(e.target.files[0]));
  }
  function uploadMaster(e) {
    setMasterSrc(URL.createObjectURL(e.target.files[0]));
  }

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
          Photos
        </p>

        <div style={{ width: "100%", margin: "auto" }}>
          <div className='d-flex mt-3 flex-wrap mt-5 justify-content-between'>
            <div style={{ width: "33%" }} className='mb-3'>
              <p style={{ fontSize: "16px", fontWeight: "600" }}>
                Upload Cover Photo
              </p>
              <div className=''>
                <MDBFile id='coverImage' onChange={uploadCover} />
                <div className='mt-2'>
                  <img
                    src={coverSrc}
                    style={{
                      borderRadius: "10px",
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ width: "33%" }} className='mb-3'>
              <p style={{ fontSize: "16px", fontWeight: "600" }}>
                Upload Master Photo
              </p>
              <div className=''>
                <MDBFile id='masterImage' onChange={uploadMaster} />
                <div className='mt-2'>
                  <img
                    src={masterSrc}
                    style={{
                      borderRadius: "10px",
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ width: "33%" }} className='mb-3'>
              <p style={{ fontSize: "16px", fontWeight: "600" }}>
                Upload Primary Photo
              </p>
              <div className=''>
                <MDBFile id='primaryImage' onChange={uploadPrimary} />
                <div className='mt-2'>
                  <img
                    src={primarySrc}
                    style={{
                      borderRadius: "10px",
                    }}
                  />
                </div>
              </div>
            </div>

            <div style={{ width: "33%" }} className='mb-3'>
              <p style={{ fontSize: "16px", fontWeight: "600" }}>
                Upload Seondary Photo
              </p>
              <div className=''>
                <MDBFile id='secondaryImage' onChange={uploadSecondary} />
                <div className='mt-2'>
                  <img
                    src={secondarySrc}
                    style={{
                      borderRadius: "10px",
                    }}
                  />
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
    width: 100px;
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
