package com.poc.InventoryManagement.service;

import com.poc.InventoryManagement.entity.AuthUser;
import com.poc.InventoryManagement.exception.BadRequestException;
import com.poc.InventoryManagement.repositories.AuthUserRepository;
import com.poc.InventoryManagement.security.UserPrincipal;
import com.poc.InventoryManagement.utils.Generators;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsPasswordService;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.NoSuchAlgorithmException;
import java.time.LocalDateTime;
import java.time.temporal.TemporalUnit;
import java.util.List;

@Service
@AllArgsConstructor
public class UserDetailService implements UserDetailsService, UserDetailsPasswordService {

    private final AuthUserRepository repository;
    private final PasswordEncoder passwordEncoder;

    private final EmailService emailService;

    @Override
    public UserPrincipal loadUserByUsername(String username) {
        return repository.getAuthUserByEmailId(username)
                .map(UserPrincipal::new)
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));
    }

    @Override
    public UserDetails updatePassword(UserDetails user, String newPassword) {
        var entity = repository.getAuthUserByEmailId(user.getUsername())
                .orElseThrow(() -> new UsernameNotFoundException("Username not found"));
        entity.setPassword(passwordEncoder.encode(newPassword));
        return new UserPrincipal(repository.save(entity));
    }

    public UserDetails updatePasswordByRegKey(String key , String newPassword) throws BadRequestException {
        var entity = repository.getAuthUserByRegKey(key)
                .orElseThrow(() -> new BadRequestException("Link not found !"));
        if(entity.getRegLinkExpiry().isBefore(LocalDateTime.now())){
            throw new BadRequestException("Reset Password Link Expired");
        }
        entity.setPassword(passwordEncoder.encode(newPassword));
        entity.setRegKey(null);
        entity.setRegLinkExpiry(null);
        return new UserPrincipal(repository.save(entity));
    }

    public UserDetails updatePasswordByResetKey(String key , String newPassword) throws BadRequestException {
        var entity = repository.getAuthUserByResetKey(key)
                .orElseThrow(() -> new BadRequestException("Link not found !"));
        if(entity.getRegLinkExpiry().isBefore(LocalDateTime.now())){
            throw new BadRequestException("Reset Password Link Expired");
        }
        entity.setPassword(passwordEncoder.encode(newPassword));
        entity.setResetPasswordKey(null);
        entity.setResetPasswordExpiry(null);
        return new UserPrincipal(repository.save(entity));
    }

    public UserDetails generateForgotPasswordLink(String email) throws NoSuchAlgorithmException {
        var entity = repository.getAuthUserByEmailId(email)
                .orElseThrow(() -> new BadRequestException("Username not found"));
        entity.setResetPasswordKey(Generators.generateNewUserKey(email));
        entity.setResetPasswordExpiry(LocalDateTime.now().plusHours(3));
        emailService.sendResetEmail(entity.getEmail(),entity.getFirstName(),entity.getResetPasswordKey());
        repository.save(entity);
        return new UserPrincipal(repository.save(entity));
    }

    public List<AuthUser> findAll() {
        return repository.findAll();
    }

    public AuthUser findById(String username) {
        return repository.getAuthUserByEmailId(username).orElseThrow();
    }
}
