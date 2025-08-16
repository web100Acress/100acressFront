import React, { useEffect, useState } from 'react';
import { MDBBtn, MDBModal, MDBModalDialog, MDBModalContent, MDBModalBody } from 'mdb-react-ui-kit';
import { styled } from 'styled-components';

export default function Cookie() {
  const [bottomModal, setBottomModal] = useState(false);
  const toggleShow =()=>setBottomModal(!bottomModal);
  useEffect(() => {
    const timer = setTimeout(() => {
        setBottomModal(!bottomModal);
    }, 9000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Wrapper className="section">
      <MDBModal staticBackdrop show={bottomModal} tabIndex='-1' setShow={setBottomModal}>
        <MDBModalDialog className='dialog'>
          <MDBModalContent>
            <MDBModalBody className='py-1 '>
              <div className='d-flex justify-content-center align-items-center my-3'>
                <p className='mb-0 ' >We use cookies to improve your website experience</p>
                <MDBBtn color='success' size='sm' className='ms-2' onClick={toggleShow}>
                  Accept All
                </MDBBtn>
                <MDBBtn size='sm' className='ms-2' onClick={toggleShow}>
                  Reject All
                </MDBBtn>
                <MDBBtn size='sm' className='ms-2' color='info'>
                  Learn more
                </MDBBtn>
              </div>
            </MDBModalBody>
          </MDBModalContent>
        </MDBModalDialog>
      </MDBModal>
    </Wrapper>
  );
}
const Wrapper=styled.section`
.modal{
    --mdb-modal-margin:0rem;
    --mdb-modal-width:100%;
}
.dialog{
    position:absolute;
    bottom:1px;
    width:100%;
}
`