package com.test.listflix.Controllers;

import com.test.listflix.DTO.ListInfoDTO;
import com.test.listflix.DTO.UserDTO;
import com.test.listflix.Entities.UserEntity;
import com.test.listflix.Services.UserService;
import com.test.listflix.Utils.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController

@RequestMapping("/users")
public class UserController {
    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id) {
        UserEntity user = userService.findUserById(id).orElseThrow(
                () -> new RuntimeException("Пользователь не найден")
        );

        return new ResponseEntity<UserDTO>(new UserDTO(user.getId(), user.getUsername()), HttpStatus.OK);
    }

    @GetMapping("/currentId")
    public Long getCurrentId(Authentication authentication) {
        return authentication != null ? ((UserPrincipal) authentication.getPrincipal()).getId() : 0;
    }

    @GetMapping("/search")
    public ResponseEntity<List<UserDTO>> searchUsersByPattern(@RequestParam("pattern") String pattern) {
        List<UserDTO> matchingLists = userService.searchUsersByPattern(pattern);
        return ResponseEntity.ok(matchingLists);
    }

    @PostMapping("")
    public ResponseEntity<UserEntity> addUser(@RequestBody UserEntity user) {
        return new ResponseEntity<UserEntity>(userService.addUser(user), HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserEntity> updateUser(@PathVariable Long id, @RequestBody UserEntity user, Authentication authentication) {
        return new ResponseEntity<UserEntity>(userService.updateUser(user, ((UserPrincipal)authentication.getPrincipal()).getUserEntity(), id), HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id, Authentication authentication) {
        userService.deleteUser(id, ((UserPrincipal)authentication.getPrincipal()).getId());
        return ResponseEntity.ok().build();
    }
}
