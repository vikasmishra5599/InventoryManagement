package com.poc.InventoryManagement.service;

import com.poc.InventoryManagement.entity.Product;
import com.poc.InventoryManagement.repositories.ProductRepository;

import com.poc.InventoryManagement.request.ProductRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.ZonedDateTime;
import java.util.List;

@Service

public class ProductService {
    private ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product saveProduct(ProductRequest request) {
        Product product = mapRequestToEntity(request);
        return productRepository.save(product);
    }

    private Product mapRequestToEntity(ProductRequest request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setType(request.getType());
        product.setSerialNumber(request.getSerialNumber());
        product.setAddedBy(request.getAddedBy());
        product.setAddedTime(ZonedDateTime.now());
        return product;
    }

    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }
}
