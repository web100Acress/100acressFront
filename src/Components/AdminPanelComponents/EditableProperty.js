/** @format */

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import styled from "styled-components";
import { useProductContext } from "../../Context/productContext";
import { InfinitySpin } from "react-loader-spinner";
import axios from "axios";
import Modal from "react-bootstrap/Modal";

function EditableProperty() {
  const { singleProperty, isSingleLoading, getSingleProduct } =
    useProductContext();
  const { url } = useParams();

  const [show, setShow] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleSubmitClose = () => setSubmitting(false);
  const handleSubmitShow = () => setSubmitting(true);

  const API = "https://api.100acress.com/preLaunch/view";

  const handleImageChange = (e) => {
    const { name, files } = e.target;
    const updatedFormData = { ...formData };

    if (name === "photo") {
      updatedFormData.photo = files[0];
    }
    if (name === "sitePlan") {
      updatedFormData.sitePlan = files[0];
    }
    if (name === "floorPlan") {
      updatedFormData.floorPlan = files[0];
    }
    if (name === "locationMap") {
      updatedFormData.locationMap = files[0];
    }

    setFormData(updatedFormData);
  };

  const [formData, setFormData] = useState({
    projectName: "",
    price: "",
    city: "",
    configuration: "",
    status: "",
    featured: "",
    rera_No: "",
    minCovered_Area: "",
    maxCovered_Area: "",
    aboutProject: "",
    builderName: "",
    location: "",
    photo: null,
    sitePlan: null,
    floorPlan: null,
    locationMap: null,
    url: "",
    Aboutdeveloper: "",
    meta_title: "",
    meta_description: "",
  });

  useEffect(() => {
    if (singleProperty) {
      setFormData((prevData) => ({
        ...prevData,
        projectName: singleProperty.projectName,
        price: singleProperty.price,
        city: singleProperty.city,
        configuration: singleProperty.configuration,
        status: singleProperty.status,
        featured: singleProperty.featured,
        rera_No: singleProperty.rera_No,
        minCovered_Area: singleProperty.minCovered_Area,
        maxCovered_Area: singleProperty.maxCovered_Area,
        aboutProject: singleProperty.aboutProject,
        builderName: singleProperty.builderName,
        location: singleProperty.location,
        photo: singleProperty?.photo,
        sitePlan: singleProperty?.sitePlan,
        floorPlan: singleProperty?.floorPlan,
        locationMap: singleProperty?.locationMap,
        url: singleProperty.url,
        Aboutdeveloper: singleProperty?.Aboutdeveloper,
        meta_title: singleProperty?.meta_title,
        meta_description: singleProperty?.meta_description,
      }));
    }
  }, [singleProperty]);

  function handleMainForm(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  useEffect(() => {
    getSingleProduct(`${API}/${url}`);
  }, []);

  const { _id } = singleProperty;

  const UPDATEAPI = `https://api.100acress.com/preLaunch/update/${_id}`;

  function submitPostPropertyForm(e) {
    e.preventDefault();
    handleSubmitShow();
    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }
    axios({
      method: "post",
      url: UPDATEAPI,
      data: formDataToSend,
    })
      .then((res) => {
        setMessage(res.data.message);
        handleSubmitClose();
        handleShow();
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        handleSubmitClose();
        handleShow();
      });
  }

  const UrlAdmin = "/protected/private/admin";
  
  return (
    <Wrapper className='div'>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body style={{ textAlign: "center" }}>{message}</Modal.Body>
      </Modal>
      {isSingleLoading ? (
        <div style={{ margin: "30vh 30vw 30vh 43vw" }}>
          {" "}
          <InfinitySpin width='500' color='red' />{" "}
        </div>
      ) : (
        <div className='formS'>
          <div
            style={{
              textAlign: "center",
              fontWeight: "bold",
              fontSize: "25px",
              paddingBottom: "10px",
              borderBottom: "1px solid grey",
            }}>
            Edit Project
          </div>
          <form onSubmit={submitPostPropertyForm}>
            <input
              type='text'
              placeholder='Project Name'
              name='projectName'
              required
              value={formData.projectName}
              onChange={handleMainForm}
              style={{ marginTop: "1rem" }}
            />
            <input
              type='text'
              placeholder='location'
              name='location'
              required
              value={formData.location}
              onChange={handleMainForm}
            />
            <input
              type='text'
              placeholder='Configuration (ex. 2bhk - 3bhk)'
              required
              name='configuration'
              value={formData.configuration}
              onChange={handleMainForm}
            />
            <input
              type='text'
              placeholder='Price (Cr)'
              min={0}
              name='price'
              required
              value={formData.price}
              onChange={handleMainForm}
            />
            <input
              type='text'
              placeholder='Url link (for address bar) (Eg: xyz-xyz-xyz)'
              name='url'
              required
              value={formData.url}
              onChange={handleMainForm}
            />

            <div className='form_section'>
              <div>Status</div>
              <div className='d-flex'>
                <input
                  type='radio'
                  id='underConstruction'
                  value='underConstruction'
                  className='form_prop'
                  name='status'
                  checked={formData.status === "underConstruction"}
                  onChange={handleMainForm}
                />
                <label htmlFor='underConstruction' className='djwOPM'>
                  Under Construction
                </label>
                <input
                  type='radio'
                  id='readyToMoveIn'
                  value='readyToMoveIn'
                  className='form_prop'
                  name='status'
                  checked={formData.status === "readyToMoveIn"}
                  onChange={handleMainForm}
                />
                <label htmlFor='readyToMoveIn' className='djwOPM'>
                  Ready to Move In
                </label>
                <input
                  type='radio'
                  id='bookingOpen'
                  value='bookingOpen'
                  className='form_prop'
                  name='status'
                  checked={formData.status === "bookingOpen"}
                  onChange={handleMainForm}
                />
                <label htmlFor='bookingOpen' className='djwOPM'>
                  Booking Open
                </label>
                <input
                  type='radio'
                  id='comingSoon'
                  value='comingSoon'
                  className='form_prop'
                  name='status'
                  checked={formData.status === "comingSoon"}
                  onChange={handleMainForm}
                />
                <label htmlFor='comingSoon' className='djwOPM'>
                  Coming Soon
                </label>
              </div>
            </div>
            <div className='form_section' style={{ marginBottom: "10px" }}>
              <div>Featured</div>
              <div className='d-flex'>
                <input
                  type='radio'
                  id='true'
                  value='true'
                  className='form_prop'
                  name='featured'
                  checked={formData.featured === "true"}
                  onChange={handleMainForm}
                />
                <label htmlFor='true' className='djwOPM'>
                  Trending Project
                </label>
                <input
                  type='radio'
                  id='false'
                  value='false'
                  className='form_prop'
                  name='featured'
                  checked={formData.featured === "false"}
                  onChange={handleMainForm}
                />
                <label htmlFor='false' className='djwOPM'>
                  Similar Project
                </label>
                <input
                  type='radio'
                  id='featured'
                  value='featured'
                  className='form_prop'
                  name='featured'
                  checked={formData.featured === "featured"}
                  onChange={handleMainForm}
                />
                <label htmlFor='featured' className='djwOPM'>
                  Featured
                </label>
                <input
                  type='radio'
                  id='asUsual'
                  value='asUsual'
                  className='form_prop'
                  name='featured'
                  checked={formData.featured === "asUsual"}
                  onChange={handleMainForm}
                />
                <label htmlFor='asUsual' className='djwOPM'>
                  As Usual
                </label>
              </div>
            </div>
            <input
              type='text'
              placeholder='Rera no'
              name='rera_No'
              required
              value={formData.rera_No}
              onChange={handleMainForm}
            />
            <input
              type='number'
              placeholder='minCovered Area (sq.ft.)'
              min={0}
              name='minCovered_Area'
              required
              value={formData.minCovered_Area}
              onChange={handleMainForm}
            />
            <input
              type='number'
              placeholder='maxCovered Area (sq.ft.)'
              min={0}
              name='maxCovered_Area'
              required
              value={formData.maxCovered_Area}
              onChange={handleMainForm}
            />
            <div
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                fontWeight: "bold",
              }}>
              Write about the Project
            </div>
            <textarea
              id='w3review'
              name='aboutProject'
              rows='5'
              cols='84'
              required
              value={formData.aboutProject}
              onChange={handleMainForm}
            />
            <div>
              <div
                style={{
                  marginTop: "10px",
                  marginBottom: "10px",
                  fontWeight: "bold",
                }}>
                Builder Select
              </div>
              <select
                name='builderName'
                id='developers'
                className='selectBuilder'
                data-show-subtext='true'
                data-live-search='true'
                required
                value={formData.builderName}
                onChange={handleMainForm}>
                <option value='null' disabled required selected>
                  Choose the Developer
                </option>
                <option value='adani'>Adani</option>
                <option value='ashiana'>Ashiana</option>
                <option value='aipl'>Aipl</option>
                <option value='amb'>Amb</option>
                <option value='ambience'>Ambience</option>
                <option value='Anantraj Estates and Birla Estates'>Anantraj Estates and Birla Estates</option>
                <option value='ats'>Ats</option>
                <option value='Bestech'>Bestech</option>
                <option value='bptp'>Bptp</option>
                <option value='centralpark'>Central Park</option>
                <option value='conscient'>Conscient</option>
                <option value='capital'>Capital Developers India</option>
                <option value='dlf'>DLF</option>
                <option value='experion'>Experion</option>
                <option value='elan'>Elan</option>
                <option value='emaarIndia'>Emaar India</option>
                <option value='godrej'>Godrej</option>
                <option value='herohomes'>Hero Homes</option>
                <option value='krisumi'>Krisumi</option>
                <option value='m3m'>M3M</option>
                <option value='mahindra'>Mahindra</option>
                <option value='microtech'>Microtech</option>
                <option value='orris'>Orris</option>
                <option value='omaxe'>Omaxe</option>
                <option value='oxirich'>Oxirich</option>
                <option value='paras'>Paras</option>
                <option value='puri'>Puri</option>
                <option value='raheja'>Raheja</option>
                <option value='risland'>Risland</option>
                <option value='rofGroup'>ROF Group</option>
                <option value='supertech'>SuperTech</option>
                <option value='suncity'>Suncity Projects Pvt.Ltd</option>
                <option value='spaze'>Spaze</option>
                <option value='shapoorji'>Shapoorji Pallonji</option>
                <option value='smartworld'>Smart World</option>
                <option value='sobha'>Sobha</option>
                <option value='tarc'>Tarc</option>
                <option value='tatahousing'>Tata Housing</option>
                <option value='tribeca_developers'>Tribeca Developers</option>
                <option value='vatika'>Vatika</option>
                <option value='whiteland'>Whiteland</option>
                <option value='32milestone'>32 Milestone</option>
              </select>

              <div
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  fontWeight: "bold",
                }}>
                About Developer
              </div>
              <textarea
                id='w3review'
                name='Aboutdeveloper'
                rows='5'
                cols='84'
                required
                value={formData.Aboutdeveloper}
                onChange={handleMainForm}
              />
            </div>
            <div
              style={{
                marginTop: "10px",
                marginBottom: "10px",
                fontWeight: "bold",
              }}>
              Location
            </div>
            <select
              name='city'
              id='developers'
              required
              value={formData.city}
              onChange={handleMainForm}>
              <option value='null' disabled selected>
                Choose the Location
              </option>
              <option value='gurgaon'>Gurgaon</option>
              <option value='delhi'>Delhi</option>
              <option value='sector45'>Sector 45</option>
              <option value='tilakNagar'>Tilak Nagar</option>
              <option value='palamVihar'>palam Vihar</option>
              <option value='mgRoad'>MG Road</option>
              <option value='subhashChowk'>Subhash Chowk</option>
              <option value='rajeevChowk'>Rajeev Chowk</option>
            </select>

            <div>
              <div
                style={{
                  marginTop: "20px",
                  marginBottom: "20px",
                  fontWeight: "bold",
                }}>
                Attach Some Photos
              </div>

              <div>
                <div
                  style={{
                    fontSize: "12px",
                    marginTop: "10px",
                  }}>
                  ( Site Image )
                </div>
                <input
                  type='file'
                  name='sitePlan'
                  accept='image/*'
                  id='mainImage'
                  onChange={handleImageChange}
                />
              </div>

              <div>
                <div
                  style={{
                    fontSize: "12px",
                    marginTop: "10px",
                  }}>
                  ( Main Images )
                </div>
                <input
                  type='file'
                  name='photo'
                  accept='image/*'
                  id='mainImage'
                  multiple
                  onChange={handleImageChange}
                />
              </div>

              <div>
                <div
                  style={{
                    fontSize: "12px",
                    marginTop: "10px",
                  }}>
                  ( Floor Image )
                </div>
                <input
                  type='file'
                  name='floorPlan'
                  accept='image/*'
                  id='mainImage'
                  onChange={handleImageChange}
                />
              </div>

              <div>
                <div
                  style={{
                    fontSize: "12px",
                    marginTop: "10px",
                  }}>
                  ( Location Map )
                </div>
                <input
                  type='file'
                  name='locationMap'
                  accept='image/*'
                  id='mainImage'
                  onChange={handleImageChange}
                />
              </div>
            </div>

            <div
              style={{
                marginTop: "20px",
                marginBottom: "20px",
                fontWeight: "bold",
              }}
              title="Meta's Tags refers to the text that is displayed on search engine result pages and browser tabs to indicate the topic of a webpage">
              Meta Informations
            </div>
            <input
              type='text'
              name='meta_title'
              id='meta_title'
              placeholder='Meta Title*'
              value={formData.meta_title}
              onChange={handleMainForm}
            />
            <input
              type='text'
              name='meta_description'
              id='meta_description'
              placeholder='Meta Description*'
              value={formData.meta_description}
              onChange={handleMainForm}
            />

            <button
              type='submit'
              style={{
                marginTop: "10px",
                margin: "2% 45%",
                border: "none",
                background: "orange",
                padding: "5px 10px",
                borderRadius: "10px",
              }}
              disabled={submitting}>
              {submitting ? "Updating..." : "Update"}
            </button>
          </form>
        </div>
      )}
    </Wrapper>
  );
}

