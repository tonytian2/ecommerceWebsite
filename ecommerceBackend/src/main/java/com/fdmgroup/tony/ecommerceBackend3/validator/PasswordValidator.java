package com.fdmgroup.tony.ecommerceBackend3.validator;

import org.springframework.stereotype.Component;

import java.util.function.Predicate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class PasswordValidator implements Predicate<String> {
    @Override
    public boolean test(String s){
        //Password must contain at least one digit and one letter, no space, no special character, and it must be 6-16 characters long.
        String regex = "^(?=.*[0-9])(?=.*[a-zA-Z]).{5,16}$";
        Pattern p = Pattern.compile(regex);
            if (s == null) {
            return false;
        }
        Matcher m = p.matcher(s);
        return m.matches();
        }
}