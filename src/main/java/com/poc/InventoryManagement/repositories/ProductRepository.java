package com.poc.InventoryManagement.repositories;

import com.poc.InventoryManagement.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    @Query( "select PA from products PA where PA.id in :ids" )
    List<Product> findByProductIds(@Param("ids") List<Long> productIds);
}