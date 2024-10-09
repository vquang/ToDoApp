package com.example.backend.util;

import com.google.gson.Gson;

public class JsonUtil {
    private static final Gson gson = new Gson();

    public static String objToJson(Object o) {
        return gson.toJson(o);
    }

    public static <T> T jsonToObj(String json, Class<T> tClass) {
        return gson.fromJson(json, tClass);
    }
}
