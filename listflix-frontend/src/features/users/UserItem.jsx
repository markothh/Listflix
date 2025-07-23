import React from "react";
import { Link } from "react-router-dom"; // Для создания кликабельных ссылок

const UserItem = ({ userId, username }) => {
  return (
    <div
      style={{
        backgroundColor: "#f7f7f7", // Цвет фона для компонента
        padding: "10px",
        marginTop: "5px",
        marginRight: "15px",
        borderRadius: "5px",
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Link
        to={`/users/${userId}`}
        style={{
          fontSize: "16px",
          fontWeight: "bold",
          color: "#007bff", // Цвет ссылки
          textDecoration: "none",
          display: "block",
        }}
      >
        {username}
      </Link>
    </div>
  );
};

export default UserItem;
