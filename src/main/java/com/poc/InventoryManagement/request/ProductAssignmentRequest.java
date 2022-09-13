package com.poc.InventoryManagement.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProductAssignmentRequest {

    private Long assignedTo;
    private String comments;

    public ProductAssignmentRequest(Long assignedTo, String comments) {
        this.assignedTo = assignedTo;
        this.comments = comments;

    }
}