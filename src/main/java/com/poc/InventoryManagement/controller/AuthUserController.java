package com.poc.InventoryManagement.controller;

import com.poc.InventoryManagement.dto.AuthUserResponse;
import com.poc.InventoryManagement.dto.BaseTimeStamp;
import com.poc.InventoryManagement.dto.ResponseWithMessage;
import com.poc.InventoryManagement.entity.AuthUser;
import com.poc.InventoryManagement.exception.InvalidInputException;
import com.poc.InventoryManagement.request.AddUserRequest;
import com.poc.InventoryManagement.security.Annotations.AuthUserRole;
import com.poc.InventoryManagement.security.Annotations.ManagerRole;
import com.poc.InventoryManagement.service.UserService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.List;

@RestController
@RequestMapping("/AuthUser")
@AllArgsConstructor
public class AuthUserController {

    private UserService userService;

    @PostMapping
    @ManagerRole
    public ResponseEntity<AuthUserResponse> addUser(@RequestBody AddUserRequest addUserRequest) throws NoSuchAlgorithmException, InvalidInputException {
        AuthUserResponse savedUser = userService.addNewUser(addUserRequest);
        return new ResponseEntity<>(savedUser,HttpStatus.OK);
    }

    @GetMapping
    @AuthUserRole
    public ResponseEntity<List<AuthUserResponse>> getAllUser(){
        return new ResponseEntity<>(userService.getAllAuthUsers(), HttpStatus.OK);
    }

    @GetMapping("/getAuthUserDetails")
    @AuthUserRole
    public ResponseEntity<AuthUserResponse> getAuthUserDetails(){
     return new ResponseEntity<>(userService.getAuthUserDetails(),HttpStatus.OK);
    }

}
