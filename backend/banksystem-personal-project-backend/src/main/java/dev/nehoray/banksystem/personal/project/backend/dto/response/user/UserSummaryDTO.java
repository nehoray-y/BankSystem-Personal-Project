package dev.nehoray.banksystem.personal.project.backend.dto.response.user;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserSummaryDTO {

    private String idNumber;
    private String fullName;
    private String email;
    private String phoneNumber;
    private String address;
    private String city;
}
