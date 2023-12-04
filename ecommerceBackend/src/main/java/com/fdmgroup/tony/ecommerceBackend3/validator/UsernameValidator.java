package com.fdmgroup.tony.ecommerceBackend3.validator;

import org.springframework.stereotype.Component;

import java.util.function.Predicate;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Component
public class UsernameValidator implements Predicate<String> {
    @Override
    public boolean test(String s) {

        String regex = "^(?=[a-zA-Z])[a-zA-Z0-9]+$";
        Pattern p = Pattern.compile(regex);
        if (s == null) {
            return false;
        }
        Matcher m = p.matcher(s);
        return m.matches();
    }
}