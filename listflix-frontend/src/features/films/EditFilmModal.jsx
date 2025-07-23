import React, { useState, useEffect } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalButton } from 'baseui/modal';
import { Input } from 'baseui/input';
import { Select } from 'baseui/select';
import TagComponentToEdit from '../tags/TagComponentToEdit';
import ConfirmDialog from '../../components/ConfirmDialog'
import { FilmsStoreInstance } from '../../stores/filmStore';
import { observer } from 'mobx-react-lite';
import { useParams } from 'react-router-dom';

const StatusEnum = {
  NOT_WATCHED: "Не просмотрен",
  IN_PROGRESS: "В процессе",
  PAUSED: "Просмотр приостановлен",
  DROPPED: "Заброшен",
  WATCHED: "Просмотрен",
};

const EditFilmModal = observer(({ isOpen, onClose, allTags, film, onFilmUpdated }) => {
  const {id} = useParams();
  const [name, setName] = useState(film?.name || '');
  const [description, setDescription] = useState(film?.description || '');
  const [status, setStatus] = useState(film?.status || '');
  const [selectedTags, setSelectedTags] = useState(film?.tags || []);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);

  useEffect(() => {
    setName(film?.name || '');
    setDescription(film?.description || '');
    setStatus(film?.status || '');
    setSelectedTags(film?.tags || []);
  }, [film]);

  const handleSave = () => {
    let filmData = { name, description, status, tags: selectedTags }
    FilmsStoreInstance.editFilm(id, film.id, filmData)
    console.log(filmData);

    if (onFilmUpdated) {
      onFilmUpdated();
    }

    onClose();
  };
  
  const handleDelete = () => {
    console.log(id, film.id)
    FilmsStoreInstance.deleteFilm(id, film.id)
    console.log(`Фильм с id ${film.id} удален`);

    if (onFilmUpdated) {
      onFilmUpdated();
    }
    onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalHeader>{film ? 'Редактировать фильм' : 'Добавить фильм'}</ModalHeader>
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
            <Select
              value={[{ id: status, label: StatusEnum[status] || 'Не определен' }]}
              onChange={(e) => setStatus(e.value[0].id)}
              options={Object.keys(StatusEnum).map((key) => ({
                id: key,
                label: StatusEnum[key],
              }))}
              placeholder="Выберите статус"
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <TagComponentToEdit
              tags={allTags}
              selectedTags={selectedTags}
              onCheckboxChange={(tags) => setSelectedTags(tags)} 
            />
          </div>
        </ModalBody>

        <ModalFooter>
          <ModalButton kind="secondary" onClick={onClose}>Отмена</ModalButton>
          <ModalButton kind="primary" onClick={handleSave}>Сохранить</ModalButton>
          <ModalButton
          kind="primary" 
          style={{position: 'absolute', left: '20px'}}
          onClick={() => setDeleteDialogOpen(true)}
        >
          Удалить фильм
        </ModalButton>
        </ModalFooter>
      </Modal>

      <ConfirmDialog
        isOpen={isDeleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={handleDelete}
        message="Вы уверены, что хотите удалить этот фильм?"
      />
    </>
  );
});

export default EditFilmModal;
