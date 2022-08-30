package com.poc.InventoryManagement.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.ZonedDateTime;


@Entity(name = "books")
@Getter
@Setter
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String type;
    @Column(name = "serialnumber")
    private String serialNumber;
    @Column(name="addedtime")
    private ZonedDateTime addedTime;
    @Column(name="addedby")
    private String addedBy;
}
