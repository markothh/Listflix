import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "baseui/modal";
import { Button } from "baseui/button";
import { useNavigate } from "react-router-dom";
import { UserListsStore } from "../../stores/userListStore";

const UserModal = ({ isOpen, onClose, user }) => {
    console.log(user)
  const navigate = useNavigate();

  const handleViewLists = () => {
    UserListsStore.username = user.username;
    navigate(`/lists?user=${user.id}`);
    onClose(); 
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      overrides={{
        Dialog: {
          style: { borderRadius: "8px", width: "400px", padding: "20px" },
        },
      }}
    >
      <ModalHeader>Информация о пользователе</ModalHeader>
      <ModalBody>
        <div style={{ fontSize: "16px", fontWeight: "bold" }}>Имя пользователя: {user.username}</div>
      </ModalBody>
      <ModalFooter
        style={{ display: "flex", justifyContent: "flex-end", gap: "10px" }}
      >
        <Button kind='secondary' onClick={onClose}>
          Закрыть
        </Button>
        <Button onClick={handleViewLists}>Просмотреть списки</Button>
      </ModalFooter>
    </Modal>
  );
};

export default UserModal;
