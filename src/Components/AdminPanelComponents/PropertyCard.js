import React, { useState } from 'react'
import styled from 'styled-components'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from "axios"
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

function PropertyCard(elem) {
    const [show, setShow] = useState(false);
    const [showSucces, setShowSuccess] = useState(false);
    const [showForm, setShowForm] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleShowSuccess = () => setShowSuccess(true);
    const handleCloseSuccess = () => setShowSuccess(false);
    const handleShowForm =() => setShowForm(true);
    const handleCloseForm =() => setShowForm(false);
    
    const handleImageChange = (e) => {
      const { name, files } = e.target;
      const updatedFormData = { ...formData };
      if (name === "image") {
        updatedFormData.image = files[0];
      }
      setFormData(updatedFormData);
    };
    function handleMainForm(e){
      setFormData({...formData,[e.target.name]:e.target.value})
    }
    const[formData,setFormData] = useState({
      input_Bhk:"",
      build_area:"",
      possession:"",
      image:null,
    })
    

    if (!elem || !elem.photo || !elem.price || !elem.city || !elem.projectName) {

        return (
          <Wrapper className="section">
            <div>Loading...</div>
          </Wrapper>
        );
      }
    
      const{projectName,_id,photo} =elem;
      const URL=`https://api.100acress.com/preLaunch/bhk/insert/${_id}`
      
      const Path=`/protected/private/admin/projectView/${_id}`
      function handleDeleteSection(){
        
        axios({
            method:"delete",
            url:`https://api.100acress.com/preLaunch/delete/${_id}`,
          })
          handleClose();
          handleShowSuccess();
      }
      function submitBhkForm(e){
        e.preventDefault();
        const formDataToSend = new FormData();
        for (const key in formData) {
          formDataToSend.append(key, formData[key]);
        }
        axios({
          method:"post",
          url:URL,
          data:formDataToSend,
        })
        .then(res=>{
          console.log(res.data.message);
          handleCloseForm();
        })
        .catch(err=>{
          console.log(err.response.data.message);
        })
      }
    
  return (
    <Wrapper className="div">
    <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, Are U sure u want to delete this item</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteSection}>
            Delete It!
          </Button>
        </Modal.Footer>
    </Modal>

    <Modal show={showSucces} onHide={handleCloseSuccess}>
        <Modal.Body style={{textAlign:"center"}}>Deleted SuccessFull! Please Refresh to See Changes</Modal.Body>
    </Modal>


    <Modal show={showForm} onHide={handleCloseForm}>
        <Modal.Header closeButton>
          <Modal.Title>Add BHK Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={submitBhkForm}>
            <div style={{fontWeight:"bold"}}>Enter Input BHK</div>
            <input type="text" name="input_Bhk" id="form_input_Bhk" className="input_bhk" placeholder='Input Bhk Detail' style={{width:"100%",marginBottom:"10px",paddingLeft:"10px"}} onChange={handleMainForm}/>
            <div style={{fontWeight:"bold"}}>Enter BuildUp Area</div>
            <input type="number" name="build_area" id="form_input_Bhk" className="input_bhk" placeholder='Input Build Up Area' min={0} style={{width:"100%",marginBottom:"10px",paddingLeft:"10px"}} onChange={handleMainForm}/>
            <div style={{fontWeight:"bold"}}>Possession In</div>
            <input type="number" name="possession" id="form_input_Bhk" className="input_bhk" placeholder='Possession' min={0} style={{width:"100%",marginBottom:"10px",paddingLeft:"10px"}} onChange={handleMainForm}/>
            <div style={{fontWeight:"bold"}}>Attach Floor Plan Image</div>
            <input type="file" name="image" accept='image/*' id="form_input_Bhk" onChange={handleImageChange} />
            <button type="submit" style={{border:"none",padding:"5px 20px",background:"#198754",color:"white",borderRadius:"15px"}}>Submit</button>
          </form>
        </Modal.Body>
    </Modal>
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={photo[0].url} />
      <Card.Body>
        <Card.Title>{projectName}</Card.Title>
        <Card.Text>
          ({_id})
        </Card.Text>
        <Link to={Path}{...elem} relative="path">
        <Button variant="primary" >View</Button>
        </Link>
        <Button variant="secondary">Edit</Button>
        <Button variant="danger" onClick={handleShow}>Delete</Button>
        <Button variant="" onClick={handleShowForm} style={{width:"100%"}}>Add BHK Details</Button>
      </Card.Body>
    </Card>
    </Wrapper>
  )
}

export default PropertyCard
const Wrapper=styled.div`
display:flex;

.proPElmFlex {
    width:30px;
    display: flex;
    justify-content: space-between;
    margin-top: 30px;
    font-size: 17px;
  }
  .out-line {
    border: none;
    padding-left: 10px;
    padding-right: 10px;
  }
`