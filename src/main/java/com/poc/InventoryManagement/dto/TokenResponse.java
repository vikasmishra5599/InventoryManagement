package com.poc.InventoryManagement.dto;

import java.util.Date;
import java.util.List;

public record TokenResponse(String username, List<String> authorities, String jwt, String expiration , Date issuedAt ) {
}
