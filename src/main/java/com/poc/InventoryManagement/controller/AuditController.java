package com.poc.InventoryManagement.controller;

import com.poc.InventoryManagement.dto.AuditResponse;
import com.poc.InventoryManagement.security.Annotations.AuthUserRole;
import com.poc.InventoryManagement.service.AuditService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/audits")
public class AuditController {

    public AuditService auditService;

    public AuditController(AuditService auditService){
        this.auditService = auditService;
    }

    @GetMapping("/product/{id}")
    @AuthUserRole
    public ResponseEntity<List<AuditResponse>> getProductAudits(@PathVariable("id") long id) throws Exception {
        return new ResponseEntity<> (auditService.getAuditByProductId(id),HttpStatus.OK);
    }
}
