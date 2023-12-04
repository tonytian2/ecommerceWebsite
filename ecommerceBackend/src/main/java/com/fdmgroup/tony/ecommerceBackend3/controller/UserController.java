package com.fdmgroup.tony.ecommerceBackend3.controller;

import com.fdmgroup.tony.ecommerceBackend3.service.UserService;
import com.fdmgroup.tony.ecommerceBackend3.model.User;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
@RestController
@RequestMapping(path = "api/v1/users")
public class UserController {


    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> getUsers() {
        return new ResponseEntity<>(userService.getUsers(), HttpStatus.OK);
    }

    @GetMapping("/{userId}")
    public ResponseEntity<Optional<User>> getUser(@PathVariable Long userId) {
        return new ResponseEntity<>(userService.getUserById(userId), HttpStatus.OK);
    }

    @DeleteMapping("/{userId}")
    public void deleteUser(@PathVariable("userId") Long userId){
        userService.deleteUser(userId);
    }

    @PutMapping("/{username}")
    public ResponseEntity updateUserPassword(@PathVariable("username") String username,
                                   @RequestParam String password){
        try{
            return ResponseEntity.status(HttpStatus.OK).body(userService.updatePassword(username, password));
        }catch(IllegalStateException e){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

        }

    @PostMapping("/login/")
    public ResponseEntity<String> loginUser(@RequestParam String username,
                                   @RequestParam String password){

        if(userService. getUserByUsername(username).isEmpty()){
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Username not found.");
        }
        if(userService.verifyUserCredentials(username, password)){
            return ResponseEntity.status(HttpStatus.OK).body("Logged in successfully");
        }
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Wrong password");

    }


}
