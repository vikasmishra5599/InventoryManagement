package com.poc.InventoryManagement.repositories;


import com.poc.InventoryManagement.dto.AuditResponse;
import com.poc.InventoryManagement.utils.Constants;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AuditSQLRepository {

    private final JdbcTemplate jdbcTemplate;

    AuditSQLRepository(JdbcTemplate jdbcTemplate){
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<AuditResponse> getProductAuditById(long productId) throws Exception {
    List<AuditResponse> productAudits;
		try {
            productAudits = jdbcTemplate.query(Constants.AUDIT_SQL,  (rs, rowNum) -> new AuditResponse(rs.getInt("productid"),
                    rs.getTimestamp("assignedstarttime"),
                    rs.getTimestamp("assignedendtime"),
                    rs.getString("comments"),
                    rs.getString("assignedTo"),
                    rs.getString("assignee")), productId);
    }
		catch (DataAccessException e) {
        throw new Exception("Date Exception during fetching comments",e);
    }catch (Exception e) {
        throw new Exception("Exception during fetching comments",e);
    }
		return productAudits;
    }
}
