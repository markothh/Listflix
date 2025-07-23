import React, { useEffect, useState } from "react";
import { Modal, ModalBody, ModalHeader, ModalFooter, ModalButton } from "baseui/modal";
import { Input } from "baseui/input";
import { RadioGroup, Radio } from 'baseui/radio';
import { listsStore } from "../../stores/listsStore"; 
import RoleComponent from "../../features/roles/RoleComponent";
import ConfirmDialog from '../../components/ConfirmDialog'
import { useNavigate } from "react-router-dom";

const EditListModal = ({ isOpen, onClose, id }) => {
  const [name, setName] = useState("");
  const [publicity, setPublicity] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await listsStore.editList(id);
        setName(data.name);
        setPublicity(data.publicity);

        const usersArray = Object.entries(data.users || {}).map(([id, role]) => ({
          id,
          role
        }));

        setUsers(usersArray); 
        console.log(usersArray);
      } catch (error) {
        console.error("Ошибка при загрузке данных:", error);
      } finally {
        setLoading(false);
      }
    };

    if (isOpen) {
      fetchData();
    }
  }, [isOpen, id]);

  const handleSubmit = async () => {
    const formattedUsers = selectedUsers.reduce((acc, user) => {
      acc[user.id] = user.role;
      return acc;
    }, {});
  
    const dataToSave = {
      publicity: publicity === "true",
      name,
      users: formattedUsers,
    };

    console.log(dataToSave);
  
    try {
      await listsStore.saveChanges(id, dataToSave); 
      console.log("Данные сохранены:", dataToSave);
      onClose(); 
    } catch (error) {
      console.error("Ошибка при сохранении данных:", error);
    }
  };

  const handleDeleteList = async () => {
    try {
      await listsStore.deleteList(id);
      console.log("Список удален");
      navigate('/lists')
      onClose(); 
    } catch (error) {
      console.error("Ошибка при удалении списка:", error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Редактировать список</ModalHeader>
      <ModalBody>
        <div style={{ marginBottom: "20px" }}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите имя списка"
            label="Название списка"
          />
        </div>
        <div style={{ marginTop: '20px' }}>
          <RadioGroup value={String(publicity)} onChange={(e) => setPublicity(e.target.value)}>
            <Radio value="true">Публичный</Radio>
            <Radio value="false">Приватный</Radio>
          </RadioGroup>
        </div>
        <div style={{ marginBottom: "20px" }}>
          <RoleComponent
            users={users}
            selectedUsers={selectedUsers}
            setSelectedUsers={setSelectedUsers}
          />
        </div>
      </ModalBody>
      <ModalFooter>
        <ModalButton kind="secondary" onClick={onClose}>
          Отмена
        </ModalButton>
        <ModalButton kind="primary" onClick={handleSubmit}>
          Сохранить
        </ModalButton>
        <ModalButton
          kind="primary" 
          style={{position: 'absolute', left: '20px'}}
          onClick={() => setDeleteDialogOpen(true)}
        >
          Удалить список
        </ModalButton>
      </ModalFooter>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDeleteList}
        message="Вы уверены, что хотите удалить этот список?"
      />
    </Modal>
  );
};

export default EditListModal;
