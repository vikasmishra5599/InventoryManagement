package com.poc.InventoryManagement.controller;

import com.poc.InventoryManagement.dto.BaseTimeStamp;
import com.poc.InventoryManagement.dto.ForgotPasswordRequest;
import com.poc.InventoryManagement.dto.ResponseWithMessage;
import com.poc.InventoryManagement.request.SaveUpdatePasswordRequest;
import com.poc.InventoryManagement.service.UserDetailService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;


@RestController
@RequestMapping("/unsecure")
@AllArgsConstructor
public class UnsecureController {

    private UserDetailService userDetailService;

    @PostMapping("/saveresetpassword")
    public ResponseEntity <ResponseWithMessage<BaseTimeStamp>> saveResetPassword(@RequestBody SaveUpdatePasswordRequest saveUpdatePasswordRequest){
        userDetailService.updatePasswordByRegKey(saveUpdatePasswordRequest.key(),saveUpdatePasswordRequest.password());
        return new  ResponseEntity<>( new ResponseWithMessage ("password updated " , new BaseTimeStamp()), HttpStatus.OK);
    }

    @PostMapping("/forgotpassword")
    public ResponseEntity <ResponseWithMessage<BaseTimeStamp>> forgotPassword(@RequestBody ForgotPasswordRequest forgotPasswordRequest) throws NoSuchAlgorithmException {
        userDetailService.generateForgotPasswordLink(forgotPasswordRequest.email());
        return new  ResponseEntity<>( new ResponseWithMessage ("Reset link sent " , new BaseTimeStamp()), HttpStatus.OK);
    }
}
