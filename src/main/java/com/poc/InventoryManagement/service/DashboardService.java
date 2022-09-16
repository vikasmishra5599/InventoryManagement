package com.poc.InventoryManagement.service;

import com.poc.InventoryManagement.dto.DashboardResponse;
import com.poc.InventoryManagement.entity.AuthUser;
import com.poc.InventoryManagement.entity.Product;
import com.poc.InventoryManagement.entity.ProductAssignment;
import com.poc.InventoryManagement.repositories.AuthUserRepository;
import com.poc.InventoryManagement.repositories.ProductAssignmentRepository;
import com.poc.InventoryManagement.repositories.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

import static com.poc.InventoryManagement.utils.Constants.ROLE_MANAGER;

@Service
public class DashboardService {

    private ProductRepository productRepository;
    private ProductAssignmentRepository productAssignmentRepository;
    private AuthUserRepository authUserRepository;
    private UserService userService;

    public DashboardService(AuthUserRepository authUserRepository, ProductRepository productRepository, UserService userService, ProductAssignmentRepository productAssignmentRepository) {
        this.productRepository = productRepository;
        this.authUserRepository = authUserRepository;
        this.userService = userService;
        this.productAssignmentRepository = productAssignmentRepository;
    }


    public List<DashboardResponse> getAssignedProductsForUser() {
        return userService.isUserHasRole(ROLE_MANAGER) ? getAllAssignedProductsForManager() : getAssignedProductsForUserRole();
    }

    private List<DashboardResponse> getAllAssignedProductsForManager() {
        List<Product> productList = productRepository.findAll();
        return productList.stream().map(product -> dashboardMapper(product, authUserRepository.findById(productAssignmentRepository.findProductWithEndTimeNull(product.getId()).getAssignedTo()).get())).collect(Collectors.toList());
    }

    private DashboardResponse dashboardMapper(Product product, AuthUser user) {
        return new DashboardResponse(product.getId(), product.getName(), product.getDescription(), user != null ? (user.getFirstName() + " " + user.getLastName()) : null,
                product.getType(), product.getSerialNumber(), product.getLocation(),
                product.getComments(), product.getTrackingId(), product.getStatus(), product.getAddedTime()
        );
    }

    public List<DashboardResponse> getAssignedProductsForUserRole() {
        List<ProductAssignment> assignedProductList = getCurrentlyAssignedProductsForUser();
        List<Long> productIdList = assignedProductList.stream().map(ProductAssignment::getProductId).collect(Collectors.toList());
        List<Product> productList = productRepository.findByProductIds(productIdList);
        return productList.stream().map(product -> dashboardMapper(product, null)).collect(Collectors.toList());

    }

    private List<ProductAssignment> getCurrentlyAssignedProductsForUser() {
        return productAssignmentRepository.findCurrentlyAssignedProductsForUser(userService.getAuthUserDetails().id());
    }

}
