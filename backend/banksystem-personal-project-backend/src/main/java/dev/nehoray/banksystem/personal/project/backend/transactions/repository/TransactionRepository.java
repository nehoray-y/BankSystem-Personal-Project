package dev.nehoray.banksystem.personal.project.backend.transactions.repository;

import dev.nehoray.banksystem.personal.project.backend.transactions.model.Transaction;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {
}
