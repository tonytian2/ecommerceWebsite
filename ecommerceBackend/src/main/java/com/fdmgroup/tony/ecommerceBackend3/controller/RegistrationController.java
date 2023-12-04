package com.fdmgroup.tony.ecommerceBackend3.controller;


import com.fdmgroup.tony.ecommerceBackend3.service.RegistrationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin
@RequestMapping(path = "api/v1/registration")
public class RegistrationController {
    @Autowired
    private RegistrationService registrationService;
    @PostMapping("/")
    public ResponseEntity register(@RequestParam String username,
                                                   @RequestParam String password)
    {
        try{
            return ResponseEntity.status(HttpStatus.CREATED).body(registrationService.register(username, password));
        }catch(IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }


    }
}
