import React, { useState, useEffect } from "react";
import { observer } from "mobx-react-lite";
import TagItemToEdit from "./TagItemToEdit";

const TagComponentToEdit = observer(({ id, tags, selectedTags = [], onCheckboxChange }) => {
  const [localSelectedTags, setLocalSelectedTags] = useState([]);

  useEffect(() => {
    setLocalSelectedTags(selectedTags || []);
  }, [selectedTags]);

  const handleCheckboxChange = (tagName) => {
    const updatedTags = localSelectedTags.includes(tagName)
      ? localSelectedTags.filter((name) => name !== tagName)
      : [...localSelectedTags, tagName];

      console.log(`localSelectedTags: ${localSelectedTags}`)
      console.log(`updatedTags: ${updatedTags}`)
    setLocalSelectedTags(updatedTags);
    onCheckboxChange(updatedTags); 
  };

  return (
    <div>
      <h3 style={{ marginTop: "0px" }}>Теги</h3>
      {tags && tags.length > 0 ? (
        <div>
          {tags.map((tag) => (
            <TagItemToEdit
              key={tag.id}
              tag={tag}
              onChange={() => handleCheckboxChange(tag.name)} // Обновляем выбранные теги
              selected={localSelectedTags.includes(tag.name)} // Проверяем, выбран ли тег
            />
          ))}
        </div>
      ) : (
        <div style={{ marginBottom: "5px" }}>Нет тегов для этого списка</div>
      )}
    </div>
  );
});

export default TagComponentToEdit;
