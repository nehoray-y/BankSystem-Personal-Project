package dev.nehoray.banksystem.personal.project.backend.transactions.controller;

import dev.nehoray.banksystem.personal.project.backend.dto.request.transaction.DepositRequest;
import dev.nehoray.banksystem.personal.project.backend.dto.request.transaction.TransferRequest;
import dev.nehoray.banksystem.personal.project.backend.dto.request.transaction.WithdrawRequest;
import dev.nehoray.banksystem.personal.project.backend.transactions.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/transaction")
@RequiredArgsConstructor
public class TransactionController {

    private final TransactionService transactionService;

    @PostMapping("/deposit")
    public ResponseEntity<?> deposit(@RequestBody DepositRequest depositRequest) {
        transactionService.deposit(depositRequest.getAccountNumber(), depositRequest.getAmount());
        return ResponseEntity.ok("Deposit successful");
    }

    @PostMapping("/withdarw")
    public ResponseEntity<?> withdraw(@RequestBody WithdrawRequest withdrawRequest) {
        transactionService.withdraw(withdrawRequest.getAccountNumber(), withdrawRequest.getAmount());
        return ResponseEntity.ok("Withdraw successful");
    }

    @PostMapping("/transfer")
    public ResponseEntity<?> transfer(@RequestBody TransferRequest transferRequest) {
        transactionService.transfer(transferRequest.getFromAccountNumber(),transferRequest.getToAccountNumber(), transferRequest.getAmount());
        return ResponseEntity.ok("Transfer successful");
    }

}
