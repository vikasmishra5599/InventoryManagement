package com.poc.InventoryManagement.service;

import com.poc.InventoryManagement.entity.Product;
import com.poc.InventoryManagement.entity.ProductAssignment;
import com.poc.InventoryManagement.repositories.ProductAssignmentRepository;
import com.poc.InventoryManagement.repositories.ProductRepository;

import com.poc.InventoryManagement.request.ProductAssignmentRequest;
import com.poc.InventoryManagement.request.ProductRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.ZonedDateTime;
import java.util.List;

@Service

public class ProductService {

    private ProductRepository productRepository;
    private ProductAssignmentRepository productAssignmentRepository;

    @Autowired
    public ProductService(ProductRepository productRepository, ProductAssignmentRepository productAssignmentRepository) {
        this.productAssignmentRepository = productAssignmentRepository;
        this.productRepository = productRepository;
    }

    public Product saveProduct(ProductRequest request) throws Exception {
        Product product = mapRequestToEntity(request);
        Product prodResponse = productRepository.save(product);
        if (prodResponse.getId() != null) {
            //TODO : To be replaced by logged In user for assignedTo as its a new device addition
            ProductAssignmentRequest newlyAssignedDevice = new ProductAssignmentRequest(prodResponse.getId(), 1, "Newly added device");
            ProductAssignment productAssignment = createProductRecord(newlyAssignedDevice);
            productAssignmentRepository.save(productAssignment);
        }
        return prodResponse;
    }

    private Product mapRequestToEntity(ProductRequest request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setType(request.getType());
        product.setSerialNumber(request.getSerialNumber());
        product.setLocation(request.getLocation());
        product.setComments(request.getComments());
        //TODO : To be replaced by logged In user
        product.setOwner(1);
        product.setTrackingId(request.getTrackingId());
        product.setStatus(request.getStatus());
        product.setAddedTime(ZonedDateTime.now());
        return product;
    }

    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    public ProductAssignment assignProduct(ProductAssignmentRequest request) throws Exception {
        updateProductRecord(request);
        ProductAssignment productAssignment = createProductRecord(request);
        return productAssignmentRepository.save(productAssignment);
    }

    private ProductAssignment updateProductRecord(ProductAssignmentRequest request) {
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        if (productAssignmentRepository.findByproductId(request.getId()) != null) {
            ProductAssignment res = getProductIdWithEndTimeNull(request.getId());
            if (res.getAssignedEndTime() == null) {
                res.setAssignedEndTime(timestamp);
                return productAssignmentRepository.save(res);
            }
        }
        return null;
    }


    private ProductAssignment createProductRecord(ProductAssignmentRequest request) throws Exception {

        if(checkIfProductExists(request.getId())){
            throw new Exception("Product Doesn't Exists!");
        }
        Timestamp timestamp = new Timestamp(System.currentTimeMillis());
        ProductAssignment assignProduct = new ProductAssignment();
        assignProduct.setProductId(request.getId());
        //TODO : To be replaced by logged In user
        assignProduct.setAssignee(1);
        assignProduct.setAssignedTo(request.getAssignedTo());
        assignProduct.setComments(request.getComments());
        assignProduct.setAssignedStartTime(timestamp);
        assignProduct.setLastupdatedtime(timestamp);
        assignProduct.setAssignedEndTime(null);
        return assignProduct;
    }

    private boolean checkIfProductExists(Long id) {
        return productRepository.findById(id).isEmpty();
    }

    private ProductAssignment getProductIdWithEndTimeNull(Long id) {
        return productAssignmentRepository.findProductWithEndTimeNull(id);
    }

}