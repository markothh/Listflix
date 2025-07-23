import React from "react";
import { Button } from "baseui/button"; 
import { FaPlus } from "react-icons/fa"; 

const AddButton = ({ className, onClick }) => {
  return (
    <Button
    className={className}
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
      <FaPlus size={16} /> 
    </Button>
  );
};

export default AddButton;
