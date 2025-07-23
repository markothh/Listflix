import React from 'react';
import { Button } from "baseui/button"; 
import { FiEdit } from 'react-icons/fi'; 

const EditButton = ({ onClick }) => {
  return (
    <Button
    onClick={onClick}
    kind="primary"  
    size="compact" 
    style={{
      width: "40px",  
      height: "40px", 
      display: "flex", 
      justifyContent: "center",  
      alignItems: "center", 
      padding: 0,  
    }}
    >
      <FiEdit size={16} /> 
    </Button>
  );
};

export default EditButton;
