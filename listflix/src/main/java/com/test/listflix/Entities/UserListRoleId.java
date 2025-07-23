package com.test.listflix.Entities;

import jakarta.persistence.Embeddable;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.io.Serializable;

@Embeddable
@Data
@EqualsAndHashCode
public class UserListRoleId implements Serializable {
    private Long id_user;
    private Long id_list;

    public UserListRoleId() {
    }

    public UserListRoleId(Long userId, Long listId) {
        id_list = listId;
        id_user = userId;
    }
}
