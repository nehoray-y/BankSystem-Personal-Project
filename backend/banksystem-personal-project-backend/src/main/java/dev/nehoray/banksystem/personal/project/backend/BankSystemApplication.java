package dev.nehoray.banksystem.personal.project.backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class BankSystemApplication {

    public static void main(String[] args) {
        System.out.println(System.getProperty("java.home")); 
        System.setProperty("server.address", "0.0.0.0");
        SpringApplication.run(BankSystemApplication.class, args);

    }

}
