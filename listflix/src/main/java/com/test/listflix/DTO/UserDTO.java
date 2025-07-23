package com.test.listflix.DTO;

import lombok.Data;

@Data
public class UserDTO {
    private Long id;
    private String username;

    public UserDTO(Long id, String username) {
        this.id = id;
        this.username = username;
    }
}
