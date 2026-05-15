package dev.nehoray.banksystem.personal.project.backend.account.repository;

import dev.nehoray.banksystem.personal.project.backend.account.model.Account;
import dev.nehoray.banksystem.personal.project.backend.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<Account, String> {
    Optional<Account> findAccountByUser(User user);


}
