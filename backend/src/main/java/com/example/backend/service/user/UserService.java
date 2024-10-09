package com.example.backend.service.user;

import com.example.backend.commons.request.user.UserRequest;
import com.example.backend.commons.response.MessageResponse;
import com.example.backend.commons.response.user.UserResponse;

public interface UserService {
    MessageResponse register(UserRequest request);

    UserResponse login(UserRequest request);
}
