package com.poc.InventoryManagement.service;

import com.poc.InventoryManagement.entity.Product;
import com.poc.InventoryManagement.entity.ProductAssignment;
import com.poc.InventoryManagement.repositories.ProductAssignmentRepository;
import com.poc.InventoryManagement.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    private ProductRepository productRepository;
    private ProductAssignmentRepository productAssignmentRepository;

    public DashboardService(ProductRepository productRepository, ProductAssignmentRepository productAssignmentRepository) {
        this.productRepository = productRepository;
        this.productAssignmentRepository = productAssignmentRepository;
    }


    public List<Product> getAssignedProductsForUser() {
        List<ProductAssignment> result = getCurrentlyAssignedProductsForUser();
        List<Long> productIdList = result.stream().map(ProductAssignment::getProductId).collect(Collectors.toList());
        return productRepository.findByProductIds(productIdList);
    }

    private List<ProductAssignment> getCurrentlyAssignedProductsForUser() {
        //TODO : To be replaced by logged In user
        return productAssignmentRepository.findCurrentlyAssignedProductsForUser(1);
    }
}
