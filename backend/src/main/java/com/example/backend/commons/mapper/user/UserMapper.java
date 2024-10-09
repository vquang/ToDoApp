package com.example.backend.commons.mapper.user;

import com.example.backend.commons.entity.user.User;
import com.example.backend.commons.request.user.UserRequest;
import com.example.backend.commons.response.user.UserResponse;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {
    User toEntity(UserRequest request);

    UserResponse toResponse(User entity);
}
