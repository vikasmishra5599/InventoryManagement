package com.poc.InventoryManagement.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity(name = "users")
@Getter
@Setter
@NoArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    @Column(name = "empid")
    private String empId;
    @Column(name = "emailid")
    private String emailId;
    @Column(name = "contactno")
    private String contactNo;
    @Column(name = "teamname")
    private String teamName;
    @Column(name = "supervisorname")
    private String supervisorName;
    @Column(name = "ismanager")
    private boolean isManager;
    @Column(name = "createdtime")
    private ZonedDateTime createdTime;
}
