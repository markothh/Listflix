import React from 'react';

const FilmItem = ({ index, title, tags, status, description, onClick }) => {
  return (
    <li
      onClick={onClick}
      style={{
        cursor: 'pointer',
        textAlign: 'left',
        padding: '10px',
        margin: '8px auto',
        width: '70%',
        backgroundColor: '#f7f7f7',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s, transform 0.2s',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = '#e0e0e0';
        e.currentTarget.style.transform = 'scale(1.02)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = '#f7f7f7';
        e.currentTarget.style.transform = 'scale(1)';
      }}
    >
      <h4 style={{ margin: 0, color: '#333' }}>
        {`${index + 1}. ${title}`}
      </h4>
    </li>
  );
};

export default FilmItem;
