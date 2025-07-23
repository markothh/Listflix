package com.test.listflix.Repositories;

import com.test.listflix.DTO.ListDTO;
import com.test.listflix.DTO.TagDTO;
import com.test.listflix.Entities.ListEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ListRepository extends JpaRepository<ListEntity, Long> {

    List<ListEntity> findByNameContainingIgnoreCase(String pattern);
}
