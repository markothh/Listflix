package com.test.listflix.Entities;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import org.hibernate.annotations.Cascade;

import java.util.List;


@Entity
@Table(name = "tags")
@Data
@EqualsAndHashCode
public class TagEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @ManyToMany(mappedBy = "tags")
    @Cascade(org.hibernate.annotations.CascadeType.ALL)
    private List<FilmEntity> films;

    @ManyToOne
    @JoinColumn(name = "id_list")
    private ListEntity list;

    public TagEntity(String name, ListEntity list) {
        this.name = name;
        this.list = list;
    }

    public TagEntity() {}

}
