package com.poc.InventoryManagement.request;


import javax.validation.constraints.NotBlank;

public record AddUserRequest(@NotBlank String email, String firstName, String lastName , String phoneNumber , boolean isManager) {
}
