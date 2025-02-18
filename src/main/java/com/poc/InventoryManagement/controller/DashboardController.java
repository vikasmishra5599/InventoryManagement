package com.poc.InventoryManagement.controller;

import com.poc.InventoryManagement.dto.DashboardResponse;
import com.poc.InventoryManagement.security.Annotations.AuthUserRole;
import com.poc.InventoryManagement.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.List;


@RestController
@RequestMapping("/dashboard")
public class DashboardController {
    private DashboardService dashboardService;

    @Autowired
    public DashboardController(DashboardService dashboardService) {
        this.dashboardService = dashboardService;
    }

    @GetMapping("/")
    @AuthUserRole
    public List<DashboardResponse> getAssignedProducts() {
        return dashboardService.getAssignedProductsForUser();
    }

}

