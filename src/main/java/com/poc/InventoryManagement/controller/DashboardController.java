package com.poc.InventoryManagement.controller;

import com.poc.InventoryManagement.dto.DashboardResponse;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

import static java.util.Arrays.asList;

@RestController
@RequestMapping("/dashboard")
public class DashboardController {

    @GetMapping("/")
    public List<DashboardResponse> getData() {
        return getList();
    }

    public List<DashboardResponse> getList() {
        DashboardResponse r1 = createDummyData("Pendrive", "Vikas", "1");
        DashboardResponse r2 = createDummyData("Cable", "User2", "2");
        DashboardResponse r3 = createDummyData("Locks", "User4", "3");

        return asList(r1, r2, r3);
    }

    private DashboardResponse createDummyData(String productName, String ownerName, String productId) {
        DashboardResponse r = new DashboardResponse();
        r.setProductId(productId);
        r.setProductName(productName);
        r.setSerialNo("212189324");
        r.setOwner(ownerName);
        r.setTeamLeader("leader1");
        r.setStatus("Working");
        r.setLocation("Home");
        return r;
    }

}
