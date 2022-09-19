package com.poc.InventoryManagement.utils;

public class Constants {

    public static final String AUDIT_SQL= "select pa.productid as productid, " +
            "       pa.assignedstarttime as assignedstarttime, " +
            "       pa.assignedendtime as assignedendtime, " +
            "       pa.comments as comments, " +
            "concat(concat(au.first_name, ' '), au.last_name)   as assignedTo, "+
            "concat(concat(au1.first_name, ' '), au1.last_name) as assignee "+
            "from productassignment pa, " +
            "     auth_user au, " +
            "     auth_user au1 " +
            "where productid = ? " +
            "  and au.id = pa.assignedto " +
            "  and au1.id = pa.assignee  " +
            "order by pa.lastupdatedtime desc ";

    public static final String ROLE_MANAGER ="ROLE_MANAGER";
    public static final String ROLE_ADMIN = "ROLE_ADMIN";
    public static final String ROLE_USER = "ROLE_USER";
    public static final String UNAUTHORIZED = "User Name or Password Error";
}
