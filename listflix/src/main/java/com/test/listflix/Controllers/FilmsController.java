package com.test.listflix.Controllers;

import com.test.listflix.DTO.FilmDTO;
import com.test.listflix.DTO.ListInfoDTO;
import com.test.listflix.Services.FilmService;
import com.test.listflix.Utils.UserPrincipal;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lists/{listId}/films")
public class FilmsController {

    @Autowired
    private FilmService filmService;

    @GetMapping("/{id}")
    public ResponseEntity<FilmDTO> getFilmDataById(@PathVariable Long id, Authentication authentication) {
        Long currentUserId = authentication != null ? ((UserPrincipal)authentication.getPrincipal()).getId() : 0;
        FilmDTO film = filmService.getFilmDataByFilmIdAndUserId(id, currentUserId);
        return ResponseEntity.ok(film);
    }

    @GetMapping("/search")
    public ResponseEntity<List<FilmDTO>> searchListsByPattern(@PathVariable Long listId, @RequestParam("pattern") String pattern, Authentication authentication) {
        Long currentUserId = authentication != null ? ((UserPrincipal) authentication.getPrincipal()).getId() : 0;
        List<FilmDTO> matchingLists = filmService.searchFilmsByPattern(pattern, currentUserId, listId);
        return ResponseEntity.ok(matchingLists);
    }

    @PostMapping
    public ResponseEntity<FilmDTO> addFilm(@RequestBody FilmDTO filmData, @PathVariable Long listId, Authentication authentication) {
        Long currentUserId = authentication != null ? ((UserPrincipal)authentication.getPrincipal()).getId() : 0;
        FilmDTO film = filmService.addFilm(filmData, listId, currentUserId);
        return ResponseEntity.ok(film);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FilmDTO> updateFilm(@RequestBody FilmDTO filmData, @PathVariable Long id, @PathVariable Long listId, Authentication authentication) {
        Long currentUserId = authentication != null ? ((UserPrincipal)authentication.getPrincipal()).getId() : 0;
        FilmDTO film = filmService.updateFilm(filmData, id, listId, currentUserId);
        return ResponseEntity.ok(film);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFilmById(@PathVariable Long id, @PathVariable Long listId, Authentication authentication) {
        Long currentUserId = authentication != null ? ((UserPrincipal)authentication.getPrincipal()).getId() : 0;
        filmService.deleteFilmById(id, listId, currentUserId);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
