package com.poc.InventoryManagement.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.ZonedDateTime;


@Entity(name = "products")
@Getter
@Setter
@NoArgsConstructor
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;
    @Column(name = "description")
    private String description;
    @Column(name = "type")
    private String type;
    @Column(name = "serialnumber")
    private String serialNumber;
    @Column(name = "location")
    private String location;
    @Column(name = "owner")
    private Long owner;
    @Column(name = "comments")
    private String comments;
    @Column(name = "trackingid")
    private String trackingId;
    @Column(name = "status")
    private String status;
    @Column(name = "addedtime")
    private ZonedDateTime addedTime;
}
