package com.poc.InventoryManagement.dto;

import com.poc.InventoryManagement.entity.Role;

import java.util.List;
import java.util.Set;

public record AuthUserResponse(long id, String email , String firstname , String lastName , boolean isActive , List<String> roles) {
}
