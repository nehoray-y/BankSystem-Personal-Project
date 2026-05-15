package dev.nehoray.banksystem.personal.project.backend.user.service;

import dev.nehoray.banksystem.personal.project.backend.account.model.Account;
import dev.nehoray.banksystem.personal.project.backend.account.service.AccountService;
import dev.nehoray.banksystem.personal.project.backend.dto.response.account.AccountSummaryDTO;
import dev.nehoray.banksystem.personal.project.backend.dto.response.user.UserSummaryDTO;
import dev.nehoray.banksystem.personal.project.backend.dto.response.user.UserWithAccountResponse;
import dev.nehoray.banksystem.personal.project.backend.user.model.User;
import dev.nehoray.banksystem.personal.project.backend.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final AccountService accountService;


    public User registerUser(User user) {
        if (userRepository.findUserByPhone(user.getPhone()).isPresent()) {
            throw new RuntimeException("Phone number already in use");
        }
        if (userRepository.findUserByIdNumber(user.getIdNumber()).isPresent()) {
            throw new RuntimeException("ID number already in use");
        }
        User saveUser = userRepository.save(user);
        accountService.createAccount(saveUser);
        return saveUser;
    }

    public User getUserByPhone(String phone) {
        return userRepository.findUserByPhone(phone)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    public User getUserByIdNumber(String idNumber) {
        return userRepository.findUserByIdNumber(idNumber)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    // get user with account by phone
    public UserWithAccountResponse getUserWithAccountByPhone(String phone) {
        User user = userRepository.findUserByPhone(phone)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Account account = accountService.getAccount(user);

        UserSummaryDTO userSummaryDTO = new UserSummaryDTO(user.getIdNumber(), user.getFullName(), user.getEmail(), user.getPhone(), user.getAddress(), user.getCity());
        AccountSummaryDTO accountSummaryDTO = new AccountSummaryDTO(account.getAccountNumber(), account.getBalance());
        return  new UserWithAccountResponse(userSummaryDTO, accountSummaryDTO);

    }

    // get user with account by id
    public UserWithAccountResponse getUserWithAccountByIdNumber(String idNumber) {
        User user = userRepository.findUserByIdNumber(idNumber)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Account account = accountService.getAccount(user);
        UserSummaryDTO userSummaryDTO = new UserSummaryDTO(user.getIdNumber(), user.getFullName(), user.getEmail(), user.getPhone(), user.getAddress(), user.getCity());
        AccountSummaryDTO accountSummaryDTO = new AccountSummaryDTO(account.getAccountNumber(), account.getBalance());
        return  new UserWithAccountResponse(userSummaryDTO, accountSummaryDTO);

    }

}
