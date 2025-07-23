package com.test.listflix.Controllers;


import com.test.listflix.DTO.ListDTO;
import com.test.listflix.DTO.ListInfoDTO;
import com.test.listflix.DTO.TagDTO;
import com.test.listflix.DTO.UserListDTO;
import com.test.listflix.Entities.ListEntity;
import com.test.listflix.Services.ListService;
import com.test.listflix.Utils.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/lists")
public class ListsController {

    @Autowired
    private ListService listService;

    @GetMapping("/popular")
    public ResponseEntity<List<ListInfoDTO>> getPopularLists() {
        List<ListInfoDTO> popularLists = listService.getPopularLists();

        // Возвращаем 200 OK с результатами
        return ResponseEntity.ok(popularLists);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ListDTO> getListData(
            @PathVariable Long id,
            @RequestParam(value = "tags", required = false) List<String> tags,
            Authentication authentication) {

        Long currentUserId = authentication != null ? ((UserPrincipal) authentication.getPrincipal()).getId() : 0;
        ListDTO listDTO;

        if (tags == null || tags.isEmpty()) {
            listDTO = listService.getListDataByListIdAndUserId(id, currentUserId);
        } else {
            listDTO = listService.getFilteredListDataByListIdAndUserId(id, tags, currentUserId);
        }

        return ResponseEntity.ok(listDTO);
    }

    @GetMapping("/search")
    public ResponseEntity<List<ListInfoDTO>> searchListsByPattern(@RequestParam("pattern") String pattern, Authentication authentication) {
        Long currentUserId = authentication != null ? ((UserPrincipal) authentication.getPrincipal()).getId() : 0;
        List<ListInfoDTO> matchingLists = listService.searchListsByPattern(pattern, currentUserId);
        return ResponseEntity.ok(matchingLists);
    }

    @GetMapping("/{id}/edit")
    public ResponseEntity<UserListDTO> getListDataToUpdate(@PathVariable Long id, Authentication authentication) {
        Long currentUserId = authentication != null ? ((UserPrincipal) authentication.getPrincipal()).getId() : 0;
        UserListDTO userListDTO = listService.getListDataToUpdateByListIdAndUserId(
                id, currentUserId
        );
        return ResponseEntity.ok(userListDTO);
    }

    @GetMapping("/{id}/tags")
    public ResponseEntity<List<TagDTO>> getListTags(@PathVariable Long id, Authentication authentication) {
        Long userId = authentication != null ? ((UserPrincipal) authentication.getPrincipal()).getId() : 0;
        List<TagDTO> tags = listService.getListTagsByListIdAndUserId(id, userId);
        return ResponseEntity.ok(tags);
    }

    @PostMapping("/{id}/tags")
    public ResponseEntity<TagDTO> addTagToList(@PathVariable Long id, @RequestBody String tagData, Authentication authentication) {
        Long userId = authentication != null ? ((UserPrincipal) authentication.getPrincipal()).getId() : 0;
        TagDTO newTag = listService.addTagToListByListIdAndUserId(id, tagData, userId);
        return ResponseEntity.ok(newTag);
    }


    @GetMapping
    public ResponseEntity<List<ListInfoDTO>> getListsByUser(@RequestParam("user") Long userId, Authentication authentication) {
        Long currentUserId = authentication != null ? ((UserPrincipal) authentication.getPrincipal()).getId() : 0;
        List<ListInfoDTO> lists = listService.getListsByUser(userId, currentUserId);
        return ResponseEntity.ok(lists);
    }

    @GetMapping("/admin")
    public ResponseEntity<List<ListInfoDTO>> getAdminLists(Authentication authentication) {
        Long currentUserId = authentication != null ? ((UserPrincipal) authentication.getPrincipal()).getId() : 0;
        List<ListInfoDTO> lists = listService.getAdminListsByUser(currentUserId);
        return ResponseEntity.ok(lists);
    }

    @GetMapping("/subscriptions")
    public ResponseEntity<List<ListInfoDTO>> getSubscriptions(Authentication authentication) {
        Long currentUserId = authentication != null ? ((UserPrincipal) authentication.getPrincipal()).getId() : 0;
        List<ListInfoDTO> lists = listService.getSubscriptionsByUser(currentUserId);
        return ResponseEntity.ok(lists);
    }

    @PostMapping
    public ResponseEntity<Long> addList(@RequestBody ListEntity list, Authentication authentication) {
        Long currentUserId = authentication != null ? ((UserPrincipal) authentication.getPrincipal()).getUserEntity().getId() : 0;
        return new ResponseEntity<Long>(listService.addList(list, currentUserId), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> updateList(@PathVariable Long id, @RequestBody UserListDTO list, Authentication authentication) {
        Long currentUserId = authentication != null ? ((UserPrincipal) authentication.getPrincipal()).getId() : 0;
        listService.updateList(id, list, currentUserId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @PutMapping("/{id}/subscribe")
    public ResponseEntity<Void> subscribeUserToList(@PathVariable Long id, Authentication authentication) {
        Long currentUserId = authentication != null ? ((UserPrincipal) authentication.getPrincipal()).getId() : 0;
        listService.subscribe(id, currentUserId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteList(@PathVariable Long id, Authentication authentication) {
        Long currentUserId = authentication != null ? ((UserPrincipal) authentication.getPrincipal()).getId() : 0;
        listService.deleteList(id, currentUserId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
