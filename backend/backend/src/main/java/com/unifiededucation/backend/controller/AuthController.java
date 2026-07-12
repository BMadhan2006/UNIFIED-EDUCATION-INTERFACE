package com.unifiededucation.backend.controller;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.unifiededucation.backend.dto.LoginRequest;
import com.unifiededucation.backend.dto.LoginResponse;
import com.unifiededucation.backend.model.User;
import com.unifiededucation.backend.repository.UserRepository;
import com.unifiededucation.backend.security.JwtService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @PostMapping("/register")
    public User register(@RequestBody User user) {

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedAt(LocalDateTime.now());

        return userRepository.save(user);
    }

@PostMapping("/login")
public LoginResponse login(@RequestBody LoginRequest request) {

    System.out.println("Username: " + request.getUsername());

    User user = userRepository.findByUsername(request.getUsername())
            .orElseThrow(() -> new RuntimeException("Invalid username"));

    System.out.println("User Found: " + user.getUsername());

    boolean match = passwordEncoder.matches(request.getPassword(), user.getPassword());

    System.out.println("Password Match: " + match);

    if (!match) {
        throw new RuntimeException("Invalid password");
    }

    String token = jwtService.generateToken(user.getUsername());

    System.out.println("Generated Token: " + token);

    // TEMPORARY TEST (No JWT generation)
   return new LoginResponse(
        "Login Success",
        token,
        user.getRole()
);
}
}