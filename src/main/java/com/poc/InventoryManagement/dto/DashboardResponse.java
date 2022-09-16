package com.poc.InventoryManagement.dto;

import java.time.ZonedDateTime;


public record DashboardResponse(Long id,String name,String description,String assignedTo,String type,String serialNumber,String location,String comments,String trackingId,String status,ZonedDateTime addedTime) {


}
