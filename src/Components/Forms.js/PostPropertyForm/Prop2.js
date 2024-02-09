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
} from "mdb-react-ui-kit";

export function Prop2() {
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
          Property Info
        </p>

        <div style={{ width: "100%", margin: "auto" }}>
          <div
            className='d-flex mt-3 flex-wrap mt-5'
            style={{ margin: "auto" }}>
            <div style={{ width: "33%" }} className='mb-3'>
              <p style={{ fontSize: "16px", fontWeight: "600" }}>
                Property Status
              </p>
              <div className='d-flex djdJM'>
                <div className='d-flex flex-wrap'>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='PropStatus'
                      id='readymovein'
                      value='readymovein'
                    />
                    <label htmlFor='readymovein' className='djwOPM'>
                      Ready to move in
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='PropStatus'
                      id='underconstruction'
                      value='underconstruction'
                    />
                    <label htmlFor='underconstruction' className='djwOPM'>
                      Under Construction
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "33%" }} className='mb-3'>
              <p style={{ fontSize: "16px", fontWeight: "600" }}>Bedroom(s)</p>
              <div className='d-flex djdJM'>
                <div className='d-flex flex-wrap'>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='bedroom'
                      id='1rk'
                      value='1rk'
                    />
                    <label htmlFor='1rk' className='djwOPM'>
                      1 RK
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='bedroom'
                      id='1bhk'
                      value='1bhk'
                    />
                    <label htmlFor='1bhk' className='djwOPM'>
                      1 BHK
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='bedroom'
                      id='2bhk'
                      value='2bhk'
                    />
                    <label htmlFor='2bhk' className='djwOPM'>
                      2 BHK
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='bedroom'
                      id='3bhk'
                      value='3bhk'
                    />
                    <label htmlFor='3bhk' className='djwOPM'>
                      3 BHK
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='bedroom'
                      id='4bhk'
                      value='4bhk'
                    />
                    <label htmlFor='4bhk' className='djwOPM'>
                      4 BHK
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "33%" }} className='mb-3'>
              <p style={{ fontSize: "16px", fontWeight: "600" }}>Bathroom(s)</p>
              <div className='d-flex djdJM'>
                <div className='d-flex flex-wrap'>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='bathroom'
                      id='oneBathroom'
                      value='one'
                    />
                    <label htmlFor='oneBathroom' className='djwOPM'>
                      1
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='bathroom'
                      id='twoBathroom'
                      value='two'
                    />
                    <label htmlFor='twoBathroom' className='djwOPM'>
                      2
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='bathroom'
                      id='thirdBathroom'
                      value='third'
                    />
                    <label htmlFor='thirdBathroom' className='djwOPM'>
                      3
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='bathroom'
                      id='fourBathroom'
                      value='fourth'
                    />
                    <label htmlFor='fourBathroom' className='djwOPM'>
                      4
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='bathroom'
                      id='fifthBathroom'
                      value='fifth'
                    />
                    <label htmlFor='fifthBathroom' className='djwOPM'>
                      5
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "33%" }} className='mb-3'>
              <p style={{ fontSize: "16px", fontWeight: "600" }}>Balconies</p>
              <div className='d-flex djdJM'>
                <div className='d-flex flex-wrap'>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='balcony'
                      id='zerobalcony'
                      value='one'
                    />
                    <label htmlFor='zerobalcony' className='djwOPM'>
                      0
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='balcony'
                      id='onebalcony'
                      value='one'
                    />
                    <label htmlFor='onebalcony' className='djwOPM'>
                      1
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='balcony'
                      id='twobalcony'
                      value='two'
                    />
                    <label htmlFor='twobalcony' className='djwOPM'>
                      2
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='balcony'
                      id='thirdbalcony'
                      value='third'
                    />
                    <label htmlFor='thirdbalcony' className='djwOPM'>
                      3
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='balcony'
                      id='fourbalcony'
                      value='fourth'
                    />
                    <label htmlFor='fourbalcony' className='djwOPM'>
                      4
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "33%" }} className='mb-3'>
              <p style={{ fontSize: "16px", fontWeight: "600" }}>Door Facing</p>
              <div className='d-flex djdJM'>
                <div className='d-flex flex-wrap'>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='doorfacing'
                      id='east'
                      value='east'
                    />
                    <label htmlFor='east' className='djwOPM'>
                      East
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='doorfacing'
                      id='west'
                      value='west'
                    />
                    <label htmlFor='west' className='djwOPM'>
                      West
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='doorfacing'
                      id='north'
                      value='north'
                    />
                    <label htmlFor='north' className='djwOPM'>
                      North
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='doorfacing'
                      id='south'
                      value='south'
                    />
                    <label htmlFor='south' className='djwOPM'>
                      South
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "33%" }} className='mb-3'>
              <p style={{ fontSize: "16px", fontWeight: "600" }}>
                Furnishing Status
              </p>
              <div className='d-flex djdJM'>
                <div className='d-flex flex-wrap'>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='furnishing'
                      id='semifurnished'
                      value='semifurnished'
                    />
                    <label htmlFor='semifurnished' className='djwOPM'>
                      Semi Furnished
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='furnishing'
                      id='Furnished'
                      value='Furnished'
                    />
                    <label htmlFor='Furnished' className='djwOPM'>
                      Furnished
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='furnishing'
                      id='unfurnished'
                      value='unfurnished'
                    />
                    <label htmlFor='unfurnished' className='djwOPM'>
                      Unfurnished
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "33%" }} className='mb-3'>
              <p style={{ fontSize: "16px", fontWeight: "600" }}>Parking</p>
              <div className='d-flex djdJM'>
                <div className='d-flex flex-wrap'>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='parking'
                      id='twowheeler'
                      value='twowheeler'
                    />
                    <label htmlFor='twowheeler' className='djwOPM'>
                      Two Wheeler
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='parking'
                      id='fourwheeler'
                      value='fourwheeler'
                    />
                    <label htmlFor='fourwheeler' className='djwOPM'>
                      Four Wheeler
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='parking'
                      id='both'
                      value='both'
                    />
                    <label htmlFor='both' className='djwOPM'>
                      Both
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "33%" }} className='mb-3'>
              <p style={{ fontSize: "16px", fontWeight: "600" }}>
                Covered Parking
              </p>
              <div className='d-flex djdJM'>
                <div className='d-flex flex-wrap'>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='coveredParking'
                      id='zerocoveredParking'
                      value='one'
                    />
                    <label htmlFor='zerocoveredParking' className='djwOPM'>
                      0
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='coveredParking'
                      id='onecoveredParking'
                      value='one'
                    />
                    <label htmlFor='onecoveredParking' className='djwOPM'>
                      1
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='coveredParking'
                      id='twocoveredParking'
                      value='two'
                    />
                    <label htmlFor='twocoveredParking' className='djwOPM'>
                      2
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='coveredParking'
                      id='thirdcoveredParking'
                      value='third'
                    />
                    <label htmlFor='thirdcoveredParking' className='djwOPM'>
                      3
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='coveredParking'
                      id='fourcoveredParking'
                      value='fourth'
                    />
                    <label htmlFor='fourcoveredParking' className='djwOPM'>
                      4
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "33%" }} className='mb-3'>
              <p style={{ fontSize: "16px", fontWeight: "600" }}>
                Open Parking
              </p>
              <div className='d-flex djdJM'>
                <div className='d-flex flex-wrap'>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='openParking'
                      id='zeroopenParking'
                      value='one'
                    />
                    <label htmlFor='zeroopenParking' className='djwOPM'>
                      0
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='openParking'
                      id='oneopenParking'
                      value='one'
                    />
                    <label htmlFor='oneopenParking' className='djwOPM'>
                      1
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='openParking'
                      id='twoopenParking'
                      value='two'
                    />
                    <label htmlFor='twoopenParking' className='djwOPM'>
                      2
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='openParking'
                      id='thirdopenParking'
                      value='third'
                    />
                    <label htmlFor='thirdopenParking' className='djwOPM'>
                      3
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='radio'
                      className='ng-untouched ng-valid'
                      name='openParking'
                      id='fouropenParking'
                      value='fourth'
                    />
                    <label htmlFor='fouropenParking' className='djwOPM'>
                      4
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "33%" }} className='mb-3'>
              <p style={{ fontSize: "16px", fontWeight: "600" }}>Amenities</p>
              <div className='d-flex djdJM'>
                <div className='d-flex flex-wrap'>
                  <div className='d-flex'>
                    <input
                      type='checkbox'
                      className='ng-untouched ng-valid'
                      name='amenities'
                      id='gym'
                      value='gym'
                    />
                    <label htmlFor='gym' className='djwOPM'>
                      Gym
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='checkbox'
                      className='ng-untouched ng-valid'
                      name='amenities'
                      id='swimmingPool'
                      value='swimmingPool'
                    />
                    <label htmlFor='swimmingPool' className='djwOPM'>
                      Swimming Pool
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='checkbox'
                      className='ng-untouched ng-valid'
                      name='amenities'
                      id='jogging'
                      value='jogging'
                    />
                    <label htmlFor='jogging' className='djwOPM'>
                      Jogging Track
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "33%" }} className='mb-3'>
              <p style={{ fontSize: "16px", fontWeight: "600" }}>Facilities</p>
              <div className='d-flex djdJM'>
                <div className='d-flex flex-wrap'>
                  <div className='d-flex'>
                    <input
                      type='checkbox'
                      className='ng-untouched ng-valid'
                      name='facilities'
                      id='cctv'
                      value='cctv'
                    />
                    <label htmlFor='cctv' className='djwOPM'>
                      CCTV
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='checkbox'
                      className='ng-untouched ng-valid'
                      name='facilities'
                      id='sewage'
                      value='sewage'
                    />
                    <label htmlFor='sewage' className='djwOPM'>
                      Sewage Water Treatment
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='checkbox'
                      className='ng-untouched ng-valid'
                      name='facilities'
                      id='powerBackup'
                      value='powerBackup'
                    />
                    <label htmlFor='powerBackup' className='djwOPM'>
                      Power Backup
                    </label>
                  </div>
                  <div className='d-flex'>
                    <input
                      type='checkbox'
                      className='ng-untouched ng-valid'
                      name='facilities'
                      id='RainWater'
                      value='RainWater'
                    />
                    <label htmlFor='RainWater' className='djwOPM'>
                      Rainwater Harvesting
                    </label>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ width: "33%" }} className='mb-3'>
              <div>
                <p style={{ fontSize: "16px", fontWeight: "600" }}>
                  Property Dimension
                </p>
                <div className='d-flex '>
                  <MDBValidationItem
                    className='col-md-12'
                    feedback='Please provide with the appropriate'
                    invalid>
                    <MDBInput
                      onChange={onChange}
                      value={formValue.propDim}
                      label='Dimension (in sq.ft.)'
                      id='dimesion'
                      className='typeReset'
                      name='dimension'
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
