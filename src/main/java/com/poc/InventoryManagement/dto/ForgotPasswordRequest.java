package com.poc.InventoryManagement.dto;


import javax.validation.constraints.NotBlank;

public record ForgotPasswordRequest(@NotBlank String email) {
}
