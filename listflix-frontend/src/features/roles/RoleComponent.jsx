import React from "react";
import RoleItem from "./RoleItem";

const RoleComponent = ({ users, selectedUsers, setSelectedUsers }) => {
  return (
    <div>
      <h3>Роли:</h3>
      {users.map((user) => (
        <RoleItem
          key={user.id}
          userId={user.id}
          role={user.role}
          setSelectedUsers={setSelectedUsers}
          selectedUsers={selectedUsers}
        />
      ))}
    </div>
  );
};

export default RoleComponent;
