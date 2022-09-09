package com.poc.InventoryManagement.controller;

import com.poc.InventoryManagement.entity.Product;
import com.poc.InventoryManagement.entity.ProductAssignment;
import com.poc.InventoryManagement.request.ProductAssignmentRequest;
import com.poc.InventoryManagement.request.ProductRequest;
import com.poc.InventoryManagement.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/product")
public class ProductController {
    private ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/create")
    public Product saveProduct(@RequestBody ProductRequest request) throws Exception {
        return productService.saveProduct(request);
    }

    @GetMapping("/")
    public List<Product> getAllProduct() {
        return productService.getAllProduct();
    }

    @PostMapping("/assign")
    public ProductAssignment assignProduct(@RequestBody ProductAssignmentRequest request) throws Exception {
        return productService.assignProduct(request);
    }

}

