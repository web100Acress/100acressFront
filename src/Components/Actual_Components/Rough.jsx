import React, { useState, useRef, useEffect } from "react";
import ConfirmationPopup from "./ConfirmationPopup";
import styled from "styled-components";

function RoughSec() {
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);

  const openConfirmation = (item) => {
    setItemToDelete(item);
    setIsConfirmationOpen(true);
  };

  const closeConfirmation = () => {
    setItemToDelete(null);
    setIsConfirmationOpen(false);
  };

  const handleDelete = () => {
    // Perform the delete action here, e.g., send a request to the server.
    // After successful deletion, close the confirmation popup.
    closeConfirmation();
  };

  const items = [
    { id: 1, name: "Item 1" },
    { id: 2, name: "Item 2" },
    { id: 3, name: "Item 3" },
  ];

  return (
    <Wrapper className='section'>
      <div>
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              {item.name}
              <button onClick={() => openConfirmation(item)}>Delete</button>
            </li>
          ))}
        </ul>

        <ConfirmationPopup
          isOpen={isConfirmationOpen}
          message={`Are you sure you want to delete ${
            itemToDelete ? itemToDelete.name : ""
          }?`}
          onCancel={closeConfirmation}
          onConfirm={handleDelete}
        />
      </div>
    </Wrapper>
  );
}

export default RoughSec;
const Wrapper = styled.section`
  .confirmation-popup{
    width: 40%;
    box-shadow:0px 0px 30px #0000001a;
    border-radius:15px;
  }
`;
