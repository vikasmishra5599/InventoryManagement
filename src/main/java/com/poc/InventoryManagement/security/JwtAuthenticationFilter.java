package com.poc.InventoryManagement.security;

import com.poc.InventoryManagement.exception.ErrorHandler;
import com.poc.InventoryManagement.exception.TokenException;
import io.jsonwebtoken.*;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.SignatureException;
import java.util.Arrays;
import java.util.Objects;

@Component
@AllArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    public static final String BEARER = "Bearer ";

    private final TokenProvider provider;
    private final ErrorHandler errorHandler;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        try {
            var header = request.getHeader(HttpHeaders.AUTHORIZATION);
            if (Objects.nonNull(header) && header.startsWith(BEARER)) {
                final var jwt = header.replaceFirst(BEARER, "");
                final var claims = provider.parse(jwt);
                SecurityContextHolder.getContext().setAuthentication(getAuthentication(claims));
            }
            filterChain.doFilter(request, response);
        } catch (ExpiredJwtException | UnsupportedJwtException | MalformedJwtException  |
                 IncorrectClaimException | IllegalArgumentException e) {
            errorHandler.commence(request, response, new TokenException(e.getMessage(), e));
        }
    }

    private Authentication getAuthentication(Jws<Claims> jwt) {
        final var body = jwt.getBody();
        final var subject = body.getSubject();
        final var authorities = Arrays.stream(body.get(TokenProvider.ROLES_KEY)
                        .toString()
                        .split(","))
                .map(SimpleGrantedAuthority::new)
                .toList();
        return new UsernamePasswordAuthenticationToken(subject, jwt.getSignature(), authorities);
    }
}
