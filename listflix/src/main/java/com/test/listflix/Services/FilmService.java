package com.test.listflix.Services;

import com.test.listflix.DTO.FilmDTO;
import com.test.listflix.DTO.ListInfoDTO;
import com.test.listflix.Entities.FilmEntity;
import com.test.listflix.Entities.ListEntity;
import com.test.listflix.Entities.TagEntity;
import com.test.listflix.Entities.UserListRoleEntity;
import com.test.listflix.Enums.Status;
import com.test.listflix.Repositories.FilmRepository;
import com.test.listflix.Repositories.ListRepository;
import com.test.listflix.Repositories.TagRepository;
import com.test.listflix.Repositories.UserListRoleRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class FilmService {

    @Autowired
    private FilmRepository filmRepository;

    @Autowired
    private UserListRoleRepository userListRoleRepository;

    @Autowired
    private ListRepository listRepository;

    @Autowired
    private TagRepository tagRepository;

    private void checkListAccess(Long listId, Long userId) {
        userListRoleRepository.findByUser_IdAndList_Id(userId, listId).orElseThrow(
                () -> new RuntimeException("Вы не имеете доступа к списку, в котором находится фильм")
        );
    }

    public FilmDTO getFilmDataByFilmIdAndUserId(Long filmId, Long userId) {
        FilmEntity filmEntity = filmRepository.findById(filmId)
                .orElseThrow(() -> new RuntimeException("Фильм не найден"));

        checkListAccess(filmEntity.getList().getId(), userId);

        return new FilmDTO(filmEntity);
    }

    @Transactional
    public FilmDTO addFilm(FilmDTO filmData, Long listId, Long userId) {
        checkListAccess(listId, userId);

        FilmEntity filmEntity = new FilmEntity();
        filmEntity.setName(filmData.getName());
        filmEntity.setDescription(filmData.getDescription());

        ListEntity currentList = listRepository.findById(listId).orElseThrow(
                () -> new RuntimeException("Список не найден")
        );
        filmEntity.setList(currentList);
        filmEntity.setStatus(Status.NOT_WATCHED);

        List<TagEntity> tags = filmData.getTags().stream()
                .map(tag -> tagRepository.findByNameAndList_Id(tag, listId)
                        .orElseGet(() -> tagRepository.save(new TagEntity(tag, currentList))))
                .toList();
        filmEntity.setTags(tags);

        return new FilmDTO(filmRepository.save(filmEntity));
    }

    public void deleteFilmById(Long filmId, Long listId, Long userId) {
        checkListAccess(listId, userId);

        filmRepository.deleteById(filmId);
    }

    @Transactional
    public FilmDTO updateFilm(FilmDTO filmData, Long filmId, Long listId, Long userId) {
        checkListAccess(listId, userId);

        FilmEntity filmEntity = filmRepository.findById(filmId)
                .orElseThrow(() -> new RuntimeException("Фильм не найден"));

        if (filmData.getStatus() != null)
            filmEntity.setStatus(filmData.getStatus());

        if (filmData.getName() != null)
            filmEntity.setName(filmData.getName());

        if (filmData.getDescription() != null)
            filmEntity.setDescription(filmData.getDescription());

        if (filmData.getTags() != null) {
            List<TagEntity> tags = filmData.getTags().stream()
                    .map(tag -> tagRepository.findByNameAndList_Id(tag, listId)
                            .orElseGet(() -> tagRepository.save(new TagEntity(tag, listRepository.findById(listId)
                                    .orElseThrow(() -> new RuntimeException("Список не найден"))))))
                    .collect(Collectors.toCollection(ArrayList::new));
            filmEntity.setTags(tags);
        }

        return new FilmDTO(filmRepository.save(filmEntity));
    }

    public List<FilmDTO> searchFilmsByPattern(String pattern, Long userId, Long listId) {
        List<FilmEntity> matchingLists = filmRepository.findByNameContainingIgnoreCase(pattern);

        return matchingLists.stream()
                .filter(film -> {
                    boolean isPublic = film.getList().isPublic();
                    Optional<UserListRoleEntity> userListRole = userListRoleRepository.findByUser_IdAndList_Id(userId, film.getList().getId());
                    return isPublic || userListRole.isPresent();
                })
                .map(FilmDTO::new)
                .collect(Collectors.toList());
    }
}
