import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton } from 'baseui/modal';
import { Input } from 'baseui/input';
import TagComponentToEdit from '../tags/TagComponentToEdit';
import { FilmsStoreInstance } from '../../stores/filmStore';
import { useParams } from 'react-router-dom';

const AddListModal = ({ isOpen, onClose, allTags }) => {
  const {id} = useParams()
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSave = () => {
    const filmData = {
      name,
      description,
      tags: selectedTags
    };

    FilmsStoreInstance.addFilm(id, filmData)
      .then(() => {
        console.log('Фильм добавлен:', filmData);
        onClose();
      })
      .catch((error) => {
        console.error('Ошибка при добавлении фильма:', error);
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalHeader>Добавить новый фильм</ModalHeader>
      <ModalBody>
        <div style={{ marginBottom: '20px' }}>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите название фильма"
            label="Название фильма"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <Input
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Введите описание фильма"
            label="Описание"
            rows={5}
            as="textarea"
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <TagComponentToEdit
            tags={allTags}
            selectedTags={selectedTags}
            onCheckboxChange={(tags) => setSelectedTags(tags)} // Обновляем выбранные теги
          />
        </div>
      </ModalBody>

      <ModalFooter>
        <ModalButton kind="secondary" onClick={onClose}>
          Отмена
        </ModalButton>
        <ModalButton kind="primary" onClick={handleSave}>
          Сохранить
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default AddListModal;
