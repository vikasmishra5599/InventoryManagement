package com.poc.InventoryManagement.repositories;

import com.poc.InventoryManagement.entity.ProductAssignment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductAssignmentRepository extends JpaRepository<ProductAssignment, Long> {


    @Query("select PA from productassignment PA  where PA.productId = :productid and PA.assignedEndTime is NULL")
    ProductAssignment findProductWithEndTimeNull(Long productid);

    @Query("select PA from productassignment PA  where PA.productId = :id")
    List<ProductAssignment> findByproductId(Long id);

    //    If user present in assignedTo column  and if the assignedendTime is null then get the id from productAssignment table
    //    From the id get the details from products table
    @Query("select PA from productassignment PA where PA.assignedTo =:i and PA.assignedEndTime is NULL")
    List<ProductAssignment> findCurrentlyAssignedProductsForUser(Long i);
}
