package dev.nehoray.banksystem.personal.project.backend.account.model;

import dev.nehoray.banksystem.personal.project.backend.user.model.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "accounts")
public class Account {

    @Id
    private String accountNumber;

    private double balance;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;
}
//192.168.1.184