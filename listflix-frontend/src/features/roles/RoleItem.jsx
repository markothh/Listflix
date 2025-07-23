import React, { useEffect, useState } from "react";
import { UserStoreInstance } from "../../stores/userStore";
import { Select } from "baseui/select"; // Импортируем Select из baseui
import UserItem from "../users/UserItem"; // Кликабельный компонент для пользователя

const RoleItem = ({ userId, role, setSelectedUsers, selectedUsers }) => {
  const [userName, setUserName] = useState(""); 
  const [currentRole, setCurrentRole] = useState(role); 

  // Получаем данные о пользователе
  useEffect(() => {
    const fetchUser = async () => {
      const userData = await UserStoreInstance.getUserById(userId);
      setUserName(userData ? userData.username : "Неизвестный пользователь");
    };

    fetchUser();
  }, [userId]);

  useEffect(() => {
    console.log("Updated selectedUsers:", selectedUsers);
  }, [selectedUsers]);

  const handleRoleChange = (e) => {
    const newRole = e.value[0].id; 
    setCurrentRole(newRole);
  
    setSelectedUsers((prevSelectedUsers) => {
      const existingUser = prevSelectedUsers.find((user) => user.id === userId);
  
      if (existingUser) {
        return prevSelectedUsers.map((user) =>
          user.id === userId ? { ...user, role: newRole } : user
        );
      } else {
        return [...prevSelectedUsers, { id: userId, role: newRole }];
      }
    });
  };
  

  return (
    <div style={{ marginBottom: "10px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", alignItems: "center" }}>
      <UserItem userId={userId} username={userName} />
      
      <div>
        <Select
          value={[{ id: currentRole, label: currentRole === 'ADMIN' ? 'Администратор' : 'Наблюдатель' }]} 
          onChange={handleRoleChange}
          options={[
            { id: 'ADMIN', label: 'Администратор' },
            { id: 'OBSERVER', label: 'Наблюдатель' }
          ]}
          placeholder="Выберите роль"
          labelKey="label"
          valueKey="id"
          getValue={(option) => option ? option.label : ""}
          clearable={false} 
          style={{ width: "100%" }}
        />
      </div>
    </div>
  );
};

export default RoleItem;
