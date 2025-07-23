package com.test.listflix.Repositories;

import com.test.listflix.Entities.FilmEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FilmRepository extends JpaRepository<FilmEntity, Long> {
    List<FilmEntity> findByListId(Long id_list);
    List<FilmEntity> findByNameContainingIgnoreCase(String pattern);
}
