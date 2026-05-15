package dev.nehoray.banksystem.personal.project.backend.auth.controller;

import dev.nehoray.banksystem.personal.project.backend.dto.request.auth.LoginRequest;
import dev.nehoray.banksystem.personal.project.backend.user.model.User;
import dev.nehoray.banksystem.personal.project.backend.user.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.Objects;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/auth")
public class AuthController {


    private final UserRepository userRepository;

    @Autowired
    public AuthController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @PostConstruct
    public void init() {
        System.out.println("✅ AuthController loaded!");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest loginRequest) {
        User user = userRepository.findUserByIdNumber(loginRequest.getIdNumber())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND));
        if (user != null && Objects.equals(user.getPassword(), loginRequest.getPassword()) && Objects.equals(user.getIdNumber(), loginRequest.getIdNumber())) {
            return ResponseEntity.ok("Welcome, " + user.getFullName() + "!");
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
    }
}
