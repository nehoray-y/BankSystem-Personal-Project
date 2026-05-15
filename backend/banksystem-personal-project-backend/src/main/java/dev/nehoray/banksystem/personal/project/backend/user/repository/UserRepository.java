package dev.nehoray.banksystem.personal.project.backend.user.repository;

import dev.nehoray.banksystem.personal.project.backend.user.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    public Optional<User> findUserByPhone(String phone);
    public Optional<User> findUserByIdNumber(String idNumber);
}
