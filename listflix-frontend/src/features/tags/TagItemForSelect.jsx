import React, { useState } from "react";
import "../../styles/CheckBox.css";

const TagItem = ({ tag, onChange }) => {
  const [selected, setSelected] = useState(false);

  const handleChange = (e) => {
    const isChecked = e.target.checked;
    setSelected(isChecked); // Локально обновляем состояние
    onChange(tag.name, isChecked); // Уведомляем родительский компонент
  };

  return (
    <div style={{ marginBottom: "10px", display: "flex", alignItems: "center" }}>
      <label style={{ display: "flex", alignItems: "center" }}>
        <input
          type="checkbox"
          checked={selected}
          onChange={handleChange}
          className={`checkbox ${selected ? "selected" : ""}`}
        />
        <span className="checkbox-label">{tag.name}</span>
      </label>
    </div>
  );
};

export default TagItem;
