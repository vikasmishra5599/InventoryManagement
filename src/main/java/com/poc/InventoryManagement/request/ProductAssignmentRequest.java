package com.poc.InventoryManagement.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class ProductAssignmentRequest {

    private Long id;
    private int assignedTo;
    private String comments;

    public ProductAssignmentRequest(Long id, int assignedTo, String comments) {
        this.id = id;
        this.assignedTo = assignedTo;
        this.comments = comments;

    }
}