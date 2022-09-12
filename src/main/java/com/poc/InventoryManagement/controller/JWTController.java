package com.poc.InventoryManagement.controller;


import com.poc.InventoryManagement.dto.LoginRequest;
import com.poc.InventoryManagement.dto.TokenResponse;
import com.poc.InventoryManagement.security.TokenProvider;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@AllArgsConstructor
@RequestMapping("/auth")
public class JWTController {

    private final AuthenticationManager authenticationManager;
    private final TokenProvider tokenProvider;

    @PostMapping("/token")
    public ResponseEntity<TokenResponse> authorize(@Valid @RequestBody LoginRequest request) {
        var authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );
        var jwt = tokenProvider.generate(authentication.getName(), authentication.getAuthorities());
        var authorities = authentication.getAuthorities().stream().map(GrantedAuthority::getAuthority).toList();
        return ResponseEntity.ok(new TokenResponse(authentication.getName(), authorities, jwt.jwt(), jwt.expiration().toString(), jwt.issuedAt()));
    }
}
