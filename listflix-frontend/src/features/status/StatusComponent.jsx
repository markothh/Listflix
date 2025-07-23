import React from "react";
import '../../styles/CheckBox.css'; // Подключаем стили для чекбоксов

const StatusComponent = ({ selectedStatuses, onCheckboxChange }) => {
  const statusesEnum = {
    NOT_WATCHED: "Не просмотрен",
    IN_PROGRESS: "В процессе",
    PAUSED: "Просмотр приостановлен",
    DROPPED: "Заброшен",
    WATCHED: "Просмотрен",
  };

  const handleCheckboxChange = (status) => {
    // Вызов обработчика при изменении состояния
    onCheckboxChange(status);
  };

  return (
    <div>
      <h3>Статус</h3>
      {Object.entries(statusesEnum).map(([key, label]) => (
        <div key={key} style={{ marginBottom: '5px', display: 'flex', alignItems: 'center' }}>
          <label style={{ display: 'flex', alignItems: 'center' }}>
            <input
              type="checkbox"
              checked={selectedStatuses.includes(key)}  // Синхронизация с состоянием
              onChange={() => handleCheckboxChange(key)}  // Вызов обработчика при изменении
              className={`checkbox ${selectedStatuses.includes(key) ? 'selected' : ''}`}
            />
            <span className="checkbox-label">{label}</span>
          </label>
        </div>
      ))}
    </div>
  );
};

export default StatusComponent;
