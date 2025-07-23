package com.test.listflix.DTO;

import com.test.listflix.Entities.TagEntity;
import lombok.Data;

@Data
public class TagDTO {
    Long id;
    String name;

    public TagDTO(TagEntity tag) {
        id = tag.getId();
        name = tag.getName();
    }
}
