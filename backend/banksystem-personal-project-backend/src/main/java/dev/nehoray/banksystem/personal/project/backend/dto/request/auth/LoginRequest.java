package dev.nehoray.banksystem.personal.project.backend.dto.request.auth;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LoginRequest {
    private String idNumber;
    private String password;
}
