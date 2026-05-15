package dev.nehoray.banksystem.personal.project.backend.dto.response.account;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AccountSummaryDTO {

    private String accountNumber;
    private double balance;
}
