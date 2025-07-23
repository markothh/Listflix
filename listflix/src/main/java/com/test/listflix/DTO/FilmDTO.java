package com.test.listflix.DTO;

import com.test.listflix.Entities.FilmEntity;
import com.test.listflix.Entities.TagEntity;
import com.test.listflix.Enums.Status;
import lombok.Data;

import java.util.List;


@Data
public class FilmDTO {
    private Long id;
    private String name;
    private String description;
    private Status status;
    private List<String> tags;

    public FilmDTO(FilmEntity film) {
        id = film.getId();
        name = film.getName();
        description = film.getDescription();
        status = film.getStatus();
        tags = film.getTags().stream()
                .map(TagEntity::getName)
                .toList();
    }

    public FilmDTO() {}

}
