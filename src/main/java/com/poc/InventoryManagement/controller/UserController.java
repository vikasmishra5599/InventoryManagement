package com.poc.InventoryManagement.controller;

import com.poc.InventoryManagement.entity.User;
import com.poc.InventoryManagement.request.UserRequest;
import com.poc.InventoryManagement.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {
    private UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/create")
    public User createUser(@RequestBody UserRequest userRequest) {
      return  userService.createUser(userRequest);
    }

    @GetMapping("/getAll")
    public List<User> getAll() {
       return userService.getAllUsers();
    }


    @GetMapping("/")
    public String testApp() {
        return "testing purpose";
    }

}
