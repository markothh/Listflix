package com.test.listflix.Services;

import com.test.listflix.DTO.ListDTO;
import com.test.listflix.DTO.ListInfoDTO;
import com.test.listflix.DTO.TagDTO;
import com.test.listflix.DTO.UserListDTO;
import com.test.listflix.Entities.*;
import com.test.listflix.Enums.Role;
import com.test.listflix.Repositories.ListRepository;
import com.test.listflix.Repositories.TagRepository;
import com.test.listflix.Repositories.UserListRoleRepository;
import com.test.listflix.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ListService {

    @Autowired
    private ListRepository listRepository;

    @Autowired
    private UserListRoleRepository userListRoleRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private TagRepository tagRepository;

    public ListDTO getListDataByListIdAndUserId(Long listId, Long userId) {
        Optional<ListEntity> optionalList = listRepository.findById(listId);

        if (optionalList.isEmpty()) {
            throw new RuntimeException("Список не найден");
        }
        ListEntity list = optionalList.get();
        UserListRoleEntity userListRole = userListRoleRepository.findByUser_IdAndList_Id(userId, listId).orElse(null);

        if (!(list.isPublic()) && userListRole == null)
            throw new RuntimeException("Вы не имеете доступа к этому списку.");

        return new ListDTO(
                list.getName(),
                list.getFilms(),
                false,
                userListRole != null ? userListRole.getRole() : null,
                list.getTags());

    }

    public ListDTO getFilteredListDataByListIdAndUserId(Long listId, List<String> tags, Long userId) {
        Optional<ListEntity> optionalList = listRepository.findById(listId);

        if (optionalList.isEmpty()) {
            throw new RuntimeException("Список не найден");
        }
        ListEntity list = optionalList.get();
        UserListRoleEntity userListRole = userListRoleRepository.findByUser_IdAndList_Id(userId, listId).orElse(null);

        if (!(list.isPublic()) && userListRole == null)
            throw new RuntimeException("Вы не имеете доступа к этому списку.");

        List<FilmEntity> filteredFilms = list.getFilms().stream()
                .filter(film -> film.getTags().stream()
                        .map(TagEntity::getName)
                        .anyMatch(tags::contains))
                .toList();

        return new ListDTO(
                list.getName(),
                filteredFilms,
                list.isPublic(),
                userListRole != null ? userListRole.getRole() : null,
                list.getTags()
        );
    }

    public List<ListInfoDTO> getListsByUser(Long userId, Long currentUserId) {
        List<Object[]> results = userListRoleRepository.findUserLists(userId, currentUserId);
        return results.stream()
                .map(row -> new ListInfoDTO(
                        (Long) row[0], // id
                        (String) row[1], //name
                        (boolean) row[2] //publicity
                ))
                .toList();
    }

    //эта функция для просмотра своих списков для редактирования
    public List<ListInfoDTO> getAdminListsByUser(Long currentUserId) {
        List<Object[]> results = userListRoleRepository.findUserAdminLists(currentUserId);
        return results.stream()
                .map(row -> new ListInfoDTO(
                        (Long) row[0], // id
                        (String) row[1], //name
                        (boolean) row[2] //publicity
                ))
                .toList();
    }

    public List<ListInfoDTO> getSubscriptionsByUser(Long currentUserId) {
        List<Object[]> results = userListRoleRepository.findUserSubscriptions(currentUserId);
        return results.stream()
                .map(row -> new ListInfoDTO(
                        (Long) row[0], // id
                        (String) row[1], //name
                        (boolean) row[2] //publicity
                ))
                .toList();
    }

    public List<ListInfoDTO> getPopularLists() {
        List<Object[]> results = userListRoleRepository.findPopularLists();
        return results.stream()
                .map(row -> new ListInfoDTO(
                        (Long) row[0], // id
                        (String) row[1], //name
                        true // isPublic
                ))
                .toList();
    }

    public List<TagDTO> getListTagsByListIdAndUserId(Long listId, Long userId) {
        Optional<ListEntity> optionalList = listRepository.findById(listId);

        if (optionalList.isEmpty()) {
            throw new RuntimeException("Список не найден");
        }
        ListEntity list = optionalList.get();

        if (!(list.isPublic())) {
            Optional<UserListRoleEntity> userListRole = userListRoleRepository.findByUser_IdAndList_Id(userId, listId);
            if (userListRole.isEmpty()) {
                throw new RuntimeException("Вы не имеете доступа к этому списку.");
            }
        }

        return list.getTags().stream()
                .map(TagDTO::new)
                .toList();
    }

    public TagDTO addTagToListByListIdAndUserId(Long listId, String tagName, Long userId) {
        ListEntity list = listRepository.findById(listId).orElseThrow(
                () -> new RuntimeException("Список не найден")
        );

        if (!(list.isPublic())) {
            Optional<UserListRoleEntity> userListRole = userListRoleRepository.findByUser_IdAndList_Id(userId, listId);
            if (userListRole.isEmpty()) {
                throw new RuntimeException("Вы не имеете доступа к этому списку.");
            }
        }

        System.out.println(tagName);
        return new TagDTO(tagRepository.save(new TagEntity(tagName.replace("\"", ""), list)));

    }

    public Long addList(ListEntity list, Long userId) {
        UserEntity user = userRepository.findById(userId).orElseThrow(
                () -> new RuntimeException("Неаутентифицированный пользователь не может создать список"));

        if (userListRoleRepository.findByUser_IdAndList_Id(user.getId(), list.getId()).isPresent()) {
            throw new RuntimeException("Список с таким названием уже существует");
        }

        UserListRoleEntity ulr = new UserListRoleEntity(user, list, Role.ADMIN);
        ulr.setUserListRoleId(new UserListRoleId(user.getId(), list.getId()));

        list.setUsers(List.of(ulr));
        listRepository.save(list);
        userListRoleRepository.save(ulr);
        return list.getId();
    }

    public void deleteList(Long listId, Long userId) {
        if (canUserEdit(listId, userId)) {
            System.out.println("Список типа удаляется");
            listRepository.deleteById(listId);
        }
    }

    public void updateList(Long listId, UserListDTO newListData, Long userId) {
        if (canUserEdit(listId, userId)) {
            ListEntity listToUpdate = listRepository.findById(listId)
                    .orElseThrow(() -> new RuntimeException("Список не найден"));

            if (newListData.getUsers() != null) {
                newListData.getUsers().forEach(
                        (userRoleUpdateId, role) -> {
                            UserListRoleEntity ulr = userListRoleRepository.findByUser_IdAndList_Id(userRoleUpdateId, listId)
                                    .orElse(new UserListRoleEntity(
                                            userRepository.findById(userRoleUpdateId).orElseThrow(() -> new RuntimeException("Пользователь не найден")),
                                            listToUpdate,
                                            role
                                    ));
                            ulr.setRole(role);
                            userListRoleRepository.save(ulr);
                        }
                );
            }

            if (newListData.getName() != null) {
                listToUpdate.setName(newListData.getName());
            }

            listToUpdate.setPublic(newListData.isPublicity());
            listRepository.save(listToUpdate);
        }
    }

    public void subscribe(Long listId, Long userId) {
        UserListRoleEntity userListRole = userListRoleRepository.findByUser_IdAndList_Id(userId, listId).orElse(null);
        if (userListRole == null) {
            userListRole = new UserListRoleEntity(
                    userRepository.findById(userId).orElseThrow(() -> new RuntimeException("Пользователь не найден")),
                    listRepository.findById(listId).orElseThrow(() -> new RuntimeException("Список не найден")),
                    Role.OBSERVER
            );
        }
        else {
            userListRole.setRole(null);
        }

        userListRoleRepository.save(userListRole);
    }

    public boolean canUserEdit(Long listId, Long userId) {
        return userListRoleRepository.findByUser_IdAndList_Id(userId, listId)
                .map(userListRole -> userListRole.getRole() == Role.ADMIN)
                .orElseThrow(
                        () -> new RuntimeException("Вы не имеете доступа к управлению списком")
                );
    }

    public UserListDTO getListDataToUpdateByListIdAndUserId(Long listId, Long userId) {
        canUserEdit(listId, userId);

        ListEntity listToUpdate = listRepository.findById(listId)
                .orElseThrow(() -> new RuntimeException("Список не найден"));

        UserListDTO userListDTO = new UserListDTO();
        userListDTO.setName(listToUpdate.getName());
        userListDTO.setPublicity(listToUpdate.isPublic());

        List<UserListRoleEntity> userListRoles = userListRoleRepository.findByList_Id(listId)
                .orElseThrow(() -> new RuntimeException("Список с таким ID не найден"));

        Map<Long, Role> users = userListRoles.stream()
                .collect(Collectors.toMap(
                        ulr -> ulr.getUser().getId(),   // ID пользователя
                        ulr -> ulr.getRole()      // Роль пользователя
                ));
        userListDTO.setUsers(users);

        return userListDTO;
    }

    public List<ListInfoDTO> searchListsByPattern(String pattern, Long userId) {
        List<ListEntity> matchingLists = listRepository.findByNameContainingIgnoreCase(pattern);

        return matchingLists.stream()
                .filter(list -> {
                    boolean isPublic = list.isPublic();
                    Optional<UserListRoleEntity> userListRole = userListRoleRepository.findByUser_IdAndList_Id(userId, list.getId());
                    return isPublic || userListRole.isPresent();
                })
                .map(list -> new ListInfoDTO(list.getId(), list.getName(), list.isPublic()))
                .collect(Collectors.toList());
    }

}
