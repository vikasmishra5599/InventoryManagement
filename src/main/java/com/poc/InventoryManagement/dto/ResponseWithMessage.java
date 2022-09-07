package com.poc.InventoryManagement.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class ResponseWithMessage<T> {
    String message;
    T responseObject;
}
