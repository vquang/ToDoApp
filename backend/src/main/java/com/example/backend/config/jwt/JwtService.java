package com.example.backend.config.jwt;

import com.example.backend.commons.dto.AuthUser;
import com.example.backend.util.JsonUtil;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.HashMap;
import java.util.List;

@Service
public class JwtService {
    private static final Logger LOGGER = LoggerFactory.getLogger(JwtService.class);
    @Value("${spring.security.jwt.secret-key}")
    private String secretKey;
    @Value("${spring.security.jwt.expired-in}")
    private Long expiredIn;

    public String generateToken(AuthUser authUser) {
        return Jwts.builder()
                .setClaims(new HashMap<>() {{
                    put("data", JsonUtil.objToJson(authUser));
                }})
                .setSubject(authUser.getUserId().toString())
                .setExpiration(new Date(System.currentTimeMillis() + expiredIn))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public Claims extractClaims(String token) {
        try {
            return Jwts.parser()
                    .setSigningKey(secretKey)
                    .parseClaimsJws(token)
                    .getBody();
        } catch (Exception e) {
            LOGGER.error("Parsing jwt token failed!");
        }
        return null;
    }

    public Authentication extractAuth(String token) {
        AuthUser authUser = JsonUtil.jsonToObj(
                (String) extractClaims(token)
                        .get("data"),
                AuthUser.class);
        return new UsernamePasswordAuthenticationToken(
                authUser.getUserId(),
                authUser,
                List.of(new SimpleGrantedAuthority("ROLE_USER")));
    }

    public Boolean isExpired(String token) {
        Claims claims = extractClaims(token);
        return claims == null || claims
                .getExpiration()
                .before(new Date());
    }
}
