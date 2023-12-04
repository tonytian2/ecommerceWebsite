package com.fdmgroup.tony.ecommerceBackend3.service;

import com.fdmgroup.tony.ecommerceBackend3.model.User;
import com.fdmgroup.tony.ecommerceBackend3.validator.PasswordValidator;
import com.fdmgroup.tony.ecommerceBackend3.validator.UsernameValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RegistrationService {


    private final UserService userService;

    @Autowired
    public RegistrationService(UsernameValidator usernameValidator, PasswordValidator passwordValidator, UserService userService) {
        this.userService = userService;
    }

    public Optional<User> register(String username, String password) {

        return userService.createUser(username, password);
    }

}
