import React from 'react';
import '../../styles/CheckBox.css';

const TagItemToEdit = ({ tag, onChange, selected }) => {
  const handleChange = (e) => {
    onChange(tag.name, e.target.checked); 
  };

  return (
    <div style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
      <label style={{ display: 'flex', alignItems: 'center' }}>
        <input
          type="checkbox"
          checked={selected}    
          onChange={handleChange} 
          className={`checkbox ${selected ? 'selected' : ''}`}
        />
        <span className="checkbox-label">
          {tag.name}
        </span>
      </label>
    </div>
  );
};

export default TagItemToEdit;
