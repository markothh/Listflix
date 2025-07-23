package com.test.listflix.Services;

import com.test.listflix.DTO.UserDTO;
import com.test.listflix.Entities.UserEntity;
import com.test.listflix.Repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UserService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public Optional<UserEntity> findUserById(Long id) {
        return userRepository.findById(id);
    }

    public List<UserEntity> findAllUsers() {
        return userRepository.findAll();
    }

    public UserEntity addUser(UserEntity user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent())
            throw new RuntimeException("Пользователь с таким логином уже существует");

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        return userRepository.save(user);
    }

    public UserEntity updateUser(UserEntity newUserData, UserEntity user, Long userToUpdateId) {
        if (!canUserEdit(userToUpdateId, user.getId())) {
            throw new RuntimeException("Нет доступа к редактированию указанного пользователя");
        }

        if (newUserData.getUsername() != null) {
            throw new RuntimeException("Невозможно поменять имя пользователя");
        }
        if (newUserData.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(newUserData.getPassword()));
        }
        if (newUserData.getEmail() != null) {
            user.setEmail(newUserData.getEmail());
        }

        userRepository.save(user);
        return user;
    }

    public boolean canUserEdit(Long userId, Long currentUserId) {
        Optional<UserEntity> userToEdit = userRepository.findById(userId);
        return userToEdit.isPresent() && currentUserId.equals(userId);
    }


    public void deleteUser(Long userToDeleteId, Long currentUserId) {
        if (!canUserEdit(userToDeleteId, currentUserId)) {
            throw new RuntimeException("Нет доступа к редактированию указанного пользователя");
        }

        userRepository.deleteById(userToDeleteId);
    }

    public List<UserDTO> searchUsersByPattern(String pattern) {
        List<UserEntity> matchingLists = userRepository.findByUsernameContainingIgnoreCase(pattern);

        return matchingLists.stream()
                .map(user -> new UserDTO(user.getId(), user.getUsername()))
                .collect(Collectors.toList());
    }
}
