package com.example.backend.commons.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class BaseResponse<T> {
    private Integer code;
    private String message;
    private T data;

    public static <T> BaseResponse<T> ok(T data) {
        return BaseResponse.<T>builder()
                .code(200)
                .message("ok")
                .data(data)
                .build();
    }

    public static <T> BaseResponse<T> simple(Integer code, String message) {
        return BaseResponse.<T>builder()
                .code(code)
                .message(message)
                .data(null)
                .build();
    }
}
