import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import TagItemForSelect from './TagItemForSelect';
import AddButton from '../../components/AddButton';
import TagModal from './TagModal';
import { TagsStoreInstance } from '../../stores/tagsStore';

const TagComponentToSelect = observer(({ id, role, selectedTags = [], onCheckboxChange }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    TagsStoreInstance.fetchTags(id); // Загружаем теги при монтировании
  }, [id]);

  const handleCheckboxChange = (tagName) => {
    onCheckboxChange(tagName);
  };

  return (
    <div>
      <h3 style={{ marginTop: '0px' }}>Теги</h3>
      {TagsStoreInstance.tags.length > 0 ? (
        <div>
          {TagsStoreInstance.tags.map((tag) => (
            <TagItemForSelect
              key={tag.id}
              tag={tag}
              onChange={() => handleCheckboxChange(tag.name)}
              selected={selectedTags.includes(tag.name)}
            />
          ))}
        </div>
      ) : (
        <div style={{ marginBottom: '5px' }}>Нет тегов для этого списка</div>
      )}

      {role === 'ADMIN' && <AddButton onClick={() => setModalOpen(true)} />}

      <TagModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onAddTag={(name) => TagsStoreInstance.addTag(id, name)} // Добавляем тег и обновляем стор
      />
    </div>
  );
});

export default TagComponentToSelect;
