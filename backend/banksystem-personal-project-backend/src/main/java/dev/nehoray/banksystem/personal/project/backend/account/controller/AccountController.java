package dev.nehoray.banksystem.personal.project.backend.account.controller;

import dev.nehoray.banksystem.personal.project.backend.account.model.Account;
import dev.nehoray.banksystem.personal.project.backend.account.service.AccountService;
import dev.nehoray.banksystem.personal.project.backend.user.model.User;
import dev.nehoray.banksystem.personal.project.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;



@RestController
@RequestMapping("/accounts")
@RequiredArgsConstructor
public class AccountController {

    private final AccountService accountService;
    private final UserRepository userRepository;

    /*
    @PostMapping
    public void createAccount(@RequestBody Account account) {
        accountService.createAccount(account.getUser());
    }*/

    @GetMapping("/{id}/number")
    public ResponseEntity<String> getAccountNumber(@PathVariable String id) {
        User user = userRepository.findUserByIdNumber(id)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Account account = accountService.getAccount(user);
        if (account == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(account.getAccountNumber());
    }

    @GetMapping("/{accountNumber}")
    public Account getAccount(@PathVariable String accountNumber) {
        return accountService.getAccount(accountNumber);
    }

}
