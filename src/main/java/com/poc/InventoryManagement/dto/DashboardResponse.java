package com.poc.InventoryManagement.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class DashboardResponse {
    private String productId;
    private String productName;
    private String serialNo;
    private String owner;
    private String teamLeader;
    private String status;
    private String location;
}
