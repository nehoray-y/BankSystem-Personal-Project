package dev.nehoray.banksystem.personal.project.backend.dto.request.transaction;

import lombok.Data;

@Data
public class DepositRequest {
    private String accountNumber;
    private double amount;
}
