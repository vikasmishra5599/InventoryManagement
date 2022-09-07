package com.poc.InventoryManagement.repositories;

import com.poc.InventoryManagement.entity.AuthUser;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthUserRepository extends JpaRepository<AuthUser, Long> {

    @Query("select AU from AuthUser AU  where AU.email = :emailId")
     Optional<AuthUser> getAuthUserByEmailId(String emailId);

    @Query("select AU from AuthUser AU  where AU.regKey = :regKey")
    Optional<AuthUser> getAuthUserByRegKey(String regKey);

    @Query("select AU from AuthUser AU  where AU.resetPasswordKey = :resetPasswordKey")
    Optional<AuthUser> getAuthUserByResetKey(String resetPasswordKey);
}
