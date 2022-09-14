package com.poc.InventoryManagement.service;

import com.poc.InventoryManagement.dto.AuditResponse;
import com.poc.InventoryManagement.repositories.AuditSQLRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AuditService {

    private AuditSQLRepository auditSQLRepository;
    public AuditService(AuditSQLRepository auditSQLRepository){
        this.auditSQLRepository = auditSQLRepository;
    }

    public List<AuditResponse> getAuditByProductId(long id) throws Exception {
      return  auditSQLRepository.getProductAuditById(id);
    }
}
