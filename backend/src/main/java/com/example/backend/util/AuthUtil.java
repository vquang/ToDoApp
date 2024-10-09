package com.example.backend.util;

import org.springframework.security.core.context.SecurityContextHolder;

public class AuthUtil {
    public static Long loggedId() {
        return (Long) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    }
}
