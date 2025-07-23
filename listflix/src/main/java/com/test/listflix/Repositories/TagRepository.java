package com.test.listflix.Repositories;

import com.test.listflix.Entities.TagEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface TagRepository extends JpaRepository<TagEntity, Long> {
    Optional<TagEntity> findByNameAndList_Id(String name, Long listId);
}
