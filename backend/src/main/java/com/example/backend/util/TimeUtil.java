package com.example.backend.util;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

public class TimeUtil {
    private static final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd-MM-yyyy");
    public static LocalDate toLocalDate(String date) {
        return LocalDate.parse(date, formatter);
    }
}
