package com.poc.InventoryManagement.controller;

import com.poc.InventoryManagement.service.FrontendService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import static org.springframework.http.MediaType.TEXT_HTML_VALUE;

@RestController
public class FrontendController {
    private FrontendService frontendService;

    @Autowired
    public FrontendController(FrontendService frontendService) {
        this.frontendService = frontendService;
    }

    @GetMapping(value = {"/", "/list", "/contact", "/{path:[^\\.]*}"}, produces = TEXT_HTML_VALUE)
    public String fetchLayout() {
      return frontendService.fetchLayout();
    }
}
