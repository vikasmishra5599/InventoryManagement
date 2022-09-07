package com.poc.InventoryManagement.repositories;

import com.poc.InventoryManagement.entity.ProductAssignment;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductAssignmentRepository extends JpaRepository<ProductAssignment, Long> {

}
