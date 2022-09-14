package com.poc.InventoryManagement.dto;

import java.util.Date;

public record AuditResponse(int productId, Date assignedStartDate, Date assignedEndDate, String comments, String assignedTo ,String assignee) {
}
