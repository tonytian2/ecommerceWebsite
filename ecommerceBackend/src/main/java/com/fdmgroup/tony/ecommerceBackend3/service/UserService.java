package com.fdmgroup.tony.ecommerceBackend3.service;

import com.fdmgroup.tony.ecommerceBackend3.model.User;
import com.fdmgroup.tony.ecommerceBackend3.repository.UserRepository;
import com.fdmgroup.tony.ecommerceBackend3.validator.PasswordValidator;
import com.fdmgroup.tony.ecommerceBackend3.validator.UsernameValidator;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService implements UserDetailsService {

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final UsernameValidator usernameValidator;
    private final PasswordValidator passwordValidator;


    @Autowired
    public UserService(UserRepository userRepository, UsernameValidator usernameValidator, PasswordValidator passwordValidator) {
        this.userRepository = userRepository;
        this.usernameValidator = usernameValidator;
        this.passwordValidator = passwordValidator;
    }

    public void deleteUser(Long userId) {
        if(!userRepository.existsById(userId)) {
            throw new IllegalStateException("user with id " + userId + " does not exist.");
        }
        userRepository.deleteById(userId);

    }

    public List<User> getUsers() {
        return userRepository.findAll();
    }

    public Optional<User> createUser(String username, String password) {
        if(userRepository.findByUsername(username).isPresent()) {
            throw new IllegalStateException("Username taken");
        }
        if(!usernameValidator.test(username)){
            throw new IllegalStateException("Invalid username");
        }
        if(!passwordValidator.test(password)){
            throw new IllegalStateException("Invalid password");
        }

        return Optional.of(userRepository.save(new User(username,  passwordEncoder.encode(password))));

    }

    @Transactional
    public Optional<User> updatePassword(String username, String password) {
        User user = userRepository.findByUsername(username).orElseThrow(() ->
                new IllegalStateException("User with username " + username + " does not exist."));
        if(!passwordValidator.test(password)){
            throw new IllegalStateException("Invalid password");
        }
        if(!password.isEmpty() && !verifyUserCredentials(username, password)) {
            userRepository.updatePassword(username, passwordEncoder.encode(password));
            return userRepository.findByUsername(username);
        }
        else{
            throw new IllegalStateException("New password is same as old password.");
        }

    }

    public Optional<User> getUserById(Long userId) {
        return userRepository.findById(userId);
    }
    public Optional<User> getUserByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean verifyUserCredentials(String username, String password) {

        Optional<User> userOptional = userRepository.findByUsername(username);
        return userOptional.map(user -> passwordEncoder.matches(password, user.getPassword())).orElse(false);
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("User with username " + username + " does not exist."));
    }
}
