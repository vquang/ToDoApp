package com.example.backend.service.user;

import com.example.backend.commons.dto.AuthUser;
import com.example.backend.commons.entity.user.User;
import com.example.backend.commons.mapper.user.UserMapper;
import com.example.backend.commons.request.user.UserRequest;
import com.example.backend.commons.response.MessageResponse;
import com.example.backend.commons.response.user.UserResponse;
import com.example.backend.config.exception.ApiException;
import com.example.backend.config.jwt.JwtService;
import com.example.backend.repository.user.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public MessageResponse register(UserRequest request) {
        if (!request.getConfirmPassword().equals(request.getPassword()))
            throw new ApiException(401, "information is not valid");
        if (userRepository.findByUsername(request.getUsername()).isPresent())
            throw new ApiException(401, "username already exists");
        userRepository.save(userMapper
                .toEntity(request)
                .setPassword(passwordEncoder.encode(request.getPassword()))
                .setCreatedAt(LocalDate.now()));
        return new MessageResponse("successfully");
    }

    @Override
    public UserResponse login(UserRequest request) {
        User user = userRepository
                .findByUsername(request.getUsername())
                .filter(u -> passwordEncoder.matches(request.getPassword(), u.getPassword()))
                .orElseThrow(() -> new ApiException(401, "UNAUTHORIZED"));
        return userMapper.toResponse(user)
                .setToken(jwtService.generateToken(AuthUser
                        .builder()
                        .userId(user.getUserId())
                        .build()));
    }
}
