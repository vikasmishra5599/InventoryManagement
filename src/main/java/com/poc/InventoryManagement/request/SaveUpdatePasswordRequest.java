package com.poc.InventoryManagement.request;

import javax.validation.constraints.NotBlank;

public record SaveUpdatePasswordRequest(@NotBlank String key, @NotBlank String password) {
}
