package com.poc.InventoryManagement.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Timestamp;
import java.time.ZonedDateTime;

@Entity(name = "productassignment")
@Getter
@Setter
@NoArgsConstructor
public class ProductAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="productid")
    private Long productId;
    @Column(name="assignee")
    private Long assignee;
    @Column(name="assignedto")
    private Long assignedTo;
    @Column(name="comments")
    private String comments;
    @Column(name="assignedstarttime")
    private Timestamp assignedStartTime;
    @Column(name="assignedendtime")
    private Timestamp assignedEndTime;
    @Column(name="lastupdatedtime")
    private Timestamp lastupdatedtime;
}