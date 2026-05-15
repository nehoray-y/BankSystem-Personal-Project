package dev.nehoray.banksystem.personal.project.backend.transactions.model;

import dev.nehoray.banksystem.personal.project.backend.account.model.Account;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
@Table(name = "transaction")
@AllArgsConstructor
@NoArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private double amount;
    private String type;

    private LocalDateTime date;

    @ManyToOne
    @JoinColumn(name = "source_account_number")
    private Account sourceAccount;

    @ManyToOne
    @JoinColumn(name = "target_account_number")
    private Account targetAccount;

}
