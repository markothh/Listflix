package com.test.listflix.Controllers;

import com.test.listflix.Utils.AuthenticationRequest;
import com.test.listflix.Utils.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;


@RestController
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserDetailsService userDetailsService;

    @PostMapping("/authenticate")
    public String createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) {
        System.out.println("Получен запрос на аутентификацию: " + authenticationRequest);
        System.out.println("Attempting to authenticate with username: " + authenticationRequest.getUsername());
        System.out.println("Raw password: " + authenticationRequest.getPassword());
        String encryptedPassword = passwordEncoder.encode(authenticationRequest.getPassword());
        System.out.println("Encrypted password: " + encryptedPassword);
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
            );
        } catch (BadCredentialsException e) {
            System.out.println("Неверные учетные данные: " + e.getMessage());
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Неверные учетные данные");
        }

        UserDetails userDetails = userDetailsService.loadUserByUsername(authenticationRequest.getUsername());
        System.out.println("Пользователь " + authenticationRequest.getUsername() + " успешно аутентифицирован.");
        return jwtUtil.generateToken(userDetails.getUsername());
    }
}
