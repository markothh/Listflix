package com.test.listflix.DTO;

import com.test.listflix.Enums.Role;
import lombok.Data;

import java.util.Map;

@Data
public class UserListDTO {
    private Map<Long, Role> users;
    private String name;
    private boolean publicity;

}
