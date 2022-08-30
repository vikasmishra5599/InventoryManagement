package com.poc.InventoryManagement.request;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class UserRequest {
    private String name;
    private String empId;
    private String emailId;
    private String contactNo;
    private String teamName;
    private String supervisorName;
    private Boolean manager;
}
