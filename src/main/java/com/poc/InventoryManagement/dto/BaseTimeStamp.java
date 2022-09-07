package com.poc.InventoryManagement.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
public class BaseTimeStamp {

    public LocalDateTime responseTime = LocalDateTime.now();

}
