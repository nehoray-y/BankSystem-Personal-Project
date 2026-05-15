package dev.nehoray.banksystem.personal.project.backend.transactions.service;

import dev.nehoray.banksystem.personal.project.backend.account.model.Account;
import dev.nehoray.banksystem.personal.project.backend.account.repository.AccountRepository;
import dev.nehoray.banksystem.personal.project.backend.account.service.AccountService;
import dev.nehoray.banksystem.personal.project.backend.transactions.model.Transaction;
import dev.nehoray.banksystem.personal.project.backend.transactions.repository.TransactionRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@AllArgsConstructor
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final AccountService accountService;
    private final AccountRepository accountRepository;


    public void deposit(String accountNumber, double amount) {
        Account account = accountService.getAccount(accountNumber);

        account.setBalance(account.getBalance() + amount);
        accountRepository.save(account);

        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setType("Deposit");
        transaction.setDate(LocalDateTime.now());
        transaction.setSourceAccount(account);
        transaction.setTargetAccount(null);
        transactionRepository.save(transaction);
    }

    public void withdraw(String accountNumber, double amount) {
        Account account = accountService.getAccount(accountNumber);
        account.setBalance(account.getBalance() - amount);
        accountRepository.save(account);

        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setType("Withdraw");
        transaction.setDate(LocalDateTime.now());
        transaction.setSourceAccount(account);
        transaction.setTargetAccount(null);
        transactionRepository.save(transaction);
    }

    public void transfer(String fromAccountNumber, String toAccountNumber, double amount) {
        Account from  = accountService.getAccount(fromAccountNumber);
        Account to = accountService.getAccount(toAccountNumber);

        from.setBalance(from.getBalance() - amount);
        to.setBalance(to.getBalance() + amount);

        accountRepository.save(from);
        accountRepository.save(to);

        Transaction transaction = new Transaction();
        transaction.setAmount(amount);
        transaction.setType("Transfer");
        transaction.setDate(LocalDateTime.now());
        transaction.setSourceAccount(from);
        transaction.setTargetAccount(to);
        transactionRepository.save(transaction);
    }

}
