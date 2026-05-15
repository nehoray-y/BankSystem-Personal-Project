package dev.nehoray.banksystem.personal.project.backend.user.controller;

import dev.nehoray.banksystem.personal.project.backend.dto.response.user.UserWithAccountResponse;
import dev.nehoray.banksystem.personal.project.backend.user.model.User;
import dev.nehoray.banksystem.personal.project.backend.user.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User user) {
        User savedUser = userService.registerUser(user);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/by-phone/{phone}")
    public ResponseEntity<User> getUserByPhone(@PathVariable String phone) {
        User savedUser = userService.getUserByPhone(phone);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/by-id-number/{idNumber}")
    public ResponseEntity<User> getUserByIdNumber(@PathVariable String idNumber) {
        User savedUser = userService.getUserByIdNumber(idNumber);
        return ResponseEntity.ok(savedUser);
    }

    @GetMapping("/with-account-by-phone/{phone}")
    public ResponseEntity<UserWithAccountResponse> getUserWithAccountByPhone(@PathVariable String phone) {
        UserWithAccountResponse dtoUser = userService.getUserWithAccountByPhone(phone);
        return ResponseEntity.ok(dtoUser);
    }

    @GetMapping("/with-account-by-id/{idNumber}")
    public  ResponseEntity<UserWithAccountResponse> getUserWithAccountById(@PathVariable String idNumber) {
        UserWithAccountResponse dto = userService.getUserWithAccountByIdNumber(idNumber);
        return ResponseEntity.ok(dto);
    }

}
