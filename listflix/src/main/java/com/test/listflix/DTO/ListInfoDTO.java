package com.test.listflix.DTO;

import lombok.Data;

@Data
public class ListInfoDTO {
    private Long id;
    private String name;
    private boolean isPublic;

    public ListInfoDTO(Long id, String name, boolean isPublic) {
        this.id = id;
        this.name = name;
        this.isPublic = isPublic;
    }
}
