package com.poc.InventoryManagement.service;

import com.poc.InventoryManagement.repositories.ProductAssignmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AssignmentService {


    private ProductAssignmentRepository productAssignmentRepository;


    public AssignmentService(ProductAssignmentRepository productAssignmentRepository){
        this.productAssignmentRepository = productAssignmentRepository;
    }

}
