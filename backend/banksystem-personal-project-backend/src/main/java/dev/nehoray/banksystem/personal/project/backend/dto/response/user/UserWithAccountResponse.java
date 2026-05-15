package dev.nehoray.banksystem.personal.project.backend.dto.response.user;

import dev.nehoray.banksystem.personal.project.backend.dto.response.account.AccountSummaryDTO;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserWithAccountResponse {

    UserSummaryDTO userSummaryDTO;
    AccountSummaryDTO accountSummaryDTO;
}
