package com.example.backend.controller.user;

import com.example.backend.commons.request.user.UserRequest;
import com.example.backend.commons.response.BaseResponse;
import com.example.backend.commons.response.MessageResponse;
import com.example.backend.commons.response.user.UserResponse;
import com.example.backend.service.user.UserService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/user")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @PostMapping("/register")
    public BaseResponse<MessageResponse> register(@Valid @RequestBody UserRequest request) {
        return BaseResponse.ok(userService.register(request));
    }

    @PostMapping("/login")
    public BaseResponse<UserResponse> login(@Valid @RequestBody UserRequest request) {
        return BaseResponse.ok(userService.login(request));
    }
}
