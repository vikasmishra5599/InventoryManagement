package com.poc.InventoryManagement.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
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
    @Column(name="userid")
    private Long userId;
    @Column(name="addedtime")
    private ZonedDateTime addedTime;
}
