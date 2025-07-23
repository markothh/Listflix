import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton } from 'baseui/modal';
import { Input } from 'baseui/input';

const TagModal = ({ isOpen, onClose, onAddTag }) => {
  const [tagName, setTagName] = useState(''); // Стейт для имени тега

  const handleAddTag = async () => {
    if (tagName.trim() === '') return; // Если имя пустое, не делать ничего

    try {
      await onAddTag(tagName); 
      setTagName('');
      onClose();
    } catch (error) {
      console.error('Ошибка при добавлении тега:', error);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Добавить тег</ModalHeader>
      <ModalBody>
        <Input
          value={tagName}
          onChange={(e) => setTagName(e.target.value)}
          placeholder="Введите название тега"
          label="Название тега"
        />
      </ModalBody>
      <ModalFooter>
        <ModalButton kind="secondary" onClick={onClose}>
          Отмена
        </ModalButton>
        <ModalButton kind="primary" onClick={handleAddTag}>
          Добавить
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default TagModal;
