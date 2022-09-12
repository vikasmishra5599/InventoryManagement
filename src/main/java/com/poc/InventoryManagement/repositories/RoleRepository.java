package com.poc.InventoryManagement.repositories;

import com.poc.InventoryManagement.entity.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface RoleRepository  extends JpaRepository<Role, Integer> {

    @Query("Select r from Role r where r.name = :name")
    public Optional<Role> getRolebyName(String name);
}
