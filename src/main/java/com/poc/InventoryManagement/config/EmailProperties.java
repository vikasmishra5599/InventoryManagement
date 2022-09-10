package com.poc.InventoryManagement.config;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "spring.application.email.notification")
@Getter
@Setter
@ToString
public class EmailProperties {
    public Boolean enabled;
    public String fromEmail;
    public String domain;
}
