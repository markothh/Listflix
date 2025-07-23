package com.test.listflix.Entities;

import com.test.listflix.Enums.Role;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "users_lists")
@Data
public class UserListRoleEntity {

    @EmbeddedId
    private UserListRoleId userListRoleId;

    @ManyToOne
    @MapsId("id_user")
    @JoinColumn(name = "id_user", nullable = false)
    private UserEntity user;

    @ManyToOne
    @MapsId("id_list")
    @JoinColumn(name = "id_list", nullable = false)
    private ListEntity list;

    @Enumerated(EnumType.STRING)
    @Column(name = "role")
    private Role role;

    public UserListRoleEntity() {
    };

    public UserListRoleEntity(UserEntity user, ListEntity list, Role role) {
        this.user = user;
        this.list = list;
        this.role = role;

        this.userListRoleId = new UserListRoleId(user.getId(), list.getId());
    }
}
