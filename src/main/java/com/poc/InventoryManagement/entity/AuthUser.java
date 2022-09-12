package com.poc.InventoryManagement.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Set;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class AuthUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;
    String email;
    String Password;
    String firstName;
    String lastName;
    String phoneNo;
    boolean active;
    String regKey;
    boolean isRegLinkActive;
    String resetPasswordKey;
    LocalDateTime resetPasswordExpiry;
    LocalDateTime regLinkExpiry;
    Integer incorrectAttempts;
    @ManyToMany(fetch = FetchType.EAGER)
    Set<Role> roles;
}
