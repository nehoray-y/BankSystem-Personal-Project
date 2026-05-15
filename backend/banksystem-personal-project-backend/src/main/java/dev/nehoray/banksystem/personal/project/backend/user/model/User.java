package dev.nehoray.banksystem.personal.project.backend.user.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long index;

    @NotNull(message = "ID is required")
    @Column(unique = true)
    private String idNumber;

    private String fullName;
    private String email;

    @NotNull(message = "Phone is required")
    @Column(unique = true)
    private String phone;

    private String address;
    private String city;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;
}
