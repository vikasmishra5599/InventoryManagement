package com.poc.InventoryManagement.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
public class AssignmentRequest {

    private long productId;
    private long userId;
    private String requestType;
    private Date fromDate;

}
