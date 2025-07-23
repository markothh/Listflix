import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton } from 'baseui/modal';
import { Input } from 'baseui/input';
import { RadioGroup, Radio } from 'baseui/radio';
import { listsStore } from '../../stores/listsStore';
import { AdminListStore } from '../../stores/adminListStore';

const AddListModal = ({ isOpen, onClose }) => {
  const [listName, setListName] = useState('');
  const [isPublic, setIsPublic] = useState('false'); 

  const handleSubmit = async () => {
    try {
      const data = { name: listName, publicity: isPublic === 'true' };
      await listsStore.addList(data);
      await AdminListStore.fetchLists(); 
      onClose(); 
    } catch (error) {
      console.error('Ошибка при создании списка:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Добавить новый список</ModalHeader>
      <ModalBody>
        <Input
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          placeholder="Название списка"
        />
        <div style={{ marginTop: '20px' }}>
          <RadioGroup value={isPublic} onChange={(e) => setIsPublic(e.target.value)}>
            <Radio value="true">Публичный</Radio>
            <Radio value="false">Приватный</Radio>
          </RadioGroup>
        </div>
      </ModalBody>
      <ModalFooter>
      <ModalButton kind="secondary" onClick={onClose}>
          Отмена
        </ModalButton>
        <ModalButton kind="primary" onClick={handleSubmit}>
          Сохранить
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default AddListModal;
