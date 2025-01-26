import React from 'react'
import { styled } from 'styled-components'

function ProfilePage() {
  return (
    <Wrapper className="Section">
    <div className="container rounded bg-white mt-5 mb-5">
  <div className="row">
    <div className="col-md-3 border-right">
      <div className="d-flex flex-column align-items-center text-center p-3 py-5">
        <img
        alt='something'
          className="rounded-circle mt-5"
          width="150px"
          src="https://st3.depositphotos.com/15648834/17930/v/600/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg"
        />
        <span className="font-weight-bold">Edogaru</span>
        <span className="text-black-50">edogaru@gmail.com</span>
        <span> </span>
      </div>
    </div>
    <div className="col-md-5 border-right">
      <div className="p-3 py-5">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-right">Profile Settings</h4>
        </div>
        <div className="row mt-2">
          <div className="col-md-6">
            <label className="labels">Name*</label>
            <input
              type="text"
              className="form-control"
              placeholder="first name"
              defaultValue=""
            />
          </div>
          <div className="col-md-6">
            <label className="labels">Surname</label>
            <input
              type="text"
              className="form-control"
              defaultValue=""
              placeholder="surname"
            />
          </div>
        </div>
        <div className="row mt-3">
          <div className="col-md-12">
            <label className="labels">Mobile Number*</label>
            <input
              type="text"
              className="form-control"
              placeholder="enter phone number"
              defaultValue=""
              readOnly
            />
          </div>
          <div className="col-md-12">
            <label className="labels">Address Line 1</label>
            <input
              type="text"
              className="form-control"
              placeholder="enter address line 1"
              defaultValue=""
            />
          </div>
          <div className="col-md-12">
            <label className="labels">Address Line 2</label>
            <input
              type="text"
              className="form-control"
              placeholder="enter address line 2"
              defaultValue=""
            />
          </div>
          <div className="col-md-12">
            <label className="labels">PinCode</label>
            <input
              type="text"
              className="form-control"
              placeholder="enter address line 2"
              defaultValue=""
            />
          </div>
          <div className="col-md-12">
            <label className="labels">State</label>
            <input
              type="text"
              className="form-control"
              placeholder="enter address line 2"
              defaultValue=""
            />
          </div>
          <div className="col-md-12">
            <label className="labels">Area</label>
            <input
              type="text"
              className="form-control"
              placeholder="enter address line 2"
              defaultValue=""
            />
          </div>
          <div className="col-md-12">
            <label className="labels">Email ID</label>
            <input
              type="text"
              className="form-control"
              placeholder=""
              defaultValue=""
              readOnly
            />
          </div>
          
        </div>
        <div className="row mt-3">
          <div className="col-md-6">
            <label className="labels">Country</label>
            <input
              type="text"
              className="form-control"
              placeholder="country"
              defaultValue=""
            />
          </div>
          <div className="col-md-6">
            <label className="labels">State/Region</label>
            <input
              type="text"
              className="form-control"
              defaultValue=""
              placeholder="state"
            />
          </div>
        </div>
        <div className="mt-5 text-center">
          <button className="btn btn-primary profile-button" type="button">
            Save Profile
          </button>
        </div>
      </div>
    </div>
    <div className="col-md-4">
      <div className="p-3 py-5">
        <div className="d-flex justify-content-between align-items-center experience">
          <span>Additional Information</span>
          <span className="border px-3 p-1 add-experience">
            <i className="fa fa-plus" />
            &nbsp;Change Profile
          </span>
        </div>
        <br />
        <div className="col-md-12">
          <label className="labels">Id Number:</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            defaultValue="" readOnly
          />
        </div>{" "}
        <br />
        <div className="col-md-12">
          <label className="labels">Profile Type:</label>
          <input
            type="text"
            className="form-control"
            placeholder=""
            defaultValue=""
            readOnly
          />
        </div>
      </div>
    </div>
  </div>
</div>

    </Wrapper>
  )
}

export default ProfilePage
const Wrapper= styled.section`
body {
    background: rgb(99, 39, 120)
}

.form-control:focus {
    box-shadow: none;
    border-color: #BA68C8
}

.profile-button {
    background: rgb(99, 39, 120);
    box-shadow: none;
    border: none
}

.profile-button:hover {
    background: #682773
}

.profile-button:focus {
    background: #682773;
    box-shadow: none
}

.profile-button:active {
    background: #682773;
    box-shadow: none
}

.back:hover {
    color: #682773;
    cursor: pointer
}

.labels {
    font-size: 14px;
    margin-top:10px
}

.add-experience:hover {
    background: #BA68C8;
    color: #fff;
    cursor: pointer;
    border: solid 1px #BA68C8
}
`