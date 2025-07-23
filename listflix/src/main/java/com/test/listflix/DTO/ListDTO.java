package com.test.listflix.DTO;

import com.test.listflix.Entities.FilmEntity;
import com.test.listflix.Entities.TagEntity;
import com.test.listflix.Enums.Role;
import lombok.Data;

import java.util.List;

@Data
public class ListDTO {
    private String name;
    private List<FilmDTO> films;
    private boolean isPublic;
    private Role role;
    private List<TagDTO> tags;

    public ListDTO(String name, List<FilmEntity> films, boolean publicity, Role role, List<TagEntity> tags) {
        this.name = name;
        this.isPublic = publicity;
        this.films = films.stream()
                .map(FilmDTO::new)
                .toList();
        this.role = role;
        this.tags = tags.stream()
                .map(TagDTO::new)
                .toList();
    }
}
