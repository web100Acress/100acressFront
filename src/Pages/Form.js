import React, { useState } from 'react';
import styled from 'styled-components';

const Button = styled.button`
  padding: 8px 16px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 10px;
`;

const Container = styled.div`
  background-color: #fff;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
  width: 100%;
  max-width: 100%;
  min-height: 500px;
  margin: 20px auto; /* Center the container */
  padding: 20px;
`;

const ImageContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
`;

const ImageWrapper = styled.div`
  flex: 0 0 30%; /* Adjust width as needed */
  text-align: center;
`;

const Image = styled.img`
  width: 100%;
  height: auto;
  border-radius: 10px;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.2);
`;

const Content = styled.div`
  margin-top: 10px;
`;

const Form = ({ registeredData }) => {
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');
  const [editedMobile, setEditedMobile] = useState('');

  const handleEdit = () => {
    // Handle edit functionality here
  };

  const handleAccountDelete = () => {
    // Handle account deletion functionality here
  };

  const handleAddProperty = () => {
    // Handle adding property functionality here
  };

  return (
    <Container>
      <h4>Name</h4>
      <h4>Email</h4>
      <h4>Contact</h4>
      <Button onClick={handleEdit}>Edit</Button>
      <Button onClick={handleAccountDelete}>Account Delete</Button>
      <Button onClick={handleAddProperty}>Add Property</Button>
      <ImageContainer>
        <ImageWrapper>
          <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkIbOIErt1m8402F2xNZnfNgi1jXVEf-nBNwkxoYQF7ZGHxQALmJk5FzjA_x367I3LLRI&usqp=CAU" />
          <Content>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda facere, minima velit voluptates dignissimos deleniti dolorum culpa nesciunt sit illum.</p>
            <Button>View</Button>
          </Content>
        </ImageWrapper>
        <ImageWrapper>
          <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoz-SfCWahKxMvBAh9wHyBg7TawLn8arTvXQ&usqp=CAU" />
          <Content>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorum dolores ipsum cum modi aperiam, expedita quia possimus ut nisi similique?</p>
            <Button>View</Button>
          </Content>
        </ImageWrapper>
        <ImageWrapper>
          <Image src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTLKr6edujQ9y5XCOLf-h4weiW0hFLpU1YzCA&usqp=CAU" />
          <Content>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam excepturi, alias eligendi sequi itaque eveniet atque recusandae illum eius esse?</p>
            <Button>View</Button>
          </Content>
        </ImageWrapper>
      </ImageContainer>
    </Container>
  );
};

export default Form;
