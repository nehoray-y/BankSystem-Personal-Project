package dev.nehoray.banksystem.personal.project.backend.dto.request.transaction;

import lombok.Data;

@Data
public class TransferRequest {
    private String fromAccountNumber;
    private String toAccountNumber;
    private double amount;

}
