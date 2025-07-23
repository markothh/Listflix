package com.test.listflix.Repositories;

import com.test.listflix.Entities.UserListRoleEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserListRoleRepository extends JpaRepository<UserListRoleEntity, Long> {
    Optional<UserListRoleEntity> findByUser_IdAndList_Id(Long user_id, Long list_id);

    Optional<List<UserListRoleEntity>> findByList_Id(Long list_id);

    @Query(value = "SELECT * FROM get_user_lists(:searchUserId, :currentUserId)", nativeQuery = true)
    List<Object[]> findUserLists(@Param("searchUserId") Long searchUserId, @Param("currentUserId") Long currentUserId);

    @Query(value = "SELECT * FROM get_user_admin_lists(:currentUserId)", nativeQuery = true)
    List<Object[]> findUserAdminLists(@Param("currentUserId") Long currentUserId);

    @Query(value = "SELECT * FROM get_user_subscriptions(:currentUserId)", nativeQuery = true)
    List<Object[]> findUserSubscriptions(@Param("currentUserId") Long currentUserId);

    @Query(value = "SELECT * FROM get_popular_lists()", nativeQuery = true)
    List<Object[]> findPopularLists();
}
