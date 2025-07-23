import React from "react";
import { Button } from "baseui/button"; 
import { FaEye } from "react-icons/fa";  // Иконка глаза из react-icons

const WatchButton = ({ onClick }) => {
  return (
    <Button
      onClick={onClick}
      kind="primary"  // Кнопка primary
      size="compact"  // Размер кнопки
      style={{
        width: "40px",  // Ширина кнопки (квадратная)
        height: "40px",  // Высота кнопки (квадратная)
        display: "flex",  // Используем flexbox для центрирования иконки
        justifyContent: "center",  // Центрируем по горизонтали
        alignItems: "center",  // Центрируем по вертикали
        padding: 0,  // Убираем внутренние отступы
      }}
    >
      <FaEye size={20} />  {/* Иконка глаза */}
    </Button>
  );
};

export default WatchButton;
