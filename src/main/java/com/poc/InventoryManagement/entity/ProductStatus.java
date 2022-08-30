package com.poc.InventoryManagement.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;
import java.time.ZonedDateTime;

@Entity(name = "productstatus")
@Getter
@Setter
@NoArgsConstructor
public class ProductStatus {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name="productid")
    private Long productId;
    private String status;
    private String location;
    private String comment;
    @Column(name="lastupdatetime")
    private ZonedDateTime lastUpdateTime;

}
