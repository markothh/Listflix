import React from 'react';
import { useNavigate } from 'react-router-dom';

const ListItem = ({ id, index, name }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/lists/${id}`); 
  };

  return (
    <li
      onClick={handleClick}
      style={{
        cursor: 'pointer',
        textAlign: 'left', // Текст слева
        padding: '15px',
        margin: '10px auto',
        width: '60%', // Уменьшение ширины элемента
        backgroundColor: '#f7f7f7', // Светло-серый фон
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        transition: 'background-color 0.3s, transform 0.2s',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.backgroundColor = '#e0e0e0'; // Более темный серый при наведении
        e.currentTarget.style.transform = 'scale(1.02)'; // Легкий зум
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.backgroundColor = '#f7f7f7'; // Возврат цвета
        e.currentTarget.style.transform = 'scale(1)'; // Возврат размера
      }}
    >
      <h4 style={{ margin: 0, color: '#333' }}>{`${index + 1}. ${name}`}</h4>
    </li>
  );
};

export default ListItem;