export default EditableProperty;
const Wrapper = styled.div`
  box-sizing: border-box;
  width: 100%;
  .formS {
    margin: 2rem auto;
    width: 50%;
    padding: 1rem;
    border: 1px solid grey;
    border-radius: 15px;
  }
  input[type="text"],
  input[type="number"] {
    width: 100%;
    outline: none;
    border: 0px solid;
  }
  textarea {
    width: 100%;
  }
  .hjMmlm section {
    display: none !important;
    visibility: none !important;
  }
  .dddddd input {
    width: 100%;
  }
  .daKWAU section {
    display: none;
  }
  .fmvbIt {
    display: none;
  }
  .sideBarMain {
    flex: 0 0 20%;
    background: white;
    height: 100vh;
    position: sticky;
    top: 40px;
    padding-right: 20px;
    padding-left: 5px;
  }
  .contentMain {
    flex: 0 0 80%;
  }
  .fmL > .listElm {
    color: red;
    font-size: large;
    padding: 20px;
    cursor: pointer;
  }

  .active {
    color: white !important;
    background: red;
    border-radius: 20px;
  }
  .mainSed {
    margin: 30px;
  }
  .addBtn {
    padding: 10px;
    border-radius: 8px;
    font-weight: 500;
    background: #3a833a;
    border: none;
    color: white;
  }
  .addBtn:active {
    transform: scale(0.99);
  }
  .out-line {
    border: none;
    padding-left: 10px;
    padding-right: 10px;
  }
  .proPElmFlex {
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    font-size: 17px;
  }
  .listElm:hover {
    background: red;
    border-radius: 20px;
    color: white !important;
  }
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    display: none;
  }

  input[type="text"],
  input[type="phone"],
  input[type="email"],
  input[type="date"],
  input[type="number"],
  input[type="password"] {
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
    margin-bottom: 10px;
  }
  input:focus {
    border-color: #5122d9;
    box-shadow: 0px 0px 4px #5122d9;
    tranform: scale(1.2);
  }
  .form_prop:checked + label {
    color: #e5652e;
    border-color: #e5652e;
    background: rgba(255, 99, 71, 0.2);
  }
  input[type="radio"],
  input[type="checkbox"] {
    visibility: hidden;
  }
  .djwOPM {
    display: flex;
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
    margin-bottom: 10px;
  }
  .bhkAvailable {
    width: 40%;
    padding: 20px 10px;
    box-shadow: 0px 0px 30px #0000001a;
    border-radius: 15px;
    margin-top: 1.5rem;
    min-width: 330px;
  }
  .ffgPCLMV {
    justify-content: space-between;
  }
  .selectBuilder > option {
    height: 50px;
  }
`;
