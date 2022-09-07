package com.poc.InventoryManagement.exception;

public class NotFoundException extends RuntimeException {

    public NotFoundException(String message){
        super(message);
    }

}
