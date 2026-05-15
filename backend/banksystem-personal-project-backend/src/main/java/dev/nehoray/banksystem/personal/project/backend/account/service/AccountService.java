package dev.nehoray.banksystem.personal.project.backend.account.service;

import dev.nehoray.banksystem.personal.project.backend.account.model.Account;
import dev.nehoray.banksystem.personal.project.backend.account.repository.AccountRepository;
import dev.nehoray.banksystem.personal.project.backend.user.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.Random;

@Service
@RequiredArgsConstructor
public class AccountService {

    private final AccountRepository accountRepository;

    public void createAccount(User user) {
        double balance = 0.00;
        String accountNumber = generateUniqueAccountNumber();
        Account account = new Account(accountNumber, balance, user);
        accountRepository.save(account);
    }

    public Account getAccount(User user) {
        return accountRepository.findAccountByUser(user)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found"));
    }

    public Account getAccount(String accountNumber) {
        return accountRepository.findById(accountNumber)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Account not found"));
    }


    // *** generate Account Number ***
    public String generateRandomAccountNumber() {
        StringBuilder accountNumber = new StringBuilder();
        Random random = new Random();
        for (int i = 0; i < 7; i++) {
            accountNumber.append(random.nextInt(10));
        }
        return accountNumber.toString();
    }

    public String generateUniqueAccountNumber() {
        String accountNumber;
        do {
            accountNumber = generateRandomAccountNumber();
        } while (accountRepository.existsById(accountNumber));
        return accountNumber;
    }

}


    /*
    public void Deposit(String id, double amount) {
        Account account = accountRepository.getAccount(id);
        account.setBalance(account.getBalance() + amount);
    }

    public void Withdraw(String id, double amount) {
        Account account = accountRepository.getAccount(id);
        account.setBalance(account.getBalance() - amount);
    }

    public ResponseEntity<?> Transfer(String from, String to, double amount) {
        Account fromAccount = accountRepository.getAccount(from);
        Account toAccount = accountRepository.getAccount(to);

        if (fromAccount != null && toAccount != null) {
            fromAccount.setBalance(fromAccount.getBalance() - amount);
            toAccount.setBalance(toAccount.getBalance() + amount);
            return ResponseEntity.ok("Transfer completed successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }

     */
